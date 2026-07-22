/**
 * Storybook fixtures for the unified order cart. Content mirrors the Figma
 * `OrderCart / HBC workflow` board: 13 catalog tests, $166.00 subtotal,
 * $24.90 estimated clinician earnings from server-shaped per-test economics,
 * serum + urine tube plan.
 */

import type { OrderIndication } from "../assessment/types";

import type {
  DoctorOrderCartWorkflow,
  OrderCartData,
  OrderCartEarnings,
  OrderCartEarningsLine,
  OrderCartItem,
  OrderCartPatient,
  OrderCartTube,
  ReceptionistOrderCartWorkflow,
} from "./types";

const test = (id: string, name: string, priceMinor: string): OrderCartItem => ({
  id,
  kind: "lab",
  name,
  priceMinor,
  currencyCode: "USD",
  quantity: 1,
});

/** The Figma board's 13 catalog tests — $166.00 total. */
export const FIGMA_TESTS: OrderCartItem[] = [
  test("iron-panel", "Iron panel", "1800"),
  test("ferritin", "Ferritin", "1400"),
  test("cystatin-c", "Cystatin C", "2200"),
  test("acr", "Albumin/creatinine ratio", "1000"),
  test("serum-calcium", "Serum calcium", "700"),
  test("microalbumin", "Microalbumin", "800"),
  test("creatinine-clearance", "Creatinine clearance", "1600"),
  test("electrolytes", "Electrolytes panel", "1300"),
  test("urea-bun", "Urea (BUN)", "700"),
  test("cbc", "Complete blood count", "900"),
  test("haptoglobin", "Haptoglobin", "1800"),
  test("free-t3", "Free T3", "1200"),
  test("hs-crp", "hs-CRP", "1200"),
];

export type DemoLineEconomics = Omit<OrderCartEarningsLine, "itemId"> & {
  itemName: string;
};

/**
 * Server-shaped fixture facts. Pricing resolves each amount before it reaches
 * the cart; Storybook deliberately does not calculate commission from subtotal.
 */
const FIGMA_LINE_ECONOMICS: DemoLineEconomics[] = [
  {
    itemName: "Iron panel",
    netBaseMinor: "1800",
    commissionBp: 1500,
    earnMinor: "270",
  },
  {
    itemName: "Ferritin",
    netBaseMinor: "1400",
    commissionBp: 1500,
    earnMinor: "210",
  },
  {
    itemName: "Cystatin C",
    netBaseMinor: "2200",
    commissionBp: 1500,
    earnMinor: "330",
  },
  {
    itemName: "Albumin/creatinine ratio",
    netBaseMinor: "1000",
    commissionBp: 1500,
    earnMinor: "150",
  },
  {
    itemName: "Serum calcium",
    netBaseMinor: "700",
    commissionBp: 1500,
    earnMinor: "105",
  },
  {
    itemName: "Microalbumin",
    netBaseMinor: "800",
    commissionBp: 1500,
    earnMinor: "120",
  },
  {
    itemName: "Creatinine clearance",
    netBaseMinor: "1600",
    commissionBp: 1500,
    earnMinor: "240",
  },
  {
    itemName: "Electrolytes panel",
    netBaseMinor: "1300",
    commissionBp: 1500,
    earnMinor: "195",
  },
  {
    itemName: "Urea (BUN)",
    netBaseMinor: "700",
    commissionBp: 1500,
    earnMinor: "105",
  },
  {
    itemName: "Complete blood count",
    netBaseMinor: "900",
    commissionBp: 1500,
    earnMinor: "135",
  },
  {
    itemName: "Haptoglobin",
    netBaseMinor: "1800",
    commissionBp: 1500,
    earnMinor: "270",
  },
  {
    itemName: "Free T3",
    netBaseMinor: "1200",
    commissionBp: 1500,
    earnMinor: "180",
  },
  {
    itemName: "hs-CRP",
    netBaseMinor: "1200",
    commissionBp: 1500,
    earnMinor: "180",
  },
];

export function earningsForItems(
  items: readonly OrderCartItem[],
  economics: readonly DemoLineEconomics[] = FIGMA_LINE_ECONOMICS,
): OrderCartEarnings {
  const economicsByName = new Map(
    economics.map((line) => [line.itemName, line]),
  );
  const lines = items.flatMap<OrderCartEarningsLine>((item) => {
    const line = economicsByName.get(item.name);
    return line
      ? [
          {
            itemId: item.id,
            netBaseMinor: line.netBaseMinor,
            commissionBp: line.commissionBp,
            earnMinor: line.earnMinor,
          },
        ]
      : [];
  });

  return {
    currencyCode: "USD",
    eligibleSubtotalMinor: lines
      .reduce((total, line) => total + BigInt(line.netBaseMinor), 0n)
      .toString(),
    earnMinor: lines
      .reduce((total, line) => total + BigInt(line.earnMinor), 0n)
      .toString(),
    lines,
  };
}

export const FIGMA_EARNINGS = earningsForItems(FIGMA_TESTS);

export const MIXED_RATE_EARNINGS = earningsForItems(FIGMA_TESTS.slice(0, 3), [
  {
    itemName: "Iron panel",
    netBaseMinor: "1800",
    commissionBp: 1500,
    earnMinor: "270",
  },
  {
    itemName: "Ferritin",
    netBaseMinor: "1400",
    commissionBp: 2000,
    earnMinor: "280",
  },
  {
    itemName: "Cystatin C",
    netBaseMinor: "2200",
    commissionBp: 1000,
    earnMinor: "220",
  },
]);

export const REPRICED_EARNINGS = earningsForItems(FIGMA_TESTS, [
  ...FIGMA_LINE_ECONOMICS.filter((line) => line.itemName !== "Ferritin"),
  {
    itemName: "Ferritin",
    netBaseMinor: "1600",
    commissionBp: 1500,
    earnMinor: "240",
  },
]);

export function cartWith(
  items: OrderCartItem[],
  overrides?: Partial<OrderCartData>,
): OrderCartData {
  const subtotal = items
    .reduce(
      (total, item) => total + BigInt(item.priceMinor) * BigInt(item.quantity),
      BigInt(0),
    )
    .toString();
  return {
    id: "cart-demo",
    lifecycle: "draft",
    items,
    pricing: {
      state: "ready",
      summary: {
        subtotalMinor: subtotal,
        patientDueMinor: subtotal,
        currencyCode: "USD",
      },
    },
    patient: {
      id: "p-1",
      name: "Sok Phearom",
      identifier: "MRN ··01",
      demographicLabel: "Male · 52",
    },
    ...overrides,
  };
}

export const FULL_CART = cartWith(FIGMA_TESTS);
export const EMPTY_CART = cartWith([]);

/** A compact patient-scoped draft for the returning-patient header pattern. */
export function returningPatientCart(
  patient: OrderCartPatient,
): OrderCartData & {
  patient: OrderCartPatient;
} {
  return cartWith(FIGMA_TESTS.slice(0, 3), {
    id: `cart-${patient.id}`,
    patient,
  }) as OrderCartData & { patient: OrderCartPatient };
}

/** Tube plan for the self-draw flow (stopper colors are token-mapped tints). */
export const DEMO_TUBES: OrderCartTube[] = [
  {
    id: "serum-5",
    label: "Serum tube · 5 mL",
    stopperColor: "var(--color-specimen-red-stripe)",
    stopperLabel: "Red",
    tests: ["Iron panel", "Ferritin", "Cystatin C"],
    scanned: false,
  },
  {
    id: "urine-10",
    label: "Urine cup · 10 mL",
    stopperColor: "var(--color-specimen-yellow-sps)",
    stopperLabel: "Yellow",
    tests: ["Albumin/creatinine ratio"],
    scanned: false,
  },
];

/* ── Doctor workflow factories (one per Figma status) ── */

/**
 * The reason the journey's order exists, as the encounter recorded it. Every
 * doctor fixture carries one because an order without a stated reason is a
 * blocked state, not a starting state.
 */
export const DEMO_INDICATION: OrderIndication = {
  diagnosisId: "dx-anaemia",
  code: "D50.9",
  label: "Iron deficiency anaemia, unspecified",
  certainty: "working",
};

export function doctorWorkflow(
  overrides?: Partial<DoctorOrderCartWorkflow>,
): DoctorOrderCartWorkflow {
  return {
    role: "doctor",
    actorName: "Dr. Sok Vanna",
    access: "allowed",
    blockers: [],
    stage: "draft",
    authority: "verified",
    indication: DEMO_INDICATION,
    decisions: {},
    panel: "unset",
    attested: false,
    earnings: FIGMA_EARNINGS,
    ...overrides,
  };
}

export const DOCTOR_NOT_CONFIGURED = doctorWorkflow();

export const DOCTOR_PAYMENT_CHOICE = doctorWorkflow({
  panel: "expanded",
  decisions: { collectBy: "kura", drawSite: "kura-psc", payment: "pay-now" },
});

export const DOCTOR_PAY_LATER = doctorWorkflow({
  panel: "summary",
  decisions: {
    collectBy: "kura",
    drawSite: "patient-home",
    payment: "pay-later-kura",
  },
});

export const DOCTOR_CODE_SENT = doctorWorkflow({
  stage: "code-sent",
  panel: "summary",
  decisions: {
    collectBy: "kura",
    drawSite: "patient-home",
    payment: "pay-later-kura",
  },
  paymentLocked: true,
});

export const DOCTOR_COLLECTED = doctorWorkflow({
  stage: "collected",
  panel: "summary",
  decisions: {
    collectBy: "kura",
    drawSite: "patient-home",
    payment: "pay-now",
  },
  attested: true,
  paymentLocked: true,
});

export const DOCTOR_CLINIC_DRAW = doctorWorkflow({
  panel: "summary",
  decisions: { collectBy: "self", payment: "pay-now" },
  attested: true,
});

export const DOCTOR_TUBES = doctorWorkflow({
  stage: "tubes",
  panel: "summary",
  decisions: { collectBy: "self", payment: "pay-now" },
  attested: true,
  tubes: DEMO_TUBES,
  tubeMethod: "scan",
});

/* ── Receptionist workflow factories ── */

export function receptionistWorkflow(
  overrides?: Partial<ReceptionistOrderCartWorkflow>,
): ReceptionistOrderCartWorkflow {
  return {
    role: "receptionist",
    actorName: "Linh Nguyen",
    access: "allowed",
    blockers: [],
    stage: "payment",
    origin: "on-behalf",
    prescriber: { name: "Dr. Sok Vanna", status: "verified" },
    payerLabel: "Self-pay",
    payment: { status: "due", label: "Payment due at the desk" },
    panel: "unset",
    attested: false,
    permissions: {
      editClinicalItems: true,
      collectPayment: true,
      checkIn: true,
    },
    ...overrides,
  };
}

export const RECEPTION_DUE = receptionistWorkflow();

export const RECEPTION_CASH_CHOSEN = receptionistWorkflow({
  panel: "expanded",
  method: "cash",
});

export const RECEPTION_PAID = receptionistWorkflow({
  stage: "ready-to-check-in",
  panel: "summary",
  method: "cash",
  attested: true,
  payment: { status: "paid", label: "Cash collected", receiptId: "R-58213" },
});

export const RECEPTION_CHECKED_IN = receptionistWorkflow({
  stage: "checked-in",
  panel: "summary",
  method: "cash",
  attested: true,
  payment: { status: "paid", label: "Cash collected", receiptId: "R-58213" },
});

export const RECEPTION_NO_ELIGIBLE_PRESCRIBER = receptionistWorkflow({
  prescriber: undefined,
  blockers: [
    {
      id: "no-eligible-prescriber",
      label: "No eligible prescriber for this order",
      recovery:
        "Attribute a licensed clinician before placing (NO_ELIGIBLE_PRESCRIBER).",
      actionLabel: "Choose prescriber",
      tone: "warning",
    },
  ],
});
