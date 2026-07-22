'use client';

import { useT } from '../../components/foundations/i18n';
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
 * description instead of a tinted banner. Minimum fields stay name + date of
 * birth or estimated age + sex, each carrying its own validation message. An
 * estimated age is
 * collected only when the date of birth is unavailable.
 */
export function PatientDetailsForm({
  draft,
  errors,
  mode,
  onChange,
}: PatientDetailsFormProps) {
  const t = useT();

  return (
    <div className={styles.stack}>
      {mode === 'differentPatient' ? (
        <Alert tone="warning">
          <AlertTitle>{t(PHONE_GATE_COPY.differentTitle)}</AlertTitle>
          <AlertDescription>
            {t(PHONE_GATE_COPY.differentBody)}
          </AlertDescription>
        </Alert>
      ) : null}

      <Input
        autoFocus
        error={errors.name ? t(errors.name) : undefined}
        label={t('Full name')}
        onChange={(event) => onChange({ ...draft, name: event.target.value })}
        required
        value={draft.name}
      />
      <Input
        error={errors.dobOrAge ? t(errors.dobOrAge) : undefined}
        helpText={t('Use age only if date of birth is unknown.')}
        label={t('Date of birth or age')}
        onChange={(event) => onChange({ ...draft, dobOrAge: event.target.value })}
        placeholder={t('12-09-1994 or 32 (estimated)')}
        required
        value={draft.dobOrAge}
      />
      <RadioGroup
        error={errors.sex ? t(errors.sex) : undefined}
        legend={t('Sex')}
        onValueChange={(value) => onChange({ ...draft, sex: value as DraftPatientSex })}
        orientation="horizontal"
        required
        value={draft.sex ?? undefined}
      >
        {SEX_OPTIONS.map((option) => (
          <Radio key={option} value={option}>
            {t(option)}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
