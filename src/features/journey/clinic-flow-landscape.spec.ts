import { describe, expect, it } from 'vitest';

import {
  CLINIC_FLOW_STAGES,
  FLOW_COVERAGE_TOTALS,
  FLOW_JOURNEY_TOTAL,
} from './clinic-flow-landscape-data';

describe('clinic flow landscape evidence', () => {
  it('covers every canonical doctor-impacting journey once', () => {
    expect(CLINIC_FLOW_STAGES).toHaveLength(10);
    expect(FLOW_JOURNEY_TOTAL).toBe(163);
  });

  it('matches the generated journey coverage matrix', () => {
    expect(FLOW_COVERAGE_TOTALS).toEqual({
      IMPLEMENTED: 17,
      PARTIAL: 89,
      DECIDED: 23,
      OPEN: 25,
      DEFERRED: 6,
      'DESIGN-GAP': 3,
    });
  });
});
