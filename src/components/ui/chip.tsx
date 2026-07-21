import type { ComponentPropsWithoutRef, Ref } from 'react';

import styles from './chip.module.css';

export type ChipVariant = 'bold' | 'subtle' | 'caption';
export type ChipColor =
  | 'lime'
  | 'rose'
  | 'yellow'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'neutral'
  | 'gray'
  | 'soft';

export type ChipProps = ComponentPropsWithoutRef<'span'> & {
  ref?: Ref<HTMLSpanElement>;
  variant?: ChipVariant;
  color?: ChipColor;
};

const variantClassNames: Record<ChipVariant, string> = {
  bold: styles.bold,
  subtle: styles.subtle,
  caption: styles.caption,
};

const colorClassNames: Record<ChipColor, string> = {
  lime: styles.lime,
  rose: styles.rose,
  yellow: styles.yellow,
  cyan: styles.cyan,
  blue: styles.blue,
  purple: styles.purple,
  neutral: styles.neutral,
  gray: styles.gray,
  soft: styles.soft,
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Chip({
  className,
  color = 'neutral',
  ref,
  variant = 'bold',
  ...props
}: ChipProps) {
  return (
    <span
      ref={ref}
      data-slot="chip"
      data-color={color}
      data-variant={variant}
      className={joinClasses(styles.chip, variantClassNames[variant], colorClassNames[color], className)}
      {...props}
    />
  );
}
