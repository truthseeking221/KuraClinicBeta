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
    if (hydrated && !session.signedIn) router.replace('/');
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
  // First sign-in enters the shell with scoped setup access before the
  // professional credential is live. The false licence fact remains visible.
  if (session.demoProfile === 'new-doctor' && !availableModes.includes('clinical')) {
    availableModes.unshift('clinical');
  }

  const availableWorkspaces =
    session.demoProfile === 'new-doctor' ? [workspace] : [...SHELL_WORKSPACES];

  if (hydrated && !session.signedIn) return null;

  return (
    <SettingsDialogContext.Provider value={{ openSettings }}>
    <AppShell
      activeKey={key}
      availableModes={availableModes}
      contentInset={pathname.startsWith('/patients/') ? 'none' : 'page'}
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
        router.push('/');
      }}
      onWorkspaceChange={(workspaceId) => update({ workspaceId })}
      onBranchChange={(branchId) => update({ branchId })}
      // A work-area change never replaces the global Clinic App shell.
      // Station posture is reserved for dedicated booth entry points.
      posture="sidebar"
      permissions={SHELL_PERMISSIONS}
      scopeLabel={personGlobalScope ? 'All Kura workspaces' : undefined}
      station={stationForMode(mode, session.shift)}
      user={{
        name: session.userName,
        email: session.userContact ?? session.userEmail,
        licenceVerified,
      }}
      workspace={
        workspace.branches ? { ...workspace, activeBranchId: session.branchId } : workspace
      }
      workspaces={availableWorkspaces}
    >
      <FrontDeskStoreProvider>{children}</FrontDeskStoreProvider>
    </AppShell>
    <SettingsDialog
      firstUse={session.demoProfile === 'new-doctor'}
      identity={{
        contact: session.userContact ?? session.userEmail,
        name: session.userName,
      }}
      workspaceName={workspace.name}
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
