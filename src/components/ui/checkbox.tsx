'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ReactNode,
  Ref,
} from 'react';

import { CheckIcon, MinusIcon } from './icons';
import styles from './checkbox.module.css';

export type CheckboxTone = 'default' | 'ai';

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'onChange' | 'type'
> & {
  ref?: Ref<HTMLInputElement>;
  /** Visible label for the choice. */
  children?: ReactNode;
  /** Supporting text that explains the consequence of the choice. */
  helpText?: ReactNode;
  /** Specific recovery guidance for an invalid choice. */
  error?: ReactNode;
  /** Semantic tone for non-clinical AI-assisted choices. */
  tone?: CheckboxTone;
  /** Shows a mixed selection state. */
  indeterminate?: boolean;
  /** Controlled-friendly callback with the next checked state. */
  onCheckedChange?: (checked: boolean) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function Checkbox({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  checked,
  children,
  className,
  defaultChecked = false,
  disabled = false,
  error,
  helpText,
  id,
  indeterminate = false,
  onChange,
  onCheckedChange,
  ref,
  required = false,
  tone = 'default',
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? `checkbox-${generatedId}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helpId, errorId].filter(Boolean).join(' ') || undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolledChecked;
  const state = indeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';
  const hasSupportingContent = Boolean(helpText || error);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextChecked = event.currentTarget.checked;

    if (!isControlled) {
      setUncontrolledChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
    onChange?.(event);
  }

  const control = (
    <label
      className={joinClasses(styles.control, hasSupportingContent ? undefined : className)}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={error || ariaInvalid ? 'true' : undefined}
      data-slot={hasSupportingContent ? 'checkbox-control' : 'checkbox-field'}
      data-state={state}
      data-tone={tone}
      htmlFor={inputId}
    >
      <input
        {...props}
        ref={(node) => {
          inputRef.current = node;
          assignRef(ref, node);
        }}
        aria-checked={indeterminate ? 'mixed' : undefined}
        aria-describedby={describedBy}
        aria-invalid={error ? true : ariaInvalid}
        checked={isControlled ? checked : undefined}
        className={styles.input}
        defaultChecked={isControlled ? undefined : defaultChecked}
        disabled={disabled}
        id={inputId}
        onChange={handleChange}
        required={required}
        type="checkbox"
      />
      <span className={styles.indicator} aria-hidden="true">
        {state === 'indeterminate' ? (
          <MinusIcon className={styles.mark} aria-hidden="true" />
        ) : (
          <CheckIcon className={styles.mark} aria-hidden="true" />
        )}
      </span>
      {children ? <span className={styles.labelText}>{children}</span> : null}
    </label>
  );

  if (!hasSupportingContent) {
    return control;
  }

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-slot="checkbox-field"
    >
      {control}
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
