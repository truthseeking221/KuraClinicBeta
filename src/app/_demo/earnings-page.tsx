'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  DoctorEarningsWorkspace,
  type EarningsRoute,
} from '../../features/doctor-banking';
import {
  confirmedKhqr,
  pendingKhqr,
  pendingLinkSession,
  redDoctorFixture,
  unlinkedMandate,
} from '../../features/doctor-banking/demo-data';
import type {
  DoctorBankingFixture,
  KhqrIntent,
  MandateLinkSession,
} from '../../features/doctor-banking';

const EARNINGS_PATH: Record<EarningsRoute, string> = {
  overview: '/earnings',
  activity: '/earnings/activity',
  settle: '/earnings/settle',
  'auto-pay': '/earnings/auto-pay',
};

/** Route and fixture adapter only; all visible UI remains Storybook-owned. */
export function EarningsPage({ route }: { route: EarningsRoute }) {
  const router = useRouter();
  const [data, setData] = useState<DoctorBankingFixture>(redDoctorFixture);
  const [intent, setIntent] = useState<KhqrIntent | null>(null);
  const [linkSession, setLinkSession] = useState<MandateLinkSession | null>(null);
  const [downloadState, setDownloadState] = useState<'idle' | 'success'>('idle');

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
    <DoctorEarningsWorkspace
      data={data}
      downloadState={downloadState}
      intent={intent}
      linkSession={linkSession}
      onBeginLink={beginLink}
      onCreateKhqr={() => setIntent(pendingKhqr)}
      onDownload={() => setDownloadState('success')}
      onNavigate={(next) => router.push(EARNINGS_PATH[next])}
      onRefresh={() => setIntent(confirmedKhqr)}
      onRegenerate={() => setIntent(pendingKhqr)}
      onRegenerateLink={beginLink}
      onRenew={beginLink}
      onRetry={() => router.refresh()}
      onUnlink={() => {
        setLinkSession(null);
        updateMandate(unlinkedMandate);
      }}
      route={route}
    />
  );
}
