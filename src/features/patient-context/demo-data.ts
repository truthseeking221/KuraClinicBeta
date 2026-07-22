import type { PatientContextRailProps } from './patient-context-rail';

/**
 * The established patient is a second, deliberately different persona: years
 * of chronic disease behind her. She must not share a name with the journey
 * patient, or the rail's whole job — making identity unmistakable — fails on
 * its own fixtures.
 */
const PATIENT = {
  initials: 'SS',
  name: 'Sreymom Sok',
  demographics: '57 y · F · MRN P-7133',
};

const DETAIL_PATIENT = {
  initials: 'SN',
  name: 'Sok Nimol',
  demographics: '57 y · F · MRN P-7133',
};

const SAFETY = [
  { label: 'Penicillin allergy', detail: 'Rash', tone: 'danger' },
  { label: 'Dose adjust meds', detail: 'eGFR 11', tone: 'warning' },
] as const;

const ESTABLISHED_SECTIONS = [
  { id: 'problems', label: 'Active problems', items: [] },
  { id: 'medications', label: 'Current medications', items: [] },
  { id: 'verification', label: 'Pending verification', items: [] },
  { id: 'history', label: 'Past history', items: [] },
  { id: 'administration', label: 'Admin details', items: [] },
] as const;

export const PATIENT_CONTEXT_FIXTURES = {
  established: {
    patient: PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: ESTABLISHED_SECTIONS,
  },
  newPatient: {
    patient: {
      initials: 'SN',
      name: 'Sok Nimol',
      demographics: '32 y · M · MRN P-8842',
      status: 'Provisional · PSC verifies',
    },
    safety: [{ label: 'No known allergies.', tone: 'neutral' }],
    todaySummary: undefined,
    reasonForVisit: undefined,
    sections: ESTABLISHED_SECTIONS,
  },
  activeProblems: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      {
        id: 'problems',
        label: 'Active problems',
        items: [
          { label: 'Chronic kidney disease', detail: 'Stage 4 · eGFR 11' },
          { label: 'Type 2 diabetes', detail: 'Uncontrolled' },
          { label: 'Hypertension', detail: 'Active' },
        ],
      },
      ...ESTABLISHED_SECTIONS.slice(1),
    ],
  },
  currentMedications: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      ESTABLISHED_SECTIONS[0],
      {
        id: 'medications',
        label: 'Current medications',
        items: [
          { label: 'Lisinopril 10 mg', detail: 'Once daily' },
          { label: 'Amlodipine 5 mg', detail: 'Once daily' },
          { label: 'Atorvastatin 20 mg', detail: 'Nightly' },
        ],
      },
      ...ESTABLISHED_SECTIONS.slice(2),
    ],
  },
  /** Two recorded groups: the only fixture that can prove independent disclosure. */
  multipleRecorded: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      ESTABLISHED_SECTIONS[0],
      {
        id: 'medications',
        label: 'Current medications',
        items: [
          { label: 'Lisinopril 10 mg', detail: 'Once daily' },
          { label: 'Amlodipine 5 mg', detail: 'Once daily' },
          { label: 'Atorvastatin 20 mg', detail: 'Nightly' },
        ],
      },
      ESTABLISHED_SECTIONS[2],
      {
        id: 'history',
        label: 'Past history',
        items: [
          { label: 'Cholecystectomy', detail: '2019' },
          { label: 'Gestational diabetes', detail: '2005' },
          { label: 'Appendectomy', detail: '1998' },
        ],
      },
      ESTABLISHED_SECTIONS[4],
    ],
  },
  pendingVerification: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      ESTABLISHED_SECTIONS[0],
      ESTABLISHED_SECTIONS[1],
      {
        id: 'verification',
        label: 'Pending verification',
        items: [
          { label: 'Lipid panel', detail: 'Ordered 26 Jun' },
          { label: 'HbA1c', detail: 'Awaiting result' },
        ],
      },
      ...ESTABLISHED_SECTIONS.slice(3),
    ],
  },
  pastHistory: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      ESTABLISHED_SECTIONS[0],
      ESTABLISHED_SECTIONS[1],
      ESTABLISHED_SECTIONS[2],
      {
        id: 'history',
        label: 'Past history',
        items: [
          { label: 'Cholecystectomy', detail: '2019' },
          { label: 'Gestational diabetes', detail: '2005' },
          { label: 'Appendectomy', detail: '1998' },
        ],
      },
      ESTABLISHED_SECTIONS[4],
    ],
  },
  adminDetails: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      ...ESTABLISHED_SECTIONS.slice(0, 4),
      {
        id: 'administration',
        label: 'Admin details',
        items: [
          { label: 'Phone', detail: '012 345 678' },
          { label: 'Insurance', detail: 'SSN · Active' },
        ],
      },
    ],
  },
  activeProblemsEmpty: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      { id: 'problems', label: 'Active problems', items: [], emptyMessage: 'No active problems.' },
      ...ESTABLISHED_SECTIONS.slice(1),
    ],
  },
  currentMedicationsEmpty: {
    patient: DETAIL_PATIENT,
    safety: SAFETY,
    todaySummary: '3 symptoms · 2 open items',
    reasonForVisit: ['At risk', 'Repeat due', 'Active'],
    sections: [
      ESTABLISHED_SECTIONS[0],
      { id: 'medications', label: 'Current medications', items: [], emptyMessage: 'No active medications recorded.' },
      ...ESTABLISHED_SECTIONS.slice(2),
    ],
  },
} as const satisfies Record<string, Omit<PatientContextRailProps, 'state' | 'defaultExpanded' | 'onRetry' | 'readOnly'>>;
