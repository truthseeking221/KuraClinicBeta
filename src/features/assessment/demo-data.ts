/**
 * Deterministic assessment fixtures for the journey patient. Nothing here
 * reads the clock.
 *
 * The ICD-10 shortlist is a demo convenience, not a catalogue: the platform
 * has no diagnosis vocabulary at all, so a full index would imply backend
 * support that does not exist. These are the codes the journey actually
 * reaches for, plus the uncoded route.
 */

import { JOURNEY_PATIENT } from '../journey/patient';

import type { ClinicalAssessment, WorkingDiagnosis } from './types';

export const ICD10_SHORTLIST = [
  { code: 'E11.9', label: 'Type 2 diabetes without complications' },
  { code: 'E78.5', label: 'Hyperlipidaemia, unspecified' },
  { code: 'I10', label: 'Essential hypertension' },
  { code: 'D50.9', label: 'Iron deficiency anaemia, unspecified' },
  { code: 'N18.3', label: 'Chronic kidney disease, stage 3' },
  { code: 'E05.9', label: 'Thyrotoxicosis, unspecified' },
  { code: 'R53.83', label: 'Other fatigue' },
] as const;

export const DEMO_DIAGNOSES: readonly WorkingDiagnosis[] = [
  {
    id: 'dx-fatigue',
    code: 'R53.83',
    label: 'Other fatigue',
    certainty: 'working',
    evidence: 'Two weeks, worse in the afternoon, no fever',
  },
  {
    id: 'dx-anaemia',
    code: 'D50.9',
    label: 'Iron deficiency anaemia, unspecified',
    certainty: 'working',
    evidence: 'Pale conjunctiva, resting pulse 96',
  },
];

/** The encounter as it stands the moment the doctor sits down: nothing yet. */
export const EMPTY_ENCOUNTER: ClinicalAssessment = {
  patientId: JOURNEY_PATIENT.userId,
  reasonForVisit: '',
  subjective: '',
  objective: '',
  diagnoses: [],
  plan: '',
  recordedBy: 'Dr. Sok Vanna',
  status: 'draft',
};

/** The same encounter once the doctor has examined the patient. */
export const WORKED_UP_ENCOUNTER: ClinicalAssessment = {
  ...EMPTY_ENCOUNTER,
  reasonForVisit: 'Tired for two weeks, wants a general checkup',
  subjective:
    'Fatigue for two weeks, worse in the afternoons. Sleeping normally. No fever, no weight loss. No known allergies. Not on any regular medicine.',
  objective:
    'Alert, no distress. Pale conjunctiva. Chest clear, heart sounds normal. No oedema. Resting pulse 96.',
  vitals: {
    heightCm: '168',
    weightKg: '71',
    hr: '96',
    bpSys: '128',
    bpDia: '82',
    tempC: '36.8',
    tempUnit: 'C',
    spo2: '98',
    breathing: '16',
    painVas: 0,
    fasting: null,
    vaccinationNote: '',
  },
  diagnoses: DEMO_DIAGNOSES,
  plan: 'Baseline bloods today to separate anaemia from a thyroid or glycaemic cause. Review together once results return.',
};
