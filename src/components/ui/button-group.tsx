import type { ComponentProps, ReactNode } from 'react';

import styles from './button-group.module.css';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export type ButtonGroupProps = ComponentProps<'div'> & {
  /** Removes the gap and joins adjacent controls into one segmented control. */
  segmented?: boolean;
  orientation?: ButtonGroupOrientation;
  /** Accessible name for a group of related actions. */
  label?: string;
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function ButtonGroup({
  children,
  className,
  label,
  orientation = 'horizontal',
  segmented = false,
  role = 'group',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      {...props}
      role={role}
      aria-label={label ?? props['aria-label']}
      data-slot="button-group"
      data-segmented={segmented ? 'true' : 'false'}
      data-orientation={orientation}
      className={joinClasses(
        styles.group,
        segmented ? styles.segmented : undefined,
        orientation === 'vertical' ? styles.vertical : undefined,
        className,
      )}
    >
      {children}
    </div>
  );
}
