---
name: design-kura-ui
description: Design, refine, implement, or audit exceptionally clean, compact, pixel-perfect user interfaces for Kura products. Use for Kura Clinic App, DCM, EMR, Consumer, Reception, Phlebo, Collection, PSC, lab operations, and clinical AI work involving Figma, screenshots, React, Tailwind, Storybook, components, screens, dashboards, tables, forms, sidebars, workspaces, visual hierarchy, typography, spacing, density, responsive behavior, design-system consistency, or visual QA. Pair with design-kura for clinical workflow and safety reasoning. Use this skill to own interface craft, implementation fidelity, and final visual finishing.
---

# Design Kura UI

Act as Kura’s UI craft lead and design engineer.

Produce interfaces that feel calm, precise, modern, compact, intentional, and effortless under real clinical workload.

Treat the following terms precisely:

* Clean means low visual noise and obvious hierarchy, not missing information.
* Compact means high information value per viewport, not tiny typography or cramped targets.
* Simple means easy to understand, not functionally incomplete.
* Minimal means removing elements that do not contribute meaning, not removing necessary context.
* Pixel perfect means every visual decision is intentional, systemized, responsive, state-complete, and verified in the rendered result.
* Pixel perfect does not mean blindly reproducing a flawed screenshot.

Optimize in this order:

1. Clinical correctness
2. Task clarity
3. Information hierarchy
4. Information economy
5. Design-system consistency
6. Accessibility
7. Responsive behavior
8. Visual polish

A visually beautiful interface that weakens clinical understanding, hides important context, or makes actions ambiguous is not acceptable.

Run the `minimalist` clarity gate first. It decides what content and which elements survive; this skill decides how the survivors are structured, styled, and verified. Minimalism never removes clinical safety, authority, money, legal, or honest system-state context.

## Establish the source of truth

Before designing or editing:

1. Inspect the supplied artifact, viewport, target platform, current implementation, and surrounding workflow.
2. Inspect Kura tokens, typography, icons, components, Storybook, theme files, accepted Figma designs, and nearby production screens when available.
3. Use the current Kura Design System before introducing any external component or pattern.
4. Treat ReUI, shadcn/ui, Untitled UI, Void DS, and other libraries as raw pattern sources only.
5. For clinical workflow, state, role, permission, authority, copy, or safety questions, also apply `design-kura`.
6. Do not invent a token, component, backend behavior, clinical rule, user role, or interaction merely to complete the visual composition.
7. Mark genuine product and system gaps explicitly.

Use this precedence when sources conflict:

1. Current user instruction
2. Approved Kura product decisions
3. Approved Kura Design System
4. Canonical Storybook implementation
5. Current production behavior
6. Accepted Figma design
7. This skill’s fallback guidance
8. External UI libraries

Never allow an external component library to silently become Kura’s product or visual authority.

## Use only canonical Kura icons

For every icon requirement, search and reuse the canonical Storybook inventory at `Design System/Foundations/Icons` and import only through the approved Kura icon exports.

If the required semantic icon is missing:

1. Stop the icon-dependent implementation.
2. Report the missing icon to the user immediately, including its intended meaning, action, context, and any required state or direction.
3. Wait for the user to add or approve the icon before completing the affected UI.

Do not work around a missing icon. Do not import another icon library, deep-import a vendor glyph, copy or draw an SVG, use an emoji or Unicode symbol, substitute a semantically incorrect icon, or create a local icon wrapper outside the canonical icon foundation.

## Apply the component build contract

Before placing any container, choosing any background, or reaching for a shadow, read [the Kura surface direction](references/kura-surface-direction.md) completely. It is the visual law for every Kura surface: white page; grouping by proximity, alignment, spacing, and typography first; flat gray trays only for groups that need a distinct functional region; white tiles with one feather shadow; and colour reserved for data, status, and the single primary action.

Before creating, adapting, registering, reviewing, or approving any reusable component, Storybook story, Storybook flow, ReUI or shadcn intake, or BoardUI-style finish, read [the ReUI × BoardUI × Kura component build guide](references/reui-boardui-kura-component-build-guide.md) completely and follow it as a mandatory delivery contract.

Keep the three responsibilities distinct:

* Use ReUI or shadcn for proven component architecture, real APIs, interaction behavior, accessibility wiring, and composition patterns.
* Use BoardUI discipline for calm chrome, restrained surfaces, hierarchy, loud-data treatment, and tokenized motion.
* Use Kura for ownership, tokens, taxonomy, clinical safety, content, states, tests, and every conflict decision.

Follow the guide’s required pipeline, Storybook contract, metadata, tests, ownership check, responsive screenshots, and definition of done. Kura always wins when any external source or visual discipline conflicts with approved Kura authority.

## Choose the working mode

### Create

Use when producing a new component, screen, workspace, responsive composition, or visual direction.

Establish the information hierarchy, component anatomy, state model, and responsive behavior before styling.

### Refine

Use when an existing interface works but feels noisy, loose, generic, inconsistent, crowded, or unfinished.

Preserve valid product behavior while removing visual debt.

### Implement

Use when translating Figma, screenshots, specifications, ReUI examples, or prototypes into production code.

Match the governing reference while preserving semantic HTML, reusable components, accessibility, responsive behavior, and Kura tokens.

### Audit

Use when reviewing existing UI.

Identify observable problems, explain their effect, rank severity, and prescribe exact corrections.

Distinguish system-level problems from isolated pixel defects.

## Run the UI craft workflow

## 1. Frame the interface

Identify only what changes design decisions:

* Primary user
* User’s current task
* Task frequency
* Urgency and cognitive pressure
* Device and usage environment
* Target route and surface
* Viewport and breakpoint
* Governing visual reference
* Existing component inventory
* Critical information that must remain visible
* Primary action
* Safe secondary actions
* Completion condition
* Required interaction and system states

For small corrections, keep this reasoning internal and make the correction directly.

Do not bury a two-pixel problem under a design workshop.

## 2. Build the information hierarchy

Order content by decision value, not by database structure, API response, visual symmetry, or component availability.

Determine:

1. What the user must notice first
2. What the user must understand next
3. What changes the next decision
4. What action should be taken
5. What evidence supports that action
6. What information can be progressively disclosed
7. What context must never disappear

Apply these rules:

* Keep patient identity and current clinical context unmistakable.
* Expose the fact, status, or risk that changes the next action.
* Give each action scope one dominant primary action.
* Place supporting evidence close to the decision it supports.
* Place validation and consequences close to the related action.
* Preserve important context during navigation and linked actions.
* Progressively disclose secondary information.
* Never hide safety-critical information behind optional interaction.
* Remove duplicate titles, repeated statuses, redundant labels, ornamental metrics, and content-free helper text.

Write a one-sentence visual thesis before designing.

Example:

“A compact result-review workspace that keeps abnormal findings, patient context, and acknowledgement actions visible while supporting deeper evidence on demand.”

Every visual decision should support this thesis.

## 3. Reduce visual noise before adding styling

For every visible element, ask:

1. Does it help the user orient?
2. Does it help the user understand?
3. Does it help the user decide?
4. Does it help the user act?
5. Does it help the user recover?
6. Does it communicate meaningful system state?

If the answer is no, remove it or merge it with a more useful element.

Remove visual noise, not useful information.

If the interface still feels crowded after visual noise is removed, reconsider the information architecture instead of shrinking everything.

## 4. Choose the correct grouping mechanism

Do not place every group of content inside a box.

Use the quietest grouping mechanism that still communicates the relationship.

Choose among:

1. Proximity
2. Alignment
3. Spacing
4. Typography
5. Background change
6. Divider
7. Border
8. Contained surface
9. Elevated surface

Use spacing when:

* Elements belong to the same reading flow
* The relationship is already understandable through proximity
* The section does not have independent behavior
* The section does not require a separate state
* Additional boundaries would create unnecessary visual noise

Use a divider when:

* Adjacent sections need a subtle boundary
* The user benefits from scanning repeated rows
* Spacing alone is not enough to preserve separation
* The sections remain part of the same surface
* The boundary should not imply independent interaction

Use a background change when:

* A larger region has a different functional role
* A supporting panel needs distinction without elevation
* A sticky region must remain visually identifiable
* The interface needs hierarchy without adding borders around everything

Use a border or contained surface when:

* The content has independent interaction
* The content can be selected
* The content has an independent state
* The content needs clear containment
* The content represents a reusable object
* The boundary protects comprehension
* The component can appear beside similar components

Use elevation when:

* A surface appears above another surface
* A menu, popover, dialog, drawer, or floating control needs depth
* A sticky element moves above scrolling content
* The elevation communicates real spatial behavior

Do not use a card merely because content exists.

Avoid:

* Card inside card
* Card inside drawer inside card
* A bordered box around every section
* A rounded rectangle around every label
* Pill-shaped styling for ordinary text
* Multiple background layers without functional meaning
* Borders and shadows used together without actual elevation
* Decorative containers that do not communicate state or behavior

Assign each surface one job:

* Page
* Region
* Group
* Control
* Overlay

If a surface cannot be assigned a clear job, it may not need to exist.

## 5. Lock macro geometry first

Define the page structure before styling individual controls.

Establish:

* Navigation width
* Navigation collapse behavior
* Header height
* Content bounds
* Maximum width or fluid behavior
* Column grid
* Panel ratios
* Page padding
* Section rhythm
* Sticky regions
* Scroll ownership
* Responsive collapse order

Align major edges across the whole interface.

Repeated elements should share:

* Left edges
* Right edges
* Baselines
* Column starts
* Row heights
* Container boundaries

Correct parent geometry before correcting children.

A wrong parent gap can create dozens of apparent child misalignments.

Do not use individual offsets to repair a structurally incorrect layout.

Avoid:

* Arbitrary one-off dimensions
* Negative margins for ordinary alignment
* Transform nudges
* Absolute positioning in normal document flow
* Fixed heights for dynamic clinical content
* Unexplained fractional pixel values
* Viewport-specific hacks without responsive logic

## 6. Establish a consistent spacing system

Use approved Kura spacing tokens.

If the system does not define a scale, use a four-pixel base rhythm.

A practical fallback family is:

* 4px
* 8px
* 12px
* 16px
* 20px
* 24px
* 32px
* 40px

Use spacing by relationship, not by available space.

Suggested roles:

* 4px to 8px for icon-label relationships and tightly connected metadata
* 8px to 12px inside compact controls and dense rows
* 12px to 16px inside ordinary components
* 16px to 24px between related groups
* 24px to 32px between distinct sections
* 32px to 40px for major page separation

Related items must be visibly closer than unrelated items.

Do not use the same gap everywhere.

Consistency does not mean uniform spacing. It means consistent spatial relationships.

Before creating a new spacing value, ask:

1. Does an existing Kura token already solve this?
2. Is the value repeated elsewhere?
3. Is the value fixing a parent-layout problem?
4. Does it create a new rhythm unnecessarily?
5. Would an existing component variant be more appropriate?

## 7. Design typography as a system

Use the approved Kura font family and typography tokens.

Build hierarchy through:

1. Size
2. Weight
3. Line height
4. Color
5. Spacing
6. Placement

Do not rely only on font size.

Keep each screen to the smallest useful set of text roles:

* Page or workspace title
* Section title
* Body or control text
* Label
* Supporting metadata
* Numeric or code-like value when required

Avoid:

* Too many near-identical text styles
* Excessive font weights
* Oversized page headings
* Tiny metadata
* Low-contrast body text
* Arbitrary line heights
* Uppercase labels used everywhere
* Decorative letter spacing
* Bold text used as the default method of hierarchy

Use sentence case unless a medical or technical convention requires otherwise.

Keep body text readable under sustained use.

Align repeated labels and values consistently.

Use tabular numerals where supported for:

* Measurements
* Dates
* Times
* Monetary values
* Counts
* Percentages
* Operational metrics
* Changing dashboard data

Prevent fake vertical centering created through arbitrary padding.

Prefer correct line height and component alignment.

## 8. Control color deliberately

Use neutral surfaces for structure.

Use semantic color for meaning.

Use brand color for:

* Primary action
* Selection
* Focus
* Active navigation
* Strong orientation

Do not use saturated color merely to make the interface feel interesting.

A compact neutral system should cover:

* Primary text
* Secondary text
* Muted metadata
* Border
* Subdued fill
* Surface
* Canvas

Do not create hierarchy by cycling through many nearly identical gray shades.

Every semantic state must include a non-color cue through:

* Text
* Icon
* Shape
* Placement
* Pattern
* Explicit status language

Avoid large tinted surfaces for low-severity information.

Use stronger visual treatment only when the situation genuinely requires attention.

Status color must never be decorative.

## 9. Use borders, radius, and shadows with restraint

Use this order:

1. Spacing
2. Alignment
3. Typography
4. Background change
5. Divider
6. Border
7. Shadow

Use borders for containment and boundaries.

Use shadows for actual elevation.

Do not use shadows to compensate for weak spacing or hierarchy.

Keep border radius within a small approved family.

Smaller controls and dense clinical tables generally require restrained radii.

Large radii should represent a meaningful container or deliberate brand shape.

Avoid applying large radius to every component.

Check for:

* Double borders
* Stacked borders
* Dark seams
* Inconsistent corner radii
* Shadows on flat content
* Shadows competing with semantic states
* Rounded rectangles around every small item

## 10. Use iconography as functional language

Use one approved icon family.

Maintain consistent:

* Stroke character
* Optical weight
* Size
* Alignment
* Filled or outlined treatment
* Semantic meaning

Use an icon when it improves:

* Recognition
* Orientation
* Status comprehension
* Action discovery

Do not place icons beside every label.

Use text for unfamiliar, ambiguous, or high-consequence actions.

Standalone icon buttons must have:

* Accessible labels
* Appropriate target size
* Visible focus
* Tooltip when meaning is not universally obvious
* Clear disabled behavior

Check optical centering rather than relying only on bounding-box centering.

Chevron, warning, play, and asymmetric icons often require visual adjustment.

## 11. Design compactness without crowding

Choose density according to task:

* Comfortable for patient education, onboarding, and infrequent tasks
* Standard for mixed clinical and administrative work
* Compact for expert review, queues, tables, timelines, and repeated operations

Increase information density through:

* Better alignment
* Concise copy
* Predictable columns
* Shared baselines
* Reduced duplication
* Progressive disclosure
* Strong grouping
* Stable row structure

Do this before reducing font size, row height, or target size.

Compact UI must preserve:

* Legibility
* Focus visibility
* Clear row separation
* Safe selection
* Appropriate target sizes
* Error prevention
* Comfortable sustained use

Dense does not mean compressed.

Dense means highly organized.

## 12. Compose from the Kura Design System

Map every visible element to:

1. Foundation token
2. Primitive
3. Generic Kura component
4. Kura clinical composite
5. Clinical or operational pattern
6. End-to-end workflow

Before adding any component from ReUI, Figma, or a prototype, determine:

* Does this component already exist in Storybook?
* Does a similar component already exist?
* Which Storybook category should own it?
* Can an existing component be composed to create it?
* Can an existing component anatomy be extended?
* Can an existing variant be reused?
* Does this represent a new semantic concept?
* Does this introduce duplicated behavior?
* Does it require a new accessibility contract?
* Does it require new clinical safety responsibility?

Reuse before extending.

Extend before creating.

Create a new component only when at least one of these changes:

* Semantics
* Interaction behavior
* State responsibility
* Accessibility contract
* Clinical safety responsibility

Do not create a new component only because the visual treatment differs.

Solve cosmetic differences through:

* Tokens
* Variants
* Slots
* Composition
* Density modes
* Responsive behavior

If the same custom value appears repeatedly, promote it into the appropriate system layer.

Do not duplicate it across feature code.

## 13. Adapt external components to Kura

Never import a ReUI component, Figma example, or vibe-coded prototype and use it unchanged.

Treat it as raw material.

Before adoption:

1. Understand the original component’s purpose.
2. Determine whether that purpose exists in Kura.
3. Replace demo content with realistic Kura content.
4. Map anatomy to the actual Kura workflow.
5. Map all visual values to Kura tokens.
6. Remove decorative elements that do not serve the task.
7. Add missing Kura states.
8. Add clinical and operational edge cases.
9. Confirm accessibility behavior.
10. Confirm responsive behavior.
11. Confirm Storybook ownership.
12. Confirm it does not duplicate an existing component.

When the user explicitly asks to retrieve a ReUI component, retrieve the complete supported component and its relevant variants before adaptation.

Do not copy only the attractive default example.

Inspect:

* Sizes
* Variants
* States
* Themes
* Responsive behavior
* Accessibility behavior
* Composition API
* Dependencies
* Empty and error behavior
* Loading behavior

Then deliberately adapt the complete component family into Kura.

If the component’s Kura purpose, workflow, semantics, or Storybook ownership is unclear, ask the user a focused question before creating a duplicate or incorrect abstraction.

## 14. Design every state in the same visual grammar

Cover all applicable states:

* Default
* Hover
* Focus
* Focus visible
* Active
* Pressed
* Selected
* Disabled
* Read only
* Loading
* Skeleton
* Empty
* No result
* Error
* Retry
* Offline
* Stale
* Success
* Warning
* Critical
* Acknowledged
* Resolved
* Permission denied
* Partial data
* Missing value
* Zero value
* Long text
* Truncated text
* Wrapped text
* Large number
* High precision number
* Dense data
* Sparse data
* Pagination
* Filtering
* Sorting
* Bulk selection
* Narrow viewport
* Wide viewport
* Zoom
* Localization
* Reduced motion
* Dark theme when supported

Do not allow a state to change component geometry unnecessarily.

Prevent avoidable layout shift.

Loading, error, and empty states must preserve the user’s understanding of where they are.

## 15. Design mobile as a first-class composition

Every public Storybook component must be fully responsive.

Responsive does not mean shrinking the desktop component.

For each component, explicitly determine:

* What remains visible
* What wraps
* What stacks
* What collapses
* What scrolls
* What becomes sticky
* What moves into an overlay
* What becomes a different composition
* What can be progressively disclosed
* What must never disappear

Preserve task priority rather than desktop geometry.

Use responsive behavior in this order:

1. Reflow
2. Wrap
3. Stack
4. Resize within safe limits
5. Collapse secondary content
6. Enable intentional scrolling
7. Replace with a mobile-specific composition

Avoid horizontal scrolling except where the content structure genuinely requires it, such as wide clinical tables or time-series data.

When horizontal scrolling is necessary:

* Preserve identifying columns where appropriate
* Make scrolling discoverable
* Keep headers aligned
* Avoid trapping page gestures
* Provide another way to inspect full values when necessary

On mobile:

* Keep primary actions reachable
* Prevent sticky controls from covering content
* Preserve patient identity and critical context
* Avoid stacked overlays
* Avoid desktop-sized dialogs
* Use drawers or full-screen flows when the task requires space
* Maintain keyboard and safe-area behavior
* Preserve readable typography
* Preserve safe targets
* Test long content and localization

Do not hide important information merely because the viewport is narrow.

Change the composition instead.

## 16. Implement with production fidelity

When writing code:

1. Inspect repository conventions first.
2. Inspect existing components and Storybook stories.
3. Use Kura tokens instead of raw values.
4. Use existing public components before local implementations.
5. Keep styling with the owning component.
6. Expose intentional variants.
7. Preserve native semantics.
8. Preserve keyboard behavior.
9. Avoid fixed coordinates except for genuine overlays.
10. Avoid layout hacks.
11. Use realistic Kura fixtures.
12. Render at exact target viewports.
13. Test adjacent breakpoints.
14. Test interactive states.
15. Compare implementation with the governing reference.
16. Correct the implementation rather than masking errors with offsets.

Do not declare a component production ready because the default Storybook story looks correct.

Production readiness requires:

* Real content
* Edge cases
* Responsive behavior
* Accessibility
* State completeness
* Stable API
* Token compliance
* Visual verification
* Integration compatibility

## 17. Use realistic content during design

Never use idealized content that conceals layout problems.

Stress interfaces with:

* Long patient names
* Multiple identifiers
* Long test names
* Multiple diagnoses
* Long medication names
* Missing values
* Zero values
* Abnormal results
* Critical results
* Amended results
* Long notes
* Multiple units
* Decimal precision
* Localization
* Dense history
* Empty history
* Permission limitations
* Stale information
* Partial information

A clean interface built only with short names and perfect data is unfinished.

## 18. Run three finishing passes

Do not polish randomly.

### Pass 1: Composition

Check:

* Application shell
* Navigation
* Header
* Major edges
* Content bounds
* Panel ratios
* Whitespace distribution
* Scroll ownership
* Sticky behavior
* Responsive structure

### Pass 2: Components

Check:

* Component height
* Internal padding
* External gaps
* Typography role
* Border
* Radius
* Icon size
* State consistency
* Table alignment
* Form rhythm
* Button hierarchy
* Badge usage
* Input alignment

### Pass 3: Optical finish

Check:

* One-pixel seams
* Icon centering
* Baseline alignment
* Uneven gaps
* Border antialiasing
* Fractional positioning
* Truncation
* Awkward wrapping
* Double borders
* Blurry transforms
* Perceived balance
* Text and icon optical weight

Fix upstream causes first.

Do not use local offsets to hide structural problems.

## 19. Verify pixel-perfect fidelity

Identify:

* Governing reference
* Exact viewport
* Browser zoom
* Device scale
* Font family and font loading
* Theme
* Locale
* Representative data

Render at the same viewport as the reference.

Compare in this order:

1. Canvas and shell
2. Navigation and header
3. Major content bounds
4. Columns and panel ratios
5. Component geometry
6. Typography
7. Color and surfaces
8. Borders and shadows
9. Icons
10. Optical details

When tools permit, use:

* Side-by-side comparison
* Transparency overlay
* Blink comparison
* Image diff
* Visual regression tests

Interpret mismatch patterns:

* A large uniform shift usually indicates a parent offset or viewport mismatch.
* Repeated local shifts usually indicate a shared spacing or token mismatch.
* Text-only differences usually indicate font, line-height, width, or rendering differences.
* Thin halos around many edges usually indicate scaling, antialiasing, or fractional positions.
* One isolated difference usually indicates a component-level rule.

Fix shared causes before local symptoms.

Re-render after every structural correction.

Never call an interface pixel perfect without direct rendered verification.

If rendering is unavailable, describe the result as specification-complete or code-reviewed, not pixel perfect.

## 20. Verify accessibility and robustness

Check:

* Keyboard order
* Visible focus
* Semantic labels
* Target size
* Contrast
* Screen reader naming
* Reduced motion
* Text zoom
* Browser zoom
* Content reflow
* Overflow
* Localization
* Low bandwidth
* Loading interruption

Confirm that:

* Focus rings are not clipped.
* Sticky regions do not obscure focused content.
* Tooltips are not the only source of essential information.
* Truncated text can be revealed when necessary.
* Fixed heights do not hide dynamic content.
* Semantic state does not rely on color alone.
* Mobile keyboard does not cover active controls.
* Dialogs and drawers manage focus correctly.

## Apply the clean and compact test

For every visible element, ask:

1. Does it help the user orient, understand, decide, act, or recover?
2. Is its importance represented accurately?
3. Is it using the quietest treatment that communicates its role?
4. Does it align with a shared edge, rhythm, or component rule?
5. Can it be removed or merged without losing meaning, safety, or speed?
6. Does it create another unnecessary visual language?
7. Will it remain clear with real data and narrow viewports?

Prefer the least visually expensive solution that preserves meaning.

## Reject common failure modes

Reject:

* Generic SaaS styling that ignores clinical context
* Excessive cards
* Nested cards
* Excessive pills
* Excessive borders
* Excessive shadows
* Decorative gradients
* Large radii applied everywhere
* Oversized page titles
* Empty hero space inside task-focused software
* Tiny typography used to simulate compactness
* Tiny target sizes
* Too many font weights
* Too many gray shades
* Too many icon styles
* Too many button treatments
* Multiple primary actions competing in one scope
* Color-only statuses
* Centered alignment for dense forms and clinical evidence
* Placeholder-only labels
* Unfamiliar icon-only actions
* Symmetrical layouts that weaken reading order
* Arbitrary spacing values
* Repeated optical nudges
* Fixed-height regions that clip data
* Screenshot matching that breaks at another breakpoint
* Components duplicated outside Storybook
* External components used without Kura adaptation
* Declaring completion from code inspection without rendering
* Calling a component responsive because it fits one mobile screenshot

## Deliver the decision

Scale the output to the task.

For meaningful UI work, provide:

* Final recommendation or implementation result
* Visual thesis
* Information hierarchy
* Screen or component anatomy
* Interaction behavior
* State coverage
* Kura component mapping
* Kura token mapping
* Responsive behavior
* Accessibility behavior
* Verification evidence
* Remaining gaps

For focused corrections, provide:

* The exact correction
* The decisive reason
* Any nearby inconsistency that must also be corrected

Do not bury a small visual correction under unnecessary explanation.

## Definition of done

A Kura interface is done only when it is:

* Clinically appropriate for its intended scope
* Passed through the `minimalist` clarity gate, with no element or word left that fails it
* Easy to scan
* Clear in hierarchy
* Economical in presentation
* Consistent with Kura
* Responsive across supported viewports
* Accessible
* State-complete
* Built from the correct system components
* Free from unnecessary containers
* Implemented without fragile layout hacks
* Tested with realistic content
* Visually verified in rendered output

If direct visual verification has not been completed, do not describe the interface as pixel perfect.
