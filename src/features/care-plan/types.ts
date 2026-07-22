/**
 * Care plan domain — where the journey stops being a transaction and becomes
 * ongoing care.
 *
 * TARGET CONTRACT, and a contested one. kura-platform puts care plans out of
 * v1 by name, ships the tab permanently disabled, and carries a test that
 * asserts the concept is absent. Nothing here maps to a wire message.
 *
 * A care plan is a longitudinal care-coordination contract — not a note, an
 * order, a prescription, a problem list, or a task board. Its spine:
 *
 *   Clinical focus → Goal → Intervention → Owner → Due → Evidence → Review
 *
 * The one rule that makes it more than a checklist: an intervention that
 * ordered a test cannot be completed by ticking a box. It completes when the
 * evidence exists, or when someone records why it never will.
 */

/** Lifecycle of the whole plan. Transitions are enforced in logic.ts. */
export type CarePlanStatus = 'draft' | 'active' | 'on-hold' | 'completed' | 'discontinued';

/**
 * One clinical thread the plan is managing, e.g. anaemia. `code` is ICD-10
 * when coded, '' while the focus is still an uncoded impression — the same
 * honesty the assessment keeps.
 */
export type ClinicalFocus = {
  id: string;
  code: string;
  label: string;
  /** How this focus entered the plan. */
  enrolledVia: 'consultation' | 'protocol';
  protocolKey?: ProtocolKey;
};

export type GoalStatus = 'on-track' | 'off-target' | 'met' | 'not-assessed';

/**
 * A measurable target. `trendKey` binds it to an analyte so a returning
 * result can be compared against the goal without a human re-keying it.
 */
export type Goal = {
  id: string;
  focusId: string;
  label: string;
  target: string;
  trendKey?: string;
  latest?: string;
  status: GoalStatus;
};

/**
 * What kind of work an intervention is. `lab` and `imaging` are the kinds
 * that produce evidence, so they are the kinds that cannot be ticked off.
 */
export type InterventionKind = 'lab' | 'imaging' | 'medication' | 'lifestyle' | 'referral';

export type InterventionStatus = 'planned' | 'in-progress' | 'complete' | 'cancelled';

/** Why an evidence-bearing intervention closed without its evidence. */
export type InterventionException = {
  reason: string;
  recordedBy: string;
};

export type Intervention = {
  id: string;
  focusId: string;
  kind: InterventionKind;
  label: string;
  detail?: string;
  owner: string;
  /** Human cadence or due phrase; never a computed calendar date. */
  due?: string;
  status: InterventionStatus;
  /** Set when the result or report that closes this intervention exists. */
  evidence?: string;
  exception?: InterventionException;
};

/** A repeat measurement the plan expects, expressed as a human cadence. */
export type MonitoringRule = {
  id: string;
  focusId: string;
  label: string;
  cadence: string;
  trendKey?: string;
  /** What an out-of-range value should prompt. Guidance, not automation. */
  escalation?: string;
};

export type CarePlanReview = {
  id: string;
  /** Human date label; the domain never reads a clock. */
  onLabel: string;
  by: string;
  note: string;
};

export type CarePlan = {
  id: string;
  patientId: string;
  title: string;
  status: CarePlanStatus;
  focuses: readonly ClinicalFocus[];
  goals: readonly Goal[];
  interventions: readonly Intervention[];
  monitoring: readonly MonitoringRule[];
  reviews: readonly CarePlanReview[];
  /** Cadence phrase for the next review, e.g. "3 months". */
  reviewCadence: string;
  /** Bumped once per signed change set, so a plan can be cited by version. */
  version: number;
  /** Required whenever the plan is paused. */
  holdReason?: string;
};

/* ── Protocols: content, not state ── */

export type ProtocolKey = 't2dm' | 'ckd' | 'htn' | 'anaemia';

export type ProtocolTarget = { label: string; target: string; trendKey?: string };

export type ProtocolStep = {
  label: string;
  kind: InterventionKind;
  cadence?: string;
  detail?: string;
};

/**
 * A named clinical programme. Enrolling copies it into the one living plan as
 * a new focus; it never creates a second plan alongside the first.
 */
export type ProtocolDefinition = {
  key: ProtocolKey;
  name: string;
  code: string;
  eligibility: string;
  targets: readonly ProtocolTarget[];
  steps: readonly ProtocolStep[];
  reviewCadence: string;
};

/* ── The care loop: a drafted change the doctor signs or edits ── */

export type LoopProposalKind =
  | 'focus'
  | 'goal'
  | 'repeat-lab'
  | 'medication'
  | 'follow-up'
  | 'instruction';

/**
 * One drafted line. `optional: false` marks the loop's spine — the parts that
 * define what the loop is for. Dropping them would leave a change that no
 * longer answers the finding that triggered it, so they cannot be dropped.
 */
export type LoopProposal = {
  id: string;
  kind: LoopProposalKind;
  label: string;
  detail?: string;
  optional: boolean;
};

export type LoopEvidence = {
  label: string;
  value: string;
  reference: string;
  /** Abnormality stated in words; colour is never the only signal. */
  flagLabel: string;
  tone: 'danger' | 'warning' | 'neutral';
};

/**
 * What the doctor reviews before signing. It is authored content with no
 * store behind it: a draft can never commit anything on its own.
 */
export type CareLoopDraft = {
  patientId: string;
  issueTitle: string;
  statusLabel: string;
  evidence: readonly LoopEvidence[];
  proposals: readonly LoopProposal[];
  focus: ClinicalFocus;
  reviewCadence: string;
};
