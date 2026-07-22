import { describe, expect, it } from 'vitest';

import {
  assessmentBlockers,
  assessmentSummary,
  canGroundOrder,
  diagnosisLine,
  EMPTY_ASSESSMENT,
  indicationFrom,
  orderableDiagnoses,
  signAssessment,
} from './logic';
import type { ClinicalAssessment, WorkingDiagnosis } from './types';

const diabetes: WorkingDiagnosis = {
  id: 'dx-1',
  code: 'E11.9',
  label: 'Type 2 diabetes',
  certainty: 'working',
  evidence: 'Fasting glucose 7.4 mmol/L',
};

const uncoded: WorkingDiagnosis = {
  id: 'dx-2',
  code: '',
  label: 'Unexplained fatigue',
  certainty: 'working',
};

function assessment(patch: Partial<ClinicalAssessment> = {}): ClinicalAssessment {
  return {
    ...EMPTY_ASSESSMENT,
    patientId: 'p-sok-nimol',
    reasonForVisit: 'Tired for two weeks',
    diagnoses: [diabetes],
    recordedBy: 'Dr. Sok Vanna',
    ...patch,
  };
}

describe('orderableDiagnoses', () => {
  it('keeps an uncoded impression', () => {
    expect(orderableDiagnoses([uncoded])).toEqual([uncoded]);
  });

  it('drops a ruled-out diagnosis', () => {
    const excluded: WorkingDiagnosis = { ...diabetes, certainty: 'ruled-out' };
    expect(orderableDiagnoses([excluded, uncoded])).toEqual([uncoded]);
  });
});

describe('assessmentBlockers', () => {
  it('is empty once a reason and a held diagnosis exist', () => {
    expect(assessmentBlockers(assessment())).toEqual([]);
    expect(canGroundOrder(assessment())).toBe(true);
  });

  it('names the missing reason for visit', () => {
    expect(assessmentBlockers(assessment({ reasonForVisit: '  ' }))).toEqual([
      { field: 'reasonForVisit', label: 'Record the reason for visit' },
    ]);
  });

  it('names the missing diagnosis when every one is ruled out', () => {
    const excluded: WorkingDiagnosis = { ...diabetes, certainty: 'ruled-out' };
    expect(assessmentBlockers(assessment({ diagnoses: [excluded] }))).toEqual([
      { field: 'diagnoses', label: 'Add a working diagnosis' },
    ]);
  });

  it('reports both when the encounter has not started', () => {
    expect(assessmentBlockers(EMPTY_ASSESSMENT)).toHaveLength(2);
    expect(canGroundOrder(EMPTY_ASSESSMENT)).toBe(false);
  });
});

describe('indicationFrom', () => {
  it('copies the diagnosis by value so later edits cannot rewrite it', () => {
    const indication = indicationFrom(diabetes);
    expect(indication).toEqual({
      diagnosisId: 'dx-1',
      code: 'E11.9',
      label: 'Type 2 diabetes',
      certainty: 'working',
    });
    expect(indication).not.toBe(diabetes);
  });
});

describe('diagnosisLine', () => {
  it('joins code and label', () => {
    expect(diagnosisLine(diabetes)).toBe('E11.9 · Type 2 diabetes');
  });

  it('shows the label alone while uncoded', () => {
    expect(diagnosisLine(uncoded)).toBe('Unexplained fatigue');
  });
});

describe('assessmentSummary', () => {
  it('falls back to the reason for visit before a diagnosis exists', () => {
    expect(assessmentSummary(assessment({ diagnoses: [] }))).toBe('Tired for two weeks');
  });

  it('counts the diagnoses beyond the first', () => {
    expect(assessmentSummary(assessment({ diagnoses: [diabetes, uncoded] }))).toBe(
      'E11.9 · Type 2 diabetes +1',
    );
  });
});

describe('signAssessment', () => {
  it('signs a grounded assessment', () => {
    expect(signAssessment(assessment()).status).toBe('signed');
  });

  it('refuses an ungrounded one', () => {
    expect(signAssessment(EMPTY_ASSESSMENT).status).toBe('draft');
  });
});
