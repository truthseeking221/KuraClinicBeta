import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  DCM_COLOR_MIGRATION_ALIASES,
  DCM_COLOR_TOKENS,
  DCM_PRIMITIVE_TOKENS,
  DCM_SEMANTIC_TOKENS,
  DCM_SEMANTIC_TONE_RULES,
  KURA_COLOR_COMPATIBILITY_ALIASES,
  KURA_COLOR_EXTENSIONS,
} from './color-tokens';
import type {
  CssColorVariableName,
  DcmColorToken,
  DcmPrimitiveToken,
  DcmSemanticToken,
  DcmSemanticTone,
} from './color-tokens';

const TONE_SYMBOLS: Record<DcmSemanticTone, string> = {
  neutral: '○',
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '×',
  ai: '✦',
  brand: '→',
};

const primitiveGroups = [...new Set(DCM_PRIMITIVE_TOKENS.map((token) => token.group))];
const semanticGroups = [...new Set(DCM_SEMANTIC_TOKENS.map((token) => token.group))];
const canonicalTokenCount = DCM_COLOR_TOKENS.length;

function readTokenValue(element: HTMLElement, name: CssColorVariableName) {
  return getComputedStyle(element).getPropertyValue(name).trim() || 'Unavailable in this canvas';
}

function ResolvedValue({ name }: { name: CssColorVariableName }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState('Resolving…');

  const resolve = useCallback(() => {
    if (ref.current) {
      setValue(readTokenValue(ref.current, name));
    }
  }, [name]);

  useEffect(() => {
    resolve();
    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, [resolve]);

  return (
    <span ref={ref} className="select-text font-mono tabular-nums" data-resolved-token={name}>
      {value}
    </span>
  );
}

function CopyToken({ name, value }: { name: CssColorVariableName; value: string }) {
  const [status, setStatus] = useState<'Copy' | 'Copied.' | 'Select text'>('Copy');

  const copy = async () => {
    if (!navigator.clipboard) {
      setStatus('Select text');
      return;
    }

    try {
      await navigator.clipboard.writeText(`${name}: ${value}`);
      setStatus('Copied.');
    } catch {
      setStatus('Select text');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${name} and ${value}`}
      className="min-h-[var(--field-h)] min-w-0 rounded-md border border-border bg-background px-2 font-mono text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2"
    >
      <span aria-live="polite" className="k-caption">{status}</span>
    </button>
  );
}

function sourceDisplay(token: DcmColorToken) {
  return token.kind === 'semantic' ? (token.sourceAnnotation ?? token.sourceValue) : token.sourceValue;
}

function primitiveSuffix(token: DcmPrimitiveToken) {
  const prefix = `--color-${token.group.toLowerCase().replaceAll(' ', '-')}-`;
  return token.name.startsWith(prefix) ? token.name.slice(prefix.length) : token.name;
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

function ReferenceHeader() {
  return (
    <header data-color-section="provenance" className="border-b border-border pb-8">
      <p className="k-label">DCM color contract</p>
      <h1 className="k-h1 mt-2 text-balance">Colors</h1>
      <p className="k-body mt-3 max-w-3xl text-[var(--color-text-secondary)]">
        One canonical contract: <strong className="font-mono">{DCM_SEMANTIC_TOKENS.length}</strong> semantic roles over{' '}
        <strong className="font-mono">{DCM_PRIMITIVE_TOKENS.length}</strong> primitives in{' '}
        <strong className="font-mono">{primitiveGroups.length}</strong> ramps —{' '}
        <strong className="font-mono">{canonicalTokenCount}</strong> canonical entries. Light values follow the DCM source{' '}
        <code className="select-text break-all font-mono">FINAL DCM/src/styles/kura/variables.css</code>; dark values are Kura
        runtime adaptations. Build with semantic roles first; reach for primitives only when no role expresses the intent.
      </p>
    </header>
  );
}

/* ── Semantic roles (light + dark, live) ─────────────────── */

function SemanticRow({ token }: { token: DcmSemanticToken }) {
  const value = sourceDisplay(token);
  const forcedLight = { [token.name]: token.lightResolvedValue } as CSSProperties;

  return (
    <article
      data-canonical-token
      data-token-name={token.name}
      className="dcm-sem-row min-w-0 border-b border-border px-4 py-3 last:border-b-0"
    >
      <div className="flex items-center gap-1.5">
        <span
          role="img"
          aria-label={`${token.name} in light theme`}
          className="h-9 w-9 shrink-0 rounded-md border border-[var(--color-border-strong)]"
          style={{ ...forcedLight, backgroundColor: `var(${token.name})` }}
        />
        <span
          role="img"
          aria-label={`${token.name} in dark theme`}
          data-theme="dark"
          className="h-9 w-9 shrink-0 rounded-md border border-[var(--color-border-strong)]"
          style={{ backgroundColor: `var(${token.name})` }}
        />
      </div>

      <div className="min-w-0">
        <code className="k-body-sm block select-text break-all font-mono font-medium">{token.name}</code>
        <p className="k-caption mt-1 text-[var(--color-text-secondary)]">{token.description}</p>
        <p className="k-caption mt-1 select-text break-all font-mono text-[var(--color-text-tertiary)]">
          {value}
          {token.aliases.length ? ` · ${token.aliases.join(' · ')}` : ''}
        </p>
      </div>

      <div className="min-w-0">
        <span className="k-label mr-2 lg:mr-0 lg:block">Light</span>
        <code className="k-caption select-text break-all font-mono text-[var(--color-text-secondary)]">
          {token.lightResolvedValue}
        </code>
      </div>

      <div className="min-w-0" data-theme="dark">
        <span className="k-label mr-2 lg:mr-0 lg:block">Dark</span>
        <span className="k-caption break-all text-[var(--color-text-secondary)]">
          <ResolvedValue name={token.name} />
        </span>
      </div>

      <div className="justify-self-end">
        <CopyToken name={token.name} value={value} />
      </div>
    </article>
  );
}

function SemanticGroup({ title, tokens }: { title: string; tokens: readonly DcmSemanticToken[] }) {
  const id = `semantic-${title.toLowerCase()}`;

  return (
    <section aria-labelledby={id} className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
      <header className="flex items-baseline justify-between gap-3 border-b border-border px-4 py-3">
        <h3 id={id} className="k-h5">{title}</h3>
        <span className="k-caption font-mono text-[var(--color-text-secondary)]">{tokens.length}</span>
      </header>
      {tokens.map((token) => <SemanticRow key={token.name} token={token} />)}
    </section>
  );
}

function SemanticInventory() {
  return (
    <section data-color-section="semantics" aria-labelledby="semantic-heading">
      <SectionHeader id="semantic-heading" title="Semantic roles" meta={`${DCM_SEMANTIC_TOKENS.length} canonical`}>
        The working vocabulary. Each role renders both theme specimens live: light is the DCM source value, dark is the Kura
        runtime adaptation resolved in this canvas.
      </SectionHeader>
      {/* The light/dark matrix lives inside the semantic rows since the merge. */}
      <div className="flex flex-col gap-5" data-color-section="theme-comparison">
        {semanticGroups.map((group) => (
          <SemanticGroup key={group} title={group} tokens={DCM_SEMANTIC_TOKENS.filter((token) => token.group === group)} />
        ))}
      </div>
    </section>
  );
}

/* ── Status tones ────────────────────────────────────────── */

function ToneLegend() {
  return (
    <section data-color-section="tone-meanings" aria-labelledby="tone-meanings-heading">
      <SectionHeader id="tone-meanings-heading" title="Status tones">
        Color never stands alone: every status pairs its tone with a label, symbol, or written state.
      </SectionHeader>
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
        {DCM_SEMANTIC_TONE_RULES.map((rule) => (
          <li key={rule.tone} className="flex min-w-0 items-start gap-3">
            <span
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] px-3 font-semibold capitalize"
              style={{
                backgroundColor: rule.background ? `var(${rule.background})` : 'var(--color-surface-sunken)',
                color: `var(${rule.foreground})`,
              }}
            >
              <span aria-hidden="true">{TONE_SYMBOLS[rule.tone]}</span>
              {rule.tone}
            </span>
            <div className="min-w-0">
              <p className="k-body-sm">{rule.description}</p>
              <p className="k-caption mt-0.5 text-[var(--color-text-tertiary)]">{rule.meanings.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="k-body-sm mt-5 border-l border-[var(--color-border-strong)] pl-3 text-[var(--color-text-secondary)]">
        Text or icon cue required — never color-only. <code className="font-mono">--color-status-low-fg</code> is
        foreground-only; its component supplies the cue and background context.
      </p>
    </section>
  );
}

/* ── Primitive ramps ─────────────────────────────────────── */

function PrimitiveSwatch({ token }: { token: DcmPrimitiveToken }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(token.name);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — value stays selectable below */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-canonical-token
      data-token-name={token.name}
      title={`${token.name} — ${token.description}${token.aliases.length ? ` (alias ${token.aliases.join(', ')})` : ''}`}
      aria-label={`Copy ${token.name}, value ${token.sourceValue}`}
      className="min-w-0 bg-[var(--color-surface)] text-left focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]"
    >
      <span aria-hidden="true" className="relative block h-14 w-full" style={{ backgroundColor: `var(${token.name})` }}>
        {copied ? (
          <span className="k-caption absolute inset-0 grid place-items-center bg-[var(--color-surface)] font-medium">
            Copied.
          </span>
        ) : null}
      </span>
      <span className="block border-t border-border px-2 py-1.5">
        <span className="k-label block truncate font-mono">{primitiveSuffix(token)}</span>
        <span className="k-caption block select-text truncate font-mono">{token.sourceValue}</span>
      </span>
      <span aria-live="polite" className="sr-only">{copied ? `${token.name} copied` : ''}</span>
    </button>
  );
}

function PrimitiveRamp({ title, tokens }: { title: string; tokens: readonly DcmPrimitiveToken[] }) {
  const id = `primitive-${title.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <section aria-labelledby={id} className="min-w-0">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h3 id={id} className="k-h5">{title}</h3>
        <span className="k-caption font-mono text-[var(--color-text-secondary)]">{tokens.length} {tokens.length === 1 ? 'step' : 'steps'}</span>
      </div>
      <div className="dcm-ramp overflow-hidden rounded-lg border border-border bg-border">
        {tokens.map((token) => <PrimitiveSwatch key={token.name} token={token} />)}
      </div>
    </section>
  );
}

function PrimitivePalette() {
  return (
    <section data-color-section="primitives" aria-labelledby="primitive-heading">
      <SectionHeader id="primitive-heading" title="Primitive palette" meta={`${DCM_PRIMITIVE_TOKENS.length} canonical`}>
        Immutable DCM ramps, lightest to strongest. Click a step to copy its token; hover for its role.
      </SectionHeader>
      <div className="flex flex-col gap-6">
        {primitiveGroups.map((group) => (
          <PrimitiveRamp key={group} title={group} tokens={DCM_PRIMITIVE_TOKENS.filter((token) => token.group === group)} />
        ))}
      </div>
    </section>
  );
}

/* ── Keyboard focus ──────────────────────────────────────── */

function FocusBand() {
  const buttonClass = 'min-h-[var(--field-h)] rounded-md border border-[var(--color-border-focus)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:shadow-[var(--shadow-focus)]';

  return (
    <section data-color-section="focus" aria-labelledby="focus-heading">
      <SectionHeader id="focus-heading" title="Keyboard focus">
        Tab through all three surfaces to inspect the solid boundary, halo, and ring offset.
      </SectionHeader>
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-border bg-[var(--color-surface)] p-4">
          <p className="k-label">Normal surface</p>
          <button type="button" aria-label="Normal surface focus specimen" className={`${buttonClass} mt-3`}>Focus specimen</button>
        </article>
        <article className="rounded-lg border border-border bg-[var(--color-surface-sunken)] p-4">
          <p className="k-label">Sunken surface</p>
          <button type="button" aria-label="Sunken surface focus specimen" className={`${buttonClass} mt-3`}>Focus specimen</button>
        </article>
        <article data-theme="dark" className="rounded-lg border border-border bg-[var(--color-surface-bg)] p-4 text-[var(--color-text-primary)]">
          <p className="k-label">Dark surface</p>
          <button type="button" aria-label="Dark surface focus specimen" className={`${buttonClass} mt-3`}>Focus specimen</button>
        </article>
      </div>
    </section>
  );
}

/* ── Compatibility ───────────────────────────────────────── */

type Alias = Readonly<{
  name: CssColorVariableName;
  target: CssColorVariableName;
  description: string;
  via?: readonly CssColorVariableName[];
}>;

function DenseAliasDetails({ title, aliases }: { title: string; aliases: readonly Alias[] }) {
  return (
    <details className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
      <summary className="k-label cursor-pointer px-4 py-3 hover:bg-[var(--color-surface-sunken)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]">
        {title} · {aliases.length}
      </summary>
      <div role="table" aria-label={title} className="border-t border-border">
        <div role="row" className="dcm-alias-row hidden border-b border-border px-4 py-2 sm:grid">
          {['Name', 'Resolution chain', 'Purpose'].map((label) => <span key={label} role="columnheader" className="k-label">{label}</span>)}
        </div>
        {aliases.map((alias, index) => (
          <div key={`${alias.name}-${alias.target}-${index}`} role="row" className="dcm-alias-row min-w-0 border-b border-border px-4 py-3 last:border-b-0">
            <code role="cell" className="k-caption min-w-0 select-text break-all font-mono">{alias.name}</code>
            <code role="cell" className="k-caption min-w-0 select-text break-all font-mono text-[var(--color-text-secondary)]">
              {alias.via?.length ? `${alias.name} → ${alias.via.join(' → ')} → ${alias.target}` : `${alias.name} → ${alias.target}`}
            </code>
            <p role="cell" className="k-caption min-w-0 text-[var(--color-text-secondary)]">{alias.description}</p>
          </div>
        ))}
      </div>
    </details>
  );
}

function DenseExtensionDetails() {
  return (
    <details className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
      <summary className="k-label cursor-pointer px-4 py-3 hover:bg-[var(--color-surface-sunken)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]">
        Kura palette extensions · {KURA_COLOR_EXTENSIONS.length}
      </summary>
      <div role="table" aria-label="Kura palette extensions" className="border-t border-border">
        <div role="row" className="dcm-extension-row hidden border-b border-border px-4 py-2 sm:grid">
          {['Swatch', 'Name', 'Group', 'Value'].map((label) => <span key={label} role="columnheader" className="k-label">{label}</span>)}
        </div>
        {KURA_COLOR_EXTENSIONS.map((extension) => (
          <div key={extension.name} role="row" className="dcm-extension-row min-w-0 border-b border-border px-4 py-3 last:border-b-0">
            <div role="cell">
              {extension.swatch ? (
                <span aria-hidden="true" className="block h-8 w-8 rounded-md border border-[var(--color-border-strong)]" style={{ backgroundColor: `var(${extension.name})` }} />
              ) : (
                <span className="k-caption grid h-8 w-8 place-items-center rounded-md border border-border font-mono text-[var(--color-text-secondary)]">RGB</span>
              )}
            </div>
            <div role="cell" className="min-w-0">
              <code className="k-caption block select-text break-all font-mono">{extension.name}</code>
              <p className="k-caption mt-1 text-[var(--color-text-tertiary)]">{extension.description}</p>
            </div>
            <p role="cell" className="k-caption text-[var(--color-text-secondary)]">{extension.group}</p>
            <code role="cell" className="k-caption min-w-0 select-text break-all font-mono text-[var(--color-text-secondary)]">{extension.value}</code>
          </div>
        ))}
      </div>
    </details>
  );
}

function CompatibilityInventory() {
  return (
    <section data-color-section="compatibility" aria-labelledby="compatibility-heading">
      <SectionHeader id="compatibility-heading" title="Compatibility inventory">
        Aliases and Kura extensions stay outside the {canonicalTokenCount} canonical entries. Note the intentional pair{' '}
        <code className="select-text font-mono">--text-muted → #8d94a8</code> versus{' '}
        <code className="select-text font-mono">--color-text-muted → #6b7388</code>, and the shadcn bridge{' '}
        <code className="select-text font-mono">--border → --border-color → --color-border</code>.
      </SectionHeader>
      <div className="flex flex-col gap-3">
        <DenseAliasDetails title="DCM migration aliases" aliases={DCM_COLOR_MIGRATION_ALIASES} />
        <DenseAliasDetails title="Kura compatibility aliases" aliases={KURA_COLOR_COMPATIBILITY_ALIASES} />
        <DenseExtensionDetails />
      </div>
    </section>
  );
}

export function ColorsReference() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-8 text-foreground sm:px-8" data-density="compact">
      <style>{`
        .dcm-ramp { display: grid; gap: 1px; grid-template-columns: repeat(auto-fit, minmax(calc(var(--space-16) * 1.5), 1fr)); }
        .dcm-sem-row { display: grid; grid-template-columns: calc(var(--space-16) + var(--space-6)) minmax(0, 1.8fr) minmax(0, 0.7fr) minmax(0, 0.7fr) auto; gap: var(--space-4); align-items: center; }
        .dcm-sem-row .k-label { display: none; }
        .dcm-alias-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1.5fr); gap: var(--space-3); align-items: start; }
        .dcm-extension-row { display: grid; grid-template-columns: var(--space-8) minmax(0, 1.4fr) minmax(0, 0.7fr) minmax(0, 1fr); gap: var(--space-3); align-items: center; }
        @media (min-width: 1024px) {
          .dcm-sem-row .k-label { display: block; }
        }
        @media (max-width: 1023px) {
          .dcm-sem-row { grid-template-columns: minmax(0, 1fr) auto; row-gap: var(--space-2); }
          .dcm-sem-row > :nth-child(1) { grid-row: 1; grid-column: 1; }
          .dcm-sem-row > :nth-child(5) { grid-row: 1; grid-column: 2; }
          .dcm-sem-row > :nth-child(2),
          .dcm-sem-row > :nth-child(3),
          .dcm-sem-row > :nth-child(4) { grid-column: 1 / -1; }
          .dcm-sem-row .k-label { display: inline; margin-right: var(--space-2); }
        }
        @media (max-width: 639px) {
          .dcm-alias-row { grid-template-columns: minmax(0, 1fr); }
          .dcm-extension-row { grid-template-columns: var(--space-8) minmax(0, 1fr); }
          .dcm-extension-row > :first-child { grid-row: span 3; }
        }
      `}</style>
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12">
        <ReferenceHeader />
        <SemanticInventory />
        <ToneLegend />
        <PrimitivePalette />
        <FocusBand />
        <CompatibilityInventory />
      </div>
    </main>
  );
}
