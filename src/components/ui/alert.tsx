'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { IconButton } from './icon-button';
import { XIcon } from './icons';
import styles from './alert.module.css';

export type AlertTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ai'
  | 'inverse';

export type AlertProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'role'
> & {
  /** Semantic meaning of the message; tone is paired with explicit text and optional icon. */
  tone?: AlertTone;
  /** Use status for routine updates and alert for urgent user attention. */
  role?: 'alert' | 'status';
  /** Decorative leading content, preferably a canonical Kura icon. */
  icon?: ReactNode;
  /** Adds a keyboard-reachable close action; alerts are never auto-dismissed. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss action. */
  dismissLabel?: string;
  children?: ReactNode;
};

export type AlertTitleProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export type AlertDescriptionProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export type AlertActionProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const toneClassNames: Record<AlertTone, string> = {
  neutral: styles.toneNeutral,
  info: styles.toneInfo,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  ai: styles.toneAi,
  inverse: styles.toneInverse,
};

export function Alert({
  children,
  className,
  dismissLabel = 'Dismiss alert',
  icon,
  onDismiss,
  role,
  tone = 'neutral',
  ...props
}: AlertProps) {
  const hasIcon = icon !== undefined && icon !== null;
  const resolvedRole = role ?? (tone === 'danger' ? 'alert' : 'status');

  return (
    <div
      {...props}
      role={resolvedRole}
      aria-live={props['aria-live'] ?? (resolvedRole === 'alert' ? 'assertive' : 'polite')}
      data-slot="alert"
      data-tone={tone}
      data-has-icon={hasIcon ? 'true' : undefined}
      data-dismissible={onDismiss ? 'true' : undefined}
      className={joinClasses(styles.alert, toneClassNames[tone], className)}
    >
      {hasIcon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
      {children}
      {onDismiss ? (
        <span className={styles.dismiss} data-slot="alert-dismiss">
          <IconButton
            aria-label={dismissLabel}
            variant="tertiary"
            onClick={onDismiss}
          >
            <XIcon aria-hidden="true" />
          </IconButton>
        </span>
      ) : null}
    </div>
  );
}

export function AlertTitle({ children, className, ...props }: AlertTitleProps) {
  return (
    <div
      {...props}
      data-slot="alert-title"
      className={joinClasses(styles.title, className)}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children, className, ...props }: AlertDescriptionProps) {
  return (
    <div
      {...props}
      data-slot="alert-description"
      className={joinClasses(styles.description, className)}
    >
      {children}
    </div>
  );
}

export function AlertAction({ children, className, ...props }: AlertActionProps) {
  return (
    <div
      {...props}
      data-slot="alert-action"
      className={joinClasses(styles.action, className)}
    >
      {children}
    </div>
  );
}
