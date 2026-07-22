import { SENSITIVE_TEST_PATTERN, type CatalogEntry } from './catalog';
import { addMinor, multiplyMinor, subtractMinorFloor } from './money';
import { isLiveLicence } from '../licence/logic';
import type {
  BookingBlockReason,
  BookingSummary,
  BookingTimelineEvent,
  Cart,
  DeskVisit,
  VisitStage,
  CartItem,
  CartPayment,
  CollectionCodeStatus,
  CollisionCandidate,
  CollisionSignal,
  EligibilityResult,
  FrontDeskPatient,
  IntakeFields,
  LineConsent,
  Prescriber,
  Promo,
  VisitPaymentFact,
  StepId,
  StepStatus,
  TrustSignal,
  WizardGate,
} from './types';

/**
 * Front-desk rules, ported verbatim from the validated receptionist prototype
 * census. Pure and deterministic — async ceremonies (OTP send, eligibility
 * probe, Bakong webhook) are simulated in components, decided here.
 */

// ── Wizard gate engine ─────────────────────────────────────

export function wizardGate(patient: FrontDeskPatient): WizardGate {
  const hasName = patient.name.trim() !== '';
  const hasIdentitySource = patient.identity.source !== null;
  const hasDob = patient.dob !== '';
  const hasSex = patient.sexAtBirth !== '';
  // Trusted-desk door: verification is assurance, never a hard gate — an
  // unverified visit passes only with a recorded reason.
  const hasContact =
    patient.otpVerified || patient.telegramVerified || patient.unverifiedReason !== null;
  const itemCount = patient.cart.items.length;
  const teleInCart = patient.cart.items.some((item) => item.kind === 'telecon');
  const teleResolved =
    patient.teleconsult.status === 'booked' ||
    patient.teleconsult.status === 'waived' ||
    !teleInCart;
  const paid = patient.cart.payment.status === 'confirmed';
  const payLater =
    patient.cart.payment.status === 'deferred' ||
    patient.cart.payment.status === 'pending-claim';
  const noCharge = patient.cart.payment.status === 'no-charge';

  // Name lives on Step 2's required field, not Step 1. Gating Step 1 on
  // hasName too deadlocked any phone- or code-only capture (no name typed
  // yet): no way back to the one screen that can enter it.
  const step1Done = hasIdentitySource;
  const step2Done = step1Done && hasName && hasDob && hasSex && hasContact;
  const step3Done = step2Done && (patient.insuranceAcked || patient.insurance.length > 0);
  const step4Done = step3Done && itemCount > 0;
  const step5Done = step4Done && teleResolved;
  const step6Done = step5Done && (paid || payLater || noCharge);

  const doneFlags: Record<StepId, boolean> = {
    1: step1Done,
    2: step2Done,
    3: step3Done,
    4: step4Done,
    5: step5Done,
    6: step6Done,
  };

  const stepStatus = {} as Record<StepId, StepStatus>;
  for (const step of [1, 2, 3, 4, 5, 6] as StepId[]) {
    const priorDone = step === 1 ? true : doneFlags[(step - 1) as StepId];
    stepStatus[step] = !priorDone ? 'locked' : doneFlags[step] ? 'done' : 'active';
  }

  return {
    stepStatus,
    step1Done,
    step2Done,
    step3Done,
    step4Done,
    step5Done,
    step6Done,
    paid,
    payLater,
    isReadyToCheckIn: step6Done,
  };
}

/**
 * The one derived state the identity strip shows, or null when the visit is
 * simply mid-flow. A badge that says "in progress" on a six-step wizard adds
 * nothing the stepper does not already show, and repeating a step title in
 * the header is duplication — so this speaks only when it carries a fact:
 * no identity yet, a recorded unverified channel, or everything resolved.
 */
export function checkInStatus(
  patient: FrontDeskPatient,
  gate: WizardGate,
): { label: string; variant: 'success' | 'warning' | 'info' } | undefined {
  if (patient.identity.source === null) {
    return { label: 'Awaiting identity', variant: 'info' };
  }
  if (gate.isReadyToCheckIn) {
    return { label: 'Ready to check in', variant: 'success' };
  }
  if (patient.unverifiedReason !== null) {
    return { label: 'Contact unverified', variant: 'warning' };
  }
  return undefined;
}

export function canNavigateToStep(stepId: StepId, currentStep: StepId, gate: WizardGate): boolean {
  if (stepId === currentStep || gate.stepStatus[stepId] === 'locked') return false;
  if (gate.stepStatus[stepId] === 'done' || stepId < currentStep) return true;
  if (stepId === currentStep + 1) {
    const doneKey = `step${currentStep}Done` as keyof WizardGate;
    return Boolean(gate[doneKey]);
  }
  return false;
}

/** First not-done step — where a reopened patient lands. */
export function inferStep(gate: WizardGate): StepId {
  for (const step of [1, 2, 3, 4, 5, 6] as StepId[]) {
    if (gate.stepStatus[step] !== 'done') return step;
  }
  return 6;
}

// ── Patient collision detection ────────────────────────────

function normalisePersonName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function phoneDigits(value: string): string {
  return (value || '').replace(/\D/g, '');
}

/** Suffix-tolerant phone match; under 8 digits is never a match. */
export function phonesMatch(a: string, b: string): boolean {
  const da = phoneDigits(a);
  const db = phoneDigits(b);
  if (da.length < 8 || db.length < 8) return false;
  return da === db || da.endsWith(db) || db.endsWith(da);
}

const COLLISION_SCORE: Record<CollisionSignal, number> = {
  idMatch: 100,
  nameDobMatch: 46,
  phoneMatch: 34,
  sexMatch: 8,
  sexMismatch: -12,
};

function collisionStrength(signals: CollisionSignal[]): string {
  const has = (signal: CollisionSignal) => signals.includes(signal);
  if (has('idMatch')) return 'Exact ID match';
  if (has('phoneMatch') && has('nameDobMatch') && has('sexMatch')) return 'Exact identity match';
  if (has('phoneMatch') && has('nameDobMatch')) return 'Strong identity match';
  if (has('nameDobMatch') && has('sexMatch')) return 'Likely duplicate';
  return 'Possible duplicate';
}

export function findCollisionCandidates(
  draft: FrontDeskPatient,
  patients: FrontDeskPatient[],
): CollisionCandidate[] {
  const draftName = normalisePersonName(draft.name);
  const draftPhone = draft.countryCode + draft.phoneNumber;
  if (!draftName) return [];

  return patients
    .filter((candidate) => candidate.id !== draft.id && candidate.name.trim() !== '')
    .map((candidate) => {
      const signals: CollisionSignal[] = [];
      if (draft.idNumber && candidate.idNumber && draft.idNumber === candidate.idNumber) {
        signals.push('idMatch');
      }
      if (
        draftName &&
        draft.dob &&
        candidate.dob &&
        draftName === normalisePersonName(candidate.name) &&
        draft.dob === candidate.dob
      ) {
        signals.push('nameDobMatch');
      }
      if (phonesMatch(draftPhone, candidate.countryCode + candidate.phoneNumber)) {
        signals.push('phoneMatch');
      }
      if (draft.sexAtBirth && candidate.sexAtBirth) {
        signals.push(draft.sexAtBirth === candidate.sexAtBirth ? 'sexMatch' : 'sexMismatch');
      }

      const isDuplicateRisk =
        signals.includes('idMatch') ||
        signals.includes('phoneMatch') ||
        signals.includes('nameDobMatch');

      return isDuplicateRisk
        ? {
            patient: candidate,
            signals,
            score: signals.reduce((sum, signal) => sum + COLLISION_SCORE[signal], 0),
            strength: collisionStrength(signals),
          }
        : null;
    })
    .filter((candidate): candidate is CollisionCandidate => candidate !== null)
    .filter((candidate) => !draft.collisionAcked.includes(candidate.patient.id))
    .sort((a, b) => b.score - a.score);
}

const MATCH_SIGNAL_LABEL: Record<CollisionSignal, string | null> = {
  idMatch: 'National ID',
  nameDobMatch: 'Name + DOB',
  phoneMatch: 'Phone',
  sexMatch: null,
  sexMismatch: null,
};

/** "Matched on National ID + Phone" — evidence the desk can verify aloud. */
export function matchedOnLabel(signals: CollisionSignal[]): string | null {
  const parts = signals
    .map((signal) => MATCH_SIGNAL_LABEL[signal])
    .filter((label): label is string => label !== null);
  return parts.length > 0 ? `Matched on ${parts.join(' + ')}` : null;
}

/**
 * Supervisor override PIN gate: at least four digits. The override itself is
 * a logged decision (who + when), not a silent bypass.
 */
export function collisionOverridePinValid(pin: string): boolean {
  return /^\d{4,}$/.test(pin.trim());
}

/**
 * Editing any identity field re-arms acknowledged duplicate warnings — an
 * ack applies to the identity it was made against, not the person forever.
 */
export function identityEditClearsAcks(
  prev: Pick<FrontDeskPatient, 'name' | 'dob' | 'sexAtBirth' | 'idNumber' | 'phoneNumber'>,
  next: Pick<FrontDeskPatient, 'name' | 'dob' | 'sexAtBirth' | 'idNumber' | 'phoneNumber'>,
): boolean {
  return (
    prev.name !== next.name ||
    prev.dob !== next.dob ||
    prev.sexAtBirth !== next.sexAtBirth ||
    prev.idNumber !== next.idNumber ||
    prev.phoneNumber !== next.phoneNumber
  );
}

/**
 * Trust facts for a resolved record. Worst tone leads the line. Verification
 * recency is a PROTOTYPE reading — patient-ms stores assurance only.
 */
export function trustSignalsFor(record: PatientRecordSummary): TrustSignal[] {
  const signals: TrustSignal[] = [];
  if (record.assurance === 'verified' && record.phoneVerifiedMonthsAgo !== undefined) {
    if (record.phoneVerifiedMonthsAgo > 12) {
      signals.push({
        label: `Phone last verified ${record.phoneVerifiedMonthsAgo} months ago`,
        tone: 'warning',
      });
    } else {
      signals.push({
        label:
          record.phoneVerifiedMonthsAgo <= 0
            ? 'Phone verified today'
            : `Phone verified ${record.phoneVerifiedMonthsAgo} month${record.phoneVerifiedMonthsAgo === 1 ? '' : 's'} ago`,
        tone: 'success',
      });
    }
  } else if (record.assurance === 'verified') {
    signals.push({ label: 'Identity verified', tone: 'success' });
  } else if (record.phone) {
    signals.push({ label: 'Phone on file · unverified', tone: 'neutral' });
  } else {
    signals.push({ label: 'No verified channel', tone: 'danger' });
  }
  if (!record.registeredHere) {
    signals.push({ label: 'Known in Kura · other PSC', tone: 'info' });
  }
  return signals;
}

/** Mock insurer verdict keyed off the policy number's last character. */
export function mockEligibility(policyNumber: string): EligibilityResult {
  const last = policyNumber.trim().slice(-1);
  if (last === '9') return { kind: 'unreachable' };
  if (last === '0') return { kind: 'ineligible' };
  return {
    kind: 'eligible',
    tier: 'Gold',
    coveragePct: 80,
    copayMinor: '500',
    activeUntil: '2027-12-31',
    group: 'CORP-90021',
    preAuth: 'not-required',
    effectiveFrom: '2024-01-01',
    verifiedAtLabel: 'Verified now · instant check passed',
  };
}

// ── Cart math ──────────────────────────────────────────────

export type CartTotals = {
  subtotalMinor: string;
  /** Total promo discount already reflected in `patientDueMinor`. */
  discountMinor: string;
  patientDueMinor: string;
  currencyCode: 'USD';
};

export type PromoLine = { code: string; label: string; amountMinor: string };

/**
 * Promo discounts in the legacy money order — item promos first, then fixed
 * amounts, then percentages — each computed against the running remainder so
 * a percentage never discounts money an earlier promo already removed.
 * PROTOTYPE SURFACE: kura-platform has no promo engine.
 */
export function promoLines(cart: Cart): PromoLine[] {
  const promos = cart.promos ?? [];
  if (promos.length === 0) return [];
  const subtotal = BigInt(
    addMinor(cart.items.map((item) => multiplyMinor(item.priceMinor, item.qty))),
  );
  const rank: Record<Promo['kind'], number> = { item: 0, fixed: 1, percent: 2 };
  const ordered = [...promos].sort((a, b) => rank[a.kind] - rank[b.kind]);

  let remainder = subtotal;
  const lines: PromoLine[] = [];
  for (const promo of ordered) {
    let discount = 0n;
    if (promo.kind === 'item') {
      const line = cart.items.find((item) => item.id === promo.itemId);
      if (line) {
        const lineTotal = BigInt(multiplyMinor(line.priceMinor, line.qty));
        discount = (lineTotal * BigInt(clampPct(promo.percentOff))) / 100n;
      }
    } else if (promo.kind === 'fixed') {
      discount = BigInt(promo.amountMinor);
    } else {
      discount = (remainder * BigInt(clampPct(promo.percentOff))) / 100n;
    }
    if (discount > remainder) discount = remainder;
    if (discount < 0n) discount = 0n;
    remainder -= discount;
    lines.push({ code: promo.code, label: promo.label, amountMinor: discount.toString() });
  }
  return lines;
}

function clampPct(pct: number): number {
  return Math.max(0, Math.min(100, Math.floor(pct)));
}

export function cartTotals(cart: Cart): CartTotals {
  const subtotalMinor = addMinor(
    cart.items.map((item) => multiplyMinor(item.priceMinor, item.qty)),
  );
  const discountMinor = addMinor(promoLines(cart).map((line) => line.amountMinor));
  return {
    subtotalMinor,
    discountMinor,
    patientDueMinor: subtractMinorFloor(subtotalMinor, discountMinor),
    currencyCode: 'USD',
  };
}

export function paymentDueAmountMinor(cart: Cart, totals: CartTotals): string {
  if (cart.payment.supplementalDue) {
    return subtractMinorFloor(
      totals.patientDueMinor,
      cart.payment.previousPaidAmountMinor ?? '0',
    );
  }
  return totals.patientDueMinor;
}

// ── Payment transitions ────────────────────────────────────

export function confirmedPayment(
  payment: CartPayment,
  method: 'cash' | 'khqr' | 'split',
  amountMinor: string,
  context: { receiptId: string; confirmedAt: string; cashier: string; tenderedMinor?: string },
): CartPayment {
  if (payment.status === 'confirmed') return payment;
  return {
    ...payment,
    status: 'confirmed',
    method,
    amountMinor,
    receiptId: context.receiptId,
    confirmedAt: context.confirmedAt,
    cashier: context.cashier,
    changeMinor:
      method === 'cash' && context.tenderedMinor != null
        ? subtractMinorFloor(context.tenderedMinor, amountMinor)
        : '0',
  };
}

/**
 * Editing a paid cart: void reissues from zero; supplemental keeps the paid
 * amount and collects only the difference. Never silently mutate a receipt.
 */
export function paymentAfterPaidEdit(
  payment: CartPayment,
  mode: 'normal' | 'void' | 'supplemental',
): CartPayment {
  if (mode === 'normal') return payment;

  const reset: CartPayment = {
    status: 'idle',
    method: null,
    tendered: '',
    changeMinor: '0',
    receiptId: null,
    confirmedAt: null,
    amountMinor: null,
  };

  if (mode === 'void') {
    return {
      ...reset,
      supplementalDue: false,
      previousReceiptId: null,
      previousPaidAmountMinor: '0',
      voidedReceiptId: payment.receiptId,
    };
  }

  return {
    ...reset,
    supplementalDue: true,
    previousReceiptId: payment.receiptId,
    previousPaidAmountMinor: payment.amountMinor ?? '0',
  };
}

// ── Intake review (8 sections) ─────────────────────────────

export type IntakeSection = {
  key: string;
  /** The IntakeFields entry this section writes to — never derived from `key`. */
  fieldKey: keyof IntakeFields;
  label: string;
  filled: boolean;
  preview: string;
};

export function intakeSections(
  fields: IntakeFields,
  visitReason: string[],
  cartItems: CartItem[],
  sexAtBirth: FrontDeskPatient['sexAtBirth'],
): IntakeSection[] {
  const sensitiveItems = cartItems.filter(
    (item) => item.kind === 'imaging' || SENSITIVE_TEST_PATTERN.test(item.name),
  );
  const femaleRequired = sexAtBirth === 'Female';
  const womenFilled = !femaleRequired || fields.womensHealth.trim() !== '';
  const sensitiveFilled = sensitiveItems.length === 0 || fields.sensitiveConsent.trim() !== '';

  return [
    {
      key: 'today',
      fieldKey: 'chiefComplaint',
      label: "Today's visit",
      filled: visitReason.length > 0 && fields.chiefComplaint.trim() !== '',
      preview: [visitReason.join(' · '), fields.chiefComplaint].filter(Boolean).join(' · '),
    },
    { key: 'prep', fieldKey: 'preTestPrep', label: 'Pre-test prep', filled: fields.preTestPrep.trim() !== '', preview: fields.preTestPrep },
    {
      key: 'medications',
      fieldKey: 'medications',
      label: 'Medications & supplements',
      filled: fields.medications.trim() !== '',
      preview: fields.medications,
    },
    {
      key: 'womensHealth',
      fieldKey: 'womensHealth',
      label: "Women's health",
      filled: womenFilled,
      preview: femaleRequired ? fields.womensHealth : 'Not applicable',
    },
    {
      key: 'recentEvents',
      fieldKey: 'recentEvents',
      label: 'Recent health events',
      filled: fields.recentEvents.trim() !== '',
      preview: fields.recentEvents,
    },
    { key: 'lifestyle', fieldKey: 'lifestyle', label: 'Lifestyle snapshot', filled: fields.lifestyle.trim() !== '', preview: fields.lifestyle },
    {
      key: 'sampleComfort',
      fieldKey: 'sampleComfort',
      label: 'Sample comfort',
      filled: fields.sampleComfort.trim() !== '',
      preview: fields.sampleComfort,
    },
    {
      key: 'sensitiveConsent',
      fieldKey: 'sensitiveConsent',
      label: 'Consent & sensitive tests',
      filled: sensitiveFilled,
      preview: sensitiveItems.length === 0 ? 'No sensitive tests' : fields.sensitiveConsent,
    },
  ];
}

export type IntakeStatus = 'not-started' | 'waiting' | 'in-progress' | 'complete' | 'skipped';

/**
 * One derived intake fact for the desk: skipped wins (a recorded decision),
 * complete means every applicable section answered, any answer means the
 * patient or desk started, a sent link alone means waiting.
 */
export function intakeStatus(
  patient: Pick<
    FrontDeskPatient,
    'intake' | 'visitReason' | 'sexAtBirth' | 'intakeSentAtLabel' | 'intakeSkipped'
  >,
  cartItems: CartItem[],
): IntakeStatus {
  if (patient.intakeSkipped) return 'skipped';
  const sections = intakeSections(
    patient.intake,
    patient.visitReason,
    cartItems,
    patient.sexAtBirth,
  );
  if (sections.every((section) => section.filled)) return 'complete';
  const answered =
    patient.visitReason.length > 0 ||
    Object.values(patient.intake).some((value) => value.trim() !== '');
  if (answered) return 'in-progress';
  return patient.intakeSentAtLabel ? 'waiting' : 'not-started';
}

// ── Step-1 identity resolution ─────────────────────────────

import type {
  IdentityQueryKind,
  IdentityResolution,
  PatientRecordSummary,
} from './types';

const BOOKING_CODE_PATTERN = /^[A-Z]{2}\d{5}$/;

/**
 * Classify what the receptionist typed. Phone wins when the value is mostly
 * digits (8+ digits, reception door "exact-phone"); a booking code is two
 * letters + five digits (door "booking-code"); everything else searches by
 * name (door "walk-in").
 */
export function detectQueryKind(raw: string): IdentityQueryKind | null {
  const value = raw.trim();
  if (value === '') return null;
  if (BOOKING_CODE_PATTERN.test(value.toUpperCase())) return 'code';
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 8 && digits.length >= value.replace(/\s/g, '').length - 1) return 'phone';
  return 'name';
}

/** Extract a booking code from a scanned QR payload such as `kura://booking/GW87430`. */
export function parseBookingQrPayload(payload: string): string | null {
  return payload.trim().toUpperCase().match(/\b[A-Z]{2}\d{5}\b/)?.[0] ?? null;
}

/**
 * Whether a resolved collection code can be redeemed at this desk, and if not,
 * why. Redeemable states are `issued` and `scheduled`; a code issued for a
 * different branch blocks even while its lifecycle state is fine.
 */
export function bookingBlockReason(
  booking: BookingSummary,
  branchId?: string,
): BookingBlockReason | null {
  if (booking.codeStatus === 'expired') return 'expired';
  if (booking.codeStatus === 'cancelled') return 'cancelled';
  if (booking.codeStatus === 'redeemed') return 'redeemed';
  if (booking.branchId && branchId && booking.branchId !== branchId) return 'wrong-branch';
  return null;
}

/** Display meta for a canonical collection-code status. One mapping, no freehand labels. */
export function collectionCodeStatusMeta(status: CollectionCodeStatus): {
  label: string;
  tone: 'success' | 'warning' | 'neutral';
} {
  switch (status) {
    case 'issued':
      return { label: 'Issued', tone: 'success' };
    case 'scheduled':
      return { label: 'Scheduled', tone: 'success' };
    case 'redeemed':
      return { label: 'Redeemed', tone: 'neutral' };
    case 'expired':
      return { label: 'Expired', tone: 'warning' };
    case 'cancelled':
      return { label: 'Cancelled', tone: 'neutral' };
  }
}

/**
 * Recovery guidance per blocked booking, following the reception door
 * contract: retry another door (phone lookup), explicit walk-in, or direct
 * the patient — never a dead end, never a fake check-in.
 */
export function bookingBlockMeta(reason: BookingBlockReason): {
  title: string;
  description: string;
} {
  switch (reason) {
    case 'expired':
      return {
        title: 'Booking code expired',
        description:
          'The code is no longer valid. The visit can continue as a walk-in — the patient record still matches.',
      };
    case 'cancelled':
      return {
        title: 'Booking cancelled',
        description:
          'This booking was cancelled after it was issued. Confirm with the patient before continuing as a walk-in.',
      };
    case 'redeemed':
      return {
        title: 'Code already redeemed',
        description:
          'This code has been used. The patient may already be checked in — check the desk queue before creating a duplicate visit.',
      };
    case 'wrong-branch':
      return {
        title: 'Issued for another branch',
        description:
          'This code belongs to a different branch. Direct the patient there, or continue as a walk-in at this desk.',
      };
  }
}

function nameMatches(query: string, record: PatientRecordSummary): boolean {
  const needle = normalisePersonName(query);
  if (needle.length < 2) return false;
  const latin = normalisePersonName(record.name);
  return latin.includes(needle) || (record.nameKhmer ?? '').includes(query.trim());
}

/**
 * Resolve a search query against the reception registry. Pure — the
 * ceremony (debounce, loading) lives in the component. Booking codes bind
 * to exactly one booking; phones may fan out to every patient sharing the
 * number; names return scan-and-confirm candidates, never an auto-pick.
 */
export function resolveIdentity(
  raw: string,
  registry: PatientRecordSummary[],
  context?: { branchId?: string },
): IdentityResolution | null {
  const kind = detectQueryKind(raw);
  if (kind === null) return null;
  const query = raw.trim();

  if (kind === 'code') {
    const code = query.toUpperCase();
    for (const record of registry) {
      const booking = record.bookings?.find((candidate) => candidate.code === code);
      if (booking) {
        const reason = bookingBlockReason(booking, context?.branchId);
        return reason === null
          ? { kind: 'booking-linked', record, booking }
          : { kind: 'booking-blocked', record, booking, reason };
      }
    }
    return { kind: 'no-match', queryKind: kind, query: code };
  }

  if (kind === 'phone') {
    const matches = registry.filter((record) => phonesMatch(record.phone ?? '', query));
    if (matches.length === 0) return { kind: 'no-match', queryKind: kind, query };
    if (matches.length > 1) return { kind: 'shared-phone', records: matches };
    const record = matches[0];
    return record.registeredHere
      ? { kind: 'known-here', record }
      : { kind: 'known-elsewhere', record };
  }

  const candidates = registry.filter((record) => nameMatches(query, record));
  if (candidates.length === 0) return { kind: 'no-match', queryKind: kind, query };
  return { kind: 'candidates', records: candidates };
}

/** A selected minor blocks continuation until the guardian is confirmed present. */
export function guardianGateBlocks(
  record: PatientRecordSummary | null,
  guardianConfirmed: boolean,
): boolean {
  return Boolean(record?.minor) && !guardianConfirmed;
}

// ── Desk queue (arrivals) ──────────────────────────────────

/** Wait pressure: over 30 minutes warns, over 60 escalates (import-doc rule). */
export function waitTone(waitMinutes: number): 'normal' | 'warn' | 'escalate' {
  if (waitMinutes > 60) return 'escalate';
  if (waitMinutes > 30) return 'warn';
  return 'normal';
}

/**
 * The one next action a desk visit offers. Derived from independent axes,
 * never from a master status: an unfinished check-in resumes at its step; a
 * resolved identity queues for phlebotomy exactly once; later stages are
 * owned by other surfaces and the desk only observes them.
 */
export function deskNextAction(
  visit: DeskVisit,
): { kind: 'resume'; label: string } | { kind: 'queue-draw'; label: string } | null {
  if (visit.stage === 'arrived') {
    return { kind: 'resume', label: `Resume check-in · Step ${visit.resumeStep ?? 1}` };
  }
  if (visit.stage === 'identity-resolved' && !visit.queuedForDraw) {
    return { kind: 'queue-draw', label: 'Queue for phlebotomy' };
  }
  return null;
}

/** The desk's payment fact for a finished check-in, from the cart's payment state. */
export function visitPaymentFact(payment: CartPayment): VisitPaymentFact {
  switch (payment.status) {
    case 'confirmed':
    // Zero balance: nothing outstanding, same desk fact as collected.
    case 'no-charge':
      return 'collected';
    case 'waiting':
    case 'split-cash':
      return 'waiting';
    case 'deferred':
    case 'pending-claim':
      return 'deferred';
    default:
      return 'pending';
  }
}

/**
 * The desk-queue row a completed check-in produces: identity resolved,
 * payment carried as its own fact. Check-in is a terminal reception outcome —
 * the visit continues on the queue, never inside the wizard.
 */
export function checkedInVisit(patient: FrontDeskPatient, waitMinutes = 0): DeskVisit {
  return {
    id: `visit-${patient.id}`,
    queueNumber: patient.queueNumber,
    patientName: patient.name,
    nameKhmer: patient.nameKhmer || undefined,
    arrivedLabel: patient.arrivedLabel?.split(' · ')[0] ?? 'Just now',
    waitMinutes,
    stage: 'identity-resolved',
    // Channel verification is the desk's assurance proxy for a wizard patient.
    assurance: patient.otpVerified || patient.telegramVerified ? 'verified' : 'unverified',
    payment: visitPaymentFact(patient.cart.payment),
  };
}

/**
 * The desk-queue row for a check-in that is still open. Leaving the wizard
 * must never lose the capture: the visit stays on the queue as `arrived` with
 * the step it resumes at, so the desk can take another patient and come back.
 *
 * Returns null while the slot is still blank — an untouched form is not a
 * visit, and a queue full of empty rows would hide the real ones.
 */
export function inProgressVisit(patient: FrontDeskPatient, waitMinutes = 0): DeskVisit | null {
  const gate = wizardGate(patient);
  const touched = patient.identity.source !== null || patient.name.trim() !== '';
  if (!touched || gate.isReadyToCheckIn) return null;
  return {
    ...checkedInVisit(patient, waitMinutes),
    stage: 'arrived',
    resumeStep: inferStep(gate),
  };
}

/** Next free queue number — the legacy desk spawns a blank slot right after check-in. */
export function nextQueueNumber(taken: number[]): number {
  return taken.length === 0 ? 1 : Math.max(...taken) + 1;
}

/** Longest-waiting first inside each stage; unfinished check-ins stay on top. */
export function orderDeskVisits(visits: DeskVisit[]): DeskVisit[] {
  const stageRank: Record<VisitStage, number> = {
    arrived: 0,
    'identity-resolved': 1,
    'draw-complete': 2,
    completed: 3,
  };
  return [...visits].sort(
    (a, b) => stageRank[a.stage] - stageRank[b.stage] || b.waitMinutes - a.waitMinutes,
  );
}

// ── Order attribution (ADR-0057) ───────────────────────────

/** Prescribers a receptionist may attribute an order to: members with a live licence. */
export function eligiblePrescribers(prescribers: Prescriber[]): Prescriber[] {
  return prescribers.filter(
    (prescriber) =>
      prescriber.workspaceMember &&
      prescriber.licence !== 'expired' &&
      isLiveLicence(prescriber.licence),
  );
}

export type AttributionBlocker =
  | { kind: 'no-eligible-prescriber' }
  | { kind: 'prescriber-required' }
  | { kind: 'prescriber-ineligible'; prescriber: Prescriber };

/**
 * Mirror of the server placement gate: a non-empty order needs an attributed,
 * eligible prescriber before it can be placed (422 NO_ELIGIBLE_PRESCRIBER).
 * Empty carts have nothing to attribute yet.
 */
export function attributionBlocker(
  cart: Cart,
  prescribers: Prescriber[],
): AttributionBlocker | null {
  if (cart.items.length === 0) return null;
  const eligible = eligiblePrescribers(prescribers);
  if (eligible.length === 0) return { kind: 'no-eligible-prescriber' };
  if (!cart.attributedPrescriberId) return { kind: 'prescriber-required' };
  const chosen = prescribers.find((p) => p.userId === cart.attributedPrescriberId);
  if (!chosen) return { kind: 'prescriber-required' };
  if (!eligible.some((p) => p.userId === chosen.userId)) {
    return { kind: 'prescriber-ineligible', prescriber: chosen };
  }
  return null;
}

// ── Order composition blockers ─────────────────────────────

export type OrderBlocker =
  | {
      /** A panel and a standalone test resolve the same analyte(s). */
      kind: 'analyte-overlap';
      panelName: string;
      itemName: string;
      analytes: string[];
    }
  | {
      /** Listed but not orderable here — must leave the cart before placement. */
      kind: 'unsupported-test';
      itemName: string;
    }
  | {
      /** Every line must share one currency; the priced order is single-currency. */
      kind: 'mixed-currency';
      currencies: string[];
    };

/**
 * Composition blockers evaluated against the catalog (truth pack §5.4:
 * duplicate/overlap, unsupported, and mixed-currency carts block explicitly).
 * Pure; the same list drives the Orders step, the cart rail, and placement.
 */
export function orderBlockers(cart: Cart, catalog: CatalogEntry[]): OrderBlocker[] {
  const blockers: OrderBlocker[] = [];
  const entries = cart.items
    .map((item) => catalog.find((entry) => entry.id === item.id))
    .filter((entry): entry is CatalogEntry => entry !== undefined);

  for (const entry of entries) {
    if (entry.unsupported) {
      blockers.push({ kind: 'unsupported-test', itemName: entry.name });
    }
  }

  for (const panel of entries) {
    if (!panel.analytes || panel.analytes.length < 2) continue;
    for (const other of entries) {
      if (other.id === panel.id || !other.analytes) continue;
      if (other.analytes.length >= panel.analytes.length) continue;
      const overlap = other.analytes.filter((analyte) => panel.analytes!.includes(analyte));
      if (overlap.length > 0) {
        blockers.push({
          kind: 'analyte-overlap',
          panelName: panel.name,
          itemName: other.name,
          analytes: overlap,
        });
      }
    }
  }

  const currencies = [...new Set(cart.items.map((item) => item.currencyCode as string))];
  if (currencies.length > 1) {
    blockers.push({ kind: 'mixed-currency', currencies });
  }

  return blockers;
}

/** One plain sentence per blocker — placed next to the action it blocks. */
export function orderBlockerMessage(blocker: OrderBlocker): string {
  switch (blocker.kind) {
    case 'analyte-overlap':
      return `${blocker.panelName} already includes ${blocker.analytes.join(', ')} — remove ${blocker.itemName} or the panel to avoid double-charging.`;
    case 'unsupported-test':
      return `${blocker.itemName} is not orderable at this lab yet. Remove it to place the order.`;
    case 'mixed-currency':
      return `The order mixes ${blocker.currencies.join(' and ')} — a priced order carries one currency.`;
  }
}

// ── Teleconsult scheduling (TAT-coupled) ───────────────────

/** Specialty inferred from what was ordered; the desk can always override. */
export function teleconsultSpecialtyFor(items: CartItem[]): string {
  const ids = new Set(items.map((item) => item.id));
  if (ids.has('hba1c') || ids.has('glucose-f') || ids.has('tsh')) return 'Endocrinology';
  if (ids.has('lipid') || ids.has('ecg-12')) return 'Cardiology';
  if (ids.has('cbc') || ids.has('cmp') || ids.has('alt-ast') || ids.has('creatinine')) {
    return 'Internal Medicine';
  }
  return 'General Practice';
}

/**
 * Longest internal turnaround across the ordered tests, in hours. Zero when
 * nothing TAT-bound is in the cart — any slot is then bookable.
 */
export function maxTatHours(items: CartItem[], catalog: CatalogEntry[]): number {
  return items.reduce((max, item) => {
    const entry = catalog.find((candidate) => candidate.id === item.id);
    return Math.max(max, entry?.tatHours ?? 0);
  }, 0);
}

/** Days (from today) before which results are not expected. */
export function tatDayOffset(tatHours: number): number {
  return tatHours === 0 ? 0 : Math.max(1, Math.ceil(tatHours / 24));
}

// ── Insurance responsibility (display preview only) ────────

/**
 * Per-line split at the quoted coverage percentage. DISPLAY PREVIEW ONLY —
 * the upstream capture contract is cash-only; nothing is billed to an
 * insurer. Integer floor on the insurer share keeps minor-unit math exact.
 */
export function lineResponsibilityMinor(
  priceMinor: string,
  coveragePct: number,
): { insurerMinor: string; patientMinor: string } {
  const price = BigInt(priceMinor);
  const insurer = (price * BigInt(Math.max(0, Math.min(100, coveragePct)))) / 100n;
  return { insurerMinor: insurer.toString(), patientMinor: (price - insurer).toString() };
}

// ── Split cash + KHQR ──────────────────────────────────────

/**
 * A cash portion is valid only strictly between zero and the amount due —
 * zero is not a split, and covering the full due is a plain cash payment.
 */
export function splitCashPortionValid(cashPortionMinor: string, dueMinor: string): boolean {
  try {
    const cash = BigInt(cashPortionMinor);
    const due = BigInt(dueMinor);
    return cash > 0n && cash < due;
  } catch {
    return false;
  }
}

/** KHQR remainder once the cash portion is collected. Floors at zero. */
export function splitRemainderMinor(dueMinor: string, cashPortionMinor: string): string {
  return subtractMinorFloor(dueMinor, cashPortionMinor);
}

// ── Consent chains (imaging + sensitive tests) ─────────────
//
// PROTOTYPE SURFACE: kura-platform has no consent engine. The chain below is
// the proposed contract: consent is per line, staged (needed → sent → signed,
// or verbal with a named recorder), and never a silent boolean.

export type ConsentRequirement = 'imaging' | 'sensitive';

/** Why a line needs consent, or null when it can proceed without one. */
export function consentRequirement(
  item: Pick<CartItem, 'id' | 'kind' | 'name'>,
  catalog: CatalogEntry[],
): ConsentRequirement | null {
  if (item.kind === 'imaging') return 'imaging';
  const entry = catalog.find((candidate) => candidate.id === item.id);
  if (entry?.sensitive || SENSITIVE_TEST_PATTERN.test(item.name)) return 'sensitive';
  return null;
}

/** A consent chain is resolved once signed digitally or recorded verbally. */
export function consentResolved(consent: LineConsent | undefined): boolean {
  return consent?.state === 'signed' || consent?.state === 'verbal';
}

/** Lines whose consent chain still blocks payment and check-in. */
export function consentBlockers(cart: Cart, catalog: CatalogEntry[]): CartItem[] {
  return cart.items.filter(
    (item) => consentRequirement(item, catalog) !== null && !consentResolved(item.consent),
  );
}

/**
 * Pregnancy gate: imaging ordered for a patient whose sex at birth is Female
 * asks before the order proceeds. "Possibly" or "declined" answers require a
 * clinician override signature — or the order is cancelled, never defaulted.
 */
export function pregnancyGateApplies(
  item: Pick<CartItem, 'kind'>,
  patient: Pick<FrontDeskPatient, 'sexAtBirth'>,
): boolean {
  return item.kind === 'imaging' && patient.sexAtBirth === 'Female';
}

/**
 * Verbal consent is only recordable with a named recorder; sensitive tests
 * additionally need a supervisor witness PIN (same gate as duplicate
 * override). The decision is framed as logged, never silent.
 */
export function verbalConsentValid(input: {
  requirement: ConsentRequirement;
  recordedBy: string;
  witnessPin?: string;
}): boolean {
  if (input.recordedBy.trim() === '') return false;
  if (input.requirement === 'sensitive') {
    return collisionOverridePinValid(input.witnessPin ?? '');
  }
  return true;
}

// ── Pricing snapshot (server re-derives at placement) ──────

/**
 * Accept the server's re-derived prices: apply each repriced line, adopt the
 * new versions, and clear the stale flag. Never applied silently — the desk
 * confirms the new total first.
 */
export function acceptReprice(cart: Cart): Cart {
  if (cart.pricing?.state !== 'stale') return cart;
  const repriced = new Map(
    (cart.pricing.repricedLines ?? []).map((line) => [line.itemId, line.newPriceMinor]),
  );
  return {
    ...cart,
    items: cart.items.map((item) =>
      repriced.has(item.id) ? { ...item, priceMinor: repriced.get(item.id)! } : item,
    ),
    pricing: {
      ...cart.pricing,
      state: 'current',
      repricedLines: undefined,
    },
  };
}

/**
 * Copy a resolved registry record onto the wizard patient as a patch:
 * identity fields lock, prior duplicate acknowledgements re-arm.
 */
export function resolvedRecordPatch(record: PatientRecordSummary): Partial<FrontDeskPatient> {
  return {
    name: record.name,
    nameKhmer: record.nameKhmer ?? '',
    dob: record.dob ?? '',
    sexAtBirth: record.sexAtBirth,
    idNumber: record.nid ?? '',
    phoneNumber: (record.phone ?? '').replace(/\D/g, ''),
    identity: { source: 'existing', lockedFields: ['name', 'dob', 'sexAtBirth'] },
    collisionAcked: [],
  };
}

/**
 * Derive the lifecycle timeline for one booking from its canonical code
 * status. Pure narration — issued always happened; blocked branches end the
 * story with their own tone. Never invents timestamps it does not have.
 */
export function bookingTimeline(booking: BookingSummary): BookingTimelineEvent[] {
  const events: BookingTimelineEvent[] = [
    { step: 1, title: 'Code issued', detail: `Collection code ${booking.code}`, tone: 'success' },
  ];

  const reachedSchedule = booking.codeStatus === 'scheduled' || booking.codeStatus === 'redeemed';
  if (reachedSchedule) {
    events.push({
      step: 2,
      title: 'Visit scheduled',
      dateLabel: booking.whenLabel,
      detail: [booking.locationLabel, booking.providerLabel].filter(Boolean).join(' · ') || undefined,
      tone: 'success',
    });
  }

  switch (booking.codeStatus) {
    case 'issued':
      events[0].current = true;
      break;
    case 'scheduled':
      events[1].current = true;
      break;
    case 'redeemed':
      events.push({
        step: 3,
        title: 'Code redeemed',
        detail: 'Patient checked in at reception.',
        tone: 'neutral',
        current: true,
      });
      break;
    case 'expired':
      events.push({
        step: 2,
        title: 'Code expired',
        detail: 'The code lapsed before the visit.',
        tone: 'warning',
        current: true,
      });
      break;
    case 'cancelled':
      events.push({
        step: 2,
        title: 'Booking cancelled',
        dateLabel: booking.whenLabel,
        tone: 'danger',
        current: true,
      });
      break;
  }

  return events;
}
