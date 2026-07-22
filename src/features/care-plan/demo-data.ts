/**
 * Deterministic care-plan fixtures for the journey patient. Nothing reads the
 * clock: dates are the labels a doctor would type, and cadences stay phrases.
 *
 * The story they carry is the one the journey ends on — the first order came
 * back abnormal, so the visit stops being a transaction and becomes a plan
 * with a next measurement already scheduled.
 */

import { JOURNEY_PATIENT } from '../journey/patient';

import type { CarePlan, CareLoopDraft, ProtocolDefinition } from './types';

/** The anchor every fixture dates from, in the doctor's own words. */
export const DEMO_ANCHOR = '20 Jul 2026';

export const PROTOCOLS: readonly ProtocolDefinition[] = [
  {
    key: 'anaemia',
    name: 'Iron deficiency anaemia',
    code: 'D50.9',
    eligibility: 'Ferritin below the reference range with no active bleeding.',
    targets: [{ label: 'Ferritin', target: 'above 30 µg/L', trendKey: 'ferritin' }],
    steps: [
      { label: 'Repeat ferritin and full blood count', kind: 'lab', cadence: '3 months' },
      { label: 'Oral iron, review tolerance', kind: 'medication', detail: 'Ferrous sulfate 200 mg daily' },
      { label: 'Iron-rich diet advice', kind: 'lifestyle' },
    ],
    reviewCadence: '3 months',
  },
  {
    key: 't2dm',
    name: 'Type 2 diabetes',
    code: 'E11.9',
    eligibility: 'HbA1c at or above 6.5% on two occasions.',
    targets: [{ label: 'HbA1c', target: 'below 7.0%', trendKey: 'hba1c' }],
    steps: [
      { label: 'HbA1c', kind: 'lab', cadence: '3 months' },
      { label: 'Urine albumin to creatinine ratio', kind: 'lab', cadence: '12 months' },
      { label: 'Metformin, review tolerance', kind: 'medication', detail: '500 mg twice daily' },
    ],
    reviewCadence: '3 months',
  },
  {
    key: 'ckd',
    name: 'Chronic kidney disease',
    code: 'N18.3',
    eligibility: 'eGFR under 60 for at least three months.',
    targets: [{ label: 'eGFR', target: 'stable or improving', trendKey: 'egfr' }],
    steps: [
      { label: 'Creatinine and eGFR', kind: 'lab', cadence: '6 months' },
      { label: 'Blood pressure target under 130/80', kind: 'lifestyle' },
    ],
    reviewCadence: '6 months',
  },
  {
    key: 'htn',
    name: 'Hypertension',
    code: 'I10',
    eligibility: 'Blood pressure at or above 140/90 on repeat measurement.',
    targets: [{ label: 'Blood pressure', target: 'below 130/80', trendKey: 'bp' }],
    steps: [
      { label: 'Home blood pressure diary', kind: 'lifestyle', cadence: '1 month' },
      { label: 'Electrolytes and creatinine', kind: 'lab', cadence: '12 months' },
    ],
    reviewCadence: '6 months',
  },
];

/** Nothing enrolled yet: the plan exists but the visit has not closed. */
export const EMPTY_PLAN: CarePlan = {
  id: 'plan-sok-nimol',
  patientId: JOURNEY_PATIENT.userId,
  title: 'Care plan',
  status: 'draft',
  focuses: [],
  goals: [],
  interventions: [],
  monitoring: [],
  reviews: [],
  reviewCadence: '3 months',
  version: 1,
};

/**
 * What the first result produced. The evidence is the finding; the proposals
 * are the drafted answer to it, with the spine marked non-optional.
 */
export const ANAEMIA_LOOP_DRAFT: CareLoopDraft = {
  patientId: JOURNEY_PATIENT.userId,
  issueTitle: 'Iron deficiency anaemia confirmed',
  statusLabel: 'Off target',
  reviewCadence: '3 months',
  evidence: [
    {
      label: 'Ferritin',
      value: '9 µg/L',
      reference: '30–400 µg/L',
      flagLabel: 'Low',
      tone: 'danger',
    },
    {
      label: 'Haemoglobin',
      value: '10.2 g/dL',
      reference: '13.0–17.0 g/dL',
      flagLabel: 'Low',
      tone: 'warning',
    },
    {
      label: 'Transferrin saturation',
      value: '8 %',
      reference: '20–50 %',
      flagLabel: 'Low',
      tone: 'danger',
    },
  ],
  focus: {
    id: 'focus-anaemia',
    code: 'D50.9',
    label: 'Iron deficiency anaemia',
    enrolledVia: 'consultation',
  },
  proposals: [
    {
      id: 'loop-focus',
      kind: 'focus',
      label: 'D50.9 · Iron deficiency anaemia',
      detail: 'Confirms the working diagnosis from this visit',
      optional: false,
    },
    {
      id: 'loop-goal',
      kind: 'goal',
      label: 'Ferritin above 30 µg/L',
      detail: 'above 30 µg/L',
      optional: false,
    },
    {
      id: 'loop-repeat',
      kind: 'repeat-lab',
      label: 'Repeat ferritin and full blood count',
      detail: '3 months',
      optional: false,
    },
    {
      id: 'loop-med',
      kind: 'medication',
      label: 'Ferrous sulfate 200 mg',
      detail: 'Once daily with food',
      optional: true,
    },
    {
      id: 'loop-followup',
      kind: 'follow-up',
      label: 'Review appointment',
      detail: 'After the repeat bloods',
      optional: true,
    },
    {
      id: 'loop-instruction',
      kind: 'instruction',
      label: 'Iron-rich diet advice for the patient',
      optional: true,
    },
  ],
};

/** A plan a few months in: one step done, one still waiting on its result. */
export const RUNNING_PLAN: CarePlan = {
  ...EMPTY_PLAN,
  status: 'active',
  version: 3,
  focuses: [ANAEMIA_LOOP_DRAFT.focus],
  goals: [
    {
      id: 'goal-ferritin',
      focusId: 'focus-anaemia',
      label: 'Ferritin above 30 µg/L',
      target: 'above 30 µg/L',
      trendKey: 'ferritin',
      latest: '9 µg/L',
      status: 'off-target',
    },
  ],
  interventions: [
    {
      id: 'iv-iron',
      focusId: 'focus-anaemia',
      kind: 'medication',
      label: 'Ferrous sulfate 200 mg',
      detail: 'Once daily with food',
      owner: 'Dr. Sok Vanna',
      status: 'in-progress',
    },
    {
      id: 'iv-repeat',
      focusId: 'focus-anaemia',
      kind: 'lab',
      label: 'Repeat ferritin and full blood count',
      owner: 'Dr. Sok Vanna',
      due: '3 months (from 20 Jul 2026)',
      status: 'planned',
    },
    {
      id: 'iv-diet',
      focusId: 'focus-anaemia',
      kind: 'lifestyle',
      label: 'Iron-rich diet advice',
      owner: 'Dr. Sok Vanna',
      status: 'complete',
    },
  ],
  monitoring: [
    {
      id: 'mon-ferritin',
      focusId: 'focus-anaemia',
      label: 'Ferritin',
      cadence: '3 months',
      trendKey: 'ferritin',
      escalation: 'Still under 15 µg/L after treatment — look for a bleeding source.',
    },
  ],
  reviews: [
    {
      id: 'review-2',
      onLabel: DEMO_ANCHOR,
      by: 'Dr. Sok Vanna',
      note: 'Iron deficiency anaemia confirmed',
    },
  ],
};
