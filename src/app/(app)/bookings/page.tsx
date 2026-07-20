'use client';

import { useRouter } from 'next/navigation';

import { ComingSoonPage } from '../../../components/shared/coming-soon';

export default function BookingsPage() {
  const router = useRouter();
  return (
    <ComingSoonPage
      onBack={() => router.back()}
      description="Clinic bookings with collection codes, scheduling, and status tracking."
      title="Bookings"
    />
  );
}
