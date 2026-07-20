'use client';

import { useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import {
  flagFor,
  formatMonthShort,
  formatValue,
  parseLabTimestamp,
  resolveTier,
  resultSeries,
  toneForSeverity,
} from './logic';
import type { LabAnalyteResult, LabResultPoint, RangeTone } from './types';
import styles from './lab-trend-chart.module.css';

const WIDTH = 392;
const HEIGHT = 190;
const INSET = { left: 12, right: 14, top: 30, bottom: 30 } as const;
/** Minimum horizontal gap before a middle axis label is dropped. */
const AXIS_LABEL_GAP = 56;

export type LabTrendChartProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  result: LabAnalyteResult;
  locale?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

type Zone = { tone: RangeTone; label: string; top: number; bottom: number };
type DatedPoint = { point: LabResultPoint; timestamp: number };

/**
 * Longitudinal single-analyte line. The reading hierarchy is inverted from a
 * generic chart: reference structure stays whisper-quiet (one tinted normal
 * band + dashed tier boundaries), while the drawn series — gradient area,
 * ink line, abnormal and latest readings — carries the emphasis.
 */
export function LabTrendChart({
  className,
  locale = 'en-US',
  result,
  ...props
}: LabTrendChartProps) {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const series: DatedPoint[] = resultSeries(result)
    .map((point) => ({ point, timestamp: parseLabTimestamp(point.date) }))
    .filter((entry): entry is DatedPoint => entry.timestamp != null);
  const numericValues = series.flatMap(({ point }) =>
    point.value.kind === 'numeric' ? [point.value.value] : [],
  );
  if (numericValues.length < 2) return null;

  const tiers = result.range?.tiers ?? [];
  const boundValues = tiers.flatMap((tier) => [
    ...(tier.lowerBound != null ? [tier.lowerBound] : []),
    ...(tier.upperBound != null ? [tier.upperBound] : []),
  ]);
  const pool = [...numericValues, ...boundValues];
  const min = Math.min(...pool);
  const max = Math.max(...pool);
  const span = max - min || 1;
  const pad = span * 0.12;
  const floor = min - pad;
  const ceiling = max + pad;

  const plotHeight = HEIGHT - INSET.top - INSET.bottom;
  const plotWidth = WIDTH - INSET.left - INSET.right;
  const baselineY = INSET.top + plotHeight;
  const yFor = (value: number) =>
    INSET.top + plotHeight - ((value - floor) / (ceiling - floor)) * plotHeight;
  const minTime = Math.min(...series.map(({ timestamp }) => timestamp));
  const maxTime = Math.max(...series.map(({ timestamp }) => timestamp));
  const timeSpan = maxTime - minTime;
  const xFor = (timestamp: number, index: number) =>
    timeSpan > 0
      ? INSET.left + ((timestamp - minTime) / timeSpan) * plotWidth
      : INSET.left + (index / Math.max(series.length - 1, 1)) * plotWidth;

  const zones: Zone[] = tiers
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((tier) => {
      const top = tier.upperBound != null ? yFor(tier.upperBound) : INSET.top;
      const bottom = tier.lowerBound != null ? yFor(tier.lowerBound) : INSET.top + plotHeight;
      return { tone: toneForSeverity(tier.severity), label: tier.label, top, bottom };
    })
    .filter((zone) => zone.bottom - zone.top > 0.5);
  // Interior tier boundaries — drawn as quiet dashed rules instead of fills.
  const boundaries = [
    ...new Set(
      zones
        .flatMap((zone) => [zone.top, zone.bottom])
        .filter((y) => y > INSET.top + 1 && y < baselineY - 1)
        .map((y) => Math.round(y * 10) / 10),
    ),
  ];

  const points = series.map(({ point, timestamp }, index) => ({
    x: xFor(timestamp, index),
    y: point.value.kind === 'numeric' ? yFor(point.value.value) : null,
    point,
  }));

  const segments: Array<Array<{ x: number; y: number }>> = [];
  let current: Array<{ x: number; y: number }> = [];
  for (const { x, y } of points) {
    if (y == null) {
      if (current.length > 1) segments.push(current);
      current = [];
    } else {
      current.push({ x, y });
    }
  }
  if (current.length > 1) segments.push(current);

  const drawn = points.flatMap((point, index) =>
    point.y == null ? [] : [{ ...point, drawnIndex: index, y: point.y }],
  );
  const latest = drawn[drawn.length - 1];
  const latestFlag = flagFor(result);
  const latestTone: RangeTone =
    latestFlag == null || latestFlag.severity === 'normal'
      ? 'optimal'
      : latestFlag.severity === 'critical'
        ? 'out'
        : 'caution';
  const active = activePoint == null ? null : points[activePoint];

  // First and last dates always label the axis; the midpoint joins only when
  // it will not collide with either neighbour.
  const firstIndex = 0;
  const lastIndex = points.length - 1;
  const midIndex = Math.floor(points.length / 2);
  const axisLabelIndexes = new Set([firstIndex, lastIndex]);
  if (
    points.length > 2 &&
    midIndex !== firstIndex &&
    midIndex !== lastIndex &&
    points[midIndex].x - points[firstIndex].x >= AXIS_LABEL_GAP &&
    points[lastIndex].x - points[midIndex].x >= AXIS_LABEL_GAP
  ) {
    axisLabelIndexes.add(midIndex);
  }
  if (points.length <= 4) {
    points.forEach((candidate, index) => {
      const previous = [...axisLabelIndexes]
        .map((labelIndex) => points[labelIndex].x)
        .filter((x) => Math.abs(x - candidate.x) < AXIS_LABEL_GAP && x !== candidate.x);
      if (previous.length === 0) axisLabelIndexes.add(index);
    });
  }

  const description = series
    .map(({ point }) => `${formatMonthShort(point.date, locale)}: ${formatValue(point.value)}`)
    .join(', ');

  return (
    <div
      {...props}
      className={joinClasses(styles.chart, className)}
      data-slot="lab-trend-chart"
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`${result.name} history — ${description}`}
      >
        {/* Reference structure: only the normal band is tinted. */}
        {zones.map((zone, index) => (
          <g key={`${zone.label}-${index}`}>
            {zone.tone === 'optimal' ? (
              <rect
                className={styles.normalBand}
                x={INSET.left}
                width={plotWidth}
                y={zone.top}
                height={zone.bottom - zone.top}
                rx={3}
              />
            ) : null}
            {zone.bottom - zone.top >= 20 ? (
              <text
                className={styles.zoneLabel}
                data-tone={zone.tone}
                x={INSET.left + 8}
                y={zone.top + 13}
              >
                {zone.label}
              </text>
            ) : null}
          </g>
        ))}
        {boundaries.map((y) => (
          <line
            key={y}
            className={styles.zoneBoundary}
            x1={INSET.left}
            x2={WIDTH - INSET.right}
            y1={y}
            y2={y}
          />
        ))}
        <line
          className={styles.baseline}
          x1={INSET.left}
          x2={WIDTH - INSET.right}
          y1={baselineY}
          y2={baselineY}
        />

        {/* Crosshair follows the active reading. */}
        {active && active.y != null ? (
          <line
            className={styles.crosshair}
            x1={active.x}
            x2={active.x}
            y1={INSET.top}
            y2={baselineY}
          />
        ) : null}

        {/* The series: an ink line. No area fill — the y-axis does not start
            at zero and vertical space already means position-vs-range, so an
            area would encode nothing and read as a fourth, unnamed zone. */}
        {segments.map((segment, index) => (
          <polyline
            key={index}
            className={styles.line}
            pathLength={1}
            points={segment.map((point) => `${point.x},${point.y}`).join(' ')}
          />
        ))}

        {points.map(({ x, y, point }, index) => {
          if (y == null) return null;
          const isLatest = latest?.drawnIndex === index;
          const tier = result.range ? resolveTier(result.range, point.value) : null;
          const tone: RangeTone = isLatest
            ? latestTone
            : tier
              ? toneForSeverity(tier.severity)
              : 'optimal';
          const isAbnormal = tone !== 'optimal';
          const showLabel = isLatest || isAbnormal || activePoint === index;
          const pointLabel = `${formatMonthShort(point.date, locale)} · ${formatValue(point.value)}${result.unit ? ` ${result.unit}` : ''} · ${point.episodeLabel}`;
          return (
            <g
              key={`${point.episodeId}-${point.date ?? 'unknown'}-${index}`}
              className={styles.point}
              data-slot="lab-chart-point"
              tabIndex={0}
              role="img"
              aria-label={pointLabel}
              onBlur={() => setActivePoint(null)}
              onFocus={() => setActivePoint(index)}
              onMouseEnter={() => setActivePoint(index)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <title>{pointLabel}</title>
              {showLabel ? (
                <text
                  className={styles.valueLabel}
                  data-latest={isLatest || undefined}
                  data-tone={tone}
                  x={x}
                  y={y - 11}
                  textAnchor="middle"
                >
                  {formatValue(point.value)}
                </text>
              ) : null}
              <circle className={styles.pointHit} cx={x} cy={y} r={10} />
              {isLatest ? (
                <circle
                  className={styles.latestDot}
                  data-tone={tone}
                  cx={x}
                  cy={y}
                  r={5}
                />
              ) : (
                <circle
                  className={styles.pointDot}
                  data-abnormal={isAbnormal || undefined}
                  data-tone={tone}
                  cx={x}
                  cy={y}
                  r={isAbnormal ? 3.5 : 2.75}
                />
              )}
            </g>
          );
        })}

        {points.map(({ x, point }, index) =>
          axisLabelIndexes.has(index) ? (
            <text
              key={`${point.episodeId}-axis-${index}`}
              className={styles.axisLabel}
              x={x}
              y={HEIGHT - 8}
              textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}
            >
              {formatMonthShort(point.date, locale)}
            </text>
          ) : null,
        )}
      </svg>
      <p className={styles.pointSummary} aria-live="polite">
        {active
          ? `${formatMonthShort(active.point.date, locale)} · ${formatValue(active.point.value)}${result.unit ? ` ${result.unit}` : ''} · ${active.point.episodeLabel}`
          : 'Hover or focus a chart point for draw details.'}
      </p>
    </div>
  );
}
