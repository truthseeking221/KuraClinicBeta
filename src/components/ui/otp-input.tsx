'use client';

import { OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp';
import { Fragment, useId } from 'react';
import type { ReactNode } from 'react';

import { MinusIcon } from './icons';
import styles from './otp-input.module.css';

export type OtpInputProps = {
  /** Number of code digits. */
  length?: number;
  /** Number of joined slots per visual group. Defaults to 3 for six-digit codes. */
  groupSize?: number;
  /** Controlled digit string (may be shorter than `length` while typing). */
  value: string;
  onValueChange: (value: string) => void;
  /** Fires once when every digit is filled. */
  onComplete?: (value: string) => void;
  /** Visible field label. When omitted, the input receives a generic accessible name. */
  label?: ReactNode;
  helpText?: ReactNode;
  /** Error text; also flags the digits invalid. */
  error?: ReactNode;
  /** Stretches the visual slot groups to the width of their containing form. */
  fullWidth?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  className?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function Slot({
  char,
  hasFakeCaret,
  isActive,
  placeholderChar,
}: {
  char: string | null;
  hasFakeCaret: boolean;
  isActive: boolean;
  placeholderChar: string | null;
}) {
  return (
    <span
      aria-hidden="true"
      className={styles.slot}
      data-active={isActive ? 'true' : undefined}
    >
      <span className={styles.character}>{char ?? placeholderChar ?? '\u00a0'}</span>
      {hasFakeCaret ? <span className={styles.caret} /> : null}
    </span>
  );
}

function Separator() {
  return (
    <span className={styles.separator} data-slot="otp-separator" role="separator">
      <MinusIcon aria-hidden="true" />
    </span>
  );
}

function groupSlots<T>(slots: T[], size: number) {
  const groups: T[][] = [];

  for (let index = 0; index < slots.length; index += size) {
    groups.push(slots.slice(index, index + size));
  }

  return groups;
}

/**
 * One-time-code entry. The library renders one accessible input beneath the
 * segmented visual so native SMS autofill, paste, selection, and screen-reader
 * behaviour stay equivalent to a standard input.
 */
export function OtpInput({
  autoFocus = false,
  className,
  disabled = false,
  error,
  fullWidth = false,
  groupSize,
  helpText,
  id,
  label,
  length = 6,
  onComplete,
  onValueChange,
  value,
}: OtpInputProps) {
  const autoId = useId();
  const inputId = id ?? `otp-input-${autoId}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;
  const resolvedGroupSize = Math.max(1, groupSize ?? (length === 6 ? 3 : length));

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-full-width={fullWidth ? 'true' : undefined}
      data-invalid={error ? 'true' : undefined}
      data-slot="otp-input"
    >
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <OTPInput
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-label={label ? undefined : 'One-time verification code'}
        autoFocus={autoFocus}
        autoComplete="one-time-code"
        containerClassName={styles.slots}
        disabled={disabled}
        id={inputId}
        inputMode="numeric"
        maxLength={length}
        onChange={onValueChange}
        onComplete={onComplete}
        pasteTransformer={(pasted) => pasted.replace(/\D/g, '')}
        pattern={REGEXP_ONLY_DIGITS}
        render={({ slots }) => {
          const groups = groupSlots(slots, resolvedGroupSize);

          return groups.map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              <span className={styles.group} data-slot="otp-group">
                {group.map((slot, slotIndex) => (
                  <Slot
                    key={groupIndex * resolvedGroupSize + slotIndex}
                    {...slot}
                  />
                ))}
              </span>
              {groupIndex < groups.length - 1 ? <Separator /> : null}
            </Fragment>
          ));
        }}
        textAlign="center"
        value={value}
      />
      {error ? (
        <p className={styles.errorText} id={errorId} role="alert">
          {error}
        </p>
      ) : helpText ? (
        <p className={styles.helpText} id={helpId}>
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
