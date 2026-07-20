'use client';

import { useState } from 'react';

import { Badge, Button, MoneyText } from '../ui';

type DurationToken = Readonly<{
  name: string;
  value: string;
  role: string;
  examples: string;
}>;

type EasingToken = Readonly<{
  name: string;
  value: string;
  curve: readonly [number, number, number, number];
  role: string;
}>;

type SemanticMotion = Readonly<{
  name: string;
  composition: string;
  use: string;
}>;

const DURATIONS: readonly DurationToken[] = [
  {
    name: '--duration-instant',
    value: '0ms',
    role: 'State that must never lag: pressed feedback, safety-critical reveals.',
    examples: 'Active press, destructive confirmation content',
  },
  {
    name: '--duration-fast',
    value: '140ms',
    role: 'Color and opacity feedback on hover, focus, and tone changes.',
    examples: 'Button hover, badge tone cross-fade, row hover',
  },
  {
    name: '--duration-base',
    value: '200ms',
    role: 'Size, position, and overlay entry. The default for visible movement.',
    examples: 'Dialog enter, checkbox mark, value change fade',
  },
  {
    name: '--duration-slow',
    value: '300ms',
    role: 'Layout shifts. Also the ceiling — nothing animates longer.',
    examples: 'Sidebar rail collapse, panel width',
  },
];

const EASINGS: readonly EasingToken[] = [
  {
    name: '--ease-standard',
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
    curve: [0.4, 0, 0.2, 1],
    role: 'Default curve for every on-screen state change.',
  },
  {
    name: '--ease-out',
    value: 'cubic-bezier(0, 0, 0.2, 1)',
    curve: [0, 0, 0.2, 1],
    role: 'Entrances — elements arriving decelerate into place.',
  },
  {
    name: '--ease-in',
    value: 'cubic-bezier(0.4, 0, 1, 1)',
    curve: [0.4, 0, 1, 1],
    role: 'Exits — elements leaving accelerate away.',
  },
  {
    name: '--ease-emphasized',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    curve: [0.2, 0, 0, 1],
    role: 'Indicator movement that should feel deliberate (stepper, toggles).',
  },
];

const SEMANTIC_MOTION: readonly SemanticMotion[] = [
  { name: '--motion-color', composition: 'fast · standard', use: 'Color/opacity feedback: hover, tone changes' },
  { name: '--motion-control', composition: 'fast · standard', use: 'Control chrome: chevrons, toggles, small transforms' },
  { name: '--motion-overlay-in', composition: 'base · out', use: 'Dialog, sheet, popover entrances' },
  { name: '--motion-overlay-out', composition: 'fast · in', use: 'Overlay exits — leave faster than they arrive' },
  { name: '--motion-indicator', composition: 'base · emphasized', use: 'Stepper indicators, selection markers' },
  { name: '--motion-layout', composition: 'slow · standard', use: 'Rail collapse, panel resize, structural shifts' },
];

const RULES: readonly string[] = [
  'Transition named properties only — transition: all is banned.',
  'Never hardcode milliseconds or curves in modules; compose from motion tokens.',
  '300ms is the ceiling for interface motion; longer belongs to data storytelling only.',
  'Animate data, not chrome: value changes, status tones, and arrivals earn motion — decoration does not.',
  'Reduced motion is automatic: the root zeroes every duration token; keyframes still need their own guard.',
  'Motion never delays safety: blockers, destructive confirmations, and errors render at full opacity immediately.',
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

/* ── Durations ───────────────────────────────────────────── */

function DurationRow({ token }: { token: DurationToken }) {
  const [run, setRun] = useState(false);

  return (
    <div
      className="dcm-motion-row border-b border-border px-4 py-3 last:border-b-0"
      data-motion-token={token.name}
    >
      <div className="min-w-0">
        <code className="k-body-sm block select-text break-all font-mono font-medium">{token.name}</code>
        <p className="k-caption mt-1 text-[var(--color-text-secondary)]">{token.role}</p>
        <p className="k-caption mt-1 text-[var(--color-text-tertiary)]">{token.examples}</p>
      </div>
      <code className="k-caption select-text font-mono text-[var(--color-text-secondary)]">{token.value}</code>
      <button
        type="button"
        aria-label={`Preview ${token.name}`}
        onClick={() => setRun((previous) => !previous)}
        className="dcm-motion-track relative block overflow-hidden rounded-md bg-[var(--color-surface-sunken)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
      >
        <span
          aria-hidden="true"
          className="dcm-motion-dot absolute top-1/2 block rounded-full bg-[var(--color-brand-500)]"
          data-run={run ? 'true' : 'false'}
          style={{ transitionDuration: `var(${token.name})` }}
        />
      </button>
    </div>
  );
}

/* ── Easing curves ───────────────────────────────────────── */

function EasingCurve({ token }: { token: EasingToken }) {
  const [x1, y1, x2, y2] = token.curve;
  const path = `M 0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`;

  return (
    <div
      className="min-w-0 rounded-lg border border-border bg-[var(--color-surface)] p-4"
      data-motion-token={token.name}
    >
      <svg
        aria-hidden="true"
        className="block h-24 w-full"
        preserveAspectRatio="none"
        viewBox="-4 -4 108 108"
      >
        <path d="M 0 100 L 100 0" fill="none" stroke="var(--color-border)" strokeDasharray="4 4" strokeWidth="1.5" />
        <path d={path} fill="none" stroke="var(--color-brand-500)" strokeLinecap="round" strokeWidth="3" />
      </svg>
      <code className="k-body-sm mt-3 block select-text break-all font-mono font-medium">{token.name}</code>
      <code className="k-caption block select-text break-all font-mono text-[var(--color-text-tertiary)]">{token.value}</code>
      <p className="k-caption mt-1 text-[var(--color-text-secondary)]">{token.role}</p>
    </div>
  );
}

/* ── Live specimens ──────────────────────────────────────── */

function LiveSpecimens() {
  const [tone, setTone] = useState<'success' | 'warning'>('success');
  const [dueMinor, setDueMinor] = useState(2100);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-lg border border-border bg-[var(--color-surface)] p-4">
        <p className="k-label">Value change · money-value-in</p>
        <MoneyText
          animateChanges
          className="k-h3 mt-2 block tabular-nums"
          currency="USD"
          minor={String(dueMinor)}
        />
        <Button
          className="mt-3"
          onClick={() => setDueMinor((previous) => previous + 650)}
          size="sm"
          variant="secondary"
        >
          Add $6.50 line
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-[var(--color-surface)] p-4">
        <p className="k-label">Status tone · cross-fade</p>
        <div className="mt-2">
          <Badge variant={tone}>{tone === 'success' ? 'Eligible' : 'Needs review'}</Badge>
        </div>
        <Button
          className="mt-3"
          onClick={() => setTone((previous) => (previous === 'success' ? 'warning' : 'success'))}
          size="sm"
          variant="secondary"
        >
          Toggle status
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-[var(--color-surface)] p-4">
        <p className="k-label">Control feedback · hover &amp; press</p>
        <p className="k-caption mt-1 text-[var(--color-text-secondary)]">
          Hover shifts color at fast; press lands at instant.
        </p>
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="primary">Primary</Button>
          <Button size="sm" variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export function MotionReference() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-8 text-foreground sm:px-8" data-density="compact">
      <style>{`
        .dcm-motion-row { display: grid; grid-template-columns: minmax(0, 1.8fr) minmax(0, 0.5fr) minmax(0, 1fr); gap: var(--space-4); align-items: center; }
        .dcm-motion-track { height: var(--space-8); }
        .dcm-motion-dot {
          width: var(--space-3);
          height: var(--space-3);
          left: var(--space-2);
          transform: translateY(-50%);
          transition-property: left;
          transition-timing-function: var(--ease-standard);
        }
        .dcm-motion-dot[data-run='true'] { left: calc(100% - var(--space-5)); }
        @media (max-width: 767px) {
          .dcm-motion-row { grid-template-columns: minmax(0, 1fr) auto; }
          .dcm-motion-row > :last-child { grid-column: 1 / -1; }
        }
      `}</style>
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12">
        <header data-motion-section="principles" className="border-b border-border pb-8">
          <p className="k-label">Kura motion contract</p>
          <h1 className="k-h1 mt-2 text-balance">Motion</h1>
          <p className="k-body mt-3 max-w-3xl text-[var(--color-text-secondary)]">
            Calm chrome, loud data. Interface chrome moves briefly and predictably through{' '}
            <strong className="font-mono">{DURATIONS.length}</strong> durations and{' '}
            <strong className="font-mono">{EASINGS.length}</strong> curves; motion budget goes to the moments where
            data changes. Every duration collapses to zero under reduced motion.
          </p>
        </header>

        <section aria-labelledby="duration-heading" data-motion-section="durations">
          <SectionHeader id="duration-heading" meta={`${DURATIONS.length} tokens`} title="Durations">
            Click a track to run its dot at that token&apos;s speed. Fast is for color, base for movement, slow for
            layout — and slow is also the ceiling.
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
            {DURATIONS.map((token) => <DurationRow key={token.name} token={token} />)}
          </div>
        </section>

        <section aria-labelledby="easing-heading" data-motion-section="easings">
          <SectionHeader id="easing-heading" meta={`${EASINGS.length} tokens`} title="Easing curves">
            One standard curve for state changes; out for entrances, in for exits, emphasized for deliberate
            indicators. The dashed line is linear for comparison.
          </SectionHeader>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {EASINGS.map((token) => <EasingCurve key={token.name} token={token} />)}
          </div>
        </section>

        <section aria-labelledby="semantic-motion-heading" data-motion-section="semantic">
          <SectionHeader id="semantic-motion-heading" meta={`${SEMANTIC_MOTION.length} aliases`} title="Semantic motion">
            Call sites read intent, not milliseconds. Compose transitions from these aliases.
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
            {SEMANTIC_MOTION.map((alias) => (
              <div
                className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border px-4 py-3 last:border-b-0"
                data-motion-token={alias.name}
                key={alias.name}
              >
                <code className="k-body-sm select-text font-mono font-medium">{alias.name}</code>
                <code className="k-caption select-text font-mono text-[var(--color-text-tertiary)]">{alias.composition}</code>
                <p className="k-caption min-w-0 flex-1 text-right text-[var(--color-text-secondary)]">{alias.use}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="specimen-heading" data-motion-section="specimens">
          <SectionHeader id="specimen-heading" title="Live specimens">
            The three motions that carry the product feel: money changing, status tones crossing, controls answering.
          </SectionHeader>
          <LiveSpecimens />
        </section>

        <section aria-labelledby="rules-heading" data-motion-section="rules">
          <SectionHeader id="rules-heading" meta={`${RULES.length} rules`} title="Rules">
            Checked in review. A violation is a blocking finding, not a style preference.
          </SectionHeader>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            {RULES.map((rule) => (
              <li className="k-body-sm text-[var(--color-text-secondary)]" key={rule}>{rule}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
