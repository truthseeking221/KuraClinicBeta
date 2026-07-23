'use client';

import type { ReactNode } from 'react';

import {
  AppointmentIcon,
  Badge,
  Button,
  Card,
  ChartAnalysisIcon,
  Skeleton,
  TestTubesIcon,
  UserMultipleIcon,
  WalletIcon,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import { SignalValue } from './home-signal-row';
import type { HomeSignal, SignalTone } from './types';
import styles from './home-signal-tile.module.css';

const TONE_BADGE: Record<Exclude<SignalTone, 'neutral'>, 'warning' | 'danger'> = {
  attention: 'warning',
  critical: 'danger',
};

/** Presentation-only glyph per lifecycle axis; unknown axes stay glyph-free. */
const SIGNAL_ICON: Record<string, ReactNode> = {
  results: <ChartAnalysisIcon aria-hidden="true" size={18} />,
  bookings: <AppointmentIcon aria-hidden="true" size={18} />,
  patients: <UserMultipleIcon aria-hidden="true" size={18} />,
  pickup: <TestTubesIcon aria-hidden="true" size={18} />,
  earnings: <WalletIcon aria-hidden="true" size={18} />,
};

export type HomeSignalTileProps = {
  signal: HomeSignal;
  onNavigate?: (targetKey: string) => void;
  onRetry?: (signalKey: string) => void;
};

function SignalIcon({ signalKey }: { signalKey: string }) {
  const icon = SIGNAL_ICON[signalKey];
  if (!icon) return null;
  return (
    <span aria-hidden="true" className={styles.chip}>
      {icon}
    </span>
  );
}

function DeepLink({
  action,
  className,
  onNavigate,
}: {
  action: NonNullable<HomeSignal['action']>;
  className: string;
  onNavigate?: (targetKey: string) => void;
}) {
  const t = useT();

  return (
    <a
      className={className}
      href={`#${action.targetKey}`}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        onNavigate(action.targetKey);
      }}
    >
      <span className={styles.actionLabel}>{t(action.label)}</span>
    </a>
  );
}

/**
 * The stat-tile composition: one lifecycle axis as a flat grey tray with a
 * white icon chip, a loud count, its evidence sentence, and the deep link into
 * the surface that owns the work. The link stretches over the tray, so the
 * whole tile is the target while the accessible name stays the outcome label.
 *
 * Reach for it only where peer metrics need a stable comparison boundary. The
 * canonical Home uses one five-axis strip so results, bookings, patients,
 * pickup, and earnings can be compared in a single scan.
 */
export function HomeSignalTile({ signal, onNavigate, onRetry }: HomeSignalTileProps) {
  const t = useT();

  if (signal.state === 'loading') {
    return (
      <Card as="div" className={styles.tile}>
        <SignalIcon signalKey={signal.key} />
        <p className={styles.label}>{t(signal.title)}</p>
        <Skeleton className={styles.valueSkeleton} shape="text" />
        <Skeleton className={styles.detailSkeleton} shape="text" />
      </Card>
    );
  }

  if (signal.state === 'error') {
    return (
      <Card as="div" className={styles.tile}>
        <SignalIcon signalKey={signal.key} />
        <p className={styles.label}>{t(signal.title)}</p>
        <p className={styles.detail}>{t(signal.errorMessage ?? 'Could not load.')}</p>
        <Button className={styles.retry} onClick={() => onRetry?.(signal.key)} variant="outline">
          {t('Retry')}
        </Button>
      </Card>
    );
  }

  return (
    <Card as="div" className={styles.tile} data-tone={signal.tone}>
      <SignalIcon signalKey={signal.key} />
      <p className={styles.label}>{t(signal.title)}</p>
      <p className={styles.valueRow}>
        <span className={styles.value}>
          <SignalValue signal={signal} />
        </span>
        {signal.tone !== 'neutral' && signal.toneLabel ? (
          <Badge appearance="soft" size="sm" variant={TONE_BADGE[signal.tone]}>
            {t(signal.toneLabel)}
          </Badge>
        ) : null}
      </p>
      <p className={styles.detail}>{t(signal.detail)}</p>
      {signal.action ? (
        <DeepLink action={signal.action} className={styles.action} onNavigate={onNavigate} />
      ) : null}
    </Card>
  );
}
