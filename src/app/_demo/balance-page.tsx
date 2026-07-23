'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  DoctorBalanceWorkspace,
  type BalanceRoute,
} from '../../features/doctor-banking';
import {
  BALANCE_DEMO_SCENARIOS,
  confirmedKhqr,
  doctorFixture,
  failedPullFixture,
  pendingKhqr,
  pendingLinkSession,
  unlinkedMandate,
} from '../../features/doctor-banking/demo-data';
import { demoOnboardingScenarioById } from '../../features/auth/demo-data';
import type {
  DoctorBankingFixture,
  KhqrIntent,
  MandateLinkSession,
} from '../../features/doctor-banking';
import type { BalanceDemoScenario } from '../../features/doctor-banking/demo-data';
import { useDemoSession } from './demo-session';
import { useSettingsDialog } from './settings-dialog-context';

const BALANCE_PATH: Record<BalanceRoute, string> = {
  overview: '/balance',
  activity: '/balance/activity',
  settle: '/balance/settle',
  'auto-pay': '/balance/auto-pay',
};

/** Route and fixture adapter only; all visible UI remains Storybook-owned. */
export function BalancePage({ route }: { route: BalanceRoute }) {
  const router = useRouter();
  const { session } = useDemoSession();
  const { openSettings } = useSettingsDialog();
  const selected = demoOnboardingScenarioById(session.demoScenarioId);
  const registered: BalanceDemoScenario | undefined =
    selected.surface === 'balance' && selected.variant in BALANCE_DEMO_SCENARIOS
      ? BALANCE_DEMO_SCENARIOS[selected.variant as keyof typeof BALANCE_DEMO_SCENARIOS]
      : undefined;
  const initial = registered ?? {
    data: failedPullFixture,
    state: 'ready' as const,
    downloadState: 'idle' as const,
    intent: null,
    linkSession: null,
  };
  const [data, setData] = useState<DoctorBankingFixture>(
    session.demoProfile === 'new-doctor' ? doctorFixture : initial.data,
  );
  const [intent, setIntent] = useState<KhqrIntent | null>(initial.intent ?? null);
  const [linkSession, setLinkSession] = useState<MandateLinkSession | null>(
    initial.linkSession ?? null,
  );
  const [downloadState, setDownloadState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >(initial.downloadState ?? 'idle');
  const [viewState, setViewState] = useState(initial.state);

  const updateMandate = (mandate: DoctorBankingFixture['overview']['mandate']) => {
    setData((current) => ({
      ...current,
      overview: { ...current.overview, mandate },
    }));
  };

  const beginLink = () => {
    setLinkSession(pendingLinkSession);
    updateMandate({ ...unlinkedMandate, state: 'link_pending' });
  };

  return (
    <DoctorBalanceWorkspace
      data={data}
      downloadState={downloadState}
      intent={intent}
      linkSession={linkSession}
      onBeginLink={beginLink}
      onCreateKhqr={() => setIntent(pendingKhqr)}
      onDownload={() => setDownloadState('success')}
      onNavigate={(next) => router.push(BALANCE_PATH[next])}
      onOpenLicence={() => openSettings('account')}
      onRefresh={() => setIntent(confirmedKhqr)}
      onRegenerate={() => setIntent(pendingKhqr)}
      onRegenerateLink={beginLink}
      onRenew={beginLink}
      onRetry={() => setViewState('ready')}
      onUnlink={() => {
        setLinkSession(null);
        updateMandate(unlinkedMandate);
      }}
      route={route}
      state={session.demoProfile === 'new-doctor' ? 'not-eligible' : viewState}
    />
  );
}
