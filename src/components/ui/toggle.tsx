'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './toggle.module.css';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'md' | 'lg';

export type ToggleProps = ComponentPropsWithoutRef<typeof TogglePrimitive> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
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

export function Toggle({ className, size = 'md', variant = 'default', ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      {...props}
      className={mergeClassName<TogglePrimitive.State>(styles.toggle, className)}
      data-size={size}
      data-slot="toggle"
      data-variant={variant}
    />
  );
}
