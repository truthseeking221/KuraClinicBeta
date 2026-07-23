import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fireEvent, fn, userEvent, within } from 'storybook/test';

import { ActivityLedger } from './activity-ledger';
import { activityEntries } from './demo-data';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Finance/Earnings/Activity Ledger',
  component: ActivityLedger,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: DOCTOR_BANKING_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Shared ledger section behind Earnings Overview, Activity & statements, and the admin doctor ledger. The full variant searches and filters; the recent variant shows the six newest entries and defers everything else to Activity & statements.',
      },
    },
  },
  args: {
    entries: activityEntries,
    state: 'ready',
  },
} satisfies Meta<typeof ActivityLedger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Search activity')).toBeVisible();
    await expect(canvas.getByRole('table', { name: 'Earnings activity' })).toBeVisible();
  },
};

export const Recent: Story = {
  args: {
    variant: 'recent',
    entries: [...activityEntries].reverse(),
    onViewAll: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const rows = within(canvas.getByRole('table', { name: 'Earnings activity' })).getAllByRole('row');
    await expect(rows).toHaveLength(7);
    await expect(within(rows[1]).getByText('Consultation completed')).toBeVisible();
    await expect(canvas.queryByLabelText('Search activity')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'View all' }));
    await expect(args.onViewAll).toHaveBeenCalled();
  },
};

export const RecentEmpty: Story = {
  args: { variant: 'recent', entries: [], onViewAll: fn() },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No activity yet')).toBeVisible();
  },
};

/** Date range lives in a popover; the trigger reports the active range. */
export const DateRange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Dates' }));
    const from = await screen.findByLabelText('From');
    await fireEvent.change(from, { target: { value: '2026-07-15' } });
    await expect(
      await canvas.findByRole('button', { name: 'From 15 Jul' }),
    ).toBeVisible();
    await expect(await screen.findByRole('button', { name: 'Clear dates' })).toBeVisible();
  },
};

/** Quiet states: settled is plain text; voided keeps a badge and a struck amount. */
export const StateTreatment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Go to next page' }));
    const row = (await canvas.findByText('Reservation released')).closest('tr');
    await expect(within(row!).getAllByText('Voided').length).toBeGreaterThan(0);
  },
};

/** 320px: search takes its own row; the wide ledger scrolls horizontally. */
export const FullMobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Dates' })).toBeVisible();
    await expect(canvas.getByRole('table', { name: 'Earnings activity' })).toBeVisible();
  },
};
