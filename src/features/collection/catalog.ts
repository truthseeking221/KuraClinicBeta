import type { AttemptOutcome, OutcomeOwner, SampleIssueReason, TubeSpec } from './types';

/**
 * CLSI order-of-draw tube catalog.
 *
 * `minimumClotMinutes` and `processWithinMinutes` are two different clocks and
 * are kept apart: a gold SST must stand 30 minutes before it may be spun, and
 * must reach processing within 2 hours. Collapsing them into one limit made a
 * tube that had just become ready read as overdue.
 *
 * These values stand in for a versioned SOP catalog with an owner. They are
 * clinic policy, not backend truth.
 */
export const TUBE_CATALOG: TubeSpec[] = [
  {
    key: 'yellow-sps',
    order: 1,
    stopperLabel: 'Yellow (SPS)',
    additive: 'Sodium polyanethol sulfonate',
    short: 'SPS',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: null,
    handling: ['Draw first — sterile blood cultures', 'Do not refrigerate before incubation'],
    color: 'var(--color-specimen-yellow-sps)',
    stripeColor: 'var(--color-specimen-yellow-sps-stripe)',
  },
  {
    key: 'light-blue',
    order: 2,
    stopperLabel: 'Light Blue',
    additive: 'Sodium citrate (3.2%)',
    short: 'Citrate',
    inversions: 4,
    minimumClotMinutes: null,
    processWithinMinutes: 30,
    handling: ['Fill to the line — ratio critical', 'Process within 30 minutes'],
    color: 'var(--color-specimen-light-blue)',
    stripeColor: 'var(--color-specimen-light-blue-stripe)',
  },
  {
    key: 'red',
    order: 3,
    stopperLabel: 'Red',
    additive: 'None / clot activator',
    short: 'Plain',
    inversions: 5,
    minimumClotMinutes: 30,
    processWithinMinutes: 120,
    handling: ['Stand upright — full clot before spin'],
    color: 'var(--color-specimen-red)',
    stripeColor: 'var(--color-specimen-red-stripe)',
  },
  {
    key: 'gold-sst',
    order: 4,
    stopperLabel: 'Gold / SST',
    additive: 'Clot activator + gel',
    short: 'SST',
    inversions: 5,
    minimumClotMinutes: 30,
    processWithinMinutes: 120,
    handling: ['Clot upright 30 min', 'Spin within 2 hours'],
    color: 'var(--color-specimen-gold)',
    stripeColor: 'var(--color-specimen-gold-stripe)',
  },
  {
    key: 'green',
    order: 5,
    stopperLabel: 'Green',
    additive: 'Lithium heparin ± gel',
    short: 'LiHep',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: 120,
    handling: ['Invert immediately', 'Keep at room temperature'],
    color: 'var(--color-specimen-green)',
    stripeColor: 'var(--color-specimen-green-stripe)',
  },
  {
    key: 'gray-green',
    order: 6,
    stopperLabel: 'Gray-Green',
    additive: 'Sodium heparin',
    short: 'NaHep',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: 120,
    handling: ['Trace-element panels only'],
    color: 'var(--color-specimen-gray-green)',
    stripeColor: 'var(--color-specimen-gray-green-stripe)',
  },
  {
    key: 'lavender',
    order: 7,
    stopperLabel: 'Lavender',
    additive: 'K₂ EDTA / K₃ EDTA',
    short: 'EDTA',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: 240,
    handling: ['Invert gently — hemolysis risk', 'Do not shake'],
    color: 'var(--color-specimen-lavender)',
    stripeColor: 'var(--color-specimen-lavender-stripe)',
  },
  {
    key: 'pink',
    order: 8,
    stopperLabel: 'Pink',
    additive: 'K₂ EDTA',
    short: 'EDTA-Pink',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: 240,
    handling: ['Blood bank — label at the chair, verify identity twice'],
    color: 'var(--color-specimen-pink)',
    stripeColor: 'var(--color-specimen-pink-stripe)',
  },
  {
    key: 'white',
    order: 9,
    stopperLabel: 'White / Pearl',
    additive: 'K₂ EDTA + gel',
    short: 'PCR',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: 240,
    handling: ['Molecular tests — avoid contamination'],
    color: 'var(--color-specimen-white)',
    stripeColor: 'var(--color-specimen-white-stripe)',
  },
  {
    key: 'dark-gray',
    order: 10,
    stopperLabel: 'Dark Gray',
    additive: 'Sodium fluoride / K oxalate',
    short: 'NaF',
    inversions: 8,
    minimumClotMinutes: null,
    processWithinMinutes: 30,
    handling: ['Glucose stabilizer — draw last'],
    color: 'var(--color-specimen-dark-gray)',
    stripeColor: 'var(--color-specimen-dark-gray-stripe)',
  },
];

export function tubeByKey(key: string): TubeSpec | undefined {
  return TUBE_CATALOG.find((tube) => tube.key === key);
}

export const ARM_SITES = ['Antecubital fossa', 'Forearm', 'Dorsal hand', 'Other'] as const;

/**
 * Why a plan item did not become a sample, with who owns the next step. A
 * "deferred" tube used to be a sample status; it never was one — the sample
 * does not exist, so the outcome belongs to the attempt.
 */
export const ATTEMPT_OUTCOMES: ReadonlyArray<{
  id: AttemptOutcome;
  label: string;
  owner: OutcomeOwner;
  nextAction: string;
}> = [
  {
    id: 'failed_access',
    label: 'Could not access a vein',
    owner: 'collector',
    nextAction: 'Second collector attempts, or book a new visit.',
  },
  {
    id: 'insufficient_volume',
    label: 'Not enough blood drawn',
    owner: 'collector',
    nextAction: 'Redraw this tube; the short tube is discarded, not sent.',
  },
  {
    id: 'patient_refused',
    label: 'Patient refused this tube',
    owner: 'ordering_doctor',
    nextAction: 'Doctor decides whether the test is cancelled or rebooked.',
  },
  {
    id: 'not_fasted',
    label: 'Patient not fasted',
    owner: 'front_desk',
    nextAction: 'Front desk rebooks a fasting appointment.',
  },
  {
    id: 'adverse_event',
    label: 'Adverse event during draw',
    owner: 'collector',
    nextAction: 'Stop the draw, record the event, escalate to the supervisor.',
  },
  {
    id: 'waived',
    label: 'Waived by an authorised actor',
    owner: 'ordering_doctor',
    nextAction: 'Recorded as waived; the test is not collected on this visit.',
  },
];

export function attemptOutcomeByIdOrNull(id: string) {
  return ATTEMPT_OUTCOMES.find((outcome) => outcome.id === id) ?? null;
}

export const OUTCOME_OWNER_LABEL: Record<OutcomeOwner, string> = {
  collector: 'Collector',
  front_desk: 'Front desk',
  ordering_doctor: 'Ordering doctor',
  patient: 'Patient',
};

/** Structured rejection reasons for a tube that already exists. */
export const SAMPLE_ISSUE_REASONS: ReadonlyArray<{ id: SampleIssueReason; label: string }> = [
  { id: 'hemolysed', label: 'Hemolysed' },
  { id: 'underfilled', label: 'Underfilled' },
  { id: 'wrong_tube', label: 'Wrong tube type' },
  { id: 'label_unreadable', label: 'Label unreadable' },
  { id: 'broken_in_transit', label: 'Broken or leaking' },
];

export const MANUAL_LABEL_REASONS = [
  'Printer offline',
  'Printer out of labels',
  'No printer at this draw point',
] as const;

/**
 * Prep facts the collector confirms. Positive identification is not on this
 * list: it is an identity event with its own evidence, not a checkbox. Consent
 * is not on it either — PH-14 defers phlebotomy consent capture, so a required
 * tick here would record a fact the platform does not hold.
 */
export const PRE_DRAW_CHECK_ITEMS = [
  { id: 'fasting', label: 'Fasting status matches the order' },
  { id: 'allergy', label: 'Allergies and reactions reviewed' },
] as const;

/** Out-of-range bounds [low, high] — a warning, never a blocker. */
export const VITAL_RANGES: Record<string, [number, number]> = {
  heightCm: [50, 250],
  weightKg: [1, 300],
  hr: [30, 250],
  bpSys: [80, 200],
  bpDia: [40, 130],
  tempC: [34, 42],
  spo2: [85, 100],
  breathing: [8, 35],
};

export const FASTING_OPTIONS = [
  { id: 'not-fasting', label: 'Not fasting' },
  { id: '<8h', label: 'Fasting < 8h' },
  { id: '8-12h', label: 'Fasting 8–12h' },
  { id: '≥12h', label: 'Fasting ≥ 12h' },
] as const;

export const PAIN_FACES: Array<{ at: number; face: string; label: string }> = [
  { at: 0, face: '😊', label: 'No pain' },
  { at: 2, face: '🙂', label: 'Mild' },
  { at: 5, face: '😐', label: 'Moderate' },
  { at: 7, face: '😣', label: 'Severe' },
  { at: 10, face: '😭', label: 'Worst' },
];

export const PID_PATTERN = /^P\d{4,8}$/i;
