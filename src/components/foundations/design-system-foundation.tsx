const colorGroups = [
  {
    label: 'Brand',
    tokens: ['--color-brand-25', '--color-brand-50', '--color-brand-100', '--color-brand-500', '--color-brand-600', '--color-brand-700', '--color-brand-800'],
  },
  {
    label: 'Ink',
    tokens: ['--color-ink-0', '--color-ink-50', '--color-ink-100', '--color-ink-200', '--color-ink-400', '--color-ink-600', '--color-ink-900'],
  },
  {
    label: 'Status',
    tokens: ['--color-success-500', '--color-success-50', '--color-warn-500', '--color-warn-50', '--color-danger-500', '--color-danger-50', '--color-info-500'],
  },
] as const;

const typeScale = [
  ['2xs', 'var(--type-2xs)'],
  ['xs', 'var(--type-xs)'],
  ['sm', 'var(--type-sm)'],
  ['base', 'var(--type-base)'],
  ['md', 'var(--type-md)'],
  ['lg', 'var(--type-lg)'],
  ['xl', 'var(--type-xl)'],
  ['2xl', 'var(--type-2xl)'],
  ['3xl', 'var(--type-3xl)'],
  ['4xl', 'var(--type-4xl)'],
] as const;

export function DesignSystemFoundation() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Ultimate Final DCM · Foundations
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            A quiet system for confident clinical work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            The new Next.js surface starts with the Storybook visual language:
            clear type, disciplined color, and semantic tokens that can scale
            into product flows.
          </p>
        </header>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" aria-labelledby="type-heading">
          <div className="rounded-[var(--radius-card-surface)] border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-end justify-between gap-4 border-b pb-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">01 · Type</p>
                <h2 id="type-heading" className="mt-2 text-2xl font-semibold">Typography scale</h2>
              </div>
              <code className="hidden text-xs text-muted-foreground sm:block">SVN Helvetica Now Text</code>
            </div>
            <div className="divide-y">
              {typeScale.map(([label, size]) => (
                <div key={label} className="flex items-baseline gap-4 py-4">
                  <code className="w-12 shrink-0 text-xs text-muted-foreground">{label}</code>
                  <span style={{ fontSize: size }} className="font-medium tracking-[-0.02em]">
                    Care that feels clear
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-card-surface)] border bg-card p-6 shadow-sm sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">02 · Tone</p>
            <h2 className="mt-2 text-2xl font-semibold">Semantic roles</h2>
            <div className="mt-7 space-y-5">
              <div>
                <p className="text-sm font-medium">Primary action</p>
                <p className="mt-1 text-sm text-muted-foreground">Brand blue is reserved for focus and progress.</p>
                <div className="mt-3 h-3 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Surface rhythm</p>
                <p className="mt-1 text-sm text-muted-foreground">Quiet surfaces keep information easy to scan.</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-md border bg-background" />
                  <div className="h-12 rounded-md border bg-card" />
                  <div className="h-12 rounded-md border bg-muted" />
                </div>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-semibold text-primary">Reusable foundation</p>
                <p className="mt-1 text-sm text-muted-foreground">Every component can inherit these roles without inventing new colors.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[var(--radius-card-surface)] border bg-card p-6 shadow-sm sm:p-8" aria-labelledby="color-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">03 · Color</p>
              <h2 id="color-heading" className="mt-2 text-2xl font-semibold">Token palette</h2>
            </div>
            <p className="text-sm text-muted-foreground">Light and dark themes use the same semantic roles.</p>
          </div>
          <div className="mt-7 grid gap-7 md:grid-cols-3">
            {colorGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-semibold">{group.label}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                  {group.tokens.map((token) => (
                    <div key={token} className="overflow-hidden rounded-lg border bg-background">
                      <div className="h-16" style={{ backgroundColor: `var(${token})` }} />
                      <div className="p-2.5">
                        <p className="text-xs font-medium">{token.replace('--color-', '')}</p>
                        <code className="mt-1 block text-[10px] text-muted-foreground">{token}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
