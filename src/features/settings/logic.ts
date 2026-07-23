/**
 * Workspace settings rules, ported from the legacy DCM prototype
 * (FINAL DCM src/components/SettingsView) and rebuilt against Kura primitives.
 *
 * One canonical surface for low-frequency configuration: identity, cabinet,
 * team, money, documents, and security. Every action resolves locally in the
 * prototype — inline edits commit to component state, files run through a real
 * picker, exports build a Blob download, and a toast confirms each one. No
 * click is left as a no-op.
 */

import type { LicenceState } from '../licence/logic';

/* ------------------------------ navigation ------------------------------ */

export type SettingsSectionId =
  | 'overview'
  | 'account'
  | 'cabinet'
  | 'members'
  | 'preferences'
  | 'communications'
  | 'billing'
  | 'directory'
  | 'esign'
  | 'security';

export type SettingsGroup = 'Workspace' | 'Operations' | 'Trust';

export type SettingsSectionDef = {
  id: SettingsSectionId;
  label: string;
  group: SettingsGroup;
};

export const SETTINGS_SECTIONS: readonly SettingsSectionDef[] = [
  { id: 'overview', label: 'Overview', group: 'Workspace' },
  { id: 'account', label: 'Account & verification', group: 'Workspace' },
  { id: 'cabinet', label: 'Cabinet', group: 'Workspace' },
  { id: 'members', label: 'Team access', group: 'Workspace' },
  { id: 'preferences', label: 'Preferences', group: 'Workspace' },
  { id: 'communications', label: 'Patient messages', group: 'Operations' },
  { id: 'billing', label: 'Payments', group: 'Operations' },
  { id: 'directory', label: 'Directory profile', group: 'Operations' },
  { id: 'esign', label: 'Signed documents', group: 'Trust' },
  { id: 'security', label: 'Security', group: 'Trust' },
];

/* ------------------------------ date logic ------------------------------ */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days from `todayIso` to `targetIso`, floored at zero, in ICT (+07). */
export function daysUntil(targetIso: string, todayIso: string): number {
  const today = new Date(`${todayIso}T00:00:00+07:00`);
  const target = new Date(`${targetIso}T00:00:00+07:00`);
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / DAY_MS));
}

/* ---------------------------- verification ------------------------------ */

/**
 * Clinician license verification (KYD). Settings mirrors the verification
 * store; it never contradicts the /verification gate.
 */
export type VerificationStatus = LicenceState;

export type VerificationBadgeVariant =
  | 'success'
  | 'neutral'
  | 'info'
  | 'warning'
  | 'danger';

export const VERIFICATION_META: Record<
  VerificationStatus,
  { label: string; badge: VerificationBadgeVariant }
> = {
  none: { label: 'Not submitted', badge: 'neutral' },
  pending_review: { label: 'Under review', badge: 'info' },
  rejected: { label: 'Action required', badge: 'danger' },
  verified: { label: 'Verified', badge: 'success' },
  expiring: { label: 'Expiring', badge: 'warning' },
  in_grace: { label: 'In grace', badge: 'warning' },
  lapsed: { label: 'Lapsed', badge: 'danger' },
};

export type VerificationBanner = {
  tone: 'info' | 'warning' | 'danger';
  title: string;
  body: string;
  cta: string;
};

/** Banner shown under Account & verification; `verified` shows no banner. */
export const VERIFICATION_BANNERS: Record<
  Exclude<VerificationStatus, 'verified'>,
  VerificationBanner
> = {
  none: {
    tone: 'info',
    title: 'Submit your professional licence',
    body: 'Catalog and prices remain available. New clinic orders still require explicit order capability and a live attributed prescriber.',
    cta: 'Submit licence',
  },
  pending_review: {
    tone: 'info',
    title: 'Your professional licence is under review',
    body: 'The submitted record is awaiting a reviewer verdict and is not live for attribution yet.',
    cta: 'View status',
  },
  rejected: {
    tone: 'danger',
    title: 'Your professional licence submission was rejected',
    body: 'Review the reason and create a corrected submission. The rejected attempt remains in the audit history.',
    cta: 'Review and resubmit',
  },
  expiring: {
    tone: 'warning',
    title: 'Your professional licence is expiring',
    body: 'It remains live for attribution. Renew it before the current credential lapses.',
    cta: 'Renew licence',
  },
  in_grace: {
    tone: 'warning',
    title: 'Your professional licence is in its grace period',
    body: 'It remains live for attribution during grace. Renew it before the lapse deadline.',
    cta: 'Renew licence',
  },
  lapsed: {
    tone: 'danger',
    title: 'Your professional licence has lapsed',
    body: 'New clinic orders cannot attribute prescribing to you. Previously placed episodes are not revoked retroactively.',
    cta: 'Renew licence',
  },
};

/* --------------------------- inline edit rules -------------------------- */

/** Every inline editor requires a non-empty value before it can save. */
export function requiredError(label: string, draft: string): string | null {
  return draft.trim() ? null : `${label} is required.`;
}

/* ----------------------------- chip lists ------------------------------- */

export function chipAddError(
  label: string,
  next: string,
  items: readonly string[],
): string | null {
  const trimmed = next.trim();
  if (!trimmed) return `${label} is required.`;
  const exists = items.some(
    (item) => item.toLowerCase() === trimmed.toLowerCase(),
  );
  return exists ? `${trimmed} is already listed.` : null;
}

/* --------------------------- courier pickup ----------------------------- */

export const COURIER_ROUTES = [
  { id: 'PP-02', label: 'Route PP-02', detail: 'BKK / Daun Penh' },
  { id: 'PP-04', label: 'Route PP-04', detail: 'Toul Kork loop' },
  { id: 'PP-07', label: 'Route PP-07', detail: 'Sen Sok / airport' },
] as const;

export const COURIER_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const COURIER_TIMES = ['10:00', '12:00', '14:00', '16:00', '18:00'] as const;

export type CourierRouteId = (typeof COURIER_ROUTES)[number]['id'];
export type CourierDayId = (typeof COURIER_DAYS)[number];
export type CourierTime = (typeof COURIER_TIMES)[number];

export type CourierPickup = {
  routeId: CourierRouteId;
  days: CourierDayId[];
  time: CourierTime;
};

export function formatCourierPickup(pickup: CourierPickup): string {
  const route =
    COURIER_ROUTES.find((option) => option.id === pickup.routeId) ??
    COURIER_ROUTES[0];
  return `${route.label} · ${pickup.days.join(' / ')} · ${pickup.time} pickup`;
}

/** Lab logistics needs at least one pickup day on the route. */
export function courierPickupError(pickup: CourierPickup): string | null {
  return pickup.days.length > 0 ? null : 'Select at least one pickup day.';
}

/* ---------------------------- directory hours --------------------------- */

/*
 * Directory display hours — structured per day, not free text. These describe
 * what patients see in the directory; they do not drive calendar availability.
 */

export const WEEK_DAYS = [
  { id: 'Mon', label: 'Monday' },
  { id: 'Tue', label: 'Tuesday' },
  { id: 'Wed', label: 'Wednesday' },
  { id: 'Thu', label: 'Thursday' },
  { id: 'Fri', label: 'Friday' },
  { id: 'Sat', label: 'Saturday' },
  { id: 'Sun', label: 'Sunday' },
] as const;

export type WeekDayId = (typeof WEEK_DAYS)[number]['id'];

/* 30-min steps across a clinic day, stored 24h as "HH:MM". */
export const HOUR_OPTIONS = Array.from({ length: 31 }, (_, i) => {
  const h = 6 + Math.floor(i / 2);
  return `${String(h).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`;
});

export type DayHours = { open: boolean; from: string; to: string };
export type WeekHours = Record<WeekDayId, DayHours>;

/** Drop the leading zero so 08:00 reads as 8:00. */
export function labelTime(time: string): string {
  const [h, m] = time.split(':');
  return `${Number(h)}:${m}`;
}

/**
 * Collapse consecutive open days sharing the same window into ranges, e.g.
 * "Mon to Sat · 8:00 to 17:30". Closed days break a run and are dropped.
 */
export function formatHours(week: WeekHours): string {
  const groups: string[] = [];
  let runStart: WeekDayId | null = null;
  let runEnd: WeekDayId | null = null;
  let runKey = '';

  const flush = () => {
    if (!runStart || !runEnd) return;
    const { from, to } = week[runStart];
    const span = runStart === runEnd ? runStart : `${runStart} to ${runEnd}`;
    groups.push(`${span} · ${labelTime(from)} to ${labelTime(to)}`);
    runStart = null;
    runEnd = null;
    runKey = '';
  };

  for (const day of WEEK_DAYS) {
    const hours = week[day.id];
    const key = hours.open ? `${hours.from}-${hours.to}` : '';
    if (hours.open && key === runKey) {
      runEnd = day.id;
    } else {
      flush();
      if (hours.open) {
        runStart = day.id;
        runEnd = day.id;
        runKey = key;
      }
    }
  }
  flush();
  return groups.length > 0 ? groups.join(', ') : 'Closed';
}

/** Any open day must close after it opens. */
export function hoursError(week: WeekHours): string | null {
  const invalid = WEEK_DAYS.some((day) => {
    const hours = week[day.id];
    return hours.open && hours.from >= hours.to;
  });
  return invalid ? 'Closing time must be after opening time.' : null;
}

export type HoursPresetId = 'weekdays' | 'monToSat' | 'custom';

const OPEN_DAY: DayHours = { open: true, from: '08:00', to: '17:30' };
const CLOSED_DAY: DayHours = { open: false, from: '08:00', to: '12:00' };

/** Preset application; `custom` keeps the current week untouched. */
export function applyHoursPreset(preset: HoursPresetId, week: WeekHours): WeekHours {
  if (preset === 'custom') return week;
  const openThrough: WeekDayId[] =
    preset === 'weekdays'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return WEEK_DAYS.reduce<WeekHours>((next, day) => {
    next[day.id] = openThrough.includes(day.id) ? { ...OPEN_DAY } : { ...CLOSED_DAY };
    return next;
  }, {} as WeekHours);
}

/* ------------------------------ team access ----------------------------- */

export const MEMBER_ROLES = [
  'Doctor',
  'Care coordinator',
  'Phlebotomist',
  'Reception',
  'Accountant',
] as const;

export type MemberRole = (typeof MEMBER_ROLES)[number];

export type Member = { name: string; role: string; you?: boolean };
export type PendingInvite = { name: string; role: string; sent: string };

/** Invites need a name that is not already in the workspace (case-insensitive). */
export function inviteError(
  name: string,
  members: readonly Member[],
  pending: readonly PendingInvite[],
): string | null {
  const trimmed = name.trim();
  if (!trimmed) return 'Member name is required.';
  const taken = [...members, ...pending].some(
    (person) => person.name.toLowerCase() === trimmed.toLowerCase(),
  );
  return taken ? `${trimmed} is already in this workspace.` : null;
}

/* ------------------------------ preferences ----------------------------- */

export type Prefs = {
  units: 'conventional' | 'si';
  inlineRef: boolean;
  collapseNormal: boolean;
  clock24: boolean;
};

export const DEFAULT_PREFS: Prefs = {
  units: 'conventional',
  inlineRef: true,
  collapseNormal: false,
  clock24: true,
};

export const PREFS_STORAGE_KEY = 'kura.preferences.v1';

export function loadPrefs(): Prefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(PREFS_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;

    const saved = JSON.parse(raw) as Partial<Prefs>;
    return {
      units: saved.units === 'si' ? 'si' : DEFAULT_PREFS.units,
      inlineRef:
        typeof saved.inlineRef === 'boolean' ? saved.inlineRef : DEFAULT_PREFS.inlineRef,
      collapseNormal:
        typeof saved.collapseNormal === 'boolean'
          ? saved.collapseNormal
          : DEFAULT_PREFS.collapseNormal,
      clock24: typeof saved.clock24 === 'boolean' ? saved.clock24 : DEFAULT_PREFS.clock24,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(prefs: Prefs): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Storage may be unavailable (private mode); preferences stay in memory.
  }
}

/** Current-value text shown next to each preference control. */
export const PREFS_VALUE_TEXT = {
  units: (prefs: Prefs) =>
    prefs.units === 'conventional' ? 'Conventional (mg/dL)' : 'SI (mmol/L)',
  inlineRef: (prefs: Prefs) =>
    prefs.inlineRef ? 'Shown inline' : 'Hidden until opened',
  collapseNormal: (prefs: Prefs) =>
    prefs.collapseNormal ? 'Collapsed by default' : 'Expanded by default',
  clock24: (prefs: Prefs) => (prefs.clock24 ? '24-hour' : '12-hour'),
} as const;

/* ------------------------------- downloads ------------------------------ */

/** Prototype export: build a Blob and download it locally. */
export function downloadTextFile(
  filename: string,
  content: string,
  mime = 'text/plain',
): void {
  if (typeof document === 'undefined') return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
