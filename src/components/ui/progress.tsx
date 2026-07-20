'use client';

import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react';

import styles from './progress.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function mergeClassName<State>(base: string, className: string | ((state: State) => string | undefined) | undefined) {
  return typeof className === 'function' ? (state: State) => joinClasses(base, className(state)) : joinClasses(base, className);
}

export type ProgressProps = Omit<ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'children'> & {
  label?: ReactNode;
  showValue?: boolean;
  size?: 'sm' | 'md';
};

export const Progress = forwardRef<ComponentRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  function Progress({ className, label, max = 100, min = 0, showValue = false, size = 'md', value, ...props }, ref) {
    const percentage = value === null ? null : Math.min(100, Math.max(0, ((value - min) / (max - min || 1)) * 100));
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={mergeClassName(styles.root, className)}
        data-size={size}
        max={max}
        min={min}
        value={value}
        {...props}
      >
        {label || showValue ? (
          <div className={styles.header}>
            {label ? <ProgressPrimitive.Label className={styles.label}>{label}</ProgressPrimitive.Label> : <span />}
            {showValue ? <ProgressPrimitive.Value className={styles.value} /> : null}
          </div>
        ) : null}
        <ProgressPrimitive.Track className={styles.track}>
          <ProgressPrimitive.Indicator
            className={styles.indicator}
            style={{ transform: percentage === null ? undefined : `translateX(-${100 - percentage}%)` }}
          />
        </ProgressPrimitive.Track>
      </ProgressPrimitive.Root>
    );
  },
);
