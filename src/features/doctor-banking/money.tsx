'use client';

import { MoneyText } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import { balanceDirection, splitSignedUsdMinorForDisplay } from './logic';
import type { Amount, SignedMoney } from './types';
import styles from './doctor-banking.module.css';

export function AmountText({ value, className }: { value: Amount; className?: string }) {
  return (
    <MoneyText
      className={className}
      currency={value.currency}
      minor={value.minor}
      style="symbol"
    />
  );
}

export function SignedMoneyText({
  value,
  className,
  announceDirection = false,
}: {
  value: SignedMoney;
  className?: string;
  announceDirection?: boolean;
}) {
  const t = useT();
  const display = splitSignedUsdMinorForDisplay(value.minor);
  if (display.kind === 'unavailable') {
    return <span className={className}>{t(display.text)}</span>;
  }

  const direction = balanceDirection(value.minor);
  const label =
    direction === 'doctor-owes'
      ? t('Doctor owes Kura')
      : direction === 'kura-owes'
        ? t('Kura owes doctor')
        : direction === 'settled'
          ? t('Settled balance')
          : undefined;

  return (
    <span
      aria-label={announceDirection && label ? `${label}: ${display.sign}` : undefined}
      className={[styles.signedMoney, className].filter(Boolean).join(' ')}
    >
      {display.sign ? <span aria-hidden="true">{display.sign}</span> : null}
      <MoneyText currency={value.currency} minor={display.magnitude} style="symbol" />
    </span>
  );
}
