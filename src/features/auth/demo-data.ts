import type { AccountRecord, GateBranch, GateWorkspace, PhoneRegistry } from './logic';
import {
  DEMO_ONBOARDING_SCENARIOS,
  demoOnboardingScenarioById,
} from './demo-scenario-registry';

export {
  DEMO_ONBOARDING_SCENARIOS,
  demoOnboardingScenarioById,
  demoOnboardingScenarioFor,
} from './demo-scenario-registry';
export type {
  DemoOnboardingScenario,
  DemoOnboardingScenarioId,
  DemoScenarioActor,
  DemoScenarioSurface,
} from './demo-scenario-registry';

/** Demo OTP accepted by every story flow. */
export const DEMO_OTP = '111111';

/** Compact, Storybook-owned shortcuts shown only by demo Door compositions. */
export const DEMO_DOOR_HINT = {
  label: 'Demo access',
  otpLabel: 'OTP',
  otp: DEMO_OTP,
  entries: [
    {
      label: 'New doctor',
      phone: demoOnboardingScenarioById('new-sign-up').phone,
    },
    {
      label: 'Full clinic',
      phone: demoOnboardingScenarioById('clinic-full-workspace').phone,
    },
    {
      label: 'Reception',
      phone: demoOnboardingScenarioById('reception-arrivals').phone,
    },
    {
      label: 'Phlebotomy',
      phone: demoOnboardingScenarioById('phlebotomy-scan-queue').phone,
    },
  ],
} as const;

export const DEMO_RESEND_COOLDOWN_SECS = 30;

/**
 * Door decision fixtures. Unknown identifiers route to the wizard
 * (sign-in = sign-up); known scenario identifiers route or block here.
 */
export const DEMO_ACCOUNTS: readonly AccountRecord[] = [
  ...DEMO_ONBOARDING_SCENARIOS.filter(
    (scenario) => scenario.kind !== 'new-sign-up',
  ).map((scenario) => ({
    identifier: scenario.phone,
    route: 'workspace' as const,
    status: scenario.kind === 'revoked' ? ('revoked' as const) : ('active' as const),
  })),
  { identifier: 'dara@mekong.clinic', status: 'active', route: 'workspace' },
];

/** Wizard phone-attach fixtures. */
export const DEMO_PHONE_REGISTRY: PhoneRegistry = {
  inUse: ['+85599000001', '+85599000002'],
  blocked: ['+85599000009'],
};

export const DEMO_WORKSPACES: readonly GateWorkspace[] = [
  {
    workspaceId: 'ws-sunrise',
    name: 'Sunrise Clinic',
    branchesEnabled: true,
    memberCount: 12,
    role: 'Clinician',
  },
  {
    workspaceId: 'ws-downtown',
    name: 'Downtown Health',
    branchesEnabled: false,
    memberCount: 3,
    role: 'Owner',
  },
];

export const DEMO_BRANCHES: readonly GateBranch[] = [
  { branchId: 'br-main', name: 'Main Branch', isDefault: true },
  { branchId: 'br-north', name: 'North Wing', isDefault: false },
];

export const DEMO_LAST_ACTIVE_WORKSPACE = 'ws-sunrise';
export const DEMO_LAST_ACTIVE_BRANCH = 'br-main';
