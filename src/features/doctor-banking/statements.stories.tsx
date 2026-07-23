import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fireEvent, fn, userEvent, within } from 'storybook/test';

import {
  allNotifications,
  doctorFixture,
  failedPullFixture,
  pagedActivityEntries,
} from './demo-data';
import { DoctorStatementsPage } from './doctor-banking';
import { BALANCE_LIVE_READ_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Balance/Activity & Statements',
  component: DoctorStatementsPage,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: BALANCE_LIVE_READ_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Where a doctor investigates the ledger: search, filter, date range, and a statement download that always covers exactly what is on screen. Notices and receipts below carry their delivery, retry, and balance-after facts.',
      },
    },
  },
  args: {
    data: doctorFixture,
    downloadState: 'idle',
    state: 'ready',
    onDownload: fn(),
    onBack: fn(),
    onOpenLicence: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <DoctorBankingStoryFrame>
      <DoctorStatementsPage {...args} />
    </DoctorBankingStoryFrame>
  ),
} satisfies Meta<typeof DoctorStatementsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'PDF' }));
    await expect(args.onDownload).toHaveBeenCalledWith('pdf', { query: '' });
    await expect(canvas.getByText('Notices and receipts')).toBeVisible();
  },
};

/** The export carries the active query, so the file matches the screen. */
export const FilteredExportMatchesTheScreen: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Search activity'), 'ORD-2903');
    await expect(await canvas.findByText(/Downloads cover the/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Excel' }));
    await expect(args.onDownload).toHaveBeenCalledWith(
      'xlsx',
      expect.objectContaining({ query: 'ORD-2903' }),
    );
  },
};

/** A backwards range cannot produce a statement, so both downloads are blocked. */
export const StatementRangeInvalid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Dates' }));
    await fireEvent.change(await screen.findByLabelText('From'), {
      target: { value: '2026-07-20' },
    });
    await fireEvent.change(await screen.findByLabelText('To'), {
      target: { value: '2026-07-02' },
    });
    await expect(await canvas.findByText('Date range is backwards')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'PDF' })).toBeDisabled();
  },
};

/** Every ledger kind, every state, and provenance across two workspaces. */
export const AllEntryKinds: Story = {
  args: { data: { ...doctorFixture, entries: pagedActivityEntries } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('table', { name: 'Balance activity' })).toBeVisible();
    await expect(canvas.getAllByText('Doctor share released').length).toBeGreaterThan(0);
    await expect(canvas.getByRole('button', { name: 'Go to next page' })).toBeEnabled();
  },
};

/** A reversal is a new entry; the reversed one keeps its original amount. */
export const ReversalWithoutMutation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Search activity'), 'ORD-2760');
    await expect(await canvas.findByText('Duplicate earning reversed')).toBeVisible();
    await expect(canvas.getByText(/Duplicate of ORD-2760/)).toBeVisible();
  },
};

/** Cash taken at the front desk offsets the ledger instead of vanishing from it. */
export const PhysicalCashSettlement: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Search activity'), 'Cash');
    await expect((await canvas.findAllByText('Cash collected at the clinic')).length).toBeGreaterThan(0);
  },
};

export const FailedCollectionNotice: Story = {
  args: { data: failedPullFixture },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Collection attempt failed')).toBeVisible();
    await expect(canvas.getByText('Retry scheduled')).toBeVisible();
    await expect(canvas.getByText(/We will retry on/)).toBeVisible();
  },
};

/** Every notice and receipt kind, with delivery, retry, and balance-after facts. */
export const AllNoticesAndReceipts: Story = {
  args: {
    data: { ...doctorFixture, entries: pagedActivityEntries, notifications: allNotifications },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Payment received').length).toBe(5);
    await expect(canvas.getByText('Partly collected')).toBeVisible();
    await expect(canvas.getByText('Expired uncollected')).toBeVisible();
    await expect(canvas.getAllByText('Balance after').length).toBeGreaterThan(0);
    await expect(canvas.getByText('ABA authorization needs renewal')).toBeVisible();
    await expect(canvas.getAllByText(/SMS failed/).length).toBeGreaterThan(0);
  },
};

/** Every order-backed row carries its order reference and its workspace. */
export const OrderReferenceOnEveryRow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The doctor share and the laboratory cost both cite ORD-2903.
    await expect(canvas.getAllByText(/ORD-2903 · Mekong Clinic · BKK1/)).toHaveLength(2);
    await expect(canvas.getByText(/ORD-2849 · Kura Cabinet, Toul Kork/)).toBeVisible();
  },
};

/** Search, filters, and downloads are all reachable from the keyboard. */
export const KeyboardOnly: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByLabelText('Search activity');
    search.focus();
    await expect(search).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /Filter/i })).toHaveFocus();
    const download = canvas.getByRole('button', { name: 'PDF' });
    download.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onDownload).toHaveBeenCalled();
  },
};

export const DownloadInProgress: Story = { args: { downloadState: 'loading' } };
export const DownloadFailure: Story = { args: { downloadState: 'error' } };
export const DownloadSuccess: Story = { args: { downloadState: 'success' } };

export const EmptyActivityAndNotices: Story = {
  args: { data: { ...doctorFixture, entries: [], notifications: [] } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No matching activity')).toBeVisible();
    await expect(canvas.getByText('No notices or receipts yet.')).toBeVisible();
  },
};

export const Loading: Story = { args: { state: 'loading' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };

export const Mobile320: Story = {
  args: { data: failedPullFixture },
  globals: { viewport: { value: 'kura320' } },
};

export const Tablet768: Story = {
  args: { data: failedPullFixture },
  globals: { viewport: { value: 'kura768' } },
};

export const KhmerExpansion: Story = {
  args: { data: failedPullFixture },
  globals: { locale: 'km' },
};
