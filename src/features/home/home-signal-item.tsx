'use client';

import type { ReactNode } from 'react';

import {
  AppointmentIcon,
  Badge,
  Button,
  ChartAnalysisIcon,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  MoneyText,
  Skeleton,
  TestTubesIcon,
  UserMultipleIcon,
  WalletIcon,
} from '../../components/ui';

import type { HomeSignal, SignalTone } from './types';
import styles from './home-signal-item.module.css';

const TONE_BADGE: Record<Exclude<SignalTone, 'neutral'>, 'warning' | 'danger'> = {
  attention: 'warning',
  critical: 'danger',
};

/** Presentation-only glyph per lifecycle axis; unknown axes stay glyph-free. */
const SIGNAL_ICON: Record<string, ReactNode> = {
  results: <ChartAnalysisIcon aria-hidden="true" size={19} />,
  bookings: <AppointmentIcon aria-hidden="true" size={19} />,
  patients: <UserMultipleIcon aria-hidden="true" size={19} />,
  pickup: <TestTubesIcon aria-hidden="true" size={19} />,
  earnings: <WalletIcon aria-hidden="true" size={19} />,
};

export type HomeSignalItemProps = {
  signal: HomeSignal;
  onNavigate?: (targetKey: string) => void;
  onRetry?: (signalKey: string) => void;
};

function SignalValue({ signal }: { signal: HomeSignal }) {
  return (
    <span className={styles.value} data-tone={signal.tone}>
      {signal.moneyMinor != null && signal.currency ? (
        <MoneyText currency={signal.currency} minor={signal.moneyMinor} />
      ) : (
        (signal.headline ?? signal.count ?? 0)
      )}
    </span>
  );
}

/**
 * Home-owned domain molecule built from the canonical Item composition.
 * It previews one lifecycle axis and routes work to the surface that owns it.
 */
export function HomeSignalItem({ signal, onNavigate, onRetry }: HomeSignalItemProps) {
  const commonProps = {
    className: styles.item,
    'data-tone': signal.tone,
    size: 'sm' as const,
  };

  if (signal.state === 'loading') {
    return (
      <Item {...commonProps} aria-label={`Loading ${signal.title}`}>
        <ItemContent>
          <ItemTitle><Skeleton className={styles.titleSkeleton} shape="text" /></ItemTitle>
          <Skeleton className={styles.detailSkeleton} shape="text" />
        </ItemContent>
        <ItemActions><Skeleton className={styles.valueSkeleton} shape="text" /></ItemActions>
      </Item>
    );
  }

  if (signal.state === 'error') {
    return (
      <Item {...commonProps}>
        <ItemContent>
          <ItemTitle>{signal.title}</ItemTitle>
          <ItemDescription>{signal.errorMessage ?? 'This signal could not be loaded.'}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button className={styles.retry} onClick={() => onRetry?.(signal.key)} variant="outline">
            Retry
          </Button>
        </ItemActions>
      </Item>
    );
  }

  const icon = SIGNAL_ICON[signal.key];

  const content = (
    <>
      {icon ? (
        <span aria-hidden="true" className={styles.iconBadge}>
          {icon}
        </span>
      ) : null}
      <ItemContent>
        <ItemTitle className={styles.title}>
          <span>{signal.title}</span>
          {signal.tone !== 'neutral' && signal.toneLabel ? (
            <Badge appearance="soft" size="sm" variant={TONE_BADGE[signal.tone]}>
              {signal.toneLabel}
            </Badge>
          ) : null}
        </ItemTitle>
        <ItemDescription>{signal.detail}</ItemDescription>
      </ItemContent>
      <ItemActions className={styles.actions}>
        <SignalValue signal={signal} />
        {signal.action ? (
          <span className={styles.actionLabel}>
            {signal.action.label}
            <ChevronRightIcon aria-hidden="true" size={14} />
          </span>
        ) : null}
      </ItemActions>
    </>
  );

  if (!signal.action) {
    return <Item {...commonProps}>{content}</Item>;
  }

  return (
    <Item
      {...commonProps}
      as="a"
      href={`#${signal.action.targetKey}`}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        onNavigate(signal.action!.targetKey);
      }}
    >
      {content}
    </Item>
  );
}
