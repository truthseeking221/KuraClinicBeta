'use client';

import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';

import styles from './textarea.module.css';

export type TextareaResize = 'none' | 'vertical' | 'both';

export type TextareaProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'children'> & {
  ref?: Ref<HTMLTextAreaElement>;
  /** Visible field label. Omit only when an external label references the textarea. */
  label?: ReactNode;
  /** Supporting text that helps the user enter the right value. */
  helpText?: ReactNode;
  /** Specific recovery guidance for an invalid value. */
  error?: ReactNode;
  /** Controls how the field can be resized without changing its semantic contract. */
  resize?: TextareaResize;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Textarea({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  disabled = false,
  error,
  helpText,
  id,
  label,
  readOnly = false,
  ref,
  required = false,
  resize = 'vertical',
  rows = 3,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? `textarea-${generatedId}`;
  const helpId = helpText ? `${textareaId}-help` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helpId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = error ? true : ariaInvalid;

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
      data-slot="textarea-field"
    >
      {label ? (
        <label className={styles.label} htmlFor={textareaId}>
          {label}
          {required ? (
            <span aria-hidden="true" className={styles.requiredMark}>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <textarea
        {...props}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className={styles.textarea}
        data-resize={resize}
        data-slot="textarea"
        disabled={disabled}
        id={textareaId}
        ref={ref}
        readOnly={readOnly}
        required={required}
        rows={rows}
      />
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
