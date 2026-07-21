'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useState } from 'react';

import { Button } from './button';
import { CloseIcon, ShieldIcon } from './icons';
import styles from './announcement.module.css';

export type AnnouncementProps = Omit<ComponentPropsWithoutRef<'aside'>, 'children' | 'title'> & {
  /** The short, actionable message. */
  title: ReactNode;
  /** Supporting context, when the title alone is not enough to act. */
  description?: ReactNode;
  /** A canonical Kura icon. Pass null to omit it. */
  icon?: ReactNode;
  /** Label for the single optional follow-up action. */
  actionLabel?: ReactNode;
  onAction?: () => void;
  /** Whether the person can remove this non-critical announcement. */
  dismissible?: boolean;
  /** Called after the announcement is dismissed. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss action. */
  dismissLabel?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * A compact sidebar announcement for one optional, non-critical next step.
 * Critical clinical and operational messages belong in Alert instead.
 */
export function Announcement({
  actionLabel,
  className,
  description,
  dismissible = false,
  dismissLabel = 'Dismiss announcement',
  icon = <ShieldIcon aria-hidden="true" />,
  onAction,
  onDismiss,
  title,
  ...props
}: AnnouncementProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const dismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <aside
      {...props}
      data-slot="announcement"
      className={joinClasses(styles.announcement, className)}
    >
      <div className={styles.content}>
        {icon !== null && icon !== undefined ? (
          <span className={styles.icon} aria-hidden="true">{icon}</span>
        ) : null}
        {dismissible ? (
          <button
            className={styles.dismiss}
            type="button"
            aria-label={dismissLabel}
            onClick={dismiss}
          >
            <CloseIcon aria-hidden="true" />
          </button>
        ) : null}
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      </div>
      {actionLabel ? (
        <Button className={styles.action} fullWidth size="sm" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </aside>
  );
}
