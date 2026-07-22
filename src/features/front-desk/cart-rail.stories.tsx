import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, within } from 'storybook/test';

import { CartRail } from './cart-rail';
import { blankWalkIn } from './demo-data';
import type { FxRateQuote } from './money';
import type { FrontDeskPatient } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const fxRate: FxRateQuote = {
  base: 'USD',
  quote: 'KHR',
  rateUnits: '4100',
  rateScale: 0,
};

function patientWithItems(): FrontDeskPatient {
  const base = blankWalkIn('rail-ready', 12);
  return {
    ...base,
    cart: {
      ...base.cart,
      items: [
        {
          id: 'CBC',
          kind: 'lab',
          name: 'Complete blood count',
          priceMinor: '600',
          currencyCode: 'USD',
          qty: 1,
        },
        {
          id: 'LIPID',
          kind: 'lab',
          name: 'Lipid panel',
          priceMinor: '1200',
          currencyCode: 'USD',
          qty: 1,
          fasting: true,
        },
      ],
    },
  };
}

const meta = {
  title: 'Clinic/Front Desk/Cart Rail',
  component: CartRail,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Backend-priced order summary for the Check-In Wizard. The Payment step owns tender selection, payment capture, and check-in confirmation.',
      },
    },
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'DOMAIN-ADAPT + COMPOSE',
        owner: 'src/features/order-cart',
        adapter: 'src/features/front-desk/cart-rail.tsx',
        level: 'clinical-composite adapter',
        composedFrom: ['OrderCart'],
        backend:
          'Priced lines use int64 minor-unit strings. The rail owns no order-placement, payment-capture, promo, insurance-settlement, or check-in transition.',
      },
      responsive: {
        strategy: ['FLUID', 'WRAPPING', 'STACKING'],
        minimumWidth: 320,
      },
      journeys: ['front-desk-order-review', 'front-desk-payment'],
    },
  },
  args: {
    patient: patientWithItems(),
    fxRate,
    onRemoveItem: fn(),
    onRetryPricing: fn(),
  },
} satisfies Meta<typeof CartRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Building: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('complementary', { name: 'Receptionist order summary' }),
    ).toBeVisible();
    await expect(canvas.getByLabelText('2 tests selected')).toBeVisible();
    // Compact rule: the subtotal row only appears when it differs from the
    // amount due, so the hero figure is the single $18.00 on screen.
    await expect(canvas.getAllByText('$18.00')).toHaveLength(1);
    await expect(canvas.queryByText('Order total')).not.toBeInTheDocument();
    await expect(canvas.getByText('៛73,800')).toBeVisible();
    await expect(canvas.queryByText('Promo code')).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: /check in/i }),
    ).not.toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: { patient: blankWalkIn('rail-empty', 13) },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Nothing here yet')).toBeVisible();
  },
};

export const PricingLoading: Story = {
  args: { pricingStatus: 'loading' },
};

export const PricingError: Story = {
  args: { pricingStatus: 'error' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Retry pricing' }),
    ).toBeVisible();
  },
};

export const Paid: Story = {
  args: {
    patient: {
      ...patientWithItems(),
      cart: {
        ...patientWithItems().cart,
        payment: {
          ...patientWithItems().cart.payment,
          status: 'confirmed',
          method: 'cash',
          amountMinor: '1800',
          changeMinor: '200',
          receiptId: 'CAP-58213',
          confirmedAt: '2026-07-16T09:42:00Z',
        },
      },
    },
    readOnly: true,
  },
};

export const Supplemental: Story = {
  args: {
    patient: {
      ...patientWithItems(),
      cart: {
        ...patientWithItems().cart,
        payment: {
          ...patientWithItems().cart.payment,
          supplementalDue: true,
          previousReceiptId: 'CAP-58213',
          previousPaidAmountMinor: '600',
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('complementary', { name: 'Receptionist order summary' }),
    ).toBeVisible();
    await expect(canvas.getAllByText('Added after payment')).toHaveLength(2);
    await expect(canvas.getByText(/Previously paid \(CAP-58213\)/)).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Set up payment' })).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Confirm payment & check in' }),
    ).not.toBeInTheDocument();
  },
};

export const PlacedReadOnly: Story = {
  args: { status: 'placed', readOnly: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', { name: /Remove/ })).not.toBeInTheDocument();
  },
};

export const Cancelled: Story = {
  args: { status: 'cancelled', readOnly: true },
};

export const LongContent: Story = {
  args: {
    patient: {
      ...patientWithItems(),
      cart: {
        ...patientWithItems().cart,
        items: [
          {
            id: 'CMP-LIPID-THYROID-REFLEX',
            kind: 'lab',
            name: 'Comprehensive metabolic panel with lipid profile and thyroid cascade reflex',
            priceMinor: '4250',
            currencyCode: 'USD',
            qty: 1,
            fasting: true,
          },
        ],
      },
    },
  },
};

export const MobileNarrow320: Story = {
  args: { patient: patientWithItems() },
  globals: { viewport: { value: 'kura320' } },
};

export const Mobile360: Story = {
  globals: { viewport: { value: 'kura360' } },
};

export const MobileInteractive390: Story = {
  args: { patient: patientWithItems() },
  globals: { viewport: { value: 'kura390' } },
};

export const Mobile412: Story = {
  globals: { viewport: { value: 'kura412' } },
};

export const Mobile480: Story = {
  globals: { viewport: { value: 'kura480' } },
};

export const Tablet768: Story = {
  globals: { viewport: { value: 'kura768' } },
};

export const Desktop1024: Story = {
  globals: { viewport: { value: 'kura1024' } },
};
