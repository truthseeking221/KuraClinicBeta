import type { LabCatalogTestPreview } from './types';

type LegacyPreviewSeed = {
  priceUsd: number;
  specimen: string;
  turnaround: string;
  preparation?: string;
};

/**
 * Operational preview facts carried over from Legacy DCM's validated catalog.
 * They remain demo fixtures until the clinic catalog BFF exposes these fields.
 */
const LEGACY_PREVIEW_SEEDS: Record<string, LegacyPreviewSeed> = {
  hba1c: { priceUsd: 8, specimen: 'Blood', turnaround: 'Same-day', preparation: 'No fasting' },
  'fasting-glucose': { priceUsd: 5, specimen: 'Blood', turnaround: 'Same-day', preparation: 'Fasting 9–12h' },
  ogtt: { priceUsd: 18, specimen: 'Blood', turnaround: 'Same-day', preparation: 'Fasting 9–12h' },
  insulin: { priceUsd: 14, specimen: 'Blood', turnaround: '24h', preparation: 'Fasting 9–12h' },
  'c-peptide': { priceUsd: 18, specimen: 'Blood', turnaround: '24h' },
  fructosamine: { priceUsd: 14, specimen: 'Blood', turnaround: '24h' },
  'random-glucose': { priceUsd: 5, specimen: 'Blood', turnaround: 'Same-day' },
  'postprandial-glucose': { priceUsd: 5, specimen: 'Blood', turnaround: 'Same-day' },
  'gad-antibodies': { priceUsd: 24, specimen: 'Blood', turnaround: '5 days' },
  'lipid-panel': { priceUsd: 18, specimen: 'Blood', turnaround: 'Same-day', preparation: 'Fasting 9–12h' },
  'total-cholesterol': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  'ldl-c': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day', preparation: 'Fasting 9–12h' },
  'hdl-c': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  triglycerides: { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day', preparation: 'Fasting 9–12h' },
  apob: { priceUsd: 16, specimen: 'Blood', turnaround: '48h' },
  lpa: { priceUsd: 16, specimen: 'Blood', turnaround: '5 days' },
  'apo-ai': { priceUsd: 16, specimen: 'Blood', turnaround: '48h' },
  vldl: { priceUsd: 8, specimen: 'Blood', turnaround: 'Same-day' },
  'non-hdl': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  'creatinine-egfr': { priceUsd: 8, specimen: 'Blood', turnaround: 'Same-day' },
  'urea-bun': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  microalbumin: { priceUsd: 8, specimen: 'Urine', turnaround: 'Same-day' },
  'cystatin-c': { priceUsd: 22, specimen: 'Blood', turnaround: '48h' },
  'uric-acid': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  'electrolytes-panel': { priceUsd: 13, specimen: 'Blood', turnaround: 'Same-day' },
  'serum-calcium': { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  'albumin-creatinine-ratio': { priceUsd: 10, specimen: 'Urine', turnaround: 'Same-day' },
  phosphate: { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  'creatinine-clearance': { priceUsd: 16, specimen: 'Blood, urine', turnaround: '24h', preparation: '24h urine collection' },
  alt: { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  ast: { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  alp: { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  ggt: { priceUsd: 8, specimen: 'Blood', turnaround: 'Same-day' },
  'bilirubin-total': { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  'bilirubin-direct': { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  albumin: { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  'total-protein': { priceUsd: 6, specimen: 'Blood', turnaround: 'Same-day' },
  'pt-inr': { priceUsd: 11, specimen: 'Blood', turnaround: 'Same-day' },
  cbc: { priceUsd: 9, specimen: 'Blood', turnaround: 'Same-day' },
  esr: { priceUsd: 7, specimen: 'Blood', turnaround: 'Same-day' },
  ferritin: { priceUsd: 14, specimen: 'Blood', turnaround: '24h' },
  'iron-panel': { priceUsd: 18, specimen: 'Blood', turnaround: '24h', preparation: 'Morning draw preferred' },
  reticulocyte: { priceUsd: 10, specimen: 'Blood', turnaround: 'Same-day' },
  'vitamin-b12': { priceUsd: 16, specimen: 'Blood', turnaround: '24h' },
  folate: { priceUsd: 16, specimen: 'Blood', turnaround: '24h' },
  transferrin: { priceUsd: 14, specimen: 'Blood', turnaround: '48h' },
  haptoglobin: { priceUsd: 18, specimen: 'Blood', turnaround: '48h' },
  tsh: { priceUsd: 12, specimen: 'Blood', turnaround: '24h' },
  'free-t4': { priceUsd: 12, specimen: 'Blood', turnaround: '24h' },
  'free-t3': { priceUsd: 12, specimen: 'Blood', turnaround: '24h' },
  cortisol: { priceUsd: 16, specimen: 'Blood, saliva', turnaround: '24h', preparation: '8am draw' },
  'vitamin-d': { priceUsd: 20, specimen: 'Blood', turnaround: '48h' },
  pth: { priceUsd: 22, specimen: 'Blood', turnaround: '48h' },
  prolactin: { priceUsd: 14, specimen: 'Blood', turnaround: '24h' },
  testosterone: { priceUsd: 18, specimen: 'Blood', turnaround: '24h', preparation: 'Morning draw preferred' },
  estradiol: { priceUsd: 18, specimen: 'Blood', turnaround: '24h' },
  'troponin-i': { priceUsd: 20, specimen: 'Blood', turnaround: 'Same-day' },
  'nt-probnp': { priceUsd: 22, specimen: 'Blood', turnaround: '24h' },
  'hs-crp': { priceUsd: 12, specimen: 'Blood', turnaround: '24h' },
  hbsag: { priceUsd: 4, specimen: 'Blood', turnaround: '24h' },
  'hiv-4gen': { priceUsd: 8, specimen: 'Blood', turnaround: '24h' },
  'hcv-ab': { priceUsd: 8, specimen: 'Blood', turnaround: '24h' },
  rpr: { priceUsd: 7, specimen: 'Blood', turnaround: '24h' },
  psa: { priceUsd: 18, specimen: 'Blood', turnaround: '48h' },
  cea: { priceUsd: 20, specimen: 'Blood', turnaround: '48h' },
  afp: { priceUsd: 18, specimen: 'Blood', turnaround: '48h' },
  'ca-125': { priceUsd: 24, specimen: 'Blood', turnaround: '48h' },
};

const LEGACY_PREVIEW_DETAILS: Partial<Record<string, Partial<LabCatalogTestPreview>>> = {
  hba1c: {
    description: 'Three-month glycemic exposure for diabetes diagnosis and monitoring.',
    specimen: 'Whole blood',
    referenceRange: '<5.7% normal · <7.0% common diabetes goal',
    analytical: [
      { label: 'Analyzer', value: 'Tosoh HLC-723 G11' },
      { label: 'Method', value: 'HPLC (ion-exchange)' },
    ],
    handling: [
      { label: 'Stability', value: '7 d at 2–8°C · 3 d room temp' },
      { label: 'Transport', value: 'Refrigerated 2–8°C' },
    ],
  },
  'fasting-glucose': {
    description: 'Point-in-time fasting glucose for diagnosis and medication adjustment.',
    specimen: 'Serum/plasma',
    referenceRange: '70–99 mg/dL',
  },
  'lipid-panel': {
    description: 'Cholesterol fractions for ASCVD risk review and statin follow-up.',
    specimen: 'Serum',
    referenceRange: 'LDL goal often <100 mg/dL',
  },
  'creatinine-egfr': {
    description: 'Kidney filtration estimate for CKD staging and renal dose decisions.',
    specimen: 'Serum',
    referenceRange: 'Creatinine 0.6–1.3 mg/dL · eGFR ≥60',
  },
  microalbumin: {
    description: 'Albuminuria surveillance for diabetes and CKD risk.',
    specimen: 'Spot urine',
    referenceRange: '<30 mg/g',
  },
  cbc: {
    description: 'Hemoglobin, platelets, and white-cell indices for anemia and infection review.',
    specimen: 'EDTA whole blood',
    referenceRange: 'Hgb F 12–16 g/dL · M 13.5–17.5 g/dL',
    analytical: [{ label: 'Method', value: 'Automated impedance / flow cytometry' }],
    handling: [
      { label: 'Stability', value: '24h room temp · 48h at 2–8°C for most indices' },
      { label: 'Transport', value: 'Room temp or refrigerated 2–8°C' },
    ],
  },
  'vitamin-b12': {
    description: 'B12 status for anemia, neuropathy, and metformin monitoring.',
    specimen: 'Serum',
    referenceRange: '200–900 pg/mL',
  },
  tsh: {
    description: 'First-line thyroid function screen and treatment monitoring.',
    specimen: 'Serum',
    referenceRange: '0.4–4.0 mIU/L',
  },
  'vitamin-d': {
    description: 'Vitamin D status for bone health and deficiency follow-up.',
    specimen: 'Serum',
    referenceRange: '30–100 ng/mL',
  },
  'troponin-i': {
    description: 'Cardiac injury marker for urgent chest-pain evaluation.',
    specimen: 'Serum/plasma',
    referenceRange: '<0.04 ng/mL',
  },
};

export function legacyPreviewFor(testId: string): LabCatalogTestPreview | undefined {
  const seed = LEGACY_PREVIEW_SEEDS[testId];
  if (!seed) return undefined;

  return {
    preparation: seed.preparation,
    specimen: seed.specimen,
    turnaround: seed.turnaround,
    priceMinor: String(seed.priceUsd * 100),
    currencyCode: 'USD',
    earningMinor: String(seed.priceUsd * 60),
    ...LEGACY_PREVIEW_DETAILS[testId],
  };
}
