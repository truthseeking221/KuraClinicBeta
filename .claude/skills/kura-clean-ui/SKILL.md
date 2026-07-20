---
name: kura-clean-ui
description: Design, audit, refactor, or review Kura product interfaces for clarity, task focus, hierarchy, grouping, typography, spacing, color, interaction, mobile responsiveness, touch safety, accessibility, trust, clinical safety, ReUI adaptation, and design-system consistency. Use for frontend screens, responsive components, mobile and tablet behavior, workflows, component compositions, Storybook stories, ReUI MCP components or blocks, visual-polish passes, UX reviews, or requests to make an interface cleaner, safer, simpler, easier to scan, or easier to use.
---

# Kura Clean UI

Build interfaces that make the user's next decision obvious, preserve context, and communicate state without unnecessary visual weight.

## Required reference

Read [references/clean-ui-principles.md](references/clean-ui-principles.md) before substantial UI design, implementation, refactoring, or review. Treat its 40 principles, decision filter, and review checklist as the quality standard.

Also read [references/grouping-and-container-restraint.md](references/grouping-and-container-restraint.md) before making or reviewing grouping, section, panel, card, border, divider, background, radius, or elevation decisions. Treat its weakest-sufficient-signal rule, container removal test, nested-container policy, density guidance, and mobile guidance as mandatory.

When evaluating, importing, adapting, or reviewing anything obtained through ReUI MCP, also read [references/reui-component-adaptation.md](references/reui-component-adaptation.md) completely. Treat it as a mandatory product, workflow, data, safety, and content contract—not optional guidance.

Before creating, importing, adapting, implementing, or registering UI obtained from ReUI MCP, Figma, screenshots, code examples, prototypes, reference products, open-source libraries, legacy implementations, or any other external source, also read [../../../docs/architecture/storybook-reuse-and-component-intake.md](../../../docs/architecture/storybook-reuse-and-component-intake.md) completely. Treat it as the mandatory Storybook reuse and component classification gate.

Before designing, implementing, reviewing, approving, or registering any reusable component or responsive composition, also read [../../../docs/architecture/storybook-mobile-responsiveness-and-design.md](../../../docs/architecture/storybook-mobile-responsiveness-and-design.md) completely. Treat mobile behavior, official mobile stories, touch safety, and responsive tests as mandatory parts of the component contract.

Also comply with the repository's `AGENTS.md`, canonical Storybook composition rules, and ReUI intake and ownership rules. This skill does not authorize inventing local primitives or bypassing existing design-system authority.

## Workflow

### 1. Establish the task

State the screen's primary task in one sentence. Identify:

- the user's current context;
- the decision they must make;
- the primary action;
- the information required to act confidently;
- the likely failure, empty, permission, and recovery conditions.

Do not begin from layout. Begin from content, behavior, decisions, and state.

### 2. Inventory the interface

List every proposed content block, control, action, status, and message. Classify each item as primary, secondary, or tertiary. Remove duplication and defer information that is not needed for the current decision.

Apply the six-question decision filter from the reference to every meaningful element:

1. Purpose
2. Priority
3. Placement
4. Presentation
5. State
6. Removal

Remove or redesign elements that cannot answer the filter clearly.

### 3. Reuse system authority

Search Storybook and the approved ReUI intake path before creating UI. Reuse canonical components, tokens, interaction patterns, and compositions. Use semantic tokens for color, typography, spacing, radius, and elevation. Do not introduce one-off visual values to solve local composition problems.

Before retaining any visible surface, complete the container audit: decide
whether spacing, alignment, typography, tonal distinction, or a divider is
sufficient. Give every remaining box a meaningful independent object, state,
action scope, selection, lifecycle, safety boundary, repeated-unit, or overlay
justification. Do not let technical wrappers or upstream demo shells become
visible containers.

### 4. Compose the information

Create a clear three-level hierarchy. Group related content through proximity and alignment before using containers, borders, or background fills. Ensure spacing within a group is smaller than spacing between groups.

Keep the primary action visually dominant. De-emphasize supporting actions and reveal advanced options progressively. Prefer recognition over recall and direct manipulation over hidden behavior.

Start reusable compositions at the narrow mobile constraint. Reflow, stack, reorder, disclose, or transform before shrinking legibility or touch targets. Preserve the primary task, clinical safety information, and reachable primary action across every supported width.

### 5. Define behavior and states

Make every interactive element identifiable before interaction. Provide immediate feedback, preserve user input, prevent avoidable errors, and explain recovery in plain language.

Specify all applicable states, including default, hover, focus, active, selected, loading, disabled, success, warning, error, empty, partial, permission-limited, and offline. Do not treat loading, empty, or error states as afterthoughts.

### 6. Protect accessibility and trust

Verify keyboard operation, visible focus, contrast, zoom behavior, target size, non-color status cues, readable labels, and reduced-motion support. Never hide costs, conditions, risks, consequences, or legitimate decline paths to increase conversion.

### 7. Audit before handoff

Run the 20-item review checklist in the reference. Inspect the result at realistic viewport sizes and with realistic content extremes. Confirm that removing any remaining element would weaken meaning, confidence, or task completion.

Run the grouping-and-container silent audit and final simplification pass. Remove
decorative shadows, non-semantic borders/backgrounds, redundant radii, and
unnecessary nesting. Verify that the UI remains one coherent product surface,
does not become a mobile card tunnel, and preserves clinical or operational
safety when simplified.

## Required handoff

Report:

- the primary task and action;
- canonical patterns and tokens reused;
- elements removed, merged, or progressively disclosed;
- the grouping decision for each visible box, divider, and elevated surface;
- interaction and state coverage;
- accessibility and trust safeguards;
- validation performed and any unresolved risk.

Do not claim completion when the interface still depends on unexplained placeholders, missing states, inaccessible interactions, or unapproved local primitives.

For ReUI work, never ask how to insert a ReUI demo into Kura. Ask what the Kura workflow requires and which parts of ReUI can help implement it correctly.
