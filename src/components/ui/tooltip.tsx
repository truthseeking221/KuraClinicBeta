'use client';

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './tooltip.module.css';

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

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;

export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;

export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      {...props}
      className={mergeClassName<TooltipPrimitive.Trigger.State>(styles.trigger, className)}
      data-slot="tooltip-trigger"
    />
  );
}

export type TooltipContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup> & {
  align?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner>['align'];
  alignOffset?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner>['alignOffset'];
  side?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner>['side'];
  sideOffset?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner>['sideOffset'];
};

export function TooltipContent({
  align = 'center',
  alignOffset,
  children,
  className,
  role = 'tooltip',
  side = 'top',
  sideOffset = 8,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className={styles.positioner}
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          {...props}
          className={mergeClassName<TooltipPrimitive.Popup.State>(styles.popup, className)}
          data-slot="tooltip-content"
          role={role}
        >
          {children}
          <TooltipPrimitive.Arrow className={styles.arrow} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
