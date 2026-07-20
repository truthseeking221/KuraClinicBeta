'use client';

import { Fragment } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  CheckIcon,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  MoneyText,
  RefreshIcon,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from '../../components/shared';

import { HomeSignalItem } from './home-signal-item';
import { greetingForHour, isAllClear, licenceBanner, orderSignals } from './logic';
import type { HomeData, NextAction } from './types';
import styles from './home-workspace.module.css';

export type HomeWorkspaceProps = {
  data: HomeData;
  /** Deep link into the surface that owns the work. */
  onNavigate?: (targetKey: string) => void;
  onOpenLicence?: () => void;
  onChooseWorkspace?: () => void;
  onRetrySignal?: (signalKey: string) => void;
  onRefresh?: () => void;
};

function SignalList({
  data,
  onNavigate,
  onRetrySignal,
}: Pick<HomeWorkspaceProps, 'data' | 'onNavigate' | 'onRetrySignal'>) {
  const signals = orderSignals(data.signals.filter((signal) => signal.kind === 'worklist'));

  return (
    <ItemGroup aria-label="Work needing attention" role="list">
      {signals.map((signal, index) => (
        <Fragment key={signal.key}>
          {index > 0 ? <ItemSeparator aria-hidden="true" /> : null}
          <div role="listitem">
            <HomeSignalItem onNavigate={onNavigate} onRetry={onRetrySignal} signal={signal} />
          </div>
        </Fragment>
      ))}
    </ItemGroup>
  );
}

function OverviewList({
  data,
  onNavigate,
  onRetrySignal,
}: Pick<HomeWorkspaceProps, 'data' | 'onNavigate' | 'onRetrySignal'>) {
  const signals = data.signals.filter((signal) => signal.kind === 'info');

  return (
    <ItemGroup aria-label="Operational overview" className={styles.overviewList} role="list">
      {signals.map((signal, index) => (
        <Fragment key={signal.key}>
          {index > 0 ? <ItemSeparator aria-hidden="true" /> : null}
          <div role="listitem">
            <HomeSignalItem onNavigate={onNavigate} onRetry={onRetrySignal} signal={signal} />
          </div>
        </Fragment>
      ))}
    </ItemGroup>
  );
}

function NextItem({ action, onNavigate }: { action: NextAction; onNavigate?: (key: string) => void }) {
  const content = (
    <>
      <ItemMedia><time className={styles.nextTime}>{action.time}</time></ItemMedia>
      <ItemContent>
        <ItemTitle>{action.label}</ItemTitle>
        {action.meta ? <ItemDescription>{action.meta}</ItemDescription> : null}
      </ItemContent>
      {action.targetKey ? (
        <ItemActions><ChevronRightIcon aria-hidden="true" size={16} /></ItemActions>
      ) : null}
    </>
  );

  if (!action.targetKey) {
    return <Item size="sm">{content}</Item>;
  }

  return (
    <Item
      as="a"
      href={`#${action.targetKey}`}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        onNavigate(action.targetKey!);
      }}
      size="sm"
    >
      {content}
    </Item>
  );
}

/**
 * Clinical Home (WQ-01): a start-of-shift briefing, not a second worklist.
 * It previews priority and routes each item to its canonical owning surface.
 */
export function HomeWorkspace({
  data,
  onChooseWorkspace,
  onNavigate,
  onOpenLicence,
  onRefresh,
  onRetrySignal,
}: HomeWorkspaceProps) {
  const banner = licenceBanner(data.licence);
  const allClear = isAllClear(data.signals);
  const workSignals = data.signals.filter((signal) => signal.kind === 'worklist');
  const infoSignals = data.signals.filter((signal) => signal.kind === 'info');
  const viewState = data.viewState ?? 'ready';
  const mayShowLicence = viewState !== 'permission' && viewState !== 'no-workspace';

  return (
    <div className={styles.workspace} data-slot="home-workspace">
      <div className={styles.statusStack}>
        {data.freshness.kind === 'offline' ? (
          <Alert tone="warning">
            <AlertTitle>You are offline</AlertTitle>
            <AlertDescription>
              Showing the last synced state from {data.freshness.asOf}. Actions that change clinic
              data remain unavailable until the connection returns.
            </AlertDescription>
          </Alert>
        ) : null}

        {banner && mayShowLicence ? (
          <Alert tone={banner.tone}>
            <AlertTitle>{banner.title}</AlertTitle>
            <AlertDescription>{banner.description}</AlertDescription>
            {banner.actionLabel ? (
              <AlertAction>
                <Button onClick={() => onOpenLicence?.()} variant="outline">
                  {banner.actionLabel}
                </Button>
              </AlertAction>
            ) : null}
          </Alert>
        ) : null}
      </div>

      <header className={styles.header}>
        <p className={styles.date}>{data.dateLabel}</p>
        <h1 className={styles.greeting}>
          {greetingForHour(data.hour)}, {data.doctorName}
        </h1>
        <p className={styles.scope}>{data.scopeLabel}</p>
        {data.freshness.kind === 'stale' ? (
          <div className={styles.staleRow}>
            <span>Updated {data.freshness.asOf}</span>
            <Button onClick={() => onRefresh?.()} size="sm" variant="ghost">
              <RefreshIcon aria-hidden="true" size={14} />
              Refresh
            </Button>
          </div>
        ) : null}
      </header>

      {viewState === 'loading' ? (
        <section aria-labelledby="home-loading-title" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id="home-loading-title">Today&apos;s briefing</h2>
            <p className={styles.sectionDescription}>Loading current clinic signals.</p>
          </div>
          <div className={styles.attentionCard}>
            <SignalList data={data} onNavigate={onNavigate} onRetrySignal={onRetrySignal} />
          </div>
        </section>
      ) : null}

      {viewState === 'error' ? (
        <Alert tone="danger">
          <AlertTitle>Today&apos;s briefing could not be loaded</AlertTitle>
          <AlertDescription>
            No counts or actions are shown because their freshness could not be verified.
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => onRefresh?.()} variant="outline">Retry briefing</Button>
          </AlertAction>
        </Alert>
      ) : null}

      {viewState === 'permission' ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>Home access is restricted</EmptyStateTitle>
            <EmptyStateDescription>
              Your current workspace access cannot open this briefing. No patient data has been loaded.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      ) : null}

      {viewState === 'no-workspace' ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>Choose a workspace</EmptyStateTitle>
            <EmptyStateDescription>
              Select a clinic workspace before opening Home. No clinic data has been loaded.
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <Button onClick={() => onChooseWorkspace?.()} variant="primary">Choose workspace</Button>
          </EmptyStateContent>
        </EmptyState>
      ) : null}

      {viewState === 'ready' && data.signals.length === 0 ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>No patients yet</EmptyStateTitle>
            <EmptyStateDescription>
              Add your first patient to start ordering labs and tracking results.
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <Button onClick={() => onNavigate?.('patients')} variant="primary">Add patient</Button>
          </EmptyStateContent>
        </EmptyState>
      ) : null}

      {viewState === 'ready' && data.signals.length > 0 ? (
        <>
          <div className={styles.briefing}>
            <div className={styles.mainRail}>
            <section aria-labelledby="home-attention-title" className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle} id="home-attention-title">Needs attention</h2>
                <p className={styles.sectionDescription}>
                  Worst first. Each item opens the surface where the work completes.
                </p>
              </div>

              {allClear ? (
                <EmptyState align="start" surface="muted">
                  <EmptyStateMedia variant="icon">
                    <CheckIcon aria-hidden="true" size={20} />
                  </EmptyStateMedia>
                  <EmptyStateHeader>
                    <EmptyStateTitle>All caught up</EmptyStateTitle>
                    <EmptyStateDescription>
                      No results are waiting and no bookings need you right now.
                    </EmptyStateDescription>
                  </EmptyStateHeader>
                </EmptyState>
              ) : workSignals.length > 0 ? (
                <div className={styles.attentionCard}>
                  <SignalList data={data} onNavigate={onNavigate} onRetrySignal={onRetrySignal} />
                </div>
              ) : (
                <p className={styles.quietState}>No attention signals are available.</p>
              )}
            </section>
            </div>

            <div className={styles.rail}>
            {data.nextActions.length > 0 ? (
              <section aria-labelledby="home-next-title" className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle} id="home-next-title">Next today</h2>
                  <p className={styles.sectionDescription}>Scheduled work and operational handoffs.</p>
                </div>
                <ItemGroup aria-label="Next today" className={styles.spine} role="list">
                  {data.nextActions.map((action, index) => (
                    <div
                      className={styles.spineRow}
                      data-next={index === 0 || undefined}
                      key={`${action.time}-${action.label}`}
                      role="listitem"
                    >
                      <NextItem action={action} onNavigate={onNavigate} />
                    </div>
                  ))}
                </ItemGroup>
              </section>
            ) : null}

            {infoSignals.length > 0 ? (
              <section
                aria-labelledby="home-overview-title"
                className={styles.quietPanel}
                data-signal-density="compact"
              >
                <h2 className={styles.quietPanelTitle} id="home-overview-title">Overview</h2>
                <OverviewList data={data} onNavigate={onNavigate} onRetrySignal={onRetrySignal} />
              </section>
            ) : null}
            </div>
          </div>

          {data.closedToday ? (
            <section aria-labelledby="home-closed-title" className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle} id="home-closed-title">Closed today</h2>
                <p className={styles.sectionDescription}>Progress already completed this shift.</p>
              </div>
              <dl className={styles.closedList}>
                <div className={styles.closedItem}>
                  <dt className={styles.closedLabel}>
                    <CheckIcon aria-hidden="true" size={13} /> Result loops
                  </dt>
                  <dd className={styles.closedValue}>{data.closedToday.resultLoops}</dd>
                </div>
                <div className={styles.closedItem}>
                  <dt className={styles.closedLabel}>
                    <CheckIcon aria-hidden="true" size={13} /> Bookings completed
                  </dt>
                  <dd className={styles.closedValue}>{data.closedToday.bookings}</dd>
                </div>
                <div className={styles.closedItem}>
                  <dt className={styles.closedLabel}>
                    <CheckIcon aria-hidden="true" size={13} /> Earned
                  </dt>
                  <dd className={styles.closedValue}>
                    <MoneyText currency="USD" minor={data.closedToday.earnedMinor} />
                  </dd>
                </div>
              </dl>
            </section>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
