'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react';

import { ChevronDownIcon } from './icons';
import styles from './collapsible.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/** A single disclosure region for optional or secondary detail. */
export type CollapsibleProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;

export const Collapsible = forwardRef<ComponentRef<typeof CollapsiblePrimitive.Root>, CollapsibleProps>(
  function Collapsible({ className, ...props }, ref) {
    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        data-slot="collapsible"
        className={joinClasses(styles.root, className)}
        {...props}
      />
    );
  },
);

export type CollapsibleTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>,
  'children'
> & {
  children: ReactNode;
  /** Adds a leading Kura icon without changing the trigger's disclosure affordance. */
  leadingIcon?: ReactNode;
  /** Shows the canonical chevron affordance; disabled when `asChild` is used. */
  showChevron?: boolean;
};

export const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger(
  { asChild = false, children, className, leadingIcon, showChevron = true, ...props },
  ref,
) {
  const triggerClassName = joinClasses(styles.trigger, className);

  if (asChild) {
    return (
      <CollapsiblePrimitive.Trigger
        ref={ref}
        asChild
        data-slot="collapsible-trigger"
        className={triggerClassName}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Trigger>
    );
  }

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={triggerClassName}
      {...props}
    >
      <span className={styles.triggerLabel}>
        {leadingIcon ? (
          <span className={styles.leadingIcon} aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <span className={styles.triggerText}>{children}</span>
      </span>
      {showChevron ? <ChevronDownIcon className={styles.chevron} aria-hidden="true" /> : null}
    </CollapsiblePrimitive.Trigger>
  );
});

export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

export const CollapsibleContent = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(function CollapsibleContent({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      data-slot="collapsible-content"
      className={joinClasses(styles.content, className)}
      {...props}
    />
  );
});

