/**
 * The episode: one patient's path from first contact to a care plan, held as
 * a single state instead of six unrelated screens.
 *
 * The governing rule of the journey is that the system always knows which
 * step an episode is in and what comes next. That is only true if one thing
 * owns the answer, so this module is that thing. Every phase surface reads
 * its input from the episode and writes its output back; none of them decides
 * what follows.
 *
 * Three axes stay deliberately independent, because in the clinic they are:
 * paid is not collected, collected is not resulted, and resulted is not
 * reviewed. Collapsing any pair would let the interface claim progress the
 * patient has not actually had.
 */

import type { ClinicalAssessment, OrderIndication } from '../assessment/types';
import type { CarePlan } from '../care-plan/types';

export type JourneyPhase =
  | 'identity'
  | 'assessment'
  | 'order'
  | 'collection'
  | 'results'
  | 'care-plan';

export const JOURNEY_PHASES: readonly JourneyPhase[] = [
  'identity',
  'assessment',
  'order',
  'collection',
  'results',
  'care-plan',
];

export const PHASE_LABELS: Record<JourneyPhase, string> = {
  identity: 'Identity',
  assessment: 'Assessment',
  order: 'Order',
  collection: 'Collection',
  results: 'Results',
  'care-plan': 'Care plan',
};

/** Who is expected to act in each phase. */
export const PHASE_ACTORS: Record<JourneyPhase, string> = {
  identity: 'Reception or doctor',
  assessment: 'Doctor',
  order: 'Doctor',
  collection: 'Nurse',
  results: 'Lab, then doctor',
  'care-plan': 'Doctor',
};

/** Identity as the platform can express it: two states, not three. */
export type IdentityState = 'unknown' | 'provisional' | 'verified';

/** Money, specimen, and result each advance on their own. */
export type PaymentState = 'none' | 'due' | 'paid' | 'deferred';
export type SampleState = 'none' | 'awaiting_collection' | 'collected' | 'received_at_lab';
export type ResultState = 'none' | 'pending' | 'released' | 'reviewed';

export type Episode = {
  patientId: string;
  patientName: string;
  identity: IdentityState;
  assessment?: ClinicalAssessment;
  indication?: OrderIndication;
  orderedTestCount: number;
  payment: PaymentState;
  sample: SampleState;
  result: ResultState;
  plan?: CarePlan;
};

export function newEpisode(patientId: string, patientName: string): Episode {
  return {
    patientId,
    patientName,
    identity: 'unknown',
    orderedTestCount: 0,
    payment: 'none',
    sample: 'none',
    result: 'none',
  };
}

/**
 * True when a phase has produced everything the next phase needs. Not "has
 * been visited" — an episode can pass through a screen without leaving
 * anything behind, and that must not count as progress.
 */
export function isPhaseComplete(episode: Episode, phase: JourneyPhase): boolean {
  switch (phase) {
    case 'identity':
      return episode.identity !== 'unknown';
    case 'assessment':
      return Boolean(episode.assessment && episode.indication);
    case 'order':
      return episode.orderedTestCount > 0 && episode.payment !== 'none';
    case 'collection':
      return episode.sample === 'collected' || episode.sample === 'received_at_lab';
    case 'results':
      return episode.result === 'released' || episode.result === 'reviewed';
    case 'care-plan':
      return Boolean(episode.plan && episode.plan.status === 'active');
  }
}

/** The first phase that has not produced its output yet. */
export function currentPhase(episode: Episode): JourneyPhase {
  return (
    JOURNEY_PHASES.find((phase) => !isPhaseComplete(episode, phase)) ?? 'care-plan'
  );
}

export type NextStep = {
  phase: JourneyPhase;
  actor: string;
  /** What has to happen, phrased as the action. */
  action: string;
  /** Why it cannot happen yet, when something is in the way. */
  blockedBy?: string;
};

/**
 * What comes next, and what is standing in the way. A blocked step is still
 * the next step: hiding it would lose the reason the episode has stopped.
 */
export function nextStep(episode: Episode): NextStep {
  const phase = currentPhase(episode);
  const base = { phase, actor: PHASE_ACTORS[phase] };

  switch (phase) {
    case 'identity':
      return { ...base, action: 'Verify the phone and open the patient record' };

    case 'assessment':
      return { ...base, action: 'Record the reason for visit and a working diagnosis' };

    case 'order': {
      if (!episode.indication) {
        return {
          ...base,
          action: 'Order the tests',
          blockedBy: 'No working diagnosis recorded yet',
        };
      }
      if (episode.orderedTestCount === 0) {
        return { ...base, action: 'Choose the tests this diagnosis needs' };
      }
      return { ...base, action: 'Set up collection and payment' };
    }

    case 'collection': {
      if (episode.sample === 'none') {
        return { ...base, action: 'Check the patient in and prepare the tubes' };
      }
      return { ...base, action: 'Draw the sample and confirm the tubes' };
    }

    case 'results': {
      if (episode.sample !== 'received_at_lab') {
        return {
          ...base,
          action: 'Wait for the lab to receive the samples',
          blockedBy: 'Samples have not reached the lab',
        };
      }
      if (episode.result === 'pending') {
        return { ...base, action: 'Wait for the lab to release the results' };
      }
      return { ...base, action: 'Review the released results with the patient' };
    }

    case 'care-plan':
      return {
        ...base,
        action: 'Sign the care plan so the next measurement is scheduled',
      };
  }
}

/**
 * The three axes as separate phrases, in reading order: money, specimen,
 * result. Kept separate from `axisSummary` so a translated surface can render
 * each phrase through its dictionary instead of keying a joined sentence.
 */
export function axisParts(episode: Episode): readonly [string, string, string] {
  const payment =
    episode.payment === 'none'
      ? 'No charge raised'
      : episode.payment === 'due'
        ? 'Payment due'
        : episode.payment === 'paid'
          ? 'Paid'
          : 'Payment deferred';

  const sample =
    episode.sample === 'none'
      ? 'No sample'
      : episode.sample === 'awaiting_collection'
        ? 'Awaiting collection'
        : episode.sample === 'collected'
          ? 'Collected'
          : 'Received at lab';

  const result =
    episode.result === 'none'
      ? 'No result'
      : episode.result === 'pending'
        ? 'In the lab'
        : episode.result === 'released'
          ? 'Released'
          : 'Reviewed';

  return [payment, sample, result];
}

/**
 * The honest one-liner about money: paid does not mean collected, and
 * collected does not mean a result exists. Rendered wherever an operator
 * might otherwise read one as the other.
 */
export function axisSummary(episode: Episode): string {
  return axisParts(episode).join(' · ');
}

/** Progress for the phase strip: complete, current, or not started. */
export type PhaseState = 'complete' | 'current' | 'upcoming';

export function phaseState(episode: Episode, phase: JourneyPhase): PhaseState {
  if (isPhaseComplete(episode, phase)) return 'complete';
  return currentPhase(episode) === phase ? 'current' : 'upcoming';
}
