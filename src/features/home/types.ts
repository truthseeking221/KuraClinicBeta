import type { LicenceState } from '../licence/logic';

export type { LicenceState } from '../licence/logic';

/**
 * Clinical Home — doctor triage entry (journey WQ-01).
 *
 * Home owns no worklist. Every signal reports exactly one lifecycle axis and
 * deep-links to the surface that owns the work (Results, Bookings, Patients).
 * Axes are never inferred from each other: a paid booking is not an arrival,
 * a returned result is not a reviewed result.
 */

export type LicenceStatus = {
  state: LicenceState;
  /** ISO date (`YYYY-MM-DD`) supplied only after approval. */
  expiryDate?: string;
  /** ISO date (`YYYY-MM-DD`) supplied for the grace-period boundary. */
  lapseDeadline?: string;
};

export type SignalTone = 'neutral' | 'attention' | 'critical';

export type SignalState = 'ready' | 'loading' | 'error';

/**
 * One signal in the Home briefing.
 *
 * `worklist` signals count work waiting on the doctor and participate in the
 * all-clear check. `info` signals carry operational context (pickup window,
 * earnings) and never block the all-clear state.
 */
export type HomeSignal = {
  key: string;
  kind: 'worklist' | 'info';
  title: string;
  /** Loud number for countable work. Zero renders as zero, not as blank. */
  count?: number;
  /** Loud non-numeric value, e.g. a pickup window "16:40". */
  headline?: string;
  /** Loud money value in minor units as a digit string (money law: minor units, ×100). */
  moneyMinor?: string;
  currency?: 'USD' | 'KHR';
  /** Evidence sentence under the value — what changes the next decision. */
  detail: string;
  tone: SignalTone;
  /** Text cue that must accompany a non-neutral tone. Color is never the only signal. */
  toneLabel?: string;
  state: SignalState;
  /** Plain-language failure shown with the retry action when state is `error`. */
  errorMessage?: string;
  /** Outcome-labelled deep link into the owning surface's nav key. */
  action?: { label: string; targetKey: string };
};

export type NextAction = {
  time: string;
  label: string;
  meta?: string;
  targetKey?: string;
};

export type HomeFreshness =
  | { kind: 'live' }
  | { kind: 'stale'; asOf: string }
  | { kind: 'offline'; asOf: string };

export type HomeViewState =
  | 'ready'
  | 'loading'
  | 'error'
  | 'permission'
  | 'no-workspace';

export type HomeData = {
  doctorName: string;
  /** 0–23 local hour, injected so rendering stays deterministic. */
  hour: number;
  dateLabel: string;
  /** Scope line under the greeting, e.g. "Mekong Clinic · BKK1 · 184 patients in view". */
  scopeLabel: string;
  licence: LicenceStatus;
  freshness: HomeFreshness;
  /** Page-level availability; individual signals still own partial failures. */
  viewState?: HomeViewState;
  signals: HomeSignal[];
  nextActions: NextAction[];
  /** End-of-day closure summary. Present only when there is closed work to show. */
  closedToday?: {
    resultLoops: number;
    bookings: number;
    /** Minor-unit digit string. */
    earnedMinor: string;
  };
};
