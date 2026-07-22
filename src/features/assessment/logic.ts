import type {
  AssessmentBlocker,
  ClinicalAssessment,
  DiagnosisCertainty,
  OrderIndication,
  WorkingDiagnosis,
} from './types';

export const EMPTY_ASSESSMENT: ClinicalAssessment = {
  patientId: '',
  reasonForVisit: '',
  subjective: '',
  objective: '',
  diagnoses: [],
  plan: '',
  recordedBy: '',
  status: 'draft',
};

const CERTAINTY_LABELS: Record<DiagnosisCertainty, string> = {
  working: 'Working',
  confirmed: 'Confirmed',
  'ruled-out': 'Ruled out',
};

export function certaintyLabel(certainty: DiagnosisCertainty): string {
  return CERTAINTY_LABELS[certainty];
}

/**
 * Diagnoses that can ground a test order. A ruled-out diagnosis cannot: once
 * excluded, it is no longer a reason to investigate. Everything the doctor
 * still holds — including an uncoded impression — can.
 */
export function orderableDiagnoses(
  diagnoses: readonly WorkingDiagnosis[],
): readonly WorkingDiagnosis[] {
  return diagnoses.filter((diagnosis) => diagnosis.certainty !== 'ruled-out');
}

/**
 * What still has to happen before this assessment can ground an order. Named
 * as actions so the surface can list them instead of disabling a control with
 * no stated reason.
 */
export function assessmentBlockers(assessment: ClinicalAssessment): readonly AssessmentBlocker[] {
  const blockers: AssessmentBlocker[] = [];
  if (assessment.reasonForVisit.trim() === '') {
    blockers.push({ field: 'reasonForVisit', label: 'Record the reason for visit' });
  }
  if (orderableDiagnoses(assessment.diagnoses).length === 0) {
    blockers.push({ field: 'diagnoses', label: 'Add a working diagnosis' });
  }
  return blockers;
}

export function canGroundOrder(assessment: ClinicalAssessment): boolean {
  return assessmentBlockers(assessment).length === 0;
}

/**
 * Freeze the chosen diagnosis into the order's stated reason. Taking a copy
 * rather than a reference is deliberate: the order records why it was placed
 * at the moment it was placed, and a later revision of the assessment must
 * not rewrite that history.
 */
export function indicationFrom(diagnosis: WorkingDiagnosis): OrderIndication {
  return {
    diagnosisId: diagnosis.id,
    code: diagnosis.code,
    label: diagnosis.label,
    certainty: diagnosis.certainty,
  };
}

/** "E11.9 · Type 2 diabetes" — or just the label while still uncoded. */
export function diagnosisLine(diagnosis: Pick<WorkingDiagnosis, 'code' | 'label'>): string {
  return diagnosis.code === '' ? diagnosis.label : `${diagnosis.code} · ${diagnosis.label}`;
}

/**
 * One-line recall of the encounter for the surfaces downstream of it. Falls
 * back to the reason for visit while no diagnosis has been formed yet, so the
 * line is never empty once the encounter has started.
 */
export function assessmentSummary(assessment: ClinicalAssessment): string {
  const held = orderableDiagnoses(assessment.diagnoses);
  if (held.length === 0) return assessment.reasonForVisit.trim();
  const [first, ...rest] = held;
  const line = diagnosisLine(first);
  return rest.length === 0 ? line : `${line} +${rest.length}`;
}

/** Signing requires the same grounding an order does; drafts stay editable. */
export function signAssessment(assessment: ClinicalAssessment): ClinicalAssessment {
  if (!canGroundOrder(assessment)) return assessment;
  return { ...assessment, status: 'signed' };
}
