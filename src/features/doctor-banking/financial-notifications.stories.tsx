import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import {
  allNotifications,
  failedPullNotification,
  notRetryableNotification,
  relinkRequiredNotification,
  retriesExhaustedNotification,
} from './demo-data';
import { FinancialNotifications } from './financial-notifications';
import { BALANCE_LIVE_READ_STORYBOOK_KURA } from './storybook-metadata';

const preNotices = allNotifications.filter(
  (notification) => notification.kind === 'pre_notice',
);
const receipts = allNotifications.filter((notification) => notification.kind === 'receipt');

const meta = {
  title: 'Clinic/Finance/Balance/Notices & Receipts',
  component: FinancialNotifications,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: BALANCE_LIVE_READ_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Doctor-audience notices and receipts. Each kind renders the facts a doctor would otherwise have to ask support for: the noticed cap, the remaining cap, the balance after a payment, the retry slot, the next action, and how the message was delivered.',
      },
    },
  },
  args: { notifications: allNotifications },
} satisfies Meta<typeof FinancialNotifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Everything: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Payment received').length).toBe(5);
    await expect(canvas.getAllByText('Collection attempt failed').length).toBe(4);
    await expect(canvas.getAllByText('Ledger adjustment recorded').length).toBe(2);
  },
};

/** All five pre-notice states, including the one that expired uncollected. */
export const PreNoticeLifecycle: Story = {
  args: { notifications: preNotices },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const label of [
      'Not sent yet',
      'Sent',
      'Partly collected',
      'Fully collected',
      'Expired uncollected',
    ]) {
      await expect(canvas.getByText(label)).toBeVisible();
    }
    // Both the partly-collected and fully-collected notices explain the drop.
    await expect(
      canvas.getAllByText('Your payment lowered the amount Kura will collect.'),
    ).toHaveLength(2);
  },
};

/** KHQR plus all five pull triggers, each with its balance after and receipt. */
export const ReceiptSources: Story = {
  args: { notifications: receipts },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const label of [
      'KHQR payment',
      'Collection while ordering',
      'Collection retry',
      'Collection retry by Kura',
      'Final collection before unlink',
    ]) {
      await expect(canvas.getByText(label)).toBeVisible();
    }
    await expect(canvas.getAllByText('Balance after').length).toBe(5);
  },
};

export const RetryPending: Story = {
  args: { notifications: [failedPullNotification] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Retry scheduled')).toBeVisible();
    await expect(canvas.getByText('2 of 3')).toBeVisible();
    await expect(canvas.getByText(/We will retry on/)).toBeVisible();
  },
};

export const RetriesExhausted: Story = {
  args: { notifications: [retriesExhaustedNotification] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No retries left')).toBeVisible();
    await expect(canvas.getByText('We will wait until the next sweep')).toBeVisible();
  },
};

export const NotRetryable: Story = {
  args: { notifications: [notRetryableNotification] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Cannot be retried')).toBeVisible();
    await expect(canvas.getByText('Settle with KHQR')).toBeVisible();
  },
};

export const RelinkRequired: Story = {
  args: { notifications: [relinkRequiredNotification] },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText('Link ABA again to restore scheduled collections'),
    ).toBeVisible();
  },
};

/** A notice still being delivered is not the same as one that arrived. */
export const DeliveryPending: Story = {
  args: { notifications: [failedPullNotification] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(/SMS sending/)).toBeVisible();
  },
};

/** One channel failed; the doctor can see which, instead of assuming silence. */
export const DeliveryPartiallyAccepted: Story = {
  args: { notifications: [preNotices[2]] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(/SMS failed/)).toBeVisible();
  },
};

export const Empty: Story = {
  args: { notifications: [] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No notices or receipts yet.')).toBeVisible();
  },
};

export const Mobile320: Story = { globals: { viewport: { value: 'kura320' } } };
export const KhmerExpansion: Story = { globals: { locale: 'km' } };
