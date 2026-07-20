import { describe, expect, it } from 'vitest';

import {
  VERIFICATION_BANNERS,
  VERIFICATION_META,
  applyHoursPreset,
  chipAddError,
  courierPickupError,
  daysUntil,
  formatCourierPickup,
  formatHours,
  hoursError,
  inviteError,
  labelTime,
  requiredError,
} from './logic';
import type { WeekHours } from './logic';
import { DEFAULT_COURIER_PICKUP, DEFAULT_HOURS, MEMBERS, PENDING_INVITES } from './demo-data';

describe('professional credential lifecycle', () => {
  it('covers the canonical seven credential states without a synthetic access tier', () => {
    expect(Object.keys(VERIFICATION_META)).toEqual([
      'none',
      'pending_review',
      'rejected',
      'verified',
      'expiring',
      'in_grace',
      'lapsed',
    ]);
    expect(VERIFICATION_BANNERS).not.toHaveProperty('verified');
    expect(VERIFICATION_BANNERS.lapsed.body).toContain(
      'Previously placed episodes are not revoked retroactively.',
    );
  });
});

describe('daysUntil', () => {
  it('counts whole days between ICT dates', () => {
    expect(daysUntil('2026-07-20', '2026-06-22')).toBe(28);
  });

  it('floors past dates at zero', () => {
    expect(daysUntil('2026-06-01', '2026-06-22')).toBe(0);
  });
});

describe('requiredError', () => {
  it('rejects blank drafts with the field label', () => {
    expect(requiredError('Bio', '   ')).toBe('Bio is required.');
    expect(requiredError('Bio', 'text')).toBeNull();
  });
});

describe('chipAddError', () => {
  it('requires a value and rejects case-insensitive duplicates', () => {
    expect(chipAddError('Languages', '', ['English'])).toBe('Languages is required.');
    expect(chipAddError('Languages', 'english', ['English'])).toBe(
      'english is already listed.',
    );
    expect(chipAddError('Languages', 'French', ['English'])).toBeNull();
  });
});

describe('courier pickup', () => {
  it('formats route, days, and time', () => {
    expect(formatCourierPickup(DEFAULT_COURIER_PICKUP)).toBe(
      'Route PP-04 · Mon / Wed / Fri · 16:00 pickup',
    );
  });

  it('requires at least one pickup day', () => {
    expect(courierPickupError({ ...DEFAULT_COURIER_PICKUP, days: [] })).toBe(
      'Select at least one pickup day.',
    );
    expect(courierPickupError(DEFAULT_COURIER_PICKUP)).toBeNull();
  });
});

describe('directory hours', () => {
  it('collapses same-window runs and drops closed days', () => {
    expect(formatHours(DEFAULT_HOURS)).toBe('Mon to Sat · 8:00 to 17:30');
  });

  it('splits runs when a window changes', () => {
    const week: WeekHours = {
      ...DEFAULT_HOURS,
      Sat: { open: true, from: '08:00', to: '12:00' },
    };
    expect(formatHours(week)).toBe('Mon to Fri · 8:00 to 17:30, Sat · 8:00 to 12:00');
  });

  it('reads Closed when nothing is open', () => {
    const closed = applyHoursPreset('weekdays', DEFAULT_HOURS);
    const week = Object.fromEntries(
      Object.entries(closed).map(([day, hours]) => [day, { ...hours, open: false }]),
    ) as WeekHours;
    expect(formatHours(week)).toBe('Closed');
  });

  it('rejects an open day that closes before it opens', () => {
    const week: WeekHours = {
      ...DEFAULT_HOURS,
      Mon: { open: true, from: '17:30', to: '08:00' },
    };
    expect(hoursError(week)).toBe('Closing time must be after opening time.');
    expect(hoursError(DEFAULT_HOURS)).toBeNull();
  });

  it('applies presets', () => {
    const weekdays = applyHoursPreset('weekdays', DEFAULT_HOURS);
    expect(weekdays.Sat.open).toBe(false);
    expect(weekdays.Fri).toEqual({ open: true, from: '08:00', to: '17:30' });
    const monToSat = applyHoursPreset('monToSat', weekdays);
    expect(monToSat.Sat.open).toBe(true);
    expect(applyHoursPreset('custom', weekdays)).toEqual(weekdays);
  });

  it('drops leading zeros in time labels', () => {
    expect(labelTime('08:00')).toBe('8:00');
    expect(labelTime('17:30')).toBe('17:30');
  });
});

describe('inviteError', () => {
  it('requires a name', () => {
    expect(inviteError('  ', MEMBERS, PENDING_INVITES)).toBe('Member name is required.');
  });

  it('rejects names already in the workspace, including pending invites', () => {
    expect(inviteError('sophea lim', MEMBERS, PENDING_INVITES)).toBe(
      'sophea lim is already in this workspace.',
    );
    expect(inviteError('Visal Nuon', MEMBERS, PENDING_INVITES)).toBe(
      'Visal Nuon is already in this workspace.',
    );
  });

  it('accepts a new name', () => {
    expect(inviteError('Chan Dara', MEMBERS, PENDING_INVITES)).toBeNull();
  });
});
