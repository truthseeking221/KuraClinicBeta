import { describe, expect, it } from 'vitest';

import { WORKED_UP_ENCOUNTER } from '../assessment/demo-data';
import { RUNNING_PLAN } from '../care-plan/demo-data';

import {
  axisSummary,
  currentPhase,
  isPhaseComplete,
  newEpisode,
  nextStep,
  phaseState,
} from './episode';
import type { Episode } from './episode';
import { JOURNEY_PATIENT } from './patient';

const indication = {
  diagnosisId: 'dx-anaemia',
  code: 'D50.9',
  label: 'Iron deficiency anaemia, unspecified',
  certainty: 'working' as const,
};

function episode(patch: Partial<Episode> = {}): Episode {
  return { ...newEpisode(JOURNEY_PATIENT.userId, JOURNEY_PATIENT.displayName), ...patch };
}

describe('currentPhase', () => {
  it('starts at identity', () => {
    expect(currentPhase(episode())).toBe('identity');
  });

  it('moves to assessment once identity is known', () => {
    expect(currentPhase(episode({ identity: 'provisional' }))).toBe('assessment');
  });

  it('does not count a visited assessment that produced nothing', () => {
    const visited = episode({ identity: 'provisional', assessment: WORKED_UP_ENCOUNTER });
    expect(isPhaseComplete(visited, 'assessment')).toBe(false);
    expect(currentPhase(visited)).toBe('assessment');
  });

  it('reaches order once the assessment produced an indication', () => {
    const grounded = episode({
      identity: 'provisional',
      assessment: WORKED_UP_ENCOUNTER,
      indication,
    });
    expect(currentPhase(grounded)).toBe('order');
  });

  it('holds at order while tests exist but no money decision was made', () => {
    const halfOrdered = episode({
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication,
      orderedTestCount: 10,
    });
    expect(currentPhase(halfOrdered)).toBe('order');
  });
});

describe('nextStep', () => {
  it('names the missing diagnosis as the blocker on ordering', () => {
    const noDiagnosis = episode({ identity: 'provisional', orderedTestCount: 3 });
    const step = nextStep({ ...noDiagnosis, assessment: WORKED_UP_ENCOUNTER });
    expect(step.phase).toBe('assessment');
    expect(step.action).toContain('working diagnosis');
  });

  it('keeps a blocked step visible instead of hiding it', () => {
    const collected = episode({
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication,
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'collected',
    });
    const step = nextStep(collected);
    expect(step.phase).toBe('results');
    expect(step.blockedBy).toBe('Samples have not reached the lab');
  });

  it('names the actor for every phase', () => {
    expect(nextStep(episode()).actor).toBe('Reception or doctor');
    expect(
      nextStep(
        episode({
          identity: 'verified',
          assessment: WORKED_UP_ENCOUNTER,
          indication,
          orderedTestCount: 10,
          payment: 'paid',
        }),
      ).actor,
    ).toBe('Nurse');
  });

  it('ends on signing the plan', () => {
    const ready = episode({
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication,
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'received_at_lab',
      result: 'released',
    });
    expect(nextStep(ready).phase).toBe('care-plan');
    expect(nextStep(ready).action).toContain('next measurement');
  });
});

describe('axisSummary', () => {
  it('keeps money, specimen and result independent', () => {
    const paidNotDrawn = episode({ payment: 'paid', sample: 'awaiting_collection' });
    expect(axisSummary(paidNotDrawn)).toBe('Paid · Awaiting collection · No result');
  });

  it('shows a drawn sample with nothing resulted', () => {
    expect(axisSummary(episode({ payment: 'deferred', sample: 'collected' }))).toBe(
      'Payment deferred · Collected · No result',
    );
  });
});

describe('phaseState', () => {
  it('marks the strip complete, current and upcoming', () => {
    const midway = episode({
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication,
    });
    expect(phaseState(midway, 'identity')).toBe('complete');
    expect(phaseState(midway, 'order')).toBe('current');
    expect(phaseState(midway, 'results')).toBe('upcoming');
  });

  it('completes the journey when the plan is active', () => {
    const done = episode({
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication,
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'received_at_lab',
      result: 'reviewed',
      plan: RUNNING_PLAN,
    });
    expect(phaseState(done, 'care-plan')).toBe('complete');
  });
});
