import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  activityEntries,
  doctorFixture,
  failedPullFixture,
  floorPressureOverview,
  licenceLapsedOverview,
  noticeClearedOverview,
  noticeReducedOverview,
  notRetryableNotification,
  pendingWallOverview,
  redDoctorFixture,
  redOverview,
  retriesExhaustedNotification,
  sweepScheduledOverview,
  unavailableOverview,
  unlinkedRedOverview,
  zeroOverview,
} from './demo-data';
import { DoctorBalancePage } from './doctor-banking';
import { BALANCE_LIVE_READ_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Balance/Overview',
  component: DoctorBalancePage,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: BALANCE_LIVE_READ_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The doctor-owned Balance page, led by what was earned this month. Earned is settled completion credit only; the signed balance says who owes whom in words; What happens next names the one thing Kura will do. Settling and auto-pay are contextual actions, not tabs.',
      },
    },
  },
  args: {
    data: doctorFixture,
    state: 'ready',
    onManageAutoPay: fn(),
    onOpenLicence: fn(),
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

/** Green balance: earnings lead, credit cannot be withdrawn, nothing is collected. */
export const KuraOwesYou: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Balance' })).toBeVisible();
    await expect(canvas.getByText('Earned in July')).toBeVisible();
    await expect(canvas.getByText('$363.50')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Kura owes you' })).toBeVisible();
    await expect(
      canvas.getByText('This credit offsets future charges. Cash payout is not available yet.'),
    ).toBeVisible();
    await expect(
      canvas.getByText('No collection is scheduled. Your credit offsets future charges.'),
    ).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Settle now' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'View all' }));
    await expect(args.onOpenStatements).toHaveBeenCalled();
  },
};

/** Red balance after a failed collection: the retry and the escape hatch are both named. */
export const YouOweKura: Story = {
  args: { data: failedPullFixture },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'You owe Kura' })).toBeVisible();
    await expect(canvas.getByText('Collection failed')).toBeVisible();
    await userEvent.click(canvas.getAllByRole('button', { name: 'Settle now' })[0]);
    await expect(args.onSettle).toHaveBeenCalled();
  },
};

export const Settled: Story = {
  args: { data: { ...doctorFixture, overview: zeroOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: "You're settled" })).toBeVisible();
    await expect(canvas.getByText('Nothing in progress.')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Settle now' })).not.toBeInTheDocument();
  },
};

/** Everything earned is still pending, so the hero is honestly zero. */
export const PendingWall: Story = {
  args: { data: { ...doctorFixture, overview: pendingWallOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('$0.00').length).toBeGreaterThan(0);
    // Pending earnings and the projected balance are the same $246.00.
    await expect(canvas.getAllByText('$246.00')).toHaveLength(2);
  },
};

/** Pending, charges, and reserved together, with the projected balance they decide. */
export const MixedPendingAndReserved: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pending earnings')).toBeVisible();
    await expect(canvas.getByText('Pending charges')).toBeVisible();
    await expect(canvas.getByText('Reserved for draft orders')).toBeVisible();
    await expect(canvas.getByText(/Projected balance if everything completes/)).toBeVisible();
  },
};

/** Projected balance has reached the floor, so ordering stops until settlement. */
export const OrderingFloorReached: Story = {
  args: { data: { ...doctorFixture, overview: floorPressureOverview } },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText(
        'You have reached your ordering floor. Settle your balance to send new orders.',
      ),
    ).toBeVisible();
  },
};

/** int64 minimum is never rendered as money and never offers a payment action. */
export const AmountUnavailable: Story = {
  args: { data: { ...doctorFixture, overview: unavailableOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Amount unavailable' })).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Settle now' })).not.toBeInTheDocument();
  },
};

/** Notice already sent, no payment yet. */
export const NoticeSent: Story = {
  args: { data: { ...doctorFixture, overview: redOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Notice sent')).toBeVisible();
    await expect(canvas.getByText(/Kura will collect up to/)).toBeVisible();
  },
};

/** A manual payment lowers the cap; the original noticed amount stays visible. */
export const NoticeReducedByPayment: Story = {
  args: { data: { ...doctorFixture, overview: noticeReducedOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/down from/)).toBeVisible();
    await expect(canvas.getAllByText('$48.60').length).toBeGreaterThan(0);
  },
};

/** Paid in full after the notice: nothing remains for that collection. */
export const NoticeClearedByPayment: Story = {
  args: { data: { ...doctorFixture, overview: noticeClearedOverview } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Nothing left to collect')).toBeVisible();
  },
};

/** Notice not yet due: the doctor still learns the date and the maximum. */
export const SweepScheduled: Story = {
  args: { data: { ...doctorFixture, overview: sweepScheduledOverview } },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText(/You get a notice before it happens/),
    ).toBeVisible();
  },
};

export const CollectionRetryPending: Story = {
  args: { data: failedPullFixture },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(/Kura retries on/)).toBeVisible();
  },
};

export const CollectionRetryWindowClosed: Story = {
  args: { data: { ...redDoctorFixture, notifications: [notRetryableNotification] } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Retry window closed')).toBeVisible();
  },
};

export const CollectionRetriesExhausted: Story = {
  args: { data: { ...redDoctorFixture, notifications: [retriesExhaustedNotification] } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No retries left')).toBeVisible();
    await expect(canvas.getByText(/Kura will wait until the next sweep/)).toBeVisible();
  },
};

/** Auto-pay is off, so KHQR is the only route and the page says so. */
export const AutoPayOffMustSettle: Story = {
  args: { data: { ...doctorFixture, overview: unlinkedRedOverview } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Kura cannot collect automatically/)).toBeVisible();
    await expect(canvas.getAllByText('Not linked').length).toBeGreaterThan(0);
  },
};

/** A lapsed licence never hides an existing ledger; it only blocks new work. */
export const LicenceLapsedKeepsLedger: Story = {
  args: { data: { ...doctorFixture, overview: licenceLapsedOverview } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Your medical licence has lapsed')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'You owe Kura' })).toBeVisible();
    await expect(canvas.getAllByRole('button', { name: 'Settle now' })[0]).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Manage licence' }));
    await expect(args.onOpenLicence).toHaveBeenCalled();
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

/** A delegated actor sees no amount, no debt, and no payment code. */
export const PermissionDenied: Story = {
  args: { state: 'permission-denied' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('This balance is not yours to view')).toBeVisible();
    await expect(canvas.queryByText('$184.50')).not.toBeInTheDocument();
    await expect(canvas.queryByText('$363.50')).not.toBeInTheDocument();
  },
};

/** A doctor who never had a ledger. Distinct from a lapsed licence. */
export const NewDoctorNotEligible: Story = {
  args: { state: 'not-eligible' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Your balance opens with a verified licence')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Manage licence' }));
    await expect(args.onOpenLicence).toHaveBeenCalled();
    await expect(canvas.queryByText('$363.50')).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Activity & statements' }),
    ).not.toBeInTheDocument();
  },
};

export const EmptyLedger: Story = {
  args: { data: { ...doctorFixture, entries: [] } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No activity yet')).toBeVisible();
  },
};

/**
 * The ledger is doctor-global: two workspaces appear in one list, and each row
 * names the order it came from.
 */
export const CrossWorkspaceProvenance: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The doctor share and the laboratory cost both cite ORD-2903.
    await expect(canvas.getAllByText(/ORD-2903 · Mekong Clinic · BKK1/)).toHaveLength(2);
    await expect(canvas.getByText(/ORD-2849 · Kura Cabinet, Toul Kork/)).toBeVisible();
  },
};

/** The one primary action is operable from the keyboard alone. */
export const KeyboardOnly: Story = {
  args: { data: failedPullFixture },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const settle = canvas.getAllByRole('button', { name: 'Settle now' })[0];
    settle.focus();
    await expect(settle).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onSettle).toHaveBeenCalled();
  },
};

/** Long order titles, a long workspace label, and two clinics in one row. */
export const LongWorkspaceAndActivityLabels: Story = {
  args: {
    data: {
      ...doctorFixture,
      entries: activityEntries.map((entry, index) =>
        index === 0
          ? {
              ...entry,
              title:
                'Doctor share released for an extended diabetes, chronic kidney disease, and cardiovascular risk panel',
              detail:
                'Released after the complete clinical order lifecycle closed across both clinics',
              workspaceLabel:
                'Kura Cabinet, Toul Kork · Endocrinology and internal medicine · BKK1 Branch',
            }
          : entry,
      ),
    },
  },
};

export const Mobile320: Story = {
  args: { data: failedPullFixture },
  globals: { viewport: { value: 'kura320' } },
};

export const Tablet768: Story = {
  globals: { viewport: { value: 'kura768' } },
};

/** Khmer expansion on the money labels and the next-step sentence. */
export const KhmerExpansion: Story = {
  args: { data: failedPullFixture },
  globals: { locale: 'km' },
};
