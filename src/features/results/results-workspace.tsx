'use client';

import { useMemo, useState } from 'react';

import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared/empty-state';
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
  patient: ResultsPatient;
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
    <main className={styles.workspace} data-slot="results-workspace">
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Doctor results review</p>
          <h1 className={styles.pageTitle}>Results</h1>
          <p className={styles.patient}>
            {patient.name} · {patient.medicalRecordNumber} · born {formatDate(patient.dob)}
          </p>
        </div>
        {progress.total > 0 ? (
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
            {episodeProgressLabel(progress)}
          </Badge>
        ) : null}
      </header>

      {state === 'loading' ? (
        <Alert tone="info" role="status">
          <AlertTitle>Loading released results</AlertTitle>
          <AlertDescription>
            The workspace will preserve filters and focus when the episode is ready.
          </AlertDescription>
        </Alert>
      ) : null}

      {state === 'error' ? (
        <Alert tone="danger" icon={<WarningIcon />}>
          <AlertTitle>Results could not be loaded</AlertTitle>
          <AlertDescription>
            No clinical value is inferred from this failure. Retry the episode request.
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button
                size="sm"
                variant="outline"
                leadingIcon={<RefreshIcon size={16} aria-hidden="true" />}
                onClick={onRetry}
              >
                Retry
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {state === 'conflict' ? (
        <Alert tone="warning" icon={<WarningIcon />}>
          <AlertTitle>Results changed during review</AlertTitle>
          <AlertDescription>
            A release, cancellation, redraw, or add-on changed this episode. Refresh before any
            acknowledgment or closure decision.
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button
                size="sm"
                variant="outline"
                leadingIcon={<RefreshIcon size={16} aria-hidden="true" />}
                onClick={onRetry}
              >
                Refresh episode
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {state === 'permission' ? (
        <EmptyState align="center" surface="outlined">
          <EmptyStateHeader>
            <EmptyStateTitle>Results are restricted</EmptyStateTitle>
            <EmptyStateDescription>
              Your current clinic role cannot view this patient&apos;s released laboratory results.
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <LockKeyIcon size={24} aria-hidden="true" />
          </EmptyStateContent>
        </EmptyState>
      ) : null}

      {state === 'empty' ? (
        <EmptyState align="center" surface="outlined">
          <EmptyStateHeader>
            <EmptyStateTitle>No result episodes</EmptyStateTitle>
            <EmptyStateDescription>
              This patient has no released or pending laboratory episode to review.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      ) : null}

      {state === 'offline' ? (
        <Alert tone="warning" icon={<WifiErrorIcon />}>
          <AlertTitle>Offline — showing cached results</AlertTitle>
          <AlertDescription>
            Values may be stale. Actions that change clinical state are unavailable.
          </AlertDescription>
        </Alert>
      ) : null}

      {staleAt ? (
        <Alert tone="warning" icon={<WarningIcon />}>
          <AlertTitle>Result snapshot may be stale</AlertTitle>
          <AlertDescription>Last synchronized {formatDate(staleAt)}.</AlertDescription>
        </Alert>
      ) : null}

      {readOnly ? (
        <Alert tone="info" icon={<LockKeyIcon />}>
          <AlertTitle>Read-only review</AlertTitle>
          <AlertDescription>
            Search, filters, chart focus, and released history remain available.
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
              title="Longitudinal lab results"
              renderRowTrailing={(result) =>
                result.status === 'released' ? (
                  <LabResultDetailTrigger result={result} />
                ) : null
              }
            />
          ) : (
            <EmptyState align="center" surface="outlined">
              <EmptyStateHeader>
                <EmptyStateTitle>No results match these controls</EmptyStateTitle>
                <EmptyStateDescription>
                  Change the search or result filter. Episode progress remains{' '}
                  {episodeProgressLabel(progress).toLocaleLowerCase()}.
                </EmptyStateDescription>
              </EmptyStateHeader>
              <EmptyStateContent>
                <Button variant="outline" onClick={reset}>
                  Clear controls
                </Button>
              </EmptyStateContent>
            </EmptyState>
          )}

          {hasActiveFilter ? (
            <p className={styles.filterStatus} role="status" aria-live="polite">
              Showing {filteredSections.flatMap((section) => section.results).length} matching analytes.
            </p>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
