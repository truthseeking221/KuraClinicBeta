import { describe, expect, it } from 'vitest';

import { DEMO_BRANCH_ID, IDENTITY_REGISTRY } from './demo-data';
import {
  resolvedRecordPatch,
  bookingBlockReason,
  collectionCodeStatusMeta,
  detectQueryKind,
  guardianGateBlocks,
  identityAnswersMatch,
  identityConfirmationRequired,
  readBookingQr,
  checkInGate,
  resolveIdentity,
} from './logic';
import { blankWalkIn } from './demo-data';

describe('detectQueryKind', () => {
  it('classifies collection codes in the platform shape', () => {
    expect(detectQueryKind('PSC-A82Q7K3M')).toBe('code');
    expect(detectQueryKind('psc-a82q7k3m')).toBe('code');
  });

  it('rejects code-shaped strings outside the contract', () => {
    expect(detectQueryKind('GW87430')).toBe('name');
    expect(detectQueryKind('PSC-A82Q7K3')).toBe('name');
  });

  it('classifies phones (8+ digits, separators allowed)', () => {
    expect(detectQueryKind('093 123 8123')).toBe('phone');
    expect(detectQueryKind('0931238123')).toBe('phone');
  });

  it('falls back to name, and null on empty', () => {
    expect(detectQueryKind('Sok')).toBe('name');
    expect(detectQueryKind('  ')).toBeNull();
    expect(detectQueryKind('093')).toBe('name');
  });
});

describe('readBookingQr', () => {
  it('reads the code behind the canonical prefix', () => {
    expect(readBookingQr('kura://booking/PSC-A82Q7K3M')).toEqual({
      kind: 'code',
      code: 'PSC-A82Q7K3M',
    });
  });

  it('reports a scan still arriving from the desk scanner as partial', () => {
    expect(readBookingQr('kura://booki')).toEqual({ kind: 'partial' });
    expect(readBookingQr('kura://booking/PSC-A82')).toEqual({ kind: 'partial' });
  });

  it('never mines a code out of a payload that is not a Kura booking QR', () => {
    expect(readBookingQr('https://example.test/PSC-A82Q7K3M')).toEqual({ kind: 'foreign' });
    expect(readBookingQr('kura://booking/NOT-A-CODE!')).toEqual({ kind: 'foreign' });
  });

  it('leaves typed text alone', () => {
    expect(readBookingQr('Sok Phearom')).toBeNull();
    expect(readBookingQr('   ')).toBeNull();
  });
});

describe('patient confirmation', () => {
  const record = IDENTITY_REGISTRY.find((candidate) => candidate.id === 'rec-sok-phearom')!;
  const captured = { ...blankWalkIn('p-confirm', 4), ...resolvedRecordPatch(record) };

  it('requires confirmation for a record-led capture only', () => {
    expect(identityConfirmationRequired(captured)).toBe(true);
    expect(
      identityConfirmationRequired({ identity: { source: 'manual', lockedFields: [] } }),
    ).toBe(false);
  });

  it('matches only when every answerable question matches', () => {
    expect(identityAnswersMatch(captured, { name: 'sok  phearom', dob: '1974-03-15' })).toBe(true);
    expect(identityAnswersMatch(captured, { name: 'Sok Phearom', dob: '1974-03-16' })).toBe(false);
    expect(identityAnswersMatch(captured, { name: 'Sok Heng', dob: '1974-03-15' })).toBe(false);
  });

  it('holds the patient task until the person is confirmed', () => {
    const verified = { ...captured, otpVerified: true };
    expect(checkInGate(verified).done.patient).toBe(false);
    expect(
      checkInGate({
        ...verified,
        identityConfirmation: { method: 'open-questions', byLabel: 'Sothea Ly', atLabel: '08:33' },
      }).done.patient,
    ).toBe(true);
  });
});

describe('resolveIdentity', () => {
  it('binds a booking code to exactly one booking', () => {
    const result = resolveIdentity('PSC-A82Q7K3M', IDENTITY_REGISTRY);
    expect(result?.kind).toBe('booking-linked');
    if (result?.kind === 'booking-linked') {
      expect(result.record.name).toBe('Sok Phearom');
      expect(result.booking.code).toBe('PSC-A82Q7K3M');
    }
  });

  it('resolves a unique phone to known-here or known-elsewhere', () => {
    const here = resolveIdentity('093 123 8123', IDENTITY_REGISTRY);
    expect(here?.kind).toBe('known-here');
    const elsewhere = resolveIdentity('012 345 678', IDENTITY_REGISTRY);
    expect(elsewhere?.kind).toBe('known-elsewhere');
  });

  it('fans a shared phone out to every linked patient', () => {
    const result = resolveIdentity('087 654 3210', IDENTITY_REGISTRY);
    expect(result?.kind).toBe('shared-phone');
    if (result?.kind === 'shared-phone') {
      expect(result.records.map((record) => record.name)).toEqual(['Lina Prum', 'Baby Prum']);
    }
  });

  it('returns name candidates without auto-picking', () => {
    const result = resolveIdentity('Sok', IDENTITY_REGISTRY);
    expect(result?.kind).toBe('candidates');
    if (result?.kind === 'candidates') {
      expect(result.records.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('reports no-match with the parsed kind and query', () => {
    const result = resolveIdentity('099 999 9999', IDENTITY_REGISTRY);
    expect(result).toEqual({ kind: 'no-match', queryKind: 'phone', query: '099 999 9999' });
  });
});

describe('guardianGateBlocks', () => {
  const baby = IDENTITY_REGISTRY.find((record) => record.id === 'rec-baby-prum')!;
  const adult = IDENTITY_REGISTRY.find((record) => record.id === 'rec-lina-prum')!;

  it('blocks a selected minor until the guardian is confirmed', () => {
    expect(guardianGateBlocks(baby, false)).toBe(true);
    expect(guardianGateBlocks(baby, true)).toBe(false);
  });

  it('never blocks adults or empty selection', () => {
    expect(guardianGateBlocks(adult, false)).toBe(false);
    expect(guardianGateBlocks(null, false)).toBe(false);
  });
});

describe('resolvedRecordPatch', () => {
  it('captures identity from the record, locks verified fields, re-arms acks', () => {
    const record = IDENTITY_REGISTRY.find((candidate) => candidate.id === 'rec-sok-phearom')!;
    const next = { ...blankWalkIn('p-1', 1), ...resolvedRecordPatch(record) };
    expect(next.name).toBe('Sok Phearom');
    expect(next.identity.source).toBe('existing');
    expect(next.identity.lockedFields).toContain('dob');
    expect(next.sexAtBirth).toBe('Male');
    expect(next.phoneNumber).toBe('0931238123');
    expect(next.collisionAcked).toEqual([]);
  });
});

describe('booking-code lifecycle branches', () => {
  const resolve = (code: string) =>
    resolveIdentity(code, IDENTITY_REGISTRY, { branchId: DEMO_BRANCH_ID });

  it('redeemable states resolve to booking-linked', () => {
    expect(resolve('PSC-A82Q7K3M')?.kind).toBe('booking-linked'); // scheduled
    expect(resolve('PSC-B41M9T27')?.kind).toBe('booking-linked'); // issued
  });

  it('blocks every state that genuinely cannot be redeemed', () => {
    expect(resolve('PSC-F63R8W25')).toMatchObject({ kind: 'booking-blocked', reason: 'redeemed' });
    expect(resolve('PSC-G74T5Y36')).toMatchObject({ kind: 'booking-blocked', reason: 'cancelled' });
  });

  it('never turns an old code away: collection codes do not lapse', () => {
    // Issued nine days ago and still unused — age is not a block reason,
    // because nothing upstream ever produces an expired code.
    expect(resolve('PSC-E52N4Q18')?.kind).toBe('booking-linked');
  });

  it('blocks a code issued for another branch even while its lifecycle is fine', () => {
    expect(resolve('PSC-H85V6Z47')).toMatchObject({ kind: 'booking-blocked', reason: 'wrong-branch' });
    // Without desk branch context the same code stays redeemable.
    expect(resolveIdentity('PSC-H85V6Z47', IDENTITY_REGISTRY)?.kind).toBe('booking-linked');
  });

  it('derives display meta from the canonical status only', () => {
    expect(collectionCodeStatusMeta('issued')).toEqual({ label: 'Issued', tone: 'success' });
    expect(collectionCodeStatusMeta('expired')).toEqual({ label: 'Expired', tone: 'warning' });
    expect(collectionCodeStatusMeta('redeemed')).toEqual({ label: 'Redeemed', tone: 'neutral' });
  });

  it('bookingBlockReason prefers lifecycle over branch', () => {
    const cancelled = IDENTITY_REGISTRY[0].bookings!.find((b) => b.code === 'PSC-G74T5Y36')!;
    expect(bookingBlockReason(cancelled, 'other-branch')).toBe('cancelled');
  });
});
