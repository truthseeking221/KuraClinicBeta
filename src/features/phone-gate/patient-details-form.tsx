'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  CheckIcon,
  Input,
  LockKeyIcon,
  SegmentedToggle,
} from '../../components/ui';

import { PHONE_GATE_COPY } from './logic';
import type { DraftPatient, DraftPatientSex } from './logic';
import styles from './phone-gate.module.css';

export type PatientDetailsFormProps = {
  mode: 'noMatch' | 'differentPatient';
  phoneDisplay: string;
  draft: DraftPatient;
  error: string | null;
  onChange: (draft: DraftPatient) => void;
  onUnlockPhone: () => void;
};

/**
 * Temporary-patient details (spec §8/§9): a banner explains the branch, the
 * OTP-verified phone stays locked (unlocking returns to phone entry and
 * invalidates the code), and the minimum fields are name + DOB-or-age + sex.
 */
export function PatientDetailsForm({
  draft,
  error,
  mode,
  onChange,
  onUnlockPhone,
  phoneDisplay,
}: PatientDetailsFormProps) {
  return (
    <div className={styles.detailsForm}>
      {mode === 'differentPatient' ? (
        <Alert tone="warning">
          <AlertTitle>{PHONE_GATE_COPY.differentTitle}</AlertTitle>
          <AlertDescription>{PHONE_GATE_COPY.differentBody}</AlertDescription>
        </Alert>
      ) : (
        <Alert tone="info">
          <AlertTitle>{PHONE_GATE_COPY.noMatchTitle}</AlertTitle>
          <AlertDescription>{PHONE_GATE_COPY.noMatchBody}</AlertDescription>
        </Alert>
      )}

      <div className={styles.verifiedField}>
        <span className={styles.verifiedLabel}>Verified phone</span>
        <div className={styles.verifiedRow}>
          <span className={styles.verifiedValue}>
            <CheckIcon aria-hidden="true" className={styles.verifiedCheck} />
            <span className={styles.verifiedPhone}>{phoneDisplay}</span>
            <LockKeyIcon aria-hidden="true" className={styles.verifiedLock} />
          </span>
          <Button onClick={onUnlockPhone} size="sm" variant="ghost">
            {PHONE_GATE_COPY.unlockPhone}
          </Button>
        </div>
        <p className={styles.verifiedHint}>
          Unlocking returns to phone entry — changing the number invalidates the code.
        </p>
      </div>

      <div className={styles.fieldGrid}>
        <Input
          autoFocus
          label="Full name"
          onChange={(event) => onChange({ ...draft, name: event.target.value })}
          placeholder="Patient name"
          required
          value={draft.name}
        />
        <Input
          label="DOB or age"
          onChange={(event) => onChange({ ...draft, dobOrAge: event.target.value })}
          placeholder="12-09-1994 or 32"
          required
          value={draft.dobOrAge}
        />
      </div>

      <SegmentedToggle
        label="Sex"
        labelVisible
        onValueChange={(value) => onChange({ ...draft, sex: value as DraftPatientSex })}
        options={[
          { value: 'Female', label: 'Female' },
          { value: 'Male', label: 'Male' },
          { value: 'Other', label: 'Other' },
        ]}
        value={draft.sex ?? ''}
      />

      {error ? (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
