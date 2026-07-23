/**
 * Collection-mode domain types.
 *
 * The model separates five things the previous version collapsed into one
 * `Sample[]`, and the separation is the safety property:
 *
 *   ExpectedSpecimenPlanItem  what the order says must be drawn. No sample id,
 *                             no barcode — nothing physical exists yet.
 *   CollectionAttempt         a try that did not become a sample, with an
 *                             outcome, an owner, and a next action.
 *   ActualSample              a tube that physically exists. It is born at
 *                             `collected` when the backend registers the draw,
 *                             and its identity comes back from the backend.
 *   LabelEvidence             printed, attached and verified — or an explicit
 *                             manual fallback that accession must relabel.
 *   CustodyEvent              who handed over, who received, where, and when.
 *
 * A plan item is not a sample. Marking a row does not create a tube. Nothing
 * downstream may treat a locally-set flag as a physical fact.
 */

export type TubeKey =
  | 'yellow-sps'
  | 'light-blue'
  | 'red'
  | 'gold-sst'
  | 'green'
  | 'gray-green'
  | 'lavender'
  | 'pink'
  | 'white'
  | 'dark-gray';

export type TubeSpec = {
  key: TubeKey;
  /** CLSI order-of-draw position, 1-based. */
  order: number;
  stopperLabel: string;
  additive: string;
  short: string;
  /** Required gentle inversions after draw. */
  inversions: number;
  /**
   * Minutes the tube must stand before it may be processed. A clock that has
   * not run out here means "not ready yet", never "late".
   */
  minimumClotMinutes: number | null;
  /**
   * Minutes after draw by which the tube must reach processing. This is the
   * deadline; the two were one field before, so a tube that had just finished
   * clotting was displayed as overdue.
   */
  processWithinMinutes: number | null;
  handling: string[];
  /** Presentation only — rack glyph colors, consumed as CSS custom props. */
  color: string;
  stripeColor: string;
};

/** What the order requires. Carries no identity: the tube does not exist yet. */
export type ExpectedSpecimenPlanItem = {
  /** Plan-item id from the order. Never printed on a tube. */
  id: string;
  tube: TubeKey;
  tests: string[];
  volumeMl: number;
  container: string;
  stat: boolean;
};

export type LabelState =
  | 'not_printed'
  | 'printed'
  | 'verified'
  /** Handwritten because no printer was available. Accession must relabel. */
  | 'manual_fallback';

export type LabelEvidence = {
  state: LabelState;
  printedAtMs?: number;
  verifiedAtMs?: number;
  manualReason?: string;
};

/**
 * A tube that exists. Created only by a successful draw registration, and
 * never reverted: a drawn tube cannot be un-drawn by a UI action.
 */
export type ActualSample = {
  /** Backend-issued sample identity. Also the custody scan target. */
  sampleId: string;
  planItemId: string;
  tube: TubeKey;
  tests: string[];
  volumeMl: number;
  stat: boolean;
  drawnAtMs: number;
  drawnAtLabel: string;
  drawnBy: string;
  site: string;
  inverted: boolean;
  label: LabelEvidence;
  /** Absolute times derived from the tube spec at registration. */
  readyToProcessAtMs: number | null;
  processByMs: number | null;
  /** Set by a post-registration correction; the sample itself is not deleted. */
  issue?: SampleIssue;
};

export type SampleIssueReason =
  | 'hemolysed'
  | 'underfilled'
  | 'wrong_tube'
  | 'label_unreadable'
  | 'broken_in_transit';

export type SampleIssue = {
  reason: SampleIssueReason;
  note?: string;
  reportedAtMs: number;
  reportedBy: string;
  /** A redraw creates a new sample that supersedes this one. */
  supersededBySampleId?: string;
};

/** Why a plan item did not become a sample on this visit. */
export type AttemptOutcome =
  | 'failed_access'
  | 'patient_refused'
  | 'insufficient_volume'
  | 'not_fasted'
  | 'adverse_event'
  | 'waived';

/** Who has to act next. An outcome without an owner is not a closure. */
export type OutcomeOwner = 'collector' | 'front_desk' | 'ordering_doctor' | 'patient';

export type CollectionAttempt = {
  planItemId: string;
  outcome: AttemptOutcome;
  owner: OutcomeOwner;
  nextAction: string;
  note?: string;
  recordedAtMs: number;
  recordedBy: string;
};

export type CustodyEvent = {
  sampleIds: string[];
  fromActor: string;
  toActor: string;
  location: string;
  atMs: number;
};

/** Two independent statements the patient makes, never a leading yes/no. */
export type IdentityAnswer = 'unanswered' | 'match' | 'mismatch';

export type PositiveIdentification = {
  name: IdentityAnswer;
  dob: IdentityAnswer;
  /** The patient cannot state their own details; a supervisor must resolve it. */
  unableToState: boolean;
  supervisorOverrideBy?: string;
  confirmedAtMs?: number;
  confirmedBy?: string;
};

/** Prep facts the collector checks. Consent is absent: PH-14 defers capture. */
export type PreDrawChecks = {
  fasting: boolean;
  allergy: boolean;
};

export type PaymentGate = {
  /** PSC collection is pay-before-draw; home collection settles elsewhere. */
  required: boolean;
  settled: boolean;
  amountLabel?: string;
};

/** Upstream conditions that must hold before any tube may be drawn. */
export type EpisodeGates = {
  bookingRedeemed: boolean;
  orderPlaced: boolean;
  payment: PaymentGate;
};

export type JourneyState = 'waiting' | 'pending' | 'done';

export type CollectionPatient = {
  id: string;
  /** Patient ID barcode, format P + 4–8 digits. */
  pid: string;
  name: string;
  initials: string;
  sex: 'F' | 'M';
  dob: string;
  orderId: string;
  checkInAt: string;
  waitingMinutes: number;
  /** STAT and appointment order the queue ahead of waiting time. */
  stat: boolean;
  appointmentAt?: string;
  /** waiting = blocked upstream · pending = ready for this booth · done. */
  journey: { identity: JourneyState; vitals: JourneyState; phlebo: JourneyState };
  fasting: string;
  allergies: string[];
  gates: EpisodeGates;
  /** What must be drawn. Not tubes — a plan. */
  plan: ExpectedSpecimenPlanItem[];
  vitals?: VitalsValues;
};

/** Everything this collection has produced so far, in one serialisable value. */
export type CollectionDraft = {
  identity: PositiveIdentification;
  checks: PreDrawChecks;
  arm: 'L' | 'R';
  site: string;
  samples: ActualSample[];
  attempts: CollectionAttempt[];
  custody?: CustodyEvent;
};

export type StationRole = 'vitals' | 'phlebotomy';

export type VitalsValues = {
  heightCm: string;
  weightKg: string;
  hr: string;
  bpSys: string;
  bpDia: string;
  tempC: string;
  tempUnit: 'C' | 'F';
  spo2: string;
  breathing: string;
  painVas: number;
  fasting: string | null;
  vaccinationNote: string;
};

export type TimerTone = 'success' | 'warn' | 'danger';

// ── Backend seams ──────────────────────────────────────────
// Registration is the moment a sample exists. The prototype injects the
// verdict so every failure path is reachable in Storybook.

export type RegisterDrawResult =
  /** A new sample was created; the identity comes from the backend. */
  | { kind: 'registered'; sampleId: string }
  /** The same idempotency key was already registered — replay, not a duplicate. */
  | { kind: 'duplicate'; sampleId: string }
  | { kind: 'timeout' }
  | { kind: 'rejected'; reason: string }
  /** Another station already resolved this plan item. */
  | { kind: 'stale' };

export type LabelPrintResult = { kind: 'printed' } | { kind: 'printer_offline' };

/** Scanning the attached label back is what proves it went on the right tube. */
export type LabelScanResult =
  | { kind: 'verified'; sampleId: string }
  | { kind: 'wrong_sample'; sampleId: string }
  | { kind: 'unknown' };
