import { describe, expect, it } from 'vitest';

import { DEMO_BRANCH_ID, IDENTITY_REGISTRY } from './demo-data';
import {
  applyResolvedRecord,
  bookingBlockReason,
  collectionCodeStatusMeta,
  detectQueryKind,
  guardianGateBlocks,
  parseBookingQrPayload,
  resolveIdentity,
} from './logic';
import { blankWalkIn } from './demo-data';

describe('detectQueryKind', () => {
  it('classifies booking codes', () => {
    expect(detectQueryKind('GW87430')).toBe('code');
    expect(detectQueryKind('gw87430')).toBe('code');
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

describe('parseBookingQrPayload', () => {
  it('extracts the code from a QR payload', () => {
    expect(parseBookingQrPayload('kura://booking/GW87430')).toBe('GW87430');
  });

  it('returns null when no code is present', () => {
    expect(parseBookingQrPayload('hello world')).toBeNull();
  });
});

describe('resolveIdentity', () => {
  it('binds a booking code to exactly one booking', () => {
    const result = resolveIdentity('GW87430', IDENTITY_REGISTRY);
    expect(result?.kind).toBe('booking-linked');
    if (result?.kind === 'booking-linked') {
      expect(result.record.name).toBe('Sok Phearom');
      expect(result.booking.code).toBe('GW87430');
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

describe('applyResolvedRecord', () => {
  it('captures identity from the record and locks verified fields', () => {
    const record = IDENTITY_REGISTRY.find((candidate) => candidate.id === 'rec-sok-phearom')!;
    const next = applyResolvedRecord(blankWalkIn('p-1', 1), record);
    expect(next.name).toBe('Sok Phearom');
    expect(next.identity.source).toBe('existing');
    expect(next.identity.lockedFields).toContain('dob');
    expect(next.sexAtBirth).toBe('Male');
  });
});

describe('booking-code lifecycle branches', () => {
  const resolve = (code: string) =>
    resolveIdentity(code, IDENTITY_REGISTRY, { branchId: DEMO_BRANCH_ID });

  it('redeemable states resolve to booking-linked', () => {
    expect(resolve('GW87430')?.kind).toBe('booking-linked'); // scheduled
    expect(resolve('GW87431')?.kind).toBe('booking-linked'); // issued
  });

  it('blocks every canonical non-redeemable state with its reason', () => {
    const expired = resolve('GW87510');
    const redeemed = resolve('GW87511');
    const cancelled = resolve('GW87512');
    expect(expired).toMatchObject({ kind: 'booking-blocked', reason: 'expired' });
    expect(redeemed).toMatchObject({ kind: 'booking-blocked', reason: 'redeemed' });
    expect(cancelled).toMatchObject({ kind: 'booking-blocked', reason: 'cancelled' });
  });

  it('blocks a code issued for another branch even while its lifecycle is fine', () => {
    expect(resolve('GW87513')).toMatchObject({ kind: 'booking-blocked', reason: 'wrong-branch' });
    // Without desk branch context the same code stays redeemable.
    expect(resolveIdentity('GW87513', IDENTITY_REGISTRY)?.kind).toBe('booking-linked');
  });

  it('derives display meta from the canonical status only', () => {
    expect(collectionCodeStatusMeta('issued')).toEqual({ label: 'Issued', tone: 'success' });
    expect(collectionCodeStatusMeta('expired')).toEqual({ label: 'Expired', tone: 'warning' });
    expect(collectionCodeStatusMeta('redeemed')).toEqual({ label: 'Redeemed', tone: 'neutral' });
  });

  it('bookingBlockReason prefers lifecycle over branch', () => {
    const expired = IDENTITY_REGISTRY[0].bookings!.find((b) => b.code === 'GW87510')!;
    expect(bookingBlockReason(expired, 'other-branch')).toBe('expired');
  });
});
