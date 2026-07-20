'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './hover-card.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type HoverCardProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;

export function HoverCard({ closeDelay = 160, openDelay = 260, ...props }: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      {...props}
      closeDelay={closeDelay}
      openDelay={openDelay}
    />
  );
}

export type HoverCardTriggerProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;

export function HoverCardTrigger(props: HoverCardTriggerProps) {
  return <HoverCardPrimitive.Trigger {...props} data-slot="hover-card-trigger" />;
}

export type HoverCardContentProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
  size?: 'sm' | 'md' | 'lg';
};

export function HoverCardContent({
  align = 'center',
  className,
  sideOffset = 8,
  size = 'md',
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        {...props}
        align={align}
        className={joinClasses(styles.content, styles[size], className)}
        data-slot="hover-card-content"
        sideOffset={sideOffset}
      />
    </HoverCardPrimitive.Portal>
  );
}
