'use client';

import { Badge, Button, ChevronRightIcon, MoneyText, Skeleton } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import type { HomeSignal, SignalTone } from './types';
import styles from './home-signal-row.module.css';

const TONE_BADGE: Record<Exclude<SignalTone, 'neutral'>, 'warning' | 'danger'> = {
  attention: 'warning',
  critical: 'danger',
};

export type HomeSignalRowProps = {
  signal: HomeSignal;
  onNavigate?: (targetKey: string) => void;
  onRetry?: (signalKey: string) => void;
};

/** The loud value of one signal: a count, a time window, or money. */
export function SignalValue({ signal }: { signal: HomeSignal }) {
  if (signal.moneyMinor != null && signal.currency) {
    return <MoneyText currency={signal.currency} minor={signal.moneyMinor} />;
  }
  return <>{signal.headline ?? signal.count ?? 0}</>;
}

/**
 * One signal as a quiet row on the white page — title, tone, evidence, value,
 * and the deep link into the surface that owns the work. It carries no surface
 * of its own: Home spends its single tray on the results it previews in full.
 */
export function HomeSignalRow({ signal, onNavigate, onRetry }: HomeSignalRowProps) {
  const t = useT();

  if (signal.state === 'error') {
    return (
      <div className={styles.row}>
        <span className={styles.text}>
          <span className={styles.title}>{t(signal.title)}</span>
          <span className={styles.detail}>{t(signal.errorMessage ?? 'Could not load.')}</span>
        </span>
        <Button onClick={() => onRetry?.(signal.key)} size="sm" variant="outline">
          {t('Retry')}
        </Button>
      </div>
    );
  }

  const body = (
    <>
      <span className={styles.text}>
        <span className={styles.title}>
          {t(signal.title)}
          {signal.tone !== 'neutral' && signal.toneLabel ? (
            <Badge appearance="soft" size="sm" variant={TONE_BADGE[signal.tone]}>
              {t(signal.toneLabel)}
            </Badge>
          ) : null}
        </span>
        <span className={styles.detail}>{t(signal.detail)}</span>
      </span>
      {signal.state === 'loading' ? (
        <Skeleton className={styles.valueSkeleton} shape="text" />
      ) : (
        <span className={styles.value} data-tone={signal.tone}>
          <SignalValue signal={signal} />
        </span>
      )}
      {signal.action && signal.state === 'ready' ? (
        <ChevronRightIcon aria-hidden="true" className={styles.chevron} size={14} />
      ) : null}
    </>
  );

  if (!signal.action || signal.state !== 'ready') {
    return <div className={styles.row}>{body}</div>;
  }

  const action = signal.action;

  return (
    <a
      className={styles.row}
      href={`#${action.targetKey}`}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        onNavigate(action.targetKey);
      }}
    >
      {body}
    </a>
  );
}
