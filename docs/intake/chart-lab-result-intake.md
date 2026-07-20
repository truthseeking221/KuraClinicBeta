# Intake record — Charts + Lab Result family

Date: 2026-07-16 · Ticket: chart-lab-result · Owner: leon@kura.med

Decision ledger required by `docs/architecture/storybook-reuse-and-component-intake.md`.
Sources consulted: (1) this repo's canonical exports + stories, (2) ReUI MCP registry
(25 `c-chart-*` free examples + premium chart blocks; raw source intaken to
`.tmp/reui-intake/chart-lab-result/`), (3) kura-platform backend (test-ms, lab-ms,
`docs/design/results/results-product-spec.md`, status-model flows 06/07/09,
ADR-0047), (4) legacy FINAL DCM prototype `LabHistory` engine (feature/UX reference),
(5) Figma `Kura-Design` node `182:167149` "Flowsheet F — single visit (clinical)".

## Backend cross-check — which charts are justified

| Chart need | Backend evidence | Verdict |
|---|---|---|
| Per-analyte trend + reference zones | Results spec RS-5: doctor longitudinal row = latest value + flag + range + sparkline, expandable history. `reference_range_tier` gives numeric zone bounds + severity — chart-ready today | **BUILD** (`LabTrendChart`, `LabSparkline`) |
| First-visit single-result range gauge | One released value has no trend; Figma 182:167149 defines the reference-band presentation; `resolveTier` semantics (half-open `[lower, upper)`) | **BUILD** (`LabRangeBand`) |
| Qualitative / sparse-draw strips | `value_type qn\|ord\|semi_qn`, `text_value` tiers; prototype QualStrip/DrawStrip | **BUILD** (`LabDrawStrip`) |
| Generic dashboard charts (bar/area/pie/radial/funnel) | No analytics/aggregate/volume RPC exists anywhere (pricing.proto = price resolution only; no admin analytics endpoints) | **REJECT for now** — no data contract; revisit when an analytics API exists |

## Primary decisions

| Element | Decision | Evidence |
|---|---|---|
| ReUI/shadcn `chart` machinery (ChartContainer/Tooltip/Legend + recharts 3.8) | **REJECT as dependency; architecture referenced** | Raw source inspected in `.tmp/reui-intake/chart-lab-result/`. Tailwind-coupled (global recharts selector restyling, `cn`), needs `recharts`+`lucide-react` deps. The only justified Kura charts are three small bespoke clinical visuals with exact Figma/prototype specs — proven implementable as pure token-driven SVG (prototype `LabHistory` engine, zero deps). Adopted from upstream architecture: series-config→CSS-custom-property contract and `tabular-nums` tooltip discipline. |
| ReUI `c-chart-*` decorative variants (3D, isometric, glow dots, gradient, stripe/dot/crosshatch pattern fills, radar) | **REJECT** | DESIGN.md anti-references: "no glow", "no decorative data-viz", color-is-meaning. No clinical or operational use case maps to them. |
| Lab result family (`src/features/results/`) | **FEATURE-OWN (COMPOSE house primitives)** | Fresh Storybook index had no doctor longitudinal result capability (searched: result, lab, trend, sparkline, range, gauge, flowsheet). The owning journey is Doctor DCM result review; patient result delivery remains a separate future persona surface. Composes canonical `Badge`, `Button`, `Collapsible`, `HoverCard`, `Sheet`, `Alert`, `Input`, `Select`, and `SegmentedToggle`. |
| `--lab-range-*` band tokens | **EXTEND tokens.css** | Zone tints map to existing status ramps (success/warn/danger 100–200), light + dark; no new hex beyond mapped aliases (Figma hex values are bound to the nearest repo ramp; repo wins over Figma). |
| Result history disclosure | **COMPOSE canonical interaction owners** | Pointer/focus uses canonical `HoverCard` for supplementary preview. Click/tap opens canonical focus-managed `Sheet`; narrow screens use the bottom-sheet presentation. The row is never wrapped in an interactive button. |

## Data contract (design-target, documented against backend)

Backend has **no typed result-value columns today** (`tests.channels` jsonb is dark;
`TestReply` carries no values and the clinic BFF has no doctor results route).
Product explicitly approved Storybook running ahead as a **design target**.
`LabAnalyteResult` therefore records the future longitudinal join while keeping
executable identities explicit:

- `TestStatus` (10 values; **only `released` is human-facing** — pre-release rows render state, never value)
- `TestVerificationMode` `manual | crelio_autoverified | crelio_flagged` (provenance chip)
- Tier `severity` `normal | abnormal | critical` (flag axis — no H/L columns; direction derived from tier order around the normal tier)
- `orderLineItemId`, `testId`, and `supersedesTestId` — partial progress counts active order lines, panel analytes collapse to one line, and redraw predecessors are excluded before roll-up.
- `OrderResultStatus` — partial episode per ADR-0047: `partially_complete` = ≥1 terminal line ∧ not all terminal; terminal = `released|cancelled|dismissed`; all-terminal → `completed` iff ≥1 released else `cancelled`. UI copy distinguishes released results from unavailable terminal lines.
- Range model: `findApplicableRange(gender, ageDays)` half-open `[age_min_days, age_max_days)`; `resolveTier` half-open `[lower_bound, upper_bound)`, `null` = unbounded; `text_value` exact match for ord/semi_qn.
- Critical means an explicit catalog panic tier. Disease-classification thresholds such as HbA1c diabetes range remain abnormal unless the catalog separately defines panic bounds.
- Historical points carry episode identity and may have an unavailable timestamp. Unknown dates never crash or receive invented temporal placement.

Backend/doc ref consulted: `Kura-med/kura-platform@938b172b05d3bcbeabbcdb9226ff2d06ce7afa36`,
including `docs/design/results/results-product-spec.md`,
`docs/adr/ADR-0047-order-rollup-void-amendments.md`, the clinic BFF, test-ms,
lab-ms, and `libs/contracts`.

## Exclusions (documented per full-variant-coverage rule)

- **Critical escalation timing and downstream notification policy** — the Storybook flow includes acknowledgment and closure gating as a design target, but does not invent escalation timers, recipients, idempotency, audit payloads, or concurrency behavior that the backend has not mapped.
- **Patient episode OTP view (RS-8/9)** — patient persona surface; bilingual KM/EN plain-language flags out of scope for the clinic family. Follow-up ticket.
- **Amended reports** — backend defers (D13/OP-6); released values immutable in v1.
- **SI/conventional dual units** — backend has a single `default_unit` per analyte, no conversion layer; prototype's dual display was catalog-driven. Excluded until a units contract exists.
- **Cross-patient review worklist/queue** — this delivery owns the per-patient workspace and result-review closure flow only. Queue assignment, SLAs, ownership transfer, and worklist sorting need their own backend and journey contract.

## Prototype-verified interaction inventory carried into stories

Severity classification (normal/low/high/crit ± qualitative), groups
(out/watch/resolved/stale/noref/ok), "Not in this draw — absence is not read as
normal", sparkline gap-on-missing (never zero), real-time X spacing, active chart
point hover/focus, full released-history disclosure, collapsible catalog sections,
search, flag filter, Latest only/Full history, mobile bottom sheet, progressive
"n of m ready", redraw replacement, add-on reopening, unavailable terminal lines,
offline/stale/read-only/permission/error/empty/loading states, critical
acknowledgment, and closure gating.
