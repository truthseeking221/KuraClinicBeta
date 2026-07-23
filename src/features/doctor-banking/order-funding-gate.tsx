'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  LoadingIcon,
  QrCodeIcon,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import { AmountText, SignedMoneyText } from './money';
import type { OrderFundingDecision } from './types';
import styles from './doctor-banking.module.css';

export type OrderFundingGateProps = {
  decision: OrderFundingDecision;
  /**
   * Converting an intake into a patient record never consults the ledger, so a
   * gated doctor can still register the person in front of them.
   */
  context?: 'order-compose' | 'intake-conversion';
  onSettle?: () => void;
  onManageAutoPay?: () => void;
  onManageLicence?: () => void;
};

/**
 * The balance decision an order composition surface renders before a doctor can
 * send a laboratory order. Money truth lives here, not in the cart.
 */
export function OrderFundingGate({
  context = 'order-compose',
  decision,
  onManageAutoPay,
  onManageLicence,
  onSettle,
}: OrderFundingGateProps) {
  const t = useT();

  if (context === 'intake-conversion') {
    return (
      <p className={styles.quietCopy}>
        {t('Converting an intake never checks your balance. This step always continues.')}
      </p>
    );
  }

  switch (decision.kind) {
    case 'allow':
      return (
        <p className={styles.gateAllow}>
          {t('Ordering is available.')}{' '}
          <SignedMoneyText value={decision.headroom} /> {t('remains before your ordering floor.')}
        </p>
      );

    case 'khqr_settled_red':
      return (
        <Alert tone="danger">
          <AlertTitle>{t('Settle your balance to send this order')}</AlertTitle>
          <AlertDescription>
            {decision.reason === 'jit_failed'
              ? t('Kura could not collect from your ABA account just now.')
              : t('Auto-pay is not available on your account right now.')}{' '}
            {t('Pay')} <AmountText value={decision.amount} />{' '}
            {t('by KHQR and this order continues.')}
          </AlertDescription>
          <AlertAction>
            <Button leadingIcon={<QrCodeIcon aria-hidden="true" />} onClick={onSettle}>
              {t('Settle now')}
            </Button>
            {decision.reason === 'mandate_unavailable' && onManageAutoPay ? (
              <Button onClick={onManageAutoPay} variant="outline">
                {t('Manage auto-pay')}
              </Button>
            ) : null}
          </AlertAction>
        </Alert>
      );

    case 'khqr_pending_shortfall':
      return (
        <Alert tone="warning">
          <AlertTitle>{t('This order would pass your ordering floor')}</AlertTitle>
          <AlertDescription>
            {t('Your floor is')} <SignedMoneyText value={decision.floor} />.{' '}
            {t('Pay')} <AmountText value={decision.amount} />{' '}
            {t('to cover the shortfall, then send the order.')}
          </AlertDescription>
          <AlertAction>
            <Button leadingIcon={<QrCodeIcon aria-hidden="true" />} onClick={onSettle}>
              {t('Pay the shortfall')}
            </Button>
          </AlertAction>
        </Alert>
      );

    case 'jit_processing':
      return (
        <Alert tone="info">
          <AlertTitle>{t('Collecting from ABA')}</AlertTitle>
          <AlertDescription>
            <LoadingIcon aria-hidden="true" className={styles.gateSpinner} size={16} />
            {t('Waiting for ABA to confirm')} <AmountText value={decision.amount} />.{' '}
            {t('Do not leave this page.')}
          </AlertDescription>
        </Alert>
      );

    case 'jit_succeeded':
      return (
        <Alert tone="success">
          <AlertTitle>{t('Collected. Your order can continue.')}</AlertTitle>
          <AlertDescription>
            <AmountText value={decision.amount} /> {t('was collected from ABA. Balance now')}{' '}
            <SignedMoneyText value={decision.balanceAfter} />.
          </AlertDescription>
        </Alert>
      );

    case 'prescriber_action_required':
      return (
        <Alert tone="danger">
          <AlertTitle>{t('You cannot prescribe right now')}</AlertTitle>
          <AlertDescription>
            {decision.reason} {t('This is not a balance problem, so paying will not unblock it.')}
          </AlertDescription>
          {onManageLicence ? (
            <AlertAction>
              <Button onClick={onManageLicence} variant="outline">
                {t('Manage licence')}
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      );
  }
}
