import { describe, expect, it } from 'vitest';

import {
  countByAssurance,
  displayNameOf,
  filterByAssurance,
  formatAgeSex,
  initialsOf,
  rowLabelOf,
  statusViewOf,
} from './logic';
import type { PatientSummary } from './types';

function patient(overrides: Partial<PatientSummary> = {}): PatientSummary {
  return {
    userId: 'u-1',
    displayName: 'Sok Nimol',
    sexAtBirth: 'F',
    age: 52,
    hasAge: true,
    mrnMasked: '··42',
    phoneMasked: '+85*****4778',
    assurance: 'verified',
    status: '',
    ...overrides,
  };
}

describe('formatAgeSex', () => {
  it('renders age and sex', () => {
    expect(formatAgeSex(patient())).toBe('52 · F');
  });

  it('renders sex alone when age is unknown', () => {
    expect(formatAgeSex(patient({ hasAge: false, age: 0 }))).toBe('F');
  });

  it('renders age alone when sex is Unknown', () => {
    expect(formatAgeSex(patient({ sexAtBirth: 'Unknown' }))).toBe('52');
  });

  it('renders nothing when neither is known', () => {
    expect(formatAgeSex(patient({ hasAge: false, age: 0, sexAtBirth: 'Unknown' }))).toBe('');
  });
});

describe('displayNameOf / initialsOf', () => {
  it('substitutes shredded names honestly', () => {
    const shredded = patient({ displayName: '', shredded: true });
    expect(displayNameOf(shredded)).toBe('Name unavailable');
    expect(initialsOf(shredded)).toBe('·');
  });

  it('builds two-letter initials', () => {
    expect(initialsOf(patient())).toBe('SN');
    expect(initialsOf(patient({ displayName: 'Sok' }))).toBe('S');
  });
});

describe('statusViewOf', () => {
  it('terminal states outrank assurance', () => {
    expect(statusViewOf(patient({ status: 'deceased', assurance: 'verified' }))).toEqual({
      kind: 'terminal',
      status: 'deceased',
      label: 'Deceased',
    });
    expect(statusViewOf(patient({ status: 'merged' })).label).toBe('Merged');
  });

  it('falls back to the two-value assurance axis', () => {
    expect(statusViewOf(patient()).label).toBe('Verified');
    expect(statusViewOf(patient({ assurance: 'unverified' })).label).toBe('Unverified');
  });
});

describe('filterByAssurance / countByAssurance', () => {
  const roster = [
    patient({ userId: 'a', assurance: 'verified' }),
    patient({ userId: 'b', assurance: 'unverified' }),
    patient({ userId: 'c', assurance: 'unverified' }),
    patient({ userId: 'd', assurance: 'verified', status: 'deceased' }),
  ];

  it('keeps terminal records visible in every filter view', () => {
    expect(filterByAssurance(roster, 'all')).toHaveLength(4);
    // Terminal rows are excluded from assurance buckets, not re-labelled.
    expect(filterByAssurance(roster, 'verified').map((p) => p.userId)).toEqual(['a']);
    expect(filterByAssurance(roster, 'unverified').map((p) => p.userId)).toEqual(['b', 'c']);
  });

  it('counts assurance buckets without terminal records', () => {
    expect(countByAssurance(roster)).toEqual({ all: 4, unverified: 2, verified: 1 });
  });

  it('preserves server order (most recent first) instead of re-sorting', () => {
    expect(filterByAssurance(roster, 'all').map((p) => p.userId)).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('rowLabelOf', () => {
  it('summarises the row for assistive tech', () => {
    expect(rowLabelOf(patient(), 'Results to review')).toBe(
      'Open Sok Nimol. 52 · F. Verified. Results to review',
    );
  });

  it('omits unknown parts instead of announcing placeholders', () => {
    expect(rowLabelOf(patient({ hasAge: false, age: 0, sexAtBirth: 'Unknown' }))).toBe(
      'Open Sok Nimol. Verified',
    );
  });
});
