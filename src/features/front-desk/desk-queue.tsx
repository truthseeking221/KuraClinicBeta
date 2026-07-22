'use client';

import { Fragment, useMemo } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DataGrid,
  DataGridTable,
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

import { deskNextAction, deskWaitIsActive, orderDeskVisits, waitTone } from './logic';
import type { DeskQueueState, DeskVisit, VisitPaymentFact } from './types';
import styles from './desk-queue.module.css';

type StatusTone = 'neutral' | 'success' | 'warning';

const PAYMENT_META: Record<VisitPaymentFact, { label: string; tone: StatusTone }> = {
  pending: { label: 'Payment pending', tone: 'neutral' },
  collected: { label: 'Paid', tone: 'success' },
  deferred: { label: 'Pay later', tone: 'warning' },
  waiting: { label: 'KHQR waiting', tone: 'warning' },
};

function stageMeta(visit: DeskVisit): {
  label: string;
  variant: 'info' | 'success' | 'neutral';
} {
  if (visit.stage === 'arrived') return { label: 'Checking in', variant: 'info' };
  if (visit.stage === 'identity-resolved' && visit.queuedForDraw) {
    return { label: 'With phlebotomy', variant: 'neutral' };
  }
  if (visit.stage === 'identity-resolved') {
    return { label: 'Identity resolved', variant: 'success' };
  }
  if (visit.stage === 'draw-complete') return { label: 'Draw complete', variant: 'neutral' };
  return { label: 'Completed', variant: 'neutral' };
}

function PatientIdentity({ visit }: { visit: DeskVisit }) {
  return (
    <div className={styles.patientIdentity}>
      <span className={styles.queueNumber}>#{visit.queueNumber}</span>
      <span className={styles.patientNames}>
        <span className={styles.name}>{visit.patientName}</span>
        {visit.nameKhmer ? (
          <span className={styles.nameKhmer} lang="km">
            {visit.nameKhmer}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function ReceptionTiming({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const isActive = deskWaitIsActive(visit);
  const tone = isActive ? waitTone(visit.waitMinutes) : 'normal';

  return (
    <span className={styles.timing}>
      <span
        className={styles.timingPrimary}
        data-tone={tone === 'normal' ? undefined : tone}
      >
        {isActive ? (
          <>
            {t('waiting')} {visit.waitMinutes}m
            {tone === 'warn' ? ` — ${t('needs attention')}` : ''}
            {tone === 'escalate' ? ` — ${t('escalate')}` : ''}
          </>
        ) : (
          t('Handoff complete')
        )}
      </span>
      <span className={styles.timingSecondary}>
        {t('Arrived')} {visit.arrivedLabel}
      </span>
    </span>
  );
}

function StageFact({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const stage = stageMeta(visit);

  return (
    <Badge appearance="outline" size="sm" variant={stage.variant}>
      {t(stage.label)}
    </Badge>
  );
}

function IdentityFact({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const verified = visit.assurance === 'verified';

  return (
    <span className={styles.fact} data-tone={verified ? 'success' : 'neutral'}>
      {verified ? t('ID verified') : t('ID unverified')}
    </span>
  );
}

function PaymentFact({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const payment = PAYMENT_META[visit.payment];

  return (
    <span className={styles.fact} data-tone={payment.tone}>
      {t(payment.label)}
    </span>
  );
}

function DeskAction({
  fullWidth = false,
  onQueueForDraw,
  onResumeVisit,
  visit,
}: {
  fullWidth?: boolean;
  onQueueForDraw?: (visitId: string) => void;
  onResumeVisit?: (visitId: string) => void;
  visit: DeskVisit;
}) {
  const t = useT();
  const action = deskNextAction(visit);

  if (!action) return <span className={styles.noAction}>{t('None')}</span>;

  return (
    <Button
      className={fullWidth ? styles.rowAction : undefined}
      onClick={() =>
        action.kind === 'resume'
          ? onResumeVisit?.(visit.id)
          : onQueueForDraw?.(visit.id)
      }
      size="sm"
      variant="outline"
    >
      {action.kind === 'resume'
        ? `${t('Resume check-in')} · ${t('Step')} ${visit.resumeStep ?? 1}`
        : t(action.label)}
    </Button>
  );
}

type DeskVisitGridProps = Pick<
  DeskQueueProps,
  'onQueueForDraw' | 'onResumeVisit'
> & {
  ariaLabel: string;
  loading?: boolean;
  visits: DeskVisit[];
};

function DeskVisitGrid({
  ariaLabel,
  loading = false,
  onQueueForDraw,
  onResumeVisit,
  visits,
}: DeskVisitGridProps) {
  const t = useT();
  const columns = useMemo<ColumnDef<DeskVisit>[]>(
    () => [
      {
        id: 'patient',
        header: t('Patient'),
        cell: ({ row }) => <PatientIdentity visit={row.original} />,
        size: 280,
        meta: { headerTitle: t('Patient') },
      },
      {
        id: 'timing',
        header: t('At reception'),
        cell: ({ row }) => <ReceptionTiming visit={row.original} />,
        size: 185,
        meta: { headerTitle: t('At reception') },
      },
      {
        id: 'stage',
        header: t('Stage'),
        cell: ({ row }) => <StageFact visit={row.original} />,
        size: 160,
        meta: { headerTitle: t('Stage') },
      },
      {
        id: 'identity',
        header: t('Identity'),
        cell: ({ row }) => <IdentityFact visit={row.original} />,
        size: 120,
        meta: { headerTitle: t('Identity') },
      },
      {
        id: 'payment',
        header: t('Payment'),
        cell: ({ row }) => <PaymentFact visit={row.original} />,
        size: 135,
        meta: { headerTitle: t('Payment') },
      },
      {
        id: 'action',
        header: t('Desk action'),
        cell: ({ row }) => (
          <DeskAction
            onQueueForDraw={onQueueForDraw}
            onResumeVisit={onResumeVisit}
            visit={row.original}
          />
        ),
        size: 215,
        meta: {
          cellClassName: styles.actionCell,
          headerClassName: styles.actionHeader,
          headerTitle: t('Desk action'),
        },
      },
    ],
    [onQueueForDraw, onResumeVisit, t],
  );

  // The queue order is authoritative; user sorting could bury an escalation.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data: visits,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <DataGrid
      isLoading={loading}
      layout={{ borders: 'rows', density: 'compact', width: 'fixed' }}
      loadingRows={3}
      recordCount={visits.length}
      table={table}
    >
      <DataGridTable aria-label={ariaLabel} />
    </DataGrid>
  );
}

function MobileVisitList({
  ariaLabel,
  loading = false,
  onQueueForDraw,
  onResumeVisit,
  visits,
}: DeskVisitGridProps) {
  const t = useT();

  return (
    <Card className={styles.mobileSurface} variant="outline">
      <ItemGroup aria-label={ariaLabel} role="list">
        {loading
          ? [0, 1, 2].map((row, index) => (
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
            ))
          : visits.map((visit, index) => (
              <Fragment key={visit.id}>
                {index > 0 ? <ItemSeparator aria-hidden="true" /> : null}
                <Item data-stage={visit.stage} role="listitem" size="sm">
                  <ItemMedia>
                    <span className={styles.mobileQueueNumber}>#{visit.queueNumber}</span>
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
                    <ItemDescription>
                      <ReceptionTiming visit={visit} />
                    </ItemDescription>
                    <span className={styles.mobileFacts}>
                      <StageFact visit={visit} />
                      <IdentityFact visit={visit} />
                      <PaymentFact visit={visit} />
                    </span>
                  </ItemContent>
                  {deskNextAction(visit) ? (
                    <ItemActions className={styles.mobileActions}>
                      <DeskAction
                        fullWidth
                        onQueueForDraw={onQueueForDraw}
                        onResumeVisit={onResumeVisit}
                        visit={visit}
                      />
                    </ItemActions>
                  ) : null}
                </Item>
              </Fragment>
            ))}
      </ItemGroup>
      {loading ? <span className={styles.srOnly}>{t('Loading visits')}</span> : null}
    </Card>
  );
}

function DeskVisitWorklist(props: DeskVisitGridProps) {
  return (
    <>
      <div className={styles.desktopWorklist}>
        <DeskVisitGrid {...props} />
      </div>
      <div className={styles.mobileWorklist}>
        <MobileVisitList {...props} />
      </div>
    </>
  );
}

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
 * Reception worklist (journeys REC-01/02/05). ReUI data-grid-base-7 supplies
 * the grid anatomy; Kura owns the queue order, lifecycle facts, actions,
 * responsive item composition, state coverage, and visual tokens.
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
  const completed = ordered.filter((visit) => visit.stage === 'completed');

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
              : `${active.length} ${t('in progress')} · ${completed.length} ${t('completed today')}`}
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
        <DeskVisitWorklist
          ariaLabel={t('Loading visits')}
          loading
          onQueueForDraw={onQueueForDraw}
          onResumeVisit={onResumeVisit}
          visits={[]}
        />
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
        <>
          {active.length > 0 ? (
            <DeskVisitWorklist
              ariaLabel={t('Active visits')}
              onQueueForDraw={onQueueForDraw}
              onResumeVisit={onResumeVisit}
              visits={active}
            />
          ) : (
            <p className={styles.noActiveVisits}>{t('No visits in progress')}</p>
          )}

          {completed.length > 0 ? (
            <Collapsible className={styles.completedSection} inset="none">
              <CollapsibleTrigger headingLevel={3} meta={completed.length}>
                {t('Completed today')}
              </CollapsibleTrigger>
              <CollapsibleContent className={styles.completedContent}>
                <DeskVisitWorklist
                  ariaLabel={t('Completed visits')}
                  onQueueForDraw={onQueueForDraw}
                  onResumeVisit={onResumeVisit}
                  visits={completed}
                />
              </CollapsibleContent>
            </Collapsible>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
