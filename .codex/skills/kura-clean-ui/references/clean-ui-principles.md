# Clean UI Principles

This reference defines the product-interface standard for Kura. Clean UI is not an aesthetic of empty space. It is an interface whose meaning, priority, behavior, and state are easy to understand under real task pressure.

## Contents

1. [What clean UI must answer](#what-clean-ui-must-answer)
2. [Clarity](#1-clarity)
3. [Visual hierarchy](#2-visual-hierarchy)
4. [Grouping and information structure](#3-grouping-and-information-structure)
5. [Spacing and layout](#4-spacing-and-layout)
6. [Typography](#5-typography)
7. [Color, borders, and depth](#6-color-borders-and-depth)
8. [Interaction](#7-interaction)
9. [Consistency and the design system](#8-consistency-and-the-design-system)
10. [Accessibility and trust](#9-accessibility-and-trust)
11. [Clean UI decision filter](#clean-ui-decision-filter)
12. [Clean UI review checklist](#clean-ui-review-checklist)
13. [Final principle](#final-principle)

## What clean UI must answer

A user should be able to answer these questions without interpretation or memory work:

- Where am I?
- What is happening now?
- What matters most?
- What can I do next?
- What will happen if I act?
- How can I recover if something goes wrong?

Every visual and behavioral decision should improve at least one of these answers.

## 1. Clarity

### 1. Give each screen one primary cognitive goal

A screen may support several operations, but it should organize them around one dominant user objective. If multiple unrelated goals compete at the same level, split the flow, stage the decisions, or establish a clear primary path.

### 2. Prefer recognition over recall

Keep choices, context, constraints, and relevant prior values visible where they are needed. Do not force users to remember information from another screen, decode arbitrary icons, or infer hidden system rules.

### 3. Make controls self-explanatory

Labels should describe outcomes, not implementation details. Icons require labels or universally understood context when ambiguity is possible. Interactive styling must communicate affordance before hover or click.

### 4. Remove ambiguity before removing detail

Minimalism is useful only when meaning survives. Keep the explanation, qualifier, unit, status, or consequence required for a confident decision. Remove decorative and duplicate information first.

## 2. Visual hierarchy

### 5. Establish a clear reading order

The eye should move from context to the most important information, then to the primary action and supporting detail. Use position, type, spacing, and contrast consistently to create that path.

### 6. Limit hierarchy to meaningful levels

Use a small, repeatable hierarchy—normally primary, secondary, and tertiary. Too many near-identical heading weights or emphasis styles make the interface harder to scan.

### 7. Make primary actions dominant by context

Use one visually dominant action within a decision area. Secondary and destructive actions must remain discoverable without competing with the intended next step.

### 8. De-emphasize rather than indiscriminately hide

Secondary information can use lower contrast, smaller type, quieter placement, or progressive disclosure. Do not hide information that determines safety, cost, eligibility, or the meaning of an action.

## 3. Grouping and information structure

### 9. Use proximity to express relationship

Place related labels, values, controls, and feedback close together. Separate unrelated groups with a visibly larger interval. Users should not need borders to infer every relationship.

### 10. Align elements to reveal structure

Use shared edges and baselines to make comparison and grouping effortless. Avoid accidental offsets that imply relationships or hierarchy that do not exist.

### 11. Match information structure to the user's mental model

Organize content around the workflow and concepts users recognize, not around backend entities, implementation boundaries, or internal team ownership.

### 12. Use containers only when they add meaning

Cards, panels, and sections should represent a real unit, boundary, interaction context, or state. Do not wrap every group in a card; excessive containers flatten hierarchy and add visual noise.

## 4. Spacing and layout

### 13. Use spacing as a semantic system

Spacing communicates containment, grouping, sequence, and hierarchy. Choose values from the canonical scale and apply the same relationship consistently across comparable patterns.

### 14. Keep inner spacing smaller than outer spacing

The gap between elements within a group must be smaller than the gap between adjacent groups. This simple rule should remain visible at every nesting level.

### 15. Preserve rhythm and density intentionally

Repeated rows, sections, labels, and controls should follow a stable vertical and horizontal rhythm. Density should match task frequency and complexity; high-frequency operational work may be compact, but never cramped or ambiguous.

### 16. Use whitespace to reduce cognitive load, not to decorate

Whitespace should separate decisions and reveal structure. Large empty areas without structural purpose can increase travel distance and obscure relationships just as much as crowding can.

## 5. Typography

### 17. Use type to communicate role

Typography must distinguish page context, section titles, labels, values, instructions, metadata, and feedback. Do not rely on font size alone; combine size, weight, line height, and color through approved tokens.

### 18. Optimize for scanning before close reading

Use descriptive headings, short labels, front-loaded language, and concise paragraphs. Put critical qualifiers and differentiators where users naturally scan.

### 19. Maintain readable line length and line height

Avoid overly wide text blocks and compressed multiline copy. Reading comfort is a functional requirement, especially for guidance, error recovery, and clinical or administrative detail.

### 20. Use weight sparingly

If everything is bold, nothing is emphasized. Reserve stronger weight for real hierarchy or state changes and keep body text visually stable.

### 21. Write in plain, specific language

Use familiar terms, active voice, and outcome-oriented action labels. Replace vague actions such as “Submit” or “Continue” when a more specific result can be named.

## 6. Color, borders, and depth

### 22. Use color semantically

Color should encode role or state through canonical semantic tokens. Do not choose colors independently for local decoration, and do not use the same semantic color for conflicting meanings.

### 23. Never make color the only signal

Pair status color with text, iconography, shape, pattern, or position. Ensure meaning survives color-vision differences, low-quality displays, and high-contrast modes.

### 24. Use borders to clarify boundaries

Borders should identify interactive surfaces, group boundaries, selection, focus, or separation that spacing alone cannot communicate. Avoid stacking borders around already clear groups.

### 25. Use elevation only to represent elevation

Shadows should communicate layering, overlap, or a temporary surface above another surface. They are not general-purpose decoration. Keep elevation levels few, consistent, and tied to named tokens.

### 26. Keep radius coherent with component role

Use the approved radius scale. Similar components should share radius behavior, and nested radii should remain visually compatible. Avoid arbitrary pill shapes and one-off corner values.

## 7. Interaction

### 27. Make interactivity visible before use

Buttons, links, fields, rows, menus, and draggable elements must look operable in their default state. Do not depend on hover to reveal the only action or essential label.

### 28. Provide immediate, proportional feedback

Every action needs timely acknowledgement. Use subtle feedback for lightweight operations and stronger confirmation for consequential, delayed, or destructive operations.

### 29. Preserve context during transitions

When content changes, help users understand what changed and why. Keep stable landmarks, retain selection where appropriate, and avoid unexpected scroll or focus jumps.

### 30. Prevent errors before explaining them

Use constraints, sensible defaults, inline guidance, previews, and validation near the source. Do not disable an action without explaining what is required to enable it.

### 31. Make recovery clear and preserve work

Error messages must identify the problem, its location, and the next corrective action. Preserve entered data, provide retry or undo where feasible, and avoid dead ends.

### 32. Use progressive disclosure for complexity

Show the information and controls needed for the current decision first. Reveal advanced, rare, or conditional options when they become relevant without making them undiscoverable.

### 33. Treat state design as part of the component

Design default, hover, focus, active, selected, loading, disabled, success, warning, error, empty, partial, permission-limited, and offline states when applicable. States must not cause avoidable layout shifts or contradictory actions.

## 8. Consistency and the design system

### 34. Reuse canonical patterns before creating new ones

Search Storybook and the approved ReUI intake path first. Reuse a pattern when the user intent and behavior match, not merely when the shape looks similar.

### 35. Use tokens instead of local visual decisions

Use canonical semantic tokens for typography, spacing, color, radius, and elevation. One-off values create invisible design debt and make later correction expensive.

### 36. Keep behavior consistent across contexts

The same control should retain its meaning, state model, keyboard behavior, and feedback pattern wherever it appears. Variants must represent real semantic or functional differences.

### 37. Evolve the system deliberately

When no canonical pattern fits, document the unmet need, inspect adjacent patterns, and introduce the smallest reusable extension through the approved ownership process. Do not fork a component inside a feature.

## 9. Accessibility and trust

### 38. Support multiple modes of perception and operation

Provide keyboard access, visible focus, meaningful labels, sufficient contrast, zoom and reflow support, adequate target sizes, and reduced-motion behavior. Accessibility must be present in the default implementation, not added after visual approval.

### 39. Communicate consequences honestly

Before consequential actions, show what will happen, what is reversible, and what data or access is affected. Confirmation should add meaningful understanding rather than repeat the button label.

### 40. Never trade user trust for conversion

Do not obscure costs, conditions, risks, data use, cancellation, decline paths, or negative outcomes. Do not use misleading hierarchy, forced urgency, disguised advertising, or defaults that work against the user's stated intent.

## Clean UI decision filter

Apply these questions to every meaningful element and interaction:

### Purpose

- What user question does this answer?
- What decision or action does it enable?
- Does it protect safety, confidence, accessibility, or trust?

### Priority

- Is it primary, secondary, or tertiary for the current task?
- Does its visual weight match that priority?
- Is it competing with a more important action or message?

### Placement

- Is it located where the need or question occurs?
- Is it grouped with the correct label, value, control, or feedback?
- Does its position preserve a clear reading and action order?

### Presentation

- Is the chosen component or visual treatment appropriate to its meaning?
- Can spacing, alignment, or typography communicate the relationship before adding a container or decoration?
- Is the language specific and immediately understandable?

### State

- What happens before, during, and after interaction?
- Are unavailable, loading, successful, warning, error, empty, partial, permission, and offline conditions covered where relevant?
- Can users identify and recover from failure without losing work?

### Removal

- What meaning, confidence, or capability is lost if this element is removed?
- Can it be merged, shortened, deferred, or progressively disclosed?
- If removing it changes nothing important, remove it.

## Clean UI review checklist

Use this checklist before handoff:

1. Can the screen's primary task be stated in one sentence?
2. Is one primary action obvious within each decision area?
3. Can users tell where they are and what is happening now?
4. Is the reading order clear without relying on decoration?
5. Are primary, secondary, and tertiary information visibly distinct?
6. Are related elements grouped by proximity and alignment?
7. Is spacing within groups smaller than spacing between groups?
8. Does every card, border, background, and shadow add structural meaning?
9. Are typography roles consistent and easy to scan?
10. Is all language plain, specific, and outcome-oriented?
11. Are canonical components and semantic tokens used throughout?
12. Is color semantic and paired with a non-color signal?
13. Are controls identifiable and understandable before interaction?
14. Are feedback, loading, empty, error, disabled, and success states complete?
15. Are errors prevented where possible and recoverable when they occur?
16. Are advanced or rare choices disclosed at the appropriate time?
17. Can the flow be completed by keyboard with visible focus?
18. Do contrast, target size, zoom, reflow, and reduced motion meet accessibility needs?
19. Are costs, consequences, conditions, risks, and decline paths communicated honestly?
20. Can any remaining element be removed without weakening meaning, confidence, or task completion?

## Final principle

Remove until the meaning becomes weaker, then restore the last necessary thing.
