import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { PatientsRegistry } from './patients-registry';
import {
  DEMO_PATIENTS,
  DEMO_TOUR_PATIENT_IDS,
  DEMO_TOUR_PATIENTS,
  DEMO_TRIAGE,
  LONG_NAME_PATIENT,
} from './demo-data';
import { PATIENTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Patients/Registry',
  component: PatientsRegistry,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: PATIENTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The workspace patient registry: who this workspace has seen, most recent first, opening into the chart. The row shape mirrors the ListWorkspacePatients contract (masked phone and MRN, two-value assurance, terminal states). There is no name search: names are stored encrypted with no searchable index, so patients resolve through the reception doors instead. The "Why now" column is a target-contract triage layer and hides entirely when no triage data is supplied.',
      },
    },
  },
  args: {
    patients: DEMO_PATIENTS,
    onAddPatient: fn(),
    onOpenPatient: fn(),
  },
} satisfies Meta<typeof PatientsRegistry>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Backend-true core: four columns, recency order, no triage layer. */
export const Default: Story = {};

/** The triage layer on: one honest "why now" per patient that has one. */
export const TriageLayer: Story = {
  args: { triage: DEMO_TRIAGE },
};

export const OpensPatientOnRowClick: Story = {
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const row = await canvas.findByRole('row', { name: /Open Sok Nimol/ });
    await userEvent.click(row);
    await expect(args.onOpenPatient).toHaveBeenCalledWith('p-sok-nimol');
  },
};

export const FilterToUnverified: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: /Unverified/ }));
    await expect(canvas.queryByText('Sok Nimol')).not.toBeInTheDocument();
    await expect(canvas.getByText('Lina Prum')).toBeInTheDocument();
    // Terminal records live only under All: they are facts, not a bucket.
    await expect(canvas.queryByText('Chan Thoeun')).not.toBeInTheDocument();
  },
};

/**
 * Terminal and sealed records render as facts: deceased and merged carry a
 * neutral badge and outrank assurance; a crypto-shredded record keeps its
 * row with "Name unavailable" instead of disappearing.
 */
export const TerminalAndSealedRecords: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Deceased')).toBeInTheDocument();
    await expect(canvas.getByText('Merged')).toBeInTheDocument();
    await expect(canvas.getByText('Name unavailable')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: { patients: [] },
};

export const SeededDemoPatient: Story = {
  args: {
    demoPatientIds: DEMO_TOUR_PATIENT_IDS,
    patients: DEMO_TOUR_PATIENTS,
  },
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sokha Chann')).toBeVisible();
    await expect(canvas.getByText('Demo patient')).toBeVisible();
    await expect(canvas.queryByRole('radio', { name: 'All 1' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('radio', { name: 'Verified 1' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('row', { name: /Open Sokha Chann/ }));
    await expect(args.onOpenPatient).toHaveBeenCalledWith(DEMO_TOUR_PATIENT_IDS[0]);
  },
};

export const StartsAddPatientFlow: Story = {
  args: { patients: [] },
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Add patient' }));
    await expect(args.onAddPatient).toHaveBeenCalledOnce();
  },
};

export const Loading: Story = {
  args: { state: 'loading' },
};

export const ErrorAndRecovery: Story = {
  args: { state: 'error', onRetry: fn() },
};

export const LongContent: Story = {
  args: {
    patients: [LONG_NAME_PATIENT, ...DEMO_PATIENTS],
    triage: {
      'p-long-name': {
        label: 'Critical potassium result unacknowledged since yesterday evening',
        tone: 'danger',
      },
    },
  },
};

export const MobileWidth390: Story = {
  args: { triage: DEMO_TRIAGE },
  globals: { viewport: { value: 'kura390' } },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: 'kura320' } },
};

export const TabletWidth768: Story = {
  args: { triage: DEMO_TRIAGE },
  globals: { viewport: { value: 'kura768' } },
};

export const ComfortableDensity: Story = {
  globals: { density: 'comfortable' },
};

export const DarkTheme: Story = {
  args: { triage: DEMO_TRIAGE },
  globals: { theme: 'dark' },
};
