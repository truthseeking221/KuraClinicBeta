import type {
  CollectionDecisions,
  DoctorOrderCartWorkflow,
  OrderCartData,
  OrderCartItem,
  OrderCartItemKind,
  OrderCartPrimaryAction,
  OrderCartTube,
  OrderCartWorkflow,
  ReceptionistOrderCartWorkflow,
} from "./types";

const KIND_ORDER: readonly OrderCartItemKind[] = [
  "visit",
  "lab",
  "imaging",
  "ecg",
  "vitals",
  "telecon",
];

export const ORDER_CART_KIND_LABEL: Record<OrderCartItemKind, string> = {
  visit: "Visits",
  lab: "Catalog",
  imaging: "Imaging",
  ecg: "ECG",
  vitals: "Vitals",
  telecon: "Teleconsultation",
};

export type OrderCartItemGroup = {
  kind: OrderCartItemKind;
  label: string;
  items: OrderCartItem[];
};

export function groupOrderCartItems(
  items: readonly OrderCartItem[],
): OrderCartItemGroup[] {
  return KIND_ORDER.flatMap((kind) => {
    const groupedItems = items.filter((item) => item.kind === kind);
    return groupedItems.length
      ? [{ kind, label: ORDER_CART_KIND_LABEL[kind], items: groupedItems }]
      : [];
  });
}

export function itemCount(items: readonly OrderCartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function canEditOrderCart(
  cart: OrderCartData,
  workflow: OrderCartWorkflow,
): boolean {
  if (cart.lifecycle !== "draft" || workflow.access !== "allowed") return false;

  if (workflow.role === "doctor") {
    return (
      workflow.authority !== "read-only" &&
      workflow.stage === "draft" &&
      !workflow.paymentLocked
    );
  }

  return (
    workflow.permissions.editClinicalItems &&
    workflow.origin === "on-behalf" &&
    workflow.stage === "order-review"
  );
}

/* ── Decision card ── */

/** All questions answered: who collects, where (when Kura), and payment. */
export function decisionsComplete(decisions: CollectionDecisions): boolean {
  if (!decisions.collectBy || !decisions.payment) return false;
  if (decisions.collectBy === "kura" && !decisions.drawSite) return false;
  return true;
}

/** Collapsed summary for a completed doctor decision card (Figma "Edit/View" row). */
export function doctorDecisionSummary(workflow: DoctorOrderCartWorkflow): {
  title: string;
  detail: string;
} | null {
  const { decisions } = workflow;
  if (!decisionsComplete(decisions)) return null;

  if (decisions.collectBy === "self") {
    return {
      title: "Clinic draw · you collect",
      detail: "Patient pays you now",
    };
  }

  const site =
    decisions.drawSite === "patient-home" ? "Patient Home" : "Kura PSC";
  return {
    title: `Kura collection · ${site}`,
    detail:
      workflow.stage === "collected"
        ? "Cash collected"
        : workflow.stage === "code-sent"
          ? "Code sent"
          : decisions.payment === "pay-now"
            ? "Patient pays you now"
            : "Patient pays later at Kura",
  };
}

/* ── Tube preparation ── */

export function tubeProgress(tubes: readonly OrderCartTube[]): {
  scanned: number;
  total: number;
  complete: boolean;
} {
  const scanned = tubes.filter((tube) => tube.scanned).length;
  return {
    scanned,
    total: tubes.length,
    complete: tubes.length > 0 && scanned === tubes.length,
  };
}

/* ── Primary action state machine (Figma CTA vocabulary) ── */

function firstBlockerReason(workflow: OrderCartWorkflow): string | undefined {
  const blocker = workflow.blockers[0];
  if (!blocker) return undefined;
  return blocker.recovery
    ? `${blocker.label}. ${blocker.recovery}`
    : blocker.label;
}

function needsAttestation(workflow: DoctorOrderCartWorkflow): boolean {
  return workflow.decisions.payment === "pay-now" && !workflow.attested;
}

function doctorAction(
  cart: OrderCartData,
  workflow: DoctorOrderCartWorkflow,
): OrderCartPrimaryAction | null {
  const selfDraw = workflow.decisions.collectBy === "self";

  if (workflow.stage === "tubes") {
    const progress = tubeProgress(workflow.tubes ?? []);
    return {
      label: "Confirm collection & scan",
      disabled: !progress.complete,
      disabledReason: progress.complete
        ? undefined
        : `Scan every tube first (${progress.scanned}/${progress.total} scanned).`,
    };
  }

  if (workflow.stage === "confirmed") {
    return { label: "Collection confirmed", disabled: true };
  }

  if (workflow.stage === "code-sent" || workflow.stage === "collected") {
    return { label: "Track home collection", disabled: false };
  }

  const label = selfDraw ? "Prepare Tubes" : "Send booking code";

  if (cart.items.length === 0) {
    return { label, disabled: true, disabledReason: "Add at least one test." };
  }

  // Clinical grounding is checked before the operational decisions: a test
  // with no stated reason should not reach the question of who draws it.
  if (!workflow.indication) {
    return {
      label,
      disabled: true,
      disabledReason: "Record a working diagnosis in the assessment first.",
    };
  }

  if (!decisionsComplete(workflow.decisions)) {
    return {
      label,
      disabled: true,
      disabledReason: "Set up collection & payment first.",
    };
  }

  if (workflow.authority !== "verified") {
    return {
      label,
      disabled: true,
      disabledReason: "Verify the clinician licence to place this order.",
    };
  }

  if (needsAttestation(workflow)) {
    return {
      label,
      disabled: true,
      disabledReason: "Confirm you collected the payment first.",
    };
  }

  return { label, disabled: false };
}

function receptionistAction(
  cart: OrderCartData,
  workflow: ReceptionistOrderCartWorkflow,
): OrderCartPrimaryAction | null {
  if (workflow.stage === "checked-in") {
    return { label: "Patient checked in", disabled: true };
  }

  const label =
    workflow.payment.status === "paid" || workflow.method === "pay-later"
      ? "Check in & confirm order"
      : "Confirm payment & check in";

  if (cart.items.length === 0) {
    return { label, disabled: true, disabledReason: "Add at least one item." };
  }

  if (!workflow.method) {
    return {
      label,
      disabled: true,
      disabledReason: "Choose a payment method first.",
    };
  }

  if (
    workflow.method !== "pay-later" &&
    workflow.payment.status !== "paid" &&
    !workflow.attested
  ) {
    return {
      label,
      disabled: true,
      disabledReason: "Confirm the payment was collected first.",
    };
  }

  if (workflow.stage === "payment" && !workflow.permissions.collectPayment) {
    return {
      label,
      disabled: true,
      disabledReason: "Payment collection is not permitted for this role.",
    };
  }

  if (!workflow.permissions.checkIn) {
    return {
      label,
      disabled: true,
      disabledReason: "Check-in confirmation is not permitted for this role.",
    };
  }

  return { label, disabled: false };
}

export function getOrderCartPrimaryAction(
  cart: OrderCartData,
  workflow: OrderCartWorkflow,
): OrderCartPrimaryAction | null {
  if (cart.lifecycle === "cancelled") return null;

  // While reception composes the order, the surrounding workflow (check-in
  // wizard footer) owns the next action — the cart stays a truth panel.
  if (workflow.role === "receptionist" && workflow.stage === "order-review") {
    return null;
  }

  if (workflow.access !== "allowed") {
    const label =
      workflow.role === "doctor"
        ? "Send booking code"
        : "Confirm payment & check in";
    return {
      label,
      disabled: true,
      disabledReason:
        workflow.access === "denied"
          ? "You do not have access to continue this order."
          : "This order is read only for your current access.",
    };
  }

  if (cart.pricing.state !== "ready" && cart.items.length > 0) {
    const label =
      workflow.role === "doctor"
        ? "Send booking code"
        : "Confirm payment & check in";
    return {
      label,
      disabled: true,
      disabledReason:
        cart.pricing.state === "loading"
          ? "Prices are still updating."
          : cart.pricing.state === "stale"
            ? "Review and accept the updated prices first."
            : "Retry pricing before continuing.",
    };
  }

  const blockerReason = firstBlockerReason(workflow);
  if (blockerReason) {
    const label =
      workflow.role === "doctor"
        ? "Send booking code"
        : "Confirm payment & check in";
    return { label, disabled: true, disabledReason: blockerReason };
  }

  return workflow.role === "doctor"
    ? doctorAction(cart, workflow)
    : receptionistAction(cart, workflow);
}
