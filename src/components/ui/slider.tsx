'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import type { ReactNode } from 'react';

import styles from './slider.module.css';

export type SliderValue = number | readonly number[];

export type SliderProps = Omit<SliderPrimitive.Root.Props<SliderValue>, 'children'> & {
  /** Visible label associated with every slider thumb. */
  label?: ReactNode;
  /** Accessible label for the field when no visible label is rendered. */
  'aria-label'?: string;
  /** Accessible labels for individual thumbs in a range slider. */
  thumbLabels?: readonly string[];
  /** Shows the formatted current value beside the label. */
  showValue?: boolean;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function mergeClassName<State>(
  baseClassName: string,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof className === 'function'
    ? (state: State) => joinClasses(baseClassName, className(state))
    : joinClasses(baseClassName, className);
}

export function Slider({
  'aria-label': ariaLabel,
  className,
  defaultValue = 0,
  label,
  orientation = 'horizontal',
  showValue = false,
  thumbLabels,
  value,
  ...props
}: SliderProps) {
  const renderedValue = value ?? defaultValue;
  const thumbCount = Array.isArray(renderedValue) ? renderedValue.length : 1;
  const fallbackLabel = ariaLabel ?? (typeof label === 'string' ? label : 'Slider');

  return (
    <SliderPrimitive.Root
      {...props}
      className={mergeClassName<SliderPrimitive.Root.State>(styles.root, className)}
      data-slot="slider"
      defaultValue={value === undefined ? defaultValue : undefined}
      orientation={orientation}
      value={value}
    >
      {label || showValue ? (
        <div className={styles.header}>
          {label ? <SliderPrimitive.Label className={styles.label}>{label}</SliderPrimitive.Label> : <span />}
          {showValue ? (
            <SliderPrimitive.Value className={styles.value}>
              {(formattedValues) => formattedValues.join(' – ')}
            </SliderPrimitive.Value>
          ) : null}
        </div>
      ) : null}
      <SliderPrimitive.Control className={styles.control}>
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Indicator className={styles.indicator} />
          {Array.from({ length: thumbCount }, (_, index) => (
            <SliderPrimitive.Thumb
              className={styles.thumb}
              getAriaLabel={() => thumbLabels?.[index] ?? (thumbCount > 1 ? `${fallbackLabel} ${index + 1}` : fallbackLabel)}
              index={index}
              key={index}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
