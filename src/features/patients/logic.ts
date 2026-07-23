import type { Translate } from '../../components/foundations/i18n';

import type {
  AssuranceFilter,
  PatientSex,
  PatientSummary,
  PatientTerminalStatus,
} from './types';

/**
 * These helpers run outside React, so the caller passes its `t`. The default
 * keeps the English source, which is what the language of record renders.
 */
const asWritten: Translate = (source) => source;

/** Placeholder for data the platform cannot reveal (shredded) or never had. */
export const NAME_UNAVAILABLE = 'Name unavailable';

/** Short sex marker for the identity line; Unknown stays quiet. */
export function formatSexShort(sex: PatientSex): string {
  return sex === 'Unknown' ? '' : sex;
}

/**
 * Identity line under the name: "52 · F", "F" when age is unknown, or ''
 * when nothing is known. Age can be missing because date and year of birth
 * are both nullable on the profile.
 */
export function formatAgeSex(patient: Pick<PatientSummary, 'age' | 'hasAge' | 'sexAtBirth'>): string {
  const sex = formatSexShort(patient.sexAtBirth);
  if (!patient.hasAge) return sex;
  return sex ? `${patient.age} · ${sex}` : String(patient.age);
}

/**
 * Display name with the shredded/empty fallback applied. Only the fallback is
 * translated: a patient's own name is record data and is never rewritten.
 */
export function displayNameOf(
  patient: Pick<PatientSummary, 'displayName' | 'shredded'>,
  t: Translate = asWritten,
): string {
  return patient.displayName.trim() === '' ? t(NAME_UNAVAILABLE) : patient.displayName;
}

/** Two-letter initials for the avatar; '·' when the name is unavailable. */
export function initialsOf(patient: Pick<PatientSummary, 'displayName' | 'shredded'>): string {
  const name = patient.displayName.trim();
  if (name === '') return '·';
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export type PatientStatusView =
  | {
      kind: 'terminal';
      status: Exclude<PatientTerminalStatus, ''>;
      label: string;
      rowLabel: string;
    }
  | {
      kind: 'assurance';
      assurance: PatientSummary['assurance'];
      label: string;
      /** The same fact with its axis named, for readings that carry no header. */
      rowLabel: string;
    };

/**
 * One status per row, on the identity axis only.
 *
 * `verified` means someone sighted an identity document; it never means the
 * phone was verified. A bare "Verified" reads as both, so the short label is
 * only ever shown under a header that names the axis, and every headerless
 * reading uses `rowLabel`. `unverified` is the ordinary state of a record the
 * phone gate just created, so it is named `Provisional` — the vocabulary the
 * gate, the journey, and the context rail already use.
 *
 * Terminal states outrank assurance: a deceased or merged record must never
 * present as a routine patient.
 */
export function statusViewOf(
  patient: Pick<PatientSummary, 'assurance' | 'status'>,
): PatientStatusView {
  if (patient.status === 'deceased') {
    return { kind: 'terminal', status: 'deceased', label: 'Deceased', rowLabel: 'Deceased' };
  }
  if (patient.status === 'merged') {
    return { kind: 'terminal', status: 'merged', label: 'Merged', rowLabel: 'Merged' };
  }
  return patient.assurance === 'verified'
    ? {
        kind: 'assurance',
        assurance: 'verified',
        label: 'Verified',
        rowLabel: 'Identity verified',
      }
    : {
        kind: 'assurance',
        assurance: 'unverified',
        label: 'Provisional',
        rowLabel: 'Identity provisional',
      };
}

/**
 * The contact axis, kept separate from identity everywhere in the product.
 * `phone_masked` is populated only for a verified primary phone, so an empty
 * value is a fact with a consequence — the results link and the payment link
 * have nowhere to go — and is named rather than left as a blank dash.
 */
export const NO_VERIFIED_PHONE = 'No verified phone';

export function hasVerifiedPhone(patient: Pick<PatientSummary, 'phoneMasked'>): boolean {
  return patient.phoneMasked.trim() !== '';
}

/**
 * Client-side assurance filter. The list RPC accepts no filter parameter
 * today, so this only narrows rows already fetched; terminal records stay
 * visible in every view because hiding them invites acting on the wrong
 * record.
 */
export function filterByAssurance(
  patients: readonly PatientSummary[],
  filter: AssuranceFilter,
): PatientSummary[] {
  if (filter === 'all') return [...patients];
  return patients.filter(
    (patient) => patient.status === '' && patient.assurance === filter,
  );
}

export function countByAssurance(
  patients: readonly PatientSummary[],
): Record<AssuranceFilter, number> {
  const counts = { all: patients.length, unverified: 0, verified: 0 };
  for (const patient of patients) {
    if (patient.status !== '') continue;
    counts[patient.assurance] += 1;
  }
  return counts;
}

/**
 * Accessible row summary so the whole row can act as one open-record control.
 * Both axes are named because a row read aloud carries no column headers, and
 * the missing phone is announced only when it is missing.
 */
export function rowLabelOf(
  patient: PatientSummary,
  triageLabel?: string,
  t: Translate = asWritten,
): string {
  const parts = [
    `${t('Open')} ${displayNameOf(patient, t)}`,
    formatAgeSex(patient) || undefined,
    t(statusViewOf(patient).rowLabel),
    hasVerifiedPhone(patient) ? undefined : t(NO_VERIFIED_PHONE),
    triageLabel ? t(triageLabel) : undefined,
  ];
  return parts.filter(Boolean).join('. ');
}
