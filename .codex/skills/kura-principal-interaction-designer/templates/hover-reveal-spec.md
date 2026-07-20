# Hover Reveal Specification

Hover reveal is a contextual enhancement layer. It should not be the only route to action or essential information.

## Metadata

```text
Pattern name:
Surface:
Owner:
Risk tier:
Content sensitivity:
```

## 1. Reveal purpose

Select one or more:

```text
secondary action
advanced shortcut
contextual metadata
preview
explanatory hint
selection affordance
navigation expansion
```

Do not use hover reveal to hide:

```text
primary action
critical status
required instruction
error or warning
consent implication
clinical or financial consequence
only path to recovery
```

## 2. Discoverability classification

```text
Inevitable through normal interaction:
Explicitly signified:
Redundant elsewhere:
Advanced or infrequent:
Known convention:
```

Without at least one compelling reason, do not use hover reveal.

## 3. Trigger zone

```text
Trigger element:
Trigger geometry:
Pointer enter threshold:
Hover intent delay:
Pointer movement tolerance:
Exit grace period:
Safe polygon or corridor needed:
Nested trigger behavior:
```

## 4. Reveal surface

```text
In place / overlay / popover / menu / preview:
Anchor:
Placement preference:
Collision strategy:
Viewport edge behavior:
Scroll behavior:
Clipping behavior:
Z-index layer:
```

## 5. State sequence

```text
idle
eligible
intent detected
opening
open
interacting
closing grace
closed
```

### Transition table

| From | Event | To | Delay | Motion | Cancel rule |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 6. Pointer behavior

```text
On pointer enter:
On small accidental crossing:
On rapid transit:
On pointer move into revealed content:
On pointer leave trigger:
On pointer leave revealed content:
On click inside:
On click outside:
On Escape:
```

## 7. Keyboard parity

```text
Focus trigger:
Open on focus or explicit key:
Move focus into content:
Arrow navigation:
Close with Escape:
Return focus:
Tab-away behavior:
```

All essential content must appear via focus-visible, focus-within or explicit control.

## 8. Touch parity

```text
Explicit tap target:
First tap behavior:
Second tap behavior:
Outside tap behavior:
Back behavior:
Long press allowed?:
Alternative placement on small screens:
```

Do not assume the first tap is equivalent to hover if it breaks navigation expectations.

## 9. Screen reader behavior

```text
Trigger role:
aria-expanded:
aria-controls:
aria-haspopup:
Accessible name:
Announcement on open:
Announcement on close:
Reading order:
```

## 10. Motion

```text
Purpose:
Enter token:
Exit token:
Transform origin:
Maximum travel:
Opacity behavior:
Interruptible:
Reduced-motion mapping:
```

Reveal must not cause unintentional layout shift.

## 11. Sensitive content

```text
Contains PHI, PII, financial or confidential data?:
Accidental shoulder-surfing risk:
Auto-hide policy:
Screenshot or recording concern:
Permission check timing:
```

Sensitive information should not appear just because the pointer accidentally passed by.

## 12. Acceptance tests

```text
The reveal does not open during a fast pointer transit.
The reveal remains open while the pointer moves through the intended corridor.
The reveal is fully available with keyboard.
The reveal has an explicit touch path.
The reveal closes predictably with Escape and restores focus.
The reveal does not clip at viewport edges.
The reveal does not obscure a higher-priority action or status.
The reveal remains understandable with reduced motion.
The reveal cannot expose sensitive data accidentally.
The primary task remains usable when hover is unavailable.
```
