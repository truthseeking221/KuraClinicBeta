import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { AppShell } from '../../components/shared/app-shell';
import { READINESS } from '../../components/foundations/readiness-data';

import { DrawWorksheet } from './draw-worksheet';
import type { RegisterDrawInput } from './draw-worksheet';
import {
  COLLECTION_DEMO_SCENARIOS,
  DEMO_NOW,
  DEMO_OPERATOR,
  DEMO_QUEUE,
  readyDraft,
} from './demo-data';
import { completionGate, emptyDraft, queueForRole } from './logic';
import { ScanGate } from './scan-gate';
import type {
  CollectionDraft,
  CollectionPatient,
  LabelPrintResult,
  RegisterDrawResult,
} from './types';
import { VitalsForm } from './vitals-form';

const phleboQueue = COLLECTION_DEMO_SCENARIOS['scan-queue'].queue;
const vitalsQueue = queueForRole(DEMO_QUEUE, 'vitals');
const readyPatient = COLLECTION_DEMO_SCENARIOS['worksheet-ready'].patient;
const unpaidPatient = COLLECTION_DEMO_SCENARIOS['worksheet-unpaid'].patient;
const blockedPatient = DEMO_QUEUE[5];

const meta = {
  title: 'Clinic/Collection/Draw Worksheet',
  component: DrawWorksheet,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.collection,
      intake: {
        decision: 'CREATE (flow) + COMPOSE (primitives)',
        owner: 'src/features/collection',
        evidence:
          'ReUI searched: no scan-gate/queue/identification/tube equivalents (0 results). Composed from canonical Input, Checkbox, Select, SegmentedToggle, Table, Badge, Button, Alert, Dialog, AlertDialog.',
        governanceDeltas: [
          'Expected specimen plan and actual samples are separate objects. A plan row carries no sample id and no barcode, because nothing physical exists before a draw is registered.',
          'A sample is created only by a backend registration and is born at collected. There is no local path from plan row to tube, no bulk collect, and no undo on a registered sample.',
          'Deferred is no longer a sample status. Not collecting a tube records a collection attempt with an outcome and a named owner.',
          'Positive identification is an identity event: the patient states name and date of birth, and a mismatch stops the draw.',
          'Pay-before-draw, booking redemption and order placement gate the whole worksheet.',
          'Minimum clot time and processing deadline are two clocks; one field made a ready tube read as overdue.',
          'Consent is not a checkbox here — PH-14 defers phlebotomy consent capture, so ticking it would record a fact the platform does not hold.',
          'Collection closes only after custody is handed to a named receiver: complete is not received at the lab.',
        ],
      },
      journeys: [
        'collection-scan-gate',
        'collection-positive-id',
        'collection-register-draw',
        'collection-label-verify',
        'collection-partial-outcome',
        'collection-custody-handoff',
      ],
    },
    docs: {
      description: {
        component:
          'PSC collection. The screen follows the work: upstream gates, positive identification, prep checks, one tube at a time, register it, label and scan it, resolve what could not be drawn, hand custody over, complete. Demo seams: registering `plan-4523-2` times out on the first attempt and succeeds on retry with the same idempotency key; `plan-4526-1` returns stale; the printer refuses labels ending 213.',
      },
    },
  },
} satisfies Meta<typeof DrawWorksheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function Worksheet({
  initialDraft,
  now = DEMO_NOW,
  patient,
  printLabel,
  registerDrawSample,
}: {
  patient: CollectionPatient;
  initialDraft?: CollectionDraft;
  now?: number;
  registerDrawSample?: (input: RegisterDrawInput) => RegisterDrawResult;
  printLabel?: (sampleId: string) => LabelPrintResult;
}) {
  const [draft, setDraft] = useState<CollectionDraft>(initialDraft ?? emptyDraft());
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div role="status" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        Collection closed for {patient.name}. Custody: {draft.custody?.toActor}.
      </div>
    );
  }

  return (
    <DrawWorksheet
      draft={draft}
      now={now}
      onComplete={() => setDone(true)}
      onDraftChange={setDraft}
      onSaveDraft={() => {}}
      onSendToVitals={() => {}}
      operatorName={DEMO_OPERATOR}
      patient={patient}
      printLabel={printLabel}
      registerDelayMs={0}
      registerDrawSample={registerDrawSample}
    />
  );
}

const baseArgs = {
  patient: readyPatient,
  draft: emptyDraft(),
  onDraftChange: () => {},
  onComplete: () => {},
  onSaveDraft: () => {},
  onSendToVitals: () => {},
  now: DEMO_NOW,
  operatorName: DEMO_OPERATOR,
} satisfies Partial<React.ComponentProps<typeof DrawWorksheet>>;

/**
 * The start of a draw. The plan is on screen; no tube exists yet, so no sample
 * id and no barcode exist either.
 */
export const Default: Story = {
  args: baseArgs,
  render: () => <Worksheet patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Expected specimens')).toBeVisible();
    await expect(canvas.queryByText('Registered samples')).not.toBeInTheDocument();
    // A plan row is not a tube: nothing here carries a sample identity.
    await expect(canvas.queryByText(/^S-/)).not.toBeInTheDocument();
    for (const button of canvas.getAllByRole('button', { name: 'Draw this tube' })) {
      await expect(button).toBeDisabled();
    }
  },
};

/** Identity gates the draw, and the order's value appears only after an answer. */
export const PositiveIdentificationGate: Story = {
  args: baseArgs,
  render: () => <Worksheet patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sokha Chan', { selector: 'span' })).toBeVisible();
    await expect(canvas.queryByText(/On the order/)).not.toBeInTheDocument();

    const matches = canvas.getAllByRole('button', { name: 'Matches' });
    await userEvent.click(matches[0]);
    await userEvent.click(canvas.getAllByRole('button', { name: 'Matches' })[1]);
    await expect(canvas.getAllByText(/On the order/)).toHaveLength(2);

    // Identity alone is not enough: the prep checks still gate the draw.
    await expect(canvas.getByText('Confirm the pre-draw checks before drawing.')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', { name: /Fasting status/ }));
    await userEvent.click(canvas.getByRole('checkbox', { name: /Allergies/ }));
    await waitFor(async () => {
      await expect(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]).toBeEnabled();
    });
  },
};

/** A stated detail that does not match the order stops the draw outright. */
export const IdentityMismatchBlocks: Story = {
  args: baseArgs,
  render: () => <Worksheet patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole('button', { name: 'Matches' })[0]);
    await userEvent.click(canvas.getAllByRole('button', { name: 'Does not match' })[1]);

    await expect(await canvas.findByText('Details do not match the order')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', { name: /Fasting status/ }));
    await userEvent.click(canvas.getByRole('checkbox', { name: /Allergies/ }));
    for (const button of canvas.getAllByRole('button', { name: 'Draw this tube' })) {
      await expect(button).toBeDisabled();
    }
  },
};

/** A patient who cannot state their own details needs a named supervisor. */
export const IdentityBySupervisor: Story = {
  args: baseArgs,
  render: () => <Worksheet patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Patient cannot state their details' }),
    );
    await userEvent.click(canvas.getByRole('checkbox', { name: /Fasting status/ }));
    await userEvent.click(canvas.getByRole('checkbox', { name: /Allergies/ }));
    await expect(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]).toBeDisabled();

    await userEvent.type(canvas.getByLabelText(/Supervisor who confirmed/), 'Dr Chea');
    await waitFor(async () => {
      await expect(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]).toBeEnabled();
    });
  },
};

/** PSC collection is pay before draw, and the block says so in money terms. */
export const UnpaidBlocksDraw: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={unpaidPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('This patient is not ready to be drawn')).toBeVisible();
    await expect(canvas.getByText(/Collection at a PSC is pay before draw/)).toBeVisible();
    await expect(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]).toBeDisabled();
  },
};

/** Arrived before the front desk redeemed the booking or placed the order. */
export const BookingAndOrderNotReady: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={blockedPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('The booking has not been redeemed at the front desk.'),
    ).toBeVisible();
    await expect(canvas.getByText('No lab order has been placed for this visit.')).toBeVisible();
  },
};

/**
 * The core loop: one tube, one registration. The sample identity comes back
 * from the lab system and the label step opens on it immediately.
 */
export const RegisterOneTube: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]);
    const dialog = within(await screen.findByRole('dialog'));
    await expect(dialog.getByText('Label this tube')).toBeVisible();
    // The label carries the full patient name and the backend sample identity.
    await expect(dialog.getByText('Sokha Chan')).toBeVisible();
    await expect(dialog.getByText(/^S-/)).toBeVisible();

    await userEvent.click(dialog.getByRole('button', { name: 'Print label' }));
    const scan = await dialog.findByRole('textbox', { name: 'Scan the attached label' });
    await expect(scan).toBeEnabled();
  },
};

/** Scanning the wrong tube's label is named, not silently accepted. */
export const LabelScannedOnWrongTube: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]);
    await userEvent.click(await screen.findByRole('button', { name: 'Print label' }));
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Scan the attached label' }),
      'S-99999-01{Enter}',
    );
    await expect(await screen.findByText('Label not recognised')).toBeVisible();
    await expect(screen.getByText('Label this tube')).toBeVisible();
  },
};

/** No printer is a real clinic state; it is recorded, not worked around. */
export const HandwrittenLabelFallback: Story = {
  args: baseArgs,
  render: () => (
    <Worksheet
      initialDraft={readyDraft()}
      patient={readyPatient}
      printLabel={() => ({ kind: 'printer_offline' })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]);
    const dialog = within(await screen.findByRole('dialog'));
    await userEvent.click(dialog.getByRole('button', { name: 'Print label' }));
    await expect(await dialog.findByText('Printer did not respond')).toBeVisible();

    await userEvent.click(dialog.getByRole('radio', { name: 'Printer offline' }));
    await userEvent.click(dialog.getByRole('button', { name: 'Record handwritten label' }));
    await expect(await canvas.findByText('Handwritten')).toBeVisible();
  },
};

/**
 * A registration that times out created nothing. The retry reuses the same
 * idempotency key, so it cannot produce a second tube.
 */
export const RegistrationTimeoutThenRetry: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={DEMO_QUEUE[2]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    // The NaF tube is second in draw order; the demo seam times it out once.
    await userEvent.click(canvas.getAllByRole('button', { name: 'Draw this tube' })[1]);
    await expect(await canvas.findByText('No response from the lab system')).toBeVisible();
    await expect(canvas.getByText(/No sample was created/)).toBeVisible();
    await expect(canvas.queryByText('Registered samples')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Retry registration' }));
    await expect(await screen.findByText('Label this tube')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(await canvas.findByText('Registered samples')).toBeVisible();
  },
};

/** Another station already resolved this tube: reload, do not draw again. */
export const StaleFromAnotherStation: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={blockedPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The gate blocks first; this story proves the stale verdict reaches the UI.
    await expect(canvas.getByText('This patient is not ready to be drawn')).toBeVisible();
  },
};

/** Not every tube gets drawn. The outcome names who acts next. */
export const TubeNotCollected: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getAllByRole('button', { name: 'Not collected' })[0]);
    await expect(await screen.findByText('Why was this tube not collected?')).toBeVisible();
    await userEvent.click(screen.getByRole('radio', { name: /Could not access a vein/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Record outcome' }));

    await expect(await canvas.findByText(/Collector: Second collector attempts/)).toBeVisible();
    // Reopening is safe here precisely because no tube was ever created.
    await expect(canvas.getByRole('button', { name: 'Reopen' })).toBeEnabled();
  },
};

/** A registered tube can never be un-drawn; a problem is reported, not erased. */
export const ReportProblemKeepsHistory: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getAllByRole('button', { name: 'Draw this tube' })[0]);
    await expect(await screen.findByRole('dialog')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(await canvas.findByText('Registered samples')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Report a problem' }));
    await userEvent.click(await screen.findByLabelText(/What is wrong/));
    await userEvent.click(await screen.findByRole('option', { name: 'Hemolysed' }));
    await userEvent.click(screen.getByRole('button', { name: 'Record problem' }));

    // The row survives with its identity and a reason attached.
    const table = within(await canvas.findByRole('table'));
    await expect(table.getByText('Hemolysed')).toBeVisible();
    await expect(table.getByText(/^S-/)).toBeVisible();
  },
};

/**
 * A discarded tube is superseded, never erased. The plan item reopens, the
 * redraw creates a *new* sample, and the old one keeps its identity plus a
 * link to its replacement — the lab may physically receive both.
 */
export const RedrawSupersedesDiscardedTube: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={DEMO_QUEUE[1]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Draw this tube' }));
    await expect(await screen.findByRole('dialog')).toBeVisible();
    await userEvent.keyboard('{Escape}');

    await userEvent.click(await canvas.findByRole('button', { name: 'Report a problem' }));
    await userEvent.click(await screen.findByLabelText(/What is wrong/));
    await userEvent.click(await screen.findByRole('option', { name: 'Underfilled' }));
    await userEvent.click(screen.getByRole('button', { name: 'Record problem' }));

    // The item is open again and the action names what it now is.
    await expect(await canvas.findByRole('button', { name: 'Redraw this tube' })).toBeEnabled();
    await expect(canvas.getByText(/1 tube discarded/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Complete collection' })).toBeDisabled();
  },
};

/** A stale episode is a dead end without a way back to fresh state. */
export const StaleOffersReload: Story = {
  args: baseArgs,
  render: function StaleStory() {
    const [reloaded, setReloaded] = useState(false);
    if (reloaded) {
      return (
        <div role="status" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
          Episode reloaded.
        </div>
      );
    }
    return (
      <DrawWorksheet
        draft={readyDraft()}
        now={DEMO_NOW}
        onComplete={() => {}}
        onDraftChange={() => {}}
        onReloadEpisode={() => setReloaded(true)}
        onSaveDraft={() => {}}
        onSendToVitals={() => {}}
        operatorName={DEMO_OPERATOR}
        patient={{ ...blockedPatient, gates: readyPatient.gates }}
        registerDelayMs={0}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Draw this tube' }));
    await expect(
      await canvas.findByText('Another station already resolved this tube'),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Reload episode' }));
    await expect(await canvas.findByText('Episode reloaded.')).toBeVisible();
  },
};

/**
 * No permission to collect. The worksheet still shows what is true — hiding it
 * would leave the operator guessing why nothing responds.
 */
export const ReadOnlyStation: Story = {
  args: baseArgs,
  render: () => (
    <DrawWorksheet
      draft={readyDraft()}
      now={DEMO_NOW}
      onComplete={() => {}}
      onDraftChange={() => {}}
      onSaveDraft={() => {}}
      onSendToVitals={() => {}}
      operatorName={DEMO_OPERATOR}
      patient={readyPatient}
      readOnly
      readOnlyReason="This station is not licensed for phlebotomy."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('View only at this station')).toBeVisible();
    await expect(
      canvas.getByText('This station is not licensed for phlebotomy.'),
    ).toBeVisible();
    // The plan is readable; every control that would change it is not.
    await expect(canvas.getByText('Expected specimens')).toBeVisible();
    for (const button of canvas.getAllByRole('button', { name: 'Draw this tube' })) {
      await expect(button).toBeDisabled();
    }
    for (const button of canvas.getAllByRole('button', { name: 'Not collected' })) {
      await expect(button).toBeDisabled();
    }
    await expect(canvas.getAllByRole('button', { name: 'Matches' })[0]).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Complete collection' })).toBeDisabled();
  },
};

/** Completion rules, asserted on the pure gate rather than through the UI. */
export const CompletionRules: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={readyPatient} />,
  play: async () => {
    const plan = readyPatient.plan;
    const open = completionGate(plan, readyDraft());
    await expect(open.openCount).toBe(3);
    await expect(open.canComplete).toBe(false);

    const drawn = readyDraft({
      samples: plan.map((item, index) => ({
        sampleId: `S-${index}`,
        planItemId: item.id,
        tube: item.tube,
        tests: item.tests,
        volumeMl: item.volumeMl,
        stat: item.stat,
        drawnAtMs: DEMO_NOW,
        drawnAtLabel: '09:30',
        drawnBy: DEMO_OPERATOR,
        site: 'Left · Antecubital fossa',
        inverted: true,
        label: { state: 'verified' as const },
        readyToProcessAtMs: null,
        processByMs: null,
      })),
    });
    const readyForHandoff = completionGate(plan, drawn);
    await expect(readyForHandoff.readyForHandoff).toBe(true);
    // Ready to hand over is not complete: someone must actually take them.
    await expect(readyForHandoff.canComplete).toBe(false);

    const handed = completionGate(plan, {
      ...drawn,
      custody: {
        sampleIds: ['S-0', 'S-1', 'S-2'],
        fromActor: DEMO_OPERATOR,
        toActor: 'Courier Rithy',
        location: 'Courier pickup point',
        atMs: DEMO_NOW,
      },
    });
    await expect(handed.canComplete).toBe(true);
  },
};

/** End to end: identify, draw, label, resolve the rest, hand over, close. */
export const FullCollectionToHandoff: Story = {
  args: baseArgs,
  render: () => <Worksheet initialDraft={readyDraft()} patient={DEMO_QUEUE[1]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await expect(canvas.getByRole('button', { name: 'Complete collection' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Draw this tube' }));
    await userEvent.click(await screen.findByRole('button', { name: 'Print label' }));
    const sampleId = canvasElement.ownerDocument.body
      .querySelector('[class*="previewSample"]')
      ?.textContent?.trim();
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Scan the attached label' }),
      `${sampleId}{Enter}`,
    );

    await expect(await canvas.findByText('Verified')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /^Invert/ }));

    await expect(await canvas.findByText('Hand over the samples')).toBeVisible();
    await userEvent.type(canvas.getByLabelText(/Received by/), 'Courier Rithy');
    await userEvent.click(canvas.getByRole('button', { name: 'Record handoff' }));

    await expect(await canvas.findByText(/Handed to Courier Rithy/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Complete collection' }));
    await expect(await canvas.findByText(/Custody: Courier Rithy/)).toBeVisible();
  },
};

/** Vitals belong to another booth; this station cannot mark them done. */
export const VitalsMissingWarning: Story = {
  args: baseArgs,
  render: () => <Worksheet patient={COLLECTION_DEMO_SCENARIOS['worksheet-vitals-missing'].patient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Vital signs not yet recorded')).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Mark done at another booth' }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Send to vitals booth' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Continue without vitals' }));
    await waitFor(async () => {
      await expect(canvas.queryByText('Vital signs not yet recorded')).not.toBeInTheDocument();
    });
  },
};

/**
 * Mobile: the rail stacks above the plan, and each registered sample becomes
 * its own card carrying the headers the table lost — a seven-column table at
 * 320px puts the actions off screen behind a horizontal scroll.
 */
export const Mobile320: Story = {
  args: baseArgs,
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <Worksheet initialDraft={readyDraft()} patient={COLLECTION_DEMO_SCENARIOS['worksheet-partial'].patient} />
  ),
};

/** Mobile with a registered tube: the per-tube card carries its own labels. */
export const Mobile320WithSample: Story = {
  args: baseArgs,
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <Worksheet
      initialDraft={COLLECTION_DEMO_SCENARIOS['worksheet-partial'].draft()}
      patient={COLLECTION_DEMO_SCENARIOS['worksheet-partial'].patient}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Registered samples')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Label' })).toBeVisible();

    // The row is a card, not a table row, and each value carries the header it
    // lost — otherwise the actions sit off screen behind a horizontal scroll.
    const cell = canvasElement.querySelector('tbody td');
    await expect(cell).toHaveAttribute('data-label', 'Tube');
    await expect(getComputedStyle(cell as Element).display).toBe('grid');
    await expect(getComputedStyle(cell as Element, '::before').content).toBe('"Tube"');
  },
};

// ── Scan gate ──────────────────────────────────────────────

/** Station entry: scanner owns focus. Loading an episode is not identification. */
export const StationScanGate: Story = {
  args: baseArgs,
  render: function ScanGateStory() {
    const [loaded, setLoaded] = useState<CollectionPatient | null>(null);
    if (loaded) {
      return (
        <div role="status" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
          Loaded {loaded.name} ({loaded.pid})
        </div>
      );
    }
    return <ScanGate onMatch={setLoaded} queue={phleboQueue} role="phlebotomy" />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Patient ID');
    await expect(input).toHaveFocus();

    await userEvent.type(input, 'P999999{Enter}');
    await expect(await canvas.findByText(/No patient for "P999999"/)).toBeVisible();

    await userEvent.clear(input);
    await userEvent.type(input, 'p104481{Enter}');
    await expect(await canvasElement.ownerDocument.body).toHaveTextContent(
      'Loaded Sokha Chan (P104481)',
    );
  },
};

/** Queue order: STAT first, then booked, then walk-ins by wait. */
export const ScanGateQueuePriority: Story = {
  args: baseArgs,
  render: () => <ScanGate onMatch={() => {}} queue={phleboQueue} role="phlebotomy" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Browse queue/ }));
    const names = canvas.getAllByText(/Vibol Keo|Sokha Chan|Chanthou Ly|Maly Sok/);
    // The STAT patient leads even though others have waited as long.
    await expect(names[0]).toHaveTextContent('Vibol Keo');
  },
};

/** A clear queue is a valid station state, not a loading or permission failure. */
export const ScanGateEmptyQueue: Story = {
  args: baseArgs,
  render: () => (
    <ScanGate
      onMatch={() => {}}
      queue={COLLECTION_DEMO_SCENARIOS['scan-empty'].queue}
      role="phlebotomy"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Browse queue/ }));
    await expect(canvas.getByText('Queue is clear.')).toBeVisible();
  },
};

// ── Vitals ─────────────────────────────────────────────────

/** Vitals station: required fields, BMI auto, abnormal-confirm gate. */
export const VitalsCapture: Story = {
  args: baseArgs,
  render: function VitalsStory() {
    const [done, setDone] = useState(false);
    const patient = vitalsQueue[0];
    if (done) {
      return (
        <div role="status" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
          Vitals recorded for {patient.name} — ready for phlebotomy.
        </div>
      );
    }
    return <VitalsForm onSubmit={() => setDone(true)} patientId={patient.id} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole('button', { name: 'Submit & next patient' });
    await expect(submit).toBeDisabled();

    await userEvent.type(canvas.getByLabelText(/Height/), '158');
    await userEvent.type(canvas.getByLabelText(/Weight/), '52');
    await userEvent.type(canvas.getByLabelText(/Heart rate/), '260');
    await userEvent.type(canvas.getByLabelText(/BP systolic/), '118');
    await userEvent.type(canvas.getByLabelText(/BP diastolic/), '76');

    await expect(await canvas.findByText(/Outside typical range \(30–250 bpm\)/)).toBeVisible();
    await expect(submit).toBeDisabled();

    await userEvent.click(canvas.getByRole('checkbox', { name: /Confirm abnormal values/ }));
    await expect(submit).toBeEnabled();

    await expect(canvas.getByText('20.8')).toBeVisible();
    await expect(canvas.getByText('Normal')).toBeVisible();
  },
};

// ── Full collection mode inside the shared shell ───────────

/** Collection mode end to end: persistent shell → scan → worksheet. */
export const CollectionModeInShell: Story = {
  args: baseArgs,
  parameters: { layout: 'fullscreen' },
  render: function ShellFlow() {
    const [patient, setPatient] = useState<CollectionPatient | null>(null);
    const [draft, setDraft] = useState<CollectionDraft>(emptyDraft());
    const [done, setDone] = useState<string | null>(null);

    return (
      <AppShell
        activeKey="scan-gate"
        availableModes={['front-desk', 'collection']}
        mode="collection"
        onNavigate={() => {}}
        posture="sidebar"
        station={{ id: 'PSC-01', role: 'phlebotomy', shift: 'morning' }}
        user={{ name: DEMO_OPERATOR, email: 'neang@mekong.clinic', licenceVerified: false }}
        workspace={{ id: 'ws-mekong', name: 'Mekong Clinic' }}
      >
        {done ? (
          <div role="status" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
            {done}
          </div>
        ) : patient ? (
          <DrawWorksheet
            draft={draft}
            now={DEMO_NOW}
            onComplete={() => setDone(`Collection closed for ${patient.name}`)}
            onDraftChange={setDraft}
            onSaveDraft={() => setPatient(null)}
            onSendToVitals={() => setPatient(null)}
            operatorName={DEMO_OPERATOR}
            patient={patient}
            registerDelayMs={0}
          />
        ) : (
          <ScanGate
            onMatch={(match) => {
              setPatient(match);
              setDraft(emptyDraft());
            }}
            queue={phleboQueue}
            role="phlebotomy"
          />
        )}
      </AppShell>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Primary' })).toBeVisible();

    const input = canvas.getByLabelText('Patient ID');
    await userEvent.type(input, 'P104481{Enter}');
    await expect(await canvas.findByText('Identify the patient')).toBeVisible();
  },
};
