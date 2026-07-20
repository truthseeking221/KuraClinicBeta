'use client';

type DoneCheck = Readonly<{
  step: string;
  detail: string;
  proof: string;
}>;

/**
 * Distilled from AGENTS.md and the ReUI × BoardUI × Kura component build
 * guide (§5): a component or story ships only when every row here passes.
 * Installation is intake; only this list is integration.
 */
const CHECKS: readonly DoneCheck[] = [
  {
    step: 'Minimalist gate passed',
    detail:
      'Every element and word earns its place. Nothing repeats an adjacent element; empty, loading, error, and success states name the cause and the next step. Clinical, authority, money, and legal context always survives the cut.',
    proof: 'minimalist checklist against rendered UI',
  },
  {
    step: 'Intake decision recorded',
    detail:
      'USE-AS-IS, EXTEND, DOMAIN-ADAPT, COMPOSE, or CREATE — with owner, evidence, and exclusions in parameters.kura.intake. Vendor names never appear in story titles.',
    proof: 'kura.intake block on the story meta',
  },
  {
    step: 'Every value traces to a token',
    detail:
      'Colors, spacing, radius, type, elevation, and motion come from Kura tokens. No hardcoded hex, px one-offs, or raw milliseconds in modules.',
    proof: 'Module CSS review; no literal values',
  },
  {
    step: 'BoardUI finish checklist passes',
    detail:
      'Border diet, weight-swap hierarchy, ≤3 font sizes, loud data / calm chrome, all four interaction states, motion composed from tokens.',
    proof: 'Guide §2 checklist against rendered UI',
  },
  {
    step: 'All states have stories, including 320px',
    detail:
      'Default, variants, error, disabled/read-only, empty, long-content, loading where async, mobile 320, and every safety-relevant state.',
    proof: 'Story list in the sidebar',
  },
  {
    step: 'Play and unit tests are green',
    detail:
      'Play tests assert behavior through roles and labels (getByRole), never classes. Pure logic carries a vitest spec.',
    proof: 'vitest unit + storybook projects pass',
  },
  {
    step: 'Ownership check passes',
    detail:
      'Reusable UI is owned by the canonical component or composition — no vendor deep imports, no duplicated primitives in feature code.',
    proof: 'npm run check:reui-ownership',
  },
  {
    step: 'Build passes',
    detail: 'tsc, eslint (zero warnings), and build-storybook complete cleanly.',
    proof: 'CI-equivalent local run',
  },
  {
    step: 'Screenshots verified at 1440 and 320',
    detail:
      'Rendered verification at the governing viewports, light and dark where themed. Nothing is called pixel perfect without direct rendered proof.',
    proof: 'Playwright captures reviewed',
  },
  {
    step: 'Readiness declared',
    detail:
      'The domain has a row in readiness-data.ts (Ready / Partial / Gap) and the story meta references it — business truth beats demo content.',
    proof: 'Release readiness board row',
  },
];

const SCOPE_RULES: readonly string[] = [
  'Reuse before extending; extend before creating. Search existing stories, components, tokens, and patterns first.',
  'Composition lives with its domain owner. A pattern moves to shared ownership only when a second domain actually consumes it.',
  'Icons come only from Design System/Foundations/Icons. A missing icon stops the work — report it; never substitute.',
  'Demo scaffolding (magic codes, fixture phone numbers) lives in demo-data.ts and story docs, never in component copy.',
  'Storybook is the canonical construction and verification surface — not a demo gallery.',
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

/** The ship gate for every Storybook item, rendered from the canonical rules. */
export function DefinitionOfDoneReference() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-8 text-foreground sm:px-8" data-density="compact">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12">
        <header className="border-b border-border pb-8" data-dod-section="principles">
          <p className="k-label">Kura governance</p>
          <h1 className="k-h1 mt-2 text-balance">Definition of done</h1>
          <p className="k-body mt-3 max-w-3xl text-[var(--color-text-secondary)]">
            A Storybook item is done when every check below passes — not when it looks finished.
            This page renders the canonical rules from AGENTS.md and the component build guide;
            those files remain the source of truth.
          </p>
        </header>

        <section aria-labelledby="dod-checks-heading" data-dod-section="checks">
          <SectionHeader id="dod-checks-heading" meta={`${CHECKS.length} checks`} title="Ship gate">
            In order. A failure at any row blocks the change — these are findings, not preferences.
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
            {CHECKS.map((check, index) => (
              <div
                className="grid gap-x-6 gap-y-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[2rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.8fr)]"
                data-dod-check={check.step}
                key={check.step}
              >
                <span className="k-caption font-mono text-[var(--color-text-tertiary)]">{index + 1}</span>
                <p className="k-body-sm font-medium text-[var(--color-text-primary)]">{check.step}</p>
                <p className="k-body-sm min-w-0 text-[var(--color-text-secondary)]">{check.detail}</p>
                <p className="k-caption min-w-0 font-mono text-[var(--color-text-tertiary)]">{check.proof}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="dod-scope-heading" data-dod-section="scope">
          <SectionHeader id="dod-scope-heading" meta={`${SCOPE_RULES.length} rules`} title="Scope discipline">
            What keeps the system small enough to stay correct.
          </SectionHeader>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            {SCOPE_RULES.map((rule) => (
              <li className="k-body-sm text-[var(--color-text-secondary)]" key={rule}>{rule}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="dod-sources-heading" data-dod-section="sources">
          <SectionHeader id="dod-sources-heading" title="Sources of truth">
            This page is a rendering, not a fork. Precedence on conflict:
          </SectionHeader>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              <code className="font-mono">.codex/skills/minimalist/SKILL.md</code> — clarity gate for every content and UI change
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              <code className="font-mono">.codex/skills/design-kura-ui/SKILL.md</code> — UI craft and verification standard
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              <code className="font-mono">.codex/skills/design-kura-ui/references/reui-boardui-kura-component-build-guide.md</code> — pipeline, finish checklist, story contract
            </li>
            <li className="k-body-sm text-[var(--color-text-secondary)]">
              <code className="font-mono">AGENTS.md</code> — repository-wide authority: language, icons, Storybook
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
