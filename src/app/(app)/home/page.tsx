'use client';

/**
 * Clinical Home. The scenario follows the session's licence state so the
 * demo panel can walk the whole credential lifecycle; ?scenario= overrides
 * for operational edge states (critical day, all caught up, outage, ...).
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { HomeWorkspace } from '../../../features/home';
import * as home from '../../../features/home/demo-data';
import type { LicenceState } from '../../../features/licence/logic';
import { useDemoSession } from '../../_demo/demo-session';
import { useSettingsDialog } from '../../_demo/settings-dialog-context';
import { pathForNavKey } from '../../_demo/route-map';

const HOME_BY_LICENCE: Record<LicenceState, typeof home.busyMorning> = {
  verified: home.busyMorning,
  none: home.licenceNone,
  pending_review: home.licencePendingReview,
  rejected: home.licenceRejected,
  expiring: home.licenceExpiring,
  in_grace: home.licenceInGrace,
  lapsed: home.licenceLapsed,
};

/** Operational edge scenarios, reachable from the demo panel. */
const SCENARIOS: Record<string, typeof home.busyMorning> = {
  'busy-morning': home.busyMorning,
  'critical-day': home.criticalDay,
  'all-caught-up': home.allCaughtUp,
  'afternoon-handover': home.afternoonHandover,
  'empty-clinic': home.verifiedEmptyClinic,
  'solo-doctor': home.soloDoctor,
  loading: home.loading,
  'partial-data': home.partialData,
  'full-failure': home.fullFailure,
  stale: home.stale,
  offline: home.offline,
  'long-content': home.longContent,
};

function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session } = useDemoSession();
  const { openSettings } = useSettingsDialog();

  const scenario = searchParams.get('scenario');
  const data = (scenario && SCENARIOS[scenario]) || HOME_BY_LICENCE[session.licence];

  return (
    <HomeWorkspace
      data={data}
      onNavigate={(targetKey) => router.push(pathForNavKey('clinical', targetKey))}
      onOpenLicence={() => openSettings('account')}
      onRefresh={() => router.refresh()}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
}
