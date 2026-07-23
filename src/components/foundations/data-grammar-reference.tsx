'use client';

import { Badge, MoneyText } from '../ui';

type GrammarRule = Readonly<{
  rule: string;
  detail: string;
}>;

const NUMBER_RULES: readonly GrammarRule[] = [
  {
    rule: 'Money travels as int64 minor-unit strings',
    detail:
      'Backend money is a string of minor units ("1800" = $18.00). Render through MoneyText; never parse into floats.',
  },
  {
    rule: 'Numerals are tabular wherever they align',
    detail:
      'Totals, statement rows, timestamps, and counters use tabular numerals so columns do not shimmer when values change.',
  },
  {
    rule: 'USD is the hero; KHR is an inline suffix',
    detail:
      'The collectible amount renders large in USD with the KHR conversion on the same baseline in tertiary text — one hero per surface.',
  },
  {
    rule: 'Estimates say so',
    detail:
      'Uncommitted amounts carry the "est." prefix ("est. +$236.00"); settled amounts never do. Sign prefixes mark direction (+ payout, − deduction).',
  },
];

const TIME_RULES: readonly GrammarRule[] = [
  {
    rule: '24-hour clock, Indochina time',
    detail:
      'The clinic runs on ICT (+07). Event stamps read "Jun 10, 2026 · 14:32" — month name, day, year, middle dot, 24-hour time.',
  },
  {
    rule: 'Relative time only for the last few days',
    detail:
      '"Today · 09:12", "Yesterday · 17:40", "2 days ago" are fine within a week of now; anything older shows the absolute date.',
  },
  {
    rule: 'Data is ISO, display is prose',
    detail:
      'Fixtures and payloads store ISO dates ("2026-07-20"); the interface renders the prose form. Never show ISO to a clinician.',
  },
  {
    rule: 'Countdowns state the unit',
    detail: 'Deadlines render as "in 28 days", never a bare number or a progress ring without text.',
  },
];

const MASKING_RULES: readonly GrammarRule[] = [
  {
    rule: 'Minimum PHI, always',
    detail:
      'Identity surfaces render the least data that completes the task: MRN as "MRN ··34", phone confirmation as "+855 70 ... 496".',
  },
  {
    rule: 'Financial identifiers mask to the last four',
    detail: 'Bank accounts read "ABA ···· 4102" — institution plus last four, middle dots, no full numbers anywhere.',
  },
  {
    rule: 'Masking is not verification',
    detail:
      'A masked match ("Is this the patient?") never claims identity. Copy stays at "Phone verified by SMS"; identity confirmation belongs to PSC.',
  },
];

const STATUS_MAP: readonly Readonly<{
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  label: string;
  meaning: string;
  examples: string;
}>[] = [
  {
    variant: 'success',
    label: 'Success',
    meaning: 'A completed or verified fact.',
    examples: 'Verified · Settled · Active · Valid',
  },
  {
    variant: 'warning',
    label: 'Warning',
    meaning: 'Needs attention soon; nothing is broken yet.',
    examples: 'Pending · Renews in 28 days · Action needed',
  },
  {
    variant: 'danger',
    label: 'Danger',
    meaning: 'Blocked, failed, or clinically out of range.',
    examples: 'Upload failed · Out of range · Revoked',
  },
  {
    variant: 'info',
    label: 'Info',
    meaning: 'Neutral system fact worth noticing.',
    examples: 'Public · File selected · Under review',
  },
  {
    variant: 'neutral',
    label: 'Neutral',
    meaning: 'Inactive, secondary, or voided.',
    examples: 'Fallback · Voided · Not verified',
  },
];

const QUANT_RULES: readonly GrammarRule[] = [
  {
    rule: 'One axis, one meaning',
    detail: 'Never a dual-axis chart. Two measures of different scale become two charts or an indexed series.',
  },
  {
    rule: 'Only the normal band is tinted',
    detail:
      'Range context tints the optimal zone; caution and out-of-range zones stay muted until a value lands in them. Ink goes to the data line.',
  },
  {
    rule: 'The needle marker is the shared language',
    detail:
      'Range bands, trend charts, and sparklines all mark the current value with the same pin: surface core, tone ring, no decorative dots.',
  },
  {
    rule: 'Labels are selective',
    detail:
      'The latest value and abnormal points earn labels; everything else waits for hover. A number on every point is noise, not information.',
  },
  {
    rule: 'No decorative encodings',
    detail:
      'Gradients, fills, and glows must encode a real quantity. If the encoding has no clinical meaning, remove it.',
  },
];

const EMPTY_RULES: readonly GrammarRule[] = [
  {
    rule: 'Empty states name the absence',
    detail: '"None listed", "No other sessions", "No tests added" — a short fact, not an illustration or an apology.',
  },
  {
    rule: 'Unknown is not zero',
    detail:
      'A missing value renders an em dash (—); zero renders 0. Conflating them fabricates clinical data.',
  },
  {
    rule: 'Rows collapse before they lie',
    detail:
      'A row whose value adds nothing (subtotal equal to the total, metadata repeating the name) is omitted, not padded with filler.',
  },
];

function SectionHeader({
  id,
  title,
  meta,
  children,
}: {
  id: string;
  title: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 border-b border-border pb-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={id} className="k-h3 text-balance">{title}</h2>
        {meta ? <span className="k-caption font-mono text-[var(--color-text-secondary)]">{meta}</span> : null}
      </div>
      {children ? <p className="k-body-sm mt-1 max-w-3xl text-[var(--color-text-secondary)]">{children}</p> : null}
    </div>
  );
}

function RuleList({ rules }: { rules: readonly GrammarRule[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
      {rules.map((entry) => (
        <div
          className="grid gap-x-6 gap-y-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
          key={entry.rule}
        >
          <p className="k-body-sm font-medium text-[var(--color-text-primary)]">{entry.rule}</p>
          <p className="k-body-sm min-w-0 text-[var(--color-text-secondary)]">{entry.detail}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * How Kura displays data: money, time, identity masking, status chips,
 * quantitative marks, and absence. Every rule here is enforced in review;
 * specimens quote copy from shipped surfaces.
 */
export function DataGrammarReference() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-8 text-foreground sm:px-8" data-density="compact">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12">
        <header className="border-b border-border pb-8" data-data-grammar-section="principles">
          <p className="k-label">Kura data grammar</p>
          <h1 className="k-h1 mt-2 text-balance">Data display</h1>
          <p className="k-body mt-3 max-w-3xl text-[var(--color-text-secondary)]">
            Clinical software earns trust by displaying data the same way everywhere. This page is
            the grammar: how money, time, identity, status, and quantity render across every Kura
            surface. If a screen and this page disagree, the screen is wrong.
          </p>
        </header>

        <section aria-labelledby="dg-money-heading" data-data-grammar-section="money">
          <SectionHeader id="dg-money-heading" meta={`${NUMBER_RULES.length} rules`} title="Numbers & money">
            Money is backend truth rendered faithfully — minor units in, formatted currency out.
          </SectionHeader>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-[var(--color-surface)] p-4">
              <p className="k-label">Patient due · hero + suffix</p>
              <p className="mt-2 flex flex-wrap items-baseline justify-start gap-x-2">
                <MoneyText className="k-h2 tabular-nums" currency="USD" minor="1800" />
                <MoneyText className="k-caption text-[var(--color-text-tertiary)]" currency="KHR" minor="7380000" />
              </p>
              <p className="k-caption mt-1 text-[var(--color-text-secondary)]">
                One hero amount; the KHR conversion reads as a suffix, not a second row.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-[var(--color-surface)] p-4">
              <p className="k-label">Statement rows · estimates &amp; direction</p>
              <div className="mt-2 flex flex-col gap-1">
                <p className="k-body-sm tabular-nums">est. +$236.00 <span className="k-caption text-[var(--color-text-tertiary)]">· pending</span></p>
                <p className="k-body-sm tabular-nums">+$612.00 <span className="k-caption text-[var(--color-text-tertiary)]">· settled, paid Jun 16</span></p>
                <p className="k-body-sm tabular-nums">−$176.00 <span className="k-caption text-[var(--color-text-tertiary)]">· lab costs netted</span></p>
              </div>
            </div>
          </div>
          <RuleList rules={NUMBER_RULES} />
        </section>

        <section aria-labelledby="dg-time-heading" data-data-grammar-section="time">
          <SectionHeader id="dg-time-heading" meta={`${TIME_RULES.length} rules`} title="Date & time">
            One clinic, one clock: 24-hour ICT everywhere, prose dates for people, ISO for machines.
          </SectionHeader>
          <div className="mb-4 rounded-lg border border-border bg-[var(--color-surface)] p-4">
            <p className="k-label">Specimens</p>
            <div className="mt-2 flex flex-wrap gap-x-8 gap-y-1">
              <p className="k-body-sm tabular-nums">Jun 10, 2026 · 14:32 <span className="k-caption text-[var(--color-text-tertiary)]">event stamp</span></p>
              <p className="k-body-sm tabular-nums">Today · 09:12 <span className="k-caption text-[var(--color-text-tertiary)]">recent activity</span></p>
              <p className="k-body-sm tabular-nums">in 28 days <span className="k-caption text-[var(--color-text-tertiary)]">countdown</span></p>
            </div>
          </div>
          <RuleList rules={TIME_RULES} />
        </section>

        <section aria-labelledby="dg-masking-heading" data-data-grammar-section="masking">
          <SectionHeader id="dg-masking-heading" meta={`${MASKING_RULES.length} rules`} title="Identity & masking">
            The interface shows the least identity that completes the task.
          </SectionHeader>
          <div className="mb-4 rounded-lg border border-border bg-[var(--color-surface)] p-4">
            <p className="k-label">Specimens</p>
            <div className="mt-2 flex flex-wrap gap-x-8 gap-y-1">
              <p className="k-body-sm tabular-nums">MRN ··34</p>
              <p className="k-body-sm tabular-nums">+855 70 ... 496</p>
              <p className="k-body-sm tabular-nums">ABA ···· 4102</p>
            </div>
          </div>
          <RuleList rules={MASKING_RULES} />
        </section>

        <section aria-labelledby="dg-status-heading" data-data-grammar-section="status">
          <SectionHeader id="dg-status-heading" meta={`${STATUS_MAP.length} tones`} title="Status chips">
            Status is a Badge with a text label — never color alone, never a bare dot. Tones map to
            meaning, not to decoration.
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
            {STATUS_MAP.map((entry) => (
              <div
                className="grid items-center gap-x-6 gap-y-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)]"
                key={entry.variant}
              >
                <div><Badge size="sm" variant={entry.variant}>{entry.label}</Badge></div>
                <p className="k-body-sm text-[var(--color-text-primary)]">{entry.meaning}</p>
                <p className="k-caption min-w-0 text-[var(--color-text-secondary)]">{entry.examples}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="dg-quant-heading" data-data-grammar-section="quantitative">
          <SectionHeader id="dg-quant-heading" meta={`${QUANT_RULES.length} rules`} title="Quantitative marks">
            Range bands, trend charts, and sparklines share one visual language. Calm chrome, loud
            data: the ink budget belongs to values, not decoration.
          </SectionHeader>
          <RuleList rules={QUANT_RULES} />
        </section>

        <section aria-labelledby="dg-empty-heading" data-data-grammar-section="absence">
          <SectionHeader id="dg-empty-heading" meta={`${EMPTY_RULES.length} rules`} title="Absence">
            Nothing is also data. Absence renders honestly or not at all.
          </SectionHeader>
          <RuleList rules={EMPTY_RULES} />
        </section>
      </div>
    </main>
  );
}
