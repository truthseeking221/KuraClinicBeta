'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, KeyboardEvent, ReactNode } from 'react';

import { useT } from '../foundations/i18n';
import { Button } from './button';
import { IconButton } from './icon-button';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SpinnerGapIcon } from './icons';
import styles from './calendar.module.css';

export type CalendarMode = 'single' | 'multiple' | 'range';
export type CalendarCaptionLayout = 'label' | 'dropdown' | 'dropdown-years';
export type CalendarNavigation = 'split' | 'right';

export type CalendarRange = {
  from?: Date;
  to?: Date;
};

export type CalendarSelection = Date | Date[] | CalendarRange | undefined;

export type CalendarDateMatcher =
  | Date
  | {
      before?: Date;
      after?: Date;
      from?: Date;
      to?: Date;
    }
  | ((date: Date) => boolean);

export type CalendarDayModifiers = {
  outside: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  focused: boolean;
  rangeStart: boolean;
  rangeMiddle: boolean;
  rangeEnd: boolean;
};

export type CalendarRenderDay = (date: Date, modifiers: CalendarDayModifiers) => ReactNode;
export type CalendarDayClassName =
  | string
  | ((date: Date, modifiers: CalendarDayModifiers) => string | undefined);

export type CalendarProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'onSelect'> & {
  /** The selection contract used by the calendar. */
  mode?: CalendarMode;
  /** Controlled visible month. */
  month?: Date;
  /** Initial visible month for an uncontrolled calendar. */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** Controlled selection. */
  selected?: CalendarSelection;
  /** Initial selection for an uncontrolled calendar. */
  defaultSelected?: CalendarSelection;
  onSelect?: (selection: CalendarSelection, date: Date) => void;
  /** Dates or rules that cannot be selected. */
  disabled?: CalendarDateMatcher | CalendarDateMatcher[];
  minDate?: Date;
  maxDate?: Date;
  /** Show days from adjacent months in the first and last week. */
  showOutsideDays?: boolean;
  /** Add a week-number column on wide layouts. */
  showWeekNumber?: boolean;
  /** Use a visible caption or native month/year selectors. */
  captionLayout?: CalendarCaptionLayout;
  /** Keep navigation split around the caption or group it on the right. */
  navigation?: CalendarNavigation;
  /** Number of adjacent months shown together. */
  numberOfMonths?: number;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  fromYear?: number;
  toYear?: number;
  /** The reference date used for the today state. */
  today?: Date;
  showTodayButton?: boolean;
  todayLabel?: string;
  /** Prevents date changes while preserving keyboard navigation and context. */
  readOnly?: boolean;
  loading?: boolean;
  /** Optional content and class hooks for domain composition. */
  renderDay?: CalendarRenderDay;
  getDayClassName?: CalendarDayClassName;
};

type MonthCells = Array<Date | null>;

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function cloneDate(date: Date) {
  return new Date(date.getTime());
}

function startOfDay(date: Date) {
  const value = cloneDate(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function startOfMonth(date: Date) {
  const value = startOfDay(date);
  value.setDate(1);
  return value;
}

function addDays(date: Date, amount: number) {
  const value = cloneDate(date);
  value.setDate(value.getDate() + amount);
  return startOfDay(value);
}

function addMonths(date: Date, amount: number) {
  const value = startOfMonth(date);
  value.setMonth(value.getMonth() + amount);
  return value;
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function clampToMonth(date: Date, month: Date) {
  return new Date(month.getFullYear(), month.getMonth(), Math.min(date.getDate(), daysInMonth(month)));
}

function isSameDay(first?: Date, second?: Date) {
  return Boolean(
    first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate(),
  );
}

function isBeforeDay(first: Date, second: Date) {
  return startOfDay(first).getTime() < startOfDay(second).getTime();
}

function isAfterDay(first: Date, second: Date) {
  return startOfDay(first).getTime() > startOfDay(second).getTime();
}

function isBetweenDays(date: Date, from?: Date, to?: Date) {
  if (!from || !to) return false;
  return !isBeforeDay(date, from) && !isAfterDay(date, to);
}

function dateKey(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part) => String(part).padStart(2, '0'))
    .join('-');
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function firstDateFromSelection(selection?: CalendarSelection) {
  if (!selection) return undefined;
  if (selection instanceof Date) return selection;
  if (Array.isArray(selection)) return selection[0];
  return selection.from ?? selection.to;
}

function matchesDateMatcher(matcher: CalendarDateMatcher, date: Date) {
  const normalizedDate = startOfDay(date);

  if (matcher instanceof Date) return isSameDay(matcher, normalizedDate);
  if (typeof matcher === 'function') return matcher(normalizedDate);

  if (matcher.before && !isBeforeDay(normalizedDate, matcher.before)) return false;
  if (matcher.after && !isAfterDay(normalizedDate, matcher.after)) return false;
  if (matcher.from && isBeforeDay(normalizedDate, matcher.from)) return false;
  if (matcher.to && isAfterDay(normalizedDate, matcher.to)) return false;

  return Boolean(matcher.before || matcher.after || matcher.from || matcher.to);
}

function getMonthCells(month: Date, weekStartsOn: number, showOutsideDays: boolean): MonthCells {
  const first = startOfMonth(month);
  const leadingDays = (first.getDay() - weekStartsOn + 7) % 7;
  const visibleDays = daysInMonth(first);
  const minimumCells = leadingDays + visibleDays;
  const cellCount = showOutsideDays ? Math.ceil(minimumCells / 7) * 7 : Math.ceil(minimumCells / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const date = addDays(first, index - leadingDays);
    if (!showOutsideDays && date.getMonth() !== first.getMonth()) return null;
    return date;
  });
}

function getWeekStart(date: Date, weekStartsOn: number) {
  return addDays(date, -((date.getDay() - weekStartsOn + 7) % 7));
}

function getIsoWeekNumber(date: Date) {
  const value = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = value.getUTCDay() || 7;
  value.setUTCDate(value.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(value.getUTCFullYear(), 0, 1));
  return Math.ceil(((value.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function selectionContainsDate(selection: CalendarSelection, mode: CalendarMode, date: Date) {
  if (!selection) return false;
  if (mode === 'single') return selection instanceof Date && isSameDay(selection, date);
  if (mode === 'multiple') {
    return Array.isArray(selection) && selection.some((selectedDate) => isSameDay(selectedDate, date));
  }

  if (selection instanceof Date || Array.isArray(selection)) return false;
  return isSameDay(selection.from, date) || isSameDay(selection.to, date) || isBetweenDays(date, selection.from, selection.to);
}

function getRangeModifiers(selection: CalendarSelection, date: Date) {
  if (!selection || selection instanceof Date || Array.isArray(selection)) {
    return { rangeStart: false, rangeMiddle: false, rangeEnd: false };
  }

  const from = selection.from;
  const to = selection.to;
  return {
    rangeStart: Boolean(from && isSameDay(from, date)),
    rangeMiddle: Boolean(from && to && isBetweenDays(date, from, to) && !isSameDay(from, date) && !isSameDay(to, date)),
    rangeEnd: Boolean(to && isSameDay(to, date)),
  };
}

function getInitialFocus(
  month: Date,
  selection: CalendarSelection | undefined,
  today: Date,
  isDisabled: (date: Date) => boolean,
  weekStartsOn = 0,
) {
  const selectedDate = firstDateFromSelection(selection);
  if (selectedDate && !isDisabled(selectedDate)) return cloneDate(selectedDate);
  if (today.getMonth() === month.getMonth() && today.getFullYear() === month.getFullYear() && !isDisabled(today)) {
    return cloneDate(today);
  }

  const cells = getMonthCells(month, weekStartsOn, true);
  const firstAvailableDate = cells.find((date): date is Date => date !== null && !isDisabled(date));
  return cloneDate(firstAvailableDate ?? month);
}

function getMonthLabel(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
}

function getWeekdayLabel(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
}

function getDateLabel(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function CalendarMonth({
  month,
  showMonthLabel,
  locale,
  weekStartsOn,
  showOutsideDays,
  showWeekNumber,
  focusedDate,
  focusTargetKey,
  mode,
  getDayModifiers,
  getDayClassName,
  renderDay,
  onDayClick,
  onDayKeyDown,
  onDayFocus,
  setDayRef,
}: {
  month: Date;
  showMonthLabel: boolean;
  locale: string;
  weekStartsOn: number;
  showOutsideDays: boolean;
  showWeekNumber: boolean;
  focusedDate: Date;
  focusTargetKey: string | undefined;
  mode: CalendarMode;
  getDayModifiers: (date: Date, month: Date) => CalendarDayModifiers;
  getDayClassName?: CalendarDayClassName;
  renderDay?: CalendarRenderDay;
  onDayClick: (date: Date) => void;
  onDayKeyDown: (event: KeyboardEvent<HTMLButtonElement>, date: Date) => void;
  onDayFocus: (date: Date) => void;
  setDayRef: (key: string, node: HTMLButtonElement | null) => void;
}) {
  const t = useT();
  const cells = getMonthCells(month, weekStartsOn, showOutsideDays);
  const weeks = Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) => cells.slice(index * 7, index * 7 + 7));
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(new Date(2026, 0, 4), (index + weekStartsOn) % 7);
    return getWeekdayLabel(date, locale);
  });

  return (
    <section className={styles.month} aria-label={getMonthLabel(month, locale)} data-month={monthKey(month)}>
      {showMonthLabel ? <div className={styles.monthLabel}>{getMonthLabel(month, locale)}</div> : null}
      <div className={styles.weekdays} role="row">
        {showWeekNumber ? (
          <div className={joinClasses(styles.weekday, styles.weekNumberColumn)} role="columnheader">
            {t('Week')}
          </div>
        ) : null}
        {weekdays.map((weekday) => (
          <div key={weekday} className={styles.weekday} role="columnheader">
            {weekday}
          </div>
        ))}
      </div>
      <div className={styles.grid} role="grid" aria-label={getMonthLabel(month, locale)}>
        {weeks.map((week, weekIndex) => {
          const weekDate = week.find((date): date is Date => Boolean(date));
          return (
            <div key={`${monthKey(month)}-week-${weekIndex}`} className={styles.week} role="row">
              {showWeekNumber ? (
                <div className={joinClasses(styles.weekNumber, styles.weekNumberColumn)} role="gridcell">
                  {weekDate ? getIsoWeekNumber(weekDate) : ''}
                </div>
              ) : null}
              {week.map((date, dayIndex) => {
                if (!date) {
                  return <div key={`${weekIndex}-${dayIndex}`} className={styles.dayCell} role="gridcell" aria-hidden="true" />;
                }

                const key = dateKey(date);
                const modifiers = getDayModifiers(date, month);
                const customClassName = typeof getDayClassName === 'function' ? getDayClassName(date, modifiers) : getDayClassName;
                const labelParts = [getDateLabel(date, locale)];
                if (modifiers.selected) labelParts.push(t('selected'));
                if (modifiers.today) labelParts.push(t('today'));
                if (modifiers.disabled) labelParts.push(t('unavailable'));
                if (modifiers.rangeMiddle) labelParts.push(t('within selected range'));

                return (
                  <div
                    key={key}
                    className={styles.dayCell}
                    role="gridcell"
                    aria-selected={modifiers.selected}
                    data-outside={modifiers.outside ? 'true' : undefined}
                    data-range-middle={modifiers.rangeMiddle ? 'true' : undefined}
                  >
                    <Button
                      ref={(node) => setDayRef(key, node)}
                      variant="ghost"
                      size="icon"
                      className={joinClasses(styles.dayButton, customClassName)}
                      tabIndex={focusTargetKey === key ? 0 : -1}
                      disabled={modifiers.disabled}
                      aria-label={labelParts.join(', ')}
                      aria-current={modifiers.today ? 'date' : undefined}
                      aria-pressed={mode === 'range' ? undefined : modifiers.selected}
                      data-day={key}
                      data-outside={modifiers.outside ? 'true' : undefined}
                      data-selected={modifiers.selected ? 'true' : undefined}
                      data-today={modifiers.today ? 'true' : undefined}
                      data-range-start={modifiers.rangeStart ? 'true' : undefined}
                      data-range-middle={modifiers.rangeMiddle ? 'true' : undefined}
                      data-range-end={modifiers.rangeEnd ? 'true' : undefined}
                      data-focused={isSameDay(focusedDate, date) ? 'true' : undefined}
                      onClick={() => onDayClick(date)}
                      onFocus={() => onDayFocus(date)}
                      onKeyDown={(event) => onDayKeyDown(event, date)}
                    >
                      {renderDay ? renderDay(date, modifiers) : <span>{date.getDate()}</span>}
                    </Button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Calendar({
  className,
  mode = 'single',
  month,
  defaultMonth,
  onMonthChange,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  minDate,
  maxDate,
  showOutsideDays = true,
  showWeekNumber = false,
  captionLayout = 'label',
  navigation = 'split',
  numberOfMonths = 1,
  locale = 'en-US',
  weekStartsOn = 0,
  fromYear,
  toYear,
  today: todayProp,
  showTodayButton = false,
  todayLabel,
  readOnly = false,
  loading = false,
  renderDay,
  getDayClassName,
  'aria-label': ariaLabel,
  ...props
}: CalendarProps) {
  const t = useT();
  const resolvedTodayLabel = todayLabel ?? t('Today');
  const resolvedAriaLabel = ariaLabel ?? t('Calendar');
  const today = useMemo(() => startOfDay(todayProp ?? new Date()), [todayProp]);
  const monthCount = Math.max(1, Math.min(3, numberOfMonths));
  const initialMonth = startOfMonth(month ?? defaultMonth ?? firstDateFromSelection(defaultSelected) ?? today);
  const [internalMonth, setInternalMonth] = useState(initialMonth);
  const [internalSelection, setInternalSelection] = useState<CalendarSelection>(defaultSelected);
  const activeMonth = startOfMonth(month ?? internalMonth);
  const selection = selected !== undefined ? selected : internalSelection;
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());
  const focusRequestRef = useRef(false);

  const isDateDisabled = (date: Date) => {
    const normalizedDate = startOfDay(date);
    if (minDate && isBeforeDay(normalizedDate, minDate)) return true;
    if (maxDate && isAfterDay(normalizedDate, maxDate)) return true;

    const matchers = disabled ? (Array.isArray(disabled) ? disabled : [disabled]) : [];
    return matchers.some((matcher) => matchesDateMatcher(matcher, normalizedDate));
  };

  const minNavigationMonth = useMemo(() => {
    const candidates: Date[] = [];
    if (fromYear !== undefined) candidates.push(new Date(fromYear, 0, 1));
    if (minDate) candidates.push(startOfMonth(minDate));
    return candidates.length ? candidates.reduce((min, value) => (value < min ? value : min)) : undefined;
  }, [fromYear, minDate]);

  const maxNavigationMonth = useMemo(() => {
    const candidates: Date[] = [];
    if (toYear !== undefined) candidates.push(new Date(toYear, 11, 1));
    if (maxDate) candidates.push(startOfMonth(maxDate));
    return candidates.length ? candidates.reduce((max, value) => (value > max ? value : max)) : undefined;
  }, [maxDate, toYear]);

  const canNavigateTo = (nextMonth: Date) => {
    const next = startOfMonth(nextMonth);
    const lastVisibleMonth = addMonths(next, monthCount - 1);
    if (minNavigationMonth && isBeforeDay(next, minNavigationMonth)) return false;
    if (maxNavigationMonth && isAfterDay(lastVisibleMonth, maxNavigationMonth)) return false;
    return true;
  };

  const updateMonth = (nextMonth: Date) => {
    const next = startOfMonth(nextMonth);
    if (!canNavigateTo(next)) return false;
    if (month === undefined) setInternalMonth(next);
    onMonthChange?.(next);
    return true;
  };

  const visibleMonths = useMemo(
    () => Array.from({ length: monthCount }, (_, index) => addMonths(activeMonth, index)),
    [activeMonth, monthCount],
  );

  const visibleDates = useMemo(
    () => visibleMonths.flatMap((visibleMonth) => getMonthCells(visibleMonth, weekStartsOn, showOutsideDays).filter(Boolean) as Date[]),
    [showOutsideDays, visibleMonths, weekStartsOn],
  );

  const isVisibleDate = (date: Date) => visibleDates.some((visibleDate) => isSameDay(visibleDate, date));

  const [focusedDate, setFocusedDate] = useState(() =>
    getInitialFocus(activeMonth, selection, today, isDateDisabled, weekStartsOn),
  );

  const focusTargetKey = isVisibleDate(focusedDate)
    ? dateKey(focusedDate)
    : visibleDates.find((date) => !isDateDisabled(date))
      ? dateKey(visibleDates.find((date) => !isDateDisabled(date)) as Date)
      : undefined;

  useEffect(() => {
    if (!focusRequestRef.current || !focusTargetKey) return;
    dayRefs.current.get(focusTargetKey)?.focus();
    focusRequestRef.current = false;
  }, [focusTargetKey, visibleMonths]);

  const getDayModifiers = (date: Date, monthForDay: Date): CalendarDayModifiers => {
    const rangeModifiers = getRangeModifiers(selection, date);
    return {
      outside: date.getMonth() !== monthForDay.getMonth() || date.getFullYear() !== monthForDay.getFullYear(),
      today: isSameDay(date, today),
      selected: selectionContainsDate(selection, mode, date),
      disabled: isDateDisabled(date),
      focused: isSameDay(date, focusedDate),
      ...rangeModifiers,
    };
  };

  const handleSelection = (date: Date) => {
    if (readOnly || isDateDisabled(date)) return;

    let nextSelection: CalendarSelection;
    if (mode === 'single') {
      nextSelection = date;
    } else if (mode === 'multiple') {
      const current = Array.isArray(selection) ? selection : [];
      nextSelection = current.some((selectedDate) => isSameDay(selectedDate, date))
        ? current.filter((selectedDate) => !isSameDay(selectedDate, date))
        : [...current, date];
    } else {
      const currentRange = selection && !Array.isArray(selection) && !(selection instanceof Date) ? selection : undefined;
      if (!currentRange?.from || currentRange.to) {
        nextSelection = { from: date };
      } else if (isBeforeDay(date, currentRange.from)) {
        nextSelection = { from: date, to: currentRange.from };
      } else {
        nextSelection = { from: currentRange.from, to: date };
      }
    }

    if (selected === undefined) setInternalSelection(nextSelection);
    onSelect?.(nextSelection, date);
    setFocusedDate(date);
    focusRequestRef.current = true;
    if (date.getMonth() !== activeMonth.getMonth() || date.getFullYear() !== activeMonth.getFullYear()) {
      updateMonth(startOfMonth(date));
    }
  };

  const moveFocus = (date: Date, amount: number) => {
    let candidate = addDays(date, amount);
    let attempts = 0;
    while (isDateDisabled(candidate) && attempts < 366) {
      candidate = addDays(candidate, amount >= 0 ? 1 : -1);
      attempts += 1;
    }
    if (attempts >= 366) return;

    if (!isVisibleDate(candidate)) {
      const nextMonth = startOfMonth(candidate);
      if (!updateMonth(nextMonth)) return;
    }
    setFocusedDate(candidate);
    focusRequestRef.current = true;
  };

  const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveFocus(date, -1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocus(date, 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(date, -7);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(date, 7);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const weekStart = getWeekStart(date, weekStartsOn);
      moveFocus(date, (event.key === 'Home' ? 0 : 6) - ((date.getDay() - weekStartsOn + 7) % 7));
      if (event.key === 'Home' && !isDateDisabled(weekStart)) {
        setFocusedDate(weekStart);
        focusRequestRef.current = true;
      }
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const amount = event.shiftKey ? 12 : 1;
      const nextMonth = addMonths(date, event.key === 'PageUp' ? -amount : amount);
      if (!updateMonth(nextMonth)) return;
      const nextDate = clampToMonth(date, nextMonth);
      setFocusedDate(nextDate);
      focusRequestRef.current = true;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelection(date);
    }
  };

  const yearStart = fromYear ?? minDate?.getFullYear() ?? activeMonth.getFullYear() - 10;
  const yearEnd = toYear ?? maxDate?.getFullYear() ?? activeMonth.getFullYear() + 10;
  const yearOptions = Array.from({ length: Math.max(1, yearEnd - yearStart + 1) }, (_, index) => yearStart + index);
  const monthOptions = Array.from({ length: 12 }, (_, index) => index);

  const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextMonth = new Date(activeMonth.getFullYear(), Number(event.target.value), 1);
    updateMonth(nextMonth);
  };

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextMonth = new Date(Number(event.target.value), activeMonth.getMonth(), 1);
    updateMonth(nextMonth);
  };

  const firstVisibleMonth = visibleMonths[0];
  const previousMonth = addMonths(firstVisibleMonth, -1);
  const nextMonth = addMonths(firstVisibleMonth, 1);
  const hasPreviousMonth = canNavigateTo(previousMonth);
  const hasNextMonth = canNavigateTo(nextMonth);

  return (
    <div
      {...props}
      className={joinClasses(styles.calendar, className)}
      data-slot="calendar"
      data-caption-layout={captionLayout}
      data-navigation={navigation}
      data-month-count={monthCount}
      data-read-only={readOnly ? 'true' : undefined}
      aria-label={resolvedAriaLabel}
      aria-busy={loading || undefined}
      aria-readonly={readOnly || undefined}
    >
      <div className={styles.header}>
        <div className={styles.caption}>
          {captionLayout === 'label' ? (
            <span className={styles.captionLabel}>{getMonthLabel(firstVisibleMonth, locale)}</span>
          ) : (
            <>
              {captionLayout === 'dropdown' ? (
                <label className={styles.selectLabel}>
                  <span className={styles.visuallyHidden}>{t('Month')}</span>
                  <select value={firstVisibleMonth.getMonth()} onChange={handleMonthSelect} aria-label={t('Month')}>
                    {monthOptions.map((monthIndex) => (
                      <option key={monthIndex} value={monthIndex}>
                        {new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2026, monthIndex, 1))}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className={styles.selectIcon} aria-hidden="true" />
                </label>
              ) : (
                <span className={styles.captionLabel}>
                  {new Intl.DateTimeFormat(locale, { month: 'long' }).format(firstVisibleMonth)}
                </span>
              )}
              <label className={styles.selectLabel}>
                <span className={styles.visuallyHidden}>{t('Year')}</span>
                <select value={firstVisibleMonth.getFullYear()} onChange={handleYearSelect} aria-label={t('Year')}>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className={styles.selectIcon} aria-hidden="true" />
              </label>
            </>
          )}
        </div>
        <div className={styles.navigation}>
          <IconButton
            aria-label={t('Previous month')}
            variant="tertiary"
            className={styles.navigationButton}
            disabled={!hasPreviousMonth || loading}
            onClick={() => updateMonth(previousMonth)}
          >
            <ChevronLeftIcon aria-hidden="true" />
          </IconButton>
          <IconButton
            aria-label={t('Next month')}
            variant="tertiary"
            className={styles.navigationButton}
            disabled={!hasNextMonth || loading}
            onClick={() => updateMonth(nextMonth)}
          >
            <ChevronRightIcon aria-hidden="true" />
          </IconButton>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState} role="status" aria-live="polite">
          <SpinnerGapIcon className={styles.loadingIcon} aria-hidden="true" />
          <span>{t('Loading dates')}</span>
        </div>
      ) : (
        <div className={styles.months}>
          {visibleMonths.map((visibleMonth, monthIndex) => (
            <CalendarMonth
              key={monthKey(visibleMonth)}
              month={visibleMonth}
              showMonthLabel={monthIndex > 0}
              locale={locale}
              weekStartsOn={weekStartsOn}
              showOutsideDays={showOutsideDays}
              showWeekNumber={showWeekNumber}
              focusedDate={focusedDate}
              focusTargetKey={focusTargetKey}
              mode={mode}
              getDayModifiers={getDayModifiers}
              getDayClassName={getDayClassName}
              renderDay={renderDay}
              onDayClick={handleSelection}
              onDayKeyDown={handleDayKeyDown}
              onDayFocus={setFocusedDate}
              setDayRef={(key, node) => {
                if (node) dayRefs.current.set(key, node);
                else dayRefs.current.delete(key);
              }}
            />
          ))}
        </div>
      )}

      {showTodayButton ? (
        <div className={styles.footer}>
          <Button
            variant="link"
            size="sm"
            disabled={loading}
            className={styles.todayButton}
            onClick={() => {
              if (!updateMonth(startOfMonth(today))) return;
              setFocusedDate(today);
              focusRequestRef.current = true;
            }}
          >
            {resolvedTodayLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
