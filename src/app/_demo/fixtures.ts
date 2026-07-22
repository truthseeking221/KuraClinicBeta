/**
 * Shell-context adapters. No invented data: workspaces come from the auth
 * gate fixtures, capabilities and modules derive from the mode registry.
 * This file only translates canonical shapes into the AppShell contract.
 */

import {
  permissionsForDemoAccessProfile,
  SHELL_DEMO_MODULES,
} from '../../components/shared/app-shell';
import type { ClinicWorkspace, Station } from '../../components/shared/app-shell';
import type { ShellDemoAccessProfile } from '../../components/shared/app-shell';
import { DEMO_BRANCHES, DEMO_WORKSPACES } from '../../features/auth/demo-data';
import type { FxRateQuote } from '../../features/front-desk/money';

/** NBC demo rate, mirroring the canonical clinic-operations prototype. */
export const DEMO_FX_RATE: FxRateQuote = {
  base: 'USD',
  quote: 'KHR',
  rateUnits: '4100',
  rateScale: 0,
};

/** GateWorkspace → ClinicWorkspace: the gate fixture is the source of truth. */
export const SHELL_WORKSPACES: readonly ClinicWorkspace[] = DEMO_WORKSPACES.map(
  (workspace) => ({
    id: workspace.workspaceId,
    name: workspace.name,
    ...(workspace.branchesEnabled
      ? {
          branches: DEMO_BRANCHES.map((branch) => ({
            id: branch.branchId,
            name: branch.name,
          })),
          activeBranchId:
            DEMO_BRANCHES.find((branch) => branch.isDefault)?.branchId ??
            DEMO_BRANCHES[0]?.branchId,
        }
      : {}),
  }),
);

/** Storybook-owned capability pack selected by the phone scenario. */
export function shellPermissionsFor(
  profile: ShellDemoAccessProfile,
): string[] {
  return permissionsForDemoAccessProfile(profile);
}

/** Every module the registry knows about is enabled for the demo workspace. */
export const SHELL_MODULES = SHELL_DEMO_MODULES;

/** Station context per mode, mirroring the clinic-operations prototype. */
export function stationForMode(mode: string, shift: 'morning' | 'afternoon'): Station | undefined {
  if (mode === 'front-desk') return { id: 'DESK-01', shift };
  if (mode === 'collection') return { id: 'PSC-01', role: 'phlebotomy', shift };
  return undefined;
}
