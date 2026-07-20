# Example 04: Drag to Reorder with Full Modality Parity

## Scenario

User sorts a priority list.

Drag is direct manipulation, but it shouldn't be the only way.

## Object model

```text
Item
Current position
Target position
Ordering rule
Persistence state
```

## Pointer and touch behavior

```text
Press drag handle, not the entire row, when rows contain other controls.
Provide a clear lifted state.
Keep a visible origin placeholder.
Show legal drop positions.
Auto-scroll only near edges and at a controlled speed.
Cancel when released outside legal region or via Escape.
Commit only on valid drop.
```

## Keyboard behavior

Recommended pattern:

```text
1. Focus drag handle.
2. Press Space to pick up.
3. Use Arrow keys to move.
4. Announce the new position after each move.
5. Press Space to drop.
6. Press Escape to cancel and restore original order.
```

Also provide explicit `Move up` and `Move down` commands where simplicity matters more than direct manipulation.

## State model

```text
idle
pickup
moving
validTarget
invalidTarget
dropping
committing
committed
commitFailed
cancelled
```

## Motion

```text
Lift: 140ms scale/elevation cue
Neighbor displacement: 180–220ms from current rendered positions
Drop: 180ms settle
Failure rollback: explain and return clearly, not silently snap
Reduced motion: no lifted travel; use outline, placeholder and text announcement
```

## Feedback

```text
Visual: placeholder and insertion indicator
Haptic: optional light confirmation on valid drop
Auditory: optional platform-consistent cue
Screen reader: “Picked up X, position 2 of 6”; “Moved to position 3”; “Dropped”
Persistent: saved order or pending status
```

## Failure handling

```text
If persistence fails:
  Keep the intended local order visible only if clearly marked pending and retryable.
  Otherwise restore the server order and explain what was not saved.

Never silently lose the user’s ordering effort.
```

## Acceptance tests

```text
The list can be reordered without drag.
Interactive controls inside the row remain operable.
Touch scrolling does not accidentally start a drag.
Keyboard pickup, movement, drop and cancel all work.
Rapid reorder operations do not produce stale final order.
Failure preserves or clearly restores state with recovery.
```
