import type { HomeData, HomeSignal, HomeWorkQueueEntry } from './types';
import { RESULT_REVIEW_QUEUE } from '../results/demo-data';

/**
 * Deterministic demo fixtures. Dates, hours, and money are fixed values —
 * nothing in this module reads the clock. Money is in minor units (×100).
 */

const resultsSignal: HomeSignal = {
  key: 'results',
  kind: 'worklist',
  title: 'Results',
  count: 5,
  detail: '2 flagged · oldest 2h ago',
  tone: 'attention',
  toneLabel: 'Needs review',
  state: 'ready',
  reviewItems: RESULT_REVIEW_QUEUE,
  action: { label: 'Review results', targetKey: 'results' },
};

export const BOOKING_WORK_QUEUE: HomeWorkQueueEntry[] = [
  {
    id: 'booking-fz48210',
    patient: {
      id: 'patient-sokha-chan',
      name: 'Sokha Chan',
      medicalRecordNumber: 'MK-09831',
      dob: '1976-11-04',
    },
    reason: 'T2DM review · 09:30 today',
    context: 'Booking FZ48210',
  },
  {
    id: 'booking-fz48218',
    patient: {
      id: 'patient-chenda-sreymom',
      name: 'Chenda Sreymom',
      medicalRecordNumber: 'MK-11720',
      dob: '1991-08-24',
    },
    reason: 'New patient visit · 11:00 today',
    context: 'Walk-in confirmed',
  },
  {
    id: 'booking-fz48172',
    patient: {
      id: 'patient-nary-chhouk',
      name: 'Nary Chhouk',
      medicalRecordNumber: 'MK-08416',
      dob: '1968-02-09',
    },
    reason: 'Follow-up · Missed yesterday',
    context: 'Booking FZ48172',
    status: { label: 'Missed', tone: 'attention' },
  },
];

export const PATIENT_REVIEW_QUEUE: HomeWorkQueueEntry[] = [
  {
    id: 'patient-review-vicheka',
    patient: {
      id: 'patient-vicheka-sam',
      name: 'Vicheka Sam',
      medicalRecordNumber: 'MK-07654',
      dob: '1968-01-17',
    },
    reason: 'HbA1c rising across 2 visits',
    context: 'Last result 3 days ago',
  },
  {
    id: 'patient-review-maly',
    patient: {
      id: 'patient-maly-sok',
      name: 'Maly Sok',
      medicalRecordNumber: 'MK-12106',
      dob: '1987-06-09',
    },
    reason: 'LDL rising across 2 visits',
    context: 'Last result 5 days ago',
  },
  {
    id: 'patient-review-sophal',
    patient: {
      id: 'patient-keo-sophal',
      name: 'Keo Sophal',
      medicalRecordNumber: 'MK-10387',
      dob: '1959-03-22',
    },
    reason: 'Blood pressure above target',
    context: '2 readings this month',
  },
];

const bookingsSignal: HomeSignal = {
  key: 'bookings',
  kind: 'worklist',
  title: 'Bookings',
  count: 3,
  detail: '2 today · 1 missed yesterday',
  tone: 'neutral',
  state: 'ready',
  workItems: BOOKING_WORK_QUEUE,
  action: { label: 'Review bookings', targetKey: 'bookings' },
};

const patientsSignal: HomeSignal = {
  key: 'patients',
  kind: 'worklist',
  title: 'Patients',
  count: 8,
  detail: 'HbA1c and LDL rising across 2 visits',
  tone: 'neutral',
  state: 'ready',
  workItems: PATIENT_REVIEW_QUEUE,
  action: { label: 'Review patients', targetKey: 'patients' },
};

const pickupSignal: HomeSignal = {
  key: 'pickup',
  kind: 'info',
  title: 'Tube pickup',
  headline: '16:40',
  detail: '8 ready · Sok S. · daily sweep',
  tone: 'neutral',
  state: 'ready',
  action: { label: 'View orders', targetKey: 'bookings' },
};

const balanceSignal: HomeSignal = {
  key: 'balance',
  kind: 'info',
  title: 'Balance',
  moneyMinor: '3450',
  currency: 'USD',
  detail: '3 orders · settles twice monthly',
  tone: 'neutral',
  state: 'ready',
  action: { label: 'Open balance', targetKey: 'balance' },
};

const NEXT_ACTIONS: HomeData['nextActions'] = [
  { time: '09:30', label: 'Sokha Chan · T2DM review', meta: 'Booking FZ48210', targetKey: 'bookings' },
  { time: '10:15', label: 'Dara Phally · lipid panel review', meta: 'Results available', targetKey: 'results' },
  { time: '11:00', label: 'Chenda Sreymom · new patient visit', meta: 'Walk in confirmed', targetKey: 'patients' },
  { time: '16:40', label: 'Hand 8 tubes to Sok S.', meta: 'Pickup code required', targetKey: 'bookings' },
];

const BASE: HomeData = {
  doctorName: 'Dr. Sok Vanna',
  hour: 8,
  dateLabel: 'Friday, 17 July 2026',
  scopeLabel: 'Mekong Clinic · BKK1 · 184 patients in view',
  licence: { state: 'verified' },
  freshness: { kind: 'live' },
  signals: [resultsSignal, bookingsSignal, patientsSignal, pickupSignal, balanceSignal],
  nextActions: NEXT_ACTIONS,
};

export const busyMorning: HomeData = BASE;

export const criticalDay: HomeData = {
  ...BASE,
  signals: [
    {
      ...resultsSignal,
      count: 6,
      detail: 'Potassium 6.8 mmol/L · Sokha Chan · 12m ago',
      tone: 'critical',
      toneLabel: 'Critical',
      reviewItems: [
        {
          ...RESULT_REVIEW_QUEUE[1],
          testName: 'Potassium',
          returnedLabel: '12 minutes ago',
          status: 'critical',
        },
        ...RESULT_REVIEW_QUEUE.filter((entry) => entry.id !== RESULT_REVIEW_QUEUE[1].id),
      ],
      action: { label: 'Review critical result', targetKey: 'results' },
    },
    bookingsSignal,
    patientsSignal,
    pickupSignal,
    balanceSignal,
  ],
};

export const allCaughtUp: HomeData = {
  ...BASE,
  hour: 13,
  signals: [
    {
      ...resultsSignal,
      count: 0,
      detail: 'No results waiting.',
      tone: 'neutral',
      toneLabel: undefined,
      reviewItems: [],
    },
    { ...bookingsSignal, count: 0, detail: 'No bookings need attention.', workItems: [] },
    { ...patientsSignal, count: 0, detail: 'All on target.', workItems: [] },
    pickupSignal,
    balanceSignal,
  ],
  nextActions: [
    { time: '16:40', label: 'Hand 8 tubes to Sok S.', meta: 'Pickup code required', targetKey: 'bookings' },
  ],
};

export const afternoonHandover: HomeData = {
  ...BASE,
  hour: 17,
  signals: [
    {
      ...resultsSignal,
      count: 1,
      detail: '1 flagged · 20m ago',
      toneLabel: 'Needs review',
      reviewItems: RESULT_REVIEW_QUEUE.slice(0, 1),
    },
    {
      ...bookingsSignal,
      count: 0,
      detail: 'No bookings need attention.',
      tone: 'neutral',
      workItems: [],
    },
    { ...patientsSignal, count: 8 },
    balanceSignal,
  ],
  closedToday: { resultLoops: 12, bookings: 9, earnedMinor: '8600' },
  nextActions: [
    { time: 'Tomorrow 08:00', label: 'Sokha Chan · repeat potassium', meta: 'STAT repeat ordered', targetKey: 'bookings' },
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

/** First shell entry from the canonical new-doctor onboarding story. */
export const newDoctorFirstHome: HomeData = {
  ...BASE,
  doctorName: 'Dr. Bopha Kim',
  firstUse: true,
  scopeLabel: "Bopha Kim's cabinet",
  licence: { state: 'none' },
  demoPatient: { name: 'Sokha Chann', summary: 'results already back' },
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
      errorMessage: 'Results could not load.',
    },
    bookingsSignal,
    patientsSignal,
    pickupSignal,
    balanceSignal,
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
  signals: [resultsSignal, bookingsSignal, patientsSignal, balanceSignal],
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
      detail: '48 flagged · oldest 3 days · amended reports need review',
      toneLabel: 'Needs review',
      reviewItems: [
        {
          ...RESULT_REVIEW_QUEUE[0],
          patient: {
            ...RESULT_REVIEW_QUEUE[0].patient,
            name: 'Chanthavysouk Keomanivong-Rattanakosin',
            medicalRecordNumber: 'KURA-CENTRAL-00010482',
          },
          testName: 'Comprehensive metabolic and renal function panel',
        },
        ...RESULT_REVIEW_QUEUE.slice(1),
      ],
    },
    {
      ...bookingsSignal,
      count: 999,
      detail: '412 today · 87 missed this week · 14 await PSC identity check',
      workItems: [
        {
          ...BOOKING_WORK_QUEUE[0],
          patient: {
            ...BOOKING_WORK_QUEUE[0].patient,
            name: 'Keo Sovannaroth Chandaravuth',
            medicalRecordNumber: 'KURA-CENTRAL-00009831',
          },
          reason: 'Diabetes, hypertension and chronic kidney disease review · 09:30 today',
          context: 'Interpreter requested · wheelchair access',
        },
        ...BOOKING_WORK_QUEUE.slice(1),
      ],
    },
    { ...patientsSignal, count: 256, detail: 'HbA1c, LDL and BP rising in chronic cohorts' },
    { ...pickupSignal, detail: '64 ready · Sopheap Thongsavanh · urgent dispatch' },
    { ...balanceSignal, moneyMinor: '12845000', currency: 'KHR', detail: '96 orders · settles twice monthly' },
  ],
  nextActions: [
    {
      time: '09:30',
      label: 'Keo Sovannaroth Chandaravuth · diabetes, hypertension and chronic kidney disease review',
      meta: 'Booking FZ48210 · interpreter requested · wheelchair access',
      targetKey: 'bookings',
    },
    ...NEXT_ACTIONS.slice(1),
  ],
};

/** Storybook-owned operational variants consumed by Home stories and app wiring. */
export const HOME_DEMO_SCENARIOS = {
  'busy-morning': busyMorning,
  'critical-day': criticalDay,
  'all-caught-up': allCaughtUp,
  'afternoon-handover': afternoonHandover,
  'empty-clinic': verifiedEmptyClinic,
  'solo-doctor': soloDoctor,
  'reduced-capabilities': reducedCapabilities,
  'permission-restricted': permissionRestricted,
  'no-workspace': noWorkspaceAccess,
  loading,
  'partial-data': partialData,
  'full-failure': fullFailure,
  stale,
  offline,
  'long-content': longContent,
} as const satisfies Record<string, HomeData>;

export type HomeDemoScenarioId = keyof typeof HOME_DEMO_SCENARIOS;
