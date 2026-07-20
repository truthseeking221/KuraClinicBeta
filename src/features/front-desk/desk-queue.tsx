'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  RefreshIcon,
  Skeleton,
  UserAddIcon,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';

import { deskNextAction, orderDeskVisits, waitTone } from './logic';
import type { DeskQueueState, DeskVisit, VisitPaymentFact, VisitStage } from './types';
import styles from './desk-queue.module.css';

const STAGE_META: Record<VisitStage, { label: string; variant: 'info' | 'success' | 'neutral' }> = {
  arrived: { label: 'Checking in', variant: 'info' },
  'identity-resolved': { label: 'Identity resolved', variant: 'success' },
  'draw-complete': { label: 'Draw complete', variant: 'neutral' },
  completed: { label: 'Completed', variant: 'neutral' },
};

const PAYMENT_META: Record<
  VisitPaymentFact,
  { label: string; variant: 'neutral' | 'success' | 'warning' }
> = {
  pending: { label: 'Payment pending', variant: 'neutral' },
  collected: { label: 'Paid', variant: 'success' },
  deferred: { label: 'Pay later', variant: 'warning' },
  waiting: { label: 'KHQR waiting', variant: 'warning' },
};

export type DeskQueueProps = {
  visits: DeskVisit[];
  state?: DeskQueueState;
  /** Shown with stale/offline states: when the list was last synced. */
  asOf?: string;
  onResumeVisit?: (visitId: string) => void;
  onQueueForDraw?: (visitId: string) => void;
  onNewWalkIn?: () => void;
  onRetry?: () => void;
  onRefresh?: () => void;
};

/**
 * Desk arrivals queue (journeys REC-01/02/05). Each row states the
 * independent lifecycle facts — visit stage, identity assurance, payment —
 * and offers exactly one next action derived from those axes. Later stages
 * are owned by phlebotomy and the lab; the desk only observes them.
 *
 * PROTOTYPE SURFACE: no queue/visit engine exists in kura-platform today.
 */
export function DeskQueue({
  asOf,
  onNewWalkIn,
  onQueueForDraw,
  onRefresh,
  onResumeVisit,
  onRetry,
  state = 'ready',
  visits,
}: DeskQueueProps) {
  const ordered = orderDeskVisits(visits);
  const active = ordered.filter((visit) => visit.stage !== 'completed');
  const completedCount = visits.length - active.length;

  if (state === 'denied') {
    return (
      <section aria-label="Arrivals" className={styles.queue}>
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>No access to the desk queue</EmptyStateTitle>
            <EmptyStateDescription>
              Your account has no front-desk capability in this workspace. Ask the practice
              owner to grant reception access.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      </section>
    );
  }

  return (
    <section aria-label="Arrivals" className={styles.queue}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Arrivals</h2>
          <p className={styles.subtitle}>
            {state === 'loading'
              ? 'Loading today’s visits…'
              : `${active.length} in progress · ${completedCount} completed today`}
          </p>
        </div>
        {onNewWalkIn ? (
          <Button onClick={onNewWalkIn} variant="primary">
            <UserAddIcon aria-hidden="true" size={16} />
            New walk-in
          </Button>
        ) : null}
      </header>

      {state === 'offline' ? (
        <Alert tone="warning">
          <AlertTitle>You are offline</AlertTitle>
          <AlertDescription>
            Showing the last synced queue{asOf ? ` from ${asOf}` : ''}. Check-ins and payments
            cannot be recorded until the connection returns.
          </AlertDescription>
        </Alert>
      ) : null}

      {state === 'stale' ? (
        <div className={styles.staleRow}>
          <span>Updated {asOf ?? 'earlier'}</span>
          <Button onClick={() => onRefresh?.()} size="sm" variant="ghost">
            <RefreshIcon aria-hidden="true" size={14} />
            Refresh
          </Button>
        </div>
      ) : null}

      {state === 'error' ? (
        <Alert tone="danger">
          <AlertTitle>The queue could not be loaded</AlertTitle>
          <AlertDescription>
            Today’s visits are unavailable. Walk-ins can still be checked in — the queue
            re-syncs when the connection recovers.
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button onClick={onRetry} size="sm" variant="outline">
                Retry
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {state === 'loading' ? (
        <ul aria-label="Loading visits" className={styles.list}>
          {[0, 1, 2].map((row) => (
            <li className={styles.rowStatic} key={row}>
              <Skeleton className={styles.skeletonQueue} shape="text" />
              <div className={styles.rowBody}>
                <Skeleton className={styles.skeletonName} shape="text" />
                <Skeleton className={styles.skeletonMeta} shape="text" />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {state !== 'loading' && state !== 'error' && ordered.length === 0 ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>No arrivals yet</EmptyStateTitle>
            <EmptyStateDescription>
              Visits appear here when a booking is checked in or a walk-in starts.
            </EmptyStateDescription>
          </EmptyStateHeader>
          {onNewWalkIn ? (
            <EmptyStateContent>
              <Button onClick={onNewWalkIn} variant="primary">
                Start a walk-in
              </Button>
            </EmptyStateContent>
          ) : null}
        </EmptyState>
      ) : null}

      {state !== 'loading' && ordered.length > 0 ? (
        <ul aria-label="Today's visits" className={styles.list}>
          {ordered.map((visit) => {
            const action = deskNextAction(visit);
            const tone = waitTone(visit.waitMinutes);
            const stage = STAGE_META[visit.stage];
            const payment = PAYMENT_META[visit.payment];
            const observed = visit.stage === 'draw-complete' || visit.stage === 'completed';

            return (
              <li
                className={observed ? styles.rowObserved : styles.rowStatic}
                data-stage={visit.stage}
                key={visit.id}
              >
                <span className={styles.queueNumber}>#{visit.queueNumber}</span>
                <div className={styles.rowBody}>
                  <div className={styles.nameLine}>
                    <span className={styles.name}>{visit.patientName}</span>
                    {visit.nameKhmer ? (
                      <span className={styles.nameKhmer} lang="km">
                        {visit.nameKhmer}
                      </span>
                    ) : null}
                  </div>
                  <div className={styles.factLine}>
                    <span
                      className={styles.wait}
                      data-tone={tone === 'normal' ? undefined : tone}
                    >
                      Arrived {visit.arrivedLabel} · waiting {visit.waitMinutes}m
                      {tone === 'escalate' ? ' — escalate' : ''}
                    </span>
                  </div>
                </div>
                <div className={styles.facts}>
                  <Badge size="sm" variant={stage.variant}>
                    {stage.label}
                  </Badge>
                  <Badge size="sm" variant={visit.assurance === 'verified' ? 'success' : 'neutral'}>
                    {visit.assurance === 'verified' ? 'ID verified' : 'ID unverified'}
                  </Badge>
                  <Badge size="sm" variant={payment.variant}>
                    {payment.label}
                  </Badge>
                </div>
                {action ? (
                  <Button
                    className={styles.rowAction}
                    onClick={() =>
                      action.kind === 'resume'
                        ? onResumeVisit?.(visit.id)
                        : onQueueForDraw?.(visit.id)
                    }
                    size="sm"
                    variant={action.kind === 'queue-draw' ? 'primary' : 'outline'}
                  >
                    {action.label}
                  </Button>
                ) : (
                  <span className={styles.observedNote}>
                    {visit.stage === 'completed' ? 'Done' : 'With phlebotomy'}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
