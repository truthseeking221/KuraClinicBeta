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
  Select,
  Textarea,
} from '../../components/ui';

import { DEFER_REASONS, tubeByKey } from './catalog';
import type { Sample } from './types';
import styles from './defer-dialog.module.css';

export type DeferDialogProps = {
  /** Sample being deferred; null closes the dialog. */
  sample: Sample | null;
  onConfirm: (reason: string, note: string) => void;
  onClose: () => void;
  restoreFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Defer keeps the visit honest: the tube stays on the worklist with a reason
 * the next attempt can act on. Reasons are specific — never "noncompliant".
 */
export function DeferDialog({ onClose, onConfirm, restoreFocusRef, sample }: DeferDialogProps) {
  return (
    <AlertDialog onOpenChange={(open) => (!open ? onClose() : undefined)} open={sample !== null}>
      <DeferDialogBody
        onClose={onClose}
        onConfirm={onConfirm}
        restoreFocusRef={restoreFocusRef}
        sample={sample}
      />
    </AlertDialog>
  );
}

function DeferDialogBody({ onClose, onConfirm, restoreFocusRef, sample }: DeferDialogProps) {
  const t = useT();
  const [draft, setDraft] = useState<{
    note: string;
    reason: string;
    sampleId: string | null;
  }>({ note: '', reason: '', sampleId: null });
  const tube = sample ? tubeByKey(sample.tube) : undefined;
  const sampleId = sample?.id ?? null;
  const draftForSample =
    draft.sampleId === sampleId ? draft : { note: '', reason: '', sampleId };

  return (
    <AlertDialogContent returnFocusRef={restoreFocusRef}>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('Defer this draw?')}</AlertDialogTitle>
        <AlertDialogDescription>
          {sample ? (
            <>
              <span className={styles.sampleLine}>
                <span aria-hidden="true" className={styles.tubeDot} data-tube={sample.tube} />
                <span className={styles.mono}>{sample.id}</span> · {tube?.stopperLabel} ·{' '}
                <span className={styles.tests}>{sample.tests.join(', ')}</span>
              </span>
              {t('The tube stays on the worklist for the next attempt.')}
            </>
          ) : null}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className={styles.form}>
        <Select
          helpText={t('Choose a reason before saving the deferral.')}
          label={t('Reason')}
          onChange={(event) =>
            setDraft({ note: draftForSample.note, reason: event.target.value, sampleId })
          }
          options={DEFER_REASONS.map((option) => ({ value: option, label: t(option) }))}
          placeholder={t('Select a reason')}
          required
          value={draftForSample.reason}
        />
        <Textarea
          label={t('Note for the next attempt (optional)')}
          onChange={(event) =>
            setDraft({ note: event.target.value, reason: draftForSample.reason, sampleId })
          }
          placeholder={t('Add context for the next attempt…')}
          value={draftForSample.note}
        />
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>{t('Cancel')}</AlertDialogCancel>
        <AlertDialogAction
          disabled={!draftForSample.reason}
          onClick={() => onConfirm(draftForSample.reason, draftForSample.note)}
          variant="primary"
        >
          {t('Defer draw')}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
