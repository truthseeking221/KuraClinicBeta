'use client';

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Skeleton,
} from '../../components/ui';
import type { BadgeVariant } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import type { HomeSignal, HomeWorkQueueEntry, HomeWorkQueueTone } from './types';
import styles from './home-work-queue-preview.module.css';

const STATUS_VARIANT: Record<HomeWorkQueueTone, BadgeVariant> = {
  neutral: 'neutral',
  attention: 'warning',
  critical: 'danger',
  info: 'info',
};

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(parsed);
}

function WorkQueueItem({
  entry,
  onOpen,
  targetKey,
}: {
  entry: HomeWorkQueueEntry;
  onOpen?: (targetKey: string, entry: HomeWorkQueueEntry) => void;
  targetKey: string;
}) {
  const t = useT();

  return (
    <Item
      as="a"
      className={styles.item}
      disabled={entry.disabled}
      href={`#${targetKey}/${entry.patient.id}/${entry.id}`}
      onClick={(event) => {
        if (entry.disabled || !onOpen) return;
        event.preventDefault();
        onOpen(targetKey, entry);
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
            MRN {entry.patient.medicalRecordNumber} · DOB {formatDate(entry.patient.dob)}
          </span>
          <span className={styles.reason}>{entry.reason}</span>
          {entry.context ? <span>{entry.context}</span> : null}
          {entry.disabled && entry.unavailableReason ? (
            <span className={styles.unavailable}>{t(entry.unavailableReason)}</span>
          ) : null}
        </ItemDescription>
      </ItemContent>
      <ItemActions className={styles.actions}>
        {entry.status ? (
          <Badge appearance="soft" size="sm" variant={STATUS_VARIANT[entry.status.tone]}>
            {t(entry.status.label)}
          </Badge>
        ) : null}
        {!entry.disabled ? (
          <ChevronRightIcon aria-hidden="true" className={styles.chevron} size={14} />
        ) : null}
      </ItemActions>
    </Item>
  );
}

export type HomeWorkQueuePreviewProps = {
  signal: HomeSignal;
  onNavigate?: (targetKey: string) => void;
  onOpenItem?: (targetKey: string, entry: HomeWorkQueueEntry) => void;
  onRetry?: (signalKey: string) => void;
};

/** A patient-identifiable Home preview that routes work into its owning surface. */
export function HomeWorkQueuePreview({
  onNavigate,
  onOpenItem,
  onRetry,
  signal,
}: HomeWorkQueuePreviewProps) {
  const t = useT();
  const headingId = `home-${signal.key}-queue-title`;
  const targetKey = signal.action?.targetKey ?? signal.key;
  const items = signal.workItems ?? [];

  return (
    <section aria-labelledby={headingId} className={styles.preview}>
      <header className={styles.header}>
        <h3 className={styles.title} id={headingId}>{t(signal.title)}</h3>
        <Badge appearance="soft" size="sm" variant="neutral">{signal.count ?? 0}</Badge>
      </header>

      {signal.state === 'loading' ? (
        <ItemGroup aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <Item className={styles.loadingItem} key={index} size="sm">
              <Skeleton className={styles.avatarSkeleton} shape="circle" />
              <ItemContent>
                <Skeleton className={styles.nameSkeleton} shape="text" />
                <Skeleton className={styles.detailSkeleton} shape="text" />
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      ) : null}

      {signal.state === 'error' ? (
        <div className={styles.message}>
          <p>
            {signal.errorMessage
              ? t(signal.errorMessage)
              : `${t(signal.title)} ${t('could not load.')}`}
          </p>
          <Button onClick={() => onRetry?.(signal.key)} variant="outline">{t('Retry')}</Button>
        </div>
      ) : null}

      {signal.state === 'ready' && items.length > 0 ? (
        <ItemGroup aria-label={`${t(signal.title)} ${t('work queue')}`} role="list">
          {items.map((entry) => (
            <div key={entry.id} role="listitem">
              <WorkQueueItem
                entry={entry}
                onOpen={
                  onOpenItem || onNavigate
                    ? (key, item) => {
                        if (onOpenItem) {
                          onOpenItem(key, item);
                          return;
                        }
                        onNavigate?.(key);
                      }
                    : undefined
                }
                targetKey={targetKey}
              />
            </div>
          ))}
        </ItemGroup>
      ) : null}

      {signal.state === 'ready' && items.length === 0 ? (
        <p className={styles.messageText}>
          {(signal.count ?? 0) > 0
            ? `${t('Patient details are unavailable.')} ${t('Open')} ${t(signal.title)} ${t('to continue.')}`
            : t(signal.detail)}
        </p>
      ) : null}

      {signal.state === 'ready' && signal.action ? (
        <a
          className={styles.viewAll}
          href={`#${targetKey}`}
          onClick={(event) => {
            if (!onNavigate) return;
            event.preventDefault();
            onNavigate(targetKey);
          }}
        >
          {t(signal.action.label)}
          <ChevronRightIcon aria-hidden="true" size={14} />
        </a>
      ) : null}
    </section>
  );
}
