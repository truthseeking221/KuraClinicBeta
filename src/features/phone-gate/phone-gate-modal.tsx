'use client';

import { useEffect, useRef, useState } from 'react';
import { formatPhoneNumber } from 'react-phone-number-input';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  OtpInput,
  PhoneInput,
  type PhoneValue,
} from '../../components/ui';

import { PatientDetailsForm } from './patient-details-form';
import { PatientIdentity } from './patient-identity';
import { SharedPhoneMatches } from './shared-phone-matches';
import { VerifiedPhoneLine } from './verified-phone-line';
import {
  demoLookup,
  demoRateLimited,
  DEMO_MATCH_PATIENT,
  DEMO_OTP,
  DEMO_RESEND_COOLDOWN_SECS,
  DEMO_SHARED_PHONE_PATIENTS,
} from './demo-data';
import {
  draftPatientErrors,
  EMPTY_DRAFT,
  hasDraftErrors,
  hasUnsavedEntries,
  isValidKhLocalPhone,
  maskPhoneForOtp,
  PHONE_GATE_COPY,
  stateAfterLookup,
  verifyGateOtp,
} from './logic';
import type {
  DraftPatient,
  DraftPatientErrors,
  MatchedPatient,
  PhoneGateOutcome,
  PhoneGateState,
  PhoneLookupResult,
} from './logic';
import styles from './phone-gate.module.css';

export type PhoneGateCloseReason = 'completed' | 'dismissed';

export type PhoneGateModalProps = {
  open: boolean;
  onClose: (reason: PhoneGateCloseReason) => void;
  onOutcome: (outcome: PhoneGateOutcome) => void;
  /** Lookup + throttle verdicts; defaults cover the demo journeys. */
  lookup?: (e164: string) => PhoneLookupResult;
  rateLimited?: (e164: string) => boolean;
  expectedCode?: string;
  resendCooldownSecs?: number;
  /** Temporary-patient creation latency; raise it to inspect `submitting`. */
  createDelayMs?: number;
  /** OTP-verification latency; raise it to inspect `verifyingOtp`. */
  verificationDelayMs?: number;
  /** Story hook: open directly on a post-verification state. */
  initial?: {
    state: Extract<
      PhoneGateState,
      | 'verifyOtp'
      | 'verifyingOtp'
      | 'knownMatch'
      | 'sharedMatches'
      | 'differentPatient'
      | 'noMatch'
      | 'error'
    >;
    phone: PhoneValue;
    matchPatient?: MatchedPatient;
    candidates?: MatchedPatient[];
    draft?: DraftPatient;
  };
};

/** Steps that follow a verified code, where the bound number stays on screen. */
const VERIFIED_STATES: PhoneGateState[] = [
  'knownMatch',
  'sharedMatches',
  'differentPatient',
  'noMatch',
  'submitting',
  'error',
];

function titleFor(state: PhoneGateState): string {
  if (state === 'verifyOtp' || state === 'verifyingOtp') return PHONE_GATE_COPY.otpTitle;
  if (state === 'knownMatch') return PHONE_GATE_COPY.matchTitle;
  if (state === 'sharedMatches') return PHONE_GATE_COPY.sharedTitle;
  if (state === 'differentPatient' || state === 'noMatch' || state === 'submitting') {
    return PHONE_GATE_COPY.newPatientTitle;
  }
  if (state === 'error') return PHONE_GATE_COPY.lookupTitle;
  return PHONE_GATE_COPY.phoneTitle;
}

/**
 * The phone gate (spec: docs/design/phone-gate/phone-gate-ui-spec.md).
 * A safety checkpoint before a booking code is sent: verify the phone by OTP,
 * detect an existing patient, attach it or create a temporary patient. One
 * column, one question per step, with the verified number visible wherever it
 * is bound to a person. The catalog behind stays inert; backdrop clicks never
 * dismiss; Esc asks before discarding entered data.
 */
export function PhoneGateModal({
  createDelayMs = 300,
  expectedCode = DEMO_OTP,
  initial,
  lookup = demoLookup,
  onClose,
  onOutcome,
  open,
  rateLimited = demoRateLimited,
  resendCooldownSecs = DEMO_RESEND_COOLDOWN_SECS,
  verificationDelayMs = 300,
}: PhoneGateModalProps) {
  const [state, setState] = useState<PhoneGateState>(initial?.state ?? 'enterPhone');
  const [phone, setPhone] = useState<PhoneValue | undefined>(initial?.phone);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendLeft, setResendLeft] = useState(0);
  const [draft, setDraft] = useState<DraftPatient>(initial?.draft ?? EMPTY_DRAFT);
  const [draftErrors, setDraftErrors] = useState<DraftPatientErrors>({});
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [matchedPatient, setMatchedPatient] = useState<MatchedPatient>(
    initial?.matchPatient ?? DEMO_MATCH_PATIENT,
  );
  const [sharedCandidates, setSharedCandidates] = useState<MatchedPatient[]>(
    initial?.candidates ?? DEMO_SHARED_PHONE_PATIENTS,
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [provisionalReason, setProvisionalReason] = useState<
    'different_patient' | 'shared_phone_override' | 'no_match'
  >(initial?.state === 'differentPatient' ? 'different_patient' : 'no_match');
  const submitTimer = useRef<number | undefined>(undefined);
  const verificationTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(submitTimer.current);
      window.clearTimeout(verificationTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (resendLeft <= 0) return;
    const timer = setInterval(() => setResendLeft((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [resendLeft]);

  const phoneDisplay = phone ? formatPhoneNumber(phone) || phone : '';

  function sendCode() {
    if (!phone || !isValidKhLocalPhone(phoneDisplay || phone)) {
      setPhoneError(PHONE_GATE_COPY.invalidPhone);
      return;
    }
    if (rateLimited(phone)) {
      setPhoneError(PHONE_GATE_COPY.rateLimited);
      return;
    }
    setPhoneError(null);
    setCode('');
    setCodeError(null);
    setResendLeft(resendCooldownSecs);
    setState('verifyOtp');
  }

  function runLookup() {
    if (!phone) return;
    const result = lookup(phone);
    if (result.kind === 'known_match') {
      setMatchedPatient(result.patient);
    }
    if (result.kind === 'shared_matches') {
      setSharedCandidates(result.candidates);
      setSelectedCandidateId(null);
      setSelectionError(null);
    }
    if (result.kind === 'no_match') {
      setProvisionalReason('no_match');
    }
    setState(stateAfterLookup(result));
  }

  function verifyCode() {
    if (verifyGateOtp(code, expectedCode) === 'invalid') {
      setCodeError(PHONE_GATE_COPY.invalidCode);
      return;
    }
    setCodeError(null);
    setState('verifyingOtp');
    verificationTimer.current = window.setTimeout(runLookup, verificationDelayMs);
  }

  /** Change: back to entry; the OTP and any lookup result are invalidated. */
  function changePhone() {
    window.clearTimeout(verificationTimer.current);
    setState('enterPhone');
    setCode('');
    setCodeError(null);
    setDraftErrors({});
    setSelectionError(null);
  }

  function attachSelectedCandidate() {
    const patient = sharedCandidates.find(
      (candidate) => candidate.patientId === selectedCandidateId,
    );
    if (!patient) {
      setSelectionError(PHONE_GATE_COPY.noSelection);
      return;
    }
    onOutcome({ kind: 'existing', matchReason: 'shared_phone', patient });
    onClose('completed');
  }

  function startTemporaryPatient(reason: 'different_patient' | 'shared_phone_override') {
    setDraftErrors({});
    setSelectionError(null);
    setProvisionalReason(reason);
    setState('differentPatient');
  }

  function createTemporaryPatient() {
    const errors = draftPatientErrors(draft);
    if (hasDraftErrors(errors)) {
      setDraftErrors(errors);
      return;
    }
    setDraftErrors({});
    setState('submitting');
    submitTimer.current = window.setTimeout(() => {
      onOutcome({
        kind: 'temporary',
        draft,
        phone: phone ?? '',
        knownPhoneOverride: provisionalReason !== 'no_match',
        auditReason: provisionalReason,
      });
      onClose('completed');
    }, createDelayMs);
  }

  function attemptDismiss() {
    if (hasUnsavedEntries({ state, localPhone: phoneDisplay, code, draft })) {
      setConfirmDiscard(true);
      return;
    }
    onClose('dismissed');
  }

  const showDetails =
    state === 'differentPatient' || state === 'noMatch' || state === 'submitting';
  // The branch survives `submitting`, so the warning and the description never
  // swap under the user while creation is in flight.
  const detailsMode = provisionalReason === 'no_match' ? 'noMatch' : 'differentPatient';
  const description =
    state === 'enterPhone'
      ? PHONE_GATE_COPY.phoneSubtitle
      : state === 'knownMatch'
        ? PHONE_GATE_COPY.identityCaveat
        : showDetails && detailsMode === 'noMatch'
          ? PHONE_GATE_COPY.noMatchBody
          : null;

  return (
    <Dialog
      onOpenChange={(next) => {
        if (!next) attemptDismiss();
      }}
      open={open}
    >
      <DialogContent
        className={styles.content}
        closeLabel={PHONE_GATE_COPY.closeLabel}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
          attemptDismiss();
        }}
        onInteractOutside={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        size="sm"
      >
        <DialogHeader>
          <DialogTitle>{titleFor(state)}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <DialogBody className={styles.body}>
          {state === 'verifyOtp' || state === 'verifyingOtp' ? (
            <VerifiedPhoneLine
              label={PHONE_GATE_COPY.sentToLabel}
              onChange={changePhone}
              value={phone ? maskPhoneForOtp(phone) : ''}
            />
          ) : null}

          {VERIFIED_STATES.includes(state) ? (
            <VerifiedPhoneLine
              label={PHONE_GATE_COPY.verifiedLabel}
              onChange={changePhone}
              value={phoneDisplay}
              verified
            />
          ) : null}

          {state === 'enterPhone' ? (
            <PhoneInput
              autoFocus
              countries={['KH']}
              defaultCountry="KH"
              error={phoneError}
              label="Phone number"
              onChange={(next) => {
                setPhone(next);
                setPhoneError(null);
              }}
              placeholder="12 345 678"
              required
              value={phone}
            />
          ) : null}

          {state === 'verifyOtp' || state === 'verifyingOtp' ? (
            <OtpInput
              autoFocus
              disabled={state === 'verifyingOtp'}
              error={codeError}
              label="SMS code"
              onValueChange={(next) => {
                setCode(next);
                setCodeError(null);
              }}
              value={code}
            />
          ) : null}

          {state === 'knownMatch' ? <PatientIdentity patient={matchedPatient} /> : null}

          {state === 'sharedMatches' ? (
            <SharedPhoneMatches
              candidates={sharedCandidates}
              error={selectionError}
              onSelect={(patientId) => {
                setSelectedCandidateId(patientId);
                setSelectionError(null);
              }}
              selectedId={selectedCandidateId}
            />
          ) : null}

          {showDetails ? (
            <PatientDetailsForm
              draft={draft}
              errors={draftErrors}
              mode={detailsMode}
              onChange={(next) => {
                setDraft(next);
                setDraftErrors({});
              }}
            />
          ) : null}

          {state === 'error' ? (
            <Alert tone="danger">
              <AlertTitle>{PHONE_GATE_COPY.lookupErrorTitle}</AlertTitle>
              <AlertDescription>{PHONE_GATE_COPY.lookupError}</AlertDescription>
              <AlertAction>
                <Button onClick={runLookup} size="sm" variant="primary">
                  Retry
                </Button>
              </AlertAction>
            </Alert>
          ) : null}
        </DialogBody>

        {/* Recovery for a failed lookup sits inside the alert, so that state
            has no action bar — an empty footer rule would be pure chrome. */}
        {state === 'error' ? null : (
          <DialogFooter className={styles.footer}>
            {state === 'enterPhone' ? (
              <Button onClick={sendCode} variant="primary">
                {PHONE_GATE_COPY.sendCode}
              </Button>
            ) : null}

            {state === 'verifyOtp' || state === 'verifyingOtp' ? (
              <>
                <Button
                  disabled={resendLeft > 0 || state === 'verifyingOtp'}
                  onClick={() => {
                    setCode('');
                    setCodeError(null);
                    setResendLeft(resendCooldownSecs);
                  }}
                  variant="ghost"
                >
                  {resendLeft > 0
                    ? `Resend in ${resendLeft}s`
                    : PHONE_GATE_COPY.resendCode}
                </Button>
                <Button
                  disabled={code.length !== 6}
                  loading={state === 'verifyingOtp'}
                  onClick={verifyCode}
                  variant="primary"
                >
                  {state === 'verifyingOtp'
                    ? PHONE_GATE_COPY.verifying
                    : PHONE_GATE_COPY.verifyCode}
                </Button>
              </>
            ) : null}

            {state === 'knownMatch' ? (
              <>
                <Button
                  onClick={() => startTemporaryPatient('different_patient')}
                  variant="ghost"
                >
                  {PHONE_GATE_COPY.someoneElse}
                </Button>
                <Button
                  autoFocus
                  onClick={() => {
                    onOutcome({
                      kind: 'existing',
                      matchReason: 'verified_phone',
                      patient: matchedPatient,
                    });
                    onClose('completed');
                  }}
                  variant="primary"
                >
                  {PHONE_GATE_COPY.useThisPatient}
                </Button>
              </>
            ) : null}

            {state === 'sharedMatches' ? (
              <>
                <Button
                  onClick={() => startTemporaryPatient('shared_phone_override')}
                  variant="ghost"
                >
                  {PHONE_GATE_COPY.noneOfThese}
                </Button>
                <Button onClick={attachSelectedCandidate} variant="primary">
                  {PHONE_GATE_COPY.choosePatient}
                </Button>
              </>
            ) : null}

            {showDetails ? (
              <Button
                loading={state === 'submitting'}
                onClick={createTemporaryPatient}
                variant="primary"
              >
                {state === 'submitting'
                  ? PHONE_GATE_COPY.creating
                  : PHONE_GATE_COPY.createTemporary}
              </Button>
            ) : null}
          </DialogFooter>
        )}

        <AlertDialog onOpenChange={(next) => setConfirmDiscard(next)} open={confirmDiscard}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Discard what you entered?</AlertDialogTitle>
              <AlertDialogDescription>
                The phone, code, or patient details typed here will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmDiscard(false)}>
                Keep editing
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmDiscard(false);
                  onClose('dismissed');
                }}
                variant="destructive"
              >
                Discard &amp; close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
