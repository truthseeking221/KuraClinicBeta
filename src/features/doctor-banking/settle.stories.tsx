import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  confirmedKhqr,
  expiredKhqr,
  pendingKhqr,
  redOverview,
  unavailableOverview,
  zeroOverview,
} from './demo-data';
import { DoctorSettlePage } from './doctor-banking';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Earnings/Settle',
  component: DoctorSettlePage,
  tags: ['autodocs', 'adapted-kura'],
  parameters: { layout: 'fullscreen', kura: DOCTOR_BANKING_STORYBOOK_KURA },
  args: {
    overview: redOverview,
    intent: null,
    state: 'ready',
    onBack: fn(),
    onCreateKhqr: fn(),
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

export const ExactAmountRequired: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Create exact KHQR' }));
    await expect(args.onCreateKhqr).toHaveBeenCalled();
  },
};

export const AwaitingProviderConfirmation: Story = {
  args: { intent: pendingKhqr },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Awaiting confirmation')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Check confirmation' }));
    await expect(args.onRefresh).toHaveBeenCalled();
  },
};

export const ExpiredNeedsRegeneration: Story = { args: { intent: expiredKhqr } };
export const ProviderConfirmed: Story = { args: { intent: confirmedKhqr } };
export const NothingDue: Story = { args: { overview: zeroOverview } };
export const SignedAmountUnavailable: Story = { args: { overview: unavailableOverview } };
export const Loading: Story = { args: { state: 'loading' } };
export const RecoverableFailure: Story = { args: { state: 'error' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };
export const Mobile320: Story = {
  args: { intent: pendingKhqr },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
