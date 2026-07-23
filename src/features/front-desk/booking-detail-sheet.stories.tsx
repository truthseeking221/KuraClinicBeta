import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { Button } from '../../components/ui';
import { BookingDetailSheet } from './booking-detail-sheet';
import { DEMO_BRANCH_ID, IDENTITY_REGISTRY } from './demo-data';
import type { BookingSummary, PatientRecordSummary } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const sokPhearom = IDENTITY_REGISTRY.find((record) => record.id === 'rec-sok-phearom')!;
const bookingOf = (code: string): BookingSummary =>
  sokPhearom.bookings!.find((candidate) => candidate.code === code)!;

function SheetPlayground({
  booking,
  initialOpen = true,
  readOnly = false,
  patient = sokPhearom,
  deskBranchId = DEMO_BRANCH_ID,
}: {
  booking: BookingSummary;
  initialOpen?: boolean;
  readOnly?: boolean;
  patient?: PatientRecordSummary;
  deskBranchId?: string;
}) {
  const [open, setOpen] = useState(initialOpen);
  const [log, setLog] = useState<string | null>(null);
  return (
    <div>
      <p aria-label="Action log" role="status">{log ?? 'No action yet.'}</p>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open booking {booking.code}
      </Button>
      <BookingDetailSheet
        booking={booking}
        deskBranchId={deskBranchId}
        onCheckIn={readOnly ? undefined : (code) => {
          setLog(`check-in:${code}`);
          setOpen(false);
        }}
        onContinueAsWalkIn={readOnly ? undefined : () => {
          setLog('walk-in');
          setOpen(false);
        }}
        onConfirmWalkIn={readOnly ? undefined : () => {
          setLog('walk-in-confirmed');
          setOpen(false);
        }}
        onOpenChange={setOpen}
        onOpenDeskQueue={readOnly ? undefined : () => setLog('desk-queue')}
        onResendCode={readOnly ? undefined : (code) => setLog(`resend:${code}`)}
        open={open}
        patient={patient}
      />
    </div>
  );
}

const meta = {
  title: 'Clinic/Front Desk/Booking Detail Sheet',
  component: BookingDetailSheet,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'COMPOSE (Sheet + Timeline + Badge + MoneyText + Alert + Button)',
        owner: 'src/features/front-desk',
        evidence:
          'Architecture reference: ReUI block `solution-bookings-3` (appointment detail sheet + booking timeline) — nothing pasted; every state maps to the canonical collection-code contract (issued/scheduled/redeemed/expired/cancelled per libs/contracts) and the capture contract (paid is the only real capture state). Timeline primitive REUSED from the canonical owner and EXTENDED with a semantic `tone` (add-only). Blocked codes explain themselves and route to a state-safe recovery action: walk-in where allowed, desk-queue review for redeemed codes, and parent-owned confirmation for cancelled bookings.',
        exclusions: [
          'Deposit-progress bar from the reference block (backend has no partial-capture contract)',
          'Internal notes and staff assignment (no backend contract; separate ticket)',
        ],
      },
      journeys: ['front-desk-check-in', 'front-desk-booking-detail'],
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-overlay',
        icons: 'kura-hugeicons',
      },
    },
    docs: {
      description: {
        component:
          'One collection code told end-to-end: patient, ordered tests, payment, and the code lifecycle as a timeline. Blocked codes explain themselves and offer the safest available recovery action instead of a dead check-in button.',
      },
    },
  },
} satisfies Meta<typeof BookingDetailSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  booking: bookingOf('GW87430'),
  patient: sokPhearom,
  open: true,
  onOpenChange: () => {},
};

export const ScheduledPaid: Story = {
  name: 'Scheduled · paid — ready to check in',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87430')} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Visit scheduled')).toBeVisible();
    });
    await expect(body.getByText('HbA1c')).toBeVisible();
    await expect(body.getByText('Paid')).toBeVisible();
    await expect(body.getByText('$18.50')).toBeVisible();

    await userEvent.click(body.getByRole('button', { name: 'Check in booking GW87430' }));
    await waitFor(async () => {
      await expect(body.getByRole('status', { name: 'Action log' })).toHaveTextContent('check-in:GW87430');
    });
  },
};

export const IssuedPendingPayment: Story = {
  name: 'Issued · payment pending — resend available',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87431')} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Payment pending')).toBeVisible();
    });
    await userEvent.click(body.getByRole('button', { name: 'Resend code' }));
    await waitFor(async () => {
      await expect(body.getByRole('status', { name: 'Action log' })).toHaveTextContent('resend:GW87431');
    });
  },
};

export const ExpiredCode: Story = {
  name: 'Expired — walk-in recovery door',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87510')} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Booking code expired')).toBeVisible();
    });
    await expect(body.getByText('Code expired')).toBeVisible();
    await expect(body.getByRole('button', { name: 'Continue as walk-in' })).toBeVisible();

    await userEvent.click(body.getByRole('button', { name: 'Continue as walk-in' }));
    await waitFor(async () => {
      await expect(body.getByRole('status', { name: 'Action log' })).toHaveTextContent('walk-in');
    });
  },
};

export const AlreadyRedeemed: Story = {
  name: 'Already redeemed — duplicate-visit guard',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87511')} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Code already redeemed')).toBeVisible();
    });
    await expect(body.getByText(/check the desk queue/)).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Check desk queue' }));
    await waitFor(async () => {
      await expect(body.getByRole('status', { name: 'Action log' })).toHaveTextContent('desk-queue');
    });
  },
};

export const CancelledBooking: Story = {
  name: 'Cancelled — terminal state',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87512')} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Booking cancelled', { selector: 'h3' })).toBeVisible();
    });
    await userEvent.click(body.getByRole('button', { name: 'Confirm walk-in' }));
    await waitFor(async () => {
      await expect(body.getByRole('status', { name: 'Action log' })).toHaveTextContent('walk-in-confirmed');
    });
  },
};

export const WrongBranch: Story = {
  name: 'Issued for another branch',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87513')} deskBranchId={DEMO_BRANCH_ID} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Issued for another branch')).toBeVisible();
    });
    await expect(body.getByText(/Direct the patient there/)).toBeVisible();
  },
};

export const EscapeRestoresFocus: Story = {
  name: 'Escape closes and restores focus',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87430')} initialOpen={false} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('button', { name: 'Open booking GW87430' }));
    await waitFor(async () => {
      await expect(body.getByText('Visit scheduled')).toBeVisible();
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(body.queryByText('Visit scheduled')).not.toBeVisible();
    });
    await expect(body.getByRole('button', { name: 'Open booking GW87430' })).toHaveFocus();
  },
};

export const Mobile: Story = {
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => <SheetPlayground booking={bookingOf('GW87430')} />,
};

export const ReadOnlyBlocked: Story = {
  name: 'Blocked — read-only with no recovery action',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87510')} readOnly />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Booking code expired')).toBeVisible();
    });
    await expect(body.getByText('Check-in unavailable for this booking.')).toBeVisible();
  },
};

export const LongContent320: Story = {
  name: 'Long content — 320px',
  args: baseArgs,
  globals: { viewport: { value: 'kura320' } },
  render: () => (
    <SheetPlayground
      booking={{
        ...bookingOf('GW87430'),
        itemsLabel: 'HbA1c, Lipoprotein(a), CMP (metabolic panel), Glucose (fasting)',
      }}
      patient={{
        ...sokPhearom,
        name: 'Sok Phearom Channary Longname',
        nameKhmer: 'សុខ ភារ៉ុម ចាន់ណារី',
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Lipoprotein(a)')).toBeVisible();
    });
    await expect(body.getByText('CMP (metabolic panel)')).toBeVisible();
    await expect(body.getByText('Glucose (fasting)')).toBeVisible();
  },
};
