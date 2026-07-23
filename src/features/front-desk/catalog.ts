import type { CartItem } from './types';
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from '../lab-catalog/demo-data';
import type { LabCatalogCategory, LabCatalogTest } from '../lab-catalog/types';

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
  { id: 'visit-fee', kind: 'visit', name: 'Clinic visit', priceMinor: '1500', currencyCode: 'USD', category: 'Visit' },
  { id: 'vitals-panel', kind: 'vitals', name: 'Vital signs', priceMinor: '500', currencyCode: 'USD', category: 'Visit' },
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
  // Non-lab desk services: the picker test id and the ORDER_CATALOG id are
  // the same string, so these are a plain identity mapping.
  'visit-fee': 'visit-fee',
  'vitals-panel': 'vitals-panel',
  'xray-chest': 'xray-chest',
  'ecg-12': 'ecg-12',
  telecon: 'telecon',
};

/**
 * Visit-level services (Simple and Usable, "Hard edges" — a category split
 * must match the desk's mental model, not an internal data source) sit
 * ahead of the lab categories: a visit fee and vitals are the highest-
 * frequency lines at a walk-in desk, so they read first, not behind a second
 * control (About Face's commensurate-effort rule: what's used many times a
 * day belongs immediately in reach). Imaging and follow-up sit at the end —
 * genuinely occasional, unlike visit/vitals.
 */
const FRONT_DESK_CATEGORIES: LabCatalogCategory[] = [
  { categoryId: 'visit', code: 'VISIT', displayName: 'Visit', priority: 0, count: 2 },
  { categoryId: 'imaging', code: 'IMAGING', displayName: 'Imaging', priority: 13, count: 1 },
  { categoryId: 'follow-up', code: 'FOLLOWUP', displayName: 'Follow-up', priority: 14, count: 1 },
];

/** 12-lead ECG joins the existing Cardiac lab tests — same clinical category. */
const LAB_CATEGORIES_WITH_ECG = LAB_CATALOG_CATEGORIES.map((category) =>
  category.categoryId === 'cardiac' ? { ...category, count: category.count + 1 } : category,
);

const FRONT_DESK_SERVICE_TESTS: LabCatalogTest[] = [
  {
    testCatalogId: 'visit-fee',
    code: 'SVC_VISIT',
    displayName: 'Clinic visit',
    kind: 'service',
    status: 'active',
    categoryIds: ['visit'],
    preview: { specimen: 'None', turnaround: 'Same visit', priceMinor: '1500', currencyCode: 'USD' },
  },
  {
    testCatalogId: 'vitals-panel',
    code: 'SVC_VITALS',
    displayName: 'Vital signs',
    kind: 'service',
    status: 'active',
    categoryIds: ['visit'],
    preview: { specimen: 'None', turnaround: 'Same visit', priceMinor: '500', currencyCode: 'USD' },
  },
  {
    testCatalogId: 'xray-chest',
    code: 'SVC_XRAY_CHEST',
    displayName: 'Chest X-ray',
    kind: 'service',
    status: 'active',
    categoryIds: ['imaging'],
    preview: { specimen: 'None', turnaround: 'Same-day', priceMinor: '1800', currencyCode: 'USD' },
  },
  {
    testCatalogId: 'ecg-12',
    code: 'SVC_ECG_12',
    displayName: '12-lead ECG',
    kind: 'service',
    status: 'active',
    categoryIds: ['cardiac'],
    preview: { specimen: 'None', turnaround: 'Same-day', priceMinor: '1000', currencyCode: 'USD' },
  },
  {
    testCatalogId: 'telecon',
    code: 'SVC_TELECON',
    displayName: 'Teleconsultation',
    kind: 'consult',
    status: 'active',
    categoryIds: ['follow-up'],
    preview: { specimen: 'None', turnaround: 'Scheduled', priceMinor: '0', currencyCode: 'USD' },
  },
];

/**
 * Front-desk adapter for the canonical Storybook Test Picker. The priced order
 * catalog stays the source of truth. The full lab catalog remains visible;
 * tests without a front-desk quote are explicitly unavailable to order. Desk
 * services (visit, vitals, imaging, ECG, telecon) are ordered through the
 * same picker and search, not a separate mechanism — see catalog.ts history
 * for the "Additional order types" popover this replaced.
 */
export const ORDER_PICKER_CATEGORIES = [...LAB_CATEGORIES_WITH_ECG, ...FRONT_DESK_CATEGORIES];

export function orderEntryForPickerTest(testId: string): CatalogEntry | undefined {
  const entryId = ORDER_ENTRY_ID_BY_PICKER_TEST_ID[testId];
  return entryId
    ? ORDER_CATALOG.find((entry) => entry.id === entryId)
    : undefined;
}

const ORDER_PICKER_LAB_TESTS: LabCatalogTest[] = LAB_CATALOG_TESTS.map((test) => {
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

export const ORDER_PICKER_TESTS: LabCatalogTest[] = [
  ...ORDER_PICKER_LAB_TESTS,
  ...FRONT_DESK_SERVICE_TESTS,
];

/* Word-bounded: "fasting" must never match the STI class. */
export const SENSITIVE_TEST_PATTERN = /\b(?:hiv|sti|genetic)\b/i;
