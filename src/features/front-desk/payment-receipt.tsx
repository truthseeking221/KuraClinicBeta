'use client';

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  MoneyText,
  PrintIcon,
} from '../../components/ui';

import type { CartItem, CartPayment } from './types';
import styles from './payment-receipt.module.css';

export type PaymentReceiptProps = {
  patientName: string;
  items: CartItem[];
  payment: CartPayment;
  /** Branch that captured the payment — required by the capture contract. */
  branchLabel: string;
  /** Voided evidence view: the receipt stays readable, never deleted. */
  voided?: boolean;
  onPrint?: () => void;
};

const METHOD_LABEL: Record<string, string> = {
  cash: 'Cash',
  khqr: 'KHQR (Bakong)',
  split: 'Cash + KHQR',
};

/**
 * Immutable payment evidence. A receipt is never edited: a paid-edit issues a
 * supplemental receipt that references this one, and a void keeps the
 * original readable with a voided marker. The amount is the server-derived
 * capture amount — never desk-entered.
 */
export function PaymentReceipt({
  branchLabel,
  items,
  onPrint,
  patientName,
  payment,
  voided = false,
}: PaymentReceiptProps) {
  return (
    <Card aria-label={`Receipt ${payment.receiptId ?? ''}`} as="article" className={styles.receipt} size="sm" variant="outline">
      <CardHeader>
        <CardTitle as="h3" className={styles.title}>
          Receipt {payment.receiptId}
        </CardTitle>
        <CardAction>
          {voided ? (
            <Badge size="sm" variant="neutral">
              Voided
            </Badge>
          ) : payment.supplementalDue ? (
            <Badge size="sm" variant="warning">
              Supplemental due
            </Badge>
          ) : (
            <Badge size="sm" variant="success">
              Paid
            </Badge>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className={styles.body} data-voided={voided ? 'true' : undefined}>
        <p className={styles.patient}>{patientName}</p>

        <ul className={styles.lines}>
          {items.map((item) => (
            <li className={styles.line} key={item.id}>
              <span className={styles.lineName}>
                {item.name}
                {item.qty > 1 ? ` × ${item.qty}` : ''}
              </span>
              <MoneyText className={styles.linePrice} currency={item.currencyCode} minor={item.priceMinor} />
            </li>
          ))}
        </ul>

        <div className={styles.totalRow}>
          <span>Total paid</span>
          <MoneyText className={styles.total} currency="USD" minor={payment.amountMinor ?? '0'} />
        </div>

        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>Method</dt>
            <dd>{METHOD_LABEL[payment.method ?? ''] ?? '—'}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>Captured</dt>
            <dd>
              {payment.confirmedAt} · {payment.cashier} · {branchLabel}
            </dd>
          </div>
          {payment.previousReceiptId ? (
            <div className={styles.metaRow}>
              <dt>Adjusts</dt>
              <dd>
                Receipt {payment.previousReceiptId} —{' '}
                <MoneyText currency="USD" minor={payment.previousPaidAmountMinor ?? '0'} /> already
                paid
              </dd>
            </div>
          ) : null}
          {payment.voidedReceiptId ? (
            <div className={styles.metaRow}>
              <dt>Replaces</dt>
              <dd>Voided receipt {payment.voidedReceiptId}</dd>
            </div>
          ) : null}
        </dl>

        <p className={styles.immutable}>
          Receipts are immutable evidence. A correction issues a new receipt — it never edits
          this one.
        </p>
      </CardContent>

      {onPrint && !voided ? (
        <CardFooter className={styles.footer}>
          <Button onClick={onPrint} size="sm" variant="outline">
            <PrintIcon aria-hidden="true" size={14} />
            Print receipt
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
