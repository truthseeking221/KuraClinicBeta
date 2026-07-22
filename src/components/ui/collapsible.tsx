'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { createContext, createElement, forwardRef, useContext } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react';

import { ChevronDownIcon } from './icons';
import styles from './collapsible.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * `none` removes the horizontal padding on both the trigger and the content so
 * a disclosure can share the left edge of a surrounding form grid. The root
 * publishes the choice through context, so nested disclosures keep their own.
 */
export type CollapsibleInset = 'default' | 'none';

const InsetContext = createContext<CollapsibleInset>('default');

/** A single disclosure region for optional or secondary detail. */
export type CollapsibleProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
  /** Aligns the trigger and content with a surrounding grid instead of insetting them. */
  inset?: CollapsibleInset;
};

export const Collapsible = forwardRef<ComponentRef<typeof CollapsiblePrimitive.Root>, CollapsibleProps>(
  function Collapsible({ className, inset = 'default', ...props }, ref) {
    return (
      <InsetContext.Provider value={inset}>
        <CollapsiblePrimitive.Root
          ref={ref}
          data-slot="collapsible"
          data-inset={inset}
          className={joinClasses(styles.root, className)}
          {...props}
        />
      </InsetContext.Provider>
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
  /** Secondary text beside the label, such as an optional marker or a summary of the hidden content. */
  meta?: ReactNode;
  /** Places the chevron before the label for tree-style section lists. */
  chevronPosition?: 'leading' | 'trailing';
  /**
   * Wraps the trigger in a heading so a disclosure that titles a content group
   * keeps its place in the document outline.
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Shows the canonical chevron affordance; disabled when `asChild` is used. */
  showChevron?: boolean;
};

export const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger(
  {
    asChild = false,
    children,
    chevronPosition = 'trailing',
    className,
    headingLevel,
    leadingIcon,
    meta,
    showChevron = true,
    ...props
  },
  ref,
) {
  const inset = useContext(InsetContext);
  const triggerClassName = joinClasses(styles.trigger, className);

  function withHeading(trigger: ReactNode) {
    if (!headingLevel) return trigger;
    return createElement(`h${headingLevel}`, { className: styles.triggerHeading }, trigger);
  }

  if (asChild) {
    return withHeading(
      <CollapsiblePrimitive.Trigger
        ref={ref}
        asChild
        data-slot="collapsible-trigger"
        data-inset={inset}
        className={triggerClassName}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Trigger>,
    );
  }

  const chevron = showChevron ? (
    <ChevronDownIcon className={styles.chevron} aria-hidden="true" />
  ) : null;

  return withHeading(
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      data-inset={inset}
      data-chevron={showChevron ? chevronPosition : undefined}
      className={triggerClassName}
      {...props}
    >
      {chevronPosition === 'leading' ? chevron : null}
      <span className={styles.triggerLabel}>
        {leadingIcon ? (
          <span className={styles.leadingIcon} aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <span className={styles.triggerText} data-slot="collapsible-trigger-text">
          {children}
        </span>
        {meta ? (
          <span className={styles.triggerMeta} data-slot="collapsible-trigger-meta">
            {meta}
          </span>
        ) : null}
      </span>
      {chevronPosition === 'trailing' ? chevron : null}
    </CollapsiblePrimitive.Trigger>,
  );
});

export type CollapsibleContentProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

export const CollapsibleContent = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(function CollapsibleContent({ className, ...props }, ref) {
  const inset = useContext(InsetContext);

  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      data-slot="collapsible-content"
      data-inset={inset}
      className={joinClasses(styles.content, className)}
      {...props}
    />
  );
});
