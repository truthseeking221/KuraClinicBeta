import type { ComponentPropsWithoutRef, ElementType } from 'react';

import styles from './money-text.module.css';

export type CurrencyCode = 'USD' | 'KHR';

const CURRENCY = {
  USD: { decimals: 2, symbol: '$' },
  KHR: { decimals: 0, symbol: '៛' },
} as const satisfies Record<CurrencyCode, { decimals: 0 | 2; symbol: string }>;

const MINOR_RE = /^\d+$/;
const STORAGE_SCALE = BigInt(100);

export function formatMinor(
  minor: string,
  currency: CurrencyCode,
  style: 'symbol' | 'code' = 'symbol',
): string | null {
  if (!MINOR_RE.test(minor)) return null;

  const amount = BigInt(minor);
  const definition = CURRENCY[currency];
  const displayAmount =
    definition.decimals === 0 ? amount / STORAGE_SCALE : amount;
  const integer =
    definition.decimals === 0 ? displayAmount : displayAmount / STORAGE_SCALE;
  const fraction =
    definition.decimals === 0
      ? ''
      : `.${(displayAmount % STORAGE_SCALE).toString().padStart(2, '0')}`;
  const grouped = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const value = `${grouped}${fraction}`;

  return style === 'code'
    ? `${value} ${currency}`
    : `${definition.symbol}${value}`;
}

export type MoneyTextProps<T extends ElementType = 'span'> = {
  as?: T;
  minor: string | null | undefined;
  currency: CurrencyCode;
  style?: 'symbol' | 'code';
  fallback?: string;
  /**
   * Animate value changes with a short fade-up so totals visibly react to
   * edits. Respects reduced motion. Off by default for dense tables.
   */
  animateChanges?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

/**
 * Canonical, never-throw money renderer for universal exponent-2 wire values.
 * Business arithmetic remains outside this atom; malformed values render an
 * em dash so corrupt data cannot crash the component tree.
 */
export function MoneyText<T extends ElementType = 'span'>({
  as,
  minor,
  currency,
  fallback = '—',
  style = 'symbol',
  animateChanges = false,
  ...props
}: MoneyTextProps<T>) {
  const Component = as ?? 'span';
  const formatted =
    typeof minor === 'string' ? formatMinor(minor, currency, style) : null;
  const className = [styles.money, (props as { className?: string }).className]
    .filter(Boolean)
    .join(' ');
  const text = formatted ?? fallback;

  return (
    <Component {...props} className={className}>
      {animateChanges ? (
        // Remounting on value change re-runs the fade; same value never remounts.
        <span className={styles.value} key={text}>
          {text}
        </span>
      ) : (
        text
      )}
    </Component>
  );
}
