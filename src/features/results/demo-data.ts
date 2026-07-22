import type {
  LabAnalyteResult,
  LabResultPoint,
  LabResultSection,
  ReferenceRange,
  ReferenceTier,
  ResultReviewQueueEntry,
  ResultsDataState,
  ResultsPatient,
} from './types';

function tiers(
  rows: Array<[string, string, ReferenceTier['severity'], number | null, number | null]>,
): ReferenceTier[] {
  return rows.map(([tier, label, severity, lowerBound, upperBound], index) => ({
    tier,
    label,
    severity,
    lowerBound,
    upperBound,
    displayOrder: index,
  }));
}

export function fiveZoneRange(
  bounds: [number, number, number, number],
  source?: string,
): ReferenceRange {
  const [criticalLow, low, high, criticalHigh] = bounds;
  return {
    source,
    valueType: 'qn',
    tiers: tiers([
      ['critical_low', 'Critically low', 'critical', null, criticalLow],
      ['low', 'Low', 'abnormal', criticalLow, low],
      ['normal', 'Normal', 'normal', low, high],
      ['high', 'High', 'abnormal', high, criticalHigh],
      ['critical_high', 'Critically high', 'critical', criticalHigh, null],
    ]),
  };
}

export const HBA1C_RANGE: ReferenceRange = {
  source: 'ADA-2023',
  valueType: 'qn',
  display: '< 5.7',
  tiers: tiers([
    ['normal', 'Normal', 'normal', null, 5.7],
    ['prediabetes', 'Prediabetes range', 'abnormal', 5.7, 6.5],
    ['diabetes', 'Diabetes range', 'abnormal', 6.5, null],
  ]),
};

export const HDL_RANGE: ReferenceRange = {
  valueType: 'qn',
  tiers: tiers([
    ['low', 'Low', 'abnormal', null, 40],
    ['normal', 'Normal', 'normal', 40, 60],
    ['protective', 'Protective', 'normal', 60, null],
  ]),
};

export const POTASSIUM_RANGE = fiveZoneRange([2.5, 3.5, 5.1, 6.5]);

export const URINE_PROTEIN_RANGE: ReferenceRange = {
  valueType: 'ord',
  display: 'Absence',
  tiers: [
    { tier: 'normal', label: 'Absence', severity: 'normal', textValue: 'Absence', displayOrder: 0 },
    { tier: 'trace', label: 'Trace', severity: 'abnormal', textValue: 'Trace', displayOrder: 1 },
    {
      tier: 'positive',
      label: 'Positive',
      severity: 'abnormal',
      textValue: 'POSITIVE ++',
      displayOrder: 2,
    },
  ],
};

export const DEMO_RESULTS_PATIENT: ResultsPatient = {
  id: 'patient-2048',
  name: 'Sokha Chan',
  dob: '1992-03-14',
  sexAtBirth: 'Female',
  medicalRecordNumber: 'MRN-008214',
};

const released = {
  status: 'released' as const,
  verificationMode: 'crelio_autoverified' as const,
};

function currentIdentity(
  orderLineItemId: string,
  testId: string,
  panelCode?: string,
  panelName?: string,
) {
  return { orderLineItemId, testId, panelCode, panelName };
}

export const FIRST_VISIT_SECTIONS: LabResultSection[] = [
  {
    code: 'hematology',
    title: 'Hematology',
    results: [
      {
        ...released,
        ...currentIdentity('oli-cbc-1', 'test-cbc-1', 'CBC', 'Complete blood count'),
        analyteCode: 'HGB',
        name: 'Hemoglobin',
        unit: 'g/dL',
        value: { kind: 'numeric', value: 13.2 },
        range: fiveZoneRange([7, 12, 16, 20]),
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:05:00Z',
      },
      {
        ...released,
        ...currentIdentity('oli-cbc-1', 'test-cbc-1', 'CBC', 'Complete blood count'),
        analyteCode: 'WBC',
        name: 'White blood cells',
        unit: '×10⁹/L',
        value: { kind: 'numeric', value: 7.4 },
        range: fiveZoneRange([1, 4, 10, 30]),
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:05:00Z',
      },
    ],
  },
  {
    code: 'diabetes',
    title: 'Diabetes monitoring',
    results: [
      {
        ...released,
        ...currentIdentity('oli-glucose-1', 'test-glucose-1'),
        analyteCode: 'GLU-F',
        name: 'Glucose · fasting',
        unit: 'mg/dL',
        value: { kind: 'numeric', value: 89 },
        range: fiveZoneRange([54, 70, 100, 250], 'ADA-2023'),
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T09:58:00Z',
      },
      {
        ...released,
        ...currentIdentity('oli-hba1c-1', 'test-hba1c-1'),
        analyteCode: 'HBA1C',
        name: 'Hemoglobin A1c',
        unit: '%',
        value: { kind: 'numeric', value: 5.4 },
        range: HBA1C_RANGE,
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:12:00Z',
      },
    ],
  },
  {
    code: 'renal',
    title: 'Renal and electrolytes',
    results: [
      {
        ...released,
        ...currentIdentity('oli-creatinine-1', 'test-creatinine-1'),
        analyteCode: 'CREA',
        name: 'Creatinine',
        unit: 'µmol/L',
        value: { kind: 'numeric', value: 82 },
        range: fiveZoneRange([35, 62, 106, 180]),
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:01:00Z',
      },
      {
        ...released,
        ...currentIdentity('oli-potassium-1', 'test-potassium-1'),
        analyteCode: 'K',
        name: 'Potassium',
        unit: 'mmol/L',
        value: { kind: 'numeric', value: 4.2 },
        range: POTASSIUM_RANGE,
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:01:00Z',
      },
    ],
  },
  {
    code: 'lipids',
    title: 'Lipid panel',
    results: [
      {
        ...released,
        ...currentIdentity('oli-lipid-1', 'test-lipid-1', 'LIPID', 'Lipid panel'),
        analyteCode: 'LDL',
        name: 'LDL-C',
        unit: 'mg/dL',
        value: { kind: 'numeric', value: 162 },
        range: {
          valueType: 'qn',
          display: '< 100',
          tiers: tiers([
            ['optimal', 'Normal', 'normal', null, 100],
            ['borderline', 'Borderline', 'abnormal', 100, 160],
            ['high', 'High', 'abnormal', 160, 190],
            ['very_high', 'Very high', 'abnormal', 190, null],
          ]),
        },
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:22:00Z',
      },
      {
        ...released,
        ...currentIdentity('oli-lipid-1', 'test-lipid-1', 'LIPID', 'Lipid panel'),
        analyteCode: 'HDL',
        name: 'HDL-C',
        unit: 'mg/dL',
        value: { kind: 'numeric', value: 38 },
        range: HDL_RANGE,
        observedAt: '2026-04-12T08:20:00Z',
        releasedAt: '2026-04-12T10:22:00Z',
      },
    ],
  },
];

const HBA1C_HISTORY: LabResultPoint[] = [
  {
    date: '2025-08-12',
    value: { kind: 'numeric', value: 7.4 },
    episodeId: 'episode-2025-08',
    episodeLabel: 'Annual review',
    testId: 'test-hba1c-2025-08',
  },
  {
    date: '2026-01-15',
    value: { kind: 'numeric', value: 7.1 },
    episodeId: 'episode-2026-01',
    episodeLabel: 'Diabetes follow-up',
    testId: 'test-hba1c-2026-01',
  },
  {
    date: '2026-02-18',
    value: { kind: 'numeric', value: 6.8 },
    episodeId: 'episode-2026-02',
    episodeLabel: 'Diabetes follow-up',
    testId: 'test-hba1c-2026-02',
  },
  {
    date: '2026-03-20',
    value: { kind: 'missing' },
    episodeId: 'episode-2026-03',
    episodeLabel: 'Renal review',
  },
  {
    date: '2026-04-20',
    value: { kind: 'numeric', value: 6.4 },
    episodeId: 'episode-2026-04',
    episodeLabel: 'Diabetes follow-up',
    testId: 'test-hba1c-2026-04',
  },
];

export const RETURNING_RESULTS: LabAnalyteResult[] = [
  {
    ...released,
    ...currentIdentity('oli-hba1c-current', 'test-hba1c-current'),
    analyteCode: 'HBA1C',
    name: 'Hemoglobin A1c',
    unit: '%',
    value: { kind: 'numeric', value: 6.1 },
    range: HBA1C_RANGE,
    history: HBA1C_HISTORY,
    observedAt: '2026-07-01T08:40:00Z',
    releasedAt: '2026-07-01T10:10:00Z',
  },
  {
    ...released,
    verificationMode: 'crelio_flagged',
    ...currentIdentity('oli-creatinine-current', 'test-creatinine-current'),
    analyteCode: 'CREA',
    name: 'Creatinine',
    unit: 'µmol/L',
    value: { kind: 'numeric', value: 132 },
    range: fiveZoneRange([35, 62, 106, 180]),
    history: [
      {
        date: '2025-12-01',
        value: { kind: 'numeric', value: 82 },
        episodeId: 'episode-2025-12',
        episodeLabel: 'Annual review',
      },
      {
        date: '2026-06-20',
        value: { kind: 'numeric', value: 115 },
        episodeId: 'episode-2026-06',
        episodeLabel: 'Renal follow-up',
      },
    ],
    observedAt: '2026-07-01T08:40:00Z',
    releasedAt: '2026-07-01T10:11:00Z',
  },
  {
    ...released,
    verificationMode: 'manual',
    ...currentIdentity('oli-urine-current', 'test-urine-current'),
    analyteCode: 'UPRO',
    name: 'Protein · urine',
    value: { kind: 'text', value: 'Trace' },
    range: URINE_PROTEIN_RANGE,
    history: [
      {
        date: '2026-02-18',
        value: { kind: 'text', value: 'Absence' },
        episodeId: 'episode-2026-02',
        episodeLabel: 'Renal follow-up',
      },
      {
        date: '2026-04-20',
        value: { kind: 'missing' },
        episodeId: 'episode-2026-04',
        episodeLabel: 'Diabetes follow-up',
      },
    ],
    observedAt: '2026-07-01T08:40:00Z',
    releasedAt: '2026-07-01T10:15:00Z',
  },
];

export const CRITICAL_POTASSIUM_RESULT: LabAnalyteResult = {
  ...released,
  verificationMode: 'manual',
  ...currentIdentity('oli-potassium-critical', 'test-potassium-critical'),
  analyteCode: 'K',
  name: 'Potassium',
  unit: 'mmol/L',
  value: { kind: 'numeric', value: 6.8 },
  range: POTASSIUM_RANGE,
  history: [
    {
      date: '2026-04-12',
      value: { kind: 'numeric', value: 4.2 },
      episodeId: 'episode-2026-04',
      episodeLabel: 'Annual review',
    },
  ],
  observedAt: '2026-07-14T08:30:00Z',
  releasedAt: '2026-07-14T09:02:00Z',
};

export const CRITICAL_COMPLETE_SECTIONS: LabResultSection[] = [
  {
    code: 'biochemistry',
    title: 'Biochemistry',
    results: [CRITICAL_POTASSIUM_RESULT],
  },
];

export const PARTIAL_EPISODE_SECTIONS: LabResultSection[] = [
  {
    code: 'hematology',
    title: 'Hematology',
    results: [
      {
        ...released,
        ...currentIdentity('oli-cbc-partial', 'test-cbc-partial', 'CBC', 'Complete blood count'),
        analyteCode: 'HGB',
        name: 'Hemoglobin',
        unit: 'g/dL',
        value: { kind: 'numeric', value: 10.9 },
        range: fiveZoneRange([7, 12, 16, 20]),
        observedAt: '2026-07-14T08:30:00Z',
        releasedAt: '2026-07-14T09:20:00Z',
      },
      {
        ...released,
        ...currentIdentity('oli-cbc-partial', 'test-cbc-partial', 'CBC', 'Complete blood count'),
        analyteCode: 'WBC',
        name: 'White blood cells',
        unit: '×10⁹/L',
        value: { kind: 'numeric', value: 8.1 },
        range: fiveZoneRange([1, 4, 10, 30]),
        observedAt: '2026-07-14T08:30:00Z',
        releasedAt: '2026-07-14T09:20:00Z',
      },
    ],
  },
  {
    code: 'biochemistry',
    title: 'Biochemistry',
    results: [
      CRITICAL_POTASSIUM_RESULT,
      {
        ...currentIdentity('oli-alt-partial', 'test-alt-partial'),
        analyteCode: 'ALT',
        name: 'ALT',
        unit: 'U/L',
        status: 'manual_review',
        value: { kind: 'missing' },
      },
      {
        ...currentIdentity('oli-tsh-partial', 'test-tsh-partial'),
        analyteCode: 'TSH',
        name: 'TSH',
        unit: 'mIU/L',
        status: 'in_lab',
        value: { kind: 'missing' },
      },
      {
        ...currentIdentity('oli-hba1c-partial', 'test-hba1c-partial'),
        analyteCode: 'HBA1C',
        name: 'Hemoglobin A1c',
        unit: '%',
        status: 'awaiting_sample',
        value: { kind: 'missing' },
        range: HBA1C_RANGE,
      },
    ],
  },
];

export const REDRAW_EPISODE_SECTIONS: LabResultSection[] = [
  {
    code: 'biochemistry',
    title: 'Biochemistry',
    results: [
      {
        ...currentIdentity('oli-potassium-redraw', 'test-potassium-dismissed'),
        analyteCode: 'K',
        name: 'Potassium',
        unit: 'mmol/L',
        status: 'dismissed',
        value: { kind: 'missing' },
      },
      {
        ...currentIdentity('oli-potassium-redraw', 'test-potassium-redraw'),
        supersedesTestId: 'test-potassium-dismissed',
        analyteCode: 'K',
        name: 'Potassium',
        unit: 'mmol/L',
        status: 'in_progress',
        value: { kind: 'missing' },
        range: POTASSIUM_RANGE,
      },
    ],
  },
];

export const ADD_ON_EPISODE_SECTIONS: LabResultSection[] = [
  {
    code: 'biochemistry',
    title: 'Biochemistry',
    results: [
      {
        ...RETURNING_RESULTS[0],
        orderLineItemId: 'oli-hba1c-addon',
        testId: 'test-hba1c-addon',
      },
      {
        ...RETURNING_RESULTS[1],
        orderLineItemId: 'oli-creatinine-addon',
        testId: 'test-creatinine-addon',
      },
      {
        ...currentIdentity('oli-b12-addon', 'test-b12-addon'),
        analyteCode: 'B12',
        name: 'Vitamin B12',
        unit: 'pg/mL',
        status: 'awaiting_sample',
        value: { kind: 'missing' },
      },
    ],
  },
];

export const RELEASED_WITH_CANCELLED_SECTIONS: LabResultSection[] = [
  {
    code: 'biochemistry',
    title: 'Biochemistry',
    results: [
      {
        ...RETURNING_RESULTS[0],
        orderLineItemId: 'oli-hba1c-mixed',
        testId: 'test-hba1c-mixed',
      },
      {
        ...currentIdentity('oli-folate-cancelled', 'test-folate-cancelled'),
        analyteCode: 'FOLATE',
        name: 'Folate',
        unit: 'ng/mL',
        status: 'cancelled',
        value: { kind: 'missing' },
      },
    ],
  },
];

export const ALL_CANCELLED_SECTIONS: LabResultSection[] = [
  {
    code: 'biochemistry',
    title: 'Biochemistry',
    results: [
      {
        ...currentIdentity('oli-alt-cancelled', 'test-alt-cancelled'),
        analyteCode: 'ALT',
        name: 'ALT',
        unit: 'U/L',
        status: 'cancelled',
        value: { kind: 'missing' },
      },
      {
        ...currentIdentity('oli-tsh-dismissed', 'test-tsh-dismissed'),
        analyteCode: 'TSH',
        name: 'TSH',
        unit: 'mIU/L',
        status: 'dismissed',
        value: { kind: 'missing' },
      },
    ],
  },
];

export const LONG_CONTENT_RESULT: LabAnalyteResult = {
  ...released,
  ...currentIdentity('oli-hbsag-long', 'test-hbsag-long'),
  analyteCode: 'HBSAG',
  name: 'Kháng nguyên bề mặt viêm gan B (HBsAg) — miễn dịch tự động hóa phát quang',
  value: { kind: 'text', value: 'POSITIVE ++ · reactive on confirmatory platform' },
  range: {
    valueType: 'ord',
    display: 'Non-reactive',
    tiers: [
      {
        tier: 'normal',
        label: 'Non-reactive',
        severity: 'normal',
        textValue: 'Non-reactive',
        displayOrder: 0,
      },
      {
        tier: 'positive',
        label: 'Reactive',
        severity: 'abnormal',
        textValue: 'POSITIVE ++ · reactive on confirmatory platform',
        displayOrder: 1,
      },
    ],
  },
  observedAt: '2026-07-01T08:40:00Z',
  releasedAt: '2026-07-01T11:15:00Z',
};

export const NO_REFERENCE_RESULT: LabAnalyteResult = {
  ...released,
  ...currentIdentity('oli-ferritin-no-reference', 'test-ferritin-no-reference'),
  analyteCode: 'FERRITIN',
  name: 'Ferritin',
  unit: 'ng/mL',
  value: { kind: 'numeric', value: 246 },
  range: null,
  observedAt: '2026-07-01T08:40:00Z',
  releasedAt: '2026-07-01T11:05:00Z',
};

export const NOT_IN_DRAW_RESULT: LabAnalyteResult = {
  ...released,
  ...currentIdentity('oli-hba1c-not-in-draw', 'test-hba1c-not-in-draw'),
  analyteCode: 'HBA1C',
  name: 'Hemoglobin A1c',
  unit: '%',
  value: { kind: 'missing' },
  range: HBA1C_RANGE,
  history: HBA1C_HISTORY,
  observedAt: '2026-07-01T08:40:00Z',
  releasedAt: '2026-07-01T10:10:00Z',
};

export const MISSING_DATE_RESULT: LabAnalyteResult = {
  ...RETURNING_RESULTS[1],
  testId: 'test-creatinine-missing-date',
  orderLineItemId: 'oli-creatinine-missing-date',
  observedAt: null,
  releasedAt: null,
};

export const IRREGULAR_DATE_RESULT: LabAnalyteResult = {
  ...RETURNING_RESULTS[0],
  testId: 'test-hba1c-irregular',
  orderLineItemId: 'oli-hba1c-irregular',
  history: [
    {
      date: '2025-01-01',
      value: { kind: 'numeric', value: 8.1 },
      episodeId: 'episode-2025-01',
      episodeLabel: 'Baseline',
    },
    {
      date: '2025-01-08',
      value: { kind: 'numeric', value: 7.9 },
      episodeId: 'episode-2025-01b',
      episodeLabel: 'Early repeat',
    },
    {
      date: '2026-06-01',
      value: { kind: 'numeric', value: 6.4 },
      episodeId: 'episode-2026-06',
      episodeLabel: 'Long interval review',
    },
  ],
  observedAt: '2026-07-01T08:40:00Z',
};

/** Synthetic cross-patient queue data used by Results and Home stories. */
export const RESULT_REVIEW_QUEUE: ResultReviewQueueEntry[] = [
  {
    id: 'review-dara-phally-lipid',
    patient: {
      id: 'patient-dara-phally',
      name: 'Dara Phally',
      dob: '1982-03-12',
      sexAtBirth: 'Female',
      medicalRecordNumber: 'MK-10482',
    },
    testName: 'Lipid panel',
    returnedLabel: '2 hours ago',
    status: 'abnormal',
  },
  {
    id: 'review-sokha-chan-hba1c',
    patient: {
      id: 'patient-sokha-chan',
      name: 'Sokha Chan',
      dob: '1976-11-04',
      sexAtBirth: 'Male',
      medicalRecordNumber: 'MK-09831',
    },
    testName: 'Hemoglobin A1c',
    returnedLabel: '48 minutes ago',
    status: 'abnormal',
  },
  {
    id: 'review-chenda-sreymom-cbc',
    patient: {
      id: 'patient-chenda-sreymom',
      name: 'Chenda Sreymom',
      dob: '1991-08-24',
      sexAtBirth: 'Female',
      medicalRecordNumber: 'MK-11720',
    },
    testName: 'Complete blood count',
    returnedLabel: '35 minutes ago',
    status: 'routine',
  },
  {
    id: 'review-vicheka-sam-creatinine',
    patient: {
      id: 'patient-vicheka-sam',
      name: 'Vicheka Sam',
      dob: '1968-01-17',
      sexAtBirth: 'Male',
      medicalRecordNumber: 'MK-07654',
    },
    testName: 'Creatinine and eGFR',
    returnedLabel: '22 minutes ago',
    status: 'amended',
  },
  {
    id: 'review-maly-sok-thyroid',
    patient: {
      id: 'patient-maly-sok',
      name: 'Maly Sok',
      dob: '1987-06-09',
      sexAtBirth: 'Female',
      medicalRecordNumber: 'MK-12106',
    },
    testName: 'Thyroid panel',
    returnedLabel: '12 minutes ago',
    status: 'routine',
  },
];

export type ResultsDemoScenario = {
  mode: 'workspace' | 'review';
  episodeLabel: string;
  sections: LabResultSection[];
  state?: ResultsDataState;
  staleAt?: string;
  readOnly?: boolean;
};

const RETURNING_SECTIONS: LabResultSection[] = [
  { code: 'monitoring', title: 'Monitored analytes', results: RETURNING_RESULTS },
];

/** Storybook-owned result states consumed by stories and the app route adapter. */
export const RESULTS_DEMO_SCENARIOS = {
  longitudinal: {
    mode: 'workspace',
    episodeLabel: 'Current episode · Jul 1, 2026',
    sections: RETURNING_SECTIONS,
  },
  first: {
    mode: 'review',
    episodeLabel: 'First visit · Jun 10, 2026',
    sections: FIRST_VISIT_SECTIONS,
  },
  critical: {
    mode: 'review',
    episodeLabel: 'Episode · Jun 10, 2026',
    sections: CRITICAL_COMPLETE_SECTIONS,
  },
  partial: {
    mode: 'review',
    episodeLabel: 'Episode · results arriving',
    sections: PARTIAL_EPISODE_SECTIONS,
  },
  redraw: {
    mode: 'workspace',
    episodeLabel: 'Episode · redraw in progress',
    sections: REDRAW_EPISODE_SECTIONS,
  },
  'add-on': {
    mode: 'workspace',
    episodeLabel: 'Episode · add-on placed',
    sections: ADD_ON_EPISODE_SECTIONS,
  },
  'with-cancelled': {
    mode: 'workspace',
    episodeLabel: 'Episode · released with cancellations',
    sections: RELEASED_WITH_CANCELLED_SECTIONS,
  },
  cancelled: {
    mode: 'workspace',
    episodeLabel: 'Episode · cancelled',
    sections: ALL_CANCELLED_SECTIONS,
  },
  'long-content': {
    mode: 'workspace',
    episodeLabel: 'Current episode · Jul 1, 2026',
    sections: [
      {
        code: 'other',
        title: 'Other tests',
        results: [LONG_CONTENT_RESULT, NO_REFERENCE_RESULT],
      },
    ],
  },
  loading: {
    mode: 'workspace',
    episodeLabel: '',
    sections: [],
    state: 'loading',
  },
  empty: {
    mode: 'workspace',
    episodeLabel: '',
    sections: [],
    state: 'empty',
  },
  error: {
    mode: 'workspace',
    episodeLabel: 'Unavailable episode',
    sections: [],
    state: 'error',
  },
  conflict: {
    mode: 'workspace',
    episodeLabel: 'Episode changed during review',
    sections: PARTIAL_EPISODE_SECTIONS,
    state: 'conflict',
  },
  permission: {
    mode: 'workspace',
    episodeLabel: '',
    sections: [],
    state: 'permission',
  },
  offline: {
    mode: 'workspace',
    episodeLabel: 'Cached episode',
    sections: RETURNING_SECTIONS,
    state: 'offline',
  },
  stale: {
    mode: 'workspace',
    episodeLabel: 'Current episode · Jul 1, 2026',
    sections: RETURNING_SECTIONS,
    staleAt: '2026-07-14T09:00:00Z',
  },
  'read-only': {
    mode: 'workspace',
    episodeLabel: 'Current episode · Jul 1, 2026',
    sections: RETURNING_SECTIONS,
    readOnly: true,
  },
} as const satisfies Record<string, ResultsDemoScenario>;

export type ResultsDemoScenarioId = keyof typeof RESULTS_DEMO_SCENARIOS;
