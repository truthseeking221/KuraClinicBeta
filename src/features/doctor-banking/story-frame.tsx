import type { ReactNode } from 'react';

import { AppShell } from '../../components/shared';

const WORKSPACE = {
  id: 'mekong',
  name: 'Mekong Clinic',
  branches: [{ id: 'bkk1', name: 'BKK1 Branch' }],
  activeBranchId: 'bkk1',
};

export function DoctorBankingStoryFrame({
  children,
  onNavigate = () => undefined,
}: {
  children: ReactNode;
  onNavigate?: (key: string) => void;
}) {
  return (
    <AppShell
      activeKey="earnings"
      availableModes={['clinical']}
      mode="clinical"
      notificationCount={2}
      onNavigate={onNavigate}
      onOpenNotifications={() => undefined}
      permissions={['doctor.banking.view.self']}
      scopeLabel="All Kura workspaces"
      user={{
        name: 'Dr. Phong Tuy',
        email: 'phong.tuy@mekong.clinic',
        licenceVerified: true,
      }}
      workspace={WORKSPACE}
    >
      {children}
    </AppShell>
  );
}
