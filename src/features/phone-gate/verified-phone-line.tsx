'use client';

import { useT } from '../../components/foundations/i18n';
import { Button, CheckIcon } from '../../components/ui';

import { PHONE_GATE_COPY } from './logic';
import styles from './phone-gate.module.css';

export type VerifiedPhoneLineProps = {
  /** What this number is at this step: sent-to, or verified and bound. */
  label: string;
  /** Masked while unverified, full once the code is accepted. */
  value: string;
  verified?: boolean;
  /** Keep send destination as supporting context within the code-entry task. */
  inline?: boolean;
  /**
   * The identity axis, stated in words on the same tray. Without it a green
   * check next to a verified number reads as a verified patient.
   */
  note?: string;
  onChange: () => void;
};

/**
 * The number the gate is about, shown wherever it is being bound to a person.
 * One control changes it, on the same row as the value it changes — the gate
 * previously offered a back link, an unlock button, and a hint sentence for
 * this single action.
 */
export function VerifiedPhoneLine({
  label,
  note,
  onChange,
  value,
  inline = false,
  verified = false,
}: VerifiedPhoneLineProps) {
  const t = useT();

  return (
    <div className={styles.phoneLine} data-inline={inline || undefined}>
      {!inline ? <span className={styles.phoneLineLabel}>{label}</span> : null}
      <span className={styles.phoneLineValue}>
        {verified ? (
          <CheckIcon aria-hidden="true" className={styles.phoneLineCheck} />
        ) : null}
        {inline ? <span className={styles.phoneLineInlineLabel}>{label}</span> : null}
        <span className={styles.phoneLineNumber}>{value}</span>
      </span>
      {note ? <span className={styles.phoneLineNote}>{note}</span> : null}
      <Button
        aria-label={t(PHONE_GATE_COPY.changePhoneLabel)}
        onClick={onChange}
        size="sm"
        variant="link"
      >
        {t(PHONE_GATE_COPY.changePhone)}
      </Button>
    </div>
  );
}
