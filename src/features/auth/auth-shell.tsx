import Image from 'next/image';
import type { ReactNode } from 'react';

import styles from './auth-shell.module.css';

export type AuthShellProps = {
  children: ReactNode;
  /** sm fits the door card; md fits pickers and the wizard. */
  width?: 'sm' | 'md';
  /** Footer line under the card (support contact, legal). */
  footer?: ReactNode;
};

/**
 * Centered single-purpose canvas for pre-app surfaces (door, wizard,
 * workspace gate). Structural only — the content owns its card and states.
 */
export function AuthShell({ children, footer, width = 'sm' }: AuthShellProps) {
  return (
    <main className={styles.shell}>
      <div className={styles.column} data-width={width}>
        <Image
          alt="Kura"
          className={styles.wordmark}
          height={22}
          priority
          src="/brand/kura-full-logo.svg"
          width={67}
        />
        {children}
        {footer ? <p className={styles.footer}>{footer}</p> : null}
      </div>
    </main>
  );
}
