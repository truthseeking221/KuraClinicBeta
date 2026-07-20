import { describe, expect, it } from 'vitest';

import { greetingForHour, isAllClear, isLiveLicence, licenceBanner, orderSignals } from './logic';
import type { HomeSignal } from './types';

function signal(overrides: Partial<HomeSignal>): HomeSignal {
  return {
    key: 'results',
    kind: 'worklist',
    title: 'New results',
    count: 0,
    detail: '',
    tone: 'neutral',
    state: 'ready',
    ...overrides,
  };
}

describe('greetingForHour', () => {
  it('maps clinic hours to the expected greeting', () => {
    expect(greetingForHour(5)).toBe('Good morning');
    expect(greetingForHour(11)).toBe('Good morning');
    expect(greetingForHour(12)).toBe('Good afternoon');
    expect(greetingForHour(17)).toBe('Good afternoon');
    expect(greetingForHour(18)).toBe('Good evening');
    expect(greetingForHour(4)).toBe('Good evening');
  });
});

describe('orderSignals', () => {
  it('pins critical first and preserves order within a tone', () => {
    const ordered = orderSignals([
      signal({ key: 'a', tone: 'neutral' }),
      signal({ key: 'b', tone: 'attention' }),
      signal({ key: 'c', tone: 'critical' }),
      signal({ key: 'd', tone: 'neutral' }),
    ]);
    expect(ordered.map((item) => item.key)).toEqual(['c', 'b', 'a', 'd']);
  });
});

describe('isAllClear', () => {
  it('is true only when every worklist signal is ready, zero, and neutral', () => {
    expect(
      isAllClear([
        signal({ key: 'results', count: 0 }),
        signal({ key: 'bookings', count: 0 }),
        signal({ key: 'pickup', kind: 'info', headline: '16:40', count: undefined }),
      ]),
    ).toBe(true);
  });

  it('is false while a worklist signal is loading or failed — never silently empty', () => {
    expect(isAllClear([signal({ state: 'loading' })])).toBe(false);
    expect(isAllClear([signal({ state: 'error' })])).toBe(false);
  });

  it('is false when work remains or when no worklist signal exists', () => {
    expect(isAllClear([signal({ count: 2 })])).toBe(false);
    expect(isAllClear([signal({ kind: 'info', count: undefined })])).toBe(false);
    expect(isAllClear([])).toBe(false);
  });
});

describe('licenceBanner', () => {
  it('renders no banner for a verified licence', () => {
    expect(licenceBanner({ state: 'verified' })).toBeNull();
  });

  it('maps every actionable contract state to an honest next step', () => {
    expect(licenceBanner({ state: 'none' })?.actionLabel).toBe('Verify now');
    expect(licenceBanner({ state: 'pending_review' })?.actionLabel).toBe('View submission');
    expect(licenceBanner({ state: 'rejected' })?.actionLabel).toBe('Verify now');
    expect(licenceBanner({ state: 'expiring' })?.actionLabel).toBe('Renew now');
    expect(licenceBanner({ state: 'in_grace' })?.actionLabel).toBe('Renew now');
    expect(licenceBanner({ state: 'lapsed' })?.actionLabel).toBe('Renew licence');
  });

  it('formats lifecycle dates deterministically', () => {
    expect(
      licenceBanner({ state: 'expiring', expiryDate: '2026-08-31' })?.title,
    ).toContain('31 August 2026');
    expect(
      licenceBanner({ state: 'in_grace', lapseDeadline: '2026-10-29' })?.title,
    ).toContain('29 October 2026');
  });
});

describe('isLiveLicence', () => {
  it('uses the backend-owned live credential set', () => {
    expect(isLiveLicence('verified')).toBe(true);
    expect(isLiveLicence('expiring')).toBe(true);
    expect(isLiveLicence('in_grace')).toBe(true);
    expect(isLiveLicence('pending_review')).toBe(false);
    expect(isLiveLicence('lapsed')).toBe(false);
  });
});
