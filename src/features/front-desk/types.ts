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

export type PaymentStatus =
  | 'idle'
  | 'waiting'
  | 'confirmed'
  | 'deferred'
  | 'no-charge'
  | 'split-cash'
  /** Routed to the insurer; copay collected separately. PROTOTYPE: upstream is cash-only. */
  | 'pending-claim';
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

export type IdentitySource = 'manual' | 'qr' | 'existing' | null;

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
 * Canonical collection-code lifecycle, verbatim from
 * `libs/contracts/src/lib/status/collection-code-status.ts`. `draft` never
 * reaches the reception surface — codes arrive at least `issued`.
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
export type BookingBlockReason = 'expired' | 'cancelled' | 'redeemed' | 'wrong-branch';

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

export type StepId = 1 | 2 | 3 | 4 | 5 | 6;
export type StepStatus = 'locked' | 'active' | 'done';

export type WizardGate = {
  stepStatus: Record<StepId, StepStatus>;
  step1Done: boolean;
  step2Done: boolean;
  step3Done: boolean;
  step4Done: boolean;
  step5Done: boolean;
  step6Done: boolean;
  paid: boolean;
  payLater: boolean;
  isReadyToCheckIn: boolean;
};

// ── Desk queue (arrivals) ──────────────────────────────────
//
// PROTOTYPE SURFACE: kura-platform has no visit/queue engine or enum today.
// The axes below follow the domain-truth lifecycle table and are never
// collapsed into one master status — payment success is not an arrival, and
// a completed draw is not a collected payment.

/** Visit axis (domain truth): reception owns arrival; phlebotomy owns draw completion. */
export type VisitStage = 'arrived' | 'identity-resolved' | 'draw-complete' | 'completed';

/** Payment axis as the desk sees it — independent from the visit axis. */
export type VisitPaymentFact = 'pending' | 'collected' | 'deferred' | 'waiting';

export type DeskVisit = {
  id: string;
  queueNumber: number;
  patientName: string;
  nameKhmer?: string;
  arrivedLabel: string;
  /** Minutes since arrival, injected — the queue never reads the clock. */
  waitMinutes: number;
  stage: VisitStage;
  /** patient-ms assurance axis, shown as its own fact. */
  assurance: 'unverified' | 'verified';
  payment: VisitPaymentFact;
  /** Present while a check-in is unfinished: the step the desk resumes at. */
  resumeStep?: StepId;
  /** Set once the visit has been queued for phlebotomy. */
  queuedForDraw?: boolean;
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
