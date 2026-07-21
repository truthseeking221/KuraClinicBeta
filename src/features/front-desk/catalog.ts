import type { CartItem } from './types';
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from '../lab-catalog/demo-data';
import type { LabCatalogTest } from '../lab-catalog/types';

export type CatalogEntry = Omit<CartItem, 'qty'> & {
  category: string;
  fasting?: boolean;
  /** Estimated result turnaround for the internal lab, in hours. */
  tatHours?: number;
  /** Sensitive tests require explicit consent language in the intake review. */
  sensitive?: boolean;
  /**
   * Analytes a panel resolves to. Ordering a panel plus one of its member
   * analytes duplicates work — the desk gets an explicit overlap blocker.
   */
  analytes?: string[];
  /** Listed but not orderable here (e.g. outsourced assay not yet contracted). */
  unsupported?: boolean;
};

/** Compact order catalog for the front-desk flow. */
export const ORDER_CATALOG: CatalogEntry[] = [
  { id: 'cbc', tatHours: 4, kind: 'lab', name: 'CBC', priceMinor: '600', currencyCode: 'USD', category: 'Hematology' },
  { id: 'hba1c', tatHours: 24, kind: 'lab', name: 'HbA1c', priceMinor: '900', currencyCode: 'USD', category: 'Diabetes', fasting: false },
  { id: 'glucose-f', tatHours: 4, kind: 'lab', name: 'Glucose (fasting)', priceMinor: '400', currencyCode: 'USD', category: 'Diabetes', fasting: true, analytes: ['glucose'] },
  { id: 'cmp', tatHours: 6, kind: 'lab', name: 'CMP (metabolic panel)', priceMinor: '1500', currencyCode: 'USD', category: 'Chemistry', fasting: true, analytes: ['glucose', 'creatinine', 'alt', 'ast'] },
  { id: 'lipid', tatHours: 6, kind: 'lab', name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD', category: 'Cardiac', fasting: true },
  { id: 'creatinine', tatHours: 4, kind: 'lab', name: 'Creatinine + eGFR', priceMinor: '500', currencyCode: 'USD', category: 'Renal', analytes: ['creatinine'] },
  { id: 'alt-ast', tatHours: 4, kind: 'lab', name: 'ALT / AST', priceMinor: '700', currencyCode: 'USD', category: 'Liver', analytes: ['alt', 'ast'] },
  { id: 'tsh', tatHours: 24, kind: 'lab', name: 'TSH', priceMinor: '800', currencyCode: 'USD', category: 'Thyroid' },
  { id: 'hiv-ag-ab', tatHours: 48, kind: 'lab', name: 'HIV Ag/Ab combo', priceMinor: '1000', currencyCode: 'USD', category: 'Serology', sensitive: true },
  { id: 'lpa', tatHours: 120, kind: 'lab', name: 'Lipoprotein(a)', priceMinor: '3200', currencyCode: 'USD', category: 'Cardiac', unsupported: true },
  { id: 'xray-chest', tatHours: 2, kind: 'imaging', name: 'Chest X-ray', priceMinor: '1800', currencyCode: 'USD', category: 'Imaging' },
  { id: 'ecg-12', tatHours: 1, kind: 'ecg', name: '12-lead ECG', priceMinor: '1000', currencyCode: 'USD', category: 'Cardiac' },
  { id: 'telecon', kind: 'telecon', name: 'Teleconsultation', priceMinor: '0', currencyCode: 'USD', category: 'Follow-up' },
];

const ORDER_ENTRY_ID_BY_PICKER_TEST_ID: Record<string, string> = {
  cbc: 'cbc',
  'creatinine-egfr': 'creatinine',
  'fasting-glucose': 'glucose-f',
  hba1c: 'hba1c',
  'hiv-4gen': 'hiv-ag-ab',
  'lipid-panel': 'lipid',
  lpa: 'lpa',
  tsh: 'tsh',
};

/**
 * Front-desk adapter for the canonical Storybook Test Picker. The priced order
 * catalog stays the source of truth. The full 67-test catalog remains visible;
 * tests without a front-desk quote are explicitly unavailable to order.
 */
export const ORDER_PICKER_CATEGORIES = LAB_CATALOG_CATEGORIES;

export function orderEntryForPickerTest(testId: string): CatalogEntry | undefined {
  const entryId = ORDER_ENTRY_ID_BY_PICKER_TEST_ID[testId];
  return entryId
    ? ORDER_CATALOG.find((entry) => entry.id === entryId)
    : undefined;
}

export const ORDER_PICKER_TESTS: LabCatalogTest[] = LAB_CATALOG_TESTS.map((test) => {
  const entry = orderEntryForPickerTest(test.testCatalogId);

  if (test.availability === 'unavailable') return test;
  if (!entry) {
    return {
      ...test,
      availability: 'unavailable',
      unavailableReason: 'Price unavailable at this clinic',
    };
  }
  if (entry.unsupported) {
    return {
      ...test,
      availability: 'unavailable',
      unavailableReason: 'Not orderable at this lab yet',
    };
  }
  return test;
});

const PICKER_ORDER_ENTRY_IDS = new Set(Object.values(ORDER_ENTRY_ID_BY_PICKER_TEST_ID));

/** Orders outside the lab catalog keep their priced front-desk controls. */
export const OTHER_ORDER_ENTRIES = ORDER_CATALOG.filter(
  (entry) => !PICKER_ORDER_ENTRY_IDS.has(entry.id),
);

/* Word-bounded: "fasting" must never match the STI class. */
export const SENSITIVE_TEST_PATTERN = /\b(?:hiv|sti|genetic)\b/i;
