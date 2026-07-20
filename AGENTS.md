# Repository Agent Guidance

## Minimalist law

- Every content change and every UI design change in this repository passes the clarity gate in [`.codex/skills/minimalist/SKILL.md`](.codex/skills/minimalist/SKILL.md). Read it completely before writing or changing user-facing text, components, stories, docs pages, or screens.
- The gate covers UI copy, visible elements, Storybook story and docs prose, demo fixtures, and agent-authored documentation.
- Keep only what helps the user move forward. Give every element and every word a reason to exist. Remove UI before adding UI, and reuse an existing pattern before creating a new one.
- Minimalism decides what stays; `design-kura-ui` decides how what stays is built and finished. Minimalism never overrides clinical safety, authority and permission context, money and legal context, honest system state, icon authority, or Storybook ownership. If simplification would hide any of those, change the composition instead of deleting the information.
- Work is not done until the primary action is obvious within three seconds, no copy repeats an adjacent element, empty, loading, error, and success states are specific, and the reduction is verified in rendered output.

## Language

- Write agent-authored instructions, documentation, code comments, Storybook copy, and UI copy in English unless the user explicitly requests another language.

## Kura UI north star

- Before designing, implementing, refining, reviewing, or visually verifying any app or Storybook UI, read and follow [`.codex/skills/design-kura-ui/SKILL.md`](.codex/skills/design-kura-ui/SKILL.md) completely.
- Treat `design-kura-ui` as the repository's UI craft, implementation-fidelity, responsive-design, state-coverage, accessibility, and visual-verification standard.
- Before creating, adapting, registering, reviewing, or approving reusable components, Storybook stories or flows, ReUI/shadcn intake, or BoardUI-style visual finishing, also read and follow [the ReUI × BoardUI × Kura component build guide](.codex/skills/design-kura-ui/references/reui-boardui-kura-component-build-guide.md) completely.
- Pair it with `design-kura` when clinical workflow, safety, authority, permissions, roles, domain state, or product behavior affects the decision.
- Also follow any more specific repository skill or architecture document that applies. If guidance conflicts, use the source-of-truth precedence defined by `design-kura-ui`.

## Icon authority

- Use icons only from the canonical Storybook inventory at `Design System/Foundations/Icons`, through approved Kura icon exports.
- If the required semantic icon is missing, stop the icon-dependent implementation and report it to the user immediately with its intended meaning, action, context, and state or direction.
- Do not use another icon library, vendor deep import, copied or hand-drawn SVG, emoji, Unicode symbol, semantically incorrect substitute, or local icon workaround.

## Storybook authority

- Treat Storybook as Kura's canonical UI construction and verification surface, not as a demo gallery.
- Search existing stories, components, tokens, and approved patterns before creating or importing UI. Reuse before extending; extend before creating.
- Keep reusable UI owned by the canonical Storybook component or composition rather than duplicating it in feature code.
- Keep source responsibilities distinct: ReUI/shadcn supplies behavioral architecture, BoardUI supplies finish discipline, and Kura owns tokens, taxonomy, safety, states, tests, and conflict resolution.
- Require realistic content, applicable interaction and system states, responsive behavior, accessibility, token compliance, and rendered visual verification before calling Storybook work complete.
- Do not describe an interface as pixel perfect without direct rendered verification at the governing viewport.
- Declare release readiness honestly: every Storybook domain carries a row in `src/components/foundations/readiness-data.ts` (Ready / Partial / Gap / Deprecated) referenced from its story metadata via `parameters.kura.readiness`, and the `Design System/Governance/Release Readiness` board is the single source of truth. A level moves to Ready only when the real backend contract is consumed, never because the UI looks finished.

## Prototype app authority (src/app)

- No UI exists in the prototype app that does not originate from Storybook. Every visible component, pattern, teaser, and demo tool lands in Storybook first (component, story, kura metadata, readiness), then the app imports it from its canonical owner.
- `src/app/_demo/` holds non-visual wiring only: session store, route mapping, fixture adapters derived from canonical sources, thin wrappers passing router/session into Storybook-owned components, and pure layout-glue CSS. Fixtures come from each feature's `demo-data`; invented data is a violation.
- Never restyle, override, or re-implement a feature at page level. The app imports the same source modules Storybook renders — no copies — so editing Storybook source syncs the app instantly.
