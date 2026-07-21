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
    level: 'ready',
    note: 'Catalog browsing and pricing consume the real catalog contract with int64 minor-unit money strings.',
    owner: 'src/features/lab-catalog',
  },
  frontDesk: {
    area: 'Clinic/Front Desk',
    level: 'partial',
    note: 'Booking and priced carts follow the real contracts. Payment capture is cash-only in the backend; receipts and the desk queue are local scaffolding.',
    owner: 'src/features/front-desk',
  },
  collection: {
    area: 'Clinic/Collection',
    level: 'partial',
    note: 'Sample lifecycle states match the canonical gRPC enums, but the clinic REST layer does not expose sample operations yet.',
    owner: 'src/features/collection',
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
  patientContext: {
    area: 'Clinic/Clinical/Patient Context Rail',
    level: 'gap',
    note: 'Patient identity search and verification exist, but the clinic BFF does not expose a longitudinal patient-chart context for allergies, active problems, medications, history, or administrative details. This rail is target-contract scaffolding with deterministic fixtures only.',
    owner: 'src/features/patient-context',
  },
  settings: {
    area: 'Clinic/Settings',
    level: 'partial',
    note: 'Workspace, membership, and credential context are real platform concepts. Section actions follow the legacy prototype contract: local state plus toast, no persistence except device preferences. Person-owned doctor balances and ABA authorizations are excluded and owned by Earnings.',
    owner: 'src/features/settings',
  },
  doctorBanking: {
    area: 'Clinic/Finance/Earnings',
    level: 'gap',
    note: 'Stories map the signed person-global ledger, doctor-audience notifications, statements, KHQR, and mandate lifecycle to the pinned kura-platform contract. The Storybook owner uses deterministic fixtures; KHQR and ABA mandate browser actions are not live at the inspected clinic BFF boundary.',
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
