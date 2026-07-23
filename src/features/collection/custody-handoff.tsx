'use client';

import { useState } from 'react';

import { useT } from '../../components/foundations/i18n';
import { Alert, AlertDescription, AlertTitle, Badge, Button, Input, Select } from '../../components/ui';

import { earliestProcessBy, formatClock } from './logic';
import type { ActualSample, CustodyEvent } from './types';
import styles from './custody-handoff.module.css';

export const HANDOFF_LOCATIONS = [
  'PSC bench — Mekong Clinic',
  'Courier pickup point',
  'Clinic lab window',
] as const;

export type CustodyHandoffProps = {
  samples: readonly ActualSample[];
  fromActor: string;
  custody?: CustodyEvent;
  now: number;
  onHandoff: (input: { toActor: string; location: string }) => void;
  readOnly?: boolean;
};

/**
 * Handing the tubes to a named receiver.
 *
 * "Collection complete" is not "received at the lab". Until someone else has
 * the tubes, this station still holds them, so the step records who took them,
 * where, and when — the missing link that made a lost sample untraceable.
 *
 * The batch is exactly the samples on screen; a count alone would let a
 * missing tube pass as a miscount.
 */
export function CustodyHandoff({
  custody,
  fromActor,
  now,
  onHandoff,
  readOnly = false,
  samples,
}: CustodyHandoffProps) {
  const t = useT();
  const [toActor, setToActor] = useState('');
  const [location, setLocation] = useState<string>(HANDOFF_LOCATIONS[0]);
  const usable = samples.filter((sample) => !sample.issue);
  const deadline = earliestProcessBy(usable);

  if (custody) {
    return (
      <section aria-label={t('Custody handoff')} className={styles.handoff}>
        <Alert tone="success">
          <AlertTitle>
            {t('Handed to')} {custody.toActor}
          </AlertTitle>
          <AlertDescription>
            {custody.sampleIds.length} {t(custody.sampleIds.length === 1 ? 'sample' : 'samples')} ·{' '}
            {custody.location} · {formatClock(custody.atMs)}
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section aria-label={t('Custody handoff')} className={styles.handoff}>
      <header className={styles.header}>
        <h3 className={styles.title}>{t('Hand over the samples')}</h3>
        {deadline ? (
          <Badge variant={deadline - now < 30 * 60 * 1000 ? 'danger' : 'neutral'}>
            {t('Earliest deadline')} {formatClock(deadline)}
          </Badge>
        ) : null}
      </header>

      {/* The exact set changing hands, listed rather than counted. */}
      <ul className={styles.manifest}>
        {usable.map((sample) => (
          <li key={sample.sampleId}>
            <span className={styles.mono}>{sample.sampleId}</span>
            {sample.label.state === 'manual_fallback' ? (
              <Badge size="sm" variant="warning">
                {t('Relabel at accession')}
              </Badge>
            ) : null}
          </li>
        ))}
      </ul>

      <div className={styles.form}>
        <Input
          disabled={readOnly}
          label={t('Received by')}
          onChange={(event) => setToActor(event.target.value)}
          placeholder={t('Name of the person taking the samples')}
          required
          value={toActor}
        />
        <Select
          disabled={readOnly}
          label={t('Location')}
          onChange={(event) => setLocation(event.target.value)}
          options={HANDOFF_LOCATIONS.map((option) => ({ value: option, label: t(option) }))}
          value={location}
        />
      </div>

      <footer className={styles.footer}>
        <p className={styles.consequence}>
          {t('Recorded as')} {fromActor} → {toActor || t('receiver')} {t('at')} {formatClock(now)}.
        </p>
        <Button
          disabled={readOnly || !toActor.trim() || usable.length === 0}
          onClick={() => onHandoff({ toActor: toActor.trim(), location })}
          variant="primary"
        >
          {t('Record handoff')}
        </Button>
      </footer>
    </section>
  );
}
