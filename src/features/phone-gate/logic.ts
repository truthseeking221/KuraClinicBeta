/**
 * Phone-gate state rules, built against
 * kura-platform docs/design/phone-gate/phone-gate-ui-spec.md (canonical).
 *
 * The gate is a safety checkpoint before a booking code is sent: capture a
 * Cambodia phone, verify it by OTP, detect an existing patient, and let the
 * doctor either attach that patient or create a temporary one. The verified
 * phone becomes the delivery address for the results link and payment link —
 * "Phone checked" never claims identity verification; PSC confirms identity.
 */

export type PhoneGateState =
  | 'enterPhone'
  | 'verifyOtp'
  | 'verifyingOtp'
  | 'knownMatch'
  | 'sharedMatches'
  | 'differentPatient'
  | 'noMatch'
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

export type DraftPatientSex = 'Female' | 'Male' | 'Other';

export type DraftPatient = {
  name: string;
  dobOrAge: string;
  sex: DraftPatientSex | null;
};

export const EMPTY_DRAFT: DraftPatient = { name: '', dobOrAge: '', sex: null };

export type PhoneGateOutcome =
  | {
      kind: 'existing';
      patient: MatchedPatient;
      /** Useful to the BFF/audit adapter without implying identity assurance. */
      matchReason: 'verified_phone' | 'shared_phone';
    }
  | {
      kind: 'temporary';
      draft: DraftPatient;
      phone: string;
      /** Different-patient creations carry duplicate-risk audit context. */
      knownPhoneOverride: boolean;
      auditReason: 'different_patient' | 'shared_phone_override' | 'no_match';
    };

/**
 * Each step title names the task, so the heading and the controls below it
 * never disagree.
 */
export const PHONE_GATE_COPY = {
  phoneTitle: 'Contact phone number',
  phoneSubtitle: 'Use the patient’s number, or a guardian’s or guarantor’s.',
  otpTitle: 'Enter the code',
  matchTitle: 'Is this the patient?',
  sharedTitle: 'Which patient?',
  newPatientTitle: 'Patient details',
  lookupTitle: 'Patient lookup',

  sendCode: 'Send SMS code',
  verifyCode: 'Verify code',
  verifying: 'Checking code…',
  resendCode: 'Resend code',
  useThisPatient: 'Use this patient',
  someoneElse: 'Someone else',
  choosePatient: 'Use selected patient',
  noneOfThese: 'None of these',
  createTemporary: 'Create provisional patient',
  creating: 'Creating provisional patient…',
  changePhone: 'Change',
  changePhoneLabel: 'Change phone number',

  verifiedLabel: 'Phone checked',
  sentToLabel: 'Sent to',
  /** The one fact the gate exists to protect: possession is not identity. */
  identityCaveat: 'SMS confirms the number, not who is being tested.',
  differentTitle: 'This may be a different patient',
  differentBody:
    'This number belongs to a Kura patient. Creating another record is logged as a possible duplicate.',
  noMatchBody: 'No patient matches this phone number. PSC confirms identity.',

  invalidPhone: 'Enter a valid Cambodia phone number.',
  rateLimited: 'Too many codes requested — try again in a few minutes.',
  invalidCode: 'Incorrect or expired code — try again.',
  lookupErrorTitle: 'Lookup unavailable',
  lookupError: 'The patient lookup did not respond. Your entries are kept.',
  nameRequired: 'Enter the full name.',
  dobRequired: 'Enter a date of birth or estimated age.',
  sexRequired: 'Select a sex.',
  noSelection: 'Select a patient, or add a provisional patient.',

  phoneChecked: 'Phone checked',
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

export type DraftPatientErrors = {
  name?: string;
  dobOrAge?: string;
  sex?: string;
};

/**
 * Creation gate for both temporary-patient forms (spec §8/§9). Errors are
 * returned per field so each message lands on the control that is missing,
 * instead of one lumped sentence under the form.
 */
export function draftPatientErrors(draft: DraftPatient): DraftPatientErrors {
  const errors: DraftPatientErrors = {};
  if (!draft.name.trim()) errors.name = PHONE_GATE_COPY.nameRequired;
  if (!draft.dobOrAge.trim()) errors.dobOrAge = PHONE_GATE_COPY.dobRequired;
  if (draft.sex === null) errors.sex = PHONE_GATE_COPY.sexRequired;
  return errors;
}

export function hasDraftErrors(errors: DraftPatientErrors): boolean {
  return Object.keys(errors).length > 0;
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
      input.draft.dobOrAge.trim().length > 0 ||
      input.draft.sex !== null
    );
  }
  // A verified lookup result is itself progress worth guarding.
  return input.state === 'knownMatch' || input.state === 'sharedMatches';
}

/** Downstream order-draft context line for a created temporary patient (spec §10). */
export function temporaryPatientContext(draft: DraftPatient, provisionalCode: string) {
  return {
    heading: `For ${draft.name.trim()}`,
    meta: `${provisionalCode} · Provisional patient · ${PHONE_GATE_COPY.phoneChecked}`,
    status: PHONE_GATE_COPY.pscConfirms,
    supporting: 'Phone checked. No patient matches this number.',
  };
}
