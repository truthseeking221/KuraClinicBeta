'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Badge } from '../../components/ui/badge';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '../../components/ui/icons';
import {
  TEST_STATUS_COPY,
  flagFor,
  formatValue,
  rangeDisplay,
  trendFor,
} from './logic';
import { LabDrawStrip } from './lab-draw-strip';
import { LabRangeBand } from './lab-range-band';
import { LabSparkline } from './lab-sparkline';
import type { LabAnalyteResult, LabTrend, TestStatus } from './types';
import styles from './lab-result-row.module.css';

export type LabResultRowMode = 'auto' | 'first-visit' | 'latest' | 'trend';

export type LabResultRowProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'result'> & {
  result: LabAnalyteResult;
  mode?: LabResultRowMode;
  locale?: string;
  trailing?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const PENDING_TONE: Partial<Record<TestStatus, 'neutral' | 'info' | 'warning'>> = {
  awaiting_sample: 'neutral',
  in_lab: 'info',
  in_progress: 'info',
  resulted: 'info',
  manual_review: 'warning',
  signed: 'info',
  autoverified: 'info',
};

function trendCopy(trend: LabTrend): string {
  if (trend.direction === 'improving') return 'Improving';
  if (trend.direction === 'worsening') return 'Worsening';
  return 'Stable';
}

export function LabResultRow({
  className,
  locale = 'en-US',
  mode = 'auto',
  result,
  trailing,
  ...props
}: LabResultRowProps) {
  if (result.status === 'dismissed') return null;

  const released = result.status === 'released';
  const flag = released ? flagFor(result) : null;
  const trend = released ? trendFor(result) : null;
  const reference = rangeDisplay(result.range);
  const statusCopy = TEST_STATUS_COPY[result.status];
  const hasHistory = (result.history ?? []).length > 0;
  const numericHistory = (result.history ?? []).filter((point) => point.value.kind === 'numeric');
  const severity = flag?.severity ?? null;
  const tone =
    severity === 'critical'
      ? 'out'
      : severity === 'abnormal'
        ? 'caution'
        : released
          ? 'optimal'
          : undefined;
  const resolvedMode =
    mode === 'auto' ? (hasHistory ? 'trend' : 'first-visit') : mode;

  let visual: ReactNode = null;
  if (released) {
    if (
      (resolvedMode === 'first-visit' || resolvedMode === 'latest') &&
      result.range?.valueType === 'qn'
    ) {
      visual = <LabRangeBand range={result.range} value={result.value} />;
    } else if (
      resolvedMode === 'trend' &&
      numericHistory.length >= 1 &&
      result.value.kind === 'numeric'
    ) {
      visual = (
        <div className={styles.trendCell}>
          <LabSparkline result={result} />
          {trend ? (
            <span className={styles.trendLabel} data-direction={trend.direction}>
              {trend.direction === 'stable' ? (
                <MinusIcon size={16} aria-hidden="true" />
              ) : trend.delta != null && trend.delta > 0 ? (
                <ArrowUpIcon size={16} aria-hidden="true" />
              ) : (
                <ArrowDownIcon size={16} aria-hidden="true" />
              )}
              {trendCopy(trend)}
            </span>
          ) : null}
        </div>
      );
    } else {
      visual = <LabDrawStrip result={result} locale={locale} maxDraws={resolvedMode === 'latest' ? 1 : 6} />;
    }
  }

  const isCancelled = result.status === 'cancelled';

  return (
    <div
      {...props}
      className={joinClasses(styles.row, className)}
      data-slot="lab-result-row"
      data-status={result.status}
      data-severity={severity ?? undefined}
    >
      <div className={styles.identity}>
        <div className={styles.nameLine}>
          <p className={styles.name}>{result.name}</p>
          {result.panelName ? (
            <span className={styles.panelName}>{result.panelName}</span>
          ) : null}
        </div>
        {released ? (
          <div className={styles.valueLine}>
            <span className={styles.value} data-tone={tone}>
              {formatValue(result.value)}
            </span>
            {result.unit ? <span className={styles.unit}>{result.unit}</span> : null}
          </div>
        ) : (
          <div className={styles.pendingLine}>
            <Badge
              size="sm"
              variant={isCancelled ? 'neutral' : (PENDING_TONE[result.status] ?? 'neutral')}
            >
              {statusCopy.label}
            </Badge>
          </div>
        )}
        <div className={styles.statusLine}>
          {released && flag ? (
            <span className={styles.flagLabel} data-tone={tone}>
              {flag.label}
            </span>
          ) : null}
          <span className={styles.reference}>
            {released
              ? reference
                ? `Reference ${reference}`
                : result.range?.valueType === 'ord' || result.range?.valueType === 'semi_qn'
                  ? 'Qualitative result'
                  : 'No applicable reference'
              : statusCopy.description}
          </span>
          {released && result.verificationMode === 'crelio_flagged' ? (
            <span className={styles.provenance}>Lab-flagged</span>
          ) : null}
          {released && result.verificationMode === 'manual' ? (
            <span className={styles.provenance}>Manually verified</span>
          ) : null}
        </div>
      </div>
      <div className={styles.visual} data-empty={!visual || undefined}>
        {visual}
        {trailing ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
    </div>
  );
}
