'use client';

/**
 * Payment evidence: receipts captured this session, newest first. Empty
 * until a check-in confirms a payment — the desk never fakes evidence.
 */

import { useRouter } from 'next/navigation';

import { Button } from '../../../../components/ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../../../components/shared';
import { PaymentReceipt } from '../../../../features/front-desk/payment-receipt';
import { demoOnboardingScenarioById } from '../../../../features/auth/demo-data';
import { FRONT_DESK_PAYMENT_DEMO_SCENARIOS } from '../../../../features/front-desk/demo-data';
import type { FrontDeskPaymentDemoVariant } from '../../../../features/front-desk/demo-data';
import { useFrontDeskStore } from '../../../_demo/front-desk-store';
import { useDemoSession } from '../../../_demo/demo-session';
import styles from '../../../_demo/app-pages.module.css';

export default function PaymentsPage() {
  const router = useRouter();
  const { receipts } = useFrontDeskStore();
  const { session } = useDemoSession();
  const scenario = demoOnboardingScenarioById(session.demoScenarioId);
  const configured =
    scenario.surface === 'front-desk-payments'
      ? FRONT_DESK_PAYMENT_DEMO_SCENARIOS[
          scenario.variant as FrontDeskPaymentDemoVariant
        ]
      : undefined;

  if (configured) {
    return (
      <div className={styles.stack}>
        <PaymentReceipt
          {...configured}
          onPrint={() => window.print()}
        />
      </div>
    );
  }

  const confirmed = receipts.filter(
    (patient) => patient.cart.payment.status === 'confirmed',
  );

  if (confirmed.length === 0) {
    return (
      <div className={styles.centered}>
        <EmptyState align="center" surface="plain">
          <EmptyStateHeader>
            <EmptyStateTitle>No payments captured yet</EmptyStateTitle>
            <EmptyStateDescription>
              Receipts appear here after a check-in confirms a cash payment.
              Evidence is immutable — voids keep the original readable.
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <Button
              onClick={() => router.push('/front-desk/arrivals/check-in')}
              size="sm"
              variant="primary"
            >
              Start a check-in
            </Button>
          </EmptyStateContent>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className={styles.stack}>
      {confirmed.map((patient) => (
        <PaymentReceipt
          branchLabel={session.customWorkspaceName ?? 'My cabinet'}
          items={patient.cart.items}
          key={patient.id}
          onPrint={() => window.print()}
          patientName={patient.name || 'Walk-in patient'}
          payment={patient.cart.payment}
        />
      ))}
    </div>
  );
}
