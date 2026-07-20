'use client';

import { useRouter } from 'next/navigation';

import { ComingSoonPage } from '../../../../components/shared/coming-soon';

export default function DeskPatientsPage() {
  const router = useRouter();
  return (
    <ComingSoonPage
      onBack={() => router.back()}
      description="Desk-side patient lookup across bookings, receipts, and contact details."
      title="Patients"
    />
  );
}
