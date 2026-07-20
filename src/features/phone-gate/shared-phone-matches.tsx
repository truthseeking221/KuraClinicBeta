import { Alert, AlertDescription, AlertTitle, Button } from '../../components/ui';

import type { MatchedPatient } from './logic';
import { PatientMatchCard } from './patient-match-card';
import styles from './phone-gate.module.css';

export type SharedPhoneMatchesProps = {
  candidates: MatchedPatient[];
  onChoose: (patient: MatchedPatient) => void;
  onCreateProvisional: () => void;
};

/**
 * Phone possession does not establish which person is being tested. This
 * feature-owned section requires an explicit selection for every shared-phone
 * candidate and preserves a safe provisional-patient path.
 */
export function SharedPhoneMatches({
  candidates,
  onChoose,
  onCreateProvisional,
}: SharedPhoneMatchesProps) {
  return (
    <div className={styles.sharedMatches}>
      <Alert tone="warning">
        <AlertTitle>This number is linked to {candidates.length} patients</AlertTitle>
        <AlertDescription>
          SMS confirms the phone, not the person being tested. Choose the correct patient.
        </AlertDescription>
      </Alert>
      <div className={styles.candidateList} aria-label="Matching patients">
        {candidates.map((candidate, index) => (
          <PatientMatchCard
            autoFocusChoose={index === 0}
            key={candidate.patientId}
            onChoose={() => onChoose(candidate)}
            patient={candidate}
          />
        ))}
      </div>
      <Button fullWidth onClick={onCreateProvisional} variant="outline">
        None of these, add provisional patient
      </Button>
    </div>
  );
}
