import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { LoadingIcon } from './icons';
import styles from './spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  /** Accessible status text; it may be visually shown for longer operations. */
  label?: ReactNode;
  /** Shows the label beside the indicator. */
  showLabel?: boolean;
  size?: SpinnerSize;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Spinner({
  className,
  label = 'Loading',
  role = 'status',
  showLabel = false,
  size = 'md',
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      aria-live={role === 'status' ? 'polite' : undefined}
      className={joinClasses(styles.root, className)}
      data-size={size}
      data-slot="spinner"
      role={role}
    >
      <LoadingIcon aria-hidden="true" className={styles.icon} />
      <span className={showLabel ? styles.label : styles.srOnly}>{label}</span>
    </span>
  );
}
