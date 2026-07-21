'use client';

import { useEffect, useMemo, useState } from 'react';

import { Button } from './button';
import { Calendar, type CalendarRange, type CalendarSelection } from './calendar';
import { CalendarIcon } from './icons';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import styles from './date-range-picker.module.css';

export type DateRangePickerProps = {
  value?: CalendarRange;
  defaultValue?: CalendarRange;
  onChange?: (value: CalendarRange | undefined) => void;
  disabled?: boolean;
  label?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

function startOfDay(date: Date) {
  const next = new Date(date.getTime());
  next.setHours(0, 0, 0, 0);
  return next;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addDays(date: Date, days: number) {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

function sameDay(first?: Date, second?: Date) {
  return Boolean(first && second && startOfDay(first).getTime() === startOfDay(second).getTime());
}

function formatRange(value: CalendarRange | undefined, locale: string) {
  if (!value?.from) return 'Select date range';
  const formatter = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  return value.to ? `${formatter.format(value.from)} – ${formatter.format(value.to)}` : formatter.format(value.from);
}

function rangeDays(value: CalendarRange | undefined) {
  if (!value?.from || !value.to) return 0;
  return Math.round((startOfDay(value.to).getTime() - startOfDay(value.from).getTime()) / 86_400_000) + 1;
}

/** Kura dual-month range picker using Kura's calendar behavior and canonical icons. */
export function DateRangePicker({
  className,
  defaultValue,
  disabled = false,
  label = 'Date range',
  locale = 'en-US',
  maxDate,
  minDate,
  onChange,
  value,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [internalValue, setInternalValue] = useState<CalendarRange | undefined>(defaultValue);
  const committedValue = value === undefined ? internalValue : value;
  const [pendingValue, setPendingValue] = useState<CalendarRange | undefined>(committedValue);
  const today = useMemo(() => startOfDay(new Date()), []);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 48rem)');
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const presets = useMemo(() => [
    { label: 'Today', range: { from: today, to: today } },
    { label: 'Yesterday', range: { from: addDays(today, -1), to: addDays(today, -1) } },
    { label: 'Last week', range: { from: addDays(today, -7), to: addDays(today, -1) } },
    { label: 'This month', range: { from: startOfMonth(today), to: endOfMonth(today) } },
    { label: 'Last month', range: { from: startOfMonth(new Date(today.getFullYear(), today.getMonth() - 1, 1)), to: endOfMonth(new Date(today.getFullYear(), today.getMonth() - 1, 1)) } },
    { label: 'This year', range: { from: new Date(today.getFullYear(), 0, 1), to: new Date(today.getFullYear(), 11, 31) } },
  ], [today]);

  const commit = () => {
    if (value === undefined) setInternalValue(pendingValue);
    onChange?.(pendingValue);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) setPendingValue(committedValue);
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger
        disabled={disabled}
        render={(
          <Button
            aria-label={label}
            className={className}
            disabled={disabled}
            leadingIcon={<CalendarIcon aria-hidden size={20} />}
            variant="secondary"
          >
            {formatRange(committedValue, locale)}
          </Button>
        )}
      />
      <PopoverContent align="end" aria-label={label} className={styles.popover} initialFocus={false} role="dialog">
        <div className={styles.layout}>
          <div className={styles.presets} aria-label="Date range shortcuts">
            {presets.map((preset) => {
              const selected = sameDay(pendingValue?.from, preset.range.from) && sameDay(pendingValue?.to, preset.range.to);
              return (
                <button
                  className={styles.preset}
                  data-selected={selected ? 'true' : undefined}
                  key={preset.label}
                  onClick={() => setPendingValue(preset.range)}
                  type="button"
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          <div className={styles.calendarPanel}>
            <Calendar
              aria-label={label}
              className={styles.calendar}
              locale={locale}
              maxDate={maxDate}
              minDate={minDate}
              mode="range"
              numberOfMonths={mobile ? 1 : 2}
              onSelect={(selection: CalendarSelection) => setPendingValue(selection as CalendarRange)}
              selected={pendingValue}
            />
            <div className={styles.footer}>
              <div className={styles.summary}>
                {pendingValue?.from ? <span>{formatRange(pendingValue, locale)}</span> : <span>Choose a start and end date</span>}
                {rangeDays(pendingValue) > 0 ? <span className={styles.dayCount}>{rangeDays(pendingValue)} days selected</span> : null}
              </div>
              <div className={styles.actions}>
                <Button onClick={() => { setPendingValue(committedValue); setOpen(false); }} variant="secondary">Cancel</Button>
                <Button disabled={!pendingValue?.from || !pendingValue.to} onClick={commit}>Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
