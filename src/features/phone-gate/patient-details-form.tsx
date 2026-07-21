'use client';

import { Alert, AlertDescription, AlertTitle, Input, Radio, RadioGroup } from '../../components/ui';

import { PHONE_GATE_COPY } from './logic';
import type { DraftPatient, DraftPatientErrors, DraftPatientSex } from './logic';
import styles from './phone-gate.module.css';

const SEX_OPTIONS: DraftPatientSex[] = ['Female', 'Male', 'Other'];

export type PatientDetailsFormProps = {
  mode: 'noMatch' | 'differentPatient';
  draft: DraftPatient;
  errors: DraftPatientErrors;
  onChange: (draft: DraftPatient) => void;
};

/**
 * Temporary-patient details (spec §8/§9). The duplicate-risk branch keeps its
 * warning; the ordinary no-match branch states the fact in the dialog
 * description instead of a tinted banner. Minimum fields stay name + DOB-or-age
 * + sex, each carrying its own validation message.
 */
export function PatientDetailsForm({
  draft,
  errors,
  mode,
  onChange,
}: PatientDetailsFormProps) {
  return (
    <div className={styles.stack}>
      {mode === 'differentPatient' ? (
        <Alert tone="warning">
          <AlertTitle>{PHONE_GATE_COPY.differentTitle}</AlertTitle>
          <AlertDescription>{PHONE_GATE_COPY.differentBody}</AlertDescription>
        </Alert>
      ) : null}

      <Input
        autoFocus
        error={errors.name}
        label="Full name"
        onChange={(event) => onChange({ ...draft, name: event.target.value })}
        placeholder="Patient name"
        required
        value={draft.name}
      />
      <Input
        error={errors.dobOrAge}
        label="DOB or age"
        onChange={(event) => onChange({ ...draft, dobOrAge: event.target.value })}
        placeholder="12-09-1994 or 32"
        required
        value={draft.dobOrAge}
      />
      <RadioGroup
        error={errors.sex}
        legend="Sex"
        onValueChange={(value) => onChange({ ...draft, sex: value as DraftPatientSex })}
        orientation="horizontal"
        required
        value={draft.sex ?? undefined}
      >
        {SEX_OPTIONS.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
