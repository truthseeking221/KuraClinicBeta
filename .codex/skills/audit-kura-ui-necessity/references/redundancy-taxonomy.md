# Redundancy Taxonomy

Use this reference to diagnose why an interface feels crowded and what kind of subtraction is appropriate.

## Contents

1. Content redundancy
2. Action redundancy
3. State and feedback redundancy
4. Structural redundancy
5. Navigation redundancy
6. Workflow redundancy
7. Data redundancy
8. Visual redundancy
9. Temporal redundancy
10. Responsive redundancy
11. System redundancy
12. False positives

## Content redundancy

### Echo copy

A heading, description, placeholder, and button repeat the same phrase without adding scope, consequence, or instruction.

Prefer one clear label plus only the information needed to decide or recover.

### Label value duplication

A value includes its label again, or surrounding context already makes a generic heading obvious.

Keep labels when meaning, unit, accessibility, scanning, or localization depends on them.

### Generic reassurance

Copy such as “Manage everything easily” occupies attention without changing understanding or trust.

Replace with concrete product truth or remove.

### Repeated instructions

Several sections repeat the same rule. Consolidate at the narrowest scope that covers all affected actions. Repeat locally only when missing the rule could cause meaningful error.

## Action redundancy

### Duplicate command

Two visible controls trigger the same outcome in the same scope. Keep the control with the clearest placement and label.

### Competing primary actions

Several buttons have equal visual weight even though only one advances the current job. Preserve alternatives but demote them according to frequency and consequence.

### Control and row click duplication

A row, title, icon, and button all navigate to the same place. Keep a coherent accessible target, but do not create overlapping or ambiguous interactive regions.

### Obsolete action

An action remains visible although state, permission, product direction, or integration no longer supports it. Remove only after confirming the source of truth and dependencies.

## State and feedback redundancy

### Status pile

Color, icon, badge, text, border, and banner all communicate the same status. Keep enough cues for meaning, priority, and accessibility. Remove ornamental echoes.

### Success duplication

Button state, toast, banner, and modal repeat one successful action. Keep persistent evidence when later verification matters. Use transient feedback only as support.

### Warning duplication

The same warning appears repeatedly without changing action context. Consolidate where possible, but preserve local field guidance and final authorization review when each supports a different decision.

### Empty state duplication

Illustration, heading, body, and action all restate “nothing here.” Use the minimum needed to explain why, what it means, and what can happen next.

## Structural redundancy

### Nested container

A page surface contains a card, inner card, bordered section, and boxed rows although the content shares one scope. Remove boundaries from the inside outward.

### Heading stack

Breadcrumb, page title, card title, section title, and fieldset legend repeat the same concept. Preserve only the levels that communicate real hierarchy and accessibility.

### Divider plus container

Border, background, shadow, and divider all mark one boundary. Choose the lightest sufficient signal.

### Duplicate spacing shell

Several wrappers add padding without semantic or layout responsibility. Consolidate implementation wrappers when safe, even if they are visually invisible.

## Navigation redundancy

### Competing local navigation

Tabs, sidebar anchors, breadcrumb, and previous or next controls all navigate the same local structure. Assign each a distinct hierarchy or remove it.

### Process disguised as navigation

Tabs represent lifecycle stages or required steps. Replace them with truthful state, progress, or task architecture.

### Destination duplication

The same destination appears repeatedly in a short menu or nearby navigation. Retain multiple entrances only when they serve distinct user moments.

## Workflow redundancy

### Unnecessary step

A screen collects no new decision, authority, evidence, object, waiting boundary, or resumable state. Merge it with the nearest coherent step.

### Review without value

A review screen repeats entered data but does not support error detection, consequence awareness, authorization, or comparison. Remove it or redesign it around those jobs.

### Repeated data entry

Users retype known data because systems or modules do not share context. Fix the source and data flow when possible. Do not merely hide the second field if the system still requires it.

### Confirmation fatigue

Routine reversible actions ask for confirmation. Remove the dialog and provide direct feedback or undo. Preserve confirmation when consequence, authority, or irreversibility warrants it.

### Handoff duplication

Several people reproduce the same documentation because ownership and source of truth are unclear. Resolve the workflow and audit model rather than compressing the UI alone.

## Data redundancy

### Unused field

A field is captured but never affects care, operation, communication, reporting, policy, or future work. Confirm downstream usage before removal.

### Repeated metric

The same value appears in a hero tile, summary card, chart, and table. Keep the representation that best supports the decision and preserve context where needed.

### Low value column

A column is rarely compared, filtered, sorted, interpreted, or acted on. Demote it to detail or remove it after validating use.

### Decorative chart

A chart adds visual weight but answers no decision question. Replace it with a value, trend sentence, or nothing.

### Filter without decision value

A filter exists because the field is available, not because users need to segment work. Remove or relocate it.

## Visual redundancy

### Decorative icon

An icon repeats adjacent text, adds no scanning value, or implies interaction. Remove it.

### Accent inflation

Many colors, badges, bold weights, large type, shadows, or gradients compete. Reserve strong signals for priority and state.

### Avatar without identity value

An avatar consumes space but does not help recognition, assignment, trust, or communication. Use text identity or remove it.

### Illustration without purpose

An illustration delays access, weakens professional tone, or repeats empty state copy. Remove it unless it improves onboarding, recognition, emotion, or brand meaning proportionally.

### Decorative metadata

Secondary data receives chips or pills merely for style. Use plain text when no status, category, filter, or selection behavior exists.

## Temporal redundancy

### Premature disclosure

Fields, help, settings, or warnings appear before the user's choice makes them relevant. Reveal when the trigger occurs, while preserving awareness that the option exists when discoverability matters.

### Persistent completed instruction

Onboarding or helper content remains after the user has learned or completed the task. Allow dismissal, progressive reduction, or contextual return.

### Historical detail in active work

Full history crowds the current decision. Summarize the relevant change and keep complete provenance available nearby.

## Responsive redundancy

### Double controls

Desktop and mobile versions both remain visible at a breakpoint or to assistive technology. Ensure only the active representation is perceivable and operable.

### Repeated sticky action

The same action appears in the header, content, and sticky footer simultaneously. Keep one visible primary action in the current viewport unless distinct scopes require otherwise.

### Desktop residue

Mobile retains labels, columns, hover actions, sidebars, and empty surfaces that no longer support the narrow screen job. Transform by priority rather than hide arbitrarily.

## System redundancy

### Semantic duplicate

Several components own the same user job under different names or visual styles. Choose a canonical contract and migrate usage.

### Variant inflation

Variants encode arbitrary appearance combinations instead of meaningful behavior, state, size, or context. Remove or consolidate them.

### Demo residue

External examples, placeholder actions, fake metrics, generic avatars, or unused controls survive into Kura. Translate into real Kura semantics or remove.

### Wrapper component without responsibility

A component only forwards props or adds a class without stable behavior, semantics, accessibility, or policy. Inline or remove it when doing so does not break ownership boundaries.

## False positives

Do not classify as redundant without testing:

* Repeated patient identity across long or high consequence actions
* A label required for accessibility or ambiguous values
* Unit, timestamp, provenance, or amendment information
* Local error guidance plus an error summary
* Current status in both a collection view and detail view
* A final review that supports authorization and consequence awareness
* A warning repeated where separate decisions occur
* Persistent background status plus a transient submission confirmation
* A sticky primary action that replaces an offscreen original
* Mobile content reordered or summarized for a different decision context
* Visually hidden accessibility instructions

The test is not whether information repeats. The test is whether each appearance performs a distinct necessary job in its current context.
