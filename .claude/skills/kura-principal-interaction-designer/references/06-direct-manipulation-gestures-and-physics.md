# Direct Manipulation, Gestures, and Interaction Physics

## 1. What is direct manipulation

The user acts directly on the object instead of going through an intermediary such as a dialog or menu.

For example:

* Drag item to reorder.
* Resize panel using handle.
* Crop image by frame.
* Pan map.
* Swipe row to reveal shortcut.
* Pinch to zoom.

Direct manipulation creates a strong feeling when the relationship between movement and outcome is clear. It fails when gestures are secret, constraints are ambiguous, or feedback is slow.

## 2. Four conditions of directness

### 2.1 Continuous representation

Object remains visible during operation.

### 2.2 Physical action instead of syntax

User moves or transforms object, does not enter abstract command.

### 2.3 Immediate feedback

Object responds to input with no sensing delay.

### 2.4 Reversible incremental operation

User can adjust, cancel or undo.

## 3. Discoverability ladder

Easiest word to detect:

1. Explicit instruction.
2. Contextual command.
3. Visible handle.
4. Hover/focus reveal handle.
5. Cursor or state cue.
6. Convention.
7. Experimentation.
8. Hidden gesture.

Frequently used or unexpected manipulation requires a higher level. Hidden gestures should only be shortcuts.

## 4. Drag and drop contract

### Before drag

* Which Object is draggable must be clear.
* Whole object draggable or just handleable?
* Pointer target is large enough.
* Text selection does not conflict.
* Touch scroll is not broken for no reason.
* Keyboard alternative exists.

### Drag start

* Use a small threshold to distinguish clicking from dragging.
* Preserve grab offset, object does not jump.
* Original position and clear ghost strategy.
* Announce “picked up” for assistive tech when needed.

### During drag

* Object follows direct input.
* Valid drop zones are highlighted.
* Invalid zones have constraint cue.
* A placeholder for the destination.
* Auto-scroll has limited speed.
* Do not hide destination with dragged objects; can offset ghosts.
* Escape cancel.

### Drop

* Commit on release at valid target.
* Animate a short settler.
* Update order/state authoritative.
* Persistent feedback is enough for evaluation.
* Failure rollback has continuity.
* Undo if the operation is consequential but reversible.

### Keyboard reorder

A pattern could be:

```text
focus item
→ activate move mode
→ arrows change candidate position
→ live announcement
→ Enter commits
→ Esc cancels
```

Do not force user keyboard to simulate pointer pixel by pixel.

## 5. Swipe actions

Swipe can save space but discoverability is low.

Rules:

* Swipe is a shortcut, not a sole path.
* Has visible overflow/menu alternative.
* Direction consistent with platform and reading direction.
* Action revealed before commit except gesture is very clear and low risk.
* Destructive action did not commit due to an accidental short swipe.
* Reasonable Threshold and velocity.
* The item follows the finger.
* Release in intermediate state with clear snap.
* Support undo.

Do not place multiple two-sided actions if it is difficult for the user to remember.

## 6. Long press

Long press is suitable for:

* Context menu.
* Preview.
* Expert shortcut.
* Drag initiation when needing to avoid scroll conflict.

Not suitable for primary action because it is not visible and the timing is unpredictable.

Need:

* Progress cue if hold duration is significant.
* Cancel when finger moves outside threshold.
* Haptic feedback if the platform supports it and is suitable.
* Tap alternative.

## 7. Pinch, zoom, rotate

* Content must be continuously responsive.
* Zoom focal point according to finger position.
* Min/max constraints have slight resistance or bounce.
* There are button alternatives when zoom is needed for the task.
* Do not disable browser/system zoom for custom gestures.
* Rotation only if the domain has meaning.

## 8. Gesture conflict

Common conflicts:

* Horizontal swipe vs browser back.
* Vertical drag vs page scroll.
* Pinch custom vs page zoom.
* Long press vs text selection.
* Edge gesture vs OS navigation.

Solved with:

* Only takes up gestures in areas with signifiers.
* Threshold and direction lock.
* Delay capture until intent is clear enough.
* Alternative visible.
* Do not override system behavior if there is no large value.

## 9. Interaction physics

“Physics” in UI is an expectation, not an absolute physics simulation.

### Mass

Large or consequential objects may move a little slower. Do not make heavy UI into slow UI.

### Friction

Friction helps avoid overscroll or accidental dragging. Too much causes interaction lag.

### Inertia

Suitable for scroll, carousel, map. Need predictable stop and cancel with new input.

### Elasticity

Used at boundary to indicate constraint. No infinite bounce.

### Snap

Help align to valid state. Snap distance must be appropriate and destination visible.

### Resistance

Indicates that the action exceeds the limit or is consequential. Do not use to manipulate the user from making a valid choice.

## 10. Direct manipulation and data truth

Visual movement does not mean a successful commit.

Remote reorder example:

```text
user drops
→ local order updates
→ pending marker
→ server confirms
→ confirmed
```

If server fails:

* Restore order or give retry.
* Explanation.
* No silent diverge.

For R3–R4, consider holding candidate state until confirmation.

## 11. Precision and target

An accurate pointer does not mean the target should be small. Touch and motor variability require:

* Target is large enough.
* Spacing avoids wrong targets.
* Handle has a larger hit area than shown.
* Edge target takes advantage of boundary.
* Frequent targets near natural posture.

## 12. Multi-selection

Distinguish:

* Select item.
* Open item.
* Toggle checkbox.
* Enter selection mode.

Do not let the tap row be both open and select ambiguously.

Selection mode requires:

* Count selected.
* Bulk actions persistent.
* Clear all.
* Exit mode.
* State survives scroll.
* Destructive scope is clear.

## 13. Direct editing

Inline editing is good when:

* Important context.
* Field less.
* Simple validation.
* Save behavior clearly.

Contract:

```text
view state
→ enter edit
→ dirty state
→ validate
→ save pending
→ confirmed or failed
→ view state
```

Do not use click text to edit without affordance or consistent pattern. Hover pencil can be a secondary cue but keyboard/touch path must be present.

## 14. Acceptance tests

1. Novice has visible path.
2. Gesture is a shortcut if it is difficult to discover.
3. The dragged object follows the input.
4. Clicking should not be mistaken for dragging.
5. Scroll is not broken.
6. Invalid drop visible before release.
7. Esc cancel works.
8. Keyboard alternative complete with outcome.
9. Failure rollback is clear.
10. Reduced motion does not lose feedback.
11. Touch target and posture are tested on real devices.
