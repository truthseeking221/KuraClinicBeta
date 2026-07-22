'use client';

import {
  Avatar,
  AvatarFallback,
  Badge,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../../components/ui';
import type { BadgeVariant } from '../../components/ui';

import { useT } from '../../components/foundations/i18n';
import { formatDate } from './logic';
import type { ResultReviewQueueEntry, ResultReviewQueueStatus } from './types';
import styles from './result-review-queue-item.module.css';

const STATUS: Record<
  Exclude<ResultReviewQueueStatus, 'routine'>,
  { label: string; variant: BadgeVariant }
> = {
  abnormal: { label: 'Abnormal', variant: 'warning' },
  critical: { label: 'Critical', variant: 'danger' },
  amended: { label: 'Amended', variant: 'info' },
};

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export type ResultReviewQueueItemProps = {
  entry: ResultReviewQueueEntry;
  href?: string;
  disabled?: boolean;
  unavailableReason?: string;
  onOpen?: (entry: ResultReviewQueueEntry) => void;
};

/**
 * Cross-patient result-review navigation. Patient identity stays primary;
 * analyte detail remains owned by the per-patient Results workspace.
 */
export function ResultReviewQueueItem({
  disabled = false,
  entry,
  href = `#result-review-${entry.id}`,
  onOpen,
  unavailableReason,
}: ResultReviewQueueItemProps) {
  const t = useT();
  const status = entry.status === 'routine' ? null : STATUS[entry.status];

  return (
    <Item
      as="a"
      className={styles.item}
      disabled={disabled}
      href={href}
      onClick={(event) => {
        if (disabled || !onOpen) return;
        event.preventDefault();
        onOpen(entry);
      }}
      size="sm"
    >
      <ItemMedia>
        <Avatar aria-hidden="true" className={styles.avatar} fallbackTone="neutral" size="sm">
          <AvatarFallback>{initialsOf(entry.patient.name)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{entry.patient.name}</ItemTitle>
        <ItemDescription className={styles.description}>
          <span>
            MRN {entry.patient.medicalRecordNumber} · DOB{' '}
            {formatDate(entry.patient.dob, 'en-GB', t)}
          </span>
          <span className={styles.resultMeta}>
            {entry.testName} · {t('Returned')} {entry.returnedLabel}
          </span>
          {disabled && unavailableReason ? (
            <span className={styles.unavailable}>{unavailableReason}</span>
          ) : null}
        </ItemDescription>
      </ItemContent>
      <ItemActions className={styles.actions}>
        {status ? (
          <Badge appearance="soft" size="sm" variant={status.variant}>
            {t(status.label)}
          </Badge>
        ) : null}
        {!disabled ? <ChevronRightIcon aria-hidden="true" className={styles.chevron} size={14} /> : null}
      </ItemActions>
    </Item>
  );
}
