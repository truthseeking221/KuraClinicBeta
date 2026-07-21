'use client';

import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  DataGrid,
  DataGridPagination,
  DataGridTable,
  DataGridToolbar,
  SegmentedToggle,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';

import {
  countByAssurance,
  displayNameOf,
  filterByAssurance,
  formatAgeSex,
  initialsOf,
  rowLabelOf,
  statusViewOf,
} from './logic';
import type {
  AssuranceFilter,
  PatientSummary,
  PatientTriageMap,
  PatientsViewState,
} from './types';
import styles from './patients-registry.module.css';

const column = createColumnHelper<PatientSummary>();

/**
 * Terminal states carry a neutral badge so they read as facts, not alarms;
 * unverified carries warning because it is the one actionable status here.
 * Verified is the normal case and stays quiet text.
 */
function StatusCell({ patient }: { patient: PatientSummary }) {
  const view = statusViewOf(patient);
  if (view.kind === 'terminal') {
    return <Badge variant="neutral">{view.label}</Badge>;
  }
  if (view.assurance === 'unverified') {
    return <Badge variant="warning">{view.label}</Badge>;
  }
  return <span className={styles.statusQuiet}>{view.label}</span>;
}

/** Tone dot + label; never color alone. */
function TriageCell({ triage }: { triage?: { label: string; tone: string } }) {
  if (!triage) return <span aria-hidden="true">—</span>;
  return (
    <span className={styles.triage} data-tone={triage.tone}>
      <span aria-hidden="true" className={styles.triageDot} />
      {triage.label}
    </span>
  );
}

export type PatientsRegistryProps = {
  patients: readonly PatientSummary[];
  /** Optional target-contract layer; when absent, its column does not render. */
  triage?: PatientTriageMap;
  state?: PatientsViewState;
  onOpenPatient?: (userId: string) => void;
  onRetry?: () => void;
};

/**
 * The workspace patient registry: who this workspace has seen, most recent
 * first, opening into the chart. Mirrors the ListWorkspacePatients contract;
 * deliberately has no name search (see storybook-metadata exclusions).
 */
export function PatientsRegistry({
  onOpenPatient,
  onRetry,
  patients,
  state = 'ready',
  triage,
}: PatientsRegistryProps) {
  const [assurance, setAssurance] = useState<AssuranceFilter>('all');

  const counts = useMemo(() => countByAssurance(patients), [patients]);
  const visible = useMemo(() => filterByAssurance(patients, assurance), [assurance, patients]);

  const columns = useMemo(() => {
    const base = [
      column.accessor('displayName', {
        header: 'Patient',
        size: 280,
        cell: ({ row }) => {
          const patient = row.original;
          const unavailable = patient.displayName.trim() === '';
          const identity = formatAgeSex(patient);
          return (
            <span className={styles.patientCell}>
              <Avatar shape="circle" size="sm">
                <AvatarFallback tone={unavailable ? 'neutral' : undefined}>
                  {initialsOf(patient)}
                </AvatarFallback>
              </Avatar>
              <span className={styles.patientCopy}>
                <span className={unavailable ? styles.nameUnavailable : styles.name}>
                  {displayNameOf(patient)}
                </span>
                {identity ? <span className={styles.identity}>{identity}</span> : null}
              </span>
            </span>
          );
        },
      }),
      column.accessor('phoneMasked', {
        header: 'Phone',
        size: 150,
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? (
            <span className={styles.masked}>{value}</span>
          ) : (
            <span aria-hidden="true">—</span>
          );
        },
      }),
      column.accessor('mrnMasked', {
        header: 'MRN',
        size: 90,
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? (
            <span className={styles.masked}>{value}</span>
          ) : (
            <span aria-hidden="true">—</span>
          );
        },
      }),
      column.accessor('assurance', {
        header: 'Status',
        size: 120,
        cell: ({ row }) => <StatusCell patient={row.original} />,
      }),
    ];
    if (!triage) return base;
    return [
      ...base,
      column.display({
        id: 'triage',
        header: 'Why now',
        size: 230,
        cell: ({ row }) => <TriageCell triage={triage[row.original.userId]} />,
      }),
    ];
  }, [triage]);

  const table = useReactTable({
    columns,
    data: visible,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (patient) => patient.userId,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  const errorState =
    state === 'error' ? (
      <Alert tone="danger">
        <AlertTitle>Patients unavailable</AlertTitle>
        <AlertDescription>
          The registry could not be loaded.
          {onRetry ? ' Try again.' : ''}
        </AlertDescription>
      </Alert>
    ) : undefined;

  return (
    <section aria-labelledby="patients-registry-title" className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title} id="patients-registry-title">
          Patients
        </h1>
        <p className={styles.description}>Most recently seen in this workspace first.</p>
      </header>
      <DataGrid
        emptyState={
          <EmptyState align="center" surface="plain">
            <EmptyStateHeader>
              <EmptyStateTitle>
                {assurance === 'all' ? 'No patients yet' : `No ${assurance} patients`}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {assurance === 'all'
                  ? 'Patients join this list after their first booking or check-in here.'
                  : 'Change the status filter to see the rest of the registry.'}
              </EmptyStateDescription>
            </EmptyStateHeader>
          </EmptyState>
        }
        errorState={errorState}
        getRowLabel={(patient) => rowLabelOf(patient, triage?.[patient.userId]?.label)}
        isLoading={state === 'loading'}
        layout={{ borders: 'rows', density: 'compact', stickyHeader: true, width: 'fixed' }}
        loadingMessage="Loading patients"
        onRowClick={onOpenPatient ? (patient) => onOpenPatient(patient.userId) : undefined}
        recordCount={visible.length}
        table={table}
      >
        {state === 'ready' ? (
          <DataGridToolbar className={styles.toolbar}>
            <SegmentedToggle
              label="Filter by identity status"
              onValueChange={(value) => setAssurance(value as AssuranceFilter)}
              options={[
                { value: 'all', label: `All ${counts.all}` },
                { value: 'unverified', label: `Unverified ${counts.unverified}` },
                { value: 'verified', label: `Verified ${counts.verified}` },
              ]}
              value={assurance}
            />
          </DataGridToolbar>
        ) : null}
        <DataGridTable aria-label="Workspace patients" />
        {state === 'ready' && visible.length > 0 ? (
          <DataGridPagination pageSizes={[10, 20, 50]} rowsPerPageLabel="Patients per page" />
        ) : null}
      </DataGrid>
    </section>
  );
}
