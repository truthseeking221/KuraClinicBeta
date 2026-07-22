'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PatientsWorkspace } from '../../../features/patients';
import {
  DEMO_PATIENTS,
  DEMO_TOUR_PATIENT_IDS,
  DEMO_TOUR_PATIENTS,
  DEMO_TRIAGE,
  PATIENTS_REGISTRY_DEMO_SCENARIOS,
} from '../../../features/patients/demo-data';
import type { PatientsRegistryDemoScenario } from '../../../features/patients/demo-data';
import { CARE_LOOP_DEMO_INTAKE_RECORD } from '../../../features/care-loop/demo-data';
import { demoOnboardingScenarioById } from '../../../features/auth/demo-data';
import { useDemoSession } from '../../_demo/demo-session';
import { useDemoJourneyProgress } from '../../_demo/use-demo-journey-progress';

export default function PatientsPage() {
  const router = useRouter();
  const { session, update } = useDemoSession();
  useDemoJourneyProgress();
  const [recovered, setRecovered] = useState(false);
  const newDoctor = session.demoProfile === 'new-doctor';
  const selected = demoOnboardingScenarioById(session.demoScenarioId);
  const registered: PatientsRegistryDemoScenario | undefined =
    selected.surface === 'patients' &&
    selected.variant in PATIENTS_REGISTRY_DEMO_SCENARIOS
      ? PATIENTS_REGISTRY_DEMO_SCENARIOS[
          selected.variant as keyof typeof PATIENTS_REGISTRY_DEMO_SCENARIOS
        ]
      : undefined;
  const active = recovered ? undefined : registered;
  const patients = newDoctor ? DEMO_TOUR_PATIENTS : (active?.patients ?? DEMO_PATIENTS);
  const triage = newDoctor ? undefined : (active ? active.triage : DEMO_TRIAGE);
  return (
    <PatientsWorkspace
      acquisition={{
        demoIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
        intakeSendDelayMs: 600,
      }}
      demoPatientIds={newDoctor ? DEMO_TOUR_PATIENT_IDS : undefined}
      onOpenPatient={(userId) => router.push(`/patients/${userId}`)}
      journey={session.patientJourney}
      onJourneyChange={(patientJourney) =>
        update({
          patientJourney,
          patientJourneyLogisticsStartedAtMs:
            patientJourney.labOrder?.stage === 'ready-for-pickup'
              ? session.patientJourneyLogisticsStartedAtMs
              : undefined,
        })
      }
      onRetry={() => setRecovered(true)}
      patients={patients}
      state={active?.state}
      triage={triage}
    />
  );
}
