import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { AppShell } from '../../components/shared/app-shell';

import { CheckInWizard } from './check-in-wizard';
import {
  blankWalkIn,
  DESK_VISITS,
  EXISTING_PATIENTS,
  FRONT_DESK_QUEUE_DEMO_SCENARIOS,
} from './demo-data';
import { DeskQueue } from './desk-queue';
import type { DeskVisit, FrontDeskPatient } from './types';
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
          'kura-platform has no queue, visit, or check-in engine today — no controller, proto, or enum. This surface is the reception workbench the truth pack mandates (REC-01/02/05, workbench lifecycle §5.1) and must not be read as an executable backend capability.',
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
      journeys: ['REC-01-check-in-planned-visit', 'REC-02-walk-in-check-in', 'REC-05-queue-for-phlebotomy', 'WQ-09-empty-error-stale-worklist'],
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
          'Reception worklist adapted from ReUI data-grid-base-7. Each row keeps visit stage, identity assurance, payment, reception wait, and the one valid desk action separate. Reception wait ends at handoff, so downstream visits never keep raising false desk escalations. Completed visits are available in a secondary disclosure instead of competing with active work.',
      },
    },
  },
  args: {
    visits: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-default'].visits,
    onResumeVisit: fn(),
    onQueueForDraw: fn(),
    onNewWalkIn: fn(),
    onRetry: fn(),
    onRefresh: fn(),
  },
} satisfies Meta<typeof DeskQueue>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A realistic mid-morning queue: every stage and payment fact visible at once. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('5 in progress · 1 completed today')).toBeVisible();

    // Unfinished check-ins first; each row carries independent axis facts.
    const activeTable = canvas.getByRole('table', { name: 'Active visits' });
    const rows = within(activeTable).getAllByRole('row').slice(1);
    await expect(within(rows[0]).getByText('Chenda Sreymom')).toBeVisible();
    await expect(within(rows[0]).getByText('ID unverified')).toBeVisible();
    await expect(within(rows[0]).getByText('Pay later')).toBeVisible();

    await userEvent.click(within(rows[0]).getByRole('button', { name: 'Resume check-in · Step 2' }));
    await expect(args.onResumeVisit).toHaveBeenCalledWith('v-2');

    await userEvent.click(within(activeTable).getByRole('button', { name: 'Queue for phlebotomy' }));
    await expect(args.onQueueForDraw).toHaveBeenCalledWith('v-3');

    // A handed-off visit keeps arrival context without a false reception timer.
    const handedOffRow = rows.find((row) => within(row).queryByText('Vibol Keo'))!;
    await expect(within(handedOffRow).getByText('Handoff complete')).toBeVisible();
    await expect(within(handedOffRow).queryByText(/waiting 62m/)).not.toBeInTheDocument();
  },
};

/** Paid ≠ arrived, drawn ≠ paid: axes never collapse into one status. */
export const IndependentAxes: Story = {
  args: {
    visits: [
      // Paid in full but the check-in is unfinished — still "Checking in".
      { ...DESK_VISITS[0], payment: 'collected' },
      // Identity resolved but payment still waiting on Bakong.
      DESK_VISITS[3],
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = within(canvas.getByRole('table', { name: 'Active visits' }))
      .getAllByRole('row')
      .slice(1);
    await expect(within(rows[0]).getByText('Checking in')).toBeVisible();
    await expect(within(rows[0]).getByText('Paid')).toBeVisible();
    await expect(within(rows[1]).getByText('With phlebotomy')).toBeVisible();
    await expect(within(rows[1]).getByText('KHQR waiting')).toBeVisible();
  },
};

/** Over 30 minutes warns, over 60 escalates — the copy carries the word, not just color. */
export const LongWait: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-long-wait'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const activeTable = within(canvas.getByRole('table', { name: 'Active visits' }));
    await expect(activeTable.getByText(/waiting 85m — escalate/)).toBeVisible();
    await expect(activeTable.getByText(/waiting 70m — escalate/)).toBeVisible();
  },
};

export const Empty: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-empty'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No arrivals yet')).toBeVisible();
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

export const Offline: Story = {
  args: FRONT_DESK_QUEUE_DEMO_SCENARIOS['queue-offline'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You are offline')).toBeVisible();
    await expect(canvas.getByText(/from 09:12/)).toBeVisible();
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
    const list = canvas.getByRole('list', { name: 'Active visits' });
    await expect(within(list).getByRole('button', { name: 'Queue for phlebotomy' })).toBeVisible();
  },
};

// ── Flow: check-in hands off to the queue ──────────────────

function CheckInToQueueHarness() {
  const [visits, setVisits] = useState<DeskVisit[]>(DESK_VISITS.slice(2));
  const [checkingIn, setCheckingIn] = useState<FrontDeskPatient | null>(null);

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
            setVisits((current) => [
              {
                id: checkingIn.id,
                queueNumber: checkingIn.queueNumber,
                patientName: checkingIn.name,
                arrivedLabel: '09:41',
                waitMinutes: 0,
                stage: 'identity-resolved',
                assurance: 'unverified',
                payment: checkingIn.cart.payment.status === 'confirmed' ? 'collected' : 'deferred',
              },
              ...current,
            ]);
            setCheckingIn(null);
          }}
          onPatientChange={setCheckingIn}
          patient={checkingIn}
        />
      ) : (
        <DeskQueue
          onNewWalkIn={() => setCheckingIn(blankWalkIn('walk-in-flow', 29))}
          onQueueForDraw={(visitId) =>
            setVisits((current) =>
              current.map((visit) =>
                visit.id === visitId ? { ...visit, queuedForDraw: true } : visit,
              ),
            )
          }
          visits={visits}
        />
      )}
    </AppShell>
  );
}

/**
 * Reception terminal outcome (truth pack §5.6): identity resolved → visit on
 * the queue → queued for phlebotomy exactly once. The Collection mode's Draw
 * Worksheet owns the next step.
 */
export const CheckInToQueueFlow: Story = {
  parameters: {
    kura: {
      flow: {
        pages: [
          'Clinic/Front Desk/Desk Queue',
          'Clinic/Front Desk/Check-In Wizard',
          'Clinic/Collection/Draw Worksheet',
        ],
      },
    },
  },
  render: () => <CheckInToQueueHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Queue a resolved identity for phlebotomy — the action retires after one use.
    await userEvent.click(canvas.getByRole('button', { name: 'Queue for phlebotomy' }));
    await waitFor(async () => {
      await expect(
        canvas.queryByRole('button', { name: 'Queue for phlebotomy' }),
      ).not.toBeInTheDocument();
    });

    // A new walk-in opens the wizard from the queue.
    await userEvent.click(canvas.getByRole('button', { name: 'New walk-in' }));
    await expect(await canvas.findByText('Find or create a patient')).toBeVisible();
  },
};
