import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  confirmedKhqr,
  expiredKhqr,
  overpaidKhqr,
  pendingKhqr,
  redOverview,
  shortfallKhqr,
  unavailableOverview,
  zeroOverview,
} from './demo-data';
import { DoctorSettlePage } from './doctor-banking';
import { BALANCE_TARGET_CONTRACT_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Balance/Settle Now',
  component: DoctorSettlePage,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: BALANCE_TARGET_CONTRACT_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'KHQR settlement for the exact amount owed. There is no amount field. Only a provider confirmation moves the state, and the confirmed screen shows what was received, the balance after, and the receipt reference.',
      },
    },
  },
  args: {
    overview: redOverview,
    intent: null,
    state: 'ready',
    onBack: fn(),
    onCreateKhqr: fn(),
    onOpenLicence: fn(),
    onRegenerate: fn(),
    onRefresh: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <DoctorBankingStoryFrame>
      <DoctorSettlePage {...args} />
    </DoctorBankingStoryFrame>
  ),
} satisfies Meta<typeof DoctorSettlePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The code is created for the verified amount; the doctor never types one. */
export const ExactAmountOnly: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('$48.60')).toBeVisible();
    await expect(canvas.queryByRole('spinbutton')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Create payment code' }));
    await expect(args.onCreateKhqr).toHaveBeenCalled();
  },
};

export const WaitingForTheBank: Story = {
  args: { intent: pendingKhqr },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Waiting for your bank')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Check for payment' }));
    await expect(args.onRefresh).toHaveBeenCalled();
  },
};

export const CodeExpired: Story = {
  args: { intent: expiredKhqr },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Payment code expired')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Create a new code' }));
    await expect(args.onRegenerate).toHaveBeenCalled();
  },
};

/** Confirmed shows the money facts, not just a green banner. */
export const PaymentConfirmed: Story = {
  args: { intent: confirmedKhqr },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Payment confirmed')).toBeVisible();
    await expect(canvas.getByText('Amount received')).toBeVisible();
    await expect(canvas.getByText('Balance after payment')).toBeVisible();
    await expect(canvas.getByText('RCPT-40126')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Back to Balance' }));
    await expect(args.onBack).toHaveBeenCalled();
  },
};

/** A late or duplicate payment becomes credit; it is never reported as lost. */
export const OverpaidBecomesCredit: Story = {
  args: { intent: overpaidKhqr },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText(
        'You paid more than you owed. The extra amount is now credit on your balance.',
      ),
    ).toBeVisible();
  },
};

/** The order-funding shortfall uses the same code, with its own heading. */
export const PendingShortfall: Story = {
  args: { intent: shortfallKhqr },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Pay the order shortfall' })).toBeVisible();
    await expect(canvas.getByText('$32.00')).toBeVisible();
  },
};

export const NothingToSettle: Story = {
  args: { overview: zeroOverview },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Nothing to settle')).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Create payment code' }),
    ).not.toBeInTheDocument();
  },
};

/** An unrepresentable balance creates no code at all. */
export const AmountUnavailable: Story = {
  args: { overview: unavailableOverview },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText(
        'The balance cannot be displayed safely, so no KHQR code was created.',
      ),
    ).toBeVisible();
  },
};

export const Loading: Story = { args: { state: 'loading' } };
export const RecoverableFailure: Story = { args: { state: 'error' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };

export const Mobile320: Story = {
  args: { intent: pendingKhqr },
  globals: { viewport: { value: 'kura320' } },
};

export const Tablet768: Story = {
  args: { intent: pendingKhqr },
  globals: { viewport: { value: 'kura768' } },
};

export const KhmerExpansion: Story = {
  args: { intent: confirmedKhqr },
  globals: { locale: 'km' },
};
