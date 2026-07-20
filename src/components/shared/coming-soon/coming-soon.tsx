'use client';

/**
 * Honest teaser for roadmap surfaces. Deferred work must never look live:
 * the page names the surface, states that the backend contract does not
 * exist yet, and routes back to real work. Router-free — the host app
 * supplies the back action.
 */

import { Badge, Button } from '../../ui';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../empty-state';
import styles from './coming-soon.module.css';

export type ComingSoonPageProps = {
  title: string;
  description: string;
  /** Back to real work — usually history back in the host app. */
  onBack?: () => void;
};

export function ComingSoonPage({ title, description, onBack }: ComingSoonPageProps) {
  return (
    <div className={styles.frame}>
      <EmptyState align="center" surface="plain">
        <EmptyStateHeader>
          <Badge size="sm" variant="neutral">
            Planned
          </Badge>
          <EmptyStateTitle>{title}</EmptyStateTitle>
          <EmptyStateDescription>
            {description} This surface is on the roadmap — no backend contract exists
            yet, so the prototype keeps it visibly unfinished instead of faking it.
          </EmptyStateDescription>
        </EmptyStateHeader>
        {onBack ? (
          <EmptyStateContent>
            <Button onClick={onBack} size="sm" variant="secondary">
              Go back
            </Button>
          </EmptyStateContent>
        ) : null}
      </EmptyState>
    </div>
  );
}
