/**
 * Collection-mode domain types.
 *
 * Sample status aligns with the canonical backend vocabulary
 * (libs/contracts status enums): `awaiting_collection` and `collected` are
 * canonical; `deferred` is a booth-local workflow state that never persists
 * as a sample status — a deferred tube is still awaiting collection upstream.
 */

export type SampleStatus = 'awaiting_collection' | 'collected' | 'deferred';

export type TubeKey =
  | 'yellow-sps'
  | 'light-blue'
  | 'red'
  | 'gold-sst'
  | 'green'
  | 'gray-green'
  | 'lavender'
  | 'pink'
  | 'white'
  | 'dark-gray';

export type TubeSpec = {
  key: TubeKey;
  /** CLSI order-of-draw position, 1-based. */
  order: number;
  stopperLabel: string;
  additive: string;
  short: string;
  /** Required gentle inversions after draw. */
  inversions: number;
  /** Minutes to reach processing after draw; null = no clock. */
  timeLimitMin: number | null;
  handling: string[];
  /** Presentation only — rack glyph colors, consumed as CSS custom props. */
  color: string;
  stripeColor: string;
};

export type Sample = {
  /** Tube barcode. */
  id: string;
  tube: TubeKey;
  tests: string[];
  volumeMl: number;
  container: string;
  stat: boolean;
  status: SampleStatus;
  collectedAt?: string;
  collectedAtMs?: number;
  collectedBy?: string;
  inverted?: boolean;
  deferReason?: string;
  deferNote?: string;
};

export type JourneyState = 'waiting' | 'pending' | 'done';

export type CollectionPatient = {
  id: string;
  /** Patient ID barcode, format P + 4–8 digits. */
  pid: string;
  name: string;
  initials: string;
  sex: 'F' | 'M';
  dob: string;
  orderId: string;
  checkInAt: string;
  waitingMinutes: number;
  /** waiting = blocked upstream · pending = ready for this booth · done. */
  journey: { identity: JourneyState; vitals: JourneyState; phlebo: JourneyState };
  fasting: string;
  allergies: string[];
  samples: Sample[];
  vitals?: VitalsValues;
};

export type StationRole = 'vitals' | 'phlebotomy';

export type VitalsValues = {
  heightCm: string;
  weightKg: string;
  hr: string;
  bpSys: string;
  bpDia: string;
  tempC: string;
  tempUnit: 'C' | 'F';
  spo2: string;
  breathing: string;
  painVas: number;
  fasting: string | null;
  vaccinationNote: string;
};

export type SafetyChecks = {
  id: boolean;
  fasting: boolean;
  allergy: boolean;
  consent: boolean;
  site: boolean;
};

export type TimerTone = 'success' | 'warn' | 'danger';

/**
 * How the tubes are identified after a draw. A printed Kura sticker keeps the
 * order identity machine-readable end to end; handwriting is the fallback a
 * clinic without stickers still needs, and it carries a photo check because
 * nothing downstream can verify a pen stroke.
 */
export type TubeLabelMethod = 'sticker' | 'pen';

/** Photo evidence recorded when the sticker route is used. */
export type TubeLabelPhotoCheck = {
  applied: boolean;
  readable: boolean;
  photographed: boolean;
};
