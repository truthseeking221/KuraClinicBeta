'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './tabs.module.css';

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

export type TabsAppearance = 'underline' | 'subtle';

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  appearance?: TabsAppearance;
};

export function Tabs({ appearance = 'underline', className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      {...props}
      className={mergeClassName<TabsPrimitive.Root.State>(styles.root, className)}
      data-appearance={appearance}
      data-slot="tabs"
    />
  );
}

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      {...props}
      className={mergeClassName<TabsPrimitive.List.State>(styles.list, className)}
      data-slot="tabs-list"
    >
      {children}
      <TabsPrimitive.Indicator className={styles.indicator} />
    </TabsPrimitive.List>
  );
}

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Tab>;

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Tab
      {...props}
      className={mergeClassName<TabsPrimitive.Tab.State>(styles.trigger, className)}
      data-slot="tabs-trigger"
    />
  );
}

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Panel>;

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      {...props}
      className={mergeClassName<TabsPrimitive.Panel.State>(styles.content, className)}
      data-slot="tabs-content"
    />
  );
}
