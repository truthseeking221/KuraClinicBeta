'use client';

import { useMemo, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { CheckIcon, LockKeyIcon } from '../../components/ui/icons';
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { CriticalResultNotice } from './critical-result-notice';
import { episodeProgress, flagFor, visibleSections } from './logic';
import { ResultsWorkspace } from './results-workspace';
import type { LabResultSection, ResultsPatient } from './types';
import styles from './results-review-flow.module.css';

export type ResultsReviewFlowProps = {
  patient: ResultsPatient;
  episodeLabel: string;
  sections: LabResultSection[];
  initialAcknowledged?: boolean;
  initialClosed?: boolean;
};

export function ResultsReviewFlow({
  episodeLabel,
  initialAcknowledged = false,
  initialClosed = false,
  patient,
  sections,
}: ResultsReviewFlowProps) {
  const [acknowledged, setAcknowledged] = useState(initialAcknowledged);
  const [closed, setClosed] = useState(initialClosed);
  const allResults = sections.flatMap((section) => section.results);
  const progress = episodeProgress(allResults);
  const critical = useMemo(
    () =>
      visibleSections(sections)
        .flatMap((section) => section.results)
        .find((result) => flagFor(result)?.severity === 'critical'),
    [sections],
  );
  const canClose = progress.pending === 0 && (!critical || acknowledged);
  const closeReason =
    progress.pending > 0
      ? `${progress.pending} test ${progress.pending === 1 ? 'line is' : 'lines are'} still pending.`
      : critical && !acknowledged
        ? 'A critical released result still requires acknowledgment.'
        : 'All release and acknowledgment gates are satisfied.';

  return (
    <div className={styles.flow} data-slot="results-review-flow">
      {critical ? (
        <CriticalResultNotice
          acknowledged={acknowledged}
          result={critical}
          onAcknowledge={() => setAcknowledged(true)}
        />
      ) : null}

      {closed ? (
        <Alert tone="neutral" icon={<CheckIcon />}>
          <AlertTitle>Clinical result review closed</AlertTitle>
          <AlertDescription>
            The closure event is represented as a product/design target until backend audit and
            concurrency contracts are mapped.
          </AlertDescription>
        </Alert>
      ) : null}

      <ResultsWorkspace
        episodeLabel={episodeLabel}
        patient={patient}
        readOnly={closed}
        sections={sections}
      />

      <Card as="section" size="sm">
        <CardContent>
          <div className={styles.closureStatus}>
            <LockKeyIcon size={20} aria-hidden="true" />
            <div>
              <p className={styles.closureTitle}>Clinical closure gate</p>
              <p className={styles.closureReason}>{closeReason}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={!canClose || closed} onClick={() => setClosed(true)}>
            {closed ? 'Review closed' : 'Close result review'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
