'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';

import styles from './popover.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/**
 * An anchored, non-modal disclosure surface for a short, reversible task.
 * Use Dialog when the task needs a dedicated mobile surface or focus containment.
 */
export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}

export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(function PopoverTrigger(props, ref) {
  return <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />;
});

export type PopoverContentProps = Omit<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Popup>,
  'className'
> & {
  className?: string;
  side?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>['side'];
  align?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>['align'];
  sideOffset?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>['sideOffset'];
};

export const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Popup>,
  PopoverContentProps
>(function PopoverContent({ align = 'start', className, side = 'bottom', sideOffset, ...props }, ref) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        className={styles.positioner}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          ref={ref}
          data-slot="popover-content"
          className={joinClasses(styles.content, className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
});

export type PopoverTitleProps = Omit<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Title>,
  'className'
> & {
  className?: string;
};

export const PopoverTitle = forwardRef<ComponentRef<typeof PopoverPrimitive.Title>, PopoverTitleProps>(
  function PopoverTitle({ className, ...props }, ref) {
    return (
      <PopoverPrimitive.Title
        ref={ref}
        data-slot="popover-title"
        className={joinClasses(styles.title, className)}
        {...props}
      />
    );
  },
);

export type PopoverDescriptionProps = Omit<
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Description>,
  'className'
> & {
  className?: string;
};

export const PopoverDescription = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Description>,
  PopoverDescriptionProps
>(function PopoverDescription({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      data-slot="popover-description"
      className={joinClasses(styles.description, className)}
      {...props}
    />
  );
});
