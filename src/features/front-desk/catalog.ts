import type { CartItem } from './types';

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

/* Word-bounded: "fasting" must never match the STI class. */
export const SENSITIVE_TEST_PATTERN = /\b(?:hiv|sti|genetic)\b/i;
