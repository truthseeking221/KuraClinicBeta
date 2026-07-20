# Example 02: Intent-Aware Hover Preview

## Scenario

User browses a list of documents or records. Previews can help with quick comparisons, but the full content doesn't always need to be visible.

## Design intent

Preview only appears when the pointer indicates an intention to stop, not when the user is quickly scanning through the list.

## Content policy

Always visible:

```text
Title
Owner or source
Primary status
Last updated
```

Preview reveal:

```text
Short summary
Noncritical metadata
Thumbnail or first-page image
Secondary actions
```

Never reveal accidentally:

```text
Sensitive clinical details
Private contact data
Destructive actions
Critical warnings
```

## State model

```text
idle
intentPending
loadingPreview
previewOpen
previewError
closingGrace
```

## Intent algorithm

```text
1. Pointer enters card.
2. Wait 180ms.
3. Cancel if pointer exits or crosses the card at high velocity.
4. If still eligible, begin preview fetch.
5. Show a local placeholder only when fetch is not immediate.
6. Open preview anchored to card.
7. Preserve preview while pointer moves through safe corridor.
8. Close after 220ms grace when both anchor and preview are left.
```

The exact velocity model is implementation-dependent. The behavior goal is not.

## Preview placement

```text
Prefer the side with more viewport space.
Do not cover the card title or current keyboard focus.
Flip above or below near edges.
Cap height and allow internal scrolling only when necessary.
Do not trap page scrolling.
```

## Keyboard behavior

```text
Focus on card does not automatically open a large preview unless the preview is essential.
An explicit Preview button opens it.
Escape closes it.
Focus remains in trigger unless the user explicitly moves into the preview.
```

## Touch behavior

```text
Expose a Preview button or open a bottom sheet from More.
Do not rely on long press as the only path.
Do not convert the first navigation tap into an invisible hover simulation.
```

## Loading behavior

```text
Cached preview: open immediately.
Short wait: keep anchor feedback and open when ready.
Longer wait: show compact skeleton in the preview surface.
Failure: keep card usable and offer Retry inside preview.
Stale response: ignore if user has moved to another card.
```

## Motion

```text
Enter: opacity 0→1, translate 4px→0, 140ms
Exit: opacity 1→0, translate 0→2px, 120ms
Origin: anchor edge
Reduced motion: instant or opacity-only
```

Motion connects preview to its source. It does not perform spectacle.

## Acceptance tests

```text
Scanning across five cards does not open five previews.
A deliberate pause opens the correct preview.
Moving from anchor to preview does not cause flicker.
Late network responses cannot open a preview for a card no longer active.
Keyboard and touch users have explicit preview controls.
Sensitive data is never exposed through accidental pointer movement.
```
