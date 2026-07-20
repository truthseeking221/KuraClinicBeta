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
  ArrowLeftIcon,
  Button,
  CloseIcon,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  IconButton,
  OtpInput,
  PhoneInput,
  type PhoneValue,
} from '../../components/ui';

import { BeforeSendPane } from './before-send-pane';
import { PatientDetailsForm } from './patient-details-form';
import { PatientMatchCard } from './patient-match-card';
import { SharedPhoneMatches } from './shared-phone-matches';
import {
  demoLookup,
  demoRateLimited,
  DEMO_MATCH_PATIENT,
  DEMO_OTP,
  DEMO_RESEND_COOLDOWN_SECS,
  DEMO_SHARED_PHONE_PATIENTS,
} from './demo-data';
import {
  draftPatientError,
  EMPTY_DRAFT,
  hasUnsavedEntries,
  isValidKhLocalPhone,
  maskPhoneForOtp,
  PHONE_GATE_COPY,
  stateAfterLookup,
  verifyGateOtp,
} from './logic';
import type {
  DraftPatient,
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

/**
 * The phone gate (spec: docs/design/phone-gate/phone-gate-ui-spec.md).
 * A safety checkpoint before a booking code is sent: verify the phone by OTP,
 * detect an existing patient, attach it or create a temporary patient. The
 * catalog behind stays inert; backdrop clicks never dismiss; Esc asks before
 * discarding entered data.
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
  const [draftError, setDraftError] = useState<string | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [matchedPatient, setMatchedPatient] = useState<MatchedPatient>(
    initial?.matchPatient ?? DEMO_MATCH_PATIENT,
  );
  const [sharedCandidates, setSharedCandidates] = useState<MatchedPatient[]>(
    initial?.candidates ?? DEMO_SHARED_PHONE_PATIENTS,
  );
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

  /** Unlock/Change phone: back to entry; the OTP and lookup are invalidated. */
  function changePhone() {
    window.clearTimeout(verificationTimer.current);
    setState('enterPhone');
    setCode('');
    setCodeError(null);
    setDraftError(null);
  }

  function createTemporaryPatient() {
    const error = draftPatientError(draft);
    if (error) {
      setDraftError(error);
      return;
    }
    setDraftError(null);
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

  const showBack =
    state === 'verifyOtp' ||
    state === 'verifyingOtp' ||
    state === 'knownMatch' ||
    state === 'sharedMatches' ||
    state === 'differentPatient' ||
    state === 'noMatch' ||
    state === 'error';

  return (
    <Dialog
      onOpenChange={(next) => {
        if (!next) attemptDismiss();
      }}
      open={open}
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          aria-describedby={undefined}
          className={styles.content}
          showCloseButton={false}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
            attemptDismiss();
          }}
          onInteractOutside={(event) => event.preventDefault()}
          onPointerDownOutside={(event) => event.preventDefault()}
        >
          <IconButton
            aria-label={PHONE_GATE_COPY.closeLabel}
            className={styles.closeButton}
            onClick={attemptDismiss}
            size="micro"
          >
            <CloseIcon aria-hidden="true" />
          </IconButton>

          <div className={styles.frame}>
            <BeforeSendPane />

            <div className={styles.pane}>
              {showBack ? (
                <Button
                  className={styles.backLink}
                  leadingIcon={<ArrowLeftIcon aria-hidden="true" />}
                  onClick={changePhone}
                  size="sm"
                  variant="link"
                >
                  {PHONE_GATE_COPY.changePhone}
                </Button>
              ) : null}

              {state === 'enterPhone' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {PHONE_GATE_COPY.title}
                  </DialogTitle>
                  <DialogDescription className={styles.subtitle}>
                    {PHONE_GATE_COPY.subtitle}
                  </DialogDescription>
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
                  <Button fullWidth onClick={sendCode} variant="primary">
                    Send SMS code
                  </Button>
                </>
              ) : null}

              {state === 'verifyOtp' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {PHONE_GATE_COPY.verifyTitle}
                  </DialogTitle>
                  <DialogDescription className={styles.subtitle}>
                    Enter the 6-digit SMS code sent to{' '}
                    <strong className={styles.subtitleStrong}>
                      {phone ? maskPhoneForOtp(phone) : ''}
                    </strong>
                    .
                  </DialogDescription>
                  <OtpInput
                    autoFocus
                    error={codeError}
                    label="SMS code"
                    onValueChange={(next) => {
                      setCode(next);
                      setCodeError(null);
                    }}
                    value={code}
                  />
                  <Button
                    disabled={code.length !== 6}
                    fullWidth
                    onClick={verifyCode}
                    variant="primary"
                  >
                    Verify code
                  </Button>
                  <div className={styles.resendRow}>
                    <Button
                      disabled={resendLeft > 0}
                      onClick={() => {
                        setCode('');
                        setCodeError(null);
                        setResendLeft(resendCooldownSecs);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      {resendLeft > 0 ? `Resend in ${resendLeft}s` : 'Resend code'}
                    </Button>
                  </div>
                </>
              ) : null}

              {state === 'verifyingOtp' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {PHONE_GATE_COPY.verifyTitle}
                  </DialogTitle>
                  <p aria-live="polite" className={styles.pending} role="status">
                    Checking your code…
                  </p>
                </>
              ) : null}

              {state === 'knownMatch' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {PHONE_GATE_COPY.matchTitle}
                  </DialogTitle>
                  <PatientMatchCard
                    autoFocusChoose
                    onChoose={() => {
                      onOutcome({
                        kind: 'existing',
                        matchReason: 'verified_phone',
                        patient: matchedPatient,
                      });
                      onClose('completed');
                    }}
                    patient={matchedPatient}
                  />
                  <Button
                    fullWidth
                    onClick={() => {
                      setDraftError(null);
                      setProvisionalReason('different_patient');
                      setState('differentPatient');
                    }}
                    variant="outline"
                  >
                    {PHONE_GATE_COPY.someoneElse}
                  </Button>
                </>
              ) : null}

              {state === 'sharedMatches' ? (
                <>
                  <DialogTitle className={styles.title}>Choose patient</DialogTitle>
                  <SharedPhoneMatches
                    candidates={sharedCandidates}
                    onChoose={(patient) => {
                      onOutcome({ kind: 'existing', matchReason: 'shared_phone', patient });
                      onClose('completed');
                    }}
                    onCreateProvisional={() => {
                      setDraftError(null);
                      setProvisionalReason('shared_phone_override');
                      setState('differentPatient');
                    }}
                  />
                </>
              ) : null}

              {state === 'differentPatient' || state === 'noMatch' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {state === 'differentPatient'
                      ? PHONE_GATE_COPY.matchTitle
                      : PHONE_GATE_COPY.title}
                  </DialogTitle>
                  <PatientDetailsForm
                    draft={draft}
                    error={draftError}
                    mode={state}
                    onChange={(next) => {
                      setDraft(next);
                      setDraftError(null);
                    }}
                    onUnlockPhone={changePhone}
                    phoneDisplay={phoneDisplay}
                  />
                  <Button
                    fullWidth
                    onClick={createTemporaryPatient}
                    variant="primary"
                  >
                    Create temporary patient
                  </Button>
                </>
              ) : null}

              {state === 'submitting' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {PHONE_GATE_COPY.title}
                  </DialogTitle>
                  <p aria-live="polite" className={styles.pending} role="status">
                    Creating the temporary patient…
                  </p>
                </>
              ) : null}

              {state === 'error' ? (
                <>
                  <DialogTitle className={styles.title}>
                    {PHONE_GATE_COPY.title}
                  </DialogTitle>
                  <Alert tone="danger">
                    <AlertTitle>Lookup unavailable</AlertTitle>
                    <AlertDescription>{PHONE_GATE_COPY.lookupError}</AlertDescription>
                    <AlertAction>
                      <Button onClick={runLookup} size="sm" variant="primary">
                        Retry
                      </Button>
                      <Button onClick={changePhone} size="sm" variant="ghost">
                        {PHONE_GATE_COPY.changePhone}
                      </Button>
                    </AlertAction>
                  </Alert>
                </>
              ) : null}
            </div>
          </div>

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
      </DialogPortal>
    </Dialog>
  );
}
