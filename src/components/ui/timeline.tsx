'use client';

import { createContext, useContext, type ComponentPropsWithoutRef } from 'react';

import { useT } from '../foundations/i18n';
import styles from './timeline.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

type TimelineContextValue = {
  currentStep: number;
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimeline() {
  const context = useContext(TimelineContext);
  if (!context) throw new Error('Timeline parts must be used within Timeline.');
  return context;
}

export type TimelineOrientation = 'horizontal' | 'vertical';

export type TimelineProps = ComponentPropsWithoutRef<'ol'> & {
  /** Current event number; earlier events render as completed. */
  value?: number;
  /** Initial/current event when the timeline is not externally controlled. */
  defaultValue?: number;
  orientation?: TimelineOrientation;
};

export function Timeline({
  'aria-label': ariaLabel,
  className,
  defaultValue = 1,
  orientation = 'vertical',
  value,
  ...props
}: TimelineProps) {
  const t = useT();
  const currentStep = value ?? defaultValue;

  return (
    <TimelineContext.Provider value={{ currentStep }}>
      <ol
        {...props}
        aria-label={ariaLabel ?? t('Timeline')}
        className={joinClasses(styles.root, className)}
        data-orientation={orientation}
        data-slot="timeline"
      />
    </TimelineContext.Provider>
  );
}

/** Event meaning for the marker; color never travels without the item's text. */
export type TimelineTone = 'neutral' | 'success' | 'warning' | 'danger';

export type TimelineItemProps = ComponentPropsWithoutRef<'li'> & {
  step: number;
  /** Terminal failures read danger, holds read warning, fulfilment success. */
  tone?: TimelineTone;
};

export function TimelineItem({ className, step, tone = 'neutral', ...props }: TimelineItemProps) {
  const { currentStep } = useTimeline();
  const current = step === currentStep;
  const completed = step < currentStep;

  return (
    <li
      {...props}
      aria-current={current ? 'step' : undefined}
      className={joinClasses(styles.item, className)}
      data-completed={completed ? 'true' : undefined}
      data-current={current ? 'true' : undefined}
      data-slot="timeline-item"
      data-step={step}
      data-tone={tone === 'neutral' ? undefined : tone}
    />
  );
}

export type TimelineHeaderProps = ComponentPropsWithoutRef<'div'>;

export function TimelineHeader({ className, ...props }: TimelineHeaderProps) {
  return <div {...props} className={joinClasses(styles.header, className)} data-slot="timeline-header" />;
}

export type TimelineDateProps = ComponentPropsWithoutRef<'time'>;

export function TimelineDate({ className, ...props }: TimelineDateProps) {
  return <time {...props} className={joinClasses(styles.date, className)} data-slot="timeline-date" />;
}

export type TimelineTitleProps = ComponentPropsWithoutRef<'h3'>;

export function TimelineTitle({ className, ...props }: TimelineTitleProps) {
  return <h3 {...props} className={joinClasses(styles.title, className)} data-slot="timeline-title" />;
}

export type TimelineContentProps = ComponentPropsWithoutRef<'div'>;

export function TimelineContent({ className, ...props }: TimelineContentProps) {
  return <div {...props} className={joinClasses(styles.content, className)} data-slot="timeline-content" />;
}

export type TimelineIndicatorProps = ComponentPropsWithoutRef<'span'>;

export function TimelineIndicator({ 'aria-hidden': ariaHidden = true, className, ...props }: TimelineIndicatorProps) {
  return (
    <span
      {...props}
      aria-hidden={ariaHidden}
      className={joinClasses(styles.indicator, className)}
      data-slot="timeline-indicator"
    />
  );
}

export type TimelineSeparatorProps = ComponentPropsWithoutRef<'span'>;

export function TimelineSeparator({ 'aria-hidden': ariaHidden = true, className, ...props }: TimelineSeparatorProps) {
  return (
    <span
      {...props}
      aria-hidden={ariaHidden}
      className={joinClasses(styles.separator, className)}
      data-slot="timeline-separator"
    />
  );
}
