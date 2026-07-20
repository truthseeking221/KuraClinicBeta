/**
 * Storybook fixtures for the workspace settings surface, carried over
 * verbatim from the legacy DCM prototype. Everything here is demo data —
 * the production surface reads the same shapes from the workspace BFF.
 */

import type {
  CourierPickup,
  Member,
  PendingInvite,
  WeekHours,
} from './logic';
import { daysUntil } from './logic';

/* ------------------------------- identity ------------------------------- */

export const ME = {
  name: 'Dr. Phong Tuy',
  khmerName: 'វេជ្ជបណ្ឌិត ភុង ទុយ',
  initials: 'PT',
  email: 'leon@kura.med',
  license: 'CMC 048-2019',
  licenseExpiry: 'Jul 20, 2026',
  licenseExpiryIso: '2026-07-20',
  tier: 'Verified clinician',
} as const;

/** Fixed demo "today" so the license countdown renders deterministically. */
export const SETTINGS_TODAY_ISO = '2026-06-22';

export const LICENSE_RENEWAL_DAYS = daysUntil(
  ME.licenseExpiryIso,
  SETTINGS_TODAY_ISO,
);
export const LICENSE_RENEWAL_TEXT = `${LICENSE_RENEWAL_DAYS} days`;

/* -------------------------------- cabinet ------------------------------- */

export const CABINET = {
  name: 'Kura Cabinet, Toul Kork',
  address: 'St. 315, Boeung Kak 2, Toul Kork, Phnom Penh',
  specialty: 'Endocrinology · internal medicine',
  clinicType: 'Private cabinet',
  country: 'Cambodia',
  timezone: 'Asia/Phnom_Penh · GMT+7',
  currency: 'USD · KHR displayed at NBC rate',
} as const;

export const DEFAULT_COURIER_PICKUP: CourierPickup = {
  routeId: 'PP-04',
  days: ['Mon', 'Wed', 'Fri'],
  time: '16:00',
};

/* ----------------------------- team access ------------------------------ */

export const MEMBERS: readonly Member[] = [
  { name: 'Phong Tuy', role: 'Owner · Doctor', you: true },
  { name: 'Sophea Lim', role: 'Doctor' },
  { name: 'Ratha Kim', role: 'Care coordinator' },
  { name: 'Dara Sok', role: 'Phlebotomist' },
  { name: 'Mealea Chan', role: 'Reception' },
];

export const PENDING_INVITES: readonly PendingInvite[] = [
  { name: 'Visal Nuon', role: 'Accountant', sent: 'invited 2 days ago' },
];

/* --------------------------- patient messages --------------------------- */

export type PatientChannel = {
  name: string;
  note: string;
  state: 'active' | 'fallback' | 'soon';
};

export const CHANNELS: readonly PatientChannel[] = [
  { name: 'Telegram', note: 'Default for 92% of reachable patients', state: 'active' },
  { name: 'SMS', note: 'Fallback after 30 min unread', state: 'fallback' },
  { name: 'Email', note: 'Fallback for receipts and documents', state: 'fallback' },
];

export const TEMPLATES = [
  'Results ready',
  'Follow up reminder',
  'Booking confirmation',
] as const;

export const TEMPLATE_COPY: Record<(typeof TEMPLATES)[number], string> = {
  'Results ready': 'Your results are ready in Kura.',
  'Follow up reminder': 'Your follow up is due soon. Please book a time.',
  'Booking confirmation':
    'Your booking is confirmed. We will remind you before the visit.',
};

/** Downloadable QR placeholder — file content, never rendered as UI. */
export const DOCTOR_QR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 44 44"><rect width="44" height="44" fill="#fff"/><rect x="2" y="2" width="12" height="12" fill="none" stroke="#0b1424" stroke-width="2"/><rect x="30" y="2" width="12" height="12" fill="none" stroke="#0b1424" stroke-width="2"/><rect x="2" y="30" width="12" height="12" fill="none" stroke="#0b1424" stroke-width="2"/><path d="M20 20h4v4h-4zM30 30h4v4h-4zM38 30h4M30 38h4M38 38h4v4" fill="none" stroke="#0b1424" stroke-width="2"/></svg>`;

/* ---------------------------- directory hours --------------------------- */

export const DEFAULT_HOURS: WeekHours = {
  Mon: { open: true, from: '08:00', to: '17:30' },
  Tue: { open: true, from: '08:00', to: '17:30' },
  Wed: { open: true, from: '08:00', to: '17:30' },
  Thu: { open: true, from: '08:00', to: '17:30' },
  Fri: { open: true, from: '08:00', to: '17:30' },
  Sat: { open: true, from: '08:00', to: '17:30' },
  Sun: { open: false, from: '08:00', to: '12:00' },
};

export const DIRECTORY_LANGUAGES = ['ភាសាខ្មែរ', 'English'] as const;

export const DIRECTORY_SERVICES = [
  'Diabetes care',
  'CKD management',
  'Hypertension',
] as const;

export const DIRECTORY_BIO =
  'Endocrinologist focused on long-term diabetes and kidney care in Phnom Penh.';

/* ---------------------------- signed documents --------------------------- */

export type SignatureEvent = { doc: string; when: string };

export const SIGNATURES: readonly SignatureEvent[] = [
  { doc: 'e-Prescription #2841', when: 'Jun 10, 2026 · 14:32' },
  { doc: 'Lab requisition FZ-38245', when: 'Jun 9, 2026 · 09:18' },
  { doc: 'Dx letter for Sokha Chan', when: 'Jun 2, 2026 · 16:05' },
];

export function buildSigningLogCsv(
  events: readonly SignatureEvent[] = SIGNATURES,
): string {
  return ['Document,Signed at', ...events.map((e) => `${e.doc},${e.when}`)].join(
    '\n',
  );
}

/* -------------------------------- security ------------------------------ */

export type SessionInfo = {
  id: string;
  label: string;
  detail: string;
  sub: string;
};

export const CURRENT_SESSION: SessionInfo = {
  id: 'current',
  label: 'MacBook Pro · Phnom Penh',
  detail: 'This device',
  sub: 'Chrome · signed in 3 days ago',
};

export const OTHER_SESSIONS: readonly SessionInfo[] = [
  {
    id: 'iphone-15',
    label: 'iPhone 15 · Telegram linked',
    detail: 'Mobile companion',
    sub: 'Last active today · 08:55',
  },
];

export type AuditEvent = { what: string; who: string; when: string };

export const AUDIT_EVENTS: readonly AuditEvent[] = [
  { what: 'Exported lab history PDF (watermarked)', who: 'You', when: 'Today · 09:12' },
  { what: 'Viewed Sokha Chan record', who: 'Ratha Kim', when: 'Yesterday · 17:40' },
  { what: 'Invite sent to Visal Nuon (Accountant)', who: 'You', when: '2 days ago' },
];
