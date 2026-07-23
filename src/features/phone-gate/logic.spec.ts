import { describe, expect, it } from 'vitest';

import {
  draftAgeLabel,
  draftAgeYears,
  draftDob,
  draftPatientErrors,
  EMPTY_DRAFT,
  hasUnsavedEntries,
  isDraftFilled,
  isValidKhLocalPhone,
  maskPhoneForOtp,
  stateAfterDuplicateCheck,
  stateAfterLookup,
  temporaryPatientContext,
  verifyGateOtp,
} from './logic';
import type { DraftPatient } from './logic';
import { demoCheckDuplicates, demoLookup, demoRateLimited } from './demo-data';

const TODAY = new Date('2026-07-23T00:00:00Z');

function draft(patch: Partial<DraftPatient> = {}): DraftPatient {
  return { ...EMPTY_DRAFT, ...patch };
}

describe('phone validation', () => {
  it('accepts 8–9 digit Cambodia locals, stripping a leading zero', () => {
    expect(isValidKhLocalPhone('070 123 496')).toBe(true);
    expect(isValidKhLocalPhone('99 111 222')).toBe(true);
    expect(isValidKhLocalPhone('1234')).toBe(false);
    expect(isValidKhLocalPhone('12345678901')).toBe(false);
  });

  it('masks the middle of the number for the OTP subtitle (spec §6)', () => {
    expect(maskPhoneForOtp('+85570123496')).toBe('+855 70 ... 496');
  });
});

describe('verification and branching', () => {
  it('verifies only the exact code', () => {
    expect(verifyGateOtp('123456', '123456')).toBe('verified');
    expect(verifyGateOtp('000000', '123456')).toBe('invalid');
  });

  it('routes lookup results to the spec branches', () => {
    const patient = {
      patientId: 'pat-1',
      initials: 'SC',
      name: 'Sokha Chann',
      sex: 'Female',
      age: 32,
      mrnMasked: 'MRN ··34',
    };
    expect(stateAfterLookup({ kind: 'known_match', patient })).toBe('knownMatch');
    expect(stateAfterLookup({ kind: 'shared_matches', candidates: [patient] })).toBe(
      'sharedMatches',
    );
    expect(stateAfterLookup({ kind: 'no_match' })).toBe('noMatch');
    expect(stateAfterLookup({ kind: 'error' })).toBe('error');
  });

  it('demo verdicts follow the documented scaffolding', () => {
    expect(demoLookup('+85570123496').kind).toBe('known_match');
    expect(demoLookup('+85570123497').kind).toBe('shared_matches');
    expect(demoLookup('+85599111000').kind).toBe('error');
    expect(demoLookup('+85599111222').kind).toBe('no_match');
    expect(demoRateLimited('+85599111999')).toBe(true);
  });
});

describe('duplicate preflight', () => {
  it('creates only from a clear check', () => {
    const patient = {
      patientId: 'pat-1',
      initials: 'SC',
      name: 'Sokha Chann',
      sex: 'Female',
      age: 32,
      mrnMasked: 'MRN ··34',
    };
    expect(stateAfterDuplicateCheck({ kind: 'clear' })).toBe('submitting');
    expect(
      stateAfterDuplicateCheck({ kind: 'possible_matches', candidates: [patient] }),
    ).toBe('possibleDuplicates');
    expect(stateAfterDuplicateCheck({ kind: 'concurrent_match', patient })).toBe(
      'concurrentMatch',
    );
    expect(stateAfterDuplicateCheck({ kind: 'error' })).toBe('duplicateError');
  });

  it('demo verdicts key off the entered name', () => {
    expect(demoCheckDuplicates({ draft: draft({ name: 'Sokha Chann' }) }).kind).toBe(
      'possible_matches',
    );
    expect(demoCheckDuplicates({ draft: draft({ name: 'Rithy Khem' }) }).kind).toBe(
      'concurrent_match',
    );
    expect(demoCheckDuplicates({ draft: draft({ name: 'Offline Test' }) }).kind).toBe(
      'error',
    );
    expect(demoCheckDuplicates({ draft: draft({ name: 'Pierre' }) }).kind).toBe('clear');
  });
});

describe('new patient gate', () => {
  it('reports every missing field on the control that is missing (spec §8/§9)', () => {
    expect(draftPatientErrors(EMPTY_DRAFT, TODAY)).toEqual({
      name: 'Enter the full name.',
      dob: 'Enter the date of birth.',
      sex: 'Select a sex.',
    });
    expect(
      draftPatientErrors(draft({ name: 'Pierre', sex: 'Female' }), TODAY),
    ).toEqual({ dob: 'Enter the date of birth.' });
    expect(
      draftPatientErrors(draft({ name: 'Pierre', dob: '1994-09-12' }), TODAY),
    ).toEqual({ sex: 'Select a sex.' });
    expect(
      draftPatientErrors(
        draft({ name: 'Pierre', dob: '1994-09-12', sex: 'Female' }),
        TODAY,
      ),
    ).toEqual({});
  });

  it('rejects a date that never existed or has not happened yet', () => {
    const base = { name: 'Pierre', sex: 'Female' as const };
    expect(draftPatientErrors(draft({ ...base, dob: '1994-02-30' }), TODAY).dob).toBe(
      'Enter a real date, as YYYY-MM-DD.',
    );
    expect(draftPatientErrors(draft({ ...base, dob: '1994-09' }), TODAY).dob).toBe(
      'Enter a real date, as YYYY-MM-DD.',
    );
    expect(draftPatientErrors(draft({ ...base, dob: '2027-01-01' }), TODAY).dob).toBe(
      'The date of birth cannot be in the future.',
    );
  });

  it('validates the estimated age only on the branch that collects it', () => {
    const base = { name: 'Pierre', sex: 'Female' as const, dobUnknown: true };
    expect(draftPatientErrors(draft(base), TODAY)).toEqual({
      ageYears: 'Enter the estimated age in years.',
    });
    expect(draftPatientErrors(draft({ ...base, ageYears: '32.5' }), TODAY)).toEqual({
      ageYears: 'Enter a whole age between 0 and 120.',
    });
    expect(draftPatientErrors(draft({ ...base, ageYears: '150' }), TODAY)).toEqual({
      ageYears: 'Enter a whole age between 0 and 120.',
    });
    expect(draftPatientErrors(draft({ ...base, ageYears: '32' }), TODAY)).toEqual({});
    // The date branch is not validated while it is off screen.
    expect(
      draftPatientErrors(draft({ ...base, ageYears: '32', dob: 'nonsense' }), TODAY),
    ).toEqual({});
  });

  it('offers the action only once every required group is answered', () => {
    expect(isDraftFilled(EMPTY_DRAFT)).toBe(false);
    expect(isDraftFilled(draft({ name: 'Pierre', dob: '1994-09-12' }))).toBe(false);
    expect(
      isDraftFilled(draft({ name: 'Pierre', dob: '1994-09-12', sex: 'Female' })),
    ).toBe(true);
    expect(
      isDraftFilled(draft({ name: 'Pierre', dobUnknown: true, sex: 'Female' })),
    ).toBe(false);
    expect(
      isDraftFilled(
        draft({ name: 'Pierre', dobUnknown: true, ageYears: '32', sex: 'Female' }),
      ),
    ).toBe(true);
  });

  it('never invents a date of birth for an estimated age', () => {
    const estimated = draft({ name: 'Pierre', dobUnknown: true, ageYears: '32' });
    expect(draftDob(estimated)).toBeUndefined();
    expect(draftAgeYears(estimated, TODAY)).toBe(32);
    expect(draftAgeLabel(estimated, TODAY)).toBe('32 years (estimated)');

    const exact = draft({ name: 'Pierre', dob: '1994-09-12' });
    expect(draftDob(exact)).toBe('1994-09-12');
    expect(draftAgeYears(exact, TODAY)).toBe(31);
    expect(draftAgeLabel(exact, TODAY)).toBe('31 years');
  });

  it('never overclaims identity in the downstream context (spec §10)', () => {
    const context = temporaryPatientContext(
      draft({ name: 'Pierre', dob: '1994-09-12', sex: 'Female' }),
      'PROV-0001',
    );
    expect(context.heading).toBe('For Pierre');
    expect(context.meta).toBe('PROV-0001 · Provisional patient · Phone verified');
    expect(context.status).toBe('PSC will confirm identity');
  });
});

describe('unsaved-data guard (spec §3)', () => {
  it('protects typed phone, OTP digits, drafts, and reached match results', () => {
    const base = { localPhone: '', code: '', draft: EMPTY_DRAFT };
    expect(hasUnsavedEntries({ ...base, state: 'enterPhone' })).toBe(false);
    expect(hasUnsavedEntries({ ...base, state: 'enterPhone', localPhone: '09' })).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'verifyOtp', code: '1' })).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'verifyingOtp', code: '123456' })).toBe(true);
    expect(
      hasUnsavedEntries({ ...base, state: 'noMatch', draft: draft({ name: 'P' }) }),
    ).toBe(true);
    expect(
      hasUnsavedEntries({ ...base, state: 'noMatch', draft: draft({ ageYears: '32' }) }),
    ).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'knownMatch' })).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'sharedMatches' })).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'possibleDuplicates' })).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'error' })).toBe(false);
  });
});
