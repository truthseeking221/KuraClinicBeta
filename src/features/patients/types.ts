/**
 * Patients domain types.
 *
 * `PatientSummary` mirrors the kura-platform `WorkspacePatient` wire message
 * verbatim (patient.proto `ListWorkspacePatients`): eight fields, nothing
 * more. The backend list is workspace-membership driven (patient origination
 * events), ordered by most recent activity, and paginated by limit/offset.
 * It accepts no filter, sort, or search parameters.
 *
 * Names and phones arrive masked or already revealed through an audited PII
 * seam. Names are stored encrypted with no searchable index, so a free-text
 * name search cannot exist on this surface by design.
 *
 * `PatientTriage` is a deliberately separate target-contract layer: the
 * "why now" worklist signal the legacy prototype proved useful. No backend
 * model exists for it yet, so it stays optional everywhere and the registry
 * renders honestly without it.
 */

/** patient-ms assurance axis. The only identity status the platform has. */
export type PatientAssurance = 'unverified' | 'verified';

/** Structural terminal states from patient_profiles.status ('' = none). */
export type PatientTerminalStatus = '' | 'deceased' | 'merged';

export type PatientSex = 'M' | 'F' | 'Unknown';

export type PatientSummary = {
  userId: string;
  /** Decrypted display name; empty when the record is crypto-shredded. */
  displayName: string;
  sexAtBirth: PatientSex;
  /** Derived server-side from date or year of birth; 0 when unknown. */
  age: number;
  hasAge: boolean;
  /** `··` + last two digits of the provisional code; empty when none. */
  mrnMasked: string;
  /** `+XX*****1234`; empty when no verified primary phone. */
  phoneMasked: string;
  assurance: PatientAssurance;
  /** '' | 'deceased' | 'merged' — terminal states outrank assurance. */
  status: PatientTerminalStatus;
  /**
   * True when the per-patient encryption key was destroyed: the record
   * exists but its name and phone can never be revealed again.
   */
  shredded?: boolean;
};

/** Assurance filter for the registry toolbar. Client-side until the list RPC grows a filter param. */
export type AssuranceFilter = 'all' | PatientAssurance;

export type PatientTriageTone = 'danger' | 'warning' | 'info';

/**
 * TARGET CONTRACT — no backend model exists for triage yet.
 * One signal per patient: the reason this patient needs attention now.
 */
export type PatientTriage = {
  /** Short, specific reason, e.g. "Results to review". */
  label: string;
  tone: PatientTriageTone;
};

/** Map keyed by userId. Absent map = the layer is off and its column hides. */
export type PatientTriageMap = Readonly<Record<string, PatientTriage>>;

export type PatientsViewState = 'ready' | 'loading' | 'error';

/* ── Chart ─────────────────────────────────────────────────── */

export type PatientChartTab = 'overview' | 'orders' | 'results';

export type PatientChartState = 'ready' | 'loading' | 'error' | 'not-found';

/** Canonical order lifecycle from libs/contracts status/order-status.ts. */
export type PatientOrderStatus =
  | 'placed'
  | 'in_fulfillment'
  | 'partially_complete'
  | 'completed'
  | 'cancelled';

export type PatientOrderLine = {
  code: string;
  displayName: string;
};

/**
 * One order as the clinic BFF returns it for a patient
 * (GET /clinic/reception/patient/:userId/orders).
 */
export type PatientOrder = {
  ordId: string;
  /** Human order code, e.g. "AB12345". */
  code: string;
  /** Pre-formatted placement label; fixtures never read the clock. */
  placedAtLabel: string;
  status: PatientOrderStatus;
  needsAttention?: boolean;
  lineItems: readonly PatientOrderLine[];
};

/** Document types the verify-identity endpoint accepts. */
export type IdentityDocumentType = 'KH_NID' | 'PASSPORT' | 'OTHER';

/* ── Prescribe rail (TARGET CONTRACT — no prescription or ICD model exists) ── */

/** One coded diagnosis giving the prescription its clinical grounding. */
export type DiagnosisContext = {
  code: string;
  label: string;
  /** Supporting evidence line, e.g. "HbA1c 8.9% · not repeated". */
  evidence?: string;
};

export type PrescribeDecision = 'keep' | 'adjust' | 'pause' | 'stop';

/** A current medication the doctor must decide on before prescribing. */
export type PrescribeMedication = {
  id: string;
  drug: string;
  dose: string;
  frequency: string;
  /** Why this one needs eyes, e.g. "eGFR 11. Contraindicated in renal failure." */
  risk: string;
  doseOptions: readonly string[];
  frequencyOptions: readonly string[];
};

/** A medication already settled before this session. */
export type SettledMedication = {
  id: string;
  drug: string;
  dose: string;
  frequency: string;
  status: 'active' | 'paused';
};

/** A Kura-suggested addition; the doctor adds it deliberately, never auto. */
export type MedicationSuggestion = {
  id: string;
  drug: string;
  dose: string;
  reason: string;
};

/**
 * TARGET CONTRACT — progressive result release for one episode. The order
 * status axis (partially_complete) is real; per-batch counts, flags, and
 * arrival notes have no backend model yet.
 */
export type ResultsProgress = {
  resulted: number;
  total: number;
  /** Values outside reference so far; 0 means nothing needs eyes yet. */
  flagged: number;
  /** Pre-formatted arrival note, e.g. "Chemistry lands about 4:30 PM." */
  arrivalNote?: string;
};
