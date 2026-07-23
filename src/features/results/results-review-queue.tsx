'use client';

import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useT } from '../../components/foundations/i18n';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
  WorkspacePage,
  WorkspacePageHeader,
} from '../../components/shared';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ChevronRightIcon,
  DataGrid,
  DataGridTable,
  DataGridToolbar,
  Input,
  RefreshIcon,
  SearchIcon,
} from '../../components/ui';
import type { BadgeVariant } from '../../components/ui';

import type {
  ResultReviewQueueEntry,
  ResultReviewQueueStatus,
} from './types';
import styles from './results-review-queue.module.css';

const column = createColumnHelper<ResultReviewQueueEntry>();

const STATUS: Record<
  ResultReviewQueueStatus,
  { label: string; variant: BadgeVariant }
> = {
  routine: { label: 'Routine', variant: 'neutral' },
  abnormal: { label: 'Abnormal', variant: 'warning' },
  critical: { label: 'Critical', variant: 'danger' },
  amended: { label: 'Amended', variant: 'info' },
};

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export type ResultsReviewQueueState = 'ready' | 'loading' | 'empty' | 'error';

export type ResultsReviewQueueProps = {
  /** Target-contract queue entries. The current clinic BFF does not expose this list yet. */
  entries: readonly ResultReviewQueueEntry[];
  state?: ResultsReviewQueueState;
  initialQuery?: string;
  onOpen?: (entry: ResultReviewQueueEntry) => void;
  onRetry?: () => void;
};

/**
 * Clinic-level result review queue. It owns cross-patient scanning and routes
 * into ResultsWorkspace; analyte values and review decisions stay in the
 * patient-specific workspace.
 */
export function ResultsReviewQueue({
  entries,
  initialQuery = '',
  onOpen,
  onRetry,
  state = 'ready',
}: ResultsReviewQueueProps) {
  const t = useT();
  const [query, setQuery] = useState(initialQuery);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) =>
        [
          entry.patient.name,
          entry.patient.medicalRecordNumber,
          entry.testName,
          STATUS[entry.status].label,
        ]
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      ),
    [entries, normalizedQuery],
  );
  const visibleEntries = state === 'ready' ? filteredEntries : [];
  const primaryEntryId = visibleEntries.find(
    (entry) => entry.status === 'critical',
  )?.id;

  const columns = useMemo(
    () => [
      column.accessor((entry) => entry.patient.name, {
        id: 'patient',
        header: t('Patient'),
        size: 300,
        cell: ({ row }) => {
          const entry = row.original;
          const status = STATUS[entry.status];
          return (
            <span className={styles.patientCell}>
              <Avatar aria-hidden="true" shape="circle" size="sm">
                <AvatarFallback tone="neutral">
                  {initialsOf(entry.patient.name)}
                </AvatarFallback>
              </Avatar>
              <span className={styles.patientCopy}>
                <span className={styles.patientName}>{entry.patient.name}</span>
                <span className={styles.patientIdentity}>
                  MRN {entry.patient.medicalRecordNumber}
                </span>
              </span>
              {onOpen ? (
                <ChevronRightIcon
                  aria-hidden="true"
                  className={styles.mobileAffordance}
                  size={16}
                />
              ) : null}
              <span className={styles.mobileResultSummary}>
                <span className={styles.mobileResultLine}>
                  <span className={styles.testName}>{entry.testName}</span>
                  <Badge appearance="soft" size="sm" variant={status.variant}>
                    {t(status.label)}
                  </Badge>
                </span>
                <span className={styles.returned}>
                  {t('Returned')} {entry.returnedLabel}
                </span>
              </span>
            </span>
          );
        },
      }),
      column.accessor('testName', {
        header: t('Result'),
        size: 260,
        meta: {
          cellClassName: styles.desktopOnly,
          headerClassName: styles.desktopOnly,
        },
        cell: ({ getValue }) => (
          <span className={styles.testName}>{getValue()}</span>
        ),
      }),
      column.accessor('returnedLabel', {
        header: t('Returned'),
        size: 150,
        meta: {
          cellClassName: styles.desktopOnly,
          headerClassName: styles.desktopOnly,
        },
        cell: ({ getValue }) => (
          <span className={styles.returned}>{getValue()}</span>
        ),
      }),
      column.accessor('status', {
        header: t('Status'),
        size: 120,
        meta: {
          cellClassName: styles.desktopOnly,
          headerClassName: styles.desktopOnly,
        },
        cell: ({ getValue }) => {
          const status = STATUS[getValue()];
          return (
            <Badge appearance="soft" size="sm" variant={status.variant}>
              {t(status.label)}
            </Badge>
          );
        },
      }),
      column.display({
        id: 'review',
        header: '',
        size: 120,
        meta: {
          cellClassName: `${styles.actionCell} ${styles.desktopOnly}`,
          headerClassName: `${styles.actionHeader} ${styles.desktopOnly}`,
        },
        cell: ({ row }) => (
          <Button
            aria-label={`${t('Review')} ${row.original.testName} ${t('for')} ${row.original.patient.name}`}
            disabled={!onOpen}
            onClick={(event) => {
              event.stopPropagation();
              onOpen?.(row.original);
            }}
            size="compact"
            variant={row.original.id === primaryEntryId ? 'primary' : 'outline'}
          >
            {t('Review')}
          </Button>
        ),
      }),
    ],
    [onOpen, primaryEntryId, t],
  );

  const table = useReactTable({
    columns,
    data: visibleEntries,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (entry) => entry.id,
  });

  const errorState =
    state === 'error' ? (
      <Alert tone="danger">
        <AlertTitle>{t('Results could not be loaded')}</AlertTitle>
        <AlertDescription>
          {t('No review state was changed. Retry the queue request.')}
        </AlertDescription>
        {onRetry ? (
          <AlertAction>
            <Button
              leadingIcon={<RefreshIcon aria-hidden="true" size={16} />}
              onClick={onRetry}
              size="sm"
              variant="outline"
            >
              {t('Retry')}
            </Button>
          </AlertAction>
        ) : null}
      </Alert>
    ) : undefined;

  const emptyState = (
    <EmptyState align="center" surface="plain">
      <EmptyStateHeader>
        <EmptyStateTitle>
          {normalizedQuery ? t('No results match this search') : t('No results to review')}
        </EmptyStateTitle>
        <EmptyStateDescription>
          {normalizedQuery
            ? t('Try a patient name, MRN, or test name.')
            : t('Released patient results will appear here.')}
        </EmptyStateDescription>
      </EmptyStateHeader>
      {normalizedQuery ? (
        <EmptyStateContent>
          <Button onClick={() => setQuery('')} variant="outline">
            {t('Clear search')}
          </Button>
        </EmptyStateContent>
      ) : null}
    </EmptyState>
  );

  return (
    <WorkspacePage
      aria-labelledby="results-review-queue-title"
      data-slot="results-review-queue"
    >
      <WorkspacePageHeader
        description={t('Review released results across this workspace.')}
        headingId="results-review-queue-title"
        title={t('Results')}
      />
      <DataGrid
        emptyState={emptyState}
        errorState={errorState}
        getRowLabel={(entry) =>
          `${t('Review')} ${entry.testName} ${t('for')} ${entry.patient.name}`
        }
        isLoading={state === 'loading'}
        layout={{
          borders: 'rows',
          density: 'compact',
          stickyHeader: true,
          width: 'fixed',
        }}
        loadingMessage={t('Loading results to review')}
        onRowClick={onOpen}
        recordCount={visibleEntries.length}
        table={table}
      >
        {state === 'ready' && entries.length > 0 ? (
          <DataGridToolbar className={styles.toolbar}>
            <Input
              aria-label={t('Search results to review')}
              className={styles.search}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder={t('Search patient, MRN, or test')}
              prefix={<SearchIcon aria-hidden="true" size={16} />}
              size="sm"
              type="search"
              value={query}
            />
          </DataGridToolbar>
        ) : null}
        <DataGridTable
          aria-label={t('Results to review')}
          className={styles.queueTable}
        />
      </DataGrid>
    </WorkspacePage>
  );
}
