'use client';

import { useState } from 'react';

import { useT } from '../../components/foundations/i18n';
import { Alert, AlertDescription, Badge, Button, Checkbox, Input, SegmentedToggle } from '../../components/ui';

import { FASTING_OPTIONS, PAIN_FACES, VITAL_RANGES } from './catalog';
import {
  bmiCategory,
  calcBmi,
  EMPTY_VITALS,
  fieldOutOfRange,
  vitalsGate,
} from './logic';
import type { VitalsValues } from './types';
import styles from './vitals-form.module.css';

export type VitalsFormProps = {
  /**
   * Identity of the person these readings belong to. Only the id is needed —
   * a change resets the form — so the same measurement surface serves the
   * nurse at the draw station and the doctor during the exam.
   */
  patientId: string;
  initial?: VitalsValues;
  onSubmit: (values: VitalsValues) => void;
  onClear?: () => void;
};

function rangeHint(field: keyof typeof VITAL_RANGES, unit: string, tempUnit: 'C' | 'F'): string {
  const [low, high] = VITAL_RANGES[field];
  if (field === 'tempC' && tempUnit === 'F') {
    const f = (celsius: number) => Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
    return `${f(low)}–${f(high)} °F`;
  }
  return `${low}–${high} ${unit}`;
}

/**
 * Vitals capture. Required: height, weight, HR, BP. Out-of-range values warn
 * and require an explicit abnormal confirmation — they never block silently.
 */
export function VitalsForm({ initial, onClear, onSubmit, patientId }: VitalsFormProps) {
  const t = useT();
  const [values, setValues] = useState<VitalsValues>({ ...EMPTY_VITALS, ...initial });
  const [confirmAbnormal, setConfirmAbnormal] = useState(false);
  const [formPatientId, setFormPatientId] = useState(patientId);

  // Adjust-during-render reset: a new patient starts a fresh form.
  if (formPatientId !== patientId) {
    setFormPatientId(patientId);
    setValues({ ...EMPTY_VITALS, ...initial });
    setConfirmAbnormal(false);
  }

  const gate = vitalsGate(values, confirmAbnormal);
  const bmi = calcBmi(values.heightCm, values.weightKg);
  const bmiInfo = bmi != null ? bmiCategory(bmi) : null;

  function set<K extends keyof VitalsValues>(key: K, value: VitalsValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function numberField(
    key: keyof VitalsValues & keyof typeof VITAL_RANGES,
    label: string,
    unit: string,
    required: boolean,
  ) {
    const raw = String(values[key] ?? '');
    const oor = fieldOutOfRange(key, raw, values.tempUnit);
    return (
      <Input
        error={
          oor
            ? `${t('Outside typical range')} (${rangeHint(key, unit, values.tempUnit)}).`
            : undefined
        }
        helpText={oor ? undefined : rangeHint(key, unit, values.tempUnit)}
        inputMode="decimal"
        label={t(label)}
        onChange={(event) => set(key, event.target.value)}
        required={required}
        suffix={key === 'tempC' ? undefined : unit}
        value={raw}
      />
    );
  }

  const pain = PAIN_FACES.reduce((closest, face) =>
    Math.abs(face.at - values.painVas) < Math.abs(closest.at - values.painVas) ? face : closest,
  );

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (gate.canSubmit) onSubmit(values);
      }}
    >
      <section aria-label={t('Biometrics')} className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('Biometrics')}</h3>
        <div className={styles.grid3}>
          {numberField('heightCm', 'Height', 'cm', true)}
          {numberField('weightKg', 'Weight', 'kg', true)}
          <div className={styles.bmi}>
            <span className={styles.bmiLabel}>BMI</span>
            {bmi != null && bmiInfo ? (
              <span className={styles.bmiValue}>
                {bmi}
                <Badge variant={bmiInfo.tone}>{t(bmiInfo.label)}</Badge>
              </span>
            ) : (
              <span className={styles.bmiEmpty}>—</span>
            )}
          </div>
        </div>
      </section>

      <section aria-label={t('Vitals')} className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('Vitals')}</h3>
        <div className={styles.grid3}>
          {numberField('hr', 'Heart rate', 'bpm', true)}
          <div className={styles.bp}>
            {numberField('bpSys', 'BP systolic', 'mmHg', true)}
            {numberField('bpDia', 'BP diastolic', 'mmHg', true)}
          </div>
          <div className={styles.temp}>
            {numberField('tempC', 'Temperature', values.tempUnit === 'C' ? '°C' : '°F', false)}
            <SegmentedToggle
              label={t('Temperature unit')}
              onValueChange={(value) => set('tempUnit', value as 'C' | 'F')}
              options={[
                { value: 'C', label: '°C' },
                { value: 'F', label: '°F' },
              ]}
              value={values.tempUnit}
            />
          </div>
          {numberField('spo2', 'SpO₂', '%', false)}
          {numberField('breathing', 'Breathing rate', '/min', false)}
        </div>
      </section>

      <section aria-label={t('Pain')} className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('Pain (VAS 0–10)')}</h3>
        <div className={styles.pain}>
          <SegmentedToggle
            label={t('Pain score')}
            onValueChange={(value) => set('painVas', Number(value))}
            options={Array.from({ length: 11 }, (_, index) => ({
              value: String(index),
              label: String(index),
            }))}
            value={String(values.painVas)}
          />
          <span aria-live="polite" className={styles.painFace}>
            <span aria-hidden="true">{pain.face}</span> {t(pain.label)}
          </span>
        </div>
      </section>

      <section aria-label={t('Fasting status')} className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('Fasting status')}</h3>
        <SegmentedToggle
          label={t('Fasting status')}
          onValueChange={(value) => set('fasting', value)}
          options={FASTING_OPTIONS.map((option) => ({ value: option.id, label: t(option.label) }))}
          value={values.fasting ?? undefined}
        />
      </section>

      {gate.oorFields.length > 0 ? (
        <Alert tone="warning">
          <AlertDescription>
            <Checkbox checked={confirmAbnormal} onCheckedChange={setConfirmAbnormal}>
              {t('Confirm abnormal values')} — {gate.oorFields.length}{' '}
              {t(gate.oorFields.length > 1 ? 'fields' : 'field')}{' '}
              {t('outside typical range')}.
            </Checkbox>
          </AlertDescription>
        </Alert>
      ) : null}

      <footer className={styles.footer}>
        {onClear ? (
          <Button onClick={onClear} type="button" variant="ghost">
            {t('Clear form')}
          </Button>
        ) : null}
        <Button disabled={!gate.canSubmit} type="submit" variant="primary">
          {t('Submit & next patient')}
        </Button>
      </footer>
    </form>
  );
}
