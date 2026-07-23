import { describe, expect, it } from 'vitest';

import { careLoopLabOrderJourney } from '../care-loop/demo-data';
import { DEMO_RESUMABLE_PATIENT_JOURNEY } from './demo-data';
import { patientSummaryFromJourney, workItemFromJourney } from './journey-work-item';

describe('resumable patient work', () => {
  it('keeps journey state out of the patient list contract', () => {
    const patient = patientSummaryFromJourney(DEMO_RESUMABLE_PATIENT_JOURNEY);

    expect(patient.userId).toBe(DEMO_RESUMABLE_PATIENT_JOURNEY.patient.id);
    expect(patient.assurance).toBe('unverified');
    expect(patient).not.toHaveProperty('stage');
    expect(patient).not.toHaveProperty('labOrder');
  });

  it.each([
    ['ordering', 'continue', 'Choose lab tests'],
    ['prepare-tubes', 'continue', 'Prepare collection tubes'],
    ['label-tubes', 'continue', 'Label collected samples'],
    ['verify-labels', 'continue', 'Verify sample labels'],
    ['handoff', 'continue', 'Prepare samples for pickup'],
    ['ready-for-pickup', 'view_progress', 'Waiting for courier'],
    ['in-transit', 'view_progress', 'Samples in transit'],
    ['processing', 'view_progress', 'Lab processing samples'],
    ['partial-results', 'review_results', 'Partial results available'],
  ] as const)('maps %s to its correct registry action', (stage, action, label) => {
    const workItem = workItemFromJourney({
      ...DEMO_RESUMABLE_PATIENT_JOURNEY,
      labOrder: careLoopLabOrderJourney({ stage }),
    });

    expect(workItem).toEqual({ action, label });
  });

  it.each([
    ['intake-complete', 'Intake to review'],
    ['intake-review', 'Intake to review'],
    ['next-step', 'Ready for the next step'],
    ['ready-to-order', 'Ready to order tests'],
  ] as const)(
    'names %s as work the doctor still has to do',
    (stage, label) => {
      const workItem = workItemFromJourney({
        ...DEMO_RESUMABLE_PATIENT_JOURNEY,
        labOrder: undefined,
        stage,
      });

      expect(workItem).toEqual({ action: 'continue', label });
    },
  );
});
