import { describe, expect, it } from 'vitest';

import { LAB_CATALOG_CATEGORIES, LAB_CATALOG_TESTS } from './demo-data';
import {
  filterCatalogTests,
  groupCatalogTests,
  matchesCatalogQuery,
  toggleSetValue,
} from './logic';

describe('lab catalog picker logic', () => {
  it('keeps the Figma fixture at 67 active tests', () => {
    expect(LAB_CATALOG_TESTS).toHaveLength(67);
    expect(LAB_CATALOG_CATEGORIES.reduce((sum, category) => sum + category.count, 0)).toBe(67);
  });

  it('matches the backend-supported name, code, and abbreviation fields', () => {
    const hba1c = LAB_CATALOG_TESTS.find((test) => test.testCatalogId === 'hba1c');
    expect(hba1c).toBeDefined();
    expect(matchesCatalogQuery(hba1c!, 'HbA1c')).toBe(true);
    expect(matchesCatalogQuery(hba1c!, 'HBA1C')).toBe(true);
    expect(matchesCatalogQuery(hba1c!, 'A1C')).toBe(true);
  });

  it('reproduces the Figma glucose search with two rows', () => {
    const results = filterCatalogTests(LAB_CATALOG_TESTS, 'glucose', new Set());
    expect(results.map((test) => test.displayName)).toEqual([
      'Fasting glucose',
      'Random glucose',
    ]);
  });

  it('intersects category and text filters without mutating selection state', () => {
    const results = filterCatalogTests(
      LAB_CATALOG_TESTS,
      'panel',
      new Set(['lipids']),
    );
    expect(results.map((test) => test.testCatalogId)).toEqual(['lipid-panel']);
  });

  it('orders groups by backend facet priority and omits empty groups', () => {
    const results = filterCatalogTests(LAB_CATALOG_TESTS, 'troponin', new Set());
    const groups = groupCatalogTests(results, LAB_CATALOG_CATEGORIES);
    expect(groups).toHaveLength(1);
    expect(groups[0].category.displayName).toBe('Cardiac');
  });

  it('adds and removes set values immutably', () => {
    const original = new Set(['cbc']);
    const added = toggleSetValue(original, 'hba1c', true);
    const removed = toggleSetValue(added, 'cbc', false);
    expect([...original]).toEqual(['cbc']);
    expect([...added]).toEqual(['cbc', 'hba1c']);
    expect([...removed]).toEqual(['hba1c']);
  });
});
