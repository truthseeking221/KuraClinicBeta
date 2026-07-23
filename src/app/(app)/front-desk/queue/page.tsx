'use client';

/** Desk queue under load: the long-wait fixture surfaces SLA pressure states. */

import { useRouter } from 'next/navigation';

import { demoOnboardingScenarioById } from '../../../../features/auth/demo-data';
import { DeskQueue } from '../../../../features/front-desk/desk-queue';
import { FRONT_DESK_QUEUE_DEMO_SCENARIOS } from '../../../../features/front-desk/demo-data';
import type { FrontDeskQueueDemoVariant } from '../../../../features/front-desk/demo-data';
import { useDemoSession } from '../../../_demo/demo-session';
import { useFrontDeskStore } from '../../../_demo/front-desk-store';

export default function QueuePage() {
  const router = useRouter();
  const { session } = useDemoSession();
  const { callVisit, skipCalledVisit, startDraw, startNewWalkIn } = useFrontDeskStore();
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
      onCallVisit={callVisit}
      onRefresh={() => router.refresh()}
      onRetry={() => router.refresh()}
      onResumeVisit={() => router.push('/front-desk/arrivals/check-in')}
      onSkipVisit={skipCalledVisit}
      onStartDraw={startDraw}
      asOf={configured.asOf}
      state={configured.state}
      visits={configured.visits}
    />
  );
}
