import { MODE_REGISTRY } from './mode-registry';

/**
 * Storybook-owned capability packs for the clinic shell demo.
 *
 * Roles never authorize an action. These packs only make the existing
 * capability combinations repeatable across App Shell stories and the
 * onboarding-driven prototype app.
 */
export const SHELL_DEMO_ACCESS_PROFILES = {
  'full-clinic': {
    permissions: [
      'patient.read',
      'order.create',
      'result.review',
      'reception.check_in',
      'booking.manage',
      'payment.collect',
      'sample.collect',
      'sample.label',
      'sample.handoff',
      'vitals.record',
      'member.manage',
      'branch.manage',
      'role.manage',
      'workspace.settings.manage',
      'doctor.banking.view.self',
    ],
  },
  'solo-doctor': {
    permissions: [
      'patient.read',
      'order.create',
      'result.review',
      'doctor.banking.view.self',
    ],
  },
  'front-desk-collection': {
    permissions: [
      'reception.check_in',
      'booking.manage',
      'payment.collect',
      'sample.collect',
      'sample.label',
      'sample.handoff',
      'vitals.record',
    ],
  },
  receptionist: {
    permissions: [...MODE_REGISTRY['front-desk'].requiredAny],
  },
  phlebotomist: {
    permissions: ['sample.collect', 'sample.label', 'sample.handoff'],
  },
} as const;

export type ShellDemoAccessProfile = keyof typeof SHELL_DEMO_ACCESS_PROFILES;

export const SHELL_DEMO_MODULES: Record<string, boolean> = Object.fromEntries(
  Object.values(MODE_REGISTRY).map((definition) => [definition.moduleFlag, true]),
);

export function permissionsForDemoAccessProfile(
  profile: ShellDemoAccessProfile,
): string[] {
  return [...SHELL_DEMO_ACCESS_PROFILES[profile].permissions];
}
