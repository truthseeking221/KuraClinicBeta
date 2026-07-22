'use client';

import Image from 'next/image';
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
  Button,
  DataGrid,
  DataGridPagination,
  DataGridTable,
  DataGridToolbar,
  SegmentedToggle,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from '../../components/shared';
import { useT } from '../../components/foundations/i18n';

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
const NO_DEMO_PATIENT_IDS: readonly string[] = [];

/**
 * Terminal states carry a neutral badge so they read as facts, not alarms;
 * unverified carries warning because it is the one actionable status here.
 * Verified is the normal case and stays quiet text.
 */
function StatusCell({ patient }: { patient: PatientSummary }) {
  const t = useT();
  const view = statusViewOf(patient);
  if (view.kind === 'terminal') {
    return <Badge variant="neutral">{t(view.label)}</Badge>;
  }
  if (view.assurance === 'unverified') {
    return <Badge variant="warning">{t(view.label)}</Badge>;
  }
  return <span className={styles.statusQuiet}>{t(view.label)}</span>;
}

/** Tone dot + label; never color alone. */
function TriageCell({ triage }: { triage?: { label: string; tone: string } }) {
  const t = useT();
  if (!triage) return <span aria-hidden="true">—</span>;
  return (
    <span className={styles.triage} data-tone={triage.tone}>
      <span aria-hidden="true" className={styles.triageDot} />
      {t(triage.label)}
    </span>
  );
}

export type PatientsRegistryProps = {
  patients: readonly PatientSummary[];
  /** Synthetic records supplied by a demo adapter; never inferred from patient status. */
  demoPatientIds?: readonly string[];
  /** Optional target-contract layer; when absent, its column does not render. */
  triage?: PatientTriageMap;
  state?: PatientsViewState;
  /** Starts the governed phone-check and patient-resolution flow. */
  onAddPatient?: () => void;
  onOpenPatient?: (userId: string) => void;
  onRetry?: () => void;
};

/**
 * The workspace patient registry: who this workspace has seen, most recent
 * first, opening into the chart. Mirrors the ListWorkspacePatients contract;
 * deliberately has no name search (see storybook-metadata exclusions).
 */
export function PatientsRegistry({
  demoPatientIds = NO_DEMO_PATIENT_IDS,
  onAddPatient,
  onOpenPatient,
  onRetry,
  patients,
  state = 'ready',
  triage,
}: PatientsRegistryProps) {
  const t = useT();
  const [assurance, setAssurance] = useState<AssuranceFilter>('all');
  const demoPatients = useMemo(() => new Set(demoPatientIds), [demoPatientIds]);

  const counts = useMemo(() => countByAssurance(patients), [patients]);
  const canFilterByAssurance = counts.unverified > 0 && counts.verified > 0;
  const activeAssurance = canFilterByAssurance ? assurance : 'all';
  const visible = useMemo(() => filterByAssurance(patients, activeAssurance), [activeAssurance, patients]);
  const emptyRegistry = state === 'ready' && activeAssurance === 'all' && patients.length === 0;

  const columns = useMemo(() => {
    const base = [
      column.accessor('displayName', {
        header: t('Patient'),
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
                <span className={styles.nameLine}>
                  <span className={unavailable ? styles.nameUnavailable : styles.name}>
                    {displayNameOf(patient, t)}
                  </span>
                  {demoPatients.has(patient.userId) ? (
                    <Badge appearance="outline" size="sm" variant="neutral">
                      {t('Demo patient')}
                    </Badge>
                  ) : null}
                </span>
                {identity ? <span className={styles.identity}>{identity}</span> : null}
              </span>
            </span>
          );
        },
      }),
      column.accessor('phoneMasked', {
        header: t('Phone'),
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
        // MRN is an identifier label and stays Latin in every language.
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
        header: t('Status'),
        size: 120,
        cell: ({ row }) => <StatusCell patient={row.original} />,
      }),
    ];
    if (!triage) return base;
    return [
      ...base,
      column.display({
        id: 'triage',
        header: t('Why now'),
        size: 230,
        cell: ({ row }) => <TriageCell triage={triage[row.original.userId]} />,
      }),
    ];
  }, [demoPatients, t, triage]);

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
        <AlertTitle>{t('Patients unavailable')}</AlertTitle>
        <AlertDescription>
          {t('The registry could not be loaded.')}
          {onRetry ? ` ${t('Try again.')}` : ''}
        </AlertDescription>
      </Alert>
    ) : undefined;

  return (
    <section aria-labelledby="patients-registry-title" className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title} id="patients-registry-title">
          {t('Patients')}
        </h1>
        {state === 'ready' && onAddPatient && !emptyRegistry ? (
          <Button onClick={onAddPatient}>{t('Add patient')}</Button>
        ) : null}
      </header>
      <DataGrid
        emptyState={
          <EmptyState align="center" surface="plain">
            <EmptyStateHeader>
              {activeAssurance === 'all' ? (
                <EmptyStateMedia className={styles.emptyIllustration}>
                  <Image
                    alt=""
                    className={styles.emptyIllustrationImage}
                    height={1254}
                    sizes="160px"
                    src="/generated/kura-patients-empty-add-first-v1.png"
                    width={1254}
                  />
                </EmptyStateMedia>
              ) : null}
              <EmptyStateTitle>
                {activeAssurance === 'all'
                  ? t('No patients yet')
                  : activeAssurance === 'unverified'
                    ? t('No unverified patients')
                    : t('No verified patients')}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {activeAssurance === 'all'
                  ? onAddPatient
                    ? t('Check the patient’s phone number before creating their record.')
                    : t('Patients appear after their first booking or check-in.')
                  : t('Change the status filter to see the rest of the registry.')}
              </EmptyStateDescription>
            </EmptyStateHeader>
            {activeAssurance === 'all' && onAddPatient ? (
              <EmptyStateContent>
                <Button onClick={onAddPatient}>{t('Add patient')}</Button>
              </EmptyStateContent>
            ) : null}
          </EmptyState>
        }
        errorState={errorState}
        getRowLabel={(patient) => rowLabelOf(patient, triage?.[patient.userId]?.label, t)}
        isLoading={state === 'loading'}
        layout={{
          borders: 'rows',
          density: 'compact',
          stickyHeader: true,
          width: visible.length === 0 ? 'auto' : 'fixed',
        }}
        loadingMessage={t('Loading patients')}
        onRowClick={onOpenPatient ? (patient) => onOpenPatient(patient.userId) : undefined}
        recordCount={visible.length}
        table={table}
      >
        {state === 'ready' && canFilterByAssurance ? (
          <DataGridToolbar className={styles.toolbar}>
            <SegmentedToggle
              label={t('Filter by identity status')}
              onValueChange={(value) => setAssurance(value as AssuranceFilter)}
              options={[
                { value: 'all', label: `${t('All')} ${counts.all}` },
                { value: 'unverified', label: `${t('Unverified')} ${counts.unverified}` },
                { value: 'verified', label: `${t('Verified')} ${counts.verified}` },
              ]}
              value={assurance}
            />
          </DataGridToolbar>
        ) : null}
        <DataGridTable aria-label={t('Workspace patients')} />
        {state === 'ready' && visible.length > 0 ? (
          <DataGridPagination pageSizes={[10, 20, 50]} rowsPerPageLabel={t('Patients per page')} />
        ) : null}
      </DataGrid>
    </section>
  );
}
