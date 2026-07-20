/**
 * Storybook fixtures for the unified order cart. Content mirrors the Figma
 * `OrderCart / HBC workflow` board: 13 catalog tests, $166.00 subtotal,
 * $24.90 clinician earnings (15% commission), serum + urine tube plan.
 */

import { earnMinorFromBp } from './logic';
import type {
  DoctorOrderCartWorkflow,
  OrderCartData,
  OrderCartItem,
  OrderCartTube,
  ReceptionistOrderCartWorkflow,
} from './types';

const test = (id: string, name: string, priceMinor: string): OrderCartItem => ({
  id,
  kind: 'lab',
  name,
  priceMinor,
  currencyCode: 'USD',
  quantity: 1,
});

/** The Figma board's 13 catalog tests — $166.00 total. */
export const FIGMA_TESTS: OrderCartItem[] = [
  test('iron-panel', 'Iron panel', '1800'),
  test('ferritin', 'Ferritin', '1400'),
  test('cystatin-c', 'Cystatin C', '2200'),
  test('acr', 'Albumin/creatinine ratio', '1000'),
  test('serum-calcium', 'Serum calcium', '700'),
  test('microalbumin', 'Microalbumin', '800'),
  test('creatinine-clearance', 'Creatinine clearance', '1600'),
  test('electrolytes', 'Electrolytes panel', '1300'),
  test('urea-bun', 'Urea (BUN)', '700'),
  test('cbc', 'Complete blood count', '900'),
  test('haptoglobin', 'Haptoglobin', '1800'),
  test('free-t3', 'Free T3', '1200'),
  test('hs-crp', 'hs-CRP', '1200'),
];

export const SUBTOTAL_MINOR = '16600';
export const COMMISSION_BP = 1500;
export const EARN_MINOR = earnMinorFromBp(SUBTOTAL_MINOR, COMMISSION_BP);

export function cartWith(items: OrderCartItem[], overrides?: Partial<OrderCartData>): OrderCartData {
  const subtotal = items
    .reduce((total, item) => total + BigInt(item.priceMinor) * BigInt(item.quantity), BigInt(0))
    .toString();
  return {
    id: 'cart-demo',
    lifecycle: 'draft',
    items,
    pricing: {
      state: 'ready',
      summary: {
        subtotalMinor: subtotal,
        patientDueMinor: subtotal,
        currencyCode: 'USD',
      },
    },
    patient: {
      id: 'p-1',
      name: 'Sok Phearom',
      identifier: 'MRN ··01',
      demographicLabel: 'Male · 52',
    },
    ...overrides,
  };
}

export const FULL_CART = cartWith(FIGMA_TESTS);
export const EMPTY_CART = cartWith([]);

/** Tube plan for the self-draw flow (stopper colors are token-mapped tints). */
export const DEMO_TUBES: OrderCartTube[] = [
  {
    id: 'serum-5',
    label: 'Serum tube · 5 mL',
    stopperColor: 'var(--danger-400)',
    stopperLabel: 'Red',
    tests: ['Iron panel', 'Ferritin', 'Cystatin C'],
    scanned: false,
  },
  {
    id: 'urine-10',
    label: 'Urine cup · 10 mL',
    stopperColor: 'var(--warn-200)',
    stopperLabel: 'Yellow',
    tests: ['Albumin/creatinine ratio'],
    scanned: false,
  },
];

/* ── Doctor workflow factories (one per Figma status) ── */

export function doctorWorkflow(
  overrides?: Partial<DoctorOrderCartWorkflow>,
): DoctorOrderCartWorkflow {
  return {
    role: 'doctor',
    actorName: 'Dr. Sok Vanna',
    access: 'allowed',
    blockers: [],
    stage: 'draft',
    authority: 'verified',
    decisions: {},
    panel: 'unset',
    attested: false,
    earnings: { commissionBp: COMMISSION_BP, earnMinor: EARN_MINOR },
    ...overrides,
  };
}

export const DOCTOR_NOT_CONFIGURED = doctorWorkflow();

export const DOCTOR_PAYMENT_CHOICE = doctorWorkflow({
  panel: 'expanded',
  decisions: { collectBy: 'kura', drawSite: 'kura-psc', payment: 'pay-now' },
});

export const DOCTOR_PAY_LATER = doctorWorkflow({
  panel: 'summary',
  decisions: { collectBy: 'kura', drawSite: 'patient-home', payment: 'pay-later-kura' },
});

export const DOCTOR_CODE_SENT = doctorWorkflow({
  stage: 'code-sent',
  panel: 'summary',
  decisions: { collectBy: 'kura', drawSite: 'patient-home', payment: 'pay-later-kura' },
  paymentLocked: true,
});

export const DOCTOR_COLLECTED = doctorWorkflow({
  stage: 'collected',
  panel: 'summary',
  decisions: { collectBy: 'kura', drawSite: 'patient-home', payment: 'pay-now' },
  attested: true,
  paymentLocked: true,
});

export const DOCTOR_CLINIC_DRAW = doctorWorkflow({
  panel: 'summary',
  decisions: { collectBy: 'self', payment: 'pay-now' },
  attested: true,
});

export const DOCTOR_TUBES = doctorWorkflow({
  stage: 'tubes',
  panel: 'summary',
  decisions: { collectBy: 'self', payment: 'pay-now' },
  attested: true,
  tubes: DEMO_TUBES,
  tubeMethod: 'scan',
});

/* ── Receptionist workflow factories ── */

export function receptionistWorkflow(
  overrides?: Partial<ReceptionistOrderCartWorkflow>,
): ReceptionistOrderCartWorkflow {
  return {
    role: 'receptionist',
    actorName: 'Linh Nguyen',
    access: 'allowed',
    blockers: [],
    stage: 'payment',
    origin: 'on-behalf',
    prescriber: { name: 'Dr. Sok Vanna', status: 'verified' },
    payerLabel: 'Self-pay',
    payment: { status: 'due', label: 'Payment due at the desk' },
    panel: 'unset',
    attested: false,
    permissions: { editClinicalItems: true, collectPayment: true, checkIn: true },
    ...overrides,
  };
}

export const RECEPTION_DUE = receptionistWorkflow();

export const RECEPTION_CASH_CHOSEN = receptionistWorkflow({
  panel: 'expanded',
  method: 'cash',
});

export const RECEPTION_PAID = receptionistWorkflow({
  stage: 'ready-to-check-in',
  panel: 'summary',
  method: 'cash',
  attested: true,
  payment: { status: 'paid', label: 'Cash collected', receiptId: 'R-58213' },
});

export const RECEPTION_CHECKED_IN = receptionistWorkflow({
  stage: 'checked-in',
  panel: 'summary',
  method: 'cash',
  attested: true,
  payment: { status: 'paid', label: 'Cash collected', receiptId: 'R-58213' },
});

export const RECEPTION_NO_ELIGIBLE_PRESCRIBER = receptionistWorkflow({
  prescriber: undefined,
  blockers: [
    {
      id: 'no-eligible-prescriber',
      label: 'No eligible prescriber for this order',
      recovery: 'Attribute a licensed clinician before placing (NO_ELIGIBLE_PRESCRIBER).',
      actionLabel: 'Choose prescriber',
      tone: 'warning',
    },
  ],
});
