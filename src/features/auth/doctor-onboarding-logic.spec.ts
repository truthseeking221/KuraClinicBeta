import { describe, expect, it } from 'vitest';

import {
  deriveDoctorOnboardingReadiness,
  type DoctorOnboardingSnapshot,
} from './doctor-onboarding-logic';

const BASE: DoctorOnboardingSnapshot = {
  session: 'active',
  phone: 'verified',
  workspace: 'active',
  membership: 'active',
  branch: 'not_required',
  orderCapability: 'granted',
  declaration: 'medical',
  licence: 'none',
  attributedPrescriber: 'self',
  banking: 'not_eligible',
};

function decision(overrides: Partial<DoctorOnboardingSnapshot> = {}) {
  return deriveDoctorOnboardingReadiness({ ...BASE, ...overrides });
}

describe('doctor onboarding readiness', () => {
  it('keeps catalog and prices available while a self-attributed order waits for licence approval', () => {
    const result = decision();
    expect(result.canOpenCatalog).toBe(true);
    expect(result.canStartClinicOrder).toBe(false);
    expect(result.capabilities.find((item) => item.id === 'prices')).toMatchObject({
      state: 'available',
    });
    expect(result.primaryAction.kind).toBe('submit_licence');
  });

  it.each(['verified', 'expiring', 'in_grace'] as const)(
    'treats %s as live for new professional attribution',
    (licence) => {
      const result = decision({
        licence,
        banking: 'optional_unlinked',
      });
      expect(result.canStartClinicOrder).toBe(true);
      expect(result.capabilities.find((item) => item.id === 'clinic_order')).toMatchObject({
        state: 'available',
      });
    },
  );

  it.each(['none', 'pending_review', 'rejected', 'lapsed'] as const)(
    'blocks self-attributed placement for non-live state %s',
    (licence) => {
      expect(decision({ licence }).canStartClinicOrder).toBe(false);
    },
  );

  it('does not let licence verification fill a missing branch or capability gate', () => {
    expect(
      decision({
        licence: 'verified',
        branch: 'denied',
        banking: 'optional_unlinked',
      }).canStartClinicOrder,
    ).toBe(false);
    expect(
      decision({
        licence: 'verified',
        orderCapability: 'missing',
        banking: 'optional_unlinked',
      }).canStartClinicOrder,
    ).toBe(false);
  });

  it('allows a capable member to use another live attributed prescriber while their own licence is pending', () => {
    const result = decision({
      licence: 'pending_review',
      attributedPrescriber: 'other_live_member',
      banking: 'not_eligible',
    });
    expect(result.canStartClinicOrder).toBe(true);
    expect(result.status).toBe('ready');
    expect(result.title).toMatch(/delegated attribution/i);
  });

  it('keeps optional auto-pay separate from professional onboarding', () => {
    const unlinked = decision({
      licence: 'verified',
      banking: 'optional_unlinked',
    });
    expect(unlinked.canStartClinicOrder).toBe(true);
    expect(unlinked.capabilities.find((item) => item.id === 'doctor_banking')).toMatchObject({
      state: 'optional',
    });
  });

  it('blocks only the current order when the financial gate needs action', () => {
    const result = decision({
      licence: 'verified',
      banking: 'self_action_required',
    });
    expect(result.canOpenCatalog).toBe(true);
    expect(result.canStartClinicOrder).toBe(false);
    expect(result.primaryAction.kind).toBe('resolve_banking');
  });

  it('hides private recovery behind a prescriber-action-only delegated state', () => {
    const result = decision({
      declaration: 'non_medical',
      licence: 'none',
      attributedPrescriber: 'other_live_member',
      banking: 'delegated_action_required',
    });
    expect(result.canOpenDoctorBanking).toBe(false);
    expect(result.primaryAction.kind).toBe('request_prescriber_action');
    expect(result.description).not.toMatch(/balance|mandate|account/i);
  });

  it('fails closed when declaration and credential facts conflict', () => {
    const result = decision({
      declaration: 'non_medical',
      licence: 'verified',
      banking: 'linked',
    });
    expect(result.invariantIssues).not.toHaveLength(0);
    expect(result.canOpenCatalog).toBe(false);
    expect(result.canStartClinicOrder).toBe(false);
    expect(result.primaryAction.kind).toBe('refresh_status');
  });
});
