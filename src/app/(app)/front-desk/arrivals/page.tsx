'use client';

/** Desk arrivals: the live queue plus the entry point for a new walk-in. */

import { useRouter } from 'next/navigation';

import { toast } from '../../../../components/ui';
import { DeskQueue } from '../../../../features/front-desk/desk-queue';
import { DESK_VISITS } from '../../../../features/front-desk/demo-data';
import { useFrontDeskStore } from '../../../_demo/front-desk-store';

export default function ArrivalsPage() {
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
      visits={[...DESK_VISITS]}
    />
  );
}
