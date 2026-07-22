import type { PatientAcquisitionJourneySnapshot } from '../care-loop/patient-acquisition-flow';
import type { PatientSummary, PatientWorkItem } from './types';

function maskedPhone(phone?: string) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6) return '';
  return `+${digits.slice(0, 2)}*****${digits.slice(-4)}`;
}

function maskedMrn(pid?: string) {
  if (!pid) return '';
  if (pid.startsWith('··')) return pid;
  const suffix = pid.replace(/\W/g, '').slice(-2);
  return suffix ? `··${suffix}` : '';
}

export function patientSummaryFromJourney(
  journey: PatientAcquisitionJourneySnapshot,
): PatientSummary {
  const patient = journey.patient;
  return {
    userId: patient.id ?? `provisional-${patient.name.toLowerCase().replace(/\s+/g, '-')}`,
    displayName: patient.name,
    sexAtBirth: patient.sex ?? 'Unknown',
    age: patient.age ?? 0,
    hasAge: patient.age !== undefined,
    mrnMasked: maskedMrn(patient.pid),
    phoneMasked: maskedPhone(patient.phone),
    assurance: 'unverified',
    status: '',
  };
}

export function workItemFromJourney(
  journey: PatientAcquisitionJourneySnapshot,
): PatientWorkItem {
  const labStage = journey.labOrder?.stage;

  if (labStage === 'partial-results') {
    return { action: 'review_results', label: 'Partial results available' };
  }
  if (labStage === 'processing' || labStage === 'received-at-lab') {
    return { action: 'view_progress', label: 'Lab processing samples' };
  }
  if (labStage === 'in-transit' || labStage === 'awaiting-results') {
    return { action: 'view_progress', label: 'Samples in transit' };
  }
  if (labStage === 'courier-assigned') {
    return { action: 'view_progress', label: 'Courier on the way' };
  }
  if (labStage === 'ready-for-pickup' || labStage === 'pickup-delayed') {
    return {
      action: 'view_progress',
      label: labStage === 'pickup-delayed' ? 'Courier pickup delayed' : 'Waiting for courier',
    };
  }
  if (labStage === 'prepare-tubes') {
    return { action: 'continue', label: 'Prepare collection tubes' };
  }
  if (labStage === 'label-tubes') {
    return { action: 'continue', label: 'Label collected samples' };
  }
  if (labStage === 'verify-labels') {
    return { action: 'continue', label: 'Verify sample labels' };
  }
  if (labStage === 'handoff') {
    return { action: 'continue', label: 'Prepare samples for pickup' };
  }
  if (labStage === 'ordering') {
    return { action: 'continue', label: 'Choose lab tests' };
  }
  if (labStage) return { action: 'continue', label: 'Lab order in progress' };
  if (journey.stage === 'intake-complete') {
    return { action: 'continue', label: 'Intake received' };
  }
  if (journey.stage === 'ready-to-order') {
    return { action: 'continue', label: 'Ready to order tests' };
  }
  return { action: 'continue', label: 'Patient setup in progress' };
}

export function journeyHasTrackableLabProgress(journey?: PatientAcquisitionJourneySnapshot) {
  return journey ? workItemFromJourney(journey).action !== 'continue' : false;
}
