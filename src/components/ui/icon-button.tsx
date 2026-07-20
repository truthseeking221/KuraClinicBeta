import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { SpinnerGapIcon } from './icons';
import styles from './icon-button.module.css';

export type IconButtonVariant = 'default' | 'primary' | 'tertiary';
export type IconButtonTone = 'default' | 'critical' | 'success';
export type IconButtonSize = 'micro' | 'default' | 'large';

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'aria-label' | 'children'
> & {
  /** Required accessible name; icon-only controls must never rely on the glyph alone. */
  'aria-label': string;
  /** Default is a 44px touch target; use micro for a smaller visual glyph, not a smaller target. */
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  loading?: boolean;
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const sizeClassNames: Record<IconButtonSize, string> = {
  micro: styles.sizeMicro,
  default: styles.sizeDefault,
  large: styles.sizeLarge,
};

const variantClassNames: Record<IconButtonVariant, string> = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  tertiary: styles.variantTertiary,
};

const toneClassNames: Record<IconButtonTone, string> = {
  default: styles.toneDefault,
  critical: styles.toneCritical,
  success: styles.toneSuccess,
};

export function IconButton({
  'aria-label': ariaLabel,
  children,
  className,
  disabled = false,
  loading = false,
  size = 'default',
  tone = 'default',
  variant = 'default',
  ...props
}: IconButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      aria-label={ariaLabel}
      aria-busy={loading ? true : props['aria-busy']}
      data-slot="icon-button"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-loading={loading ? 'true' : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      className={joinClasses(
        styles.iconButton,
        variantClassNames[variant],
        toneClassNames[tone],
        sizeClassNames[size],
        className,
      )}
      disabled={isDisabled}
    >
      {loading ? <SpinnerGapIcon className={styles.loadingIcon} aria-hidden="true" /> : children}
    </button>
  );
}
