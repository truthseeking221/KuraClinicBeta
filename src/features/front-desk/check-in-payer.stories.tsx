import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { CheckInWizard } from './check-in-wizard';
import { blankWalkIn, EXISTING_PATIENTS, IDENTITY_REGISTRY } from './demo-data';
import type { CartItem, FrontDeskPatient, InsurancePolicy } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const POLICY: InsurancePolicy = {
  id: 'pol-1',
  provider: 'Forte Insurance',
  policyNumber: 'FRT-887200115',
  memberName: 'Sok Phearom',
  memberId: '887200119',
  coverageScope: 'outpatient',
};

const LINES: CartItem[] = [
  { id: 'lipid', kind: 'lab', name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD', qty: 1 },
  { id: 'cbc', kind: 'lab', name: 'CBC', priceMinor: '600', currencyCode: 'USD', qty: 1 },
  {
    id: 'xray-chest',
    kind: 'imaging',
    name: 'Chest X-ray',
    priceMinor: '2500',
    currencyCode: 'USD',
    qty: 1,
  },
];

/** A confirmed, contactable patient with a policy and a composed order. */
function payerPatient(overrides: Partial<FrontDeskPatient> = {}): FrontDeskPatient {
  const base = blankWalkIn('walk-in-payer', 31);
  return {
    ...base,
    name: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    dob: '1974-03-15',
    sexAtBirth: 'Male',
    phoneNumber: '0931238123',
    otpVerified: true,
    identity: { source: 'manual', lockedFields: [] },
    insurance: [POLICY],
    cart: { ...base.cart, attributedPrescriberId: 'dr-sok-vanna', items: LINES },
    ...overrides,
  };
}

function PayerPlayground({ initial }: { initial: FrontDeskPatient }) {
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
  title: 'Clinic/Front Desk/Check-In/Payer',
  component: CheckInWizard,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      contract: {
        status: 'design-target',
        backendMapping: 'none',
        note:
          'payment-ms captures cash only. Eligibility, coverage percentages, co-pays, and claims have no upstream producer, so the insurer column is a preview and the claim action is disabled with its reason. Nothing on this task can complete a check-in on the strength of a capability the clinic does not have.',
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
          'Payer resolution runs after the order is composed, because coverage, co-pay, and a mixed basket are facts about lines: none can be answered before the lines exist. Each line carries its own payer, the desk can override any suggestion, and only the patient column is money the clinic can collect today.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  patient: blankWalkIn('walk-in-payer', 31),
  onPatientChange: () => {},
  existingPatients: EXISTING_PATIENTS,
  onCheckIn: () => {},
};

/** No policy on file: the task does not exist, and no empty step is shown. */
export const NoPolicyNoTask: Story = {
  name: 'A patient with no policy never sees this task',
  args: baseArgs,
  render: () => <PayerPlayground initial={payerPatient({ insurance: [] })} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Four tasks, not six — and none of them asks about insurance.
    await expect(await canvas.findByRole('tab', { name: /Payment/ })).toBeVisible();
    await expect(canvas.queryByRole('tab', { name: /Payer/ })).not.toBeInTheDocument();
    await expect(canvas.queryByText('Direct pay')).not.toBeInTheDocument();
  },
};

/** The task appears only once a policy exists, and only after the lines do. */
export const PayerFollowsOrders: Story = {
  name: 'Payer resolution comes after the order',
  args: baseArgs,
  render: () => <PayerPlayground initial={payerPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab').map((tab) => tab.textContent ?? '');
    const orders = tabs.findIndex((label) => label.includes('Orders'));
    const payer = tabs.findIndex((label) => label.includes('Payer'));
    await expect(payer).toBeGreaterThan(orders);
    await expect(await canvas.findByRole('heading', { level: 2, name: 'Who pays' })).toBeVisible();
  },
};

/** One basket, two payers: coverage is a line fact, not a visit fact. */
export const MixedBasket: Story = {
  name: 'A mixed basket splits per line',
  args: baseArgs,
  render: () => <PayerPlayground initial={payerPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Check eligibility' }));
    await expect(await canvas.findByText('Eligible')).toBeVisible();

    // Labs default to the insurer, imaging to the patient.
    await expect(await canvas.findByText('Mixed payers')).toBeVisible();

    // 80% of the $18 covered labs is previewed; the patient carries the rest.
    await expect(canvas.getByText('Insurer share, preview')).toBeVisible();
    await expect(canvas.getByText('$14.40')).toBeVisible();
    await expect(canvas.getByText('$33.60')).toBeVisible();
  },
};

/** The desk overrides any suggestion — a suggestion is not an adjudication. */
export const OverrideOneLine: Story = {
  name: 'The desk can move a single line to the patient',
  args: baseArgs,
  render: () => <PayerPlayground initial={payerPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Check eligibility' }));
    await expect(await canvas.findByText('Eligible')).toBeVisible();

    const cbcGroup = canvas.getByRole('radiogroup', { name: 'Payer for CBC' });
    await userEvent.click(within(cbcGroup).getByRole('radio', { name: 'Patient' }));

    // CBC ($6) leaves the covered pool: the insurer preview drops to 80% of $12.
    await expect(await canvas.findByText('$9.60')).toBeVisible();
  },
};

/** An insurer that cannot be reached is a state, not a blocker. */
export const InsurerUnreachable: Story = {
  name: 'Insurer unreachable',
  args: baseArgs,
  render: () => (
    <PayerPlayground
      initial={payerPatient({
        insurance: [{ ...POLICY, policyNumber: 'FRT-000000009' }],
      })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Check eligibility' }));
    await expect(await canvas.findByText('Insurer unreachable')).toBeVisible();
    // Nothing is covered, so every line stays with the patient.
    await expect(canvas.queryByText('Mixed payers')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Confirm this split' })).toBeEnabled();
  },
};

/**
 * Design target, not capability: the platform captures cash only, so filing a
 * claim is disabled with its reason and cannot complete a check-in.
 */
export const ClaimIsADesignTarget: Story = {
  name: 'Claims are shown as a design target, never as a completion',
  args: baseArgs,
  render: () => <PayerPlayground initial={payerPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Claims are not connected')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'File a claim' })).toBeDisabled();
    await expect(canvas.getByText(/no claim is filed/)).toBeVisible();

    // The task still completes on an honest split — the desk collects cash.
    await expect(canvas.getByRole('button', { name: 'Confirm who pays' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm this split' }));
    await expect(canvas.getByRole('button', { name: 'Confirm who pays' })).toBeEnabled();
  },
};

export const Mobile: Story = {
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => <PayerPlayground initial={payerPatient()} />,
};
