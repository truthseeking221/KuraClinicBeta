import type { LabCatalogCategory, LabCatalogTest } from './types';
import { legacyPreviewFor } from './legacy-preview-demo-data';

const category = (
  categoryId: string,
  code: string,
  displayName: string,
  priority: number,
  count: number,
): LabCatalogCategory => ({ categoryId, code, displayName, priority, count });

export const LAB_CATALOG_CATEGORIES: LabCatalogCategory[] = [
  category('glycemic', 'GLYCEMIC', 'Glycemic control', 1, 9),
  category('lipids', 'LIPIDS', 'Lipids', 2, 10),
  category('renal', 'RENAL', 'Renal function', 3, 10),
  category('liver', 'LIVER', 'Liver function', 4, 9),
  category('hematology', 'HEMATOLOGY', 'Hematology', 5, 7),
  category('cardiac', 'CARDIAC', 'Cardiac', 6, 3),
  category('thyroid', 'THYROID', 'Thyroid', 7, 3),
  category('endocrine', 'ENDOCRINE', 'Endocrine', 8, 1),
  category('vitamins', 'VITAMINS', 'Vitamins', 9, 3),
  category('hormones', 'HORMONES', 'Hormones', 10, 4),
  category('infectious', 'INFECTIOUS', 'Infectious', 11, 4),
  category('tumor-markers', 'TUMOR_MARKERS', 'Tumor markers', 12, 4),
];

type FixtureInput = {
  id: string;
  name: string;
  code: string;
  categoryId: string;
  abbrv?: string;
  kind?: LabCatalogTest['kind'];
  componentCount?: number;
  unavailableReason?: string;
  requiredPreAnalyticalFields?: string[];
};

const test = ({
  id,
  name,
  code,
  categoryId,
  abbrv,
  kind = 'analyte',
  componentCount,
  unavailableReason,
  requiredPreAnalyticalFields,
}: FixtureInput): LabCatalogTest => ({
  testCatalogId: id,
  code,
  displayName: name,
  abbrv,
  kind,
  status: 'active',
  categoryIds: [categoryId],
  componentCount,
  availability: unavailableReason ? 'unavailable' : 'available',
  unavailableReason,
  requiredPreAnalyticalFields,
  preview: legacyPreviewFor(id),
});

export const LAB_CATALOG_TESTS: LabCatalogTest[] = [
  test({ id: 'hba1c', name: 'HbA1c', code: 'TC_HBA1C', abbrv: 'A1C', categoryId: 'glycemic' }),
  test({ id: 'fasting-glucose', name: 'Fasting glucose', code: 'TC_GLUCOSE', abbrv: 'FBS', categoryId: 'glycemic', requiredPreAnalyticalFields: ['fasting_duration_hours'] }),
  test({ id: 'ogtt', name: 'OGTT (gestational)', code: 'TC_OGTT_GDM', abbrv: 'OGTT', categoryId: 'glycemic', requiredPreAnalyticalFields: ['fasting_duration_hours', 'gestational_age_weeks'] }),
  test({ id: 'insulin', name: 'Insulin', code: 'TC_INSULIN', categoryId: 'glycemic' }),
  test({ id: 'c-peptide', name: 'C-peptide', code: 'TC_C_PEPTIDE', categoryId: 'glycemic' }),
  test({ id: 'fructosamine', name: 'Fructosamine', code: 'TC_FRUCTOSAMINE', categoryId: 'glycemic' }),
  test({ id: 'random-glucose', name: 'Random glucose', code: 'TC_GLUCOSE_RANDOM', abbrv: 'RBS', categoryId: 'glycemic' }),
  test({ id: 'postprandial-glucose', name: '2h postprandial', code: 'TC_GLUPP', abbrv: 'PP2', categoryId: 'glycemic' }),
  test({ id: 'gad-antibodies', name: 'GAD antibodies', code: 'TC_GAD65', categoryId: 'glycemic', unavailableReason: 'Reagents restocking · expected back 18 Jul' }),

  test({ id: 'lipid-panel', name: 'Lipid panel', code: 'TC_LIPID_PANEL', categoryId: 'lipids', kind: 'panel', componentCount: 4, requiredPreAnalyticalFields: ['fasting_duration_hours'] }),
  test({ id: 'total-cholesterol', name: 'Total cholesterol', code: 'TC_CHOL_TOTAL', categoryId: 'lipids' }),
  test({ id: 'ldl-c', name: 'LDL-C', code: 'TC_LDL_C', categoryId: 'lipids' }),
  test({ id: 'hdl-c', name: 'HDL-C', code: 'TC_HDL_C', categoryId: 'lipids' }),
  test({ id: 'triglycerides', name: 'Triglycerides', code: 'TC_TRIGLYCERIDES', categoryId: 'lipids', requiredPreAnalyticalFields: ['fasting_duration_hours'] }),
  test({ id: 'apob', name: 'Apolipoprotein B', code: 'TC_APOB', abbrv: 'ApoB', categoryId: 'lipids' }),
  test({ id: 'lpa', name: 'Lipoprotein(a)', code: 'TC_LPA', abbrv: 'Lp(a)', categoryId: 'lipids' }),
  test({ id: 'apo-ai', name: 'Apo AI', code: 'TC_APOA1', categoryId: 'lipids' }),
  test({ id: 'vldl', name: 'VLDL', code: 'TC_VLDL', categoryId: 'lipids', kind: 'derived' }),
  test({ id: 'non-hdl', name: 'Non-HDL cholesterol', code: 'TC_NON_HDL', categoryId: 'lipids', kind: 'derived' }),

  test({ id: 'creatinine-egfr', name: 'Creatinine + eGFR', code: 'TC_CREATININE_EGFR', categoryId: 'renal', kind: 'panel', componentCount: 2 }),
  test({ id: 'urea-bun', name: 'Urea (BUN)', code: 'TC_BUN', categoryId: 'renal' }),
  test({ id: 'microalbumin', name: 'Microalbumin', code: 'TC_MICROALBUMIN', categoryId: 'renal' }),
  test({ id: 'cystatin-c', name: 'Cystatin C', code: 'TC_CYSTATIN_C', categoryId: 'renal' }),
  test({ id: 'uric-acid', name: 'Uric acid', code: 'TC_URIC_ACID', categoryId: 'renal' }),
  test({ id: 'electrolytes-panel', name: 'Electrolytes panel', code: 'TC_ELECTROLYTES', categoryId: 'renal', kind: 'panel', componentCount: 4 }),
  test({ id: 'serum-calcium', name: 'Serum calcium', code: 'TC_CALCIUM', categoryId: 'renal' }),
  test({ id: 'albumin-creatinine-ratio', name: 'Albumin/creatinine ratio', code: 'TC_ACR', abbrv: 'ACR', categoryId: 'renal' }),
  test({ id: 'phosphate', name: 'Phosphate', code: 'TC_PHOSPHATE', categoryId: 'renal' }),
  test({ id: 'creatinine-clearance', name: 'Creatinine clearance', code: 'TC_CRCL', categoryId: 'renal', requiredPreAnalyticalFields: ['collection_duration_hours'] }),

  test({ id: 'alt', name: 'ALT', code: 'TC_ALT', categoryId: 'liver' }),
  test({ id: 'ast', name: 'AST', code: 'TC_AST', categoryId: 'liver' }),
  test({ id: 'alp', name: 'ALP', code: 'TC_ALP', categoryId: 'liver' }),
  test({ id: 'ggt', name: 'GGT', code: 'TC_GGT', categoryId: 'liver' }),
  test({ id: 'bilirubin-total', name: 'Bilirubin total', code: 'TC_BILIRUBIN_TOTAL', categoryId: 'liver' }),
  test({ id: 'bilirubin-direct', name: 'Bilirubin direct', code: 'TC_BILIRUBIN_DIRECT', categoryId: 'liver' }),
  test({ id: 'albumin', name: 'Albumin', code: 'TC_ALBUMIN', categoryId: 'liver' }),
  test({ id: 'total-protein', name: 'Total protein', code: 'TC_TOTAL_PROTEIN', categoryId: 'liver' }),
  test({ id: 'pt-inr', name: 'PT / INR', code: 'TC_PT_INR', categoryId: 'liver' }),

  test({ id: 'cbc', name: 'Complete blood count', code: 'TC_CBC', abbrv: 'CBC', categoryId: 'hematology', kind: 'panel', componentCount: 27 }),
  test({ id: 'esr', name: 'ESR', code: 'TC_ESR', categoryId: 'hematology' }),
  test({ id: 'ferritin', name: 'Ferritin', code: 'TC_FERRITIN', categoryId: 'hematology' }),
  test({ id: 'iron-panel', name: 'Iron panel', code: 'TC_IRON_PANEL', categoryId: 'hematology', kind: 'panel', componentCount: 4 }),
  test({ id: 'reticulocyte', name: 'Reticulocyte', code: 'TC_RETIC', categoryId: 'hematology' }),
  test({ id: 'transferrin', name: 'Transferrin', code: 'TC_TRANSFERRIN', categoryId: 'hematology' }),
  test({ id: 'haptoglobin', name: 'Haptoglobin', code: 'TC_HAPTOGLOBIN', categoryId: 'hematology' }),

  test({ id: 'troponin-i', name: 'Troponin I', code: 'TC_TROPONIN_I', categoryId: 'cardiac' }),
  test({ id: 'nt-probnp', name: 'NT-proBNP', code: 'TC_NT_PROBNP', categoryId: 'cardiac' }),
  test({ id: 'hs-crp', name: 'hs-CRP', code: 'TC_HS_CRP', categoryId: 'cardiac' }),

  test({ id: 'tsh', name: 'TSH', code: 'TC_TSH', categoryId: 'thyroid' }),
  test({ id: 'free-t4', name: 'Free T4', code: 'TC_FREE_T4', abbrv: 'FT4', categoryId: 'thyroid' }),
  test({ id: 'free-t3', name: 'Free T3', code: 'TC_FREE_T3', abbrv: 'FT3', categoryId: 'thyroid' }),

  test({ id: 'pth', name: 'PTH', code: 'TC_PTH', categoryId: 'endocrine' }),

  test({ id: 'vitamin-b12', name: 'Vitamin B12', code: 'TC_VITAMIN_B12', categoryId: 'vitamins' }),
  test({ id: 'folate', name: 'Folate', code: 'TC_FOLATE', categoryId: 'vitamins' }),
  test({ id: 'vitamin-d', name: 'Vitamin D (25-OH)', code: 'TC_VITAMIN_D_25OH', categoryId: 'vitamins' }),

  test({ id: 'cortisol', name: 'Cortisol', code: 'TC_CORTISOL', categoryId: 'hormones', requiredPreAnalyticalFields: ['collection_time'] }),
  test({ id: 'prolactin', name: 'Prolactin', code: 'TC_PROLACTIN', categoryId: 'hormones' }),
  test({ id: 'testosterone', name: 'Testosterone', code: 'TC_TESTOSTERONE', categoryId: 'hormones', requiredPreAnalyticalFields: ['collection_time'] }),
  test({ id: 'estradiol', name: 'Estradiol', code: 'TC_ESTRADIOL', categoryId: 'hormones' }),

  test({ id: 'hbsag', name: 'HBsAg', code: 'TC_HBSAG', categoryId: 'infectious' }),
  test({ id: 'hiv-4gen', name: 'HIV 4th-gen Ag/Ab', code: 'TC_HIV_4G', categoryId: 'infectious' }),
  test({ id: 'hcv-ab', name: 'HCV antibody', code: 'TC_HCV_AB', categoryId: 'infectious' }),
  test({ id: 'rpr', name: 'Syphilis RPR', code: 'TC_RPR', categoryId: 'infectious' }),

  test({ id: 'psa', name: 'PSA', code: 'TC_PSA', categoryId: 'tumor-markers' }),
  test({ id: 'cea', name: 'CEA', code: 'TC_CEA', categoryId: 'tumor-markers' }),
  test({ id: 'afp', name: 'AFP', code: 'TC_AFP', categoryId: 'tumor-markers' }),
  test({ id: 'ca-125', name: 'CA-125', code: 'TC_CA125', categoryId: 'tumor-markers' }),
];

export const FIGMA_DEFAULT_SELECTED_TEST_IDS = [
  'fasting-glucose',
  'ogtt',
  'insulin',
  'c-peptide',
  'fructosamine',
  'random-glucose',
  'postprandial-glucose',
  'lipid-panel',
  'total-cholesterol',
  'triglycerides',
  'vldl',
  'non-hdl',
  'creatinine-egfr',
  'cystatin-c',
  'electrolytes-panel',
  'serum-calcium',
  'cbc',
  'esr',
  'ferritin',
  'iron-panel',
  'haptoglobin',
] as const;
