export type FlowCoverageStatus =
  | 'IMPLEMENTED'
  | 'PARTIAL'
  | 'DECIDED'
  | 'OPEN'
  | 'DEFERRED'
  | 'DESIGN-GAP';

export type FlowCoverage = Record<FlowCoverageStatus, number>;

export type ClinicFlowStageId =
  | 'access'
  | 'work'
  | 'patient'
  | 'encounter'
  | 'ordering'
  | 'fulfillment'
  | 'results'
  | 'continuity'
  | 'finance'
  | 'settings';

export type FlowGap = {
  id: string;
  label: string;
  status: FlowCoverageStatus;
};

export type ClinicFlowStage = {
  id: ClinicFlowStageId;
  order: number;
  title: string;
  journeyIds: string;
  journeyCount: number;
  primaryActors: string;
  outcome: string;
  entry: string;
  closure: string;
  handoffs: readonly string[];
  coverage: FlowCoverage;
  gaps: readonly FlowGap[];
  surfaceLabel?: string;
};

const emptyCoverage = (): FlowCoverage => ({
  IMPLEMENTED: 0,
  PARTIAL: 0,
  DECIDED: 0,
  OPEN: 0,
  DEFERRED: 0,
  'DESIGN-GAP': 0,
});

export const CLINIC_FLOW_STAGES: readonly ClinicFlowStage[] = [
  {
    id: 'access',
    order: 0,
    title: 'Access and authority',
    journeyIds: 'ACC-01–12',
    journeyCount: 12,
    primaryActors: 'All staff · owner · administrator',
    outcome: 'Enter the correct workspace with an authenticated, authorized session.',
    entry: 'Sign in or resume a session.',
    closure: 'Active workspace and permitted actions are explicit, or access is safely denied.',
    handoffs: [
      'Authentication establishes the actor, not their clinical authority.',
      'Workspace and branch selection scope every downstream read and write.',
      'Professional verification gates clinical actions without hiding the reason.',
    ],
    coverage: {
      ...emptyCoverage(),
      PARTIAL: 7,
      DECIDED: 1,
      OPEN: 3,
      DEFERRED: 1,
    },
    gaps: [
      { id: 'ACC-09', label: 'Recover a draft after session expiry', status: 'OPEN' },
      { id: 'ACC-10', label: 'Revoke workspace access during an active session', status: 'OPEN' },
      { id: 'ACC-12', label: 'Terminate other sessions safely', status: 'OPEN' },
    ],
  },
  {
    id: 'work',
    order: 1,
    title: 'Work entry and triage',
    journeyIds: 'WQ-01–09',
    journeyCount: 9,
    primaryActors: 'Doctor · reception · clinic staff',
    outcome: 'Understand what needs attention and open the exact authorized context.',
    entry: 'Home, search, inbox, calendar, task, or notification.',
    closure: 'Work is opened, deferred, assigned, resolved, or left with a visible owner.',
    handoffs: [
      'Queues prioritize work but do not change the owning domain state.',
      'Deep links must restore the exact patient, episode, and permission context.',
      'Empty, stale, and failed worklists preserve a safe next action.',
    ],
    coverage: { ...emptyCoverage(), PARTIAL: 8, OPEN: 1 },
    gaps: [
      { id: 'WQ-08', label: 'Authorize and recover notification deep links', status: 'OPEN' },
    ],
    surfaceLabel: 'Open Home',
  },
  {
    id: 'patient',
    order: 2,
    title: 'Patient and identity',
    journeyIds: 'PAT-01–25',
    journeyCount: 25,
    primaryActors: 'Doctor · reception · phlebotomist · patient',
    outcome: 'Open the correct patient and episode with truthful identity assurance.',
    entry: 'Phone gate, booking code, exact-phone lookup, walk-in, or patient search.',
    closure: 'The patient is resolved or created without silent merge, selection, or release.',
    handoffs: [
      'Phone control, patient match, and identity assurance remain separate facts.',
      'Shared phones require a human choice or an explicit new-patient path.',
      'Positive identification at collection remains separate from desk lookup.',
    ],
    coverage: {
      ...emptyCoverage(),
      IMPLEMENTED: 4,
      PARTIAL: 9,
      DECIDED: 8,
      OPEN: 2,
      'DESIGN-GAP': 2,
    },
    gaps: [
      { id: 'PAT-23', label: 'Guardian, minor, and dependent consent context', status: 'DESIGN-GAP' },
      { id: 'PAT-24', label: 'Patient intake link lifecycle and expiry', status: 'DESIGN-GAP' },
      { id: 'PAT-22', label: 'Deceased, inactive, or merged patient behavior', status: 'OPEN' },
    ],
    surfaceLabel: 'Open Patients',
  },
  {
    id: 'encounter',
    order: 3,
    title: 'Encounter and decision',
    journeyIds: 'ENC-01–13',
    journeyCount: 13,
    primaryActors: 'Doctor · authorized clinical staff',
    outcome: 'Record, review, sign, and retain the clinical decision with its evidence.',
    entry: 'Booking, patient chart, worklist, or active encounter.',
    closure: 'Signed outputs and unresolved obligations are explicit and attributable.',
    handoffs: [
      'Draft notes remain distinct from signed clinical truth.',
      'Orders, prescriptions, referrals, and care plans branch from one decision.',
      'Finishing a visit does not silently close unfinished downstream work.',
    ],
    coverage: { ...emptyCoverage(), PARTIAL: 10, OPEN: 3 },
    gaps: [
      { id: 'ENC-08', label: 'Linked amendment after a note is signed', status: 'OPEN' },
      { id: 'ENC-10', label: 'Allergy and interaction override policy', status: 'OPEN' },
      { id: 'ENC-13', label: 'Encounter draft recovery and discard', status: 'OPEN' },
    ],
    surfaceLabel: 'Open patient chart',
  },
  {
    id: 'ordering',
    order: 4,
    title: 'Order and booking',
    journeyIds: 'ORD-01–21',
    journeyCount: 21,
    primaryActors: 'Doctor · reception · system',
    outcome: 'Place a patient-bound, priced, traceable order and collection plan.',
    entry: 'Catalog, patient chart, booking worklist, or clinical decision.',
    closure: 'One order and booking exist despite retries, or the draft exits safely.',
    handoffs: [
      'Catalog selection becomes an immutable priced snapshot at placement.',
      'Collection route changes scheduling, payment, and operational ownership.',
      'Cancellation, no-show, and recollection keep their financial consequences explicit.',
    ],
    coverage: { ...emptyCoverage(), PARTIAL: 18, OPEN: 3 },
    gaps: [
      { id: 'ORD-12', label: 'Idempotent placement across retries', status: 'OPEN' },
      { id: 'ORD-20', label: 'Unsupported or conflicting test recovery', status: 'OPEN' },
      { id: 'ORD-21', label: 'Stale catalog or price re-acceptance', status: 'OPEN' },
    ],
    surfaceLabel: 'Open catalog',
  },
  {
    id: 'fulfillment',
    order: 5,
    title: 'Fulfillment and laboratory',
    journeyIds: 'REC-01–06 · PHL-01–11 · LOG-01–12',
    journeyCount: 29,
    primaryActors: 'Reception · collector · courier · lab',
    outcome: 'Move the correct specimen from check-in to accepted, rejected, or recollection state.',
    entry: 'A planned visit, walk-in, home collection, or ready specimen.',
    closure: 'Custody and specimen disposition are recorded; defects have an owner and recovery path.',
    handoffs: [
      'Check-in resolves the visit; positive identification authorizes the draw.',
      'A sample is normally registered at draw, then labeled and verified tube by tube.',
      'Every clinic, courier, and lab handoff adds custody evidence.',
      'Rejection creates recollection work without inventing a replacement sample.',
    ],
    coverage: {
      ...emptyCoverage(),
      IMPLEMENTED: 6,
      PARTIAL: 8,
      DECIDED: 8,
      OPEN: 5,
      DEFERRED: 1,
      'DESIGN-GAP': 1,
    },
    gaps: [
      { id: 'PHL-05', label: 'Offline printer and controlled manual-label recovery', status: 'DESIGN-GAP' },
      { id: 'REC-06', label: 'Wrong booking or patient correction', status: 'OPEN' },
      { id: 'LOG-09', label: 'Lost, damaged, or temperature-excursion specimen', status: 'OPEN' },
    ],
    surfaceLabel: 'Open collection',
  },
  {
    id: 'results',
    order: 6,
    title: 'Results and closure',
    journeyIds: 'RES-01–12',
    journeyCount: 12,
    primaryActors: 'Lab · doctor · patient · Kura operations',
    outcome: 'Review, act, communicate, and close released evidence without losing amendments or criticals.',
    entry: 'Structured result ingestion or a result worklist item.',
    closure: 'Review, disposition, communication, follow-up, and audit obligations are complete.',
    handoffs: [
      'Release and patient delivery remain independent from critical escalation.',
      'Acknowledgment records a human response, not merely an opened page.',
      'An amended or wrong-patient result freezes false closure and preserves versions.',
    ],
    coverage: {
      ...emptyCoverage(),
      IMPLEMENTED: 2,
      PARTIAL: 6,
      OPEN: 3,
      DEFERRED: 1,
    },
    gaps: [
      { id: 'RES OP-5', label: 'Exact critical escalation timing and chain', status: 'OPEN' },
      { id: 'RES-09', label: 'Patient acknowledgment and read-back evidence', status: 'OPEN' },
      { id: 'RES-11/12', label: 'Corrected or wrong-patient result recovery', status: 'OPEN' },
    ],
    surfaceLabel: 'Open Results',
  },
  {
    id: 'continuity',
    order: 7,
    title: 'Care continuity',
    journeyIds: 'CARE-01–05 · COM-01–05 · INV-01–04',
    journeyCount: 14,
    primaryActors: 'Doctor · patient · care team · dispensary',
    outcome: 'Turn the decision into accountable follow-up, communication, and ongoing care.',
    entry: 'Reviewed result, encounter decision, prescription, or active care program.',
    closure: 'Work is completed, changed, paused, cancelled, or escalated with an owner.',
    handoffs: [
      'Every goal and recurring task carries an owner, timing, and completion rule.',
      'Communication tracks delivery failure and patient preference.',
      'Telehealth and dispensing remain execution paths, not evidence of clinical closure.',
    ],
    coverage: { ...emptyCoverage(), PARTIAL: 12, OPEN: 2 },
    gaps: [
      { id: 'COM-03', label: 'Versioned consent and communication preference', status: 'OPEN' },
      { id: 'INV-04', label: 'Low-stock and expiry acknowledgment', status: 'OPEN' },
    ],
    surfaceLabel: 'Open care-plan roadmap',
  },
  {
    id: 'finance',
    order: 8,
    title: 'Payment and settlement',
    journeyIds: 'FIN-01–15',
    journeyCount: 15,
    primaryActors: 'Reception · doctor · finance · payer · system',
    outcome: 'Keep payment, refund, service proof, earnings, and settlement explainable per line.',
    entry: 'Priced order, payment attempt, cancellation, service proof, or settlement period.',
    closure: 'Money is collected, voided, refunded, reversed, paid, or left with an explicit obligation.',
    handoffs: [
      'Payment never proves arrival, collection, or service delivery.',
      'Commission is resolved per line and frozen with its rule version.',
      'Settlement waits for both payment and service proof; corrections append reversals.',
    ],
    coverage: {
      ...emptyCoverage(),
      IMPLEMENTED: 5,
      PARTIAL: 1,
      DECIDED: 6,
      DEFERRED: 3,
    },
    gaps: [
      { id: 'FIN-03', label: 'Hosted patient pay-link', status: 'DEFERRED' },
      { id: 'FIN-05', label: 'Claim submission and reconciliation', status: 'DEFERRED' },
      { id: 'FIN-14', label: 'Automated payout or debt collection', status: 'DEFERRED' },
    ],
    surfaceLabel: 'Open Balance',
  },
  {
    id: 'settings',
    order: 9,
    title: 'Settings and continuity',
    journeyIds: 'ADM-01–08 · MOB-01–05',
    journeyCount: 13,
    primaryActors: 'Doctor · owner · authorized staff',
    outcome: 'Preserve governed profile, signature, privacy, and cross-device state.',
    entry: 'Account, workspace, document, privacy, or device transition.',
    closure: 'The change is validated and attributable, or safely denied and recoverable.',
    handoffs: [
      'Workspace settings remain distinct from person-owned banking and credentials.',
      'Signed documents preserve signer, version, and revocation context.',
      'Offline and retried mutations cannot claim success before reconciliation.',
    ],
    coverage: { ...emptyCoverage(), PARTIAL: 10, OPEN: 3 },
    gaps: [
      { id: 'ADM-08', label: 'Scoped data export and privacy request', status: 'OPEN' },
      { id: 'MOB-04', label: 'Safe offline or read-only mobile state', status: 'OPEN' },
      { id: 'MOB-05', label: 'Queued mutation retry and conflict resolution', status: 'OPEN' },
    ],
  },
];

export const FLOW_COVERAGE_ORDER: readonly FlowCoverageStatus[] = [
  'IMPLEMENTED',
  'PARTIAL',
  'DECIDED',
  'OPEN',
  'DEFERRED',
  'DESIGN-GAP',
];

export const FLOW_COVERAGE_TOTALS = CLINIC_FLOW_STAGES.reduce<FlowCoverage>(
  (totals, stage) => {
    for (const status of FLOW_COVERAGE_ORDER) {
      totals[status] += stage.coverage[status];
    }
    return totals;
  },
  emptyCoverage(),
);

export const FLOW_JOURNEY_TOTAL = CLINIC_FLOW_STAGES.reduce(
  (total, stage) => total + stage.journeyCount,
  0,
);

export const INDEPENDENT_TRUTHS = [
  ['Identity', 'Phone control, patient match, and identity assurance are separate.'],
  ['Visit', 'Arrival does not prove that collection or service is complete.'],
  ['Sample', 'Collected does not mean received, accepted, or consumed.'],
  ['Payment', 'Paid does not mean served.'],
  ['Result', 'Released does not mean acknowledged, actioned, or closed.'],
  ['Settlement', 'Payment and service proofs are both required.'],
] as const;
