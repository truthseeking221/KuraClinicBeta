import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { cartWith, doctorWorkflow, FIGMA_TESTS, returningPatientCart } from './demo-data';
import { FloatingOrderCart } from './floating-order-cart';
import { ORDER_CART_STORYBOOK_KURA } from './storybook-metadata';
import type {
  DoctorOrderCartWorkflow,
  OrderCartData,
  OrderCartItem,
  OrderCartPatient,
} from './types';
import styles from './floating-order-cart.stories.module.css';

const SOKHA_CHANN: OrderCartPatient = {
  id: 'p-sokha-chann',
  name: 'Sokha Chann',
  identifier: 'MRN ··29',
  demographicLabel: 'Female · 36',
};

const RETURNING_PATIENT_CART = returningPatientCart(SOKHA_CHANN);

function FloatingCartPlayground({
  args,
}: {
  args: ComponentProps<typeof FloatingOrderCart>;
}) {
  const [cart, setCart] = useState(args.cart);
  const [workflow, setWorkflow] = useState(args.workflow);

  const patchWorkflow = (patch: Partial<DoctorOrderCartWorkflow>) => {
    setWorkflow((current) =>
      current.role === 'doctor' ? { ...current, ...patch } : current,
    );
  };
  const repricedCart = (items: OrderCartItem[]): typeof cart =>
    cartWith(items, { id: cart.id, patient: cart.patient }) as typeof cart;

  return (
    <div className={styles.canvas}>
      <FloatingOrderCart
        {...args}
        cart={cart}
        onAttestChange={(attested) => patchWorkflow({ attested })}
        onClear={() => setCart(repricedCart([]))}
        onDecisionsChange={(decisions) => patchWorkflow({ decisions })}
        onPanelChange={(panel) => patchWorkflow({ panel })}
        onRemoveItem={(itemId) =>
          setCart(repricedCart(cart.items.filter((item) => item.id !== itemId)))
        }
        workflow={workflow}
      />
    </div>
  );
}

const meta = {
  title: 'Design System/Clinical Components/Order Cart/Floating',
  component: FloatingOrderCart,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      ...ORDER_CART_STORYBOOK_KURA,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/order-cart/floating-order-cart.tsx',
        evidence:
          'The canonical OrderCart already owns clinical cart truth and actions. FloatingOrderCart composes that owner with the canonical anchored Popover and a patient-scoped trigger; it creates no second cart model.',
        exclusions: [
          'The wrapper does not price, place, sign, persist, or move an order between patients.',
          'A patient reference is required and repeated inside the overlay to prevent wrong-patient ambiguity.',
        ],
      },
      interaction: {
        risk: 'R3 consequential draft-order access',
        trigger: 'Explicit click, Enter, or Space only',
        dismissal: 'Escape, outside press, or trigger toggle; focus returns to the trigger',
        focus: 'The trigger retains focus on open; cart controls follow in document order',
        responsive: 'Anchored and collision-aware; width and height remain viewport-contained at 320px',
      },
    },
    docs: {
      description: {
        component:
          'Patient-scoped access to an existing draft cart. The trigger shows the test count; the anchored overlay repeats patient identity and renders the canonical OrderCart unchanged.',
      },
    },
  },
  args: {
    cart: RETURNING_PATIENT_CART,
    workflow: doctorWorkflow(),
  },
  render: (args) => <FloatingCartPlayground args={args} />,
} satisfies Meta<typeof FloatingOrderCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReturningPatientDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', {
      name: 'Order cart for Sokha Chann, 3 tests',
    });

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const dialog = await screen.findByRole('dialog', {
      name: 'Order cart for Sokha Chann',
    });
    await expect(dialog).toBeVisible();
    const cart = within(dialog);
    await expect(cart.getByText(/MRN ··29/)).toBeVisible();
    await expect(cart.getByRole('heading', { name: 'Selected tests' })).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const EmptyDraft: Story = {
  args: {
    cart: cartWith([], { patient: SOKHA_CHANN }) as OrderCartData & {
      patient: OrderCartPatient;
    },
    defaultOpen: true,
  },
};

export const PricingLoading: Story = {
  args: {
    cart: {
      ...RETURNING_PATIENT_CART,
      pricing: { state: 'loading', summary: RETURNING_PATIENT_CART.pricing.state === 'ready' ? RETURNING_PATIENT_CART.pricing.summary : undefined },
    },
    defaultOpen: true,
  },
};

export const PricingError: Story = {
  args: {
    cart: { ...RETURNING_PATIENT_CART, pricing: { state: 'error', message: 'Pricing is unavailable.' } },
    defaultOpen: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultOpen: true,
    workflow: doctorWorkflow({ access: 'read-only', authority: 'read-only' }),
  },
};

export const LongPatientIdentity: Story = {
  args: {
    cart: returningPatientCart({
      id: 'p-long-name',
      name: 'Sopheap Chanthanakvichea',
      identifier: 'MRN ··827394',
      demographicLabel: 'Female · 67',
    }),
    defaultOpen: true,
  },
};

export const Mobile320: Story = {
  args: { defaultOpen: true },
  globals: { viewport: { value: 'kura320' } },
};

export const ManyTests: Story = {
  args: {
    cart: cartWith(FIGMA_TESTS, { patient: SOKHA_CHANN }) as OrderCartData & {
      patient: OrderCartPatient;
    },
    defaultOpen: true,
  },
};
