import { describe, expect, it } from "vitest";

import {
  canEditOrderCart,
  decisionsComplete,
  doctorDecisionSummary,
  getOrderCartPrimaryAction,
  groupOrderCartItems,
  tubeProgress,
} from "./logic";
import {
  DEMO_TUBES,
  DOCTOR_CODE_SENT,
  DOCTOR_TUBES,
  EMPTY_CART,
  FIGMA_EARNINGS,
  FULL_CART,
  MIXED_RATE_EARNINGS,
  doctorWorkflow,
  receptionistWorkflow,
} from "./demo-data";
import type { OrderCartData, OrderCartWorkflow } from "./types";

const cart: OrderCartData = {
  id: "order-1",
  lifecycle: "draft",
  items: [
    {
      id: "cbc",
      kind: "lab",
      name: "Complete blood count",
      priceMinor: "900",
      currencyCode: "USD",
      quantity: 1,
    },
    {
      id: "visit",
      kind: "visit",
      name: "Consultation",
      priceMinor: "1500",
      currencyCode: "USD",
      quantity: 1,
    },
  ],
  pricing: {
    state: "ready",
    summary: {
      subtotalMinor: "2400",
      patientDueMinor: "2400",
      currencyCode: "USD",
    },
  },
};

describe("unified order cart role contract", () => {
  it("groups mixed items without changing their shared order", () => {
    expect(groupOrderCartItems(cart.items).map((group) => group.kind)).toEqual([
      "visit",
      "lab",
    ]);
  });

  it("allows a doctor to edit only an unlocked draft", () => {
    expect(canEditOrderCart(cart, doctorWorkflow())).toBe(true);
    expect(
      canEditOrderCart(cart, doctorWorkflow({ paymentLocked: true })),
    ).toBe(false);
    expect(canEditOrderCart(cart, DOCTOR_CODE_SENT)).toBe(false);
  });

  it("keeps a doctor-authored order clinically read only for reception", () => {
    const receptionist = receptionistWorkflow({
      origin: "doctor-order",
      stage: "ready-to-check-in",
      permissions: {
        editClinicalItems: false,
        collectPayment: true,
        checkIn: true,
      },
    });
    expect(canEditOrderCart(cart, receptionist)).toBe(false);
  });
});

describe("collection & payment decisions", () => {
  it("requires who collects, payment, and a site when Kura collects", () => {
    expect(decisionsComplete({})).toBe(false);
    expect(decisionsComplete({ collectBy: "kura", payment: "pay-now" })).toBe(
      false,
    );
    expect(
      decisionsComplete({
        collectBy: "kura",
        drawSite: "patient-home",
        payment: "pay-now",
      }),
    ).toBe(true);
    expect(decisionsComplete({ collectBy: "self", payment: "pay-now" })).toBe(
      true,
    );
  });

  it("summarizes the decisions in Figma vocabulary per stage", () => {
    expect(doctorDecisionSummary(doctorWorkflow())).toBeNull();
    expect(
      doctorDecisionSummary(
        doctorWorkflow({
          decisions: {
            collectBy: "kura",
            drawSite: "patient-home",
            payment: "pay-later-kura",
          },
        }),
      ),
    ).toEqual({
      title: "Kura collection · Patient Home",
      detail: "Patient pays later at Kura",
    });
    expect(doctorDecisionSummary(DOCTOR_CODE_SENT)?.detail).toBe("Code sent");
    expect(
      doctorDecisionSummary(
        doctorWorkflow({
          decisions: { collectBy: "self", payment: "pay-now" },
        }),
      ),
    ).toEqual({
      title: "Clinic draw · you collect",
      detail: "Patient pays you now",
    });
  });
});

describe("server-shaped earnings fixtures", () => {
  it("aggregates pre-derived line facts without applying one cart-wide rate", () => {
    expect(FIGMA_EARNINGS).toMatchObject({
      eligibleSubtotalMinor: "16600",
      earnMinor: "2490",
    });
    expect(
      new Set(FIGMA_EARNINGS.lines.map((line) => line.commissionBp)),
    ).toEqual(new Set([1500]));

    expect(MIXED_RATE_EARNINGS).toMatchObject({
      eligibleSubtotalMinor: "5400",
      earnMinor: "770",
    });
    expect(
      new Set(MIXED_RATE_EARNINGS.lines.map((line) => line.commissionBp)),
    ).toEqual(new Set([1000, 1500, 2000]));
  });
});

describe("tube preparation", () => {
  it("tracks scan progress toward completion", () => {
    expect(tubeProgress(DEMO_TUBES)).toEqual({
      scanned: 0,
      total: 2,
      complete: false,
    });
    expect(
      tubeProgress(DEMO_TUBES.map((tube) => ({ ...tube, scanned: true }))),
    ).toEqual({ scanned: 2, total: 2, complete: true });
    expect(tubeProgress([])).toEqual({ scanned: 0, total: 0, complete: false });
  });
});

describe("primary action state machine", () => {
  it("walks the doctor Kura-collection path", () => {
    expect(
      getOrderCartPrimaryAction(EMPTY_CART, doctorWorkflow()),
    ).toMatchObject({
      label: "Send booking code",
      disabled: true,
    });
    expect(
      getOrderCartPrimaryAction(FULL_CART, doctorWorkflow()),
    ).toMatchObject({
      disabled: true,
      disabledReason: "Set up collection & payment first.",
    });

    const decided = doctorWorkflow({
      decisions: {
        collectBy: "kura",
        drawSite: "patient-home",
        payment: "pay-later-kura",
      },
      panel: "summary",
    });
    expect(getOrderCartPrimaryAction(FULL_CART, decided)).toEqual({
      label: "Send booking code",
      disabled: false,
    });

    expect(getOrderCartPrimaryAction(FULL_CART, DOCTOR_CODE_SENT)).toEqual({
      label: "Track home collection",
      disabled: false,
    });
  });

  it("gates pay-now behind the collection attestation", () => {
    const payNow = doctorWorkflow({
      decisions: {
        collectBy: "kura",
        drawSite: "kura-psc",
        payment: "pay-now",
      },
      panel: "summary",
    });
    expect(getOrderCartPrimaryAction(FULL_CART, payNow)).toMatchObject({
      disabled: true,
      disabledReason: "Confirm you collected the payment first.",
    });
    expect(
      getOrderCartPrimaryAction(FULL_CART, { ...payNow, attested: true }),
    ).toEqual({ label: "Send booking code", disabled: false });
  });

  it("walks the self-draw path through tube prep", () => {
    const selfDraw = doctorWorkflow({
      decisions: { collectBy: "self", payment: "pay-now" },
      panel: "summary",
      attested: true,
    });
    expect(getOrderCartPrimaryAction(FULL_CART, selfDraw)).toEqual({
      label: "Prepare Tubes",
      disabled: false,
    });

    expect(getOrderCartPrimaryAction(FULL_CART, DOCTOR_TUBES)).toMatchObject({
      label: "Confirm collection & scan",
      disabled: true,
      disabledReason: "Scan every tube first (0/2 scanned).",
    });

    const allScanned = doctorWorkflow({
      ...DOCTOR_TUBES,
      tubes: DEMO_TUBES.map((tube) => ({ ...tube, scanned: true })),
    });
    expect(getOrderCartPrimaryAction(FULL_CART, allScanned)).toEqual({
      label: "Confirm collection & scan",
      disabled: false,
    });

    expect(
      getOrderCartPrimaryAction(
        FULL_CART,
        doctorWorkflow({ ...allScanned, stage: "confirmed" }),
      ),
    ).toEqual({ label: "Collection confirmed", disabled: true });
  });

  it("blocks an unverified clinician from placing", () => {
    const explorer = doctorWorkflow({
      authority: "explorer",
      decisions: {
        collectBy: "kura",
        drawSite: "kura-psc",
        payment: "pay-later-kura",
      },
    });
    expect(getOrderCartPrimaryAction(FULL_CART, explorer)).toMatchObject({
      disabled: true,
      disabledReason: "Verify the clinician licence to place this order.",
    });
  });

  it("yields no cart action while reception is still composing the order", () => {
    expect(
      getOrderCartPrimaryAction(
        FULL_CART,
        receptionistWorkflow({ stage: "order-review" }),
      ),
    ).toBeNull();
  });

  it("walks the receptionist tender path", () => {
    expect(
      getOrderCartPrimaryAction(FULL_CART, receptionistWorkflow()),
    ).toMatchObject({
      label: "Confirm payment & check in",
      disabled: true,
      disabledReason: "Choose a payment method first.",
    });

    const cashChosen = receptionistWorkflow({
      method: "cash",
      panel: "summary",
    });
    expect(getOrderCartPrimaryAction(FULL_CART, cashChosen)).toMatchObject({
      disabled: true,
      disabledReason: "Confirm the payment was collected first.",
    });

    expect(
      getOrderCartPrimaryAction(FULL_CART, { ...cashChosen, attested: true }),
    ).toEqual({ label: "Confirm payment & check in", disabled: false });

    const deferred = receptionistWorkflow({
      method: "pay-later",
      panel: "summary",
    });
    expect(getOrderCartPrimaryAction(FULL_CART, deferred)).toEqual({
      label: "Check in & confirm order",
      disabled: false,
    });

    expect(
      getOrderCartPrimaryAction(
        FULL_CART,
        receptionistWorkflow({
          stage: "checked-in",
          method: "cash",
          attested: true,
        }),
      ),
    ).toEqual({ label: "Patient checked in", disabled: true });
  });

  it("shows the recovery reason for a blocked receptionist handoff", () => {
    const blocked: OrderCartWorkflow = receptionistWorkflow({
      method: "cash",
      attested: true,
      blockers: [
        {
          id: "payment",
          label: "Payment is unresolved",
          recovery: "Collect payment or record an authorized deferral.",
        },
      ],
    });

    expect(getOrderCartPrimaryAction(cart, blocked)).toEqual({
      label: "Confirm payment & check in",
      disabled: true,
      disabledReason:
        "Payment is unresolved. Collect payment or record an authorized deferral.",
    });
  });

  it("forces price truth before any role advances", () => {
    const stale: OrderCartData = {
      ...FULL_CART,
      pricing: {
        state: "stale",
        summary: {
          subtotalMinor: "16600",
          patientDueMinor: "16600",
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
    };
    expect(getOrderCartPrimaryAction(stale, doctorWorkflow())).toMatchObject({
      disabled: true,
      disabledReason: "Review and accept the updated prices first.",
    });
  });
});
