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
  | { kind: 'terminal'; status: Exclude<PatientTerminalStatus, ''>; label: string }
  | { kind: 'assurance'; assurance: PatientSummary['assurance']; label: string };

/**
 * One status per row. Terminal states outrank assurance: a deceased or
 * merged record must never present as a routine verified patient.
 */
export function statusViewOf(
  patient: Pick<PatientSummary, 'assurance' | 'status'>,
): PatientStatusView {
  if (patient.status === 'deceased') return { kind: 'terminal', status: 'deceased', label: 'Deceased' };
  if (patient.status === 'merged') return { kind: 'terminal', status: 'merged', label: 'Merged' };
  return patient.assurance === 'verified'
    ? { kind: 'assurance', assurance: 'verified', label: 'Verified' }
    : { kind: 'assurance', assurance: 'unverified', label: 'Unverified' };
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

/** Accessible row summary so the whole row can act as one open-record control. */
export function rowLabelOf(
  patient: PatientSummary,
  triageLabel?: string,
  t: Translate = asWritten,
): string {
  const parts = [
    `${t('Open')} ${displayNameOf(patient, t)}`,
    formatAgeSex(patient) || undefined,
    t(statusViewOf(patient).label),
    triageLabel ? t(triageLabel) : undefined,
  ];
  return parts.filter(Boolean).join('. ');
}
