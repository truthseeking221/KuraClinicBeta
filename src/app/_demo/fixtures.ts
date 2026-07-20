/**
 * Shell-context adapters. No invented data: workspaces come from the auth
 * gate fixtures, capabilities and modules derive from the mode registry.
 * This file only translates canonical shapes into the AppShell contract.
 */

import { MODE_ORDER, MODE_REGISTRY } from '../../components/shared/app-shell';
import type { ClinicWorkspace, Station } from '../../components/shared/app-shell';
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

/** Full-capability demo actor: the union of every mode's requirements. */
export const SHELL_PERMISSIONS: readonly string[] = [
  ...new Set(MODE_ORDER.flatMap((mode) => MODE_REGISTRY[mode].requiredAny)),
  'doctor.banking.view.self',
];

/** Every module the registry knows about is enabled for the demo workspace. */
export const SHELL_MODULES: Record<string, boolean> = Object.fromEntries(
  MODE_ORDER.map((mode) => [MODE_REGISTRY[mode].moduleFlag, true]),
);

/** Station context per mode, mirroring the clinic-operations prototype. */
export function stationForMode(mode: string, shift: 'morning' | 'afternoon'): Station | undefined {
  if (mode === 'front-desk') return { id: 'DESK-01', shift };
  if (mode === 'collection') return { id: 'PSC-01', role: 'phlebotomy', shift };
  return undefined;
}
