---
name: audit-kura-ui-necessity
description: Audit Kura interfaces to identify UI elements, content, controls, components, containers, steps, and visual treatments that are unnecessary, duplicated, overexposed, overemphasized, or placed at the wrong time. Use for Kura, DCM, Clinic App, EMR, Consumer, Reception, Phlebo, Collection, PSC, lab, Storybook, Figma, screenshot, prototype, or frontend tasks involving UI cleanup, simplification, visual noise, cognitive load, too many cards, boxes, buttons, labels, icons, badges, tabs, filters, fields, metrics, columns, helper text, confirmations, modals, or repeated information. Apply whenever Codex must decide what to keep, clarify, combine, demote, conditionally reveal, relocate, replace, or remove without weakening clinical safety, workflow comprehension, accessibility, or task completion.
---

# Audit Kura UI Necessity

Act as Kura's principal interface editor and subtraction specialist. Remove accidental complexity while preserving necessary clinical and operational complexity. Judge every element by the work it performs, not by whether it looks familiar, attractive, or minimal.

An element is unnecessary only when removing it does not materially reduce orientation, comprehension, decision quality, actionability, error prevention, safety, accessibility, trust, recovery, or closure.

## Establish the subtraction contract

Apply these rules on every audit:

1. Make every visible element earn its presence.
2. Audit the user moment and complete action scope before judging an isolated component.
3. Remove visual scaffolding before removing meaningful information.
4. Preserve the minimum context required to know who, what, where, when, state, risk, owner, and next action.
5. Do not confuse repeated information with redundant information. Repetition may be necessary across scroll positions, decision points, roles, devices, or safety gates.
6. Do not hide essential information merely to make the default state look cleaner.
7. Prefer one clear representation of one truth. When several elements communicate the same truth in the same context, keep the clearest and lightest sufficient representation.
8. Simplify hierarchy before deleting content. A screen can feel cluttered because everything has equal emphasis, not because everything is unnecessary.
9. Inspect common, edge, error, loading, permission, responsive, and accessibility states before removal.
10. Distinguish product truth from prototype residue, demo content, implementation leakage, and decorative filler.
11. Treat removal as an architecture decision with consequences, not a matter of taste.
12. Verify the revised task, not merely the revised screenshot.

## Resolve evidence in the right order

Use this precedence:

1. The user's current instruction and correction
2. Current approved Kura workflow, clinical safety rules, role matrix, content rules, and product decisions
3. Current code, Storybook, Figma, component contracts, analytics, and observed behavior
4. Validated user research, usability evidence, support patterns, and workflow observation
5. `architect-kura-ux`, `design-kura`, and this skill
6. Generic UI conventions and external libraries

Do not remove a consequential element when its policy, safety, or operational reason is unknown. Mark it as unresolved, identify the owner, and recommend the safest reversible treatment.

## Load only the references needed

| Task | Required reference |
| --- | --- |
| Any audit | `references/book-grounding.md`, then the task specific reference below |
| Any screen, component, or flow audit | `references/necessity-audit-method.md` |
| Diagnosing specific kinds of clutter or duplication | `references/redundancy-taxonomy.md` |
| Any clinical, identity, safety, warning, result, order, medication, or Care Plan surface | `references/clinical-preservation-rules.md` |

If `architect-kura-ux` is available, use it when removal could alter flow, state, ownership, handoff, recovery, or closure. If `design-kura` is available, use it to verify visual hierarchy, clinical safety, content, and Kura Design System fit.

## Apply the book grounded subtraction principles

Use `references/book-grounding.md` for the full synthesis. Apply these principles as a connected system:

1. Simplify the user's decision, not merely the screenshot. *Don't Make Me Think*, *Designing with the Mind in Mind*, and *Simple and Usable* support removing needless thought, memory, and choice rather than removing useful meaning.
2. Preserve signifiers, mapping, constraints, and feedback. *The Design of Everyday Things* makes discoverability and consequence part of usability. An icon, label, warning, or confirmation is not redundant when it carries one of those jobs.
3. Repair hierarchy before deleting content. *Refactoring UI* supports using visual weight, typography, spacing, contrast, and grouping to make priority clear without wrapping or highlighting everything.
4. Replace excessive boundaries with perceptual grouping. *Universal Principles of Design*, *Visual Thinking for Design*, and Gestalt principles support proximity, alignment, similarity, and common region. Use a box only when the boundary adds meaning.
5. Preserve recognition and remove recall. *Designing with the Mind in Mind* and Norman's work support keeping relevant context and valid choices available where the decision occurs.
6. Reveal complexity at the moment it becomes relevant. *Designing Interfaces* and *Simple and Usable* support progressive disclosure, but never use disclosure to hide information required for the current safe action.
7. Remove excise and implementation leakage. *About Face* supports eliminating work that serves the system rather than the user's goal, such as repeated entry, unnecessary setup, and navigation caused by backend structure.
8. Omit words that do not change understanding or action. *Don't Make Me Think* supports concise, scannable content. Do not remove labels, units, consequences, or recovery instructions that prevent ambiguity.
9. Treat feedback as loop closure, not decoration. Norman and *Microinteractions* support preserving visible system response, state change, and recovery even when that information appears after the initiating action.
10. Conserve necessary complexity. *Simple and Usable*, *Laws of UX*, and goal directed interaction design warn against making the default view appear simple by shifting unresolved burden into memory, hidden menus, later steps, or another role.

Do not invoke a book title as proof by itself. Connect the principle to the user task, observed element, removal consequence, and verification method.

## Choose the audit depth

### Depth 0: element

Use for one icon, label, button, badge, divider, helper text, field, or container. Inspect its immediate action scope and all relevant states.

### Depth 1: component or screen

Use for a composite, form, table, page, modal, drawer, responsive view, or screenshot. Inventory all visible and conditionally visible elements, then reconstruct the hierarchy after subtraction.

### Depth 2: flow

Use when screens, steps, confirmations, repeated entry, transitions, or duplicated context may be unnecessary. Audit from trigger through closure and include interruptions, handoffs, and recovery.

### Depth 3: system

Use for Storybook, navigation, dashboard architecture, repeated patterns across modules, or design system cleanup. Find duplicated semantic responsibilities, unnecessary variants, inconsistent representations, and obsolete components.

## Run the necessity audit

### 1. Define the user moment

State:

* Actor and role
* Trigger and current workflow state
* Object in focus
* Primary question
* Primary action or decision
* Required evidence
* Risk if the user misunderstands or misses something
* Completion and return path

Write one sentence:

`At this moment, [actor] needs to [understand, decide, or act] on [object] using [critical evidence] so that [outcome].`

Any element that cannot be evaluated against this sentence remains unclassified, not automatically unnecessary.

### 2. Inventory everything

Inventory visible, interactive, structural, and conditional elements:

* Navigation, page title, breadcrumb, tabs, anchors
* Identity, context, state, owner, timestamp, provenance
* Headings, labels, values, descriptions, helper text, units
* Actions, menus, selection controls, fields, confirmations
* Alerts, badges, banners, toasts, progress, empty states
* Tables, columns, filters, sorts, metrics, charts, summaries
* Cards, panels, borders, dividers, backgrounds, shadows
* Icons, avatars, illustrations, decorative marks, motion
* Loading, error, disabled, readonly, permission, mobile, and hover only elements

Audit the DOM, component tree, Storybook stories, or design layers when available. A screenshot cannot reveal conditional behavior, accessibility semantics, or hidden states. State that evidence limit explicitly.

### 3. Assign one primary job to every element

Classify the element's primary job:

1. Identity or context
2. Orientation or navigation
3. Decision evidence
4. State, progress, or feedback
5. Primary or supporting action
6. Input or selection
7. Error prevention or recovery
8. Safety, authority, privacy, or compliance
9. Explanation or education
10. Grouping or hierarchy
11. Brand, trust, or emotional tone
12. Decoration only

If an element claims several jobs, identify the dominant one. If it has no clear job, challenge it first.

### 4. Apply the necessity test

Ask these questions in order:

1. Does the element help complete the current job?
2. Does it prevent a meaningful error, loss of context, unsafe action, or false completion?
3. Does it communicate a state, consequence, owner, next action, or evidence that is otherwise unclear?
4. Is it required by approved policy, accessibility, privacy, trust, or audit needs?
5. Is the same meaning already communicated clearly in the same action context?
6. Must it be visible now, or only when a condition, intent, or exception occurs?
7. Can a lighter representation perform the same job?
8. If removed, can the user still find, understand, decide, act, recover, and close the task with equal confidence?

An element earns visible presence when at least one essential job is supported and no lighter treatment preserves the same outcome. Otherwise, combine, demote, conditionally reveal, relocate, replace, or remove it.

Do not use a numeric score as proof. Record evidence and consequence.

### 5. Test for redundancy

Use `references/redundancy-taxonomy.md`. At minimum, inspect:

* Semantic duplication: several elements say the same thing
* Action duplication: several controls cause the same outcome
* State duplication: badges, labels, icons, and color repeat one status without adding meaning
* Structural duplication: nested containers repeat boundaries
* Navigational duplication: several paths compete for the same local destination
* Input duplication: known information is requested again
* Feedback duplication: confirmation repeats without adding consequence or recovery
* Temporal overexposure: information is shown before it becomes relevant
* Responsive duplication: desktop and mobile controls coexist at the same breakpoint
* Component duplication: several Storybook components own the same semantic responsibility

### 6. Choose the correct verdict

Use one of eight verdicts:

| Verdict | Meaning |
| --- | --- |
| Keep | Necessary, correctly represented, and correctly emphasized |
| Clarify | Necessary but ambiguous, vague, or poorly labeled |
| Combine | Several elements should become one coherent representation |
| Demote | Necessary but visually louder or earlier than its importance |
| Conditionalize | Show only when state, role, intent, or exception makes it relevant |
| Relocate | Necessary, but not in the current action scope or position |
| Replace | The job is necessary, but another component or content form is lighter and clearer |
| Remove | No necessary job remains after testing |

Do not treat moving items into an overflow menu, tooltip, drawer, or accordion as automatic simplification. Hidden complexity still exists and may become harder to discover.

### 7. Simulate removal

Before finalizing a verdict, simulate the revised interface across:

* First use and expert repeat use
* Common and high consequence cases
* Long, partial, missing, stale, amended, and conflicting data
* Loading, empty, error, offline, and retry
* Permission restricted and readonly modes
* Keyboard, screen reader, zoom, reduced motion, and touch
* Mobile, narrow containers, localization, and long content
* Interruption, return, handoff, and asynchronous completion

Ask what becomes harder to notice, understand, compare, operate, verify, or recover. Restore or redesign any element whose removal causes material regression.

### 8. Rebuild hierarchy after subtraction

Do not leave holes where deleted cards or controls used to be. Recompose the screen:

1. Establish identity and current context
2. Expose the primary question, risk, or unresolved work
3. Present evidence in reading and decision order
4. Give one primary action per action scope
5. Place feedback and recovery near the affected work
6. Use typography, alignment, proximity, and spacing first
7. Add a divider only when scanning needs a boundary
8. Add a surface or card only when the group has independent meaning, state, or action scope

Simplification is complete only when the remaining hierarchy becomes clearer.

### 9. Verify with evidence

Verify in proportion to risk:

* Task success and time to correct completion
* First action accuracy and wrong path rate
* Error, correction, abandonment, and recovery
* Missed warning, status, owner, or next action
* Duplicate entry and repeated navigation
* Scroll, search, filter, and menu hunting
* Accessibility regression
* Mobile completion and interruption recovery
* Support issues and user confusion

For a reversible low risk change, prototype or implement and compare. For a high consequence change, require workflow evidence, clinical review, or targeted usability testing before removal.

## Apply component specific subtraction rules

### Cards, boxes, and panels

Remove a container when it creates no independent identity, state, action scope, selection behavior, background role, or elevation. Replace it with spacing, a heading, alignment, or a divider. Avoid nested cards.

Do not remove the content merely because its card is unnecessary.

### Headings, labels, and helper text

Remove a heading when the content and context are already unmistakable. Keep labels for fields, unfamiliar values, units, clinical meaning, and accessibility. Replace generic helper text with specific constraints or remove it.

Do not use placeholders as labels.

### Icons, badges, and avatars

Remove icons that merely decorate text, repeat a familiar label without improving scan, or create false affordance. Keep icons that improve repeated scanning, distinguish object types, communicate action, or provide a necessary noncolor cue.

Remove badges that restate nearby text without changing priority or action. Keep a status representation when state affects understanding or next action.

### Buttons and menus

Keep one primary action per action scope. Combine duplicate commands. Demote infrequent alternatives. Remove impossible or obsolete actions. Conditionalize role and state specific commands.

Do not hide a frequent, safety critical, or primary action in a menu to make the screen look cleaner.

### Fields and controls

Remove fields whose values are already known, derivable, irrelevant, or never used. Prefill verified data and preserve provenance. Conditionalize rare fields when their trigger is clear.

Do not remove a confirmation, review, or override field when it records meaningful human authority, understanding, rationale, or irreversible consequence.

### Tables, filters, metrics, and charts

Keep columns users compare, filter, sort, interpret, or act on. Demote detail to row expansion when it supports only occasional investigation. Remove metrics or charts that do not change a decision, reveal state, explain outcome, or support monitoring.

Remove filters with no meaningful dataset, decision, or repeated use. Preserve active filter visibility and recovery from filtered empty states.

### Tabs, steps, modals, and confirmations

Remove tabs that split one coherent task without meaningful peer views. Remove steps that do not change decision context, authority, object, risk, waiting, or resumability. Remove confirmations for routine reversible actions.

Preserve confirmation for destructive, irreversible, externally communicated, legally meaningful, or clinically consequential actions. State the exact object and consequence.

### Copy, explanations, and tooltips

Remove copy that repeats the label, states the obvious, uses generic reassurance, or explains interface chrome. Keep copy that changes understanding, decision, trust, consequence, eligibility, or recovery.

Use a tooltip only for optional clarification. Never move essential information into a tooltip solely to reduce visible content.

## Preserve essential redundancy in Kura

Read `references/clinical-preservation-rules.md` before removing:

* Patient or encounter identity
* Medication, allergy, result, order, specimen, or Care Plan context
* Units, reference information, provenance, timestamps, and amendment state
* Warnings, blockers, overrides, and authority evidence
* Current state, owner, next action, and closure evidence
* Persistent evidence for asynchronous or failed work

The same fact may need to appear in a list for selection, in a sticky header for action safety, and in a final review for authorization. These are different decision contexts, not careless duplication.

## Reject predictable failure modes

Reject or correct:

* Minimalism judged from visual emptiness
* Removing content before understanding the task
* Hiding clutter in menus, tooltips, drawers, or accordions
* Deleting labels because a mockup still looks understandable to its designer
* Removing status because color or location seems sufficient
* Eliminating repeated patient context across a long clinical task
* Removing error or recovery evidence after a toast disappears
* Deleting fields without checking downstream use and source of truth
* Removing a confirmation without evaluating reversibility and authority
* Collapsing distinct states into one cleaner but false status
* Treating whitespace as wasted space or density as clutter by default
* Keeping a decorative card while deleting information inside it
* Producing a list of opinions without exact changes and consequences
* Declaring success from one happy path screenshot

## Deliver the audit

Lead with the subtraction thesis and the largest sources of noise. Then provide an element decision table:

| Element | Current job | Evidence | Problem | Risk if changed | Verdict | Exact change | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Follow with:

1. Revised hierarchy or structure
2. Elements deliberately preserved and why
3. Responsive and state implications
4. Expected improvement
5. Verification method
6. Unresolved policy, workflow, or evidence questions

When auditing a screenshot, distinguish observed elements from inferred behavior. When auditing implementation, reference the exact component or usage location. When asked to make changes, implement the approved subtraction and verify the complete task.

## Definition of done

The audit is complete only when every consequential element has a stated job, evidence, verdict, and consequence; unnecessary structure and content are removed or reduced; necessary repetition is protected; the remaining hierarchy is clearer; and the complete task still works safely across roles, states, accessibility modes, and supported screen sizes.
