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
  DataGrid,
  DataGridPagination,
  DataGridTable,
  DataGridToolbar,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  SearchIcon,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
  Filters,
} from '../../components/shared';
import type { Filter, FilterFieldConfig } from '../../components/shared';
import { ActivityLedger } from '../doctor-banking';
import {
  filterDoctorLedgers,
  formatBankingDateTime,
  parseSignedUsdMinor,
  retryReason,
} from '../doctor-banking/logic';
import { AmountText, SignedMoneyText } from '../doctor-banking/money';
import type {
  AdminDoctorBankingFixture,
  DoctorBankingViewState,
  DoctorLedgerDetail,
  DoctorLedgerSummary,
  MandateState,
  Pull,
  SignedMoney,
} from '../doctor-banking/types';
import styles from './admin-doctor-banking.module.css';

const ledgerColumn = createColumnHelper<DoctorLedgerSummary>();

/** English labels stay the stable dictionary keys; the directory translates them. */
const ATTENTION_FIELDS: readonly FilterFieldConfig<string>[] = [
  {
    key: 'attention',
    label: 'Attention',
    type: 'select',
    options: [
      { label: 'Collection frozen', value: 'collection_frozen' },
      { label: 'Failed pull', value: 'failed_pull' },
      { label: 'Relink required', value: 'relink_required' },
      { label: 'No attention', value: 'none' },
    ],
  },
];

/**
 * The finance console echoes the raw provider mandate state so a screen, a log
 * line, and a support ticket all read the same word. It is an identifier, not
 * authored copy, so it stays Latin in every language.
 */
function mandateLabel(state: MandateState) {
  return state.replaceAll('_', ' ');
}

function mandateVariant(state: MandateState) {
  if (state === 'linked') return 'success' as const;
  if (state === 'renewal_required' || state === 'link_pending') return 'warning' as const;
  if (state === 'expired' || state === 'frozen' || state === 'deleted') return 'danger' as const;
  return 'neutral' as const;
}

/** Authored labels: English stays the key, render sites pass them through `t`. */
function attentionLabel(attention: DoctorLedgerSummary['attention']) {
  const labels = {
    none: 'No attention',
    collection_frozen: 'Collection frozen',
    failed_pull: 'Failed pull',
    relink_required: 'Relink required',
  } as const;
  return labels[attention];
}

function attentionVariant(attention: DoctorLedgerSummary['attention']) {
  return attention === 'none' ? 'neutral' as const : attention === 'failed_pull' ? 'warning' as const : 'danger' as const;
}

function LedgerDirectory({
  ledgers,
  loading,
  onSelect,
  selectedDoctorRef,
}: {
  ledgers: DoctorLedgerSummary[];
  loading: boolean;
  onSelect?: (doctorRef: string) => void;
  selectedDoctorRef: string;
}) {
  const t = useT();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filter<string>[]>([]);
  const attention = filters.find((filter) => filter.field === 'attention')?.values[0] as
    | DoctorLedgerSummary['attention']
    | undefined;
  const visible = useMemo(
    () => filterDoctorLedgers(ledgers, query, attention),
    [attention, ledgers, query],
  );
  const attentionFields = useMemo<readonly FilterFieldConfig<string>[]>(
    () =>
      ATTENTION_FIELDS.map((field) => ({
        ...field,
        label: field.label ? t(field.label) : field.label,
        options: field.options?.map((option) => ({ ...option, label: t(option.label) })),
      })),
    [t],
  );
  const columns = useMemo(
    () => [
      ledgerColumn.accessor('displayName', {
        header: t('Doctor'),
        size: 250,
        cell: ({ row }) => (
          <div className={styles.doctorCell}>
            <span className={styles.doctorName}>{row.original.displayName}</span>
            <span className={styles.doctorRef}>{row.original.doctorRef}</span>
          </div>
        ),
      }),
      ledgerColumn.accessor('settledBalance', {
        header: t('Settled'),
        size: 120,
        meta: { numeric: true },
        cell: ({ getValue }) => <SignedMoneyText value={getValue()} />,
      }),
      ledgerColumn.accessor('exposure', {
        header: t('Exposure'),
        size: 120,
        meta: { numeric: true },
        cell: ({ getValue }) => <SignedMoneyText value={getValue()} />,
      }),
      ledgerColumn.accessor('mandateState', {
        header: t('Mandate'),
        size: 150,
        cell: ({ getValue }) => <Badge variant={mandateVariant(getValue())}>{mandateLabel(getValue())}</Badge>,
      }),
      ledgerColumn.accessor('attention', {
        header: t('Attention'),
        size: 160,
        cell: ({ getValue }) => <Badge variant={attentionVariant(getValue())}>{t(attentionLabel(getValue()))}</Badge>,
      }),
    ],
    [t],
  );
  const table = useReactTable({
    columns,
    data: visible,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (ledger) => ledger.doctorRef,
    initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
  });

  return (
    <section aria-labelledby="doctor-ledger-directory-title" className={styles.directory}>
      <header className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle} id="doctor-ledger-directory-title">{t('Doctor ledgers')}</h2>
          <p className={styles.sectionDescription}>{t('Search balances, mandate state, and collection attention.')}</p>
        </div>
      </header>
      <DataGrid
        emptyState={
          <EmptyState align="center" surface="plain">
            <EmptyStateHeader><EmptyStateTitle>{t('No doctor ledgers')}</EmptyStateTitle><EmptyStateDescription>{t('Try a different doctor or attention filter.')}</EmptyStateDescription></EmptyStateHeader>
          </EmptyState>
        }
        getRowLabel={(ledger) => `${ledger.doctorRef === selectedDoctorRef ? `${t('Selected.')} ` : ''}${t('Open ledger for')} ${ledger.displayName}`}
        isLoading={loading}
        layout={{ borders: 'rows', density: 'compact', stickyHeader: true, width: 'fixed' }}
        onRowClick={(ledger) => onSelect?.(ledger.doctorRef)}
        recordCount={visible.length}
        table={table}
      >
        {!loading ? (
          <DataGridToolbar className={styles.toolbar}>
            <Input
              className={styles.search}
              label={t('Doctor search')}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder={t('Name or doctor ref')}
              prefix={<SearchIcon aria-hidden="true" size={16} />}
              type="search"
              value={query}
            />
            <Filters allowMultiple={false} fields={attentionFields} filters={filters} onChange={setFilters} size="sm" />
          </DataGridToolbar>
        ) : null}
        <DataGridTable aria-label={t('Doctor ledgers')} scrollHeight="lg" />
        {!loading && visible.length > 0 ? <DataGridPagination pageSizes={[8, 16, 32]} /> : null}
      </DataGrid>
    </section>
  );
}

function LedgerSummary({ ledger }: { ledger: DoctorLedgerDetail }) {
  const t = useT();
  return (
    <section aria-labelledby="ledger-summary-title" className={styles.summary}>
      <div className={styles.summaryHeading}>
        <div>
          <p className={styles.eyebrow}>{t('Selected ledger')}</p>
          <h2 className={styles.detailTitle} id="ledger-summary-title">{ledger.displayName}</h2>
          <p className={styles.doctorRef}>{ledger.doctorRef}</p>
        </div>
        <div className={styles.badges}>
          <Badge variant={mandateVariant(ledger.mandateState)}>{mandateLabel(ledger.mandateState)}</Badge>
          <Badge variant={attentionVariant(ledger.attention)}>{t(attentionLabel(ledger.attention))}</Badge>
        </div>
      </div>
      <dl className={styles.summaryMetrics}>
        <div><dt>{t('Settled balance')}</dt><dd><SignedMoneyText value={ledger.settledBalance} /></dd></div>
        <div><dt>{t('Exposure')}</dt><dd><SignedMoneyText value={ledger.exposure} /></dd></div>
        <div><dt>{t('Credit floor')}</dt><dd><SignedMoneyText value={ledger.creditFloor} /></dd></div>
        <div><dt>{t('Earned this period')}</dt><dd><AmountText value={ledger.earnedThisPeriod} /></dd></div>
      </dl>
    </section>
  );
}

type AdjustmentInput = { amount: SignedMoney; reason: string; idempotencyKey: string };
type FloorInput = { floor: SignedMoney; reason: string; idempotencyKey: string };

function AdjustmentDialog({
  onSubmit,
}: {
  onSubmit?: (input: AdjustmentInput) => Promise<void> | void;
}) {
  const t = useT();
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseSignedUsdMinor(amount.trim());
    if (!parsed || parsed === '0') {
      setError('Enter a nonzero signed amount in USD minor units.');
      return;
    }
    if (!reason.trim()) {
      setError(t('Audit reason is required.'));
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit?.({
        amount: { minor: parsed, currency: 'USD' },
        reason: reason.trim(),
        idempotencyKey: crypto.randomUUID(),
      });
      setSaved(true);
    } catch {
      setError(t('Adjustment was not recorded. Review the values and try again.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => { if (open) { setAmount(''); setReason(''); setError(null); setSaved(false); } }}>
      <DialogTrigger asChild><Button>{t('Create adjustment')}</Button></DialogTrigger>
      <DialogContent>
        {/*
          The signed-amount field and the sentence that explains it stay English
          on purpose. "USD minor units" and "negative values debit" decide how
          much money moves and in which direction; an approximate Khmer reading
          could turn 2500 cents into 2500 dollars.
        */}
        <DialogHeader><DialogTitle>{t('Create ledger adjustment')}</DialogTitle><DialogDescription>Add a signed correction with an immutable audit reason. Negative values debit the doctor ledger.</DialogDescription></DialogHeader>
        <DialogBody>
          {saved ? <Alert tone="success"><AlertTitle>{t('Adjustment recorded')}</AlertTitle><AlertDescription>{t('The ledger must refresh from the confirmed response.')}</AlertDescription></Alert> : (
            <form className={styles.form} id="adjustment-form" noValidate onSubmit={submit}>
              <Input autoComplete="off" inputMode="numeric" label="Signed amount (USD minor units)" onChange={(event) => setAmount(event.currentTarget.value)} placeholder="-2500 or 2500" required value={amount} />
              <Input label={t('Audit reason')} onChange={(event) => setReason(event.currentTarget.value)} required value={reason} />
              {error ? <p className={styles.formError} role="alert">{error}</p> : null}
            </form>
          )}
        </DialogBody>
        <DialogFooter>{!saved ? <Button form="adjustment-form" loading={saving} type="submit">{t('Record adjustment')}</Button> : null}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FloorDialog({
  currentFloor,
  onSubmit,
}: {
  currentFloor: SignedMoney;
  onSubmit?: (input: FloorInput) => Promise<void> | void;
}) {
  const t = useT();
  const [floor, setFloor] = useState(currentFloor.minor);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseSignedUsdMinor(floor.trim());
    if (!parsed || BigInt(parsed) > 0n) {
      setError('Credit floor must be zero or a negative USD minor amount.');
      return;
    }
    if (!reason.trim()) {
      setError(t('Audit reason is required.'));
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit?.({ floor: { minor: parsed, currency: 'USD' }, reason: reason.trim(), idempotencyKey: crypto.randomUUID() });
    } catch {
      setError(t('Credit floor was not changed. Review the values and try again.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => { if (open) { setFloor(currentFloor.minor); setReason(''); setError(null); } }}>
      <DialogTrigger asChild><Button variant="secondary">{t('Edit credit floor')}</Button></DialogTrigger>
      <DialogContent>
        {/* "USD minor units" stays English for the same reason as the adjustment field. */}
        <DialogHeader><DialogTitle>{t('Edit credit floor')}</DialogTitle><DialogDescription>{t('Set the maximum permitted negative balance and record why it changed.')}</DialogDescription></DialogHeader>
        <DialogBody>
          <form className={styles.form} id="floor-form" noValidate onSubmit={submit}>
            <Input inputMode="numeric" label="New floor (USD minor units)" onChange={(event) => setFloor(event.currentTarget.value)} required value={floor} />
            <Input label={t('Audit reason')} onChange={(event) => setReason(event.currentTarget.value)} required value={reason} />
            {error ? <p className={styles.formError} role="alert">{error}</p> : null}
          </form>
        </DialogBody>
        <DialogFooter><Button form="floor-form" loading={saving} type="submit">{t('Save credit floor')}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PullHistory({ pulls, onRetry }: { pulls: Pull[]; onRetry?: (pullRef: string) => void }) {
  const t = useT();
  return (
    <section aria-labelledby="pull-history-title" className={styles.detailSection}>
      <header className={styles.sectionHeader}><div><h3 className={styles.sectionTitle} id="pull-history-title">{t('Pull history')}</h3><p className={styles.sectionDescription}>{t('Trigger, provider result, retry slot, and current eligibility.')}</p></div></header>
      {pulls.length === 0 ? <p className={styles.quiet}>{t('No pull attempts.')}</p> : (
        <div className={styles.tableScroll} tabIndex={0} aria-label={t('Pull history scroll area')}>
          <Table aria-label={t('Pull history')}>
            <TableHeader><TableRow><TableHead>{t('Trigger')}</TableHead><TableHead>{t('Amount')}</TableHead><TableHead>{t('Result')}</TableHead><TableHead>{t('Retry')}</TableHead><TableHead>{t('Attempted')}</TableHead></TableRow></TableHeader>
            <TableBody>
              {/* Provider trigger and result values are identifiers: they stay Latin so screen, log, and support ticket match. */}
              {pulls.map((pull) => (
                <TableRow key={pull.pullRef}>
                  <TableCell><Badge variant={pull.trigger === 'admin_retry' ? 'warning' : 'neutral'}>{pull.trigger.replaceAll('_', ' ')}</Badge></TableCell>
                  <TableCell><AmountText value={pull.amount} /></TableCell>
                  <TableCell><div className={styles.stack}><Badge variant={pull.state === 'succeeded' ? 'success' : pull.state === 'failed' ? 'danger' : 'warning'}>{pull.state}</Badge>{pull.failureReason ? <span className={styles.failure}>{pull.failureReason}</span> : null}</div></TableCell>
                  <TableCell><div className={styles.stack}><span>{retryReason(pull, t)}</span>{pull.retry.allowed ? <Button onClick={() => onRetry?.(pull.pullRef)} size="compact" variant="secondary">{t('Retry scheduled pull')}</Button> : <span className={styles.quiet}>{t('Retry unavailable:')} {retryReason(pull, t)}</span>}</div></TableCell>
                  <TableCell className={styles.nowrap}>{formatBankingDateTime(pull.attemptedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}

export type AdminDoctorBankingPageProps = {
  data: AdminDoctorBankingFixture;
  state?: DoctorBankingViewState;
  onCreateAdjustment?: (input: AdjustmentInput) => Promise<void> | void;
  onRetry?: () => void;
  onRetryPull?: (pullRef: string) => void;
  onSelect?: (doctorRef: string) => void;
  onSetFloor?: (input: FloorInput) => Promise<void> | void;
};

export function AdminDoctorBankingPage({
  data,
  onCreateAdjustment,
  onRetry,
  onRetryPull,
  onSelect,
  onSetFloor,
  state = 'ready',
}: AdminDoctorBankingPageProps) {
  const t = useT();
  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div><p className={styles.eyebrow}>{t('Finance and back office')}</p><h1 className={styles.pageTitle}>{t('Doctor banking')}</h1><p className={styles.pageDescription}>{t('Review person-global ledgers, audited corrections, credit floors, and eligible scheduled-pull retries.')}</p></div>
      </header>

      {state === 'permission-denied' ? (
        <EmptyState align="center" surface="muted"><EmptyStateHeader><EmptyStateTitle>{t('Doctor banking permission required')}</EmptyStateTitle><EmptyStateDescription>{t('Your current admin role cannot read or manage doctor financial ledgers.')}</EmptyStateDescription></EmptyStateHeader></EmptyState>
      ) : state === 'error' ? (
        <Alert tone="danger"><AlertTitle>{t('Doctor banking unavailable')}</AlertTitle><AlertDescription>{t('No ledger or financial action is shown because the current state could not be verified.')}</AlertDescription><Button onClick={onRetry} variant="outline">{t('Try again')}</Button></Alert>
      ) : (
        <div className={styles.layout}>
          <LedgerDirectory ledgers={data.ledgers} loading={state === 'loading'} onSelect={onSelect} selectedDoctorRef={data.selected.doctorRef} />
          {state === 'loading' ? (
            <section aria-label={t('Loading ledger detail')} className={styles.loadingDetail} role="status"><Skeleton /><Skeleton /><Skeleton /></section>
          ) : (
            <section aria-label={`${t('Ledger detail for')} ${data.selected.displayName}`} className={styles.detail}>
              <LedgerSummary ledger={data.selected} />
              <section aria-labelledby="ledger-controls-title" className={styles.controls}>
                <div><h3 className={styles.sectionTitle} id="ledger-controls-title">{t('Ledger controls')}</h3><p className={styles.sectionDescription}>{t('Every correction and floor change requires an audit reason and idempotency key.')}</p></div>
                <div className={styles.controlActions}><AdjustmentDialog onSubmit={onCreateAdjustment} /><FloorDialog currentFloor={data.selected.creditFloor} onSubmit={onSetFloor} /></div>
              </section>
              <ActivityLedger description="Latest immutable movements for the selected doctor." entries={data.entries} title="Ledger entries" />
              <section aria-labelledby="floor-history-title" className={styles.detailSection}>
                <header className={styles.sectionHeader}><div><h3 className={styles.sectionTitle} id="floor-history-title">{t('Credit floor history')}</h3><p className={styles.sectionDescription}>{t('Previous and current floor with actor, reason, and timestamp.')}</p></div></header>
                <div className={styles.tableScroll} tabIndex={0} aria-label={t('Credit floor history scroll area')}><Table aria-label={t('Credit floor history')}><TableHeader><TableRow><TableHead>{t('Previous')}</TableHead><TableHead>{t('Current')}</TableHead><TableHead>{t('Reason')}</TableHead><TableHead>{t('Changed by')}</TableHead><TableHead>{t('Changed')}</TableHead></TableRow></TableHeader><TableBody>{data.floorChanges.map((change) => <TableRow key={`${change.changedAt}-${change.changedBy.actorRef}`}><TableCell><SignedMoneyText value={change.previousFloor} /></TableCell><TableCell><SignedMoneyText value={change.currentFloor} /></TableCell><TableCell>{change.reason}</TableCell><TableCell>{change.changedBy.displayName}</TableCell><TableCell className={styles.nowrap}>{formatBankingDateTime(change.changedAt)}</TableCell></TableRow>)}</TableBody></Table></div>
              </section>
              <PullHistory onRetry={onRetryPull} pulls={data.pulls} />
              <section aria-labelledby="admin-notifications-title" className={styles.detailSection}>
                <header className={styles.sectionHeader}><div><h3 className={styles.sectionTitle} id="admin-notifications-title">{t('Financial notifications')}</h3><p className={styles.sectionDescription}>{t('Doctor-audience delivery history for this ledger. Operations attention remains separately governed.')}</p></div></header>
                {/* Notification kind is the raw event identifier and stays Latin. */}
                <ol className={styles.notificationList}>{data.notifications.map((notification) => <li key={notification.notificationRef}><span>{notification.kind.replaceAll('_', ' ')}</span><time dateTime={notification.occurredAt}>{formatBankingDateTime(notification.occurredAt)}</time></li>)}</ol>
              </section>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
