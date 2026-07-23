'use client';

import { useState } from 'react';
import type { RefObject } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Radio,
  RadioGroup,
  Textarea,
} from '../../components/ui';

import { ATTEMPT_OUTCOMES, OUTCOME_OWNER_LABEL, tubeByKey } from './catalog';
import type { AttemptOutcome, ExpectedSpecimenPlanItem } from './types';
import styles from './attempt-outcome-dialog.module.css';

export type AttemptOutcomeDialogProps = {
  /** The plan item that will not become a sample; null closes the dialog. */
  planItem: ExpectedSpecimenPlanItem | null;
  onConfirm: (outcome: AttemptOutcome, note: string) => void;
  onClose: () => void;
  restoreFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Closing a required specimen without a tube.
 *
 * This replaces "defer", which was a sample status for a sample that does not
 * exist. What actually happened is an attempt with an outcome — and an outcome
 * without an owner is not a closure: a tube nobody is responsible for is a
 * test that quietly never happens. Each reason therefore names who acts next
 * and what they do.
 */
export function AttemptOutcomeDialog({
  onClose,
  onConfirm,
  planItem,
  restoreFocusRef,
}: AttemptOutcomeDialogProps) {
  return (
    <AlertDialog onOpenChange={(open) => (!open ? onClose() : undefined)} open={planItem !== null}>
      {planItem ? (
        <AttemptOutcomeBody
          onClose={onClose}
          onConfirm={onConfirm}
          planItem={planItem}
          restoreFocusRef={restoreFocusRef}
        />
      ) : null}
    </AlertDialog>
  );
}

function AttemptOutcomeBody({
  onClose,
  onConfirm,
  planItem,
  restoreFocusRef,
}: AttemptOutcomeDialogProps & { planItem: ExpectedSpecimenPlanItem }) {
  const t = useT();
  const [outcome, setOutcome] = useState<AttemptOutcome | ''>('');
  const [note, setNote] = useState('');
  const tube = tubeByKey(planItem.tube);

  return (
    <AlertDialogContent returnFocusRef={restoreFocusRef}>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('Why was this tube not collected?')}</AlertDialogTitle>
        <AlertDialogDescription>
          <span className={styles.planLine}>
            <span aria-hidden="true" className={styles.tubeDot} data-tube={planItem.tube} />
            {tube?.stopperLabel} · {planItem.tests.join(', ')}
          </span>
          {t('The reason decides who picks this up, so the test is not lost.')}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className={styles.form}>
        <RadioGroup
          legend={t('Outcome')}
          onValueChange={(value) => setOutcome(value as AttemptOutcome)}
          required
          value={outcome || undefined}
        >
          {ATTEMPT_OUTCOMES.map((option) => (
            <Radio
              appearance="card"
              helpText={`${t(OUTCOME_OWNER_LABEL[option.owner])} · ${t(option.nextAction)}`}
              key={option.id}
              value={option.id}
            >
              {t(option.label)}
            </Radio>
          ))}
        </RadioGroup>
        <Textarea
          label={t('Note for whoever picks this up (optional)')}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t('What the next attempt should know…')}
          value={note}
        />
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>{t('Cancel')}</AlertDialogCancel>
        <AlertDialogAction
          disabled={!outcome}
          onClick={() => outcome && onConfirm(outcome, note)}
          variant="primary"
        >
          {t('Record outcome')}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
