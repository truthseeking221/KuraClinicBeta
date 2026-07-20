'use client';

import { useId, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

import { Button } from './button';
import { ButtonGroup } from './button-group';
import styles from './segmented-toggle.module.css';

export type SegmentedToggleOption = {
  value: string;
  label: ReactNode;
  leadingIcon?: ReactNode;
  disabled?: boolean;
};

export type SegmentedToggleProps = {
  /** Accessible name that describes the decision represented by the segments. */
  label: string;
  /**
   * Render the label above the segments like a form-field label. Use inside
   * forms where every field needs a visible name; omit for toolbar segments
   * whose meaning is carried by surrounding context.
   */
  labelVisible?: boolean;
  options: readonly SegmentedToggleOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function firstEnabledValue(options: readonly SegmentedToggleOption[]) {
  return options.find((option) => !option.disabled)?.value ?? options[0]?.value ?? '';
}

export function SegmentedToggle({
  className,
  defaultValue,
  disabled = false,
  label,
  labelVisible = false,
  onValueChange,
  options,
  value,
}: SegmentedToggleProps) {
  const labelId = useId();
  const initialValue = defaultValue ?? firstEnabledValue(options);
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  const selectedValue = value ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === selectedValue && !option.disabled);
  // Controlled: reflect the given value exactly — an unknown/empty value means
  // no segment is selected yet. Uncontrolled keeps the first-enabled fallback.
  const resolvedValue =
    value !== undefined ? (selectedOption?.value ?? '') : (selectedOption?.value ?? firstEnabledValue(options));
  // Roving tabindex needs a tab stop even before any selection exists.
  const tabStopValue = resolvedValue || firstEnabledValue(options);

  function select(nextValue: string) {
    if (disabled || nextValue === resolvedValue) {
      return;
    }

    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function focusOption(button: HTMLButtonElement, index: number) {
    const buttons = Array.from(
      button.parentElement?.querySelectorAll<HTMLButtonElement>('[data-slot="button"]') ?? [],
    );
    buttons[index]?.focus();
  }

  function moveFocus(button: HTMLButtonElement, index: number, direction: 1 | -1) {
    if (!options.length) {
      return;
    }

    let nextIndex = index;
    for (let attempts = 0; attempts < options.length; attempts += 1) {
      nextIndex = (nextIndex + direction + options.length) % options.length;
      if (!options[nextIndex]?.disabled && !disabled) {
        const nextOption = options[nextIndex];
        if (!nextOption) return;
        select(nextOption.value);
        focusOption(button, nextIndex);
        return;
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(event.currentTarget, index, 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(event.currentTarget, index, -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      const firstIndex = options.findIndex((option) => !option.disabled);
      if (firstIndex >= 0 && !disabled) {
        select(options[firstIndex]?.value ?? '');
        focusOption(event.currentTarget, firstIndex);
      }
    } else if (event.key === 'End') {
      event.preventDefault();
      const lastIndex = [...options].findLastIndex((option) => !option.disabled);
      if (lastIndex >= 0 && !disabled) {
        select(options[lastIndex]?.value ?? '');
        focusOption(event.currentTarget, lastIndex);
      }
    }
  }

  const group = (
    <ButtonGroup
      label={labelVisible ? undefined : label}
      aria-labelledby={labelVisible ? labelId : undefined}
      role="radiogroup"
      segmented
      className={joinClasses(styles.toggle, !labelVisible ? className : undefined)}
      data-slot="segmented-toggle"
      data-disabled={disabled ? 'true' : undefined}
    >
      {options.map((option, index) => {
        const isSelected = option.value === resolvedValue;
        const isOptionDisabled = disabled || option.disabled;

        return (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={typeof option.label === 'string' ? option.label : undefined}
            data-selected={isSelected ? 'true' : 'false'}
            disabled={isOptionDisabled}
            tabIndex={option.value === tabStopValue ? 0 : -1}
            leadingIcon={option.leadingIcon}
            onClick={() => select(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );

  if (!labelVisible) {
    return group;
  }

  return (
    <div className={joinClasses(styles.field, className)} data-slot="segmented-toggle-field">
      <span className={styles.label} id={labelId}>
        {label}
      </span>
      {group}
    </div>
  );
}
