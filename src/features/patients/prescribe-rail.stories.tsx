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
          'Medication review comes first. Once every current-medication decision is drafted, the rail reveals new-medication work and any AI proposals; it returns an unsigned local draft without implying a prescription.',
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
      canvas.queryByRole('heading', { name: 'New medications' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Add medication' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Finish review' }),
    ).not.toBeInTheDocument();
  },
};

/** Decisions update in place; the reviewed draft is returned without signing anything. */
export const ReviewGate: Story = {
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole('button', { name: 'Finish review' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Add medication' }),
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /Metformin/ }));
    await userEvent.click(canvas.getByRole('button', { name: 'Stop' }));
    await expect(canvas.getByText('Draft · stop')).toBeVisible();
    await expect(canvas.getByText('Metformin')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /Lisinopril/ }));
    await userEvent.click(canvas.getByRole('button', { name: 'Keep' }));
    await expect(canvas.getByText('Draft · keep current')).toBeVisible();

    await expect(
      canvas.getByRole('button', { name: 'Add medication' }),
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
    await userEvent.click(canvas.getByRole('button', { name: 'Adjust' }));
    await userEvent.click(canvas.getByRole('radio', { name: '500 mg' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'once daily' }));
    await userEvent.click(
      canvas.getByRole('button', { name: 'Save adjustment' }),
    );
    await expect(canvas.getByText('Draft · adjust')).toBeVisible();
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
    await expect(canvas.getByText('Draft additions')).toBeVisible();
    await expect(canvas.getByText('AI suggestion')).toBeVisible();
    await expect(canvas.getAllByText('Calcium acetate')).toHaveLength(2);
  },
};

/** A formulary addition remains visible after returning from search. */
export const SearchMedication: Story = {
  args: { needsReview: [] },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add medication' }),
    );
    const input = canvas.getByRole('searchbox', { name: 'Search medications' });
    await userEvent.type(input, 'ator');
    await userEvent.click(canvas.getByRole('button', { name: 'Add to draft' }));
    await userEvent.click(
      canvas.getByRole('button', { name: 'Back to medication draft' }),
    );
    await expect(canvas.getByText('Draft additions')).toBeVisible();
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
      canvas.queryByRole('button', { name: 'Add medication' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Finish review' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByText('Add a diagnosis before reviewing this medication draft.'),
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
