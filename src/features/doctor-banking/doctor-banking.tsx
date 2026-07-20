'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  ArrowLeftIcon,
  Badge,
  Button,
  DownloadIcon,
  QrCodeIcon,
  RefreshIcon,
  Skeleton,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';

import { ActivityLedger } from './activity-ledger';
import { balanceDirection, formatBankingDate, formatBankingDateTime } from './logic';
import { MANDATE_COPY, MandatePanel } from './mandate-panel';
import { AmountText, SignedMoneyText } from './money';
import type {
  DoctorBankingFixture,
  DoctorBankingOverview,
  DoctorBankingViewState,
  DoctorFinancialNotification,
  KhqrIntent,
  MandateLinkSession,
  MandateSummary,
} from './types';
import styles from './doctor-banking.module.css';

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
  return (
    <header className={styles.pageHeader}>
      <div className={styles.pageHeading}>
        {onBack ? (
          <Button
            className={styles.backAction}
            leadingIcon={<ArrowLeftIcon aria-hidden="true" />}
            onClick={onBack}
            size="sm"
            variant="link"
          >
            Earnings
          </Button>
        ) : null}
        <h1 className={styles.pageTitle}>{title}</h1>
        {description ? <p className={styles.pageDescription}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.pageActions}>{actions}</div> : null}
    </header>
  );
}

function PageState({
  onRetry,
  state,
}: {
  onRetry?: () => void;
  state: Exclude<DoctorBankingViewState, 'ready'>;
}) {
  if (state === 'loading') {
    return (
      <section aria-label="Loading earnings" className={styles.loadingStack} role="status">
        <span className={styles.srOnly}>Loading earnings</span>
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
          <EmptyStateTitle>Earnings access denied</EmptyStateTitle>
          <EmptyStateDescription>
            This ledger is person-owned. Delegated users cannot view balances, debt, mandate details, or payment codes.
          </EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    );
  }

  return (
    <Alert tone="danger">
      <AlertTitle>Earnings unavailable</AlertTitle>
      <AlertDescription>
        Current amounts could not be verified. No balance or payment action is shown.
      </AlertDescription>
      {onRetry ? (
        <AlertAction><Button onClick={onRetry} variant="outline">Try again</Button></AlertAction>
      ) : null}
    </Alert>
  );
}

function BalanceCard({
  onSettle,
  overview,
}: {
  onSettle?: () => void;
  overview: DoctorBankingOverview;
}) {
  const direction = balanceDirection(overview.settledBalance.minor);
  const balanceLabel =
    direction === 'doctor-owes'
      ? 'You owe Kura'
      : direction === 'kura-owes'
        ? 'Kura owes you'
        : direction === 'settled'
          ? 'Settled balance'
          : 'Balance unavailable';
  const tone =
    direction === 'doctor-owes'
      ? 'danger'
      : direction === 'kura-owes'
        ? 'positive'
        : 'neutral';

  return (
    <section aria-labelledby="balance-summary-title" className={styles.balanceCard} data-tone={tone}>
      <div className={styles.balanceMain}>
        <p className={styles.metricLabel} id="balance-summary-title">{balanceLabel}</p>
        <SignedMoneyText announceDirection className={styles.balanceValue} value={overview.settledBalance} />
        <p className={styles.metricHelp}>
          Credit floor <SignedMoneyText value={overview.creditFloor} /> · current exposure{' '}
          <SignedMoneyText value={overview.exposure} />
        </p>
      </div>
      {direction === 'doctor-owes' ? (
        <div className={styles.balanceAction}>
          <Button onClick={onSettle}>Settle now</Button>
        </div>
      ) : null}
    </section>
  );
}

function PeriodStats({ overview }: { overview: DoctorBankingOverview }) {
  return (
    <section aria-label="This period" className={styles.periodStats}>
      <dl className={styles.statStrip}>
        <div>
          <dt>Earned this period</dt>
          <dd><AmountText value={overview.earnedThisPeriod} /></dd>
        </div>
        <div><dt>Pending earnings</dt><dd><AmountText value={overview.pendingCredit} /></dd></div>
        <div><dt>Pending charges</dt><dd><AmountText value={overview.pendingDebit} /></dd></div>
        <div><dt>Reserved</dt><dd><AmountText value={overview.reservedDebit} /></dd></div>
      </dl>
      <p className={styles.statNote}>
        Earned includes settled and pending earnings across your Kura workspaces. Pending and reserved
        amounts do not change the settled balance yet.
      </p>
    </section>
  );
}

function CollectionsSection({
  onManageAutoPay,
  overview,
}: {
  onManageAutoPay?: () => void;
  overview: DoctorBankingOverview;
}) {
  const { mandate, nextSweep } = overview;
  return (
    <section aria-labelledby="collections-title" className={styles.section}>
      <header className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle} id="collections-title">Scheduled collections</h2>
          <p className={styles.sectionDescription}>
            Kura collects owed balances on the 1st and 15th after the required notice.
          </p>
        </div>
        <Button onClick={onManageAutoPay} size="sm" variant="ghost">Manage auto-pay</Button>
      </header>
      <dl className={styles.collectionFacts}>
        {nextSweep ? (
          <>
            <div><dt>Next sweep</dt><dd>{formatBankingDate(nextSweep.date)}</dd></div>
            <div><dt>Maximum</dt><dd><AmountText value={nextSweep.maximumAmount} /></dd></div>
            <div>
              <dt>Notice</dt>
              <dd>{nextSweep.noticeState === 'sent' ? 'Sent' : nextSweep.noticeState === 'due' ? 'Due' : 'Not due'}</dd>
            </div>
          </>
        ) : (
          <div><dt>Next sweep</dt><dd>None scheduled</dd></div>
        )}
        <div>
          <dt>Auto-pay</dt>
          <dd>
            {MANDATE_COPY[mandate.state].label}
            {mandate.maskedAccount ? ` · ${mandate.maskedAccount}` : ''}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export type DoctorBalancePageProps = {
  data: DoctorBankingFixture;
  state?: DoctorBankingViewState;
  onManageAutoPay?: () => void;
  onOpenStatements?: () => void;
  onRetry?: () => void;
  onSettle?: () => void;
};

export function DoctorBalancePage({
  data,
  onManageAutoPay,
  onOpenStatements,
  onRetry,
  onSettle,
  state = 'ready',
}: DoctorBalancePageProps) {
  return (
    <main className={styles.page}>
      <PageHeader
        actions={<Button onClick={onOpenStatements} variant="secondary">Activity &amp; statements</Button>}
        title="Earnings"
      />
      {state !== 'ready' ? <PageState onRetry={onRetry} state={state} /> : (
        <div className={styles.pageFlow}>
          <BalanceCard onSettle={onSettle} overview={data.overview} />
          <PeriodStats overview={data.overview} />
          <CollectionsSection onManageAutoPay={onManageAutoPay} overview={data.overview} />
          <ActivityLedger entries={data.entries} onViewAll={onOpenStatements} variant="recent" />
        </div>
      )}
    </main>
  );
}

function notificationCopy(notification: DoctorFinancialNotification): {
  title: string;
  detail: string;
  tone: 'info' | 'warning' | 'success' | 'danger';
} {
  switch (notification.kind) {
    case 'pre_notice':
      return {
        title: `Sweep notice for ${formatBankingDate(notification.sweepDate)}`,
        detail: `Maximum ${notification.originalCap.minor === notification.remainingCap.minor ? 'remains' : 'reduced to'} $${(Number(notification.remainingCap.minor) / 100).toFixed(2)}.`,
        tone: notification.state === 'expired' ? 'warning' : 'info',
      };
    case 'receipt': {
      const sourceLabels: Record<typeof notification.source, string> = {
        khqr: 'KHQR payment',
        scheduled: 'Scheduled collection',
        scheduled_retry: 'Collection retry',
        admin_retry: 'Collection retry',
        jit: 'Automatic collection',
        final_unlink: 'Final collection',
      };
      return {
        title: 'Payment receipt',
        detail: `${sourceLabels[notification.source]} applied to the ledger.`,
        tone: 'success' as const,
      };
    }
    case 'pull_failed':
      return { title: 'Collection attempt failed', detail: notification.failureReason, tone: 'danger' as const };
    case 'mandate':
      return { title: `ABA authorization ${notification.event.replaceAll('_', ' ')}`, detail: notification.maskedAccount ?? 'No account is linked.', tone: notification.event === 'linked' ? 'success' as const : 'warning' as const };
    case 'adjustment':
      return { title: 'Ledger adjustment recorded', detail: notification.reason, tone: 'info' as const };
  }
}

function FinancialNotifications({ notifications }: { notifications: DoctorFinancialNotification[] }) {
  return (
    <section aria-labelledby="financial-notifications-title" className={styles.section}>
      <header className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle} id="financial-notifications-title">Financial notifications</h2>
          <p className={styles.sectionDescription}>Only doctor-audience notices and receipts appear here.</p>
        </div>
      </header>
      {notifications.length === 0 ? (
        <p className={styles.quietCopy}>No financial notifications.</p>
      ) : (
        <ol className={styles.notificationList}>
          {notifications.map((notification) => {
            const copy = notificationCopy(notification);
            return (
              <li className={styles.notificationItem} key={notification.notificationRef}>
                <div>
                  <span className={styles.notificationTitle} data-tone={copy.tone}>{copy.title}</span>
                  <p className={styles.notificationDetail}>{copy.detail}</p>
                </div>
                <time className={styles.notificationTime} dateTime={notification.occurredAt}>
                  {formatBankingDateTime(notification.occurredAt)}
                </time>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

export type DoctorStatementsPageProps = {
  data: DoctorBankingFixture;
  downloadState?: 'idle' | 'loading' | 'success' | 'error';
  state?: DoctorBankingViewState;
  onDownload?: (format: 'pdf' | 'xlsx') => void;
  onBack?: () => void;
  onRetry?: () => void;
};

export function DoctorStatementsPage({
  data,
  downloadState = 'idle',
  onBack,
  onDownload,
  onRetry,
  state = 'ready',
}: DoctorStatementsPageProps) {
  return (
    <main className={styles.page}>
      <PageHeader
        actions={
          <>
            <Button leadingIcon={<DownloadIcon aria-hidden="true" />} loading={downloadState === 'loading'} onClick={() => onDownload?.('pdf')} variant="secondary">PDF</Button>
            <Button leadingIcon={<DownloadIcon aria-hidden="true" />} loading={downloadState === 'loading'} onClick={() => onDownload?.('xlsx')}>Excel</Button>
          </>
        }
        onBack={onBack}
        title="Activity & statements"
      />
      {state !== 'ready' ? <PageState onRetry={onRetry} state={state} /> : (
        <div className={styles.pageFlow}>
          {downloadState === 'error' ? (
            <Alert tone="danger"><AlertTitle>Statement download failed</AlertTitle><AlertDescription>No file was saved. Check the date range and try again.</AlertDescription></Alert>
          ) : null}
          {downloadState === 'success' ? (
            <Alert tone="success"><AlertTitle>Statement ready</AlertTitle><AlertDescription>The filtered statement download has started.</AlertDescription></Alert>
          ) : null}
          <ActivityLedger entries={data.entries} />
          <FinancialNotifications notifications={data.notifications} />
        </div>
      )}
    </main>
  );
}

export type DoctorSettlePageProps = {
  overview: DoctorBankingOverview;
  intent?: KhqrIntent | null;
  state?: DoctorBankingViewState;
  onBack?: () => void;
  onCreateKhqr?: () => void;
  onRegenerate?: () => void;
  onRefresh?: () => void;
  onRetry?: () => void;
};

export function DoctorSettlePage({
  intent,
  onBack,
  onCreateKhqr,
  onRefresh,
  onRegenerate,
  onRetry,
  overview,
  state = 'ready',
}: DoctorSettlePageProps) {
  const direction = balanceDirection(overview.settledBalance.minor);
  return (
    <main className={styles.page}>
      <PageHeader
        description="Pay the exact settled amount you owe from any KHQR-enabled bank app."
        onBack={onBack}
        title="Settle balance"
      />
      {state !== 'ready' ? <PageState onRetry={onRetry} state={state} /> : direction === 'unavailable' ? (
        <Alert tone="danger"><AlertTitle>Amount unavailable</AlertTitle><AlertDescription>The balance cannot be displayed safely, so no KHQR code was created.</AlertDescription></Alert>
      ) : direction !== 'doctor-owes' ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader><EmptyStateTitle>Nothing to settle</EmptyStateTitle><EmptyStateDescription>Your settled balance is not red, so no KHQR payment is needed.</EmptyStateDescription></EmptyStateHeader>
        </EmptyState>
      ) : !intent ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader><EmptyStateTitle>Ready to create exact KHQR</EmptyStateTitle><EmptyStateDescription>The code will request exactly <SignedMoneyText value={overview.settledBalance} />. It cannot be edited or reused after expiry.</EmptyStateDescription></EmptyStateHeader>
          <EmptyStateContent><Button leadingIcon={<QrCodeIcon aria-hidden="true" />} onClick={onCreateKhqr}>Create exact KHQR</Button></EmptyStateContent>
        </EmptyState>
      ) : intent.state === 'expired' ? (
        <Alert tone="warning"><AlertTitle>KHQR code expired</AlertTitle><AlertDescription>No payment was confirmed. Create a new code for the same verified amount.</AlertDescription><AlertAction><Button onClick={onRegenerate} variant="outline">Create new KHQR</Button></AlertAction></Alert>
      ) : intent.state === 'confirmed' ? (
        <Alert tone="success"><AlertTitle>Settlement confirmed</AlertTitle><AlertDescription><AmountText value={intent.amount} /> was confirmed by the provider and applied to the ledger.</AlertDescription></Alert>
      ) : (
        <section aria-labelledby="khqr-title" className={styles.settlementObject}>
          <div className={styles.qrObject} aria-label="KHQR settlement code" role="img"><QrCodeIcon aria-hidden="true" size={120} /></div>
          <div className={styles.settlementDetails}>
            <Badge variant="warning">Awaiting confirmation</Badge>
            <h2 className={styles.objectTitle} id="khqr-title">Pay the exact amount</h2>
            <AmountText className={styles.settlementAmount} value={intent.amount} />
            <p className={styles.objectDescription}>Scan with any KHQR-enabled bank app. Kura will wait for provider confirmation.</p>
            <p className={styles.quietCopy}>Expires {formatBankingDateTime(intent.expiresAt)}</p>
            <Button leadingIcon={<RefreshIcon aria-hidden="true" />} onClick={onRefresh} variant="secondary">Check confirmation</Button>
          </div>
        </section>
      )}
    </main>
  );
}

export type DoctorPaymentsPageProps = {
  mandate: MandateSummary;
  linkSession?: MandateLinkSession | null;
  state?: DoctorBankingViewState;
  onBack?: () => void;
  onBeginLink?: () => void;
  onRegenerateLink?: () => void;
  onRenew?: () => void;
  onRetry?: () => void;
  onUnlink?: () => void;
};

export function DoctorPaymentsPage({
  linkSession,
  mandate,
  onBack,
  onBeginLink,
  onRegenerateLink,
  onRenew,
  onRetry,
  onUnlink,
  state = 'ready',
}: DoctorPaymentsPageProps) {
  return (
    <main className={styles.page}>
      <PageHeader
        description="Manage the optional ABA authorization used for scheduled collections. KHQR remains available when auto-pay is off."
        onBack={onBack}
        title="Auto-pay"
      />
      {state !== 'ready' ? <PageState onRetry={onRetry} state={state} /> : (
        <div className={styles.narrowFlow}>
          <MandatePanel
            linkSession={linkSession}
            mandate={mandate}
            onBeginLink={onBeginLink}
            onRegenerateLink={onRegenerateLink}
            onRenew={onRenew}
            onUnlink={onUnlink}
          />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Kura stores</h2>
            <p className={styles.sectionDescription}>
              A provider token, masked account, authorization state, and lifecycle timestamps. Kura never asks for or stores your ABA PIN or full account number.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
