'use client';

import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, Ref } from 'react';

import { Input, type InputProps } from './input';
import styles from './date-input.module.css';

export type DateInputProps = Omit<
  InputProps,
  'defaultValue' | 'inputMode' | 'maxLength' | 'onChange' | 'ref' | 'type' | 'value'
> & {
  /** ISO-like date value. Partial values are allowed while the user is typing. */
  value?: string;
  /** Initial ISO-like date value for an uncontrolled field. */
  defaultValue?: string;
  /** Called with the normalized `YYYY-MM-DD` value as the user types. */
  onValueChange?: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
};

type Selection = { end: number; start: number };

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '').slice(0, 8);
}

function digitCountBefore(value: string, position: number) {
  return value.slice(0, position).replace(/\D/g, '').length;
}

function selectionAfterDigits(value: string, count: number): number {
  if (count <= 0) return 0;

  let seen = 0;
  for (let index = 0; index < value.length; index += 1) {
    if (/\d/.test(value[index] ?? '')) {
      seen += 1;
      if (seen === count) return index + 1;
    }
  }
  return value.length;
}

/** Formats a typed date without changing the user's digit order. */
export function formatDateInputValue(value: string) {
  const digits = digitsOnly(value);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  {
    defaultValue,
    className,
    onKeyDown: onKeyDownProp,
    onValueChange,
    placeholder = 'YYYY-MM-DD',
    value,
    ...props
  },
  forwardedRef,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingSelection = useRef<Selection | null>(null);
  const [internalValue, setInternalValue] = useState(() => formatDateInputValue(defaultValue ?? ''));
  const formattedValue = value === undefined ? internalValue : formatDateInputValue(value);

  useLayoutEffect(() => {
    const selection = pendingSelection.current;
    const input = inputRef.current;
    if (!selection || !input || document.activeElement !== input) return;

    input.setSelectionRange(selection.start, selection.end);
    pendingSelection.current = null;
  }, [formattedValue]);

  function setRefs(element: HTMLInputElement | null) {
    inputRef.current = element;
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }
  }

  function commit(nextValue: string, selection: Selection) {
    const next = formatDateInputValue(nextValue);
    pendingSelection.current = selection;
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function removeDigitAt(position: number, nextDigitCount: number) {
    const digits = digitsOnly(formattedValue);
    const nextDigits = `${digits.slice(0, position)}${digits.slice(position + 1)}`;
    const next = formatDateInputValue(nextDigits);
    const nextCaret = selectionAfterDigits(next, nextDigitCount);
    commit(next, { start: nextCaret, end: nextCaret });
  }

  function handleMaskedKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.defaultPrevented) return;
    const input = event.currentTarget;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    if (start !== end) return;

    if (event.key === 'Backspace' && start > 0 && input.value[start - 1] === '-') {
      event.preventDefault();
      const digitCount = digitCountBefore(input.value, start);
      removeDigitAt(digitCount - 1, Math.max(0, digitCount - 1));
    } else if (event.key === 'Delete' && input.value[start] === '-') {
      event.preventDefault();
      const digitCount = digitCountBefore(input.value, start);
      removeDigitAt(digitCount, digitCount);
    }
  }

  return (
    <Input
      {...props}
      className={joinClasses(styles.root, className)}
      inputMode="numeric"
      maxLength={10}
      onChange={(event) => {
        const input = event.currentTarget;
        const caret = input.selectionStart ?? input.value.length;
        const digitCount = digitCountBefore(input.value, caret);
        const next = formatDateInputValue(input.value);
        const nextCaret = selectionAfterDigits(next, digitCount);
        commit(next, { start: nextCaret, end: nextCaret });
      }}
      onKeyDown={(event) => {
        handleMaskedKeyDown(event);
        onKeyDownProp?.(event);
      }}
      placeholder={placeholder}
      ref={setRefs}
      type="text"
      value={formattedValue}
    />
  );
});
