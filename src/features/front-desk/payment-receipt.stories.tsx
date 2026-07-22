import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { PaymentReceipt } from './payment-receipt';
import { FRONT_DESK_PAYMENT_DEMO_SCENARIOS } from './demo-data';
import { READINESS } from '../../components/foundations/readiness-data';

const meta = {
  title: 'Clinic/Front Desk/Payment Receipt',
  component: PaymentReceipt,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      contract: {
        status: 'design-target',
        backendMapping: 'partial',
        note:
          'Mirrors the cash capture contract: amount is the server-derived capture (state=paid, branch-attested). Print/SMS/Telegram delivery and a receipt read-model are not backend capabilities today — the artifact is the evidence shape the truth pack requires.',
      },
      intake: {
        decision: 'FEATURE-OWN',
        owner: 'src/features/front-desk',
        evidence:
          'Legacy PrintReceipt.js produced an A4 bill with barcode/QR; this rebuild keeps the evidence contract (immutability, supplemental/void chain, branch attestation) and composes canonical Card, Badge, Button, MoneyText.',
        exclusions: ['A4 print layout, Code128/QR rendering, numToWords, SMS/Email/Telegram delivery'],
      },
      journeys: ['FIN-01-cash-collection', 'CASE-FIN receipt evidence'],
    },
    docs: {
      description: {
        component:
          'Immutable payment evidence. A paid-edit issues a supplemental receipt referencing the original; a void keeps the original readable with a voided marker. The amount is the server-derived capture amount — never desk-entered.',
      },
    },
  },
  args: {
    ...FRONT_DESK_PAYMENT_DEMO_SCENARIOS['payment-paid'],
    onPrint: fn(),
  },
} satisfies Meta<typeof PaymentReceipt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paid: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Receipt R-58213')).toBeVisible();
    await expect(canvas.getByText('Paid')).toBeVisible();
    await expect(canvas.getByText('$21.00')).toBeVisible();
    await expect(canvas.getByText(/09:42 · Linh Nguyen · Branch BKK1/)).toBeVisible();
    await expect(canvas.getByText(/Receipts are immutable evidence/)).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Print receipt' }));
    await expect(args.onPrint).toHaveBeenCalled();
  },
};

/** A paid-edit adjustment: the new receipt references the original, never edits it. */
export const SupplementalChain: Story = {
  args: {
    ...FRONT_DESK_PAYMENT_DEMO_SCENARIOS['payment-supplemental'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Supplemental due')).toBeVisible();
    await expect(canvas.getByText(/Receipt R-58213 —/)).toBeVisible();
    await expect(canvas.getByText(/already\s+paid/)).toBeVisible();
  },
};

/** Voided evidence stays readable — history is never deleted. */
export const VoidedEvidence: Story = {
  args: FRONT_DESK_PAYMENT_DEMO_SCENARIOS['payment-voided'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Voided')).toBeVisible();
    // No print action on voided evidence; the artifact is read-only history.
    await expect(canvas.queryByRole('button', { name: 'Print receipt' })).not.toBeInTheDocument();
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'kura320' } },
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
};
