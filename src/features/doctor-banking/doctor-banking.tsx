'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  ArrowLeftIcon,
  Badge,
  Button,
  Card,
  DownloadIcon,
  QrCodeIcon,
  RefreshIcon,
  Skeleton,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import type { Translate } from '../../components/foundations/i18n';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
  WorkspacePage,
  WorkspacePageHeader,
} from '../../components/shared';

import { ActivityLedger } from './activity-ledger';
import { FinancialNotifications } from './financial-notifications';
import {
  balanceDirection,
  balanceHeadline,
  EMPTY_ACTIVITY_QUERY,
  earningsMonthLabel,
  filterLedgerEntries,
  floorBreached,
  formatBankingDate,
  formatBankingDateTime,
  isActivityQueryFiltered,
  mandateCapabilities,
  nextCollectionStep,
  parseSignedUsdMinor,
  statementRangeError,
} from './logic';
import type { ActivityQuery, NextCollectionStep } from './logic';
import { MANDATE_COPY, MandatePanel } from './mandate-panel';
import { AmountText, SignedMoneyText } from './money';
import type {
  Amount,
  DoctorBankingFixture,
  DoctorBankingOverview,
  DoctorBankingViewState,
  KhqrIntent,
  MandateLinkSession,
  MandateSummary,
} from './types';
import styles from './doctor-banking.module.css';

const BALANCE = 'Balance';

function isZero(amount: Amount) {
  const parsed = parseSignedUsdMinor(amount.minor);
  return parsed === null || BigInt(parsed) === 0n;
}

function PageHeader({
  actions,
  description,
  onBack,
  title,
}: {
  actions?: React.ReactNode;
  description?: string;
  onBack?: () => void;
  title: string;
}) {
  const t = useT();
  return (
    <div className={styles.pageHeaderGroup}>
      {onBack ? (
        <Button
          className={styles.backAction}
          leadingIcon={<ArrowLeftIcon aria-hidden="true" />}
          onClick={onBack}
          size="sm"
          variant="link"
        >
          {t(BALANCE)}
        </Button>
      ) : null}
      <WorkspacePageHeader
        actions={actions}
        description={description ? t(description) : undefined}
        title={t(title)}
      />
    </div>
  );
}

function PageState({
  onOpenLicence,
  onRetry,
  state,
}: {
  onOpenLicence?: () => void;
  onRetry?: () => void;
  state: Exclude<DoctorBankingViewState, 'ready'>;
}) {
  const t = useT();

  if (state === 'loading') {
    return (
      <section aria-label={t('Loading your balance')} className={styles.loadingStack} role="status">
        <span className={styles.srOnly}>{t('Loading your balance')}</span>
        <Skeleton className={styles.skeletonHero} />
        <Skeleton className={styles.skeletonStrip} />
        <Skeleton className={styles.skeletonTable} />
      </section>
    );
  }

  if (state === 'permission-denied') {
    return (
      <EmptyState align="center" surface="muted">
        <EmptyStateHeader>
          <EmptyStateTitle>{t('This balance is not yours to view')}</EmptyStateTitle>
          <EmptyStateDescription>
            {t('The ledger belongs to the doctor, not the workspace. Delegated users cannot see balances, debt, ABA details, or payment codes.')}
          </EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    );
  }

  if (state === 'not-eligible') {
    return (
      <EmptyState align="center" className={styles.licenceState}>
        <EmptyStateHeader>
          <EmptyStateMedia className={styles.licenceIllustration}>
            <Image
              alt=""
              className={styles.licenceIllustrationImage}
              height={1254}
              priority
              sizes="160px"
              src="/generated/kura-earnings-licence-gate-v1.png"
              width={1254}
            />
          </EmptyStateMedia>
          <EmptyStateTitle>{t('Your balance opens with a verified licence')}</EmptyStateTitle>
          <EmptyStateDescription>
            {t('Your balance follows you, not your workspace. Verify your medical licence to start earning.')}
          </EmptyStateDescription>
        </EmptyStateHeader>
        {onOpenLicence ? (
          <EmptyStateContent>
            <Button onClick={onOpenLicence}>{t('Manage licence')}</Button>
          </EmptyStateContent>
        ) : null}
      </EmptyState>
    );
  }

  return (
    <Alert tone="danger">
      <AlertTitle>{t('Balance unavailable')}</AlertTitle>
      <AlertDescription>
        {t('Current amounts could not be verified. No balance or payment action is shown.')}
      </AlertDescription>
      {onRetry ? (
        <AlertAction><Button onClick={onRetry} variant="outline">{t('Try again')}</Button></AlertAction>
      ) : null}
    </Alert>
  );
}

/**
 * A lapsed licence never hides an existing ledger. The doctor keeps reading,
 * settling, and unlinking; only new ordering and new ABA links stop.
 */
function LicenceLapsedNotice({ onOpenLicence }: { onOpenLicence?: () => void }) {
  const t = useT();
  return (
    <Alert tone="warning">
      <AlertTitle>{t('Your medical licence has lapsed')}</AlertTitle>
      <AlertDescription>
        {t('You can still see your balance, settle what you owe, and unlink ABA. New orders and new ABA links are blocked until the licence is verified.')}
      </AlertDescription>
      {onOpenLicence ? (
        <AlertAction>
          <Button onClick={onOpenLicence} variant="outline">{t('Manage licence')}</Button>
        </AlertAction>
      ) : null}
    </Alert>
  );
}

/** The reason a doctor opens this page: what they earned this month. */
function EarningsHero({ overview }: { overview: DoctorBankingOverview }) {
  const t = useT();
  return (
    <section aria-labelledby="earnings-hero-title" className={styles.hero}>
      <p className={styles.heroLabel} id="earnings-hero-title">
        {t('Earned in')} {earningsMonthLabel(overview.periodStart)}
      </p>
      <AmountText className={styles.heroValue} value={overview.earnedThisMonth} />
      <p className={styles.heroNote}>
        {t('Your settled share from completed orders across all Kura workspaces.')}
      </p>
    </section>
  );
}

function BalanceSummary({
  onSettle,
  overview,
}: {
  onSettle?: () => void;
  overview: DoctorBankingOverview;
}) {
  const t = useT();
  const direction = balanceDirection(overview.settledBalance.minor);
  const tone =
    direction === 'doctor-owes' ? 'danger' : direction === 'kura-owes' ? 'positive' : 'neutral';
  const support =
    direction === 'kura-owes'
      ? t('This credit offsets future charges. Cash payout is not available yet.')
      : direction === 'settled'
        ? t('Neither you nor Kura owes anything.')
        : direction === 'unavailable'
          ? t('We could not verify this amount, so no payment action is offered.')
          : null;

  return (
    <section aria-labelledby="balance-summary-title" className={styles.balanceRow} data-tone={tone}>
      <div className={styles.balanceMain}>
        <h2 className={styles.balanceLabel} id="balance-summary-title">
          {t(balanceHeadline(direction))}
        </h2>
        {direction === 'unavailable' ? null : (
          <SignedMoneyText
            announceDirection
            className={styles.balanceValue}
            value={overview.settledBalance}
          />
        )}
        {support ? <p className={styles.metricHelp}>{support}</p> : null}
      </div>
      {direction === 'doctor-owes' ? (
        <div className={styles.balanceAction}>
          <Button leadingIcon={<QrCodeIcon aria-hidden="true" />} onClick={onSettle}>
            {t('Settle now')}
          </Button>
        </div>
      ) : null}
    </section>
  );
}

/**
 * One functional tray for the three amounts that are not yours yet, plus the
 * projected balance and ordering floor those amounts decide.
 */
function InProgress({ overview }: { overview: DoctorBankingOverview }) {
  const t = useT();
  const idle =
    isZero(overview.pendingCredit) && isZero(overview.pendingDebit) && isZero(overview.reservedDebit);
  const breached = floorBreached(overview);

  return (
    <Card aria-labelledby="in-progress-title" as="section" className={styles.progressTray}>
      <h2 className={styles.sectionTitle} id="in-progress-title">{t('In progress')}</h2>
      {idle ? (
        <p className={styles.quietCopy}>{t('Nothing in progress.')}</p>
      ) : (
        <dl className={styles.progressFacts}>
          <div>
            <dt>{t('Pending earnings')}</dt>
            <dd><AmountText value={overview.pendingCredit} /></dd>
          </div>
          <div>
            <dt>{t('Pending charges')}</dt>
            <dd><AmountText value={overview.pendingDebit} /></dd>
          </div>
          <div>
            <dt>{t('Reserved for draft orders')}</dt>
            <dd><AmountText value={overview.reservedDebit} /></dd>
          </div>
        </dl>
      )}
      <p className={styles.projectedLine}>
        {t('Projected balance if everything completes')} <SignedMoneyText value={overview.exposure} />{' '}
        · {t('Ordering floor')} <SignedMoneyText value={overview.creditFloor} />
      </p>
      {breached ? (
        <p className={styles.floorWarning}>
          {t('You have reached your ordering floor. Settle your balance to send new orders.')}
        </p>
      ) : null}
    </Card>
  );
}

/**
 * No action button lives here. Every step that needs paying happens while the
 * balance is red, and the one Settle now sits beside the amount it settles.
 */
type NextStepView = {
  sentence: React.ReactNode;
  badge?: { label: string; variant: 'neutral' | 'info' | 'warning' | 'danger' | 'success' };
};

function nextStepView(step: NextCollectionStep, t: Translate): NextStepView {
  switch (step.kind) {
    case 'unavailable':
      return {
        sentence: t('The balance could not be verified, so no collection is scheduled from this screen.'),
        badge: { label: t('Unknown'), variant: 'warning' },
      };
    case 'nothing_due':
      return { sentence: t('No collection is scheduled.') };
    case 'credit_held':
      return {
        sentence: t('No collection is scheduled. Your credit offsets future charges.'),
      };
    case 'sweep_scheduled':
      return {
        sentence: (
          <>
            {t('Kura will collect up to')} <AmountText value={step.maximum} /> {t('on')}{' '}
            {formatBankingDate(step.date)}. {t('You get a notice before it happens.')}
          </>
        ),
      };
    case 'notice_sent':
      return {
        badge: { label: t('Notice sent'), variant: 'info' },
        sentence: (
          <>
            {t('Kura will collect up to')} <AmountText value={step.maximum} /> {t('on')}{' '}
            {formatBankingDate(step.date)}.
          </>
        ),
      };
    case 'notice_reduced':
      return {
        badge: { label: t('Notice sent'), variant: 'info' },
        sentence: (
          <>
            {t('Kura will collect up to')} <AmountText value={step.maximum} /> {t('on')}{' '}
            {formatBankingDate(step.date)} — {t('down from')} <AmountText value={step.noticed} />{' '}
            {t('after your payment.')}
          </>
        ),
      };
    case 'notice_cleared':
      return {
        badge: { label: t('Nothing left to collect'), variant: 'success' },
        sentence: (
          <>
            {t('Nothing remains for the')} {formatBankingDate(step.date)} {t('collection.')}
          </>
        ),
      };
    case 'retry_pending':
      return {
        badge: { label: t('Collection failed'), variant: 'danger' },
        sentence: (
          <>
            {step.retryDate
              ? `${t('Kura retries on')} ${formatBankingDate(step.retryDate)}`
              : t('Kura retries on the next eligible day')}
            {step.retrySlot ? ` · ${t('attempt')} ${step.retrySlot} ${t('of 3')}` : ''}.{' '}
            {t('Paying now stops the retry.')}
          </>
        ),
      };
    case 'retry_expired':
      return {
        badge: { label: t('Retry window closed'), variant: 'danger' },
        sentence: (
          <>
            {t('Kura cannot retry this collection. Settle')} <AmountText value={step.amount} />{' '}
            {t('by KHQR.')}
          </>
        ),
      };
    case 'retries_exhausted':
      return {
        badge: { label: t('No retries left'), variant: 'danger' },
        sentence: (
          <>
            {step.date
              ? `${t('Kura will wait until the next sweep on')} ${formatBankingDate(step.date)}.`
              : t('Kura will wait until the next sweep.')}{' '}
            {t('You can settle now instead.')}
          </>
        ),
      };
    case 'settle_manually':
      return {
        badge: { label: t(MANDATE_COPY[step.mandate].label), variant: 'warning' },
        sentence: (
          <>
            {t('Kura cannot collect automatically. Settle')} <AmountText value={step.amount} />{' '}
            {t('by KHQR.')}
          </>
        ),
      };
  }
}

function NextStep({
  notifications,
  overview,
}: {
  notifications: DoctorBankingFixture['notifications'];
  overview: DoctorBankingOverview;
}) {
  const t = useT();
  const view = nextStepView(nextCollectionStep(overview, notifications), t);
  return (
    <section aria-labelledby="next-step-title" className={styles.section}>
      <div className={styles.nextStepHeading}>
        <h2 className={styles.sectionTitle} id="next-step-title">{t('What happens next')}</h2>
        {view.badge ? <Badge variant={view.badge.variant}>{view.badge.label}</Badge> : null}
      </div>
      <p className={styles.nextStepSentence}>{view.sentence}</p>
    </section>
  );
}

function AutoPaySummary({
  mandate,
  onManageAutoPay,
}: {
  mandate: MandateSummary;
  onManageAutoPay?: () => void;
}) {
  const t = useT();
  return (
    <section aria-labelledby="auto-pay-summary-title" className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle} id="auto-pay-summary-title">{t('Auto-pay')}</h2>
        <Button onClick={onManageAutoPay} size="sm" variant="ghost">{t('Manage auto-pay')}</Button>
      </header>
      <dl className={styles.inlineFacts}>
        <div>
          <dt>{t('Status')}</dt>
          <dd>{t(MANDATE_COPY[mandate.state].label)}</dd>
        </div>
        {mandate.maskedAccount ? (
          <div><dt>{t('Account')}</dt><dd>{mandate.maskedAccount}</dd></div>
        ) : null}
        {mandate.expiresAt ? (
          <div><dt>{t('Expires')}</dt><dd>{formatBankingDate(mandate.expiresAt.slice(0, 10))}</dd></div>
        ) : null}
      </dl>
    </section>
  );
}

export type DoctorBalancePageProps = {
  data: DoctorBankingFixture;
  state?: DoctorBankingViewState;
  onManageAutoPay?: () => void;
  onOpenLicence?: () => void;
  onOpenStatements?: () => void;
  onRetry?: () => void;
  onSettle?: () => void;
};

export function DoctorBalancePage({
  data,
  onManageAutoPay,
  onOpenLicence,
  onOpenStatements,
  onRetry,
  onSettle,
  state = 'ready',
}: DoctorBalancePageProps) {
  const t = useT();
  return (
    <WorkspacePage>
      <PageHeader
        actions={
          state === 'ready' ? (
            <Button onClick={onOpenStatements} variant="secondary">{t('Activity & statements')}</Button>
          ) : undefined
        }
        title={BALANCE}
      />
      {state !== 'ready' ? <PageState onOpenLicence={onOpenLicence} onRetry={onRetry} state={state} /> : (
        <div className={styles.pageFlow}>
          {data.overview.licence === 'lapsed' ? (
            <LicenceLapsedNotice onOpenLicence={onOpenLicence} />
          ) : null}
          <EarningsHero overview={data.overview} />
          <BalanceSummary onSettle={onSettle} overview={data.overview} />
          <InProgress overview={data.overview} />
          <NextStep notifications={data.notifications} overview={data.overview} />
          <AutoPaySummary mandate={data.overview.mandate} onManageAutoPay={onManageAutoPay} />
          <ActivityLedger entries={data.entries} onViewAll={onOpenStatements} variant="recent" />
        </div>
      )}
    </WorkspacePage>
  );
}

export type DoctorStatementsPageProps = {
  data: DoctorBankingFixture;
  downloadState?: 'idle' | 'loading' | 'success' | 'error';
  state?: DoctorBankingViewState;
  /** The active filter travels with the export so the file matches the screen. */
  onDownload?: (format: 'pdf' | 'xlsx', query: ActivityQuery) => void;
  onBack?: () => void;
  onOpenLicence?: () => void;
  onRetry?: () => void;
};

export function DoctorStatementsPage({
  data,
  downloadState = 'idle',
  onBack,
  onDownload,
  onOpenLicence,
  onRetry,
  state = 'ready',
}: DoctorStatementsPageProps) {
  const t = useT();
  const [query, setQuery] = useState<ActivityQuery>(EMPTY_ACTIVITY_QUERY);
  const rangeError = statementRangeError(query);
  const visible = filterLedgerEntries(data.entries, query);
  const filtered = isActivityQueryFiltered(query);

  return (
    <WorkspacePage>
      <PageHeader
        actions={
          state === 'ready' ? (
            <>
              <Button
                disabled={Boolean(rangeError)}
                leadingIcon={<DownloadIcon aria-hidden="true" />}
                loading={downloadState === 'loading'}
                onClick={() => onDownload?.('pdf', query)}
                variant="secondary"
              >
                PDF
              </Button>
              <Button
                disabled={Boolean(rangeError)}
                leadingIcon={<DownloadIcon aria-hidden="true" />}
                loading={downloadState === 'loading'}
                onClick={() => onDownload?.('xlsx', query)}
              >
                Excel
              </Button>
            </>
          ) : undefined
        }
        onBack={onBack}
        title="Activity & statements"
      />
      {state !== 'ready' ? <PageState onOpenLicence={onOpenLicence} onRetry={onRetry} state={state} /> : (
        <div className={styles.pageFlow}>
          {rangeError ? (
            <Alert tone="danger">
              <AlertTitle>{t('Date range is backwards')}</AlertTitle>
              <AlertDescription>{t('The From date is after the To date, so no statement can be produced.')}</AlertDescription>
            </Alert>
          ) : null}
          {downloadState === 'error' ? (
            <Alert tone="danger"><AlertTitle>{t('Statement download failed')}</AlertTitle><AlertDescription>{t('No file was saved. Check the date range and try again.')}</AlertDescription></Alert>
          ) : null}
          {downloadState === 'success' ? (
            <Alert tone="success"><AlertTitle>{t('Statement ready')}</AlertTitle><AlertDescription>{t('The download covers exactly the activity shown below.')}</AlertDescription></Alert>
          ) : null}
          <ActivityLedger
            description={
              filtered
                ? `${t('Downloads cover the')} ${visible.length} ${t('filtered activities shown.')}`
                : undefined
            }
            entries={data.entries}
            onQueryChange={setQuery}
          />
          <FinancialNotifications notifications={data.notifications} />
        </div>
      )}
    </WorkspacePage>
  );
}

export type DoctorSettlePageProps = {
  overview: DoctorBankingOverview;
  intent?: KhqrIntent | null;
  state?: DoctorBankingViewState;
  onBack?: () => void;
  onCreateKhqr?: () => void;
  onOpenLicence?: () => void;
  onRegenerate?: () => void;
  onRefresh?: () => void;
  onRetry?: () => void;
};

function SettlementConfirmed({
  intent,
  onBack,
}: {
  intent: KhqrIntent;
  onBack?: () => void;
}) {
  const t = useT();
  const overpaid =
    intent.balanceAfter !== null && balanceDirection(intent.balanceAfter.minor) === 'kura-owes';
  return (
    <section aria-labelledby="settlement-confirmed-title" className={styles.section}>
      <Alert tone="success">
        <AlertTitle id="settlement-confirmed-title">{t('Payment confirmed')}</AlertTitle>
        <AlertDescription>
          {overpaid
            ? t('You paid more than you owed. The extra amount is now credit on your balance.')
            : t('The provider confirmed this payment and it is already on your ledger.')}
        </AlertDescription>
      </Alert>
      <dl className={styles.inlineFacts}>
        <div><dt>{t('Amount received')}</dt><dd><AmountText value={intent.amount} /></dd></div>
        {intent.balanceAfter ? (
          <div>
            <dt>{t('Balance after payment')}</dt>
            <dd><SignedMoneyText value={intent.balanceAfter} /></dd>
          </div>
        ) : null}
        {intent.receiptRef ? (
          <div><dt>{t('Receipt')}</dt><dd>{intent.receiptRef}</dd></div>
        ) : null}
      </dl>
      <p className={styles.quietCopy}>
        {t('A matching entry is now in Activity & statements.')}
      </p>
      <div className={styles.objectActions}>
        <Button onClick={onBack}>{t('Back to Balance')}</Button>
      </div>
    </section>
  );
}

export function DoctorSettlePage({
  intent,
  onBack,
  onCreateKhqr,
  onOpenLicence,
  onRefresh,
  onRegenerate,
  onRetry,
  overview,
  state = 'ready',
}: DoctorSettlePageProps) {
  const t = useT();
  const direction = balanceDirection(overview.settledBalance.minor);
  const shortfall = intent?.purpose === 'pending_shortfall';

  return (
    <WorkspacePage width="reading">
      <PageHeader
        description="Pay the exact amount you owe from any KHQR bank app. The amount cannot be edited."
        onBack={onBack}
        title="Settle now"
      />
      {state !== 'ready' ? <PageState onOpenLicence={onOpenLicence} onRetry={onRetry} state={state} /> : direction === 'unavailable' && !shortfall ? (
        <Alert tone="danger"><AlertTitle>{t('Amount unavailable')}</AlertTitle><AlertDescription>{t('The balance cannot be displayed safely, so no KHQR code was created.')}</AlertDescription></Alert>
      ) : direction !== 'doctor-owes' && !shortfall ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader><EmptyStateTitle>{t('Nothing to settle')}</EmptyStateTitle><EmptyStateDescription>{t('You do not owe Kura anything, so no payment is needed.')}</EmptyStateDescription></EmptyStateHeader>
          <EmptyStateContent><Button onClick={onBack} variant="secondary">{t('Back to Balance')}</Button></EmptyStateContent>
        </EmptyState>
      ) : !intent ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader><EmptyStateTitle>{t('Create your payment code')}</EmptyStateTitle><EmptyStateDescription>{t('The code requests exactly')} <SignedMoneyText value={overview.settledBalance} />. {t('It cannot be edited or reused after it expires.')}</EmptyStateDescription></EmptyStateHeader>
          <EmptyStateContent><Button leadingIcon={<QrCodeIcon aria-hidden="true" />} onClick={onCreateKhqr}>{t('Create payment code')}</Button></EmptyStateContent>
        </EmptyState>
      ) : intent.state === 'expired' ? (
        <Alert tone="warning"><AlertTitle>{t('Payment code expired')}</AlertTitle><AlertDescription>{t('No payment was confirmed. Create a new code for the same verified amount.')}</AlertDescription><AlertAction><Button onClick={onRegenerate} variant="outline">{t('Create a new code')}</Button></AlertAction></Alert>
      ) : intent.state === 'confirmed' ? (
        <SettlementConfirmed intent={intent} onBack={onBack} />
      ) : (
        <section aria-labelledby="khqr-title" className={styles.settlementObject}>
          <div className={styles.qrObject} aria-label={t('KHQR payment code')} role="img"><QrCodeIcon aria-hidden="true" size={120} /></div>
          <div className={styles.settlementDetails}>
            <Badge variant="warning">{t('Waiting for your bank')}</Badge>
            <h2 className={styles.objectTitle} id="khqr-title">
              {shortfall ? t('Pay the order shortfall') : t('Pay the exact amount')}
            </h2>
            <AmountText className={styles.settlementAmount} value={intent.amount} />
            <p className={styles.objectDescription}>{t('Scan with any KHQR bank app. Kura waits for the provider to confirm.')}</p>
            <p className={styles.quietCopy}>{t('Expires')} {formatBankingDateTime(intent.expiresAt)}</p>
            <Button leadingIcon={<RefreshIcon aria-hidden="true" />} onClick={onRefresh} variant="secondary">{t('Check for payment')}</Button>
          </div>
        </section>
      )}
    </WorkspacePage>
  );
}

export type DoctorPaymentsPageProps = {
  mandate: MandateSummary;
  licence?: DoctorBankingOverview['licence'];
  /** Shown on unlink so the doctor knows what stays owed after auto-pay stops. */
  remainingBalance?: DoctorBankingOverview['settledBalance'];
  linkSession?: MandateLinkSession | null;
  state?: DoctorBankingViewState;
  onBack?: () => void;
  onBeginLink?: () => void;
  onOpenLicence?: () => void;
  onRegenerateLink?: () => void;
  onRenew?: () => void;
  onRetry?: () => void;
  onUnlink?: () => void;
};

export function DoctorPaymentsPage({
  licence = 'verified',
  linkSession,
  mandate,
  onBack,
  onBeginLink,
  onOpenLicence,
  onRegenerateLink,
  onRenew,
  onRetry,
  onUnlink,
  remainingBalance,
  state = 'ready',
}: DoctorPaymentsPageProps) {
  const t = useT();
  const capabilities = mandateCapabilities(mandate.state, licence);
  return (
    <WorkspacePage width="reading">
      <PageHeader
        description="Auto-pay is optional. KHQR always works, with or without it."
        onBack={onBack}
        title="Auto-pay"
      />
      {state !== 'ready' ? <PageState onOpenLicence={onOpenLicence} onRetry={onRetry} state={state} /> : (
        <div className={styles.narrowFlow}>
          {capabilities.linkBlockedByLicence ? (
            <Alert tone="warning">
              <AlertTitle>{t('You cannot link a new account right now')}</AlertTitle>
              <AlertDescription>
                {t('Your medical licence has lapsed. Settling by KHQR still works.')}
              </AlertDescription>
              {onOpenLicence ? (
                <AlertAction>
                  <Button onClick={onOpenLicence} variant="outline">{t('Manage licence')}</Button>
                </AlertAction>
              ) : null}
            </Alert>
          ) : null}
          <MandatePanel
            capabilities={capabilities}
            linkSession={linkSession}
            mandate={mandate}
            onBeginLink={onBeginLink}
            onRegenerateLink={onRegenerateLink}
            onRenew={onRenew}
            onUnlink={onUnlink}
            remainingBalance={remainingBalance}
          />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('What Kura stores')}</h2>
            <p className={styles.sectionDescription}>
              {t('A provider token, masked account, authorization state, and lifecycle timestamps. Kura never asks for or stores your ABA PIN or full account number.')}
            </p>
          </section>
        </div>
      )}
    </WorkspacePage>
  );
}
