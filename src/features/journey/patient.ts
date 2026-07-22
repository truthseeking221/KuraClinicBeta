/**
 * The one patient the executable journey follows, end to end.
 *
 * Every surface the episode passes through — acquisition, assessment,
 * ordering, collection, results, care plan — reads identity from here. The
 * source board carries the same person under contradictory demographics; a
 * single manifest is what makes the journey runnable, and identity drift
 * mid-journey is a clinical safety defect, not a fixture detail.
 *
 * This module imports nothing so any feature can depend on it without a cycle.
 */

/** Canonical demographics. Masked forms match how patient-ms returns them. */
export const JOURNEY_PATIENT = {
  userId: 'p-sok-nimol',
  displayName: 'Sok Nimol',
  initials: 'SN',
  sexAtBirth: 'M' as const,
  sexLabel: 'Male',
  age: 32,
  dob: '1994-02-18',
  mrn: 'P-8842',
  mrnMasked: '··42',
  phone: '+85599111222',
  phoneMasked: '+85*****1222',
  orderId: 'ORD-58291',
} as const;

/** Identity line shared by every header and rail: "32 y · M · MRN P-8842". */
export const JOURNEY_PATIENT_DEMOGRAPHICS = `${JOURNEY_PATIENT.age} y · ${JOURNEY_PATIENT.sexAtBirth} · MRN ${JOURNEY_PATIENT.mrn}`;
