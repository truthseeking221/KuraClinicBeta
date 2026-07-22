import { useEffect, useRef, useState } from 'react';
import {
  DCM_COLOR_MIGRATION_ALIASES,
  DCM_PRIMITIVE_TOKENS,
  DCM_SEMANTIC_TOKENS,
  KURA_COLOR_COMPATIBILITY_ALIASES,
  KURA_COLOR_EXTENSIONS,
} from './color-tokens';
import type {
  CssColorVariableName,
  DcmColorToken,
  DcmPrimitiveToken,
  DcmSemanticToken,
} from './color-tokens';

const primitiveGroups = [...new Set(DCM_PRIMITIVE_TOKENS.map((token) => token.group))];
const semanticGroups = [...new Set(DCM_SEMANTIC_TOKENS.map((token) => token.group))];

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
    <header data-color-section="provenance">
      <p className="k-caption text-[var(--color-text-secondary)]">Foundations</p>
      <h1 className="k-h1 mt-2 text-balance">Color</h1>
      <p className="k-body-sm mt-3 max-w-3xl text-[var(--color-text-secondary)]">
        Kura&apos;s complete color contract: {DCM_SEMANTIC_TOKENS.length} semantic roles backed by three controlled blue
        primitive families.
      </p>
      <section aria-labelledby="color-system-heading" className="mt-8 max-w-3xl">
        <h2 id="color-system-heading" className="k-h4">How the system works</h2>
        <p className="k-body-sm mt-2 text-[var(--color-text-secondary)]">
          Components consume purpose-based roles, never raw palette values. Core UI, brand actions, status, data, and
          clinical identity are separated so the same hue cannot silently change meaning. Dark semantics remain pending
          until they are designed and contrast-validated as a complete theme.
        </p>
      </section>
    </header>
  );
}

/* ── Semantic roles ──────────────────────────────────────── */

const SEMANTIC_GROUP_DESCRIPTIONS = {
  Foreground: 'Icon fills and inverse or on-color foregrounds.',
  Text: 'Reading hierarchy, links, placeholders, inverse content, disabled text, and errors.',
  Background: 'Application surfaces and their hover, active, disabled, and error states.',
  Border: 'Structural, control, and focus boundaries.',
  'Brand and action': 'Kura identity, primary actions, links, focus, and selection states.',
  'Status and presence': 'Neutral, information, success, warning, danger, critical, AI, and presence meaning.',
  'Data visualization': 'Tracks, cursors, neutral data, and eight categorical series with active states.',
  'Clinical and domain': 'Physical specimen identity; never reused as status meaning.',
} as const;

function SemanticRow({ token }: { token: DcmSemanticToken }) {
  const value = sourceDisplay(token);

  return (
    <article
      data-canonical-token
      data-token-name={token.name}
      className="dcm-sem-row min-w-0 border-b border-border-button-default bg-background-primary-default px-4 py-3 last:border-b-0"
    >
      <span
        role="img"
        aria-label={`${token.name} swatch`}
        className="block size-6 shrink-0 rounded-md border border-border-button-default"
        style={{ backgroundColor: `var(${token.name})` }}
      />
      <code className="k-caption min-w-0 select-text break-all font-mono text-[var(--color-text-primary)]">
        <span className="dcm-mobile-label">Token</span>{token.name}
      </code>
      <code className="k-caption min-w-0 select-text break-all font-mono text-[var(--color-text-secondary)]">
        <span className="dcm-mobile-label">Tailwind class</span>{token.tailwindClass}
      </code>
      <code className="k-caption min-w-0 select-text break-all font-mono text-[var(--color-text-secondary)]">
        <span className="dcm-mobile-label">Value</span>{value}
      </code>
    </article>
  );
}

function SemanticGroup({ title, tokens }: { title: string; tokens: readonly DcmSemanticToken[] }) {
  const id = `semantic-${title.toLowerCase()}`;

  return (
    <section aria-labelledby={id}>
      <header className="mb-3">
        <h2 id={id} className="k-h4">{title}</h2>
        <p className="k-body-sm mt-1 max-w-3xl text-[var(--color-text-secondary)]">
          {SEMANTIC_GROUP_DESCRIPTIONS[title as keyof typeof SEMANTIC_GROUP_DESCRIPTIONS]}
        </p>
      </header>
      <div className="overflow-hidden rounded-lg border border-border-button-default">
        <div aria-hidden="true" className="dcm-sem-head bg-background-secondary-default px-4 py-2">
          <span />
          <span>Token</span>
          <span>Tailwind class</span>
          <span>Value</span>
        </div>
        {tokens.map((token) => <SemanticRow key={token.name} token={token} />)}
      </div>
    </section>
  );
}

function SemanticInventory() {
  return (
    <section data-color-section="semantics" aria-label={`${DCM_SEMANTIC_TOKENS.length} Kura semantic colors`}>
      <div className="flex flex-col gap-8" data-color-section="theme-comparison">
        {semanticGroups.map((group) => (
          <SemanticGroup key={group} title={group} tokens={DCM_SEMANTIC_TOKENS.filter((token) => token.group === group)} />
        ))}
      </div>
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

function KuraBluePalette() {
  return (
    <section data-color-section="primitives" aria-labelledby="primitive-heading">
      <SectionHeader id="primitive-heading" title="Kura blue primitives" meta={`${DCM_PRIMITIVE_TOKENS.length} steps`}>
        These values are foundation inputs, not component APIs. Click a step to copy its token.
      </SectionHeader>
      <div className="flex flex-col gap-6">
        {primitiveGroups.map((group) => (
          <PrimitiveRamp key={group} title={group} tokens={DCM_PRIMITIVE_TOKENS.filter((token) => token.group === group)} />
        ))}
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
        Component roles · {KURA_COLOR_EXTENSIONS.length}
      </summary>
      <div role="table" aria-label="Kura component color roles" className="border-t border-border">
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
        Temporary legacy names resolve into the Kura semantic graph. New component code must not consume these aliases.
      </SectionHeader>
      <div className="flex flex-col gap-3">
        <DenseAliasDetails title="Legacy aliases" aliases={DCM_COLOR_MIGRATION_ALIASES} />
        <DenseAliasDetails title="Kura compatibility aliases" aliases={KURA_COLOR_COMPATIBILITY_ALIASES} />
        <DenseExtensionDetails />
      </div>
    </section>
  );
}

export function ColorsReference() {
  return (
    <main className="dcm-color-page min-h-screen w-full min-w-0 bg-background-primary-default px-4 py-8 text-text-primary sm:px-8" data-density="compact">
      <style>{`
        .dcm-color-page .k-caption { color: var(--color-text-secondary); }
        .dcm-ramp { display: grid; gap: 1px; grid-template-columns: repeat(auto-fit, minmax(calc(var(--space-16) * 1.5), 1fr)); }
        .dcm-sem-head, .dcm-sem-row { display: grid; grid-template-columns: 40px minmax(0, 1.3fr) minmax(0, 1.1fr) minmax(0, 0.7fr); gap: var(--space-4); align-items: center; }
        .dcm-sem-head { font-size: var(--type-2xs); font-weight: var(--weight-medium); color: var(--color-neutral-600); }
        .dcm-sem-row > code { color: var(--color-text-secondary); }
        .dcm-sem-row > code:nth-child(2) { color: var(--color-text-primary); }
        .dcm-mobile-label { display: none; }
        .dcm-alias-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1.5fr); gap: var(--space-3); align-items: start; }
        .dcm-extension-row { display: grid; grid-template-columns: var(--space-8) minmax(0, 1.4fr) minmax(0, 0.7fr) minmax(0, 1fr); gap: var(--space-3); align-items: center; }
        @media (max-width: 639px) {
          .dcm-sem-head { display: none; }
          .dcm-sem-row { grid-template-columns: 32px minmax(0, 1fr); row-gap: var(--space-1); align-items: start; }
          .dcm-sem-row > :first-child { grid-row: 1 / span 3; }
          .dcm-sem-row > :not(:first-child) { grid-column: 2; }
          .dcm-mobile-label { display: inline-block; min-width: 88px; margin-right: var(--space-2); color: var(--color-neutral-600); font-family: var(--font-family-sans); font-weight: var(--weight-medium); }
          .dcm-alias-row { grid-template-columns: minmax(0, 1fr); }
          .dcm-extension-row { grid-template-columns: var(--space-8) minmax(0, 1fr); }
          .dcm-extension-row > :first-child { grid-row: span 3; }
        }
      `}</style>
      <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-12">
        <ReferenceHeader />
        <SemanticInventory />
        <KuraBluePalette />
        <CompatibilityInventory />
      </div>
    </main>
  );
}
