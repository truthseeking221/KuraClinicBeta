import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { AppShell } from '../../components/shared/app-shell';

import { CheckInWizard } from './check-in-wizard';
import {
  blankWalkIn,
  DESK_VISITS,
  EXISTING_PATIENTS,
  FRONT_DESK_QUEUE_DEMO_SCENARIOS,
} from './demo-data';
import { DeskQueue } from './desk-queue';
import { checkedInVisit, skipVisit } from './logic';
import type { DeskVisit, FrontDeskPatient, QueueSkipReasonCode } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const meta = {
  title: 'Clinic/Front Desk/Desk Queue',
  component: DeskQueue,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      contract: {
        status: 'design-target',
        backendMapping: 'none',
        note:
          'kura-platform has no queue, visit, or check-in engine today — no controller, proto, or enum. This surface is the reception workbench the truth pack mandates (REC-01/02/05, workbench lifecycle §5.1) and must not be read as an executable backend capability. Ticketing, call order, and the draw all live here because one PSC staffer carries a visit from arrival to tube.',
      },
      intake: {
        decision: 'DOMAIN-ADAPT',
        owner: 'src/features/front-desk',
        evidence:
          'ReUI data-grid-base-7 supplies the dense identity/facts/action grid anatomy. Kura keeps its canonical DataGrid, receptionist-owned ordering and actions, responsive Item composition, semantic tokens, and all queue states.',
        exclusions: [
          'Progress rings do not represent a visit lifecycle and were removed.',
          'Search, user sorting, filters, and pagination were removed because this short live queue must preserve authoritative urgency order.',
          'ReUI icons, toast actions, module data, and vendor namespace were not promoted.',
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'data-grid-base-7',
        visualReference: 'https://reui.io/preview/base/data-grid-base-7',
      },
      journeys: [
        'REC-01-check-in-planned-visit',
        'REC-02-walk-in-check-in',
        'REC-05-queue-for-phlebotomy',
        'WQ-09-empty-error-stale-worklist',
      ],
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura',
        icons: 'kura-hugeicons',
      },
    },
    docs: {
      description: {
        component:
          'Reception worklist adapted from ReUI data-grid-base-7. Order is a promise: urgent draws first, then appointments whose slot is due, then walk-ins, first-come-first-served inside each band. Every row keeps its ticket, position, activity, identity assurance, contact ownership, and payment as separate facts, and offers exactly one next action. Identity assurance and phone confirmation never merge — a code sent to a phone proves the phone, not the person.',
      },
    },
  },
  args: {
    visits: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-default'].visits,
    onResumeVisit: fn(),
    onCallVisit: fn(),
    onSkipVisit: fn(),
    onStartDraw: fn(),
    onNewWalkIn: fn(),
    onRetry: fn(),
    onRefresh: fn(),
  },
} satisfies Meta<typeof DeskQueue>;

export default meta;
type Story = StoryObj<typeof meta>;

function activeRows(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  return within(canvas.getByRole('table', { name: 'Active visits' }))
    .getAllByRole('row')
    .slice(1);
}

/** A realistic mid-morning room: every band, every fact, one action per row. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('8 in the room · 1 completed today')).toBeVisible();

    // Every row carries the ticket the waiting room was given.
    const rows = activeRows(canvasElement);
    await expect(within(rows[0]).getByText('S-029')).toBeVisible();
  },
};

/**
 * Order proof (T17a): urgent outranks a due appointment, a due appointment
 * outranks a walk-in, and an appointment booked for later waits with the room.
 */
export const PriorityOrder: Story = {
  play: async ({ canvasElement }) => {
    const rows = activeRows(canvasElement);
    const tickets = rows.map((row) => within(row).getAllByText(/^[SBW]-\d{3}$/)[0].textContent);

    // Urgent first, despite the shortest wait in the room.
    await expect(tickets[0]).toBe('S-029');
    await expect(within(rows[0]).getByText('Urgent')).toBeVisible();

    // The 09:15 booking sits ahead of walk-ins who arrived before it.
    await expect(tickets[1]).toBe('B-025');
    await expect(within(rows[1]).getByText('Booked 09:15')).toBeVisible();

    // The 11:00 booking is here early and ranks behind everyone waiting now.
    const early = rows.find((row) => within(row).queryByText('B-030'))!;
    await expect(within(early).getByText('Booked 11:00 · early')).toBeVisible();
    await expect(tickets.indexOf('B-030')).toBeGreaterThan(tickets.indexOf('W-024'));
  },
};

/** Inside one band the order is first-come-first-served, longest wait first. */
export const FifoWithinClass: Story = {
  play: async ({ canvasElement }) => {
    const rows = activeRows(canvasElement);
    const tickets = rows.map((row) => within(row).getAllByText(/^[SBW]-\d{3}$/)[0].textContent);
    // W-024 waited 62m, W-026 33m, W-028 27m, W-027 12m.
    await expect(tickets.indexOf('W-024')).toBeLessThan(tickets.indexOf('W-028'));
    await expect(tickets.indexOf('W-028')).toBeLessThan(tickets.indexOf('W-027'));
  },
};

/**
 * A verified phone is not a checked identity. The two facts sit in their own
 * columns so a row can never claim an identity nobody looked at.
 */
export const IdentityIsNotContact: Story = {
  play: async ({ canvasElement }) => {
    const rows = activeRows(canvasElement);
    const row = rows.find((candidate) => within(candidate).queryByText('Sok Phearom'))!;
    await expect(within(row).getByText('ID not checked')).toBeVisible();
    await expect(within(row).getByText('Confirmed')).toBeVisible();
  },
};

/** Paid ≠ arrived, drawn ≠ paid: axes never collapse into one status. */
export const IndependentAxes: Story = {
  args: {
    visits: [
      // Paid in full but the check-in is unfinished — still desk work.
      { ...DESK_VISITS[0], payment: 'collected' },
      // Identity resolved but payment still waiting on Bakong.
      DESK_VISITS.find((visit) => visit.id === 'v-4')!,
    ],
  },
  play: async ({ canvasElement }) => {
    const rows = activeRows(canvasElement);
    const unfinished = rows.find((row) => within(row).queryByText('Sok Phearom'))!;
    await expect(within(unfinished).getByText('Check-in unfinished')).toBeVisible();
    await expect(within(unfinished).getByText('Paid')).toBeVisible();

    const waiting = rows.find((row) => within(row).queryByText('Vibol Keo'))!;
    await expect(within(waiting).getByText('KHQR waiting')).toBeVisible();
  },
};

/**
 * One call button, at the top of the order. Rows that are simply waiting
 * offer nothing — calling out of turn goes through a recorded skip, not a
 * quieter button on every row.
 */
export const CallNext: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Call next · S-029' }));
    await expect(args.onCallVisit).toHaveBeenCalledWith('v-stat');

    const table = within(canvas.getByRole('table', { name: 'Active visits' }));
    await expect(table.queryByRole('button', { name: 'Call B-025' })).not.toBeInTheDocument();
    // Exceptions keep their own control: an unfinished capture and a recall.
    await expect(table.getAllByRole('button', { name: 'Resume check-in' })[0]).toBeVisible();
    await expect(table.getByRole('button', { name: 'Recall W-026' })).toBeVisible();
  },
};

/** One desk calls one patient. While S-029 is walking up, Call next is blocked. */
export const OneCallAtATime: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-called'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Call next' })).toBeDisabled();
    await expect(canvas.getByText('Finish with S-029 first')).toBeVisible();
    await expect(canvas.getByText('Now calling')).toBeVisible();
  },
};

/** The waiting-room screen and the desk read the same derived fact. */
export const NowServing: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-serving'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const strip = canvas.getByLabelText('Now serving');
    await expect(within(strip).getByText('In the chair')).toBeVisible();
    await expect(within(strip).getByText('S-029')).toBeVisible();
    await expect(within(strip).getByText(/Bay 2/)).toBeVisible();
  },
};

/** An unanswered call is recorded with its reason, never a silent drop. */
export const SkipAndRecall: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-called'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const table = within(canvas.getByRole('table', { name: 'Active visits' }));
    await userEvent.click(table.getByRole('button', { name: 'No answer' }));
    // The menu renders in a portal, outside the story canvas.
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Patient stepped out' }));
    await expect(args.onSkipVisit).toHaveBeenCalledWith('v-stat', 'stepped-out');

    // The already-skipped row keeps its reason and offers a recall.
    const skipped = activeRows(canvasElement).find((row) =>
      within(row).queryByText('W-026'),
    )!;
    await expect(within(skipped).getByText('No answer at the desk · 09:01')).toBeVisible();
    await expect(within(skipped).getByRole('button', { name: 'Recall W-026' })).toBeVisible();
  },
};

/** Money gates the tube: an uncollected balance blocks the draw, and says so. */
export const PaymentGatesTheDraw: Story = {
  args: {
    visits: [
      {
        ...DESK_VISITS.find((visit) => visit.id === 'v-stat')!,
        payment: 'pending',
        call: { state: 'called', atLabel: '09:06', deskLabel: 'Bay 2' },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = within(canvas.getByRole('table', { name: 'Active visits' }));
    await expect(table.getByRole('button', { name: 'Start draw' })).toBeDisabled();
    await expect(table.getByText('Payment has not been collected or deferred.')).toBeVisible();
  },
};

/** Over 30 minutes warns, over 60 escalates — the copy carries the word, not just colour. */
export const LongWait: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-long-wait'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const activeTable = within(canvas.getByRole('table', { name: 'Active visits' }));
    await expect(activeTable.getByText(/Waiting 85m — escalate/)).toBeVisible();
    await expect(activeTable.getByText(/Waiting 70m — escalate/)).toBeVisible();
  },
};

export const Empty: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-empty'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No arrivals yet')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Call next' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', { name: 'Start a walk-in' }));
    await expect(args.onNewWalkIn).toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-loading'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Loading today’s visits…')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: /Resume check-in/ })).not.toBeInTheDocument();
  },
};

/** Load failure never blocks new walk-ins — the desk keeps working. */
export const LoadError: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-error'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('The queue could not be loaded')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'New walk-in' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalled();
  },
};

/** Offline: the room on screen may no longer be the room at the door. */
export const Offline: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-offline'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You are offline')).toBeVisible();
    await expect(canvas.getByText(/from 09:12/)).toBeVisible();
    // Calling from a queue that cannot sync would call a ticket twice.
    await expect(canvas.getByRole('button', { name: /Call next/ })).toBeDisabled();
  },
};

export const Stale: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-stale'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Updated 09:12')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Refresh' }));
    await expect(args.onRefresh).toHaveBeenCalled();
  },
};

/** No reception capability: honest denial, no dead controls. */
export const AccessDenied: Story = {
  args: { state: 'denied' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No access to the desk queue')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'New walk-in' })).not.toBeInTheDocument();
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The single call control stays reachable; rows stay quiet.
    await expect(canvas.getByRole('button', { name: 'Call next · S-029' })).toBeVisible();
    const list = canvas.getByRole('list', { name: 'Active visits' });
    await expect(within(list).queryByRole('button', { name: /^Call / })).not.toBeInTheDocument();
  },
};

// ── Flow: one staffer, arrival through draw ────────────────

function DeskContinuityHarness() {
  const [visits, setVisits] = useState<DeskVisit[]>(
    DESK_VISITS.filter((visit) => visit.id === 'v-3'),
  );
  const [checkingIn, setCheckingIn] = useState<FrontDeskPatient | null>(null);

  function patch(visitId: string, apply: (visit: DeskVisit) => DeskVisit) {
    setVisits((current) => current.map((visit) => (visit.id === visitId ? apply(visit) : visit)));
  }

  return (
    <AppShell
      activeKey="arrivals"
      availableModes={['front-desk']}
      mode="front-desk"
      onNavigate={() => {}}
      user={{ name: 'Linh Nguyen', email: 'linh@mekong.clinic', licenceVerified: false }}
      workspace={{
        id: 'mekong',
        name: 'Mekong Clinic',
        branches: [{ id: 'bkk1', name: 'BKK1 Branch' }],
        activeBranchId: 'bkk1',
      }}
    >
      {checkingIn ? (
        <CheckInWizard
          existingPatients={EXISTING_PATIENTS}
          onCheckIn={() => {
            setVisits((current) => [checkedInVisit(checkingIn), ...current]);
            setCheckingIn(null);
          }}
          onPatientChange={setCheckingIn}
          patient={checkingIn}
        />
      ) : (
        <DeskQueue
          onCallVisit={(visitId) =>
            patch(visitId, (visit) => ({
              ...visit,
              call: { state: 'called', atLabel: '09:41', deskLabel: 'Bay 1' },
            }))
          }
          onNewWalkIn={() => setCheckingIn(blankWalkIn('walk-in-flow', 29))}
          onSkipVisit={(visitId: string, reason: QueueSkipReasonCode) =>
            patch(visitId, (visit) => skipVisit(visit, reason, '09:42'))
          }
          onStartDraw={(visitId) =>
            patch(visitId, (visit) => ({
              ...visit,
              stage: 'in-draw',
              call: { state: 'serving', deskLabel: 'Bay 1' },
            }))
          }
          visits={visits}
        />
      )}
    </AppShell>
  );
}

/**
 * One-staffer continuity (T17a): the same person who received the patient
 * calls the ticket and starts the draw. Nothing here hands the visit to a
 * second role, and the queue never loses an unfinished capture.
 */
export const OneStafferThroughDraw: Story = {
  parameters: {
    kura: {
      flow: {
        pages: [
          'Clinic/Front Desk/Desk Queue',
          'Clinic/Front Desk/Check-In',
          'Clinic/Collection/Draw Worksheet',
        ],
      },
    },
  },
  render: () => <DeskContinuityHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Call the ticket at the top of the order.
    await userEvent.click(canvas.getByRole('button', { name: 'Call next · B-025' }));
    await expect(await canvas.findByText('Now calling')).toBeVisible();

    // The same staffer starts the draw; the visit moves into the chair.
    const table = within(canvas.getByRole('table', { name: 'Active visits' }));
    await userEvent.click(await table.findByRole('button', { name: 'Start draw' }));
    await waitFor(async () => {
      await expect(canvas.getByText('In the chair')).toBeVisible();
    });

    // A new walk-in opens the flow from the same queue.
    await userEvent.click(canvas.getByRole('button', { name: 'New walk-in' }));
    await expect(
      await canvas.findByRole('heading', { level: 2, name: 'Find the booking' }),
    ).toBeVisible();
  },
};
