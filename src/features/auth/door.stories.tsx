import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Door } from './door';
import { DEMO_OTP } from './demo-data';
import { READINESS } from '../../components/foundations/readiness-data';

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
          'Flow ported from kura-platform auth-mf door-flow.ts (S1 method entry + S2 OTP verify). ReUI auth blocks (auth-17/auth-20) surveyed as layout references only — password-based patterns rejected: the Kura door is OTP-first with sign-in = sign-up. Composed from Card, PhoneInput, Input, Button, OtpInput, IdentityProviderButton, Alert.',
        exclusions: [
          'Passwords and magic links (Kura door is OTP + Google only)',
          'Clerk/ticket wiring and real OAuth redirects (prototype boundary)',
        ],
      },
      journeys: ['clinic-door-sign-in', 'clinic-door-sign-up', 'clinic-door-revoked'],
    },
    docs: {
      description: {
        component:
          'One door: sign-in IS sign-up. Phone OTP is primary, email OTP is an in-form alternate, and Google is a separate provider path. Requesting a code never reveals whether the identifier exists (anti-enumeration); revoked accounts are blocked on every method. Demo scaffolding: the accepted code is 123456; +855 12 777 088 routes to workspace entry, +855 12 000 666 is revoked, any other identifier is a fresh sign-up routed to the wizard.',
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
    await expect(canvas.getByRole('heading', { name: 'Sign in to Kura' })).toBeVisible();
    await expect(
      canvas.getByText('New here? Your first verified code creates your account.'),
    ).toBeVisible();
    await expect(canvas.getByLabelText(/Phone number/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Use email instead' })).toBeVisible();
    await expect(canvas.queryByRole('radiogroup')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /Google/ })).toBeEnabled();
  },
};

/** Switching methods preserves work and moves focus to the newly revealed field. */
export const MethodSwitchPreservesInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const phoneInput = canvas.getByLabelText(/Phone number/);
    await userEvent.type(phoneInput, '98111222');

    await userEvent.click(canvas.getByRole('button', { name: 'Use email instead' }));
    const emailInput = await canvas.findByRole('textbox', { name: 'Email' });
    await expect(emailInput).toHaveFocus();
    await userEvent.type(emailInput, 'doctor@clinic.example');

    await userEvent.click(canvas.getByRole('button', { name: 'Use phone instead' }));
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
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await expect(await canvas.findByText(/\+85598111222/)).toBeVisible();

    await userEvent.type(canvas.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', { name: 'Verify & continue' }));
    await waitFor(() => expect(args.onRouted).toHaveBeenCalledWith('wizard'));
  },
};

/** Known member: same door, routed to workspace entry instead. */
export const ReturningMember: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12777088');
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(canvas.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', { name: 'Verify & continue' }));
    await waitFor(() => expect(args.onRouted).toHaveBeenCalledWith('workspace'));
  },
};

/** Wrong code: announced error, no disclosure about the identifier. */
export const InvalidCode: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(canvas.getByRole('textbox', { name: 'SMS code' }), '000000');
    await userEvent.click(canvas.getByRole('button', { name: 'Verify & continue' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent(/Incorrect or expired/);
    await expect(args.onRouted).not.toHaveBeenCalled();
  },
};

/** Revoked account: blocked after verify, on every method. */
export const RevokedAccount: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12000666');
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(canvas.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', { name: 'Verify & continue' }));
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
    await userEvent.type(canvas.getByRole('textbox', { name: 'Email' }), 'not-an-email');
    await userEvent.click(canvas.getByRole('button', { name: 'Send email code' }));
    await expect(await canvas.findByText('Enter a valid email address.')).toBeVisible();
  },
};

/** Google outage: the provider explains itself instead of silently disabling. */
export const GoogleUnavailable: Story = {
  args: { googleAvailability: 'unavailable' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Google sign-in isn't available right now/),
    ).toBeVisible();
  },
};

/** Route-level throttle surfaces without leaking identifier existence. */
export const Throttled: Story = {
  args: { onRequestCode: () => 'throttled' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await expect(await canvas.findByText(/Too many attempts/)).toBeVisible();
  },
};

/** Narrow viewport: country + phone stack, targets stay comfortable. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
