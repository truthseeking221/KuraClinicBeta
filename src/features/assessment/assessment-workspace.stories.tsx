import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';
import { JOURNEY_PATIENT, JOURNEY_PATIENT_DEMOGRAPHICS } from '../journey/patient';

import { AssessmentWorkspace } from './assessment-workspace';
import { EMPTY_ENCOUNTER, WORKED_UP_ENCOUNTER } from './demo-data';
import type { ClinicalAssessment } from './types';

function Harness({ initial }: { initial: ClinicalAssessment }) {
  const [assessment, setAssessment] = useState(initial);
  return (
    <AssessmentWorkspace
      assessment={assessment}
      onChange={setAssessment}
      patientDemographics={JOURNEY_PATIENT_DEMOGRAPHICS}
      patientName={JOURNEY_PATIENT.displayName}
    />
  );
}

const meta = {
  title: 'Clinic/Clinical/Assessment',
  component: AssessmentWorkspace,
  tags: ['autodocs'],
  args: {
    assessment: WORKED_UP_ENCOUNTER,
    onChange: () => {},
    patientDemographics: JOURNEY_PATIENT_DEMOGRAPHICS,
    patientName: JOURNEY_PATIENT.displayName,
  },
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.assessment,
      intake: {
        decision: 'CREATE',
        owner: 'src/features/assessment',
        evidence:
          'No Kura surface, prototype, or backend service models a clinical encounter. Reviewed kura-platform, both legacy DCM prototypes, and the legacy receptionist: each states that ordering follows clinical reasoning and none records the reasoning.',
        exclusions: [
          'The ICD-10 list is a seven-code shortlist, not a vocabulary — a full index would imply backend support that does not exist.',
          'Vital signs reuse the collection VitalsForm rather than a second measurement surface.',
          'Nothing is persisted or signed against a server; status is local.',
        ],
      },
      composes: ['Card', 'Input', 'Textarea', 'SegmentedToggle', 'Collapsible', 'VitalsForm'],
    },
    docs: {
      description: {
        component:
          'The doctor records why the patient came, what they found, and what they think it is. The assessment section is structured because it is the only part later steps read: an order carries one of these diagnoses as its stated reason, and no order can be sent without one.',
      },
    },
  },
} satisfies Meta<typeof AssessmentWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewEncounter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Nothing recorded yet. Both requirements are named as actions rather than hidden behind a disabled control.',
      },
    },
  },
  render: () => <Harness initial={EMPTY_ENCOUNTER} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Still needed')).toBeVisible();
    await expect(canvas.getByText('Record the reason for visit')).toBeVisible();
    await expect(canvas.getByText('Add a working diagnosis')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Order tests' })).toBeDisabled();
  },
};

export const Examined: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A grounded encounter: the footer states which diagnosis an order would carry.',
      },
    },
  },
  render: () => <Harness initial={WORKED_UP_ENCOUNTER} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Order tests' })).toBeEnabled();
    await expect(canvas.getByText(/2 diagnoses available as an order reason/)).toBeVisible();
  },
};

export const RecordingADiagnosis: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Adding one impression clears the diagnosis blocker and unlocks ordering.',
      },
    },
  },
  render: () => (
    <Harness initial={{ ...EMPTY_ENCOUNTER, reasonForVisit: 'Tired for two weeks' }} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Order tests' })).toBeDisabled();

    await userEvent.type(canvas.getByLabelText(/Diagnosis or impression/), 'Other fatigue');
    await userEvent.click(canvas.getByRole('button', { name: 'Add diagnosis' }));

    await expect(canvas.getByText('R53.83 · Other fatigue')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Order tests' })).toBeEnabled();
  },
};

export const UncodedImpression: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'An impression the doctor has not coded yet is a real clinical state and grounds an order on its own.',
      },
    },
  },
  render: () => (
    <Harness
      initial={{
        ...EMPTY_ENCOUNTER,
        reasonForVisit: 'Tired for two weeks',
        diagnoses: [
          {
            id: 'dx-uncoded',
            code: '',
            label: 'Unexplained fatigue, cause not yet clear',
            certainty: 'working',
          },
        ],
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Unexplained fatigue, cause not yet clear')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Order tests' })).toBeEnabled();
  },
};

export const EverythingRuledOut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Safety state: once every impression is excluded there is no clinical reason left to investigate, so ordering closes again.',
      },
    },
  },
  render: () => (
    <Harness
      initial={{
        ...EMPTY_ENCOUNTER,
        reasonForVisit: 'Tired for two weeks',
        diagnoses: [
          {
            id: 'dx-excluded',
            code: 'E05.9',
            label: 'Thyrotoxicosis, unspecified',
            certainty: 'ruled-out',
            evidence: 'TSH normal on 12 June',
          },
        ],
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Add a working diagnosis')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Order tests' })).toBeDisabled();
  },
};

export const LongContent: Story = {
  render: () => (
    <Harness
      initial={{
        ...WORKED_UP_ENCOUNTER,
        reasonForVisit:
          'Persistent tiredness for two weeks with intermittent light-headedness on standing, wants a general checkup before travelling',
        diagnoses: [
          {
            id: 'dx-long',
            code: 'D50.9',
            label: 'Iron deficiency anaemia, unspecified, suspected nutritional in origin',
            certainty: 'working',
            evidence:
              'Pale conjunctiva, resting pulse 96, reports heavy periods and a largely rice-based diet for the past year',
          },
        ],
      }}
    />
  ),
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => <Harness initial={WORKED_UP_ENCOUNTER} />,
};
