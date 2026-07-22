# ReUI × BoardUI × Kura — Component Build Guide

## Contents

- [0. The three roles](#0-the-three-roles--never-confuse-them)
- [1. Mandatory pipeline](#1-pipeline-mandatory-order)
- [2. BoardUI finish checklist](#2-the-boardui-finish-checklist-what-clean-means-in-numbers)
- [3. Story contract](#3-story-contract)
- [4. Rejected anti-patterns](#4-anti-patterns-that-kill-the-look-reject-on-sight)
- [5. Definition of done](#5-definition-of-done)

## 0. The three roles — never confuse them

```text
┌─────────────┬─────────────────────────────────────┬────────────────────┐
│   Source    │              Provides               │   Never provides   │
├─────────────┼─────────────────────────────────────┼────────────────────┤
│             │ The skeleton: component             │ Visual identity,   │
│ ReUI /      │ architecture, real prop API,        │ copy, colors,      │
│ shadcn      │ interaction behavior, a11y wiring,  │ spacing, motion    │
│             │ composition patterns                │                    │
├─────────────┼─────────────────────────────────────┼────────────────────┤
│ BoardUI     │ The finish: calm chrome, loud data  │ Structure or       │
│ discipline  │ — how the result feels              │ behavior           │
├─────────────┼─────────────────────────────────────┼────────────────────┤
│ Kura        │ Ownership: tokens, taxonomy,        │ — (Kura always     │
│             │ clinical safety, states, tests      │ wins conflicts)    │
└─────────────┴─────────────────────────────────────┴────────────────────┘
```

One sentence to remember: ReUI decides how it works, BoardUI decides how quiet
it is, Kura decides everything else.

## 1. Pipeline (mandatory order)

1. **USE CASE** — State the Kura task, role, data, and consequence in one sentence.
2. **SEARCH** — Search existing exports and stories first: `REUSE → VARIANT → EXTEND → COMPOSE → DOMAIN-ADAPT → FEATURE-OWN → CREATE`. `CREATE` requires evidence that the earlier options fail.
3. **INSPECT** — Use ReUI MCP in this order: search, then `get_component` or `get_example`. Read the real API before writing props. Treat blocks as architecture references, not paste sources.
4. **DECIDE** — Record the intake decision and evidence. A behavior-carrying dependency is allowed when it is the accessibility work. Precedent: `input-otp` under `OtpInput` provides one logical input with native autofill, paste, and screen-reader behavior. A styling dependency never qualifies.
5. **IMPLEMENT** — Use Kura tokens only. Use CSS Modules with `var(--token)`. Do not use raw hex values, Tailwind palette colors, foreign fonts, or foreign icons. Every icon must come from the canonical `Design System/Foundations/Icons` Storybook inventory through approved Kura icon exports. If the required semantic icon is missing, stop the icon-dependent work and report the missing icon to the user immediately. Do not substitute another library, vendor glyph, copied or hand-drawn SVG, emoji, Unicode symbol, semantically incorrect icon, or local workaround.
6. **FINISH** — Apply the BoardUI checklist in section 2 before writing stories.
7. **REGISTER** — Add stories with full states, play tests, Kura metadata, and tags.
8. **VALIDATE** — Run TypeScript, ESLint, Vitest unit and Storybook tests, `build-storybook`, and `npm run check:reui-ownership`. Verify screenshots at 1440px and 320px.

## 2. The BoardUI finish checklist (what "clean" means, in numbers)

### Surface & borders — the border diet
**Read [the Kura surface direction](kura-surface-direction.md) in full before
placing any container.** It is the complete law; the lines below are the
summary you still have to satisfy.
- Surface sandwich (BoardUI): white page canvas (--color-surface-bg) → flat
gray tray cards (--card = --color-surface-2, no border, no shadow, 16px
radius) → white tiles nested inside a tray (--color-surface +
--elevation-card-tile, 10px radius). Contrast makes the structure.
- Borders only on: control edges (input, select, OTP slot), bordered table
containers, and boundaries that carry meaning (totals divider, action bar).
- Never border + shadow stacked on an ordinary surface; the feather shadow
belongs to tiles and controls, never to trays.
- Rows: no hairline per row. Hover = background shift at --motion-color, with
negative-margin bleed so text stays aligned:

```css
.row {
  margin-inline: calc(var(--space-2) * -1);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-color);
}
.row:hover { background: var(--color-surface-sunken); }
```

- Exception: dense clinical data tables keep hairlines — scanning beats
aesthetics there.

### Typography — weight-swap hierarchy
- Hierarchy by weight (400 ↔ 500/600) before size. One working screen ≤ 3 font
sizes.
- A type role bundles size + line-height + weight + tracking as one decision —
never compose them ad hoc per element.
- Letter-spacing exists only at caption sizes (12px and below, slight positive
tracking for legibility). Everything larger runs at 0 — no tracked headings,
no tracked labels.
- Section labels: --type-sm / medium / --color-text-secondary. No uppercase 
letter-spaced micro-labels. 
- Screen titles inside cards: --type-md–--type-lg semibold, not 20px+.

### Loud data — the only thing allowed to shout
- The primary value of a surface (amount due, count, result) renders
--type-xl+ semibold tabular-nums. Chrome around it stays 13–14px.
- Money always through MoneyText (animateChanges when it updates in place).
- Status = Badge tone + text label. Color is never the only signal. 
- Saturated color appears ONLY on data, status, and the single primary action.
Chrome gets zero color.

### Motion — compose, never hardcode
- Only motion tokens: --motion-color (hover/tone), --motion-control
(chevrons/toggles), --motion-overlay-in/out (enter slower than exit),
--motion-indicator, --motion-layout.
- transition: all banned. Named properties only. 300ms ceiling.
- Animate data, not chrome: value fades, status cross-fades, row arrivals.
Decoration gets nothing.
- Layered clocks: when movement and fade animate together, the fade runs on a
SHORTER clock than the movement (BoardUI row entrance: 400ms grow/slide,
240ms fade+blur) — the element is fully visible before it finishes settling.
- Row arrival/departure animates the grid track (0fr ↔ 1fr) so neighbours move
continuously, with the content sliding from under the adjacent surface —
never a bare height snap.
- Gradient state changes cross-fade through a layered `::before` (opacity),
never by swapping `background-image` on hover — it cannot interpolate.
- Every @keyframes gets a prefers-reduced-motion guard (root already zeroes
durations).
- Native <dialog>: if you override display, restore :not([open]) { display: 
none }; handle Escape on keydown, not only the trusted UA cancel event.

### Interaction states — all four, always

- hover (color at --motion-color), focus-visible (ring tokens), active
(instant), disabled (with a visible reason nearby — never silently grey).

## 3. Story contract

- Taxonomy: Design System/* (primitives/patterns), Clinic/* (domain),
Clinic/Flows/* (journeys). Never a vendor name in titles.
- Required stories: default, variants, error, disabled/read-only, empty,
long-content, loading where async, mobile 320, and every safety-relevant
state.
- Flows: entry → intermediates → blocker + recovery → terminal success, with
kura.flow.pages listing composed story pages.
- Play tests assert behavior through roles/labels (getByRole), not classes.
Demo scaffolding (OTP codes, magic phone numbers) lives in demo-data.ts + docs
description — never in component copy.
- Metadata every adapted component carries:

```ts
tags: ['autodocs', 'source-reui', 'adapted-kura'],
parameters: { kura: { intake: { decision, owner, evidence, exclusions },
source, binding } } 
```

## 4. Anti-patterns that kill the look (reject on sight)

| Smell | Replace with |
| --- | --- |
| Border around every row or section | Surface shift and spacing |
| Hardcoded `transition: all, 150ms ease` | Motion tokens and named properties |
| Hierarchy through stacked font sizes | Weight-swap hierarchy with no more than three sizes |
| Uppercase tracked section labels | 13px/500 secondary text |
| Badge checkmark or color-only status | Badge with a text label |
| Number at the same size as its label | Hero number with tabular numerals |
| `"Demo code: 123456"` in `helpText` | Demo data and story documentation |
| Disabled button without a reason | Inline hint explaining the gate |
| Icon missing from `Design System/Foundations/Icons` | Stop and report the required semantic icon to the user; wait for the canonical catalogue to be extended |
| Foreign icon library, copied SVG, emoji, or approximate icon workaround | Canonical Kura icon export only |

## 5. Definition of done

Component is done only when: intake decision recorded → all values trace to
tokens → BoardUI checklist passes → all states story'd incl. 320px → play +
unit tests green → check:reui-ownership passes → build passes → screenshots
verified at 1440 and 320. Installation is intake; only this list is 
integration.
