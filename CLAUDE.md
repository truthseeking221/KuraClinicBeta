# Claude Code Project Guidance

- Read and follow [`AGENTS.md`](AGENTS.md) as the repository-wide instruction source.
- Before writing or changing any content or UI design, read [the canonical `minimalist` skill](.codex/skills/minimalist/SKILL.md) completely and pass its clarity gate. It applies to UI copy, visible elements, Storybook stories and docs, demo fixtures, and documentation.
- Minimalism decides what stays; `design-kura-ui` decides how it is built. Never let simplification remove clinical safety, authority, money, legal, or honest system-state context.
- Before any app or Storybook UI work, read [the canonical `design-kura-ui` skill](.codex/skills/design-kura-ui/SKILL.md) completely.
- Before creating, adapting, registering, reviewing, or approving reusable components, Storybook stories or flows, ReUI/shadcn intake, or BoardUI-style finishing, also read [the ReUI × BoardUI × Kura component build guide](.codex/skills/design-kura-ui/references/reui-boardui-kura-component-build-guide.md) completely.
- Treat the `.codex` copies as canonical. Do not fork or silently reinterpret their rules inside `.claude`.
- Use icons only from the canonical Storybook inventory at `Design System/Foundations/Icons`. If an icon is missing, stop the icon-dependent implementation and report it to the user immediately; do not use another library or workaround.
- Keep all agent-authored instructions, documentation, comments, Storybook copy, and UI copy in English unless the user explicitly requests another language.
