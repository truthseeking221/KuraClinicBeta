'use client';

/**
 * Results review. The onboarding phone selects the Storybook-owned episode
 * or system state; the route itself does not invent or override fixtures.
 */

import { ResultsReviewFlow, ResultsWorkspace } from '../../../features/results';
import { useState } from 'react';
import {
  DEMO_RESULTS_PATIENT,
  RESULTS_DEMO_SCENARIOS,
} from '../../../features/results/demo-data';
import type { ResultsDemoScenario } from '../../../features/results/demo-data';
import { demoOnboardingScenarioById } from '../../../features/auth/demo-data';
import { useDemoSession } from '../../_demo/demo-session';

function ResultsPage() {
  const { session } = useDemoSession();
  const [recovered, setRecovered] = useState(false);
  const registered = demoOnboardingScenarioById(session.demoScenarioId);
  const requested = registered.surface === 'results' ? registered.variant : 'critical';
  const selectedEpisode: ResultsDemoScenario =
    RESULTS_DEMO_SCENARIOS[requested as keyof typeof RESULTS_DEMO_SCENARIOS] ??
    RESULTS_DEMO_SCENARIOS.critical;
  const episode: ResultsDemoScenario = recovered
    ? RESULTS_DEMO_SCENARIOS.longitudinal
    : selectedEpisode;

  if (session.demoProfile === 'new-doctor') {
    return <ResultsWorkspace episodeLabel="" sections={[]} state="empty" />;
  }

  if (episode.mode === 'review') {
    return (
      <ResultsReviewFlow
        episodeLabel={episode.episodeLabel}
        patient={DEMO_RESULTS_PATIENT}
        sections={episode.sections}
      />
    );
  }

  return (
    <ResultsWorkspace
      episodeLabel={episode.episodeLabel}
      onRetry={() => setRecovered(true)}
      patient={DEMO_RESULTS_PATIENT}
      readOnly={episode.readOnly}
      sections={episode.sections}
      staleAt={episode.staleAt}
      state={episode.state}
    />
  );
}

export default function Page() {
  return <ResultsPage />;
}
