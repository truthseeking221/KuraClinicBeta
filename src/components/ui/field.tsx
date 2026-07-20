'use client';

import { useMemo } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './field.module.css';

export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type FieldSetProps = ComponentPropsWithoutRef<'fieldset'>;

export function FieldSet({ className, ...props }: FieldSetProps) {
  return <fieldset {...props} className={joinClasses(styles.fieldSet, className)} data-slot="field-set" />;
}

export type FieldLegendProps = ComponentPropsWithoutRef<'legend'> & {
  variant?: 'legend' | 'label';
};

export function FieldLegend({ className, variant = 'legend', ...props }: FieldLegendProps) {
  return (
    <legend
      {...props}
      className={joinClasses(styles.legend, className)}
      data-slot="field-legend"
      data-variant={variant}
    />
  );
}

export type FieldGroupProps = ComponentPropsWithoutRef<'div'>;

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return <div {...props} className={joinClasses(styles.group, className)} data-slot="field-group" />;
}

export type FieldProps = ComponentPropsWithoutRef<'div'> & {
  orientation?: FieldOrientation;
  invalid?: boolean;
  disabled?: boolean;
};

export function Field({
  className,
  disabled = false,
  invalid = false,
  orientation = 'vertical',
  ...props
}: FieldProps) {
  return (
    <div
      {...props}
      role={props.role ?? 'group'}
      className={joinClasses(styles.field, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
      data-orientation={orientation}
      data-slot="field"
    />
  );
}

export type FieldContentProps = ComponentPropsWithoutRef<'div'>;

export function FieldContent({ className, ...props }: FieldContentProps) {
  return <div {...props} className={joinClasses(styles.content, className)} data-slot="field-content" />;
}

export type FieldLabelProps = ComponentPropsWithoutRef<'label'> & {
  required?: boolean;
};

export function FieldLabel({
  children,
  className,
  required = false,
  ...props
}: FieldLabelProps) {
  return (
    <label {...props} className={joinClasses(styles.label, className)} data-slot="field-label">
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className={styles.requiredMark}>
            *
          </span>
          <span className={styles.srOnly}>Required</span>
        </>
      ) : null}
    </label>
  );
}

export type FieldTitleProps = ComponentPropsWithoutRef<'div'>;

export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return <div {...props} className={joinClasses(styles.title, className)} data-slot="field-title" />;
}

export type FieldDescriptionProps = ComponentPropsWithoutRef<'p'>;

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p {...props} className={joinClasses(styles.description, className)} data-slot="field-description" />
  );
}

export type FieldErrorProps = ComponentPropsWithoutRef<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
};

export function FieldError({ children, className, errors, ...props }: FieldErrorProps) {
  const content = useMemo<ReactNode>(() => {
    if (children) return children;
    const messages = Array.from(
      new Set(errors?.map((error) => error?.message).filter((message): message is string => Boolean(message))),
    );
    if (messages.length === 0) return null;
    if (messages.length === 1) return messages[0];
    return (
      <ul className={styles.errorList}>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div
      {...props}
      role={props.role ?? 'alert'}
      className={joinClasses(styles.error, className)}
      data-slot="field-error"
    >
      {content}
    </div>
  );
}

export type FieldSeparatorProps = ComponentPropsWithoutRef<'div'>;

export function FieldSeparator({ children, className, ...props }: FieldSeparatorProps) {
  return (
    <div
      {...props}
      className={joinClasses(styles.separator, className)}
      data-content={children ? 'true' : undefined}
      data-slot="field-separator"
    >
      <span aria-hidden="true" className={styles.separatorLine} />
      {children ? <span className={styles.separatorContent}>{children}</span> : null}
    </div>
  );
}
