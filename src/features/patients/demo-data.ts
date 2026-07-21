/**
 * Deterministic patients fixtures. Shapes mirror the ListWorkspacePatients
 * wire contract exactly; masking follows the platform rules (phone keeps
 * `+XX` and the last four digits, MRN keeps the last two digits of the
 * provisional code). Order is the server order: most recently active in
 * this workspace first. Nothing here reads the clock.
 *
 * The triage map is the target-contract layer only: it exists for the
 * patients that genuinely have an actionable reason, and its absence is a
 * valid, honest state.
 */

import type {
  DiagnosisContext,
  MedicationSuggestion,
  PatientOrder,
  PatientSummary,
  PatientTriageMap,
  PrescribeMedication,
  ResultsProgress,
  SettledMedication,
} from './types';

export const DEMO_PATIENTS: readonly PatientSummary[] = [
  {
    userId: 'p-sok-nimol',
    displayName: 'Sok Nimol',
    sexAtBirth: 'F',
    age: 52,
    hasAge: true,
    mrnMasked: '··33',
    phoneMasked: '+85*****4778',
    assurance: 'verified',
    status: '',
  },
  {
    userId: 'p-dara-pich',
    displayName: 'Dara Pich',
    sexAtBirth: 'M',
    age: 61,
    hasAge: true,
    mrnMasked: '··87',
    phoneMasked: '+85*****2218',
    assurance: 'verified',
    status: '',
  },
  {
    userId: 'p-lina-prum',
    displayName: 'Lina Prum',
    sexAtBirth: 'F',
    age: 29,
    hasAge: true,
    mrnMasked: '··61',
    phoneMasked: '+85*****9034',
    assurance: 'unverified',
    status: '',
  },
  {
    userId: 'p-baby-prum',
    displayName: 'Baby Prum',
    sexAtBirth: 'Unknown',
    age: 0,
    hasAge: false,
    mrnMasked: '··62',
    phoneMasked: '',
    assurance: 'unverified',
    status: '',
  },
  {
    userId: 'p-vichea-nuon',
    displayName: 'Vichea Nuon',
    sexAtBirth: 'M',
    age: 47,
    hasAge: true,
    mrnMasked: '',
    phoneMasked: '+85*****1187',
    assurance: 'verified',
    status: '',
  },
  {
    userId: 'p-sokha-chann',
    displayName: 'Sokha Chann',
    sexAtBirth: 'F',
    age: 36,
    hasAge: true,
    mrnMasked: '··29',
    phoneMasked: '+85*****7752',
    assurance: 'verified',
    status: '',
  },
  {
    userId: 'p-monika-khim',
    displayName: 'Monika Khim',
    sexAtBirth: 'F',
    age: 44,
    hasAge: true,
    mrnMasked: '··18',
    phoneMasked: '',
    assurance: 'unverified',
    status: '',
  },
  {
    userId: 'p-chan-thoeun',
    displayName: 'Chan Thoeun',
    sexAtBirth: 'M',
    age: 78,
    hasAge: true,
    mrnMasked: '··05',
    phoneMasked: '+85*****6640',
    assurance: 'verified',
    status: 'deceased',
  },
  {
    userId: 'p-malis-keo',
    displayName: 'Malis Keo',
    sexAtBirth: 'F',
    age: 41,
    hasAge: true,
    mrnMasked: '··77',
    phoneMasked: '+85*****3391',
    assurance: 'verified',
    status: 'merged',
  },
  {
    userId: 'p-shredded',
    displayName: '',
    sexAtBirth: 'F',
    age: 63,
    hasAge: true,
    mrnMasked: '··90',
    phoneMasked: '',
    assurance: 'verified',
    status: '',
    shredded: true,
  },
  {
    userId: 'p-kosal-mao',
    displayName: 'Kosal Mao',
    sexAtBirth: 'M',
    age: 55,
    hasAge: true,
    mrnMasked: '··48',
    phoneMasked: '+85*****8823',
    assurance: 'verified',
    status: '',
  },
  {
    userId: 'p-sothea-ouk',
    displayName: 'Sothea Ouk',
    sexAtBirth: 'M',
    age: 33,
    hasAge: true,
    mrnMasked: '··56',
    phoneMasked: '+85*****4407',
    assurance: 'unverified',
    status: '',
  },
  {
    userId: 'p-sopanha-chum',
    displayName: 'Sopanha Chum',
    sexAtBirth: 'F',
    age: 26,
    hasAge: true,
    mrnMasked: '··71',
    phoneMasked: '+85*****5519',
    assurance: 'verified',
    status: '',
  },
  {
    userId: 'p-sokly-pen',
    displayName: 'Sokly Pen',
    sexAtBirth: 'F',
    age: 68,
    hasAge: true,
    mrnMasked: '··12',
    phoneMasked: '+85*****0286',
    assurance: 'verified',
    status: '',
  },
];

/** TARGET CONTRACT — "why now" signals for the patients that have one. */
export const DEMO_TRIAGE: PatientTriageMap = {
  'p-sok-nimol': { label: 'Results to review', tone: 'danger' },
  'p-dara-pich': { label: 'Critical value unacknowledged', tone: 'danger' },
  'p-lina-prum': { label: 'Identity check at PSC pending', tone: 'warning' },
  'p-sokha-chann': { label: 'Follow-up overdue', tone: 'warning' },
  'p-sokly-pen': { label: 'Screening due', tone: 'info' },
};

/** Orders as GET /clinic/reception/patient/:userId/orders returns them. */
export const DEMO_ORDERS: readonly PatientOrder[] = [
  {
    ordId: 'ord-2001',
    code: 'AB12345',
    placedAtLabel: 'Placed 18 Jul 2026',
    status: 'partially_complete',
    needsAttention: true,
    lineItems: [
      { code: 'CRE', displayName: 'Creatinine' },
      { code: 'UACR', displayName: 'Urine albumin to creatinine ratio' },
      { code: 'HBA1C', displayName: 'HbA1c' },
    ],
  },
  {
    ordId: 'ord-1954',
    code: 'AB11908',
    placedAtLabel: 'Placed 02 Jun 2026',
    status: 'completed',
    lineItems: [
      { code: 'LIPID', displayName: 'Lipid panel' },
      { code: 'CBC', displayName: 'Complete blood count' },
    ],
  },
  {
    ordId: 'ord-1720',
    code: 'AB10221',
    placedAtLabel: 'Placed 11 Mar 2026',
    status: 'cancelled',
    lineItems: [{ code: 'TSH', displayName: 'Thyroid stimulating hormone' }],
  },
];

/* TARGET CONTRACT — prescribe-review fixture (mirrors the legacy FINAL DCM
 * prescribe rail and Figma node 1640:119768; no prescription model exists). */

export const DEMO_DIAGNOSES: readonly DiagnosisContext[] = [
  {
    code: 'E11.65',
    label: 'Type 2 diabetes mellitus with hyperglycemia',
    evidence: 'HbA1c 8.9% · not repeated',
  },
  {
    code: 'N18.5',
    label: 'Chronic kidney disease, stage 5',
    evidence: 'eGFR 11 · albuminuria',
  },
];

export const DEMO_NEEDS_REVIEW: readonly PrescribeMedication[] = [
  {
    id: 'med-metformin',
    drug: 'Metformin',
    dose: '1 g',
    frequency: 'twice daily',
    risk: 'eGFR 11. Contraindicated in advanced kidney disease. Consider stopping.',
    doseOptions: ['250 mg', '500 mg', '1 g'],
    frequencyOptions: ['once daily', 'twice daily'],
  },
  {
    id: 'med-lisinopril',
    drug: 'Lisinopril',
    dose: '10 mg',
    frequency: 'once daily',
    risk: 'Potassium 5.2 and falling eGFR. Recheck before continuing the current dose.',
    doseOptions: ['5 mg', '10 mg', '20 mg'],
    frequencyOptions: ['once daily'],
  },
];

export const DEMO_SUGGESTIONS: readonly MedicationSuggestion[] = [
  {
    id: 'sug-calcium-acetate',
    drug: 'Calcium acetate',
    dose: '667 mg capsule',
    reason: 'High phosphate. Lowers phosphate.',
  },
  {
    id: 'sug-epoetin',
    drug: 'Epoetin alfa',
    dose: '4000 IU injection',
    reason: 'Haemoglobin 9.6. Treats renal anaemia.',
  },
  {
    id: 'sug-szc',
    drug: 'Sodium zirconium',
    dose: '5 g sachet',
    reason: 'Potassium 5.2. Binds potassium.',
  },
];

export const DEMO_SETTLED: readonly SettledMedication[] = [
  {
    id: 'set-allopurinol',
    drug: 'Allopurinol',
    dose: '100 mg',
    frequency: 'once daily',
    status: 'active',
  },
  {
    id: 'set-losartan',
    drug: 'Losartan',
    dose: '25 mg',
    frequency: 'once daily',
    status: 'paused',
  },
];

export const DEMO_SEARCH_POOL: readonly MedicationSuggestion[] = [
  { id: 'srch-amlodipine', drug: 'Amlodipine', dose: '5 mg tablet', reason: '' },
  { id: 'srch-atorvastatin', drug: 'Atorvastatin', dose: '20 mg tablet', reason: '' },
  { id: 'srch-empagliflozin', drug: 'Empagliflozin', dose: '10 mg tablet', reason: '' },
  { id: 'srch-furosemide', drug: 'Furosemide', dose: '40 mg tablet', reason: '' },
  { id: 'srch-bisoprolol', drug: 'Bisoprolol', dose: '2.5 mg tablet', reason: '' },
  { id: 'srch-levothyroxine', drug: 'Levothyroxine', dose: '50 mcg tablet', reason: '' },
];

/** TARGET CONTRACT — a partial-release episode mid-arrival. */
export const DEMO_RESULTS_PROGRESS: ResultsProgress = {
  resulted: 16,
  total: 30,
  flagged: 5,
  arrivalNote: 'Chemistry lands about 4:30 PM. HbA1c tomorrow 9:00 AM.',
};

/** A patient whose name pushes wrapping: long Khmer-Latin compound name. */
export const LONG_NAME_PATIENT: PatientSummary = {
  userId: 'p-long-name',
  displayName: 'Neang Kanhchana Sovannmealea Chantrea Bopha',
  sexAtBirth: 'F',
  age: 39,
  hasAge: true,
  mrnMasked: '··84',
  phoneMasked: '+85*****7345',
  assurance: 'verified',
  status: '',
};
