import type { ComponentPropsWithoutRef } from 'react';

import styles from './empty-state.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type EmptyStateSurface = 'plain' | 'muted' | 'outlined';
export type EmptyStateAlign = 'center' | 'start';

export type EmptyStateProps = ComponentPropsWithoutRef<'section'> & {
  surface?: EmptyStateSurface;
  align?: EmptyStateAlign;
};

/**
 * Explains why a collection or workspace has no useful content and presents
 * the next available action. Loading and failure use their dedicated owners.
 */
export function EmptyState({
  align = 'center',
  className,
  surface = 'plain',
  ...props
}: EmptyStateProps) {
  return (
    <section
      data-slot="empty-state"
      data-align={align}
      data-surface={surface}
      className={joinClasses(styles.root, className)}
      {...props}
    />
  );
}

export type EmptyStateHeaderProps = ComponentPropsWithoutRef<'header'>;

export function EmptyStateHeader({ className, ...props }: EmptyStateHeaderProps) {
  return (
    <header
      data-slot="empty-state-header"
      className={joinClasses(styles.header, className)}
      {...props}
    />
  );
}

export type EmptyStateMediaVariant = 'default' | 'icon';
export type EmptyStateMediaProps = ComponentPropsWithoutRef<'div'> & {
  variant?: EmptyStateMediaVariant;
};

export function EmptyStateMedia({
  className,
  variant = 'default',
  ...props
}: EmptyStateMediaProps) {
  return (
    <div
      aria-hidden={props['aria-label'] ? undefined : true}
      data-slot="empty-state-media"
      data-variant={variant}
      className={joinClasses(styles.media, className)}
      {...props}
    />
  );
}

export type EmptyStateTitleProps = ComponentPropsWithoutRef<'h2'>;

export function EmptyStateTitle({ className, ...props }: EmptyStateTitleProps) {
  return (
    <h2
      data-slot="empty-state-title"
      className={joinClasses(styles.title, className)}
      {...props}
    />
  );
}

export type EmptyStateDescriptionProps = ComponentPropsWithoutRef<'p'>;

export function EmptyStateDescription({
  className,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      data-slot="empty-state-description"
      className={joinClasses(styles.description, className)}
      {...props}
    />
  );
}

export type EmptyStateContentProps = ComponentPropsWithoutRef<'div'>;

export function EmptyStateContent({ className, ...props }: EmptyStateContentProps) {
  return (
    <div
      data-slot="empty-state-content"
      className={joinClasses(styles.content, className)}
      {...props}
    />
  );
}
