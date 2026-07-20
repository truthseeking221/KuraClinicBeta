"use client";

import { useId } from "react";
import type {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ReactNode,
  Ref,
} from "react";

import { useRadioGroupContext } from "./radio-group";
import styles from "./radio.module.css";

export type RadioProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children" | "onChange" | "readOnly" | "type" | "value"
> & {
  ref?: Ref<HTMLInputElement>;
  /** Visible label for the option. */
  children?: ReactNode;
  /** Supporting text that clarifies the option. */
  helpText?: ReactNode;
  /** Specific recovery guidance for an invalid choice. */
  error?: ReactNode;
  /** Keeps the current choice available for review but prevents mutation. */
  readOnly?: boolean;
  /** Card appearance makes the complete labelled option one compact selectable surface. */
  appearance?: "default" | "card";
  /** Stable value used by RadioGroup and native form submission. */
  value?: string;
  /** Controlled-friendly callback with the next selected state. */
  onCheckedChange?: (checked: boolean) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function Radio({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  appearance = "default",
  checked,
  children,
  className,
  defaultChecked = false,
  disabled,
  error,
  helpText,
  id,
  name,
  onChange,
  onCheckedChange,
  ref,
  readOnly,
  required,
  value,
  ...props
}: RadioProps) {
  const group = useRadioGroupContext();
  const generatedId = useId();
  const inputId = id ?? `radio-${generatedId}`;
  const labelId = children ? `${inputId}-label` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, helpId, errorId].filter(Boolean).join(" ") || undefined;
  const inputValue = value ?? inputId;
  const isControlled = checked !== undefined;
  const isGrouped = group !== null;
  const isChecked = isGrouped ? group.value === inputValue : checked;
  const effectiveDisabled = disabled ?? group?.disabled ?? false;
  const effectiveInvalid = Boolean(error || ariaInvalid || group?.invalid);
  const effectiveReadOnly = readOnly ?? group?.readOnly ?? false;
  const effectiveRequired = required ?? group?.required ?? false;
  const effectiveName = name ?? group?.name;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextChecked = event.currentTarget.checked;

    if (effectiveReadOnly) {
      event.preventDefault();
      return;
    }

    if (nextChecked && group) {
      group.selectValue(inputValue);
    }
    onCheckedChange?.(nextChecked);
    onChange?.(event);
  }

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-appearance={appearance}
      data-slot="radio-field"
    >
      <label
        className={styles.control}
        data-disabled={effectiveDisabled ? "true" : undefined}
        data-invalid={effectiveInvalid ? "true" : undefined}
        data-read-only={effectiveReadOnly ? "true" : undefined}
        htmlFor={inputId}
      >
        <input
          {...props}
          ref={(node) => assignRef(ref, node)}
          aria-describedby={describedBy}
          aria-labelledby={ariaLabelledBy ?? labelId}
          checked={isGrouped || isControlled ? isChecked : undefined}
          className={styles.input}
          defaultChecked={
            isGrouped || isControlled ? undefined : defaultChecked
          }
          disabled={effectiveDisabled}
          id={inputId}
          name={effectiveName}
          onChange={handleChange}
          readOnly={effectiveReadOnly}
          required={effectiveRequired}
          type="radio"
          value={inputValue}
        />
        <span className={styles.indicator} aria-hidden="true">
          <span className={styles.dot} />
        </span>
        {appearance === "card" ? (
          <span className={styles.optionCopy}>
            {children ? (
              <span className={styles.labelText} id={labelId}>
                {children}
              </span>
            ) : null}
            {helpText ? (
              <span className={styles.helpText} id={helpId}>
                {helpText}
              </span>
            ) : null}
          </span>
        ) : children ? (
          <span className={styles.labelText} id={labelId}>
            {children}
          </span>
        ) : null}
      </label>
      {helpText && appearance !== "card" ? (
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
