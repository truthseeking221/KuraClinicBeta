'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Textarea,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared/empty-state';
import { PhoneGateModal } from '../phone-gate/phone-gate-modal';
import type { PhoneGateOutcome } from '../phone-gate/logic';

import { CareLoopFrame } from './care-loop-frame';
import { CARE_LOOP_PATIENT } from './demo-data';
import styles from './care-loop.module.css';

export type PatientAcquisitionStage =
  | 'patients-empty'
  | 'phone-gate'
  | 'intake-unknown'
  | 'intake-sending'
  | 'intake-error'
  | 'intake-requested'
  | 'intake-form'
  | 'intake-complete'
  | 'ready-to-order';

type FlowPatient = {
  name: string;
  pid: string;
  sexLabel: string;
  dobOrAge: string;
  phone: string;
};

const INITIAL_PATIENT: FlowPatient = {
  name: CARE_LOOP_PATIENT.name,
  pid: CARE_LOOP_PATIENT.pid,
  sexLabel: CARE_LOOP_PATIENT.sexLabel,
  dobOrAge: `${CARE_LOOP_PATIENT.age} years`,
  phone: CARE_LOOP_PATIENT.phone,
};

const STAGES = [
  { label: 'Find patient', actor: 'Doctor or nurse' },
  { label: 'Confirm phone', actor: 'Patient' },
  { label: 'Complete intake', actor: 'Patient' },
];

const REQUIRED_ITEMS = [
  'Profile confirmation',
  'Allergies and medicines',
  'Current symptoms',
  'Family history',
];

function stepFor(stage: PatientAcquisitionStage) {
  if (stage === 'patients-empty') return 1;
  if (stage === 'phone-gate') return 2;
  return 3;
}

function actorFor(stage: PatientAcquisitionStage) {
  if (stage === 'intake-form') return 'Patient';
  if (stage === 'patients-empty' || stage === 'phone-gate') return 'Doctor or nurse';
  return 'Doctor';
}

export function PatientAcquisitionFlow({
  initialStage = 'patients-empty',
  intakeSendDelayMs = 300,
  intakeSendResult = 'success',
  phoneGateDelayMs = 250,
}: {
  initialStage?: PatientAcquisitionStage;
  intakeSendDelayMs?: number;
  intakeSendResult?: 'success' | 'error';
  phoneGateDelayMs?: number;
}) {
  const [stage, setStage] = useState(initialStage);
  const [patient, setPatient] = useState<FlowPatient | null>(
    initialStage === 'patients-empty' || initialStage === 'phone-gate' ? null : INITIAL_PATIENT,
  );
  const [profileConfirmed, setProfileConfirmed] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [medicines, setMedicines] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const sendTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(sendTimer.current), []);

  function restart() {
    window.clearTimeout(sendTimer.current);
    setStage('patients-empty');
    setPatient(null);
    setProfileConfirmed(false);
    setAllergies('');
    setMedicines('');
    setSymptoms('');
    setFamilyHistory('');
  }

  function acceptPatient(outcome: PhoneGateOutcome) {
    if (outcome.kind === 'temporary') {
      setPatient({
        name: outcome.draft.name.trim(),
        pid: CARE_LOOP_PATIENT.pid,
        sexLabel: outcome.draft.sex ?? CARE_LOOP_PATIENT.sexLabel,
        dobOrAge: outcome.draft.dobOrAge.trim(),
        phone: outcome.phone,
      });
    } else {
      setPatient({
        name: outcome.patient.name,
        pid: CARE_LOOP_PATIENT.pid,
        sexLabel: outcome.patient.sex,
        dobOrAge: `${outcome.patient.age} years`,
        phone: CARE_LOOP_PATIENT.phone,
      });
    }
    setStage('intake-unknown');
  }

  function sendIntake() {
    setStage('intake-sending');
    sendTimer.current = window.setTimeout(
      () => setStage(intakeSendResult === 'success' ? 'intake-requested' : 'intake-error'),
      intakeSendDelayMs,
    );
  }

  const intakeComplete =
    profileConfirmed &&
    allergies.trim().length > 0 &&
    medicines.trim().length > 0 &&
    symptoms.trim().length > 0 &&
    familyHistory.trim().length > 0;

  if (stage === 'intake-form' && patient) {
    return (
      <main className={styles.patientIntakePage}>
        <section
          aria-labelledby="patient-intake-title"
          className={styles.patientIntakeSurface}
        >
          <header className={styles.patientIntakeHeader}>
            <strong>Mekong Clinic</strong>
            <span>Health intake</span>
          </header>

          <div className={styles.patientIntakeBody}>
            <div className={styles.patientIntakeIntro}>
              <p className={styles.eyebrow}>Before your care continues</p>
              <h1 id="patient-intake-title">Tell us about your health</h1>
              <p>Your care team will review your answers before continuing your care.</p>
            </div>

            <dl aria-label="Your details" className={styles.patientIdentity}>
              <div>
                <dt>Name</dt>
                <dd>{patient.name}</dd>
              </div>
              <div>
                <dt>Date of birth or age</dt>
                <dd>{patient.dobOrAge}</dd>
              </div>
              <div>
                <dt>Sex</dt>
                <dd>{patient.sexLabel}</dd>
              </div>
            </dl>

            <form
              className={styles.patientIntakeForm}
              onSubmit={(event) => {
                event.preventDefault();
                if (intakeComplete) setStage('intake-complete');
              }}
            >
              <Checkbox
                checked={profileConfirmed}
                onCheckedChange={setProfileConfirmed}
                required
              >
                I confirm these personal details are correct.
              </Checkbox>

              <div className={styles.patientIntakeFields}>
                <Input
                  label="Allergies"
                  onChange={(event) => setAllergies(event.target.value)}
                  placeholder="Enter allergies or none known"
                  required
                  value={allergies}
                />
                <Input
                  label="Current medicines"
                  onChange={(event) => setMedicines(event.target.value)}
                  placeholder="Enter medicines or none"
                  required
                  value={medicines}
                />
                <Textarea
                  label="Current symptoms"
                  onChange={(event) => setSymptoms(event.target.value)}
                  placeholder="Describe the reason for seeking care"
                  required
                  value={symptoms}
                />
                <Textarea
                  label="Family history"
                  onChange={(event) => setFamilyHistory(event.target.value)}
                  placeholder="Enter relevant family history or none known"
                  required
                  value={familyHistory}
                />
              </div>

              <div className={styles.patientSubmitArea}>
                {!intakeComplete ? (
                  <p id="patient-intake-submit-reason">
                    Confirm your details and complete every field to submit.
                  </p>
                ) : null}
                <Button
                  aria-describedby={
                    intakeComplete ? undefined : 'patient-intake-submit-reason'
                  }
                  disabled={!intakeComplete}
                  fullWidth
                  type="submit"
                  variant="primary"
                >
                  Submit medical history
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <CareLoopFrame
      actor={actorFor(stage)}
      currentStep={stepFor(stage)}
      onRestart={restart}
      patient={
        patient
          ? {
              name: patient.name,
              pid: patient.pid,
              detail: `${patient.sexLabel} · ${patient.dobOrAge}`,
            }
          : undefined
      }
      stages={STAGES}
      title="Patient acquisition and intake"
    >
      {stage === 'patients-empty' || stage === 'phone-gate' ? (
        <Card className={styles.primaryCard} variant="outline">
          <EmptyState surface="plain">
            <EmptyStateHeader>
              <EmptyStateTitle>No patients yet</EmptyStateTitle>
              <EmptyStateDescription>
                Confirm the patient phone before creating the first record.
              </EmptyStateDescription>
            </EmptyStateHeader>
            <EmptyStateContent>
              <Button onClick={() => setStage('phone-gate')} variant="primary">
                Add patient
              </Button>
            </EmptyStateContent>
          </EmptyState>
          <PhoneGateModal
            createDelayMs={phoneGateDelayMs}
            lookup={() => ({ kind: 'no_match' })}
            onClose={(reason) => {
              if (reason === 'dismissed') setStage('patients-empty');
            }}
            onOutcome={acceptPatient}
            open={stage === 'phone-gate'}
            verificationDelayMs={phoneGateDelayMs}
          />
        </Card>
      ) : null}

      {stage === 'intake-unknown' ? (
        <Card className={styles.focusCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm">Intake not started</Badge>
              <CardTitle>Medical history has not been provided</CardTitle>
              <CardDescription>
                Ask the patient to confirm these details before the first order.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={styles.requirementList}>
              {REQUIRED_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={sendIntake} variant="primary">
              Send intake link
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {stage === 'intake-sending' ? (
        <Alert tone="info">
          <AlertTitle>Sending intake link</AlertTitle>
          <AlertDescription>
            The patient record is saved while the delivery request completes.
          </AlertDescription>
        </Alert>
      ) : null}

      {stage === 'intake-error' ? (
        <Alert tone="danger">
          <AlertTitle>Intake link was not sent</AlertTitle>
          <AlertDescription>
            The patient record is saved. Check the phone or try the delivery again.
          </AlertDescription>
          <AlertAction>
            <Button onClick={sendIntake} size="sm" variant="outline">
              Try again
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {stage === 'intake-requested' ? (
        <Card className={styles.focusCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm" variant="info">
                Waiting for patient
              </Badge>
              <CardTitle>Intake link sent</CardTitle>
              <CardDescription>
                Sent to {patient?.phone}. The clinician can continue when the patient submits.
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => setStage('intake-form')} variant="primary">
              Continue on patient phone
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {stage === 'intake-complete' ? (
        <Card className={styles.focusCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm" variant="success">
                Intake complete
              </Badge>
              <CardTitle>Medical history is ready for review</CardTitle>
              <CardDescription>
                Submitted by {patient?.name}. The order can now start with this patient context.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <dl className={styles.factGrid}>
              <div>
                <dt>Allergies</dt>
                <dd>{allergies}</dd>
              </div>
              <div>
                <dt>Medicines</dt>
                <dd>{medicines}</dd>
              </div>
              <div>
                <dt>Symptoms</dt>
                <dd>{symptoms}</dd>
              </div>
              <div>
                <dt>Family history</dt>
                <dd>{familyHistory}</dd>
              </div>
            </dl>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setStage('ready-to-order')} variant="primary">
              Start lab order
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {stage === 'ready-to-order' ? (
        <Alert tone="success">
          <AlertTitle>Patient ready for lab ordering</AlertTitle>
          <AlertDescription>
            {patient?.name} keeps the same patient ID and intake context in the next journey.
          </AlertDescription>
        </Alert>
      ) : null}
    </CareLoopFrame>
  );
}
