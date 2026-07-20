import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { confirmedKhqr, pendingKhqr, redDoctorFixture } from './demo-data';
import { DoctorEarningsWorkspace } from './earnings-workspace';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';
import type { EarningsRoute } from './earnings-workspace';
import type { KhqrIntent } from './types';

function RedBalanceSettlementFlow() {
  const [route, setRoute] = useState<EarningsRoute>('overview');
  const [intent, setIntent] = useState<KhqrIntent | null>(null);

  return (
    <DoctorBankingStoryFrame onNavigate={(key) => key === 'earnings' && setRoute('overview')}>
      <DoctorEarningsWorkspace
        data={redDoctorFixture}
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
  title: 'Clinic/Flows/Earnings Settlement',
  component: RedBalanceSettlementFlow,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      ...DOCTOR_BANKING_STORYBOOK_KURA,
      readiness: READINESS.flows,
      flow: {
        pages: [
          'Clinic/Finance/Earnings/Overview',
          'Clinic/Finance/Earnings/Settle',
        ],
        terminal: 'The exact KHQR amount is provider-confirmed and applied to the ledger',
      },
      journeys: ['doctor-red-balance-to-provider-confirmed-khqr'],
    },
    docs: {
      description: {
        component:
          'Executable doctor-owned settlement journey. It routes from the signed person-global balance to an immutable exact-amount KHQR request, waits for provider confirmation, and ends only after the provider-confirmed success state appears.',
      },
    },
  },
} satisfies Meta<typeof RedBalanceSettlementFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RedBalanceToConfirmedKhqr: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { name: 'Earnings' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Settle now' }));

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: 'Settle balance' })).toBeVisible();
    });
    await userEvent.click(canvas.getByRole('button', { name: 'Create exact KHQR' }));
    await expect(canvas.getByText('Awaiting confirmation')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Check confirmation' }));

    await waitFor(async () => {
      await expect(canvas.getByText('Settlement confirmed')).toBeVisible();
    });
    await expect(canvas.getByText('$48.60')).toBeVisible();
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
