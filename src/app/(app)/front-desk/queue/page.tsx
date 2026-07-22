'use client';

/** Desk queue under load: the long-wait fixture surfaces SLA pressure states. */

import { useRouter } from 'next/navigation';

import { toast } from '../../../../components/ui';
import { demoOnboardingScenarioById } from '../../../../features/auth/demo-data';
import { DeskQueue } from '../../../../features/front-desk/desk-queue';
import { FRONT_DESK_QUEUE_DEMO_SCENARIOS } from '../../../../features/front-desk/demo-data';
import type { FrontDeskQueueDemoVariant } from '../../../../features/front-desk/demo-data';
import { useDemoSession } from '../../../_demo/demo-session';
import { useFrontDeskStore } from '../../../_demo/front-desk-store';

export default function QueuePage() {
  const router = useRouter();
  const { session } = useDemoSession();
  const { startNewWalkIn } = useFrontDeskStore();
  const scenario = demoOnboardingScenarioById(session.demoScenarioId);
  const configured =
    scenario.surface === 'front-desk-queue'
      ? FRONT_DESK_QUEUE_DEMO_SCENARIOS[
          scenario.variant as FrontDeskQueueDemoVariant
        ]
      : FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-empty'];

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
      asOf={configured.asOf}
      state={configured.state}
      visits={configured.visits}
    />
  );
}
