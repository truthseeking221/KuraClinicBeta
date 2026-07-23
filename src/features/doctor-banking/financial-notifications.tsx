'use client';

import { Badge } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import type { Translate } from '../../components/foundations/i18n';

import { formatBankingDate, formatBankingDateTime } from './logic';
import { AmountText, SignedMoneyText } from './money';
import type {
  DoctorFinancialNotification,
  NotificationChannel,
  NotificationChannelState,
  NotificationDelivery,
  PullTrigger,
} from './types';
import styles from './doctor-banking.module.css';

/** English stays the stable dictionary key; each render site passes it through `t`. */
const RECEIPT_SOURCE: Record<'khqr' | PullTrigger, string> = {
  khqr: 'KHQR payment',
  scheduled: 'Scheduled collection',
  scheduled_retry: 'Collection retry',
  admin_retry: 'Collection retry by Kura',
  jit: 'Collection while ordering',
  final_unlink: 'Final collection before unlink',
};

const PRE_NOTICE_STATE: Record<
  Extract<DoctorFinancialNotification, { kind: 'pre_notice' }>['state'],
  { label: string; variant: 'neutral' | 'info' | 'warning' | 'success' }
> = {
  pending_record: { label: 'Not sent yet', variant: 'neutral' },
  sent: { label: 'Sent', variant: 'info' },
  partly_collected: { label: 'Partly collected', variant: 'warning' },
  collected: { label: 'Fully collected', variant: 'success' },
  expired: { label: 'Expired uncollected', variant: 'warning' },
};

const MANDATE_EVENT: Record<
  Extract<DoctorFinancialNotification, { kind: 'mandate' }>['event'],
  string
> = {
  linked: 'ABA authorization linked',
  renewal_required: 'ABA authorization needs renewal',
  expired: 'ABA authorization expired',
  unlinked: 'ABA authorization unlinked',
};

const RETRY_STATE: Record<
  Extract<DoctorFinancialNotification, { kind: 'pull_failed' }>['retryState'],
  string
> = {
  retry_pending: 'Retry scheduled',
  retries_exhausted: 'No retries left',
  not_retryable: 'Cannot be retried',
};

const CHANNEL: Record<NotificationChannel, string> = {
  in_app: 'In-app',
  sms: 'SMS',
  email: 'Email',
};

const CHANNEL_STATE: Record<NotificationChannelState, string> = {
  accepted: 'delivered',
  pending: 'sending',
  failed: 'failed',
};

function nextActionCopy(
  notification: Extract<DoctorFinancialNotification, { kind: 'pull_failed' }>,
  t: Translate,
) {
  switch (notification.nextAction) {
    case 'retry_tomorrow':
      return notification.retryDate
        ? `${t('We will retry on')} ${formatBankingDate(notification.retryDate)}`
        : t('We will retry on the next eligible day');
    case 'settle_now':
      return t('Settle with KHQR');
    case 'relink':
      return t('Link ABA again to restore scheduled collections');
    case 'wait_next_sweep':
      return t('We will wait until the next sweep');
  }
}

function Facts({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className={styles.notificationFacts}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Delivery is part of the money record: a notice nobody received is not a notice. */
function Channels({ channels }: { channels: NotificationDelivery[] }) {
  const t = useT();
  if (channels.length === 0) return null;
  const summary = channels
    .map((delivery) => `${t(CHANNEL[delivery.channel])} ${t(CHANNEL_STATE[delivery.state])}`)
    .join(' · ');
  const failed = channels.some((delivery) => delivery.state === 'failed');
  return (
    <p className={styles.notificationChannels} data-tone={failed ? 'warning' : undefined}>
      {summary}
    </p>
  );
}

type NotificationView = {
  title: string;
  tone: 'info' | 'warning' | 'success' | 'danger';
  badge?: { label: string; variant: 'neutral' | 'info' | 'warning' | 'success' | 'danger' };
  detail?: string;
  facts: { label: string; value: React.ReactNode }[];
};

function notificationView(
  notification: DoctorFinancialNotification,
  t: Translate,
): NotificationView {
  switch (notification.kind) {
    case 'pre_notice': {
      const state = PRE_NOTICE_STATE[notification.state];
      const reduced = notification.originalCap.minor !== notification.remainingCap.minor;
      return {
        title: `${t('Collection notice for')} ${formatBankingDate(notification.sweepDate)}`,
        tone: notification.state === 'expired' ? 'warning' : 'info',
        badge: { label: t(state.label), variant: state.variant },
        detail: reduced
          ? t('Your payment lowered the amount Kura will collect.')
          : undefined,
        facts: reduced
          ? [
              { label: t('Noticed'), value: <AmountText value={notification.originalCap} /> },
              {
                label: t('Kura will collect up to'),
                value: <AmountText value={notification.remainingCap} />,
              },
            ]
          : [
              {
                label: t('Kura will collect up to'),
                value: <AmountText value={notification.remainingCap} />,
              },
            ],
      };
    }
    case 'receipt':
      return {
        title: t('Payment received'),
        tone: 'success',
        facts: [
          { label: t('Amount'), value: <AmountText value={notification.amount} /> },
          {
            label: t('Balance after'),
            value: <SignedMoneyText value={notification.balanceAfter} />,
          },
          { label: t('Source'), value: t(RECEIPT_SOURCE[notification.source]) },
          { label: t('Receipt'), value: notification.receiptRef },
        ],
      };
    case 'pull_failed':
      return {
        title: t('Collection attempt failed'),
        tone: 'danger',
        badge: { label: t(RETRY_STATE[notification.retryState]), variant: 'danger' },
        detail: notification.failureReason,
        facts: [
          { label: t('Amount'), value: <AmountText value={notification.amount} /> },
          {
            label: t('Attempt'),
            value: notification.retrySlot
              ? `${notification.retrySlot} ${t('of 3')}`
              : t('First attempt'),
          },
          { label: t('What happens next'), value: nextActionCopy(notification, t) },
        ],
      };
    case 'mandate': {
      const facts: { label: string; value: React.ReactNode }[] = [];
      if (notification.maskedAccount) {
        facts.push({ label: t('Account'), value: notification.maskedAccount });
      }
      if (notification.expiresAt) {
        facts.push({
          label: t('Expires'),
          value: formatBankingDateTime(notification.expiresAt),
        });
      }
      if (notification.connectCredit) {
        facts.push({
          label: t('First-link credit'),
          value: <AmountText value={notification.connectCredit} />,
        });
      }
      if (notification.remainingBalance) {
        facts.push({
          label: t('Balance still owed'),
          value: <SignedMoneyText value={notification.remainingBalance} />,
        });
      }
      return {
        title: t(MANDATE_EVENT[notification.event]),
        tone: notification.event === 'linked' ? 'success' : 'warning',
        facts,
      };
    }
    case 'adjustment':
      return {
        title: t('Ledger adjustment recorded'),
        tone: 'info',
        detail: notification.reason,
        facts: [
          { label: t('Amount'), value: <SignedMoneyText value={notification.amount} /> },
          { label: t('Ledger entry'), value: notification.entryRef },
        ],
      };
  }
}

export type FinancialNotificationsProps = {
  notifications: DoctorFinancialNotification[];
};

export function FinancialNotifications({ notifications }: FinancialNotificationsProps) {
  const t = useT();
  return (
    <section aria-labelledby="financial-notifications-title" className={styles.section}>
      <header className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle} id="financial-notifications-title">
            {t('Notices and receipts')}
          </h2>
          <p className={styles.sectionDescription}>
            {t('Only notices and receipts addressed to you appear here.')}
          </p>
        </div>
      </header>
      {notifications.length === 0 ? (
        <p className={styles.quietCopy}>{t('No notices or receipts yet.')}</p>
      ) : (
        <ol className={styles.notificationList}>
          {[...notifications]
            .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
            .map((notification) => {
              const view = notificationView(notification, t);
              return (
                <li className={styles.notificationItem} key={notification.notificationRef}>
                  <div className={styles.notificationBody}>
                    <div className={styles.notificationHeading}>
                      <span className={styles.notificationTitle} data-tone={view.tone}>
                        {view.title}
                      </span>
                      {view.badge ? (
                        <Badge variant={view.badge.variant}>{view.badge.label}</Badge>
                      ) : null}
                    </div>
                    {view.detail ? (
                      <p className={styles.notificationDetail}>{view.detail}</p>
                    ) : null}
                    {view.facts.length > 0 ? <Facts items={view.facts} /> : null}
                    <Channels channels={notification.channels} />
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
