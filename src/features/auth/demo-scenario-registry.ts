import type { LicenceState } from '../licence/logic';
import type {
  ClinicMode,
  ShellDemoAccessProfile,
} from '../../components/shared/app-shell';
import type { GateWorkspace } from './logic';

export type DemoScenarioSurface =
  | 'onboarding'
  | 'home'
  | 'patients'
  | 'patient-chart'
  | 'results'
  | 'balance'
  | 'front-desk-queue'
  | 'front-desk-check-in'
  | 'front-desk-payments'
  | 'collection';

export type DemoScenarioActor =
  | 'doctor'
  | 'nurse'
  | 'receptionist'
  | 'phlebotomist';

type DemoScenarioDefinition = {
  id: string;
  phone: string;
  label: string;
  kind: 'new-sign-up' | 'fresh-workspace' | 'established-workspace' | 'revoked';
  licence?: LicenceState;
  userName?: string;
  workspaceName?: string;
  /** Person identity and capabilities stay separate; role names never authorize. */
  actor?: DemoScenarioActor;
  accessProfile?: ShellDemoAccessProfile;
  mode?: ClinicMode;
  accessSource?: string;
  /** Optional single operational membership shown by the post-Door gate. */
  workspace?: GateWorkspace;
  entryPath: string;
  surface: DemoScenarioSurface;
  variant: string;
  journeyIds: readonly string[];
  /** Existing Storybook story that owns or proves the rendered state. */
  source: string;
};

function established<const T extends Omit<DemoScenarioDefinition, 'kind' | 'licence'>>(
  scenario: T,
) {
  return {
    ...scenario,
    kind: 'established-workspace' as const,
    licence: 'verified' as const,
  };
}

function staff<const T extends Omit<DemoScenarioDefinition, 'kind' | 'licence'>>(
  scenario: T,
) {
  return {
    ...scenario,
    kind: 'established-workspace' as const,
    licence: 'none' as const,
  };
}

const ACCESS_SCENARIOS = [
  {
    id: 'new-sign-up',
    phone: '+85598111222',
    label: 'Brand-new account — run the full wizard',
    kind: 'new-sign-up',
    entryPath: '/home',
    surface: 'onboarding',
    variant: 'new-sign-up',
    journeyIds: ['ACC-01', 'ACC-03'],
    source: 'Clinic/Auth/Door#NewAccountToWizard',
  },
  {
    id: 'licence-none',
    phone: '+85598112000',
    label: 'Fresh cabinet — licence not submitted',
    kind: 'fresh-workspace',
    licence: 'none',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-none',
    journeyIds: ['ACC-03', 'ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicenceNone',
  },
  {
    id: 'licence-pending-review',
    phone: '+85598112001',
    label: 'Fresh cabinet — licence under review',
    kind: 'fresh-workspace',
    licence: 'pending_review',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-pending-review',
    journeyIds: ['ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicencePendingReview',
  },
  {
    id: 'licence-rejected',
    phone: '+85598112002',
    label: 'Fresh cabinet — licence rejected',
    kind: 'fresh-workspace',
    licence: 'rejected',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-rejected',
    journeyIds: ['ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicenceRejected',
  },
  {
    id: 'licence-verified',
    phone: '+85598112003',
    label: 'Fresh cabinet — licence verified',
    kind: 'fresh-workspace',
    licence: 'verified',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-verified',
    journeyIds: ['ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicenceVerified',
  },
  {
    id: 'licence-expiring',
    phone: '+85598112004',
    label: 'Fresh cabinet — licence expiring',
    kind: 'fresh-workspace',
    licence: 'expiring',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-expiring',
    journeyIds: ['ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicenceExpiring',
  },
  {
    id: 'licence-in-grace',
    phone: '+85598112005',
    label: 'Fresh cabinet — licence in grace',
    kind: 'fresh-workspace',
    licence: 'in_grace',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-in-grace',
    journeyIds: ['ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicenceInGrace',
  },
  {
    id: 'licence-lapsed',
    phone: '+85598112006',
    label: 'Fresh cabinet — licence lapsed',
    kind: 'fresh-workspace',
    licence: 'lapsed',
    userName: 'Bopha Kim',
    workspaceName: "Bopha Kim's cabinet",
    entryPath: '/home',
    surface: 'home',
    variant: 'licence-lapsed',
    journeyIds: ['ACC-04', 'ACC-05'],
    source: 'Clinic/Clinical/Home#LicenceLapsed',
  },
  established({
    id: 'established-member',
    phone: '+85512777088',
    label: 'Established member — choose a workspace',
    entryPath: '/home',
    surface: 'home',
    variant: 'busy-morning',
    journeyIds: ['ACC-01', 'ACC-02', 'WQ-01'],
    source: 'Clinic/Clinical/Home#StartOfDayVerified',
  }),
  {
    id: 'revoked-account',
    phone: '+85512000666',
    label: 'Revoked account — access blocked',
    kind: 'revoked',
    entryPath: '/',
    surface: 'onboarding',
    variant: 'revoked',
    journeyIds: ['ACC-01'],
    source: 'Clinic/Auth/Door#RevokedAccount',
  },
] as const satisfies readonly DemoScenarioDefinition[];

const HOME_SCENARIOS = ([
  ['home-busy-morning', '+85598113001', 'Busy morning', 'busy-morning', 'StartOfDayVerified', ['WQ-01']],
  ['home-critical-day', '+85598113002', 'Critical result first', 'critical-day', 'CriticalResultFirst', ['WQ-01', 'WQ-03', 'RES-04']],
  ['home-all-caught-up', '+85598113003', 'All caught up', 'all-caught-up', 'AllCaughtUpWithNextAppointment', ['WQ-01', 'WQ-09']],
  ['home-afternoon-handover', '+85598113004', 'Afternoon handover', 'afternoon-handover', 'AfternoonHandover', ['WQ-01']],
  ['home-empty-clinic', '+85598113005', 'Established workspace with no patients', 'empty-clinic', 'EmptyClinic', ['WQ-01', 'WQ-09']],
  ['home-solo-doctor', '+85598113006', 'Solo doctor cabinet', 'solo-doctor', 'SoloDoctor', ['WQ-01']],
  ['home-reduced-capabilities', '+85598113007', 'Home with reduced capabilities', 'reduced-capabilities', 'ReducedCapabilities', ['ACC-08', 'WQ-01']],
  ['home-permission-restricted', '+85598113008', 'Home permission restricted', 'permission-restricted', 'UnauthorizedDeepLinkNoPhi', ['ACC-08', 'WQ-01']],
  ['home-loading', '+85598113010', 'Home loading', 'loading', 'Loading', ['WQ-09']],
  ['home-partial-failure', '+85598113011', 'Home partial data failure', 'partial-data', 'PartialFailureAndRetry', ['WQ-09']],
  ['home-full-failure', '+85598113012', 'Home load failure', 'full-failure', 'FullFailureRecoverable', ['WQ-09']],
  ['home-stale', '+85598113013', 'Home stale snapshot', 'stale', 'StaleData', ['WQ-09']],
  ['home-long-content', '+85598113015', 'Home high-volume content', 'long-content', 'BusyClinicLongContent', ['WQ-01']],
] as const).map(([id, phone, label, variant, story, journeyIds]) =>
  established({
    id,
    phone,
    label,
    entryPath: '/home',
    surface: 'home' as const,
    variant,
    journeyIds,
    source: `Clinic/Clinical/Home#${story}`,
  }),
) satisfies readonly DemoScenarioDefinition[];

const PATIENT_SCENARIOS = ([
  ['patients-registry', '+85598114001', 'Patient registry with triage', 'patients', 'registry-default', '/patients', 'Registry#TriageLayer', ['PAT-17']],
  ['patients-empty', '+85598114002', 'Patient registry empty', 'patients', 'registry-empty', '/patients', 'Registry#Empty', ['PAT-17', 'PAT-18']],
  ['patients-loading', '+85598114003', 'Patient registry loading', 'patients', 'registry-loading', '/patients', 'Registry#Loading', ['PAT-17']],
  ['patients-error', '+85598114004', 'Patient registry load failure', 'patients', 'registry-error', '/patients', 'Registry#ErrorAndRecovery', ['PAT-17']],
  ['patients-long-content', '+85598114005', 'Patient registry long content', 'patients', 'registry-long', '/patients', 'Registry#LongContent', ['PAT-17']],
  ['patient-chart-default', '+85598114006', 'Patient chart', 'patient-chart', 'chart-default', '/patients/p-sok-nimol', 'Chart#Default', ['PAT-19', 'PAT-20']],
  ['patient-chart-unverified', '+85598114007', 'Unverified patient identity', 'patient-chart', 'chart-unverified', '/patients/p-lina-prum', 'Chart#VerifyIdentityFlow', ['PAT-19', 'PAT-25']],
  ['patient-chart-no-orders', '+85598114010', 'Patient chart with no orders', 'patient-chart', 'chart-no-orders', '/patients/p-sok-nimol', 'Chart#NoOrders', ['PAT-20', 'ORD-14']],
] as const).map(([id, phone, label, surface, variant, entryPath, story, journeyIds]) =>
  established({
    id,
    phone,
    label,
    entryPath,
    surface: surface as 'patients' | 'patient-chart',
    variant,
    journeyIds,
    source: `Clinic/Clinical/Patients/${story}`,
  }),
) satisfies readonly DemoScenarioDefinition[];

const RESULT_SCENARIOS = ([
  ['results-longitudinal', '+85598115001', 'Longitudinal results', 'longitudinal', 'DefaultLongitudinalWorkspace', ['RES-03']],
  ['results-first-visit', '+85598115002', 'First result episode', 'first', 'ReadyBeforeClosure', ['RES-03', 'RES-10']],
  ['results-critical', '+85598115003', 'Critical result acknowledgment', 'critical', 'CriticalAcknowledgmentThenClosure', ['RES-04', 'RES-10']],
  ['results-partial', '+85598115004', 'Partial result release', 'partial', 'PartialReleaseBlocksClosure', ['RES-07', 'RES-10']],
  ['results-redraw', '+85598115005', 'Redraw in progress', 'redraw', 'RedrawInProgress', ['RES-07']],
  ['results-add-on', '+85598115006', 'Add-on reopened episode', 'add-on', 'AddOnReopenedEpisode', ['ORD-19', 'RES-03']],
  ['results-with-cancelled', '+85598115007', 'Released episode with cancelled line', 'with-cancelled', 'ReleasedWithCancelledLine', ['RES-03', 'RES-07']],
  ['results-cancelled', '+85598115008', 'All result lines cancelled', 'cancelled', 'AllCancelled', ['RES-07']],
  ['results-long-content', '+85598115009', 'Long result names and no reference range', 'long-content', 'LongContentAndOtherTests', ['RES-03']],
  ['results-loading', '+85598115010', 'Results loading', 'loading', 'Loading', ['WQ-03']],
  ['results-empty', '+85598115011', 'No result episodes', 'empty', 'Empty', ['WQ-03']],
  ['results-error', '+85598115012', 'Results load failure', 'error', 'ErrorAndRecovery', ['WQ-03']],
  ['results-permission', '+85598115014', 'Results permission restricted', 'permission', 'PermissionRestricted', ['ACC-08', 'RES-03']],
  ['results-stale', '+85598115016', 'Stale results snapshot', 'stale', 'StaleSnapshot', ['WQ-09', 'RES-03']],
  ['results-read-only', '+85598115017', 'Read-only result review', 'read-only', 'ReadOnly', ['RES-03']],
] as const).map(([id, phone, label, variant, story, journeyIds]) =>
  established({
    id,
    phone,
    label,
    entryPath: '/results',
    surface: 'results' as const,
    variant,
    journeyIds,
    source: ['first', 'critical', 'partial'].includes(variant)
      ? `Clinic/Flows/Result Review and Closure#${story}`
      : `Clinic/Clinical/Results/Results Workspace#${story}`,
  }),
) satisfies readonly DemoScenarioDefinition[];

const BALANCE_SCENARIOS = ([
  ['balance-green', '+85598116001', 'Kura owes the doctor', 'overview-green', '/balance', 'Overview#KuraOwesYou'],
  ['balance-red', '+85598116002', 'Doctor owes Kura, collection failed', 'overview-red', '/balance', 'Overview#YouOweKura'],
  ['balance-zero', '+85598116003', 'Settled at zero', 'overview-zero', '/balance', 'Overview#Settled'],
  ['balance-pending-wall', '+85598116026', 'Nothing settled yet this month', 'overview-pending-wall', '/balance', 'Overview#PendingWall'],
  ['balance-floor-pressure', '+85598116027', 'Projected balance at the ordering floor', 'overview-floor-pressure', '/balance', 'Overview#OrderingFloorReached'],
  ['balance-unavailable', '+85598116004', 'Signed amount unavailable', 'overview-unavailable', '/balance', 'Overview#AmountUnavailable'],
  ['balance-licence-lapsed', '+85598116028', 'Licence lapsed with an existing ledger', 'overview-licence-lapsed', '/balance', 'Overview#LicenceLapsedKeepsLedger'],
  ['balance-empty', '+85598116005', 'Ledger empty', 'overview-empty', '/balance', 'Overview#EmptyLedger'],
  ['balance-loading', '+85598116006', 'Balance loading', 'overview-loading', '/balance', 'Overview#Loading'],
  ['balance-error', '+85598116007', 'Balance load failure', 'overview-error', '/balance', 'Overview#RecoverableFailure'],
  ['balance-permission', '+85598116008', 'Balance permission denied', 'overview-permission', '/balance', 'Overview#PermissionDenied'],
  ['balance-activity-failed-pull', '+85598116009', 'Activity with failed collection', 'activity-failed-pull', '/balance/activity', 'Activity & Statements#FailedCollectionNotice'],
  ['balance-activity-all-notifications', '+85598116029', 'Every notice and receipt kind', 'activity-all-notifications', '/balance/activity', 'Activity & Statements#AllNoticesAndReceipts'],
  ['balance-activity-empty', '+85598116010', 'Activity and notices empty', 'activity-empty', '/balance/activity', 'Activity & Statements#EmptyActivityAndNotices'],
  ['balance-download-error', '+85598116011', 'Statement download failure', 'activity-download-error', '/balance/activity', 'Activity & Statements#DownloadFailure'],
  ['balance-download-success', '+85598116012', 'Statement download complete', 'activity-download-success', '/balance/activity', 'Activity & Statements#DownloadSuccess'],
  ['balance-auto-pay-linked', '+85598116013', 'Auto-pay linked', 'auto-pay-linked', '/balance/auto-pay', 'Auto-pay#Linked'],
  ['balance-auto-pay-unlinked', '+85598116014', 'Auto-pay unlinked', 'auto-pay-unlinked', '/balance/auto-pay', 'Auto-pay#Unlinked'],
  ['balance-auto-pay-pending', '+85598116015', 'Auto-pay awaiting provider', 'auto-pay-pending', '/balance/auto-pay', 'Auto-pay#LinkPendingProviderConfirmation'],
  ['balance-auto-pay-link-expired', '+85598116016', 'Auto-pay link session expired', 'auto-pay-link-expired', '/balance/auto-pay', 'Auto-pay#LinkSessionExpired'],
  ['balance-auto-pay-link-long-running', '+85598116030', 'Auto-pay link still running', 'auto-pay-link-long-running', '/balance/auto-pay', 'Auto-pay#LinkLongRunning'],
  ['balance-auto-pay-confirmed', '+85598116017', 'Auto-pay provider confirmed', 'auto-pay-confirmed', '/balance/auto-pay', 'Auto-pay#LinkProviderConfirmed'],
  ['balance-auto-pay-renewal', '+85598116018', 'Auto-pay renewal required', 'auto-pay-renewal', '/balance/auto-pay', 'Auto-pay#RenewalRequired'],
  ['balance-auto-pay-expired', '+85598116019', 'Auto-pay authorization expired', 'auto-pay-expired', '/balance/auto-pay', 'Auto-pay#AuthorizationExpired'],
  ['balance-auto-pay-frozen', '+85598116020', 'Auto-pay collection frozen', 'auto-pay-frozen', '/balance/auto-pay', 'Auto-pay#CollectionFrozen'],
  ['balance-auto-pay-deleted', '+85598116021', 'Auto-pay authorization deleted', 'auto-pay-deleted', '/balance/auto-pay', 'Auto-pay#AuthorizationDeleted'],
  ['balance-auto-pay-licence-lapsed', '+85598116031', 'Auto-pay blocked by lapsed licence', 'auto-pay-licence-lapsed', '/balance/auto-pay', 'Auto-pay#LicenceLapsedBlocksNewLink'],
  ['balance-settle-pending', '+85598116022', 'Payment code awaiting the bank', 'settle-pending', '/balance/settle', 'Settle Now#WaitingForTheBank'],
  ['balance-settle-expired', '+85598116023', 'Payment code expired', 'settle-expired', '/balance/settle', 'Settle Now#CodeExpired'],
  ['balance-settle-confirmed', '+85598116024', 'Payment confirmed', 'settle-confirmed', '/balance/settle', 'Settle Now#PaymentConfirmed'],
  ['balance-settle-nothing-due', '+85598116025', 'Nothing to settle', 'settle-nothing-due', '/balance/settle', 'Settle Now#NothingToSettle'],
] as const).map(([id, phone, label, variant, entryPath, story]) =>
  established({
    id,
    phone,
    label,
    entryPath,
    surface: 'balance' as const,
    variant,
    journeyIds: ['FIN-12', 'FIN-13'],
    source: `Clinic/Finance/Balance/${story}`,
  }),
) satisfies readonly DemoScenarioDefinition[];

const FULL_CLINIC_SCENARIOS = [
  established({
    id: 'clinic-full-workspace',
    phone: '+85598117001',
    label: 'Full clinic — clinical, front desk, and collection',
    userName: 'Dr. Sok Vanna',
    actor: 'doctor',
    accessProfile: 'full-clinic',
    mode: 'clinical',
    accessSource: 'Clinic/Shell/App Shell#FullClinic',
    entryPath: '/home',
    surface: 'home',
    variant: 'busy-morning',
    journeyIds: ['ACC-01', 'ACC-02', 'WQ-01'],
    source: 'Clinic/Clinical/Home#StartOfDayVerified',
  }),
  staff({
    id: 'clinic-multi-role-nurse',
    phone: '+85598117002',
    label: 'Clinic nurse — front desk and collection',
    userName: 'Srey Neang',
    actor: 'nurse',
    accessProfile: 'front-desk-collection',
    mode: 'front-desk',
    accessSource: 'Clinic/Shell/App Shell#MultiRoleNurse',
    workspace: {
      workspaceId: 'bkk1',
      name: 'Mekong Clinic',
      branchesEnabled: false,
      memberCount: 12,
      role: 'Nurse',
    },
    entryPath: '/front-desk/arrivals',
    surface: 'front-desk-queue',
    variant: 'queue-default',
    journeyIds: ['ACC-01', 'REC-01', 'REC-05'],
    source: 'Clinic/Front Desk/Desk Queue#Default',
  }),
] as const satisfies readonly DemoScenarioDefinition[];

const RECEPTION_WORKSPACE = {
  workspaceId: 'bkk1',
  name: 'Mekong Clinic',
  branchesEnabled: false,
  memberCount: 12,
  role: 'Receptionist',
} as const satisfies GateWorkspace;

const RECEPTION_SCENARIOS = ([
  ['reception-arrivals', '+85598118001', 'Reception — arrivals in progress', 'front-desk-queue', 'queue-default', '/front-desk/arrivals', 'Desk Queue#Default', ['REC-01', 'REC-05']],
  ['reception-planned-check-in', '+85598118002', 'Reception — planned visit after identity match', 'front-desk-check-in', 'check-in-planned', '/front-desk/arrivals/check-in', 'Check-In Wizard#PlannedVisit', ['REC-01']],
  ['reception-walk-in', '+85598118003', 'Reception — new walk-in check-in', 'front-desk-check-in', 'check-in-walk-in', '/front-desk/arrivals/check-in', 'Check-In Wizard#Default', ['REC-02']],
  ['reception-long-wait', '+85598118004', 'Reception — long-wait queue', 'front-desk-queue', 'queue-long-wait', '/front-desk/queue', 'Desk Queue#LongWait', ['REC-05', 'WQ-09']],
  ['reception-empty', '+85598118005', 'Reception — no arrivals', 'front-desk-queue', 'queue-empty', '/front-desk/arrivals', 'Desk Queue#Empty', ['WQ-09']],
  ['reception-loading', '+85598118006', 'Reception — queue loading', 'front-desk-queue', 'queue-loading', '/front-desk/queue', 'Desk Queue#Loading', ['WQ-09']],
  ['reception-error', '+85598118007', 'Reception — queue load failure', 'front-desk-queue', 'queue-error', '/front-desk/queue', 'Desk Queue#LoadError', ['WQ-09']],
  ['reception-offline', '+85598118008', 'Reception — last synced queue offline', 'front-desk-queue', 'queue-offline', '/front-desk/queue', 'Desk Queue#Offline', ['WQ-09']],
  ['reception-stale', '+85598118009', 'Reception — stale queue snapshot', 'front-desk-queue', 'queue-stale', '/front-desk/queue', 'Desk Queue#Stale', ['WQ-09']],
  ['reception-payment-paid', '+85598118010', 'Reception — paid receipt', 'front-desk-payments', 'payment-paid', '/front-desk/payments', 'Payment Receipt#Paid', ['FIN-01']],
  ['reception-payment-supplemental', '+85598118011', 'Reception — supplemental receipt chain', 'front-desk-payments', 'payment-supplemental', '/front-desk/payments', 'Payment Receipt#SupplementalChain', ['FIN-11']],
  ['reception-payment-voided', '+85598118012', 'Reception — voided receipt evidence', 'front-desk-payments', 'payment-voided', '/front-desk/payments', 'Payment Receipt#VoidedEvidence', ['FIN-06']],
] as const).map(([
  id,
  phone,
  label,
  surface,
  variant,
  entryPath,
  story,
  journeyIds,
]) =>
  staff({
    id,
    phone,
    label,
    userName: 'Linh Nguyen',
    actor: 'receptionist',
    accessProfile: 'receptionist',
    mode: 'front-desk',
    accessSource: 'Clinic/Shell/App Shell#ReceptionistOnly',
    workspace: RECEPTION_WORKSPACE,
    entryPath,
    surface: surface as
      | 'front-desk-queue'
      | 'front-desk-check-in'
      | 'front-desk-payments',
    variant,
    journeyIds,
    source: `Clinic/Front Desk/${story}`,
  }),
) satisfies readonly DemoScenarioDefinition[];

const PHLEBOTOMY_WORKSPACE = {
  workspaceId: 'bkk1',
  name: 'Mekong Clinic',
  branchesEnabled: false,
  memberCount: 12,
  role: 'Phlebotomist',
} as const satisfies GateWorkspace;

const COLLECTION_SCENARIOS = ([
  ['phlebotomy-scan-queue', '+85598119001', 'Phlebotomy — scan or browse queue', 'scan-queue', 'ScanGateBrowseQueue', ['PHL-01']],
  ['phlebotomy-empty-queue', '+85598119002', 'Phlebotomy — queue clear', 'scan-empty', 'ScanGateEmptyQueue', ['WQ-09']],
  ['phlebotomy-ready-draw', '+85598119003', 'Phlebotomy — ready for collection', 'worksheet-ready', 'Default', ['PHL-01', 'PHL-03', 'PHL-06', 'PHL-10']],
  ['phlebotomy-vitals-missing', '+85598119004', 'Phlebotomy — vitals not recorded', 'worksheet-vitals-missing', 'VitalsMissingWarning', ['PHL-01']],
  ['phlebotomy-partial-draw', '+85598119005', 'Phlebotomy — one tube drawn, two open', 'worksheet-partial', 'RegisterOneTube', ['PHL-07']],
] as const).map(([id, phone, label, variant, story, journeyIds]) =>
  staff({
    id,
    phone,
    label,
    userName: 'Srey Neang',
    actor: 'phlebotomist',
    accessProfile: 'phlebotomist',
    mode: 'collection',
    accessSource: 'Clinic/Shell/App Shell#PhlebotomistOnly',
    workspace: PHLEBOTOMY_WORKSPACE,
    entryPath: '/collection/scan',
    surface: 'collection',
    variant,
    journeyIds,
    source: `Clinic/Collection/Draw Worksheet#${story}`,
  }),
) satisfies readonly DemoScenarioDefinition[];

/**
 * Canonical Storybook-owned registry for onboarding-driven app demos.
 * Only states with both an existing app route and an existing Storybook
 * composition receive a phone. Open, deferred, design-gap, and route-less
 * journeys remain in the coverage matrix and are deliberately not invented.
 */
const ALL_DEMO_ONBOARDING_SCENARIOS = [
  ...ACCESS_SCENARIOS,
  ...HOME_SCENARIOS,
  ...PATIENT_SCENARIOS,
  ...RESULT_SCENARIOS,
  ...BALANCE_SCENARIOS,
  ...FULL_CLINIC_SCENARIOS,
  ...RECEPTION_SCENARIOS,
  ...COLLECTION_SCENARIOS,
] as const satisfies readonly DemoScenarioDefinition[];

export type DemoOnboardingScenarioId =
  (typeof ALL_DEMO_ONBOARDING_SCENARIOS)[number]['id'];
export type DemoOnboardingScenario = Omit<DemoScenarioDefinition, 'id'> & {
  id: DemoOnboardingScenarioId;
};

export const DEMO_ONBOARDING_SCENARIOS: readonly DemoOnboardingScenario[] =
  ALL_DEMO_ONBOARDING_SCENARIOS;

export function demoOnboardingScenarioFor(
  identifier?: string,
): DemoOnboardingScenario | undefined {
  return DEMO_ONBOARDING_SCENARIOS.find(
    (scenario) => scenario.phone === identifier,
  );
}

export function demoOnboardingScenarioById(
  id: DemoOnboardingScenarioId,
): DemoOnboardingScenario {
  return (
    DEMO_ONBOARDING_SCENARIOS.find((scenario) => scenario.id === id) ??
    DEMO_ONBOARDING_SCENARIOS[0]
  );
}
