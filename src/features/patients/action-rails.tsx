'use client';

import { useState } from 'react';

import {
  Button,
  CalendarAddIcon,
  CheckIcon,
  ChevronRightIcon,
  NotificationsIcon,
  PrescriptionIcon,
  Progress,
  TestTubeIcon,
  ViewIcon,
} from '../../components/ui';

import type { ResultsProgress } from './types';
import styles from './action-rails.module.css';

type NextAction = {
  id: 'order' | 'prescribe' | 'schedule';
  icon: React.ReactNode;
  label: string;
  description: string;
};

const NEXT_ACTIONS: readonly NextAction[] = [
  {
    id: 'order',
    icon: <TestTubeIcon aria-hidden="true" size={16} />,
    label: 'Order',
    description: 'Request or repeat lab tests',
  },
  {
    id: 'prescribe',
    icon: <PrescriptionIcon aria-hidden="true" size={16} />,
    label: 'Prescribe',
    description: 'Add or update medication',
  },
  {
    id: 'schedule',
    icon: <CalendarAddIcon aria-hidden="true" size={16} />,
    label: 'Schedule',
    description: 'Set a follow-up reminder',
  },
];

export type NextActionsRailProps = {
  /** Display name as the registry provides it; never split or reordered. */
  patientName: string;
  onOrder?: () => void;
  onPrescribe?: () => void;
  onSchedule?: () => void;
};

/**
 * The calm-moment action rail: three launchers for the next clinical step.
 * Launchers only — each opens its governed flow; nothing completes here.
 */
export function NextActionsRail({
  onOrder,
  onPrescribe,
  onSchedule,
  patientName,
}: NextActionsRailProps) {
  const handlers = { order: onOrder, prescribe: onPrescribe, schedule: onSchedule };
  return (
    <section aria-labelledby="next-actions-title" className={styles.rail}>
      <h2 className={styles.title} id="next-actions-title">
        What should we do with {patientName} today?
      </h2>
      <div className={styles.actions}>
        {NEXT_ACTIONS.map((action) => (
          <button
            className={styles.action}
            key={action.id}
            onClick={handlers[action.id]}
            type="button"
          >
            <span aria-hidden="true" className={styles.actionIcon}>
              {action.icon}
            </span>
            <span className={styles.actionCopy}>
              <span className={styles.actionLabel}>{action.label}</span>
              <span className={styles.actionDescription}>{action.description}</span>
            </span>
            <ChevronRightIcon aria-hidden="true" className={styles.actionChevron} size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}

export type ResultsProgressRailProps = {
  progress: ResultsProgress;
  onReviewAvailable?: () => void;
  onNotifyWhenComplete?: () => void;
};

/**
 * The results-arriving rail: how much of the episode is back, whether any
 * of it needs eyes now, and a one-tap way to stop watching the page.
 */
export function ResultsProgressRail({
  onNotifyWhenComplete,
  onReviewAvailable,
  progress,
}: ResultsProgressRailProps) {
  const [notifyRequested, setNotifyRequested] = useState(false);
  const complete = progress.resulted >= progress.total;

  return (
    <section aria-labelledby="results-progress-title" className={styles.rail}>
      <div className={styles.progressHead}>
        <p className={styles.progressCount} id="results-progress-title">
          <span className={styles.progressResulted}>{progress.resulted}</span>
          {` of ${progress.total} resulted`}
        </p>
        <Progress
          aria-label={`${progress.resulted} of ${progress.total} tests resulted`}
          max={progress.total}
          value={progress.resulted}
        />
        {progress.arrivalNote ? (
          <p className={styles.progressNote}>{progress.arrivalNote}</p>
        ) : null}
      </div>
      <div className={styles.actions}>
        {progress.resulted > 0 ? (
          <button className={styles.action} onClick={onReviewAvailable} type="button">
            <span aria-hidden="true" className={styles.actionIcon}>
              <ViewIcon size={16} />
            </span>
            <span className={styles.actionCopy}>
              <span className={styles.actionLabel}>
                Review {complete ? 'results' : 'available results'}
              </span>
              <span
                className={
                  progress.flagged > 0 ? styles.actionDescriptionUrgent : styles.actionDescription
                }
              >
                {progress.flagged > 0
                  ? `${progress.flagged} flagged ${progress.flagged === 1 ? 'value needs' : 'values need'} review now`
                  : 'Nothing flagged so far'}
              </span>
            </span>
            <ChevronRightIcon aria-hidden="true" className={styles.actionChevron} size={16} />
          </button>
        ) : null}
        {!complete ? (
          notifyRequested ? (
            <p className={styles.notifyConfirmed} role="status">
              <CheckIcon aria-hidden="true" size={14} />
              You&apos;ll get one alert when all {progress.total} are in.
            </p>
          ) : (
            <Button
              leadingIcon={<NotificationsIcon aria-hidden="true" size={16} />}
              onClick={() => {
                setNotifyRequested(true);
                onNotifyWhenComplete?.();
              }}
              size="sm"
              variant="ghost"
            >
              Notify me when complete
            </Button>
          )
        ) : null}
      </div>
    </section>
  );
}
