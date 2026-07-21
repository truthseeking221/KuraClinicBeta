import type { ComponentPropsWithoutRef, Ref } from 'react';

import { CloseIcon } from './icons';
import styles from './close-button.module.css';

export type CloseButtonSize = '2xs' | 'xs' | 'sm' | 'md';
export type CloseButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  ref?: Ref<HTMLButtonElement>;
  size?: CloseButtonSize;
  'aria-label': string;
};

const sizeClassNames: Record<CloseButtonSize, string> = {
  '2xs': styles.size2xs,
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function CloseButton({
  'aria-label': ariaLabel,
  className,
  ref,
  size = 'xs',
  type = 'button',
  ...props
}: CloseButtonProps) {
  return (
    <button
      ref={ref}
      {...props}
      type={type}
      aria-label={ariaLabel}
      data-slot="close-button"
      data-size={size}
      className={joinClasses(styles.closeButton, sizeClassNames[size], className)}
    >
      <CloseIcon aria-hidden="true" />
    </button>
  );
}
