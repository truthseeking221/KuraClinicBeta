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
import { PRESCRIBE_STORYBOOK_KURA } from './storybook-metadata';
import styles from './prescribe-rail.stories.module.css';

const meta = {
  title: 'Clinic/Clinical/Patients/Prescribing/Medication Draft',
  component: PrescribeRail,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: PRESCRIBE_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Review the current regimen, add draft medicines, and inspect AI evidence without implying a saved or signed prescription.',
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
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PrescribeRail>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Review work appears first; new medication work is revealed only once the regimen is resolved. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Medication review' }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole('heading', { name: 'Add medication' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('combobox', { name: 'Search medications' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Finish review' }),
    ).toBeDisabled();
  },
};

/** Decisions update in place; the reviewed draft is returned without signing anything. */
export const ReviewGate: Story = {
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'Finish review' }),
    ).toBeDisabled();
    await expect(
      canvas.queryByRole('combobox', { name: 'Search medications' }),
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /Metformin/ }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Stop' }));
    await expect(canvas.getByText('Stop')).toBeVisible();
    await expect(canvas.getByText('Metformin')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /Lisinopril/ }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Keep' }));
    await expect(canvas.getByText('Keep')).toBeVisible();

    await expect(
      canvas.getByRole('combobox', { name: 'Search medications' }),
    ).toBeEnabled();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Finish review' }),
    );
    await expect(args.onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        decisions: expect.objectContaining({
          'med-metformin': expect.objectContaining({ decision: 'stop' }),
          'med-lisinopril': expect.objectContaining({ decision: 'keep' }),
        }),
      }),
    );
  },
};

/** Adjust opens the inline dose editor and keeps the medication in place. */
export const AdjustFlow: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Metformin/ }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Adjust' }));
    await userEvent.click(canvas.getByRole('radio', { name: '500 mg' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'once daily' }));
    await userEvent.click(
      canvas.getByRole('button', { name: 'Save adjustment' }),
    );
    await expect(canvas.getByText('Adjust')).toBeVisible();
    await expect(canvas.getByText('500 mg · once daily')).toBeVisible();
  },
};

/** An AI proposal enters the same visible draft-additions group with provenance intact. */
export const AddAiSuggestion: Story = {
  args: { needsReview: [] },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aiRegion = canvas.getByRole('region', { name: 'AI suggestions' });
    await userEvent.click(
      within(aiRegion).getAllByRole('button', { name: 'Add to draft' })[0],
    );
    await expect(
      canvas.getByRole('list', { name: 'Draft additions' }),
    ).toBeVisible();
    await expect(canvas.getByText('AI suggestion')).toBeVisible();
    await expect(canvas.getAllByText('Calcium acetate')).toHaveLength(2);
  },
};

/** The inline authoritative search adds one formulary item without leaving the draft. */
export const SearchMedication: Story = {
  args: { needsReview: [] },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Search medications' });
    await userEvent.type(input, 'ator');
    await userEvent.click(canvas.getByRole('option', { name: /Atorvastatin/ }));
    await expect(
      canvas.getByRole('list', { name: 'Draft additions' }),
    ).toBeVisible();
    await expect(canvas.getByText('Atorvastatin')).toBeVisible();
  },
};

/** The diagnosis gate explains both disabled actions in their local scopes. */
export const NoDiagnosisLinked: Story = {
  args: { diagnoses: [], onAddDiagnosis: fn() },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole('combobox', { name: 'Search medications' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Finish review' }),
    ).toBeDisabled();
    await expect(
      canvas.getByText(
        'Add a diagnosis before reviewing this medication draft.',
      ),
    ).toBeVisible();
  },
};

/** A restored session draft preserves decisions and additions after leaving the workflow. */
export const RestoredDraft: Story = {
  args: {
    initialDraft: {
      decisions: {
        'med-metformin': {
          decision: 'adjust',
          dose: '500 mg',
          frequency: 'once daily',
        },
      },
      additions: [
        {
          id: 'srch-atorvastatin',
          drug: 'Atorvastatin',
          dose: '20 mg tablet',
          source: 'formulary',
        },
      ],
    },
  },
};

export const EmptyRegimen: Story = {
  args: { needsReview: [], settled: [], suggestions: [] },
};

/** A completed review keeps the next action visible and exposes inline medication search. */
export const ReviewComplete: Story = {
  args: {
    initialDraft: {
      decisions: {
        'med-metformin': {
          decision: 'keep',
          dose: '1 g',
          frequency: 'twice daily',
        },
        'med-lisinopril': {
          decision: 'pause',
          dose: '10 mg',
          frequency: 'once daily',
        },
      },
      additions: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'Finish review' }),
    ).toBeEnabled();
    await expect(
      canvas.getByRole('combobox', { name: 'Search medications' }),
    ).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    patientName: 'Sokha Monirath Chann very long registry display name',
    diagnoses: [
      {
        code: 'E11.65',
        label:
          'Type 2 diabetes mellitus with hyperglycaemia and a long clinical label',
        evidence: 'HbA1c 8.9% · verified 21 May 2026 · repeat result pending',
      },
    ],
  },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: 'kura320' } },
};

/** The medication plan remains reachable and readable at the narrow reference width. */
export const MobileDecision: Story = {
  globals: { viewport: { value: 'kura320' } },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Metformin/ }));
    await expect(
      canvas.getByRole('radiogroup', { name: 'Plan' }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('radio', { name: 'Pause' }));
    await expect(canvas.getByText('Pause')).toBeVisible();
  },
};
