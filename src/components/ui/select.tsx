'use client';

import { Select as SelectPrimitive } from '@base-ui/react';
import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';

import { useT } from '../foundations/i18n';
import { CheckIcon, ChevronDownIcon } from './icons';
import styles from './select.module.css';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectChangeEvent = {
  target: { value: string };
  currentTarget: { value: string };
};

export type SelectProps = Omit<
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  | 'children'
  | 'className'
  | 'disabled'
  | 'form'
  | 'id'
  | 'ref'
  | 'type'
> & {
  ref?: Ref<HTMLButtonElement>;
  className?: string;
  id?: string;
  name?: string;
  form?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  helpText?: ReactNode;
  error?: ReactNode;
  options: readonly SelectOption[];
  /** Renders an initial non-selectable prompt row and trigger value. */
  placeholder?: string;
  /** Initial value for an uncontrolled select. */
  defaultValue?: string | null;
  /** Current value for a controlled select. An empty string shows the prompt. */
  value?: string | null;
  /** Compatibility change event containing the selected option value. */
  onChange?: (event: SelectChangeEvent) => void;
  /** Preferred value callback for new consumers. */
  onValueChange?: (value: string | null) => void;
  readOnly?: boolean;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function normalizeValue(value: string | null | undefined, fallback: string | null) {
  return value === undefined ? fallback : value === '' ? null : value;
}

/**
 * Kura single-select with a custom, collision-safe listbox popup. Base UI
 * provides the ReUI-style trigger, portal, keyboard navigation, selection
 * semantics, hidden form input, and focus restoration; Kura owns the field
 * anatomy, tokens, copy, states, and visual finish.
 */
export function Select({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  autoComplete,
  className,
  defaultValue,
  disabled = false,
  error,
  form,
  helpText,
  id,
  label,
  name,
  onChange,
  onValueChange,
  options,
  placeholder,
  readOnly = false,
  ref,
  required = false,
  value,
  ...triggerProps
}: SelectProps) {
  const t = useT();
  const generatedId = useId();
  const selectId = id ?? `select-${generatedId}`;
  const helpId = helpText ? `${selectId}-help` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helpId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = error ? true : ariaInvalid;
  const firstEnabledValue = options.find((option) => !option.disabled)?.value ?? null;
  const fallbackValue = placeholder ? '' : firstEnabledValue;
  const normalizedDefaultValue = normalizeValue(defaultValue, fallbackValue);
  const normalizedValue = value === undefined ? undefined : normalizeValue(value, null);
  const items = placeholder
    ? [{ label: placeholder, value: '' }, ...options]
    : options;

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
      data-read-only={readOnly ? 'true' : undefined}
      data-slot="select-field"
    >
      <SelectPrimitive.Root<string>
        autoComplete={autoComplete}
        defaultValue={normalizedDefaultValue}
        disabled={disabled}
        form={form}
        items={items.map(({ label: itemLabel, value: itemValue }) => ({
          label: itemLabel,
          value: itemValue,
        }))}
        name={name}
        readOnly={readOnly}
        required={required}
        value={normalizedValue}
        onValueChange={(nextValue) => {
          const selectedValue = nextValue ?? null;
          const eventValue = selectedValue ?? '';
          const event = {
            currentTarget: { value: eventValue },
            target: { value: eventValue },
          } satisfies SelectChangeEvent;

          onChange?.(event);
          onValueChange?.(selectedValue);
        }}
      >
        {label ? (
          <label className={styles.label} htmlFor={selectId}>
            {label}
            {required ? (
              <span aria-hidden="true" className={styles.requiredMark}>
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <SelectPrimitive.Trigger
          {...triggerProps}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={styles.select}
          data-slot="select"
          id={selectId}
          ref={ref}
          type="button"
        >
          <SelectPrimitive.Value placeholder={placeholder ?? t('Select an option')} />
          <SelectPrimitive.Icon aria-hidden="true" className={styles.icon}>
            <ChevronDownIcon size={16} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            align="start"
            alignItemWithTrigger={false}
            className={styles.positioner}
            side="bottom"
          >
            <SelectPrimitive.Popup className={styles.popup} data-slot="select-popup">
              <SelectPrimitive.List className={styles.list}>
                {items.map((option) => (
                  <SelectPrimitive.Item
                    className={joinClasses(
                      styles.item,
                      placeholder && option.value === '' && styles.placeholderItem,
                    )}
                    disabled={placeholder && option.value === '' ? true : option.disabled}
                    key={option.value || '__select-placeholder__'}
                    label={option.label}
                    value={option.value}
                  >
                    <SelectPrimitive.ItemText className={styles.itemText}>
                      {option.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
                      <CheckIcon aria-hidden="true" size={16} />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
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
