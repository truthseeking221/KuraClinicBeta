'use client';

import { useId } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '../../components/ui';
import { LoadingIcon } from '../../components/ui/icons';
import { useT } from '../../components/foundations/i18n';

import styles from './lab-journey-progress.module.css';

export type LabJourneyStatus =
  | 'samples_ready'
  | 'pickup_delayed'
  | 'courier_assigned'
  | 'in_transit'
  | 'received_at_lab'
  | 'processing'
  | 'partially_complete';

export type LabJourneyProgressProps = {
  orderId: string;
  status: LabJourneyStatus;
  courierEtaLabel?: string;
  resulted?: number;
  total?: number;
  flagged?: number;
  onReviewResults?: () => void;
};

const MILESTONES = [
  'Samples ready',
  'Courier pickup',
  'In transit',
  'Received by lab',
  'Partial results',
] as const;

function stepForStatus(status: LabJourneyStatus) {
  if (status === 'samples_ready' || status === 'pickup_delayed') return 1;
  if (status === 'courier_assigned') return 2;
  if (status === 'in_transit') return 3;
  if (status === 'received_at_lab' || status === 'processing') return 4;
  return 5;
}

function detailForStatus({
  courierEtaLabel,
  flagged = 0,
  resulted = 0,
  status,
  total = 0,
}: Pick<
  LabJourneyProgressProps,
  'courierEtaLabel' | 'flagged' | 'resulted' | 'status' | 'total'
>) {
  if (status === 'samples_ready') return 'Waiting for a courier assignment.';
  if (status === 'pickup_delayed') return 'Pickup is delayed. Samples remain with the clinic.';
  if (status === 'courier_assigned') {
    return courierEtaLabel
      ? `Courier expected ${courierEtaLabel}.`
      : 'The courier is on the way to the clinic.';
  }
  if (status === 'in_transit') return 'The courier has custody of the samples.';
  if (status === 'received_at_lab') return 'The laboratory has recorded receipt.';
  if (status === 'processing') return 'The laboratory is processing the samples.';
  const resultCount = `${resulted} of ${total} results ready.`;
  return flagged > 0
    ? `${resultCount} ${flagged} ${flagged === 1 ? 'result needs' : 'results need'} review.`
    : resultCount;
}

/**
 * Passive fulfillment tracker for a placed lab order. It compresses the
 * platform's job and custody states into milestones a clinician can act on.
 */
export function LabJourneyProgress({
  courierEtaLabel,
  flagged,
  onReviewResults,
  orderId,
  resulted,
  status,
  total,
}: LabJourneyProgressProps) {
  const t = useT();
  const titleId = useId();
  const activeStep = stepForStatus(status);
  const detail = detailForStatus({ courierEtaLabel, flagged, resulted, status, total });
  const delayed = status === 'pickup_delayed';
  const partial = status === 'partially_complete';

  return (
    <section aria-labelledby={titleId} className={styles.section}>
      <header className={styles.header}>
        <div>
          <p className={styles.order}>{t('Order')} {orderId}</p>
          <h2 id={titleId}>{t('Sample progress')}</h2>
        </div>
        {partial && onReviewResults ? (
          <Button onClick={onReviewResults} size="sm" variant="primary">
            {t('Review results')}
          </Button>
        ) : null}
      </header>

      <Stepper
        indicators={{
          loading: <LoadingIcon aria-hidden="true" className={styles.loadingIcon} size={14} />,
        }}
        mode="status"
        value={activeStep}
      >
        <StepperNav aria-label={t('Courier and laboratory progress')}>
          {MILESTONES.map((label, index) => {
            const step = index + 1;
            const current = step === activeStep;
            return (
              <StepperItem key={label} loading={current && !delayed} step={step}>
                <StepperTrigger>
                  <StepperIndicator>{step}</StepperIndicator>
                  <div className={styles.stepCopy}>
                    <StepperTitle>{t(label)}</StepperTitle>
                    {current ? <StepperDescription>{t(detail)}</StepperDescription> : null}
                  </div>
                </StepperTrigger>
                {index < MILESTONES.length - 1 ? <StepperSeparator /> : null}
              </StepperItem>
            );
          })}
        </StepperNav>
      </Stepper>

      <span aria-live="polite" className={styles.srOnly} role="status">
        {t(MILESTONES[activeStep - 1])}. {t(detail)}
      </span>

      {delayed ? (
        <Alert tone="warning">
          <AlertTitle>{t('Courier pickup is delayed')}</AlertTitle>
          <AlertDescription>
            {t('Samples remain with the clinic until the courier records pickup.')}
          </AlertDescription>
        </Alert>
      ) : null}
    </section>
  );
}

export function labJourneyStatusFromCollectionStage(stage: string): LabJourneyStatus | null {
  if (stage === 'ready-for-pickup') return 'samples_ready';
  if (stage === 'pickup-delayed') return 'pickup_delayed';
  if (stage === 'courier-assigned') return 'courier_assigned';
  if (stage === 'in-transit' || stage === 'awaiting-results') return 'in_transit';
  if (stage === 'received-at-lab') return 'received_at_lab';
  if (stage === 'processing') return 'processing';
  if (stage === 'partial-results') return 'partially_complete';
  return null;
}
