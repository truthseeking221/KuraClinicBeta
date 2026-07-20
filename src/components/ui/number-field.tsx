'use client';

import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';

import { AddIcon, MinusIcon } from './icons';
import styles from './number-field.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type NumberFieldSize = 'sm' | 'md' | 'lg';

export type NumberFieldProps = Omit<
  ComponentPropsWithoutRef<typeof NumberFieldPrimitive.Root>,
  'className' | 'size'
> & {
  className?: string;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  decrementLabel?: string;
  incrementLabel?: string;
  size?: NumberFieldSize;
};

const sizeClassNames: Record<NumberFieldSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export function NumberField({
  className,
  decrementLabel = 'Decrease value',
  description,
  disabled,
  error,
  id,
  incrementLabel = 'Increase value',
  inputRef,
  label,
  required,
  size = 'md',
  ...props
}: NumberFieldProps) {
  const generatedId = useId();
  const inputId = id ?? `number-field-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <NumberFieldPrimitive.Root
      {...props}
      className={joinClasses(styles.root, className)}
      disabled={disabled}
      id={inputId}
      required={required}
    >
      <label className={styles.label} htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden className={styles.required}>*</span> : null}
      </label>
      <NumberFieldPrimitive.Group
        className={joinClasses(styles.group, sizeClassNames[size])}
        data-invalid={error ? 'true' : undefined}
        data-size={size}
      >
        <NumberFieldPrimitive.Decrement aria-label={decrementLabel} className={styles.stepButton}>
          <MinusIcon aria-hidden size={16} />
        </NumberFieldPrimitive.Decrement>
        <NumberFieldPrimitive.Input
          ref={inputRef}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error ? true : undefined}
          className={styles.input}
          id={inputId}
        />
        <NumberFieldPrimitive.Increment aria-label={incrementLabel} className={styles.stepButton}>
          <AddIcon aria-hidden size={16} />
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
      {description ? <span className={styles.description} id={descriptionId}>{description}</span> : null}
      {error ? <span className={styles.error} id={errorId} role="alert">{error}</span> : null}
    </NumberFieldPrimitive.Root>
  );
}
