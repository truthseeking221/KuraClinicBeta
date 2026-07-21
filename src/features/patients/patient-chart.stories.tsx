import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { PatientContextRail } from '../patient-context/patient-context-rail';
import { PATIENT_CONTEXT_FIXTURES } from '../patient-context/demo-data';
import { LabFlowsheet } from '../results';
import { FIRST_VISIT_SECTIONS } from '../results/demo-data';

import { PatientChart } from './patient-chart';
import { NextActionsRail, ResultsProgressRail } from './action-rails';
import { PrescribeRail } from './prescribe-rail';
import {
  DEMO_DIAGNOSES,
  DEMO_NEEDS_REVIEW,
  DEMO_ORDERS,
  DEMO_PATIENTS,
  DEMO_RESULTS_PROGRESS,
  DEMO_SETTLED,
  DEMO_SUGGESTIONS,
} from './demo-data';
import { PATIENTS_STORYBOOK_KURA } from './storybook-metadata';
import type { PatientSummary } from './types';

const SOK_NIMOL = DEMO_PATIENTS[0];
const LINA_PRUM_UNVERIFIED = DEMO_PATIENTS[2];
const CHAN_THOEUN_DECEASED = DEMO_PATIENTS[7];
const MALIS_KEO_MERGED = DEMO_PATIENTS[8];

const RAIL = (
  <PatientContextRail {...PATIENT_CONTEXT_FIXTURES.established} showIdentity={false} />
);
const RESULTS = (
  <LabFlowsheet sections={FIRST_VISIT_SECTIONS} title="Results — booking AB12345" />
);

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div style={{ blockSize: '100vh' }}>{children}</div>;
}

const meta = {
  title: 'Clinic/Clinical/Patients/Chart',
  component: PatientChart,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: PATIENTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The patient chart shell: pinned identity bar, persistent context rail (canonical PatientContextRail, safety never collapses), and three tabs that are real or one endpoint away: Overview (identity + sighted-document verification mirroring the verify-identity endpoint), Orders (the patient orders REST shape), Results (the canonical results flowsheet). Deceased and merged records block clinical work before any tab renders. The rail content remains target-contract scaffolding; see the readiness board.',
      },
    },
  },
  args: {
    patient: SOK_NIMOL,
    patients: DEMO_PATIENTS,
    orders: DEMO_ORDERS,
    rail: RAIL,
    results: RESULTS,
    onBack: fn(),
    onSwitchPatient: fn(),
  },
  decorators: [
    (Story) => (
      <ChartFrame>
        <Story />
      </ChartFrame>
    ),
  ],
} satisfies Meta<typeof PatientChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Calm-moment third rail: three launchers for the next clinical step.
 * The rail launches governed flows; nothing completes inside it.
 */
export const NextActions: Story = {
  args: {
    actionRail: (
      <NextActionsRail
        onOrder={fn()}
        onPrescribe={fn()}
        onSchedule={fn()}
        patientName="Nimol"
      />
    ),
  },
};

/**
 * Results-arriving moment: progress, what needs eyes now, and a one-tap
 * subscription instead of watching the page.
 */
export const ResultsArriving: Story = {
  args: {
    defaultTab: 'results',
    actionRail: (
      <ResultsProgressRail
        onReviewAvailable={fn()}
        progress={DEMO_RESULTS_PROGRESS}
      />
    ),
  },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('5 flagged values need review now')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Notify me when complete' }));
    await expect(
      canvas.getByText("You'll get one alert when all 30 are in."),
    ).toBeInTheDocument();
  },
};

/** Prescribing moment: the rail becomes the medication review workspace. */
export const PrescribeReview: Story = {
  args: {
    actionRail: (
      <PrescribeRail
        diagnoses={DEMO_DIAGNOSES}
        needsReview={DEMO_NEEDS_REVIEW}
        onBack={fn()}
        onComplete={fn()}
        patientName="Sok Nimol"
        settled={DEMO_SETTLED}
        suggestions={DEMO_SUGGESTIONS}
      />
    ),
  },
};

/** Terminal records never show an action rail, even when one is supplied. */
export const DeceasedHidesActionRail: Story = {
  args: {
    patient: CHAN_THOEUN_DECEASED,
    actionRail: <NextActionsRail patientName="Thoeun" />,
  },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText(/What should we do/)).not.toBeInTheDocument();
  },
};

export const OrdersTab: Story = {
  args: { defaultTab: 'orders' },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('AB12345')).toBeInTheDocument();
    await expect(canvas.getByText('Needs attention')).toBeInTheDocument();
    await expect(canvas.getByText('Cancelled')).toBeInTheDocument();
  },
};

export const ResultsTab: Story = {
  args: { defaultTab: 'results' },
};

/** Sighted-document verification: choose a type, verify, badge clears. */
export const VerifyIdentityFlow: Story = {
  args: { patient: LINA_PRUM_UNVERIFIED },
  tags: ['play-fn'],
  render: (args) => {
    function Harness() {
      const [patient, setPatient] = useState<PatientSummary>(LINA_PRUM_UNVERIFIED);
      return (
        <ChartFrame>
          <PatientChart
            {...args}
            onVerifyIdentity={() => setPatient({ ...patient, assurance: 'verified' })}
            patient={patient}
          />
        </ChartFrame>
      );
    }
    return <Harness />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Passport' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Verify identity' }));
    await expect(canvas.queryByText('Unverified')).not.toBeInTheDocument();
  },
};

export const SwitchPatient: Story = {
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Switch patient' }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('menuitem', { name: 'Dara Pich' }));
    await expect(args.onSwitchPatient).toHaveBeenCalledWith('p-dara-pich');
  },
};

/** Terminal guard: no tabs, no rail, no clinical work. */
export const Deceased: Story = {
  args: { patient: CHAN_THOEUN_DECEASED },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('This patient is deceased')).toBeInTheDocument();
    await expect(canvas.queryByRole('tab')).not.toBeInTheDocument();
  },
};

export const Merged: Story = {
  args: { patient: MALIS_KEO_MERGED, onOpenMergedRecord: fn() },
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open current record' }));
    await expect(args.onOpenMergedRecord).toHaveBeenCalled();
  },
};

export const NoOrders: Story = {
  args: { defaultTab: 'orders', orders: [] },
};

export const Loading: Story = {
  args: { state: 'loading' },
};

export const NotFound: Story = {
  args: { state: 'not-found' },
};

export const ErrorAndRecovery: Story = {
  args: { state: 'error', onRetry: fn() },
};

export const MobileWidth390: Story = {
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />,
  },
  globals: { viewport: { value: 'kura390' } },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: 'kura320' } },
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
};
