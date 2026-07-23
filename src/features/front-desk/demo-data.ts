import type {
  Cart,
  CartItem,
  CartPayment,
  DeskQueueState,
  DeskVisit,
  FrontDeskPatient,
  IntakeFields,
} from './types';

const EMPTY_INTAKE: IntakeFields = {
  chiefComplaint: '',
  preTestPrep: '',
  medications: '',
  womensHealth: '',
  recentEvents: '',
  lifestyle: '',
  sampleComfort: '',
  sensitiveConsent: '',
};

function emptyCart(): Cart {
  return {
    items: [],
    payment: {
      status: 'idle',
      method: null,
      tendered: '',
      changeMinor: '0',
      receiptId: null,
      confirmedAt: null,
      amountMinor: null,
    },
  };
}

export function blankWalkIn(id: string, queueNumber: number): FrontDeskPatient {
  return {
    id,
    queueNumber,
    name: '',
    nameKhmer: '',
    dob: '',
    sexAtBirth: '',
    idNumber: '',
    preferredLanguage: 'Khmer',
    address: { province: '', district: '', commune: '', street: '' },
    refundAccount: null,
    countryCode: '+855',
    phoneNumber: '',
    otpVerified: false,
    telegramVerified: false,
    preferredChannel: null,
    unverifiedReason: null,
    identity: { source: null, lockedFields: [] },
    identityConfirmation: null,
    insurance: [],
    insuranceAcked: false,
    collisionAcked: [],
    teleconsult: { status: 'notBooked' },
    cart: emptyCart(),
    intake: { ...EMPTY_INTAKE },
    visitReason: [],
  };
}

/** Existing records — the collision pool for duplicate detection. */
export const EXISTING_PATIENTS: FrontDeskPatient[] = [
  {
    ...blankWalkIn('p-existing-1', 12),
    name: 'Sokha Chan',
    dob: '1992-03-14',
    sexAtBirth: 'Female',
    idNumber: 'KH-114522',
    phoneNumber: '12777088',
    otpVerified: true,
    identity: { source: 'manual', lockedFields: [] },
  },
  {
    ...blankWalkIn('p-existing-2', 18),
    name: 'Vibol Keo',
    dob: '1968-07-21',
    sexAtBirth: 'Male',
    idNumber: 'KH-880341',
    phoneNumber: '89552214',
    otpVerified: true,
    identity: { source: 'manual', lockedFields: [] },
  },
];

export const DEMO_OTP = '123456';
export const DEMO_CASHIER = 'Linh Nguyen';
/** Receptionist on the desk — recorded as the actor on a patient confirmation. */
export const DEMO_DESK_STAFF = 'Sothea Ly';
export const DEMO_CONFIRMED_IDENTITY_AT = '08:33';
export const DEMO_CONFIRMED_AT = '09:42';
export const DEMO_RECEIPT_ID = 'R-58213';

// ── Step-1 identity registry (reception view of patient-ms) ─

import { collectionCodeStatusMeta, resolvedRecordPatch } from './logic';
import type {
  BookingSummary,
  CollectionCodeStatus,
  PatientRecordSummary,
  Prescriber,
} from './types';

/** The desk's own branch; codes issued elsewhere cannot be redeemed here. */
export const DEMO_BRANCH_ID = 'bkk1';

/**
 * The desk's working day, injected. Date validation compares against this
 * instead of the wall clock so a story renders the same result every run.
 */
export const FRONT_DESK_TODAY_ISO = '2026-07-23';

function booking(
  code: string,
  codeStatus: CollectionCodeStatus,
  whenLabel: string,
  itemsLabel: string,
  extra?: Partial<BookingSummary>,
): BookingSummary {
  return {
    code,
    codeStatus,
    whenLabel,
    itemsLabel,
    status: collectionCodeStatusMeta(codeStatus),
    ...extra,
  };
}

export const IDENTITY_REGISTRY: PatientRecordSummary[] = [
  {
    id: 'rec-sok-phearom',
    name: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    dob: '1974-03-15',
    sexAtBirth: 'Male',
    nid: '012345678',
    phone: '093 123 8123',
    assurance: 'verified',
    registeredHere: true,
    phoneVerifiedMonthsAgo: 6,
    lastVisitLabel: 'Last visit 3 weeks ago · PSC BKK1 · Dr. Lim Cabinet',
    bookings: [
      booking('PSC-A82Q7K3M', 'scheduled', 'Today, 09:45', 'HbA1c, TSH', {
        locationLabel: 'PSC BKK1',
        providerLabel: 'Dr. Lim Cabinet',
        branchId: DEMO_BRANCH_ID,
        creatorLabel: 'Reception · Sothea',
        payment: { state: 'paid', amountMinor: '1850' },
      }),
      booking('PSC-B41M9T27', 'issued', 'Today, 10:30', 'Lipid panel', {
        branchId: DEMO_BRANCH_ID,
        creatorLabel: 'Patient self-booked',
        payment: { state: 'pending', amountMinor: '1200' },
      }),
      // An old code the patient never used. Codes do not lapse, so this one
      // still redeems — age is not a reason to turn a patient away.
      booking('PSC-E52N4Q18', 'issued', 'Issued 9 days ago', 'CBC', { branchId: DEMO_BRANCH_ID }),
      // Blocked lifecycle branches — every state that genuinely blocks.
      booking('PSC-F63R8W25', 'redeemed', 'Today, 08:05', 'Glucose', { branchId: DEMO_BRANCH_ID }),
      booking('PSC-G74T5Y36', 'cancelled', 'Yesterday, 16:20', 'TSH', { branchId: DEMO_BRANCH_ID }),
      booking('PSC-H85V6Z47', 'scheduled', 'Today, 11:00', 'Vitamin D', {
        branchId: 'tuol-kork',
        locationLabel: 'PSC Tuol Kork',
      }),
    ],
  },
  {
    id: 'rec-maly-chea',
    name: 'Maly Chea',
    nameKhmer: 'ម៉ាលី ឆា',
    dob: '1996-02-14',
    sexAtBirth: 'Female',
    phone: '012 345 678',
    assurance: 'verified',
    registeredHere: false,
  },
  {
    id: 'rec-lina-prum',
    name: 'Lina Prum',
    nameKhmer: 'លីណា ព្រំ',
    dob: '1988-05-20',
    sexAtBirth: 'Female',
    nid: '052874345',
    phone: '087 654 3210',
    assurance: 'verified',
    registeredHere: true,
    bookings: [
      booking('PSC-C77H2X54', 'scheduled', 'Today, 09:15', 'CBC, Lipid', { branchId: DEMO_BRANCH_ID }),
    ],
  },
  {
    id: 'rec-baby-prum',
    name: 'Baby Prum',
    nameKhmer: 'ប្រូម',
    dob: '2024-03-10',
    sexAtBirth: 'Male',
    phone: '087 654 3210',
    assurance: 'unverified',
    minor: true,
    guardianName: 'Lina Prum',
    registeredHere: true,
    bookings: [
      booking('PSC-D19K6B83', 'scheduled', 'Today, 09:30', 'Vaccines · MMR', { branchId: DEMO_BRANCH_ID }),
    ],
  },
  {
    id: 'rec-sok-heng',
    name: 'Sok Heng',
    nameKhmer: 'សុខ ហេង',
    dob: '1965-01-01',
    sexAtBirth: 'Male',
    nid: '041203345',
    phone: '077 123 456',
    assurance: 'verified',
    registeredHere: true,
    /* Stale verification: over the 12-month trust window. */
    phoneVerifiedMonthsAgo: 14,
    lastVisitLabel: 'Last visit 1 year ago · PSC BKK1 · Dr. Lim Cabinet',
  },
  {
    id: 'rec-sok',
    name: 'Sok',
    nameKhmer: 'សុខ',
    dob: '1965-01-01',
    sexAtBirth: 'Male',
    phone: '098 765 432',
    assurance: 'unverified',
    registeredHere: false,
    lastVisitLabel: 'Last visit 2 years ago · PSC Tuol Kork',
  },
];

export const DEMO_BOOKING_QR_PAYLOAD = 'kura://booking/PSC-A82Q7K3M';

// ── Promotions (PROTOTYPE: no upstream promo engine) ───────

import type { Promo } from './types';

/** Codes the desk can redeem in the demo. Lookup is case-insensitive. */
export const DEMO_PROMOS: Promo[] = [
  { code: 'WELCOME10', label: 'New patient · 10% off', kind: 'percent', percentOff: 10 },
  { code: 'CBC50', label: 'CBC half price', kind: 'item', itemId: 'cbc', percentOff: 50 },
  { code: 'CORP5', label: 'Corporate · $5 off', kind: 'fixed', amountMinor: '500' },
];

export function findDemoPromo(code: string): Promo | undefined {
  const needle = code.trim().toUpperCase();
  return DEMO_PROMOS.find((promo) => promo.code === needle);
}

// ── Order attribution (ADR-0057) ───────────────────────────

/** Workspace clinicians a receptionist can attribute an order to. */
export const DEMO_PRESCRIBERS: Prescriber[] = [
  {
    userId: 'dr-sok-vanna',
    name: 'Dr. Sok Vanna',
    specialty: 'General practice',
    workspaceMember: true,
    licence: 'verified',
  },
  {
    userId: 'dr-lim-dara',
    name: 'Dr. Lim Dara',
    specialty: 'Internal medicine',
    workspaceMember: true,
    licence: 'verified',
  },
  {
    userId: 'dr-chan-rotha',
    name: 'Dr. Chan Rotha',
    specialty: 'Paediatrics',
    workspaceMember: true,
    licence: 'expired',
  },
];

/** No clinician can be attributed → placement is blocked (422 NO_ELIGIBLE_PRESCRIBER). */
export const DEMO_PRESCRIBERS_NONE_ELIGIBLE: Prescriber[] = DEMO_PRESCRIBERS.map(
  (prescriber) => ({ ...prescriber, licence: 'expired' as const }),
);

// ── Pricing snapshot fixtures ──────────────────────────────

/** Server re-derived one line since quoting; the desk must re-accept. */
export const STALE_PRICING: NonNullable<Cart['pricing']> = {
  catalogVersion: 'cat-2026-07-01',
  pricingVersion: 'price-2026-07-15',
  state: 'stale',
  repricedLines: [
    {
      itemId: 'hba1c',
      name: 'HbA1c',
      oldPriceMinor: '900',
      newPriceMinor: '1050',
    },
  ],
};

export const CURRENT_PRICING: NonNullable<Cart['pricing']> = {
  catalogVersion: 'cat-2026-07-01',
  pricingVersion: 'price-2026-07-16',
  state: 'current',
};

// ── Desk queue fixtures (deterministic waits, injected) ────

export const DESK_VISITS: DeskVisit[] = [
  {
    id: 'v-1',
    queueNumber: 27,
    ticket: 'W-027',
    patientName: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    arrivedLabel: '08:55',
    waitMinutes: 12,
    arrivalClass: 'walk-in',
    call: { state: 'waiting' },
    stage: 'arrived',
    assurance: 'unverified',
    contact: 'confirmed',
    payment: 'pending',
    resumeTask: 'orders',
  },
  {
    id: 'v-2',
    queueNumber: 28,
    ticket: 'W-028',
    patientName: 'Chenda Sreymom',
    nameKhmer: 'ចិន្តា ស្រីមុំ',
    arrivedLabel: '08:40',
    waitMinutes: 27,
    arrivalClass: 'walk-in',
    call: { state: 'waiting' },
    stage: 'arrived',
    assurance: 'unverified',
    contact: 'unconfirmed',
    payment: 'deferred',
    resumeTask: 'patient',
  },
  {
    // Urgent draw: shortest wait in the room, first at the chair.
    id: 'v-stat',
    queueNumber: 29,
    ticket: 'S-029',
    patientName: 'Ratanak Chhun',
    nameKhmer: 'រតនៈ ឈុន',
    arrivedLabel: '09:02',
    waitMinutes: 4,
    arrivalClass: 'stat',
    call: { state: 'waiting' },
    stage: 'identity-resolved',
    assurance: 'verified',
    contact: 'confirmed',
    payment: 'deferred',
  },
  {
    // Booked slot, due now: ahead of walk-ins who arrived earlier.
    id: 'v-3',
    queueNumber: 25,
    ticket: 'B-025',
    patientName: 'Lina Prum',
    nameKhmer: 'លីណា ព្រំ',
    arrivedLabel: '08:20',
    waitMinutes: 47,
    arrivalClass: 'appointment',
    appointmentLabel: '09:15',
    appointmentMinutesAway: 8,
    call: { state: 'waiting' },
    stage: 'identity-resolved',
    assurance: 'verified',
    contact: 'confirmed',
    payment: 'collected',
  },
  {
    // Longest wait in the room, but no booking and no urgency.
    id: 'v-4',
    queueNumber: 24,
    ticket: 'W-024',
    patientName: 'Vibol Keo',
    arrivedLabel: '08:05',
    waitMinutes: 62,
    arrivalClass: 'walk-in',
    call: { state: 'waiting' },
    stage: 'identity-resolved',
    assurance: 'verified',
    contact: 'unconfirmed',
    payment: 'waiting',
  },
  {
    // Called and did not answer: rejoins behind its band, with the reason.
    id: 'v-skipped',
    queueNumber: 26,
    ticket: 'W-026',
    patientName: 'Sreyneang Ouk',
    nameKhmer: 'ស្រីនាង អ៊ុក',
    arrivedLabel: '08:34',
    waitMinutes: 33,
    arrivalClass: 'walk-in',
    recalls: 1,
    call: { state: 'skipped', atLabel: '09:01', reason: 'no-answer' },
    stage: 'identity-resolved',
    assurance: 'verified',
    contact: 'confirmed',
    payment: 'collected',
  },
  {
    // Booked for later this morning: waits with everyone who is here now.
    id: 'v-early',
    queueNumber: 30,
    ticket: 'B-030',
    patientName: 'Chanthou Meng',
    arrivedLabel: '09:04',
    waitMinutes: 3,
    arrivalClass: 'appointment',
    appointmentLabel: '11:00',
    appointmentMinutesAway: 113,
    call: { state: 'waiting' },
    stage: 'identity-resolved',
    assurance: 'verified',
    contact: 'confirmed',
    payment: 'collected',
  },
  {
    id: 'v-5',
    queueNumber: 21,
    ticket: 'W-021',
    patientName: 'Dara Phan',
    arrivedLabel: '07:45',
    waitMinutes: 82,
    arrivalClass: 'walk-in',
    call: { state: 'serving', deskLabel: 'Bay 1' },
    stage: 'draw-complete',
    assurance: 'verified',
    contact: 'confirmed',
    payment: 'collected',
  },
  {
    id: 'v-6',
    queueNumber: 19,
    ticket: 'B-019',
    patientName: 'Sokha Chan',
    nameKhmer: 'សុខា ចាន់',
    arrivedLabel: '07:30',
    waitMinutes: 96,
    arrivalClass: 'appointment',
    appointmentLabel: '07:45',
    appointmentMinutesAway: -111,
    call: { state: 'serving', deskLabel: 'Bay 1' },
    stage: 'completed',
    assurance: 'verified',
    contact: 'confirmed',
    payment: 'collected',
  },
];

/** The same room with a draw underway — the waiting room's now-serving state. */
export const DESK_VISITS_SERVING: DeskVisit[] = DESK_VISITS.map((visit) =>
  visit.id === 'v-stat'
    ? { ...visit, call: { state: 'serving', deskLabel: 'Bay 2' }, stage: 'in-draw' }
    : visit,
);

/** One patient called and walking up; the desk cannot call a second. */
export const DESK_VISITS_CALLED: DeskVisit[] = DESK_VISITS.map((visit) =>
  visit.id === 'v-stat'
    ? { ...visit, call: { state: 'called', atLabel: '09:06', deskLabel: 'Bay 2' } }
    : visit,
);

export const DESK_VISITS_LONG_WAIT: DeskVisit[] = DESK_VISITS.map((visit, index) =>
  index < 3 ? { ...visit, waitMinutes: visit.waitMinutes + 58 } : visit,
);

export type FrontDeskQueueDemoVariant =
  | 'queue-default'
  | 'queue-long-wait'
  | 'queue-called'
  | 'queue-serving'
  | 'queue-empty'
  | 'queue-loading'
  | 'queue-error'
  | 'queue-offline'
  | 'queue-stale';

type FrontDeskQueueDemoScenario = {
  visits: DeskVisit[];
  state?: DeskQueueState;
  asOf?: string;
};

/** Canonical Desk Queue story states shared with the prototype app. */
export const FRONT_DESK_QUEUE_DEMO_SCENARIOS: Record<
  FrontDeskQueueDemoVariant,
  FrontDeskQueueDemoScenario
> = {
  'queue-default': { visits: DESK_VISITS },
  'queue-long-wait': { visits: DESK_VISITS_LONG_WAIT },
  'queue-called': { visits: DESK_VISITS_CALLED },
  'queue-serving': { visits: DESK_VISITS_SERVING },
  'queue-empty': { visits: [] },
  'queue-loading': { visits: [], state: 'loading' },
  'queue-error': { visits: [], state: 'error' },
  'queue-offline': { visits: DESK_VISITS, state: 'offline', asOf: '09:12' },
  'queue-stale': { visits: DESK_VISITS, state: 'stale', asOf: '09:12' },
};

export type FrontDeskCheckInDemoVariant =
  | 'check-in-walk-in'
  | 'check-in-planned';

function plannedVisitPatient(): FrontDeskPatient {
  const record = IDENTITY_REGISTRY[0];
  if (!record) return blankWalkIn('planned-visit', 27);

  return {
    ...blankWalkIn('planned-visit', 27),
    ...resolvedRecordPatch(record),
    arrivedLabel: '09:30',
    boundBookingCode: record.bookings?.[0]?.code ?? null,
  };
}

/** Canonical check-in entry states shared with the prototype app. */
export const FRONT_DESK_CHECK_IN_DEMO_SCENARIOS = {
  'check-in-walk-in': { patient: blankWalkIn('walk-in-demo', 27) },
  'check-in-planned': { patient: plannedVisitPatient() },
} satisfies Record<
  FrontDeskCheckInDemoVariant,
  { patient: FrontDeskPatient }
>;

const DEMO_RECEIPT_ITEMS: CartItem[] = [
  {
    id: 'hba1c',
    kind: 'lab',
    name: 'HbA1c',
    priceMinor: '900',
    currencyCode: 'USD',
    qty: 1,
  },
  {
    id: 'lipid',
    kind: 'lab',
    name: 'Lipid panel',
    priceMinor: '1200',
    currencyCode: 'USD',
    qty: 1,
  },
];

const DEMO_RECEIPT_PAYMENT: CartPayment = {
  status: 'confirmed',
  method: 'cash',
  tendered: '25',
  changeMinor: '400',
  receiptId: 'R-58213',
  confirmedAt: '09:42',
  amountMinor: '2100',
  cashier: DEMO_CASHIER,
};

export type FrontDeskPaymentDemoVariant =
  | 'payment-paid'
  | 'payment-supplemental'
  | 'payment-voided';

type FrontDeskPaymentDemoScenario = {
  patientName: string;
  items: CartItem[];
  payment: CartPayment;
  branchLabel: string;
  voided?: boolean;
};

/** Canonical receipt evidence states shared with the prototype app. */
export const FRONT_DESK_PAYMENT_DEMO_SCENARIOS = {
  'payment-paid': {
    patientName: 'Dara Phan',
    items: DEMO_RECEIPT_ITEMS,
    payment: DEMO_RECEIPT_PAYMENT,
    branchLabel: 'Branch BKK1',
  },
  'payment-supplemental': {
    patientName: 'Dara Phan',
    items: [
      ...DEMO_RECEIPT_ITEMS,
      {
        id: 'cbc',
        kind: 'lab',
        name: 'CBC',
        priceMinor: '600',
        currencyCode: 'USD',
        qty: 1,
      },
    ],
    payment: {
      ...DEMO_RECEIPT_PAYMENT,
      receiptId: 'R-58214',
      supplementalDue: true,
      previousReceiptId: 'R-58213',
      previousPaidAmountMinor: '2100',
      amountMinor: '600',
    },
    branchLabel: 'Branch BKK1',
  },
  'payment-voided': {
    patientName: 'Dara Phan',
    items: DEMO_RECEIPT_ITEMS,
    payment: DEMO_RECEIPT_PAYMENT,
    branchLabel: 'Branch BKK1',
    voided: true,
  },
} satisfies Record<FrontDeskPaymentDemoVariant, FrontDeskPaymentDemoScenario>;
