import type { TubeSpec } from './types';

/** CLSI order-of-draw tube catalog, carried over verbatim from the validated prototype. */
export const TUBE_CATALOG: TubeSpec[] = [
  {
    key: 'yellow-sps',
    order: 1,
    stopperLabel: 'Yellow (SPS)',
    additive: 'Sodium polyanethol sulfonate',
    short: 'SPS',
    inversions: 8,
    timeLimitMin: null,
    handling: ['Draw first — sterile blood cultures', 'Do not refrigerate before incubation'],
    color: 'var(--warn-200)',
    stripeColor: 'var(--warn-600)',
  },
  {
    key: 'light-blue',
    order: 2,
    stopperLabel: 'Light Blue',
    additive: 'Sodium citrate (3.2%)',
    short: 'Citrate',
    inversions: 4,
    timeLimitMin: 30,
    handling: ['Fill to the line — ratio critical', 'Process within 30 minutes'],
    color: 'var(--info-100)',
    stripeColor: 'var(--info-600)',
  },
  {
    key: 'red',
    order: 3,
    stopperLabel: 'Red',
    additive: 'None / clot activator',
    short: 'Plain',
    inversions: 5,
    timeLimitMin: null,
    handling: ['Allow full clot before spin'],
    color: 'var(--danger-100)',
    stripeColor: 'var(--danger-600)',
  },
  {
    key: 'gold-sst',
    order: 4,
    stopperLabel: 'Gold / SST',
    additive: 'Clot activator + gel',
    short: 'SST',
    inversions: 5,
    timeLimitMin: 30,
    handling: ['Clot upright 30 min', 'Spin within 2 hours'],
    color: 'var(--warn-100)',
    stripeColor: 'var(--warn-500)',
  },
  {
    key: 'green',
    order: 5,
    stopperLabel: 'Green',
    additive: 'Lithium heparin ± gel',
    short: 'LiHep',
    inversions: 8,
    timeLimitMin: 30,
    handling: ['Invert immediately', 'Keep at room temperature'],
    color: 'var(--success-100)',
    stripeColor: 'var(--success-600)',
  },
  {
    key: 'gray-green',
    order: 6,
    stopperLabel: 'Gray-Green',
    additive: 'Sodium heparin',
    short: 'NaHep',
    inversions: 8,
    timeLimitMin: 30,
    handling: ['Trace-element panels only'],
    color: 'var(--success-50)',
    stripeColor: 'var(--success-700)',
  },
  {
    key: 'lavender',
    order: 7,
    stopperLabel: 'Lavender',
    additive: 'K₂ EDTA / K₃ EDTA',
    short: 'EDTA',
    inversions: 8,
    timeLimitMin: null,
    handling: ['Invert gently — hemolysis risk', 'Do not shake'],
    color: 'var(--purple-50)',
    stripeColor: 'var(--purple-500)',
  },
  {
    key: 'pink',
    order: 8,
    stopperLabel: 'Pink',
    additive: 'K₂ EDTA',
    short: 'EDTA-Pink',
    inversions: 8,
    timeLimitMin: null,
    handling: ['Blood bank — label at the chair, verify identity twice'],
    color: 'var(--danger-25)',
    stripeColor: 'var(--danger-400)',
  },
  {
    key: 'white',
    order: 9,
    stopperLabel: 'White / Pearl',
    additive: 'K₂ EDTA + gel',
    short: 'PCR',
    inversions: 8,
    timeLimitMin: null,
    handling: ['Molecular tests — avoid contamination'],
    color: 'var(--ink-50)',
    stripeColor: 'var(--ink-400)',
  },
  {
    key: 'dark-gray',
    order: 10,
    stopperLabel: 'Dark Gray',
    additive: 'Sodium fluoride / K oxalate',
    short: 'NaF',
    inversions: 8,
    timeLimitMin: 30,
    handling: ['Glucose stabilizer — draw last'],
    color: 'var(--ink-150)',
    stripeColor: 'var(--ink-600)',
  },
];

export function tubeByKey(key: string): TubeSpec | undefined {
  return TUBE_CATALOG.find((tube) => tube.key === key);
}

export const ARM_SITES = ['Antecubital fossa', 'Forearm', 'Dorsal hand', 'Other'] as const;

export const DEFER_REASONS = [
  'Patient refused',
  'Difficult vein',
  'Insufficient volume',
  'Revisit later',
  'Other',
] as const;

export const SAFETY_CHECK_ITEMS = [
  { id: 'id', label: 'Patient ID confirmed' },
  { id: 'fasting', label: 'Fasting status checked' },
  { id: 'allergy', label: 'Allergies reviewed' },
  { id: 'consent', label: 'Patient consented' },
  { id: 'site', label: 'Site confirmed (L/R arm)' },
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
