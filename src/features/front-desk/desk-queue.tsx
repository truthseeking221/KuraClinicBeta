'use client';

import { Fragment } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
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
import { useT } from '../../components/foundations/i18n';

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
  const t = useT();
  const ordered = orderDeskVisits(visits);
  const active = ordered.filter((visit) => visit.stage !== 'completed');
  const completedCount = visits.length - active.length;

  if (state === 'denied') {
    return (
      <section aria-label={t('Arrivals')} className={styles.queue}>
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>{t('No access to the desk queue')}</EmptyStateTitle>
            <EmptyStateDescription>
              {t(
                'Your account has no front-desk capability in this workspace. Ask the practice owner to grant reception access.',
              )}
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      </section>
    );
  }

  return (
    <section aria-label={t('Arrivals')} className={styles.queue}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{t('Arrivals')}</h2>
          <p className={styles.subtitle}>
            {state === 'loading'
              ? t('Loading today’s visits…')
              : `${active.length} ${t('in progress')} · ${completedCount} ${t('completed today')}`}
          </p>
        </div>
        {onNewWalkIn ? (
          <Button onClick={onNewWalkIn} variant="primary">
            <UserAddIcon aria-hidden="true" size={16} />
            {t('New walk-in')}
          </Button>
        ) : null}
      </header>

      {state === 'offline' ? (
        <Alert tone="warning">
          <AlertTitle>{t('You are offline')}</AlertTitle>
          <AlertDescription>
            {asOf
              ? `${t('Showing the last synced queue from')} ${asOf}.`
              : t('Showing the last synced queue.')}{' '}
            {t('Check-ins and payments cannot be recorded until the connection returns.')}
          </AlertDescription>
        </Alert>
      ) : null}

      {state === 'stale' ? (
        <div className={styles.staleRow}>
          <span>{t('Updated')} {asOf ?? t('earlier')}</span>
          <Button onClick={() => onRefresh?.()} size="sm" variant="ghost">
            <RefreshIcon aria-hidden="true" size={14} />
            {t('Refresh')}
          </Button>
        </div>
      ) : null}

      {state === 'error' ? (
        <Alert tone="danger">
          <AlertTitle>{t('The queue could not be loaded')}</AlertTitle>
          <AlertDescription>
            {t(
              'Today’s visits are unavailable. Walk-ins can still be checked in — the queue re-syncs when the connection recovers.',
            )}
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button onClick={onRetry} size="sm" variant="outline">
                {t('Retry')}
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {state === 'loading' ? (
        <Card className={styles.listSurface} variant="outline">
          <ItemGroup aria-label={t('Loading visits')} role="list">
            {[0, 1, 2].map((row, index) => (
              <Fragment key={row}>
                {index > 0 ? <ItemSeparator aria-hidden="true" /> : null}
                <Item role="listitem" size="sm">
                  <ItemMedia>
                    <Skeleton className={styles.skeletonQueue} shape="text" />
                  </ItemMedia>
                  <ItemContent>
                    <Skeleton className={styles.skeletonName} shape="text" />
                    <Skeleton className={styles.skeletonMeta} shape="text" />
                  </ItemContent>
                </Item>
              </Fragment>
            ))}
          </ItemGroup>
        </Card>
      ) : null}

      {state !== 'loading' && state !== 'error' && ordered.length === 0 ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>{t('No arrivals yet')}</EmptyStateTitle>
            <EmptyStateDescription>
              {t('Visits appear here when a booking is checked in or a walk-in starts.')}
            </EmptyStateDescription>
          </EmptyStateHeader>
          {onNewWalkIn ? (
            <EmptyStateContent>
              <Button onClick={onNewWalkIn} variant="primary">
                {t('Start a walk-in')}
              </Button>
            </EmptyStateContent>
          ) : null}
        </EmptyState>
      ) : null}

      {state !== 'loading' && ordered.length > 0 ? (
        <Card className={styles.listSurface} variant="outline">
          <ItemGroup aria-label={t("Today's visits")} role="list">
            {ordered.map((visit, index) => {
              const action = deskNextAction(visit);
              const tone = waitTone(visit.waitMinutes);
              const stage = STAGE_META[visit.stage];
              const payment = PAYMENT_META[visit.payment];
              const observed = visit.stage === 'draw-complete' || visit.stage === 'completed';

              return (
                <Fragment key={visit.id}>
                  {index > 0 ? <ItemSeparator aria-hidden="true" /> : null}
                  <Item
                    className={observed ? styles.rowObserved : undefined}
                    data-stage={visit.stage}
                    role="listitem"
                    size="sm"
                  >
                    <ItemMedia>
                      <span className={styles.queueNumber}>#{visit.queueNumber}</span>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className={styles.nameLine}>
                        <span className={styles.name}>{visit.patientName}</span>
                        {visit.nameKhmer ? (
                          <span className={styles.nameKhmer} lang="km">
                            {visit.nameKhmer}
                          </span>
                        ) : null}
                      </ItemTitle>
                      <ItemDescription
                        className={styles.wait}
                        data-tone={tone === 'normal' ? undefined : tone}
                      >
                        {t('Arrived')} {visit.arrivedLabel} · {t('waiting')} {visit.waitMinutes}m
                        {tone === 'escalate' ? ` — ${t('escalate')}` : ''}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions className={styles.rowActions}>
                      <span className={styles.facts}>
                        <Badge size="sm" variant={stage.variant}>
                          {t(stage.label)}
                        </Badge>
                        <Badge
                          size="sm"
                          variant={visit.assurance === 'verified' ? 'success' : 'neutral'}
                        >
                          {visit.assurance === 'verified' ? t('ID verified') : t('ID unverified')}
                        </Badge>
                        <Badge size="sm" variant={payment.variant}>
                          {t(payment.label)}
                        </Badge>
                      </span>
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
                          {action.kind === 'resume'
                            ? `${t('Resume check-in')} · ${t('Step')} ${visit.resumeStep ?? 1}`
                            : t(action.label)}
                        </Button>
                      ) : (
                        <span className={styles.observedNote}>
                          {visit.stage === 'completed' ? t('Done') : t('With phlebotomy')}
                        </span>
                      )}
                    </ItemActions>
                  </Item>
                </Fragment>
              );
            })}
          </ItemGroup>
        </Card>
      ) : null}
    </section>
  );
}
