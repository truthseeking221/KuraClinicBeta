import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './checkbox-group.module.css';

export type CheckboxGroupOrientation = 'horizontal' | 'vertical';

export type CheckboxGroupProps = Omit<ComponentPropsWithoutRef<'fieldset'>, 'children'> & {
  /** Required group label, announced as the checkbox set's legend. */
  legend: ReactNode;
  /** Visible context for a consequence or selection rule. */
  description?: ReactNode;
  /** Specific recovery guidance when the group is invalid. */
  error?: ReactNode;
  /** Horizontal choices wrap, then stack below the mobile threshold. */
  orientation?: CheckboxGroupOrientation;
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function CheckboxGroup({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  children,
  className,
  description,
  error,
  legend,
  orientation = 'vertical',
  ...props
}: CheckboxGroupProps) {
  const generatedId = useId();
  const descriptionId = description ? `checkbox-group-${generatedId}-description` : undefined;
  const errorId = error ? `checkbox-group-${generatedId}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset
      {...props}
      aria-describedby={describedBy}
      aria-invalid={error ? true : ariaInvalid}
      className={joinClasses(styles.group, className)}
      data-invalid={error || ariaInvalid ? 'true' : undefined}
      data-orientation={orientation}
      data-slot="checkbox-group"
    >
      <legend className={styles.legend}>{legend}</legend>
      {description ? (
        <p className={styles.description} id={descriptionId}>
          {description}
        </p>
      ) : null}
      <div className={styles.options} data-slot="checkbox-group-options">
        {children}
      </div>
      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
