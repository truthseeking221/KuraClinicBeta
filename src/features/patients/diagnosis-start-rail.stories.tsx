import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
  DEMO_LEGACY_ICD10_FLAGGED_LABS,
  DEMO_LEGACY_ICD10_SEARCH_POOL,
} from './demo-data';
import { DiagnosisStartRail } from './diagnosis-start-rail';
import { Icd10DiagnosisRail } from './icd10-diagnosis-rail';
import { PATIENTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Patients/Diagnosis Start Rail',
  component: DiagnosisStartRail,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      ...PATIENTS_STORYBOOK_KURA,
      intake: {
        decision: 'FEATURE-OWN',
        owner: 'src/features/patients/diagnosis-start-rail.tsx',
        level: 'clinical rail',
        evidence:
          'Faithfully ports Legacy DCM DiagnoseGuide anatomy into canonical Kura tokens, icons, button behavior, accessibility, and Storybook ownership. The four rows orient; only the final CTA acts.',
        exclusions: [
          'Starting opens a caller-owned draft review; it does not verify, save, sign, or send a diagnosis.',
          'AI suggestion provenance is explicit and never presented as clinical truth.',
          'The caller owns permissions, prerequisites, terminology, persistence, and audit.',
        ],
      },
      source: 'FINAL DCM/src/components/DiagnoseGuide/DiagnoseGuide.tsx (legacy)',
      binding: {
        ...PATIENTS_STORYBOOK_KURA.binding,
        elevation: 'none',
        icons: 'kura-canonical',
        motion: 'button-owned',
        responsive: 'single-column rail; compact inset below 360px',
      },
    },
    docs: {
      description: {
        component:
          'The pre-diagnosis rail from Legacy DCM: it explains the evidence-to-diagnosis path and exposes one action to open draft review.',
      },
    },
  },
  args: {
    onStart: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 'min(100%, 360px)', minBlockSize: '760px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DiagnosisStartRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Ready to diagnose?' })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    const action = canvas.getByRole('button', { name: 'Diagnose this patient' });
    await userEvent.click(action);
    await expect(args.onStart).toHaveBeenCalledOnce();
  },
};

export const Blocked: Story = {
  args: {
    blockedReason: 'Diagnosis review is unavailable until the remaining results are verified.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Diagnose this patient' })).toBeDisabled();
    await expect(canvas.getByText(/remaining results are verified/)).toBeVisible();
  },
};

export const OpensDraftReview: Story = {
  render: () => {
    function Harness() {
      const [started, setStarted] = useState(false);
      const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);

      if (!started) return <DiagnosisStartRail onStart={() => setStarted(true)} />;

      return (
        <Icd10DiagnosisRail
          flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS}
          onAdd={(candidate) => setSelectedIds((current) => [...current, candidate.id])}
          onClose={() => setStarted(false)}
          onContinue={fn()}
          onRemove={(candidate) =>
            setSelectedIds((current) => current.filter((id) => id !== candidate.id))
          }
          searchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL}
          selectedIds={selectedIds}
          suggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS}
        />
      );
    }

    return <Harness />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Diagnose this patient' }));
    await expect(await canvas.findByRole('heading', { name: 'Select diagnosis' })).toBeVisible();
    await expect(canvas.getByText('Draft only — not verified or saved.')).toBeVisible();
  },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: 'kura320' } },
};
