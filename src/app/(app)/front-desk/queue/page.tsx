'use client';

/** Desk queue under load: the long-wait fixture surfaces SLA pressure states. */

import { useRouter } from 'next/navigation';

import { toast } from '../../../../components/ui';
import { DeskQueue } from '../../../../features/front-desk/desk-queue';
import { useFrontDeskStore } from '../../../_demo/front-desk-store';

export default function QueuePage() {
  const router = useRouter();
  const { startNewWalkIn } = useFrontDeskStore();

  return (
    <DeskQueue
      onNewWalkIn={() => {
        startNewWalkIn();
        router.push('/front-desk/arrivals/check-in');
      }}
      onQueueForDraw={(visitId) => toast.success(`Visit ${visitId} queued for draw`)}
      onRefresh={() => router.refresh()}
      onResumeVisit={() => router.push('/front-desk/arrivals/check-in')}
      visits={[]}
    />
  );
}
