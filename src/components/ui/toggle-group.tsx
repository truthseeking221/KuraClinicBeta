'use client';

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { createContext, useContext } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import type { ToggleSize, ToggleVariant } from './toggle';
import styles from './toggle-group.module.css';

type ToggleGroupStyleContextValue = {
  size: ToggleSize;
  variant: ToggleVariant;
};

const ToggleGroupStyleContext = createContext<ToggleGroupStyleContextValue>({
  size: 'md',
  variant: 'default',
});

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

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive> & {
  size?: ToggleSize;
  variant?: ToggleVariant;
};

export function ToggleGroup({
  children,
  className,
  size = 'md',
  variant = 'default',
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupStyleContext.Provider value={{ size, variant }}>
      <ToggleGroupPrimitive
        {...props}
        className={mergeClassName<ToggleGroupPrimitive.State>(styles.group, className)}
        data-size={size}
        data-slot="toggle-group"
        data-variant={variant}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupStyleContext.Provider>
  );
}

export type ToggleGroupItemProps = ComponentPropsWithoutRef<typeof TogglePrimitive>;

export function ToggleGroupItem({ className, ...props }: ToggleGroupItemProps) {
  const { size, variant } = useContext(ToggleGroupStyleContext);

  return (
    <TogglePrimitive
      {...props}
      className={mergeClassName<TogglePrimitive.State>(styles.item, className)}
      data-size={size}
      data-slot="toggle-group-item"
      data-variant={variant}
    />
  );
}
