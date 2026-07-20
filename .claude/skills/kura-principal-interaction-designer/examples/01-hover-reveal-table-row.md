# Example 01: Contextual Row Actions Revealed on Hover

## Scenario

A list table with many rows. Action `Open` is primary and can be performed by selecting the record name. The actions `Pin`, `Duplicate` and `More` are secondary.

The goal is to reduce static noise without turning the interface into a puzzle.

## Bad pattern

```text
No visible signifier
Hover row → Edit, Delete, More appear
Touch has no equivalent
Keyboard focus reveals nothing
```

Problem:

* Essential action is hidden.
* Touch user cannot be found.
* Keyboard path is not equivalent.
* The action appears suddenly and causes the text to move.
* Delete is placed next to Open so it's easy to mistarget.

## Recommended structure

```text
Row
├── Selection control, when bulk selection exists
├── Primary link: record name
├── Persistent status and critical metadata
├── Reserved action rail
│   ├── Pin
│   ├── Duplicate
│   └── More
└── Row focus boundary
```

Action rails have a fixed width even when controls are transparent. Does not cause layout shift.

## Priority policy

| Action | Priority | Visibility |
|---|---|---|
| Open record | Primary | Always visible through the record name |
| Current critical status | Primary information | Always visible |
| Pin | Secondary | Reveal on row hover or focus-within |
| Duplicate | Secondary | Reveal on row hover or focus-within |
| More | Secondary gateway | Persistent low-emphasis icon or reveal when convention is established |
| Delete | Destructive | Inside More menu, not directly beside Open |

## State model

```text
idle
hoverEligible
hoverIntent
revealed
focusWithin
menuOpen
closingGrace
```

## Pointer behavior

```text
On pointer enter:
  Start 100ms intent timer.

If pointer exits before timer:
  Cancel reveal.

If timer completes:
  Fade action rail from 0 to 1 and translate from 4px to 0 over 140ms.

On pointer moving from row to action rail:
  Keep revealed.

On pointer leave row and action rail:
  Start 180ms exit grace.

If pointer re-enters during grace:
  Cancel close.
```

## Keyboard behavior

```text
When any row control receives focus:
  Reveal action rail immediately without hover delay.

Tab order:
  Record name → Pin → Duplicate → More → next row.

When More opens:
  Move focus to the first enabled menu item.

Escape:
  Close menu and return focus to More.
```

## Touch behavior

Option A, preferred for dense enterprise tables:

```text
Keep More persistently visible.
Place Pin and Duplicate inside More on coarse-pointer contexts.
```

Option B, when row selection is common:

```text
Tap row name → Open
Tap More → Open contextual menu
```

Do not use first tap to reveal and then second tap to navigate if that differs from the rest of the convention.

## Screen reader contract

```text
The row is not one giant clickable control.
The record name is a link.
Pin and Duplicate are buttons with object-specific accessible names.
More uses aria-haspopup="menu" and aria-expanded.
Status remains normal readable content.
```

## Motion purpose

```text
Purpose: contextual reveal and visual continuity
Duration: 140ms
Easing: enter token
Distance: 4px
Blocking: no
Reduced motion: opacity only or instant reveal
```

## Acceptance tests

```text
Primary record access works without hover.
Critical status is always visible.
Fast pointer transit does not flash row actions.
The action rail does not move row content.
Keyboard focus reveals all secondary actions.
Touch exposes the same actions explicitly.
Delete cannot be activated by a single mistarget next to Open.
The menu closes with Escape and restores focus.
```
