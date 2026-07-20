import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { CheckInWizard } from './check-in-wizard';
import { blankWalkIn, EXISTING_PATIENTS, IDENTITY_REGISTRY } from './demo-data';
import type { FrontDeskPatient } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

/** Parked on Pre-consult: verified contact + orders incl. teleconsult. */
function preConsultReady(id: string, opts?: { verified?: boolean; tele?: boolean }): FrontDeskPatient {
  const base = blankWalkIn(id, 51);
  const verified = opts?.verified ?? true;
  return {
    ...base,
    name: 'Bopha Kim',
    dob: '1990-05-05',
    sexAtBirth: 'Female',
    otpVerified: verified,
    unverifiedReason: verified ? null : { code: 'patient-declined' },
    insuranceAcked: true,
    identity: { source: 'manual', lockedFields: [] },
    cart: {
      ...base.cart,
      attributedPrescriberId: 'dr-sok-vanna',
      items: [
        { id: 'hba1c', kind: 'lab', name: 'HbA1c', priceMinor: '900', currencyCode: 'USD', qty: 1 },
        ...(opts?.tele === false
          ? []
          : [
              {
                id: 'telecon',
                kind: 'telecon' as const,
                name: 'Teleconsultation',
                priceMinor: '0',
                currencyCode: 'USD' as const,
                qty: 1,
              },
            ]),
      ],
    },
  };
}

function PreConsultPlayground({ initial }: { initial: FrontDeskPatient }) {
  const [patient, setPatient] = useState<FrontDeskPatient>(initial);
  return (
    <CheckInWizard
      existingPatients={EXISTING_PATIENTS}
      identityRegistry={IDENTITY_REGISTRY}
      onCheckIn={() => {}}
      onPatientChange={setPatient}
      patient={patient}
    />
  );
}

const meta = {
  title: 'Clinic/Front Desk/Check-In Wizard/Step 5 Pre-Consult',
  component: CheckInWizard,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'EXTEND (front-desk Step 5) — intake delivery + TAT-coupled teleconsult',
        owner: 'src/features/front-desk',
        evidence:
          'Ported from the legacy receptionist prototype: send-intake-link vs fill-on-behalf with per-section author provenance, teleconsult specialty auto-mapped from ordered tests, day picker coupled to the longest internal turnaround (pre-TAT days warn, booking early needs an explicit override), skip removes the teleconsult line while remove re-blocks the step. PROTOTYPE: telehealth_call is an enum with no behavior upstream; no intake-link service exists.',
        exclusions: [
          'Month calendar grid (compact day strip carries the same rule)',
          'Patient PWA intake surface (separate journey)',
        ],
      },
      journeys: ['front-desk-check-in'],
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura',
        icons: 'kura-hugeicons',
      },
    },
    docs: {
      description: {
        component:
          'Step 5 captures intake while the patient is present and books the results consult. The intake link needs a verified channel; the desk can fill sections on behalf with visible provenance. Teleconsult slots follow the longest result turnaround — pre-TAT days warn and booking early is an explicit, recorded override.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  patient: preConsultReady('pre-consult-base'),
  onPatientChange: () => {},
  existingPatients: EXISTING_PATIENTS,
  onCheckIn: () => {},
};

export const TatPreselectAndEarlyOverride: Story = {
  name: 'Teleconsult · TAT preselects the day, early booking confirms',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-tat')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /5 Pre-consult/ }));
    // HbA1c = 24h TAT → Tomorrow preselected, Today carries the warning mark.
    await expect(await canvas.findByText(/Estimated results in ~24h/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Tomorrow' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Booking a pre-TAT day is a confirmed decision, never silent.
    await userEvent.click(canvas.getByRole('button', { name: /Today/ }));
    await expect(canvas.getByText('Results may not be ready on this day.')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '09:30' }));
    await expect(
      await canvas.findByText('Results may not be ready for this slot'),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Book anyway' }));
    await expect(await canvas.findByText(/Booked · Today · 09:30/)).toBeVisible();
    await expect(canvas.getByText(/before results/)).toBeVisible();
    await expect(canvas.getByText(/Endocrinology/)).toBeVisible();
  },
};

export const SkipRemovesConsultLine: Story = {
  name: 'Teleconsult · skip removes the line, remove re-blocks',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-skip')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /5 Pre-consult/ }));
    await userEvent.click(await canvas.findByRole('button', { name: 'Skip consult' }));
    await expect(
      await canvas.findByText('Skipped — results go out without a consult'),
    ).toBeVisible();
    // The teleconsult line left the cart with the skip.
    await expect(
      canvas.queryByRole('button', { name: 'Remove Teleconsultation' }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeEnabled();
  },
};

export const IntakeLinkNeedsVerifiedChannel: Story = {
  name: 'Intake · link gated on a verified channel',
  args: baseArgs,
  render: () => (
    <PreConsultPlayground initial={preConsultReady('pre-unverified', { verified: false })} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /5 Pre-consult/ }));
    await expect(
      await canvas.findByRole('button', { name: 'Send intake link' }),
    ).toBeDisabled();
    await expect(canvas.getByText('Needs a verified channel (Step 2).')).toBeVisible();
  },
};

export const FillOnBehalfProvenance: Story = {
  name: 'Intake · fill on behalf stamps desk provenance',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-fill')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /5 Pre-consult/ }));
    await userEvent.click(await canvas.findByRole('button', { name: 'Send intake link' }));
    await expect(await canvas.findByText(/Intake link sent · just now/)).toBeVisible();

    const fillButtons = canvas.getAllByRole('button', { name: 'Fill on behalf' });
    await userEvent.click(fillButtons[0]);
    await userEvent.type(
      canvas.getByLabelText('Intake answer'),
      'Follow-up on diabetes control',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Save · recorded by desk' }));
    // Provenance chip: this answer came from the desk, not the patient.
    await expect(await canvas.findByText('Desk')).toBeVisible();
  },
};

export const Mobile: Story = {
  name: 'Mobile · TAT day strip at 390',
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => <PreConsultPlayground initial={preConsultReady('pre-mobile')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /5 Pre-consult/ }));
    await expect(await canvas.findByText(/Estimated results in ~24h/)).toBeVisible();
  },
};

export const DarkTheme: Story = {
  args: baseArgs,
  globals: { theme: 'dark' },
  render: () => <PreConsultPlayground initial={preConsultReady('pre-dark')} />,
};
