import type { LabHistoryItem, LabHistorySection } from "./lab-history-browser";
import type {
  LabAnalyteResult,
  LabResultPoint,
  LabResultValue,
  ReferenceRange,
  ReferenceTier,
} from "./types";

/**
 * Synthetic longitudinal fixture carried forward from Legacy DCM. The browser
 * adapter keeps the original five draws and 60 report rows while exposing 57
 * primary analytes; three constituent values remain available in Table view.
 */
const LEGACY_DATES = [
  "2026-05-21",
  "2026-04-20",
  "2026-03-20",
  "2026-02-18",
  "2026-01-15",
] as const;

const LEGACY_RESULTS_CSV = `Section,Test,Unit,Reference,2026-05-21,2026-04-20,2026-03-20,2026-02-18,2026-01-15
HEMATOLOGY,Erythrocyte Sedimentation Rate 1 hour,mm,N: < 20,33,30,42,26,53
CELL BLOOD COUNT,White blood cell,10^3/uL,4.0-10,7.4,7.7,7.9,7.4,7.3
CELL BLOOD COUNT,Red blood cell,10^6/uL,3.8-5.3,3.7,3.6,3.6,3.0,3.3
CELL BLOOD COUNT,Haemoglobin,g/dL,12-16,11.0,10.6,10.9,9.2,10.3
CELL BLOOD COUNT,Hematocrit,%,38-47,33.3,32.6,32.6,27.2,30.7
CELL BLOOD COUNT,M.C.V,fL,80-95,90.2,91.8,91.6,91.6,92.2
CELL BLOOD COUNT,M.C.H,pg,27-32,29.8,29.9,30.6,31.0,30.9
CELL BLOOD COUNT,M.C.H.C,g/dL,32-36,33.0,32.5,33.4,33.8,33.6
CELL BLOOD COUNT,Platelet count,10^3/uL,150-400,189,195,239,217,205
DIFFERENTIAL COUNT,Neutrophils,%,40-74,62.6,74.4,59.4,60.6,68.1
DIFFERENTIAL COUNT,Eosinophils,%,0.0-7.0,2.7,1.0,2.8,3.9,3.2
DIFFERENTIAL COUNT,Basophils,%,0.0-1.5,0.5,0.4,0.6,0.4,0.5
DIFFERENTIAL COUNT,Lymphocytes,%,20-50,26.6,17.9,28.1,25.7,19.4
DIFFERENTIAL COUNT,Monocytes,%,0.0-11,7.6,6.3,9.1,9.4,8.8
BIOCHEMISTRY,Albumin,g/dL,3.5-5.2,4.7,4.5,4.8,4.5,4.7
BIOCHEMISTRY,Glucose,mg/dL,74-109,105,124,95,113,116
BIOCHEMISTRY,Total Cholesterol,mg/dL,< 200,89,120,,81,86
BIOCHEMISTRY,LDL-Cholesterol,mg/dL,< 100,27,43,,26,24
BIOCHEMISTRY,Magnesium,mg/dL,1.6-2.6,3.0,3.1,2.6,2.9,2.6
BIOCHEMISTRY,Triglyceride,mg/dL,< 200,167,147,,128,135
BIOCHEMISTRY,Uric Acid,mg/dL,2.4-5.7,3.2,8.6,3.6,6.3,11.4
BIOCHEMISTRY,Creatinine,mg/dL,0.51-0.95,3.86,3.65,4.75,5.08,3.89
BIOCHEMISTRY,Calcium,mg/dL,8.6-10,9.3,8.9,9.8,9.3,9.4
BIOCHEMISTRY,Phosphorus,mg/dL,2.5-4.5,,,4.9,5.0,
BIOCHEMISTRY,Urea Nitrogen (BUN),mg/dL,N: 6-20,38,46,53,88,55
GLYCOSYLATED HAEMOGLOBIN (Roche),Hb A1c % (DCCT/NGSP),%,4.0-6.0,,,,,6.5
GLYCOSYLATED HAEMOGLOBIN (Roche),Hb A1c (acc to IFCC),mmol/mol,20-42,,,,,47.4
URINE BIOCHEMISTRY,pH,,,6.0,6.0,6.0,6.0,6.0
URINE BIOCHEMISTRY,Specific Gravity,,,,,,1.010,
URINE BIOCHEMISTRY,Protein,,,Absence,POSITIVE ++,POSITIVE +,POSITIVE +,Trace
URINE BIOCHEMISTRY,Glucose,,,Trace,Absence,Absence,Absence,Absence
URINE BIOCHEMISTRY,Ketone,,,,,,Absence,
URINE BIOCHEMISTRY,Blood,,,,,,Absence,
URINE BIOCHEMISTRY,Nitrite,,,,,,Absence,
URINE BIOCHEMISTRY,Urobilinogen,,,,,,Absence,
URINE BIOCHEMISTRY,Bilirubin,,,,,,Absence,
URINE CYTOLOGY,Color,,,Yellow,Yellow,Yellow,Yellow,Yellow
URINE CYTOLOGY,Transparency,,,Clear,Clear,Cloudy,Clear,Clear
CYTOLOGY EXAMEN,White Blood Cells,/Champ,N:0-10,06,06,30,05,06
CYTOLOGY EXAMEN,Red Blood Cells,/Champ,N:0-10,03,03,05,03,03
CYTOLOGY EXAMEN,Epithelial cells,,,Rare,Rare,Rare,Rare,Rare
CYTOLOGY EXAMEN,Vessical/Bladder cells,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Renal cells,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Cast,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Cristals/Crystals,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Bacteries/Bacteria,,,Absence,Absence,Presence +,Absence,Absence
CYTOLOGY EXAMEN,Yeast,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Trichomonas,,,Absence,Absence,Absence,Absence,Absence
URINE BIOCHEMISTRY (Microalbumin Roche),Urine Creatinine,mg/dL,29-226,126.67,104.16,124.52,113.67,38.69
URINE BIOCHEMISTRY (Microalbumin Roche),Urine Microalbumin,mg/L,0.0-20,197,250,169,246,491
URINE BIOCHEMISTRY (Microalbumin Roche),Microalbumin/Cre Ratio,mg/g,0.0-30,155.52,240.01,135.72,216.42,1269.06
ENZYMOLOGY,AST (Aspartate Aminotrans.),U/L,0-32,18,17,18,24,17
ENZYMOLOGY,ALT (Alanine Aminotrans.),U/L,0-33,8,10,8,10,12
ELECTROLYTES,Sodium (Na+),mmol/L,135-145,141,138,138,141,143
ELECTROLYTES,Potassium (K+),mmol/L,3.5-5.5,5.2,5.4,5.1,5.2,5.4
ELECTROLYTES,Chlorures (Cl-),mmol/L,98-107,105,107,102,107,105
SEROLOGY,Anti-Streptolysine O (ASO),UI/ML,NR: < 200,,,,91.5,
SEROLOGY,C-Reactive Protein (CRP),mg/L,N: < 6,,,,2.86,
SEROLOGY,Rheumatoid Factors,UI/ML,N: < 20,,,,14.30,
THYROIDS,TSH (Thyreotrope),uIU/ml,0.27-4.20,3.950,,,,`;

type LegacyRow = {
  section: string;
  test: string;
  unit: string;
  reference: string;
  values: Record<string, string>;
};

const DISPLAY_NAMES: Record<string, string> = {
  "Urea Nitrogen (BUN)": "BUN",
  "Hb A1c % (DCCT/NGSP)": "HbA1c (%)",
  "Hb A1c (acc to IFCC)": "HbA1c (IFCC)",
  "Microalbumin/Cre Ratio": "Microalbumin / creatinine ratio",
  "White blood cell": "White blood cells",
  "Red blood cell": "Red blood cells",
  "Chlorures (Cl-)": "Chloride",
  "Cristals/Crystals": "Crystals",
  "Bacteries/Bacteria": "Bacteria",
  "Vessical/Bladder cells": "Bladder cells",
};

const GROUPS = [
  { code: "kidney", title: "Kidney function" },
  { code: "diabetes", title: "Diabetes" },
  { code: "anemia", title: "Anemia" },
  { code: "mineral-bone", title: "Mineral and bone" },
  { code: "urine", title: "Urine" },
  { code: "inflammation", title: "Inflammation" },
  { code: "liver", title: "Liver" },
  { code: "lipids", title: "Lipids" },
  { code: "thyroid", title: "Thyroid" },
  { code: "other", title: "Other tests" },
] as const;

const CHILD_PARENT = new Map([
  [
    "GLYCOSYLATED HAEMOGLOBIN (Roche)||Hb A1c (acc to IFCC)",
    "GLYCOSYLATED HAEMOGLOBIN (Roche)||Hb A1c % (DCCT/NGSP)",
  ],
  [
    "URINE BIOCHEMISTRY (Microalbumin Roche)||Urine Creatinine",
    "URINE BIOCHEMISTRY (Microalbumin Roche)||Microalbumin/Cre Ratio",
  ],
  [
    "URINE BIOCHEMISTRY (Microalbumin Roche)||Urine Microalbumin",
    "URINE BIOCHEMISTRY (Microalbumin Roche)||Microalbumin/Cre Ratio",
  ],
]);

function parseRows(raw: string): LegacyRow[] {
  const [header, ...lines] = raw.trim().split(/\r?\n/);
  const dates = header.split(",").slice(4);
  return lines.map((line) => {
    const cells = line.split(",");
    return {
      section: cells[0]?.trim() ?? "",
      test: cells[1]?.trim() ?? "",
      unit: cells[2]?.trim() ?? "",
      reference: cells[3]?.trim() ?? "",
      values: Object.fromEntries(
        dates.map((date, index) => [date, cells[index + 4]?.trim() ?? ""]),
      ),
    };
  });
}

function numericValue(raw: string): LabResultValue {
  if (!raw) return { kind: "missing" };
  const value = Number(raw);
  return Number.isFinite(value)
    ? { kind: "numeric", value, display: raw }
    : { kind: "text", value: raw };
}

function normalizedReference(raw: string) {
  return raw.replace(/^(?:N|NR)\s*:\s*/i, "").trim();
}

function numericRange(raw: string): ReferenceRange | null {
  const display = normalizedReference(raw);
  if (!display) return null;
  const range = display.match(/^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)$/);
  const upper = display.match(/^<\s*(\d+(?:\.\d+)?)$/);
  const lower = display.match(/^>\s*(\d+(?:\.\d+)?)$/);
  let tiers: ReferenceTier[] | null = null;

  if (range) {
    const low = Number(range[1]);
    const high = Number(range[2]);
    tiers = [
      {
        tier: "low",
        label: "Low",
        severity: "abnormal",
        upperBound: low,
        displayOrder: 0,
      },
      {
        tier: "normal",
        label: "In range",
        severity: "normal",
        lowerBound: low,
        upperBound: high,
        displayOrder: 1,
      },
      {
        tier: "high",
        label: "High",
        severity: "abnormal",
        lowerBound: high,
        displayOrder: 2,
      },
    ];
  } else if (upper) {
    const high = Number(upper[1]);
    tiers = [
      {
        tier: "normal",
        label: "In range",
        severity: "normal",
        upperBound: high,
        displayOrder: 0,
      },
      {
        tier: "high",
        label: "High",
        severity: "abnormal",
        lowerBound: high,
        displayOrder: 1,
      },
    ];
  } else if (lower) {
    const low = Number(lower[1]);
    tiers = [
      {
        tier: "low",
        label: "Low",
        severity: "abnormal",
        upperBound: low,
        displayOrder: 0,
      },
      {
        tier: "normal",
        label: "In range",
        severity: "normal",
        lowerBound: low,
        displayOrder: 1,
      },
    ];
  }

  return tiers ? { valueType: "qn", display, tiers } : null;
}

function qualitativeRange(row: LegacyRow): ReferenceRange | null {
  const values = [...new Set(Object.values(row.values).filter(Boolean))];
  if (
    values.length === 0 ||
    values.every((value) => Number.isFinite(Number(value)))
  )
    return null;
  return {
    valueType: "ord",
    display: "Expected unremarkable",
    tiers: values.map((value, index) => {
      const finding = /positive|presence|cloudy|turbid|trace/i.test(value);
      return {
        tier: `value-${index}`,
        label: finding ? "Finding" : "Unremarkable",
        severity: finding ? "abnormal" : "normal",
        textValue: value,
        displayOrder: index,
      };
    }),
  };
}

function keyOf(row: LegacyRow) {
  return `${row.section}||${row.test}`;
}

function groupFor(row: LegacyRow): (typeof GROUPS)[number]["code"] {
  const key = keyOf(row);
  if (/Creatinine|Urea Nitrogen|Microalbumin/i.test(key)) return "kidney";
  if (/URINE|CYTOLOGY/i.test(row.section)) return "urine";
  if (/Glucose|GLYCOSYLATED/i.test(key)) return "diabetes";
  if (/CELL BLOOD COUNT|DIFFERENTIAL COUNT/i.test(row.section)) return "anemia";
  if (
    /ELECTROLYTES/i.test(row.section) ||
    /Magnesium|Calcium|Phosphorus/i.test(row.test)
  ) {
    return "mineral-bone";
  }
  if (/HEMATOLOGY|SEROLOGY/i.test(row.section)) return "inflammation";
  if (/ENZYMOLOGY/i.test(row.section) || row.test === "Albumin") return "liver";
  if (/Cholesterol|Triglyceride/i.test(row.test)) return "lipids";
  if (/THYROIDS/i.test(row.section)) return "thyroid";
  return "other";
}

function toResult(row: LegacyRow, rowIndex: number): LabAnalyteResult {
  const observedDate = LEGACY_DATES.find((date) => row.values[date]);
  const currentValue = observedDate
    ? numericValue(row.values[observedDate])
    : { kind: "missing" as const };
  const history: LabResultPoint[] = LEGACY_DATES.filter(
    (date) => date !== observedDate,
  ).map((date) => ({
    date,
    value: numericValue(row.values[date]),
    episodeId: `legacy-draw-${date}`,
    episodeLabel: `Draw ${date}`,
    sourceLabel: "Legacy DCM fixture",
  }));
  const panelName = /CELL BLOOD COUNT|DIFFERENTIAL COUNT/i.test(row.section)
    ? "Complete blood count"
    : undefined;

  return {
    orderLineItemId: `legacy-line-${rowIndex + 1}`,
    testId: `legacy-test-${rowIndex + 1}`,
    panelCode: panelName ? "CBC" : undefined,
    panelName,
    analyteCode: `${row.section}-${row.test}`,
    name: DISPLAY_NAMES[row.test] ?? row.test,
    unit: row.unit || undefined,
    status: "released",
    verificationMode: "manual",
    value: currentValue,
    range: numericRange(row.reference) ?? qualitativeRange(row),
    history,
    observedAt: observedDate ? `${observedDate}T08:00:00Z` : null,
    releasedAt: observedDate ? `${observedDate}T10:00:00Z` : null,
  };
}

const ROWS = parseRows(LEGACY_RESULTS_CSV);
const RESULTS_BY_KEY = new Map(
  ROWS.map((row, index) => [keyOf(row), toResult(row, index)]),
);

export const LEGACY_LAB_HISTORY_SECTIONS: LabHistorySection[] = GROUPS.map(
  (group) => {
    const items = ROWS.filter(
      (row) => groupFor(row) === group.code && !CHILD_PARENT.has(keyOf(row)),
    ).map((row): LabHistoryItem => {
      const key = keyOf(row);
      const result = RESULTS_BY_KEY.get(key);
      if (!result)
        throw new Error(`Missing Legacy DCM result fixture for ${key}`);
      const children = [...CHILD_PARENT.entries()]
        .filter(([, parent]) => parent === key)
        .map(([childKey]) => RESULTS_BY_KEY.get(childKey))
        .filter((child): child is LabAnalyteResult => Boolean(child));
      return { result, children: children.length > 0 ? children : undefined };
    });
    return { ...group, items };
  },
).filter((section) => section.items.length > 0);

export const LEGACY_LAB_LATEST_DRAW = `${LEGACY_DATES[0]}T08:00:00Z`;

export const LEGACY_LAB_HISTORY_COUNTS = {
  primary: LEGACY_LAB_HISTORY_SECTIONS.flatMap((section) => section.items)
    .length,
  table: ROWS.length,
} as const;
