import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  DEMO_TUBES,
  DOCTOR_CLINIC_DRAW,
  DOCTOR_CODE_SENT,
  DOCTOR_COLLECTED,
  DOCTOR_NOT_CONFIGURED,
  DOCTOR_PAYMENT_CHOICE,
  DOCTOR_PAY_LATER,
  DOCTOR_TUBES,
  EMPTY_CART,
  FIGMA_TESTS,
  FULL_CART,
  MIXED_RATE_EARNINGS,
  RECEPTION_CASH_CHOSEN,
  RECEPTION_CHECKED_IN,
  RECEPTION_DUE,
  RECEPTION_NO_ELIGIBLE_PRESCRIBER,
  RECEPTION_PAID,
  REPRICED_EARNINGS,
  cartWith,
  doctorWorkflow,
  earningsForItems,
  receptionistWorkflow,
} from "./demo-data";
import { getOrderCartPrimaryAction } from "./logic";
import { OrderCart } from "./order-cart";
import orderCartStyles from "./order-cart.module.css";
import styles from "./order-cart.stories.module.css";
import { ORDER_CART_STORYBOOK_KURA } from "./storybook-metadata";
import type {
  DoctorOrderCartWorkflow,
  OrderCartData,
  OrderCartItem,
  OrderCartWorkflow,
  ReceptionistOrderCartWorkflow,
} from "./types";

/**
 * Stateful playground: every story stays interactive in the canvas (Set up /
 * Edit / attest / scan respond for real) while still notifying the arg spies
 * the plays assert against. Each story's args seed the initial state.
 */
function Playground({
  args,
  mobile = false,
}: {
  args: ComponentProps<typeof OrderCart>;
  mobile?: boolean;
}) {
  const [cart, setCart] = useState<OrderCartData>(args.cart);
  const [workflow, setWorkflow] = useState<OrderCartWorkflow>(args.workflow);

  const patch = (next: Partial<OrderCartWorkflow>) =>
    setWorkflow((current) => ({ ...current, ...next }) as OrderCartWorkflow);

  const syncDemoEarnings = (items: readonly OrderCartItem[]) =>
    setWorkflow((current) =>
      current.role === "doctor" && current.earnings
        ? { ...current, earnings: earningsForItems(items) }
        : current,
    );

  const repricedCart = (items: OrderCartItem[]): OrderCartData => {
    const base = { ...cart, items };
    if (cart.pricing.state !== "ready") return base;
    return {
      ...base,
      ...cartWith(items, { id: cart.id, patient: cart.patient }),
    };
  };

  const advance = () => {
    args.onPrimaryAction?.();
    const action = getOrderCartPrimaryAction(cart, workflow);
    if (!action || action.disabled) return;
    if (workflow.role === "doctor") {
      setWorkflow((current) => {
        const doctor = current as DoctorOrderCartWorkflow;
        if (doctor.stage === "tubes") return { ...doctor, stage: "confirmed" };
        if (doctor.stage === "code-sent" || doctor.stage === "collected")
          return doctor;
        if (doctor.decisions.collectBy === "self") {
          return {
            ...doctor,
            stage: "tubes",
            tubes: doctor.tubes ?? DEMO_TUBES,
          };
        }
        return {
          ...doctor,
          stage: "code-sent",
          panel: "summary",
          paymentLocked: true,
        };
      });
      return;
    }
    setWorkflow((current) => {
      const reception = current as ReceptionistOrderCartWorkflow;
      if (reception.stage === "checked-in") return reception;
      return {
        ...reception,
        stage: "checked-in",
        panel: "summary",
        payment:
          reception.method === "pay-later"
            ? { status: "deferred", label: "Pays later at Kura" }
            : {
                status: "paid",
                label:
                  reception.method === "khqr"
                    ? "KHQR confirmed"
                    : "Cash collected",
                receiptId: "R-58213",
              },
      };
    });
  };

  return (
    <div className={mobile ? styles.mobileCanvas : styles.canvas}>
      <OrderCart
        cart={cart}
        suggestions={args.suggestions}
        onSuggestionAccept={args.onSuggestionAccept}
        onSuggestionDismiss={args.onSuggestionDismiss}
        onAcceptReprice={() => {
          args.onAcceptReprice?.();
          setCart((current) => {
            if (current.pricing.state !== "stale") return current;
            const newPrices = new Map(
              current.pricing.repricedLines.map((line) => [
                line.itemId,
                line.newPriceMinor,
              ]),
            );
            return {
              ...current,
              items: current.items.map((item) => ({
                ...item,
                priceMinor: newPrices.get(item.id) ?? item.priceMinor,
              })),
              pricing: { state: "ready", summary: current.pricing.summary },
            };
          });
        }}
        onAddFirst={() => {
          args.onAddFirst?.();
          const items = [FIGMA_TESTS[0]];
          setCart(repricedCart(items));
          syncDemoEarnings(items);
        }}
        onAttestChange={(attested) => {
          args.onAttestChange?.(attested);
          patch({ attested });
        }}
        onBackToCart={() => {
          args.onBackToCart?.();
          patch({ stage: "draft" });
        }}
        onBlockerAction={args.onBlockerAction}
        onClear={() => {
          args.onClear?.();
          const items = cart.items.filter((item) => item.state === "locked");
          setCart(repricedCart(items));
          syncDemoEarnings(items);
        }}
        onDecisionsChange={(decisions) => {
          args.onDecisionsChange?.(decisions);
          patch({ decisions });
        }}
        onMethodChange={(method) => {
          args.onMethodChange?.(method);
          patch({ method });
        }}
        onPanelChange={(panel) => {
          args.onPanelChange?.(panel);
          patch({ panel });
        }}
        onPrimaryAction={advance}
        onRemoveItem={(itemId) => {
          args.onRemoveItem?.(itemId);
          const items = cart.items.filter((item) => item.id !== itemId);
          setCart(repricedCart(items));
          syncDemoEarnings(items);
        }}
        onRetryPricing={() => {
          args.onRetryPricing?.();
          setCart((current) =>
            current.pricing.state === "error"
              ? {
                  ...current,
                  ...cartWith(current.items, {
                    id: current.id,
                    patient: current.patient,
                  }),
                }
              : current,
          );
        }}
        onTubeMethodChange={(tubeMethod) => {
          args.onTubeMethodChange?.(tubeMethod);
          patch({ tubeMethod });
        }}
        onTubeScan={(tubeId, scanned) => {
          args.onTubeScan?.(tubeId, scanned);
          setWorkflow((current) => {
            if (current.role !== "doctor") return current;
            return {
              ...current,
              tubes: (current.tubes ?? []).map((tube) =>
                tube.id === tubeId ? { ...tube, scanned } : tube,
              ),
            };
          });
        }}
        workflow={workflow}
      />
    </div>
  );
}

const meta = {
  title: "Design System/Clinical Components/Order Cart",
  component: OrderCart,
  tags: ["autodocs", "source-figma", "source-kura-legacy", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: ORDER_CART_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          "The single Clinic order cart (Figma `OrderCart / HBC workflow`). Doctor and receptionist share one shell — selected tests, a collection-and-payment decision card, server-priced totals, attestation, and one primary action — while the typed workflow swaps the decisions, gates, and CTA vocabulary per role. Stories are live: Set up/Edit, attestation, tube scanning, and the primary action all respond in the canvas.",
      },
    },
  },
  args: {
    cart: FULL_CART,
    workflow: DOCTOR_NOT_CONFIGURED,
    onRemoveItem: fn(),
    onSuggestionAccept: fn(),
    onSuggestionDismiss: fn(),
    onClear: fn(),
    onAddFirst: fn(),
    onRetryPricing: fn(),
    onAcceptReprice: fn(),
    onBlockerAction: fn(),
    onPrimaryAction: fn(),
    onDecisionsChange: fn(),
    onPanelChange: fn(),
    onAttestChange: fn(),
    onMethodChange: fn(),
    onTubeScan: fn(),
    onTubeMethodChange: fn(),
    onBackToCart: fn(),
  },
  render: (args) => <Playground args={args} />,
} satisfies Meta<typeof OrderCart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Doctor: building & deciding ── */

export const DoctorEmpty: Story = {
  name: "Doctor · empty",
  args: { cart: EMPTY_CART },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Order Cart" }),
    ).toBeVisible();
    await expect(canvas.getByText("Nothing here yet")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Add first test" }),
    );
    await expect(meta.args.onAddFirst).toHaveBeenCalled();
    await expect(
      canvas.getByRole("heading", { name: "Selected tests" }),
    ).toBeVisible();
    await expect(canvas.getByText("Iron panel")).toBeVisible();
  },
};

export const DoctorNotConfigured: Story = {
  name: "Doctor · collection not set up",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Selected tests" }),
    ).toBeVisible();
    await expect(canvas.getByText("13")).toBeVisible();
    await expect(canvas.getByText("Not set yet")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Set up collection & payment first."),
    ).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Set up collection and payment" }),
    );
    await expect(meta.args.onPanelChange).toHaveBeenCalledWith("expanded");
    await expect(
      canvas.getByRole("radio", { name: "Kura will draw the blood" }),
    ).toBeVisible();
  },
};

export const DoctorNoIndication: Story = {
  name: "Doctor · no clinical reason recorded",
  args: { workflow: doctorWorkflow({ indication: undefined }) },
  parameters: {
    docs: {
      description: {
        story:
          "A lab test is an act on a patient, so the order has to say what it was for. Grounding is checked before the operational decisions: the cart asks for a diagnosis before it asks who draws the blood.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Record a working diagnosis in the assessment first."),
    ).toBeVisible();
    await expect(canvas.queryByText("Ordered for")).not.toBeInTheDocument();
  },
};

export const DoctorIndicationShown: Story = {
  name: "Doctor · order carries its stated reason",
  parameters: {
    docs: {
      description: {
        story:
          "The reason sits under the title because it applies to every line below it, and it is a copy: revising the assessment later cannot rewrite why this order was placed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Ordered for")).toBeVisible();
    await expect(
      canvas.getByText("D50.9 · Iron deficiency anaemia, unspecified"),
    ).toBeVisible();
  },
};

export const DoctorDecisionExpanded: Story = {
  name: "Doctor · decision card expanded",
  args: { workflow: DOCTOR_PAYMENT_CHOICE },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("radio", { name: "Kura will draw the blood" }),
    ).toBeChecked();
    await expect(canvas.getByText("Where is the blood drawn?")).toBeVisible();
    await expect(
      canvas.getByRole("radio", { name: "Patient will pay you now" }),
    ).toBeChecked();

    const editor = canvasElement.querySelector(
      `.${orderCartStyles.decisionEditor}`,
    );
    const collectionQuestion = canvas
      .getByRole("radiogroup", { name: "Who will collect the sample?" })
      .closest(`.${orderCartStyles.question}`);

    await expect(editor).not.toBeNull();
    await expect(collectionQuestion).not.toBeNull();
    await expect(getComputedStyle(editor as HTMLElement).rowGap).toBe("16px");
    await expect(
      getComputedStyle(collectionQuestion as HTMLElement).rowGap,
    ).toBe("8px");

    // Switching to self-draw removes the draw-site question.
    await userEvent.click(
      canvas.getByRole("radio", { name: "I will draw the blood now" }),
    );
    await expect(
      canvas.queryByText("Where is the blood drawn?"),
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Done" }));
    await expect(canvas.getByText("Clinic draw · you collect")).toBeVisible();
    await expect(canvas.getByText("Patient pays you now")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Edit collection and payment" }),
    ).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Edit collection and payment" }),
    );
    await expect(
      canvas.getByRole("radio", { name: "I will draw the blood now" }),
    ).toHaveFocus();
    await expect(
      canvas.getByRole("radio", { name: "I will draw the blood now" }),
    ).toBeChecked();
  },
};

export const DoctorEditDecisions: Story = {
  name: "Doctor · edit a completed decision",
  args: { workflow: DOCTOR_PAY_LATER },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Kura collection · Patient Home"),
    ).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Edit collection and payment" }),
    );
    await expect(meta.args.onPanelChange).toHaveBeenCalledWith("expanded");
    await expect(
      canvas.getByRole("radio", { name: "Kura will draw the blood" }),
    ).toHaveFocus();
    const payNow = canvas.getByRole("radio", {
      name: "Patient will pay you now",
    });
    await expect(payNow).toBeEnabled();
    await userEvent.click(payNow);
    await userEvent.click(canvas.getByRole("button", { name: "Done" }));

    await expect(canvas.getByText("Patient pays you now")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Edit collection and payment" }),
    ).toHaveFocus();
    // Pay-now re-arms the attestation gate.
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(canvas.getByRole("checkbox")).toBeVisible();
  },
};

export const DoctorPayLaterReady: Story = {
  name: "Doctor · Kura collects, pay later — ready to send",
  args: { workflow: DOCTOR_PAY_LATER },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Kura collection · Patient Home"),
    ).toBeVisible();
    await expect(canvas.getByText("Patient pays later at Kura")).toBeVisible();
    await expect(canvas.getByText(/earn/)).toBeVisible();
    await expect(canvas.getByText("$24.90")).toBeVisible();

    const earningsTrigger = canvas.getByRole("button", {
      name: "How earnings are calculated",
    });
    await userEvent.hover(earningsTrigger);
    const tooltip = await within(document.body).findByRole("tooltip", {
      name: "Estimated earnings",
    });
    await expect(tooltip).toBeVisible();
    await expect(within(tooltip).getByText("Earnings basis")).toBeVisible();
    await expect(within(tooltip).getByText("15%")).toBeVisible();
    await expect(
      within(tooltip).getByText(
        "Added to your Kura balance when the tests are completed.",
      ),
    ).toBeVisible();
    await userEvent.unhover(earningsTrigger);
    earningsTrigger.focus();
    await expect(
      await within(document.body).findByRole("tooltip", {
        name: "Estimated earnings",
      }),
    ).toBeVisible();
    earningsTrigger.blur();

    const cta = canvas.getByRole("button", { name: "Send booking code" });
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await expect(meta.args.onPrimaryAction).toHaveBeenCalled();
    await expect(canvas.getByText("Code sent")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Track home collection" }),
    ).toBeEnabled();
  },
};

export const DoctorMixedCommissionRates: Story = {
  name: "Doctor · mixed commission rates",
  args: {
    cart: cartWith(FIGMA_TESTS.slice(0, 3)),
    workflow: doctorWorkflow({
      ...DOCTOR_PAY_LATER,
      earnings: MIXED_RATE_EARNINGS,
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: "How earnings are calculated",
    });
    await userEvent.hover(trigger);
    const tooltip = await within(document.body).findByRole("tooltip", {
      name: "Estimated earnings",
    });
    await expect(within(tooltip).getByText("Varies by test")).toBeVisible();
    await expect(within(tooltip).getByText("$7.70")).toBeVisible();
  },
};

export const DoctorPayNowNeedsAttestation: Story = {
  name: "Doctor · pay now — attestation gate",
  args: {
    workflow: doctorWorkflow({
      panel: "summary",
      decisions: {
        collectBy: "kura",
        drawSite: "kura-psc",
        payment: "pay-now",
      },
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Confirm you collected the payment first."),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("checkbox"));
    await expect(meta.args.onAttestChange).toHaveBeenCalledWith(true);
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeEnabled();
  },
};

/* ── Doctor: after handoff ── */

export const DoctorCodeSent: Story = {
  name: "Doctor · code sent — locked",
  args: { workflow: DOCTOR_CODE_SENT },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Code sent")).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: /^Remove / }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Track home collection" }),
    ).toBeEnabled();

    // View opens the decision card read-only: options render but stay locked.
    await userEvent.click(
      canvas.getByRole("button", { name: "View collection and payment" }),
    );
    await expect(
      canvas.getByRole("radio", { name: "Kura will draw the blood" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Locked after payment. You can edit later in Booking."),
    ).toBeVisible();
  },
};

export const DoctorPaymentCollected: Story = {
  name: "Doctor · payment collected",
  args: { workflow: DOCTOR_COLLECTED },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Cash collected")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Track home collection" }),
    ).toBeEnabled();
  },
};

/* ── Doctor: self-draw & tubes ── */

export const DoctorClinicDraw: Story = {
  name: "Doctor · clinic draw — prepare tubes",
  args: { workflow: DOCTOR_CLINIC_DRAW },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Clinic draw · you collect")).toBeVisible();
    await expect(canvas.getByText("Patient pays you now")).toBeVisible();
    const cta = canvas.getByRole("button", { name: "Prepare Tubes" });
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await expect(
      canvas.getByText("You need to prepare tubes for"),
    ).toBeVisible();
  },
};

export const DoctorTubePreparation: Story = {
  name: "Doctor · tube preparation",
  args: { workflow: DOCTOR_TUBES },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("You need to prepare tubes for"),
    ).toBeVisible();
    await expect(canvas.getByText("0/2 scanned")).toBeVisible();
    await expect(canvas.getByText("Serum tube · 5 mL")).toBeVisible();
    await expect(canvas.getByText("Urine cup · 10 mL")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Confirm collection & scan" }),
    ).toBeDisabled();

    const scanButtons = canvas.getAllByRole("button", { name: "Mark scanned" });
    await userEvent.click(scanButtons[0]);
    await expect(meta.args.onTubeScan).toHaveBeenCalledWith("serum-5", true);
    await expect(canvas.getByText("1/2 scanned")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Back to cart" }));
    await expect(meta.args.onBackToCart).toHaveBeenCalled();
    await expect(
      canvas.getByRole("heading", { name: "Selected tests" }),
    ).toBeVisible();
  },
};

export const DoctorTubesReady: Story = {
  name: "Doctor · tubes ready — 2/2 scanned",
  args: {
    workflow: doctorWorkflow({
      ...DOCTOR_TUBES,
      tubes: DEMO_TUBES.map((tube) => ({ ...tube, scanned: true })),
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("2/2 scanned")).toBeVisible();
    await expect(canvas.getAllByRole("button", { name: "Undo" })).toHaveLength(
      2,
    );
    await expect(
      canvas.getByRole("button", { name: "Confirm collection & scan" }),
    ).toBeEnabled();
  },
};

export const DoctorCollectionConfirmed: Story = {
  name: "Doctor · collection confirmed",
  args: {
    workflow: doctorWorkflow({
      stage: "confirmed",
      panel: "summary",
      decisions: { collectBy: "self", payment: "pay-now" },
      attested: true,
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Collection confirmed" }),
    ).toBeDisabled();
  },
};

/* ── Doctor: authority & access ── */

export const DoctorExplorerBlocked: Story = {
  name: "Doctor · unverified licence",
  args: {
    workflow: doctorWorkflow({
      authority: "explorer",
      panel: "summary",
      decisions: {
        collectBy: "kura",
        drawSite: "kura-psc",
        payment: "pay-later-kura",
      },
      earnings: undefined,
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Verify the clinician licence to place this order."),
    ).toBeVisible();
  },
};

export const DoctorReadOnlyAccess: Story = {
  name: "Doctor · read-only access",
  args: { workflow: doctorWorkflow({ access: "read-only" }) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("This order is read only for your current access."),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: /^Remove / }),
    ).not.toBeInTheDocument();
  },
};

/* ── Receptionist ── */

export const ReceptionPaymentDue: Story = {
  name: "Reception · payment due",
  args: { workflow: RECEPTION_DUE },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("complementary", { name: "Receptionist order cart" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Confirm payment & check in" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Choose a payment method first."),
    ).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Set up payment" }),
    );
    await expect(meta.args.onPanelChange).toHaveBeenCalledWith("expanded");
    await expect(
      canvas.getByRole("radio", { name: "Cash at the desk" }),
    ).toBeVisible();
  },
};

export const ReceptionMethodChoice: Story = {
  name: "Reception · tender method expanded",
  args: { workflow: RECEPTION_CASH_CHOSEN },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("radio", { name: "Cash at the desk" }),
    ).toBeChecked();
    await userEvent.click(canvas.getByRole("radio", { name: "KHQR transfer" }));
    await expect(meta.args.onMethodChange).toHaveBeenCalledWith("khqr");
    await expect(
      canvas.getByRole("radio", { name: "KHQR transfer" }),
    ).toBeChecked();
    await userEvent.click(
      canvas.getByRole("radio", { name: "Pay later at Kura" }),
    );
    await expect(
      canvas.getByRole("radio", { name: "Pay later at Kura" }),
    ).toBeChecked();

    await userEvent.click(canvas.getByRole("button", { name: "Done" }));
    await expect(canvas.getByText("Payment · Pay later at Kura")).toBeVisible();
  },
};

export const ReceptionAttestationGate: Story = {
  name: "Reception · cash — attestation gate",
  args: {
    workflow: receptionistWorkflow({ method: "cash", panel: "summary" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Payment · Cash")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Confirm payment & check in" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText("Confirm the payment was collected first."),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("checkbox"));
    await expect(meta.args.onAttestChange).toHaveBeenCalledWith(true);
    await expect(
      canvas.getByRole("button", { name: "Confirm payment & check in" }),
    ).toBeEnabled();
  },
};

export const ReceptionPayLater: Story = {
  name: "Reception · pay later at Kura",
  args: {
    workflow: receptionistWorkflow({ method: "pay-later", panel: "summary" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Payment · Pay later at Kura")).toBeVisible();
    await expect(canvas.queryByRole("checkbox")).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Check in & confirm order" }),
    ).toBeEnabled();
  },
};

export const ReceptionPaidLocked: Story = {
  name: "Reception · paid — tender locked",
  args: { workflow: RECEPTION_PAID },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Cash collected · R-58213")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Check in & confirm order" }),
    ).toBeEnabled();

    // View shows the tender read-only after capture.
    await userEvent.click(canvas.getByRole("button", { name: "View payment" }));
    await expect(
      canvas.getByRole("radio", { name: "Cash at the desk" }),
    ).toBeDisabled();
    await expect(
      canvas.getByText(
        "Locked after payment. Changes route through void or supplemental.",
      ),
    ).toBeVisible();
  },
};

export const ReceptionCheckedIn: Story = {
  name: "Reception · patient checked in",
  args: { workflow: RECEPTION_CHECKED_IN },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Patient checked in" }),
    ).toBeDisabled();
    await expect(
      canvas.queryByRole("button", { name: /^Remove / }),
    ).not.toBeInTheDocument();
  },
};

export const ReceptionBlockedPrescriber: Story = {
  name: "Reception · no eligible prescriber",
  args: { workflow: RECEPTION_NO_ELIGIBLE_PRESCRIBER },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("No eligible prescriber for this order"),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Choose prescriber" }),
    );
    await expect(meta.args.onBlockerAction).toHaveBeenCalledWith(
      "no-eligible-prescriber",
    );
  },
};

export const ReceptionSupplementalAfterPaidEdit: Story = {
  name: "Reception · supplemental line after paid edit",
  args: {
    cart: cartWith(
      [
        ...FIGMA_TESTS.slice(0, 3).map((item) => ({
          ...item,
          state: "locked" as const,
        })),
        { ...FIGMA_TESTS[3], state: "supplemental" as const },
      ],
      {
        pricing: {
          state: "ready",
          summary: {
            subtotalMinor: "6400",
            patientDueMinor: "1000",
            previousPaidMinor: "5400",
            previousReceiptId: "R-58213",
            currencyCode: "USD",
          },
        },
      },
    ),
    workflow: receptionistWorkflow({ method: "cash", panel: "summary" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Added after payment")).toBeVisible();
    await expect(canvas.getByText(/Previously paid/)).toBeVisible();
    await expect(canvas.getAllByText("Required").length).toBeGreaterThan(0);
  },
};

/* ── Shared pricing truth ── */

export const PricingLoading: Story = {
  name: "Pricing · updating",
  args: {
    cart: cartWith(FIGMA_TESTS, { pricing: { state: "loading" } }),
    workflow: DOCTOR_PAY_LATER,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Updating prices…")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await expect(canvas.getByText("Prices are still updating.")).toBeVisible();

    const edit = canvas.getByRole("button", {
      name: "Edit collection and payment",
    });
    await expect(edit).toBeEnabled();
    await expect(edit).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(edit);
    await expect(
      canvas.getByRole("radio", { name: "Kura will draw the blood" }),
    ).toHaveFocus();
    const done = canvas.getByRole("button", { name: "Done" });
    await expect(done).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(done);
    await expect(
      canvas.getByRole("button", { name: "Edit collection and payment" }),
    ).toHaveFocus();
  },
};

export const PricingError: Story = {
  name: "Pricing · unavailable",
  args: {
    cart: cartWith(FIGMA_TESTS, { pricing: { state: "error" } }),
    workflow: RECEPTION_DUE,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Price unavailable")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Retry pricing" }),
    );
    await expect(meta.args.onRetryPricing).toHaveBeenCalled();
    await expect(
      canvas.queryByText("Price unavailable"),
    ).not.toBeInTheDocument();
  },
};

export const PricingStale: Story = {
  name: "Pricing · server reprice",
  args: {
    cart: cartWith(FIGMA_TESTS, {
      pricing: {
        state: "stale",
        summary: {
          subtotalMinor: "16800",
          patientDueMinor: "16800",
          currencyCode: "USD",
        },
        repricedLines: [
          {
            itemId: "ferritin",
            name: "Ferritin",
            oldPriceMinor: "1400",
            newPriceMinor: "1600",
          },
        ],
      },
    }),
    workflow: doctorWorkflow({
      ...DOCTOR_PAY_LATER,
      earnings: REPRICED_EARNINGS,
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Prices changed")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeDisabled();
    await userEvent.click(
      canvas.getByRole("button", { name: "Accept new price" }),
    );
    await expect(meta.args.onAcceptReprice).toHaveBeenCalled();
    await expect(canvas.queryByText("Prices changed")).not.toBeInTheDocument();
    // Ferritin now joins Creatinine clearance at the accepted $16.00 price.
    await expect(canvas.getAllByText("$16.00")).toHaveLength(2);
    await expect(canvas.getByText("$25.20")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Send booking code" }),
    ).toBeEnabled();
  },
};

export const KhrTenderLine: Story = {
  name: "Pricing · KHR tender line",
  args: {
    cart: cartWith(FIGMA_TESTS, {
      pricing: {
        state: "ready",
        summary: {
          subtotalMinor: "16600",
          patientDueMinor: "16600",
          patientDueKhrMinor: "68060000",
          currencyCode: "USD",
        },
      },
    }),
    workflow: receptionistWorkflow({ method: "cash", panel: "summary" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Patient due · KHR")).toBeVisible();
  },
};

/* ── Responsive & theme ── */

export const Mobile: Story = {
  args: { workflow: DOCTOR_PAY_LATER },
  globals: { viewport: { value: "kura390" } },
  render: (args) => <Playground args={args} mobile />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: "How earnings are calculated",
    });
    await expect(trigger).toHaveAccessibleName("How earnings are calculated");
    await userEvent.click(trigger);
    await expect(
      await within(document.body).findByRole("dialog", {
        name: "Estimated earnings",
      }),
    ).toBeVisible();
  },
};

export const MobileDecisionExpanded: Story = {
  name: "Doctor · decision card expanded on mobile",
  args: { workflow: DOCTOR_PAYMENT_CHOICE },
  globals: { viewport: { value: "kura320" } },
  render: (args) => <Playground args={args} mobile />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("radio", { name: "Kura will draw the blood" }),
    ).toBeChecked();
    await expect(
      canvas.getByRole("radio", { name: "Patient will pay you now" }),
    ).toBeChecked();

    await userEvent.click(canvas.getByRole("button", { name: "Done" }));
    await expect(
      canvas.getByRole("button", { name: "Edit collection and payment" }),
    ).toBeVisible();
  },
};

export const MobileTubePreparation: Story = {
  args: { workflow: DOCTOR_TUBES },
  globals: { viewport: { value: "kura390" } },
  render: (args) => <Playground args={args} mobile />,
};

export const DarkTheme: Story = {
  args: { workflow: DOCTOR_PAYMENT_CHOICE },
  globals: { theme: "dark" },
};

export const DarkThemeReception: Story = {
  args: { workflow: RECEPTION_PAID },
  globals: { theme: "dark" },
};

/* ── Hierarchy + shared-atom credit + engine suggestions ── */

/**
 * Container ontology in the cart: a panel lists its channels, a derived test
 * lists its inputs. Members are facts of the container — priceless, never
 * individually removable.
 */
export const HierarchicalRelations: Story = {
  name: "Hierarchy · panel channels and derived inputs",
  args: {
    cart: cartWith([
      {
        id: "cmp",
        kind: "lab",
        name: "CMP (metabolic panel)",
        priceMinor: "1500",
        currencyCode: "USD",
        quantity: 1,
        children: [
          { id: "cmp-glucose", name: "Glucose", relation: "panel_channel" },
          {
            id: "cmp-creatinine",
            name: "Creatinine",
            relation: "panel_channel",
          },
          { id: "cmp-alt", name: "ALT", relation: "panel_channel" },
          { id: "cmp-ast", name: "AST", relation: "panel_channel" },
        ],
      },
      {
        id: "egfr-derived",
        kind: "lab",
        name: "eGFR (derived)",
        priceMinor: "0",
        currencyCode: "USD",
        quantity: 1,
        children: [
          { id: "egfr-crea", name: "Creatinine", relation: "derived_input" },
        ],
      },
    ]),
    workflow: DOCTOR_NOT_CONFIGURED,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Glucose")).toBeVisible();
    await expect(canvas.getByText(/· input/)).toBeVisible();
    // Members carry no remove affordance — only the container does.
    await expect(
      canvas.queryByRole("button", { name: "Remove Glucose" }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Remove CMP (metabolic panel)" }),
    ).toBeVisible();
  },
};

/**
 * Shared-atom dedupe: an analyte delivered twice is credited, the gross price
 * is struck through, and the totals carry the credit line — the patient can
 * see they were not double-charged.
 */
export const SharedAtomCredit: Story = {
  name: "Shared credit · never double-charged",
  args: {
    cart: cartWith(
      [
        {
          id: "cmp",
          kind: "lab",
          name: "CMP (metabolic panel)",
          priceMinor: "1500",
          currencyCode: "USD",
          quantity: 1,
          children: [
            {
              id: "cmp-glucose",
              name: "Glucose",
              relation: "panel_channel",
              creditMinor: "400",
            },
          ],
        },
        {
          id: "glucose-f",
          kind: "lab",
          name: "Glucose (fasting)",
          priceMinor: "0",
          currencyCode: "USD",
          quantity: 1,
          struckPriceMinor: "400",
        },
      ],
      {
        pricing: {
          state: "ready",
          summary: {
            subtotalMinor: "1900",
            patientDueMinor: "1500",
            currencyCode: "USD",
            creditMinor: "400",
            creditLabel: "Shared lab work",
          },
        },
      },
    ),
    workflow: DOCTOR_NOT_CONFIGURED,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Shared lab work")).toBeVisible();
    await expect(canvas.getAllByText("$4.00").length).toBeGreaterThanOrEqual(2);
  },
};

/**
 * The four engine verdicts with locked semantics. The upsell rail is REAL
 * upstream (cart/expand, exclude_upsell=false); order is engine-owned.
 */
export const EngineSuggestions: Story = {
  name: "Suggestions · four engine verdicts",
  args: {
    cart: FULL_CART,
    workflow: DOCTOR_NOT_CONFIGURED,
    suggestions: [
      {
        id: "s-exact",
        kind: "exact_match",
        title: "Replace 3 standalone tests with the Metabolic panel",
        detail: "Same analytes, one draw.",
        deltaMinor: "4800",
        deltaDirection: "save",
        actionLabel: "Replace with panel",
      },
      {
        id: "s-upsell",
        kind: "upsell",
        title: "Upgrade to Lipid Panel+",
        detail: "Adds HbA1c and Microalbumin.",
        deltaMinor: "1000",
        deltaDirection: "add",
        actionLabel: "Upgrade",
      },
      {
        id: "s-redundant",
        kind: "redundancy",
        title: "LDL is already delivered by the Lipid panel",
        deltaMinor: "2000",
        deltaDirection: "save",
        actionLabel: "Remove standalone LDL",
      },
      {
        id: "s-dependency",
        kind: "dependency_fill",
        title: "eGFR needs Creatinine",
        detail: "Cheapest cover: add Creatinine + eGFR.",
        deltaMinor: "800",
        deltaDirection: "add",
        actionLabel: "Add Creatinine",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Replace 3 standalone tests/)).toBeVisible();
    await expect(canvas.getByText("Upgrade to Lipid Panel+")).toBeVisible();
    // Only the redundancy verdict is dismissible.
    await expect(
      canvas.getAllByRole("button", { name: "Keep as is" }),
    ).toHaveLength(1);
    // Alert-level verdicts announce; offers stay polite.
    await expect(canvas.getAllByRole("alert").length).toBeGreaterThanOrEqual(2);
  },
};
