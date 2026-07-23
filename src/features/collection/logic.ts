import { attemptOutcomeByIdOrNull, tubeByKey, VITAL_RANGES } from './catalog';
import type {
  ActualSample,
  AttemptOutcome,
  CollectionAttempt,
  CollectionDraft,
  CollectionPatient,
  CustodyEvent,
  EpisodeGates,
  ExpectedSpecimenPlanItem,
  LabelScanResult,
  PositiveIdentification,
  PreDrawChecks,
  RegisterDrawResult,
  SampleIssueReason,
  StationRole,
  TimerTone,
  VitalsValues,
} from './types';

/**
 * Pure collection rules. Every function takes explicit inputs (including
 * `now`) so behavior is deterministic in stories and tests.
 *
 * Three invariants this module exists to hold:
 *
 * 1. A sample is created only by `sampleFromRegistration`, from a backend
 *    verdict. There is no local path from "plan item" to "sample".
 * 2. A registered sample is never removed or reverted. A mistake becomes a
 *    reported issue and, if redrawn, a *new* sample that supersedes it.
 * 3. Collection closes only when every plan item is resolved — a registered
 *    sample with its label settled, or an attempt outcome with an owner —
 *    and custody has been handed to a named receiver.
 */

export const EMPTY_IDENTIFICATION: PositiveIdentification = {
  name: 'unanswered',
  dob: 'unanswered',
  unableToState: false,
};

export const EMPTY_CHECKS: PreDrawChecks = { fasting: false, allergy: false };

export function emptyDraft(): CollectionDraft {
  return {
    identity: EMPTY_IDENTIFICATION,
    checks: EMPTY_CHECKS,
    arm: 'L',
    site: 'Antecubital fossa',
    samples: [],
    attempts: [],
  };
}

// ── Gate 1: upstream episode ───────────────────────────────

export type EpisodeBlock =
  | 'booking_not_redeemed'
  | 'order_not_placed'
  | 'payment_not_settled';

/**
 * PSC collection is pay-before-draw. The block is stated, never silently
 * absorbed: a collector who draws an unpaid tube creates work nobody can bill.
 */
export function episodeBlocks(gates: EpisodeGates): EpisodeBlock[] {
  const blocks: EpisodeBlock[] = [];
  if (!gates.bookingRedeemed) blocks.push('booking_not_redeemed');
  if (!gates.orderPlaced) blocks.push('order_not_placed');
  if (gates.payment.required && !gates.payment.settled) blocks.push('payment_not_settled');
  return blocks;
}

// ── Gate 2: positive identification ────────────────────────

export type IdentityVerdict = 'pending' | 'confirmed' | 'mismatch' | 'needs_supervisor';

/**
 * The patient states their own name and date of birth; the collector compares
 * both against the order. A single "ID confirmed" tick proves nothing, and a
 * leading yes/no question invites a nod. A mismatch stops the draw — it is not
 * something the collector may override alone.
 */
export function identityVerdict(identity: PositiveIdentification): IdentityVerdict {
  if (identity.name === 'mismatch' || identity.dob === 'mismatch') return 'mismatch';
  if (identity.unableToState) {
    return identity.supervisorOverrideBy ? 'confirmed' : 'needs_supervisor';
  }
  if (identity.name === 'match' && identity.dob === 'match') return 'confirmed';
  return 'pending';
}

export function preDrawChecksComplete(checks: PreDrawChecks): boolean {
  return checks.fasting && checks.allergy;
}

export type DrawGate = {
  episodeBlocks: EpisodeBlock[];
  identity: IdentityVerdict;
  checksComplete: boolean;
  /** Whether any tube may be drawn at all right now. */
  canDraw: boolean;
};

export function drawGate(patient: CollectionPatient, draft: CollectionDraft): DrawGate {
  const blocks = episodeBlocks(patient.gates);
  const identity = identityVerdict(draft.identity);
  const checksComplete = preDrawChecksComplete(draft.checks);
  return {
    episodeBlocks: blocks,
    identity,
    checksComplete,
    canDraw: blocks.length === 0 && identity === 'confirmed' && checksComplete,
  };
}

// ── Plan → sample ──────────────────────────────────────────

export function sortPlanByDrawOrder(
  plan: readonly ExpectedSpecimenPlanItem[],
): ExpectedSpecimenPlanItem[] {
  return [...plan].sort(
    (a, b) => (tubeByKey(a.tube)?.order ?? 99) - (tubeByKey(b.tube)?.order ?? 99),
  );
}

export function sampleForPlanItem(
  samples: readonly ActualSample[],
  planItemId: string,
): ActualSample | undefined {
  return samples.find((sample) => sample.planItemId === planItemId);
}

/**
 * The tube that still counts for this plan item. A sample with a reported
 * issue is kept forever, but it no longer satisfies the order — so the item
 * goes back to open and must be redrawn or closed with an outcome.
 */
export function usableSampleForPlanItem(
  samples: readonly ActualSample[],
  planItemId: string,
): ActualSample | undefined {
  return samples.find((sample) => sample.planItemId === planItemId && !sample.issue);
}

/** Discarded tubes for this item, newest last. Kept for reconciliation. */
export function issuedSamplesForPlanItem(
  samples: readonly ActualSample[],
  planItemId: string,
): ActualSample[] {
  return samples.filter((sample) => sample.planItemId === planItemId && sample.issue);
}

export function attemptForPlanItem(
  attempts: readonly CollectionAttempt[],
  planItemId: string,
): CollectionAttempt | undefined {
  return attempts.find((attempt) => attempt.planItemId === planItemId);
}

export type PlanItemState = 'open' | 'drawn' | 'closed_without_sample';

export function planItemState(draft: CollectionDraft, planItemId: string): PlanItemState {
  if (usableSampleForPlanItem(draft.samples, planItemId)) return 'drawn';
  if (attemptForPlanItem(draft.attempts, planItemId)) return 'closed_without_sample';
  return 'open';
}

/** The next tube to draw: lowest CLSI order among still-open plan items. */
export function nextPlanItem(
  plan: readonly ExpectedSpecimenPlanItem[],
  draft: CollectionDraft,
): ExpectedSpecimenPlanItem | undefined {
  return sortPlanByDrawOrder(plan).find((item) => planItemState(draft, item.id) === 'open');
}

/**
 * The idempotency key for a draw registration. A retry after a timeout must
 * carry the same key, or the retry becomes a second tube.
 */
export function drawIdempotencyKey(patient: CollectionPatient, planItemId: string): string {
  return `${patient.orderId}:${planItemId}`;
}

/**
 * Turns a backend registration verdict into the sample it created. A sample is
 * born at `collected`: there is no earlier state for a tube that exists.
 */
export function sampleFromRegistration(input: {
  planItem: ExpectedSpecimenPlanItem;
  sampleId: string;
  now: number;
  drawnBy: string;
  site: string;
}): ActualSample {
  const tube = tubeByKey(input.planItem.tube);
  return {
    sampleId: input.sampleId,
    planItemId: input.planItem.id,
    tube: input.planItem.tube,
    tests: input.planItem.tests,
    volumeMl: input.planItem.volumeMl,
    stat: input.planItem.stat,
    drawnAtMs: input.now,
    drawnAtLabel: formatClock(input.now),
    drawnBy: input.drawnBy,
    site: input.site,
    inverted: false,
    label: { state: 'not_printed' },
    readyToProcessAtMs: tube?.minimumClotMinutes
      ? input.now + tube.minimumClotMinutes * 60 * 1000
      : null,
    processByMs: tube?.processWithinMinutes
      ? input.now + tube.processWithinMinutes * 60 * 1000
      : null,
  };
}

/** Applies a registration verdict to the draft. Only `registered` adds a tube. */
export function applyRegistration(
  draft: CollectionDraft,
  input: {
    planItem: ExpectedSpecimenPlanItem;
    result: RegisterDrawResult;
    now: number;
    drawnBy: string;
  },
): CollectionDraft {
  const result = input.result;
  if (result.kind !== 'registered' && result.kind !== 'duplicate') return draft;
  // A duplicate is the same tube coming back from a replayed request, so it
  // must not create a second sample.
  if (draft.samples.some((sample) => sample.sampleId === result.sampleId)) return draft;
  // A redraw supersedes the discarded tube rather than replacing it: the lab
  // may still physically receive both, and only the link says which is which.
  const superseded = issuedSamplesForPlanItem(draft.samples, input.planItem.id).find(
    (sample) => !sample.issue?.supersededBySampleId,
  );
  return {
    ...draft,
    samples: [
      ...draft.samples.map((sample) =>
        superseded && sample.sampleId === superseded.sampleId && sample.issue
          ? { ...sample, issue: { ...sample.issue, supersededBySampleId: result.sampleId } }
          : sample,
      ),
      sampleFromRegistration({
        planItem: input.planItem,
        sampleId: result.sampleId,
        now: input.now,
        drawnBy: input.drawnBy,
        site: `${draft.arm === 'L' ? 'Left' : 'Right'} · ${draft.site}`,
      }),
    ],
  };
}

export function markInverted(draft: CollectionDraft, sampleId: string): CollectionDraft {
  return {
    ...draft,
    samples: draft.samples.map((sample) =>
      sample.sampleId === sampleId ? { ...sample, inverted: true } : sample,
    ),
  };
}

// ── Labels ─────────────────────────────────────────────────

export function markLabelPrinted(
  draft: CollectionDraft,
  sampleId: string,
  now: number,
): CollectionDraft {
  return {
    ...draft,
    samples: draft.samples.map((sample) =>
      sample.sampleId === sampleId
        ? { ...sample, label: { ...sample.label, state: 'printed', printedAtMs: now } }
        : sample,
    ),
  };
}

export function markLabelVerified(
  draft: CollectionDraft,
  sampleId: string,
  now: number,
): CollectionDraft {
  return {
    ...draft,
    samples: draft.samples.map((sample) =>
      sample.sampleId === sampleId
        ? { ...sample, label: { ...sample.label, state: 'verified', verifiedAtMs: now } }
        : sample,
    ),
  };
}

/**
 * Handwriting is a real fallback for a clinic whose printer is down, but it is
 * recorded as one: nothing downstream can machine-read a pen stroke, so
 * accession has to relabel the tube.
 */
export function markLabelManual(
  draft: CollectionDraft,
  sampleId: string,
  reason: string,
): CollectionDraft {
  return {
    ...draft,
    samples: draft.samples.map((sample) =>
      sample.sampleId === sampleId
        ? { ...sample, label: { state: 'manual_fallback', manualReason: reason } }
        : sample,
    ),
  };
}

export function labelResolved(sample: ActualSample): boolean {
  return sample.label.state === 'verified' || sample.label.state === 'manual_fallback';
}

/** Scanning a label back: it must match the sample it was printed for. */
export function resolveLabelScan(
  samples: readonly ActualSample[],
  expectedSampleId: string,
  raw: string,
): LabelScanResult {
  const scanned = raw.trim();
  if (!scanned) return { kind: 'unknown' };
  if (scanned === expectedSampleId) return { kind: 'verified', sampleId: scanned };
  const other = samples.find((sample) => sample.sampleId === scanned);
  if (other) return { kind: 'wrong_sample', sampleId: other.sampleId };
  return { kind: 'unknown' };
}

// ── Attempts and issues ────────────────────────────────────

export function recordAttempt(
  draft: CollectionDraft,
  input: {
    planItemId: string;
    outcome: AttemptOutcome;
    note?: string;
    now: number;
    recordedBy: string;
  },
): CollectionDraft {
  const spec = attemptOutcomeByIdOrNull(input.outcome);
  const attempt: CollectionAttempt = {
    planItemId: input.planItemId,
    outcome: input.outcome,
    owner: spec?.owner ?? 'collector',
    nextAction: spec?.nextAction ?? '',
    note: input.note || undefined,
    recordedAtMs: input.now,
    recordedBy: input.recordedBy,
  };
  return {
    ...draft,
    attempts: [
      ...draft.attempts.filter((existing) => existing.planItemId !== input.planItemId),
      attempt,
    ],
  };
}

/** Reopening is allowed only while no usable tube exists for the item. */
export function reopenPlanItem(draft: CollectionDraft, planItemId: string): CollectionDraft {
  if (usableSampleForPlanItem(draft.samples, planItemId)) return draft;
  return {
    ...draft,
    attempts: draft.attempts.filter((attempt) => attempt.planItemId !== planItemId),
  };
}

/**
 * A tube that exists and turned out to be unusable. The sample is not deleted:
 * it keeps its identity and gains a reason, so the history stays honest and
 * accession can reconcile what physically arrives.
 */
export function reportSampleIssue(
  draft: CollectionDraft,
  input: {
    sampleId: string;
    reason: SampleIssueReason;
    note?: string;
    now: number;
    reportedBy: string;
  },
): CollectionDraft {
  return {
    ...draft,
    samples: draft.samples.map((sample) =>
      sample.sampleId === input.sampleId
        ? {
            ...sample,
            issue: {
              reason: input.reason,
              note: input.note || undefined,
              reportedAtMs: input.now,
              reportedBy: input.reportedBy,
            },
          }
        : sample,
    ),
  };
}

// ── Completion ─────────────────────────────────────────────

export type CompletionGate = {
  planTotal: number;
  drawnCount: number;
  closedCount: number;
  openCount: number;
  /** Registered samples whose label is neither verified nor an explicit fallback. */
  labelsPending: number;
  inversionsPending: number;
  custodyDone: boolean;
  /** Every plan item resolved and every label settled. */
  readyForHandoff: boolean;
  canComplete: boolean;
};

export function completionGate(
  plan: readonly ExpectedSpecimenPlanItem[],
  draft: CollectionDraft,
): CompletionGate {
  const usable = draft.samples.filter((sample) => !sample.issue);
  const openCount = plan.filter((item) => planItemState(draft, item.id) === 'open').length;
  const drawnCount = plan.filter((item) => planItemState(draft, item.id) === 'drawn').length;
  const closedCount = plan.filter(
    (item) => planItemState(draft, item.id) === 'closed_without_sample',
  ).length;
  const labelsPending = usable.filter((sample) => !labelResolved(sample)).length;
  const inversionsPending = usable.filter((sample) => {
    const tube = tubeByKey(sample.tube);
    return (tube?.inversions ?? 0) > 0 && !sample.inverted;
  }).length;
  const readyForHandoff = openCount === 0 && labelsPending === 0 && inversionsPending === 0;

  return {
    planTotal: plan.length,
    drawnCount,
    closedCount,
    openCount,
    labelsPending,
    inversionsPending,
    custodyDone: Boolean(draft.custody),
    // "Collection complete" is not "received at the lab": the tubes must have a
    // named next holder before this station lets go of them.
    readyForHandoff,
    canComplete: readyForHandoff && Boolean(draft.custody),
  };
}

export function recordCustody(
  draft: CollectionDraft,
  input: { fromActor: string; toActor: string; location: string; now: number },
): CollectionDraft {
  const custody: CustodyEvent = {
    sampleIds: draft.samples.filter((sample) => !sample.issue).map((sample) => sample.sampleId),
    fromActor: input.fromActor,
    toActor: input.toActor,
    location: input.location,
    atMs: input.now,
  };
  return { ...draft, custody };
}

// ── Timing ─────────────────────────────────────────────────

export type SampleTiming =
  | { phase: 'none' }
  /** Standing to clot; it may not be processed yet. */
  | { phase: 'resting'; remainingMs: number }
  /** Ready to process, with time left before the deadline. */
  | { phase: 'ready'; remainingMs: number | null }
  | { phase: 'overdue'; overdueMs: number };

export function sampleTiming(sample: ActualSample, now: number): SampleTiming {
  if (sample.readyToProcessAtMs && now < sample.readyToProcessAtMs) {
    return { phase: 'resting', remainingMs: sample.readyToProcessAtMs - now };
  }
  if (!sample.processByMs) return { phase: 'none' };
  const remaining = sample.processByMs - now;
  if (remaining <= 0) return { phase: 'overdue', overdueMs: -remaining };
  return { phase: 'ready', remainingMs: remaining };
}

export function timingTone(timing: SampleTiming): TimerTone | null {
  if (timing.phase === 'overdue') return 'danger';
  if (timing.phase === 'resting') return null;
  if (timing.phase === 'ready' && timing.remainingMs != null) {
    if (timing.remainingMs < 10 * 60 * 1000) return 'danger';
    if (timing.remainingMs < 30 * 60 * 1000) return 'warn';
    return 'success';
  }
  return null;
}

export function formatCountdown(ms: number | null): string {
  if (ms == null) return '—';
  const clamped = Math.max(0, ms);
  const minutes = Math.floor(clamped / 60000);
  const seconds = Math.floor((clamped % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatClock(ms: number): string {
  const date = new Date(ms);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/** The tightest deadline in the batch — what the handoff is actually racing. */
export function earliestProcessBy(samples: readonly ActualSample[]): number | null {
  const deadlines = samples
    .filter((sample) => !sample.issue && sample.processByMs)
    .map((sample) => sample.processByMs as number);
  return deadlines.length ? Math.min(...deadlines) : null;
}

// ── Queue ──────────────────────────────────────────────────

/**
 * Booth queue order: STAT first, then booked appointments, then walk-ins.
 * Waiting time only breaks ties inside a band — sorting purely by wait puts a
 * routine 90-minute walk-in ahead of a STAT patient who just arrived.
 */
export function queueForRole(
  queue: readonly CollectionPatient[],
  role: StationRole,
): CollectionPatient[] {
  return queue
    .filter((patient) =>
      role === 'phlebotomy' ? patient.journey.phlebo !== 'done' : patient.journey.vitals !== 'done',
    )
    .sort((a, b) => queueBand(a) - queueBand(b) || b.waitingMinutes - a.waitingMinutes);
}

function queueBand(patient: CollectionPatient): number {
  if (patient.stat) return 0;
  return patient.appointmentAt ? 1 : 2;
}

export function waitTone(waitingMinutes: number): TimerTone | null {
  if (waitingMinutes > 60) return 'danger';
  if (waitingMinutes > 30) return 'warn';
  return null;
}

/**
 * Separators are presentation, not identity: a wristband prints `P-8842`, a
 * scanner may emit `P8842`, and an operator typing under time pressure may do
 * either. Comparing on alphanumerics only keeps all three the same patient
 * while staying an exact match — no prefix or substring guessing, which would
 * risk pulling up the wrong record. Loading an episode is not identification.
 */
export function findPatientByPid(
  queue: readonly CollectionPatient[],
  raw: string,
): CollectionPatient | undefined {
  const pid = normalizePid(raw);
  if (!pid) return undefined;
  return queue.find((patient) => normalizePid(patient.pid) === pid);
}

function normalizePid(value: string): string {
  return value.replace(/[^a-z0-9]/gi, '').toUpperCase();
}

// ── Vitals ─────────────────────────────────────────────────

export const VITALS_REQUIRED: Array<keyof VitalsValues> = [
  'heightCm',
  'weightKg',
  'hr',
  'bpSys',
  'bpDia',
];

export function fieldOutOfRange(
  field: keyof typeof VITAL_RANGES,
  raw: string,
  tempUnit: 'C' | 'F',
): boolean {
  if (raw === '' || raw == null) return false;
  let value = Number(raw);
  if (Number.isNaN(value)) return false;
  if (field === 'tempC' && tempUnit === 'F') {
    value = ((value - 32) * 5) / 9;
  }
  const range = VITAL_RANGES[field];
  return value < range[0] || value > range[1];
}

export function outOfRangeFields(values: VitalsValues): string[] {
  return (Object.keys(VITAL_RANGES) as Array<keyof typeof VITAL_RANGES>).filter((field) =>
    fieldOutOfRange(field, String(values[field as keyof VitalsValues] ?? ''), values.tempUnit),
  );
}

export function vitalsGate(values: VitalsValues, confirmAbnormal: boolean) {
  const requiredFilled = VITALS_REQUIRED.every(
    (key) => values[key] !== '' && values[key] != null,
  );
  const oorFields = outOfRangeFields(values);
  return {
    requiredFilled,
    oorFields,
    canSubmit: requiredFilled && (oorFields.length === 0 || confirmAbnormal),
  };
}

export function calcBmi(heightCm: string, weightKg: string): number | null {
  const height = parseFloat(heightCm);
  const weight = parseFloat(weightKg);
  if (!height || !weight) return null;
  const meters = height / 100;
  return Math.round((weight / (meters * meters)) * 10) / 10;
}

export function bmiCategory(bmi: number): { label: string; tone: 'info' | 'success' | 'warning' | 'danger' } {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'info' };
  if (bmi <= 24.9) return { label: 'Normal', tone: 'success' };
  if (bmi <= 29.9) return { label: 'Overweight', tone: 'warning' };
  return { label: 'Obese', tone: 'danger' };
}

export const EMPTY_VITALS: VitalsValues = {
  heightCm: '',
  weightKg: '',
  hr: '',
  bpSys: '',
  bpDia: '',
  tempC: '',
  tempUnit: 'C',
  spo2: '',
  breathing: '',
  painVas: 0,
  fasting: null,
  vaccinationNote: '',
};
