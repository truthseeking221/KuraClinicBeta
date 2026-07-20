import type { AccountRecord, GateBranch, GateWorkspace, PhoneRegistry } from './logic';

/** Demo OTP accepted by every story flow. */
export const DEMO_OTP = '123456';

export const DEMO_RESEND_COOLDOWN_SECS = 30;

/**
 * Door decision fixtures. Unknown identifiers route to the wizard
 * (sign-in = sign-up); these route elsewhere or block.
 */
export const DEMO_ACCOUNTS: readonly AccountRecord[] = [
  { identifier: '+85512777088', status: 'active', route: 'workspace' },
  { identifier: 'dara@mekong.clinic', status: 'active', route: 'workspace' },
  { identifier: '+85512000666', status: 'revoked', route: 'workspace' },
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
