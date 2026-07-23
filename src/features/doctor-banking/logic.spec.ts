import { describe, expect, it } from 'vitest';

import {
  balanceDirection,
  balanceHeadline,
  earnedSinceMonthStart,
  earningsMonthLabel,
  filterLedgerEntries,
  floorBreached,
  mandateCapabilities,
  nextCollectionStep,
  recentLedgerEntries,
  splitSignedUsdMinorForDisplay,
  statementRangeError,
} from './logic';
import {
  activityEntries,
  failedPullNotification,
  greenOverview,
  licenceLapsedOverview,
  noticeClearedOverview,
  noticeReducedOverview,
  notRetryableNotification,
  PERIOD_START,
  redOverview,
  retriesExhaustedNotification,
  sweepScheduledOverview,
  unavailableOverview,
  unlinkedRedOverview,
  zeroOverview,
} from './demo-data';
import type { LedgerEntryKind } from './types';

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

  it('says who owes whom in words, so colour is never the only signal', () => {
    expect(balanceHeadline('doctor-owes')).toBe('You owe Kura');
    expect(balanceHeadline('kura-owes')).toBe('Kura owes you');
    expect(balanceHeadline('settled')).toBe("You're settled");
    expect(balanceHeadline('unavailable')).toBe('Amount unavailable');
  });

  it('returns newest entries first regardless of input order', () => {
    const shuffled = [...activityEntries].reverse();
    const recent = recentLedgerEntries(shuffled, 6);
    expect(recent).toHaveLength(6);
    expect(recent[0].occurredAt).toBe('2026-07-21T03:40:00.000Z');
    expect([...recent].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))).toEqual(recent);
    expect(shuffled[0]).toBe(activityEntries.at(-1));
  });

  it('applies domain filters without mutating fixtures', () => {
    const pending = filterLedgerEntries(activityEntries, { query: '', state: 'pending' });
    expect(pending.every((entry) => entry.state === 'pending')).toBe(true);
    expect(activityEntries).toHaveLength(16);
  });

  it('can filter every one of the eleven contract kinds', () => {
    const kinds: LedgerEntryKind[] = [
      'pending_debit',
      'pending_credit',
      'completion_debit',
      'completion_credit',
      'pending_adjustment',
      'pending_void',
      'physical_settlement_offset',
      'khqr_credit',
      'aba_pull_credit',
      'connect_credit',
      'admin_adjustment',
    ];
    for (const kind of kinds) {
      expect(filterLedgerEntries(activityEntries, { query: '', kind }).length).toBeGreaterThan(0);
    }
  });

  it('counts only settled completion credit inside the month as earned', () => {
    // $363.50: five settled doctor shares dated in July. June is excluded, and
    // so are pending credit, the laboratory debit, and the first-link credit.
    // The duplicate share on ORD-2760 still counts here because the backend sums
    // settled completion credit; its reversal lands on the balance, not on
    // earnings.
    expect(earnedSinceMonthStart(activityEntries, PERIOD_START)).toEqual({
      minor: '36350',
      currency: 'USD',
    });
    expect(greenOverview.earnedThisMonth.minor).toBe('36350');
    expect(earningsMonthLabel(PERIOD_START)).toBe('July');
  });

  it('names one next step for every balance and collection state', () => {
    expect(nextCollectionStep(greenOverview).kind).toBe('credit_held');
    expect(nextCollectionStep(zeroOverview).kind).toBe('nothing_due');
    expect(nextCollectionStep(unavailableOverview).kind).toBe('unavailable');
    expect(nextCollectionStep(sweepScheduledOverview).kind).toBe('sweep_scheduled');
    expect(nextCollectionStep(redOverview).kind).toBe('notice_sent');
    expect(nextCollectionStep(noticeReducedOverview).kind).toBe('notice_reduced');
    expect(nextCollectionStep(noticeClearedOverview).kind).toBe('notice_cleared');
    expect(nextCollectionStep(unlinkedRedOverview).kind).toBe('settle_manually');
  });

  it('lets a failed collection override the schedule', () => {
    expect(nextCollectionStep(redOverview, [failedPullNotification])).toMatchObject({
      kind: 'retry_pending',
      retryDate: '2026-07-17',
      retrySlot: 2,
    });
    expect(nextCollectionStep(redOverview, [notRetryableNotification]).kind).toBe('retry_expired');
    expect(nextCollectionStep(redOverview, [retriesExhaustedNotification]).kind).toBe(
      'retries_exhausted',
    );
  });

  it('keeps unlink available to a lapsed licence but blocks a new link', () => {
    expect(mandateCapabilities('linked', 'lapsed')).toMatchObject({
      canLink: false,
      canUnlink: true,
    });
    expect(mandateCapabilities('unlinked', 'lapsed')).toMatchObject({
      canLink: false,
      linkBlockedByLicence: true,
    });
    expect(mandateCapabilities('unlinked', 'verified').canLink).toBe(true);
    // Frozen pauses collection, it never traps the authorization.
    expect(mandateCapabilities('frozen', 'verified').canUnlink).toBe(true);
    expect(licenceLapsedOverview.licence).toBe('lapsed');
  });

  it('flags the ordering floor only once the projection reaches it', () => {
    expect(floorBreached(greenOverview)).toBe(false);
    expect(
      floorBreached({ ...greenOverview, exposure: { minor: '-5000', currency: 'USD' } }),
    ).toBe(true);
  });

  it('refuses a backwards statement range instead of exporting nothing', () => {
    expect(statementRangeError({ query: '', from: '2026-07-20', to: '2026-07-02' })).toBe(
      'range-backwards',
    );
    expect(statementRangeError({ query: '', from: '2026-07-02', to: '2026-07-20' })).toBeNull();
  });
});
