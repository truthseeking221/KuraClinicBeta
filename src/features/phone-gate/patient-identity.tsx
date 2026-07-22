import type { MatchedPatient } from './logic';
import styles from './phone-gate.module.css';

/** Minimum PHI the gate may show: sex, age, masked MRN. */
export function patientMeta(patient: MatchedPatient): string {
  return `${patient.sex} · ${patient.age}y · ${patient.mrnMasked}`;
}

export type PatientIdentityProps = {
  patient: MatchedPatient;
};

/**
 * The single matched record. No box and no avatar: it is the only object on
 * the surface, and initials beside the name they are taken from carry nothing.
 */
export function PatientIdentity({ patient }: PatientIdentityProps) {
  return (
    <div className={styles.identity} data-slot="phone-gate-identity">
      <span className={styles.identityName}>{patient.name}</span>
      <span className={styles.identityMeta}>{patientMeta(patient)}</span>
    </div>
  );
}
