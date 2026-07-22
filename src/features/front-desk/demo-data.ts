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
      booking('GW87430', 'scheduled', 'Today, 09:45', 'HbA1c, TSH', {
        locationLabel: 'PSC BKK1',
        providerLabel: 'Dr. Lim Cabinet',
        branchId: DEMO_BRANCH_ID,
        creatorLabel: 'Reception · Sothea',
        payment: { state: 'paid', amountMinor: '1850' },
      }),
      booking('GW87431', 'issued', 'Today, 10:30', 'Lipid panel', {
        branchId: DEMO_BRANCH_ID,
        creatorLabel: 'Patient self-booked',
        payment: { state: 'pending', amountMinor: '1200' },
      }),
      // Blocked lifecycle branches — every canonical non-redeemable state.
      booking('GW87510', 'expired', 'Issued 9 days ago', 'CBC', { branchId: DEMO_BRANCH_ID }),
      booking('GW87511', 'redeemed', 'Today, 08:05', 'Glucose', { branchId: DEMO_BRANCH_ID }),
      booking('GW87512', 'cancelled', 'Yesterday, 16:20', 'TSH', { branchId: DEMO_BRANCH_ID }),
      booking('GW87513', 'scheduled', 'Today, 11:00', 'Vitamin D', {
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
      booking('GW87440', 'scheduled', 'Today, 09:15', 'CBC, Lipid', { branchId: DEMO_BRANCH_ID }),
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
      booking('GW87441', 'scheduled', 'Today, 09:30', 'Vaccines · MMR', { branchId: DEMO_BRANCH_ID }),
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

export const DEMO_BOOKING_QR_PAYLOAD = 'kura://booking/GW87430';

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
    patientName: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    arrivedLabel: '08:55',
    waitMinutes: 12,
    stage: 'arrived',
    assurance: 'verified',
    payment: 'pending',
    resumeStep: 4,
  },
  {
    id: 'v-2',
    queueNumber: 28,
    patientName: 'Chenda Sreymom',
    nameKhmer: 'ចិន្តា ស្រីមុំ',
    arrivedLabel: '08:40',
    waitMinutes: 27,
    stage: 'arrived',
    assurance: 'unverified',
    payment: 'deferred',
    resumeStep: 2,
  },
  {
    id: 'v-3',
    queueNumber: 25,
    patientName: 'Lina Prum',
    nameKhmer: 'លីណា ព្រំ',
    arrivedLabel: '08:20',
    waitMinutes: 47,
    stage: 'identity-resolved',
    assurance: 'verified',
    payment: 'collected',
  },
  {
    id: 'v-4',
    queueNumber: 24,
    patientName: 'Vibol Keo',
    arrivedLabel: '08:05',
    waitMinutes: 62,
    stage: 'identity-resolved',
    assurance: 'verified',
    payment: 'waiting',
    queuedForDraw: true,
  },
  {
    id: 'v-5',
    queueNumber: 21,
    patientName: 'Dara Phan',
    arrivedLabel: '07:45',
    waitMinutes: 82,
    stage: 'draw-complete',
    assurance: 'verified',
    payment: 'collected',
    queuedForDraw: true,
  },
  {
    id: 'v-6',
    queueNumber: 19,
    patientName: 'Sokha Chan',
    nameKhmer: 'សុខា ចាន់',
    arrivedLabel: '07:30',
    waitMinutes: 96,
    stage: 'completed',
    assurance: 'verified',
    payment: 'collected',
    queuedForDraw: true,
  },
];

export const DESK_VISITS_LONG_WAIT: DeskVisit[] = DESK_VISITS.map((visit, index) =>
  index < 3 ? { ...visit, waitMinutes: visit.waitMinutes + 58 } : visit,
);

export type FrontDeskQueueDemoVariant =
  | 'queue-default'
  | 'queue-long-wait'
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
