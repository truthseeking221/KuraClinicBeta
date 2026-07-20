# Feedback, Causality, and System Status

## 1. Feedback is the system's response

An interaction did not end when the event was sent. It ends when the user understands the results and knows the next step.

Four-layer model:

```text
Acknowledgement
Progress
Outcome
Continuation or recovery
```

Not every interaction needs all four, but consequential actions often do.

## 2. Acknowledgement

Acknowledgement proves that input has been received.

For example:

* Pressed state.
* Toggle thumb starts moving.
* Row is selected.
* Drag object to pointer.
* Button switches to busy.
* Input value appears immediately.

The goal is to preserve the cause and effect relationship. If acknowledgment is slow, the user may tap again, change direction, or lose confidence.

## 3. Progress

Progress replied “Is the system still working?”

Select pattern by duration and predictability:

### Indeterminate

Use when the amount of work is unknown. Mention the task at hand, not just the spinner.

### Determinate

Use when there is a reliable total. Allows time prediction.

### Stage-based

Use when you know the steps but don't know the percentages.

### Skeleton

Used when the content structure is known and the content is coming.

### Background

Used when the operation is long and the user can continue. Need a place to monitor and notify when finished.

## 4. Outcome

Distinguish:

```text
request accepted
processing
saved locally
synced
confirmed
partially completed
failed
```

Do not use one checkmark for all.

Outcome R2–R4 needs persistent evidence in the object or record, not just toast.

## 5. Continuation

After the outcome, the user needs to know:

* Continue where.
* Do you need a review?
* Can you undo it?
* Is there a next item?
* Failure holds back what.
* Who is responsible for moving on?

Success should not be a dead end.

## 6. Feedback locality

Place feedback near:

1. Control causes action.
2. Object is changed.
3. The area the user is looking at.

Good example:

* Save status in the button itself or next to the title.
* Validation of field edges.
* A reorder placeholder in the list.
* Updated count next to filter result.

Use global notification when impact global or source is no longer on screen.

## 7. Least intrusive sufficient feedback

Order from mild to strong:

```text
visual state
inline text
status region
popover
banner
toast
dialog
blocking interlock
```

Choose the lowest level that still ensures user understanding.

No modalize error can be fixed inline. Do not use toast for data loss. Don't use large animations for small states.

## 8. Cause and effect with motion

Motion is useful when it shows:

* Source to create destination.
* Object moved, inserted, removed or transformed.
* Where does hidden layer come from.
* Control which regions affect.
* Error related to which field.

### Insert

Open space and place items in a continuous manner. Do not teleport items and then make the entire list jump.

### Remove

Lets users know which items leave before the space closes. With delete bulk, avoid long consecutive animations.

### Reorder

Other items translate to represent destination. Placeholder and drop indicator must be clear.

### Expand

Content develops from triggers or containers. Don't open from the center of the screen if the relation is local.

### Navigation

Motion direction reflects hierarchy or spatial model. Do not change direction arbitrarily between equivalent screens.

## 9. Feedback for multi-state control

A control can handle multiple states if the meaning is clear:

```text
Save
→ Saving…
→ Saved
→ Save failed / Retry
```

Requirements:

* Stable width or transition does not cause layout to shake.
* State text is not too fast to read.
* Busy does not clear context.
* Failure does not turn into unknown generic icon.
* Confirmed state returns to resting state according to consistency rules.

## 10. Feedback for repeated actions

With frequent actions:

* Feedback must be light and fast.
* Can aggregate instead of toast each time.
* Do not read screen reader announcements repeatedly unnecessarily.
* Rapid input is coalesced if semantics allow it.
* Visual changes to objects are often enough.

For example: star/unstar should change state at icon; No need to toast every time.

## 11. Feedback for destructive actions

Previous:

* Scope and consequences are clear.
* Object is defined.

Include:

* Acknowledge action.
* Do not fake success before confirmation if it is consequential.

Sau:

* Remove clear state.
* Undo if available.
* If failed, restore object and explain.

## 12. Feedback for external changes

When state changes due to other people or background processes:

* Does not steal focus.
* Highlight changed just enough to locate.
* Indicates freshness or actor when relevant.
* Allow review or merge when conflicts occur.
* Do not silently overwrite local work.

## 13. Attention escalation

Use escalation according to severity:

```text
subtle cue
→ persistent status
→ highlighted region
→ banner
→ modal interruption
→ alarm
```

Do not use red, shake, flash or sound for any warnings. Over-warning causes the signal to lose value.

## 14. Acceptance tests

1. Input is acknowledged immediately.
2. User distinguishes between pending and confirmed.
3. Feedback is in the right place.
4. Slow response has appropriate progress.
5. Failure holds input and has retry.
6. External update does not steal focus.
7. Toast is not the only evidence for consequential change.
8. Motion shows the correct source and destination.
9. Rapid repeat does not create notification storm.
10. Screen reader receives important state changes.
