import { OrderCart as SharedOrderCart } from '../order-cart';
import type {
  OrderCartBlocker,
  OrderCartData,
  OrderCartPricing,
  ReceptionPaymentSummary,
  ReceptionistOrderCartWorkflow,
} from '../order-cart';

import { ORDER_CATALOG } from './catalog';
import { cartTotals, consentBlockers, lineResponsibilityMinor, paymentDueAmountMinor } from './logic';
import type { FxRateQuote } from './money';
import { convertUsdMinorToKhr } from './money';
import type { CartPayment, FrontDeskPatient } from './types';

export type CartRailStatus = 'draft' | 'placed' | 'cancelled';
export type PricingStatus = 'ready' | 'loading' | 'error';

export type CartRailProps = {
  patient: FrontDeskPatient;
  onRemoveItem: (id: string) => void;
  fxRate?: FxRateQuote;
  onRetryPricing?: () => void;
  /** Accept the server's re-derived prices when the quote went stale. */
  onAcceptReprice?: () => void;
  /** Retry issuing the collection code after `code-issuance-failed`. */
  onRetryCodeIssuance?: () => void;
  pricingStatus?: PricingStatus;
  readOnly?: boolean;
  status?: CartRailStatus;
};

function paymentSummary(payment: CartPayment): ReceptionPaymentSummary {
  if (payment.status === 'confirmed') {
    return {
      status: 'paid',
      label: payment.method === 'cash' ? 'Paid by cash' : 'Payment confirmed',
      detail: payment.receiptId ? `Receipt ${payment.receiptId}` : undefined,
      receiptId: payment.receiptId ?? undefined,
    };
  }
  if (payment.status === 'waiting') {
    return {
      status: 'waiting-khqr',
      label: 'Waiting for provider confirmation',
    };
  }
  if (payment.status === 'deferred') {
    return { status: 'deferred', label: 'Payment deferred' };
  }
  if (payment.status === 'pending-claim') {
    return {
      status: 'deferred',
      label: 'Insurance claim pending',
      detail: 'Copay collected separately',
    };
  }
  if (payment.status === 'no-charge') {
    return { status: 'no-charge', label: 'No charge' };
  }
  if (payment.status === 'split-cash') {
    return {
      status: 'due',
      label: 'Split payment in progress',
      detail: 'Cash portion recorded',
    };
  }
  return { status: 'not-started', label: 'Not started' };
}

function placementBlockers(patient: FrontDeskPatient): OrderCartBlocker[] {
  if (patient.cart.placeFailure === 'code-issuance-failed') {
    return [
      {
        id: 'code-issuance-failed',
        label: 'Order recorded, but the booking code failed',
        recovery:
          'The order remains in the bookings list as needs attention until a usable code is issued.',
        actionLabel: 'Retry issuing code',
        tone: 'warning',
      },
    ];
  }
  if (patient.cart.placeFailure === 'idempotency-conflict') {
    return [
      {
        id: 'idempotency-conflict',
        label: 'An identical order request already succeeded',
        recovery: 'Check the bookings list before retrying to avoid a duplicate order.',
        tone: 'warning',
      },
    ];
  }
  return consentBlockers(patient.cart, ORDER_CATALOG).map((item) => ({
    id: `consent-${item.id}`,
    label: `${item.name} still needs consent`,
    recovery: 'Resolve the consent chain on the Orders step before collecting payment.',
    tone: 'warning' as const,
  }));
}

/**
 * Backward-compatible front-desk adapter. The shared OrderCart owns all cart
 * rendering; this adapter maps the existing receptionist state and callbacks
 * into the cross-role Clinic contract.
 */
export function CartRail({
  fxRate,
  onAcceptReprice,
  onRemoveItem,
  onRetryCodeIssuance,
  onRetryPricing,
  patient,
  pricingStatus = 'ready',
  readOnly = false,
  status = 'draft',
}: CartRailProps) {
  const totals = cartTotals(patient.cart);
  const patientDueMinor = paymentDueAmountMinor(patient.cart, totals);
  const eligibleCoverage = patient.insurance.find(
    (policy) => policy.eligibility?.kind === 'eligible',
  )?.eligibility;
  const coverage = eligibleCoverage?.kind === 'eligible' ? eligibleCoverage : null;
  const coverageProvider = patient.insurance.find(
    (policy) => policy.eligibility?.kind === 'eligible',
  )?.provider;
  const summary = {
    subtotalMinor: totals.subtotalMinor,
    patientDueMinor,
    patientDueKhrMinor: fxRate
      ? convertUsdMinorToKhr(patientDueMinor, fxRate)
      : undefined,
    previousPaidMinor: patient.cart.payment.supplementalDue
      ? patient.cart.payment.previousPaidAmountMinor
      : undefined,
    previousReceiptId: patient.cart.payment.supplementalDue
      ? patient.cart.payment.previousReceiptId ?? undefined
      : undefined,
    currencyCode: 'USD' as const,
  };

  let pricing: OrderCartPricing;
  if (pricingStatus === 'loading') {
    pricing = { state: 'loading', summary };
  } else if (pricingStatus === 'error') {
    pricing = {
      state: 'error',
      message:
        'The order total could not be refreshed. Do not collect payment until the server price is available.',
    };
  } else if (patient.cart.pricing?.state === 'stale') {
    pricing = {
      state: 'stale',
      summary,
      repricedLines: patient.cart.pricing.repricedLines ?? [],
    };
  } else {
    pricing = { state: 'ready', summary };
  }

  const cart: OrderCartData = {
    id: patient.cart.pricing?.pricingVersion ?? `front-desk-${patient.id}`,
    patient: {
      id: patient.id,
      name: patient.name || 'Patient name pending',
      identifier: patient.id,
      demographicLabel: [patient.dob, patient.sexAtBirth].filter(Boolean).join(' · '),
      encounterLabel: `Queue ${patient.queueNumber}`,
    },
    lifecycle: status,
    items: patient.cart.items.map((item) => ({
      id: item.id,
      kind: item.kind,
      name: item.name,
      code: item.id,
      priceMinor: item.priceMinor,
      currencyCode: item.currencyCode,
      quantity: item.qty,
      meta:
        [
          item.fasting ? 'Fasting preparation' : null,
          // Per-line payer preview — display only; upstream capture is cash-only.
          coverage && item.priceMinor !== '0' && (item.kind === 'lab' || item.kind === 'imaging' || item.kind === 'ecg')
            ? `${coverageProvider} ${coverage.coveragePct}% · patient owes ${(
                Number(lineResponsibilityMinor(item.priceMinor, coverage.coveragePct).patientMinor) / 100
              ).toFixed(2)} USD`
            : null,
          item.consent
            ? item.consent.state === 'needed'
              ? 'Consent needed'
              : item.consent.state === 'sent'
                ? 'Consent sent · awaiting signature'
                : item.consent.state === 'signed'
                  ? 'Consent signed'
                  : `Verbal consent · ${item.consent.byLabel}`
            : null,
        ]
          .filter(Boolean)
          .join(' · ') || undefined,
      state:
        status === 'cancelled'
          ? 'cancelled'
          : patient.cart.payment.supplementalDue
            ? 'supplemental'
            : 'default',
    })),
    pricing,
  };

  const paidMethod =
    patient.cart.payment.method === 'cash' || patient.cart.payment.method === 'khqr'
      ? patient.cart.payment.method
      : undefined;

  const workflow: ReceptionistOrderCartWorkflow = {
    role: 'receptionist',
    actorName: 'Clinic receptionist',
    access: readOnly && status === 'draft' ? 'read-only' : 'allowed',
    stage: 'order-review',
    origin: 'on-behalf',
    method: paidMethod,
    panel: paidMethod ? 'summary' : 'unset',
    attested: patient.cart.payment.status === 'confirmed',
    prescriber: patient.cart.attributedPrescriberId
      ? {
          name: `Attributed clinician · ${patient.cart.attributedPrescriberId}`,
          status: 'verified',
        }
      : undefined,
    payerLabel: patient.insurance.length > 0 ? 'Insurance review' : 'Direct pay',
    payment: paymentSummary(patient.cart.payment),
    permissions: {
      editClinicalItems: !readOnly,
      collectPayment: true,
      checkIn: true,
    },
    blockers: placementBlockers(patient),
  };

  return (
    <SharedOrderCart
      cart={cart}
      onAcceptReprice={onAcceptReprice}
      onBlockerAction={(blockerId) => {
        if (blockerId === 'code-issuance-failed') onRetryCodeIssuance?.();
      }}
      onRemoveItem={onRemoveItem}
      onRetryPricing={onRetryPricing}
      workflow={workflow}
    />
  );
}
