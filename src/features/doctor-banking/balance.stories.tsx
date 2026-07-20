import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  activityEntries,
  doctorFixture,
  redDoctorFixture,
  unavailableOverview,
  zeroOverview,
} from './demo-data';
import { DoctorBalancePage } from './doctor-banking';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Earnings/Overview',
  component: DoctorBalancePage,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: DOCTOR_BANKING_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Person-global doctor ledger composed from canonical Kura MoneyText, DataGrid, Alert, Badge, and AppShell. The overview shows the signed balance, pending movements, scheduled collections, and recent activity; search, filters, and downloads live on Activity & statements. ReUI contributes grid architecture only; all amounts, states, permissions, and actions follow the pinned doctor-banking contract.',
      },
    },
  },
  args: {
    data: doctorFixture,
    state: 'ready',
    onManageAutoPay: fn(),
    onOpenStatements: fn(),
    onRetry: fn(),
    onSettle: fn(),
  },
  render: (args) => (
    <DoctorBankingStoryFrame>
      <DoctorBalancePage {...args} />
    </DoctorBankingStoryFrame>
  ),
} satisfies Meta<typeof DoctorBalancePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenBalance: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Earnings' })).toBeVisible();
    await expect(canvas.getByText('Earned this period')).toBeVisible();
    await expect(canvas.getByText('Kura owes you')).toBeVisible();
    await expect(canvas.getByText('Auto-pay active · ABA •••• 8842')).toBeVisible();
    await expect(canvas.getByRole('table', { name: 'Earnings activity' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'View all' }));
    await expect(args.onOpenStatements).toHaveBeenCalled();
  },
};

export const RedBalanceNeedsSettlement: Story = {
  args: { data: redDoctorFixture },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You owe Kura')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Settle now' }));
    await expect(args.onSettle).toHaveBeenCalled();
  },
};

export const SettledAtZero: Story = {
  args: { data: { ...doctorFixture, overview: zeroOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Settled balance')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Settle now' })).not.toBeInTheDocument();
  },
};

export const SignedInt64Fallback: Story = {
  args: { data: { ...doctorFixture, overview: unavailableOverview } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Amount unavailable')).toBeVisible();
  },
};

export const Loading: Story = { args: { state: 'loading' } };

export const RecoverableFailure: Story = {
  args: { state: 'error' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Try again' }));
    await expect(args.onRetry).toHaveBeenCalled();
  },
};

export const PermissionDenied: Story = {
  args: { state: 'permission-denied' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Earnings access denied')).toBeVisible();
    await expect(canvas.queryByText('$184.50')).not.toBeInTheDocument();
  },
};

export const EmptyLedger: Story = {
  args: { data: { ...doctorFixture, entries: [] } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No activity yet')).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    data: {
      ...doctorFixture,
      entries: activityEntries.map((entry, index) =>
        index === 0
          ? {
              ...entry,
              title: 'Extended diabetes, chronic kidney disease, and cardiovascular risk consultation completed',
              detail:
                'Earnings released after the complete clinical order lifecycle closed across Kura Cabinet, Toul Kork and Mekong Clinic, BKK1 Branch.',
            }
          : entry,
      ),
    },
  },
};

export const Mobile320: Story = {
  args: { data: redDoctorFixture },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};

export const Tablet768: Story = {
  parameters: { viewport: { defaultViewport: 'kura768' } },
};
