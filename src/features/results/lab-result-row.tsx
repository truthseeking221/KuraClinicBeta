'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { useT } from '../../components/foundations/i18n';
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

/** Longitudinal context is review context: only an explicit latest-only read drops it. */
function showsTrend(mode: LabResultRowMode): boolean {
  return mode !== 'latest' && mode !== 'first-visit';
}

/**
 * Ordinary lab progress is not news: it stays neutral. Only a line held for
 * manual review carries tone, because that is the one pre-release state that
 * can stall an episode.
 */
const PENDING_TONE: Partial<Record<TestStatus, 'neutral' | 'warning'>> = {
  manual_review: 'warning',
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
  const t = useT();
  if (result.status === 'dismissed') return null;

  const released = result.status === 'released';
  const flag = released ? flagFor(result) : null;
  const trend = released ? trendFor(result) : null;
  const reference = rangeDisplay(result.range);
  const statusCopy = TEST_STATUS_COPY[result.status];
  const severity = flag?.severity ?? null;
  const tone =
    severity === 'critical'
      ? 'out'
      : severity === 'abnormal'
        ? 'caution'
        : released
          ? 'optimal'
          : undefined;

  /**
   * One evidence grammar for every released row: the value against its
   * reference scale. Trend is context beside that scale, never a replacement —
   * a critical value must not lose its reference because the patient happens
   * to have earlier draws. Non-quantitative results keep the draw strip.
   */
  let evidence: ReactNode = null;
  if (released) {
    evidence =
      result.range?.valueType === 'qn' ? (
        <LabRangeBand range={result.range} value={result.value} />
      ) : (
        <LabDrawStrip result={result} locale={locale} maxDraws={mode === 'latest' ? 1 : 6} />
      );
  }

  const trendLabel =
    released && trend && showsTrend(mode) ? (
      <span className={styles.trendLabel} data-direction={trend.direction}>
        {trend.direction === 'stable' ? (
          <MinusIcon size={16} aria-hidden="true" />
        ) : trend.delta != null && trend.delta > 0 ? (
          <ArrowUpIcon size={16} aria-hidden="true" />
        ) : (
          <ArrowDownIcon size={16} aria-hidden="true" />
        )}
        {t(trendCopy(trend))}
      </span>
    ) : null;

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
        {/* Released value and lifecycle badge share one line slot so every row
            keeps the same three-line anatomy and the same height. */}
        <div className={styles.valueLine}>
          {released ? (
            <>
              <span className={styles.value} data-tone={tone}>
                {formatValue(result.value)}
              </span>
              {result.unit ? <span className={styles.unit}>{result.unit}</span> : null}
            </>
          ) : (
            <Badge
              size="sm"
              variant={isCancelled ? 'neutral' : (PENDING_TONE[result.status] ?? 'neutral')}
            >
              {t(statusCopy.label)}
            </Badge>
          )}
        </div>
        <div className={styles.statusLine}>
          {released && flag ? (
            <span className={styles.flagLabel} data-tone={tone}>
              {flag.label}
            </span>
          ) : null}
          <span className={styles.reference}>
            {released
              ? reference
                ? t('Reference {range}').replace('{range}', reference)
                : result.range?.valueType === 'ord' || result.range?.valueType === 'semi_qn'
                  ? t('Qualitative result')
                  : t('No applicable reference')
              : t(statusCopy.description)}
          </span>
          {released && result.verificationMode === 'crelio_flagged' ? (
            <span className={styles.provenance}>{t('Lab-flagged')}</span>
          ) : null}
          {released && result.verificationMode === 'manual' ? (
            <span className={styles.provenance}>{t('Manually verified')}</span>
          ) : null}
        </div>
      </div>
      <div className={styles.evidence}>
        {evidence}
        {trendLabel}
      </div>
      <div className={styles.action}>{trailing}</div>
    </div>
  );
}
