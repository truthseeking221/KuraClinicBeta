'use client';

import { Badge } from '../../components/ui';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';

import type { PatientOrder, PatientOrderStatus } from './types';
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
};

/**
 * The patient's lab orders as the clinic BFF reports them: code, placement,
 * lifecycle status, and ordered tests. Read-only by design; new orders start
 * from the catalog, not from history.
 */
export function OrdersPanel({ orders }: OrdersPanelProps) {
  if (orders.length === 0) {
    return (
      <EmptyState align="center" surface="plain">
        <EmptyStateHeader>
          <EmptyStateTitle>No orders yet</EmptyStateTitle>
          <EmptyStateDescription>
            Lab orders for this patient appear here once placed.
          </EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    );
  }

  return (
    <ul className={styles.list}>
      {orders.map((order) => {
        const status = STATUS_META[order.status];
        return (
          <li className={styles.order} key={order.ordId}>
            <div className={styles.head}>
              <span className={styles.code}>{order.code}</span>
              <span className={styles.placed}>{order.placedAtLabel}</span>
              <span className={styles.headStatus}>
                {order.needsAttention ? (
                  <Badge variant="warning">Needs attention</Badge>
                ) : null}
                <Badge appearance="soft" variant={status.variant}>
                  {status.label}
                </Badge>
              </span>
            </div>
            <ul className={styles.lines}>
              {order.lineItems.map((line) => (
                <li className={styles.line} key={line.code}>
                  <span className={styles.lineName}>{line.displayName}</span>
                  <span className={styles.lineCode}>{line.code}</span>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
