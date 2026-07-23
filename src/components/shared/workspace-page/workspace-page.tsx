import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react';

import styles from './workspace-page.module.css';

type WorkspacePageWidth = 'default' | 'reading' | 'wide' | 'full';

export type WorkspacePageProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  width?: WorkspacePageWidth;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * Canonical page canvas inside AppShell. It owns the shared content measure
 * and vertical rhythm; AppShell owns the application inset. Standalone
 * Storybook compositions retain the same inset automatically. Full-bleed
 * station surfaces opt out with `width="full"`.
 */
export function WorkspacePage<T extends ElementType = 'div'>({
  as,
  children,
  className,
  width = 'default',
  ...rest
}: WorkspacePageProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component
      className={[styles.page, className].filter(Boolean).join(' ')}
      data-slot="workspace-page"
      data-width={width}
      {...rest}
    >
      {children}
    </Component>
  );
}

export type WorkspacePageHeaderProps = Omit<
  ComponentPropsWithoutRef<'header'>,
  'title'
> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  headingId?: string;
  headingLevel?: 'h1' | 'h2';
};

/** Context first, then one action group. The header never becomes a hero. */
export function WorkspacePageHeader({
  actions,
  className,
  description,
  headingId,
  headingLevel: Heading = 'h1',
  title,
  ...rest
}: WorkspacePageHeaderProps) {
  return (
    <header
      className={[styles.header, className].filter(Boolean).join(' ')}
      data-slot="workspace-page-header"
      {...rest}
    >
      <div className={styles.heading}>
        <Heading className={styles.title} id={headingId}>
          {title}
        </Heading>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}

export type WorkspaceSectionHeaderProps = Omit<
  ComponentPropsWithoutRef<'header'>,
  'title'
> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  headingId?: string;
};

export function WorkspaceSectionHeader({
  actions,
  className,
  description,
  headingId,
  title,
  ...rest
}: WorkspaceSectionHeaderProps) {
  return (
    <header
      className={[styles.sectionHeader, className].filter(Boolean).join(' ')}
      data-slot="workspace-section-header"
      {...rest}
    >
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle} id={headingId}>
          {title}
        </h2>
        {description ? (
          <p className={styles.sectionDescription}>{description}</p>
        ) : null}
      </div>
      {actions ? <div className={styles.sectionActions}>{actions}</div> : null}
    </header>
  );
}

export function WorkspaceMetricGrid({
  className,
  role = 'list',
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={[styles.metricGrid, className].filter(Boolean).join(' ')}
      data-slot="workspace-metric-grid"
      role={role}
      {...rest}
    />
  );
}

export function WorkspaceSplit({
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={[styles.split, className].filter(Boolean).join(' ')}
      data-slot="workspace-split"
      {...rest}
    />
  );
}
