'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from '../../components/shared/empty-state';
import {
  WorkspacePage,
  WorkspacePageHeader,
} from '../../components/shared/workspace-page';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  CheckIcon,
  LockKeyIcon,
  RefreshIcon,
  WarningIcon,
  WifiErrorIcon,
} from '../../components/ui/icons';
import {
  episodeProgress,
  episodeProgressLabel,
  flagFor,
  formatDate,
  resultSeries,
  visibleSections,
} from './logic';
import { LabFlowsheet } from './lab-flowsheet';
import { LabResultDetailTrigger } from './lab-result-detail';
import {
  ResultsToolbar,
  type ResultsHistoryMode,
} from './results-toolbar';
import type {
  LabAnalyteResult,
  LabResultSection,
  ResultsDataState,
  ResultsFilter,
  ResultsPatient,
} from './types';
import styles from './results-workspace.module.css';

export type ResultsWorkspaceProps = {
  /** Omitted only for the clinic-level inbox before any patient exists. */
  patient?: ResultsPatient;
  episodeLabel: string;
  sections: LabResultSection[];
  state?: ResultsDataState;
  staleAt?: string | null;
  readOnly?: boolean;
  initialQuery?: string;
  initialFilter?: ResultsFilter;
  initialHistoryMode?: ResultsHistoryMode;
  onRetry?: () => void;
};

function matchesFilter(result: LabAnalyteResult, filter: ResultsFilter) {
  const flag = flagFor(result);
  if (filter === 'flagged') return flag?.severity === 'abnormal' || flag?.severity === 'critical';
  if (filter === 'critical') return flag?.severity === 'critical';
  if (filter === 'no_reference') return result.status === 'released' && !result.range;
  if (filter === 'pending') return !['released', 'cancelled', 'dismissed'].includes(result.status);
  return true;
}

export function ResultsWorkspace({
  episodeLabel,
  initialFilter = 'all',
  initialHistoryMode = 'full',
  initialQuery = '',
  onRetry,
  patient,
  readOnly = false,
  sections,
  staleAt,
  state = 'ready',
}: ResultsWorkspaceProps) {
  const t = useT();
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<ResultsFilter>(initialFilter);
  const [historyMode, setHistoryMode] = useState<ResultsHistoryMode>(initialHistoryMode);
  const allResults = sections.flatMap((section) => section.results);
  const progress = episodeProgress(allResults);
  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return visibleSections(sections)
      .map((section) => ({
        ...section,
        results: section.results.filter((result) => {
          const searchable = [
            result.name,
            result.analyteCode,
            result.panelName,
            result.panelCode,
          ]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase();
          return (
            (!normalizedQuery || searchable.includes(normalizedQuery)) &&
            matchesFilter(result, filter)
          );
        }),
      }))
      .filter((section) => section.results.length > 0);
  }, [filter, query, sections]);
  const hasActiveFilter = query.trim().length > 0 || filter !== 'all';

  const reset = () => {
    setQuery('');
    setFilter('all');
    setHistoryMode('full');
  };

  return (
    <WorkspacePage aria-labelledby="results-workspace-title" data-slot="results-workspace">
      <WorkspacePageHeader
        actions={
          progress.total > 0 ? (
            <Badge
              size="md"
              variant={
                progress.status === 'completed'
                  ? progress.unavailable > 0
                    ? 'warning'
                    : 'neutral'
                  : progress.status === 'cancelled'
                    ? 'neutral'
                    : 'info'
              }
              leading={
                progress.status === 'completed' && progress.unavailable === 0 ? (
                  <CheckIcon size={16} />
                ) : undefined
              }
            >
              {episodeProgressLabel(progress, t)}
            </Badge>
          ) : undefined
        }
        description={
          patient
            ? `${patient.name} · ${patient.medicalRecordNumber} · ${t('born')} ${formatDate(
                patient.dob,
                'en-US',
                t,
              )}`
            : t('Review released laboratory results across this workspace.')
        }
        headingId="results-workspace-title"
        title={t('Results')}
      />

      {state === 'loading' ? (
        <Alert tone="info" role="status">
          <AlertTitle>{t('Loading released results')}</AlertTitle>
          <AlertDescription>
            {t('The workspace will preserve filters and focus when the episode is ready.')}
          </AlertDescription>
        </Alert>
      ) : null}

      {state === 'error' ? (
        <Alert tone="danger" icon={<WarningIcon />}>
          <AlertTitle>{t('Results could not be loaded')}</AlertTitle>
          <AlertDescription>
            {t('No clinical value is inferred from this failure. Retry the episode request.')}
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button
                size="sm"
                variant="outline"
                leadingIcon={<RefreshIcon size={16} aria-hidden="true" />}
                onClick={onRetry}
              >
                {t('Retry')}
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {state === 'conflict' ? (
        <Alert tone="warning" icon={<WarningIcon />}>
          <AlertTitle>{t('Results changed during review')}</AlertTitle>
          <AlertDescription>
            {t(
              'A release, cancellation, redraw, or add-on changed this episode. Refresh before any acknowledgment or closure decision.',
            )}
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button
                size="sm"
                variant="outline"
                leadingIcon={<RefreshIcon size={16} aria-hidden="true" />}
                onClick={onRetry}
              >
                {t('Refresh episode')}
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {state === 'permission' ? (
        <EmptyState align="center" surface="outlined">
          <EmptyStateHeader>
            <EmptyStateTitle>{t('Results are restricted')}</EmptyStateTitle>
            <EmptyStateDescription>
              {t(
                "Your current clinic role cannot view this patient's released laboratory results.",
              )}
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <LockKeyIcon size={24} aria-hidden="true" />
          </EmptyStateContent>
        </EmptyState>
      ) : null}

      {state === 'empty' ? (
        <EmptyState align="center" className={styles.emptyState} surface="outlined">
          <EmptyStateHeader>
            <EmptyStateMedia className={styles.emptyIllustration}>
              <Image
                alt=""
                className={styles.emptyIllustrationImage}
                height={1254}
                priority
                sizes="160px"
                src="/generated/kura-results-empty-review-v1.png"
                width={1254}
              />
            </EmptyStateMedia>
            <EmptyStateTitle>
              {t(patient ? 'No result episodes' : 'No results to review')}
            </EmptyStateTitle>
            <EmptyStateDescription>
              {t(
                patient
                  ? 'This patient has no released or pending laboratory episode to review.'
                  : 'No patient result episodes are available in this workspace.',
              )}
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      ) : null}

      {state === 'offline' ? (
        <Alert tone="warning" icon={<WifiErrorIcon />}>
          <AlertTitle>{t('Offline — showing cached results')}</AlertTitle>
          <AlertDescription>
            {t('Values may be stale. Actions that change clinical state are unavailable.')}
          </AlertDescription>
        </Alert>
      ) : null}

      {staleAt ? (
        <Alert tone="warning" icon={<WarningIcon />}>
          <AlertTitle>{t('Result snapshot may be stale')}</AlertTitle>
          <AlertDescription>
            {t('Last synchronized')} {formatDate(staleAt, 'en-US', t)}.
          </AlertDescription>
        </Alert>
      ) : null}

      {readOnly ? (
        <Alert tone="info" icon={<LockKeyIcon />}>
          <AlertTitle>{t('Read-only review')}</AlertTitle>
          <AlertDescription>
            {t('Search, filters, chart focus, and released history remain available.')}
          </AlertDescription>
        </Alert>
      ) : null}

      {(state === 'ready' || state === 'offline' || state === 'conflict') &&
      sections.length > 0 ? (
        <>
          <ResultsToolbar
            filter={filter}
            historyMode={historyMode}
            query={query}
            onFilterChange={setFilter}
            onHistoryModeChange={setHistoryMode}
            onQueryChange={setQuery}
            onReset={reset}
          />

          {filteredSections.length > 0 ? (
            <LabFlowsheet
              description={episodeLabel}
              mode={historyMode === 'latest' ? 'latest' : 'auto'}
              sections={filteredSections}
              showProgress={false}
              title={t('Longitudinal lab results')}
              // A history action is offered only where released history exists;
              // opening it on a single draw promises a series the episode
              // cannot show.
              renderRowTrailing={(result) =>
                result.status === 'released' && resultSeries(result).length > 1 ? (
                  <LabResultDetailTrigger result={result} />
                ) : null
              }
            />
          ) : (
            <EmptyState align="center" surface="outlined">
              <EmptyStateHeader>
                <EmptyStateTitle>{t('No results match these controls')}</EmptyStateTitle>
                <EmptyStateDescription>
                  {t('Change the search or result filter. Episode progress remains {progress}.').replace(
                    '{progress}',
                    episodeProgressLabel(progress, t).toLocaleLowerCase(),
                  )}
                </EmptyStateDescription>
              </EmptyStateHeader>
              <EmptyStateContent>
                <Button variant="outline" onClick={reset}>
                  {t('Clear controls')}
                </Button>
              </EmptyStateContent>
            </EmptyState>
          )}

          {hasActiveFilter ? (
            <p className={styles.filterStatus} role="status" aria-live="polite">
              {t('Showing {count} matching analytes.').replace(
                '{count}',
                String(filteredSections.flatMap((section) => section.results).length),
              )}
            </p>
          ) : null}
        </>
      ) : null}
    </WorkspacePage>
  );
}
