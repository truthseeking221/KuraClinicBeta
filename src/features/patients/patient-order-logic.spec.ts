import { describe, expect, it } from 'vitest';

import { groupPatientOrders, isActivePatientOrder } from './patient-order-logic';
import type { PatientOrder } from './types';

const order = (
  ordId: string,
  status: PatientOrder['status'],
  needsAttention = false,
): PatientOrder => ({
  ordId,
  code: ordId.toUpperCase(),
  placedAtLabel: 'Placed 22 Jul 2026',
  status,
  needsAttention,
  lineItems: [{ code: 'CRE', displayName: 'Creatinine' }],
});

describe('patient order lifecycle grouping', () => {
  it('does not count completed or cancelled orders as active work', () => {
    expect(isActivePatientOrder(order('completed', 'completed'))).toBe(false);
    expect(isActivePatientOrder(order('cancelled', 'cancelled'))).toBe(false);
    expect(groupPatientOrders([order('completed', 'completed'), order('cancelled', 'cancelled')]).active).toHaveLength(0);
  });

  it('counts one placed order as active work', () => {
    expect(groupPatientOrders([order('placed', 'placed')]).active).toHaveLength(1);
  });

  it('places needs-attention orders before other active orders', () => {
    const sections = groupPatientOrders([
      order('placed-first', 'placed'),
      order('attention', 'in_fulfillment', true),
      order('partial', 'partially_complete'),
    ]);

    expect(sections.active.map(({ ordId }) => ordId)).toEqual([
      'attention',
      'placed-first',
      'partial',
    ]);
  });
});
