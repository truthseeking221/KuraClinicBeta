'use client';

import { useT } from '../../components/foundations/i18n';
import { Badge, Button } from '../../components/ui';

import { OUTCOME_OWNER_LABEL, tubeByKey } from './catalog';
import {
  attemptForPlanItem,
  issuedSamplesForPlanItem,
  planItemState,
  sortPlanByDrawOrder,
  usableSampleForPlanItem,
} from './logic';
import type { CollectionDraft, ExpectedSpecimenPlanItem } from './types';
import styles from './expected-plan.module.css';

export type ExpectedPlanProps = {
  plan: readonly ExpectedSpecimenPlanItem[];
  draft: CollectionDraft;
  /** The item the worksheet is currently drawing. */
  activePlanItemId?: string | null;
  /** False while an upstream gate blocks the draw, or the station is read-only. */
  drawEnabled: boolean;
  onDraw: (planItemId: string) => void;
  onRecordOutcome: (planItemId: string, trigger: HTMLButtonElement) => void;
  onReopen: (planItemId: string) => void;
  /** Read-only stations still see the plan; they just cannot resolve it. */
  readOnly?: boolean;
};

/**
 * What the order requires, in CLSI draw order.
 *
 * These rows are a plan, not tubes. They carry no sample id and no barcode,
 * because nothing physical exists until a draw is registered — showing an
 * identity here would let the clinic label a tube that the lab has never heard
 * of, and make a plan row look like evidence of a draw.
 */
export function ExpectedPlan({
  activePlanItemId,
  draft,
  drawEnabled,
  onDraw,
  onRecordOutcome,
  onReopen,
  plan,
  readOnly = false,
}: ExpectedPlanProps) {
  const t = useT();
  const ordered = sortPlanByDrawOrder(plan);

  return (
    <section aria-label={t('Expected specimens')} className={styles.plan}>
      <ol className={styles.items}>
        {ordered.map((item) => {
          const tube = tubeByKey(item.tube);
          const state = planItemState(draft, item.id);
          const sample = usableSampleForPlanItem(draft.samples, item.id);
          const attempt = attemptForPlanItem(draft.attempts, item.id);
          const discarded = issuedSamplesForPlanItem(draft.samples, item.id);

          return (
            <li
              className={styles.item}
              data-active={item.id === activePlanItemId || undefined}
              data-state={state}
              key={item.id}
            >
              <span aria-hidden="true" className={styles.order}>
                {tube?.order ?? '—'}
              </span>
              <span aria-hidden="true" className={styles.dot} data-tube={item.tube} />

              <span className={styles.copy}>
                <span className={styles.tubeLine}>
                  {tube?.stopperLabel ?? item.tube}
                  <span className={styles.volume}>
                    {item.volumeMl} mL · {item.container}
                  </span>
                  {item.stat ? <Badge size="sm" variant="danger">STAT</Badge> : null}
                </span>
                <span className={styles.tests}>{item.tests.join(', ')}</span>

                {state === 'drawn' && sample ? (
                  <span className={styles.resolution} data-tone="success">
                    {t('Drawn')} {sample.drawnAtLabel} · {t('Sample')}{' '}
                    <span className={styles.mono}>{sample.sampleId}</span>
                  </span>
                ) : null}

                {/* A discarded tube still exists physically, so the row names
                    it instead of pretending the draw never happened. */}
                {discarded.length > 0 ? (
                  <span className={styles.resolution} data-tone="warning">
                    {discarded.length}{' '}
                    {t(discarded.length === 1 ? 'tube discarded' : 'tubes discarded')} ·{' '}
                    <span className={styles.mono}>
                      {discarded.map((entry) => entry.sampleId).join(', ')}
                    </span>
                  </span>
                ) : null}

                {state === 'closed_without_sample' && attempt ? (
                  <span className={styles.resolution} data-tone="warning">
                    {t('Not collected')} · {t(OUTCOME_OWNER_LABEL[attempt.owner])}:{' '}
                    {t(attempt.nextAction)}
                  </span>
                ) : null}
              </span>

              <span className={styles.actions}>
                {state === 'open' ? (
                  <>
                    <Button
                      disabled={!drawEnabled}
                      onClick={() => onDraw(item.id)}
                      size="xs"
                      variant="primary"
                    >
                      {discarded.length > 0 ? t('Redraw this tube') : t('Draw this tube')}
                    </Button>
                    <Button
                      disabled={readOnly}
                      onClick={(event) => onRecordOutcome(item.id, event.currentTarget)}
                      size="xs"
                      variant="ghost"
                    >
                      {t('Not collected')}
                    </Button>
                  </>
                ) : state === 'closed_without_sample' ? (
                  // Reopening is safe here precisely because no tube exists.
                  <Button
                    disabled={readOnly}
                    onClick={() => onReopen(item.id)}
                    size="xs"
                    variant="ghost"
                  >
                    {t('Reopen')}
                  </Button>
                ) : (
                  <Badge size="sm" variant="success">
                    {t('Registered')}
                  </Badge>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
