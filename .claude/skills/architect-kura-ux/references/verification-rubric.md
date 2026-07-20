# Verification Rubric

Use this reference for audits, specifications, prototypes, implementation reviews, acceptance criteria, and definition of done.

## Contents

1. Scoring rule
2. Outcome and closure
3. Context and comprehension
4. State and transition
5. Role and handoff
6. Safety and recovery
7. Component semantics
8. Responsive and accessibility
9. System and implementation
10. Evidence and acceptance criteria

## Scoring rule

Rate each relevant criterion:

* 0: absent or incorrect
* 1: partially defined or fragile
* 2: complete for common use but weak at edges
* 3: explicit, testable, and robust

Any zero in identity, authority, safety critical context, irreversible action, state transition, or failure recovery blocks completion. A high total score cannot compensate for a blocking zero.

## Outcome and closure

Verify:

* The real world job and intended outcome are explicit.
* Entry trigger and preconditions are defined.
* System, human, and domain completion are distinguished.
* Completion evidence is visible and persistent when needed.
* The owner after submission is known.
* Async work has status, timing, timeout, and recovery.
* Follow up, amendment, cancellation, reopen, and terminal behavior are defined.
* The flow does not end merely because the backend accepted a request.

## Context and comprehension

Verify:

* Patient and object identity remain unmistakable.
* Encounter or episode context remains available.
* Current state and last meaningful change are understandable.
* The primary question and next action are visually dominant.
* Required evidence is visible at the point of decision.
* Provenance, freshness, uncertainty, and amendment are communicated.
* Terminology matches the actor and approved Kura language.
* The user can predict consequence before committing.
* The user can return without reconstructing context.

## State and transition

Verify every canonical state for:

* Human readable meaning
* Entry event
* Current owner
* Allowed actions
* Exit criteria
* Permission behavior
* Status component and copy
* Notification or queue effect
* Audit event
* Timeout and escalation
* Failure and recovery
* Terminal, reopen, amend, and supersede behavior

Test invalid transitions and duplicate action attempts. Ensure the UI cannot imply a state the source of truth has not reached.

## Role and handoff

Verify:

* View, create, edit, assign, decide, sign, send, acknowledge, override, cancel, reopen, and audit permissions are explicit where relevant.
* Current ownership is separate from general capability.
* Delegation and acting on behalf of another user are visible and auditable.
* Handoffs specify sender, recipient, payload, acceptance, timing, escalation, and closure.
* The sender can distinguish delivered, accepted, acted on, and completed.
* Work cannot become ownerless through cancellation, rejection, or partial failure.
* Queues and notifications route to the correct role and workspace.

## Safety and recovery

Verify:

* Correct patient and encounter context remains visible for consequential actions.
* Case relevant risks appear where the user decides or acts.
* Warnings state severity, cause, consequence, action, and override behavior.
* Hard stops are reserved for unsafe or unauthorized completion.
* Destructive or irreversible actions name the object and consequence.
* User input survives recoverable errors.
* Offline, timeout, stale data, partial save, and integration failure do not create false completion.
* Back, cancel, close, refresh, retry, browser navigation, and session expiry are defined.
* Concurrent edits, stale versions, duplicate submissions, and late arriving evidence are handled.
* Audit captures actor, authority, time, prior state, new state, and rationale where required.

## Component semantics

For every component, verify:

* Its semantic job is stated.
* An existing Kura component was inspected first.
* Reuse, extension, composition, or creation is justified.
* Navigation components are not used as workflow states.
* Selection components match cardinality, immediacy, scale, and search needs.
* Tables are used for comparison and lists for scanning.
* Cards represent meaningful units rather than decoration.
* Overlays match task length, consequence, context, and resumability.
* Feedback scope matches inline, section, page, or transient meaning.
* Primary actions remain visible and are not hidden in menus.
* Disabled actions explain cause and resolution.
* Tooltips carry only optional clarification.
* Status never relies on color alone.
* Component state and event contracts match the workflow model.

## Responsive and accessibility

Test at supported breakpoints and constrained containers, not only device presets.

Verify:

* Mobile preserves task priority, context, evidence, and safe completion.
* Component transformation is specified, not left to generic stacking.
* Tables have a decision based narrow screen strategy.
* Overlays transform appropriately and avoid keyboard occlusion.
* Touch targets, spacing, thumb reach, and destructive action separation are sufficient.
* Keyboard path, focus order, focus visibility, and focus restoration work.
* Screen reader names, roles, values, states, errors, and live announcements are correct.
* Zoom, reflow, text scaling, localization, long names, and long values do not break meaning.
* Contrast, noncolor cues, reduced motion, and motion orientation are covered.
* Loading does not cause harmful layout shifts or false affordances.

## System and implementation

Verify:

* Canonical objects and sources of truth are explicit.
* Frontend state does not invent or overpromise backend state.
* Async events, optimistic updates, retries, idempotency, and reconciliation are defined.
* URLs, deep links, refresh, and return paths preserve valid context.
* Cross module state propagates predictably.
* Analytics distinguish attempt, validation failure, submit, system acceptance, human completion, and domain closure.
* Audit events and product analytics are not conflated.
* Storybook contains realistic state coverage and responsive examples.
* Interaction, unit, integration, accessibility, and visual regression tests cover the risk.
* No direct external kit dependency bypasses Kura's component contract.

## Evidence and acceptance criteria

Write acceptance criteria as observable outcomes. Use:

`Given [confirmed context and state], when [authorized actor or system event] performs [action], then [visible response], [canonical state transition], [ownership or notification effect], [audit evidence], and [recovery behavior if the operation fails].`

Include criteria for:

* Common completion
* Validation failure
* Permission restriction
* Async pending and timeout
* Partial or external failure
* Interruption and resume
* Duplicate submission
* Stale or amended data
* Cancellation and reopen
* Mobile and keyboard completion

Classify evidence:

| Status | Meaning |
| --- | --- |
| Confirmed | Supported by approved source or verified behavior |
| Inferred | Strongly implied but not explicitly approved |
| Proposed | New architecture decision requiring approval |
| Unresolved | Missing decision with named consequence and owner |

Do not present inferred or proposed behavior as existing Kura truth.
