import type { HomeSignal, LicenceStatus, SignalTone } from './types';

export { isLiveLicence } from '../licence/logic';

/** Time-of-day greeting. Hour is injected; this module never reads the clock. */
export function greetingForHour(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const TONE_RANK: Record<SignalTone, number> = {
  critical: 0,
  attention: 1,
  neutral: 2,
};

/**
 * Critical work is pinned first, then attention, then neutral. Within one
 * tone the caller's order is preserved, so the strip stays stable day to day.
 */
export function orderSignals(signals: HomeSignal[]): HomeSignal[] {
  return [...signals].sort((a, b) => TONE_RANK[a.tone] - TONE_RANK[b.tone]);
}

/**
 * All clear when every worklist signal loaded and counted down to zero.
 * Info signals (pickup window, earnings) never block the all-clear state,
 * and a loading or failed signal is never silently treated as empty.
 */
export function isAllClear(signals: HomeSignal[]): boolean {
  const worklists = signals.filter((signal) => signal.kind === 'worklist');
  if (worklists.length === 0) return false;
  return worklists.every(
    (signal) => signal.state === 'ready' && (signal.count ?? 0) === 0 && signal.tone === 'neutral',
  );
}

export type LicenceBanner = {
  tone: 'warning' | 'danger' | 'info';
  title: string;
  /**
   * The same title split into its literal sentence and the date that follows
   * it. `title` stays the joined English form; a surface that translates its
   * copy renders `text` through the dictionary and appends `date` unchanged,
   * because a date must never be keyed into a translation table.
   */
  titleParts?: { text: string; date: string };
  description: string;
  actionLabel?: string;
};

function formatLicenceDate(value?: string): string | null {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(parsed);
}

/** Current seven-state licence lifecycle. `verified` is intentionally quiet. */
export function licenceBanner(status: LicenceStatus): LicenceBanner | null {
  const expiryDate = formatLicenceDate(status.expiryDate);
  const lapseDeadline = formatLicenceDate(status.lapseDeadline);

  switch (status.state) {
    case 'none':
      return {
        tone: 'warning',
        title: 'Verify medical licence',
        description: 'Place orders under your own attribution.',
        actionLabel: 'Verify',
      };
    case 'pending_review':
      return {
        tone: 'info',
        title: 'Licence verification pending',
        description: 'Place orders under your own attribution once verified.',
        actionLabel: 'View submission',
      };
    case 'rejected':
      return {
        tone: 'danger',
        title: 'Licence rejected',
        description: 'Review the reason, then upload a corrected document.',
        actionLabel: 'Update licence',
      };
    case 'expiring':
      return {
        tone: 'warning',
        title: expiryDate ? `Your licence expires on ${expiryDate}` : 'Your licence is expiring',
        titleParts: expiryDate
          ? { text: 'Your licence expires on', date: expiryDate }
          : undefined,
        description: 'Renew to keep placing orders under your own attribution.',
        actionLabel: 'Renew',
      };
    case 'in_grace':
      return {
        tone: 'danger',
        title: lapseDeadline
          ? `Licence lapsed. Grace ends ${lapseDeadline}`
          : 'Licence lapsed. Grace period active',
        titleParts: lapseDeadline
          ? { text: 'Licence lapsed. Grace ends', date: lapseDeadline }
          : undefined,
        description: 'Renew to keep placing orders under your own attribution.',
        actionLabel: 'Renew',
      };
    case 'lapsed':
      return {
        tone: 'danger',
        title: 'Licence inactive',
        description: 'You cannot place orders under your own attribution until you renew.',
        actionLabel: 'Renew licence',
      };
    case 'verified':
      return null;
  }
}
