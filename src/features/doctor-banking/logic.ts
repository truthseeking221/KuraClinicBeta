import type {
  Amount,
  DoctorBankingOverview,
  DoctorFinancialNotification,
  DoctorLedgerSummary,
  IsoDate,
  LedgerEntry,
  LedgerEntryKind,
  LedgerEntryState,
  LicenceState,
  MandateState,
  Pull,
  SignedMoney,
  SignedUsdMinor,
} from './types';

const SIGNED_USD_MINOR_PATTERN = /^(?:0|[1-9]\d*|-[1-9]\d*)$/;
const INT64_MIN = -9223372036854775808n;
const INT64_MAX = 9223372036854775807n;

export type SignedUsdMinorDisplay =
  | { kind: 'money'; sign: '' | '-'; magnitude: string }
  | { kind: 'unavailable'; text: 'Amount unavailable' };

export function parseSignedUsdMinor(value: string): SignedUsdMinor | null {
  if (!SIGNED_USD_MINOR_PATTERN.test(value)) return null;
  const minor = BigInt(value);
  if (minor < INT64_MIN || minor > INT64_MAX) return null;
  return value;
}

export function splitSignedUsdMinorForDisplay(value: SignedUsdMinor): SignedUsdMinorDisplay {
  const parsed = parseSignedUsdMinor(value);
  if (!parsed || parsed === '-9223372036854775808') {
    return { kind: 'unavailable', text: 'Amount unavailable' };
  }
  const negative = parsed.startsWith('-');
  return {
    kind: 'money',
    sign: negative ? '-' : '',
    magnitude: negative ? parsed.slice(1) : parsed,
  };
}

export type BalanceDirection = 'doctor-owes' | 'kura-owes' | 'settled' | 'unavailable';

export function balanceDirection(value: SignedUsdMinor): BalanceDirection {
  const parsed = parseSignedUsdMinor(value);
  if (!parsed || parsed === '-9223372036854775808') return 'unavailable';
  const amount = BigInt(parsed);
  if (amount < 0n) return 'doctor-owes';
  if (amount > 0n) return 'kura-owes';
  return 'settled';
}

/**
 * The heading carries the meaning so red and green stay a second signal only.
 * A doctor reading this in greyscale still knows who owes whom.
 */
export function balanceHeadline(direction: BalanceDirection) {
  switch (direction) {
    case 'doctor-owes':
      return 'You owe Kura';
    case 'kura-owes':
      return 'Kura owes you';
    case 'settled':
      return "You're settled";
    case 'unavailable':
      return 'Amount unavailable';
  }
}

/**
 * `earnedThisMonth` is settled positive `completion_credit` only. Pending
 * earnings are excluded because the work is complete but the money is not.
 */
export function earnedSinceMonthStart(
  entries: readonly LedgerEntry[],
  periodStart: IsoDate,
): Amount {
  const total = entries.reduce((sum, entry) => {
    if (entry.kind !== 'completion_credit') return sum;
    if (entry.state !== 'settled') return sum;
    if (entry.occurredAt.slice(0, 10) < periodStart) return sum;
    const parsed = parseSignedUsdMinor(entry.amount.minor);
    if (!parsed) return sum;
    const value = BigInt(parsed);
    return value > 0n ? sum + value : sum;
  }, 0n);
  return { minor: total.toString(), currency: 'USD' };
}

/** "July" — the hero says which month it earned, so "this period" never appears. */
export function earningsMonthLabel(periodStart: IsoDate) {
  const date = new Date(`${periodStart}T00:00:00`);
  if (Number.isNaN(date.getTime())) return periodStart;
  return new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
}

export type ActivityQuery = {
  query: string;
  state?: LedgerEntryState;
  kind?: LedgerEntryKind;
  from?: string;
  to?: string;
};

export const EMPTY_ACTIVITY_QUERY: ActivityQuery = { query: '' };

export function filterLedgerEntries(entries: readonly LedgerEntry[], query: ActivityQuery) {
  const normalized = query.query.trim().toLocaleLowerCase();
  return entries.filter((entry) => {
    if (query.state && entry.state !== query.state) return false;
    if (query.kind && entry.kind !== query.kind) return false;
    const date = entry.occurredAt.slice(0, 10);
    if (query.from && date < query.from) return false;
    if (query.to && date > query.to) return false;
    if (!normalized) return true;
    return [entry.title, entry.detail, entry.orderRef ?? '', entry.workspaceLabel ?? ''].some(
      (value) => value.toLocaleLowerCase().includes(normalized),
    );
  });
}

export function isActivityQueryFiltered(query: ActivityQuery) {
  return Boolean(query.query.trim() || query.state || query.kind || query.from || query.to);
}

/** A backwards range would silently produce an empty statement; block it instead. */
export function statementRangeError(query: ActivityQuery) {
  if (query.from && query.to && query.from > query.to) return 'range-backwards' as const;
  return null;
}

export function recentLedgerEntries(entries: readonly LedgerEntry[], limit: number) {
  return [...entries]
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
    .slice(0, limit);
}

export function filterDoctorLedgers(
  ledgers: readonly DoctorLedgerSummary[],
  query: string,
  attention?: DoctorLedgerSummary['attention'],
) {
  const normalized = query.trim().toLocaleLowerCase();
  return ledgers.filter((ledger) => {
    if (attention && ledger.attention !== attention) return false;
    if (!normalized) return true;
    return [ledger.displayName, ledger.doctorRef].some((value) =>
      value.toLocaleLowerCase().includes(normalized),
    );
  });
}

/**
 * What the doctor may do with the ABA authorization. A lapsed licence blocks a
 * new authorization but never traps an existing one: unlink stays available.
 */
export function mandateCapabilities(state: MandateState, licence: LicenceState) {
  const verified = licence === 'verified';
  return {
    canLink: verified && (state === 'unlinked' || state === 'expired' || state === 'deleted'),
    canRenew: verified && state === 'renewal_required',
    canUnlink: state === 'linked' || state === 'renewal_required' || state === 'frozen',
    linkBlockedByLicence:
      !verified && (state === 'unlinked' || state === 'expired' || state === 'deleted'),
  };
}

/** Whether the ledger can still be collected against without doctor action. */
function autoPayUsable(state: MandateState) {
  return state === 'linked' || state === 'renewal_required';
}

export type NextCollectionStep =
  | { kind: 'unavailable' }
  | { kind: 'nothing_due' }
  | { kind: 'credit_held' }
  | { kind: 'sweep_scheduled'; date: IsoDate; maximum: Amount }
  | { kind: 'notice_sent'; date: IsoDate; maximum: Amount }
  | { kind: 'notice_reduced'; date: IsoDate; maximum: Amount; noticed: Amount }
  | { kind: 'notice_cleared'; date: IsoDate; noticed: Amount }
  | { kind: 'retry_pending'; retryDate: IsoDate | null; retrySlot: 1 | 2 | 3 | null; amount: Amount }
  | { kind: 'retry_expired'; amount: Amount }
  | { kind: 'retries_exhausted'; amount: Amount; date: IsoDate | null }
  | { kind: 'settle_manually'; amount: Amount; mandate: MandateState };

function isZero(amount: Amount) {
  const parsed = parseSignedUsdMinor(amount.minor);
  return parsed !== null && BigInt(parsed) === 0n;
}

function owedAmount(balance: SignedMoney): Amount {
  const display = splitSignedUsdMinorForDisplay(balance.minor);
  return {
    minor: display.kind === 'money' ? display.magnitude : '0',
    currency: 'USD',
  };
}

function latestFailedPull(notifications: readonly DoctorFinancialNotification[]) {
  return notifications
    .filter((notification) => notification.kind === 'pull_failed')
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))[0];
}

/**
 * The single most useful sentence on the page: what Kura does next and when.
 * Derived, never authored per fixture, so every scenario answers the same way.
 */
export function nextCollectionStep(
  overview: DoctorBankingOverview,
  notifications: readonly DoctorFinancialNotification[] = [],
): NextCollectionStep {
  const direction = balanceDirection(overview.settledBalance.minor);
  if (direction === 'unavailable') return { kind: 'unavailable' };

  const sweep = overview.nextSweep;
  if (direction !== 'doctor-owes') {
    // A notice that was sent and then paid off still deserves an answer: the
    // doctor needs to know that collection will take nothing.
    if (sweep && sweep.noticeState === 'sent' && isZero(sweep.maximumAmount)) {
      return {
        kind: 'notice_cleared',
        date: sweep.date,
        noticed: sweep.noticedAmount ?? sweep.maximumAmount,
      };
    }
    return direction === 'kura-owes' ? { kind: 'credit_held' } : { kind: 'nothing_due' };
  }

  const owed = owedAmount(overview.settledBalance);
  const failed = latestFailedPull(notifications);
  if (failed && failed.kind === 'pull_failed') {
    if (failed.retryState === 'retry_pending') {
      return {
        kind: 'retry_pending',
        retryDate: failed.retryDate,
        retrySlot: failed.retrySlot,
        amount: owed,
      };
    }
    if (failed.retryState === 'not_retryable') return { kind: 'retry_expired', amount: owed };
    return {
      kind: 'retries_exhausted',
      amount: owed,
      date: overview.nextSweep?.date ?? null,
    };
  }

  if (!autoPayUsable(overview.mandate.state)) {
    return { kind: 'settle_manually', amount: owed, mandate: overview.mandate.state };
  }

  if (!sweep) return { kind: 'settle_manually', amount: owed, mandate: overview.mandate.state };

  if (sweep.noticeState !== 'sent') {
    return { kind: 'sweep_scheduled', date: sweep.date, maximum: sweep.maximumAmount };
  }
  if (isZero(sweep.maximumAmount)) {
    return {
      kind: 'notice_cleared',
      date: sweep.date,
      noticed: sweep.noticedAmount ?? sweep.maximumAmount,
    };
  }
  if (sweep.noticedAmount && sweep.noticedAmount.minor !== sweep.maximumAmount.minor) {
    return {
      kind: 'notice_reduced',
      date: sweep.date,
      maximum: sweep.maximumAmount,
      noticed: sweep.noticedAmount,
    };
  }
  return { kind: 'notice_sent', date: sweep.date, maximum: sweep.maximumAmount };
}

/** True when the projected balance has reached or passed the ordering floor. */
export function floorBreached(overview: DoctorBankingOverview) {
  const exposure = parseSignedUsdMinor(overview.exposure.minor);
  const floor = parseSignedUsdMinor(overview.creditFloor.minor);
  if (!exposure || !floor) return false;
  return BigInt(exposure) <= BigInt(floor);
}

/**
 * English stays the stable key; the caller passes the active translator so the
 * slot count keeps Arabic digits while the surrounding words follow the
 * interface language.
 */
export function retryReason(pull: Pull, t: (source: string) => string = (source) => source) {
  if (pull.retry.allowed) {
    return `${t('Eligible')} · ${pull.retry.remainingSlots} ${t('remaining')}`;
  }
  const labels: Record<Pull['retry']['reason'], string> = {
    eligible: 'Eligible',
    window_expired: 'Retry window expired',
    not_scheduled: 'Only scheduled pulls can be retried',
    budget_exhausted: 'Retry budget exhausted',
    notice_cap_exhausted: 'Notice amount cap exhausted',
  };
  return t(labels[pull.retry.reason]);
}

export function formatBankingDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(date);
}

export function formatBankingDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Phnom_Penh',
  }).format(date)} ICT`;
}

/** Ledger rows repeat by the dozen: timezone lives in the column header, not each cell. */
export function formatLedgerDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Phnom_Penh',
  }).format(date);
}
