'use client';

import { useT } from '../../components/foundations/i18n';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Checkbox,
  DateInput,
  Input,
  Radio,
  RadioGroup,
} from '../../components/ui';

import { PHONE_GATE_COPY } from './logic';
import type { DraftPatient, DraftPatientErrors, DraftPatientSex } from './logic';
import styles from './phone-gate.module.css';

const SEX_OPTIONS: DraftPatientSex[] = ['Female', 'Male', 'Other'];

export type PatientDetailsFormProps = {
  mode: 'noMatch' | 'differentPatient';
  draft: DraftPatient;
  errors: DraftPatientErrors;
  onChange: (draft: DraftPatient) => void;
  /** Duplicate-risk branch only: the doctor declared a different person. */
  differentPersonConfirmed?: boolean;
  onDifferentPersonConfirmedChange?: (confirmed: boolean) => void;
  differentPersonError?: string | null;
  disabled?: boolean;
};

/**
 * Minimum identity for a new record (spec §8/§9): full name, date of birth or
 * an explicitly estimated age, and sex.
 *
 * Date of birth and age are two fields, not one. A combined field cannot say
 * whether "32" is an age, a year, or a half-typed date, and a record must never
 * store a fabricated date of birth — so the age field appears only once the
 * exact date is declared unknown, and says out loud that it is an estimate.
 *
 * The duplicate-risk branch keeps its warning and adds an explicit declaration:
 * rejecting a matched patient is a decision, not a side effect of scrolling
 * past it.
 */
export function PatientDetailsForm({
  differentPersonConfirmed = false,
  differentPersonError,
  disabled = false,
  draft,
  errors,
  mode,
  onChange,
  onDifferentPersonConfirmedChange,
}: PatientDetailsFormProps) {
  const t = useT();

  return (
    <div className={styles.stack}>
      {mode === 'differentPatient' ? (
        <Alert tone="warning">
          <AlertTitle>{t(PHONE_GATE_COPY.differentTitle)}</AlertTitle>
          <AlertDescription>{t(PHONE_GATE_COPY.differentBody)}</AlertDescription>
        </Alert>
      ) : null}

      <Input
        autoFocus
        disabled={disabled}
        error={errors.name ? t(errors.name) : undefined}
        label={t('Full name')}
        onChange={(event) => onChange({ ...draft, name: event.target.value })}
        required
        value={draft.name}
      />

      <div className={styles.dateOfBirth}>
        {draft.dobUnknown ? (
          <Input
            disabled={disabled}
            error={errors.ageYears ? t(errors.ageYears) : undefined}
            helpText={t(PHONE_GATE_COPY.ageEstimated)}
            inputMode="numeric"
            label={t('Age in years')}
            onChange={(event) =>
              onChange({ ...draft, ageYears: event.target.value })
            }
            required
            value={draft.ageYears}
          />
        ) : (
          <DateInput
            disabled={disabled}
            error={errors.dob ? t(errors.dob) : undefined}
            label={t('Date of birth')}
            onValueChange={(value) => onChange({ ...draft, dob: value })}
            required
            value={draft.dob}
          />
        )}
        <Checkbox
          checked={draft.dobUnknown}
          disabled={disabled}
          onCheckedChange={(checked) =>
            onChange({
              ...draft,
              dobUnknown: checked,
              // The abandoned branch is cleared, so a stale value can never be
              // read back as the answer the doctor did not give.
              dob: checked ? '' : draft.dob,
              ageYears: checked ? draft.ageYears : '',
            })
          }
        >
          {t(PHONE_GATE_COPY.dobUnknownLabel)}
        </Checkbox>
      </div>

      <RadioGroup
        error={errors.sex ? t(errors.sex) : undefined}
        legend={t('Sex')}
        onValueChange={(value) => onChange({ ...draft, sex: value as DraftPatientSex })}
        orientation="horizontal"
        required
        value={draft.sex ?? undefined}
      >
        {SEX_OPTIONS.map((option) => (
          <Radio disabled={disabled} key={option} value={option}>
            {t(option)}
          </Radio>
        ))}
      </RadioGroup>

      {mode === 'differentPatient' && onDifferentPersonConfirmedChange ? (
        <Checkbox
          checked={differentPersonConfirmed}
          disabled={disabled}
          error={differentPersonError ? t(differentPersonError) : undefined}
          onCheckedChange={onDifferentPersonConfirmedChange}
          required
        >
          {t(PHONE_GATE_COPY.differentConfirm)}
        </Checkbox>
      ) : null}
    </div>
  );
}
