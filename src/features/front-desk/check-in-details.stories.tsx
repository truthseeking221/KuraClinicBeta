import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { CheckInWizard } from './check-in-wizard';
import { blankWalkIn, EXISTING_PATIENTS, IDENTITY_REGISTRY } from './demo-data';
import type { FrontDeskPatient } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

/** A patient captured from the Kura record — the Step-2 entry state. */
function capturedPatient(): FrontDeskPatient {
  return {
    ...blankWalkIn('walk-in-details', 29),
    name: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    dob: '1974-03-15',
    sexAtBirth: 'Male',
    idNumber: '012345678',
    phoneNumber: '0931238123',
    identity: { source: 'existing', lockedFields: ['name', 'dob', 'sexAtBirth'] },
  };
}

/** Step-3 entry state: contact verified, no insurance decision yet. */
function reviewedPatient(): FrontDeskPatient {
  return { ...capturedPatient(), otpVerified: true };
}

function DetailsPlayground({ initial }: { initial: FrontDeskPatient }) {
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
  title: 'Clinic/Front Desk/Check-In Wizard/Steps 2–3 Patient & Insurance',
  component: CheckInWizard,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'EXTEND (front-desk Steps 2–3 to upstream information parity)',
        owner: 'src/features/front-desk',
        evidence:
          'Information architecture ported from Kura-med/ui-kit `Receptionist/Wizard/Step 2 Patient` and `Step 3 Insurance` (source-kura-ui-kit): identity section with locked captured fields + Unlock, Khmer name, preferred language, optional Address and Refund-account disclosures, and the full policy contract (member/group/coverage/co-pay/active-until/pre-auth/tier/effective, checking + result states, co-pay banner). Composed from house Card, Collapsible, Input, Select, SegmentedToggle, Badge, Alert, MoneyText; Tailwind and tabler icons replaced.',
        exclusions: [
          'Capture photo (camera hardware ceremony)',
          'Telegram contact channel (platform ceremony — SMS OTP carries the verified-contact gate)',
          'Scan insurance card (hardware ceremony)',
          'Real KHQR scan for the refund account (demo saves a fixture payload)',
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
          'Step 2 reviews captured identity (locked fields require an explicit Unlock), verifies a contact channel, and optionally records address and a Bakong refund account. Step 3 attaches an insurance policy with a live eligibility check — or records an explicit direct-pay decision. The order rail stays hidden until orders exist.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  patient: blankWalkIn('walk-in-details', 29),
  onPatientChange: () => {},
  existingPatients: EXISTING_PATIENTS,
  onCheckIn: () => {},
};

export const ReviewLockedIdentity: Story = {
  name: 'Step 2 — Captured identity with locked fields',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('From Kura record')).toBeVisible();

    // Captured fields arrive locked; free fields stay editable.
    await expect(canvas.getByLabelText(/Full name \(Latin\)/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Date of birth/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Sex at birth/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Full name \(Khmer\)/)).toBeEnabled();
    await expect(canvas.getByLabelText(/National ID number/)).toBeEnabled();
    // Language moved to the contact section: it decides message language.
    await expect(canvas.getByLabelText(/Language for messages/)).toBeEnabled();

    // Unlock is an explicit, confirmed decision — never one accidental click.
    await userEvent.click(canvas.getByRole('button', { name: 'Unlock fields' }));
    await expect(await canvas.findByText('Unlock captured fields?')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Unlock' }));
    await waitFor(async () => {
      await expect(canvas.getByLabelText(/Full name \(Latin\)/)).toBeEnabled();
      await expect(canvas.getByLabelText(/Date of birth/)).toBeEnabled();
    });
  },
};

export const ReviewOptionalSections: Story = {
  name: 'Step 2 — Address & refund account disclosures',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Optional sections stay collapsed until opened — the contact gate keeps focus.
    await expect(canvas.queryByLabelText('Province')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /Address/ }));
    await expect(await canvas.findByLabelText('Province')).toBeVisible();
    await userEvent.type(canvas.getByLabelText('Province'), 'Phnom Penh');

    await userEvent.click(canvas.getByRole('button', { name: /Refund account/ }));
    await expect(await canvas.findByText('No refund account saved')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Scan KHQR' }));
    await expect(await canvas.findByText('Bakong KHQR saved')).toBeVisible();
  },
};

export const ReviewContactGate: Story = {
  name: 'Step 2 — Contact verification gates Continue',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await expect(
      canvas.getByText('Date of birth, sex, and a contact channel are required.'),
    ).toBeVisible();

    // Channel-first: picking how to reach the patient is a value choice.
    await userEvent.click(canvas.getByRole('radio', { name: 'SMS' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(canvas.getByLabelText('SMS code'), '123456');
    await userEvent.click(canvas.getByRole('button', { name: 'Verify' }));
    await expect(await canvas.findByText('SMS verified')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeEnabled();
  },
};

export const TelegramChannel: Story = {
  name: 'Step 2 — Telegram via the patient display',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Telegram' }));
    await expect(
      await canvas.findByText('Telegram QR pushed to the patient display'),
    ).toBeVisible();
    // The desk never types the number — the patient shares it from their phone.
    await userEvent.click(canvas.getByRole('button', { name: 'Simulate patient share' }));
    await expect(await canvas.findByText('Telegram verified')).toBeVisible();
    await expect(canvas.getByText(/t\.me\//)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeEnabled();
  },
};

export const SaveUnverifiedReason: Story = {
  name: 'Step 2 — Unverified passes only with a recorded reason',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', { name: 'Continue without verifying' }));
    const save = canvas.getByRole('button', { name: 'Save unverified' });
    await expect(save).toBeDisabled();
    // House Select is a combobox, not a native <select>.
    await userEvent.click(canvas.getByLabelText('Why does it stay unverified?'));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', { name: 'Guardian phone only' }));
    await userEvent.click(save);
    await expect(await canvas.findByText('Unverified · Guardian phone only')).toBeVisible();
    await expect(canvas.getByText(/patient may miss them/)).toBeVisible();
    // Trusted-desk door: the reason unblocks Continue; verify stays offered.
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeEnabled();
    await expect(canvas.getByRole('button', { name: 'Verify instead' })).toBeVisible();
  },
};

export const InsuranceEmpty: Story = {
  name: 'Step 3 — No insurance on file',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('No insurance on file')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue without insurance' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Continue without insurance' }));
    await expect(await canvas.findByText('Direct pay')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeEnabled();
  },
};

export const InsuranceEligibilityFlow: Story = {
  name: 'Step 3 — Add policy → checking → eligible → saved',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Add policy' }));

    await userEvent.type(canvas.getByLabelText(/Policy number/), 'FRT-887200115');
    await userEvent.type(canvas.getByLabelText(/Member ID/), '887200119');
    await userEvent.click(canvas.getByRole('button', { name: 'Check eligibility' }));

    // Transient checking state, then the eligibility verdict.
    await expect(await canvas.findByText(/Checking eligibility with Forte Insurance/)).toBeVisible();
    await expect(
      await canvas.findByText(/Eligible — 80% of eligible services/),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Save policy' }));

    // The attached policy renders the full contract + the co-pay banner.
    await expect(await canvas.findByText('Member ID')).toBeVisible();
    await expect(canvas.getByText('Group')).toBeVisible();
    await expect(canvas.getByText('CORP-90021')).toBeVisible();
    await expect(canvas.getByText('Pre-auth')).toBeVisible();
    await expect(canvas.getByText(/co-pay\s+applies/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Re-verify/ })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue' })).toBeEnabled();
  },
};

export const InsuranceUnreachable: Story = {
  name: 'Step 3 — Insurer unreachable, add anyway',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Add policy' }));
    await userEvent.type(canvas.getByLabelText(/Policy number/), 'FRT-000000009');
    await userEvent.click(canvas.getByRole('button', { name: 'Check eligibility' }));

    await expect(await canvas.findByText('Insurer unreachable')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Add anyway' }));
    await expect(await canvas.findByText('Unverified')).toBeVisible();
  },
};

export const MobileNarrow: Story = {
  name: 'Step 2 — Mobile',
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => <DetailsPlayground initial={capturedPatient()} />,
};

export const DarkTheme: Story = {
  name: 'Step 3 — Dark theme',
  args: baseArgs,
  globals: { theme: 'dark' },
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
};

export const InsuranceScanCard: Story = {
  name: 'Step 3 — Scan card autofills the policy form',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Scan card' }));
    await expect(await canvas.findByLabelText(/Policy number/)).toHaveValue('FRT-88720011');
    await expect(canvas.getByLabelText(/Member ID/)).toHaveValue('M-8872001');
  },
};

export const InsuranceClaimRoute: Story = {
  name: 'Step 6 — Route the balance to an insurer claim',
  args: baseArgs,
  render: () => {
    const base = reviewedPatient();
    return (
      <DetailsPlayground
        initial={{
          ...base,
          insurance: [
            {
              id: 'pol-1',
              provider: 'Forte',
              policyNumber: 'FRT-88720011',
              memberName: base.name,
              eligibility: {
                kind: 'eligible',
                tier: 'Outpatient',
                coveragePct: 80,
                copayMinor: '500',
                activeUntil: '2027-12',
                verifiedAtLabel: 'Verified 08:21 · supervisor LN',
              },
            },
          ],
          insuranceAcked: true,
          cart: {
            ...base.cart,
            attributedPrescriberId: 'dr-sok-vanna',
            items: [
              { id: 'lipid', kind: 'lab', name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD', qty: 1 },
            ],
          },
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /6 Payment/ }));
    // Per-line payer preview rides the cart rail line.
    await expect(await canvas.findByText(/Forte 80% · patient owes 2.40 USD/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Route to insurer claim' }));
    await expect(
      await canvas.findByText('Insurance claim pending · Forte'),
    ).toBeVisible();
    await expect(canvas.getByText(/no claim is actually filed/)).toBeVisible();
    // Claim routing resolves the payment gate like pay-later.
    await expect(canvas.getByRole('button', { name: 'Finish' })).toBeEnabled();
  },
};
