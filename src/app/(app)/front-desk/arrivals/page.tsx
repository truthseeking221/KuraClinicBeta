'use client';

/** Desk arrivals: the live queue plus the entry point for a new walk-in. */

import { useRouter } from 'next/navigation';

import { toast } from '../../../../components/ui';
import { DeskQueue } from '../../../../features/front-desk/desk-queue';
import { checkedInVisit, inProgressVisit } from '../../../../features/front-desk';
import { demoOnboardingScenarioById } from '../../../../features/auth/demo-data';
import { FRONT_DESK_QUEUE_DEMO_SCENARIOS } from '../../../../features/front-desk/demo-data';
import type { FrontDeskQueueDemoVariant } from '../../../../features/front-desk/demo-data';
import { useDemoSession } from '../../../_demo/demo-session';
import { useFrontDeskStore } from '../../../_demo/front-desk-store';

export default function ArrivalsPage() {
  const router = useRouter();
  const { session } = useDemoSession();
  const { patient, receipts, startNewWalkIn } = useFrontDeskStore();
  const scenario = demoOnboardingScenarioById(session.demoScenarioId);
  const configured =
    scenario.surface === 'front-desk-queue'
      ? FRONT_DESK_QUEUE_DEMO_SCENARIOS[
          scenario.variant as FrontDeskQueueDemoVariant
        ]
      : undefined;

  // An unfinished capture keeps its place in the queue, so leaving the wizard
  // never loses it; finished check-ins stay on as observed visits.
  const open = inProgressVisit(patient);
  const visits =
    configured?.visits ??
    [
      ...(open ? [open] : []),
      ...receipts.map((done) => checkedInVisit(done)),
    ];

  return (
    <DeskQueue
      onNewWalkIn={() => {
        startNewWalkIn();
        router.push('/front-desk/arrivals/check-in');
      }}
      onQueueForDraw={(visitId) => toast.success(`Visit ${visitId} queued for draw`)}
      onRefresh={() => router.refresh()}
      onRetry={() => router.refresh()}
      onResumeVisit={() => router.push('/front-desk/arrivals/check-in')}
      asOf={configured?.asOf}
      state={configured?.state}
      visits={visits}
    />
  );
}
