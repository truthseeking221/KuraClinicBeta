'use client';

import { useRouter } from 'next/navigation';

import { PatientsRegistry } from '../../../features/patients';
import { DEMO_PATIENTS, DEMO_TRIAGE } from '../../../features/patients/demo-data';

export default function PatientsPage() {
  const router = useRouter();
  return (
    <PatientsRegistry
      onOpenPatient={(userId) => router.push(`/patients/${userId}`)}
      patients={DEMO_PATIENTS}
      triage={DEMO_TRIAGE}
    />
  );
}
