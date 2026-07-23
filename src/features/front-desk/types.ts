/** Front-desk domain types. Money follows backend int64 minor-unit strings. */

import type { LicenceState } from '../licence/logic';

export type CartItemKind = 'visit' | 'lab' | 'imaging' | 'ecg' | 'vitals' | 'telecon';

/**
 * Consent chain on a line that needs it (imaging, sensitive tests).
 * PROTOTYPE SURFACE: kura-platform has no consent engine — the chain of
 * custody (who consented, how, witnessed by whom, when) is the proposed
 * contract, and it never collapses into a boolean.
 */
export type LineConsent =
  | { state: 'needed' }
  | { state: 'sent'; atLabel: string }
  | { state: 'signed'; atLabel: string }
  | {
      state: 'verbal';
      byLabel: string;
      atLabel: string;
      /** Present when a supervisor witnessed a sensitive-test consent. */
      witnessed?: boolean;
      pregnancyAnswer?: 'not-pregnant' | 'possibly' | 'declined';
    };

export type CartItem = {
  id: string;
  kind: CartItemKind;
  name: string;
  /** Universal exponent-2 minor units from the priced-order contract. */
  priceMinor: string;
  currencyCode: 'USD';
  qty: number;
  fasting?: boolean;
  consent?: LineConsent;
  /**
   * Who is expected to pay this line. Payer responsibility is per line, not
   * per visit: one basket can hold a covered lab and a self-pay scan, and the
   * desk resolves each before money is taken. Unset until the payer task runs.
   */
  payer?: 'insurer' | 'direct';
  /**
   * Pregnancy screen recorded when imaging was ordered for a patient whose
   * sex at birth is Female. "possibly"/"declined" only pass with a named
   * clinician override — otherwise the order is cancelled, never defaulted.
   */
  pregnancyScreen?: {
    answer: 'not-pregnant' | 'possibly' | 'declined';
    overrideBy?: string;
  };
};

/**
 * A promotion the desk applied to the cart. PROTOTYPE SURFACE: kura-platform
 * has no promo engine — the discount order (item → fixed → percent, each
 * against the running remainder) is the legacy money rule being carried.
 */
export type Promo =
  | { code: string; label: string; kind: 'item'; itemId: string; percentOff: number }
  | { code: string; label: string; kind: 'fixed'; amountMinor: string }
  | { code: string; label: string; kind: 'percent'; percentOff: number };

/**
 * Every state here is a payment the desk can actually reach. Insurer claims
 * are not among them: the platform captures cash only, so routing a balance
 * to an insurer would be a completion the clinic cannot honour. Claims appear
 * as a disabled design target on the payer task instead.
 */
export type PaymentStatus =
  | 'idle'
  | 'waiting'
  | 'confirmed'
  | 'deferred'
  | 'no-charge'
  | 'split-cash';
export type PaymentMethod = 'cash' | 'khqr' | 'split' | null;

export type CartPayment = {
  status: PaymentStatus;
  method: PaymentMethod;
  tendered: string;
  changeMinor: string;
  receiptId: string | null;
  confirmedAt: string | null;
  amountMinor: string | null;
  cashier?: string;
  /** Paid-edit outcomes. */
  supplementalDue?: boolean;
  previousReceiptId?: string | null;
  previousPaidAmountMinor?: string;
  voidedReceiptId?: string | null;
  /** Split flow: confirmed cash portion in USD. */
  cashPortionMinor?: string;
  /**
   * KHQR intent lifecycle while `status` is `waiting`/`split-cash`. The QR is
   * an expiring intent: it can lapse or be cancelled and regenerated — the
   * desk never treats a stale QR as collectable. PROTOTYPE: no Bakong
   * provider integration exists upstream.
   */
  khqrState?: 'waiting' | 'expired' | 'cancelled';
};

/**
 * Order attribution (ADR-0057): a receptionist places on behalf of an
 * authorized clinician. The server rejects placement with 422
 * `NO_ELIGIBLE_PRESCRIBER` when the attributed prescriber is not an eligible
 * workspace member — the UI mirrors that gate before submission.
 */
export type Prescriber = {
  userId: string;
  name: string;
  specialty?: string;
  workspaceMember: boolean;
  /** `expired` is the legacy desk contract; lifecycle-native callers use LicenceState. */
  licence: LicenceState | 'expired';
};

/**
 * Pricing snapshot from the server cart expansion. Prices are re-derived at
 * placement; a version drift means the desk must re-accept the new total —
 * the client never silently keeps a stale price.
 */
export type CartPricing = {
  catalogVersion: string;
  pricingVersion: string;
  state: 'current' | 'stale';
  /** Present when stale: lines whose server price changed since quoting. */
  repricedLines?: Array<{
    itemId: string;
    name: string;
    oldPriceMinor: string;
    newPriceMinor: string;
  }>;
};

/**
 * Placement failures the desk must surface. `code-issuance-failed` means the
 * order EXISTS but the patient has no usable code (booking list shows
 * needs-attention); `idempotency-conflict` means this request already
 * succeeded once and must not be retried blindly.
 */
export type PlaceOrderFailure = 'code-issuance-failed' | 'idempotency-conflict';

export type Cart = {
  items: CartItem[];
  payment: CartPayment;
  /** Attributed clinician for this order; required before placement. */
  attributedPrescriberId?: string | null;
  pricing?: CartPricing;
  placeFailure?: PlaceOrderFailure | null;
  /** Promotions applied at the desk, in the order they were entered. */
  promos?: Promo[];
};

export type EligibilityResult =
  | {
      kind: 'eligible';
      tier: string;
      coveragePct: number;
      copayMinor: string;
      activeUntil: string;
      group?: string;
      preAuth?: 'required' | 'not-required';
      effectiveFrom?: string;
      verifiedAtLabel?: string;
    }
  | { kind: 'ineligible' }
  | { kind: 'unreachable' };

export type InsurancePolicy = {
  id: string;
  provider: string;
  policyNumber: string;
  memberName: string;
  memberId?: string;
  coverageScope?: 'outpatient' | 'inpatient' | 'both';
  expiry?: string;
  eligibility?: EligibilityResult;
};

export type PatientAddress = {
  province: string;
  district: string;
  commune: string;
  street: string;
};

export type TeleconsultState = {
  status: 'notBooked' | 'booked' | 'waived';
  slot?: string;
  specialty?: string;
  /** Set when the desk knowingly booked before results are expected. */
  earlyOverride?: boolean;
};

/** Who supplied an intake answer — provenance is display-worthy, not audit theatre. */
export type IntakeAuthor = 'patient' | 'nurse' | 'system';

/**
 * Where the identity on this visit came from. A scanned QR is not a source:
 * it is one way of entering a booking code, and the code resolves to an
 * `existing` record like any other lookup.
 */
export type IdentitySource = 'manual' | 'existing' | null;

export const INTAKE_SKIP_REASONS = [
  { code: 'patient-declined', label: 'Patient declined' },
  { code: 'no-phone', label: 'No usable phone' },
  { code: 'language-barrier', label: 'Language barrier' },
  { code: 'urgent-visit', label: 'Urgent visit — no time' },
  { code: 'other', label: 'Other' },
] as const;
export type IntakeSkipReasonCode = (typeof INTAKE_SKIP_REASONS)[number]['code'];

export const UNVERIFIED_REASONS = [
  { code: 'no-sms-access', label: 'No SMS access' },
  { code: 'patient-declined', label: 'Patient declined' },
  { code: 'guardian-phone', label: 'Guardian phone only' },
  { code: 'sms-down', label: 'SMS service down' },
  { code: 'other', label: 'Other' },
] as const;
export type UnverifiedReasonCode = (typeof UNVERIFIED_REASONS)[number]['code'];

// ── Step-1 identity resolution ─────────────────────────────

/** What the reception search input parsed the query as. */
export type IdentityQueryKind = 'phone' | 'code' | 'name';

/**
 * What a scanned payload turned out to be. `partial` is a Kura QR still
 * arriving from a desk scanner; `foreign` is a QR that is not a Kura booking
 * QR and must never be mined for a code-shaped substring.
 */
export type ScanReading =
  | { kind: 'code'; code: string }
  | { kind: 'partial' }
  | { kind: 'foreign' }
  | null;

/**
 * Canonical collection-code lifecycle, verbatim from
 * `libs/contracts/src/lib/status/collection-code-status.ts`. `draft` never
 * reaches the reception surface — codes arrive at least `issued`.
 *
 * `expired` is declared by the contract but has no producer: collection codes
 * do not lapse. The desk therefore never blocks a code for expiry, and no
 * story may stage that state as if a patient could meet it.
 */
export const COLLECTION_CODE_STATUSES = [
  'issued',
  'scheduled',
  'redeemed',
  'expired',
  'cancelled',
] as const;
export type CollectionCodeStatus = (typeof COLLECTION_CODE_STATUSES)[number];

/** Why a resolved booking code cannot be checked in at this desk. */
export type BookingBlockReason = 'cancelled' | 'redeemed' | 'wrong-branch';

export type BookingSummary = {
  code: string;
  /** Canonical lifecycle state — display labels derive from this, never freehand. */
  codeStatus: CollectionCodeStatus;
  whenLabel: string;
  itemsLabel: string;
  status: { label: string; tone: 'success' | 'warning' | 'neutral' };
  /** Branch the code was issued for; reception at another branch cannot redeem it. */
  branchId?: string;
  locationLabel?: string;
  providerLabel?: string;
  /** Who created the booking — reception on behalf vs the patient themselves. */
  creatorLabel?: string;
  /**
   * Capture contract (payment-ms): `paid` is the only real capture state;
   * `pending` means no capture exists yet. Amount in minor units.
   */
  payment?: { state: 'paid' | 'pending'; amountMinor: string };
};

/** One derived event on a booking's lifecycle timeline. */
export type BookingTimelineEvent = {
  step: number;
  title: string;
  dateLabel?: string;
  detail?: string;
  tone: 'neutral' | 'success' | 'warning' | 'danger';
  current?: boolean;
};

/** A registry record the resolver can return — the reception view of patient-ms. */
export type PatientRecordSummary = {
  id: string;
  name: string;
  nameKhmer?: string;
  dob?: string;
  sexAtBirth: 'Female' | 'Male' | '';
  nid?: string;
  phone?: string;
  /** patient-ms assurance axis. */
  assurance: 'unverified' | 'verified';
  /** Minors require a present guardian before check-in continues. */
  minor?: boolean;
  guardianName?: string;
  /** Registered at this PSC or known only elsewhere in Kura. */
  registeredHere: boolean;
  lastVisitLabel?: string;
  bookings?: BookingSummary[];
  /**
   * Months since the phone channel was last verified. PROTOTYPE FIELD —
   * patient-ms stores only the assurance flag, not verification recency.
   */
  phoneVerifiedMonthsAgo?: number;
};

/** One trust fact about how sure the desk can be this record is current. */
export type TrustSignal = {
  label: string;
  tone: 'success' | 'info' | 'neutral' | 'warning' | 'danger';
};

export type IdentityResolution =
  | { kind: 'known-here'; record: PatientRecordSummary }
  | { kind: 'known-elsewhere'; record: PatientRecordSummary }
  | { kind: 'shared-phone'; records: PatientRecordSummary[] }
  | { kind: 'booking-linked'; record: PatientRecordSummary; booking: BookingSummary }
  | {
      /** Code resolved but cannot be redeemed here — expired, cancelled, already redeemed, or issued for another branch. */
      kind: 'booking-blocked';
      record: PatientRecordSummary;
      booking: BookingSummary;
      reason: BookingBlockReason;
    }
  | { kind: 'candidates'; records: PatientRecordSummary[] }
  | { kind: 'no-match'; queryKind: IdentityQueryKind; query: string };

export type FrontDeskPatient = {
  id: string;
  queueNumber: number;
  /** Arrival time as the desk announces it, e.g. "08:24 · 12 min ago". */
  arrivedLabel?: string;
  name: string;
  nameKhmer: string;
  dob: string;
  sexAtBirth: 'Female' | 'Male' | '';
  idNumber: string;
  preferredLanguage: 'Khmer' | 'English';
  address: PatientAddress;
  /** Bakong KHQR account for refunds; optional by design. */
  refundAccount: string | null;
  countryCode: string;
  phoneNumber: string;
  otpVerified: boolean;
  /**
   * Telegram channel: the patient scans a QR on the customer display and
   * shares their number — the desk never types it. PROTOTYPE: no Telegram
   * integration exists upstream.
   */
  telegramVerified: boolean;
  telegramHandle?: string;
  /** Which verified channel the patient prefers for reminders and results. */
  preferredChannel: 'sms' | 'telegram' | null;
  /**
   * Recorded reason when the visit proceeds without a verified channel.
   * Mirrors the backend trusted-desk door: reception provisioning has no OTP
   * requirement — verification is assurance, not a gate. The reason keeps the
   * decision honest instead of silently skipping.
   */
  unverifiedReason: { code: UnverifiedReasonCode; note?: string } | null;
  identity: { source: IdentitySource; lockedFields: string[]; capturedAtLabel?: string };
  /**
   * Positive identification of the person at the desk, recorded when the
   * answers to open questions matched the record. Null means the record was
   * found but the person has not been identified — finding a booking is not
   * identifying a patient. PROTOTYPE SURFACE: no confirmation command exists
   * upstream; the fact is carried on the visit.
   */
  identityConfirmation: { method: 'open-questions'; byLabel: string; atLabel: string } | null;
  /** The one booking this check-in redeems, when the visit is booking-led. */
  boundBookingCode?: string | null;
  insurance: InsurancePolicy[];
  insuranceAcked: boolean;
  collisionAcked: string[];
  teleconsult: TeleconsultState;
  cart: Cart;
  intake: IntakeFields;
  /** Set when the secure intake link went to the patient's phone. */
  intakeSentAtLabel?: string | null;
  /**
   * Recorded decision to proceed without the intake. Never a gate — the
   * reason keeps the skip honest, mirroring the unverified-contact pattern.
   */
  intakeSkipped?: { code: IntakeSkipReasonCode; note?: string } | null;
  intakeAuthors?: Partial<Record<keyof IntakeFields, IntakeAuthor>>;
  visitReason: string[];
};

export type IntakeFields = {
  chiefComplaint: string;
  preTestPrep: string;
  medications: string;
  womensHealth: string;
  recentEvents: string;
  lifestyle: string;
  sampleComfort: string;
  sensitiveConsent: string;
};

// ── Check-in tasks ─────────────────────────────────────────
//
// A visit is not a six-step form. Each task below is an independent axis of
// the same visit, and a visit only carries the tasks its own facts require:
// a booking-led arrival reviews quoted lines instead of composing them, a
// patient with no policy never sees payer resolution, and a cart with no
// teleconsult never shows a pre-consult step. Order is information
// dependency, not habit — payer cannot resolve before the lines it pays for
// exist.

export type DeskTaskId =
  /** How the person arrived: booking code, phone match, or walk-in. */
  | 'arrival'
  /** The person in front of the desk: details, contact ownership, identity assurance. */
  | 'patient'
  /** The order lines: composed here, or reviewed when the booking already quoted them. */
  | 'orders'
  /** Who pays each line. Only exists when the patient has a policy on file. */
  | 'payer'
  /** Only exists when a teleconsult line is in the cart. */
  | 'preconsult'
  /** Collect, defer, or record no charge. */
  | 'payment';

export const DESK_TASK_ORDER: DeskTaskId[] = [
  'arrival',
  'patient',
  'orders',
  'payer',
  'preconsult',
  'payment',
];

export type StepStatus = 'locked' | 'active' | 'done';

export type CheckInGate = {
  /** The tasks this visit actually carries, in dependency order. */
  tasks: DeskTaskId[];
  status: Record<DeskTaskId, StepStatus>;
  done: Record<DeskTaskId, boolean>;
  /** Why a task is not done yet — shown beside its blocked action, never alone. */
  blockers: Partial<Record<DeskTaskId, string>>;
  paid: boolean;
  payLater: boolean;
  isReadyToCheckIn: boolean;
};

/** One rejected identity field, with the reason the desk can act on. */
export type IdentityFieldIssue = {
  field: 'name' | 'dob';
  message: string;
};

// ── Desk queue (arrivals) ──────────────────────────────────
//
// PROTOTYPE SURFACE: kura-platform has no visit/queue engine or enum today.
// The axes below follow the domain-truth lifecycle table and are never
// collapsed into one master status — payment success is not an arrival, and
// a completed draw is not a collected payment.

/**
 * Visit axis (domain truth). One PSC staffer carries a visit from arrival
 * through the draw, so `in-draw` is a reception-visible stage, not a handoff
 * to another surface.
 */
export type VisitStage =
  | 'arrived'
  | 'identity-resolved'
  | 'in-draw'
  | 'draw-complete'
  | 'completed';

/** Payment axis as the desk sees it — independent from the visit axis. */
export type VisitPaymentFact = 'pending' | 'collected' | 'deferred' | 'waiting';

/**
 * Why this visit holds the position it holds. Order is a clinical and
 * contractual promise, not arrival luck: an urgent draw outranks a kept
 * appointment, and a kept appointment outranks a walk-in who arrived first.
 */
export type ArrivalClass = 'stat' | 'appointment' | 'walk-in';

/**
 * Calling axis. Separate from the visit stage because a called patient who
 * does not answer is still waiting for care — skipping is a recorded desk
 * decision with a reason, never a silent drop.
 */
export type QueueCall =
  | { state: 'waiting' }
  | { state: 'called'; atLabel: string; deskLabel: string }
  | { state: 'serving'; deskLabel: string }
  | { state: 'skipped'; atLabel: string; reason: QueueSkipReasonCode };

export const QUEUE_SKIP_REASONS = [
  { code: 'no-answer', label: 'No answer at the desk' },
  { code: 'stepped-out', label: 'Patient stepped out' },
  { code: 'not-ready', label: 'Patient not ready' },
  { code: 'interpreter', label: 'Waiting for an interpreter' },
] as const;
export type QueueSkipReasonCode = (typeof QUEUE_SKIP_REASONS)[number]['code'];

export type DeskVisit = {
  id: string;
  queueNumber: number;
  /**
   * The number the waiting room sees, printed on the slip. Distinct from the
   * internal queue number so a recall or a merge never renumbers the room.
   */
  ticket: string;
  patientName: string;
  nameKhmer?: string;
  arrivedLabel: string;
  /** Minutes since arrival, injected — the queue never reads the clock. */
  waitMinutes: number;
  arrivalClass: ArrivalClass;
  /** Booked slot as the desk announces it, e.g. "09:30". Appointments only. */
  appointmentLabel?: string;
  /**
   * Minutes until the booked slot, injected. Negative means the slot has
   * passed. An appointment only outranks walk-ins once its slot is due.
   */
  appointmentMinutesAway?: number;
  /** Times this visit was called and did not answer. A recall waits again. */
  recalls?: number;
  call: QueueCall;
  stage: VisitStage;
  /**
   * patient-ms assurance axis: someone checked this person's identity
   * document. A verified phone never sets this.
   */
  assurance: 'unverified' | 'verified';
  /** Contact-ownership axis: the patient proved control of the channel. */
  contact: 'unconfirmed' | 'confirmed';
  payment: VisitPaymentFact;
  /** Present while a check-in is unfinished: the task the desk resumes at. */
  resumeTask?: DeskTaskId;
};

export type DeskQueueState = 'ready' | 'loading' | 'error' | 'offline' | 'stale' | 'denied';

export type CollisionSignal = 'idMatch' | 'phoneMatch' | 'nameDobMatch' | 'sexMatch' | 'sexMismatch';

export type CollisionCandidate = {
  patient: FrontDeskPatient;
  signals: CollisionSignal[];
  score: number;
  strength: string;
};

/**
 * A logged supervisor decision to proceed past a duplicate warning.
 * PROTOTYPE SURFACE: kura-platform has no override RPC — the audit framing
 * (who, when, cannot be undone at the desk) is the contract being proposed.
 */
export type CollisionOverride = {
  candidateId: string;
  staffName: string;
  atLabel: string;
};
