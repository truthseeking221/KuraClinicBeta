# Intake record — Date Selector

Date: 2026-07-16 · Ticket: `storybook-components` · Owner: `src/components/ui`

This assessment applies the external-component intake, visual-binding, and mobile-responsiveness gates. ReUI's published Date Selector API and four documented composition examples were inspected as an interaction reference. No ReUI source was copied or promoted, so no temporary registry source is retained.

## Kura use case and primary decision

The generic task is to enter or verify one exact date or an inclusive date range. The caller owns the data model, authorization, locale policy, validation, availability, persistence, audit trail, and any resulting action. This is a visual primitive: it has no route, persona-specific BFF, REST or gRPC call, domain status, mutation, or claim of backend support.

| Candidate | Decision | Evidence and final owner |
| --- | --- | --- |
| `Calendar` date grid | **REUSE** | `src/components/ui/calendar.tsx` already owns keyboard navigation, single/range selection, bounds, disabled dates, locale, density, and mobile layout. |
| `Field` and `Input` form anatomy | **REUSE** | `src/components/ui/field.tsx` and `src/components/ui/input.tsx` already own labels, descriptions, errors, native date entry, invalid state, and touch-safe controls. |
| Anchored click disclosure | **CREATE** | No canonical click-triggered anchored disclosure existed. `src/components/ui/popover.tsx` is the smallest generic owner for a short reversible task. |
| Exact date/date-range composition | **COMPOSE** | `src/components/ui/date-selector.tsx` synchronizes Kura Input and Calendar. It owns local date parsing only and does not create a parallel calendar. |

The resulting public components are `Popover` and `DateSelector`; neither has a ReUI namespace. Their Stories render the production exports directly.

## ReUI family inventory

ReUI documents four layouts: a basic inline selector, Popover, Dialog, and Dropdown Menu. Its API also offers day, month, quarter, half-year, and year periods; is/before/after/between filter operators; direct input; two-month display; disabled dates; i18n; and apply/cancel composition.

| Incoming capability | Kura outcome |
| --- | --- |
| Exact single date, range, typed date, disabled/min/max dates, locale, and week start | Retained in `DateSelector`, composed with `Calendar`. |
| Inline selector, anchored Popover, and Dialog composition | Retained through official Stories; the caller controls draft/apply semantics. |
| Keyboard calendar navigation, focus, labels, read-only, loading, density and mobile grid behavior | Reused from `Calendar`; the selector adds labelled native inputs and error recovery. |
| `is`, `before`, `after`, `between` operators | Excluded: an operator changes query semantics and needs a real feature endpoint/DTO contract. |
| Month, quarter, half-year, and year periods | Excluded: reporting/filter period data needs an owning domain contract, not a generic exact-date field. |
| Natural-language parsing such as `Q4` | Excluded: locale parsing and query interpretation need an owning contract. |
| Dropdown Menu presentation | Excluded: a date-entry task needs form semantics and a stable reversible Popover or Dialog, not a menu. |
| Availability, appointments, pricing, presets, and apply-side effects | Excluded: these have workflow, authorization, stale-data, and audit implications owned by a feature and its backend. |

## Kura visual binding map

| ReUI concern | Kura owner |
| --- | --- |
| Calendar UI and `react-day-picker` styling | Canonical `Calendar`, Kura semantic tokens, and CSS-module density behavior. |
| Input, label, help, and validation UI | Canonical `Field` and `Input`. |
| Popover disclosure and floating positioning | `Popover` over Base UI primitives, with `--card`, `--card-foreground`, `--border`, `--radius-overlay`, `--elevation-popover`, and `--elevation-focus`. |
| ReUI icons / Lucide imports | None retained. `DateSelector` uses no icon; any trigger icon is supplied by the caller from canonical Kura icons. |
| Raw colors, typography, spacing, shadow, radius, and breakpoints | None retained. New CSS uses only Kura tokens, semantic colors, token-based layout, root density, and a 30rem range-input reflow. |

## States, accessibility, and responsive contract

Official stories cover single date, range, constraints/error, read-only, Popover draft/apply, Dialog, locale/week start, and mobile. The components preserve labels, error announcements, native keyboard date entry, Calendar roving keyboard navigation, visible focus, Escape/outside dismissal in the Popover, and restored trigger context. The range inputs stack below 480px; the Popover is viewport-contained; a Dialog is the explicit larger mobile alternative. `Calendar` retains its existing 320, 360, 390, 412, 480, 768, 1024, desktop, long-content, density, light, and dark verification contract.

Backend compatibility is intentionally not asserted: the public Kura Platform repository was not available to inspect in this workspace, and this primitive does not represent a domain action or endpoint.

## Validation required for promotion

Run lint, targeted type checking, Storybook interaction tests, Storybook build, `npm run check:reui-ownership`, dark/light rendering, density modes, and the responsive viewport matrix before handoff.
