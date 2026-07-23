import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Door } from './door';
import {
  DEMO_DOOR_HINT,
  DEMO_ONBOARDING_SCENARIOS,
  DEMO_OTP,
} from './demo-data';
import { READINESS } from '../../components/foundations/readiness-data';

const DEMO_PHONE_CATALOG = [
  '### Onboarding-driven app scenarios',
  '',
  `Every registered phone uses OTP \`${DEMO_OTP}\`, enters through this Door, and opens only an existing app route backed by the named Storybook state.`,
  '',
  '| Phone | Actor | Access | Scenario | Entry | Journey evidence | Storybook source |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  ...DEMO_ONBOARDING_SCENARIOS.map(
    (scenario) =>
      `| \`${scenario.phone}\` | ${scenario.actor ?? 'doctor'} | ${scenario.accessProfile ?? 'full-clinic'} | ${scenario.label} | \`${scenario.entryPath}\` | ${scenario.journeyIds.join(', ')} | ${scenario.source} |`,
  ),
].join('\n');

const meta = {
  title: 'Clinic/Auth/Door',
  component: Door,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.auth,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/auth',
        evidence:
          'Flow ported from kura-platform auth-mf door-flow.ts (S1 method entry + S2 OTP verify). ReUI auth blocks (auth-17/auth-20) surveyed as layout references only — password-based patterns rejected: the Kura door is OTP-first with sign-in = sign-up. Composed from Card, PhoneInput, Input, Button, OtpInput, and Alert.',
        exclusions: [
          'Passwords, magic links, and third-party OAuth (Kura door uses phone or email OTP)',
          'Clerk/ticket wiring and production identity-provider redirects (prototype boundary)',
        ],
      },
      journeys: [
        'clinic-door-sign-in',
        'clinic-door-sign-up',
        'clinic-door-revoked',
      ],
    },
    docs: {
      description: {
        component: `One door: sign-in IS sign-up. Phone OTP is primary and email OTP is the alternate. Requesting a code never reveals whether the identifier exists (anti-enumeration); revoked accounts are blocked on every method. Any unregistered identifier is a fresh sign-up routed to the wizard.\n\n${DEMO_PHONE_CATALOG}`,
      },
    },
  },
  args: { onRouted: fn() },
} satisfies Meta<typeof Door>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Phone-first form with email available as a progressive alternate. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Sign in to Kura' }),
    ).toBeVisible();
    await expect(
      canvas.getByText('New here? Verify your code to create an account.'),
    ).toBeVisible();
    await expect(canvas.getByLabelText(/Phone number/)).toBeVisible();
    await expect(
      canvas.queryByRole('complementary', { name: 'Demo access' }),
    ).not.toBeInTheDocument();
    const emailAlternate = canvas.getByRole('button', {
      name: 'Use email instead',
    });
    await expect(emailAlternate).toBeVisible();
    await expect(
      emailAlternate.querySelector('[data-kura-icon="mail"]'),
    ).toBeVisible();
    await expect(canvas.queryByRole('radiogroup')).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: /Google/ }),
    ).not.toBeInTheDocument();
  },
};

/** Storybook-only credentials stay available without cluttering the product-default Door. */
export const DemoAccess: Story = {
  args: { demoHint: DEMO_DOOR_HINT },
  parameters: {
    docs: {
      description: {
        story:
          'A Storybook-only verification fixture. Production callers leave `demoHint` unset, and the canonical Default story mirrors that clean product surface.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const demoAccess = canvas.getByRole('complementary', {
      name: 'Demo access',
    });
    const demoHint = within(demoAccess);
    await expect(demoHint.getByText('111111')).toBeVisible();
    await expect(demoHint.getByText('098 111 222')).toBeVisible();
    await expect(demoHint.getByText('098 117 001')).toBeVisible();
    await expect(demoHint.getByText('098 118 001')).toBeVisible();
    await expect(demoHint.getByText('098 119 001')).toBeVisible();
  },
};

/** Switching methods preserves work and moves focus to the newly revealed field. */
export const MethodSwitchPreservesInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const phoneInput = canvas.getByLabelText(/Phone number/);
    await userEvent.type(phoneInput, '98111222');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Use email instead' }),
    );
    const emailInput = await canvas.findByRole('textbox', { name: 'Email' });
    await expect(emailInput).toHaveFocus();
    await userEvent.type(emailInput, 'doctor@clinic.example');

    const phoneAlternate = canvas.getByRole('button', {
      name: 'Use phone instead',
    });
    await expect(
      phoneAlternate.querySelector('[data-kura-icon="mobile-device"]'),
    ).toBeVisible();
    await userEvent.click(phoneAlternate);
    const restoredPhone = await canvas.findByLabelText(/Phone number/);
    await expect(restoredPhone).toHaveFocus();
    await expect(restoredPhone).toHaveValue('098 111 222');
  },
};

/** New identifier: verify routes into the onboarding wizard (sign-up path). */
export const NewAccountToWizard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await expect(await canvas.findByText(/\+85598111222/)).toBeVisible();

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );
    await waitFor(() =>
      expect(args.onRouted).toHaveBeenCalledWith('wizard', '+85598111222'),
    );
  },
};

/** Known member: same door, routed to workspace entry instead. */
export const ReturningMember: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12777088');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );
    await waitFor(() =>
      expect(args.onRouted).toHaveBeenCalledWith('workspace', '+85512777088'),
    );
  },
};

/** Wrong code: announced error, no disclosure about the identifier. */
export const InvalidCode: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      '000000',
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );
    await expect(await canvas.findByRole('alert')).toHaveTextContent(
      /incorrect or expired/i,
    );
    await expect(args.onRouted).not.toHaveBeenCalled();
  },
};

/** Revoked account: blocked after verify, on every method. */
export const RevokedAccount: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12000666');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );
    await expect(
      await canvas.findByText('This account has been disabled'),
    ).toBeVisible();
    await expect(args.onRouted).not.toHaveBeenCalled();
  },
};

/** Email method: same machine, different identifier shape. */
export const EmailMethod: Story = {
  args: { initialMethod: 'email' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Email' }),
      'not-an-email',
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send email code' }),
    );
    await expect(
      await canvas.findByText('Enter a valid email address.'),
    ).toBeVisible();
  },
};

/** Route-level throttle surfaces without leaking identifier existence. */
export const Throttled: Story = {
  args: { onRequestCode: () => 'throttled' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await expect(await canvas.findByText(/Too many attempts/)).toBeVisible();
  },
};

/** Narrow viewport: country + phone stack, targets stay comfortable. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
