import { tubeByKey, VITAL_RANGES } from './catalog';
import type {
  CollectionPatient,
  SafetyChecks,
  Sample,
  StationRole,
  TimerTone,
  VitalsValues,
} from './types';

/**
 * Pure collection-mode rules. Every function takes explicit inputs (including
 * `now`) so behavior is deterministic in stories and tests.
 *
 * Governance deltas from the legacy prototype, both deliberate:
 * 1. The pre-draw safety checklist GATES collect actions. Legacy rendered the
 *    checklist but never read it — clinical friction is preserved here.
 * 2. Collect/reset field writes are unified (legacy Inspector and PhleboScreen
 *    drifted on collectedBy/inverted).
 */

export function checklistComplete(checks: SafetyChecks): boolean {
  return Object.values(checks).every(Boolean);
}

type CollectContext = { now: number; collectedBy: string };

export function collectSample(samples: Sample[], id: string, context: CollectContext): Sample[] {
  return samples.map((sample) =>
    sample.id === id
      ? {
          ...sample,
          status: 'collected' as const,
          collectedAt: formatClock(context.now),
          collectedAtMs: context.now,
          collectedBy: context.collectedBy,
          inverted: false,
          deferReason: undefined,
          deferNote: undefined,
        }
      : sample,
  );
}

export function collectAllOpen(samples: Sample[], context: CollectContext): Sample[] {
  return samples.map((sample) =>
    sample.status === 'awaiting_collection'
      ? {
          ...sample,
          status: 'collected' as const,
          collectedAt: formatClock(context.now),
          collectedAtMs: context.now,
          collectedBy: context.collectedBy,
          inverted: false,
        }
      : sample,
  );
}

export function resetSample(samples: Sample[], id: string): Sample[] {
  return samples.map((sample) =>
    sample.id === id
      ? {
          ...sample,
          status: 'awaiting_collection' as const,
          collectedAt: undefined,
          collectedAtMs: undefined,
          collectedBy: undefined,
          inverted: false,
          deferReason: undefined,
          deferNote: undefined,
        }
      : sample,
  );
}

export function deferSample(
  samples: Sample[],
  id: string,
  reason: string,
  note: string,
): Sample[] {
  return samples.map((sample) =>
    sample.id === id
      ? { ...sample, status: 'deferred' as const, deferReason: reason, deferNote: note || undefined }
      : sample,
  );
}

export function markInverted(samples: Sample[], id: string): Sample[] {
  return samples.map((sample) => (sample.id === id ? { ...sample, inverted: true } : sample));
}

/** Samples sorted by CLSI order of draw. */
export function sortByDrawOrder(samples: Sample[]): Sample[] {
  return [...samples].sort(
    (a, b) => (tubeByKey(a.tube)?.order ?? 99) - (tubeByKey(b.tube)?.order ?? 99),
  );
}

export function pendingInversions(samples: Sample[]): Sample[] {
  return samples.filter((sample) => {
    if (sample.status !== 'collected') return false;
    const tube = tubeByKey(sample.tube);
    return (tube?.inversions ?? 0) > 0 && !sample.inverted;
  });
}

export type SubmitGate = {
  collectedCount: number;
  totalCount: number;
  allCollected: boolean;
  anyOpen: boolean;
  inversionsBlocking: number;
  checklistBlocking: boolean;
  canSubmit: boolean;
};

export function submitGate(
  samples: Sample[],
  checks: SafetyChecks,
  invertOverride: boolean,
): SubmitGate {
  const collectedCount = samples.filter((sample) => sample.status === 'collected').length;
  const allCollected = samples.length > 0 && collectedCount === samples.length;
  const anyOpen = samples.some((sample) => sample.status === 'awaiting_collection');
  const inversionsBlocking = pendingInversions(samples).length;
  const checklistBlocking = !checklistComplete(checks);

  return {
    collectedCount,
    totalCount: samples.length,
    allCollected,
    anyOpen,
    inversionsBlocking,
    checklistBlocking,
    canSubmit:
      !checklistBlocking && allCollected && (inversionsBlocking === 0 || invertOverride),
  };
}

/** Scan resolution inside a loaded patient: exact tube-barcode match only. */
export type TubeScanResult =
  | { kind: 'collect'; sample: Sample }
  | { kind: 'inspect'; sample: Sample }
  | { kind: 'unknown' };

export function resolveTubeScan(samples: Sample[], raw: string): TubeScanResult {
  const id = raw.trim();
  const sample = samples.find((candidate) => candidate.id === id);
  if (!sample) return { kind: 'unknown' };
  if (sample.status === 'awaiting_collection') return { kind: 'collect', sample };
  return { kind: 'inspect', sample };
}

/** Clot-clock tone: expired/<5min danger, <10min warn, else success. */
export function timerTone(remainingMs: number): TimerTone {
  if (remainingMs <= 0) return 'danger';
  if (remainingMs < 5 * 60 * 1000) return 'danger';
  if (remainingMs < 10 * 60 * 1000) return 'warn';
  return 'success';
}

export function remainingClotMs(sample: Sample, now: number): number | null {
  const tube = tubeByKey(sample.tube);
  if (!sample.collectedAtMs || !tube?.timeLimitMin) return null;
  return sample.collectedAtMs + tube.timeLimitMin * 60 * 1000 - now;
}

export function formatCountdown(ms: number | null): string {
  if (ms == null) return '—';
  const clamped = Math.max(0, ms);
  const minutes = Math.floor(clamped / 60000);
  const seconds = Math.floor((clamped % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatClock(ms: number): string {
  const date = new Date(ms);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/** Booth queue: hide patients already done for this station; longest wait first. */
export function queueForRole(queue: CollectionPatient[], role: StationRole): CollectionPatient[] {
  return queue
    .filter((patient) =>
      role === 'phlebotomy' ? patient.journey.phlebo !== 'done' : patient.journey.vitals !== 'done',
    )
    .sort((a, b) => b.waitingMinutes - a.waitingMinutes);
}

export function waitTone(waitingMinutes: number): TimerTone | null {
  if (waitingMinutes > 60) return 'danger';
  if (waitingMinutes > 30) return 'warn';
  return null;
}

/**
 * Separators are presentation, not identity: a wristband prints `P-8842`, a
 * scanner may emit `P8842`, and an operator typing under time pressure may do
 * either. Comparing on alphanumerics only keeps all three the same patient
 * while staying an exact match — no prefix or substring guessing, which would
 * risk pulling up the wrong record.
 */
export function findPatientByPid(queue: CollectionPatient[], raw: string): CollectionPatient | undefined {
  const pid = normalizePid(raw);
  if (!pid) return undefined;
  return queue.find((patient) => normalizePid(patient.pid) === pid);
}

function normalizePid(value: string): string {
  return value.replace(/[^a-z0-9]/gi, '').toUpperCase();
}

// ── Vitals ─────────────────────────────────────────────────

export const VITALS_REQUIRED: Array<keyof VitalsValues> = [
  'heightCm',
  'weightKg',
  'hr',
  'bpSys',
  'bpDia',
];

export function fieldOutOfRange(
  field: keyof typeof VITAL_RANGES,
  raw: string,
  tempUnit: 'C' | 'F',
): boolean {
  if (raw === '' || raw == null) return false;
  let value = Number(raw);
  if (Number.isNaN(value)) return false;
  if (field === 'tempC' && tempUnit === 'F') {
    value = ((value - 32) * 5) / 9;
  }
  const range = VITAL_RANGES[field];
  return value < range[0] || value > range[1];
}

export function outOfRangeFields(values: VitalsValues): string[] {
  return (Object.keys(VITAL_RANGES) as Array<keyof typeof VITAL_RANGES>).filter((field) =>
    fieldOutOfRange(field, String(values[field as keyof VitalsValues] ?? ''), values.tempUnit),
  );
}

export function vitalsGate(values: VitalsValues, confirmAbnormal: boolean) {
  const requiredFilled = VITALS_REQUIRED.every(
    (key) => values[key] !== '' && values[key] != null,
  );
  const oorFields = outOfRangeFields(values);
  return {
    requiredFilled,
    oorFields,
    canSubmit: requiredFilled && (oorFields.length === 0 || confirmAbnormal),
  };
}

export function calcBmi(heightCm: string, weightKg: string): number | null {
  const height = parseFloat(heightCm);
  const weight = parseFloat(weightKg);
  if (!height || !weight) return null;
  const meters = height / 100;
  return Math.round((weight / (meters * meters)) * 10) / 10;
}

export function bmiCategory(bmi: number): { label: string; tone: 'info' | 'success' | 'warning' | 'danger' } {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'info' };
  if (bmi <= 24.9) return { label: 'Normal', tone: 'success' };
  if (bmi <= 29.9) return { label: 'Overweight', tone: 'warning' };
  return { label: 'Obese', tone: 'danger' };
}

export const EMPTY_VITALS: VitalsValues = {
  heightCm: '',
  weightKg: '',
  hr: '',
  bpSys: '',
  bpDia: '',
  tempC: '',
  tempUnit: 'C',
  spo2: '',
  breathing: '',
  painVas: 0,
  fasting: null,
  vaccinationNote: '',
};
