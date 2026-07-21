import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './divider.module.css';

export type DividerVariant = 'single' | 'double' | 'fill';
export type DividerAlign = 'start' | 'center' | 'end';

export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  variant?: DividerVariant;
  align?: DividerAlign;
  children?: ReactNode;
  contentClassName?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/** Kura divider treatments for labelled or unlabelled content boundaries. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { align = 'center', children, className, contentClassName, variant = 'single', ...props },
  ref,
) {
  const hasContent = children !== undefined && children !== null;

  if (!hasContent) {
    return (
      <div
        {...props}
        ref={ref}
        aria-orientation="horizontal"
        className={joinClasses(styles.root, styles.empty, className)}
        data-variant={variant}
        role="separator"
      />
    );
  }

  const showLeadingLine = variant === 'single' && align !== 'start';
  const showTrailingLine = variant === 'single' && align !== 'end';

  return (
    <div
      {...props}
      ref={ref}
      className={joinClasses(styles.root, styles.withContent, className)}
      data-align={align}
      data-variant={variant}
    >
      {showLeadingLine ? <span aria-hidden className={styles.line} /> : null}
      <div className={joinClasses(styles.content, contentClassName)}>{children}</div>
      {showTrailingLine ? <span aria-hidden className={styles.line} /> : null}
    </div>
  );
});
