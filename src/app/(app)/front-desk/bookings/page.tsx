'use client';

import { useRouter } from 'next/navigation';

import { ComingSoonPage } from '../../../../components/shared/coming-soon';

export default function DeskBookingsPage() {
  const router = useRouter();
  return (
    <ComingSoonPage
      onBack={() => router.back()}
      description="Booking-code arrivals with QR scan, resend, and walk-in conversion."
      title="Bookings"
    />
  );
}
