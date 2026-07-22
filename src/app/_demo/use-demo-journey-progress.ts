'use client';

import { useEffect } from 'react';

import { demoLabJourneyAfterElapsed } from '../../features/care-loop/demo-data';
import { useDemoSession } from './demo-session';

const DEMO_LOGISTICS_STAGES = new Set([
  'ready-for-pickup',
  'courier-assigned',
  'in-transit',
  'received-at-lab',
  'processing',
  'partial-results',
]);

/** Replays Storybook-owned courier states in the backend-free prototype. */
export function useDemoJourneyProgress() {
  const { session, update } = useDemoSession();
  const journey = session.patientJourney;
  const labOrder = journey?.labOrder;
  const startedAt = session.patientJourneyLogisticsStartedAtMs;

  useEffect(() => {
    if (!journey || !labOrder || !DEMO_LOGISTICS_STAGES.has(labOrder.stage)) return;

    if (!startedAt) {
      update({ patientJourneyLogisticsStartedAtMs: Date.now() });
      return;
    }

    const advance = () => {
      const nextLabOrder = demoLabJourneyAfterElapsed(labOrder, Date.now() - startedAt);
      if (JSON.stringify(nextLabOrder) === JSON.stringify(labOrder)) return;
      update({ patientJourney: { ...journey, labOrder: nextLabOrder } });
    };

    advance();
    const timer = window.setInterval(advance, 2_000);
    return () => window.clearInterval(timer);
  }, [journey, labOrder, startedAt, update]);
}
