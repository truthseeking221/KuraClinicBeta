import { describe, expect, it } from 'vitest';

import {
  attachEvidence,
  awaitingEvidence,
  canCompleteIntervention,
  canTransitionPlan,
  completeIntervention,
  enrolProtocol,
  nextDueFromCadence,
  optionalProposals,
  proposalsToCommit,
  recordException,
  requiresEvidence,
  signCareLoop,
  spineProposals,
  transitionPlan,
} from './logic';
import type { CarePlan, CareLoopDraft, Intervention, ProtocolDefinition } from './types';

const labStep: Intervention = {
  id: 'iv-1',
  focusId: 'focus-anaemia',
  kind: 'lab',
  label: 'Repeat ferritin',
  owner: 'Dr. Sok Vanna',
  status: 'planned',
};

const lifestyleStep: Intervention = {
  ...labStep,
  id: 'iv-2',
  kind: 'lifestyle',
  label: 'Iron-rich diet advice',
};

const plan: CarePlan = {
  id: 'plan-1',
  patientId: 'p-sok-nimol',
  title: 'Care plan',
  status: 'draft',
  focuses: [],
  goals: [],
  interventions: [labStep, lifestyleStep],
  monitoring: [],
  reviews: [],
  reviewCadence: '3 months',
  version: 1,
};

describe('plan transitions', () => {
  it('allows draft to become active', () => {
    expect(canTransitionPlan('draft', 'active')).toBe(true);
  });

  it('refuses to reopen a completed plan', () => {
    expect(canTransitionPlan('completed', 'active')).toBe(false);
    const result = transitionPlan({ ...plan, status: 'completed' }, 'active');
    expect(result).toEqual({ ok: false, reason: 'A completed plan cannot become active.' });
  });

  it('requires a reason to pause', () => {
    const active = { ...plan, status: 'active' as const };
    expect(transitionPlan(active, 'on-hold')).toEqual({
      ok: false,
      reason: 'Pausing a plan needs a reason.',
    });
    const paused = transitionPlan(active, 'on-hold', { holdReason: 'Patient travelling' });
    expect(paused.ok && paused.plan.holdReason).toBe('Patient travelling');
  });

  it('clears the hold reason on resume', () => {
    const held = { ...plan, status: 'on-hold' as const, holdReason: 'Patient travelling' };
    const resumed = transitionPlan(held, 'active');
    expect(resumed.ok && resumed.plan.holdReason).toBeUndefined();
  });
});

describe('evidence rule', () => {
  it('marks lab and imaging as evidence-bearing', () => {
    expect(requiresEvidence('lab')).toBe(true);
    expect(requiresEvidence('imaging')).toBe(true);
    expect(requiresEvidence('lifestyle')).toBe(false);
  });

  it('refuses to tick off a lab step with no result', () => {
    expect(canCompleteIntervention(labStep)).toEqual({
      ok: false,
      reason: 'Waiting on the result. Record an exception if it will never arrive.',
    });
    expect(completeIntervention(labStep).ok).toBe(false);
  });

  it('completes a lab step once the result is attached', () => {
    const withResult = attachEvidence(labStep, 'Ferritin 18 µg/L · 20 Jul');
    expect(withResult.status).toBe('in-progress');
    const done = completeIntervention(withResult);
    expect(done.ok && done.intervention.status).toBe('complete');
  });

  it('completes a lab step through a recorded exception', () => {
    const excused = recordException(labStep, {
      reason: 'Patient moved abroad; sample never drawn',
      recordedBy: 'Dr. Sok Vanna',
    });
    expect(excused.status).toBe('complete');
    expect(canCompleteIntervention(excused).ok).toBe(true);
  });

  it('completes a non-evidence step directly', () => {
    const done = completeIntervention(lifestyleStep);
    expect(done.ok && done.intervention.status).toBe('complete');
  });

  it('lists what the plan is waiting on', () => {
    expect(awaitingEvidence(plan).map((step) => step.id)).toEqual(['iv-1']);
  });
});

describe('nextDueFromCadence', () => {
  it('composes cadence and anchor without reading a clock', () => {
    expect(nextDueFromCadence('3 months', '20 Jul 2026')).toBe('3 months (from 20 Jul 2026)');
  });

  it('falls back to the cadence alone', () => {
    expect(nextDueFromCadence('3 months', '')).toBe('3 months');
  });
});

const draft: CareLoopDraft = {
  patientId: 'p-sok-nimol',
  issueTitle: 'Anaemia confirmed',
  statusLabel: 'Off target',
  evidence: [
    {
      label: 'Ferritin',
      value: '9 µg/L',
      reference: '30–400',
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
  reviewCadence: '3 months',
  proposals: [
    { id: 'p-focus', kind: 'focus', label: 'Iron deficiency anaemia', optional: false },
    { id: 'p-goal', kind: 'goal', label: 'Ferritin above 30 µg/L', detail: '> 30 µg/L', optional: false },
    { id: 'p-repeat', kind: 'repeat-lab', label: 'Repeat ferritin', detail: '3 months', optional: false },
    { id: 'p-med', kind: 'medication', label: 'Ferrous sulfate 200 mg', detail: 'Daily', optional: true },
    { id: 'p-note', kind: 'instruction', label: 'Iron-rich diet advice', optional: true },
  ],
};

describe('care loop', () => {
  it('separates the spine from the optional lines', () => {
    expect(spineProposals(draft).map((p) => p.id)).toEqual(['p-focus', 'p-goal', 'p-repeat']);
    expect(optionalProposals(draft).map((p) => p.id)).toEqual(['p-med', 'p-note']);
  });

  it('always commits the spine, whatever the doctor drops', () => {
    const committed = proposalsToCommit(draft, new Set());
    expect(committed.map((p) => p.id)).toEqual(['p-focus', 'p-goal', 'p-repeat']);
  });

  it('adds kept optional lines', () => {
    const committed = proposalsToCommit(draft, new Set(['p-med']));
    expect(committed.map((p) => p.id)).toEqual(['p-focus', 'p-goal', 'p-repeat', 'p-med']);
  });

  it('signs the draft into the plan and bumps the version once', () => {
    const empty: CarePlan = { ...plan, interventions: [], version: 3 };
    const signed = signCareLoop(empty, draft, new Set(['p-med']), 'Dr. Sok Vanna', '20 Jul 2026');

    expect(signed.version).toBe(4);
    expect(signed.status).toBe('active');
    expect(signed.focuses.map((f) => f.id)).toEqual(['focus-anaemia']);
    expect(signed.goals).toHaveLength(1);
    expect(signed.monitoring).toHaveLength(1);
    expect(signed.reviews.at(-1)?.note).toBe('Anaemia confirmed');

    const repeat = signed.interventions.find((iv) => iv.kind === 'lab');
    expect(repeat?.due).toBe('3 months (from 20 Jul 2026)');
    expect(repeat?.status).toBe('planned');
    expect(signed.interventions.some((iv) => iv.kind === 'medication')).toBe(true);
  });

  it('leaves the draft untouched when signing', () => {
    const before = JSON.stringify(draft);
    signCareLoop(plan, draft, new Set(['p-med']), 'Dr. Sok Vanna', '20 Jul 2026');
    expect(JSON.stringify(draft)).toBe(before);
  });
});

const protocol: ProtocolDefinition = {
  key: 'anaemia',
  name: 'Iron deficiency anaemia',
  code: 'D50.9',
  eligibility: 'Confirmed low ferritin',
  targets: [{ label: 'Ferritin', target: 'above 30 µg/L', trendKey: 'ferritin' }],
  steps: [{ label: 'Repeat ferritin', kind: 'lab', cadence: '3 months' }],
  reviewCadence: '3 months',
};

describe('enrolProtocol', () => {
  it('adds one focus with its targets and steps', () => {
    const enrolled = enrolProtocol(plan, protocol, 'Dr. Sok Vanna', '20 Jul 2026');
    expect(enrolled.focuses).toHaveLength(1);
    expect(enrolled.focuses[0].enrolledVia).toBe('protocol');
    expect(enrolled.goals).toHaveLength(1);
    expect(enrolled.interventions).toHaveLength(3);
    expect(enrolled.version).toBe(2);
  });

  it('is idempotent — enrolling twice never forks a second plan', () => {
    const once = enrolProtocol(plan, protocol, 'Dr. Sok Vanna', '20 Jul 2026');
    const twice = enrolProtocol(once, protocol, 'Dr. Sok Vanna', '20 Jul 2026');
    expect(twice).toBe(once);
  });
});
