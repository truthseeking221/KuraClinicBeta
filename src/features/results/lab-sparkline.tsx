'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  flagFor,
  formatMonthShort,
  formatValue,
  parseLabTimestamp,
  resultSeries,
} from './logic';
import type { LabAnalyteResult, RangeTone } from './types';
import styles from './lab-sparkline.module.css';

const WIDTH = 100;
const HEIGHT = 26;
const PAD_X = 8;
const PAD_Y = 5;

export type LabSparklineProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  result: LabAnalyteResult;
};

type Point = {
  x: number;
  y: number | null;
  date: string | null | undefined;
  label: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function markerTone(result: LabAnalyteResult): RangeTone {
  const flag = flagFor(result);
  if (!flag || flag.severity === 'normal') return 'optimal';
  return flag.severity === 'critical' ? 'out' : 'caution';
}

export function LabSparkline({ className, result, ...props }: LabSparklineProps) {
  const t = useT();
  const dated = resultSeries(result)
    .map((point) => ({ point, timestamp: parseLabTimestamp(point.date) }))
    .filter(
      (entry): entry is typeof entry & { timestamp: number } => entry.timestamp != null,
    );
  const numeric = dated.filter((entry) => entry.point.value.kind === 'numeric');
  if (numeric.length < 2) return null;

  const normalTiers = result.range?.tiers.filter((tier) => tier.severity === 'normal') ?? [];
  const normalLow = normalTiers.find((tier) => tier.lowerBound != null)?.lowerBound ?? null;
  const normalHigh = [...normalTiers].reverse().find((tier) => tier.upperBound != null)?.upperBound ?? null;
  const values = numeric.map((entry) =>
    entry.point.value.kind === 'numeric' ? entry.point.value.value : 0,
  );
  const boundsPool = [
    ...values,
    ...(normalLow != null ? [normalLow] : []),
    ...(normalHigh != null ? [normalHigh] : []),
  ];
  const min = Math.min(...boundsPool);
  const max = Math.max(...boundsPool);
  const span = max - min || 1;
  const pad = span * 0.16;
  const yFor = (value: number) =>
    HEIGHT - PAD_Y - ((value - (min - pad)) / (span + pad * 2)) * (HEIGHT - PAD_Y * 2);

  const minTime = Math.min(...dated.map((entry) => entry.timestamp));
  const maxTime = Math.max(...dated.map((entry) => entry.timestamp));
  const timeSpan = maxTime - minTime;
  const xFor = (timestamp: number, index: number) =>
    timeSpan > 0
      ? PAD_X + ((timestamp - minTime) / timeSpan) * (WIDTH - PAD_X * 2)
      : PAD_X + (index / Math.max(dated.length - 1, 1)) * (WIDTH - PAD_X * 2);

  const points: Point[] = dated.map(({ point, timestamp }, index) => ({
    x: xFor(timestamp, index),
    y: point.value.kind === 'numeric' ? yFor(point.value.value) : null,
    date: point.date,
    label: formatValue(point.value),
  }));

  const segments: Point[][] = [];
  let current: Point[] = [];
  for (const point of points) {
    if (point.y == null) {
      if (current.length > 1) segments.push(current);
      current = [];
    } else {
      current.push(point);
    }
  }
  if (current.length > 1) segments.push(current);

  const bandTop = normalHigh != null ? yFor(normalHigh) : PAD_Y;
  const bandBottom = normalLow != null ? yFor(normalLow) : HEIGHT - PAD_Y;
  const lastDrawn = [...points].reverse().find((point) => point.y != null);
  const description = dated
    .map(({ point }) => `${formatMonthShort(point.date, 'en-US', t)}: ${formatValue(point.value)}`)
    .join(', ');

  return (
    <span
      {...props}
      className={joinClasses(styles.sparkline, className)}
      data-slot="lab-sparkline"
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width={WIDTH}
        height={HEIGHT}
        role="img"
        aria-label={t('{name} trend — {series}')
          .replace('{name}', result.name)
          .replace('{series}', description)}
      >
        {normalTiers.length > 0 ? (
          <rect
            className={styles.band}
            x={PAD_X - 2}
            width={WIDTH - PAD_X * 2 + 4}
            y={Math.min(bandTop, bandBottom)}
            height={Math.max(2, Math.abs(bandBottom - bandTop))}
            rx={2}
          />
        ) : null}
        {segments.map((segment, index) => (
          <polyline
            key={index}
            className={styles.line}
            pathLength={1}
            points={segment.map((point) => `${point.x},${point.y}`).join(' ')}
          />
        ))}
        {/* Only the latest reading gets a marker: at this size a dot per
            point turns the trend into noise, and the line already carries
            every intermediate value. */}
        {lastDrawn && lastDrawn.y != null ? (
          <circle
            className={styles.latestDot}
            data-tone={markerTone(result)}
            cx={lastDrawn.x}
            cy={lastDrawn.y}
            r={2.8}
          />
        ) : null}
      </svg>
    </span>
  );
}
