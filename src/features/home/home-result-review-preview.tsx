'use client';

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ChevronRightIcon,
  Item,
  ItemContent,
  ItemGroup,
  Skeleton,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import { ResultReviewQueueItem } from '../results';

import type { HomeSignal } from './types';
import styles from './home-result-review-preview.module.css';

export type HomeResultReviewPreviewProps = {
  signal: HomeSignal;
  onNavigate?: (targetKey: string) => void;
  onRetry?: (signalKey: string) => void;
};

function PreviewHeader({ count }: { count?: number }) {
  const t = useT();

  return (
    <CardHeader className={styles.header}>
      <CardTitle as="h3">{t('Results to review')}</CardTitle>
      <CardAction mobileLayout="inline">
        <Badge appearance="soft" size="sm" variant="neutral">
          {count ?? 0}
        </Badge>
      </CardAction>
    </CardHeader>
  );
}

/** Home previews patient identity and routes review into the Results owner. */
export function HomeResultReviewPreview({
  onNavigate,
  onRetry,
  signal,
}: HomeResultReviewPreviewProps) {
  const t = useT();
  const targetKey = signal.action?.targetKey ?? 'results';

  if (signal.state === 'loading') {
    return (
      <Card as="section" aria-label={t('Loading results to review')} className={styles.preview}>
        <PreviewHeader count={signal.count} />
        <CardContent className={styles.content}>
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
        </CardContent>
      </Card>
    );
  }

  if (signal.state === 'error') {
    return (
      <Card as="section" className={styles.preview}>
        <PreviewHeader count={signal.count} />
        <CardContent className={styles.message}>
          <p>{t(signal.errorMessage ?? 'Patient result details could not load.')}</p>
          <Button onClick={() => onRetry?.(signal.key)} variant="outline">
            {t('Retry')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const reviewItems = signal.reviewItems ?? [];

  return (
    <Card as="section" className={styles.preview}>
      <PreviewHeader count={signal.count} />
      <CardContent className={styles.content}>
        {reviewItems.length > 0 ? (
          <ItemGroup aria-label={t('Patients with results to review')} role="list">
            {reviewItems.map((entry) => (
              <div key={entry.id} role="listitem">
                <ResultReviewQueueItem
                  entry={entry}
                  href={`#${targetKey}/${entry.patient.id}/${entry.id}`}
                  onOpen={() => onNavigate?.(targetKey)}
                />
              </div>
            ))}
          </ItemGroup>
        ) : (
          <p className={styles.unavailable}>
            {t('Patient details are unavailable.')} {t('Open')} {t('Results')} {t('to continue.')}
          </p>
        )}
      </CardContent>
      {signal.action ? (
        <CardFooter align="start" className={styles.footer}>
          <a
            className={styles.viewAll}
            href={`#${targetKey}`}
            onClick={(event) => {
              if (!onNavigate) return;
              event.preventDefault();
              onNavigate(targetKey);
            }}
          >
            {t('View all results')}
            <ChevronRightIcon aria-hidden="true" size={14} />
          </a>
        </CardFooter>
      ) : null}
    </Card>
  );
}
