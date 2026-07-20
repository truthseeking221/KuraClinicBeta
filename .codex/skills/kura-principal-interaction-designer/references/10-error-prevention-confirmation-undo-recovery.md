# Error Prevention, Confirmation, Undo, and Recovery

## 1. Design for people who are prone to interruptions

Errors do not only come from ignorance. It comes from:

* Attention redirect.
* Repeated actions.
* Mode confusion.
* Similar targets.
* Time pressure.
* Stale data.
* Network failure.
* Permission change.
* Concurrent work.
* Misleading feedback.

The goal is not to eliminate all errors by adding confirmation. The goal is to make the system resilient.

## 2. Error taxonomy

### Slip

Intent is correct, execution is wrong.

For example: click on the wrong row, double submit, select adjacent icon.

Solution: target, spacing, constraints, pointer cancellation, undo.

### Mistake

Mental model or decision is wrong.

For example: understand “Archive” as deleted, think pending as confirmed.

Solution: wording, resulting preview, conceptual model, explicit state.

### Mode error

Control works differently because the mode is different.

Solution: persistent mode cue, exit, constraint, reduce modes.

### System failure

Network, server, permission, conflict.

Solution: honest status, preserve work, retry, alternative.

## 3. Prevention hierarchy

1. Remove unnecessary decision.
2. Choose safe default.
3. Constrain impossible action.
4. Make target and scope clear.
5. Preview consequence.
6. Validate at useful time.
7. Ask confirmation only when needed.
8. Provide undo.
9. Preserve work on failure.
10. Offer recovery.

## 4. Constraints

### Physical or interaction constraints

Disable impossible drop zone, but explain state if user needs it.

### Logical constraints

Only valid combinations available.

### Semantic constraints

Context makes correct action obvious.

### Cultural or conventional constraints

Use platform conventions unless domain has strong reason.

Good Constraint prevents errors without making the user feel punished.

## 5. Validation timing

### On input

Suitable for light formats and immediate constraints. Avoid errors when new users type the first character.

### On blur

Appropriate when the field has enough data. Doesn't make the error disappear if focus returns without the value being fixed.

### On submit

Always needed as final safeguard. Focus or scroll to the appropriate error summary/first error.

### Async validation

Has validating state, stale response protection and retry.

## 6. Error message behavior

A good error reply:

```text
What failed?
Where?
Why, if known?
What was preserved?
How to fix or recover?
Is this temporary?
```

Behavior:

* Error appears near source.
* State does not depend on color.
* Motion only supports locate, not embarrassing shaking.
* Input remains the same.
* Error did not disappear before resolved.
* Summary link to fields when multiple errors.

## 7. Confirmation decision test

Use confirmation when at least one thing is true:

* Irreversible.
* High-cost.
* Affects other people.
* Sends externally.
* Scope ambiguous.
* User may not realize consequence.
* Regulatory or clinical requirement.

Do not use confirmation for:

* Low-risk reversible action.
* Frequent action.
* Action has explicit undo.
* Error caused by product can be prevented.

## 8. Confirmation anatomy

```text
specific title
object and scope
consequence
secondary effects
primary action named precisely
safe alternative
optional typed confirmation only for exceptional risk
```

Do not use “Are you sure?” like the entire message.

## 9. Destructive interaction hierarchy

### R1 low-risk

Immediate + undo.

### R2 task-critical

Explicit action, object preview, undo.

### R3 consequential

Confirmation or staged action, result, server-confirmed result.

### R4 safety-critical

Persistent review, identity/scope verification, permission, audit, minimal motion, no shortcut-only path.

## 10. Undo design

Undo needs:

* Scope is clear.
* Window is long enough or persistent history.
* Do not rely on toast-only if the action is consequential.
* Restore exact state, including order and metadata.
* Handle concurrent changes.
* Confirm undo result.

If undo is only pretend local but side effects outside the system have occurred, it is not called undo.

## 11. Retry vs resume vs restart

* Retry: perform the same operation again.
* Resume: continue from held progress.
* Restart: start again.

Copy and behavior must be correct. Do not record Retry if the user loses data and has to do it again.

## 12. Recovery ladder

```text
inline correction
retry
undo
restore draft
resume
choose alternative
contact support
manual reconciliation
```

Provides lines appropriate to severity.

## 13. Unsaved changes

Don't block navigation all the time. Choose strategy:

* Autosave.
* Draft persistence.
* Dirty indicator.
* Navigation confirmation when loss is real.
* Local recovery after crash.

Confirmation “Leave without saving?” only when work can actually be lost.

## 14. Conflict handling

When external change conflicts with local:

* Do not silently overwrite.
* Indicates object and version.
* Show differences when possible.
* Offer keep mine, use latest or merge by domain.
* Preserve both values for recovery.
* Audit R3–R4.

## 15. Error animation

Valid Motion:

* Brief highlight field.
* Scroll/anchor to error.
* Connect message to source.
* Restore object after failed delete.

Invalid motion:

* Shake the entire form several times.
* Flash red continuously.
* Error disappears automatically.
* Celebration before server confirmation.

## 16. Acceptance tests

1. Mistarget can cancel or undo.
2. Validation does not appear too early.
3. Input kept after failure.
4. Confirmation is only used when there is a sufficient reason.
5. Specific context and scope.
6. Undo restore the real state.
7. Retry does not create duplicates.
8. Conflict does not overwrite silence.
9. Error usable by keyboard/screen reader.
10. R4 has audit and authoritative confirmation.
