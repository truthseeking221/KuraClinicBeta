import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fireEvent, fn, userEvent, within } from 'storybook/test';

import { ActivityLedger } from './activity-ledger';
import { activityEntries, pagedActivityEntries } from './demo-data';
import { BALANCE_LIVE_READ_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Finance/Balance/Activity Ledger',
  component: ActivityLedger,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: BALANCE_LIVE_READ_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Shared ledger section behind Balance Overview, Activity & statements, and the admin doctor ledger. The full variant searches, filters, and pages, and emits its query so a statement export can match the screen. The recent variant shows the six newest entries and defers everything else.',
      },
    },
  },
  args: {
    entries: pagedActivityEntries,
    state: 'ready',
    onQueryChange: fn(),
  },
} satisfies Meta<typeof ActivityLedger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Search activity')).toBeVisible();
    await expect(canvas.getByRole('table', { name: 'Balance activity' })).toBeVisible();
  },
};

/** Every filter change is emitted so the owning page can export the same rows. */
export const EmitsItsQuery: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Search activity'), 'KHQR');
    await expect(args.onQueryChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ query: 'KHQR' }),
    );
  },
};

/** All eleven contract kinds are filterable, including the three easy to forget. */
export const AllEntryKindsAreFilterable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: /Filter/i }));
    await userEvent.click(await screen.findByText('Activity type'));
    for (const label of [
      'Reserved amount corrected',
      'Reservation released',
      'Cash collected at the clinic',
    ]) {
      await expect(await screen.findByText(label)).toBeVisible();
    }
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
    const rows = within(canvas.getByRole('table', { name: 'Balance activity' })).getAllByRole('row');
    await expect(rows).toHaveLength(7);
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
    await expect(await canvas.findByRole('button', { name: 'From 15 Jul' })).toBeVisible();
    await expect(await screen.findByRole('button', { name: 'Clear dates' })).toBeVisible();
  },
};

/** Quiet states: settled is plain text; voided keeps a badge and a struck amount. */
export const StateTreatment: Story = {
  args: { entries: activityEntries },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Search activity'), 'Reservation released');
    const row = (await canvas.findAllByText('Reservation released'))[0].closest('tr');
    await expect(within(row!).getAllByText('Voided').length).toBeGreaterThan(0);
  },
};

/** More rows than one page: paging is visible, never a silent truncation. */
export const ServerScalePagination: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Go to next page' })).toBeEnabled();
  },
};

export const NoMatchingActivity: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Search activity'), 'zzzz');
    await expect(await canvas.findByText('No matching activity')).toBeVisible();
  },
};

export const Loading: Story = { args: { state: 'loading' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };

/** 320px: search takes its own row; the wide ledger scrolls horizontally. */
export const FullMobile320: Story = {
  globals: { viewport: { value: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Dates' })).toBeVisible();
    await expect(canvas.getByRole('table', { name: 'Balance activity' })).toBeVisible();
  },
};

export const KhmerExpansion: Story = { globals: { locale: 'km' } };
