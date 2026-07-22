import type { Translate } from '../../components/foundations/i18n';
import type {
  EpisodeProgress,
  LabAnalyteResult,
  LabFlag,
  LabResultPoint,
  LabResultSection,
  LabResultValue,
  LabTrend,
  OrderResultStatus,
  RangeMarker,
  RangeTone,
  RangeZone,
  ReferenceRange,
  ReferenceTier,
  TestStatus,
  TierSeverity,
} from './types';

/**
 * Keeps every label builder callable outside a locale context — tests, server
 * code, and the English language of record all get the untranslated source.
 * Counts are substituted after translation so the key stays a static literal.
 */
const untranslated: Translate = (source) => source;

function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [token, value]) => text.replace(`{${token}}`, String(value)),
    template,
  );
}

function sortedTiers(range: ReferenceRange): ReferenceTier[] {
  return [...range.tiers].sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Half-open `[lowerBound, upperBound)`; null bound is unbounded. */
export function resolveTier(range: ReferenceRange, value: LabResultValue): ReferenceTier | null {
  if (value.kind === 'missing') return null;

  const tiers = sortedTiers(range);
  if (value.kind === 'text') {
    return tiers.find((tier) => tier.textValue != null && tier.textValue === value.value) ?? null;
  }

  return (
    tiers.find((tier) => {
      const aboveLower = tier.lowerBound == null || value.value >= tier.lowerBound;
      const belowUpper = tier.upperBound == null || value.value < tier.upperBound;
      return aboveLower && belowUpper;
    }) ?? null
  );
}

function normalTierIndexes(tiers: ReferenceTier[]): number[] {
  return tiers.flatMap((tier, index) => (tier.severity === 'normal' ? [index] : []));
}

/** Supports one or multiple adjacent normal tiers without mis-flagging either tier. */
export function flagFor(result: LabAnalyteResult): LabFlag | null {
  if (result.status !== 'released' || !result.range) return null;
  const tier = resolveTier(result.range, result.value);
  if (!tier) return null;

  const tiers = sortedTiers(result.range);
  const tierIndex = tiers.indexOf(tier);
  const normalIndexes = normalTierIndexes(tiers);
  const firstNormal = normalIndexes[0];
  const lastNormal = normalIndexes[normalIndexes.length - 1];
  const direction =
    tier.severity === 'normal' || firstNormal == null || lastNormal == null
      ? null
      : tierIndex < firstNormal
        ? 'low'
        : tierIndex > lastNormal
          ? 'high'
          : null;

  return { severity: tier.severity, label: tier.label, direction };
}

const TONE_BY_SEVERITY: Record<TierSeverity, RangeTone> = {
  normal: 'optimal',
  abnormal: 'caution',
  critical: 'out',
};

export function toneForSeverity(severity: TierSeverity): RangeTone {
  return TONE_BY_SEVERITY[severity];
}

function formatBound(bound: number): string {
  return String(bound);
}

export function zoneLabel(tier: ReferenceTier): string {
  if (tier.textValue != null) return tier.textValue;
  const low = tier.lowerBound;
  const high = tier.upperBound;
  if (low == null && high == null) return tier.label;
  if (low == null) return `<${formatBound(high as number)}`;
  if (high == null) return `≥${formatBound(low)}`;
  return `${formatBound(low)}–${formatBound(high)}`;
}

export function zonesFor(range: ReferenceRange): RangeZone[] {
  return sortedTiers(range).map((tier) => ({
    label: zoneLabel(tier),
    tone: toneForSeverity(tier.severity),
    tier,
  }));
}

export function markerFor(range: ReferenceRange, value: LabResultValue): RangeMarker | null {
  const tier = resolveTier(range, value);
  if (!tier) return null;
  const zones = zonesFor(range);
  const zoneIndex = zones.findIndex((zone) => zone.tier === tier);
  if (zoneIndex === -1) return null;

  let fraction = 0.5;
  if (value.kind === 'numeric' && tier.lowerBound != null && tier.upperBound != null) {
    const span = tier.upperBound - tier.lowerBound;
    fraction = span > 0 ? (value.value - tier.lowerBound) / span : 0.5;
    fraction = Math.min(0.94, Math.max(0.06, fraction));
  }

  return { zoneIndex, fraction, tone: zones[zoneIndex].tone };
}

/** Coalesces adjacent normal tiers into one honest display interval. */
export function rangeDisplay(range: ReferenceRange | null | undefined): string | null {
  if (!range) return null;
  if (range.display) return range.display;
  const normal = sortedTiers(range).filter((tier) => tier.severity === 'normal');
  if (normal.length === 0) return null;
  if (range.valueType !== 'qn') {
    return normal.map((tier) => tier.textValue ?? tier.label).join(', ');
  }

  const low = normal[0]?.lowerBound ?? null;
  const high = normal[normal.length - 1]?.upperBound ?? null;
  return zoneLabel({
    ...normal[0],
    lowerBound: low,
    upperBound: high,
  });
}

const TERMINAL_STATUSES: ReadonlySet<TestStatus> = new Set(['released', 'cancelled', 'dismissed']);

export function isTerminal(status: TestStatus): boolean {
  return TERMINAL_STATUSES.has(status);
}

export const TEST_STATUS_COPY: Record<TestStatus, { label: string; description: string }> = {
  awaiting_sample: { label: 'Awaiting sample', description: 'No sample received yet.' },
  in_lab: { label: 'In lab', description: 'Sample accepted by the lab.' },
  in_progress: { label: 'Running', description: 'Analysis in progress.' },
  resulted: { label: 'Verifying', description: 'Values received — verification pending.' },
  manual_review: { label: 'In review', description: 'Held for manual review by the lab.' },
  signed: { label: 'Signed', description: 'Verified — releasing.' },
  autoverified: { label: 'Verified', description: 'Auto-verified — releasing.' },
  released: { label: 'Released', description: 'Result released.' },
  cancelled: { label: 'Cancelled', description: 'Test cancelled before verification.' },
  dismissed: { label: 'Dismissed', description: 'Dismissed by lab quality control.' },
};

type ActiveTestLine = {
  orderLineItemId: string;
  testId: string;
  status: TestStatus;
};

/**
 * Returns one active execution representative per order line. Redraw
 * predecessors are excluded by `supersedesTestId`; panel analytes collapse to
 * one line through the shared `testId`.
 */
export function activeTestLines(results: LabAnalyteResult[]): ActiveTestLine[] {
  const supersededTestIds = new Set(
    results.flatMap((result) => (result.supersedesTestId ? [result.supersedesTestId] : [])),
  );
  const activeByLine = new Map<string, ActiveTestLine>();

  for (const result of results) {
    if (supersededTestIds.has(result.testId)) continue;
    const current = activeByLine.get(result.orderLineItemId);
    if (!current || current.testId !== result.testId) {
      activeByLine.set(result.orderLineItemId, {
        orderLineItemId: result.orderLineItemId,
        testId: result.testId,
        status: result.status,
      });
    }
  }

  return [...activeByLine.values()];
}

/** Human-facing rows never include dismissed QC executions or redraw predecessors. */
export function visibleResults(results: LabAnalyteResult[]): LabAnalyteResult[] {
  const activeIds = new Set(activeTestLines(results).map((line) => line.testId));
  return results.filter((result) => activeIds.has(result.testId) && result.status !== 'dismissed');
}

export function visibleSections(sections: LabResultSection[]): LabResultSection[] {
  return sections
    .map((section) => ({ ...section, results: visibleResults(section.results) }))
    .filter((section) => section.results.length > 0);
}

/** ADR-0047 roll-up: active order lines, not analyte rows. */
export function episodeProgress(results: LabAnalyteResult[]): EpisodeProgress {
  const active = activeTestLines(results);
  const total = active.length;
  const released = active.filter((line) => line.status === 'released').length;
  const terminal = active.filter((line) => isTerminal(line.status)).length;
  const unavailable = active.filter(
    (line) => line.status === 'cancelled' || line.status === 'dismissed',
  ).length;
  const pending = total - terminal;

  let status: OrderResultStatus;
  if (total === 0) {
    status = 'placed';
  } else if (terminal === total) {
    status = released >= 1 ? 'completed' : 'cancelled';
  } else if (terminal >= 1) {
    status = 'partially_complete';
  } else if (
    active.some((line) => line.status !== 'awaiting_sample' && !isTerminal(line.status))
  ) {
    status = 'in_fulfillment';
  } else {
    status = 'placed';
  }

  return { total, released, terminal, unavailable, pending, status };
}

export function episodeProgressLabel(
  progress: EpisodeProgress,
  t: Translate = untranslated,
): string {
  if (progress.total === 0) return t('No tests in this episode');
  if (progress.status === 'cancelled') return t('No results — episode cancelled');
  if (progress.released === progress.total) {
    return fill(t('All {total} results ready'), { total: progress.total });
  }
  const ready = fill(t('{released} of {total} ready'), {
    released: progress.released,
    total: progress.total,
  });
  const unavailable =
    progress.unavailable > 0
      ? ` · ${fill(t('{count} unavailable'), { count: progress.unavailable })}`
      : '';
  return `${ready}${unavailable}`;
}

/**
 * A section header states what is still outstanding; the episode badge states
 * overall progress. Two scopes, two sentences — never the same count twice.
 * Terminal-but-unavailable lines are not pending, so the parts never overlap.
 */
export function sectionOutstandingLabel(
  progress: EpisodeProgress,
  t: Translate = untranslated,
): string | undefined {
  const parts: string[] = [];
  if (progress.pending > 0) {
    parts.push(fill(t('{count} pending'), { count: progress.pending }));
  }
  if (progress.unavailable > 0) {
    parts.push(fill(t('{count} unavailable'), { count: progress.unavailable }));
  }
  return parts.length > 0 ? parts.join(' · ') : undefined;
}

function normalIntervals(range: ReferenceRange): Array<{ low: number; high: number }> {
  return sortedTiers(range)
    .filter((tier) => tier.severity === 'normal')
    .map((tier) => ({
      low: tier.lowerBound ?? Number.NEGATIVE_INFINITY,
      high: tier.upperBound ?? Number.POSITIVE_INFINITY,
    }));
}

function numericPoints(history: LabResultPoint[] | undefined): Array<LabResultPoint & { num: number }> {
  return (history ?? []).flatMap((point) =>
    point.value.kind === 'numeric' ? [{ ...point, num: point.value.value }] : [],
  );
}

export function trendFor(result: LabAnalyteResult): LabTrend | null {
  if (result.value.kind !== 'numeric' || !result.history?.length) return null;
  const prior = numericPoints(result.history);
  const previous = prior[prior.length - 1];
  if (!previous) return null;

  const current = result.value.value;
  const delta = current - previous.num;
  const since: LabResultPoint = {
    date: previous.date,
    value: { kind: 'numeric', value: previous.num },
    episodeId: previous.episodeId,
    episodeLabel: previous.episodeLabel,
    testId: previous.testId,
    sourceLabel: previous.sourceLabel,
  };

  const intervals = result.range ? normalIntervals(result.range) : [];
  if (intervals.length === 0) return { direction: 'stable', since, delta };

  const distance = (num: number) =>
    Math.min(
      ...intervals.map(({ high, low }) => (num < low ? low - num : num >= high ? num - high : 0)),
    );
  const finiteBounds = intervals.flatMap(({ high, low }) => [
    ...(Number.isFinite(low) ? [low] : []),
    ...(Number.isFinite(high) ? [high] : []),
  ]);
  const span =
    finiteBounds.length >= 2
      ? Math.max(...finiteBounds) - Math.min(...finiteBounds)
      : Math.abs(finiteBounds[0] ?? 1);
  const tolerance = Math.max(span * 0.02, Number.EPSILON);
  const change = distance(current) - distance(previous.num);

  if (Math.abs(change) <= tolerance) return { direction: 'stable', since, delta };
  return { direction: change < 0 ? 'improving' : 'worsening', since, delta };
}

export function formatValue(value: LabResultValue): string {
  if (value.kind === 'missing') return '—';
  if (value.kind === 'text') return value.value;
  return value.display ?? String(value.value);
}

/** Historical observations plus the current released observation. */
export function resultSeries(result: LabAnalyteResult): LabResultPoint[] {
  const current =
    result.status === 'released' && result.value.kind !== 'missing'
      ? [
          {
            date: result.observedAt ?? result.releasedAt,
            value: result.value,
            episodeId: `current-${result.orderLineItemId}`,
            episodeLabel: 'Current episode',
            testId: result.testId,
          } satisfies LabResultPoint,
        ]
      : [];
  // Chronological, oldest first. Fixture and wire order are not trustworthy,
  // and every consumer that draws a line or picks "latest" depends on time
  // order — an unsorted series renders as a trend that doubles back on
  // itself. Stable sort keeps undated points in their given order, last.
  return [...(result.history ?? []), ...current].sort((a, b) => {
    const timeA = parseLabTimestamp(a.date);
    const timeB = parseLabTimestamp(b.date);
    if (timeA == null && timeB == null) return 0;
    if (timeA == null) return 1;
    if (timeB == null) return -1;
    return timeA - timeB;
  });
}

/** Safe ISO/date parser. Invalid or absent timestamps stay unavailable. */
export function parseLabTimestamp(iso: string | null | undefined): number | null {
  if (!iso?.trim()) return null;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  const timestamp = Date.parse(dateOnly ? `${iso}T12:00:00Z` : iso);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function formatDate(
  iso: string | null | undefined,
  locale = 'en-US',
  t: Translate = untranslated,
): string {
  const timestamp = parseLabTimestamp(iso);
  if (timestamp == null) return t('Date unavailable');
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(timestamp);
}

export function formatMonthShort(
  iso: string | null | undefined,
  locale = 'en-US',
  t: Translate = untranslated,
): string {
  const timestamp = parseLabTimestamp(iso);
  if (timestamp == null) return t('Unknown date');
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(timestamp);
}
