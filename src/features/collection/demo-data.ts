import { applyRegistration, emptyDraft, queueForRole } from './logic';
import type {
  CollectionDraft,
  CollectionPatient,
  LabelPrintResult,
  RegisterDrawResult,
} from './types';

/**
 * Deterministic demo queue. Times are fixed strings and waiting minutes are
 * static — stories pass an explicit `now` where clocks matter.
 *
 * Patients carry an expected specimen plan, never pre-made tubes: no sample id
 * exists in this file, because no sample exists before a draw is registered.
 */
export const DEMO_NOW = new Date('2026-07-16T09:30:00+07:00').getTime();

export const DEMO_OPERATOR = 'Srey Neang';

export const DEMO_QUEUE: CollectionPatient[] = [
  {
    id: 'p-001',
    pid: 'P104481',
    name: 'Sokha Chan',
    initials: 'SC',
    sex: 'F',
    dob: '1992-03-14',
    orderId: '#4521',
    checkInAt: '08:41',
    waitingMinutes: 49,
    stat: false,
    appointmentAt: '09:00',
    journey: { identity: 'done', vitals: 'done', phlebo: 'pending' },
    fasting: 'Fasting ≥ 12h',
    allergies: ['Latex'],
    gates: {
      bookingRedeemed: true,
      orderPlaced: true,
      payment: { required: true, settled: true, amountLabel: '៛ 82,000' },
    },
    vitals: {
      heightCm: '158',
      weightKg: '52',
      hr: '76',
      bpSys: '118',
      bpDia: '76',
      tempC: '36.8',
      tempUnit: 'C',
      spo2: '98',
      breathing: '14',
      painVas: 0,
      fasting: '≥12h',
      vaccinationNote: '',
    },
    plan: [
      {
        id: 'plan-4521-1',
        tube: 'lavender',
        tests: ['CBC', 'HbA1c'],
        volumeMl: 4,
        container: '4 mL K₂ EDTA',
        stat: false,
      },
      {
        id: 'plan-4521-2',
        tube: 'gold-sst',
        tests: ['Lipid panel', 'Creatinine', 'ALT', 'AST'],
        volumeMl: 5,
        container: '5 mL SST',
        stat: false,
      },
      {
        id: 'plan-4521-3',
        tube: 'light-blue',
        tests: ['PT/INR'],
        volumeMl: 2.7,
        container: '2.7 mL citrate',
        stat: true,
      },
    ],
  },
  {
    id: 'p-002',
    pid: 'P208312',
    name: 'Lina Sroeun',
    initials: 'LS',
    sex: 'F',
    dob: '1991-11-02',
    orderId: '#4522',
    checkInAt: '08:55',
    waitingMinutes: 35,
    stat: false,
    journey: { identity: 'done', vitals: 'pending', phlebo: 'waiting' },
    fasting: 'Not fasting',
    allergies: [],
    gates: {
      bookingRedeemed: true,
      orderPlaced: true,
      payment: { required: true, settled: true, amountLabel: '៛ 34,000' },
    },
    plan: [
      {
        id: 'plan-4522-1',
        tube: 'lavender',
        tests: ['CBC'],
        volumeMl: 4,
        container: '4 mL K₂ EDTA',
        stat: false,
      },
    ],
  },
  {
    id: 'p-003',
    pid: 'P309904',
    name: 'Vibol Keo',
    initials: 'VK',
    sex: 'M',
    dob: '1968-07-21',
    orderId: '#4523',
    checkInAt: '08:12',
    waitingMinutes: 78,
    stat: true,
    journey: { identity: 'done', vitals: 'done', phlebo: 'pending' },
    fasting: 'Fasting 8–12h',
    allergies: ['Penicillin'],
    gates: {
      bookingRedeemed: true,
      orderPlaced: true,
      payment: { required: true, settled: true, amountLabel: '៛ 61,000' },
    },
    vitals: {
      heightCm: '171',
      weightKg: '84',
      hr: '88',
      bpSys: '152',
      bpDia: '94',
      tempC: '36.6',
      tempUnit: 'C',
      spo2: '96',
      breathing: '16',
      painVas: 2,
      fasting: '8-12h',
      vaccinationNote: '',
    },
    plan: [
      {
        id: 'plan-4523-1',
        tube: 'gold-sst',
        tests: ['Glucose', 'HbA1c', 'Lipid panel'],
        volumeMl: 5,
        container: '5 mL SST',
        stat: true,
      },
      {
        id: 'plan-4523-2',
        tube: 'dark-gray',
        tests: ['Glucose (NaF)'],
        volumeMl: 2,
        container: '2 mL NaF',
        stat: false,
      },
    ],
  },
  {
    id: 'p-004',
    pid: 'P411220',
    name: 'Maly Sok',
    initials: 'MS',
    sex: 'F',
    dob: '2001-01-30',
    orderId: '#4524',
    checkInAt: '09:02',
    waitingMinutes: 28,
    stat: false,
    journey: { identity: 'done', vitals: 'pending', phlebo: 'waiting' },
    fasting: 'Unknown',
    allergies: [],
    // Walk-in who has not paid: PSC collection is pay before draw.
    gates: {
      bookingRedeemed: true,
      orderPlaced: true,
      payment: { required: true, settled: false, amountLabel: '៛ 45,000' },
    },
    plan: [
      {
        id: 'plan-4524-1',
        tube: 'red',
        tests: ['Serology panel'],
        volumeMl: 6,
        container: '6 mL plain',
        stat: false,
      },
    ],
  },
  {
    id: 'p-005',
    pid: 'P501773',
    name: 'Dara Phan',
    initials: 'DP',
    sex: 'M',
    dob: '1985-09-09',
    orderId: '#4525',
    checkInAt: '07:58',
    waitingMinutes: 92,
    stat: false,
    journey: { identity: 'done', vitals: 'done', phlebo: 'done' },
    fasting: 'Fasting ≥ 12h',
    allergies: [],
    gates: {
      bookingRedeemed: true,
      orderPlaced: true,
      payment: { required: true, settled: true },
    },
    plan: [
      {
        id: 'plan-4525-1',
        tube: 'lavender',
        tests: ['CBC'],
        volumeMl: 4,
        container: '4 mL K₂ EDTA',
        stat: false,
      },
    ],
  },
  {
    id: 'p-006',
    pid: 'P612004',
    name: 'Chanthou Ly',
    initials: 'CL',
    sex: 'F',
    dob: '1979-04-18',
    orderId: '#4526',
    checkInAt: '09:20',
    waitingMinutes: 10,
    stat: false,
    journey: { identity: 'done', vitals: 'done', phlebo: 'pending' },
    fasting: 'Not fasting',
    allergies: [],
    // Arrived before the front desk redeemed the booking or placed the order.
    gates: {
      bookingRedeemed: false,
      orderPlaced: false,
      payment: { required: true, settled: false },
    },
    plan: [
      {
        id: 'plan-4526-1',
        tube: 'lavender',
        tests: ['CBC'],
        volumeMl: 4,
        container: '4 mL K₂ EDTA',
        stat: false,
      },
    ],
  },
];

/**
 * Demo registration seam. A tube exists only when this returns `registered`,
 * and the identity it returns is the one the label carries.
 *
 * Verdicts are keyed off the plan item so every failure is reachable:
 * `plan-4523-2` times out on the first attempt and succeeds on the retry with
 * the same idempotency key; `plan-4526-1` is stale.
 */
export function demoRegisterDrawSample(input: {
  planItem: { id: string };
  patient: { orderId: string };
  attempt: number;
}): RegisterDrawResult {
  if (input.planItem.id === 'plan-4526-1') return { kind: 'stale' };
  if (input.planItem.id === 'plan-4523-2' && input.attempt === 1) return { kind: 'timeout' };
  const suffix = input.planItem.id.replace(/\D/g, '').slice(-5);
  return { kind: 'registered', sampleId: `S-${suffix}-${input.attempt === 1 ? '01' : '01'}` };
}

/** Demo printer. The citrate tube's label is the one that finds a dead printer. */
export function demoPrintLabel(sampleId: string): LabelPrintResult {
  return sampleId.endsWith('213') ? { kind: 'printer_offline' } : { kind: 'printed' };
}

export function demoDraft(patch: Partial<CollectionDraft> = {}): CollectionDraft {
  return { ...emptyDraft(), ...patch };
}

/** A draft that has already cleared identity and prep, for mid-flow stories. */
export function readyDraft(patch: Partial<CollectionDraft> = {}): CollectionDraft {
  return demoDraft({
    identity: { name: 'match', dob: 'match', unableToState: false },
    checks: { fasting: true, allergy: true },
    ...patch,
  });
}

/**
 * PHL-07: one tube of three registered, two still open. Built through the real
 * registration seam so a seeded draft cannot drift from a live draw.
 */
export function partialDraft(): CollectionDraft {
  const patient = DEMO_QUEUE[0];
  const planItem = patient.plan[0];
  return applyRegistration(readyDraft(), {
    planItem,
    result: demoRegisterDrawSample({ planItem, patient, attempt: 1 }),
    now: DEMO_NOW,
    drawnBy: DEMO_OPERATOR,
  });
}

export type CollectionDemoVariant =
  | 'scan-queue'
  | 'scan-empty'
  | 'worksheet-ready'
  | 'worksheet-vitals-missing'
  | 'worksheet-unpaid'
  | 'worksheet-partial';

type CollectionDemoScenario =
  | { view: 'scan'; queue: CollectionPatient[] }
  | {
      view: 'worksheet';
      queue: CollectionPatient[];
      patient: CollectionPatient;
      now: number;
      /** Seeds a mid-draw worksheet; omitted means an empty draft. */
      draft?: () => CollectionDraft;
    };

const PHLEBOTOMY_QUEUE = queueForRole(DEMO_QUEUE, 'phlebotomy');

/** Canonical collection story states shared with the prototype app. */
export const COLLECTION_DEMO_SCENARIOS = {
  'scan-queue': { view: 'scan', queue: PHLEBOTOMY_QUEUE },
  'scan-empty': { view: 'scan', queue: [] },
  'worksheet-ready': {
    view: 'worksheet',
    queue: PHLEBOTOMY_QUEUE,
    patient: DEMO_QUEUE[0],
    now: DEMO_NOW,
  },
  'worksheet-vitals-missing': {
    view: 'worksheet',
    queue: PHLEBOTOMY_QUEUE,
    patient: DEMO_QUEUE[1],
    now: DEMO_NOW,
  },
  'worksheet-unpaid': {
    view: 'worksheet',
    queue: PHLEBOTOMY_QUEUE,
    patient: DEMO_QUEUE[3],
    now: DEMO_NOW,
  },
  'worksheet-partial': {
    view: 'worksheet',
    queue: PHLEBOTOMY_QUEUE,
    patient: DEMO_QUEUE[0],
    now: DEMO_NOW,
    draft: partialDraft,
  },
  // `satisfies`, not a type annotation: an annotation widens every entry to the
  // union, so `COLLECTION_DEMO_SCENARIOS['worksheet-ready'].patient` stops
  // type-checking at the call site.
} satisfies Record<CollectionDemoVariant, CollectionDemoScenario>;
