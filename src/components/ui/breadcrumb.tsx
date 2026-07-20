import { cloneElement, isValidElement } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { ChevronRightIcon, DotsThreeIcon } from './icons';
import styles from './breadcrumb.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type BreadcrumbProps = Omit<ComponentPropsWithoutRef<'nav'>, 'aria-label'> & {
  /** Accessible name for the navigation landmark. */
  label?: string;
  'aria-label'?: string;
};

export function Breadcrumb({ label, 'aria-label': ariaLabel, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      {...props}
      aria-label={ariaLabel ?? label ?? 'Breadcrumb'}
      data-slot="breadcrumb"
      className={joinClasses(styles.nav, className)}
    />
  );
}

export type BreadcrumbListProps = ComponentPropsWithoutRef<'ol'>;

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      {...props}
      data-slot="breadcrumb-list"
      className={joinClasses(styles.list, className)}
    />
  );
}

export type BreadcrumbItemProps = ComponentPropsWithoutRef<'li'>;

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      {...props}
      data-slot="breadcrumb-item"
      className={joinClasses(styles.item, className)}
    />
  );
}

export type BreadcrumbLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  /** Composes the link styling onto one child, such as a framework Link. */
  asChild?: boolean;
  children?: ReactNode;
};

export function BreadcrumbLink({
  asChild = false,
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('BreadcrumbLink with asChild requires one element child.');
    }

    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props as { className?: string };
    return cloneElement(child, {
      ...props,
      'data-slot': 'breadcrumb-link',
      className: joinClasses(styles.link, childProps.className, className),
    } as Record<string, unknown>);
  }

  return (
    <a
      {...props}
      data-slot="breadcrumb-link"
      className={joinClasses(styles.link, className)}
    >
      {children}
    </a>
  );
}

export type BreadcrumbPageProps = Omit<ComponentPropsWithoutRef<'span'>, 'aria-current'>;

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      {...props}
      data-slot="breadcrumb-page"
      aria-current="page"
      className={joinClasses(styles.page, className)}
    />
  );
}

export type BreadcrumbSeparatorProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'children' | 'role' | 'aria-hidden'
> & {
  children?: ReactNode;
};

export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      {...props}
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={joinClasses(styles.separator, className)}
    >
      {children ?? <ChevronRightIcon aria-hidden="true" />}
    </li>
  );
}

export type BreadcrumbEllipsisProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children' | 'role' | 'aria-hidden'
>;

export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      {...props}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={joinClasses(styles.ellipsis, className)}
    >
      <DotsThreeIcon aria-hidden="true" />
      <span className={styles.srOnly}>More breadcrumb levels</span>
    </span>
  );
}
