import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  DEMO_TUBES,
  FULL_CART,
  doctorWorkflow,
  receptionistWorkflow,
} from './demo-data';
import { getOrderCartPrimaryAction } from './logic';
import { OrderCart } from './order-cart';
import styles from './order-cart.stories.module.css';
import { ORDER_CART_STORYBOOK_KURA } from './storybook-metadata';
import type {
  DoctorOrderCartWorkflow,
  ReceptionistOrderCartWorkflow,
} from './types';
import { READINESS } from '../../components/foundations/readiness-data';

/**
 * Stateful harnesses: the cart stays presentational; these mimic the owning
 * workflow — advancing stage, locking payment, and recording tender — exactly
 * the way the clinic app must.
 */

function DoctorFlowHarness({ intro }: { intro: string }) {
  const [workflow, setWorkflow] = useState<DoctorOrderCartWorkflow>(doctorWorkflow());

  const advance = () => {
    const action = getOrderCartPrimaryAction(FULL_CART, workflow);
    if (!action || action.disabled) return;
    setWorkflow((current) => {
      if (current.stage === 'tubes') return { ...current, stage: 'confirmed' };
      if (current.decisions.collectBy === 'self') {
        return { ...current, stage: 'tubes', tubes: current.tubes ?? DEMO_TUBES };
      }
      return { ...current, stage: 'code-sent', panel: 'summary', paymentLocked: true };
    });
  };

  return (
    <div className={styles.flowCanvas}>
      <section className={styles.flowIntro}>
        <h2>Doctor order flow</h2>
        <p>{intro}</p>
        <div className={styles.flowFact}>
          <strong>Stage</strong>
          <span>{workflow.stage}</span>
        </div>
      </section>
      <OrderCart
        cart={FULL_CART}
        onAttestChange={(attested) => setWorkflow((current) => ({ ...current, attested }))}
        onBackToCart={() => setWorkflow((current) => ({ ...current, stage: 'draft' }))}
        onDecisionsChange={(decisions) =>
          setWorkflow((current) => ({ ...current, decisions }))
        }
        onPanelChange={(panel) => setWorkflow((current) => ({ ...current, panel }))}
        onPrimaryAction={advance}
        onTubeMethodChange={(tubeMethod) =>
          setWorkflow((current) => ({ ...current, tubeMethod }))
        }
        onTubeScan={(tubeId, scanned) =>
          setWorkflow((current) => ({
            ...current,
            tubes: (current.tubes ?? []).map((tube) =>
              tube.id === tubeId ? { ...tube, scanned } : tube,
            ),
          }))
        }
        workflow={workflow}
      />
    </div>
  );
}

function ReceptionFlowHarness() {
  const [workflow, setWorkflow] = useState<ReceptionistOrderCartWorkflow>(
    receptionistWorkflow(),
  );

  const advance = () => {
    const action = getOrderCartPrimaryAction(FULL_CART, workflow);
    if (!action || action.disabled) return;
    setWorkflow((current) => ({
      ...current,
      stage: 'checked-in',
      panel: 'summary',
      payment:
        current.method === 'pay-later'
          ? { status: 'deferred', label: 'Pays later at Kura' }
          : {
              status: 'paid',
              label: current.method === 'khqr' ? 'KHQR confirmed' : 'Cash collected',
              receiptId: 'R-58213',
            },
    }));
  };

  return (
    <div className={styles.flowCanvas}>
      <section className={styles.flowIntro}>
        <h2>Reception desk flow</h2>
        <p>
          Choose the tender, attest the collection, then one action confirms payment
          and checks the patient in. After capture the tender is locked; changes route
          through void or supplemental.
        </p>
        <div className={styles.flowFact}>
          <strong>Payment</strong>
          <span>{workflow.payment.label}</span>
        </div>
      </section>
      <OrderCart
        cart={FULL_CART}
        onAttestChange={(attested) => setWorkflow((current) => ({ ...current, attested }))}
        onMethodChange={(method) => setWorkflow((current) => ({ ...current, method }))}
        onPanelChange={(panel) => setWorkflow((current) => ({ ...current, panel }))}
        onPrimaryAction={advance}
        workflow={workflow}
      />
    </div>
  );
}

const meta = {
  title: 'Clinic/Flows/Test Ordering',
  component: DoctorFlowHarness,
  tags: ['autodocs', 'source-figma', 'adapted-kura'],
  args: { intro: '' },
  parameters: {
    layout: 'fullscreen',
    kura: {
      ...ORDER_CART_STORYBOOK_KURA,
      readiness: READINESS.flows,
      journeys: ['doctor-order-to-collection', 'reception-payment-to-check-in'],
    },
    docs: {
      description: {
        component:
          'End-to-end walks of the unified cart: the doctor decides collection & payment then hands off (booking code or tube preparation), and reception resolves tender through check-in. Each flow drives the real OrderCart with a stateful workflow owner.',
      },
    },
  },
} satisfies Meta<typeof DoctorFlowHarness>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoctorHomeCollection: Story = {
  name: 'Doctor · Kura collects at home → code sent',
  render: () => (
    <DoctorFlowHarness intro="Decide who collects, where Kura draws, and how the patient pays. Pay-later needs no attestation; sending the code locks the decisions." />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Set up collection and payment' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Kura will draw the blood' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Patient Home' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Patient will pay later at Kura' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Done' }));

    await expect(canvas.getByText('Kura collection · Patient Home')).toBeVisible();
    const cta = canvas.getByRole('button', { name: 'Send booking code' });
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);

    await waitFor(async () => {
      await expect(canvas.getByText('Code sent')).toBeVisible();
    });
    await expect(canvas.getByRole('button', { name: 'Track home collection' })).toBeEnabled();
    await expect(canvas.getByRole('button', { name: 'View collection and payment' })).toBeVisible();
  },
};

export const DoctorSelfDraw: Story = {
  name: 'Doctor · clinic draw → scan tubes → confirmed',
  render: () => (
    <DoctorFlowHarness intro="Self-draw with pay-now: attest the collected amount, prepare tubes, scan each one, then confirm the collection." />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Set up collection and payment' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'I will draw the blood now' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Patient will pay you now' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Done' }));

    const cta = canvas.getByRole('button', { name: 'Prepare Tubes' });
    await expect(cta).toBeDisabled();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);

    await waitFor(async () => {
      await expect(canvas.getByText('0/2 scanned')).toBeVisible();
    });
    const scanFirst = canvas.getAllByRole('button', { name: 'Mark scanned' });
    await userEvent.click(scanFirst[0]);
    await userEvent.click(canvas.getByRole('button', { name: 'Mark scanned' }));
    await expect(canvas.getByText('2/2 scanned')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Confirm collection & scan' }));
    await waitFor(async () => {
      await expect(canvas.getByRole('button', { name: 'Collection confirmed' })).toBeDisabled();
    });
  },
};

export const ReceptionPaymentToCheckIn: Story = {
  name: 'Reception · cash → attest → checked in',
  render: () => <ReceptionFlowHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('button', { name: 'Confirm payment & check in' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Set up payment' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Cash at the desk' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Done' }));

    const cta = canvas.getByRole('button', { name: 'Confirm payment & check in' });
    await expect(cta).toBeDisabled();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);

    await waitFor(async () => {
      await expect(canvas.getByRole('button', { name: 'Patient checked in' })).toBeDisabled();
    });
    await expect(canvas.getByText('Cash collected · R-58213')).toBeVisible();
  },
};
