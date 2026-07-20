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
import { useFrontDeskStore } from '../../../_demo/front-desk-store';
import styles from '../../../_demo/app-pages.module.css';

export default function PaymentsPage() {
  const router = useRouter();
  const { receipts } = useFrontDeskStore();

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
          branchLabel="Branch BKK1"
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
