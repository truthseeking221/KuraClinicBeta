import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { CheckInWizard } from './check-in-wizard';
import { blankWalkIn, EXISTING_PATIENTS, IDENTITY_REGISTRY } from './demo-data';
import type { FrontDeskPatient } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

/** A patient parked on the Orders step with contact verified. */
function orderReady(id: string, sexAtBirth: 'Female' | 'Male'): FrontDeskPatient {
  const base = blankWalkIn(id, 41);
  return {
    ...base,
    name: sexAtBirth === 'Female' ? 'Srey Neang' : 'Dara Chen',
    dob: '1994-06-02',
    sexAtBirth,
    otpVerified: true,
    insuranceAcked: true,
    identity: { source: 'manual', lockedFields: [] },
  };
}

function ConsentPlayground({ initial }: { initial: FrontDeskPatient }) {
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
  title: 'Clinic/Front Desk/Check-In/Orders & Consent',
  component: CheckInWizard,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'EXTEND (front-desk Orders step) — consent chain + pregnancy gate',
        owner: 'src/features/front-desk',
        evidence:
          'Ported from the legacy receptionist prototype (imaging consent badge chain, verbal-consent modal with supervisor witness PIN, pregnancy gate with clinician override) and ui-kit consent framing. PROTOTYPE CONTRACT: kura-platform has no consent engine — every chain here is the proposed per-line contract (needed → sent → signed, or a named verbal record), never a boolean.',
        exclusions: [
          'Customer-display sign-off push (simulated with an explicit demo button)',
          'Consent document storage/audit RPC (no upstream engine)',
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
          'Consent is a per-line chain, not a checkbox. Imaging and sensitive tests enter the cart with an open chain that blocks payment until it is signed on the patient phone or recorded verbally (named recorder; supervisor witness PIN for sensitive tests). Imaging for a patient whose sex at birth is Female passes a pregnancy screen first — "possibly pregnant" needs a named clinician override or the order is cancelled.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  patient: orderReady('consent-base', 'Male'),
  onPatientChange: () => {},
  existingPatients: EXISTING_PATIENTS,
  onCheckIn: () => {},
};

export const ImagingConsentChain: Story = {
  name: 'Imaging consent · needed → sent → signed',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-imaging', 'Male')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await userEvent.click(canvas.getByRole('button', { name: /Additional order types/ }));
    await userEvent.click(body.getByRole('checkbox', { name: 'Chest X-ray' }));
    await expect((await canvas.findAllByText('Consent needed'))[0]).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Send sign-off' }));
    await expect(canvas.getByText('Sent · awaiting signature')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Simulate patient signature' }));
    await expect(canvas.getByText('Signed on phone')).toBeVisible();
  },
};

export const VerbalConsentSensitiveWitness: Story = {
  name: 'Verbal consent · sensitive test needs a supervisor witness',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-verbal', 'Male')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await userEvent.click(canvas.getByRole('checkbox', { name: 'HIV 4th-gen Ag/Ab' }));
    await userEvent.click(await canvas.findByRole('button', { name: 'Verbal consent' }));
    await expect(await body.findByText(/supervisor witness/)).toBeVisible();
    const record = body.getByRole('button', { name: 'Record consent' });
    await userEvent.type(body.getByLabelText('Recorded by'), 'Linh Nguyen');
    await expect(record).toBeDisabled();
    await userEvent.type(body.getByLabelText('Supervisor witness PIN'), '4821');
    await expect(record).toBeEnabled();
    await userEvent.click(record);
    await expect(await canvas.findByText('Verbal · recorded')).toBeVisible();
    await expect(canvas.getByText(/Verbal · Linh Nguyen · just now/)).toBeVisible();
  },
};

export const PregnancyGateNotPregnant: Story = {
  name: 'Pregnancy gate · not pregnant proceeds with open consent',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-preg-no', 'Female')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await userEvent.click(canvas.getByRole('button', { name: /Additional order types/ }));
    await userEvent.click(body.getByRole('checkbox', { name: 'Chest X-ray' }));
    await expect(await body.findByText(/Could the patient be pregnant/)).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Not pregnant — add order' }));
    // The scan is ordered, but its consent chain still gates payment.
    await expect((await canvas.findAllByText('Consent needed'))[0]).toBeVisible();
  },
};

export const PregnancyGateClinicianOverride: Story = {
  name: 'Pregnancy gate · possibly pregnant needs a clinician override',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-preg-override', 'Female')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await userEvent.click(canvas.getByRole('button', { name: /Additional order types/ }));
    await userEvent.click(body.getByRole('checkbox', { name: 'Chest X-ray' }));
    await userEvent.click(await body.findByRole('button', { name: 'Possibly pregnant' }));
    await expect(await body.findByText('Clinician override required')).toBeVisible();
    const record = body.getByRole('button', { name: 'Record & add' });
    await expect(record).toBeDisabled();
    await userEvent.type(
      body.getByLabelText('Clinician override · sign-off name'),
      'Dr. Sok Vanna',
    );
    await userEvent.click(record);
    await expect(
      await canvas.findByText(/Clinician override · Dr. Sok Vanna/),
    ).toBeVisible();
  },
};

export const PregnancyGateCancelOrder: Story = {
  name: 'Pregnancy gate · cancelling never adds the order',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-preg-cancel', 'Female')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await userEvent.click(canvas.getByRole('button', { name: /Additional order types/ }));
    const chestXray = body.getByRole('checkbox', { name: 'Chest X-ray' });
    await userEvent.click(chestXray);
    await userEvent.click(await body.findByRole('button', { name: 'Cancel order' }));
    await waitFor(async () => {
      await expect(chestXray).not.toBeChecked();
    });
    await expect(canvas.queryByText('Consent needed')).not.toBeInTheDocument();
  },
};

export const PaymentBlockedUntilConsent: Story = {
  name: 'Payment stays blocked while a consent chain is open',
  args: baseArgs,
  render: () => {
    const initial = orderReady('consent-pay-block', 'Male');
    return (
      <ConsentPlayground
        initial={{
          ...initial,
          cart: {
            ...initial.cart,
            attributedPrescriberId: 'dr-sok-vanna',
            items: [
              {
                id: 'xray-chest',
                kind: 'imaging',
                name: 'Chest X-ray',
                priceMinor: '1800',
                currencyCode: 'USD',
                qty: 1,
                consent: { state: 'needed' },
              },
            ],
          },
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Payment/ }));
    await expect(
      await canvas.findByText('Resolve blockers before collecting payment'),
    ).toBeVisible();
    await expect(
      canvas.getByText(/Chest X-ray still needs consent — resolve it on the Orders step/),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  name: 'Mobile · consent panel at 390',
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => {
    const initial = orderReady('consent-mobile', 'Male');
    return (
      <ConsentPlayground
        initial={{
          ...initial,
          cart: {
            ...initial.cart,
            attributedPrescriberId: 'dr-sok-vanna',
            items: [
              {
                id: 'hiv-ag-ab',
                kind: 'lab',
                name: 'HIV Ag/Ab combo',
                priceMinor: '1000',
                currencyCode: 'USD',
                qty: 1,
                consent: { state: 'sent', atLabel: '09:12' },
              },
            ],
          },
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await expect(await canvas.findByText('Sent · awaiting signature')).toBeVisible();
  },
};
