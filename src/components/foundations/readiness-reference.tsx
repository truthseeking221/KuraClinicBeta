'use client';

import { Badge } from '../ui';

import type { ReadinessLevel } from './readiness-data';
import { READINESS, READINESS_LEVELS } from './readiness-data';

const LEVEL_BADGE: Record<ReadinessLevel, 'success' | 'warning' | 'danger' | 'neutral'> = {
  ready: 'success',
  partial: 'warning',
  gap: 'danger',
  deprecated: 'neutral',
};

const LEVEL_ORDER: readonly ReadinessLevel[] = ['ready', 'partial', 'gap', 'deprecated'];

export function ReadinessBadge({ level }: { level: ReadinessLevel }) {
  return (
    <Badge size="sm" variant={LEVEL_BADGE[level]}>
      {READINESS_LEVELS[level].label}
    </Badge>
  );
}

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

/**
 * The governance board: how much of each Storybook domain is backed by the
 * real kura-platform backend versus local demo scaffolding. Data lives in
 * readiness-data.ts; feature stories reference the same entries through
 * `parameters.kura.readiness`.
 */
export function ReadinessReference() {
  const entries = Object.values(READINESS);
  const counts = LEVEL_ORDER.map(
    (level) => [level, entries.filter((entry) => entry.level === level).length] as const,
  );

  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-8 text-foreground sm:px-8" data-density="compact">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12">
        <header className="border-b border-border pb-8" data-readiness-section="principles">
          <p className="k-label">Kura governance</p>
          <h1 className="k-h1 mt-2 text-balance">Release readiness</h1>
          <p className="k-body mt-3 max-w-3xl text-[var(--color-text-secondary)]">
            Business truth beats demo content. This board states, per domain, what runs on the
            real kura-platform contract and what is local scaffolding — so a polished surface can
            never be mistaken for a shipped capability. Levels are maintained in{' '}
            <code className="font-mono">readiness-data.ts</code> and referenced by each domain’s
            story metadata.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {counts.map(([level, count]) =>
              count > 0 ? (
                <span className="inline-flex items-center gap-2" key={level}>
                  <ReadinessBadge level={level} />
                  <span className="k-caption text-[var(--color-text-secondary)]">× {count}</span>
                </span>
              ) : null,
            )}
          </div>
        </header>

        {/* Legend, not content: unboxed rows keep the Domains table the one
          * dominant surface on the page. */}
        <section aria-labelledby="readiness-levels-heading" data-readiness-section="levels">
          <SectionHeader id="readiness-levels-heading" title="Levels">
            What each label commits to, and how to speak about it in a demo.
          </SectionHeader>
          <div className="flex flex-col gap-2">
            {LEVEL_ORDER.map((level) => {
              const meta = READINESS_LEVELS[level];
              return (
                <p
                  className="k-body-sm flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
                  data-readiness-level={level}
                  key={level}
                >
                  <ReadinessBadge level={level} />
                  <span className="text-[var(--color-text-primary)]">{meta.meaning}</span>
                  <span className="k-caption text-[var(--color-text-tertiary)]">{meta.demoGuidance}</span>
                </p>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="readiness-domains-heading" data-readiness-section="domains">
          <SectionHeader id="readiness-domains-heading" meta={`${entries.length} domains`} title="Domains">
            One row per Storybook domain. The note names exactly which parts are real and which
            are scaffolding — that sentence is the demo script.
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
            {entries.map((entry) => (
              <div
                className="grid gap-x-6 gap-y-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_7rem_minmax(0,2fr)]"
                data-readiness-domain={entry.area}
                key={entry.area}
              >
                <div className="min-w-0">
                  <p className="k-body-sm font-medium text-[var(--color-text-primary)]">{entry.area}</p>
                  <code className="k-caption block break-all font-mono text-[var(--color-text-tertiary)]">
                    {entry.owner}
                  </code>
                </div>
                <div><ReadinessBadge level={entry.level} /></div>
                <p className="k-body-sm min-w-0 text-[var(--color-text-secondary)]">{entry.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="readiness-rules-heading" data-readiness-section="rules">
          <SectionHeader id="readiness-rules-heading" title="Rules">
            How this board stays honest.
          </SectionHeader>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              A new domain lands on this board in the same change that adds its first story.
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              A level only moves to Ready when the backend contract is consumed, not when the UI looks finished.
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              Gap surfaces may ship wow, but their docs must say “target contract” — never imply live data.
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              Levels change in readiness-data.ts only, so the board and story metadata cannot disagree.
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              Machine-enforced: <code className="font-mono">readiness-governance.spec.ts</code> fails
              the unit suite when a feature story ships without a readiness declaration, an area has
              no matching story, or an owner path stops existing.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
