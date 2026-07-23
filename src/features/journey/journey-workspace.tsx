'use client';

import { useState } from 'react';

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import { AssessmentWorkspace } from '../assessment/assessment-workspace';
import { EMPTY_ENCOUNTER } from '../assessment/demo-data';
import { indicationFrom, orderableDiagnoses } from '../assessment/logic';
import type { ClinicalAssessment } from '../assessment/types';
import { CareLoopReview } from '../care-plan/care-loop-review';
import { CarePlanCard } from '../care-plan/care-plan-card';
import { ANAEMIA_LOOP_DRAFT, DEMO_ANCHOR, EMPTY_PLAN } from '../care-plan/demo-data';
import { signCareLoop } from '../care-plan/logic';

import {
  axisParts,
  currentPhase,
  JOURNEY_PHASES,
  newEpisode,
  nextStep,
  PHASE_LABELS,
  phaseState,
} from './episode';
import type { Episode } from './episode';
import styles from './journey.module.css';
import { JOURNEY_PATIENT, JOURNEY_PATIENT_DEMOGRAPHICS } from './patient';

export type JourneyWorkspaceProps = {
  /** Start the journey partway through, for stories that open on one phase. */
  initialEpisode?: Episode;
};

/** One compact operator step for the phases whose full surface lives elsewhere. */
function OperatorStep({
  action,
  detail,
  onDone,
  title,
}: {
  title: string;
  detail: string;
  action: string;
  onDone: () => void;
}) {
  const t = useT();

  return (
    <Card as="section" aria-label={t(title)} className={styles.stepCard}>
      <CardHeader>
        <CardTitle>{t(title)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={styles.stepDetail}>{detail}</p>
      </CardContent>
      <footer className={styles.stepFooter}>
        <Button onClick={onDone}>{t(action)}</Button>
      </footer>
    </Card>
  );
}

/**
 * The journey conductor. It owns the episode and decides what comes next; the
 * phase surfaces below it only read their input and hand back their output.
 *
 * The strip at the top is the point of the whole thing: at any moment it
 * states which step the episode is in, who is expected to act, and — when the
 * episode has stopped — what is holding it up. Money, specimen and result are
 * reported separately, because a paid visit with no sample drawn is a real
 * and common state.
 */
export function JourneyWorkspace({ initialEpisode }: JourneyWorkspaceProps) {
  const t = useT();
  const [episode, setEpisode] = useState<Episode>(
    initialEpisode ?? newEpisode(JOURNEY_PATIENT.userId, JOURNEY_PATIENT.displayName),
  );
  const [assessment, setAssessment] = useState<ClinicalAssessment>(
    initialEpisode?.assessment ?? EMPTY_ENCOUNTER,
  );

  const phase = currentPhase(episode);
  const step = nextStep(episode);
  const patch = (next: Partial<Episode>) => setEpisode((current) => ({ ...current, ...next }));

  return (
    <div className={styles.workspace}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <h1 className={styles.title}>{episode.patientName}</h1>
          <span className={styles.demographics}>{JOURNEY_PATIENT_DEMOGRAPHICS}</span>
          <Badge variant={episode.identity === 'verified' ? 'success' : 'warning'}>
            {episode.identity === 'unknown'
              ? t('Not identified')
              : episode.identity === 'provisional'
                ? t('Provisional')
                : t('Verified')}
          </Badge>
        </div>

        <ol aria-label={t('Journey phases')} className={styles.strip}>
          {JOURNEY_PHASES.map((item) => (
            <li className={styles.phase} data-state={phaseState(episode, item)} key={item}>
              <span className={styles.phaseLabel}>{t(PHASE_LABELS[item])}</span>
            </li>
          ))}
        </ol>

        <Card as="div" role="status" size="sm" variant="tile">
          <CardContent className={styles.nextStepContent}>
            <span className={styles.nextLabel}>{t('Next')}</span>
            <span className={styles.nextAction}>{t(step.action)}</span>
            <span className={styles.nextActor}>{t(step.actor)}</span>
            {step.blockedBy ? (
              <span className={styles.nextBlocked}>
                {t('Waiting')}: {t(step.blockedBy)}
              </span>
            ) : null}
          </CardContent>
        </Card>

        <p className={styles.axes}>
          {axisParts(episode)
            .map((part) => t(part))
            .join(' · ')}
        </p>
      </header>

      {phase === 'identity' ? (
        <OperatorStep
          action="Phone verified, open the record"
          detail={t(
            'A verified phone proves Kura can reach this number. It does not prove who the patient is, so the record opens as provisional until an identity document is checked.',
          )}
          onDone={() => patch({ identity: 'provisional' })}
          title="Identify the patient"
        />
      ) : null}

      {phase === 'assessment' ? (
        <AssessmentWorkspace
          assessment={assessment}
          onChange={setAssessment}
          onOrderTests={(signed) => {
            const [held] = orderableDiagnoses(signed.diagnoses);
            patch({ assessment: signed, indication: held ? indicationFrom(held) : undefined });
          }}
          patientDemographics={JOURNEY_PATIENT_DEMOGRAPHICS}
          patientName={episode.patientName}
        />
      ) : null}

      {phase === 'order' ? (
        <OperatorStep
          action="Send booking code"
          detail={`${t('Ten baseline tests, ordered for')} ${episode.indication?.code} · ${episode.indication?.label}. ${t('The patient will pay at the Kura desk.')}`}
          onDone={() =>
            patch({ orderedTestCount: 10, payment: 'due', sample: 'awaiting_collection' })
          }
          title="Order tests"
        />
      ) : null}

      {phase === 'collection' ? (
        <OperatorStep
          action="Payment taken, tubes drawn"
          detail={t(
            'Cash collected at the desk and four tubes drawn after the positive-identification check. Payment and collection are recorded separately: one can happen without the other.',
          )}
          onDone={() => patch({ payment: 'paid', sample: 'collected' })}
          title="Collect payment and samples"
        />
      ) : null}

      {phase === 'results' ? (
        <OperatorStep
          action="Release results to the doctor"
          detail={`${t('The courier delivered the samples and the lab has verified them.')} Ferritin 9 µg/L, haemoglobin 10.2 g/dL — ${t('both below range.')}`}
          onDone={() => patch({ sample: 'received_at_lab', result: 'released' })}
          title="Lab runs the tests"
        />
      ) : null}

      {phase === 'care-plan' && !episode.plan ? (
        <CareLoopReview
          anchorLabel={DEMO_ANCHOR}
          draft={ANAEMIA_LOOP_DRAFT}
          onSign={(kept) =>
            patch({
              plan: signCareLoop(EMPTY_PLAN, ANAEMIA_LOOP_DRAFT, kept, 'Dr. Sok Vanna', DEMO_ANCHOR),
              result: 'reviewed',
            })
          }
          plan={EMPTY_PLAN}
          signedBy="Dr. Sok Vanna"
        />
      ) : null}

      {episode.plan ? <CarePlanCard plan={episode.plan} /> : null}
    </div>
  );
}
