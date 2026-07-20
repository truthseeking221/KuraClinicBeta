# Component Decision System

Use this reference whenever selecting, reusing, extending, creating, or reviewing a component.

## Contents

1. Decision sequence
2. Navigation and disclosure
3. Data presentation
4. Selection and input
5. Actions and commands
6. Overlays
7. Feedback and status
8. Containers and grouping
9. Clinical composites
10. Responsive transformation
11. Reuse and Storybook governance
12. Component specification template

## Decision sequence

Answer in order:

1. What user job does the component perform?
2. What object or value does it represent?
3. Does it change the view, data, workflow state, or system setting?
4. Is the action immediate, staged, or committed later?
5. Is it frequent, risky, reversible, and interruption sensitive?
6. How many options, rows, fields, states, and actions exist now and at realistic scale?
7. Does the user need comparison, search, context retention, history, or explanation?
8. Which existing Kura component already owns this responsibility?
9. What happens on mobile, keyboard, touch, zoom, long content, error, loading, and permission restriction?

Choose the component only after answering these questions.

## Navigation and disclosure

| Need | Preferred component | Use when | Avoid when |
| --- | --- | --- | --- |
| Move between product areas | Global or workspace navigation | Destinations are persistent and independently addressable | Options are local modes of one control |
| Move within one object | Local navigation or anchor navigation | Sections are long or independently addressable | Content is a small amount that should remain visible |
| Switch peer views | Tabs | Views share one object and may be entered in any order | Stages must be completed in sequence |
| Switch one compact mode | Segmented control | Two to five mutually exclusive modes alter the same local content | The choice submits data or changes a persistent setting |
| Show stable progress | Stepper | Sequence is meaningful, mostly linear, resumable, and limited | Branching, role handoffs, or repeated loops dominate |
| Reveal optional detail | Accordion or disclosure | Several sections may be independently expanded | Content is safety critical or required for the current decision |
| Show contextual explanation | Tooltip or popover | Explanation is optional and anchored | The information is required, long, interactive, or mobile critical |
| Show lineage and location | Breadcrumb | Hierarchy is meaningful and users may move upward | The path is process history rather than information hierarchy |

Tabs are navigation, not workflow state. Steppers are orientation, not a substitute for a state model. Accordions manage density, not importance.

## Data presentation

### Table

Use when users compare repeated attributes across items, sort or filter a dataset, scan aligned values, or perform row level operations at scale.

Require:

* Meaningful columns
* Sort and filter logic tied to user decisions
* Row identity and selection semantics
* Loading, empty, error, partial, stale, and pagination behavior
* Bulk action rules when selection exists
* Column priority and responsive strategy

Do not use a table for a handful of heterogeneous summaries or for information that is read primarily as a narrative.

### List

Use for scanning entities, tasks, search results, messages, history, or events when vertical order and item identity matter more than column comparison.

Use a timeline only when chronological sequence and causality are the primary reading task. Do not decorate an ordinary list with timeline chrome.

### Card

Use a card only when the content group has an independent identity, boundary, action scope, state, selection behavior, or repeated collection role.

Do not use a card merely to create whitespace, background color, or hierarchy. Prefer:

1. Spacing for related content within one semantic region
2. A heading for a named section
3. A divider for a light scanning boundary
4. A card for an independently meaningful unit
5. A panel for a persistent functional region

Avoid nested cards. When nesting seems necessary, reconsider page regions, headings, dividers, or a composite anatomy.

### Description list and summary

Use a description list for stable label and value facts. Use a summary block when a small set of facts supports one decision. Avoid turning every fact into a metric tile.

### Chart

Use only when shape, trend, comparison, distribution, or relationship can be understood more efficiently than from values. Define the decision it supports, unit compatibility, time range, missing data, reference range, and accessible equivalent.

## Selection and input

| Need | Component | Key rule |
| --- | --- | --- |
| One required option from a small visible set | Radio group | Show all options and preserve comparison |
| Several independent options | Checkbox group | Each option can stand alone |
| Immediate persistent binary setting | Switch | State changes immediately and can be reversed |
| Confirm understanding or agreement in a form | Checkbox | The check is part of later submission, not an immediate setting |
| Choose from a compact known list | Select | Options are familiar and search is unnecessary |
| Search a large or dynamic list | Combobox | Support typed filtering and robust no result behavior |
| Choose several searchable values | Multi select combobox | Make chosen values, limits, removal, and keyboard behavior clear |
| Enter a date with known format | Date field | Permit keyboard entry and validation |
| Choose a date using surrounding dates | Date picker | Calendar context materially helps selection |
| Choose a bounded numeric value | Numeric field, slider, or stepper control | Prefer a field for precision; use a slider only when relative position matters |
| Enter long structured content | Text area or structured editor | Match formatting power to the real documentation need |

Do not use placeholders as labels. Keep units, constraints, format, and clinical meaning visible. Validate at the earliest useful moment without interrupting normal entry.

## Actions and commands

### Button hierarchy

Use one primary button per action scope. Secondary buttons preserve valid alternatives. Tertiary or quiet actions reduce emphasis. Destructive styling communicates consequence, not importance.

Use a text link for navigation. Use a button for an action, even when styled quietly. Do not make noninteractive elements clickable.

### Menu

Use a menu for a collection of commands that are secondary, compact, and understandable without simultaneous comparison. Do not hide the main task, frequently used command, safety action, or form selection inside a menu.

### Split button

Use only when one action is clearly dominant and closely related alternatives exist. Ensure the default action is safe and predictable.

### Disabled actions

Prefer an enabled action with inline validation when the user can reasonably attempt completion. When an action must be unavailable, explain why and how to unblock it. Preserve accessibility semantics and do not rely on a tooltip alone.

### Confirmation

Confirm when consequence is difficult to reverse, costly, destructive, legally meaningful, externally communicated, or clinically consequential. Avoid confirmation for routine reversible actions. The confirmation must state object, consequence, and resulting state.

## Overlays

| Component | Correct job | Limits |
| --- | --- | --- |
| Tooltip | Short optional clarification | No required action, essential content, or touch dependency |
| Popover | Small contextual information or controls | Must remain anchored and easy to dismiss |
| Menu | Secondary commands | Not a form or primary navigation |
| Dialog | Short focused decision that blocks the parent | Avoid long multistep tasks and heavy reference needs |
| Drawer or sheet | Contextual support while parent context matters | Avoid deep navigation and safety critical work that needs broad context |
| Dedicated page | Complex, long, addressable, resumable, or high consequence work | Provide clear return path and preserve context |

Use the smallest overlay that preserves comprehension and safe completion. Promote an overlay to a page when content grows, users need history or comparison, the task branches, the work must be resumed, or URL addressability matters.

## Feedback and status

| Situation | Pattern | Requirement |
| --- | --- | --- |
| Field can be corrected | Inline validation | Place beside the field and preserve user input |
| Section has an actionable issue | Inline alert | Explain cause, consequence, and action |
| Whole page or system is affected | Banner | Define scope and persistence |
| Action succeeded without further work | Toast | Keep transient and nonblocking |
| Action queued or continues in background | Persistent status plus optional toast | Show owner, progress, return path, and failure behavior |
| Data is loading | Skeleton or progress | Match expected structure and avoid false precision |
| No data exists | Empty state | Distinguish first use, filtered empty, permission empty, and failure |
| Object has lifecycle status | Status text or badge | Pair color with words and expose meaning and next action |
| User needs progress through known work | Progress indicator | Show determinate progress only when the measure is trustworthy |

A toast must never be the only record of failure, pending work, critical warning, or completion that needs later verification.

## Containers and grouping

Choose the lightest grouping signal that communicates the model:

| Relationship | Preferred treatment |
| --- | --- |
| Elements belong to one sentence or control | Proximity |
| Fields belong to one topic | Spacing and section heading |
| Adjacent regions need scan separation | Divider |
| Region has a distinct background role | Surface or panel |
| Unit has identity, state, actions, or selection | Card |
| Layer interrupts or floats over context | Overlay |

Every border and background creates an implied object. Do not create a visual object that has no semantic counterpart.

## Clinical composites

Prefer domain composites when safety or workflow meaning is intrinsic:

* Patient identity and context header
* Encounter context header
* Clinical issue summary
* Evidence and provenance panel
* Allergy or safety constraint summary
* Medication regimen item
* Order composer and order summary
* Result review and acknowledgement panel
* Care plan task or intervention item
* Work queue item with owner and next action
* Audit and amendment history

Do not make every clinical composite a card. Its visual container depends on placement. Its semantic contract remains stable across layouts.

## Responsive transformation

Responsive design preserves the job, not the desktop geometry.

For every component, define:

* Priority order
* Minimum useful content
* What wraps, stacks, collapses, truncates, scrolls, or moves to another layer
* Action placement and thumb reach
* Touch target size and focus order
* How comparison survives on narrow screens
* How context remains visible during long tasks
* How overlays transform
* Long content, localization, zoom, virtual keyboard, and orientation behavior

Do not convert a comparison table into generic cards automatically. Identify the mobile decision first. Options include a prioritized list, expandable rows, pinned key attributes, controlled horizontal comparison, or a dedicated detail view.

## Reuse and Storybook governance

### Inventory before creation

Search by semantic responsibility, not only component name. Inspect primitives, generic components, domain composites, patterns, feature compositions, and templates.

### Decide the system layer

| Layer | Responsibility |
| --- | --- |
| Foundation | Tokens, typography, color, spacing, motion, elevation |
| Primitive | Low level accessible interaction behavior |
| Generic component | Reusable Kura UI contract without domain policy |
| Domain composite | Clinical or operational semantics and rules |
| Pattern | Repeatable arrangement that solves a workflow problem |
| Feature composition | Local assembly tied to one product context |
| Template | Reference page structure with realistic states |

### Extend versus create

Extend when the component keeps the same user job, anatomy, event model, and state responsibility. Create when one of these changes materially and forcing a variant would create conditional complexity or semantic confusion.

### Storybook completeness

Every public component must show:

* Default and meaningful variants
* Interactive states
* Loading, empty, error, disabled, readonly, and permission restricted states where applicable
* Long content and realistic data
* Keyboard and screen reader behavior
* Mobile and narrow container behavior
* Dark theme when supported by Kura
* Event contracts and usage guidance
* Correct and incorrect usage

## Component specification template

1. User job and semantic responsibility
2. Existing candidates inspected
3. Reuse, extension, composition, or creation decision
4. Anatomy and hierarchy
5. Properties and variants
6. States and transitions
7. Actions, events, and side effects
8. Validation and feedback
9. Permission and readonly behavior
10. Content and copy rules
11. Responsive transformations
12. Accessibility contract
13. Storybook location and stories
14. Tests and analytics
15. Anti patterns and boundaries
