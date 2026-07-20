# Interaction QA Checklist

## State

```text
[ ] Every documented state can be reached.
[ ] No undocumented state appears.
[ ] Visual state matches remote and local truth.
[ ] Pending, success, error, stale and conflict are distinguishable.
[ ] Disabled state has a valid reason and alternative when needed.
```

## Pointer and hover

```text
[ ] Hover is not required for primary completion.
[ ] Fast pointer transit does not trigger accidental reveal.
[ ] Exit grace prevents flicker without trapping the reveal.
[ ] Pointer can move into revealed content without closure.
[ ] Overlays handle viewport collision and clipping.
```

## Keyboard

```text
[ ] Focus indicator is always visible.
[ ] Tab order follows task order.
[ ] Enter and Space follow platform expectations.
[ ] Escape dismisses temporary layers.
[ ] Focus returns to a valid logical origin.
[ ] Arrow keys work only where the component pattern expects them.
```

## Touch

```text
[ ] Every hover behavior has an explicit touch path.
[ ] Targets are large and separated enough for intended context.
[ ] Long press and swipe are shortcuts, not sole access paths.
[ ] Scroll and gesture recognition do not fight each other.
[ ] Accidental edge or palm input is handled.
```

## Screen reader

```text
[ ] Role, name, state and value are correct.
[ ] Dynamic state changes are announced only when useful.
[ ] Live regions do not repeat or flood announcements.
[ ] Hidden content is actually hidden from the accessibility tree when appropriate.
[ ] Visual and reading order are coherent.
```

## Motion

```text
[ ] Every animation has a stated purpose.
[ ] No animation forces unnecessary waiting.
[ ] Reversal starts from the current rendered state.
[ ] Rapid repeated actions remain stable.
[ ] Layout does not jump unexpectedly.
[ ] Reduced motion removes risky spatial movement while preserving state meaning.
[ ] Auto-moving content can pause, stop or is avoided.
```

## Async and latency

```text
[ ] Input is acknowledged immediately.
[ ] Duplicate submission is prevented.
[ ] Slow states are testable.
[ ] Timeout and retry are clear.
[ ] Offline behavior is defined.
[ ] Stale or out-of-order responses cannot overwrite newer truth.
[ ] Long work can be cancelled or backgrounded where feasible.
```

## Error and recovery

```text
[ ] Errors identify what happened.
[ ] Errors identify what was not completed.
[ ] User input is retained.
[ ] Recovery action is concrete.
[ ] Undo accurately restores state.
[ ] Destructive actions communicate object and scope.
```

## Kura high-risk checks

```text
[ ] PHI is not exposed through accidental hover.
[ ] Clinical status is not inferred from color or animation alone.
[ ] Draft, pending, placed, collected, reviewed and acknowledged remain distinct.
[ ] High-risk actions require current permission and current data.
[ ] Audit evidence survives toast dismissal.
[ ] Optimistic UI is not used as false clinical confirmation.
```
