'use client';

/**
 * Results review. ?episode= switches the episode fixture so the demo can
 * show first-visit, critical, partial, redraw, and cancellation edges —
 * the same section sets the Storybook stories prove.
 */

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { ResultsReviewFlow } from '../../../features/results';
import {
  ADD_ON_EPISODE_SECTIONS,
  ALL_CANCELLED_SECTIONS,
  CRITICAL_COMPLETE_SECTIONS,
  DEMO_RESULTS_PATIENT,
  FIRST_VISIT_SECTIONS,
  PARTIAL_EPISODE_SECTIONS,
  REDRAW_EPISODE_SECTIONS,
  RELEASED_WITH_CANCELLED_SECTIONS,
} from '../../../features/results/demo-data';

const EPISODES: Record<string, { label: string; sections: typeof FIRST_VISIT_SECTIONS }> = {
  critical: { label: 'Episode · Jun 10, 2026', sections: CRITICAL_COMPLETE_SECTIONS },
  first: { label: 'First visit · Jun 10, 2026', sections: FIRST_VISIT_SECTIONS },
  partial: { label: 'Episode · results arriving', sections: PARTIAL_EPISODE_SECTIONS },
  redraw: { label: 'Episode · redraw in progress', sections: REDRAW_EPISODE_SECTIONS },
  'add-on': { label: 'Episode · add-on placed', sections: ADD_ON_EPISODE_SECTIONS },
  'with-cancelled': {
    label: 'Episode · released with cancellations',
    sections: RELEASED_WITH_CANCELLED_SECTIONS,
  },
  cancelled: { label: 'Episode · cancelled', sections: ALL_CANCELLED_SECTIONS },
};

function ResultsPage() {
  const searchParams = useSearchParams();
  const episode = EPISODES[searchParams.get('episode') ?? 'critical'] ?? EPISODES.critical;

  return (
    <ResultsReviewFlow
      episodeLabel={episode.label}
      patient={DEMO_RESULTS_PATIENT}
      sections={episode.sections}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResultsPage />
    </Suspense>
  );
}
