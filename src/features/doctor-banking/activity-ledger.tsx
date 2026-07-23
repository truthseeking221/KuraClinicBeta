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
  Badge,
  Button,
  CalendarIcon,
  DataGrid,
  DataGridPagination,
  DataGridTable,
  DataGridToolbar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SearchIcon,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import type { Translate } from '../../components/foundations/i18n';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
  Filters,
} from '../../components/shared';
import type { Filter, FilterFieldConfig } from '../../components/shared';

import {
  balanceDirection,
  EMPTY_ACTIVITY_QUERY,
  filterLedgerEntries,
  formatLedgerDateTime,
  recentLedgerEntries,
} from './logic';
import type { ActivityQuery } from './logic';
import { SignedMoneyText } from './money';
import type { DoctorBankingViewState, LedgerEntry, LedgerEntryKind, LedgerEntryState } from './types';
import styles from './doctor-banking.module.css';

const column = createColumnHelper<LedgerEntry>();

/**
 * All eleven contract kinds. A filter that cannot express a kind hides money
 * movements from the doctor who owns them.
 */
export const LEDGER_KIND_LABELS: Record<LedgerEntryKind, string> = {
  pending_debit: 'Reserved for an order',
  pending_credit: 'Earnings in progress',
  pending_adjustment: 'Reserved amount corrected',
  pending_void: 'Reservation released',
  completion_debit: 'Laboratory cost',
  completion_credit: 'Doctor share',
  physical_settlement_offset: 'Cash collected at the clinic',
  khqr_credit: 'KHQR payment',
  aba_pull_credit: 'ABA collection',
  connect_credit: 'First-link credit',
  admin_adjustment: 'Correction by Kura',
};

/** English labels stay the stable dictionary keys; `filterFields` translates. */
const FILTER_FIELDS: readonly FilterFieldConfig<string>[] = [
  {
    key: 'state',
    label: 'State',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Settled', value: 'settled' },
      { label: 'Voided', value: 'voided' },
    ],
  },
  {
    key: 'kind',
    label: 'Activity type',
    type: 'select',
    searchable: true,
    options: (Object.keys(LEDGER_KIND_LABELS) as LedgerEntryKind[]).map((kind) => ({
      label: LEDGER_KIND_LABELS[kind],
      value: kind,
    })),
  },
];

/**
 * Settled is the normal case and stays quiet text; only pending and voided
 * need attention, so only they carry a badge.
 */
function StateCell({ state }: { state: LedgerEntryState }) {
  const t = useT();
  if (state === 'settled') return <span className={styles.stateSettled}>{ledgerStateLabel(state, t)}</span>;
  return (
    <Badge variant={state === 'pending' ? 'warning' : 'neutral'}>
      {ledgerStateLabel(state, t)}
    </Badge>
  );
}

function ledgerStateLabel(state: LedgerEntryState, t: Translate) {
  if (state === 'settled') return t('Settled');
  return state === 'pending' ? t('Pending') : t('Voided');
}

/** Short "12 Jul" for the date-range trigger so the active filter stays visible. */
function shortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
}

function dateRangeLabel(from: string, to: string, t: Translate) {
  if (from && to) return `${shortDate(from)} – ${shortDate(to)}`;
  if (from) return `${t('From')} ${shortDate(from)}`;
  if (to) return `${t('To')} ${shortDate(to)}`;
  return t('Dates');
}

const RECENT_LIMIT = 6;

export type ActivityLedgerProps = {
  entries: LedgerEntry[];
  state?: DoctorBankingViewState;
  title?: string;
  description?: string;
  /** 'recent' renders the newest entries without search, filters, or pagination. */
  variant?: 'full' | 'recent';
  /**
   * Emitted whenever search, filters, or dates change. The owning page keeps
   * the latest query so a statement export carries exactly what is on screen.
   */
  onQueryChange?: (query: ActivityQuery) => void;
  onViewAll?: () => void;
};

export function ActivityLedger({
  description,
  entries,
  onQueryChange,
  onViewAll,
  state = 'ready',
  title,
  variant = 'full',
}: ActivityLedgerProps) {
  const t = useT();
  const recent = variant === 'recent';
  const [query, setQueryState] = useState<ActivityQuery>(EMPTY_ACTIVITY_QUERY);
  const [filters, setFilters] = useState<Filter<string>[]>([]);
  const setQuery = (next: ActivityQuery) => {
    setQueryState(next);
    onQueryChange?.(next);
  };

  const resolvedTitle = t(title ?? (recent ? 'Recent activity' : 'Activity'));
  const rawDescription =
    description ??
    (recent ? undefined : 'Every balance movement across your Kura workspaces. Entries are never edited.');
  const resolvedDescription = rawDescription ? t(rawDescription) : undefined;

  const visibleEntries = useMemo(
    () => (recent ? recentLedgerEntries(entries, RECENT_LIMIT) : filterLedgerEntries(entries, query)),
    [entries, query, recent],
  );

  const filterFields = useMemo<readonly FilterFieldConfig<string>[]>(
    () =>
      FILTER_FIELDS.map((field) => ({
        ...field,
        label: field.label ? t(field.label) : field.label,
        options: field.options?.map((option) => ({ ...option, label: t(option.label) })),
      })),
    [t],
  );

  const columns = useMemo(
    () => [
      column.accessor('title', {
        header: t('Activity'),
        size: 360,
        cell: ({ row }) => {
          const meta = [
            row.original.detail?.replace(/\.\s*$/, ''),
            row.original.orderRef,
            row.original.workspaceLabel,
          ]
            .filter(Boolean)
            .join(' · ');
          const amount = row.original.amount;
          const voided = row.original.state === 'voided';
          const credit = !voided && balanceDirection(amount.minor) === 'kura-owes';
          return (
            <div className={styles.activityPrimary}>
              <span className={styles.activityTitle}>{row.original.title}</span>
              {meta ? (
                <span className={styles.activityMeta} title={meta}>
                  {meta}
                </span>
              ) : null}
              <span aria-hidden="true" className={styles.activityMobileFacts}>
                <time dateTime={row.original.occurredAt}>
                  {formatLedgerDateTime(row.original.occurredAt)}
                </time>
                <span>{ledgerStateLabel(row.original.state, t)}</span>
                <span
                  className={[
                    styles.activityMobileAmount,
                    credit && styles.amountCredit,
                    voided && styles.amountVoided,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {credit ? <span>+</span> : null}
                  <SignedMoneyText value={amount} />
                </span>
              </span>
            </div>
          );
        },
      }),
      column.accessor('occurredAt', {
        header: t('When (ICT)'),
        size: 150,
        cell: ({ getValue }) => (
          <time className={styles.nowrap} dateTime={getValue()}>
            {formatLedgerDateTime(getValue())}
          </time>
        ),
      }),
      column.accessor('state', {
        header: t('State'),
        size: 100,
        cell: ({ getValue }) => <StateCell state={getValue()} />,
      }),
      column.accessor('amount', {
        header: t('Amount'),
        size: 130,
        meta: { numeric: true },
        cell: ({ row, getValue }) => {
          const amount = getValue();
          const voided = row.original.state === 'voided';
          const credit = !voided && balanceDirection(amount.minor) === 'kura-owes';
          return (
            <span
              className={[
                styles.tableMoney,
                credit && styles.amountCredit,
                voided && styles.amountVoided,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {credit ? <span aria-hidden="true">+</span> : null}
              <SignedMoneyText value={amount} />
            </span>
          );
        },
      }),
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: visibleEntries,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (entry) => entry.entryRef,
    ...(recent
      ? {}
      : {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
        }),
  });

  const errorState =
    state === 'error' || state === 'permission-denied' ? (
      <Alert tone="danger">
        <AlertTitle>
          {state === 'permission-denied' ? t('This balance is not yours to view') : t('Activity unavailable')}
        </AlertTitle>
        <AlertDescription>
          {state === 'permission-denied'
            ? t('Your current access cannot open this doctor-owned ledger.')
            : t('The ledger could not be loaded. No activity has been inferred.')}
        </AlertDescription>
      </Alert>
    ) : undefined;

  return (
    <section aria-labelledby="doctor-banking-activity-title" className={styles.section}>
      <header className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle} id="doctor-banking-activity-title">{resolvedTitle}</h2>
          {resolvedDescription ? (
            <p className={styles.sectionDescription}>{resolvedDescription}</p>
          ) : null}
        </div>
        {recent && onViewAll ? (
          <Button onClick={onViewAll} size="sm" variant="ghost">{t('View all')}</Button>
        ) : null}
      </header>
      <DataGrid
        emptyState={
          <EmptyState align="center" surface="plain">
            <EmptyStateHeader>
              <EmptyStateTitle>{recent ? t('No activity yet') : t('No matching activity')}</EmptyStateTitle>
              <EmptyStateDescription>
                {recent
                  ? t('Balance movements appear here as orders complete and payments settle.')
                  : t('Change the search, filters, or date range to see more ledger activity.')}
              </EmptyStateDescription>
            </EmptyStateHeader>
          </EmptyState>
        }
        errorState={errorState}
        isLoading={state === 'loading'}
        layout={{ borders: 'rows', density: 'compact', stickyHeader: !recent, width: 'fixed' }}
        loadingMessage={t('Loading activity')}
        recordCount={visibleEntries.length}
        table={table}
      >
        {state === 'ready' && !recent ? (
          <DataGridToolbar className={styles.activityToolbar}>
            <Input
              aria-label={t('Search activity')}
              className={styles.searchField}
              onChange={(event) => setQuery({ ...query, query: event.currentTarget.value })}
              placeholder={t('Search activity')}
              prefix={<SearchIcon aria-hidden="true" size={16} />}
              size="sm"
              type="search"
              value={query.query}
            />
            <Filters
              allowMultiple={false}
              fields={filterFields}
              filters={filters}
              onChange={(next) => {
                setFilters(next);
                const find = (field: string) =>
                  next.find((filter) => filter.field === field)?.values[0];
                setQuery({
                  ...query,
                  state: find('state') as LedgerEntryState | undefined,
                  kind: find('kind') as LedgerEntryKind | undefined,
                });
              }}
              size="sm"
            />
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    leadingIcon={<CalendarIcon aria-hidden="true" size={16} />}
                    size="sm"
                    variant={query.from || query.to ? 'secondary' : 'ghost'}
                  >
                    {dateRangeLabel(query.from ?? '', query.to ?? '', t)}
                  </Button>
                }
              />
              <PopoverContent align="end" className={styles.datePopover}>
                <Input
                  label={t('From')}
                  onChange={(event) => setQuery({ ...query, from: event.currentTarget.value })}
                  size="sm"
                  type="date"
                  value={query.from ?? ''}
                />
                <Input
                  label={t('To')}
                  onChange={(event) => setQuery({ ...query, to: event.currentTarget.value })}
                  size="sm"
                  type="date"
                  value={query.to ?? ''}
                />
                {query.from || query.to ? (
                  <Button
                    onClick={() => setQuery({ ...query, from: '', to: '' })}
                    size="sm"
                    variant="ghost"
                  >
                    {t('Clear dates')}
                  </Button>
                ) : null}
              </PopoverContent>
            </Popover>
          </DataGridToolbar>
        ) : null}
        <DataGridTable aria-label={t('Balance activity')} scrollHeight={recent ? undefined : 'lg'} />
        {state === 'ready' && !recent && visibleEntries.length > 0 ? (
          <DataGridPagination pageSizes={[6, 12, 24]} rowsPerPageLabel={t('Activity per page')} />
        ) : null}
      </DataGrid>
    </section>
  );
}
