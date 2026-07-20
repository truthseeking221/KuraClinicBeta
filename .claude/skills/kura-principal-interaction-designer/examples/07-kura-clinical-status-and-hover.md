# Example 07: Kura Clinical Status with Contextual Hover Details

## Scenario

A result row needs to display the main state clearly at all times. Hover may provide provenance or audit details, but may not conceal clinical meaning.

## State vocabulary

```text
Result ready
Result reviewed
Result acknowledged
Critical result escalated
Follow-up pending
```

These states are not synonymous.

## Always visible

```text
Test name
Current canonical status
Result date and time
Critical or abnormal indicator using text plus noncolor cue
Primary review action when applicable
```

## Contextual reveal allowed

```text
Reviewer name
Review timestamp
Source laboratory
Version or correction history
Audit reference
Secondary actions such as copy reference ID
```

## Contextual reveal not allowed

```text
Only evidence that a result is critical
Only path to acknowledge or escalate
Patient-identifying information not otherwise authorized
Medication or order consequence
```

## Hover and focus behavior

```text
Pointer hover after intent delay reveals an audit popover.
Keyboard focus exposes an explicit “View audit details” button.
Touch uses the same button and opens a sheet or popover.
The popover does not open from accidental row transit.
The popover never changes the clinical status itself.
```

## State truth contract

```text
“Reviewed” is displayed only after the review event is committed.
“Acknowledged” requires its own committed event.
“Escalated” includes persistent evidence of destination and time.
A toast cannot be the only proof of a high-risk transition.
```

## Sensitive information

```text
Permission is checked at open time, not only at page load.
The popover auto-closes on session lock.
No PHI appears in hover preview if pointer transit can reveal it unintentionally.
Screen recording and shoulder-surfing risk are considered.
```

## Motion

```text
Use a subtle anchored reveal to show source relationship.
No pulsing critical badge.
No looping red animation.
Reduced motion uses instant open and close.
```

## Acceptance tests

```text
Clinical status is understandable without hover, color or animation.
Review and acknowledgement remain distinct.
Touch and keyboard expose audit details explicitly.
Permission changes close or block the detail surface safely.
No late response can apply an action to the wrong result.
High-risk transition evidence remains visible after temporary feedback disappears.
```
