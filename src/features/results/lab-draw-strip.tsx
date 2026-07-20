'use client';

import type { ComponentPropsWithoutRef } from 'react';

import {
  formatMonthShort,
  formatValue,
  resolveTier,
  resultSeries,
  toneForSeverity,
} from './logic';
import type { LabAnalyteResult, RangeTone } from './types';
import styles from './lab-draw-strip.module.css';

export type LabDrawStripProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  result: LabAnalyteResult;
  locale?: string;
  maxDraws?: number;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Draw-by-draw history for qualitative, sparse, or non-temporal series.
 * Missing observations remain explicit and capped histories disclose how many
 * older observations were not rendered.
 */
export function LabDrawStrip({
  className,
  locale = 'en-US',
  maxDraws = 6,
  result,
  ...props
}: LabDrawStripProps) {
  const fullSeries = resultSeries(result);
  const hiddenCount = Math.max(0, fullSeries.length - maxDraws);
  const series = fullSeries.slice(-maxDraws);
  if (series.length === 0) return null;

  return (
    <div
      {...props}
      className={joinClasses(styles.strip, className)}
      data-slot="lab-draw-strip"
      role="list"
      aria-label={`${result.name} by draw`}
    >
      {hiddenCount > 0 ? (
        <div className={styles.earlier} role="listitem">
          {hiddenCount} earlier
        </div>
      ) : null}
      {series.map((point, index) => {
        const missing = point.value.kind === 'missing';
        const tier = !missing && result.range ? resolveTier(result.range, point.value) : null;
        const tone: RangeTone | undefined = tier ? toneForSeverity(tier.severity) : undefined;
        const isLatest = index === series.length - 1;
        return (
          <div
            key={`${point.episodeId}-${point.date ?? 'unknown'}-${index}`}
            className={styles.cell}
            data-latest={isLatest || undefined}
            data-missing={missing || undefined}
            role="listitem"
          >
            <span className={styles.date}>{formatMonthShort(point.date, locale)}</span>
            <span className={styles.value} data-tone={tone}>
              {formatValue(point.value)}
            </span>
            <span className={styles.episode}>{point.episodeLabel}</span>
            <span
              className={styles.dot}
              data-tone={tone}
              data-missing={missing || undefined}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}
