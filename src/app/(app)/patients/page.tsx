'use client';

import { useRouter } from 'next/navigation';

import { ComingSoonPage } from '../../../components/shared/coming-soon';

export default function PatientsPage() {
  const router = useRouter();
  return (
    <ComingSoonPage
      onBack={() => router.back()}
      description="The longitudinal patient registry with identity, episodes, and results history."
      title="Patients"
    />
  );
}
