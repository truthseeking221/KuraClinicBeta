import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { AppShell } from '../../components/shared/app-shell';

import { CheckInComplete } from './check-in-complete';
import { CheckInWizard } from './check-in-wizard';
import {
  blankWalkIn,
  DEMO_OTP,
  DEMO_PRESCRIBERS,
  DEMO_PRESCRIBERS_NONE_ELIGIBLE,
  EXISTING_PATIENTS,
  STALE_PRICING,
} from './demo-data';
import { findCollisionCandidates, nextQueueNumber, phonesMatch } from './logic';
import type { FrontDeskPatient } from './types';
import type { FxRateQuote } from './money';
import { READINESS } from '../../components/foundations/readiness-data';

const STORY_FX_RATE: FxRateQuote = {
  base: 'USD',
  quote: 'KHR',
  rateUnits: '4100',
  rateScale: 0,
};

const meta = {
  title: 'Clinic/Front Desk/Check-In Wizard',
  component: CheckInWizard,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'CREATE (flow) + COMPOSE (primitives)',
        owner: 'src/features/front-desk',
        evidence:
          'ReUI searched: stepper intaken as the wizard nav; checkout/onboarding blocks are references only. Order selection composes the canonical LabTestPicker; the order cart consumes minor-unit priced lines, renders through MoneyText, and receives FX as an injected config contract.',
        exclusions: [
          'NFC/chip National ID capture (hardware ceremony, deferred)',
          'Patient photo capture (camera ceremony, deferred)',
          'Patient PWA (separate surface); booking-QR scan and booking-code intake now live in Step 1',
        ],
      },
      journeys: ['front-desk-check-in', 'front-desk-payment', 'front-desk-duplicate-guard'],
    },
    docs: {
      description: {
        component:
          'Six-step Storybook reception flow: Identity → Review → Insurance → Orders → Pre-consult → Payment. The order rail is a backend-priced summary only; workflow actions remain in the step footer. SMS code 123456 and the injected FX quote are explicit story fixtures.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

function WizardPlayground({
  initial,
  prescribers,
  pricingStatus,
}: {
  initial?: FrontDeskPatient;
  prescribers?: typeof DEMO_PRESCRIBERS;
  pricingStatus?: 'ready' | 'loading' | 'error';
}) {
  const [patient, setPatient] = useState<FrontDeskPatient>(initial ?? blankWalkIn('walk-in-1', 27));
  const [checkedIn, setCheckedIn] = useState(false);

  // Legacy desk law: check-in immediately opens the next blank slot.
  if (checkedIn) {
    return (
      <CheckInComplete
        onNextPatient={() => {
          setPatient({
            ...blankWalkIn(`walk-in-next-${patient.id}`, nextQueueNumber([patient.queueNumber])),
            arrivedLabel: 'Just now',
          });
          setCheckedIn(false);
        }}
        patient={patient}
      />
    );
  }

  return (
    <CheckInWizard
      existingPatients={EXISTING_PATIENTS}
      fxRate={STORY_FX_RATE}
      onCheckIn={() => setCheckedIn(true)}
      onPatientChange={setPatient}
      patient={patient}
      prescribers={prescribers}
      pricingStatus={pricingStatus}
    />
  );
}

/** New walk-in at step 1 — the gate keeps later steps locked. */
export const Default: Story = {
  args: {
    patient: blankWalkIn('walk-in-1', 27),
    onPatientChange: () => {},
    existingPatients: EXISTING_PATIENTS,
    onCheckIn: () => {},
  },
  render: () => <WizardPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', { name: /2 Review/ })).toBeDisabled();
    await expect(canvas.getByRole('tab', { name: /6 Payment/ })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Review details' })).toBeDisabled();
  },
};

/** Duplicate detection: same phone + name + DOB flags a strong match and blocks Continue. */
export const DuplicateGuard: Story = {
  args: Default.args,
  render: () => {
    const draft: FrontDeskPatient = {
      ...blankWalkIn('walk-in-dup', 31),
      name: 'Sokha Chan',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      phoneNumber: '12777088',
      identity: { source: 'manual', lockedFields: [] },
    };
    return <WizardPlayground initial={draft} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alertTitle = await canvas.findByText(/Exact identity match — Sokha Chan/);
    await expect(alertTitle).toBeVisible();

    // A blocking duplicate leads the step: it must sit above the identity it
    // questions, never below the optional disclosures.
    const identityFirstField = canvas.getByLabelText(/Full name \(Latin\)/);
    await expect(
      alertTitle.compareDocumentPosition(identityFirstField) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const candidates = findCollisionCandidates(
      {
        ...blankWalkIn('t', 1),
        name: 'Sokha Chan',
        dob: '1992-03-14',
        sexAtBirth: 'Female',
        phoneNumber: '12777088',
      },
      EXISTING_PATIENTS,
    );
    await expect(candidates[0].score).toBe(88); // 46 + 34 + 8
    await expect(candidates[0].strength).toBe('Exact identity match');

    await expect(phonesMatch('+85512777088', '12777088')).toBe(true);
    await expect(phonesMatch('1277', '12777088')).toBe(false); // under 8 digits never matches

    await userEvent.click(canvas.getByRole('button', { name: 'Different person — continue' }));
    await waitFor(async () => {
      await expect(canvas.queryByText(/Exact identity match/)).not.toBeInTheDocument();
    });
  },
};

/**
 * Editing a paid cart opens the void-or-supplemental choice as a modal.
 * The dialog is hidden until requested; the safe path is the dominant action.
 */
export const PaidEditChoice: Story = {
  args: Default.args,
  render: () => {
    const base = blankWalkIn('paid-edit', 44);
    const paid: FrontDeskPatient = {
      ...base,
      name: 'Sok Vanna',
      dob: '1988-02-02',
      sexAtBirth: 'Male',
      otpVerified: true,
      identity: { source: 'manual', lockedFields: [] },
      insuranceAcked: true,
      cart: {
        ...base.cart,
        items: [
          ...base.cart.items,
          { id: 'cbc', kind: 'lab', name: 'CBC', priceMinor: '600', currencyCode: 'USD', qty: 1 },
          { id: 'lipid', kind: 'lab', name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD', qty: 1 },
        ],
        payment: {
          ...base.cart.payment,
          status: 'confirmed',
          method: 'cash',
          amountMinor: '1800',
          changeMinor: '0',
          receiptId: 'R-58213',
          confirmedAt: '09:42',
          cashier: 'Linh Nguyen',
        },
      },
    };
    return <WizardPlayground initial={paid} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Closed dialog renders nothing.
    await expect(canvas.queryByText('This order is already paid')).not.toBeVisible();

    // Removing a paid item requests the choice.
    await userEvent.click(canvas.getByRole('button', { name: 'Remove CBC' }));
    const dialog = await canvas.findByRole('alertdialog');
    // The dialog fades in via @starting-style; wait out the opacity transition.
    await waitFor(async () => {
      await expect(within(dialog).getByText('This order is already paid')).toBeVisible();
    });

    // Voiding is supervisor-gated; the safe path stays one click.
    await expect(
      within(dialog).getByRole('button', { name: 'Void & recollect' }),
    ).toBeDisabled();
    await userEvent.type(within(dialog).getByLabelText('Supervisor PIN for void'), '4821');
    await expect(
      within(dialog).getByRole('button', { name: 'Void & recollect' }),
    ).toBeEnabled();

    // The safe path keeps the receipt and marks a supplemental balance.
    await userEvent.click(within(dialog).getByRole('button', { name: 'Collect difference' }));
    await expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument();
    await expect(await canvas.findByText(/Previously paid \(R-58213\)/)).toBeVisible();
  },
};

/** Full happy path through all six steps to check-in, inside the shell. */
export const FullCheckInFlow: Story = {
  args: Default.args,
  parameters: { layout: 'fullscreen' },
  render: function FullFlow() {
    const [patient, setPatient] = useState<FrontDeskPatient>(blankWalkIn('walk-in-9', 33));
    const [checkedIn, setCheckedIn] = useState(false);

    return (
      <AppShell
        activeKey="arrivals"
        availableModes={['front-desk', 'collection']}
        mode="front-desk"
        onNavigate={() => {}}
        station={{ id: 'DESK-01', shift: 'morning' }}
        user={{ name: 'Linh Nguyen', email: 'linh@mekong.clinic', licenceVerified: false }}
        workspace={{ id: 'ws-mekong', name: 'Mekong Clinic' }}
      >
        {checkedIn ? (
          <CheckInComplete
            onNextPatient={() => {
              setPatient({
                ...blankWalkIn('walk-in-10', nextQueueNumber([patient.queueNumber])),
                arrivedLabel: 'Just now',
              });
              setCheckedIn(false);
            }}
            patient={patient}
          />
        ) : (
          <CheckInWizard
            existingPatients={EXISTING_PATIENTS}
            fxRate={STORY_FX_RATE}
            onCheckIn={() => setCheckedIn(true)}
            onPatientChange={setPatient}
            patient={patient}
          />
        )}
      </AppShell>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Step 1: identity search finds no record; create a new patient.
    await userEvent.type(
      canvas.getByLabelText('Find patient by phone, booking code, or name'),
      'Bopha Kim',
    );
    await userEvent.click(await canvas.findByRole('button', { name: 'Create a new patient' }));

    // Step 2 — review + OTP.
    const dateOfBirth = canvas.getByLabelText(/Date of birth/);
    await userEvent.type(dateOfBirth, '19900505');
    await expect(dateOfBirth).toHaveValue('1990-05-05');
    await userEvent.click(canvas.getByRole('radio', { name: 'Female' }));
    await userEvent.type(canvas.getByLabelText(/^Phone/), '99887766');
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(canvas.getByLabelText('SMS code'), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', { name: 'Verify' }));
    await expect(await canvas.findByText('SMS verified')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    // Step 3 — direct pay.
    await userEvent.click(canvas.getByRole('button', { name: 'Continue without insurance' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    // Step 4 — add CBC and attribute the ordering clinician (ADR-0057).
    await expect(canvas.getByLabelText('67 tests')).toBeVisible();
    await userEvent.click(
      canvas.getByRole('checkbox', { name: /Complete blood count/ }),
    );
    await userEvent.click(canvas.getByLabelText('Ordering clinician'));
    await userEvent.click(
      await within(canvasElement.ownerDocument.body).findByRole('option', {
        name: /Dr\. Sok Vanna/,
      }),
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    // Step 5 — no telecon in cart → continue directly.
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));

    // Step 6 — cash $25 for $6 due.
    await userEvent.type(canvas.getByLabelText(/Tendered/), '25');
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm cash' }));
    await expect(await canvas.findByText(/Paid · R-58213/)).toBeVisible();

    // Finish from the workflow footer; the cart rail has no business action.
    const finishButton = canvas.getByRole('button', { name: 'Finish' });
    await waitFor(async () => expect(finishButton).toBeEnabled());
    await userEvent.click(finishButton);

    // Terminal outcome: checked-in summary, then the next blank slot spawns
    // with the following queue number (legacy desk law).
    await expect(await canvas.findByText('Checked in')).toBeVisible();
    await expect(canvas.getByText(/Paid · R-58213/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Next patient' }));
    await expect(await canvas.findByText('Find or create a patient')).toBeVisible();
    await expect(canvas.getByText('Q-034')).toBeVisible();
  },
};

/** KHQR path: waiting state, webhook confirmation, cancel escape. */
export const KhqrPayment: Story = {
  args: Default.args,
  render: () => {
    const ready: FrontDeskPatient = {
      ...blankWalkIn('khqr-1', 40),
      name: 'Dara Phan',
      dob: '1985-09-09',
      sexAtBirth: 'Male',
      otpVerified: true,
      identity: { source: 'manual', lockedFields: [] },
      insuranceAcked: true,
      cart: {
        ...blankWalkIn('khqr-1', 40).cart,
        attributedPrescriberId: 'dr-sok-vanna',
        items: [
          ...blankWalkIn('khqr-1', 40).cart.items,
          { id: 'lipid', kind: 'lab', name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD', qty: 1, fasting: true },
        ],
      },
    };
    return <WizardPlayground initial={ready} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /6 Payment/ }));
    await userEvent.click(canvas.getByRole('button', { name: 'Generate QR' }));
    await expect(await canvas.findByText(/KHQR waiting for Bakong/)).toBeVisible();

    await expect(canvas.getByRole('button', { name: 'Finish' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Simulate webhook confirm' }));
    await expect(await canvas.findByText(/Paid · R-58213/)).toBeVisible();
  },
};

/**
 * The KHQR intent is expiring and cancellable; manual receipt is a confirmed
 * fallback, never one click. PROTOTYPE: no Bakong provider integration.
 */
export const KhqrLifecycle: Story = {
  name: 'KHQR lifecycle · expired, regenerate, manual receipt',
  args: Default.args,
  render: () => {
    const base = blankWalkIn('khqr-life', 45);
    return (
      <WizardPlayground
        initial={{
          ...base,
          name: 'Dara Phan',
          dob: '1985-09-09',
          sexAtBirth: 'Male',
          otpVerified: true,
          identity: { source: 'manual', lockedFields: [] },
          insuranceAcked: true,
          cart: {
            ...base.cart,
            attributedPrescriberId: 'dr-sok-vanna',
            items: [
              ...base.cart.items,
              { id: 'lipid', kind: 'lab', name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD', qty: 1 },
            ],
          },
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', { name: /6 Payment/ }));
    await userEvent.click(canvas.getByRole('button', { name: 'Generate QR' }));

    // Expiry is terminal for the intent — only a new QR can retry.
    await userEvent.click(canvas.getByRole('button', { name: 'Simulate expiry' }));
    await expect(await canvas.findByText('QR expired')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Regenerate QR' }));
    await expect(await canvas.findByText(/KHQR waiting for Bakong/)).toBeVisible();

    // Manual receipt demands a sighted-receipt confirmation.
    await userEvent.click(canvas.getByRole('button', { name: 'Mark received' }));
    await expect(await body.findByText(/Manual fallback only/)).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Yes, mark received' }));
    await expect(await canvas.findByText(/Paid · R-58213/)).toBeVisible();
  },
};

/**
 * Split: cash strictly between zero and the due amount, then a KHQR intent
 * covers the remainder; the split completes only on Bakong confirmation.
 * PROTOTYPE: patient payment upstream is cash-only.
 */
export const SplitCashKhqr: Story = {
  name: 'Split cash + KHQR · two-step collection',
  args: Default.args,
  render: () => {
    const base = blankWalkIn('split-1', 46);
    return (
      <WizardPlayground
        initial={{
          ...base,
          name: 'Chan Dara',
          dob: '1979-12-01',
          sexAtBirth: 'Male',
          otpVerified: true,
          identity: { source: 'manual', lockedFields: [] },
          insuranceAcked: true,
          cart: {
            ...base.cart,
            attributedPrescriberId: 'dr-sok-vanna',
            items: [
              ...base.cart.items,
              { id: 'cmp', kind: 'lab', name: 'CMP (metabolic panel)', priceMinor: '1500', currencyCode: 'USD', qty: 1 },
            ],
          },
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /6 Payment/ }));

    const collect = canvas.getByRole('button', { name: 'Collect cash · show QR' });
    // Zero and full-cover amounts are not splits.
    await expect(collect).toBeDisabled();
    await userEvent.type(canvas.getByLabelText('Cash portion (USD)'), '15.00');
    await expect(collect).toBeDisabled();
    await userEvent.clear(canvas.getByLabelText('Cash portion (USD)'));
    await userEvent.type(canvas.getByLabelText('Cash portion (USD)'), '10.00');
    await expect(collect).toBeEnabled();
    await userEvent.click(collect);

    await expect(await canvas.findByText(/Cash collected/)).toBeVisible();
    await expect(canvas.getByText(/KHQR covers the remainder/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Finish' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Simulate webhook confirm' }));
    await expect(await canvas.findByText(/Paid · R-58213/)).toBeVisible();
    await expect(canvas.getByText(/cash \+ KHQR/)).toBeVisible();
  },
};

/** Mobile: cart rail stacks below the step panel. */
export const Mobile: Story = {
  args: Default.args,
  globals: { viewport: { value: 'kura390' } },
  render: () => <WizardPlayground />,
};

function readyWithOrders(id: string, extra?: Partial<FrontDeskPatient['cart']>): FrontDeskPatient {
  const base = blankWalkIn(id, 52);
  return {
    ...base,
    name: 'Dara Phan',
    dob: '1985-09-09',
    sexAtBirth: 'Male',
    otpVerified: true,
    identity: { source: 'manual', lockedFields: [] },
    insuranceAcked: true,
    cart: {
      ...base.cart,
      items: [
        { id: 'hba1c', kind: 'lab', name: 'HbA1c', priceMinor: '900', currencyCode: 'USD', qty: 1 },
        { id: 'cbc', kind: 'lab', name: 'CBC', priceMinor: '600', currencyCode: 'USD', qty: 1 },
      ],
      ...extra,
    },
  };
}

/**
 * Order attribution (ADR-0057): the desk places on behalf of a clinician.
 * Expired licences cannot be attributed; payment stays blocked until resolved.
 */
export const PrescriberAttribution: Story = {
  args: Default.args,
  render: () => <WizardPlayground initial={readyWithOrders('attr-1')} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The wizard reopens at Payment (first incomplete step) — blocked upfront.
    await expect(
      await canvas.findByText('Resolve blockers before collecting payment'),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    const select = canvas.getByLabelText('Ordering clinician');
    await userEvent.click(select);
    const body = within(canvasElement.ownerDocument.body);
    // Expired licence renders disabled — selectable clinicians are eligible only.
    const expired = await body.findByRole('option', { name: /Dr. Chan Rotha · licence not live/ });
    await expect(expired).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(body.getByRole('option', { name: /Dr. Sok Vanna/ }));

    // Forward navigation is one step at a time (census rule).
    await userEvent.click(canvas.getByRole('tab', { name: /Pre-consult/ }));
    await userEvent.click(canvas.getByRole('tab', { name: /Payment/ }));
    await expect(
      canvas.queryByText('Resolve blockers before collecting payment'),
    ).not.toBeInTheDocument();
  },
};

/** Every licence expired → the server would refuse placement (422 NO_ELIGIBLE_PRESCRIBER). */
export const NoEligiblePrescriber: Story = {
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('attr-none')}
      prescribers={DEMO_PRESCRIBERS_NONE_ELIGIBLE}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await expect(await canvas.findByText('No clinician can be attributed')).toBeVisible();
    await expect(canvas.queryByLabelText('Ordering clinician')).not.toBeInTheDocument();
  },
};

/**
 * The server re-derives prices at placement (ORD-21). A stale quote blocks
 * payment until the desk explicitly accepts the new total.
 */
export const StalePriceReaccept: Story = {
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('stale-1', {
        attributedPrescriberId: 'dr-sok-vanna',
        pricing: STALE_PRICING,
      })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await expect(await canvas.findByText('Prices changed')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Accept new price' }));
    await waitFor(async () => {
      await expect(canvas.queryByText('Prices changed')).not.toBeInTheDocument();
    });
    await expect(canvas.getByText('$10.50')).toBeVisible(); // server price applied to the cart line
  },
};

/**
 * 502 code_issuance_failed: the order EXISTS but no usable code was issued.
 * The desk sees the needs-attention consequence and a retry — never a dead end.
 */
export const CodeIssuanceFailed: Story = {
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('code-fail', {
        attributedPrescriberId: 'dr-sok-vanna',
        placeFailure: 'code-issuance-failed',
      })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await expect(
      await canvas.findByText('Order recorded, but the booking code failed'),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry issuing code' }));
    await waitFor(async () => {
      await expect(
        canvas.queryByText('Order recorded, but the booking code failed'),
      ).not.toBeInTheDocument();
    });
  },
};

/** Idempotency conflict (409): an identical placement already succeeded — never retry blindly. */
export const IdempotencyConflict: Story = {
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('idem-1', {
        attributedPrescriberId: 'dr-sok-vanna',
        placeFailure: 'idempotency-conflict',
      })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await expect(
      await canvas.findByText('An identical order request already succeeded'),
    ).toBeVisible();
  },
};

/**
 * Order composition blockers (truth pack §5.4): panel/analyte overlap,
 * unsupported test, and the unsupported catalog row disabled with its reason
 * inline. Payment stays blocked until the cart is clean.
 */
export const OrderCompositionBlockers: Story = {
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('blockers-1', {
        attributedPrescriberId: 'dr-sok-vanna',
        items: [
          { id: 'cmp', kind: 'lab', name: 'CMP (metabolic panel)', priceMinor: '1500', currencyCode: 'USD', qty: 1 },
          { id: 'glucose-f', kind: 'lab', name: 'Glucose (fasting)', priceMinor: '400', currencyCode: 'USD', qty: 1 },
          { id: 'lpa', kind: 'lab', name: 'Lipoprotein(a)', priceMinor: '3200', currencyCode: 'USD', qty: 1 },
        ],
      })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The wizard reopens at Payment — the same gate blocks upfront.
    await expect(
      await canvas.findByText('Resolve blockers before collecting payment'),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('tab', { name: /Orders/ }));
    await expect(await canvas.findByText('Resolve 2 order blockers')).toBeVisible();
    await expect(canvas.getByText(/already includes glucose/)).toBeVisible();
    await expect(canvas.getByText(/not orderable at this lab yet. Remove it/)).toBeVisible();

    // Removing the overlapping analyte and the unsupported test clears the gate.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove Glucose (fasting)' }),
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Lipoprotein(a)' }));
    await waitFor(async () => {
      await expect(canvas.queryByText(/Resolve \d order blockers?/)).not.toBeInTheDocument();
    });
  },
};

/** After payment the receipt artifact replaces the toast-style confirmation. */
export const PaidWithReceipt: Story = {
  args: Default.args,
  render: () => {
    const base = readyWithOrders('receipt-1', { attributedPrescriberId: 'dr-sok-vanna' });
    const paid: FrontDeskPatient = {
      ...base,
      cart: {
        ...base.cart,
        payment: {
          status: 'confirmed',
          method: 'cash',
          tendered: '20',
          changeMinor: '500',
          receiptId: 'R-58213',
          confirmedAt: '09:42',
          amountMinor: '1500',
          cashier: 'Linh Nguyen',
        },
      },
    };
    return <WizardPlayground initial={paid} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Payment/ }));
    await expect(await canvas.findByText('Receipt R-58213')).toBeVisible();
    await expect(canvas.getByText(/Receipts are immutable evidence/)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Print receipt' })).toBeVisible();
  },
};

/**
 * F1–F6 jump steps but never bypass the gate; `?` opens the shortcut map.
 */
export const KeyboardShortcuts: Story = {
  name: 'Keyboard · step jumps respect the gate',
  args: Default.args,
  render: () => {
    const base = blankWalkIn('kbd-1', 47);
    return (
      <WizardPlayground
        initial={{
          ...base,
          name: 'Sok Vanna',
          dob: '1988-02-02',
          sexAtBirth: 'Male',
          otpVerified: true,
          identity: { source: 'manual', lockedFields: [] },
          insuranceAcked: true,
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    // Steps 1–3 are done → F1 jumps back to Identity.
    await fireEvent.keyDown(canvasElement.ownerDocument.body, { key: 'F1' });
    await expect(
      await canvas.findByRole('heading', { level: 2, name: 'Patient selected' }),
    ).toBeVisible();
    // F6 stays locked (no orders yet) — the gate always wins.
    await fireEvent.keyDown(canvasElement.ownerDocument.body, { key: 'F6' });
    await expect(canvas.queryByText('Patient due')).not.toBeInTheDocument();
    // ? opens the cheatsheet.
    await fireEvent.keyDown(canvasElement.ownerDocument.body, { key: '?' });
    await expect(await body.findByText('Keyboard shortcuts')).toBeVisible();
  },
};

/**
 * Promo codes follow the legacy money order — item promo, then fixed, then
 * percent, each against the running remainder. PROTOTYPE: no upstream engine.
 */
export const PromoDiscount: Story = {
  name: 'Promo codes · item → fixed → percent',
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={{
        ...readyWithOrders('promo-1', { attributedPrescriberId: 'dr-sok-vanna' }),
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /6 Payment/ }));

    // Unknown code fails loudly, applies nothing.
    await userEvent.type(canvas.getByLabelText('Promo code'), 'NOPE');
    await userEvent.click(canvas.getByRole('button', { name: 'Apply' }));
    await expect(await canvas.findByText('Code not recognised.')).toBeVisible();

    // WELCOME10: 10% of $15.00 due.
    await userEvent.clear(canvas.getByLabelText('Promo code'));
    await userEvent.type(canvas.getByLabelText('Promo code'), 'WELCOME10');
    await userEvent.click(canvas.getByRole('button', { name: 'Apply' }));
    await expect(await canvas.findByText(/New patient · 10% off · WELCOME10/)).toBeVisible();

    // Item promo for CBC in cart stacks before the percent in money order.
    await userEvent.type(canvas.getByLabelText('Promo code'), 'CBC50');
    await userEvent.click(canvas.getByRole('button', { name: 'Apply' }));
    await expect(await canvas.findByText(/CBC half price · CBC50/)).toBeVisible();

    // Discount reaches the cart rail through the shared credit row.
    await expect(canvas.getByText('Promo discount')).toBeVisible();

    // Removing a promo restores the due amount.
    await userEvent.click(canvas.getByRole('button', { name: 'Remove promo WELCOME10' }));
    await expect(canvas.queryByText(/WELCOME10/)).not.toBeInTheDocument();
  },
};

/**
 * Server pricing unavailable: the rail shows the failure and payment refuses
 * to collect until pricing returns — the desk never keys an amount by hand.
 */
export const PricingUnavailableInFlow: Story = {
  name: 'Pricing error · collection blocked in the flow',
  args: Default.args,
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('pricing-err', { attributedPrescriberId: 'dr-sok-vanna' })}
      pricingStatus="error"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText(/Do not collect payment until the server price is available/),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('tab', { name: /6 Payment/ }));
    await expect(
      await canvas.findByText(/The order total could not be refreshed — retry pricing/),
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Confirm cash' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Generate QR' })).toBeDisabled();
  },
};

/**
 * Visit and vitals lines are orderable desk services — the legacy default
 * walk-in lines, deliberately added by hand instead of auto-seeded so the
 * order gate and prescriber attribution stay honest.
 */
export const VisitAndVitalsOrderable: Story = {
  name: 'Orders · clinic visit and vitals lines',
  args: Default.args,
  render: () => {
    const base = readyWithOrders('visit-vitals', { attributedPrescriberId: 'dr-sok-vanna' });
    return <WizardPlayground initial={{ ...base, cart: { ...base.cart, items: [] } }} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /4 Orders/ }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Additional order types' }));
    await userEvent.click(await body.findByRole('checkbox', { name: 'Clinic visit' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Additional order types' }));
    await userEvent.click(await body.findByRole('checkbox', { name: 'Vital signs' }));
    await expect(canvas.getAllByText('Clinic visit').length).toBeGreaterThan(0);
    await expect(canvas.getAllByText('Vital signs').length).toBeGreaterThan(0);
  },
};

/**
 * The mobile dock begins at order selection, when it has a meaningful next
 * action. Its CTA resumes at the first not-done step and never bypasses the
 * gate. The checked-in state renders on CheckInComplete.
 */
export const MobileDock: Story = {
  name: 'Mobile dock · sticky next action',
  args: Default.args,
  globals: { viewport: { value: 'kura390' } },
  render: () => (
    <WizardPlayground
      initial={readyWithOrders('dock-1', { attributedPrescriberId: 'dr-sok-vanna' })}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dock = await canvas.findByRole('region', { name: 'Check-in progress' });
    // Ready to pay → loud due + Collect.
    await expect(within(dock).getByText('Patient due')).toBeVisible();
    const collect = within(dock).getByRole('button', { name: 'Collect payment' });
    await userEvent.click(collect);
    // The CTA resumed at Payment (first not-done step).
    await expect(
      await canvas.findByRole('heading', { level: 2, name: 'Payment' }),
    ).toBeVisible();

    // Cash payment flips the dock to the paid state with Finish.
    await userEvent.type(canvas.getByLabelText(/Tendered/), '20');
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm cash' }));
    await expect(
      await within(dock).findByRole('button', { name: 'Finish check-in' }),
    ).toBeVisible();
    await userEvent.click(within(dock).getByRole('button', { name: 'Finish check-in' }));
    await expect(await canvas.findByText('Checked in')).toBeVisible();
  },
};
