'use client';

import { Fragment, useMemo } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DataGrid,
  DataGridTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
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

import {
  appointmentIsDue,
  appointmentLateMinutes,
  callNextVisit,
  deskNextAction,
  deskWaitIsActive,
  nowCalled,
  nowServing,
  orderDeskVisits,
  waitTone,
} from './logic';
import { QUEUE_SKIP_REASONS } from './types';
import type {
  DeskQueueState,
  DeskVisit,
  QueueSkipReasonCode,
  VisitPaymentFact,
} from './types';
import styles from './desk-queue.module.css';

type StatusTone = 'neutral' | 'success' | 'warning';

const PAYMENT_META: Record<VisitPaymentFact, { label: string; tone: StatusTone }> = {
  pending: { label: 'Not collected', tone: 'warning' },
  collected: { label: 'Paid', tone: 'success' },
  deferred: { label: 'Pay later', tone: 'neutral' },
  waiting: { label: 'KHQR waiting', tone: 'warning' },
};

const SKIP_REASON_LABEL: Record<QueueSkipReasonCode, string> = Object.fromEntries(
  QUEUE_SKIP_REASONS.map((reason) => [reason.code, reason.label]),
) as Record<QueueSkipReasonCode, string>;

/**
 * Why this row sits where it sits. Order is a promise the desk makes to the
 * room, so the reason for the promise is on the row, not in a tooltip.
 */
function positionLabel(visit: DeskVisit): { primary: string; tone?: 'urgent' } {
  if (visit.arrivalClass === 'stat') return { primary: 'Urgent', tone: 'urgent' };
  if (visit.arrivalClass === 'appointment') {
    const late = appointmentLateMinutes(visit);
    if (late > 0) return { primary: `Booked ${visit.appointmentLabel} · ${late}m late` };
    if (!appointmentIsDue(visit)) return { primary: `Booked ${visit.appointmentLabel} · early` };
    return { primary: `Booked ${visit.appointmentLabel}` };
  }
  return { primary: 'Walk-in' };
}

/**
 * The state beyond simply waiting in line. A row that is plainly waiting says
 * nothing here — its position already says it, and repeating it would push the
 * rows that need attention into the noise.
 */
function activityLabel(visit: DeskVisit): { label: string; tone: StatusTone } | null {
  if (visit.stage === 'arrived') return { label: 'Check-in unfinished', tone: 'warning' };
  if (visit.stage === 'in-draw') {
    const bay = visit.call.state === 'serving' ? ` · ${visit.call.deskLabel}` : '';
    return { label: `In draw${bay}`, tone: 'success' };
  }
  if (visit.stage === 'draw-complete') return { label: 'Draw complete', tone: 'neutral' };
  if (visit.stage === 'completed') return { label: 'Completed', tone: 'neutral' };
  if (visit.call.state === 'called') {
    return { label: `Called ${visit.call.atLabel} · ${visit.call.deskLabel}`, tone: 'success' };
  }
  if (visit.call.state === 'skipped') {
    return {
      label: `${SKIP_REASON_LABEL[visit.call.reason]} · ${visit.call.atLabel}`,
      tone: 'warning',
    };
  }
  return null;
}

function PatientIdentity({ visit }: { visit: DeskVisit }) {
  return (
    <div className={styles.patientIdentity}>
      <span className={styles.ticket} data-class={visit.arrivalClass}>
        {visit.ticket}
      </span>
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

function QueuePosition({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const isActive = deskWaitIsActive(visit);
  const tone = isActive ? waitTone(visit.waitMinutes) : 'normal';
  const position = positionLabel(visit);

  return (
    <span className={styles.timing}>
      <span className={styles.positionPrimary} data-tone={position.tone}>
        {t(position.primary)}
      </span>
      <span className={styles.timingSecondary} data-tone={tone === 'normal' ? undefined : tone}>
        {isActive
          ? `${t('Waiting')} ${visit.waitMinutes}m${
              tone === 'warn' ? ` — ${t('needs attention')}` : ''
            }${tone === 'escalate' ? ` — ${t('escalate')}` : ''}`
          : `${t('Arrived')} ${visit.arrivedLabel}`}
      </span>
    </span>
  );
}

function ActivityFact({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const activity = activityLabel(visit);
  if (!activity) return null;
  return (
    <span className={styles.fact} data-tone={activity.tone}>
      {t(activity.label)}
    </span>
  );
}

/**
 * Identity assurance and contact ownership are two different truths and never
 * collapse into one badge: a code sent to a phone proves the phone, never the
 * person holding it.
 */
function IdentityFact({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const verified = visit.assurance === 'verified';
  return (
    <span className={styles.fact} data-tone={verified ? 'success' : 'warning'}>
      {verified ? t('ID checked') : t('ID not checked')}
    </span>
  );
}

function ContactFact({ visit }: { visit: DeskVisit }) {
  const t = useT();
  const confirmed = visit.contact === 'confirmed';
  return (
    <span className={styles.fact} data-tone={confirmed ? 'success' : 'neutral'}>
      {confirmed ? t('Confirmed') : t('Not confirmed')}
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

type VisitActionProps = {
  fullWidth?: boolean;
  onCallVisit?: (visitId: string) => void;
  onResumeVisit?: (visitId: string) => void;
  onSkipVisit?: (visitId: string, reason: QueueSkipReasonCode) => void;
  onStartDraw?: (visitId: string) => void;
  visit: DeskVisit;
};

function SkipMenu({
  onSkipVisit,
  visit,
}: {
  onSkipVisit: (visitId: string, reason: QueueSkipReasonCode) => void;
  visit: DeskVisit;
}) {
  const t = useT();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          {t('No answer')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('Why is the patient not here?')}</DropdownMenuLabel>
        {QUEUE_SKIP_REASONS.map((reason) => (
          <DropdownMenuItem key={reason.code} onClick={() => onSkipVisit(visit.id, reason.code)}>
            {t(reason.label)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** True when this row offers the desk something to do right now. */
function rowHasAction(visit: DeskVisit): boolean {
  const action = deskNextAction(visit);
  return action !== null && action.kind !== 'call';
}

function DeskAction({
  fullWidth = false,
  onCallVisit,
  onResumeVisit,
  onSkipVisit,
  onStartDraw,
  visit,
}: VisitActionProps) {
  const t = useT();
  const action = deskNextAction(visit);

  // A row that is simply waiting its turn offers nothing: the order is the
  // desk's promise to the room, and one Call next button keeps it. Calling
  // out of turn goes through a recorded skip, not a quieter button on
  // every row.
  if (!action || action.kind === 'call') return null;

  if (action.kind === 'start-draw') {
    return (
      <span className={styles.actionStack} data-full={fullWidth ? '' : undefined}>
        <span className={styles.actionRow}>
          <Button
            className={fullWidth ? styles.rowAction : undefined}
            disabled={action.blockedReason !== null}
            onClick={() => onStartDraw?.(visit.id)}
            size="sm"
            variant="primary"
          >
            {t(action.label)}
          </Button>
          {onSkipVisit && visit.call.state === 'called' ? (
            <SkipMenu onSkipVisit={onSkipVisit} visit={visit} />
          ) : null}
        </span>
        {action.blockedReason ? (
          <span className={styles.actionReason}>{t(action.blockedReason)}</span>
        ) : null}
      </span>
    );
  }

  return (
    <Button
      className={fullWidth ? styles.rowAction : undefined}
      onClick={() => {
        if (action.kind === 'resume') onResumeVisit?.(visit.id);
        else onCallVisit?.(visit.id);
      }}
      size="sm"
      variant="outline"
    >
      {t(action.label)}
    </Button>
  );
}

type DeskVisitGridProps = Pick<
  DeskQueueProps,
  'onCallVisit' | 'onResumeVisit' | 'onSkipVisit' | 'onStartDraw'
> & {
  ariaLabel: string;
  loading?: boolean;
  visits: DeskVisit[];
};

function DeskVisitGrid({
  ariaLabel,
  loading = false,
  onCallVisit,
  onResumeVisit,
  onSkipVisit,
  onStartDraw,
  visits,
}: DeskVisitGridProps) {
  const t = useT();
  const columns = useMemo<ColumnDef<DeskVisit>[]>(
    () => [
      {
        id: 'patient',
        header: t('Patient'),
        cell: ({ row }) => <PatientIdentity visit={row.original} />,
        size: 260,
        meta: { headerTitle: t('Patient') },
      },
      {
        id: 'position',
        header: t('Position'),
        cell: ({ row }) => <QueuePosition visit={row.original} />,
        size: 180,
        meta: { headerTitle: t('Position') },
      },
      {
        id: 'activity',
        header: t('Activity'),
        cell: ({ row }) => <ActivityFact visit={row.original} />,
        size: 190,
        meta: { headerTitle: t('Activity') },
      },
      {
        id: 'identity',
        header: t('Identity'),
        cell: ({ row }) => <IdentityFact visit={row.original} />,
        size: 120,
        meta: { headerTitle: t('Identity') },
      },
      {
        id: 'contact',
        header: t('Phone'),
        cell: ({ row }) => <ContactFact visit={row.original} />,
        size: 115,
        meta: { headerTitle: t('Phone') },
      },
      {
        id: 'payment',
        header: t('Payment'),
        cell: ({ row }) => <PaymentFact visit={row.original} />,
        size: 130,
        meta: { headerTitle: t('Payment') },
      },
      {
        id: 'action',
        header: t('Next'),
        cell: ({ row }) => (
          <DeskAction
            onCallVisit={onCallVisit}
            onResumeVisit={onResumeVisit}
            onSkipVisit={onSkipVisit}
            onStartDraw={onStartDraw}
            visit={row.original}
          />
        ),
        size: 230,
        meta: {
          cellClassName: styles.actionCell,
          headerClassName: styles.actionHeader,
          headerTitle: t('Next'),
        },
      },
    ],
    [onCallVisit, onResumeVisit, onSkipVisit, onStartDraw, t],
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
  onCallVisit,
  onResumeVisit,
  onSkipVisit,
  onStartDraw,
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
                    <span className={styles.mobileTicket} data-class={visit.arrivalClass}>
                      {visit.ticket}
                    </span>
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
                      <QueuePosition visit={visit} />
                    </ItemDescription>
                    <span className={styles.mobileFacts}>
                      <ActivityFact visit={visit} />
                      <IdentityFact visit={visit} />
                      <ContactFact visit={visit} />
                      <PaymentFact visit={visit} />
                    </span>
                  </ItemContent>
                  {rowHasAction(visit) ? (
                    <ItemActions className={styles.mobileActions}>
                      <DeskAction
                        fullWidth
                        onCallVisit={onCallVisit}
                        onResumeVisit={onResumeVisit}
                        onSkipVisit={onSkipVisit}
                        onStartDraw={onStartDraw}
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

/**
 * What the waiting-room screen is showing right now. The desk and the room
 * must never disagree about which ticket was called, so the same derived fact
 * drives both.
 */
function NowServingStrip({ visits }: { visits: DeskVisit[] }) {
  const t = useT();
  const serving = nowServing(visits);
  const called = nowCalled(visits);
  if (!serving && !called) return null;

  return (
    <Card aria-label={t('Now serving')} className={styles.nowServing}>
      {called ? (
        <div className={styles.nowServingSlot}>
          <span className={styles.nowServingLabel}>{t('Now calling')}</span>
          <span className={styles.nowServingTicket}>{called.ticket}</span>
          <span className={styles.nowServingMeta}>
            {called.patientName} ·{' '}
            {called.call.state === 'called' ? called.call.deskLabel : ''}
          </span>
        </div>
      ) : null}
      {serving ? (
        <div className={styles.nowServingSlot}>
          <span className={styles.nowServingLabel}>{t('In the chair')}</span>
          <span className={styles.nowServingTicket}>{serving.ticket}</span>
          <span className={styles.nowServingMeta}>
            {serving.patientName} ·{' '}
            {serving.call.state === 'serving' ? serving.call.deskLabel : ''}
          </span>
        </div>
      ) : null}
    </Card>
  );
}

export type DeskQueueProps = {
  visits: DeskVisit[];
  state?: DeskQueueState;
  /** Shown with stale/offline states: when the list was last synced. */
  asOf?: string;
  onResumeVisit?: (visitId: string) => void;
  /** Call one ticket to the desk. The desk calls one patient at a time. */
  onCallVisit?: (visitId: string) => void;
  /** Record a call that went unanswered, with its reason. */
  onSkipVisit?: (visitId: string, reason: QueueSkipReasonCode) => void;
  /** The same staffer starts the draw — no handoff to another role. */
  onStartDraw?: (visitId: string) => void;
  onNewWalkIn?: () => void;
  onRetry?: () => void;
  onRefresh?: () => void;
};

/**
 * Reception worklist (journeys REC-01/02/05). ReUI data-grid-base-7 supplies
 * the grid anatomy; Kura owns the queue order, lifecycle facts, actions,
 * responsive item composition, state coverage, and visual tokens.
 *
 * One PSC staffer works this list end to end: receive, call, draw. Nothing
 * here hands a visit to a second role.
 *
 * PROTOTYPE SURFACE: no queue/visit engine exists in kura-platform today.
 */
export function DeskQueue({
  asOf,
  onCallVisit,
  onNewWalkIn,
  onRefresh,
  onResumeVisit,
  onRetry,
  onSkipVisit,
  onStartDraw,
  state = 'ready',
  visits,
}: DeskQueueProps) {
  const t = useT();
  const ordered = orderDeskVisits(visits);
  const active = ordered.filter((visit) => visit.stage !== 'completed');
  const completed = ordered.filter((visit) => visit.stage === 'completed');
  const next = callNextVisit(visits);
  const blocked = nowCalled(visits) ?? nowServing(visits);

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

  const callable = state === 'ready' || state === 'stale';

  return (
    <section aria-label={t('Arrivals')} className={styles.queue}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{t('Arrivals')}</h2>
          <p className={styles.subtitle}>
            {state === 'loading'
              ? t('Loading today’s visits…')
              : `${active.length} ${t('in the room')} · ${completed.length} ${t('completed today')}`}
          </p>
        </div>
        <div className={styles.headerActions}>
          {onNewWalkIn ? (
            <Button onClick={onNewWalkIn} variant="outline">
              <UserAddIcon aria-hidden="true" size={16} />
              {t('New walk-in')}
            </Button>
          ) : null}
          {onCallVisit ? (
            <span className={styles.callNext}>
              <Button
                disabled={!callable || next === null}
                onClick={() => next && onCallVisit(next.id)}
                variant="primary"
              >
                {next ? `${t('Call next')} · ${next.ticket}` : t('Call next')}
              </Button>
              {callable && next === null ? (
                <span className={styles.callNextReason}>
                  {blocked
                    ? `${t('Finish with')} ${blocked.ticket} ${t('first')}`
                    : t('Nobody is ready to be called')}
                </span>
              ) : null}
            </span>
          ) : null}
        </div>
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

      {state !== 'loading' && state !== 'error' ? <NowServingStrip visits={visits} /> : null}

      {state === 'loading' ? (
        <DeskVisitWorklist
          ariaLabel={t('Loading visits')}
          loading
          onCallVisit={onCallVisit}
          onResumeVisit={onResumeVisit}
          onSkipVisit={onSkipVisit}
          onStartDraw={onStartDraw}
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
              onCallVisit={onCallVisit}
              onResumeVisit={onResumeVisit}
              onSkipVisit={onSkipVisit}
              onStartDraw={onStartDraw}
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
                  onCallVisit={onCallVisit}
                  onResumeVisit={onResumeVisit}
                  onSkipVisit={onSkipVisit}
                  onStartDraw={onStartDraw}
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
