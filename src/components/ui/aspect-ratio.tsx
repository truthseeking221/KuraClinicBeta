import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import styles from './aspect-ratio.module.css';

export type AspectRatioProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Width divided by height. Use a functional media requirement, not a decorative crop. */
  ratio?: number;
  children?: ReactNode;
};

type AspectRatioStyle = CSSProperties & {
  '--aspect-ratio'?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function AspectRatio({
  children,
  className,
  ratio = 16 / 9,
  style,
  ...props
}: AspectRatioProps) {
  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new RangeError('AspectRatio ratio must be a positive finite number.');
  }

  return (
    <div
      {...props}
      data-slot="aspect-ratio"
      className={joinClasses(styles.aspectRatio, className)}
      style={{ ...style, '--aspect-ratio': String(ratio) } as AspectRatioStyle}
    >
      {children}
    </div>
  );
}
