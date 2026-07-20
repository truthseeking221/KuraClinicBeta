/**
 * Canonical professional-licence lifecycle mirrored from kura-platform.
 *
 * Source: `libs/contracts/src/lib/licence.ts` and ADR-0055 on
 * Kura-med/kura-platform main. Submission verdicts and credential states are
 * intentionally different: an APPROVED submission projects to `verified`,
 * while a rejected submission projects to `rejected`.
 */
export type LicenceState =
  | 'none'
  | 'pending_review'
  | 'rejected'
  | 'verified'
  | 'expiring'
  | 'in_grace'
  | 'lapsed';

export const LIVE_LICENCE_STATES = [
  'verified',
  'expiring',
  'in_grace',
] as const satisfies readonly LicenceState[];

/** Credential states that remain valid for new clinic-order attribution. */
export function isLiveLicence(state: LicenceState): boolean {
  return LIVE_LICENCE_STATES.includes(
    state as (typeof LIVE_LICENCE_STATES)[number],
  );
}
