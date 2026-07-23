import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { fundingDecisions } from './demo-data';
import { OrderFundingGate } from './order-funding-gate';
import { BALANCE_TARGET_CONTRACT_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Finance/Balance/Order Funding Gate',
  component: OrderFundingGate,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: BALANCE_TARGET_CONTRACT_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The balance decision an order composition surface renders before a laboratory order can be sent. Every blocked state names the amount, the reason, and one way out. Intake conversion never consults the ledger, so a patient is never blocked by a doctor balance.',
      },
    },
  },
  args: {
    decision: fundingDecisions.allow,
    context: 'order-compose',
    onManageAutoPay: fn(),
    onManageLicence: fn(),
    onSettle: fn(),
  },
} satisfies Meta<typeof OrderFundingGate>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Enough headroom: one quiet line, no alert, no interruption. */
export const Allow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Ordering is available/)).toBeVisible();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

/** Red balance and no usable authorization: KHQR is the way through. */
export const SettledRedWithoutAutoPay: Story = {
  args: { decision: fundingDecisions.khqrUnlinked },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Auto-pay is not available on your account right now/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Settle now' }));
    await expect(args.onSettle).toHaveBeenCalled();
  },
};

/** The just-in-time pull failed, so the order waits on a manual payment. */
export const SettledRedAfterFailedPull: Story = {
  args: { decision: fundingDecisions.khqrJitFailed },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText(/Kura could not collect from your ABA account just now/),
    ).toBeVisible();
  },
};

/** The balance is not red yet, but this order would cross the ordering floor. */
export const PendingShortfall: Story = {
  args: { decision: fundingDecisions.pendingShortfall },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('This order would pass your ordering floor')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Pay the shortfall' }));
    await expect(args.onSettle).toHaveBeenCalled();
  },
};

export const JitProcessing: Story = {
  args: { decision: fundingDecisions.jitProcessing },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Collecting from ABA')).toBeVisible();
  },
};

export const JitSucceeded: Story = {
  args: { decision: fundingDecisions.jitSucceeded },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText('Collected. Your order can continue.'),
    ).toBeVisible();
  },
};

/** Not a money problem: paying would not unblock it, and the copy says so. */
export const PrescriberActionRequired: Story = {
  args: { decision: fundingDecisions.prescriberActionRequired },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/This is not a balance problem, so paying will not unblock it/),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Manage licence' }));
    await expect(args.onManageLicence).toHaveBeenCalled();
  },
};

/** Registering the person in front of you never depends on the doctor's balance. */
export const IntakeConversionNeverBlocks: Story = {
  args: { context: 'intake-conversion', decision: fundingDecisions.khqrUnlinked },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Converting an intake never checks your balance. This step always continues.'),
    ).toBeVisible();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

export const Mobile320: Story = {
  args: { decision: fundingDecisions.khqrUnlinked },
  globals: { viewport: { value: 'kura320' } },
};

export const KhmerExpansion: Story = {
  args: { decision: fundingDecisions.pendingShortfall },
  globals: { locale: 'km' },
};
