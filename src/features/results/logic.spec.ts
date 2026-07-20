import { describe, expect, it } from 'vitest';

import {
  ADD_ON_EPISODE_SECTIONS,
  ALL_CANCELLED_SECTIONS,
  CRITICAL_POTASSIUM_RESULT,
  HBA1C_RANGE,
  HDL_RANGE,
  PARTIAL_EPISODE_SECTIONS,
  REDRAW_EPISODE_SECTIONS,
  RELEASED_WITH_CANCELLED_SECTIONS,
} from './demo-data';
import {
  activeTestLines,
  episodeProgress,
  episodeProgressLabel,
  flagFor,
  formatDate,
  formatMonthShort,
  parseLabTimestamp,
  rangeDisplay,
  visibleResults,
} from './logic';
import type { LabAnalyteResult } from './types';

function results(sections: typeof PARTIAL_EPISODE_SECTIONS) {
  return sections.flatMap((section) => section.results);
}

describe('line-item anchored progressive release', () => {
  it('counts a multi-analyte panel as one active test line', () => {
    const partial = results(PARTIAL_EPISODE_SECTIONS);
    expect(partial).toHaveLength(6);
    expect(activeTestLines(partial)).toHaveLength(5);
    expect(episodeProgress(partial)).toMatchObject({
      total: 5,
      released: 2,
      terminal: 2,
      pending: 3,
      status: 'partially_complete',
    });
    expect(episodeProgressLabel(episodeProgress(partial))).toBe('2 of 5 ready');
  });

  it('excludes a redraw predecessor and never renders dismissed QC output', () => {
    const redraw = results(REDRAW_EPISODE_SECTIONS);
    expect(activeTestLines(redraw)).toEqual([
      {
        orderLineItemId: 'oli-potassium-redraw',
        testId: 'test-potassium-redraw',
        status: 'in_progress',
      },
    ]);
    expect(visibleResults(redraw).map((result) => result.testId)).toEqual([
      'test-potassium-redraw',
    ]);
  });

  it('reopens completed progress when an add-on line is placed', () => {
    const progress = episodeProgress(results(ADD_ON_EPISODE_SECTIONS));
    expect(progress).toMatchObject({
      total: 3,
      released: 2,
      pending: 1,
      status: 'partially_complete',
    });
    expect(episodeProgressLabel(progress)).toBe('2 of 3 ready');
  });

  it('distinguishes unavailable terminal lines from ready results', () => {
    const progress = episodeProgress(results(RELEASED_WITH_CANCELLED_SECTIONS));
    expect(progress).toMatchObject({
      total: 2,
      released: 1,
      terminal: 2,
      unavailable: 1,
      status: 'completed',
    });
    expect(episodeProgressLabel(progress)).toBe('1 of 2 ready · 1 unavailable');
  });

  it('reports all-terminal no-release episodes as cancelled', () => {
    const progress = episodeProgress(results(ALL_CANCELLED_SECTIONS));
    expect(progress.status).toBe('cancelled');
    expect(progress.unavailable).toBe(2);
    expect(episodeProgressLabel(progress)).toBe('No results — episode cancelled');
  });
});

describe('reference semantics', () => {
  const hdl: LabAnalyteResult = {
    orderLineItemId: 'oli-hdl',
    testId: 'test-hdl',
    analyteCode: 'HDL',
    name: 'HDL-C',
    unit: 'mg/dL',
    status: 'released',
    value: { kind: 'numeric', value: 72 },
    range: HDL_RANGE,
  };

  it('treats every adjacent normal tier as normal', () => {
    expect(flagFor(hdl)).toMatchObject({ severity: 'normal', direction: null });
    expect(rangeDisplay(HDL_RANGE)).toBe('≥40');
  });

  it('keeps diabetes classification abnormal unless a panic tier says otherwise', () => {
    const hba1c: LabAnalyteResult = {
      ...hdl,
      analyteCode: 'HBA1C',
      name: 'Hemoglobin A1c',
      value: { kind: 'numeric', value: 7.1 },
      range: HBA1C_RANGE,
    };
    expect(flagFor(hba1c)).toMatchObject({
      severity: 'abnormal',
      label: 'Diabetes range',
    });
  });

  it('uses explicit catalog panic bounds for critical results', () => {
    expect(flagFor(CRITICAL_POTASSIUM_RESULT)).toMatchObject({
      severity: 'critical',
      direction: 'high',
    });
  });
});

describe('safe date handling', () => {
  it('does not throw for missing or invalid timestamps', () => {
    expect(parseLabTimestamp(null)).toBeNull();
    expect(parseLabTimestamp('not-a-date')).toBeNull();
    expect(formatDate(null)).toBe('Date unavailable');
    expect(formatMonthShort('')).toBe('Unknown date');
  });

  it('accepts date-only and timestamp ISO values', () => {
    expect(parseLabTimestamp('2026-07-16')).not.toBeNull();
    expect(parseLabTimestamp('2026-07-16T08:00:00Z')).not.toBeNull();
  });
});
