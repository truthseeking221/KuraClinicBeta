# Canonical Story Guidance

- Read and follow [`../../.codex/skills/design-kura-ui/SKILL.md`](../../.codex/skills/design-kura-ui/SKILL.md) completely before creating, editing, reviewing, or approving a story or its UI implementation.
- Read and follow [the ReUI × BoardUI × Kura component build guide](../../.codex/skills/design-kura-ui/references/reui-boardui-kura-component-build-guide.md) completely for every reusable component, adapted component, story, and flow.
- Treat the skill as mandatory, not optional, for hierarchy, density, grouping, component ownership, token use, responsive behavior, accessibility, state coverage, realistic fixtures, visual finishing, and rendered verification.
- Search the current Storybook inventory before creating a component or composition. Reuse before extending; extend before creating; create only for a genuine semantic, behavioral, state, accessibility, or clinical-safety responsibility.
- Use icons only from `Design System/Foundations/Icons` through approved Kura icon exports. If a required semantic icon is missing, stop the icon-dependent work and report it to the user immediately; never substitute another library, copied SVG, emoji, approximate glyph, or local workaround.
- Cover applicable interaction, loading, empty, error, permission, data-extreme, narrow-viewport, and wide-viewport states with realistic Kura content.
- Enforce the component guide's intake record, Kura metadata and tags, role-based play tests, ownership check, build checks, and verified 1440px and 320px screenshots.
- Do not call a story production-ready or pixel perfect until it has been rendered and verified at representative viewports.
- Keep story titles, descriptions, controls, fixtures, documentation, comments, and UI copy in English unless the user explicitly requests another language.
