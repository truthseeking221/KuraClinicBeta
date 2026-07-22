'use client';

import { useId, useMemo, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { useT } from '../foundations/i18n';
import {
  Calendar,
  type CalendarDateMatcher,
  type CalendarRange,
  type CalendarSelection,
} from './calendar';
import { Button } from './button';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from './field';
import { Input } from './input';
import styles from './date-selector.module.css';

export type DateSelectorMode = 'single' | 'range';
export type DateSelectorValue = Date | CalendarRange | undefined;

export type DateSelectorProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onChange' | 'value'> & {
  /** Select one exact date or an inclusive from/to date range. */
  mode?: DateSelectorMode;
  /** Controlled date selection. */
  value?: DateSelectorValue;
  /** Initial selection for an uncontrolled date selector. */
  defaultValue?: DateSelectorValue;
  onChange?: (value: DateSelectorValue) => void;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: CalendarDateMatcher | CalendarDateMatcher[];
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  today?: Date;
  /** Pass an explicit name only when the owning form serializes the visible date input. */
  name?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function startOfDay(date: Date) {
  const value = new Date(date.getTime());
  value.setHours(0, 0, 0, 0);
  return value;
}

function isSameDay(first: Date, second: Date) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

function isBeforeDay(first: Date, second: Date) {
  return startOfDay(first).getTime() < startOfDay(second).getTime();
}

function isAfterDay(first: Date, second: Date) {
  return startOfDay(first).getTime() > startOfDay(second).getTime();
}

function matchesDateMatcher(matcher: CalendarDateMatcher, date: Date) {
  if (matcher instanceof Date) return isSameDay(matcher, date);
  if (typeof matcher === 'function') return matcher(date);
  if (matcher.before && !isBeforeDay(date, matcher.before)) return false;
  if (matcher.after && !isAfterDay(date, matcher.after)) return false;
  if (matcher.from && isBeforeDay(date, matcher.from)) return false;
  if (matcher.to && isAfterDay(date, matcher.to)) return false;
  return Boolean(matcher.before || matcher.after || matcher.from || matcher.to);
}

function formatDateInput(date?: Date) {
  if (!date) return '';
  const value = startOfDay(date);
  return [value.getFullYear(), value.getMonth() + 1, value.getDate()]
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, '0')))
    .join('-');
}

function parseDateInput(value: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? startOfDay(date)
    : undefined;
}

function normalizeValue(value: DateSelectorValue, mode: DateSelectorMode): DateSelectorValue {
  if (!value) return undefined;
  if (mode === 'single') return value instanceof Date ? startOfDay(value) : value.from ? startOfDay(value.from) : undefined;
  if (value instanceof Date) return { from: startOfDay(value) };
  return {
    from: value.from ? startOfDay(value.from) : undefined,
    to: value.to ? startOfDay(value.to) : undefined,
  };
}

export function formatDateSelectorValue(value: DateSelectorValue, locale = 'en-US') {
  if (!value) return '';
  const format = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  if (value instanceof Date) return format.format(value);
  if (!value.from) return '';
  if (!value.to) return format.format(value.from);
  return `${format.format(value.from)} – ${format.format(value.to)}`;
}

/**
 * A form-ready date or date-range control composed from Kura Field, Input, and Calendar.
 * It owns local date parsing and selection only; query operators, period presets, availability, and persistence remain feature-owned.
 */
export function DateSelector({
  className,
  clearable = true,
  defaultValue,
  description,
  disabled = false,
  disabledDates,
  error,
  id,
  label,
  locale = 'en-US',
  maxDate,
  minDate,
  mode = 'single',
  name,
  onChange,
  readOnly = false,
  required = false,
  today,
  value,
  weekStartsOn,
  ...props
}: DateSelectorProps) {
  const t = useT();
  const generatedId = useId();
  const rootId = id ?? `date-selector-${generatedId}`;
  const labelId = `${rootId}-label`;
  const descriptionId = description ? `${rootId}-description` : undefined;
  const [entryError, setEntryError] = useState<string>();
  const activeError = error ?? entryError;
  const activeErrorId = activeError ? `${rootId}-error` : undefined;
  const describedBy = [descriptionId, activeErrorId].filter(Boolean).join(' ') || undefined;
  const [internalValue, setInternalValue] = useState<DateSelectorValue>(() => normalizeValue(defaultValue, mode));
  const selection = useMemo(
    () => normalizeValue(value === undefined ? internalValue : value, mode),
    [internalValue, mode, value],
  );

  const updateValue = (nextValue: DateSelectorValue) => {
    const next = normalizeValue(nextValue, mode);
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const rangeValue = !selection || selection instanceof Date ? undefined : selection;
  const calendarSelection: CalendarSelection = selection;
  const inputDisabled = disabled || readOnly;
  const isUnavailable = (date: Date) => {
    if (minDate && isBeforeDay(date, minDate)) return true;
    if (maxDate && isAfterDay(date, maxDate)) return true;
    const matchers = disabledDates ? (Array.isArray(disabledDates) ? disabledDates : [disabledDates]) : [];
    return matchers.some((matcher) => matchesDateMatcher(matcher, date));
  };
  const updateTypedValue = (nextValue: DateSelectorValue) => {
    const dates = nextValue instanceof Date
      ? [nextValue]
      : nextValue
        ? [nextValue.from, nextValue.to].filter((date): date is Date => Boolean(date))
        : [];
    if (dates.some(isUnavailable)) {
      setEntryError(t('Choose an available date within the allowed range.'));
      return;
    }
    setEntryError(undefined);
    updateValue(nextValue);
  };

  return (
    <Field
      {...props}
      className={joinClasses(styles.root, className)}
      data-slot="date-selector"
      disabled={disabled}
      invalid={Boolean(activeError)}
    >
      <FieldLabel htmlFor={`${rootId}-start`} id={labelId} required={required}>{label}</FieldLabel>
      <FieldContent>
        <div className={styles.inputs} data-mode={mode}>
          <Input
            aria-describedby={describedBy}
            aria-invalid={Boolean(activeError) || undefined}
            aria-label={mode === 'range' ? t('Start date') : undefined}
            disabled={inputDisabled}
            id={`${rootId}-start`}
            max={formatDateInput(maxDate) || undefined}
            min={formatDateInput(minDate) || undefined}
            name={mode === 'single' ? name : name ? `${name}-start` : undefined}
            onChange={(event) => {
              const date = parseDateInput(event.target.value);
              if (mode === 'single') {
                updateTypedValue(date);
                return;
              }
              updateTypedValue(date && rangeValue?.to && isAfterDay(date, rangeValue.to)
                ? { from: rangeValue.to, to: date }
                : { from: date, to: rangeValue?.to });
            }}
            readOnly={readOnly}
            required={required}
            type="date"
            value={formatDateInput(selection instanceof Date ? selection : rangeValue?.from)}
          />
          {mode === 'range' ? (
            <Input
              aria-describedby={describedBy}
              aria-invalid={Boolean(activeError) || undefined}
              aria-label={t('End date')}
              disabled={inputDisabled}
              id={`${rootId}-end`}
              max={formatDateInput(maxDate) || undefined}
              min={formatDateInput(rangeValue?.from ?? minDate) || undefined}
              name={name ? `${name}-end` : undefined}
              onChange={(event) => {
                const date = parseDateInput(event.target.value);
                updateTypedValue(date && rangeValue?.from && isBeforeDay(date, rangeValue.from)
                  ? { from: date, to: rangeValue.from }
                  : { from: rangeValue?.from, to: date });
              }}
              readOnly={readOnly}
              required={required}
              type="date"
              value={formatDateInput(rangeValue?.to)}
            />
          ) : null}
        </div>

        {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
        {activeError ? <FieldError id={activeErrorId}>{activeError}</FieldError> : null}

        <div className={styles.calendarRegion}>
          <Calendar
            aria-labelledby={labelId}
            disabled={disabled ? () => true : disabledDates}
            loading={false}
            maxDate={maxDate}
            minDate={minDate}
            mode={mode}
            onSelect={(next) => {
              setEntryError(undefined);
              updateValue(next as DateSelectorValue);
            }}
            readOnly={readOnly || disabled}
            selected={calendarSelection}
            today={today}
            weekStartsOn={weekStartsOn}
            locale={locale}
          />
          {clearable && selection && !inputDisabled ? (
            <Button className={styles.clearButton} onClick={() => updateValue(undefined)} size="sm" variant="link">
              {t('Clear date')}
            </Button>
          ) : null}
        </div>
      </FieldContent>
    </Field>
  );
}
