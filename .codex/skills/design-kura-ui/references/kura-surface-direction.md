# Kura Surface Direction — the BoardUI sandwich

The visual law for every Kura surface. Read this before placing any container,
choosing any background, or reaching for a shadow.

Audience: every agent and human working in this repository. Codex reaches this
file through `AGENTS.md` → `design-kura-ui`; Claude Code through `CLAUDE.md`.
This `.codex` copy is canonical — never fork or restate it elsewhere.

`minimalist` decides what survives. This file decides what the survivors sit
on. `design-kura-ui` decides everything else about how they are built.

Kura is **light-only** until a separately validated dark semantic graph ships.
Do not add dark-mode styling or `data-theme='dark'` branches to surfaces.
`html { color-scheme: light }` in `src/app/globals.css` enforces this at the
UA level — scrollbars and native form controls cannot go dark on their own.

## Contents

- [0. The one-paragraph version](#0-the-one-paragraph-version)
- [1. The three layers](#1-the-three-layers)
- [2. Token map — the only values that exist](#2-token-map--the-only-values-that-exist)
- [3. Choosing a layer](#3-choosing-a-layer-the-decision-you-will-make-most-often)
- [4. Cards](#4-cards)
- [5. Overlays are not trays](#5-overlays-are-not-trays)
- [6. Tables](#6-tables)
- [7. Controls and fields](#7-controls-and-fields)
- [8. Hover, selection, focus](#8-hover-selection-focus)
- [9. Decorated canvases](#9-decorated-canvases-the-auth-exception)
- [10. App-shell chrome](#10-app-shell-chrome)
- [11. Visual character — how BoardUI feels](#11-visual-character--how-boardui-feels)
- [12. Colour budget](#12-colour-budget)
- [13. Reject on sight](#13-reject-on-sight)
- [14. Where the law lives — verify, never trust prose](#14-where-the-law-lives--verify-never-trust-prose)
- [15. Canonical examples to imitate](#15-canonical-examples-to-imitate)
- [16. Self-check](#16-self-check)

## 0. The one-paragraph version

The page is **white**. Start with no container: group related content through
proximity, alignment, spacing, and typography. Use a **flat grey tray** only
when the group needs a distinct functional region or a boundary that those
quieter mechanisms cannot provide. Anything inside that tray that needs its
own state, selection, or actions can become a **white tile** with one feather
shadow. Depth is read through contrast and radius, not through boxes drawn
around things. Colour appears on data, status, and the single primary action —
never on chrome.

## 1. The three layers

```text
┌──────────────────────────────────────────────────────────────┐
│  PAGE          white  (#fff)                                 │
│  the canvas. Never tinted, never bordered.                   │
│                                                              │
│   ┌────────────────────────────────────────────────────┐     │
│   │  TRAY        neutral-100 (#f7f7f7) · radius 16     │     │
│   │  a group that needs a distinct functional region. │     │
│   │  NO border. NO shadow. Contrast is the boundary.   │     │
│   │                                                    │     │
│   │   ┌──────────────────────────────────────────┐     │     │
│   │   │  TILE    white · radius 10 · feather     │     │     │
│   │   │  one unit inside the group that needs    │     │     │
│   │   │  its own surface. The ONLY card that     │     │     │
│   │   │  carries a shadow.                       │     │     │
│   │   └──────────────────────────────────────────┘     │     │
│   └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

Radius shrinks as depth grows: 16 → 10 → smaller for controls. A reader can
tell how deep they are without reading a single label.

This diagram is a palette of available layers, not a required nesting pattern.
A page may contain many well-grouped sections and no tray at all. Introduce
only the layers that communicate a real role.

Nesting stops at three. A tile never contains another tile. If a tile seems to
need one, the group is wrong — split the tray instead.

## 2. Token map — the only values that exist

Never write a raw colour, a raw radius, or a hand-rolled shadow.

| Role | Token | Resolves to |
| --- | --- | --- |
| Page canvas | `--color-surface-bg`, `--background` | white |
| Tray | `--card`, `--color-surface-2`, `--muted` | neutral-100 `#f7f7f7` |
| Tile / overlay / control | `--color-surface`, `--surface` | white |
| Well inside a tile | `--color-surface-sunken` | neutral-200 `#ebebeb` |
| Filled field rest | `--color-field-bg` | 75 % surface-2 + 25 % white |
| Tray radius | `--radius-card-surface` | 16px |
| Tile radius | `--radius-card-tile` | 10px (`--radius-md`) |
| Control radius | `--radius-control` | 10px |
| Compact row radius | `--radius-control-compact` | 8px |
| Indicator radius | `--radius-indicator` | 6px |
| Popover radius | `--radius-popover` | 16px |
| Overlay radius | `--radius-overlay` | 20px |
| Tray elevation | `--elevation-card` | **none** |
| Tile elevation | `--elevation-card-tile` | `0 1px 1px rgb(0 0 0 / 5%)` |
| Control elevation | `--shadow-xs` | `0 1px 2px rgb(0 0 0 / 5%)` |
| Popover elevation | `--elevation-popover` | `--shadow-md` |
| Modal elevation | `--elevation-modal` | `--shadow-lg` |
| Tray border | `--card-border` | **transparent** |
| Bordered container | `--card-border-outline` | `--color-border` |

`--elevation-card` being `none` is deliberate and load-bearing. A tray that
grows a shadow has stopped being a tray.

BoardUI's own name for `--shadow-card` is a **contact shadow** — one pixel of
contact where a white surface meets the grey behind it, not depth. If a shadow
is describing depth, the element is an overlay and belongs in §5.

## 3. Choosing a layer (the decision you will make most often)

Ask in this order and stop at the first yes.

1. **Is this the page itself?** → white, no container.
2. **Can proximity, alignment, spacing, typography, or a divider make the
   relationship clear?** → use that mechanism and no card. This is the normal
   answer for sections in one reading flow.
3. **Does the group need to read as a distinct functional region?** → tray.
   `<Card>` default. A tray must have a reason beyond “these items are related.”
4. **Is this one unit inside a tray, with its own state, selection, or
   actions?** → tile. `<Card variant="tile">`.
5. **Does it float above the page — menu, popover, dialog, drawer, toast?**
   → overlay. White + real elevation. Never a tray. See §5.
6. **Is it a control the user types into or presses?** → §7.

A tray is justified when at least one of these is true:

- The region has a functional role distinct from the surrounding reading flow.
- Several elements share state, interaction, or context that must stay visibly
  coherent as content changes or reflows.
- The boundary protects comprehension in a dense or safety-sensitive layout.
- The region sits beside peer regions and needs a stable comparison boundary.
- A background change communicates hierarchy that spacing and typography
  cannot communicate clearly enough.

These are not reasons to add a tray:

- The section has a heading.
- The items are merely related.
- Another section on the page uses a card.
- The layout has open space.
- A card makes the screen feel more designed.

If no functional reason survives, remove the container.

## 4. Cards

Three variants, three jobs. Reach for them only after the no-container test in
§3.

```tsx
<Card>                    {/* tray — grey, flat, radius 16 */}
<Card variant="tile">     {/* tile — white, feather shadow, radius 10 */}
<Card variant="outline">  {/* white + hairline border, no shadow */}
```

- **Default (tray)** means the component's default variant, not the layout's
  default choice. Use it only for a group that passes the tray test in §3.
- **`tile`** only inside a tray. A tile on the white page is invisible — if you
  need a unit to stand out on the page, first test quieter grouping; then use a
  tray or outline card only when its boundary carries meaning.
- **`outline`** is the bordered-container pattern: a white surface whose edge
  carries meaning. Correct for dense card grids where repeated trays would
  read as stripes, and for anything wrapping a table. Not a fallback — pick it
  when the border means something.

Never stack a border and a shadow on the same ordinary surface.

## 5. Overlays are not trays

A dialog, popover, menu, command palette, drawer, or toast is **white with real
elevation**, always. It is floating above the page, and the shadow is
describing genuine spatial behaviour rather than decorating a box.

Inside an overlay, the same three layers apply again from a white base: rows
can take `--muted` on hover, wells take `--color-surface-sunken`.

## 6. Tables

Tables keep their hairlines. Scanning beats aesthetics on dense clinical data,
and this is the one place the border diet does not apply.

- Container: white + `1px solid var(--color-border)` + `--radius-popover`.
- Header band: `--color-surface-2`, bordered top and bottom.
- Body rows: white, hairline `border-bottom`, none on the last row.
- Row hover: `--color-background-primary-hover`.
- Selected row: `--status-info-bg` or `--color-action-primary-subtle`, always
  with a non-colour cue.
- Zebra striping: only when the row count genuinely defeats hairlines.

Wrap a table in a tray only when it is one member of a larger group. A table
that is the page is a bordered container on the white page.

## 7. Controls and fields

| Control | Surface | Edge |
| --- | --- | --- |
| Button, outline | white | `--color-border-button-default` + `--shadow-xs` |
| Button, primary | solid Brand 500 | contact shadow |
| Button, ghost | transparent | none; hover fills |
| Input, textarea, select | `--color-field-bg` | inset ring, no border |
| Disabled field | `--color-background-primary-disabled` | — |
| Read-only field | `--color-surface-sunken` | — |
| Track (progress, slider, tabs) | `--color-surface-sunken` | — |

Filled fields carry no border by design: the fill is the affordance and the
inset ring appears on hover, focus, and error. This keeps a form quiet on
white and still legible inside a grey tray.

Primary buttons use one solid Brand 500 fill. Hover and active states keep the
fill stable and strengthen the border, so the action does not introduce a
second brand tone. The canonical Button uses white label and icon content.
Danger buttons retain their semantic gradient and cross-fade implementation
in `button.module.css`.

Every disabled control names its reason nearby. A greyed button with nothing
beside it is an unfinished state, not a design.

## 8. Hover, selection, focus

The trap: a fill that reads on white disappears on a tray, because the tray is
the same neutral-100.

- **Hover on a surface that might be either** → `--color-background-secondary-hover`
  (neutral-200). Reads on white and on a tray.
- **Hover on rows inside a white tile or overlay** → `--muted` is fine.
- **Hover on a bordered control** → shift the border, not the fill.
- **Selection** → `--color-selection-bg` / `-strong`, paired with text, an icon,
  or a check. Never colour alone.
- **Focus** → `--shadow-focus` ring only. Focus is never a depth cue and never
  moves the element.

Rows prefer a background shift with negative-margin bleed over a hairline per
row:

```css
.row {
  margin-inline: calc(var(--space-2) * -1);
  padding: var(--space-2);
  border-radius: var(--radius-control-compact);
  transition: background-color var(--motion-color);
}
.row:hover { background: var(--color-background-secondary-hover); }
```

## 9. Decorated canvases (the auth exception)

Auth and other pre-app surfaces sit on an ambient brand gradient rather than
white. A grey tray on that gradient loses its contrast and reads as disabled.

**Rule: a focal panel on a decorated canvas is white with real elevation.**
The canvas owns the override, scoped in its own module — never patched into
the panel:

```css
.column :global([data-slot='card']) {
  background: var(--color-surface);
  border-color: rgba(var(--color-auth-surface-rgb), 0.9);
  box-shadow: var(--elevation-modal);
}
```

The grey tray is one available grouping device for the white app canvas, not
the default wrapper. On any canvas, justify it or drop it.

## 10. App-shell chrome

The shell — sidebar, topbar, navigation — is chrome, and chrome stays neutral.
It never competes with the work area for attention.

- The shell binds **only** through its role tokens: `--sidebar-bg`,
  `--sidebar-fg`, `--sidebar-fg-muted`, `--sidebar-hover-bg`,
  `--sidebar-active-bg`, `--sidebar-active-fg`, `--sidebar-border`. The shell
  must not mint colours; the roles map onto existing semantics so a shell
  redesign is a token remap, not a component rewrite.
- The topbar is a white sticky strip; its bottom hairline and the sidebar
  boundary form the frame the work area sits in.
- Active navigation = `--sidebar-active-bg` / `--sidebar-active-fg`
  (selection tokens) plus a non-colour cue. Nav items are transparent at rest;
  they are position, not content.
- Shell layout (docked vs floating, widths, collapse behaviour) is owned by
  `src/components/shared/app-shell/` and is still being iterated — read the
  current module before touching it, and never restate its geometry in docs.

## 11. Visual character — how BoardUI feels

The sandwich is the structure; this is the finish. Every rule here is
extracted from BoardUI's shipped CSS and dashboard markup, and every value
already exists as a Kura token.

### Light comes from above

The one physical metaphor the whole system obeys. Filled and branded controls
carry a **single inset top highlight** simulating overhead light:

- Primary button: solid Brand 500 + one quiet contact shadow (`--shadow-xs`).
- Selected nav: `--shadow-nav-selected` — ring + inset top white.
- Checked checkbox / switch chips / slider thumb: same recipe, own tokens.

One highlight maximum, only on filled controls. Text surfaces, trays, and
tiles never get it. Light never comes from below or the side.

### The stat tile

The signature composition, in one anatomy (see the Home signal strip):

```text
┌ tray (grey, radius 16, p-4, fixed height ~132px) ──────┐
│  [icon on a WHITE chip, radius-inset, p-1.5]           │
│                                                        │
│  Label            14px · medium · text-secondary       │
│  49,590  [+5.3%]  24px · medium · tabular-nums         │
└────────────────────────────────────────────────────────┘
```

- The icon sits on a **white chip** so it reads against the grey tray — the
  same flip the empty-state icon makes. Icon colour: `--color-foreground-icon-primary`.
- Number ≈ 1.7× the label size, weight **medium** not bold, always
  `tabular-nums`. The number is the loudest thing on the tile; nothing else
  competes.
- Use this composition when peer metrics need stable comparison boundaries;
  it is not a template for ordinary page sections.

### The tinted pill

Deltas and statuses are pills of **one hue at two tones**: soft `~200`
background with dark `~800` text of the same hue (lime-200/lime-800 for up,
rose-200/rose-800 for down). In Kura that is the Badge soft variants — never
hand-mix the pair. Small radius for data pills; full-round is reserved for
identity (avatars, presence).

### People-first rows

Wherever a person appears: `Avatar (rounded-full) · name (text-primary,
medium) · meta (text-tertiary)`. Avatars carry the identity; rows carry no
borders (see §8). Sizes come from the avatar component's ramp — never ad hoc.

### Chart grammar

- Data fills are **flat 400-tone** categorical colours (`--color-chart-1…8`);
  hover shifts one tone darker (`--color-chart-N-active`). No gradients in
  data, ever — gradients belong to buttons.
- The track behind a series is `--color-chart-track` (neutral-200); reference
  lines and cursors `--color-chart-cursor`; "other" slices `--color-chart-neutral`.
- Chart colour is categorical, not semantic: chart-2 being lime does not make
  it "success". Semantic meaning goes through status tokens and a text label.
- Bar and cell caps are slightly rounded (`--radius-indicator` scale), axis
  labels are caption-size `text-tertiary`.

### Blur rides the fade

When text or a row fades as part of movement, BoardUI pairs the opacity with
a slight blur — collapsing sidebar labels transition
`max-width, opacity, filter`; arriving rows fade from `blur(2px)`. It reads
as focus resolving, not opacity ticking. Use it only where motion already
exists, keep it ≤2px, and let reduced-motion kill it with everything else.

### Density numbers

The rhythm the dashboard actually uses, in Kura tokens: tray inset
`--space-inset-card` (16px) · gaps between tiles `--space-4` · dense list
rows `--space-2-5` inset · control heights from the `--control-h` scale.
Generous white page margins around tray clusters; tight, even rhythm inside
them. Density comes from alignment and shared baselines, never from shrinking
type.

## 12. Colour budget

Chrome gets **zero** colour. Saturated colour appears in exactly three places:

1. **Data** — the number, the amount, the result.
2. **Status** — always with a text label; colour is never the only signal.
3. **The single primary action** in the current scope.

Neutral surfaces carry structure. Brand carries action, selection, focus, and
active navigation. Status ramps carry meaning. Nothing else is coloured.

Loud data is the one thing allowed to shout: the primary value of a surface
renders at `--type-xl` or larger, semibold, with `font-variant-numeric:
tabular-nums`, while the chrome around it stays 13–14px. Money always goes
through `MoneyText`.

## 13. Reject on sight

| Smell | What it should be |
| --- | --- |
| Shadow on a grey tray | Flat. `--elevation-card` is `none`. |
| Tile inside a tile | Split the tray. |
| White tile directly on the white page | Tray, or outline card. |
| Border **and** shadow on one ordinary surface | Pick one. |
| Grey tray on the auth gradient | White + `--elevation-modal`. |
| `--muted` hover inside a tray | `--color-background-secondary-hover`. |
| A box around every section | Spacing and a heading. |
| Rounded rectangle around a label | Nothing. It is text. |
| Large radius on every component | Radius is depth: 16 / 10 / control. |
| Status shown by colour alone | Badge with a text label. |
| Coloured chrome | Neutral. Colour is for data, status, primary action. |
| Raw hex, raw px radius, hand-rolled shadow | A token from §2. |
| Number the same size as its label | Hero number, tabular numerals. |

## 14. Where the law lives — verify, never trust prose

Prose drifts; tokens do not. When this file and the code disagree, the code
wins and this file gets fixed.

| What | File |
| --- | --- |
| Every surface, radius, shadow token | `src/styles/tokens.css` |
| Card variants (tray / tile / outline) | `src/components/ui/card.tsx` + `card.module.css` |
| Shell role tokens in use | `src/components/shared/app-shell/app-shell.module.css` |
| Table chrome | `src/components/ui/table.module.css`, `data-grid.module.css` |
| Field surfaces | `src/components/ui/input.module.css` |
| Auth canvas override | `src/features/auth/auth-shell.module.css` |
| Token reference page (Storybook) | `src/components/foundations/foundation-token-reference.tsx` |

Token layering follows BoardUI's three-layer architecture, and additions must
respect it: **primitives** in `@theme` (Tailwind utilities) → **semantic
tokens** in `:root` referencing primitives → semantic re-exports where a
utility class is needed. Components consume semantics only; a component that
reaches for a primitive ramp is wrong even when the colour looks identical.

Verify before claiming:

```bash
grep -n "elevation-card\|radius-card\|color-surface\|field-bg" src/styles/tokens.css
npm run check:color-tokens   # 0 raw-colour violations, or the change is wrong
```

Storybook docs canvases share the app background on purpose — `.docs-story`
binds to `--background` in `src/app/globals.css` so borderless trays keep
their contrast in autodocs previews. Do not "fix" a pale-looking docs preview
by adding borders to the component.

Motion belongs to the build guide, not here. One surface-relevant rule:
animate data, never chrome — a tray or tile never transitions its own
geometry. See the ReUI × BoardUI × Kura component build guide §2 for the
motion tokens. Spacing rhythm lives in `design-kura-ui` §6.

## 15. Canonical examples to imitate

Rendered, tested references — read these before inventing a composition:

These examples demonstrate how a justified surface behaves. They are not a
requirement to wrap comparable content in the same surface.

| Pattern | Story / file |
| --- | --- |
| The full sandwich in one frame | `Design System/Components/Card` → *Tile Inside Tray* (`src/components/ui/card.stories.tsx`) |
| Stat tiles: icon chip, loud number, delta | `Clinic/Clinical/Home/Signal tile` → *Peer Metrics* (`src/features/home/home-signal-tile.tsx`) |
| The same signal with no container at all | `Clinic/Clinical/Home/Signal row` (`src/features/home/home-signal-row.tsx`) |
| Tray with white tiles + blocked reasons inline | `Clinic/Clinical/Care plan` (`src/features/care-plan/care-plan-card.tsx`) |
| Structured section as a tile inside a tray card | `Clinic/Clinical/Assessment` (`src/features/assessment/assessment-workspace.tsx`) |
| Bordered table container + grey header band | `Clinic/Clinical/Patients/Registry` (`src/features/patients/`) |
| Objects on a tile, choice cards, gated CTA | `Clinic/Collection/Tube Labeling` (`src/features/collection/tube-labeling.tsx`) |
| Episode chrome: phase strip, next-step tile | `Clinic/Flows/First Patient Journey` (`src/features/journey/journey-workspace.tsx`) |
| White focal panel on a decorated canvas | `Clinic/Auth/Door`, `Clinic/Auth/Onboarding Wizard` |

## 16. Self-check

Before calling a surface done:

1. Could any container be replaced by proximity, alignment, spacing,
   typography, or a divider without losing meaning?
2. Can you name each remaining container's layer — tray, tile, overlay, or
   control — and its functional reason?
3. Does every tray pass the test in §3, with no border and no shadow?
4. Is the feather shadow only on tiles and controls?
5. Does radius shrink with depth?
6. Would every hover fill still be visible if this component were dropped into
   a grey tray?
7. Is there any colour outside data, status, and the primary action?
8. Does every value trace to a token in §2?
9. Have you rendered it? A surface law is only verified in pixels.

Kura wins every conflict. If BoardUI discipline and a Kura clinical-safety,
authority, money, or legal requirement disagree, Kura decides and this file
gives way.
