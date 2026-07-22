import type {
  CarePlan,
  CarePlanStatus,
  CareLoopDraft,
  Goal,
  Intervention,
  InterventionException,
  InterventionKind,
  InterventionStatus,
  LoopProposal,
  MonitoringRule,
  ProtocolDefinition,
} from './types';

/* ── Plan lifecycle ────────────────────────────────────────── */

/**
 * Legal plan transitions. A table rather than a set of writers: the prototype
 * this port came from exposed nine unguarded setters, so any status could
 * follow any other and "state machine" was only a comment.
 */
const PLAN_TRANSITIONS: Record<CarePlanStatus, readonly CarePlanStatus[]> = {
  draft: ['active', 'discontinued'],
  active: ['on-hold', 'completed', 'discontinued'],
  'on-hold': ['active', 'discontinued'],
  completed: [],
  discontinued: [],
};

export function canTransitionPlan(from: CarePlanStatus, to: CarePlanStatus): boolean {
  return PLAN_TRANSITIONS[from].includes(to);
}

export type PlanTransitionResult =
  | { ok: true; plan: CarePlan }
  | { ok: false; reason: string };

/**
 * Move the plan, or say why it cannot move. Pausing requires a reason: a plan
 * that stopped without a recorded cause cannot be safely resumed by someone
 * who was not there.
 */
export function transitionPlan(
  plan: CarePlan,
  to: CarePlanStatus,
  options: { holdReason?: string } = {},
): PlanTransitionResult {
  if (!canTransitionPlan(plan.status, to)) {
    return { ok: false, reason: `A ${plan.status} plan cannot become ${to}.` };
  }
  if (to === 'on-hold' && !options.holdReason?.trim()) {
    return { ok: false, reason: 'Pausing a plan needs a reason.' };
  }
  return {
    ok: true,
    plan: {
      ...plan,
      status: to,
      holdReason: to === 'on-hold' ? options.holdReason?.trim() : undefined,
    },
  };
}

/* ── Intervention completion: the evidence rule ────────────── */

/**
 * Kinds whose completion means "a result exists", not "someone is finished
 * thinking about it". Ticking these off by hand would let a plan report a
 * test as done when no sample was ever drawn.
 */
const EVIDENCE_REQUIRED_KINDS: ReadonlySet<InterventionKind> = new Set(['lab', 'imaging']);

export function requiresEvidence(kind: InterventionKind): boolean {
  return EVIDENCE_REQUIRED_KINDS.has(kind);
}

export type CompletionCheck = { ok: true } | { ok: false; reason: string };

export function canCompleteIntervention(intervention: Intervention): CompletionCheck {
  if (intervention.status === 'cancelled') {
    return { ok: false, reason: 'This step was cancelled.' };
  }
  if (!requiresEvidence(intervention.kind)) return { ok: true };
  if (intervention.evidence) return { ok: true };
  if (intervention.exception) return { ok: true };
  return {
    ok: false,
    reason: 'Waiting on the result. Record an exception if it will never arrive.',
  };
}

/** Complete an intervention, or leave it untouched and say what is missing. */
export function completeIntervention(
  intervention: Intervention,
): { ok: true; intervention: Intervention } | { ok: false; reason: string } {
  const check = canCompleteIntervention(intervention);
  if (!check.ok) return check;
  return { ok: true, intervention: { ...intervention, status: 'complete' } };
}

/** Close an evidence-bearing step that will never produce its evidence. */
export function recordException(
  intervention: Intervention,
  exception: InterventionException,
): Intervention {
  return { ...intervention, status: 'complete', exception };
}

/** Attach the result that closes a step, without completing it for the doctor. */
export function attachEvidence(intervention: Intervention, evidence: string): Intervention {
  return { ...intervention, evidence, status: 'in-progress' };
}

export function interventionStatusLabel(status: InterventionStatus): string {
  const labels: Record<InterventionStatus, string> = {
    planned: 'Planned',
    'in-progress': 'In progress',
    complete: 'Complete',
    cancelled: 'Cancelled',
  };
  return labels[status];
}

/* ── Cadence ───────────────────────────────────────────────── */

/**
 * "3 months (from 20 Jul)". Composed from the cadence phrase and an anchor
 * the caller supplies, never from the clock: a plan rendered twice must read
 * the same both times, in a story and in a test.
 */
export function nextDueFromCadence(cadence: string, anchorLabel: string): string {
  const phrase = cadence.trim();
  const anchor = anchorLabel.trim();
  if (phrase === '') return '';
  return anchor === '' ? phrase : `${phrase} (from ${anchor})`;
}

/* ── Derived views ─────────────────────────────────────────── */

export function goalsForFocus(plan: CarePlan, focusId: string): readonly Goal[] {
  return plan.goals.filter((goal) => goal.focusId === focusId);
}

export function interventionsForFocus(plan: CarePlan, focusId: string): readonly Intervention[] {
  return plan.interventions.filter((intervention) => intervention.focusId === focusId);
}

export function monitoringForFocus(plan: CarePlan, focusId: string): readonly MonitoringRule[] {
  return plan.monitoring.filter((rule) => rule.focusId === focusId);
}

/** Steps still waiting on a result — what the plan is actually blocked on. */
export function awaitingEvidence(plan: CarePlan): readonly Intervention[] {
  return plan.interventions.filter(
    (intervention) =>
      requiresEvidence(intervention.kind) &&
      intervention.status !== 'complete' &&
      intervention.status !== 'cancelled' &&
      !intervention.evidence,
  );
}

export function openInterventions(plan: CarePlan): readonly Intervention[] {
  return plan.interventions.filter(
    (intervention) => intervention.status === 'planned' || intervention.status === 'in-progress',
  );
}

/* ── The care loop ─────────────────────────────────────────── */

/** Spine proposals are the ones that answer the finding; they always commit. */
export function spineProposals(draft: CareLoopDraft): readonly LoopProposal[] {
  return draft.proposals.filter((proposal) => !proposal.optional);
}

export function optionalProposals(draft: CareLoopDraft): readonly LoopProposal[] {
  return draft.proposals.filter((proposal) => proposal.optional);
}

/**
 * The proposals that will be committed for a given doctor selection: the
 * spine, plus whichever optional lines were kept.
 */
export function proposalsToCommit(
  draft: CareLoopDraft,
  keptOptionalIds: ReadonlySet<string>,
): readonly LoopProposal[] {
  return draft.proposals.filter(
    (proposal) => !proposal.optional || keptOptionalIds.has(proposal.id),
  );
}

/**
 * Sign the draft into the plan. The draft carries no store and this is the
 * only path from proposal to plan, so nothing can be added to a patient's
 * care without a doctor passing through here.
 *
 * `anchorLabel` dates the follow-up in the doctor's words rather than the
 * clock's, keeping the result identical on every render.
 */
export function signCareLoop(
  plan: CarePlan,
  draft: CareLoopDraft,
  keptOptionalIds: ReadonlySet<string>,
  signedBy: string,
  anchorLabel: string,
): CarePlan {
  const committed = proposalsToCommit(draft, keptOptionalIds);
  const focusId = draft.focus.id;
  const hasFocus = plan.focuses.some((focus) => focus.id === focusId);

  const goals: Goal[] = [];
  const interventions: Intervention[] = [];
  const monitoring: MonitoringRule[] = [];

  committed.forEach((proposal, index) => {
    const id = `${focusId}-${proposal.kind}-${index + 1}`;
    if (proposal.kind === 'goal') {
      goals.push({
        id,
        focusId,
        label: proposal.label,
        target: proposal.detail ?? '',
        status: 'not-assessed',
      });
      return;
    }
    if (proposal.kind === 'repeat-lab') {
      monitoring.push({
        id,
        focusId,
        label: proposal.label,
        cadence: proposal.detail ?? draft.reviewCadence,
      });
      interventions.push({
        id: `${id}-order`,
        focusId,
        kind: 'lab',
        label: proposal.label,
        owner: signedBy,
        due: nextDueFromCadence(proposal.detail ?? draft.reviewCadence, anchorLabel),
        status: 'planned',
      });
      return;
    }
    if (proposal.kind === 'focus') return;
    interventions.push({
      id,
      focusId,
      kind:
        proposal.kind === 'medication'
          ? 'medication'
          : proposal.kind === 'follow-up'
            ? 'referral'
            : 'lifestyle',
      label: proposal.label,
      detail: proposal.detail,
      owner: signedBy,
      due: proposal.kind === 'follow-up' ? nextDueFromCadence(draft.reviewCadence, anchorLabel) : undefined,
      status: 'planned',
    });
  });

  return {
    ...plan,
    status: plan.status === 'draft' ? 'active' : plan.status,
    focuses: hasFocus ? plan.focuses : [...plan.focuses, draft.focus],
    goals: [...plan.goals, ...goals],
    interventions: [...plan.interventions, ...interventions],
    monitoring: [...plan.monitoring, ...monitoring],
    reviews: [
      ...plan.reviews,
      {
        id: `review-${plan.version + 1}`,
        onLabel: anchorLabel,
        by: signedBy,
        note: draft.issueTitle,
      },
    ],
    version: plan.version + 1,
  };
}

/* ── Protocols ─────────────────────────────────────────────── */

/**
 * Enrol a protocol as a new focus on the existing plan. A protocol is content:
 * it never becomes a second plan running beside the first, because a patient
 * has one plan and several threads within it.
 */
export function enrolProtocol(
  plan: CarePlan,
  protocol: ProtocolDefinition,
  owner: string,
  anchorLabel: string,
): CarePlan {
  const focusId = `focus-${protocol.key}`;
  if (plan.focuses.some((focus) => focus.id === focusId)) return plan;

  return {
    ...plan,
    focuses: [
      ...plan.focuses,
      {
        id: focusId,
        code: protocol.code,
        label: protocol.name,
        enrolledVia: 'protocol',
        protocolKey: protocol.key,
      },
    ],
    goals: [
      ...plan.goals,
      ...protocol.targets.map((target, index) => ({
        id: `${focusId}-goal-${index + 1}`,
        focusId,
        label: target.label,
        target: target.target,
        trendKey: target.trendKey,
        status: 'not-assessed' as const,
      })),
    ],
    interventions: [
      ...plan.interventions,
      ...protocol.steps.map((step, index) => ({
        id: `${focusId}-step-${index + 1}`,
        focusId,
        kind: step.kind,
        label: step.label,
        detail: step.detail,
        owner,
        due: step.cadence ? nextDueFromCadence(step.cadence, anchorLabel) : undefined,
        status: 'planned' as const,
      })),
    ],
    version: plan.version + 1,
  };
}
