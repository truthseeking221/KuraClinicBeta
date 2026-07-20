# Grouping and Container Restraint

Use the weakest visual signal that still communicates the relationship clearly.
Proximity, alignment, typography, and whitespace should do most of the grouping
work. A border, background, radius, or shadow is justified only when it adds
semantic, interactive, spatial, status, or safety meaning.

## Core doctrine

A box is not a default layout primitive. It tells the user that the content is
an independent object, scope, state, or interaction surface. If that statement
is not true, do not use a box.

Use this escalation order:

1. Spacing and proximity.
2. Alignment and typography.
3. Subtle tonal distinction.
4. Divider.
5. Box or card.
6. Elevated or overlaid surface.

Do not choose a stronger cue until the weaker cues have been tested and found
insufficient. Technical containment in the DOM does not require visible
containment in the UI.

## Section versus card

A section is a region within one continuous page or workspace. It normally
shares the page context, task, surface, interaction scope, and lifecycle with
its surroundings. Express it with a heading, alignment, spacing, or a divider.

A card is an object that users can perceive as independent. It usually owns a
state, actions, selection, expansion, ordering, lifecycle, repeated collection
membership, safety/status meaning, or an independently understandable task.
Use a visible box only when the content behaves like an object rather than
merely occupying a section.

## Decision procedure

Apply this procedure to every proposed group.

### 1. Start without a visible container

Render the content directly on the page surface. Establish clear alignment,
typography, deliberate spacing, heading hierarchy, and a suitable content
width. Do not begin with a border, background, radius, or shadow.

### 2. Test spacing and hierarchy

Stop at spacing when users can immediately tell:

- which elements belong together;
- where one group ends and the next begins;
- which heading belongs to which content; and
- which label belongs to which value or control.

Keep internal spacing smaller than the space between groups. Keep a heading
closer to the content it introduces than to the preceding group. Keep labels
closer to their values or controls than to neighboring groups. Use meaningful
jumps from the Kura spacing scale rather than repeating one gap everywhere.

Spacing is the default for headings and descriptions, labels and values,
fields and helper/validation text, patient identity and demographic details,
related metadata, read-only information, short control groups, and continuous
reading flows.

### 3. Add a divider only when continuity remains but scanning needs help

Use a divider when adjacent content remains on the same surface but spacing
alone leaves a meaningful boundary ambiguous. Good cases include dense repeated
rows, patient timelines, medication or lab-result entries, settings sections,
transactions, date/workflow transitions, persistent action areas, and columns
where comparison matters.

Divider rules:

- use a low-contrast semantic neutral line, normally one pixel;
- align it to the content grid and use an inset when only text needs separation;
- preserve the sense of one continuous surface;
- do not combine every divider with a background, radius, and shadow;
- remove dividers that add no scanning, comparison, sequence, or safety value;
- never use them as decoration or dominant visual texture.

### 4. Add a box only for an independent boundary

Give every visible box a semantic justification. Valid reasons include:

- an independent object, state, action scope, selection, or lifecycle;
- a repeated comparable item;
- dragging, sorting, expanding, or collapsing;
- a warning, error, acknowledgement, or clinical safety boundary;
- a selectable appointment/test/package or order basket;
- a prescription composer or follow-up plan with its own actions;
- a temporary/contextual surface; or
- a boundary needed to prevent a consequential misunderstanding.

When a box is used, make the whole surface behave as one coherent unit. Use
the lightest Kura border or tonal distinction that communicates the boundary.
Padding must support the object's content and actions, not merely create
decoration. Do not add a shadow unless the surface is genuinely elevated. Do
not add a radius just because the token exists. Do not give passive, selected,
warning, and primary interactive boxes identical visual weight.

### 5. Reserve elevation for spatial layering

Use elevation only when a surface sits above another surface: dialogs,
popovers, menus, floating or sticky action surfaces, dragged objects, and
temporary contextual panels. Use the canonical Kura elevation token. A static
section should normally not cast a shadow merely to look polished.

## Nested container policy

Reject nested visible boxes by default. A box inside another box is allowed
only when the child is independently meaningful, such as a critical drug
interaction inside a prescription composer, a selectable test inside an order
basket, or a movable event inside a timeline workspace.

Do not create a box around a section title, helper text, button group, metric,
or technical wrapper. Do not keep a card inside a card merely for padding or
because each component has a wrapper. Prefer one visible boundary level within
a content region. A second level needs independent state, interaction,
selection, or safety meaning. More than two levels require explicit task-
specific justification.

## Container tax and removal test

Treat every visible box as a cost: another edge and figure/ground relationship,
more padding and contrast, less usable space, more mobile scrolling, more
competition for attention, and a stronger implication of independence. Pay the
cost only when the boundary gives users meaningful information.

For every remaining box, temporarily remove its shadow, border, background, and
radius while preserving content, alignment, typography, and spacing. Ask:

1. Is the group still understandable?
2. Is its relationship to surrounding content still clear?
3. Does the user still know what can be acted upon?
4. Is any status, safety, or object identity lost?

If the answer remains clear, keep the box removed.

Before adding a container, repair heading hierarchy, type weight and contrast,
label/value emphasis, alignment, content order, whitespace, content width,
action hierarchy, and progressive disclosure. Containers must not compensate
for weak information architecture.

## Density and mobile

Clean does not mean spacious at all costs. Clinical and operational screens may
need compact density. Reduce absolute spacing carefully while preserving the
relationship between internal and external spacing, scanning alignment, the
primary decision context, and safe separation. Prefer tables, aligned lists,
structured groups, and dividers over grids of large repeated cards. Keep a
record in a box only when it is independently actionable or meaningful.

On mobile, do not turn every desktop section into a padded card. Preserve
continuous page flow, use headings and spacing for major groups, dividers for
repeated rows, and cards only for independent objects. Flatten decorative outer
containers, avoid nested horizontal padding, use the available width, and keep
critical actions persistent only when they serve the current task. Verify that
grouping survives stacking and that card padding does not consume the usable
screen. Preserve touch targets, keyboard access, zoom/reflow, long content,
status, permissions, and safety information.

## External component intake

When using ReUI, Figma, screenshots, libraries, or examples:

1. Separate the functional component from its demonstration shell.
2. Do not copy preview backgrounds, sample headers, outer cards, or wrappers.
3. Decide whether a source container represents product semantics or only
   documentation presentation.
4. Preserve useful behavior and variants without redundant containment.
5. Search Kura Storybook and canonical patterns for a section, surface, panel,
   card, list, or row that should be reused or extended.
6. Adapt the result to the real Kura workflow, content, clinical context,
   states, ownership, tokens, accessibility, and responsive behavior.
7. The presence of a `Card` component is not evidence that a card is needed.

## Common failure patterns

Reject or flatten these patterns unless a specific semantic reason exists:

- card per section: use a continuous page with section spacing;
- dashboard mosaic: create one dominant task area and subordinate supporting
  regions;
- card inside card: retain code boundaries but remove redundant visual ones;
- wrapper visibility leak: keep technical wrappers visually transparent;
- decorative shadow: use spacing, a semantic border, or a tonal surface;
- border as a substitute for spacing: repair the spacing system first;
- equal-weight surfaces: express hierarchy through position, prominence,
  contrast, and restraint;
- demo-shell inheritance: extract the component and rebuild Kura context; and
- mobile card tunnel: flatten sections and retain cards for independent objects.

## Silent audit and final pass

Before handoff, complete these checks.

For every box, complete: “This box is necessary because it represents an
independent ______.” Valid answers include object, state, action scope,
selection, lifecycle, safety boundary, overlay layer, or repeated unit. If the
sentence is not meaningful, remove the box.

For every divider, confirm the adjacent groups share a surface, spacing alone
would leave ambiguity, and the divider improves scanning, comparison, sequence,
or safety. Otherwise remove it.

For every spacing group, confirm internal spacing is smaller than external
spacing, headings attach to their content, labels attach to values/controls,
and the grouping survives responsive stacking.

Then remove decorative shadows, non-semantic borders/backgrounds, redundant
radii, unnecessary nesting, card groups that should be lists or sections, and
simultaneously dominant surfaces. Recheck the primary task, supporting
information, grayscale clarity, and mobile behavior.

## Acceptance criteria

A screen or reusable composition passes when:

1. Every visible box has a semantic or interactive justification.
2. No box exists only for padding, library convention, or a technical wrapper.
3. No nested box exists without an independent child object or state.
4. Spacing communicates basic grouping and uses Kura tokens.
5. Dividers are subtle and purposeful.
6. Shadows communicate elevation rather than decoration.
7. The primary task is visually dominant and support content is subordinate.
8. The result remains clear in grayscale and on narrow screens.
9. Technical boundaries do not automatically become visual boundaries.
10. Removing any remaining box would reduce clarity, interaction understanding,
    safety, or meaningful object identity.

When uncertain, begin with no box. Add spacing first, a divider only when
spacing is insufficient, and a box only for a true independent object, state,
interaction scope, or safety boundary.
