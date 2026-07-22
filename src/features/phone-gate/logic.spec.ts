import { describe, expect, it } from 'vitest';

import {
  draftPatientErrors,
  EMPTY_DRAFT,
  hasUnsavedEntries,
  isValidKhLocalPhone,
  maskPhoneForOtp,
  stateAfterLookup,
  temporaryPatientContext,
  verifyGateOtp,
} from './logic';
import { demoLookup, demoRateLimited } from './demo-data';

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

describe('temporary patient gate', () => {
  it('reports every missing field on the control that is missing (spec §8/§9)', () => {
    expect(draftPatientErrors(EMPTY_DRAFT)).toEqual({
      name: 'Enter the full name.',
      dobOrAge: 'Enter a date of birth or estimated age.',
      sex: 'Select a sex.',
    });
    expect(draftPatientErrors({ name: 'Pierre', dobOrAge: '', sex: 'Female' })).toEqual({
      dobOrAge: 'Enter a date of birth or estimated age.',
    });
    expect(draftPatientErrors({ name: 'Pierre', dobOrAge: '32', sex: null })).toEqual({
      sex: 'Select a sex.',
    });
    expect(draftPatientErrors({ name: 'Pierre', dobOrAge: '32', sex: 'Female' })).toEqual({});
  });

  it('never overclaims identity in the downstream context (spec §10)', () => {
    const context = temporaryPatientContext(
      { name: 'Pierre', dobOrAge: '32', sex: 'Female' },
      'PROV-0001',
    );
    expect(context.heading).toBe('For Pierre');
    expect(context.meta).toBe('PROV-0001 · Provisional patient · Phone checked');
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
      hasUnsavedEntries({
        ...base,
        state: 'noMatch',
        draft: { name: 'P', dobOrAge: '', sex: null },
      }),
    ).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'knownMatch' })).toBe(true);
    expect(hasUnsavedEntries({ ...base, state: 'sharedMatches' })).toBe(true);
  });
});
