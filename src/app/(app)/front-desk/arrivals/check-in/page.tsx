'use client';

/**
 * Walk-in check-in: the adaptive desk flow. A confirmed check-in puts the
 * visit on the queue and returns the desk to arrivals, where the same staffer
 * calls the patient and starts the draw. Payment already happened inside the
 * flow — routing to the payments list here would send the desk in a circle.
 */

import { useRouter } from 'next/navigation';

import { toast } from '../../../../../components/ui';
import { CheckInWizard } from '../../../../../features/front-desk';
import type { Prescriber } from '../../../../../features/front-desk';
import {
  DEMO_PRESCRIBERS,
  EXISTING_PATIENTS,
  IDENTITY_REGISTRY,
} from '../../../../../features/front-desk/demo-data';
import { DEMO_FX_RATE } from '../../../../_demo/fixtures';
import { useDemoSession } from '../../../../_demo/demo-session';
import { useFrontDeskStore } from '../../../../_demo/front-desk-store';

export default function CheckInPage() {
  const router = useRouter();
  const { patient, setPatient, completeCheckIn } = useFrontDeskStore();
  const { session } = useDemoSession();
  const newDoctor = session.demoProfile === 'new-doctor';
  const prescribers: Prescriber[] = newDoctor
    ? [
        {
          userId: 'current-doctor',
          name: session.userName,
          workspaceMember: true,
          licence: session.licence,
        },
      ]
    : [...DEMO_PRESCRIBERS];

  return (
    <CheckInWizard
      branchId={session.branchId || session.workspaceId}
      existingPatients={newDoctor ? [] : [...EXISTING_PATIENTS]}
      fxRate={DEMO_FX_RATE}
      identityRegistry={newDoctor ? [] : [...IDENTITY_REGISTRY]}
      onCheckIn={() => {
        completeCheckIn();
        toast.success(`${patient.name || 'Walk-in'} checked in`);
        router.push('/front-desk/arrivals');
      }}
      onPatientChange={setPatient}
      patient={patient}
      prescribers={prescribers}
    />
  );
}
