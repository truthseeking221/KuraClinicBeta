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

export const PHONE_GATE_COPY = {
  title: 'Choose patient',
  subtitle: 'Start with a patient, guardian, or guarantor phone.',
  verifyTitle: 'Verify number',
  changePhone: 'Change phone',
  matchTitle: 'Is this the patient?',
  someoneElse: 'Patient is someone else',
  differentTitle: 'This looks like a different patient',
  differentBody:
    'This phone belongs to another Kura patient. Confirm this is a different person.',
  noMatchTitle: 'No match found',
  noMatchBody: 'Add details. Kura will check for possible duplicates.',
  beforeSendLabel: 'BEFORE YOU SEND',
  beforeSendBody:
    'Confirm the phone and the person taking the tests. Reception can finish ID checks later.',
  invalidPhone: 'Enter a valid Cambodia phone number.',
  rateLimited: 'Too many codes requested — try again in a few minutes.',
  invalidCode: 'Incorrect or expired code — try again.',
  lookupError: 'The patient lookup did not respond. Your entries are kept.',
  unlockPhone: 'Unlock phone number',
  phoneChecked: 'Phone checked',
  pscConfirms: 'PSC will confirm identity',
  detailsRequired: 'Add the full name, DOB or age, and sex to continue.',
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

/** Creation gate for both temporary-patient forms (spec §8/§9). */
export function draftPatientError(draft: DraftPatient): string | null {
  if (!draft.name.trim() || !draft.dobOrAge.trim() || draft.sex === null) {
    return PHONE_GATE_COPY.detailsRequired;
  }
  return null;
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
    meta: `${provisionalCode} · New patient · ${PHONE_GATE_COPY.phoneChecked}`,
    status: PHONE_GATE_COPY.pscConfirms,
    supporting: 'Phone checked. Not matched in Kura.',
  };
}
