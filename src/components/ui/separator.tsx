import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './separator.module.css';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export type SeparatorProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Decorative separators are ignored by assistive technology. */
  decorative?: boolean;
  orientation?: SeparatorOrientation;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/** A visual boundary between adjacent content groups, not an interactive resize handle. */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { className, decorative = true, orientation = 'horizontal', role, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      aria-orientation={decorative ? undefined : orientation}
      className={joinClasses(styles.separator, className)}
      data-orientation={orientation}
      data-slot="separator"
      role={decorative ? 'none' : (role ?? 'separator')}
    />
  );
});
