'use client';

import type { ReactNode } from 'react';

import { useT } from '../../components/foundations/i18n';
import { Alert, AlertDescription, AlertTitle, Radio, RadioGroup } from '../../components/ui';

import { PHONE_GATE_COPY } from './logic';
import type { MatchedPatient } from './logic';
import { patientMeta } from './patient-identity';
import styles from './phone-gate.module.css';

export type SharedPhoneMatchesProps = {
  candidates: MatchedPatient[];
  selectedId: string | null;
  error: string | null;
  onSelect: (patientId: string) => void;
  /**
   * Why these candidates are on screen. Defaults to the shared-phone banner;
   * `null` drops it for branches whose dialog title already says it.
   */
  banner?: { title: ReactNode; description: ReactNode } | null;
  legend?: string;
};

/**
 * One deliberate choice among candidate patients, used by both branches that
 * surface candidates: a phone linked to several records, and details that may
 * match an existing record. Neither branch may offer one primary button per
 * row — that turns picking the wrong person into a single stray click.
 */
export function SharedPhoneMatches({
  banner,
  candidates,
  error,
  legend,
  onSelect,
  selectedId,
}: SharedPhoneMatchesProps) {
  const t = useT();
  const resolvedBanner =
    banner === undefined
      ? {
          title: (
            <>
              {t('This number is linked to')} {candidates.length} {t('patients')}
            </>
          ),
          description: t(PHONE_GATE_COPY.identityCaveat),
        }
      : banner;

  return (
    <div className={styles.stack}>
      {resolvedBanner ? (
        <Alert tone="warning">
          <AlertTitle>{resolvedBanner.title}</AlertTitle>
          <AlertDescription>{resolvedBanner.description}</AlertDescription>
        </Alert>
      ) : null}
      <RadioGroup
        className={styles.candidates}
        error={error ?? undefined}
        legend={legend ?? t('Matching patients')}
        onValueChange={onSelect}
        required
        value={selectedId ?? undefined}
      >
        {candidates.map((candidate) => (
          <Radio
            appearance="card"
            helpText={patientMeta(candidate)}
            key={candidate.patientId}
            value={candidate.patientId}
          >
            {candidate.name}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
