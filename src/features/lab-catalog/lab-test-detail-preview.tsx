'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent, ReactElement } from 'react';

import {
  AddIcon,
  Badge,
  Button,
  CheckIcon,
  ClockIcon,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  MoneyText,
  TestTubeIcon,
} from '../../components/ui';

import { useT } from '../../components/foundations/i18n';
import styles from './lab-test-detail-preview.module.css';
import type { LabCatalogTest } from './types';

export type LabTestDetailPreviewProps = {
  test: LabCatalogTest;
  selected: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: () => void;
  actionDisabled?: boolean;
  actionDisabledReason?: string;
  children: ReactElement;
};

/** Legacy DCM's delayed catalog preview, rebuilt on the canonical Kura hover card. */
export function LabTestDetailPreview({
  actionDisabled = false,
  actionDisabledReason,
  children,
  onOpenChange,
  onToggle,
  open,
  selected,
  test,
}: LabTestDetailPreviewProps) {
  const t = useT();
  const focusCloseTimerRef = useRef<number | null>(null);
  const lastPointerDownRef = useRef(0);
  const preview = test.preview;

  const clearFocusCloseTimer = useCallback(() => {
    if (focusCloseTimerRef.current === null) return;
    window.clearTimeout(focusCloseTimerRef.current);
    focusCloseTimerRef.current = null;
  }, []);

  const openFromFocus = useCallback(() => {
    clearFocusCloseTimer();
    // A touch/pointer press can move focus; preserve Legacy DCM's hover-only
    // behavior on coarse pointers while keyboard focus still opens instantly.
    if (Date.now() - lastPointerDownRef.current < 650) return;
    onOpenChange(true);
  }, [clearFocusCloseTimer, onOpenChange]);

  const closeAfterFocusGrace = useCallback(() => {
    clearFocusCloseTimer();
    focusCloseTimerRef.current = window.setTimeout(() => {
      focusCloseTimerRef.current = null;
      onOpenChange(false);
    }, 180);
  }, [clearFocusCloseTimer, onOpenChange]);

  useEffect(() => clearFocusCloseTimer, [clearFocusCloseTimer]);

  if (!preview) return children;

  const analyticalRows = preview.analytical?.length
    ? preview.analytical
    : preview.referenceRange
      ? [
          {
            label: 'Reference',
            value: t('Ref {range}').replace('{range}', preview.referenceRange),
          },
        ]
      : [{ label: 'Code', value: test.code }];
  const handlingRows = preview.handling?.length
    ? preview.handling
    : [{ label: 'Specimen', value: preview.specimen }];
  const unavailable = test.availability === 'unavailable';
  const disabled = actionDisabled || unavailable;
  const disabledReason = unavailable
    ? t(test.unavailableReason ?? 'Temporarily unavailable')
    : actionDisabledReason;
  const actionLabel = t(
    unavailable ? 'Unavailable' : selected ? 'Remove' : 'Add to order',
  );

  const toggle = () => {
    if (disabled) return;
    onToggle();
    onOpenChange(false);
  };

  return (
    <HoverCard
      closeDelay={180}
      onOpenChange={onOpenChange}
      open={open}
      openDelay={1500}
    >
      <HoverCardTrigger
        asChild
        onBlur={closeAfterFocusGrace}
        onFocus={openFromFocus}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === 'Escape') onOpenChange(false);
        }}
        onPointerDown={() => {
          lastPointerDownRef.current = Date.now();
        }}
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        aria-label={t('{name} test details').replace('{name}', test.displayName)}
        className={styles.preview}
        collisionPadding={12}
        onBlur={closeAfterFocusGrace}
        onFocus={() => {
          clearFocusCloseTimer();
          onOpenChange(true);
        }}
        role="dialog"
        sideOffset={8}
      >
        <section aria-label={t('Test summary')} className={styles.overview}>
          <header className={styles.header}>
            <h3 className={styles.name}>{test.displayName}</h3>
            {preview.preparation ? (
              <Badge
                className={styles.preparation}
                size="md"
                trailing={<span className={styles.preparationKind}>{t('prep')}</span>}
                variant="success"
              >
                {preview.preparation}
              </Badge>
            ) : null}
          </header>

          {preview.description ? (
            <p className={styles.summary}>{preview.description}</p>
          ) : null}

          <div aria-label={t('Collection summary')} className={styles.quickMeta}>
            <span className={styles.quickMetaRow}>
              <span className={styles.metaItem}>
                <span aria-hidden="true" className={styles.specimenDot} />
                <span>{preview.specimen}</span>
              </span>
              <span className={styles.metaItem}>
                <ClockIcon aria-hidden="true" size={14} />
                <span>{preview.turnaround}</span>
              </span>
            </span>
            <span className={styles.metaItem}>
              <TestTubeIcon aria-hidden="true" size={14} />
              <span>{test.code}</span>
            </span>
          </div>
        </section>

        <span aria-hidden="true" className={styles.divider} />

        <section aria-label={t('Test operations')} className={styles.detail}>
          <div className={styles.detailSection}>
            <h4>{t('Analytical')}</h4>
            <dl className={styles.keyValues}>
              {analyticalRows.map((row) => (
                <div className={styles.keyValueRow} key={row.label}>
                  <dt>{t(row.label)}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.detailSection}>
            <h4>{t('Specimen & handling')}</h4>
            <dl className={styles.keyValues}>
              {handlingRows.map((row) => (
                <div className={styles.keyValueRow} key={row.label}>
                  <dt>{t(row.label)}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <footer className={styles.footer}>
            <span className={styles.price}>
              <MoneyText
                as="strong"
                currency={preview.currencyCode}
                minor={preview.priceMinor}
              />
              {preview.earningMinor ? (
                <small>
                  {t("You'll earn")}{' '}
                  <MoneyText
                    currency={preview.currencyCode}
                    minor={preview.earningMinor}
                  />
                </small>
              ) : null}
            </span>
            <span className={styles.actionGroup}>
              <Button
                aria-label={`${actionLabel}: ${test.displayName}`}
                disabled={disabled}
                leadingIcon={
                  selected ? (
                    <CheckIcon aria-hidden="true" size={16} />
                  ) : (
                    <AddIcon aria-hidden="true" size={16} />
                  )
                }
                onClick={toggle}
                size="sm"
              >
                {actionLabel}
              </Button>
              {disabled && disabledReason ? (
                <small className={styles.disabledReason}>{disabledReason}</small>
              ) : null}
            </span>
          </footer>
        </section>
      </HoverCardContent>
    </HoverCard>
  );
}
