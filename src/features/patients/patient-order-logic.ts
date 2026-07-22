import type { PatientOrder } from './types';

/**
 * The tab count is a work signal, not a history total. A completed or
 * cancelled order can still be found in history, but it is not open work.
 * An explicit attention flag always promotes an order into the active group.
 */
export function isActivePatientOrder(order: PatientOrder): boolean {
  return order.needsAttention === true || (order.status !== 'completed' && order.status !== 'cancelled');
}

export type PatientOrderSections = {
  active: PatientOrder[];
  past: PatientOrder[];
};

/**
 * Keep BFF order stable within each priority. Attention comes first because
 * it changes the clinician's next action; lifecycle alone does not.
 */
export function groupPatientOrders(orders: readonly PatientOrder[]): PatientOrderSections {
  const active = orders
    .map((order, index) => ({ order, index }))
    .filter(({ order }) => isActivePatientOrder(order))
    .sort((left, right) => {
      const attention = Number(right.order.needsAttention) - Number(left.order.needsAttention);
      return attention === 0 ? left.index - right.index : attention;
    })
    .map(({ order }) => order);

  return {
    active,
    past: orders.filter((order) => !isActivePatientOrder(order)),
  };
}

export function patientOrderMatchesSearch(order: PatientOrder, query: string): boolean {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return true;

  return [order.code, order.placedAtLabel, ...order.lineItems.flatMap((line) => [line.code, line.displayName])]
    .join(' ')
    .toLocaleLowerCase()
    .includes(normalized);
}
