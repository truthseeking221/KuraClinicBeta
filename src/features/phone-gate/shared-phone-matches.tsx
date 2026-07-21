'use client';

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
};

/**
 * Phone possession does not establish which person is being tested, so the
 * candidates are a single-choice radio set: one deliberate selection and one
 * primary action, instead of one competing primary button per row.
 */
export function SharedPhoneMatches({
  candidates,
  error,
  onSelect,
  selectedId,
}: SharedPhoneMatchesProps) {
  return (
    <div className={styles.stack}>
      <Alert tone="warning">
        <AlertTitle>This number is linked to {candidates.length} patients</AlertTitle>
        <AlertDescription>{PHONE_GATE_COPY.identityCaveat}</AlertDescription>
      </Alert>
      <RadioGroup
        className={styles.candidates}
        error={error ?? undefined}
        legend="Matching patients"
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
