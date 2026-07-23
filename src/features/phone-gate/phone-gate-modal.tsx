'use client';

import { useEffect, useRef, useState } from 'react';
import { formatPhoneNumber } from 'react-phone-number-input';

import { useT } from '../../components/foundations/i18n';
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
  demoCheckDuplicates,
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
  isDraftFilled,
  isValidKhLocalPhone,
  maskPhoneForOtp,
  PHONE_GATE_COPY,
  stateAfterLookup,
  verifyGateOtp,
} from './logic';
import type {
  DraftPatient,
  DraftPatientErrors,
  DuplicateCheckResult,
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
  /** Demographic preflight run on the entered details before anything is created. */
  checkDuplicates?: (input: {
    draft: DraftPatient;
    phone: string;
  }) => DuplicateCheckResult;
  rateLimited?: (e164: string) => boolean;
  expectedCode?: string;
  resendCooldownSecs?: number;
  /** Provisional-record creation latency; raise it to inspect `submitting`. */
  createDelayMs?: number;
  /** Duplicate-preflight latency; raise it to inspect `checkingDuplicates`. */
  duplicateCheckDelayMs?: number;
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
      | 'checkingDuplicates'
      | 'possibleDuplicates'
      | 'concurrentMatch'
      | 'duplicateError'
      | 'error'
    >;
    phone: PhoneValue;
    matchPatient?: MatchedPatient;
    candidates?: MatchedPatient[];
    duplicates?: MatchedPatient[];
    draft?: DraftPatient;
  };
};

/** Steps that follow a verified code, where the bound number stays on screen. */
const VERIFIED_STATES: PhoneGateState[] = [
  'knownMatch',
  'sharedMatches',
  'differentPatient',
  'noMatch',
  'checkingDuplicates',
  'possibleDuplicates',
  'concurrentMatch',
  'duplicateError',
  'submitting',
  'error',
];

/** Steps where the details form is on screen, filled in or being resolved. */
const DETAILS_STATES: PhoneGateState[] = [
  'differentPatient',
  'noMatch',
  'checkingDuplicates',
  'submitting',
];

/**
 * Where a green check beside the number could otherwise be read as a verified
 * patient: any step that is about binding or creating a person, minus the two
 * that already carry the caveat in words.
 */
const IDENTITY_NOTE_STATES: PhoneGateState[] = [
  ...DETAILS_STATES,
  'possibleDuplicates',
  'concurrentMatch',
  'duplicateError',
];

function titleFor(state: PhoneGateState): string {
  if (state === 'verifyOtp' || state === 'verifyingOtp') return PHONE_GATE_COPY.otpTitle;
  if (state === 'knownMatch') return PHONE_GATE_COPY.matchTitle;
  if (state === 'sharedMatches') return PHONE_GATE_COPY.sharedTitle;
  if (state === 'possibleDuplicates') return PHONE_GATE_COPY.duplicateTitle;
  if (state === 'concurrentMatch') return PHONE_GATE_COPY.concurrentTitle;
  if (DETAILS_STATES.includes(state) || state === 'duplicateError') {
    return PHONE_GATE_COPY.newPatientTitle;
  }
  if (state === 'error') return PHONE_GATE_COPY.lookupTitle;
  return PHONE_GATE_COPY.phoneTitle;
}

/**
 * The phone gate (spec: docs/design/phone-gate/phone-gate-ui-spec.md).
 * A safety checkpoint before a booking code is sent: verify the phone by OTP,
 * detect an existing patient, attach it or add a new one. One column, one
 * question per step, with the verified number visible wherever it is bound to
 * a person — beside the identity state it does *not* establish.
 *
 * Adding a patient runs a demographic duplicate check first: a phone that
 * matched nothing is not proof the patient is new. Nothing is created while
 * that check is unresolved, and a rejected candidate is recorded as an
 * override rather than lost.
 *
 * The catalog behind stays inert; backdrop clicks never dismiss; Esc asks
 * before discarding entered data.
 */
export function PhoneGateModal({
  checkDuplicates = demoCheckDuplicates,
  createDelayMs = 300,
  duplicateCheckDelayMs = 400,
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
  const t = useT();
  const [state, setState] = useState<PhoneGateState>(initial?.state ?? 'enterPhone');
  const [phone, setPhone] = useState<PhoneValue | undefined>(initial?.phone);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendLeft, setResendLeft] = useState(0);
  const [draft, setDraft] = useState<DraftPatient>(initial?.draft ?? EMPTY_DRAFT);
  const [draftErrors, setDraftErrors] = useState<DraftPatientErrors>({});
  const [differentPersonConfirmed, setDifferentPersonConfirmed] = useState(false);
  const [differentPersonError, setDifferentPersonError] = useState<string | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [matchedPatient, setMatchedPatient] = useState<MatchedPatient>(
    initial?.matchPatient ?? DEMO_MATCH_PATIENT,
  );
  const [sharedCandidates, setSharedCandidates] = useState<MatchedPatient[]>(
    initial?.candidates ?? DEMO_SHARED_PHONE_PATIENTS,
  );
  const [duplicateCandidates, setDuplicateCandidates] = useState<MatchedPatient[]>(
    initial?.duplicates ?? [DEMO_MATCH_PATIENT],
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [duplicateOverride, setDuplicateOverride] = useState(false);
  const [provisionalReason, setProvisionalReason] = useState<
    'different_patient' | 'shared_phone_override' | 'no_match'
  >(initial?.state === 'differentPatient' ? 'different_patient' : 'no_match');
  const submitTimer = useRef<number | undefined>(undefined);
  const duplicateTimer = useRef<number | undefined>(undefined);
  const verificationTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(submitTimer.current);
      window.clearTimeout(duplicateTimer.current);
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
      setPhoneError(t(PHONE_GATE_COPY.invalidPhone));
      return;
    }
    if (rateLimited(phone)) {
      setPhoneError(t(PHONE_GATE_COPY.rateLimited));
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
      setCodeError(t(PHONE_GATE_COPY.invalidCode));
      return;
    }
    setCodeError(null);
    setState('verifyingOtp');
    verificationTimer.current = window.setTimeout(runLookup, verificationDelayMs);
  }

  /** Change: back to entry; the OTP and any lookup result are invalidated. */
  function changePhone() {
    window.clearTimeout(verificationTimer.current);
    window.clearTimeout(duplicateTimer.current);
    setState('enterPhone');
    setCode('');
    setCodeError(null);
    setDraftErrors({});
    setSelectionError(null);
    setSelectedCandidateId(null);
    setDuplicateOverride(false);
    setDifferentPersonError(null);
  }

  function attachPatient(
    patient: MatchedPatient,
    matchReason: 'verified_phone' | 'shared_phone' | 'demographic_match' | 'concurrent_create',
  ) {
    onOutcome({ kind: 'existing', matchReason, patient });
    onClose('completed');
  }

  function attachSelectedCandidate(
    candidates: MatchedPatient[],
    matchReason: 'shared_phone' | 'demographic_match',
  ) {
    const patient = candidates.find(
      (candidate) => candidate.patientId === selectedCandidateId,
    );
    if (!patient) {
      setSelectionError(t(PHONE_GATE_COPY.noSelection));
      return;
    }
    attachPatient(patient, matchReason);
  }

  function startNewPatient(reason: 'different_patient' | 'shared_phone_override') {
    setDraftErrors({});
    setSelectionError(null);
    setSelectedCandidateId(null);
    setDifferentPersonConfirmed(false);
    setDifferentPersonError(null);
    setProvisionalReason(reason);
    setState('differentPatient');
  }

  /** Creation is reached only from a resolved duplicate check. */
  function createProvisionalPatient(override: boolean) {
    setState('submitting');
    submitTimer.current = window.setTimeout(() => {
      onOutcome({
        kind: 'temporary',
        draft,
        phone: phone ?? '',
        knownPhoneOverride: provisionalReason !== 'no_match',
        duplicateOverride: override,
        auditReason: provisionalReason,
      });
      onClose('completed');
    }, createDelayMs);
  }

  function runDuplicateCheck() {
    window.clearTimeout(duplicateTimer.current);
    setState('checkingDuplicates');
    duplicateTimer.current = window.setTimeout(() => {
      const result = checkDuplicates({ draft, phone: phone ?? '' });
      if (result.kind === 'possible_matches') {
        setDuplicateCandidates(result.candidates);
        setSelectedCandidateId(null);
        setSelectionError(null);
        setState('possibleDuplicates');
        return;
      }
      if (result.kind === 'concurrent_match') {
        setMatchedPatient(result.patient);
        setState('concurrentMatch');
        return;
      }
      if (result.kind === 'error') {
        setState('duplicateError');
        return;
      }
      createProvisionalPatient(duplicateOverride);
    }, duplicateCheckDelayMs);
  }

  /** Add: validate the entered details, then check for an existing record. */
  function submitDetails() {
    const errors = draftPatientErrors(draft);
    const needsDeclaration =
      detailsMode === 'differentPatient' && !differentPersonConfirmed;
    if (needsDeclaration) {
      setDifferentPersonError(PHONE_GATE_COPY.differentConfirmRequired);
    }
    if (hasDraftErrors(errors) || needsDeclaration) {
      setDraftErrors(errors);
      return;
    }
    setDraftErrors({});
    setDifferentPersonError(null);
    runDuplicateCheck();
  }

  function attemptDismiss() {
    if (hasUnsavedEntries({ state, localPhone: phoneDisplay, code, draft })) {
      setConfirmDiscard(true);
      return;
    }
    onClose('dismissed');
  }

  // A failed check keeps the entered details on screen and editable: the
  // doctor may have to fix a value, and retrying blind is not recovery.
  const showDetails = DETAILS_STATES.includes(state) || state === 'duplicateError';
  const busy = state === 'checkingDuplicates' || state === 'submitting';
  // The branch survives the check and the create, so the warning and the
  // description never swap under the user while work is in flight.
  const detailsMode = provisionalReason === 'no_match' ? 'noMatch' : 'differentPatient';
  // The identity fields gate the action. The duplicate-risk declaration does
  // not: a disabled button cannot say which checkbox is missing, so leaving it
  // unchecked earns an error on the checkbox instead of silence.
  const draftReady = isDraftFilled(draft);
  const description =
    state === 'enterPhone'
      ? PHONE_GATE_COPY.phoneSubtitle
      : state === 'knownMatch'
        ? PHONE_GATE_COPY.identityCaveat
        : state === 'possibleDuplicates'
          ? PHONE_GATE_COPY.duplicateBody
          : state === 'concurrentMatch'
            ? PHONE_GATE_COPY.concurrentBody
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
        closeLabel={t(PHONE_GATE_COPY.closeLabel)}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
          attemptDismiss();
        }}
        onInteractOutside={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        size="sm"
      >
        <DialogHeader>
          <DialogTitle>{t(titleFor(state))}</DialogTitle>
          {description ? (
            <DialogDescription>{t(description)}</DialogDescription>
          ) : null}
        </DialogHeader>

        <DialogBody className={styles.body}>
          {state === 'verifyOtp' || state === 'verifyingOtp' ? (
            <VerifiedPhoneLine
              inline
              label={t(PHONE_GATE_COPY.sentToLabel)}
              onChange={changePhone}
              value={phone ? maskPhoneForOtp(phone) : ''}
            />
          ) : null}

          {VERIFIED_STATES.includes(state) ? (
            <VerifiedPhoneLine
              label={t(PHONE_GATE_COPY.verifiedLabel)}
              note={
                IDENTITY_NOTE_STATES.includes(state)
                  ? t(PHONE_GATE_COPY.identityUnconfirmed)
                  : undefined
              }
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
              // The precondition belongs on the field that depends on it: the
              // code is only evidence if whoever holds the handset is here.
              helpText={t(PHONE_GATE_COPY.phonePresence)}
              label={t('Contact phone number')}
              onChange={(next) => {
                setPhone(next);
                setPhoneError(null);
              }}
              placeholder="12 345 678"
              required
              size="lg"
              value={phone}
            />
          ) : null}

          {state === 'verifyOtp' || state === 'verifyingOtp' ? (
            <OtpInput
              autoFocus
              disabled={state === 'verifyingOtp'}
              error={codeError}
              fullWidth
              accessibleLabel={t('SMS code')}
              onValueChange={(next) => {
                setCode(next);
                setCodeError(null);
              }}
              value={code}
            />
          ) : null}

          {state === 'knownMatch' || state === 'concurrentMatch' ? (
            <PatientIdentity patient={matchedPatient} />
          ) : null}

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

          {/* The dialog title already names the risk, so no banner repeats it. */}
          {state === 'possibleDuplicates' ? (
            <SharedPhoneMatches
              banner={null}
              candidates={duplicateCandidates}
              error={selectionError}
              legend={t(PHONE_GATE_COPY.duplicateLegend)}
              onSelect={(patientId) => {
                setSelectedCandidateId(patientId);
                setSelectionError(null);
              }}
              selectedId={selectedCandidateId}
            />
          ) : null}

          {showDetails ? (
            <>
              <PatientDetailsForm
                differentPersonConfirmed={differentPersonConfirmed}
                differentPersonError={differentPersonError}
                disabled={busy}
                draft={draft}
                errors={draftErrors}
                mode={detailsMode}
                onChange={(next) => {
                  setDraft(next);
                  setDraftErrors({});
                }}
                onDifferentPersonConfirmedChange={(confirmed) => {
                  setDifferentPersonConfirmed(confirmed);
                  setDifferentPersonError(null);
                }}
              />
              {/* The consequence of the action sits next to the action. The
                  failed-check state carries its recovery in the alert instead. */}
              {state === 'duplicateError' ? null : (
                <p className={styles.consequence} id="phone-gate-consequence">
                  {draftReady
                    ? t(PHONE_GATE_COPY.createConsequence)
                    : t(PHONE_GATE_COPY.incompleteForm)}
                </p>
              )}
            </>
          ) : null}

          {state === 'error' || state === 'duplicateError' ? (
            <Alert tone="danger">
              <AlertTitle>
                {state === 'error'
                  ? t(PHONE_GATE_COPY.lookupErrorTitle)
                  : t(PHONE_GATE_COPY.duplicateErrorTitle)}
              </AlertTitle>
              <AlertDescription>
                {state === 'error'
                  ? t(PHONE_GATE_COPY.lookupError)
                  : t(PHONE_GATE_COPY.duplicateErrorBody)}
              </AlertDescription>
              <AlertAction>
                <Button
                  onClick={state === 'error' ? runLookup : submitDetails}
                  size="sm"
                  variant="primary"
                >
                  {state === 'error' ? t('Retry') : t(PHONE_GATE_COPY.tryAgain)}
                </Button>
              </AlertAction>
            </Alert>
          ) : null}
        </DialogBody>

        {/* Recovery for a failed lookup or duplicate check sits inside the
            alert, so those states have no action bar — an empty footer rule
            would be pure chrome. */}
        {state === 'error' || state === 'duplicateError' ? null : (
          <DialogFooter className={styles.footer}>
            {state === 'enterPhone' ? (
              <Button onClick={sendCode} variant="primary">
                {t(PHONE_GATE_COPY.sendCode)}
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
                    ? `${t('Resend in')} ${resendLeft}s`
                    : t(PHONE_GATE_COPY.resendCode)}
                </Button>
                <Button
                  disabled={code.length !== 6}
                  loading={state === 'verifyingOtp'}
                  onClick={verifyCode}
                  variant="primary"
                >
                  {state === 'verifyingOtp'
                    ? t(PHONE_GATE_COPY.verifying)
                    : t(PHONE_GATE_COPY.verifyCode)}
                </Button>
              </>
            ) : null}

            {state === 'knownMatch' ? (
              <>
                <Button
                  onClick={() => startNewPatient('different_patient')}
                  variant="ghost"
                >
                  {t(PHONE_GATE_COPY.someoneElse)}
                </Button>
                <Button
                  autoFocus
                  onClick={() => attachPatient(matchedPatient, 'verified_phone')}
                  variant="primary"
                >
                  {t(PHONE_GATE_COPY.useThisPatient)}
                </Button>
              </>
            ) : null}

            {state === 'sharedMatches' ? (
              <>
                <Button
                  onClick={() => startNewPatient('shared_phone_override')}
                  variant="ghost"
                >
                  {t(PHONE_GATE_COPY.noneOfThese)}
                </Button>
                <Button
                  onClick={() => attachSelectedCandidate(sharedCandidates, 'shared_phone')}
                  variant="primary"
                >
                  {t(PHONE_GATE_COPY.choosePatient)}
                </Button>
              </>
            ) : null}

            {/* Rejecting the candidates does not create silently: it returns to
                the details, now carrying a recorded duplicate override. */}
            {state === 'possibleDuplicates' ? (
              <>
                <Button
                  onClick={() => {
                    setDuplicateOverride(true);
                    setSelectionError(null);
                    createProvisionalPatient(true);
                  }}
                  variant="ghost"
                >
                  {t(PHONE_GATE_COPY.noneOfThese)}
                </Button>
                <Button
                  onClick={() =>
                    attachSelectedCandidate(duplicateCandidates, 'demographic_match')
                  }
                  variant="primary"
                >
                  {t(PHONE_GATE_COPY.choosePatient)}
                </Button>
              </>
            ) : null}

            {state === 'concurrentMatch' ? (
              <Button
                autoFocus
                onClick={() => attachPatient(matchedPatient, 'concurrent_create')}
                variant="primary"
              >
                {t(PHONE_GATE_COPY.reviewPatient)}
              </Button>
            ) : null}

            {DETAILS_STATES.includes(state) ? (
              <Button
                aria-describedby="phone-gate-consequence"
                disabled={!draftReady}
                loading={busy}
                onClick={submitDetails}
                variant="primary"
              >
                {state === 'checkingDuplicates'
                  ? t(PHONE_GATE_COPY.checkingDuplicates)
                  : state === 'submitting'
                    ? t(PHONE_GATE_COPY.creating)
                    : t(PHONE_GATE_COPY.addPatient)}
              </Button>
            ) : null}
          </DialogFooter>
        )}

        <AlertDialog onOpenChange={(next) => setConfirmDiscard(next)} open={confirmDiscard}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t('Discard what you entered?')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t('The verified phone and the details typed here will not be saved.')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmDiscard(false)}>
                {t('Keep editing')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmDiscard(false);
                  onClose('dismissed');
                }}
                variant="destructive"
              >
                {t('Discard & close')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
