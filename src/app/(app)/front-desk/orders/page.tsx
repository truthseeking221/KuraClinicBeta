'use client';

import { useRouter } from 'next/navigation';

import { ComingSoonPage } from '../../../../components/shared/coming-soon';

/** The shared order-cart surface is mid-refactor; kept honestly unfinished. */
export default function OrdersPage() {
  const router = useRouter();
  return (
    <ComingSoonPage
      onBack={() => router.back()}
      description="One cart handed from doctor to reception — signing, pricing, and payment collection."
      title="Orders"
    />
  );
}
