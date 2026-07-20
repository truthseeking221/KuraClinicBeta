---
name: reui-intake
description: Promote ReUI MCP registry code into Kura-owned components without retaining a permanent ReUI namespace.
---

# ReUI intake and ownership

ReUI is an upstream implementation source, not a Kura design system or product
namespace.

Before intake, read
[`../../../docs/architecture/storybook-reuse-and-component-intake.md`](../../../docs/architecture/storybook-reuse-and-component-intake.md)
completely and apply its Storybook search, contract comparison, ownership, and
reuse decision gate. ReUI-specific intake begins only after that classification
is complete.

Before using ReUI MCP, identify the final owner and search for an existing
Kura implementation. Choose `REUSE`, `EXTEND`, `REPLACE`, or `CREATE`; prefer
reuse or extension.

Use ReUI MCP to search, inspect APIs/examples, validate usage, and get the
install command. Install raw registry code only in
`.tmp/reui-intake/<ticket>/<item>/`.

Never intake only the variant shown in a demo. Inspect the complete component
source, registry metadata, API, examples, subcomponents, compositions, states,
responsive behavior, and accessibility contract. Build a full family and
variant inventory before implementation. Promote and test every Kura-compatible
capability in Storybook; document every excluded variant and its reason, and
ask for confirmation before a materially ambiguous exclusion.

Promote primitives to `src/components/ui`, generic patterns to
`src/components/shared`, and domain compositions to `src/features/<module>`.
Split page blocks across those owners rather than adding a whole block to
shared UI.

Never create or retain `src/reui`, `components/reui`, `stories/reui`, public
exports beginning with `ReUI`, or Storybook titles beginning with `ReUI/`.
Use `Design System`, `Clinic`, or `Platform Admin` as the Storybook taxonomy;
retain source provenance only through tags such as `source-reui` and
`adapted-kura`.

Replace upstream styling with Kura tokens, typography, density, focus behavior,
and the Kura icon system. Preserve or improve accessibility and keyboard
behavior. Add colocated stories/tests, export public shared components from the
canonical barrel, delete the intake directory, then run:

```bash
npm run check:reui-ownership
```

A task is incomplete while any permanent ReUI namespace remains.
