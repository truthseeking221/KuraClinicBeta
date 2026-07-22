'use client';

import { Badge, Button, Card } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import type { Translate } from '../../components/foundations/i18n';

import { visitPaymentFact } from './logic';
import type { FrontDeskPatient } from './types';
import styles from './check-in-complete.module.css';

export type CheckInCompleteProps = {
  patient: FrontDeskPatient;
  /** Legacy desk law: check-in immediately opens the next blank slot. */
  onNextPatient: () => void;
  onOpenQueue?: () => void;
};

function paymentLabel(patient: FrontDeskPatient, t: Translate): string {
  const payment = patient.cart.payment;
  if (payment.status === 'confirmed') return `${t('Paid')} · ${payment.receiptId ?? ''}`.trim();
  if (payment.status === 'no-charge') return t('No charge');
  if (payment.status === 'pending-claim') return t('Insurance claim pending');
  if (payment.status === 'deferred') return t('Pay later');
  if (payment.status === 'waiting' || payment.status === 'split-cash') {
    return t('Waiting for Bakong confirmation');
  }
  return t('Payment pending');
}

/**
 * Terminal reception outcome: the visit leaves the wizard and continues on
 * the desk queue. The one primary action opens the next blank slot — the desk
 * never idles on a finished check-in.
 */
export function CheckInComplete({ onNextPatient, onOpenQueue, patient }: CheckInCompleteProps) {
  const t = useT();
  const fact = visitPaymentFact(patient.cart.payment);
  return (
    <Card as="section" aria-label={t('Reception complete')} className={styles.card}>
      <div className={styles.headline} role="status">
        <span className={styles.queue}>Q-{String(patient.queueNumber).padStart(3, '0')}</span>
        <h2 className={styles.title}>{t('Checked in')}</h2>
      </div>
      <p className={styles.name}>
        {patient.name || t('Walk-in patient')}
        {patient.nameKhmer ? (
          <span className={styles.nameKhmer} lang="km">
            {patient.nameKhmer}
          </span>
        ) : null}
      </p>
      <dl className={styles.facts}>
        <div>
          <dt>{t('Payment')}</dt>
          <dd>
            <Badge
              size="sm"
              variant={fact === 'collected' ? 'success' : fact === 'deferred' ? 'warning' : 'info'}
            >
              {paymentLabel(patient, t)}
            </Badge>
          </dd>
        </div>
        {patient.boundBookingCode ? (
          <div>
            <dt>{t('Booking')}</dt>
            <dd>{patient.boundBookingCode} · {t('redeemed')}</dd>
          </div>
        ) : null}
        {patient.teleconsult.status === 'booked' ? (
          <div>
            <dt>{t('Teleconsult')}</dt>
            <dd>{patient.teleconsult.slot}</dd>
          </div>
        ) : null}
      </dl>
      <p className={styles.handoff}>
        {t('Queued for phlebotomy — the Collection draw worksheet picks this visit up.')}
      </p>
      <div className={styles.actions}>
        <Button onClick={onNextPatient} variant="primary">
          {t('Next patient')}
        </Button>
        {onOpenQueue ? (
          <Button onClick={onOpenQueue} variant="outline">
            {t('Open desk queue')}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
