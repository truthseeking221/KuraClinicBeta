/**
 * A Khmer dictionary maps an English source string to its Khmer rendering.
 *
 * The English string is the key. Entries are grouped into one file per feature
 * area so ownership matches the feature that writes the copy.
 */
export type KhmerDictionary = Readonly<Record<string, string>>;

/**
 * Terms that stay in Latin script in every language.
 *
 * Translating these is a patient-safety defect, not a coverage gap:
 * - Drug names read back to a pharmacist must match the label on the box.
 * - Lab analyte names and codes (HbA1c, WBC, eGFR) are international.
 * - ICD-10 codes, units (mg/dL, mmol/L), and specimen codes are contract data.
 *
 * Surrounding chrome — the label, the action, the explanation — is translated.
 * The clinical token inside it is not.
 */
export const UNTRANSLATED_DOMAINS = [
  'drug names',
  'lab analyte names and codes',
  'ICD-10 codes and titles',
  'units of measure',
  'specimen and tube codes',
  'booking codes and identifiers',
] as const;

/** Merge area dictionaries, failing loudly if two areas disagree on a string. */
export function mergeDictionaries(
  areas: readonly (readonly [string, KhmerDictionary])[],
): KhmerDictionary {
  const merged: Record<string, string> = {};
  const owners: Record<string, string> = {};

  for (const [area, dictionary] of areas) {
    for (const [source, khmer] of Object.entries(dictionary)) {
      const existing = merged[source];
      if (existing !== undefined && existing !== khmer) {
        throw new Error(
          `Khmer dictionary conflict for "${source}": ${owners[source]} says "${existing}", ${area} says "${khmer}". One English string must have one Khmer rendering.`,
        );
      }
      merged[source] = khmer;
      owners[source] = area;
    }
  }

  return merged;
}
