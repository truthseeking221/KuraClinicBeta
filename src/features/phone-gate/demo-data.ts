import type { DraftPatient, DuplicateCheckResult, MatchedPatient, PhoneLookupResult } from './logic';

/** Demo OTP accepted by every phone-gate story. */
export const DEMO_OTP = '123456';

export const DEMO_RESEND_COOLDOWN_SECS = 30;

export const DEMO_PROVISIONAL_CODE = 'PROV-0001';

/** Spec §7 example patient. */
export const DEMO_MATCH_PATIENT: MatchedPatient = {
  patientId: 'pat-sokha',
  initials: 'SC',
  name: 'Sokha Chann',
  sex: 'Female',
  age: 32,
  mrnMasked: 'MRN ··34',
};

export const DEMO_SHARED_PHONE_PATIENTS: MatchedPatient[] = [
  {
    patientId: 'pat-sophea',
    initials: 'SC',
    name: 'Sophea Chann',
    sex: 'Female',
    age: 29,
    mrnMasked: 'MRN ··18',
  },
  {
    patientId: 'pat-rithy',
    initials: 'RK',
    name: 'Rithy Khem',
    sex: 'Male',
    age: 14,
    mrnMasked: 'MRN ··73',
  },
  {
    patientId: 'pat-visal',
    initials: 'VH',
    name: 'Visal Heng',
    sex: 'Male',
    age: 7,
    mrnMasked: 'MRN ··09',
  },
];

/**
 * Demo lookup verdicts:
 * 070 123 496 → known match (Sokha Chann) · 070 123 497 → shared phone
 * · numbers ending 000 → lookup error · anything else → no match.
 */
export function demoLookup(e164: string): PhoneLookupResult {
  if (e164.endsWith('123496')) return { kind: 'known_match', patient: DEMO_MATCH_PATIENT };
  if (e164.endsWith('123497')) {
    return { kind: 'shared_matches', candidates: DEMO_SHARED_PHONE_PATIENTS };
  }
  if (e164.endsWith('000')) return { kind: 'error' };
  return { kind: 'no_match' };
}

/** Numbers ending 999 simulate the OTP rate limit (route-level throttle). */
export function demoRateLimited(e164: string): boolean {
  return e164.endsWith('999');
}

/**
 * Demo duplicate preflight, run on the entered details before anything is
 * created. A phone that matched nothing does not mean the patient is new:
 * the number may have changed, or belong to a relative.
 *
 * Names containing “Chann” → possible match · “Khem” → a record created
 * concurrently by someone else · “Offline” → the check itself failed ·
 * anything else → clear.
 */
export function demoCheckDuplicates(input: { draft: DraftPatient }): DuplicateCheckResult {
  const name = input.draft.name.trim().toLowerCase();
  if (name.includes('offline')) return { kind: 'error' };
  if (name.includes('chann')) {
    return { kind: 'possible_matches', candidates: [DEMO_MATCH_PATIENT] };
  }
  if (name.includes('khem')) {
    return { kind: 'concurrent_match', patient: DEMO_SHARED_PHONE_PATIENTS[1] };
  }
  return { kind: 'clear' };
}
