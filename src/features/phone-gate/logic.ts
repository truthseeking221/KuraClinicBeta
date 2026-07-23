/**
 * Phone-gate state rules, built against
 * kura-platform docs/design/phone-gate/phone-gate-ui-spec.md (canonical).
 *
 * The gate is a safety checkpoint before a booking code is sent: capture a
 * Cambodia phone, verify it by OTP, detect an existing patient, and let the
 * doctor either attach that patient or add a new one.
 *
 * Two axes stay separate everywhere in this feature:
 *   contact  — the phone is verified by SMS, and is the delivery address for
 *              the results link and the payment link.
 *   identity — provisional until PSC confirms the person at collection.
 * A verified phone proves possession of a number, never who is being tested.
 *
 * Not finding a patient *by phone* is also not proof the patient is new: the
 * number may have changed, or belong to a relative. Every creation therefore
 * runs a demographic duplicate check first, and nothing is created while that
 * check is unresolved.
 */

export type PhoneGateState =
  | 'enterPhone'
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
  | 'submitting'
  | 'error';

export type MatchedPatient = {
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
};

/** The lookup preserves the distinction between one known record and a shared phone. */
export type PhoneLookupResult =
  | { kind: 'known_match'; patient: MatchedPatient }
  | { kind: 'shared_matches'; candidates: MatchedPatient[] }
  | { kind: 'no_match' }
  | { kind: 'error' };

/**
 * The preflight that runs on the entered details, after the phone lookup found
 * nothing. `concurrent_match` is a record created by someone else while this
 * form was open; it must never resolve into a silent second record.
 */
export type DuplicateCheckResult =
  | { kind: 'clear' }
  | { kind: 'possible_matches'; candidates: MatchedPatient[] }
  | { kind: 'concurrent_match'; patient: MatchedPatient }
  | { kind: 'error' };

export type DraftPatientSex = 'Female' | 'Male' | 'Other';

/**
 * Minimum identity for a new record. Date of birth and estimated age are
 * separate fields on purpose: a record must never carry a fabricated date of
 * birth, and "32" in a shared field cannot be read back as an age, a year, or
 * a truncated date.
 */
export type DraftPatient = {
  name: string;
  /** `YYYY-MM-DD`, collected only when the exact date is known. */
  dob: string;
  /** The exact date of birth is unavailable, so an age is recorded instead. */
  dobUnknown: boolean;
  /** Whole years, explicitly stored as an estimate. */
  ageYears: string;
  sex: DraftPatientSex | null;
};

export const EMPTY_DRAFT: DraftPatient = {
  name: '',
  dob: '',
  dobUnknown: false,
  ageYears: '',
  sex: null,
};

export type PhoneGateOutcome =
  | {
      kind: 'existing';
      patient: MatchedPatient;
      /** Useful to the BFF/audit adapter without implying identity assurance. */
      matchReason:
        | 'verified_phone'
        | 'shared_phone'
        | 'demographic_match'
        | 'concurrent_create';
    }
  | {
      /** Domain vocabulary stays `temporary`; only the button stops using it. */
      kind: 'temporary';
      draft: DraftPatient;
      phone: string;
      /** Different-patient creations carry duplicate-risk audit context. */
      knownPhoneOverride: boolean;
      /** The doctor saw demographic candidates and declared none of them. */
      duplicateOverride: boolean;
      auditReason: 'different_patient' | 'shared_phone_override' | 'no_match';
    };

/**
 * Each step title names the task, so the heading and the controls below it
 * never disagree.
 */
export const PHONE_GATE_COPY = {
  phoneTitle: 'Contact phone number',
  phoneSubtitle: 'Use the patient’s number, or a guardian’s or guarantor’s.',
  /**
   * The precondition the gate depends on. An SMS code proves possession of the
   * handset at this moment, so it is evidence only when the holder is here; a
   * number typed for someone across town proves nothing and creates a record
   * nobody present can vouch for.
   */
  phonePresence: 'The patient or phone holder must be with you to receive the code.',
  otpTitle: 'Enter the code',
  matchTitle: 'Is this the patient?',
  sharedTitle: 'Which patient?',
  newPatientTitle: 'Add a new patient',
  duplicateTitle: 'Possible patient found',
  concurrentTitle: 'A matching patient was just added',
  lookupTitle: 'Patient lookup',

  sendCode: 'Send SMS code',
  verifyCode: 'Verify code',
  verifying: 'Checking code…',
  resendCode: 'Resend code',
  useThisPatient: 'Use this patient',
  someoneElse: 'Someone else',
  choosePatient: 'Use selected patient',
  noneOfThese: 'None of these',
  /**
   * The action names what it creates, not where it goes. "and continue" made
   * the next screen the point; the record and its provisional standing are the
   * point, and `createConsequence` below states what happens next.
   */
  addPatient: 'Create provisional patient',
  checkingDuplicates: 'Checking patient records…',
  creating: 'Adding the patient…',
  reviewPatient: 'Review patient',
  tryAgain: 'Try again',
  changePhone: 'Change',
  changePhoneLabel: 'Change phone number',

  /** Contact axis: what SMS actually proved. */
  verifiedLabel: 'Phone verified by SMS',
  sentToLabel: 'Sent to',
  /** Identity axis, stated separately so a green check is never read as both. */
  identityUnconfirmed: 'Patient identity not yet confirmed',
  /** The one fact the gate exists to protect: possession is not identity. */
  identityCaveat: 'SMS confirms the number, not who is being tested.',

  differentTitle: 'This phone is already linked to another Kura patient',
  differentBody: 'Confirm the person being tested is someone else.',
  differentConfirm:
    'I confirmed none of the matched patients is the person being tested.',
  differentConfirmRequired: 'Confirm this is a different person to continue.',
  /** Two facts only: what the phone proved, and what still gets checked. */
  noMatchBody:
    'No patient matched this phone. Kura checks for duplicates before creating the record.',
  /** Consequence of the primary action, next to the action itself. */
  createConsequence:
    'Creates a provisional record. PSC staff confirm identity before collection.',
  incompleteForm: 'Complete the required fields to continue.',

  /** The titles above these already name the risk, so neither repeats it. */
  duplicateBody: 'Review the match before creating a new record.',
  duplicateLegend: 'Possible matches',
  concurrentBody: 'Added by someone else while you were entering these details.',
  duplicateErrorTitle: 'Couldn’t check for existing patients',
  duplicateErrorBody:
    'No patient record was created. Check the connection and try again.',

  invalidPhone: 'Enter a valid Cambodia phone number.',
  rateLimited: 'Too many codes requested — try again in a few minutes.',
  invalidCode: 'Incorrect or expired code — try again.',
  lookupErrorTitle: 'Lookup unavailable',
  lookupError: 'The patient lookup did not respond. Your entries are kept.',
  nameRequired: 'Enter the full name.',
  dobRequired: 'Enter the date of birth.',
  dobInvalid: 'Enter a real date, as YYYY-MM-DD.',
  dobFuture: 'The date of birth cannot be in the future.',
  ageRequired: 'Enter the estimated age in years.',
  ageInvalid: 'Enter a whole age between 0 and 120.',
  ageEstimated: 'Kura records this as an estimated age.',
  dobUnknownLabel: 'Exact date is unknown',
  sexRequired: 'Select a sex.',
  noSelection: 'Select a patient, or add a new patient.',

  phoneVerified: 'Phone verified',
  pscConfirms: 'PSC will confirm identity',
  closeLabel: 'Close patient identity gate',
} as const;

/** Local Cambodia numbers: 8–9 digits after stripping one leading zero. */
export function isValidKhLocalPhone(local: string): boolean {
  const digits = local.replace(/\D/g, '').replace(/^0+/, '');
  return digits.length >= 8 && digits.length <= 9;
}

/** Spec §6 subtitle masks the middle of the number: +855 70 ... 496. */
export function maskPhoneForOtp(e164: string): string {
  const digits = e164.replace(/\D/g, '');
  if (digits.length < 6) return e164;
  const country = digits.slice(0, 3);
  const head = digits.slice(3, 5);
  const tail = digits.slice(-3);
  return `+${country} ${head} ... ${tail}`;
}

export function verifyGateOtp(
  code: string,
  expectedCode: string,
): 'verified' | 'invalid' {
  return code === expectedCode ? 'verified' : 'invalid';
}

/** Post-verify branch per lookup result (spec §2 journey). */
export function stateAfterLookup(result: PhoneLookupResult): PhoneGateState {
  if (result.kind === 'known_match') return 'knownMatch';
  if (result.kind === 'shared_matches') return 'sharedMatches';
  if (result.kind === 'no_match') return 'noMatch';
  return 'error';
}

/** Where the duplicate preflight lands. Nothing is created until it is `clear`. */
export function stateAfterDuplicateCheck(result: DuplicateCheckResult): PhoneGateState {
  if (result.kind === 'possible_matches') return 'possibleDuplicates';
  if (result.kind === 'concurrent_match') return 'concurrentMatch';
  if (result.kind === 'error') return 'duplicateError';
  return 'submitting';
}

export type DraftPatientErrors = {
  name?: string;
  dob?: string;
  ageYears?: string;
  sex?: string;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isRealIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Creation gate for the new-patient form. Errors are returned per field so each
 * message lands on the control that is missing, instead of one lumped sentence
 * under the form. The date branch and the estimated-age branch validate
 * separately: only one of them is ever on screen.
 */
export function draftPatientErrors(
  draft: DraftPatient,
  today = new Date(),
): DraftPatientErrors {
  const errors: DraftPatientErrors = {};
  if (!draft.name.trim()) errors.name = PHONE_GATE_COPY.nameRequired;

  if (draft.dobUnknown) {
    const age = draft.ageYears.trim();
    if (!age) errors.ageYears = PHONE_GATE_COPY.ageRequired;
    else if (!/^\d{1,3}$/.test(age) || Number(age) > 120) {
      errors.ageYears = PHONE_GATE_COPY.ageInvalid;
    }
  } else {
    const dob = draft.dob.trim();
    if (!dob) errors.dob = PHONE_GATE_COPY.dobRequired;
    else if (!isRealIsoDate(dob)) errors.dob = PHONE_GATE_COPY.dobInvalid;
    else if (new Date(`${dob}T00:00:00Z`).getTime() > today.getTime()) {
      errors.dob = PHONE_GATE_COPY.dobFuture;
    }
  }

  if (draft.sex === null) errors.sex = PHONE_GATE_COPY.sexRequired;
  return errors;
}

export function hasDraftErrors(errors: DraftPatientErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Whether the primary action may be offered at all. Format problems are left to
 * `draftPatientErrors` on submit, so an incomplete form disables the action
 * while a wrong value still earns a message on the field it belongs to.
 */
export function isDraftFilled(draft: DraftPatient): boolean {
  const identified = draft.dobUnknown
    ? draft.ageYears.trim().length > 0
    : draft.dob.trim().length > 0;
  return draft.name.trim().length > 0 && identified && draft.sex !== null;
}

/** The exact date of birth, or nothing. A record never carries a sentinel date. */
export function draftDob(draft: DraftPatient): string | undefined {
  if (draft.dobUnknown) return undefined;
  const dob = draft.dob.trim();
  return isRealIsoDate(dob) ? dob : undefined;
}

/** Age in whole years, derived from the date when it is known. */
export function draftAgeYears(
  draft: DraftPatient,
  today = new Date(),
): number | undefined {
  if (draft.dobUnknown) {
    const age = Number(draft.ageYears.trim());
    return Number.isFinite(age) ? age : undefined;
  }
  const dob = draftDob(draft);
  if (!dob) return undefined;
  const born = new Date(`${dob}T00:00:00Z`);
  let age = today.getUTCFullYear() - born.getUTCFullYear();
  const monthDelta = today.getUTCMonth() - born.getUTCMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getUTCDate() < born.getUTCDate())) {
    age -= 1;
  }
  return age;
}

/** How the age reads downstream, with the estimate never presented as exact. */
export function draftAgeLabel(draft: DraftPatient, today = new Date()): string {
  const age = draftAgeYears(draft, today);
  if (age === undefined) return '';
  return draft.dobUnknown ? `${age} years (estimated)` : `${age} years`;
}

/**
 * Esc may close only when no entered data would be lost (spec §3).
 * Any typed phone, OTP digits, or draft details count as data.
 */
export function hasUnsavedEntries(input: {
  state: PhoneGateState;
  localPhone: string;
  code: string;
  draft: DraftPatient;
}): boolean {
  if (input.state === 'enterPhone') return input.localPhone.trim().length > 0;
  if (input.state === 'verifyOtp' || input.state === 'verifyingOtp') {
    return input.code.length > 0;
  }
  if (input.state === 'differentPatient' || input.state === 'noMatch') {
    return (
      input.draft.name.trim().length > 0 ||
      input.draft.dob.trim().length > 0 ||
      input.draft.ageYears.trim().length > 0 ||
      input.draft.sex !== null
    );
  }
  // A verified lookup result, and any unresolved duplicate check, are progress.
  return input.state !== 'error';
}

/** Downstream order-draft context line for a created provisional patient (spec §10). */
export function temporaryPatientContext(draft: DraftPatient, provisionalCode: string) {
  return {
    heading: `For ${draft.name.trim()}`,
    meta: `${provisionalCode} · Provisional patient · ${PHONE_GATE_COPY.phoneVerified}`,
    status: PHONE_GATE_COPY.pscConfirms,
    supporting: 'Phone verified by SMS. Identity not yet confirmed.',
  };
}
