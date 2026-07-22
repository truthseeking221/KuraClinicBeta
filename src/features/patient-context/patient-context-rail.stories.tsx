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
  args: { ...PATIENT_CONTEXT_FIXTURES.established, style: { minHeight: 702.53 } },
} satisfies Meta<typeof PatientContextRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Established: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Sreymom Sok' })).toBeVisible();
    const rail = canvas.getByLabelText('Patient context for Sreymom Sok');
    await expect(rail).toHaveStyle({ width: '300px' });
    await expect(canvas.getByRole('heading', { name: 'Sreymom Sok' })).toHaveStyle({
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '27px',
    });
    for (const label of [
      canvas.getByRole('heading', { name: 'Safety' }),
      canvas.getByRole('heading', { name: 'Today' }),
      canvas.getByText('Active problems'),
      canvas.getByText('Current medications'),
    ]) {
      await expect(label).toHaveStyle({
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'none',
      });
    }
    await expect(canvas.getByRole('heading', { name: 'Reason for visit' })).toHaveStyle({
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'uppercase',
    });
    await expect(canvas.getByText('Penicillin allergy')).toBeVisible();
    const problems = canvas.getByRole('button', { name: /Active problems.*0 recorded/i });
    expect(Math.round(problems.getBoundingClientRect().height)).toBe(44);
    await expect(problems).toHaveAttribute('aria-expanded', 'false');
  },
};

export const NewPatient: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.newPatient, style: { minHeight: 440 } },
};

/** Inside the patient chart the workbar owns identity; the rail must not repeat it. */
export const IdentityHidden: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.established, showIdentity: false },
};

export const ActiveProblems: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.activeProblems, defaultExpanded: ['problems'], style: { minHeight: 828 } },
};

export const CurrentMedications: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.currentMedications, defaultExpanded: ['medications'], style: { minHeight: 828 } },
};

export const PendingVerification: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.pendingVerification, defaultExpanded: ['verification'], style: { minHeight: 828 } },
};

export const PastHistory: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.pastHistory, defaultExpanded: ['history'], style: { minHeight: 828 } },
};

export const AdminDetails: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.adminDetails, defaultExpanded: ['administration'], style: { minHeight: 828 } },
};

export const ActiveProblemsEmpty: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.activeProblemsEmpty, defaultExpanded: ['problems'], style: { minHeight: 828 } },
};

export const CurrentMedicationsEmpty: Story = {
  args: { ...PATIENT_CONTEXT_FIXTURES.currentMedicationsEmpty, defaultExpanded: ['medications'], style: { minHeight: 828 } },
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
    style: { minHeight: 1282.6 },
  },
};

export const DisclosureInteraction: Story = {
  args: PATIENT_CONTEXT_FIXTURES.multipleRecorded,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const medications = canvas.getByRole('button', { name: /Current medications.*3 recorded/i });
    const history = canvas.getByRole('button', { name: /Past history.*3 recorded/i });

    await userEvent.click(medications);
    await userEvent.click(history);
    await expect(medications).toHaveAttribute('aria-expanded', 'true');
    await expect(history).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('Lisinopril 10 mg')).toBeVisible();
  },
};

export const PointerAffordance: Story = {
  args: PATIENT_CONTEXT_FIXTURES.currentMedications,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const medications = canvas.getByRole('button', { name: /Current medications.*3 recorded/i });
    const chevron = medications.querySelector('[data-slot="accordion-trigger-icon"]');
    if (!chevron) throw new Error('Accordion trigger must expose its canonical chevron.');

    const defaultChevronColor = window.getComputedStyle(chevron).color;
    medications.focus();

    await expect(window.getComputedStyle(medications).cursor).toBe('pointer');
    await expect(window.getComputedStyle(medications).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(window.getComputedStyle(chevron).color).not.toBe(defaultChevronColor);
  },
};

export const KeyboardDisclosure: Story = {
  args: PATIENT_CONTEXT_FIXTURES.multipleRecorded,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const medications = canvas.getByRole('button', { name: /Current medications.*3 recorded/i });
    const history = canvas.getByRole('button', { name: /Past history.*3 recorded/i });

    medications.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    await expect(history).toHaveFocus();
    await expect(history).toHaveAttribute('aria-expanded', 'true');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Patient context for Sok Nimol')).toHaveAttribute(
      'data-read-only',
      'true',
    );
    await expect(canvas.queryByText('Read-only patient context.')).not.toBeInTheDocument();
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
