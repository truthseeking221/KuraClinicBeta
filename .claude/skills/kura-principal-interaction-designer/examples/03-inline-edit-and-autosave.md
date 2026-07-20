# Example 03: Inline Edit with Autosave

## Scenario

The user edits a field right in the detail view. The system saves automatically to reduce steps, but local edit, pending save and committed save must be clearly distinguished.

## State truth

```text
viewing
editingClean
editingDirty
validating
saving
saved
saveFailed
conflict
```

Do not use a single check icon for both `valid local value` and `saved remotely`.

## Transition table

| From | Event | To | Feedback |
|---|---|---|---|
| viewing | Edit | editingClean | Field becomes editable, focus moves to input |
| editingClean | Type | editingDirty | Dirty indicator appears subtly |
| editingDirty | Pause or blur | validating | Local validation begins |
| validating | Valid | saving | “Saving…” appears locally |
| saving | Server confirms | saved | “Saved” with persistent timestamp when relevant |
| saving | Server rejects | saveFailed | Error and Retry, input retained |
| saving | Newer remote version | conflict | Show comparison and resolution choices |
| editingDirty | Escape | viewing | Revert local draft after appropriate confirmation policy |

## Debounce policy

```text
Debounce network save, not local input.
Do not delay visible typing feedback.
Do not send one request per keystroke.
Cancel or supersede older pending requests.
Ignore stale responses using request version or mutation ID.
```

## Feedback placement

Save feedback is attached to the field or edit region, not only in a global toast.

```text
Dirty: subtle dot or “Unsaved changes”
Saving: inline progress text
Saved: short confirmation with optional timestamp
Failed: inline error plus Retry
Conflict: persistent callout with resolution controls
```

## Keyboard behavior

```text
Enter starts editing only when it does not conflict with multiline input.
Escape cancels local edit before commit.
Tab follows form order.
Focus does not jump on save completion.
```

## Motion

```text
Edit affordance reveal may use 140ms contextual motion.
Status text crossfade may use 140ms.
Do not animate the field width while the user is typing.
Do not move focus or scroll on background save completion.
```

## Recovery

```text
Retain input after save failure.
Allow retry without retyping.
Allow copy before conflict resolution.
Do not label local optimistic state as committed.
```

## Acceptance tests

```text
Typing remains responsive during slow network.
Only the newest value can become committed.
A failed save preserves the draft.
A stale success response cannot overwrite a newer edit.
Screen reader users hear failure and committed success without repetitive noise.
The field remains operable with reduced motion.
```
