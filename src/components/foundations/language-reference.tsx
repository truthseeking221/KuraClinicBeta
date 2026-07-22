'use client';

import { LOCALE_ENGLISH_LABELS, LOCALE_LABELS, LOCALES, translate } from './i18n';
import { UNTRANSLATED_DOMAINS } from './i18n';
import { KM_DICTIONARY } from './i18n';

/* Specimens are written as English source strings so this page proves the real
   lookup: what renders here is what the product renders. */
const CHROME_SPECIMENS = [
  'Search',
  'Work area',
  'Patients',
  'Results',
  'Sign out',
  'Save changes',
] as const;

const SCALE_SPECIMENS = [
  { label: '2XS', variable: '--type-2xs', latin: '11px', khmer: '13px' },
  { label: 'XS', variable: '--type-xs', latin: '12px', khmer: '14px' },
  { label: 'SM', variable: '--type-sm', latin: '13px', khmer: '14px' },
  { label: 'Base', variable: '--type-base', latin: '14px', khmer: '14px' },
  { label: 'MD and above', variable: '--type-md …', latin: 'unchanged', khmer: 'unchanged' },
] as const;

const LEADING_SPECIMENS = [
  { label: 'Tight', variable: '--leading-tight', latin: '1.2', khmer: '1.45' },
  { label: 'Snug', variable: '--leading-snug', latin: '1.35', khmer: '1.6' },
  { label: 'Normal', variable: '--leading-normal', latin: '1.5', khmer: '1.75' },
] as const;

/* A clinical string that keeps its Latin terms: the chrome translates, the
   analyte and unit do not. */
const MIXED_SPECIMEN = {
  source: 'Reference range',
  latinTerms: 'HbA1c 5.4 % · eGFR 92 mL/min/1.73m²',
};

function SectionHeading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <header className="flex flex-col gap-[var(--space-1)]">
      <h3 className="k-h5" id={id}>
        {title}
      </h3>
      <p className="k-body-sm text-[var(--color-text-secondary)]">{description}</p>
    </header>
  );
}

function Tray({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section
      aria-labelledby={`${label}-heading`}
      className="flex flex-col gap-[var(--space-inset-card)] rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] p-[var(--space-inset-card)]"
      data-language-section={label}
    >
      {children}
    </section>
  );
}

/**
 * The Kura language contract: which languages exist, how a string is
 * translated, what never gets translated, and how the type system retunes for
 * Khmer script.
 */
export function LanguageReference() {
  return (
    <div
      className="flex flex-col gap-[var(--space-8)] bg-[var(--color-surface-bg)] p-[var(--space-8)]"
      data-foundation-section="language"
    >
      <header className="flex flex-col gap-[var(--space-2)]">
        <h2 className="k-h3">Language</h2>
        <p className="k-body max-w-[70ch] text-[var(--color-text-secondary)]">
          Kura ships two interface languages. Khmer is the clinic floor language; English is
          the fallback and the language of record. Every story renders in either language from
          the Language control in the toolbar, so Khmer wrapping and overflow are verified where
          the component is designed.
        </p>
      </header>

      <Tray label="languages">
        <SectionHeading
          description="Each language names itself in its own script, so a user who lands in the wrong language can still recognise the way back."
          id="languages-heading"
          title="Supported languages"
        />
        <ul className="flex flex-col gap-[var(--space-2)]">
          {LOCALES.map((locale) => (
            <li
              className="flex items-center justify-between gap-[var(--space-4)] rounded-[var(--radius)] bg-[var(--color-surface)] p-[var(--space-3)] shadow-[var(--elevation-card-tile)]"
              key={locale}
            >
              <span className="k-body" lang={locale}>
                {LOCALE_LABELS[locale]}
              </span>
              <span className="k-caption">
                {LOCALE_ENGLISH_LABELS[locale]} · <code>{locale}</code>
              </span>
            </li>
          ))}
        </ul>
      </Tray>

      <Tray label="lookup">
        <SectionHeading
          description="The English string is the key. There is no separate key namespace to invent or drift from, and a missing entry renders the English source rather than a blank or a key name."
          id="lookup-heading"
          title="How a string resolves"
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="k-label">
                <th className="p-[var(--space-2)]">English source (the key)</th>
                <th className="p-[var(--space-2)]">Khmer</th>
              </tr>
            </thead>
            <tbody>
              {CHROME_SPECIMENS.map((source) => (
                <tr key={source}>
                  <td className="k-body-sm p-[var(--space-2)]">{source}</td>
                  <td className="k-body-sm p-[var(--space-2)]" lang="km">
                    {translate('km', source)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="k-caption">
          {Object.keys(KM_DICTIONARY).length} strings currently carry a Khmer rendering.
        </p>
      </Tray>

      <Tray label="untranslated">
        <SectionHeading
          description="These stay in Latin script in every language. Translating them is a patient-safety defect, not a coverage gap — a drug name read back to a pharmacist must match the label on the box, and analyte codes are international."
          id="untranslated-heading"
          title="What is never translated"
        />
        <ul className="flex flex-col gap-[var(--space-1)]">
          {UNTRANSLATED_DOMAINS.map((domain) => (
            <li className="k-body-sm" key={domain}>
              {domain}
            </li>
          ))}
        </ul>
        <p className="k-body-sm max-w-[70ch] text-[var(--color-text-secondary)]">
          The chrome around a clinical term is translated; the term inside it is not. Numerals
          stay Arabic digits — Khmer numerals in a dose, a result, or an amount are a misreading
          risk.
        </p>
        <p className="k-body rounded-[var(--radius)] bg-[var(--color-surface)] p-[var(--space-3)] shadow-[var(--elevation-card-tile)]">
          <span lang="km">{translate('km', MIXED_SPECIMEN.source)}</span>{' '}
          <span>{MIXED_SPECIMEN.latinTerms}</span>
        </p>
      </Tray>

      <Tray label="typography">
        <SectionHeading
          description="Khmer stacks marks in three vertical zones: vowel signs above the baseline, the consonant body, and subscript consonants (coeng) below it. A cluster needs roughly 40% more vertical room than Latin and reads optically smaller inside that taller stack."
          id="typography-heading"
          title="Khmer typography"
        />
        <p className="k-body-sm max-w-[70ch] text-[var(--color-text-secondary)]">
          The type tokens retune under <code>[lang=&apos;km&apos;]</code> rather than each
          component patching itself, so every existing{' '}
          <code>var(--leading-tight)</code> already resolves to a Khmer-safe value. Roles keep
          their meaning: tight stays the tightest role, normal stays the reading role.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="k-label">
                <th className="p-[var(--space-2)]">Leading token</th>
                <th className="p-[var(--space-2)]">Latin</th>
                <th className="p-[var(--space-2)]">Khmer</th>
              </tr>
            </thead>
            <tbody>
              {LEADING_SPECIMENS.map((row) => (
                <tr key={row.variable}>
                  <td className="k-body-sm p-[var(--space-2)]">
                    {row.label} · <code>{row.variable}</code>
                  </td>
                  <td className="k-body-sm p-[var(--space-2)]">{row.latin}</td>
                  <td className="k-body-sm p-[var(--space-2)]">{row.khmer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="k-label">
                <th className="p-[var(--space-2)]">Size token</th>
                <th className="p-[var(--space-2)]">Latin</th>
                <th className="p-[var(--space-2)]">Khmer</th>
              </tr>
            </thead>
            <tbody>
              {SCALE_SPECIMENS.map((row) => (
                <tr key={row.variable}>
                  <td className="k-body-sm p-[var(--space-2)]">
                    {row.label} · <code>{row.variable}</code>
                  </td>
                  <td className="k-body-sm p-[var(--space-2)]">{row.latin}</td>
                  <td className="k-body-sm p-[var(--space-2)]">{row.khmer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="flex flex-col gap-[var(--space-1)]">
          <li className="k-body-sm">
            Tracking resets to zero. Khmer marks belong to the cluster they sit on; tracking
            splits a cluster and can change which consonant a vowel sign reads against.
          </li>
          <li className="k-body-sm">
            Uppercase is removed. Khmer is caseless, so uppercase would shout only the Latin
            clinical terms left inside a translated string.
          </li>
          <li className="k-body-sm">
            Wrapping breaks between syllable clusters, never inside one — a split cluster is a
            different word. Khmer does not space words.
          </li>
          <li className="k-body-sm">
            Form controls, code, and mono spans keep their tracking: they carry untranslated
            Latin identifiers whose spacing is deliberate.
          </li>
        </ul>

        <div className="flex flex-col gap-[var(--space-2)] rounded-[var(--radius)] bg-[var(--color-surface)] p-[var(--space-3)] shadow-[var(--elevation-card-tile)]">
          <span className="k-caption">Same role, both scripts</span>
          <p className="k-body">Acknowledge the abnormal result before closing this visit.</p>
          <p className="k-body" lang="km">
            ទទួលស្គាល់លទ្ធផលមិនធម្មតា មុនពេលបិទការមកពិនិត្យនេះ។
          </p>
        </div>
      </Tray>
    </div>
  );
}
