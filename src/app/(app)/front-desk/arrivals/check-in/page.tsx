'use client';

/**
 * Walk-in check-in: the canonical six-step wizard. A confirmed check-in
 * stores its receipt and returns to arrivals.
 */

import { useRouter } from 'next/navigation';

import { toast } from '../../../../../components/ui';
import { CheckInWizard } from '../../../../../features/front-desk';
import {
  DEMO_BRANCH_ID,
  DEMO_PRESCRIBERS,
  EXISTING_PATIENTS,
  IDENTITY_REGISTRY,
} from '../../../../../features/front-desk/demo-data';
import { DEMO_FX_RATE } from '../../../../_demo/fixtures';
import { useFrontDeskStore } from '../../../../_demo/front-desk-store';

export default function CheckInPage() {
  const router = useRouter();
  const { patient, setPatient, completeCheckIn } = useFrontDeskStore();

  return (
    <CheckInWizard
      branchId={DEMO_BRANCH_ID}
      existingPatients={[...EXISTING_PATIENTS]}
      fxRate={DEMO_FX_RATE}
      identityRegistry={[...IDENTITY_REGISTRY]}
      onCheckIn={() => {
        completeCheckIn();
        toast.success(`${patient.name || 'Walk-in'} checked in`);
        router.push('/front-desk/payments');
      }}
      onPatientChange={setPatient}
      patient={patient}
      prescribers={[...DEMO_PRESCRIBERS]}
    />
  );
}
