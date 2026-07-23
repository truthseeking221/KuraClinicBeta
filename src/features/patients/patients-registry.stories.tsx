import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { PatientsRegistry } from './patients-registry';
import {
  DEMO_PATIENTS,
  DEMO_TOUR_PATIENT_IDS,
  DEMO_TOUR_PATIENTS,
  DEMO_TRIAGE,
  LONG_NAME_PATIENT,
  NEW_PROVISIONAL_PATIENT,
} from './demo-data';
import { PATIENTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Patients/Registry',
  component: PatientsRegistry,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: PATIENTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The workspace patient registry: who this workspace has seen, most recent first, opening into the chart. The row shape mirrors the ListWorkspacePatients contract (masked phone and MRN, two-value assurance, terminal states). Identity and contact stay two columns: "Identity" carries the assurance axis (Verified means a sighted document, never a verified phone), and "Verified phone" carries the contact axis, because the wire record populates a masked phone only for a verified primary number. A closed record (deceased, merged) carries its badge next to the name, where a narrow screen cannot scroll it out of view. There is no name search: names are stored encrypted with no searchable index, so patients resolve through the reception doors instead. The "Why now" column is a target-contract triage layer and hides entirely when no triage data is supplied.',
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

export const ResumablePatientWork: Story = {
  args: {
    onOpenWorkItem: fn(),
    workItems: {
      'p-lina-prum': { action: 'continue', label: 'Lab order in progress' },
      'p-sokha-chann': { action: 'view_progress', label: 'Courier on the way' },
      'p-sok-nimol': { action: 'review_results', label: 'Partial results available' },
    },
  },
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: /Continue lab order in progress for Lina Prum/ }),
    );
    await expect(args.onOpenWorkItem).toHaveBeenCalledWith('p-lina-prum');
  },
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

export const FilterToProvisional: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: /Provisional/ }));
    await expect(canvas.queryByText('Sok Nimol')).not.toBeInTheDocument();
    await expect(canvas.getByText('Lina Prum')).toBeInTheDocument();
    // Terminal records live only under All: they are facts, not a bucket.
    await expect(canvas.queryByText('Chan Thoeun')).not.toBeInTheDocument();
  },
};

/**
 * Identity and contact are separate facts, and every combination is real: a
 * provisional record can hold a verified phone, and a verified identity can
 * have no reachable number. One "Verified" badge could not say either.
 */
export const IdentityAndContactAreSeparate: Story = {
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verified phone, identity still provisional until PSC sights a document.
    const provisional = canvas.getByRole('row', { name: /Open Lina Prum/ });
    await expect(within(provisional).getByText('Provisional')).toBeVisible();
    await expect(within(provisional).getByText('+85*****9034')).toBeVisible();

    // Identity verified at the desk, but no number the results link can reach.
    const noPhone = canvas.getByRole('row', { name: /Open Name unavailable/ });
    await expect(within(noPhone).getByText('Verified')).toBeVisible();
    await expect(within(noPhone).getByText('None')).toBeVisible();
    await expect(noPhone).toHaveAccessibleName(/No verified phone/);
  },
};

/**
 * The outcome of the phone gate on its own: one provisional record, phone
 * verified, identity not. The registry states what is true and claims no next
 * step — an intake or a lab order is a later clinical decision, not the
 * completion condition of creating a patient.
 */
export const NewProvisionalPatient: Story = {
  args: { patients: [NEW_PROVISIONAL_PATIENT] },
  tags: ['play-fn'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByRole('row', { name: /Open Chariya Som/ });
    await expect(within(row).getByText('Provisional')).toBeVisible();
    await expect(within(row).getByText('+85*****6108')).toBeVisible();
    // A single-bucket registry offers no filter: there is nothing to narrow.
    await expect(canvas.queryByRole('radio', { name: /Provisional/ })).not.toBeInTheDocument();
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
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
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

export const MobileWidth360: Story = {
  globals: { viewport: { value: 'kura360' } },
};

export const MobileWidth412: Story = {
  args: { triage: DEMO_TRIAGE },
  globals: { viewport: { value: 'kura412' } },
};

export const MobileWidth480: Story = {
  globals: { viewport: { value: 'kura480' } },
};

export const TabletWidth768: Story = {
  args: { triage: DEMO_TRIAGE },
  globals: { viewport: { value: 'kura768' } },
};

export const DesktopWidth1024: Story = {
  args: { triage: DEMO_TRIAGE },
  globals: { viewport: { value: 'kura1024' } },
};

export const ComfortableDensity: Story = {
  globals: { density: 'comfortable' },
};
