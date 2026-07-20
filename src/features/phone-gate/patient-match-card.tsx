import { Avatar, AvatarFallback, Button } from '../../components/ui';

import type { MatchedPatient } from './logic';
import styles from './phone-gate.module.css';

export type PatientMatchCardProps = {
  patient: MatchedPatient;
  onChoose: () => void;
  autoFocusChoose?: boolean;
};

/**
 * Known-phone match row (spec §7). PHI stays minimal: name, sex, age, masked
 * MRN. One primary action; the "someone else" escape lives at modal level so
 * a doctor can always avoid attaching the wrong record.
 */
export function PatientMatchCard({
  autoFocusChoose = false,
  onChoose,
  patient,
}: PatientMatchCardProps) {
  return (
    <div className={styles.matchCard} data-slot="phone-gate-match-card">
      <Avatar aria-label={patient.name} shape="rounded" size="sm">
        <AvatarFallback>{patient.initials}</AvatarFallback>
      </Avatar>
      <div className={styles.matchText}>
        <span className={styles.matchName}>{patient.name}</span>
        <span className={styles.matchMeta}>
          {patient.sex} · {patient.age}y · {patient.mrnMasked}
        </span>
      </div>
      <Button autoFocus={autoFocusChoose} onClick={onChoose} size="sm" variant="primary">
        Choose
      </Button>
    </div>
  );
}
