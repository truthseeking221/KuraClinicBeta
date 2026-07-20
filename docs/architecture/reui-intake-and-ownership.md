# ReUI intake and ownership

## Policy

ReUI is an upstream implementation source. It is not a Kura namespace, a
parallel component library, or a top-level Storybook category. Every component
obtained through ReUI MCP must be promoted into a Kura-owned location before
the task is complete.

## Ownership decision

Decide ownership before running an install command.

| Component kind | Canonical owner |
| --- | --- |
| Cross-product primitive | `src/components/ui/` |
| Domain-neutral shared pattern | `src/components/shared/` |
| Clinical pattern proven across two clinic modules | Future clinical shared package |
| Single-module domain composition | `src/features/<module>/` |
| Page block/template | Split into the owners above; do not promote the entire block to shared UI |

Do not create names such as `ReUIDataGrid`, `ReUIWizard`, or `ReUIBadge`.

## Required workflow

1. Use ReUI MCP to search, inspect its API and examples, validate usage, and
   obtain the exact install command.
2. Search the project for an existing component, export, story, and module
   implementation. Record one decision: `REUSE`, `EXTEND`, `REPLACE`, or
   `CREATE`.
3. Install raw code only in `.tmp/reui-intake/<ticket>/<registry-item>/`.
4. Adapt the selected code to Kura:
   - name and place it by ownership;
   - use Kura semantic color, typography, spacing, radius, density, focus, and
     icon conventions;
   - preserve or improve ARIA and keyboard behavior;
   - remove demo content and redesign the API around the actual product use;
   - add colocated stories and tests;
   - export shared public components from their canonical barrel.
5. Delete the intake directory and run `npm run check:reui-ownership`.

## Full component-family coverage

Do not intake only the ReUI variant shown in a demo. Inspect the complete
registry family, including supported variants, intents, sizes, densities,
orientations, layouts, interaction and data states, responsive behavior,
subcomponents, compositions, keyboard behavior, focus management, and screen
reader semantics.

Every retained Kura-compatible capability must be adapted and testable in the
canonical Storybook owner. Exclude a variant only when it conflicts with Kura,
is unsafe or out of scope, or duplicates an exact indexed Kura capability.
Document each exclusion, its evidence, reason, and canonical replacement. Ask
for confirmation before making a materially ambiguous exclusion.

## Storybook taxonomy

Vendor origin never determines the sidebar. Stories must live under one of the
existing product categories:

```text
Design System
Clinic
Platform Admin
```

Use tags or docs metadata to retain provenance, for example `source-reui` and
`adapted-kura`. Never use titles beginning with `ReUI/`.

## Completion rule

A task involving ReUI is incomplete while a permanent ReUI namespace remains
in source, exports, or Storybook. The project guard checks for permanent
`reui` folders, `ReUI/` story titles, and public exports beginning with
`ReUI`.
