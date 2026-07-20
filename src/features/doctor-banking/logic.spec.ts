import { describe, expect, it } from 'vitest';

import {
  balanceDirection,
  filterLedgerEntries,
  recentLedgerEntries,
  splitSignedUsdMinorForDisplay,
} from './logic';
import { activityEntries } from './demo-data';

describe('doctor banking contract logic', () => {
  it('splits signed values before MoneyText and protects int64 minimum', () => {
    expect(splitSignedUsdMinorForDisplay('-5000')).toEqual({
      kind: 'money',
      sign: '-',
      magnitude: '5000',
    });
    expect(splitSignedUsdMinorForDisplay('-9223372036854775808')).toEqual({
      kind: 'unavailable',
      text: 'Amount unavailable',
    });
  });

  it('maps ledger direction without treating positive as debt', () => {
    expect(balanceDirection('-5000')).toBe('doctor-owes');
    expect(balanceDirection('0')).toBe('settled');
    expect(balanceDirection('5000')).toBe('kura-owes');
  });

  it('returns newest entries first regardless of input order', () => {
    const shuffled = [...activityEntries].reverse();
    const recent = recentLedgerEntries(shuffled, 6);
    expect(recent).toHaveLength(6);
    expect(recent[0].occurredAt).toBe('2026-07-18T04:12:00.000Z');
    expect([...recent].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))).toEqual(recent);
    expect(shuffled[0]).toBe(activityEntries.at(-1));
  });

  it('applies domain filters without mutating fixtures', () => {
    const pending = filterLedgerEntries(activityEntries, {
      query: '',
      state: 'pending',
    });
    expect(pending.every((entry) => entry.state === 'pending')).toBe(true);
    expect(activityEntries).toHaveLength(9);
  });
});
