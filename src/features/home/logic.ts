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
        title: 'Verify your medical licence',
        description: 'Verify now to place orders on your own attribution.',
        actionLabel: 'Verify now',
      };
    case 'pending_review':
      return {
        tone: 'info',
        title: 'Your licence is being verified',
        description: "You'll be able to order on your own attribution once verified.",
        actionLabel: 'View submission',
      };
    case 'rejected':
      return {
        tone: 'danger',
        title: 'Licence verification needs attention',
        description: 'Review the rejection reason and upload a corrected document.',
        actionLabel: 'Verify now',
      };
    case 'expiring':
      return {
        tone: 'warning',
        title: expiryDate ? `Your licence expires on ${expiryDate}` : 'Your licence is expiring',
        description: 'Renew now to keep ordering on your own attribution without interruption.',
        actionLabel: 'Renew now',
      };
    case 'in_grace':
      return {
        tone: 'danger',
        title: lapseDeadline
          ? `Your licence has lapsed — grace period ends ${lapseDeadline}`
          : 'Your licence has lapsed — grace period active',
        description: 'Renew now before your live credential status ends.',
        actionLabel: 'Renew now',
      };
    case 'lapsed':
      return {
        tone: 'danger',
        title: 'Your licence is no longer active',
        description: 'Ordering on your own attribution is unavailable until your licence is renewed.',
        actionLabel: 'Renew licence',
      };
    case 'verified':
      return null;
  }
}
