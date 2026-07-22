'use client';

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
} from 'react';

import { CheckIcon } from './icons';
import styles from './stepper.module.css';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperMode = 'interactive' | 'status';
export type StepState = 'active' | 'completed' | 'inactive' | 'loading';

export type StepIndicators = {
  active?: ReactNode;
  completed?: ReactNode;
  inactive?: ReactNode;
  loading?: ReactNode;
};

type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  stepsCount: number;
  mode: StepperMode;
  orientation: StepperOrientation;
  registerTrigger: (node: HTMLButtonElement | null) => void;
  triggerNodes: HTMLButtonElement[];
  focusNext: (currentIndex: number) => void;
  focusPrev: (currentIndex: number) => void;
  focusFirst: () => void;
  focusLast: () => void;
  indicators: StepIndicators;
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

const StepperContext = createContext<StepperContextValue | undefined>(undefined);
const StepItemContext = createContext<StepItemContextValue | undefined>(undefined);

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) throw new Error('useStepper must be used within <Stepper>.');
  return context;
}

export function useStepItem() {
  const context = useContext(StepItemContext);
  if (!context) throw new Error('useStepItem must be used within <StepperItem>.');
  return context;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type StepperProps = HTMLAttributes<HTMLDivElement> & {
  /** The step index to start with (uncontrolled). Steps are 1-indexed. */
  defaultValue?: number;
  /** The current active step index (controlled). */
  value?: number;
  onValueChange?: (value: number) => void;
  /** Interactive tab control or read-only ordered progress. */
  mode?: StepperMode;
  orientation?: StepperOrientation;
  /** Custom indicator content per step state. */
  indicators?: StepIndicators;
};

export function Stepper({
  children,
  className,
  defaultValue = 1,
  indicators = {},
  mode = 'interactive',
  onValueChange,
  orientation = 'horizontal',
  value,
  ...props
}: StepperProps) {
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultValue);
  const [triggerNodes, setTriggerNodes] = useState<HTMLButtonElement[]>([]);

  const registerTrigger = useCallback((node: HTMLButtonElement | null) => {
    setTriggerNodes((previous) => {
      if (node && !previous.includes(node)) {
        return [...previous, node];
      }
      if (!node) {
        return previous.filter((existing) => existing.isConnected);
      }
      return previous;
    });
  }, []);

  const setActiveStep = useCallback(
    (step: number) => {
      if (value === undefined) {
        setUncontrolledStep(step);
      }
      onValueChange?.(step);
    },
    [onValueChange, value],
  );

  const activeStep = value ?? uncontrolledStep;

  const focusTrigger = useCallback(
    (index: number) => {
      triggerNodes[index]?.focus();
    },
    [triggerNodes],
  );

  const contextValue = useMemo<StepperContextValue>(
    () => ({
      activeStep,
      setActiveStep,
      stepsCount: Children.toArray(children).filter(
        (child): child is ReactElement =>
          isValidElement(child) && child.type === StepperItem,
      ).length,
      mode,
      orientation,
      registerTrigger,
      triggerNodes,
      focusNext: (index) => focusTrigger((index + 1) % triggerNodes.length),
      focusPrev: (index) => focusTrigger((index - 1 + triggerNodes.length) % triggerNodes.length),
      focusFirst: () => focusTrigger(0),
      focusLast: () => focusTrigger(triggerNodes.length - 1),
      indicators,
    }),
    [
      activeStep,
      children,
      focusTrigger,
      indicators,
      mode,
      orientation,
      registerTrigger,
      setActiveStep,
      triggerNodes,
    ],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        {...props}
        aria-orientation={mode === 'interactive' ? orientation : undefined}
        className={joinClasses(styles.stepper, className)}
        data-mode={mode}
        data-orientation={orientation}
        data-slot="stepper"
        role={mode === 'interactive' ? 'tablist' : undefined}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

export type StepperItemProps = HTMLAttributes<HTMLElement> & {
  /** 1-indexed step position. */
  step: number;
  /** Mark completed regardless of position, e.g. a skipped optional step. */
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export function StepperItem({
  children,
  className,
  completed = false,
  disabled = false,
  loading = false,
  step,
  ...props
}: StepperItemProps) {
  const { activeStep, mode } = useStepper();

  const state: StepState =
    completed || step < activeStep ? 'completed' : activeStep === step ? 'active' : 'inactive';
  const isLoading = loading && step === activeStep;

  const itemValue = useMemo(
    () => ({ step, state, isDisabled: disabled, isLoading }),
    [disabled, isLoading, state, step],
  );

  const sharedProps = {
    ...props,
    className: joinClasses(styles.item, className),
    'data-loading': isLoading ? 'true' : undefined,
    'data-slot': 'stepper-item',
    'data-state': state,
  };

  return (
    <StepItemContext.Provider value={itemValue}>
      {mode === 'status' ? (
        <li {...sharedProps}>{children}</li>
      ) : (
        <div {...sharedProps}>{children}</div>
      )}
    </StepItemContext.Provider>
  );
}

export type StepperTriggerProps = ComponentPropsWithoutRef<'button'> & {
  /** Render children as static content, e.g. inside a read-only summary. */
  asChild?: boolean;
};

export function StepperTrigger({
  asChild = false,
  children,
  className,
  tabIndex,
  ...props
}: StepperTriggerProps) {
  const { isDisabled, isLoading, state, step } = useStepItem();
  const {
    activeStep,
    focusFirst,
    focusLast,
    focusNext,
    focusPrev,
    mode,
    registerTrigger,
    setActiveStep,
    triggerNodes,
  } = useStepper();
  const isSelected = activeStep === step;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mode === 'status') return;
    registerTrigger(buttonRef.current);
    return () => registerTrigger(null);
  }, [mode, registerTrigger]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const triggerIndex = triggerNodes.findIndex((node) => node === event.currentTarget);

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        if (triggerIndex !== -1) focusNext(triggerIndex);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (triggerIndex !== -1) focusPrev(triggerIndex);
        break;
      case 'Home':
        event.preventDefault();
        focusFirst();
        break;
      case 'End':
        event.preventDefault();
        focusLast();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setActiveStep(step);
        break;
    }
  }

  if (asChild || mode === 'status') {
    return (
      <span
        aria-current={state === 'active' ? 'step' : undefined}
        className={joinClasses(styles.trigger, className)}
        data-loading={isLoading ? 'true' : undefined}
        data-slot="stepper-trigger"
        data-state={state}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      {...props}
      ref={buttonRef}
      aria-controls={`stepper-panel-${step}`}
      aria-selected={isSelected}
      className={joinClasses(styles.trigger, className)}
      data-loading={isLoading ? 'true' : undefined}
      data-slot="stepper-trigger"
      data-state={state}
      disabled={isDisabled}
      id={`stepper-tab-${step}`}
      onClick={() => setActiveStep(step)}
      onKeyDown={handleKeyDown}
      role="tab"
      tabIndex={typeof tabIndex === 'number' ? tabIndex : isSelected ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
}

export type StepperIndicatorProps = ComponentPropsWithoutRef<'div'>;

export function StepperIndicator({ children, className, ...props }: StepperIndicatorProps) {
  const { isLoading, state } = useStepItem();
  const { indicators } = useStepper();

  const custom = isLoading
    ? indicators.loading
    : state === 'completed'
      ? indicators.completed
      : state === 'active'
        ? indicators.active
        : indicators.inactive;

  // Completed steps read as "done", not as another number: a light check
  // replaces the digit unless the consumer supplies its own indicator.
  const content =
    custom ??
    (state === 'completed' && !isLoading ? (
      <>
        <CheckIcon aria-hidden="true" className={styles.indicatorCheck} />
        <span className={styles.srOnly}>Done</span>
      </>
    ) : (
      children
    ));

  return (
    <div
      {...props}
      className={joinClasses(styles.indicator, className)}
      data-slot="stepper-indicator"
      data-state={isLoading ? 'loading' : state}
    >
      {content}
    </div>
  );
}

export type StepperSeparatorProps = ComponentPropsWithoutRef<'div'>;

export function StepperSeparator({ className, ...props }: StepperSeparatorProps) {
  const { state } = useStepItem();

  return (
    <div
      {...props}
      aria-hidden="true"
      className={joinClasses(styles.separator, className)}
      data-slot="stepper-separator"
      data-state={state}
    />
  );
}

export type StepperTitleProps = ComponentPropsWithoutRef<'h3'>;

export function StepperTitle({ children, className, ...props }: StepperTitleProps) {
  const { state } = useStepItem();

  return (
    <h3
      {...props}
      className={joinClasses(styles.title, className)}
      data-slot="stepper-title"
      data-state={state}
    >
      {children}
    </h3>
  );
}

export type StepperDescriptionProps = ComponentPropsWithoutRef<'div'>;

export function StepperDescription({ children, className, ...props }: StepperDescriptionProps) {
  const { state } = useStepItem();

  return (
    <div
      {...props}
      className={joinClasses(styles.description, className)}
      data-slot="stepper-description"
      data-state={state}
    >
      {children}
    </div>
  );
}

export type StepperNavProps = HTMLAttributes<HTMLElement>;

export function StepperNav({ children, className, ...props }: StepperNavProps) {
  const { mode, orientation } = useStepper();

  const sharedProps = {
    ...props,
    className: joinClasses(styles.nav, className),
    'data-orientation': orientation,
    'data-slot': 'stepper-nav',
  };

  return mode === 'status' ? (
    <ol {...sharedProps}>{children}</ol>
  ) : (
    <nav {...sharedProps}>{children}</nav>
  );
}

export type StepperPanelProps = ComponentPropsWithoutRef<'div'>;

export function StepperPanel({ children, className, ...props }: StepperPanelProps) {
  return (
    <div {...props} className={joinClasses(styles.panel, className)} data-slot="stepper-panel">
      {children}
    </div>
  );
}

export type StepperContentProps = ComponentPropsWithoutRef<'div'> & {
  /** 1-indexed step this panel belongs to. */
  value: number;
  /** Keep mounted while hidden, e.g. to preserve form state across steps. */
  forceMount?: boolean;
};

export function StepperContent({
  children,
  className,
  forceMount = false,
  value,
  ...props
}: StepperContentProps) {
  const { activeStep } = useStepper();
  const isActive = value === activeStep;

  if (!forceMount && !isActive) {
    return null;
  }

  return (
    <div
      {...props}
      aria-labelledby={`stepper-tab-${value}`}
      className={joinClasses(styles.content, className)}
      data-slot="stepper-content"
      hidden={!isActive && forceMount}
      id={`stepper-panel-${value}`}
      role="tabpanel"
    >
      {children}
    </div>
  );
}
