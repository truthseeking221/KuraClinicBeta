import { describe, expect, it } from 'vitest';

import {
  initialBranchId,
  isValidEmail,
  isValidLocalPhone,
  nextAfterWorkspace,
  nextLandingIndex,
  resolveGateEntry,
  toE164,
  validateMl,
  verifyDoorCode,
  verifyWizardPhone,
  wizardStepsFor,
  wizardStepViews,
} from './logic';
import {
  DEMO_ACCOUNTS,
  DEMO_BRANCHES,
  DEMO_ONBOARDING_SCENARIOS,
  DEMO_OTP,
  DEMO_PHONE_REGISTRY,
  DEMO_WORKSPACES,
} from './demo-data';

describe('identifiers', () => {
  it('normalizes to E.164, stripping formatting and one leading zero', () => {
    expect(toE164('+855', '012 777 088')).toBe('+85512777088');
    expect(toE164('+84', '098-111-222')).toBe('+8498111222');
  });

  it('validates local phones on an 8-digit minimum', () => {
    expect(isValidLocalPhone('12777088')).toBe(true);
    expect(isValidLocalPhone('1277')).toBe(false);
  });

  it('validates email shape', () => {
    expect(isValidEmail('dara@mekong.clinic')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
  });
});

describe('door verify', () => {
  it('keeps every scenario phone unique and covers the full licence lifecycle', () => {
    const phones = DEMO_ONBOARDING_SCENARIOS.map((scenario) => scenario.phone);
    expect(new Set(phones).size).toBe(phones.length);
    expect(
      DEMO_ONBOARDING_SCENARIOS.flatMap((scenario) =>
        scenario.licence ? [scenario.licence] : [],
      ),
    ).toEqual(
      expect.arrayContaining([
        'none',
        'pending_review',
        'rejected',
        'verified',
        'expiring',
        'in_grace',
        'lapsed',
      ]),
    );
  });

  it('routes unknown identifiers to the wizard — sign-in is sign-up', () => {
    expect(
      verifyDoorCode('+85598111222', DEMO_OTP, DEMO_OTP, DEMO_ACCOUNTS),
    ).toEqual({
      kind: 'success',
      route: 'wizard',
    });
  });

  it('routes known members to workspace entry', () => {
    expect(
      verifyDoorCode('+85512777088', DEMO_OTP, DEMO_OTP, DEMO_ACCOUNTS),
    ).toEqual({
      kind: 'success',
      route: 'workspace',
    });
  });

  it('blocks revoked accounts and rejects wrong codes first', () => {
    expect(
      verifyDoorCode('+85512000666', DEMO_OTP, DEMO_OTP, DEMO_ACCOUNTS),
    ).toEqual({
      kind: 'revoked',
    });
    expect(
      verifyDoorCode('+85512000666', '000000', DEMO_OTP, DEMO_ACCOUNTS),
    ).toEqual({
      kind: 'invalid-code',
    });
  });
});

describe('wizard steps', () => {
  it('gives invitees Name → Phone only', () => {
    expect(wizardStepsFor({ isInvitee: true, phoneVerified: false })).toEqual([
      'name',
      'phone',
    ]);
    expect(wizardStepsFor({ isInvitee: false, phoneVerified: false })).toEqual([
      'name',
      'phone',
      'clinic',
      'ml',
    ]);
  });

  it('omits facts an existing invitee account already has', () => {
    expect(
      wizardStepsFor({
        existingName: 'Dr. Dara Phan',
        isInvitee: true,
        phoneVerified: false,
      }),
    ).toEqual(['phone']);
    expect(
      wizardStepsFor({
        existingName: 'Dr. Dara Phan',
        isInvitee: true,
        phoneVerified: true,
        verifiedPhone: '+85512777088',
      }),
    ).toEqual([]);
  });

  it('never re-asks a verified phone', () => {
    const steps = ['name', 'phone', 'clinic', 'ml'] as const;
    expect(nextLandingIndex(steps, 1, true)).toBe(2);
    expect(nextLandingIndex(steps, 1, false)).toBe(1);
    expect(nextLandingIndex(['name', 'phone'], 1, true)).toBe('done');
  });

  it('marks skippable product steps distinctly from completed steps', () => {
    const views = wizardStepViews(['name', 'phone', 'clinic', 'ml'], 3, [
      'clinic',
    ]);
    expect(views[2].status).toBe('skipped');
    expect(views[0].status).toBe('done');
    expect(views[3].status).toBe('active');
  });
});

describe('wizard phone attach', () => {
  it('covers attach, in-use, blocked, and invalid-code outcomes without merging', () => {
    expect(
      verifyWizardPhone(
        '+85598111222',
        DEMO_OTP,
        DEMO_OTP,
        DEMO_PHONE_REGISTRY,
      ),
    ).toBe('ATTACHED');
    expect(
      verifyWizardPhone(
        '+85599000001',
        DEMO_OTP,
        DEMO_OTP,
        DEMO_PHONE_REGISTRY,
      ),
    ).toBe('PHONE_IN_USE_CONFLICT');
    expect(
      verifyWizardPhone(
        '+85599000002',
        DEMO_OTP,
        DEMO_OTP,
        DEMO_PHONE_REGISTRY,
      ),
    ).toBe('PHONE_IN_USE_CONFLICT');
    expect(
      verifyWizardPhone(
        '+85599000009',
        DEMO_OTP,
        DEMO_OTP,
        DEMO_PHONE_REGISTRY,
      ),
    ).toBe('ACCOUNT_BLOCKED');
    expect(
      verifyWizardPhone('+85598111222', '9', DEMO_OTP, DEMO_PHONE_REGISTRY),
    ).toBe('INVALID_CODE');
  });

  it('requires an uploaded licence when the declaration is yes', () => {
    expect(validateMl(null, null, 0)).toMatch(/Answer the licence question/);
    expect(validateMl('yes', null, 0)).toMatch(/Select your profession/);
    expect(validateMl('yes', 'doctor', 0)).toMatch(/Upload a licence document/);
    expect(validateMl('yes', 'doctor', 1)).toBeNull();
    expect(validateMl('no', null, 0)).toBeNull();
  });
});

describe('workspace gate', () => {
  it('resolves create / auto / list by workspace count', () => {
    expect(resolveGateEntry([], null)).toEqual({ kind: 'create' });
    expect(resolveGateEntry([DEMO_WORKSPACES[0]], null)).toEqual({
      kind: 'auto',
      workspace: DEMO_WORKSPACES[0],
    });
    expect(resolveGateEntry(DEMO_WORKSPACES, 'ws-sunrise')).toEqual({
      kind: 'list',
      lastActiveId: 'ws-sunrise',
    });
    expect(resolveGateEntry(DEMO_WORKSPACES, 'ws-gone')).toEqual({
      kind: 'list',
      lastActiveId: null,
    });
  });

  it('shows branches only when the workspace enables them', () => {
    expect(nextAfterWorkspace(DEMO_WORKSPACES[0])).toBe('branches');
    expect(nextAfterWorkspace(DEMO_WORKSPACES[1])).toBe('enter');
  });

  it('preselects last-active branch, then the default', () => {
    expect(initialBranchId(DEMO_BRANCHES, 'br-north')).toBe('br-north');
    expect(initialBranchId(DEMO_BRANCHES, null)).toBe('br-main');
    expect(initialBranchId([], null)).toBeNull();
  });
});
