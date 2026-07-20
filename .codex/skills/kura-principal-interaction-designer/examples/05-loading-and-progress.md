# Example 05: Loading, Progress and Background Work

## Scenario

An action can complete immediately, take a few seconds, or continue in the background.

## Time model

| Observed duration | Behavior |
|---|---|
| Near immediate | Acknowledge input, then show result without spinner flash |
| Short but noticeable | Show local pending state or skeleton |
| Several seconds | Show progress meaning and preserve control |
| Long or uncertain | Allow cancel, background, notification or safe navigation away |

## State model

```text
idle
acknowledged
queued
processing
partiallyComplete
complete
failed
cancelRequested
cancelled
```

## Avoid

```text
Generic spinner with no object or task context
Progress that resets unexpectedly
Blocking full-screen loader for a local update
Animation that implies progress when no work is occurring
Success shown before server confirmation for high-risk changes
```

## Recommended feedback

```text
Button acknowledges immediately.
Object or region shows pending state.
Progress copy identifies the work.
Known progress uses determinate progress.
Unknown progress uses stage-based status when possible.
User can continue unrelated work.
Completion creates persistent evidence.
Failure identifies retained work and next action.
```

## Motion

Loading motion should communicate liveliness, not hypnotize.

```text
Use contextual skeletons when structure is known.
Avoid large repeated spatial motion.
Do not animate every placeholder independently.
Respect reduced motion.
Pause loops when hidden or offscreen.
```

## Acceptance tests

```text
The action is acknowledged immediately.
A fast response does not flash an unnecessary loader.
A slow response explains what is happening.
Long work can be cancelled or backgrounded where feasible.
Navigating away does not silently destroy the task.
Completion and failure are distinguishable and persistent enough to verify.
```
