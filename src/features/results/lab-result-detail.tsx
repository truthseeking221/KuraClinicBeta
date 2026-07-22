'use client';

import { useEffect, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { useT } from '../../components/foundations/i18n';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../components/ui/collapsible';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../components/ui/hover-card';
import { HistoryIcon } from '../../components/ui/icons';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../components/ui/sheet';
import {
  TEST_STATUS_COPY,
  flagFor,
  formatDate,
  formatValue,
  parseLabTimestamp,
  rangeDisplay,
  resultSeries,
} from './logic';
import { LabDrawStrip } from './lab-draw-strip';
import { LabTrendChart } from './lab-trend-chart';
import type { LabAnalyteResult } from './types';
import styles from './lab-result-detail.module.css';

export type LabResultDetailProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  result: LabAnalyteResult;
  locale?: string;
  compact?: boolean;
};

export type LabResultDetailTriggerProps = {
  result: LabAnalyteResult;
  locale?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/** Same tone vocabulary as the result row, so the value reads identically
 *  whether it is in the flowsheet, the hover preview, or the history sheet. */
function toneFor(result: LabAnalyteResult): 'optimal' | 'caution' | 'out' | undefined {
  const flag = flagFor(result);
  if (!flag) return undefined;
  if (flag.severity === 'critical') return 'out';
  if (flag.severity === 'abnormal') return 'caution';
  return 'optimal';
}

function severityLabel(result: LabAnalyteResult, tone: ReturnType<typeof toneFor>) {
  const flag = flagFor(result);
  if (!flag) return null;
  return (
    <span className={styles.flagLabel} data-tone={tone}>
      {flag.label}
    </span>
  );
}

function useBottomSheet() {
  const [bottomSheet, setBottomSheet] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 48rem)');
    const update = () => setBottomSheet(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return bottomSheet;
}

export function LabResultDetail({
  className,
  compact = false,
  locale = 'en-US',
  result,
  ...props
}: LabResultDetailProps) {
  const t = useT();
  const released = result.status === 'released';
  const reference = rangeDisplay(result.range);
  const observed = result.observedAt ?? result.releasedAt;
  const series = resultSeries(result);
  const datedNumericCount = series.filter(
    (point) => point.value.kind === 'numeric' && parseLabTimestamp(point.date) != null,
  ).length;

  return (
    <section
      {...props}
      className={joinClasses(styles.detail, compact && styles.compact, className)}
      data-slot="lab-result-detail"
    >
      <div className={styles.status}>
        {released ? (
          <>
            <span className={styles.value} data-tone={toneFor(result)}>
              {formatValue(result.value)}
            </span>
            {result.unit ? <span className={styles.unit}>{result.unit}</span> : null}
            {severityLabel(result, toneFor(result))}
            <span className={styles.meta}>{formatDate(observed, locale, t)}</span>
            {reference ? (
              <span className={styles.meta}>
                {t('Reference {range}').replace('{range}', reference)}
              </span>
            ) : null}
          </>
        ) : (
          <>
            <Badge size="sm" variant={result.status === 'manual_review' ? 'warning' : 'neutral'}>
              {t(TEST_STATUS_COPY[result.status].label)}
            </Badge>
            <span className={styles.meta}>
              {t(TEST_STATUS_COPY[result.status].description)}
            </span>
          </>
        )}
      </div>

      {released && datedNumericCount >= 2 ? (
        <LabTrendChart result={result} locale={locale} />
      ) : released ? (
        <LabDrawStrip result={result} locale={locale} />
      ) : null}

      {released && parseLabTimestamp(observed) == null ? (
        <p className={styles.note}>
          {t(
            'The latest result has no usable observation timestamp and is not plotted on the time axis.',
          )}
        </p>
      ) : null}
      {result.value.kind === 'missing' && released ? (
        <p className={styles.note}>{t('Not in this draw — absence is not read as normal.')}</p>
      ) : null}

      {!compact && series.length > 0 ? (
        <Collapsible className={styles.history} defaultOpen>
          <CollapsibleTrigger>{t('Full released history')}</CollapsibleTrigger>
          <CollapsibleContent>
            <ol className={styles.historyList}>
              {[...series].reverse().map((point, index) => (
                <li
                  className={styles.historyItem}
                  key={`${point.episodeId}-${point.date ?? 'unknown'}-${index}`}
                >
                  <span className={styles.historyValue}>
                    {formatValue(point.value)}
                    {point.value.kind !== 'missing' && result.unit ? ` ${result.unit}` : ''}
                  </span>
                  <span className={styles.historyMeta}>
                    {formatDate(point.date, locale, t)} · {t(point.episodeLabel)}
                  </span>
                </li>
              ))}
            </ol>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </section>
  );
}

/**
 * Pointer/focus gets a supplementary preview; click/tap opens the complete,
 * focus-managed history in a side sheet or mobile bottom sheet.
 */
export function LabResultDetailTrigger({
  locale = 'en-US',
  result,
}: LabResultDetailTriggerProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const bottomSheet = useBottomSheet();
  const label = t('View {name} history').replace('{name}', result.name);

  return (
    <>
      {/* The preview yields to the sheet: the same history must never be open
          on two stacked surfaces at once. */}
      <HoverCard open={previewOpen && !open} onOpenChange={setPreviewOpen}>
        <HoverCardTrigger asChild>
          <Button
            aria-haspopup="dialog"
            aria-label={label}
            size="compact"
            variant="ghost"
            leadingIcon={<HistoryIcon size={16} aria-hidden="true" />}
            onClick={() => setOpen(true)}
          >
            {t('History')}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="end" size="lg">
          <h3 className={styles.previewTitle}>{result.name}</h3>
          <LabResultDetail compact locale={locale} result={result} />
          <p className={styles.previewHint}>{t('Click for the complete released history.')}</p>
        </HoverCardContent>
      </HoverCard>

      <Sheet open={open} onOpenChange={setOpen}>
        {open ? (
          <SheetContent side={bottomSheet ? 'bottom' : 'right'}>
            <SheetHeader>
              <div>
                <SheetTitle>{result.name}</SheetTitle>
                <SheetDescription>
                  {t('Released longitudinal history and the applicable catalog reference range.')}
                </SheetDescription>
              </div>
              <SheetClose aria-label={t('Close {name} history').replace('{name}', result.name)} />
            </SheetHeader>
            <SheetBody>
              <LabResultDetail locale={locale} result={result} />
            </SheetBody>
          </SheetContent>
        ) : null}
      </Sheet>
    </>
  );
}
