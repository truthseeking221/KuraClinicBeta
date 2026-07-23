/**
 * Release readiness — the single source of truth for how much of each
 * Storybook domain is backed by the real kura-platform backend versus local
 * demo scaffolding. The governance board renders this file; feature story
 * metas reference the same entries via `parameters.kura.readiness` so a story
 * can never drift from the board.
 *
 * Principle: business truth beats demo content. A surface that looks finished
 * but has no backend contract must say so where the audience can see it.
 */

export type ReadinessLevel = 'ready' | 'partial' | 'gap' | 'deprecated';

export type ReadinessLevelMeta = {
  label: string;
  meaning: string;
  demoGuidance: string;
};

export const READINESS_LEVELS: Record<ReadinessLevel, ReadinessLevelMeta> = {
  ready: {
    label: 'Ready',
    meaning: 'The backend contract is live; the UI consumes real shapes end to end.',
    demoGuidance: 'Safe to demo as product truth.',
  },
  partial: {
    label: 'Partial',
    meaning:
      'The core journey is real; the noted subsets still run on local demo scaffolding.',
    demoGuidance: 'Demo the journey; name the scaffolded parts when asked.',
  },
  gap: {
    label: 'Gap',
    meaning:
      'The UI is ahead of the backend — the whole surface is target-contract scaffolding.',
    demoGuidance: 'Present as design intent, never as shipped capability.',
  },
  deprecated: {
    label: 'Deprecated',
    meaning: 'Scheduled for removal or replacement. Do not extend.',
    demoGuidance: 'Keep out of demos.',
  },
};

export type ReadinessEntry = {
  /** Storybook area the entry governs, e.g. "Clinic/Settings". */
  area: string;
  level: ReadinessLevel;
  /** What is real versus scaffolded, in one or two sentences. */
  note: string;
  /** Feature folder that owns the surface. */
  owner: string;
};

/**
 * Keyed by domain slug. Levels come from the kura-platform capability audit:
 * 16 gRPC services with canonical status enums, but the clinic REST layer
 * does not yet expose sample/test operations or analyte result values, and
 * payments settle cash-only.
 */
export const READINESS = {
  auth: {
    area: 'Clinic/Auth',
    level: 'ready',
    note: 'Door, onboarding wizard, and workspace gate mirror the auth-mf state machines and the workspace/branch context contract.',
    owner: 'src/features/auth',
  },
  phoneGate: {
    area: 'Clinic/Clinical/Phone Gate',
    level: 'partial',
    note: 'Storybook covers the canonical phone-gate states, including shared-phone disambiguation. OTP, lookup, temporary-patient creation, audit events, and permissions remain fixture-only until the clinic BFF contract is consumed.',
    owner: 'src/features/phone-gate',
  },
  labCatalog: {
    area: 'Clinic/Clinical/Lab Catalog',
    level: 'partial',
    note: 'Catalog browsing and pricing follow the real contract with int64 minor-unit money strings. The restored test-detail preview uses Legacy DCM operational fixtures until those fields are exposed by the clinic BFF.',
    owner: 'src/features/lab-catalog',
  },
  frontDesk: {
    area: 'Clinic/Front Desk',
    level: 'partial',
    note: 'Booking and priced carts follow the real contracts. Payment capture is cash-only in the backend, so eligibility, coverage splits, and insurer claims are read-only previews that never complete a check-in. Receipts, ticketing, call order, and the desk queue are local scaffolding.',
    owner: 'src/features/front-desk',
  },
  collection: {
    area: 'Clinic/Collection',
    level: 'gap',
    note: 'The whole PSC journey runs on fixtures and local state. Draw registration, label printing and verification, custody handoff, and collection-attempt outcomes have no clinic REST endpoints — the clinic layer exposes no sample operations at all, and tubes, containers, in_transit, printer pairing and offline mutation queues are still open contract seams. The flow models the target contract, not live behavior.',
    owner: 'src/features/collection',
  },
  journey: {
    area: 'Clinic/Flows/First Patient Journey',
    level: 'partial',
    note: 'Identity, ordering and cash capture stand on real backend contracts. Assessment, result values and the care plan have no backend at all, so the second half of the journey is a product proposal.',
    owner: 'src/features/journey',
  },
  carePlan: {
    area: 'Clinic/Clinical/Care Plan',
    level: 'gap',
    note: 'The platform excludes care plans from v1 by name, ships the tab disabled, and carries a test asserting the concept is absent. The whole surface is a product proposal.',
    owner: 'src/features/care-plan',
  },
  assessment: {
    area: 'Clinic/Clinical/Assessment',
    level: 'gap',
    note: 'The platform has no encounter, note, or diagnosis schema of any kind, and no reserved seam for one. The whole surface is a product proposal.',
    owner: 'src/features/assessment',
  },
  results: {
    area: 'Clinic/Clinical/Results',
    level: 'gap',
    note: 'The backend does not expose analyte result values yet. Every result row, range band, and trend chart renders a target contract, not live data.',
    owner: 'src/features/results',
  },
  home: {
    area: 'Clinic/Clinical/Home',
    level: 'partial',
    note: 'The signal strip composes other domains; it has no dedicated backend endpoint and inherits each source domain’s readiness.',
    owner: 'src/features/home',
  },
  patients: {
    area: 'Clinic/Clinical/Patients',
    level: 'partial',
    note: 'The registry consumes the ListWorkspacePatients contract verbatim: eight masked fields, recency order, offset pagination, no name search (names are encrypted with no searchable index). The "why now" triage column and assurance filtering are target-contract scaffolding with no backend model or filter parameter yet.',
    owner: 'src/features/patients',
  },
  prescribing: {
    area: 'Clinic/Clinical/Patients/Prescribing',
    level: 'gap',
    note: 'The platform exposes no prescription, medication reconciliation, formulary, interaction, signer, or medication-audit contract. The medication draft and every AI suggestion are target-contract scaffolding kept only in the prototype session.',
    owner: 'src/features/patients',
  },
  patientContext: {
    area: 'Clinic/Clinical/Patient Context Rail',
    level: 'gap',
    note: 'Patient identity search and verification exist, but the clinic BFF does not expose a longitudinal patient-chart context for allergies, active problems, medications, history, or administrative details. This rail is target-contract scaffolding with deterministic fixtures only.',
    owner: 'src/features/patient-context',
  },
  settings: {
    area: 'Clinic/Settings',
    level: 'partial',
    note: 'Workspace, membership, and credential context are real platform concepts. Section actions follow the legacy prototype contract: local state plus toast, no persistence except device preferences. Doctor-owned balances and ABA authorizations are excluded and owned by Balance.',
    owner: 'src/features/settings',
  },
  doctorBanking: {
    area: 'Clinic/Finance/Balance',
    level: 'gap',
    note: 'Balance covers the signed doctor-global ledger, month earnings, eleven ledger kinds, doctor-audience notices and receipts, statements, KHQR settlement, the seven mandate states, and the order funding gate. Reads have a clinic BFF boundary; KHQR, ABA linking, unlink, and just-in-time collection are target contract on deterministic fixtures and must not be presented as live.',
    owner: 'src/features/doctor-banking',
  },
  adminDoctorBanking: {
    area: 'Platform Admin/Finance',
    level: 'gap',
    note: 'Stories map ledger directory/detail, audited adjustments, credit-floor history, pull history, and retry eligibility to AdminDoctorBankingDeps. This workspace does not consume the live admin BFF and must be presented as target-contract scaffolding.',
    owner: 'src/features/admin-doctor-banking',
  },
  flows: {
    area: 'Clinic/Flows',
    level: 'partial',
    note: 'Journey glue over mixed-readiness surfaces — each flow inherits the weakest readiness among its pages.',
    owner: 'src/features/*',
  },
} as const satisfies Record<string, ReadinessEntry>;

export type ReadinessKey = keyof typeof READINESS;
