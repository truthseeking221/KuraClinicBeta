# Prototyping, Testing, and Interaction Metrics

## 1. Prototype behavior, not just appearance

A prototype interaction must contain:

* Real triggers.
* State transitions.
* Timing.
* Reversal.
* Interruption.
* Focus behavior.
* Slow response.
* Error.
* Touch/keyboard path.
* Reduced motion.

A sequence frame click-through is not enough to evaluate nonblocking or direct manipulation.

## 2. Fidelity dimensions

Fidelity is not a single axis.

### Visual fidelity

Final UI similarity level.

### State fidelity

Completeness states and transitions.

### Input fidelity

Pointer, touch, keyboard, gesture.

### Data fidelity

Data is real, long, empty, stale, conflict.

### Latency fidelity

Fast, median, slow, offline.

### Error fidelity

Validation, server failure, permission, conflict.

For microinteractions, state and input fidelity are often more important than visual fidelity.

## 3. Prototype types

### Sketch/storyboard

Used to determine purpose, sequence and source/destination.

### Motion comp

Used to test timing, easing, choreography. Not enough to test input.

### Interactive prototype

Used to test trigger, responsiveness, interruption, focus.

### Production spike

Used to test performance, browser/platform behavior and actual accessibility.

Select the lowest level that answers the hypothesis.

## 4. Assumption register

Each prototype records:

```text
Assumption
Why it matters
How prototype represents it
How it will be tested
Pass criterion
Fallback
```

For example:

```text
Assumption: Secondary row actions are inevitably discovered.
Test: Five users complete row-edit task without instruction across mouse and keyboard.
Pass: At least four discover correct action without scanning unrelated menus.
Fallback: Keep overflow visible and add persistent Edit affordance.
```

## 5. Test scenarios

### Discovery

“You want to repair this item. What will you do?”

Don't say “hover”.

### Reversal

Quickly open and close, switch tabs mid-transition, tap again in animation.

### Interruption

Slow network, user back, route change, duplicate submit.

### Recovery

Server fail, offline, conflict, permission denied.

### Modality

Mouse, touch, keyboard, screen reader.

### Reduced motion

Check meaning and orientation when motion decreases.

## 6. Metrics

### Discoverability rate

Percentage of users finding the correct action without instructions.

### Time to first correct action

Time from context to trigger is correct.

### Wrong-target rate

Click/tap on the wrong target.

### Accidental activation

Action occurred but the user did not intend to do it.

### Hover churn

Number of reveals opening/closing that did not result in an action. Cao can report accidental hover or flicker.

### Task success

Is the outcome correct?

### Time on task

Need to read together success and error, not optimized for speed regardless of correctness.

### Recovery rate

Percentage of users recovering from failure.

### Reversal success

Does Undo/cancel return the correct state?

### State comprehension

User correctly describes current state, pending/confirmed and next step.

### Perceived responsiveness

Self-report after task combined with telemetry latency.

### Motion comfort

Reports about dizziness, distraction, frustration or inability to track.

## 7. Instrumentation model

Events must be semantic:

```text
interaction_exposed
interaction_discovered
interaction_started
interaction_committed
interaction_cancelled
interaction_failed
interaction_recovered
interaction_undone
```

Properties:

```text
pattern
component
input modality
risk tier
latency band
result
error type
reduced motion
```

Do not log raw hover every pixel. Only log meaningful exposure/intention if privacy and value are reasonable.

## 8. Qualitative observations

Ghi:

* Where does the user stop?
* What area do they look at.
* What do they predict.
* Do they recognize feedback?
* Do they distinguish between pending and confirmed?
* Are they afraid to try because the results are ambiguous?
* Did they change the modality?

## 9. Five-second and first-action tests

### Five-second

Evaluate hierarchy, interactive objects and current state.

### First-action

Evaluate trigger discoverability and mapping.

Do not use these tests to conclude total usability.

## 10. Motion timing tests

Compare variants using:

* Task completion.
* Repeated use.
* Error.
* Perceived speed.
* Ability to track source/destination.

Don't just ask "which one is better?"

## 11. Performance tests

* Low-end device.
* CPU throttling.
* Long list.
* Multiple animations.
* Scroll and animation simultaneously.
* Rapid input.
* Reduced motion.

Check dropped frames, delayed input and blocking.

## 12. Accessibility tests

* Keyboard only.
* Screen reader.
* Zoom.
* High contrast.
* Reduced motion.
* Touch target.
* Switch/voice names if relevant.

Automated tests are not enough for behavior.

## 13. Research caveats

* Preference does not equal performance.
* Lab does not reflect true interruptions.
* Expert users can hide the discoverability problem.
* A/B conversion does not explain cause.
* An increase in metrics can be accompanied by a decrease in trust.
* Small sample is good for finding issues but does not estimate population accurately.

## 14. Acceptance test format

```text
Given [state and context]
When [event]
Then [state transition]
And [feedback]
And [focus/announcement]
And [recovery or interrupt behavior]
```

For example:

```text
Given a row is idle
When it receives keyboard focus
Then contextual actions become visible without layout shift
And focus remains on the row trigger
And the actions are reachable in logical order
And Escape returns the row to its resting presentation
```

## 15. Ship evidence

An interaction can ship when:

* State model reviewed.
* Cross-modality tests pass.
* Error/recovery tested.
* Motion purpose documented.
* Performance acceptable.
* Risk-specific safeguards pass.
* Analytics semantics defined if needed.
* Open assumes owner.
