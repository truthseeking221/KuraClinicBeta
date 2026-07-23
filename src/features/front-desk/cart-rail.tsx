import { OrderCart as SharedOrderCart } from '../order-cart';
import type {
  OrderCartBlocker,
  OrderCartData,
  OrderCartPricing,
  ReceptionPaymentSummary,
  ReceptionistOrderCartWorkflow,
} from '../order-cart';

import { useT } from '../../components/foundations/i18n';
import type { Translate } from '../../components/foundations/i18n';

import { ORDER_CATALOG } from './catalog';
import {
  cartTotals,
  consentBlockers,
  lineResponsibilityMinor,
  linePayer,
  paymentDueAmountMinor,
} from './logic';
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

function paymentSummary(payment: CartPayment, t: Translate): ReceptionPaymentSummary {
  if (payment.status === 'confirmed') {
    return {
      status: 'paid',
      label: payment.method === 'cash' ? t('Paid by cash') : t('Payment confirmed'),
      detail: payment.receiptId ? `${t('Receipt')} ${payment.receiptId}` : undefined,
      receiptId: payment.receiptId ?? undefined,
    };
  }
  if (payment.status === 'waiting') {
    return {
      status: 'waiting-khqr',
      label: t('Waiting for provider confirmation'),
    };
  }
  if (payment.status === 'deferred') {
    return { status: 'deferred', label: t('Payment deferred') };
  }
  if (payment.status === 'no-charge') {
    return { status: 'no-charge', label: t('No charge') };
  }
  if (payment.status === 'split-cash') {
    return {
      status: 'due',
      label: t('Split payment in progress'),
      detail: t('Cash portion recorded'),
    };
  }
  return { status: 'not-started', label: t('Not started') };
}

function placementBlockers(patient: FrontDeskPatient, t: Translate): OrderCartBlocker[] {
  if (patient.cart.placeFailure === 'code-issuance-failed') {
    return [
      {
        id: 'code-issuance-failed',
        label: t('Order recorded, but the booking code failed'),
        recovery: t(
          'The order remains in the bookings list as needs attention until a usable code is issued.',
        ),
        actionLabel: t('Retry issuing code'),
        tone: 'warning',
      },
    ];
  }
  if (patient.cart.placeFailure === 'idempotency-conflict') {
    return [
      {
        id: 'idempotency-conflict',
        label: t('An identical order request already succeeded'),
        recovery: t('Check the bookings list before retrying to avoid a duplicate order.'),
        tone: 'warning',
      },
    ];
  }
  return consentBlockers(patient.cart, ORDER_CATALOG).map((item) => ({
    id: `consent-${item.id}`,
    label: `${item.name} ${t('still needs consent')}`,
    recovery: t('Resolve the consent chain on the Orders step before collecting payment.'),
    tone: 'warning' as const,
  }));
}

/**
 * Backward-compatible front-desk summary adapter. The shared OrderCart owns
 * all cart rendering; this adapter keeps the cart in `order-review` while the
 * Check-In Wizard's Payment step owns tender selection, payment capture, and
 * check-in confirmation.
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
  const t = useT();
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
    // Promo discounts ride the shared credit row. PROTOTYPE: desk-side only.
    creditMinor: totals.discountMinor !== '0' ? totals.discountMinor : undefined,
    creditLabel: totals.discountMinor !== '0' ? t('Promo discount') : undefined,
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
      message: t(
        'The order total could not be refreshed. Do not collect payment until the server price is available.',
      ),
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
      name: patient.name || t('Patient name pending'),
      identifier: patient.id,
      demographicLabel: [patient.dob, patient.sexAtBirth].filter(Boolean).join(' · '),
      encounterLabel: `${t('Queue')} ${patient.queueNumber}`,
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
          item.fasting ? t('Fasting preparation') : null,
          // Per-line payer preview — display only; upstream capture is cash-only.
          // Reads the payer resolved on the line, never the policy alone: a
          // self-pay line in a covered basket must not advertise a discount.
          coverage && item.priceMinor !== '0' && linePayer(item, patient.insurance) === 'insurer'
            ? `${coverageProvider} ${coverage.coveragePct}% · ${t('patient owes')} ${(
                Number(lineResponsibilityMinor(item.priceMinor, coverage.coveragePct).patientMinor) / 100
              ).toFixed(2)} USD`
            : null,
          item.consent
            ? item.consent.state === 'needed'
              ? t('Consent needed')
              : item.consent.state === 'sent'
                ? t('Consent sent · awaiting signature')
                : item.consent.state === 'signed'
                  ? t('Consent signed')
                  : `${t('Verbal consent')} · ${item.consent.byLabel}`
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
    actorName: t('Clinic receptionist'),
    access: readOnly && status === 'draft' ? 'read-only' : 'allowed',
    stage: 'order-review',
    origin: 'on-behalf',
    method: paidMethod,
    panel: paidMethod ? 'summary' : 'unset',
    attested: patient.cart.payment.status === 'confirmed',
    prescriber: patient.cart.attributedPrescriberId
      ? {
          name: `${t('Attributed clinician')} · ${patient.cart.attributedPrescriberId}`,
          status: 'verified',
        }
      : undefined,
    payerLabel: patient.insurance.length > 0 ? t('Insurance review') : t('Direct pay'),
    payment: paymentSummary(patient.cart.payment, t),
    permissions: {
      editClinicalItems: !readOnly,
      collectPayment: true,
      checkIn: true,
    },
    blockers: placementBlockers(patient, t),
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
