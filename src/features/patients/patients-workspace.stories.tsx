import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';
import { CARE_LOOP_DEMO_INTAKE_RECORD } from '../care-loop/demo-data';

import { DEMO_PATIENTS, DEMO_RESUMABLE_PATIENT_JOURNEY } from './demo-data';
import { PatientsWorkspace } from './patients-workspace';

const meta = {
  title: 'Clinic/Flows/Create Patient from Registry',
  component: PatientsWorkspace,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.flows,
      flow: {
        pages: [
          'Clinic/Clinical/Patients/Registry',
          'Clinic/Flows/Patient Acquisition and Intake',
        ],
        terminal: 'Phone-resolved patient reaches the documented intake outcome',
      },
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/patients/patients-workspace.tsx',
        evidence:
          'PAT-18 and CASE-COV-013 require the Patients action to enter the governed phone and provisional-patient flow; PatientsRegistry and PatientAcquisitionFlow remain the canonical owners.',
        exclusions: [
          'No direct patient creation from the registry.',
          'No claim that phone possession verifies patient identity.',
          'Persistence is a prototype adapter until the BFF exposes resumable work.',
        ],
      },
      journeys: ['PAT-18'],
    },
    docs: {
      description: {
        component:
          'The documented PAT-18 entry: Add patient keeps the registry visible under the phone gate, then continues through confirmation, matching, and provisional-patient handling before intake.',
      },
    },
  },
  args: {
    acquisition: {
      demoIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
      intakeSendDelayMs: 300,
      phoneGateDelayMs: 0,
    },
    patients: [],
  },
} satisfies Meta<typeof PatientsWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StartsGovernedCreateFlow: Story = {
  tags: ['play-fn'],
  args: { patients: DEMO_PATIENTS },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Add patient' }));

    await expect(await screen.findByRole('heading', { name: 'Contact phone number' })).toBeVisible();
    // The modal makes the registry inert, but it must remain the visible
    // launch context rather than being replaced by the first-patient page.
    await expect(canvas.getByRole('region', { name: 'Patients' })).toBeVisible();
    await expect(canvas.queryByText('Add your first patient')).not.toBeInTheDocument();
    await expect(
      screen.queryByRole('button', { name: 'Create provisional patient' }),
    ).not.toBeInTheDocument();
  },
};

export const CancelReturnsToRegistry: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Add patient' }));
    await userEvent.click(
      await screen.findByRole('button', { name: 'Close patient identity gate' }),
    );

    await expect(await canvas.findByText('No patients yet')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Add patient' })).toBeEnabled();
  },
};

export const InterruptedPatientCanResume: Story = {
  args: {
    journey: DEMO_RESUMABLE_PATIENT_JOURNEY,
    onOpenPatient: undefined,
  },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Prepare collection tubes')).toBeVisible();
    await expect(
      canvas.getByRole('button', {
        name: /Continue prepare collection tubes for Sokha Chann/,
      }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('row', { name: /Open Sokha Chann/ }));
    await expect(
      canvas.getByRole('heading', { name: 'Prepare collection tubes' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'I have collected all 3 tubes' }),
    ).toBeVisible();
  },
};

export const Mobile320: Story = {
  globals: { viewport: { value: 'kura320' } },
};
