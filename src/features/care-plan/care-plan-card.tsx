'use client';

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import styles from './care-plan.module.css';
import {
  canCompleteIntervention,
  goalsForFocus,
  interventionsForFocus,
  interventionStatusLabel,
  monitoringForFocus,
  requiresEvidence,
} from './logic';
import type { CarePlan, GoalStatus, Intervention } from './types';

export type CarePlanCardProps = {
  plan: CarePlan;
  /** Mark a step done. Blocked steps never call this. */
  onCompleteIntervention?: (interventionId: string) => void;
  /** Close an evidence-bearing step that will never produce its evidence. */
  onRecordException?: (interventionId: string) => void;
};

const GOAL_TONE: Record<GoalStatus, 'success' | 'warning' | 'neutral'> = {
  met: 'success',
  'off-target': 'warning',
  'on-track': 'success',
  'not-assessed': 'neutral',
};

const GOAL_LABEL: Record<GoalStatus, string> = {
  met: 'Met',
  'off-target': 'Off target',
  'on-track': 'On track',
  'not-assessed': 'Not assessed',
};

function InterventionRow({
  intervention,
  onComplete,
  onException,
}: {
  intervention: Intervention;
  onComplete?: () => void;
  onException?: () => void;
}) {
  const t = useT();
  const check = canCompleteIntervention(intervention);
  const done = intervention.status === 'complete';

  return (
    <li className={styles.intervention} data-status={intervention.status}>
      <div className={styles.interventionMain}>
        <span className={styles.interventionLabel}>{intervention.label}</span>
        <span className={styles.interventionMeta}>
          {[intervention.owner, intervention.due].filter(Boolean).join(' · ')}
        </span>
        {intervention.evidence ? (
          <span className={styles.interventionEvidence}>
            {t('Result')}: {intervention.evidence}
          </span>
        ) : null}
        {intervention.exception ? (
          <span className={styles.interventionEvidence}>
            {t('Closed without a result')}: {intervention.exception.reason}
          </span>
        ) : null}
      </div>

      <Badge size="sm" variant={done ? 'success' : 'neutral'}>
        {t(interventionStatusLabel(intervention.status))}
      </Badge>

      {done ? null : (
        <div className={styles.interventionActions}>
          <Button
            disabled={!check.ok}
            onClick={onComplete}
            size="sm"
            variant="outline"
          >
            {t('Mark done')}
          </Button>
          {!check.ok && requiresEvidence(intervention.kind) && onException ? (
            <Button onClick={onException} size="sm" variant="ghost">
              {t('Record exception')}
            </Button>
          ) : null}
        </div>
      )}

      {!done && !check.ok ? (
        <p className={styles.interventionBlocked}>{t(check.reason)}</p>
      ) : null}
    </li>
  );
}

/**
 * The living plan. Its job on screen is to answer two questions at a glance:
 * what is this patient's care aiming at, and what is it currently waiting on.
 *
 * A lab step carries its blocking reason inline rather than a disabled button
 * with nothing beside it — "waiting on the result" is clinical information,
 * not a form validation message.
 */
export function CarePlanCard({
  onCompleteIntervention,
  onRecordException,
  plan,
}: CarePlanCardProps) {
  const t = useT();

  return (
    <Card as="section" aria-label={t('Care plan')} className={styles.planCard}>
      <CardHeader>
        <CardTitle>{t(plan.title)}</CardTitle>
        <div className={styles.planMeta}>
          <Badge variant={plan.status === 'active' ? 'success' : 'neutral'}>
            {t(plan.status === 'on-hold' ? 'Paused' : plan.status)}
          </Badge>
          <span className={styles.planVersion}>
            {t('Version')} {plan.version}
          </span>
          <span className={styles.planVersion}>
            {t('Review every')} {plan.reviewCadence}
          </span>
        </div>
        {plan.holdReason ? (
          <p className={styles.holdReason}>
            {t('Paused')}: {plan.holdReason}
          </p>
        ) : null}
      </CardHeader>

      <CardContent className={styles.planContent}>
        {plan.focuses.length === 0 ? (
          <p className={styles.empty}>
            {t(
              'No care plan yet. It starts when a result needs an answer that outlives this visit.',
            )}
          </p>
        ) : null}

        {plan.focuses.map((focus) => {
          const goals = goalsForFocus(plan, focus.id);
          const interventions = interventionsForFocus(plan, focus.id);
          const monitoring = monitoringForFocus(plan, focus.id);

          return (
            <Card
              as="section"
              aria-label={focus.label}
              key={focus.id}
              size="sm"
              variant="tile"
            >
              <CardHeader>
                <CardTitle>
                  {focus.code === '' ? focus.label : `${focus.code} · ${focus.label}`}
                </CardTitle>
                {focus.enrolledVia === 'protocol' ? (
                  <CardAction mobileLayout="inline">
                    <Badge size="sm" variant="info">
                      {t('From protocol')}
                    </Badge>
                  </CardAction>
                ) : null}
              </CardHeader>

              <CardContent className={styles.focusContent}>
                {goals.length > 0 ? (
                  <ul className={styles.goalList}>
                    {goals.map((goal) => (
                      <li className={styles.goal} key={goal.id}>
                        <span className={styles.goalLabel}>{goal.label}</span>
                        <span className={styles.goalValue}>{goal.latest ?? '—'}</span>
                        <Badge size="sm" variant={GOAL_TONE[goal.status]}>
                          {t(GOAL_LABEL[goal.status])}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {interventions.length > 0 ? (
                  <ul
                    aria-label={`${t('Steps for')} ${focus.label}`}
                    className={styles.interventionList}
                  >
                    {interventions.map((intervention) => (
                      <InterventionRow
                        intervention={intervention}
                        key={intervention.id}
                        onComplete={() => onCompleteIntervention?.(intervention.id)}
                        onException={() => onRecordException?.(intervention.id)}
                      />
                    ))}
                  </ul>
                ) : null}

                {monitoring.map((rule) => (
                  <p className={styles.monitoring} key={rule.id}>
                    <strong>{rule.label}</strong> {t('every')} {rule.cadence}
                    {rule.escalation ? ` · ${rule.escalation}` : ''}
                  </p>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
