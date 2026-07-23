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
  AlertAction,
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
  ChevronRightIcon,
  RefreshIcon,
  SegmentedToggle,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
  WorkspacePage,
  WorkspacePageHeader,
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
import type { PatientStatusView } from './logic';
import type {
  AssuranceFilter,
  PatientSummary,
  PatientTriageMap,
  PatientWorkItemMap,
  PatientsViewState,
} from './types';
import styles from './patients-registry.module.css';

const column = createColumnHelper<PatientSummary>();
const NO_DEMO_PATIENT_IDS: readonly string[] = [];

/** Terminal state, or nothing: the identity axis is a separate column. */
function terminalViewOf(patient: PatientSummary) {
  const view = statusViewOf(patient);
  return view.kind === 'terminal' ? view : undefined;
}

/**
 * The identity axis under a header that names it, so "Verified" can only be
 * read as identity — never as the phone. Neither value is an alarm: a
 * provisional record is the ordinary result of the phone gate, and PSC
 * confirms identity at collection. The record still waiting on that check
 * reads first; the settled one recedes.
 */
function IdentityCell({ view }: { view: PatientStatusView }) {
  const t = useT();
  if (view.kind === 'terminal') return <span aria-hidden="true">—</span>;
  return (
    <span className={styles.identityValue} data-assurance={view.assurance}>
      {t(view.label)}
    </span>
  );
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
  /** Optional resumable-work projection; it never mutates PatientSummary. */
  workItems?: PatientWorkItemMap;
  state?: PatientsViewState;
  /** Starts the governed phone-check and patient-resolution flow. */
  onAddPatient?: () => void;
  onOpenPatient?: (userId: string) => void;
  onOpenWorkItem?: (userId: string) => void;
  onRetry?: () => void;
};

/**
 * The workspace patient registry: who this workspace has seen, most recent
 * first, opening into the chart. Mirrors the ListWorkspacePatients contract;
 * deliberately has no name search (see storybook-metadata exclusions).
 *
 * Identity and contact are two columns, never one verdict. The wire record
 * carries both facts already — `assurance` is the identity axis, and
 * `phone_masked` is populated only for a verified primary phone — so the
 * registry names each axis instead of collapsing them into one "Verified".
 */
export function PatientsRegistry({
  demoPatientIds = NO_DEMO_PATIENT_IDS,
  onAddPatient,
  onOpenPatient,
  onOpenWorkItem,
  onRetry,
  patients,
  state = 'ready',
  triage,
  workItems,
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
          // A closed record travels with the name: the status columns scroll
          // out of view on a narrow screen, and this is the one fact that must
          // never be missed before acting on the wrong record.
          const terminal = terminalViewOf(patient);
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
                  {terminal ? (
                    <Badge size="sm" variant="neutral">
                      {t(terminal.label)}
                    </Badge>
                  ) : null}
                  {demoPatients.has(patient.userId) ? (
                    <Badge appearance="outline" size="sm" variant="neutral">
                      {t('Demo patient')}
                    </Badge>
                  ) : null}
                </span>
                {identity ? <span className={styles.identity}>{identity}</span> : null}
              </span>
              {onOpenPatient ? (
                <ChevronRightIcon
                  aria-hidden="true"
                  className={styles.mobileOpenAffordance}
                  size={16}
                />
              ) : null}
            </span>
          );
        },
      }),
      // The contact axis. The header states what the number proves, so the
      // identity column beside it cannot absorb the meaning.
      column.accessor('phoneMasked', {
        header: t('Verified phone'),
        size: 150,
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? (
            <span className={styles.masked}>{value}</span>
          ) : (
            <span className={styles.absent}>{t('None')}</span>
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
        header: t('Identity'),
        size: 120,
        cell: ({ row }) => <IdentityCell view={statusViewOf(row.original)} />,
      }),
    ];
    const withWork = workItems
      ? [
          ...base,
          column.display({
            id: 'work-item',
            header: t('Next step'),
            size: 230,
            cell: ({ row }) => {
              const patient = row.original;
              const item = workItems[patient.userId];
              if (!item) return <span aria-hidden="true">—</span>;
              const actionLabel =
                item.action === 'review_results'
                  ? t('Review results')
                  : item.action === 'view_progress'
                    ? t('View progress')
                    : t('Continue');
              return (
                <span className={styles.workItem}>
                  <span>{t(item.label)}</span>
                  {onOpenWorkItem ? (
                    <Button
                      aria-label={`${actionLabel} ${t(item.label).toLowerCase()} for ${displayNameOf(patient, t)}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenWorkItem(patient.userId);
                      }}
                      size="compact"
                      variant="link"
                    >
                      {actionLabel}
                    </Button>
                  ) : null}
                </span>
              );
            },
          }),
        ]
      : base;
    const withTriage = triage
      ? [
          ...withWork,
          column.display({
            id: 'triage',
            header: t('Why now'),
            size: 230,
            cell: ({ row }) => <TriageCell triage={triage[row.original.userId]} />,
          }),
        ]
      : withWork;
    if (!onOpenPatient) return withTriage;
    return [
      ...withTriage,
      column.display({
        id: 'open-patient',
        header: '',
        size: 56,
        meta: {
          cellClassName: styles.openCell,
          headerClassName: styles.openHeader,
        },
        cell: ({ row }) => (
          <Button
            aria-label={`${t('Open')} ${displayNameOf(row.original, t)}`}
            onClick={(event) => {
              event.stopPropagation();
              onOpenPatient(row.original.userId);
            }}
            size="icon-xs"
            variant="ghost"
          >
            <ChevronRightIcon aria-hidden="true" size={16} />
          </Button>
        ),
      }),
    ];
  }, [demoPatients, onOpenPatient, onOpenWorkItem, t, triage, workItems]);

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

  return (
    <WorkspacePage
      as="section"
      aria-labelledby="patients-registry-title"
      data-slot="patients-registry"
    >
      <WorkspacePageHeader
        actions={
          state === 'ready' && onAddPatient && !emptyRegistry ? (
            <Button onClick={onAddPatient}>{t('Add patient')}</Button>
          ) : undefined
        }
        description={t('Most recently seen in this workspace first.')}
        headingId="patients-registry-title"
        title={t('Patients')}
      />
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
                    priority
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
                    ? t('No provisional patients')
                    : t('No patients with a verified identity')}
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
                { value: 'unverified', label: `${t('Provisional')} ${counts.unverified}` },
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
    </WorkspacePage>
  );
}
