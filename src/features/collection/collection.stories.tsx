import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { AppShell } from '../../components/shared/app-shell';

import { DrawWorksheet } from './draw-worksheet';
import {
  COLLECTION_DEMO_SCENARIOS,
  DEMO_NOW,
  DEMO_OPERATOR,
  DEMO_QUEUE,
} from './demo-data';
import { queueForRole, submitGate } from './logic';
import { ScanGate } from './scan-gate';
import type { CollectionPatient, Sample } from './types';
import { VitalsForm } from './vitals-form';
import { READINESS } from '../../components/foundations/readiness-data';

const phleboQueue = COLLECTION_DEMO_SCENARIOS['scan-queue'].queue;
const vitalsQueue = queueForRole(DEMO_QUEUE, 'vitals');
const readyPatient = COLLECTION_DEMO_SCENARIOS['worksheet-ready'].patient;

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
          'ReUI searched: no scan-gate/queue/checklist/tube equivalents (0 results). Flow and rules ported from the validated phlebo prototype census; composed from canonical Input, Checkbox, Select, SegmentedToggle, Table, Badge, Button, Alert, AlertDialog.',
        governanceDeltas: [
          'Safety checklist now GATES collect actions (legacy rendered it but never read it).',
          'Collect/reset field writes unified across worksheet and inspector (legacy drifted).',
          'Escape-clear on scan fields actually implemented (legacy advertised it without a handler).',
          'Sample status vocabulary aligned to canonical enums; deferred is a booth-local workflow state.',
        ],
      },
      journeys: ['collection-scan-gate', 'collection-draw', 'collection-defer', 'collection-handoff'],
    },
    docs: {
      description: {
        component:
          'Phlebotomy worksheet for collection mode: pre-draw safety checklist gates collection, tubes sort by CLSI order of draw, clot clocks run per tube, inversions must be confirmed or explicitly overridden, and every tube must be resolved before handoff.',
      },
    },
  },
} satisfies Meta<typeof DrawWorksheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function WorksheetPlayground({
  patient,
  initialNow = DEMO_NOW,
}: {
  patient: CollectionPatient;
  initialNow?: number;
}) {
  const [samples, setSamples] = useState<Sample[]>(patient.samples);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (submitted) {
    return (
      <div role="status" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        Collection complete for {patient.name} — next patient.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
      {notice ? (
        <div aria-live="polite" role="status" style={{ fontSize: 'var(--type-xs)', color: 'var(--color-text-tertiary)' }}>
          {notice}
        </div>
      ) : null}
      <DrawWorksheet
        now={initialNow}
        onMarkVitalsDone={() => setNotice('Vitals marked done at another booth')}
        onNotify={(tone, text) => setNotice(`${tone}: ${text}`)}
        onSaveDraft={() => setNotice('Draft saved — patient stays in queue')}
        onSubmit={() => setSubmitted(true)}
        onUpdateSamples={setSamples}
        operatorName={DEMO_OPERATOR}
        patient={patient}
        samples={samples}
      />
    </div>
  );
}

/** Vitals done, three tubes awaiting — the normal start of a draw. */
export const Default: Story = {
  args: {
    patient: readyPatient,
    samples: readyPatient.samples,
    onUpdateSamples: () => {},
    onSubmit: () => {},
    onSaveDraft: () => {},
    onMarkVitalsDone: () => {},
    now: DEMO_NOW,
    operatorName: DEMO_OPERATOR,
  },
  render: () => <WorksheetPlayground patient={readyPatient} />,
};

/**
 * The checklist gate: collect actions stay disabled until all five safety
 * items are confirmed — the deliberate improvement over the legacy prototype.
 */
export const ChecklistGatesCollection: Story = {
  args: Default.args,
  render: () => <WorksheetPlayground patient={readyPatient} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const collectButtons = canvas.getAllByRole('button', { name: 'Collect' });
    for (const button of collectButtons) {
      await expect(button).toBeDisabled();
    }

    for (const label of [
      'Patient ID confirmed',
      'Fasting status checked',
      'Allergies reviewed',
      'Patient consented',
      'Site confirmed (L/R arm)',
    ]) {
      await userEvent.click(canvas.getByRole('checkbox', { name: label }));
    }

    await waitFor(async () => {
      const enabled = canvas.getAllByRole('button', { name: 'Collect' });
      await expect(enabled[0]).toBeEnabled();
    });

    await userEvent.click(canvas.getAllByRole('button', { name: 'Collect' })[0]);
    await expect(await canvas.findByText(/1\/3 collected/)).toBeVisible();
  },
};

/** Vitals skipped upstream — warning banner with the two legacy paths. */
export const VitalsMissingWarning: Story = {
  args: Default.args,
  render: () => (
    <WorksheetPlayground
      patient={COLLECTION_DEMO_SCENARIOS['worksheet-vitals-missing'].patient}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Vital signs not yet recorded')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Continue anyway' }));
    await waitFor(async () => {
      await expect(canvas.queryByText('Vital signs not yet recorded')).not.toBeInTheDocument();
    });
  },
};

/**
 * Clot clock. The SST was drawn 18 minutes into a 30-minute limit, so the
 * station is viewed 4 minutes later to sit inside the 10-minute warning band —
 * the point at which the tone changes is the thing worth proving.
 */
export const ClotClockRunning: Story = {
  args: Default.args,
  render: () => (
    <WorksheetPlayground
      initialNow={COLLECTION_DEMO_SCENARIOS['worksheet-partial'].now}
      patient={COLLECTION_DEMO_SCENARIOS['worksheet-partial'].patient}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('08:00')).toBeVisible();
  },
};

/** Submit gate math, asserted directly on the pure rule. */
export const SubmitGateRules: Story = {
  args: Default.args,
  render: () => <WorksheetPlayground patient={readyPatient} />,
  play: async () => {
    const checksDone = { id: true, fasting: true, allergy: true, consent: true, site: true };
    const collected = readyPatient.samples.map((sample) => ({
      ...sample,
      status: 'collected' as const,
      collectedAtMs: DEMO_NOW,
      inverted: false,
    }));

    const blockedByChecklist = submitGate(collected, { ...checksDone, id: false }, false);
    await expect(blockedByChecklist.canSubmit).toBe(false);

    const blockedByInversion = submitGate(collected, checksDone, false);
    await expect(blockedByInversion.inversionsBlocking).toBe(3);
    await expect(blockedByInversion.canSubmit).toBe(false);

    const overridden = submitGate(collected, checksDone, true);
    await expect(overridden.canSubmit).toBe(true);

    const inverted = collected.map((sample) => ({ ...sample, inverted: true }));
    await expect(submitGate(inverted, checksDone, false).canSubmit).toBe(true);
  },
};

/** Mobile: rail stacks above the table; wide rows scroll inside the table. */
export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <WorksheetPlayground patient={readyPatient} />,
};

// ── Scan gate ──────────────────────────────────────────────

/** Station entry: scanner owns focus; queue is the fallback, not the default. */
export const StationScanGate: Story = {
  args: Default.args,
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

/** Queue fallback with wait-tone escalation (>30 warn, >60 danger). */
export const ScanGateBrowseQueue: Story = {
  args: Default.args,
  render: () => <ScanGate onMatch={() => {}} queue={phleboQueue} role="phlebotomy" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Browse queue/ }));
    await expect(canvas.getByText('Vibol Keo')).toBeVisible();
    await expect(canvas.getByText('78 min')).toBeVisible();
  },
};

/** A clear queue is a valid station state, not a loading or permission failure. */
export const ScanGateEmptyQueue: Story = {
  args: Default.args,
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
  args: Default.args,
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

// ── Full collection flow inside the shared shell ───────────

/** The collection mode end-to-end: persistent shell → scan → worksheet. */
export const CollectionModeInShell: Story = {
  args: Default.args,
  parameters: { layout: 'fullscreen' },
  render: function ShellFlow() {
    const [patient, setPatient] = useState<CollectionPatient | null>(null);
    const [samples, setSamples] = useState<Sample[]>([]);
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
            now={DEMO_NOW}
            onMarkVitalsDone={() => {}}
            onSaveDraft={() => {
              setPatient(null);
            }}
            onSubmit={() => setDone(`Collection complete for ${patient.name}`)}
            onUpdateSamples={setSamples}
            operatorName={DEMO_OPERATOR}
            patient={patient}
            samples={samples}
          />
        ) : (
          <ScanGate
            onMatch={(match) => {
              setPatient(match);
              setSamples(match.samples);
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
    await expect(canvas.getByRole('button', { name: 'Scan' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    const input = canvas.getByLabelText('Patient ID');
    await userEvent.type(input, 'P104481{Enter}');
    await expect(await canvas.findByText('Before the draw')).toBeVisible();
  },
};
