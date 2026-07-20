/**
 * Doctor results-review domain types.
 *
 * Status enums mirror kura-platform. Typed result values and the longitudinal
 * join are a product/design target pending backend mapping. Execution identity
 * is explicit so partial release and redraw logic stay line-item anchored.
 */

/** test-ms `test_status_enum`. Only `released` values are human-facing. */
export type TestStatus =
  | 'awaiting_sample'
  | 'in_lab'
  | 'in_progress'
  | 'resulted'
  | 'manual_review'
  | 'signed'
  | 'autoverified'
  | 'released'
  | 'cancelled'
  | 'dismissed';

/** test-ms `test_verification_mode_enum` — result provenance. */
export type TestVerificationMode = 'manual' | 'crelio_autoverified' | 'crelio_flagged';

/** order-ms result roll-up status from ADR-0047. */
export type OrderResultStatus =
  | 'placed'
  | 'in_fulfillment'
  | 'partially_complete'
  | 'completed'
  | 'cancelled';

/** lab-ms `reference_range_tier.severity`. */
export type TierSeverity = 'normal' | 'abnormal' | 'critical';

/** lab-ms `reference_range.value_type`. */
export type RangeValueType = 'qn' | 'ord' | 'semi_qn';

/** One `reference_range_tier` row. Bounds are half-open `[lower, upper)`. */
export type ReferenceTier = {
  tier: string;
  label: string;
  severity: TierSeverity;
  lowerBound?: number | null;
  upperBound?: number | null;
  textValue?: string | null;
  displayOrder: number;
};

/** The applicable catalog range for this patient and observation. */
export type ReferenceRange = {
  source?: string;
  valueType: RangeValueType;
  tiers: ReferenceTier[];
  display?: string;
};

export type LabResultValue =
  | { kind: 'numeric'; value: number; display?: string }
  | { kind: 'text'; value: string }
  | { kind: 'missing' };

/** One historical released observation. Missing dates remain explicitly unknown. */
export type LabResultPoint = {
  date?: string | null;
  value: LabResultValue;
  episodeId: string;
  episodeLabel: string;
  testId?: string;
  sourceLabel?: string;
};

/**
 * One longitudinal analyte row joined to its executable test-line identity.
 * Multiple analytes may share one `orderLineItemId` and `testId` for a panel.
 */
export type LabAnalyteResult = {
  orderLineItemId: string;
  testId: string;
  supersedesTestId?: string | null;
  panelCode?: string;
  panelName?: string;
  analyteCode: string;
  name: string;
  loincCode?: string;
  unit?: string;
  status: TestStatus;
  verificationMode?: TestVerificationMode | null;
  value: LabResultValue;
  range?: ReferenceRange | null;
  history?: LabResultPoint[];
  observedAt?: string | null;
  releasedAt?: string | null;
};

/** Report section from the lab catalog, not a free-form UI grouping. */
export type LabResultSection = {
  code: string;
  title: string;
  results: LabAnalyteResult[];
};

export type LabFlag = {
  severity: TierSeverity;
  label: string;
  direction: 'low' | 'high' | null;
};

export type RangeTone = 'optimal' | 'caution' | 'out';

export type RangeZone = {
  label: string;
  tone: RangeTone;
  tier: ReferenceTier;
};

export type RangeMarker = {
  zoneIndex: number;
  fraction: number;
  tone: RangeTone;
};

/** Progressive release is counted by active order line, never analyte row. */
export type EpisodeProgress = {
  total: number;
  released: number;
  terminal: number;
  unavailable: number;
  pending: number;
  status: OrderResultStatus;
};

export type TrendDirection = 'improving' | 'worsening' | 'stable';

export type LabTrend = {
  direction: TrendDirection;
  since?: LabResultPoint;
  delta?: number;
};

export type ResultsDataState =
  | 'ready'
  | 'loading'
  | 'empty'
  | 'error'
  | 'conflict'
  | 'offline'
  | 'permission';

export type ResultsFilter = 'all' | 'flagged' | 'critical' | 'no_reference' | 'pending';

export type ResultsPatient = {
  id: string;
  name: string;
  dob: string;
  sexAtBirth: string;
  medicalRecordNumber: string;
};
