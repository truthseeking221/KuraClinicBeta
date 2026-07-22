'use client';

import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';

import styles from './input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'filled' | 'surface';

export type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'children' | 'prefix'> & {
  ref?: Ref<HTMLInputElement>;
  /** Visible field label. Omit only when an external label references the input. */
  label?: ReactNode;
  /** Supporting text that helps the user enter the right value. */
  helpText?: ReactNode;
  /** Specific recovery guidance for an invalid value. */
  error?: ReactNode;
  /** Leading slot for an icon or short static text such as a country code. */
  prefix?: ReactNode;
  /** Trailing slot for an icon, unit, or shortcut hint. */
  suffix?: ReactNode;
  size?: InputSize;
  /** Selects the field surface for its immediate background. */
  variant?: InputVariant;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const sizeClassNames: Record<InputSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const variantClassNames: Record<InputVariant, string> = {
  filled: styles.variantFilled,
  surface: styles.variantSurface,
};

export function Input({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  disabled = false,
  error,
  helpText,
  id,
  label,
  prefix,
  readOnly = false,
  ref,
  required = false,
  size = 'md',
  suffix,
  variant = 'filled',
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helpId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = error ? true : ariaInvalid;

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-slot="input-field"
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
      data-read-only={readOnly ? 'true' : undefined}
    >
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required ? (
            <span aria-hidden="true" className={styles.requiredMark}>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div
        className={joinClasses(styles.control, sizeClassNames[size], variantClassNames[variant])}
        data-slot="input-control"
        data-variant={variant}
      >
        {prefix ? (
          <span aria-hidden="true" className={styles.prefix}>
            {prefix}
          </span>
        ) : null}
        <input
          {...props}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={styles.input}
          data-slot="input"
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          ref={ref}
          required={required}
        />
        {suffix ? (
          <span aria-hidden="true" className={styles.suffix}>
            {suffix}
          </span>
        ) : null}
      </div>
      {helpText ? (
        <span className={styles.helpText} id={helpId}>
          {helpText}
        </span>
      ) : null}
      {error ? (
        <span className={styles.errorText} id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
