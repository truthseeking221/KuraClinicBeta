# Intake record — Filters

Date: 2026-07-16 · Ticket: `storybook-components` · Owner: `src/components/shared/filters`

This assessment applies the external-component intake, visual-binding, and mobile-responsiveness gates. ReUI’s published Filters API, all nine documented examples, and its public registry source were inspected as an interaction reference. The ReUI MCP registry was not available in this workspace. No ReUI source was copied or promoted, so no temporary registry source is retained.

## Kura use case and primary decision

The generic task is to build, inspect, revise, and remove a reversible set of constraints for a list or table. The caller owns the route, persona, real field meanings, URL serialization, API mapping, permissions, validation policy, error recovery, audit record, and any domain consequence. This is a shared visual pattern: it exposes no backend action, status, clinical decision, or persistence claim.

| Candidate | Decision | Evidence and final owner |
| --- | --- | --- |
| Existing `Filters` shared pattern | **REPLACE** | `src/components/shared/filters` had no production consumers, but its permanent form panel and `Record<field, value>` API were structurally incompatible with ReUI’s controlled query-builder chips. The canonical owner and Storybook title are retained while the implementation is replaced. |
| Kura `Button`, `IconButton`, `Input`, `Checkbox`, `Kbd`, and `Popover` | **REUSE** | These canonical primitives already own control anatomy, focus, touch target, labels, density, iconography, and anchored overlay behavior. |
| Kura `DataGrid` | **COMPOSE** | A feature can map the controlled `Filter[]` value to its table state or a contract-backed request. The shared filter pattern does not depend on one grid schema. |
| Route-owned URL state and schema validation | **FEATURE-OWN** | Parameter names, Zod schemas, access restrictions, and API serialization are contract-specific, so the shared component does not create them. |

The promoted public API is controlled `Filter[]`, where each filter has `id`, `field`, `operator`, and `values`. This matches the ReUI interaction architecture without retaining its component namespace, source, CSS, icons, or visual values.

## ReUI family inventory

| Incoming capability | Kura outcome |
| --- | --- |
| Add-filter menu, chip composition, field → operator → value sequence, remove action | Retained. `Filters` renders chip groups with operator and value popovers; the add menu directly selects a value for select and multiselect fields. |
| Text, select, multiselect, custom, and separator field types | Retained. Text supports pattern/custom validation; custom fields own a reusable rendered value control. |
| Custom operators, default operator, empty/not-empty semantics, multi-select limit, custom option values | Retained in the controlled field configuration. Empty/not-empty clears values by design. |
| Flat/group-compatible field configuration, searchable options, custom trigger, collapsed trigger, sizes, full radius, multiple fields, keyboard shortcut, and i18n | Retained. Kura exposes `compact`, `sm`, `default`, and `lg`; `sm` is the default for frequent operational use. |
| Controlled option replacement / async source | Retained as a controlled configuration update; the shared pattern never fetches or claims option provenance. |
| TanStack table mapping | Retained as an owning feature composition point; official Storybook demonstrates the controlled state only. |
| Automatic `nuqs` URL persistence and automatic Zod schemas | Excluded from shared ownership. These require real route parameter, validation, permission, and backend contracts. |

## Kura visual binding map

| ReUI concern | Kura owner |
| --- | --- |
| Buttons, chip controls, remove action, and touch targets | `Button` and `IconButton` with Kura control tokens. |
| Field/value search and validated text input | Canonical `Input`. |
| Options and selection indication | Canonical `Checkbox` and `CheckIcon`. |
| Add/operator/value disclosure, focus restoration, Escape/outside dismissal | Canonical Base UI-backed `Popover`. |
| Search/filter/chevron/close/check glyphs | Canonical Kura icon exports only. |
| Colors, typography, spacing, radius, elevation, motion, density, and responsive containment | Semantic Kura tokens and the root density mechanism only; no raw palette values, external icon library, source CSS, or ReUI namespace is retained. |

## State, accessibility, and responsive contract

Stories cover field selection, operator editing, custom trigger, compact/small/default/large controls, custom renderer, controlled async options, DataGrid composition, Vietnamese labels, shortcut activation, single-filter-per-field, mobile interaction, and long content. On fine-pointer desktop, `compact` and `sm` use the Kura 32px and 36px visual control heights; coarse-pointer and narrow contexts retain the 44px Kura touch target. Each chip has a labelled group and a named remove action; all menus and option lists expose labelled popovers/listbox semantics; option checks and selected operators are announced. Keyboard shortcut activation ignores editable targets. Native Kura focus treatment, Escape/outside dismissal, and reduced-motion behavior are inherited from the canonical primitives.

At widths below 480px, the trigger and chip groups become full width, long field labels wrap, the text value keeps its editable area, and all menus are viewport-contained and scrollable. This preserves the primary refine task without hover-only behavior or clipped options. The existing root density attribute continues to adjust the composed canonical controls.

Backend compatibility is intentionally not asserted: the Kura Platform source was not available in this workspace, and this generic component does not represent a domain endpoint or business transition.

## Validation required for promotion

Run lint, full type checking, targeted Storybook interaction tests, Storybook build, `npm run check:reui-ownership`, light/dark rendering, compact/cozy/comfortable density checks, and the required responsive viewport matrix before handoff.
