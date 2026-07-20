"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./radio-group.module.css";

export type RadioGroupOrientation = "horizontal" | "vertical";
export type RadioGroupLayout = "list" | "grid";

type RadioGroupContextValue = {
  disabled: boolean;
  invalid: boolean;
  name: string;
  readOnly: boolean;
  required: boolean;
  selectValue: (value: string) => void;
  value: string | undefined;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}

export type RadioGroupProps = Omit<
  ComponentPropsWithoutRef<"fieldset">,
  "children" | "disabled"
> & {
  /** Required group label, announced as the radio set's legend. */
  legend: ReactNode;
  /** Visible context that helps a clinician make the selection safely. */
  description?: ReactNode;
  /** Specific recovery guidance when no valid choice has been made. */
  error?: ReactNode;
  /** Shared native form name for every Radio within this group. */
  name?: string;
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value for uncontrolled use. */
  defaultValue?: string;
  /** Called when a selectable option becomes selected. */
  onValueChange?: (value: string) => void;
  /** Disables the complete group while retaining each option's reason nearby. */
  disabled?: boolean;
  /** Preserves the selected option for review without allowing mutation. */
  readOnly?: boolean;
  /** Applies native required semantics to each option in the group. */
  required?: boolean;
  /** Horizontal choices wrap, then stack below the mobile threshold. */
  orientation?: RadioGroupOrientation;
  /** Grid is a two-column choice layout that stacks at the mobile threshold. */
  layout?: RadioGroupLayout;
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function RadioGroup({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  children,
  className,
  defaultValue,
  description,
  disabled = false,
  error,
  layout = "list",
  legend,
  name,
  onValueChange,
  orientation = "vertical",
  readOnly = false,
  required = false,
  value: controlledValue,
  ...props
}: RadioGroupProps) {
  const generatedId = useId();
  const generatedName = `radio-group-${generatedId}`;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const descriptionId = description
    ? `${generatedName}-description`
    : undefined;
  const errorId = error ? `${generatedName}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") ||
    undefined;
  const invalid = Boolean(error || ariaInvalid);

  const selectValue = useCallback(
    (nextValue: string) => {
      if (readOnly || disabled) return;
      if (controlledValue === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    },
    [controlledValue, disabled, onValueChange, readOnly],
  );

  const context = useMemo<RadioGroupContextValue>(
    () => ({
      disabled,
      invalid,
      name: name ?? generatedName,
      readOnly,
      required,
      selectValue,
      value,
    }),
    [
      disabled,
      generatedName,
      invalid,
      name,
      readOnly,
      required,
      selectValue,
      value,
    ],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <fieldset
        {...props}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className={joinClasses(styles.group, className)}
        data-disabled={disabled ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        data-layout={layout}
        data-orientation={orientation}
        data-read-only={readOnly ? "true" : undefined}
        data-slot="radio-group"
        disabled={disabled}
      >
        <legend className={styles.legend}>{legend}</legend>
        {description ? (
          <p className={styles.description} id={descriptionId}>
            {description}
          </p>
        ) : null}
        <div className={styles.options} data-slot="radio-group-options">
          {children}
        </div>
        {error ? (
          <p className={styles.error} id={errorId} role="alert">
            {error}
          </p>
        ) : null}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}
