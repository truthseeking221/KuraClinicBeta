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
import { useT } from '../../components/foundations/i18n';

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
  const t = useT();
  return (
    <Card aria-label={`${t('Receipt')} ${payment.receiptId ?? ''}`} as="article" className={styles.receipt} size="sm" variant="outline">
      <CardHeader>
        <CardTitle as="h3" className={styles.title}>
          {t('Receipt')} {payment.receiptId}
        </CardTitle>
        <CardAction>
          {voided ? (
            <Badge size="sm" variant="neutral">
              {t('Voided')}
            </Badge>
          ) : payment.supplementalDue ? (
            <Badge size="sm" variant="warning">
              {t('Supplemental due')}
            </Badge>
          ) : (
            <Badge size="sm" variant="success">
              {t('Paid')}
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
          <span>{t('Total paid')}</span>
          <MoneyText className={styles.total} currency="USD" minor={payment.amountMinor ?? '0'} />
        </div>

        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>{t('Method')}</dt>
            <dd>
              {METHOD_LABEL[payment.method ?? ''] ? t(METHOD_LABEL[payment.method ?? '']) : '—'}
            </dd>
          </div>
          <div className={styles.metaRow}>
            <dt>{t('Captured')}</dt>
            <dd>
              {payment.confirmedAt} · {payment.cashier} · {branchLabel}
            </dd>
          </div>
          {payment.previousReceiptId ? (
            <div className={styles.metaRow}>
              <dt>{t('Adjusts')}</dt>
              <dd>
                {t('Receipt')} {payment.previousReceiptId} —{' '}
                <MoneyText currency="USD" minor={payment.previousPaidAmountMinor ?? '0'} />{' '}
                {t('already paid')}
              </dd>
            </div>
          ) : null}
          {payment.voidedReceiptId ? (
            <div className={styles.metaRow}>
              <dt>{t('Replaces')}</dt>
              <dd>{t('Voided receipt')} {payment.voidedReceiptId}</dd>
            </div>
          ) : null}
        </dl>

        <p className={styles.immutable}>
          {t(
            'Receipts are immutable evidence. A correction issues a new receipt — it never edits this one.',
          )}
        </p>
      </CardContent>

      {onPrint && !voided ? (
        <CardFooter className={styles.footer}>
          <Button onClick={onPrint} size="sm" variant="outline">
            <PrintIcon aria-hidden="true" size={14} />
            {t('Print receipt')}
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
