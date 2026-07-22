/**
 * Clinical assessment domain — the doctor's encounter before any test is
 * ordered.
 *
 * TARGET CONTRACT, and an unusually bare one. kura-platform models the
 * commerce and logistics of specimens: it has no encounter, note, diagnosis,
 * or problem-list schema anywhere, and no reserved seam for one. Nothing here
 * mirrors a wire message, because there is no wire message to mirror.
 *
 * It exists anyway because the journey's governing rule — a test order must
 * be grounded in a clinical finding — needs something to be grounded in.
 * Every prior Kura prototype stated that rule in interface copy and enforced
 * it nowhere; the structured `diagnoses` list below is what lets an order
 * carry its indication as data instead of as a sentence.
 *
 * The A of SOAP is therefore structured while S, O and P stay prose: the
 * assessment is the only part another surface has to read.
 */

import type { VitalsValues } from '../collection/types';

/**
 * How firmly the doctor holds this diagnosis right now. `working` is the
 * honest default at first contact and is enough to ground an order — ordering
 * a test to confirm or exclude a suspicion is the normal reason to order one.
 */
export type DiagnosisCertainty = 'working' | 'confirmed' | 'ruled-out';

/**
 * One clinical impression. `code` is ICD-10 when the doctor has committed to
 * one and empty while the impression is still uncoded — an uncoded impression
 * is a real clinical state, not an incomplete form.
 */
export type WorkingDiagnosis = {
  id: string;
  /** ICD-10 code, or '' while the impression is uncoded. */
  code: string;
  label: string;
  certainty: DiagnosisCertainty;
  /** What supports it, e.g. "Fasting glucose 7.4 mmol/L · two readings". */
  evidence?: string;
};

export type AssessmentStatus = 'draft' | 'signed';

/**
 * One encounter. `reasonForVisit` is the patient's own words; `subjective`
 * and `objective` are the doctor's. `plan` records intent in prose — the
 * orders and care plan that follow are the executable form of it.
 */
export type ClinicalAssessment = {
  patientId: string;
  reasonForVisit: string;
  subjective: string;
  objective: string;
  vitals?: VitalsValues;
  diagnoses: readonly WorkingDiagnosis[];
  plan: string;
  recordedBy: string;
  status: AssessmentStatus;
};

/**
 * What an order carries to prove it came from clinical reasoning. Copied by
 * value at send time: an order's stated reason must not silently change when
 * the doctor later revises the assessment.
 */
export type OrderIndication = {
  diagnosisId: string;
  code: string;
  label: string;
  certainty: DiagnosisCertainty;
};

/** One unmet requirement, phrased as the action that clears it. */
export type AssessmentBlocker = {
  field: 'reasonForVisit' | 'diagnoses';
  label: string;
};
