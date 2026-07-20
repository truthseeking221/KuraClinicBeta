'use client';

/**
 * Signed-in clinic shell: the canonical AppShell wired to Next routing.
 * Nav keys come from the mode registry; the URL is the source of truth for
 * the active mode and nav item.
 */

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AppShell, deriveAvailableModes } from '../../components/shared';
import { isLiveLicence } from '../../features/licence/logic';
import { SettingsDialog } from '../../features/settings';
import type { SettingsSectionId } from '../../features/settings';
import { DemoControls } from '../_demo/demo-controls';
import { useDemoSession } from '../_demo/demo-session';
import { FrontDeskStoreProvider } from '../_demo/front-desk-store';
import { SettingsDialogContext } from '../_demo/settings-dialog-context';
import {
  SHELL_MODULES,
  SHELL_PERMISSIONS,
  SHELL_WORKSPACES,
  stationForMode,
} from '../_demo/fixtures';
import { entryPathForMode, navStateForPath, pathForNavKey } from '../_demo/route-map';

export default function ClinicShellLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, hydrated, update, signOut } = useDemoSession();

  const licenceVerified = isLiveLicence(session.licence);
  const { mode, key } = navStateForPath(pathname);
  const personGlobalScope = pathname === '/earnings' || pathname.startsWith('/earnings/');

  // Settings is an overlay, not a route: null = closed.
  const [settingsSection, setSettingsSection] = useState<SettingsSectionId | null>(null);
  const openSettings = (section: SettingsSectionId = 'overview') => setSettingsSection(section);

  useEffect(() => {
    if (hydrated && !session.signedIn) router.replace('/door');
  }, [hydrated, session.signedIn, router]);

  const workspace = SHELL_WORKSPACES.find((entry) => entry.id === session.workspaceId) ?? {
    // A cabinet created during onboarding is not in the gate fixtures.
    id: session.workspaceId,
    name: session.customWorkspaceName ?? 'My cabinet',
  };

  const availableModes = deriveAvailableModes({
    permissions: [...SHELL_PERMISSIONS],
    enabledModules: SHELL_MODULES,
    licenceVerified,
  });

  if (hydrated && !session.signedIn) return null;

  return (
    <SettingsDialogContext.Provider value={{ openSettings }}>
    <AppShell
      activeKey={key}
      availableModes={availableModes}
      headerActions={<DemoControls />}
      mode={mode}
      onModeChange={(next) => {
        update({ mode: next });
        router.push(entryPathForMode(next));
      }}
      onNavigate={(next) => router.push(pathForNavKey(mode, next))}
      onOpenSettings={() => openSettings()}
      onShiftChange={(shift) => update({ shift })}
      onSignOut={() => {
        signOut();
        router.push('/door');
      }}
      onWorkspaceChange={(workspaceId) => update({ workspaceId })}
      onBranchChange={(branchId) => update({ branchId })}
      posture={mode === 'collection' ? 'station' : 'sidebar'}
      permissions={SHELL_PERMISSIONS}
      scopeLabel={personGlobalScope ? 'All Kura workspaces' : undefined}
      station={stationForMode(mode, session.shift)}
      user={{
        name: session.userName,
        email: session.userEmail,
        licenceVerified,
      }}
      workspace={
        workspace.branches ? { ...workspace, activeBranchId: session.branchId } : workspace
      }
      workspaces={[...SHELL_WORKSPACES]}
    >
      <FrontDeskStoreProvider>{children}</FrontDeskStoreProvider>
    </AppShell>
    <SettingsDialog
      onOpenChange={(open) => {
        if (!open) setSettingsSection(null);
      }}
      onVerify={() => setSettingsSection('account')}
      open={settingsSection !== null}
      section={settingsSection ?? 'overview'}
      verification={session.licence}
    />
    </SettingsDialogContext.Provider>
  );
}
