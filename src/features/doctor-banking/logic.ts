import type {
  DoctorLedgerSummary,
  LedgerEntry,
  LedgerEntryKind,
  LedgerEntryState,
  Pull,
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

export function balanceDirection(value: SignedUsdMinor) {
  const parsed = parseSignedUsdMinor(value);
  if (!parsed) return 'unavailable' as const;
  const amount = BigInt(parsed);
  if (amount < 0n) return 'doctor-owes' as const;
  if (amount > 0n) return 'kura-owes' as const;
  return 'settled' as const;
}

export type ActivityQuery = {
  query: string;
  state?: LedgerEntryState;
  kind?: LedgerEntryKind;
  from?: string;
  to?: string;
};

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

export function retryReason(pull: Pull) {
  if (pull.retry.allowed) {
    return `Eligible · ${pull.retry.remainingSlots} remaining`;
  }
  const labels: Record<Pull['retry']['reason'], string> = {
    eligible: 'Eligible',
    window_expired: 'Retry window expired',
    not_scheduled: 'Only scheduled pulls can be retried',
    budget_exhausted: 'Retry budget exhausted',
    notice_cap_exhausted: 'Notice amount cap exhausted',
  };
  return labels[pull.retry.reason];
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
