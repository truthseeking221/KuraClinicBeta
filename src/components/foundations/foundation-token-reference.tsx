import type { CSSProperties, ReactNode } from 'react';

type ScaleToken = Readonly<{
  label: string;
  variable: string;
  value: string;
  role: string;
}>;

const spacingTokens: readonly ScaleToken[] = [
  { label: '0', variable: '--space-0', value: '0px', role: 'Reset, collapse, or remove a gap.' },
  { label: '0.5', variable: '--space-0-5', value: '2px', role: 'Hairline separation and optical nudges.' },
  { label: '1', variable: '--space-1', value: '4px', role: 'Label-to-control and icon-to-label rhythm.' },
  { label: '1.5', variable: '--space-1-5', value: '6px', role: 'Compact inline breathing room.' },
  { label: '2', variable: '--space-2', value: '8px', role: 'Control groups and dense list rows.' },
  { label: '3', variable: '--space-3', value: '12px', role: 'Control inset and standard inline grouping.' },
  { label: '4', variable: '--space-4', value: '16px', role: 'Card inset and default component padding.' },
  { label: '5', variable: '--space-5', value: '20px', role: 'Comfortable component separation.' },
  { label: '6', variable: '--space-6', value: '24px', role: 'Panel inset and section separation.' },
  { label: '7', variable: '--space-7', value: '28px', role: 'Intermediate composition step.' },
  { label: '8', variable: '--space-8', value: '32px', role: 'Large panel gap and page rhythm.' },
  { label: '9', variable: '--space-9', value: '36px', role: 'Editorial separation between major blocks.' },
  { label: '10', variable: '--space-10', value: '40px', role: 'Page section spacing.' },
  { label: '12', variable: '--space-12', value: '48px', role: 'Large section or workflow transition.' },
  { label: '14', variable: '--space-14', value: '56px', role: 'Wide layout breathing room.' },
  { label: '16', variable: '--space-16', value: '64px', role: 'Page-scale separation.' },
  { label: '20', variable: '--space-20', value: '80px', role: 'Hero and major shell separation.' },
  { label: '24', variable: '--space-24', value: '96px', role: 'Large canvas composition.' },
  { label: '32', variable: '--space-32', value: '128px', role: 'Rare display-scale separation.' },
];

const spacingSemantics: readonly ScaleToken[] = [
  { label: 'Inset compact', variable: '--space-inset-compact', value: 'space-2 · 8px', role: 'Dense controls and compact rows.' },
  { label: 'Inset control', variable: '--space-inset-control', value: 'space-3 · 12px', role: 'Inputs, buttons, and menu items.' },
  { label: 'Inset card', variable: '--space-inset-card', value: 'space-4 · 16px', role: 'Cards and contained summaries.' },
  { label: 'Inset panel', variable: '--space-inset-panel', value: 'space-6 · 24px', role: 'Panels and workspace regions.' },
  { label: 'Inset page', variable: '--space-inset-page', value: 'space-8 · 32px', role: 'Page shells and large canvases.' },
  { label: 'Field gap', variable: '--space-field-gap', value: 'space-2 · 8px', role: 'Label, field, hint, and error stack.' },
  { label: 'Section gap', variable: '--space-section-gap', value: 'space-8 · 32px', role: 'Major content sections.' },
  { label: 'Page gutter', variable: '--space-page-gutter', value: 'space-6 · 24px', role: 'Default responsive page gutter.' },
];

const radiusTokens: readonly ScaleToken[] = [
  { label: 'None', variable: '--radius-none', value: '0px', role: 'Value scale only — components bind to the semantic roles below.' },
  { label: 'XS', variable: '--radius-xs', value: '6px', role: 'Value scale only.' },
  { label: 'SM', variable: '--radius-sm', value: '8px', role: 'Value scale only.' },
  { label: 'Base / MD', variable: '--radius', value: '10px', role: 'Value scale only.' },
  { label: 'LG', variable: '--radius-lg', value: '14px', role: 'Value scale only.' },
  { label: 'XL', variable: '--radius-xl', value: '20px', role: 'Value scale only.' },
  { label: '2XL', variable: '--radius-2xl', value: '28px', role: 'Value scale only — large editorial or hero containers.' },
  { label: 'Full', variable: '--radius-full', value: '999px', role: 'Value scale only.' },
];

const radiusSemantics: readonly ScaleToken[] = [
  { label: 'Control', variable: '--radius-control', value: 'radius-md · 10px', role: 'Buttons, inputs, selects, textareas, menu triggers, nav items, interactive queue rows.' },
  { label: 'Control compact', variable: '--radius-control-compact', value: 'radius-sm · 8px', role: 'Dense interactive rows inside panels: menu items, option rows, breadcrumb links, list-row hover targets.' },
  { label: 'Indicator', variable: '--radius-indicator', value: 'radius-xs · 6px', role: 'Smallest marks: checkbox boxes, kbd keys, swatches, range-band zones, skeleton lines, tiny tags.' },
  { label: 'Inset', variable: '--radius-inset', value: 'radius-md · 10px', role: 'Nested media and wells inside a surface: thumbnails, icon containers, square avatars, empty-state wells.' },
  { label: 'Card surface', variable: '--radius-card-surface', value: 'radius-lg · 14px', role: 'Cards, alerts, panels, tables, dropzones.' },
  { label: 'Popover', variable: '--radius-popover', value: 'radius-lg · 14px', role: 'Anchored floating panels: popovers, dropdown menus, context menus, autocomplete lists.' },
  { label: 'Overlay', variable: '--radius-overlay', value: 'radius-xl · 20px', role: 'Modal-weight surfaces: dialogs, sheets, drawers, command palettes.' },
  { label: 'Badge', variable: '--radius-badge', value: 'radius-full', role: 'Badges, chips, counters, and pill-shaped controls.' },
  { label: 'Track', variable: '--radius-track', value: 'radius-full', role: 'Progress and slider tracks, carousel dots, scrollbar thumbs, resize handles.' },
  { label: 'None', variable: '--radius-none', value: '0px', role: 'Edge-to-edge: fullscreen dialogs, inner segments of button groups and chips, table rows.' },
];

const elevationTokens: readonly ScaleToken[] = [
  { label: '0', variable: '--elevation-0', value: 'none', role: 'Document flow, tables, and flat surfaces.' },
  { label: '1', variable: '--elevation-1', value: 'shadow-xs', role: 'Subtle separation from the canvas.' },
  { label: '2', variable: '--elevation-2', value: 'shadow-sm', role: 'Raised cards and quiet controls.' },
  { label: '3', variable: '--elevation-3', value: 'shadow-md', role: 'Popover, menu, and floating utility.' },
  { label: '4', variable: '--elevation-4', value: 'shadow-lg', role: 'Dialog and high-priority overlay.' },
  { label: '5', variable: '--elevation-5', value: 'shadow-xl', role: 'Transient floating layer above a modal.' },
];

const elevationSemantics: readonly ScaleToken[] = [
  { label: 'Surface', variable: '--elevation-surface', value: 'elevation-0', role: 'Default page and workspace surface.' },
  { label: 'Card', variable: '--elevation-card', value: 'shadow-card · none', role: 'Cards use border and grouping before shadow.' },
  { label: 'Popover', variable: '--elevation-popover', value: 'shadow-md', role: 'Menus, tooltips, and anchored utility.' },
  { label: 'Modal', variable: '--elevation-modal', value: 'shadow-lg', role: 'Dialog and blocking workflow surface.' },
  { label: 'Floating', variable: '--elevation-floating', value: 'shadow-xl', role: 'Transient layer needing clear separation.' },
  { label: 'Focus', variable: '--elevation-focus', value: 'shadow-focus', role: 'Keyboard focus halo, never a depth cue.' },
  { label: 'Selected', variable: '--elevation-selected', value: 'shadow-selected', role: 'Selection outline, paired with a non-color cue.' },
];

type TypeToken = Readonly<{
  label: string;
  variable: string;
  value: string;
  use: string;
  specimen: string;
}>;

type TypographyRole = Readonly<{
  label: string;
  element: string;
  className: string;
  token: string;
  composition: string;
  use: string;
  specimen: string;
}>;

const typographyTokens: readonly TypeToken[] = [
  { label: '2XS', variable: '--type-2xs', value: '11px', use: 'Micro metadata only; never clinical instructions or primary data.', specimen: 'Specimen 11px' },
  { label: 'XS', variable: '--type-xs', value: '12px', use: 'Captions, timestamps, secondary metadata, and token labels.', specimen: 'Specimen 12px' },
  { label: 'SM', variable: '--type-sm', value: '13px', use: 'Compact labels, helper copy, and dense operational rows.', specimen: 'Specimen 13px' },
  { label: 'Base', variable: '--type-base', value: '14px', use: 'Default clinical UI body text, table values, and instructions.', specimen: 'Patient identity confirmed' },
  { label: 'MD', variable: '--type-md', value: '16px', use: 'Long-form guidance, read-focused content, and prominent values.', specimen: 'Follow-up instructions remain readable' },
  { label: 'LG', variable: '--type-lg', value: '18px', use: 'Component titles and clear in-context emphasis.', specimen: 'Medication review' },
  { label: 'XL', variable: '--type-xl', value: '20px', use: 'Large summary values and compact section emphasis.', specimen: 'Visit summary' },
  { label: '2XL', variable: '--type-2xl', value: '24px', use: 'Section titles and major workflow landmarks.', specimen: 'Laboratory results' },
  { label: '3XL', variable: '--type-3xl', value: '28px', use: 'Strong page-level emphasis when 4XL is not needed.', specimen: 'Care plan' },
  { label: '4XL', variable: '--type-4xl', value: '32px', use: 'Canonical page title through the k-h1 role.', specimen: 'Patient record' },
  { label: '5XL', variable: '--type-5xl', value: '38px', use: 'Rare wide-canvas or service overview display; not routine clinical forms.', specimen: 'Clinical workspace' },
];

const typographyRoles: readonly TypographyRole[] = [
  {
    label: 'Page title',
    element: 'h1',
    className: 'k-h1',
    token: '--type-4xl · 32px',
    composition: '700 · tight · tracking-tight',
    use: 'One concise page context. Keep it specific to the current workflow.',
    specimen: 'Laboratory results',
  },
  {
    label: 'Section title',
    element: 'h2',
    className: 'k-h3',
    token: '--type-2xl · 24px',
    composition: '600 · snug',
    use: 'Separate a major decision area without competing with the page title.',
    specimen: 'Result interpretation',
  },
  {
    label: 'Component title',
    element: 'h3',
    className: 'k-h5',
    token: '--type-lg · 18px',
    composition: '600 · snug',
    use: 'Name a card, dialog, table, or structured content block.',
    specimen: 'Medication reconciliation',
  },
  {
    label: 'Body',
    element: 'p',
    className: 'k-body',
    token: '--type-base · 14px',
    composition: '400 · normal',
    use: 'Default operational and clinical copy. Prefer this role before making text smaller.',
    specimen: 'Review the recorded symptoms before confirming the visit.',
  },
  {
    label: 'Compact body',
    element: 'p',
    className: 'k-body-sm',
    token: '--type-sm · 13px',
    composition: '400 · normal',
    use: 'Supporting explanation in dense but still readable UI.',
    specimen: 'Last updated 15 July 2026 at 09:32',
  },
  {
    label: 'Field label',
    element: 'label',
    className: 'k-label',
    token: '--type-sm · 13px',
    composition: '500 · normal · secondary text',
    use: 'Identify the value, field, or group immediately before it.',
    specimen: 'Primary diagnosis',
  },
  {
    label: 'Caption',
    element: 'p',
    className: 'k-caption',
    token: '--type-xs · 12px',
    composition: '400 · normal · muted text',
    use: 'Secondary metadata only. Do not put warnings, doses, or next steps here.',
    specimen: 'Collected by Phạm Minh Tú · 09:32',
  },
];

const typeWeights = [
  { label: 'Regular', variable: '--weight-regular', value: '400', use: 'Body copy, instructions, and stable clinical detail.' },
  { label: 'Medium', variable: '--weight-medium', value: '500', use: 'Labels, compact controls, and meaningful metadata.' },
  { label: 'Semibold', variable: '--weight-semibold', value: '600', use: 'Section and component titles only.' },
  { label: 'Bold', variable: '--weight-bold', value: '700', use: 'Page context and a small number of high-priority values.' },
] as const;

const leadingTokens = [
  { label: 'Tight', variable: '--leading-tight', value: '1.2', use: 'Page-level display text only. Do not use for multi-line guidance.' },
  { label: 'Snug', variable: '--leading-snug', value: '1.35', use: 'Section and component titles that may wrap.' },
  { label: 'Normal', variable: '--leading-normal', value: '1.5', use: 'Body, labels, metadata, instructions, and long content.' },
] as const;

const typographyRules = [
  'Choose a semantic role first; use the raw scale only while defining a new canonical role.',
  'Keep safety-critical instructions at base or MD with normal leading; never reduce them to caption size.',
  'Use tabular figures for results, dates, times, percentages, currency, identifiers, and reference ranges.',
  'Let long names and Vietnamese diacritics wrap. Do not clip a patient identifier, diagnosis, medication, dose, or abnormal-result explanation.',
  'Density can reduce surrounding spacing, not legibility. Typography roles remain stable in compact, cozy, and comfortable workflows.',
] as const;

function ReferenceFrame({
  eyebrow,
  title,
  description,
  children,
  section,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  section: string;
}) {
  return (
    <main
      data-foundation-section={section}
      className="min-h-screen w-full bg-background px-4 py-8 text-foreground sm:px-8 lg:py-10"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="max-w-4xl border-b pb-7">
          <p className="k-label uppercase tracking-[0.18em]">{eyebrow}</p>
          <h1 className="k-h1 mt-2 text-balance">{title}</h1>
          <p className="k-body mt-3 max-w-3xl text-muted-foreground">{description}</p>
        </header>
        {children}
      </div>
    </main>
  );
}

function TokenCode({ variable }: { variable: string }) {
  return <code className="select-text break-all font-mono text-xs text-muted-foreground">{variable}</code>;
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b pb-3">
      <h2 className="k-h3">{title}</h2>
      <p className="k-body-sm mt-1 max-w-3xl text-muted-foreground">{description}</p>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
      <p className="k-label uppercase tracking-[0.12em]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="k-body-sm mt-1 text-muted-foreground">{detail}</p>
    </article>
  );
}

function TokenTable({ tokens, kind }: { tokens: readonly ScaleToken[]; kind: 'spacing' | 'radius' | 'elevation' }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card-surface)] border bg-card">
      <div className="hidden grid-cols-[5rem_minmax(10rem,1fr)_8rem_minmax(16rem,1.5fr)] gap-4 border-b bg-muted px-4 py-3 lg:grid">
        <span className="k-label">Step</span>
        <span className="k-label">Token</span>
        <span className="k-label">Value</span>
        <span className="k-label">Use</span>
      </div>
      {tokens.map((token) => {
        const visualStyle: CSSProperties =
          kind === 'spacing'
            ? { width: `var(${token.variable})`, minWidth: token.value === '0px' ? '2px' : undefined }
            : kind === 'radius'
              ? { borderRadius: `var(${token.variable})` }
              : { boxShadow: `var(${token.variable})` };

        return (
          <div key={token.variable} className="grid gap-3 border-b px-4 py-4 last:border-b-0 lg:grid-cols-[5rem_minmax(10rem,1fr)_8rem_minmax(16rem,1.5fr)] lg:items-center lg:gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-indicator)] border bg-background text-xs font-semibold">
                {token.label}
              </span>
              <span className="k-label lg:hidden">Step</span>
            </div>
            <div className="min-w-0">
              <TokenCode variable={token.variable} />
            </div>
            <code className="text-xs font-medium text-muted-foreground">{token.value}</code>
            <div className="flex min-w-0 items-center gap-4">
              <span
                aria-hidden="true"
                className={kind === 'spacing' ? 'block h-3 rounded-[var(--radius-indicator)] bg-primary' : 'block h-14 w-24 shrink-0 border bg-background'}
                style={visualStyle}
              />
              <p className="k-body-sm min-w-0 text-muted-foreground">{token.role}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SemanticTable({ tokens }: { tokens: readonly ScaleToken[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {tokens.map((token) => (
        <article key={token.variable} className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold">{token.label}</h3>
              <TokenCode variable={token.variable} />
            </div>
            <code className="shrink-0 text-right text-xs text-muted-foreground">{token.value}</code>
          </div>
          <p className="k-body-sm mt-3 text-muted-foreground">{token.role}</p>
        </article>
      ))}
    </div>
  );
}

export type TypographyContentMode = 'standard' | 'long';

export function TypographyReference({ contentMode = 'standard' }: { contentMode?: TypographyContentMode }) {
  const isLongContent = contentMode === 'long';
  const patientName = isLongContent
    ? 'Nguyễn Thị Ánh Dương — tiền sử tăng huyết áp, đái tháo đường type 2 và dị ứng penicillin'
    : 'Nguyễn Thị Ánh Dương';
  const clinicalNote = isLongContent
    ? 'Người bệnh ghi nhận chóng mặt thoáng qua sau khi thay đổi liều thuốc vào buổi sáng. Không ghi nhận đau ngực, khó thở hoặc ngất. Cần xác nhận lại danh sách thuốc, liều dùng, thời điểm uống và hướng dẫn người bệnh liên hệ cơ sở y tế nếu triệu chứng kéo dài hoặc nặng lên.'
    : 'Người bệnh ghi nhận chóng mặt thoáng qua sau khi thay đổi liều thuốc vào buổi sáng. Cần xác nhận lại danh sách thuốc và thời điểm uống.';

  return (
    <ReferenceFrame
      section="typography"
      eyebrow="Design system · foundations"
      title="Typography"
      description="A role-first type system for clinical work. It makes page context, decisions, values, labels, instructions, and metadata easy to scan without reducing legibility when the workspace becomes dense."
    >
      <section className="grid gap-[var(--space-inset-card)] sm:grid-cols-3" aria-label="Typography system summary">
        <Metric label="Core scale" value="11 steps" detail="11px to 38px, used through named roles rather than one-off sizes." />
        <Metric label="Role helpers" value="7 roles" detail="Page, section, component, body, compact body, label, and caption." />
        <Metric label="Density rule" value="Stable type" detail="Density changes space around text, never the legibility of the role itself." />
      </section>

      <section className="flex flex-col gap-[var(--space-inset-card)]" aria-labelledby="type-family-heading">
        <SectionHeading
          title="Font family and character coverage"
          description="Use the canonical stacks through font-sans and font-mono. Do not declare a local font family; the sans stack includes the Khmer fallback when it is needed."
        />
        <div className="grid gap-[var(--space-inset-card)] md:grid-cols-3">
          <article className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
            <p className="k-label">Interface text</p>
            <p className="k-h5 mt-[var(--space-stack-control)] font-sans">SVN Helvetica Now Text</p>
            <TokenCode variable="--font-family-sans" />
            <p className="k-body-sm mt-[var(--space-stack-control)] text-muted-foreground">Use for every patient-facing and staff-facing sentence, label, value, and action.</p>
          </article>
          <article className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
            <p className="k-label">Clinical identifiers</p>
            <p className="k-h5 mt-[var(--space-stack-control)] font-mono">CR-2026-0715-042</p>
            <TokenCode variable="--font-family-mono" />
            <p className="k-body-sm mt-[var(--space-stack-control)] text-muted-foreground">Restrict monospace to tokens, booking codes, sample IDs, and technical identifiers.</p>
          </article>
          <article className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
            <p className="k-label">Khmer fallback</p>
            <p className="k-h5 mt-[var(--space-stack-control)] font-sans">សូមបញ្ជាក់អត្តសញ្ញាណអ្នកជំងឺ</p>
            <p className="k-caption mt-[var(--space-stack-label)]">Kantumruy Pro resolves from the canonical sans stack.</p>
            <p className="k-body-sm mt-[var(--space-stack-control)] text-muted-foreground">The fallback is automatic; do not create a language-specific font override.</p>
          </article>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-inset-card)]" aria-labelledby="type-scale-heading">
        <SectionHeading
          title="Core type scale"
          description="This is the complete physical scale. In product UI, consume the semantic role where one exists; reserve direct scale use for a new foundation decision that is being documented here."
        />
        <div className="overflow-hidden rounded-[var(--radius-card-surface)] border bg-card">
          <div className="hidden gap-[var(--space-inline-group)] border-b bg-muted px-[var(--space-inset-card)] py-[var(--space-inset-control)] lg:grid lg:grid-cols-4">
            <span className="k-label">Step and token</span>
            <span className="k-label">Resolved size</span>
            <span className="k-label">Default use</span>
            <span className="k-label">Live specimen</span>
          </div>
          {typographyTokens.map((token) => (
            <article key={token.variable} className="grid gap-[var(--space-inline-group)] border-b px-[var(--space-inset-card)] py-[var(--space-inset-card)] last:border-b-0 lg:grid-cols-4 lg:items-center">
              <div className="min-w-0">
                <p className="k-label">{token.label}</p>
                <TokenCode variable={token.variable} />
              </div>
              <code className="font-mono text-sm tabular-nums text-muted-foreground">{token.value}</code>
              <p className="k-body-sm text-muted-foreground">{token.use}</p>
              <p
                className="min-w-0 break-words font-sans text-foreground"
                style={{ fontSize: `var(${token.variable})`, lineHeight: 'var(--leading-normal)' }}
              >
                {token.specimen}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-inset-card)]" aria-labelledby="type-roles-heading">
        <SectionHeading
          title="Semantic role map"
          description="Roles encode size, weight, leading, tracking, and emphasis together. The element conveys document structure; the Kura class conveys the visual role."
        />
        <div className="grid gap-[var(--space-inline-group)] md:grid-cols-2">
          {typographyRoles.map((role) => (
            <article key={role.label} className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
              <div className="flex flex-wrap items-baseline justify-between gap-[var(--space-inline-group)]">
                <p className="k-label">{role.label}</p>
                <code className="font-mono text-xs text-muted-foreground">&lt;{role.element}&gt;.{role.className}</code>
              </div>
              <p className={`${role.className} mt-[var(--space-stack-control)] text-foreground`}>{role.specimen}</p>
              <div className="mt-[var(--space-stack-control)] grid gap-[var(--space-stack-label)] sm:grid-cols-2">
                <p className="k-caption"><span className="font-medium text-foreground">Token:</span> {role.token}</p>
                <p className="k-caption"><span className="font-medium text-foreground">Composition:</span> {role.composition}</p>
              </div>
              <p className="k-body-sm mt-[var(--space-stack-control)] text-muted-foreground">{role.use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-[var(--space-inset-card)] lg:grid-cols-2" aria-label="Typography weight and leading references">
        <div className="flex flex-col gap-[var(--space-inset-card)]">
          <SectionHeading
            title="Weight"
            description="Weight signals hierarchy, not decoration. Keep body copy stable and reserve stronger weight for a meaningful change in role or priority."
          />
          <div className="grid gap-[var(--space-inline-group)] sm:grid-cols-2">
            {typeWeights.map((weight) => (
              <article key={weight.variable} className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
                <p className="k-label">{weight.label}</p>
                <p className="mt-[var(--space-stack-control)] text-xl leading-[var(--leading-snug)]" style={{ fontWeight: `var(${weight.variable})` }}>Clinical text</p>
                <div className="mt-[var(--space-stack-control)] flex items-center justify-between gap-[var(--space-inline-group)]">
                  <TokenCode variable={weight.variable} />
                  <code className="font-mono text-xs tabular-nums text-muted-foreground">{weight.value}</code>
                </div>
                <p className="k-body-sm mt-[var(--space-stack-control)] text-muted-foreground">{weight.use}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[var(--space-inset-card)]">
          <SectionHeading
            title="Line height"
            description="Line height is part of the role. Reflow content before shrinking its type; extended copy needs the normal leading token to remain readable at zoom."
          />
          <div className="grid gap-[var(--space-inline-group)]">
            {leadingTokens.map((leading) => (
              <article key={leading.variable} className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
                <div className="flex flex-wrap items-baseline justify-between gap-[var(--space-inline-group)]">
                  <p className="k-label">{leading.label}</p>
                  <code className="font-mono text-xs tabular-nums text-muted-foreground">{leading.value}</code>
                </div>
                <p className="k-body mt-[var(--space-stack-control)]" style={{ lineHeight: `var(${leading.variable})` }}>
                  Patient context and action guidance stay connected when this text wraps onto another line.
                </p>
                <TokenCode variable={leading.variable} />
                <p className="k-body-sm mt-[var(--space-stack-control)] text-muted-foreground">{leading.use}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-inset-card)]" aria-labelledby="type-clinical-specimen-heading">
        <SectionHeading
          title="Clinical composition specimen"
          description="A realistic long-content check for reading order, numeric alignment, Vietnamese diacritics, English guidance, and Khmer fallback. It should remain understandable without relying on color or truncation."
        />
        <div className="grid gap-[var(--space-inset-card)] rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)] lg:grid-cols-2">
          <article className="flex flex-col gap-[var(--space-stack-section)]">
            <div>
              <p className="k-label">Patient</p>
              <h3 className="k-h5 mt-[var(--space-stack-label)] break-words">{patientName}</h3>
              <p className="k-caption mt-[var(--space-stack-label)]">DOB 18 May 1974 · MRN <span className="font-mono tabular-nums">HN-004821</span> · Visit 15 July 2026</p>
            </div>
            <div>
              <p className="k-label">Clinical note</p>
              <p className="k-body mt-[var(--space-stack-label)] text-muted-foreground">{clinicalNote}</p>
            </div>
            <div className="grid gap-[var(--space-inline-group)] sm:grid-cols-3">
              <div className="rounded-[var(--radius-control)] border bg-background p-[var(--space-inset-control)]">
                <p className="k-label">HbA1c</p>
                <p className="k-body mt-[var(--space-stack-label)] font-medium tabular-nums">5.8%</p>
                <p className="k-caption mt-[var(--space-stack-label)]">Target &lt; 7.0%</p>
              </div>
              <div className="rounded-[var(--radius-control)] border bg-background p-[var(--space-inset-control)]">
                <p className="k-label">BP</p>
                <p className="k-body mt-[var(--space-stack-label)] font-medium tabular-nums">128/76 mmHg</p>
                <p className="k-caption mt-[var(--space-stack-label)]">Sitting · 09:32</p>
              </div>
              <div className="rounded-[var(--radius-control)] border bg-background p-[var(--space-inset-control)]">
                <p className="k-label">Next review</p>
                <p className="k-body mt-[var(--space-stack-label)] font-medium tabular-nums">29 Jul 2026</p>
                <p className="k-caption mt-[var(--space-stack-label)]">14 days</p>
              </div>
            </div>
          </article>

          <article className="flex flex-col gap-[var(--space-stack-section)] rounded-[var(--radius-card-surface)] border bg-background p-[var(--space-inset-panel)]">
            <div>
              <p className="k-label">Guidance</p>
              <p className="k-body mt-[var(--space-stack-label)]">Confirm the medication list before documenting a change. Preserve the patient&apos;s wording when a symptom is clinically relevant.</p>
            </div>
            <div>
              <p className="k-label">English</p>
              <p className="k-body-sm mt-[var(--space-stack-label)] text-muted-foreground">Report persistent dizziness, chest pain, shortness of breath, or fainting without delay.</p>
            </div>
            <div>
              <p className="k-label">Khmer fallback</p>
              <p className="k-body-sm mt-[var(--space-stack-label)] text-muted-foreground">សូមបញ្ជាក់អត្តសញ្ញាណអ្នកជំងឺ មុនពេលកែប្រែព័ត៌មានថ្នាំ។</p>
            </div>
            <div className="border-t pt-[var(--space-inset-control)]">
              <p className="k-caption">Clinical numbers use tabular figures so values, times, dates, and units remain easy to compare.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-inset-card)]" aria-labelledby="type-rules-heading">
        <SectionHeading
          title="Use and safety rules"
          description="Typography should lower cognitive load, preserve clinical detail, and make the next action easier to identify. These rules apply in every theme, density, and supported viewport."
        />
        <ol className="grid gap-[var(--space-inline-group)] md:grid-cols-2 lg:grid-cols-3">
          {typographyRules.map((rule, index) => (
            <li key={rule} className="flex gap-[var(--space-inline-group)] rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-[var(--radius-indicator)] border bg-background font-mono text-xs tabular-nums text-muted-foreground">{index + 1}</span>
              <p className="k-body-sm text-muted-foreground">{rule}</p>
            </li>
          ))}
        </ol>
      </section>
    </ReferenceFrame>
  );
}

export function SpacingReference() {
  return (
    <ReferenceFrame
      section="spacing"
      eyebrow="Design system · foundations"
      title="Spacing scale"
      description="A 4px base rhythm with half-steps for dense clinical controls and extended steps for page composition. Use semantic aliases when the intent is known; use scale tokens when defining a new pattern."
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <Metric label="Base unit" value="4px" detail="All core steps resolve to a 4px rhythm." />
        <Metric label="Core steps" value="19" detail="0px through 128px, including half-steps." />
        <Metric label="Semantic aliases" value="16" detail="Intent-led inset, stack, and layout gaps." />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Core scale" description="Read the scale as a vocabulary, not a set of arbitrary values. The bar is the resolved physical size of each token." />
        <TokenTable tokens={spacingTokens} kind="spacing" />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Semantic spacing map" description="These aliases express why a gap exists, so component changes stay coherent when the base rhythm evolves." />
        <SemanticTable tokens={spacingSemantics} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Composition specimen" description="A small shell showing how page gutter, panel inset, field gap, and section gap work together." />
        <div className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-page-gutter)]">
          <div className="flex flex-col gap-[var(--space-section-gap)]">
            <div className="rounded-[var(--radius-card-surface)] border bg-background p-[var(--space-inset-panel)]">
              <div className="flex flex-col gap-[var(--space-stack-section)]">
                <div>
                  <p className="k-label">Workspace header</p>
                  <h3 className="mt-[var(--space-stack-label)] text-xl font-semibold">Patient context stays anchored</h3>
                </div>
                <div className="grid gap-[var(--space-field-gap)] sm:grid-cols-3">
                  {['Patient', 'Visit', 'Assurance'].map((label) => (
                    <div key={label} className="rounded-[var(--radius-control)] border bg-card p-[var(--space-inset-control)]">
                      <p className="k-label">{label}</p>
                      <p className="mt-[var(--space-stack-label)] text-sm font-medium">Ready to review</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-[var(--space-inline-group)] sm:grid-cols-2">
              <div className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
                <p className="k-label">Density rule</p>
                <p className="k-body-sm mt-[var(--space-stack-label)] text-muted-foreground">Compact screens use space-2 and space-3 before reducing type.</p>
              </div>
              <div className="rounded-[var(--radius-card-surface)] border bg-card p-[var(--space-inset-card)]">
                <p className="k-label">Responsive rule</p>
                <p className="k-body-sm mt-[var(--space-stack-label)] text-muted-foreground">Page gutter grows from space-6 to space-10 at wide breakpoints.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ReferenceFrame>
  );
}

export function RadiusReference() {
  return (
    <ReferenceFrame
      section="radius"
      eyebrow="Design system · foundations"
      title="Radius scale"
      description="Radius is a hierarchy signal: compact controls stay restrained, grouped surfaces soften, and floating regions receive the largest contextual curve."
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <Metric label="Control" value="10px" detail="Field and interactive control silhouette." />
        <Metric label="Card surface" value="14px" detail="Default grouped surface radius." />
        <Metric label="Overlay" value="20px" detail="Dialogs, sheets, and drawers." />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Radius scale" description="Use the smallest radius that communicates the component's containment level. Avoid mixing radii within one component family." />
        <TokenTable tokens={radiusTokens} kind="radius" />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Semantic radius map" description="These aliases are the preferred API for product surfaces and shared patterns." />
        <SemanticTable tokens={radiusSemantics} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Component silhouettes" description="The same semantic radius keeps controls, cards, overlays, and badges recognisable across roles." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Control', '--radius-control', 'Field or action'],
            ['Popover', '--radius-popover', 'Anchored panel'],
            ['Card', '--radius-card-surface', 'Grouped content'],
            ['Overlay', '--radius-overlay', 'Dialog or drawer'],
          ].map(([label, variable, detail]) => (
            <article key={variable} className="border bg-card p-4" style={{ borderRadius: `var(${variable})` }}>
              <div className="flex h-24 items-center justify-center border bg-background" style={{ borderRadius: `var(${variable})` }}>
                <span className="text-sm font-semibold">{label}</span>
              </div>
              <TokenCode variable={variable} />
              <p className="k-body-sm mt-2 text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </ReferenceFrame>
  );
}

export function ElevationReference() {
  return (
    <ReferenceFrame
      section="elevation"
      eyebrow="Design system · foundations"
      title="Elevation scale"
      description="Elevation separates layers only when borders, grouping, or position are not enough. Cards default to flat; transient surfaces earn shadow through context."
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <Metric label="Flat default" value="0" detail="Border and surface rhythm come first." />
        <Metric label="Transient" value="3–4" detail="Popover and modal depth range." />
        <Metric label="Focus" value="3px" detail="A halo, not a depth layer." />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Elevation scale" description="Levels are ordered by separation, not by decorative intensity. The specimen uses the actual shadow token." />
        <TokenTable tokens={elevationTokens} kind="elevation" />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Semantic elevation map" description="Use semantic aliases in components so the layer decision is explicit and theme-aware." />
        <SemanticTable tokens={elevationSemantics} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading title="Layering specimen" description="The sequence stays flat until content leaves document flow. Depth is reserved for transient layers; focus and selection remain separate signals." />
        <div className="grid gap-4 rounded-[var(--radius-overlay)] bg-[var(--color-surface-2)] p-4 sm:gap-6 sm:p-6 lg:grid-cols-3">
          <div className="rounded-[var(--radius-card-surface)] bg-card p-5" style={{ boxShadow: 'var(--elevation-card)' }}>
            <p className="k-label">Level 0</p>
            <h3 className="mt-2 font-semibold">Flat card</h3>
            <p className="k-body-sm mt-2 text-muted-foreground">Surface contrast and grouping carry the boundary.</p>
          </div>
          <div className="rounded-[var(--radius-card-surface)] bg-card p-5" style={{ boxShadow: 'var(--elevation-popover)' }}>
            <p className="k-label">Level 3</p>
            <h3 className="mt-2 font-semibold">Anchored utility</h3>
            <p className="k-body-sm mt-2 text-muted-foreground">Popover depth separates transient content.</p>
          </div>
          <div className="rounded-[var(--radius-overlay)] bg-card p-5" style={{ boxShadow: 'var(--elevation-modal)' }}>
            <p className="k-label">Level 4</p>
            <h3 className="mt-2 font-semibold">Blocking surface</h3>
            <p className="k-body-sm mt-2 text-muted-foreground">Modal depth signals an interruption.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <button type="button" className="min-h-10 rounded-[var(--radius-control)] border bg-card px-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" style={{ boxShadow: 'var(--elevation-focus)' }}>
            <span className="k-label block">Keyboard focus</span>
            <span className="k-body-sm mt-1 block text-muted-foreground">Tab here to inspect the focus halo and offset.</span>
          </button>
          <div className="rounded-[var(--radius-card-surface)] border bg-card p-4" style={{ boxShadow: 'var(--elevation-selected)' }}>
            <p className="k-label">Selection</p>
            <p className="k-body-sm mt-1 text-muted-foreground">Selection remains paired with label, icon, or state text.</p>
          </div>
        </div>
      </section>
    </ReferenceFrame>
  );
}
