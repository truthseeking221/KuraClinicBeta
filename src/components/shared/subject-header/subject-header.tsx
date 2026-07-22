'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Avatar, AvatarFallback, Badge } from '../../ui';
import type { BadgeVariant } from '../../ui';

import { formatDobLabel, initialsFor } from './identity';
import styles from './subject-header.module.css';

/**
 * The person a workflow is about. Deliberately not a clinical record: this is
 * the identity the operator says out loud to confirm they have the right
 * human in front of them.
 */
export type SubjectIdentity = {
  name?: string;
  /** Rendered with `lang="km"` so Khmer shapes correctly beside the Latin name. */
  nameKhmer?: string;
  /** Overrides the derived initials when the record carries its own. */
  initials?: string;
  /** How the desk calls this person today — a queue number or booth PID. */
  reference?: string;
  /** ISO date of birth; rendered with the derived age. */
  dob?: string;
  sexAtBirth?: 'Female' | 'Male' | '';
  /** Pre-formatted arrival, e.g. "08:24 · 12 min ago". Never computed here. */
  arrivedLabel?: string;
  /** Extra facts appended after the derived ones, in the caller's order. */
  meta?: readonly string[];
};

export type SubjectHeaderProps = Omit<
  ComponentPropsWithoutRef<'header'>,
  'title' | 'children'
> & {
  subject: SubjectIdentity;
  /** Heading level, so a page can own its own `h1`. */
  as?: 'h1' | 'h2' | 'h3';
  /** Shown while the subject has no name yet. */
  placeholderTitle?: string;
  /** One derived state, never an action. The page footer owns the primary action. */
  status?: { label: string; variant?: BadgeVariant };
  /** Trailing controls. Keep to one — this strip is context, not a toolbar. */
  actions?: ReactNode;
  /**
   * Sticks to `--subject-header-offset` (default 0). Set that variable when a
   * sticky topbar sits above the scroll container.
   */
  sticky?: boolean;
};

/**
 * Identity strip for the top of a workflow: who this is, how the desk refers
 * to them, and one derived state. Front desk and collection both mount it, so
 * it names a *subject* rather than a patient — a draw worksheet and a check-in
 * wizard are about the same person for different reasons.
 *
 * Adapted from the upstream Kura ui-kit `SubjectHeader` organism (avatar →
 * title → meta → actions → status, sticky, two-row on mobile). The bordered
 * meta chips are dropped: the Kura surface direction reserves containers for
 * regions with their own state, so metadata is dot-separated text.
 */
export function SubjectHeader({
  actions,
  as: Heading = 'h2',
  className,
  placeholderTitle = 'New visit',
  status,
  sticky = true,
  subject,
  ...rest
}: SubjectHeaderProps) {
  const named = Boolean(subject.name?.trim());
  const title = named ? subject.name! : placeholderTitle;
  const initials = subject.initials ?? (named ? initialsFor(subject.name!) : '?');

  const meta = [
    subject.reference,
    formatDobLabel(subject.dob),
    subject.sexAtBirth || null,
    subject.arrivedLabel,
    ...(subject.meta ?? []),
  ].filter((item): item is string => Boolean(item));

  return (
    <header
      className={[styles.header, className].filter(Boolean).join(' ')}
      data-sticky={sticky ? '' : undefined}
      {...rest}
    >
      <Avatar
        className={styles.avatar}
        fallbackTone={named ? 'brand' : 'neutral'}
        size="md"
      >
        <AvatarFallback tone={named ? 'brand' : 'neutral'}>{initials}</AvatarFallback>
      </Avatar>

      <div className={styles.identity}>
        <Heading className={styles.title}>
          {title}
          {subject.nameKhmer ? (
            <span className={styles.nameKhmer} lang="km">
              {subject.nameKhmer}
            </span>
          ) : null}
        </Heading>
        {meta.length > 0 ? (
          <p className={styles.meta}>
            {meta.map((item, index) => (
              <span className={styles.metaItem} key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </p>
        ) : null}
      </div>

      {actions ? <div className={styles.actions}>{actions}</div> : null}
      {status ? (
        <Badge className={styles.status} variant={status.variant ?? 'neutral'}>
          {status.label}
        </Badge>
      ) : null}
    </header>
  );
}
