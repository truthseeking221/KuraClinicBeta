import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { PATIENT_CONTEXT_FIXTURES } from './demo-data';
import { PatientContextRail } from './patient-context-rail';
import { PATIENT_CONTEXT_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Patient Context Rail',
  component: PatientContextRail,
  tags: ['autodocs', 'source-figma', 'adapted-kura', 'play-fn'],
  parameters: {
    layout: 'padded',
    kura: PATIENT_CONTEXT_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Target-contract patient context for a future clinical workspace. Identity and safety stay visible; secondary record detail uses accessible multiple disclosure. This component is not backed by a live patient-chart context API.',
      },
    },
  },
  args: PATIENT_CONTEXT_FIXTURES.established,
} satisfies Meta<typeof PatientContextRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Established: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Sok Nimol' })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Safety' })).toBeVisible();
    await expect(canvas.getByText('Penicillin allergy')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Active problems.*0 recorded/i })).toHaveAttribute('aria-expanded', 'false');
  },
};

export const NewPatient: Story = { args: PATIENT_CONTEXT_FIXTURES.newPatient };

/** Inside the patient chart the workbar owns identity; the rail must not repeat it. */
export const IdentityHidden: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.established, showIdentity: false },
};

export const ActiveProblems: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.activeProblems, defaultExpanded: ['problems'] },
};

export const CurrentMedications: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.currentMedications, defaultExpanded: ['medications'] },
};

export const PendingVerification: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.pendingVerification, defaultExpanded: ['verification'] },
};

export const PastHistory: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.pastHistory, defaultExpanded: ['history'] },
};

export const AdminDetails: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.adminDetails, defaultExpanded: ['administration'] },
};

export const ActiveProblemsEmpty: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.activeProblemsEmpty, defaultExpanded: ['problems'] },
};

export const CurrentMedicationsEmpty: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.currentMedicationsEmpty, defaultExpanded: ['medications'] },
};

export const AllExpanded: Story = {
  args: {
    ...PATIENT_CONTEXT_FIXTURES.activeProblems,
    sections: [
      PATIENT_CONTEXT_FIXTURES.activeProblems.sections[0],
      PATIENT_CONTEXT_FIXTURES.currentMedications.sections[1],
      PATIENT_CONTEXT_FIXTURES.pendingVerification.sections[2],
      PATIENT_CONTEXT_FIXTURES.pastHistory.sections[3],
      PATIENT_CONTEXT_FIXTURES.adminDetails.sections[4],
    ],
    defaultExpanded: ['problems', 'medications', 'verification', 'history', 'administration'],
  },
};

export const DisclosureInteraction: Story = {
  args: PATIENT_CONTEXT_FIXTURES.currentMedications,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const problems = canvas.getByRole('button', { name: /Active problems.*0 recorded/i });
    const medications = canvas.getByRole('button', { name: /Current medications.*3 recorded/i });

    await userEvent.click(problems);
    await userEvent.click(medications);
    await expect(problems).toHaveAttribute('aria-expanded', 'true');
    await expect(medications).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('Lisinopril 10 mg')).toBeVisible();
  },
};

export const PointerAffordance: Story = {
  args: PATIENT_CONTEXT_FIXTURES.established,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const problems = canvas.getByRole('button', { name: /Active problems.*0 recorded/i });
    const chevron = problems.querySelector('[data-slot="accordion-trigger-icon"]');
    if (!chevron) throw new Error('Accordion trigger must expose its canonical chevron.');

    const defaultChevronColor = window.getComputedStyle(chevron).color;
    problems.focus();

    await expect(window.getComputedStyle(problems).cursor).toBe('pointer');
    await expect(window.getComputedStyle(problems).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(window.getComputedStyle(chevron).color).not.toBe(defaultChevronColor);
  },
};

export const KeyboardDisclosure: Story = {
  args: PATIENT_CONTEXT_FIXTURES.currentMedications,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const problems = canvas.getByRole('button', { name: /Active problems.*0 recorded/i });
    const medications = canvas.getByRole('button', { name: /Current medications.*3 recorded/i });

    problems.focus();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(medications).toHaveFocus();
    await expect(medications).toHaveAttribute('aria-expanded', 'true');
  },
};

export const Loading: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.established, state: 'loading' },
};

function ErrorRecoveryHarness() {
  const [state, setState] = useState<'error' | 'ready'>('error');
  return (
    <PatientContextRail
      {...PATIENT_CONTEXT_FIXTURES.established}
      state={state}
      onRetry={() => setState('ready')}
    />
  );
}

export const ErrorAndRecovery: Story = {
  render: () => <ErrorRecoveryHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toHaveTextContent('Could not load patient context');
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(canvas.queryByRole('alert')).not.toBeInTheDocument());
    await expect(canvas.getByRole('button', { name: /Active problems.*0 recorded/i })).toBeVisible();
  },
};

export const Offline: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.established, state: 'offline', onRetry: fn() },
};

export const PermissionDenied: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.established, state: 'permission-denied' },
};

export const ReadOnly: Story = {
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedications,
    defaultExpanded: ['medications'],
    readOnly: true,
  },
};

export const LongContent: Story = {
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedications,
    patient: {
      initials: 'NP',
      name: 'Nary Phalla Chann with a deliberately long clinical-record name',
      demographics: '57 y · F · MRN P-7133-EXTENDED-IDENTIFIER',
    },
    sections: [
      PATIENT_CONTEXT_FIXTURES.currentMedications.sections[0],
      {
        id: 'medications',
        label: 'Current medications',
        items: [
          {
            label: 'Atorvastatin 20 mg with extended-release dosing instructions',
            detail: 'One tablet nightly after the evening meal; reconciliation pending',
          },
        ],
      },
      ...PATIENT_CONTEXT_FIXTURES.currentMedications.sections.slice(2),
    ],
    defaultExpanded: ['medications'],
  },
};

export const Mobile320: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.currentMedications, defaultExpanded: ['medications'] },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
