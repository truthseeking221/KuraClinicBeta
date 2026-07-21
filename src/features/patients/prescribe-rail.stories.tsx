import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { PrescribeRail } from './prescribe-rail';
import {
  DEMO_DIAGNOSES,
  DEMO_NEEDS_REVIEW,
  DEMO_SEARCH_POOL,
  DEMO_SETTLED,
  DEMO_SUGGESTIONS,
} from './demo-data';
import { PATIENTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Patients/Prescribe Rail',
  component: PrescribeRail,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: PATIENTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The prescribing moment of the chart action rail: every flagged current medication needs a decision (Keep, Adjust, Pause, Stop) before the review can finish. Coded diagnoses ground the session; Kura suggestions are added deliberately and never apply on their own. Design intent throughout: no prescription or ICD model exists in the platform yet.',
      },
    },
  },
  args: {
    patientName: 'Sok Nimol',
    diagnoses: DEMO_DIAGNOSES,
    needsReview: DEMO_NEEDS_REVIEW,
    suggestions: DEMO_SUGGESTIONS,
    settled: DEMO_SETTLED,
    searchPool: DEMO_SEARCH_POOL,
    onBack: fn(),
    onComplete: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PrescribeRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The finish gate opens only after every flagged medication has a decision. */
export const ReviewGate: Story = {
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const gate = canvas.getByRole('button', { name: 'Review 2 meds first' });
    await expect(gate).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: /Metformin/ }));
    await expect(
      canvas.getByText(/Contraindicated in advanced kidney disease/),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Stop' }));

    await userEvent.click(canvas.getByRole('button', { name: /Lisinopril/ }));
    await userEvent.click(canvas.getByRole('button', { name: 'Keep' }));

    const finish = canvas.getByRole('button', { name: 'Finish review' });
    await expect(finish).toBeEnabled();
    await userEvent.click(finish);
    await expect(args.onComplete).toHaveBeenCalled();
    // Stopped medication lands in Reviewed with its decision visible.
    await expect(canvas.getByText('Stopped')).toBeInTheDocument();
    await expect(canvas.getByText('Kept')).toBeInTheDocument();
  },
};

/** Adjust opens the inline dose editor; saving records the new sig. */
export const AdjustFlow: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Metformin/ }));
    await userEvent.click(canvas.getByRole('button', { name: 'Adjust' }));
    await userEvent.click(canvas.getByRole('radio', { name: '500 mg' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'once daily' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Save change' }));
    await expect(canvas.getByText('Adjusted')).toBeInTheDocument();
    await expect(canvas.getByText('500 mg · once daily')).toBeInTheDocument();
  },
};

/** Suggestions are added one by one; the mark confirms without a toast. */
export const AddSuggestion: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButtons = canvas.getAllByRole('button', { name: 'Add' });
    await userEvent.click(addButtons[0]);
    await expect(canvas.getByText('Added')).toBeInTheDocument();
  },
};

/** Search view: filter the formulary, add, and return. */
export const SearchMedication: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Add medication' }));
    const input = canvas.getByRole('searchbox', { name: 'Search medications' });
    await userEvent.type(input, 'ator');
    await expect(canvas.getByText('Atorvastatin')).toBeInTheDocument();
    await userEvent.type(input, 'zzz');
    await expect(canvas.getByText(/No medication matches/)).toBeInTheDocument();
  },
};

/** Prescribing without a coded diagnosis is warned, not silently allowed. */
export const NoDiagnosisLinked: Story = {
  args: { diagnoses: [], onAddDiagnosis: fn() },
};

export const NothingToReview: Story = {
  args: { needsReview: [], suggestions: [] },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: 'kura320' } },
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
};
