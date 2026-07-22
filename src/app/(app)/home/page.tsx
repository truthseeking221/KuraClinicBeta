'use client';

/**
 * Clinical Home. The scenario follows the session's licence state so the
 * onboarding phone selects the Storybook-owned operational variant.
 */

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { HomeWorkspace } from '../../../features/home';
import { HOME_DEMO_SCENARIOS } from '../../../features/home/demo-data';
import { demoOnboardingScenarioById } from '../../../features/auth/demo-data';
import { DEMO_TOUR_PATIENT_ID } from '../../../features/patients/demo-data';
import { useDemoSession } from '../../_demo/demo-session';
import { homeDataForSession } from '../../_demo/home-data';
import { useSettingsDialog } from '../../_demo/settings-dialog-context';
import { pathForNavKey } from '../../_demo/route-map';

function HomePage() {
  const router = useRouter();
  const { session } = useDemoSession();
  const { openSettings } = useSettingsDialog();
  const [recovered, setRecovered] = useState(false);

  const registered = demoOnboardingScenarioById(session.demoScenarioId);
  const scenario = registered.surface === 'home' ? registered.variant : null;
  const selectedData =
    session.demoProfile === 'established-doctor' &&
    scenario &&
    scenario in HOME_DEMO_SCENARIOS
      ? HOME_DEMO_SCENARIOS[scenario as keyof typeof HOME_DEMO_SCENARIOS]
      : homeDataForSession(session);
  const data = recovered ? HOME_DEMO_SCENARIOS['busy-morning'] : selectedData;

  return (
    <HomeWorkspace
      data={data}
      onNavigate={(targetKey) => router.push(pathForNavKey('clinical', targetKey))}
      onOpenDemoPatient={() => router.push(`/patients/${DEMO_TOUR_PATIENT_ID}`)}
      onOpenLicence={() => openSettings('account')}
      onStartBooking={() => router.push('/catalog?intent=booking')}
      onRefresh={() => setRecovered(true)}
    />
  );
}

export default function Page() {
  return <HomePage />;
}
