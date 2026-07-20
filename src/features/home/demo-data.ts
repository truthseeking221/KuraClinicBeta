import type { HomeData, HomeSignal } from './types';

/**
 * Deterministic demo fixtures. Dates, hours, and money are fixed values —
 * nothing in this module reads the clock. Money is in minor units (×100).
 */

const resultsSignal: HomeSignal = {
  key: 'results',
  kind: 'worklist',
  title: 'New results',
  count: 5,
  detail: '2 flagged · oldest returned 2h ago',
  tone: 'attention',
  toneLabel: 'Needs review',
  state: 'ready',
  action: { label: 'Review results', targetKey: 'results' },
};

const bookingsSignal: HomeSignal = {
  key: 'bookings',
  kind: 'worklist',
  title: 'Awaiting visit',
  count: 3,
  detail: '2 due today · 1 missed yesterday',
  tone: 'neutral',
  state: 'ready',
  action: { label: 'Open bookings', targetKey: 'bookings' },
};

const patientsSignal: HomeSignal = {
  key: 'patients',
  kind: 'worklist',
  title: 'Off-target patients',
  count: 8,
  detail: 'HbA1c and LDL trending up across 2 visits',
  tone: 'neutral',
  state: 'ready',
  action: { label: 'Open patients', targetKey: 'patients' },
};

const pickupSignal: HomeSignal = {
  key: 'pickup',
  kind: 'info',
  title: 'Tube pickup',
  headline: '16:40',
  detail: '8 tubes ready · Sok S. · daily sweep',
  tone: 'neutral',
  state: 'ready',
  action: { label: 'View orders', targetKey: 'bookings' },
};

const earningsSignal: HomeSignal = {
  key: 'earnings',
  kind: 'info',
  title: 'Earnings today',
  moneyMinor: '3450',
  currency: 'USD',
  detail: '3 orders · settles bi-monthly',
  tone: 'neutral',
  state: 'ready',
  action: { label: 'Open earnings', targetKey: 'earnings' },
};

const NEXT_ACTIONS: HomeData['nextActions'] = [
  { time: '09:30', label: 'Sokha Chan · T2DM follow-up', meta: 'Booking FZ48210', targetKey: 'bookings' },
  { time: '10:15', label: 'Dara Phally · lipid panel review', meta: 'Results back', targetKey: 'results' },
  { time: '11:00', label: 'Chenda Sreymom · new patient intake', meta: 'Walk-in confirmed', targetKey: 'patients' },
  { time: '16:40', label: 'Hand 8 tubes to Sok S.', meta: 'Read the pickup code at the door', targetKey: 'bookings' },
];

const BASE: HomeData = {
  doctorName: 'Dr. Sok Vanna',
  hour: 8,
  dateLabel: 'Friday, 17 July 2026',
  scopeLabel: 'Mekong Clinic · BKK1 · 184 patients in view',
  licence: { state: 'verified' },
  freshness: { kind: 'live' },
  signals: [resultsSignal, bookingsSignal, patientsSignal, pickupSignal, earningsSignal],
  nextActions: NEXT_ACTIONS,
};

export const busyMorning: HomeData = BASE;

export const criticalDay: HomeData = {
  ...BASE,
  signals: [
    {
      ...resultsSignal,
      count: 6,
      detail: 'Potassium 6.8 mmol/L · Sokha Chan · returned 12m ago',
      tone: 'critical',
      toneLabel: 'Critical',
      action: { label: 'Review critical result', targetKey: 'results' },
    },
    bookingsSignal,
    patientsSignal,
    pickupSignal,
    earningsSignal,
  ],
};

export const allCaughtUp: HomeData = {
  ...BASE,
  hour: 13,
  signals: [
    { ...resultsSignal, count: 0, detail: 'Nothing waiting for review', tone: 'neutral', toneLabel: undefined },
    { ...bookingsSignal, count: 0, detail: 'No bookings need you right now' },
    { ...patientsSignal, count: 0, detail: 'Everyone is on target' },
    pickupSignal,
    earningsSignal,
  ],
  nextActions: [
    { time: '16:40', label: 'Hand 8 tubes to Sok S.', meta: 'Read the pickup code at the door', targetKey: 'bookings' },
  ],
};

export const afternoonHandover: HomeData = {
  ...BASE,
  hour: 17,
  signals: [
    { ...resultsSignal, count: 1, detail: '1 flagged · returned 20m ago', toneLabel: 'Needs review' },
    { ...bookingsSignal, count: 0, detail: 'No bookings need you right now', tone: 'neutral' },
    { ...patientsSignal, count: 8 },
    earningsSignal,
  ],
  closedToday: { resultLoops: 12, bookings: 9, earnedMinor: '8600' },
  nextActions: [
    { time: 'Tomorrow 08:00', label: 'Sokha Chan · repeat potassium', meta: 'STAT follow-up ordered', targetKey: 'bookings' },
  ],
};

export const licenceNone: HomeData = {
  ...BASE,
  licence: { state: 'none' },
};

export const licencePendingReview: HomeData = {
  ...BASE,
  licence: { state: 'pending_review' },
};

export const licenceRejected: HomeData = {
  ...BASE,
  licence: { state: 'rejected' },
};

export const licenceExpiring: HomeData = {
  ...BASE,
  licence: { state: 'expiring', expiryDate: '2026-08-31' },
};

export const licenceInGrace: HomeData = {
  ...BASE,
  licence: {
    state: 'in_grace',
    expiryDate: '2026-08-30',
    lapseDeadline: '2026-10-29',
  },
};

export const licenceLapsed: HomeData = {
  ...BASE,
  licence: {
    state: 'lapsed',
    expiryDate: '2026-05-18',
    lapseDeadline: '2026-07-17',
  },
};

export const verifiedEmptyClinic: HomeData = {
  ...BASE,
  scopeLabel: 'Mekong Clinic · BKK1 · 0 patients',
  signals: [],
  nextActions: [],
};

export const loading: HomeData = {
  ...BASE,
  viewState: 'loading',
  signals: BASE.signals.map((signal) => ({ ...signal, state: 'loading' as const })),
  nextActions: [],
};

export const partialData: HomeData = {
  ...BASE,
  signals: [
    {
      ...resultsSignal,
      state: 'error',
      errorMessage: 'Results could not be loaded.',
    },
    bookingsSignal,
    patientsSignal,
    pickupSignal,
    earningsSignal,
  ],
};

export const fullFailure: HomeData = {
  ...BASE,
  viewState: 'error',
};

export const stale: HomeData = {
  ...BASE,
  freshness: { kind: 'stale', asOf: '09:12' },
};

export const offline: HomeData = {
  ...BASE,
  freshness: { kind: 'offline', asOf: '09:12' },
};

export const soloDoctor: HomeData = {
  ...BASE,
  scopeLabel: 'Cabinet Médical Chann · 42 patients in view',
  signals: [resultsSignal, bookingsSignal, patientsSignal, earningsSignal],
};

export const reducedCapabilities: HomeData = {
  ...BASE,
  // No payment capability: the earnings signal is omitted entirely, never greyed.
  signals: [resultsSignal, bookingsSignal, patientsSignal, pickupSignal],
};

export const permissionRestricted: HomeData = {
  ...BASE,
  viewState: 'permission',
};

export const noWorkspaceAccess: HomeData = {
  ...BASE,
  scopeLabel: 'No active workspace',
  viewState: 'no-workspace',
};

export const longContent: HomeData = {
  ...BASE,
  doctorName: 'Dr. Chanthavysouk Keomanivong-Rattanakosin',
  scopeLabel:
    'Preah Ang Duong Multi-Specialty Polyclinic and Diagnostic Centre · Boeung Keng Kang 1 · 1,284 patients in view',
  signals: [
    {
      ...resultsSignal,
      count: 132,
      detail: '48 flagged · oldest returned 3 days ago · includes amended reports awaiting re-review',
      toneLabel: 'Needs review',
    },
    {
      ...bookingsSignal,
      count: 999,
      detail: '412 due today · 87 missed this week · 14 awaiting identity confirmation at PSC',
    },
    { ...patientsSignal, count: 256, detail: 'HbA1c, LDL, and blood pressure trending up across chronic cohorts' },
    { ...pickupSignal, detail: '64 tubes ready · Sopheap Thongsavanh · urgent dispatch and daily sweep' },
    { ...earningsSignal, moneyMinor: '12845000', currency: 'KHR', detail: '96 orders · settles bi-monthly' },
  ],
  nextActions: [
    {
      time: '09:30',
      label: 'Keo Sovannaroth Chandaravuth · diabetes, hypertension, and chronic kidney disease follow-up',
      meta: 'Booking FZ48210 · interpreter requested · wheelchair access',
      targetKey: 'bookings',
    },
    ...NEXT_ACTIONS.slice(1),
  ],
};
