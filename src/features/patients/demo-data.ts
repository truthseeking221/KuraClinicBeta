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

import { JOURNEY_PATIENT } from '../journey/patient';
import type { PatientAcquisitionJourneySnapshot } from '../care-loop/patient-acquisition-flow';
import type {
  PatientContextLine,
  PatientContextSection,
} from '../patient-context/patient-context-rail';

import type {
  DiagnosisContext,
  Icd10DiagnosisCandidate,
  Icd10DiagnosisEvidence,
  MedicationOption,
  MedicationSuggestion,
  PatientOrder,
  PatientChartTab,
  PatientSummary,
  PatientTriageMap,
  PatientsViewState,
  PrescribeMedication,
  ResultsProgress,
  SettledMedication,
} from './types';

export const DEMO_PATIENTS: readonly PatientSummary[] = [
  {
    userId: JOURNEY_PATIENT.userId,
    displayName: JOURNEY_PATIENT.displayName,
    sexAtBirth: JOURNEY_PATIENT.sexAtBirth,
    age: JOURNEY_PATIENT.age,
    hasAge: true,
    mrnMasked: JOURNEY_PATIENT.mrnMasked,
    phoneMasked: JOURNEY_PATIENT.phoneMasked,
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

/**
 * The seeded record a new doctor can open before booking anyone real. One id,
 * named once, so the home offer and the route it opens can never drift apart.
 */
export const DEMO_TOUR_PATIENT_ID = 'p-sokha-chann';
export const DEMO_TOUR_PATIENT_IDS = [DEMO_TOUR_PATIENT_ID] as const;

/** The one fictional record seeded into a new doctor's demo workspace. */
export const DEMO_TOUR_PATIENTS: readonly PatientSummary[] = DEMO_PATIENTS.filter(
  (patient) => patient.userId === DEMO_TOUR_PATIENT_ID,
);

/** TARGET CONTRACT — "why now" signals for the patients that have one. */
export const DEMO_TRIAGE: PatientTriageMap = {
  'p-sok-nimol': { label: 'Results to review', tone: 'danger' },
  'p-dara-pich': { label: 'Critical value unacknowledged', tone: 'danger' },
  'p-lina-prum': { label: 'Identity check at PSC pending', tone: 'warning' },
  'p-sokha-chann': { label: 'Follow-up overdue', tone: 'warning' },
  'p-sokly-pen': { label: 'Screening due', tone: 'info' },
};

/** Storybook-owned interrupted journey used to prove registry resume behavior. */
export const DEMO_RESUMABLE_PATIENT_JOURNEY: PatientAcquisitionJourneySnapshot = {
  version: 1,
  patient: {
    id: 'provisional-85512345678',
    name: 'Sokha Chann',
    sex: 'F',
    sexLabel: 'Female',
    age: 32,
    dob: '1994-02-12',
    phone: '+85512345678',
    status: 'Provisional · PSC verifies',
  },
  stage: 'ready-to-order',
  profileConfirmed: true,
  intakeRecord: {
    reasonForVisit: 'Tired for 2 weeks, wants a general checkup',
    allergies: 'No known allergies',
    medicines: 'Paracetamol sometimes · no daily medicines',
    familyHistory: 'Father has diabetes · no surgeries · no chronic illness',
  },
  labOrder: {
    orderId: 'ORD-DEMO-345678',
    stage: 'prepare-tubes',
    selectedTestIds: ['hba1c', 'fasting-glucose', 'lipid-panel', 'cbc'],
    decisions: { collectBy: 'self', payment: 'pay-now' },
    labelMethod: 'sticker',
    labelPhotoChecks: { applied: false, readable: false, photographed: false },
    capturedTubeIds: [],
    pickupRound: '',
    labelsChecked: false,
    countChecked: false,
    bagSealed: false,
  },
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

/* Legacy FINAL DCM DiagnosisReview fixture. The prototype prescribing flow
 * consumes it locally; no terminology, diagnosis, signer, or audit contract
 * exists. */
export const DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS: readonly Icd10DiagnosisCandidate[] = [
  {
    id: 'legacy-e11-65',
    code: 'E11.65',
    label: 'Type 2 diabetes mellitus with hyperglycemia',
    source: 'ai',
    reviewMeta: 'HbA1c 8.9% · not repeated',
    evidence: [{ label: 'HbA1c', value: '8.9% · 21 May 2026 · not repeated', tone: 'warning' }],
  },
  {
    id: 'legacy-i10',
    code: 'I10',
    label: 'Essential (primary) hypertension',
    source: 'ai',
    reviewMeta: 'BP 146/92 · 3 visits',
    evidence: [{ label: 'Vitals', value: 'BP 146/92 · 3 visits', tone: 'warning' }],
  },
  {
    id: 'legacy-n18-3',
    code: 'N18.3',
    label: 'Chronic kidney disease, stage 3',
    source: 'ai',
    reviewMeta: 'Creatinine 1.6 mg/dL · albuminuria 155.5 mg/g',
    evidence: [
      { label: 'Creatinine', value: '1.6 mg/dL · 21 May 2026 · above reference', tone: 'danger' },
      { label: 'Albuminuria', value: '155.5 mg/g · 21 May 2026 · A3 albuminuria', tone: 'danger' },
    ],
  },
  {
    id: 'legacy-d64-9',
    code: 'D64.9',
    label: 'Anemia, unspecified',
    source: 'ai',
    reviewMeta: 'Hb 11.0 g/dL',
    evidence: [{ label: 'Haemoglobin', value: '11.0 g/dL · 21 May 2026 · below reference', tone: 'warning' }],
  },
];

export const DEMO_LEGACY_ICD10_SEARCH_POOL: readonly Icd10DiagnosisCandidate[] = [
  ...DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
  { id: 'legacy-k76-0', code: 'K76.0', label: 'Fatty (change of) liver', source: 'clinician', reviewMeta: 'US: hepatic steatosis · mild' },
  { id: 'legacy-e66-9', code: 'E66.9', label: 'Overweight, unspecified', source: 'clinician', reviewMeta: 'BMI 28.4' },
  { id: 'legacy-h36-0', code: 'H36.0', label: 'Diabetic retinopathy', source: 'clinician', reviewMeta: 'Reports blurred vision · screening due' },
];

export const DEMO_LEGACY_ICD10_FLAGGED_LABS: readonly Icd10DiagnosisEvidence[] = [
  { label: 'HbA1c', value: '8.9%', tone: 'warning' },
  { label: 'Creatinine', value: '1.6 mg/dL', tone: 'danger' },
  { label: 'Albuminuria', value: '155.5 mg/g', tone: 'danger' },
  { label: 'Haemoglobin', value: '11.0 g/dL', tone: 'warning' },
];

export const DEMO_NEEDS_REVIEW: readonly PrescribeMedication[] = [
  {
    id: 'med-metformin',
    drug: 'Metformin',
    dose: '1 g',
    frequency: 'twice daily',
    risk:
      'eGFR 11 mL/min/1.73 m² · 21 May 2026. Contraindicated in advanced kidney disease. Consider stopping.',
    doseOptions: ['250 mg', '500 mg', '1 g'],
    frequencyOptions: ['once daily', 'twice daily'],
  },
  {
    id: 'med-lisinopril',
    drug: 'Lisinopril',
    dose: '10 mg',
    frequency: 'once daily',
    risk:
      'Potassium 5.2 mmol/L · 21 May 2026, with falling eGFR. Recheck before continuing the current dose.',
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
    evidence: 'High phosphate is recorded in the current chart context.',
    missingData: 'Interaction, formulary, and contraindication checks are not connected.',
  },
  {
    id: 'sug-epoetin',
    drug: 'Epoetin alfa',
    dose: '4000 IU injection',
    reason: 'Haemoglobin 9.6. Treats renal anaemia.',
    evidence: 'Haemoglobin 9.6 g/dL is recorded in the current chart context.',
    missingData: 'Iron status, eligibility, and monitoring checks are not connected.',
  },
  {
    id: 'sug-szc',
    drug: 'Sodium zirconium',
    dose: '5 g sachet',
    reason: 'Potassium 5.2. Binds potassium.',
    evidence: 'Potassium 5.2 mmol/L is recorded in the current chart context.',
    missingData: 'Repeat result, interaction, and formulary checks are not connected.',
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

export const DEMO_SEARCH_POOL: readonly MedicationOption[] = [
  { id: 'srch-amlodipine', drug: 'Amlodipine', dose: '5 mg tablet' },
  { id: 'srch-atorvastatin', drug: 'Atorvastatin', dose: '20 mg tablet' },
  { id: 'srch-empagliflozin', drug: 'Empagliflozin', dose: '10 mg tablet' },
  { id: 'srch-furosemide', drug: 'Furosemide', dose: '40 mg tablet' },
  { id: 'srch-bisoprolol', drug: 'Bisoprolol', dose: '2.5 mg tablet' },
  { id: 'srch-levothyroxine', drug: 'Levothyroxine', dose: '50 mcg tablet' },
];

/** TARGET CONTRACT — a partial-release episode mid-arrival. */
export const DEMO_RESULTS_PROGRESS: ResultsProgress = {
  resulted: 16,
  total: 30,
  flagged: 5,
  arrivalNote: 'Chemistry lands about 4:30 PM. HbA1c tomorrow 9:00 AM.',
};

/**
 * A record the phone gate has just created: phone verified by SMS, identity
 * provisional until PSC confirms it, and nothing scheduled. It exists to prove
 * the registry states both axes and claims no next step — creating a patient
 * is a complete outcome, not the first step of an intake or an order.
 */
export const NEW_PROVISIONAL_PATIENT: PatientSummary = {
  userId: 'p-chariya-som',
  displayName: 'Chariya Som',
  sexAtBirth: 'F',
  age: 34,
  hasAge: true,
  mrnMasked: '··93',
  phoneMasked: '+85*****6108',
  assurance: 'unverified',
  status: '',
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

/** Storybook-owned registry states consumed by the prototype route adapter. */
export type PatientsRegistryDemoScenario = {
  patients: readonly PatientSummary[];
  triage?: PatientTriageMap;
  state: PatientsViewState;
};

export const PATIENTS_REGISTRY_DEMO_SCENARIOS = {
  'registry-default': {
    patients: DEMO_PATIENTS,
    triage: DEMO_TRIAGE,
    state: 'ready' as const,
  },
  'registry-empty': {
    patients: [] as readonly PatientSummary[],
    state: 'ready' as const,
  },
  'registry-loading': {
    patients: DEMO_PATIENTS,
    state: 'loading' as const,
  },
  'registry-error': {
    patients: DEMO_PATIENTS,
    state: 'error' as const,
  },
  'registry-long': {
    patients: [LONG_NAME_PATIENT, ...DEMO_PATIENTS],
    triage: {
      'p-long-name': {
        label: 'Critical potassium result unacknowledged since yesterday evening',
        tone: 'danger',
      },
    } satisfies PatientTriageMap,
    state: 'ready' as const,
  },
} as const satisfies Record<string, PatientsRegistryDemoScenario>;

export type PatientsRegistryDemoScenarioId =
  keyof typeof PATIENTS_REGISTRY_DEMO_SCENARIOS;

/** Patient selection and tab state from the matching canonical Chart stories. */
export type PatientChartDemoScenario = {
  patientId: string;
  defaultTab?: PatientChartTab;
  emptyOrders?: boolean;
};

export const PATIENT_CHART_DEMO_SCENARIOS = {
  'chart-default': { patientId: 'p-sok-nimol' },
  'chart-unverified': { patientId: 'p-lina-prum' },
  'chart-deceased': { patientId: 'p-chan-thoeun' },
  'chart-merged': { patientId: 'p-malis-keo' },
  'chart-no-orders': {
    patientId: 'p-sok-nimol',
    defaultTab: 'orders' as const,
    emptyOrders: true,
  },
} as const satisfies Record<string, PatientChartDemoScenario>;

export type PatientChartDemoScenarioId = keyof typeof PATIENT_CHART_DEMO_SCENARIOS;

/* ── Demo tour chart ──────────────────────────────────────────
 * The chart a new doctor lands on from the first-use home offer. It exists
 * because an empty record would break the promise the offer makes: the point
 * of the tour is seeing one patient carry real clinical context.
 *
 * Sokha Chann is the registry's follow-up-overdue patient, so her chart is
 * built around renal monitoring — the reason she is overdue is the reason
 * her record is worth opening.
 */

export type PatientChartFixture = {
  safety: readonly PatientContextLine[];
  todaySummary: string;
  reasonForVisit: readonly string[];
  sections: readonly PatientContextSection[];
  diagnoses: readonly DiagnosisContext[];
  orders: readonly PatientOrder[];
};

const DEMO_TOUR_CHART: PatientChartFixture = {
  safety: [
    { label: 'Sulfa allergy', detail: 'Rash, documented 2024' },
    { label: 'Dose adjust meds', detail: 'eGFR 48' },
  ],
  todaySummary: 'Renal follow-up · 1 open item',
  reasonForVisit: ['Follow-up overdue', 'Repeat due'],
  sections: [
    {
      id: 'problems',
      label: 'Active problems',
      items: [
        { label: 'Chronic kidney disease', detail: 'Stage 3a · eGFR 48' },
        { label: 'Hypertension', detail: 'On treatment' },
      ],
    },
    {
      id: 'medications',
      label: 'Current medications',
      items: [
        { label: 'Amlodipine 5 mg', detail: 'Once daily' },
        { label: 'Atorvastatin 20 mg', detail: 'Nightly' },
      ],
    },
    {
      id: 'verification',
      label: 'Pending verification',
      items: [],
      emptyMessage: 'Identity verified at the desk.',
    },
    {
      id: 'history',
      label: 'Past history',
      items: [{ label: 'Pre-eclampsia in second pregnancy', detail: '2019' }],
    },
    {
      id: 'administration',
      label: 'Admin details',
      items: [{ label: 'Last visit', detail: '12 days ago · BKK1' }],
    },
  ],
  diagnoses: [
    {
      code: 'N18.3',
      label: 'Chronic kidney disease, stage 3',
      evidence: 'eGFR 48 · stable over two readings',
    },
    { code: 'I10', label: 'Essential hypertension', evidence: 'BP 138/86 · on treatment' },
  ],
  orders: [
    {
      ordId: 'ord-2210',
      code: 'AB12781',
      placedAtLabel: 'Placed 09 Jul 2026',
      status: 'completed',
      lineItems: [
        { code: 'CRE', displayName: 'Creatinine' },
        { code: 'UACR', displayName: 'Urine albumin to creatinine ratio' },
        { code: 'LIPID', displayName: 'Lipid panel' },
      ],
    },
    {
      ordId: 'ord-2044',
      code: 'AB12106',
      placedAtLabel: 'Placed 14 Apr 2026',
      status: 'completed',
      lineItems: [{ code: 'CRE', displayName: 'Creatinine' }],
    },
  ],
};

/** The chart fixture for a patient, when one has been authored. */
export function chartFixtureFor(userId: string): PatientChartFixture | undefined {
  return userId === DEMO_TOUR_PATIENT_ID ? DEMO_TOUR_CHART : undefined;
}
