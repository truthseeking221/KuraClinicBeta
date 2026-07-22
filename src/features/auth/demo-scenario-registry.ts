import type { LicenceState } from '../licence/logic';

export type DemoScenarioSurface =
  | 'onboarding'
  | 'home'
  | 'patients'
  | 'patient-chart'
  | 'results'
  | 'earnings';

type DemoScenarioDefinition = {
  id: string;
  phone: string;
  label: string;
  kind: 'new-sign-up' | 'fresh-workspace' | 'established-workspace' | 'revoked';
  licence?: LicenceState;
  userName?: string;
  workspaceName?: string;
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

const EARNINGS_SCENARIOS = ([
  ['earnings-green', '+85598116001', 'Positive earnings balance', 'overview-green', '/earnings', 'Overview#GreenBalance'],
  ['earnings-red', '+85598116002', 'Negative balance needs settlement', 'overview-red', '/earnings', 'Overview#RedBalanceNeedsSettlement'],
  ['earnings-zero', '+85598116003', 'Settled balance at zero', 'overview-zero', '/earnings', 'Overview#SettledAtZero'],
  ['earnings-unavailable', '+85598116004', 'Signed amount unavailable', 'overview-unavailable', '/earnings', 'Overview#SignedInt64Fallback'],
  ['earnings-empty', '+85598116005', 'Earnings ledger empty', 'overview-empty', '/earnings', 'Overview#EmptyLedger'],
  ['earnings-loading', '+85598116006', 'Earnings loading', 'overview-loading', '/earnings', 'Overview#Loading'],
  ['earnings-error', '+85598116007', 'Earnings load failure', 'overview-error', '/earnings', 'Overview#RecoverableFailure'],
  ['earnings-permission', '+85598116008', 'Earnings permission denied', 'overview-permission', '/earnings', 'Overview#PermissionDenied'],
  ['earnings-activity-failed-pull', '+85598116009', 'Activity with failed collection', 'activity-failed-pull', '/earnings/activity', 'Activity & statements#FailedPullNotice'],
  ['earnings-activity-empty', '+85598116010', 'Activity and notifications empty', 'activity-empty', '/earnings/activity', 'Activity & statements#EmptyActivityAndNotifications'],
  ['earnings-download-error', '+85598116011', 'Statement download failure', 'activity-download-error', '/earnings/activity', 'Activity & statements#DownloadFailure'],
  ['earnings-download-success', '+85598116012', 'Statement download complete', 'activity-download-success', '/earnings/activity', 'Activity & statements#DownloadSuccess'],
  ['earnings-auto-pay-linked', '+85598116013', 'Auto-pay linked', 'auto-pay-linked', '/earnings/auto-pay', 'Auto-pay#Linked'],
  ['earnings-auto-pay-unlinked', '+85598116014', 'Auto-pay unlinked', 'auto-pay-unlinked', '/earnings/auto-pay', 'Auto-pay#Unlinked'],
  ['earnings-auto-pay-pending', '+85598116015', 'Auto-pay awaiting provider', 'auto-pay-pending', '/earnings/auto-pay', 'Auto-pay#LinkPendingProviderConfirmation'],
  ['earnings-auto-pay-link-expired', '+85598116016', 'Auto-pay link session expired', 'auto-pay-link-expired', '/earnings/auto-pay', 'Auto-pay#LinkSessionExpired'],
  ['earnings-auto-pay-confirmed', '+85598116017', 'Auto-pay provider confirmed', 'auto-pay-confirmed', '/earnings/auto-pay', 'Auto-pay#LinkProviderConfirmed'],
  ['earnings-auto-pay-renewal', '+85598116018', 'Auto-pay renewal required', 'auto-pay-renewal', '/earnings/auto-pay', 'Auto-pay#RenewalRequired'],
  ['earnings-auto-pay-expired', '+85598116019', 'Auto-pay authorization expired', 'auto-pay-expired', '/earnings/auto-pay', 'Auto-pay#AuthorizationExpired'],
  ['earnings-auto-pay-frozen', '+85598116020', 'Auto-pay collection frozen', 'auto-pay-frozen', '/earnings/auto-pay', 'Auto-pay#CollectionFrozen'],
  ['earnings-auto-pay-deleted', '+85598116021', 'Auto-pay authorization deleted', 'auto-pay-deleted', '/earnings/auto-pay', 'Auto-pay#AuthorizationDeleted'],
  ['earnings-settle-pending', '+85598116022', 'Settlement awaiting confirmation', 'settle-pending', '/earnings/settle', 'Settle#AwaitingProviderConfirmation'],
  ['earnings-settle-expired', '+85598116023', 'Settlement QR expired', 'settle-expired', '/earnings/settle', 'Settle#ExpiredNeedsRegeneration'],
  ['earnings-settle-confirmed', '+85598116024', 'Settlement provider confirmed', 'settle-confirmed', '/earnings/settle', 'Settle#ProviderConfirmed'],
  ['earnings-settle-nothing-due', '+85598116025', 'Nothing due for settlement', 'settle-nothing-due', '/earnings/settle', 'Settle#NothingDue'],
] as const).map(([id, phone, label, variant, entryPath, story]) =>
  established({
    id,
    phone,
    label,
    entryPath,
    surface: 'earnings' as const,
    variant,
    journeyIds: ['FIN-12', 'FIN-13'],
    source: `Clinic/Finance/Earnings/${story}`,
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
  ...EARNINGS_SCENARIOS,
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
