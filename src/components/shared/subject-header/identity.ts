/**
 * Identity formatting shared by every surface that names the person a
 * workflow is about. Pure and deterministic apart from `ageOf`, which reads
 * the clock exactly once per call.
 */

/** "Dr. Sok Vanna" → "SV": honorifics carry no identity, first + last name do. */
export function initialsFor(name: string): string {
  const words = name
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0].charAt(0);
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
  return `${first}${last}`.toUpperCase();
}

/** Whole years since an ISO date of birth; null when absent or unparseable. */
export function ageOf(iso?: string): number | null {
  if (!iso) return null;
  const dob = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age >= 0 ? age : null;
}

/**
 * "1996-02-14" → "14 Feb 1996 · 30y". An unparseable value is echoed back
 * verbatim rather than hidden — the desk needs to see what was entered.
 */
export function formatDobLabel(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
  const age = ageOf(iso);
  return age === null ? formatted : `${formatted} · ${age}y`;
}
