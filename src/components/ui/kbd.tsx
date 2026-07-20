import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './kbd.module.css';

export type KbdProps = ComponentPropsWithoutRef<'kbd'> & {
  children: ReactNode;
};

export type KbdGroupProps = ComponentPropsWithoutRef<'span'> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/** Keyboard shortcut hint. Purely informative — never the only path to an action. */
export function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <kbd {...props} className={joinClasses(styles.kbd, className)} data-slot="kbd">
      {children}
    </kbd>
  );
}

/** Keeps the keys in one shortcut visually grouped while preserving each semantic key. */
export function KbdGroup({ children, className, ...props }: KbdGroupProps) {
  return (
    <span {...props} className={joinClasses(styles.group, className)} data-slot="kbd-group">
      {children}
    </span>
  );
}
