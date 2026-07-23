import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { confirmedKhqr, failedPullFixture, pendingKhqr } from './demo-data';
import { DoctorBalanceWorkspace } from './balance-workspace';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';
import type { BalanceRoute } from './balance-workspace';
import type { KhqrIntent } from './types';

function RedBalanceSettlementFlow() {
  const [route, setRoute] = useState<BalanceRoute>('overview');
  const [intent, setIntent] = useState<KhqrIntent | null>(null);

  return (
    <DoctorBankingStoryFrame onNavigate={(key) => key === 'balance' && setRoute('overview')}>
      <DoctorBalanceWorkspace
        data={failedPullFixture}
        intent={intent}
        onCreateKhqr={() => setIntent(pendingKhqr)}
        onNavigate={setRoute}
        onRefresh={() => setIntent(confirmedKhqr)}
        onRegenerate={() => setIntent(pendingKhqr)}
        route={route}
      />
    </DoctorBankingStoryFrame>
  );
}

const meta = {
  title: 'Clinic/Flows/Doctor Banking/Settlement',
  component: RedBalanceSettlementFlow,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      ...DOCTOR_BANKING_STORYBOOK_KURA,
      readiness: READINESS.flows,
      flow: {
        pages: [
          'Clinic/Finance/Balance/Overview',
          'Clinic/Finance/Balance/Settle Now',
        ],
        terminal: 'The exact KHQR amount is provider-confirmed and applied to the ledger',
      },
      journeys: ['doctor-red-balance-to-provider-confirmed-khqr'],
    },
    docs: {
      description: {
        component:
          'Executable settlement journey. It starts from a failed collection on the Balance overview, creates an immutable exact-amount payment code, waits for the provider, and ends only on the confirmed receipt with the balance after payment.',
      },
    },
  },
} satisfies Meta<typeof RedBalanceSettlementFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FailedCollectionToConfirmedPayment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { name: 'Balance' })).toBeVisible();
    await expect(canvas.getByText('Collection failed')).toBeVisible();
    await userEvent.click(canvas.getAllByRole('button', { name: 'Settle now' })[0]);

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: 'Settle now' })).toBeVisible();
    });
    await userEvent.click(canvas.getByRole('button', { name: 'Create payment code' }));
    await expect(canvas.getByText('Waiting for your bank')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Check for payment' }));

    await waitFor(async () => {
      await expect(canvas.getByText('Payment confirmed')).toBeVisible();
    });
    await expect(canvas.getByText('$48.60')).toBeVisible();
    await expect(canvas.getByText('RCPT-40126')).toBeVisible();
  },
};

export const Mobile320: Story = {
  globals: { viewport: { value: 'kura320' } },
};
