import { SENSITIVE_TEST_PATTERN, type CatalogEntry } from './catalog';
import { addMinor, multiplyMinor, percentOfMinor, subtractMinorFloor } from './money';
import { isLiveLicence } from '../licence/logic';
import { DESK_TASK_ORDER } from './types';
import type {
  ArrivalClass,
  BookingBlockReason,
  BookingSummary,
  BookingTimelineEvent,
  Cart,
  CheckInGate,
  DeskTaskId,
  DeskVisit,
  CartItem,
  CartItemKind,
  CartPayment,
  CollectionCodeStatus,
  CollisionCandidate,
  CollisionSignal,
  EligibilityResult,
  FrontDeskPatient,
  IdentityFieldIssue,
  InsurancePolicy,
  IntakeFields,
  LineConsent,
  Prescriber,
  Promo,
  QueueSkipReasonCode,
  VisitPaymentFact,
  StepStatus,
  TrustSignal,
} from './types';

/**
 * Front-desk rules, ported verbatim from the validated receptionist prototype
 * census. Pure and deterministic — async ceremonies (OTP send, eligibility
 * probe, Bakong webhook) are simulated in components, decided here.
 */

// ── Identity field validation ──────────────────────────────

/** Nobody alive was born this long ago; a typo that claims otherwise is a typo. */
const MAX_AGE_YEARS = 130;

/**
 * The desk may record a year alone when the patient does not know the day —
 * patient-ms accepts a year-of-birth record, and forcing an invented day
 * would put a false date in a clinical record.
 */
const YEAR_ONLY = /^\d{4}$/;
const FULL_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** True when the calendar actually contains this date (leap years included). */
function isRealCalendarDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Reject identity a clinician could not act on. A name of digits and a
 * birth date of `1991-23-23` are not edge cases — they are the desk typing
 * into the wrong field, and every downstream label, result, and sample
 * carries the mistake. `todayIso` is injected: this module never reads the
 * clock.
 */
export function validateIdentityFields(
  patient: Pick<FrontDeskPatient, 'name' | 'dob'>,
  todayIso: string,
): IdentityFieldIssue[] {
  const issues: IdentityFieldIssue[] = [];
  const name = patient.name.trim();

  if (name === '') {
    issues.push({ field: 'name', message: 'Enter the patient’s name.' });
  } else if (!/\p{Letter}/u.test(name)) {
    issues.push({
      field: 'name',
      message: 'A name needs letters. Check this was not typed into the wrong field.',
    });
  }

  const dob = patient.dob.trim();
  const today = FULL_DATE.exec(todayIso);
  const todayYear = today ? Number(today[1]) : new Date().getUTCFullYear();

  if (dob === '') {
    issues.push({ field: 'dob', message: 'Enter the date of birth, or just the birth year, e.g. 1993.' });
    return issues;
  }

  if (YEAR_ONLY.test(dob)) {
    const year = Number(dob);
    if (year > todayYear) {
      issues.push({ field: 'dob', message: 'Year of birth cannot be in the future.' });
    } else if (todayYear - year > MAX_AGE_YEARS) {
      issues.push({
        field: 'dob',
        message: `Year of birth is more than ${MAX_AGE_YEARS} years ago. Check the year.`,
      });
    }
    return issues;
  }

  const parts = FULL_DATE.exec(dob);
  if (!parts) {
    issues.push({ field: 'dob', message: 'Use YYYY-MM-DD, or just the birth year, e.g. 1993.' });
    return issues;
  }

  const [, yearText, monthText, dayText] = parts;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (!isRealCalendarDate(year, month, day)) {
    issues.push({ field: 'dob', message: 'That date does not exist. Check the month and day.' });
    return issues;
  }
  if (todayIso !== '' && dob > todayIso) {
    issues.push({ field: 'dob', message: 'Date of birth cannot be in the future.' });
    return issues;
  }
  if (todayYear - year > MAX_AGE_YEARS) {
    issues.push({
      field: 'dob',
      message: `That is over ${MAX_AGE_YEARS} years ago. Check the year.`,
    });
  }

  return issues;
}

// ── Check-in gate engine ───────────────────────────────────

/**
 * Which tasks this visit carries. A task that cannot change the outcome is
 * not shown as an empty step: a patient with no policy has nothing to
 * resolve about payers, and a cart with no teleconsult has nothing to book.
 */
export function deskTasksFor(patient: FrontDeskPatient): DeskTaskId[] {
  return DESK_TASK_ORDER.filter((task) => {
    if (task === 'payer') return patient.insurance.length > 0;
    // Intake is about the sample being taken, so it exists once there is an
    // order to prepare for. The teleconsult booking inside it is its own
    // conditional section — a visit with no teleconsult never sees one.
    if (task === 'preconsult') return patient.cart.items.length > 0;
    return true;
  });
}

/**
 * The gate that decides progress. Order here is information dependency:
 * payer resolution needs the order lines it pays for, and payment needs a
 * resolved payer — so insurance can never be asked before the basket exists.
 */
export function checkInGate(patient: FrontDeskPatient, todayIso = ''): CheckInGate {
  const tasks = deskTasksFor(patient);
  const issues = validateIdentityFields(patient, todayIso);
  const hasIdentitySource = patient.identity.source !== null;
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
  const payLater = patient.cart.payment.status === 'deferred';
  const noCharge = patient.cart.payment.status === 'no-charge';

  // Finding a record is not identifying a person. A record-led capture stays
  // unconfirmed until the desk positively identifies the patient in front of
  // it; a desk-typed walk-in was taken from that person already.
  const identityConfirmed =
    !identityConfirmationRequired(patient) || patient.identityConfirmation !== null;

  const blockers: Partial<Record<DeskTaskId, string>> = {};
  const done = {} as Record<DeskTaskId, boolean>;
  const status = {} as Record<DeskTaskId, StepStatus>;

  done.arrival = hasIdentitySource;
  if (!done.arrival) blockers.arrival = 'Find the patient or start a new record.';

  done.patient =
    done.arrival && issues.length === 0 && hasSex && hasContact && identityConfirmed;
  if (!done.patient && done.arrival) {
    // A value that was typed and cannot be kept already carries its reason on
    // the field. Repeating it here would say the same thing twice; pointing at
    // it keeps the footer useful for the fields that have nothing to show.
    const typedIssue = issues.find((issue) =>
      issue.field === 'name' ? patient.name.trim() !== '' : patient.dob.trim() !== '',
    );
    blockers.patient = typedIssue
      ? 'Fix the highlighted patient details.'
      : (issues[0]?.message ??
        (!hasSex
          ? 'Sex at birth decides reference ranges — record it before continuing.'
          : !identityConfirmed
            ? 'Confirm this is the person in front of you.'
            : 'Verify a contact channel, or record why the visit continues without one.'));
  }

  done.orders = done.patient && itemCount > 0;
  if (!done.orders && done.patient) blockers.orders = 'Add at least one order.';

  done.payer = done.orders && (patient.insuranceAcked || patient.insurance.length === 0);
  if (!done.payer && done.orders) {
    blockers.payer = 'Choose who pays each line before taking payment.';
  }

  const payerSettled = tasks.includes('payer') ? done.payer : done.orders;
  done.preconsult = payerSettled && teleResolved;
  if (!done.preconsult && payerSettled) {
    blockers.preconsult = 'Book or waive the teleconsult.';
  }

  const beforePayment = tasks.includes('preconsult') ? done.preconsult : payerSettled;
  done.payment = beforePayment && (paid || payLater || noCharge);
  if (!done.payment && beforePayment) {
    blockers.payment = 'Payment is still open.';
  }

  for (const [index, task] of tasks.entries()) {
    const previous = index === 0 ? null : tasks[index - 1];
    const priorDone = previous === null ? true : done[previous];
    status[task] = !priorDone ? 'locked' : done[task] ? 'done' : 'active';
  }
  // Tasks this visit does not carry stay locked so a stale reference cannot
  // navigate into a step the visit has no reason to show.
  for (const task of DESK_TASK_ORDER) {
    if (!(task in status)) status[task] = 'locked';
  }

  return {
    tasks,
    status,
    done,
    blockers,
    paid,
    payLater,
    isReadyToCheckIn: done.payment,
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
  gate: CheckInGate,
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

export function canNavigateToTask(
  task: DeskTaskId,
  currentTask: DeskTaskId,
  gate: CheckInGate,
): boolean {
  if (task === currentTask || gate.status[task] === 'locked') return false;
  if (gate.status[task] === 'done') return true;
  const target = gate.tasks.indexOf(task);
  const current = gate.tasks.indexOf(currentTask);
  if (target === -1 || current === -1) return false;
  if (target < current) return true;
  return target === current + 1 && gate.done[currentTask];
}

/** First not-done task — where a reopened patient lands. */
export function inferTask(gate: CheckInGate): DeskTaskId {
  return gate.tasks.find((task) => gate.status[task] !== 'done') ?? gate.tasks[gate.tasks.length - 1];
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

// ── Payer resolution (per order line) ──────────────────────

/**
 * What an outpatient policy would normally cover. PROTOTYPE RULE: no coverage
 * catalogue exists upstream, so this is a starting suggestion the desk can
 * override on any line — never an adjudication, and never binding.
 */
const INSURER_COVERED_KINDS: ReadonlySet<CartItemKind> = new Set(['lab', 'vitals', 'visit']);

export function suggestedLinePayer(
  item: CartItem,
  policies: InsurancePolicy[],
): 'insurer' | 'direct' {
  const eligible = policies.some((policy) => policy.eligibility?.kind === 'eligible');
  if (!eligible) return 'direct';
  return INSURER_COVERED_KINDS.has(item.kind) ? 'insurer' : 'direct';
}

export function linePayer(item: CartItem, policies: InsurancePolicy[]): 'insurer' | 'direct' {
  return item.payer ?? suggestedLinePayer(item, policies);
}

export type PayerSplit = {
  /** What the insurer would carry, if a claim could be filed. Preview only. */
  insurerPreviewMinor: string;
  /** What the patient owes at the desk today, including any co-pay. */
  patientMinor: string;
  copayMinor: string;
  coveragePct: number;
  /** True when one basket holds both insurer-assigned and self-pay lines. */
  mixed: boolean;
};

/**
 * The money each payer carries, per line. Coverage only means anything once
 * the lines exist — which is why this runs after ordering, never before.
 *
 * PROTOTYPE SURFACE: kura-platform captures cash only. The insurer column is a
 * preview of a split the clinic cannot yet submit, and the patient column is
 * the only number the desk may collect against.
 */
export function payerSplit(cart: Cart, policies: InsurancePolicy[]): PayerSplit {
  const eligible = policies
    .map((policy) => policy.eligibility)
    .find((eligibility) => eligibility?.kind === 'eligible');
  const coveragePct = eligible?.kind === 'eligible' ? eligible.coveragePct : 0;
  const copayMinor = eligible?.kind === 'eligible' ? eligible.copayMinor : '0';

  const insurerLines = cart.items.filter((item) => linePayer(item, policies) === 'insurer');
  const directLines = cart.items.filter((item) => linePayer(item, policies) === 'direct');
  const insurerTotal = addMinor(
    insurerLines.map((item) => multiplyMinor(item.priceMinor, item.qty)),
  );
  const directTotal = addMinor(directLines.map((item) => multiplyMinor(item.priceMinor, item.qty)));

  const insurerPreviewMinor = percentOfMinor(insurerTotal, coveragePct);
  const patientShareOfCovered = subtractMinorFloor(insurerTotal, insurerPreviewMinor);

  return {
    insurerPreviewMinor,
    patientMinor: addMinor([
      directTotal,
      patientShareOfCovered,
      insurerLines.length > 0 ? copayMinor : '0',
    ]),
    copayMinor: insurerLines.length > 0 ? copayMinor : '0',
    coveragePct,
    mixed: insurerLines.length > 0 && directLines.length > 0,
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
  ScanReading,
} from './types';

/**
 * Collection-code grammar from the platform contract (booking-ms
 * `GetCollectionCodeByCode`): the `PSC-` prefix plus eight upper-case
 * alphanumerics. The desk never mints its own code shape — the query
 * classifier, the QR reader, and the tests all read this one pattern.
 */
export const COLLECTION_CODE_PATTERN = /^PSC-[0-9A-Z]{8}$/;

/** Any leading fragment of a complete code — tells a scan in flight from a foreign QR. */
const COLLECTION_CODE_PREFIX_PATTERN = /^(?:P(?:S(?:C(?:-[0-9A-Z]{0,7})?)?)?)?$/;

/**
 * Classify what the receptionist typed. Two reception doors take typed input:
 * a collection code (`booking-code`) and an exact phone (`exact-phone`).
 * Anything else falls through to a name lookup — a search mechanism, NOT the
 * walk-in door. Walk-in is a decision the desk takes explicitly; no search
 * string may imply it.
 */
export function detectQueryKind(raw: string): IdentityQueryKind | null {
  const value = raw.trim();
  if (value === '') return null;
  if (COLLECTION_CODE_PATTERN.test(value.toUpperCase())) return 'code';
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 8 && digits.length >= value.replace(/\s/g, '').length - 1) return 'phone';
  return 'name';
}

const BOOKING_QR_PREFIX = 'kura://booking/';

/**
 * Read a scanned payload. A Kura booking QR carries exactly one collection
 * code behind the canonical `kura://booking/` prefix — nothing else resolves.
 * Fishing a code-shaped substring out of an unknown payload would let a
 * foreign QR open a patient record, so anything unrecognised is reported as
 * foreign instead of guessed at. `partial` is a scan still arriving keystroke
 * by keystroke from a desk scanner: no result until the payload completes.
 */
export function readBookingQr(payload: string): ScanReading {
  const value = payload.trim();
  if (value === '') return null;
  const lower = value.toLowerCase();
  if (lower.startsWith(BOOKING_QR_PREFIX)) {
    const code = value.slice(BOOKING_QR_PREFIX.length).toUpperCase();
    if (COLLECTION_CODE_PATTERN.test(code)) return { kind: 'code', code };
    return COLLECTION_CODE_PREFIX_PATTERN.test(code) ? { kind: 'partial' } : { kind: 'foreign' };
  }
  if (BOOKING_QR_PREFIX.startsWith(lower)) return { kind: 'partial' };
  return value.includes('://') ? { kind: 'foreign' } : null;
}

/**
 * Whether a resolved collection code can be redeemed at this desk, and if not,
 * why. Redeemable states are `issued` and `scheduled`; a code issued for a
 * different branch blocks even while its lifecycle state is fine.
 *
 * Expiry is deliberately absent: collection codes do not lapse, so nothing
 * upstream ever produces `expired`. Turning a state with no producer into a
 * desk refusal would send real patients away for a reason that cannot happen.
 */
export function bookingBlockReason(
  booking: BookingSummary,
  branchId?: string,
): BookingBlockReason | null {
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
 * Reception wait is only live while the desk still owns the next step. One
 * PSC staffer carries the visit through the draw, so the wait stops counting
 * at the draw, not at a handoff.
 */
export function deskWaitIsActive(visit: DeskVisit): boolean {
  return visit.stage === 'arrived' || visit.stage === 'identity-resolved';
}

/** Minutes past a booked slot; 0 when the appointment is not yet due. */
export function appointmentLateMinutes(visit: DeskVisit): number {
  const away = visit.appointmentMinutesAway;
  return away !== undefined && away < 0 ? -away : 0;
}

/**
 * An appointment earns its priority in a window around the booked slot. A
 * patient who arrives an hour early has a booking, not a claim on the room:
 * until the slot is near, they wait with the walk-ins who are already here.
 */
const APPOINTMENT_DUE_WINDOW_MINUTES = 15;

export function appointmentIsDue(visit: DeskVisit): boolean {
  const away = visit.appointmentMinutesAway;
  return away === undefined || away <= APPOINTMENT_DUE_WINDOW_MINUTES;
}

/**
 * Queue order (T17a): urgent first, then appointments whose slot is due, then
 * walk-ins, then appointments still early. Inside every band the order is
 * first-come-first-served — appointments by booked slot, everyone else by how
 * long they have been waiting. A patient who was called and did not answer
 * rejoins behind the band they were called from, never at the front.
 */
export function queueBand(visit: DeskVisit): number {
  if (visit.arrivalClass === 'stat') return 0;
  if (visit.arrivalClass === 'appointment') return appointmentIsDue(visit) ? 1 : 3;
  return 2;
}

export function orderDeskVisits(visits: DeskVisit[]): DeskVisit[] {
  function stageRank(visit: DeskVisit) {
    // Work in the chair stays visible above the room that is still waiting.
    if (visit.stage === 'in-draw') return 0;
    if (visit.stage === 'draw-complete') return 2;
    if (visit.stage === 'completed') return 3;
    return 1;
  }

  return [...visits].sort((a, b) => {
    const byStage = stageRank(a) - stageRank(b);
    if (byStage !== 0) return byStage;
    const byBand = queueBand(a) - queueBand(b);
    if (byBand !== 0) return byBand;
    const byRecall = (a.recalls ?? 0) - (b.recalls ?? 0);
    if (byRecall !== 0) return byRecall;
    if (a.arrivalClass === 'appointment' && b.arrivalClass === 'appointment') {
      const slotA = a.appointmentMinutesAway ?? 0;
      const slotB = b.appointmentMinutesAway ?? 0;
      if (slotA !== slotB) return slotA - slotB;
    }
    return b.waitMinutes - a.waitMinutes;
  });
}

/**
 * The visit currently in the chair, if any — the waiting room shows this one.
 * Keyed on the visit stage, not the call: a finished visit keeps the record of
 * having been called to a bay, and that memory must not hold the queue.
 */
export function nowServing(visits: DeskVisit[]): DeskVisit | null {
  return orderDeskVisits(visits).find((visit) => visit.stage === 'in-draw') ?? null;
}

/** The visit that has just been called and is walking up. */
export function nowCalled(visits: DeskVisit[]): DeskVisit | null {
  return orderDeskVisits(visits).find((visit) => visit.call.state === 'called') ?? null;
}

/**
 * Who the desk calls next. A visit is callable once it has a finished
 * check-in; an unfinished capture is desk work, not a patient to summon.
 * Returns null while someone is already called or in the chair — two called
 * patients at one desk is how the wrong sample gets drawn.
 */
export function callNextVisit(visits: DeskVisit[]): DeskVisit | null {
  if (nowServing(visits) || nowCalled(visits)) return null;
  return (
    orderDeskVisits(visits).find(
      (visit) =>
        visit.stage === 'identity-resolved' &&
        (visit.call.state === 'waiting' || visit.call.state === 'skipped'),
    ) ?? null
  );
}

/**
 * Why this visit cannot start its draw yet. Money is a real gate at a PSC:
 * an uncollected balance must be settled or explicitly deferred before a
 * tube is filled, and an unidentified patient is never drawn.
 */
export function drawBlockedReason(visit: DeskVisit): string | null {
  if (visit.stage === 'arrived') return 'Check-in is not finished.';
  if (visit.payment === 'pending') return 'Payment has not been collected or deferred.';
  if (visit.payment === 'waiting') return 'Waiting for the KHQR payment to confirm.';
  return null;
}

/**
 * The one next action a desk visit offers. Derived from independent axes,
 * never from a master status. The same staffer who received the patient
 * calls them and starts the draw — nothing here hands the visit to another
 * role.
 */
export function deskNextAction(visit: DeskVisit):
  | { kind: 'resume'; label: string }
  | { kind: 'call'; label: string }
  | { kind: 'start-draw'; label: string; blockedReason: string | null }
  | { kind: 'recall'; label: string }
  | null {
  if (visit.stage === 'arrived') {
    return { kind: 'resume', label: 'Resume check-in' };
  }
  if (visit.stage !== 'identity-resolved') return null;
  if (visit.call.state === 'waiting') {
    return { kind: 'call', label: `Call ${visit.ticket}` };
  }
  if (visit.call.state === 'skipped') {
    return { kind: 'recall', label: `Recall ${visit.ticket}` };
  }
  return {
    kind: 'start-draw',
    label: 'Start draw',
    blockedReason: drawBlockedReason(visit),
  };
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
      return 'deferred';
    default:
      return 'pending';
  }
}

/**
 * Identity assurance is the record's own axis: it rises when a staffer checks
 * an identity document, and a one-time code sent to a phone never moves it.
 * Conflating the two would print "ID verified" beside a person nobody looked
 * at — the failure that puts one patient's result on another's chart.
 */
export function visitAssurance(patient: FrontDeskPatient): 'unverified' | 'verified' {
  return patient.identityConfirmation !== null ? 'verified' : 'unverified';
}

/** Contact ownership: the patient proved they control the channel. */
export function visitContactFact(patient: FrontDeskPatient): 'unconfirmed' | 'confirmed' {
  return patient.otpVerified || patient.telegramVerified ? 'confirmed' : 'unconfirmed';
}

/** Waiting-room ticket for a queue position, e.g. `A-014`. */
export function ticketFor(arrivalClass: ArrivalClass, queueNumber: number): string {
  const prefix = arrivalClass === 'stat' ? 'S' : arrivalClass === 'appointment' ? 'B' : 'W';
  return `${prefix}-${String(queueNumber).padStart(3, '0')}`;
}

export type CheckedInVisitOptions = {
  waitMinutes?: number;
  arrivalClass?: ArrivalClass;
  appointmentLabel?: string;
  appointmentMinutesAway?: number;
};

/**
 * The desk-queue row a completed check-in produces: identity resolved,
 * payment and assurance carried as their own facts. Check-in is a terminal
 * reception outcome — the visit continues on the queue, never inside the
 * wizard.
 */
export function checkedInVisit(
  patient: FrontDeskPatient,
  options: CheckedInVisitOptions | number = {},
): DeskVisit {
  const opts = typeof options === 'number' ? { waitMinutes: options } : options;
  const arrivalClass: ArrivalClass =
    opts.arrivalClass ?? (patient.boundBookingCode ? 'appointment' : 'walk-in');

  return {
    id: `visit-${patient.id}`,
    queueNumber: patient.queueNumber,
    ticket: ticketFor(arrivalClass, patient.queueNumber),
    patientName: patient.name,
    nameKhmer: patient.nameKhmer || undefined,
    arrivedLabel: patient.arrivedLabel?.split(' · ')[0] ?? 'Just now',
    waitMinutes: opts.waitMinutes ?? 0,
    arrivalClass,
    appointmentLabel: opts.appointmentLabel,
    appointmentMinutesAway: opts.appointmentMinutesAway,
    call: { state: 'waiting' },
    stage: 'identity-resolved',
    assurance: visitAssurance(patient),
    contact: visitContactFact(patient),
    payment: visitPaymentFact(patient.cart.payment),
  };
}

/**
 * The desk-queue row for a check-in that is still open. Leaving the capture
 * must never lose it: the visit stays on the queue as `arrived` with the task
 * it resumes at, so the desk can take another patient and come back.
 *
 * Returns null while the slot is still blank — an untouched form is not a
 * visit, and a queue full of empty rows would hide the real ones.
 */
export function inProgressVisit(
  patient: FrontDeskPatient,
  options: CheckedInVisitOptions | number = {},
): DeskVisit | null {
  const gate = checkInGate(patient);
  const touched = patient.identity.source !== null || patient.name.trim() !== '';
  if (!touched || gate.isReadyToCheckIn) return null;
  return {
    ...checkedInVisit(patient, options),
    stage: 'arrived',
    resumeTask: inferTask(gate),
  };
}

/** Record a call that went unanswered, with the reason it did. */
export function skipVisit(
  visit: DeskVisit,
  reason: QueueSkipReasonCode,
  atLabel: string,
): DeskVisit {
  return {
    ...visit,
    call: { state: 'skipped', atLabel, reason },
    recalls: (visit.recalls ?? 0) + 1,
  };
}

/** Next free queue number — the legacy desk spawns a blank slot right after check-in. */
export function nextQueueNumber(taken: number[]): number {
  return taken.length === 0 ? 1 : Math.max(...taken) + 1;
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

// ── Positive patient identification ────────────────────────
//
// PROTOTYPE SURFACE: booking-ms resolves a code to a booking and a patient
// reference — it never asserts that the person at the desk IS that patient.
// Reception performs that check itself, so the fact is modelled here and
// carried on the visit (who confirmed, how, when) instead of living in
// component state. A confirmation command does not exist upstream yet.

/** A record-led capture must be confirmed against the person; a desk-typed one already was. */
export function identityConfirmationRequired(
  patient: Pick<FrontDeskPatient, 'identity'>,
): boolean {
  return patient.identity.source === 'existing';
}

/** The open questions this record can be confirmed against. */
export function identityQuestions(
  record: Pick<FrontDeskPatient, 'name' | 'dob'>,
): Array<'name' | 'dob'> {
  const questions: Array<'name' | 'dob'> = [];
  if (record.name.trim() !== '') questions.push('name');
  if (record.dob.trim() !== '') questions.push('dob');
  return questions;
}

function normaliseAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Compare what the patient answered with what the record holds. Open
 * questions only — the desk asks "what is your date of birth?", never "are
 * you X, born Y?". Every answerable question must match: a shared family name
 * does not separate two relatives.
 */
export function identityAnswersMatch(
  record: Pick<FrontDeskPatient, 'name' | 'dob'>,
  answers: { name: string; dob: string },
): boolean {
  const questions = identityQuestions(record);
  if (questions.length === 0) return false;
  return questions.every((question) =>
    question === 'name'
      ? normaliseAnswer(answers.name) === normaliseAnswer(record.name)
      : answers.dob.trim() === record.dob.trim(),
  );
}

/**
 * Copy a resolved registry record onto the wizard patient as a patch:
 * record-backed identity fields lock, prior duplicate acknowledgements
 * re-arm, and the patient stays unconfirmed until the desk identifies them.
 *
 * Only fields the record actually carries are locked. Locking an empty
 * required field would leave it permanently unfillable, and the desk must
 * never edit a record-derived value to make it fit the person in front of it.
 */
export function resolvedRecordPatch(record: PatientRecordSummary): Partial<FrontDeskPatient> {
  const lockedFields = (
    [
      ['name', record.name],
      ['dob', record.dob],
      ['sexAtBirth', record.sexAtBirth],
    ] as const
  )
    .filter(([, value]) => (value ?? '').trim() !== '')
    .map(([field]) => field);

  return {
    name: record.name,
    nameKhmer: record.nameKhmer ?? '',
    dob: record.dob ?? '',
    sexAtBirth: record.sexAtBirth,
    idNumber: record.nid ?? '',
    phoneNumber: (record.phone ?? '').replace(/\D/g, ''),
    identity: { source: 'existing', lockedFields },
    identityConfirmation: null,
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
