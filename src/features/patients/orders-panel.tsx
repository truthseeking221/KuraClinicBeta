'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Input,
  Item,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  Skeleton,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';
import { useT } from '../../components/foundations/i18n';

import type { PatientOrder, PatientOrderStatus } from './types';
import { groupPatientOrders, patientOrderMatchesSearch } from './patient-order-logic';
import styles from './orders-panel.module.css';

/**
 * Terminal and routine states stay quiet; only the states that change what
 * the doctor does next carry tone (attention, cancelled).
 */
const STATUS_META: Record<PatientOrderStatus, { label: string; variant: 'neutral' | 'info' | 'success' | 'warning' }> = {
  placed: { label: 'Placed', variant: 'info' },
  in_fulfillment: { label: 'In fulfillment', variant: 'info' },
  partially_complete: { label: 'Partially complete', variant: 'warning' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'neutral' },
};

export type OrdersPanelProps = {
  orders: readonly PatientOrder[];
  /** The record refresh state is distinct from the patient-chart shell state. */
  state?: 'ready' | 'loading' | 'error' | 'permission-restricted';
  onRetry?: () => void;
  /** A successful placement directs attention here without making rows links. */
  focusedOrderId?: string;
};

/**
 * The patient's lab orders as the clinic BFF reports them: code, placement,
 * lifecycle status, and ordered tests. It is a read-only evidence surface;
 * new orders start from the governed action flow, not from history.
 */
export function OrdersPanel({ focusedOrderId, onRetry, orders, state = 'ready' }: OrdersPanelProps) {
  const t = useT();
  const [query, setQuery] = useState('');
  const [pastLimit, setPastLimit] = useState(5);
  const focusedOrderRef = useRef<HTMLElement>(null);
  const { active, past } = groupPatientOrders(orders);
  const matchingPast = past.filter((order) => patientOrderMatchesSearch(order, query));
  const visiblePast = matchingPast.slice(0, pastLimit);

  useEffect(() => {
    if (!focusedOrderId) return;
    focusedOrderRef.current?.focus({ preventScroll: false });
  }, [focusedOrderId]);

  if (state === 'loading') {
    return (
      <div aria-busy="true" aria-label={t('Loading orders')} className={styles.loading} role="status">
        <Skeleton shape="rectangle" style={{ blockSize: 116, inlineSize: '100%' }} />
        <Skeleton shape="rectangle" style={{ blockSize: 116, inlineSize: '100%' }} />
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={styles.statusState}>
        <Alert tone="danger">
          <AlertTitle>{t("Couldn't load orders")}</AlertTitle>
          <AlertDescription>{t('Check your connection and try again.')}</AlertDescription>
        </Alert>
        {onRetry ? (
          <Button onClick={onRetry} size="sm" variant="secondary">
            {t('Retry')}
          </Button>
        ) : null}
      </div>
    );
  }

  if (state === 'permission-restricted') {
    return (
      <Alert tone="warning">
        <AlertTitle>{t('Orders unavailable')}</AlertTitle>
        <AlertDescription>{t("You do not have permission to view this patient's orders.")}</AlertDescription>
      </Alert>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState align="center" surface="plain">
        <EmptyStateHeader>
          <EmptyStateTitle>{t('No orders yet')}</EmptyStateTitle>
          <EmptyStateDescription>
            {t('Orders for this patient will appear here.')}
          </EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    );
  }

  const renderOrder = (order: PatientOrder, index: number) => {
    const status = STATUS_META[order.status];
    const focused = focusedOrderId === order.ordId;
    return (
      <Fragment key={order.ordId}>
        {index > 0 ? <ItemSeparator aria-hidden="true" /> : null}
        <Item
          className={styles.order}
          data-focused={focused || undefined}
          ref={focused ? focusedOrderRef : undefined}
          role="listitem"
          size="md"
          tabIndex={focused ? -1 : undefined}
        >
          <ItemHeader className={styles.head}>
            <span className={styles.orderMeta}>
              <span className={styles.code}>{order.code}</span>
              <span className={styles.placed}>{order.placedAtLabel}</span>
            </span>
            <span className={styles.headStatus}>
              {order.needsAttention ? <Badge variant="warning">{t('Needs attention')}</Badge> : null}
              <Badge appearance="soft" variant={status.variant}>
                {t(status.label)}
              </Badge>
            </span>
          </ItemHeader>
          <ItemFooter className={styles.orderLines}>
            <ul className={styles.lines}>
              {order.lineItems.map((line) => (
                <li className={styles.line} key={line.code}>
                  <span className={styles.lineName}>{line.displayName}</span>
                  <span className={styles.lineCode}>{line.code}</span>
                </li>
              ))}
            </ul>
          </ItemFooter>
        </Item>
      </Fragment>
    );
  };

  return (
    <div className={styles.panel}>
      {active.length > 0 ? (
        <section aria-labelledby="active-orders-title" className={styles.section}>
          <h2 className={styles.sectionTitle} id="active-orders-title">{t('Active orders')}</h2>
          <ItemGroup aria-label={t('Active orders')} className={styles.list} role="list">
            {active.map(renderOrder)}
          </ItemGroup>
        </section>
      ) : null}

      {past.length > 0 ? (
        <section aria-labelledby="past-orders-title" className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle} id="past-orders-title">{t('Past orders')}</h2>
            <Input
              aria-label={t('Search past orders')}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                setPastLimit(5);
              }}
              placeholder={t('Search past orders')}
              size="sm"
              type="search"
              value={query}
            />
          </div>
          {visiblePast.length > 0 ? (
            <ItemGroup aria-label={t('Past orders')} className={styles.list} role="list">
              {visiblePast.map(renderOrder)}
            </ItemGroup>
          ) : (
            <p className={styles.noMatches}>{t('No past orders match this search.')}</p>
          )}
          {matchingPast.length > visiblePast.length ? (
            <Button onClick={() => setPastLimit((limit) => limit + 5)} size="sm" variant="secondary">
              {t('Show more past orders')}
            </Button>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
