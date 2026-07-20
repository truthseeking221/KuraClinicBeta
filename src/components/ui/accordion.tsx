'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
} from 'react';

import { ChevronDownIcon } from './icons';
import styles from './accordion.module.css';

type AccordionMode = 'single' | 'multiple';
type AccordionValue = string | readonly string[];

type AccordionContextValue = {
  mode: AccordionMode;
  collapsible: boolean;
  openValues: ReadonlySet<string>;
  toggle: (value: string) => void;
  registerTrigger: (value: string, element: HTMLButtonElement | null) => void;
  moveFocus: (value: string, direction: 'next' | 'previous' | 'first' | 'last') => void;
};

type AccordionItemContextValue = {
  value: string;
  itemId: string;
  disabled: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function normalizeValues(value: AccordionValue | undefined, mode: AccordionMode) {
  if (value === undefined) return [];

  const values = Array.isArray(value) ? [...value] : [value];
  return mode === 'single' ? values.slice(0, 1) : values;
}

export type AccordionProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange' | 'value'
> & {
  /** Single keeps one section open; multiple allows comparison across sections. */
  type?: AccordionMode;
  /** A single section may be closed when this is enabled. */
  collapsible?: boolean;
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onValueChange?: (value: string | string[]) => void;
  children?: ReactNode;
};

export function Accordion({
  type = 'single',
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const isControlled = value !== undefined;
  const [uncontrolledValues, setUncontrolledValues] = useState<string[]>(() =>
    normalizeValues(defaultValue, type),
  );
  const openValues = useMemo(
    () => new Set(normalizeValues(isControlled ? value : uncontrolledValues, type)),
    [isControlled, type, uncontrolledValues, value],
  );

  const registerTrigger = useCallback(
    (itemValue: string, element: HTMLButtonElement | null) => {
      if (element) {
        triggerRefs.current.set(itemValue, element);
      } else {
        triggerRefs.current.delete(itemValue);
      }
    },
    [],
  );

  const moveFocus = useCallback(
    (itemValue: string, direction: 'next' | 'previous' | 'first' | 'last') => {
      const values = [...triggerRefs.current.keys()];
      const currentIndex = values.indexOf(itemValue);
      if (currentIndex < 0 || values.length === 0) return;

      const nextIndex =
        direction === 'first'
          ? 0
          : direction === 'last'
            ? values.length - 1
            : direction === 'next'
              ? (currentIndex + 1) % values.length
              : (currentIndex - 1 + values.length) % values.length;

      triggerRefs.current.get(values[nextIndex])?.focus();
    },
    [],
  );

  const toggle = useCallback(
    (itemValue: string) => {
      const nextValues = new Set(openValues);

      if (type === 'single') {
        if (nextValues.has(itemValue)) {
          if (!collapsible) return;
          nextValues.clear();
        } else {
          nextValues.clear();
          nextValues.add(itemValue);
        }
      } else if (nextValues.has(itemValue)) {
        nextValues.delete(itemValue);
      } else {
        nextValues.add(itemValue);
      }

      const next = [...nextValues];
      if (!isControlled) setUncontrolledValues(next);
      onValueChange?.(type === 'single' ? next[0] ?? '' : next);
    },
    [collapsible, isControlled, onValueChange, openValues, type],
  );

  return (
    <AccordionContext.Provider
      value={{
        mode: type,
        collapsible,
        openValues,
        toggle,
        registerTrigger,
        moveFocus,
      }}
    >
      <div
        data-slot="accordion"
        data-type={type}
        className={joinClasses('flex w-full flex-col', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'value'
> & {
  value: string;
  disabled?: boolean;
  children: ReactNode;
};

export function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const accordion = useContext(AccordionContext);
  if (!accordion) throw new Error('AccordionItem must be used inside Accordion.');

  const itemId = useId().replaceAll(':', '');
  const isOpen = accordion.openValues.has(value);

  return (
    <AccordionItemContext.Provider value={{ value, itemId, disabled }}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled ? 'true' : undefined}
        className={joinClasses('border-b border-border last:border-b-0', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export type AccordionTriggerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'type' | 'id' | 'aria-controls' | 'aria-expanded'
> & {
  children: ReactNode;
};

export function AccordionTrigger({
  className,
  children,
  disabled,
  onClick,
  onKeyDown,
  ...props
}: AccordionTriggerProps) {
  const accordion = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!accordion || !item) {
    throw new Error('AccordionTrigger must be used inside AccordionItem.');
  }
  const root = accordion;
  const currentItem = item;

  const isOpen = root.openValues.has(currentItem.value);
  const triggerId = `${currentItem.itemId}-trigger`;
  const contentId = `${currentItem.itemId}-content`;
  const isDisabled = currentItem.disabled || disabled;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      root.moveFocus(currentItem.value, 'next');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      root.moveFocus(currentItem.value, 'previous');
    } else if (event.key === 'Home') {
      event.preventDefault();
      root.moveFocus(currentItem.value, 'first');
    } else if (event.key === 'End') {
      event.preventDefault();
      root.moveFocus(currentItem.value, 'last');
    }
  }

  return (
    <h3 className="flex">
      <button
        {...props}
        ref={(element) => root.registerTrigger(currentItem.value, element)}
        id={triggerId}
        type="button"
        aria-controls={contentId}
        aria-expanded={isOpen}
        disabled={isDisabled}
        data-slot="accordion-trigger"
        data-state={isOpen ? 'open' : 'closed'}
        className={joinClasses(
          styles.trigger,
          'flex flex-1 items-start justify-between gap-3 rounded-md border border-transparent text-left text-sm font-medium text-foreground outline-none transition-colors hover:text-primary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:font-semibold',
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !isDisabled) root.toggle(currentItem.value);
        }}
        onKeyDown={handleKeyDown}
      >
        <span className="min-w-0 flex-1">{children}</span>
        <ChevronDownIcon
          aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className={joinClasses(
            'mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none',
            isOpen && 'rotate-180',
          )}
        />
      </button>
    </h3>
  );
}

export type AccordionContentProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'id' | 'role' | 'aria-labelledby' | 'hidden'
> & {
  children: ReactNode;
};

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const accordion = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!accordion || !item) {
    throw new Error('AccordionContent must be used inside AccordionItem.');
  }

  const isOpen = accordion.openValues.has(item.value);
  const triggerId = `${item.itemId}-trigger`;
  const contentId = `${item.itemId}-content`;

  return (
    <div
      {...props}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!isOpen}
      data-slot="accordion-content"
      data-state={isOpen ? 'open' : 'closed'}
      className={joinClasses(
        styles.content,
        'pl-0 pr-8 text-sm leading-normal text-muted-foreground',
        className,
      )}
    >
      {children}
    </div>
  );
}
