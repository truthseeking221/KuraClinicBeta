# Attention, Orientation, and Spatial Continuity

## 1. Attention is a finite resource

User does not see the entire interface at once. They perform visual queries to find information related to the task.

Motion, contrast, size, sound and interruption all compete for attention. So interaction must decide:

* What needs to be seen immediately.
* What is only needed when context appears.
* What can wait.
* What should not move.

## 2. Attention budget

Each screen has an attention budget.

High-cost signals:

* Large motion.
* Flash.
* Red/high saturation.
* Modal.
* Sound.
* Full-screen overlay.
* Repeated badge.

Using a strong signal for many things will make it lose its meaning.

## 3. Change blindness

Users may not recognize content changes if:

* Change occurs outside the focal area.
* No continuity.
* Layout changes too much at once.
* The new state is the same as the old state.
* User is focusing on another task.

Solution:

* Local highlight.
* Short motion links source and destination.
* Preserve position.
* Persistent status.
* Announcement when visual is not enough.

## 4. Direct focus without stealing focus

Visual attention and keyboard focus are different.

Eyes can be guided by:

* Subtle motion.
* Contrast change.
* Highlight.
* Scroll into controlled view.

Do not manually move keyboard focus just to direct attention. Move focus only when the new context requires interaction, like an open dialog.

## 5. Eye flow

Choreography should create order:

```text
cause
→ changed object
→ next action
```

Do not allow multiple regions to animate at the same time if the user only needs to follow one change.

## 6. Spatial model

A layered interface needs a stable spatial model:

* Navigation hierarchy.
* Parent/child.
* Overlay on content.
* Off-canvas utility.
* Detail vs list.
* Forward vs back.

Motion must match model. If the drawer is on the right, it goes from the right. If back, direction should reverse forward when platform convention supports it.

## 7. Source and destination continuity

When object switches context:

* Maintain identity using shared element or position continuity.
* If not possible, use crossfade and stable headings.
* Avoid source disappearing before destination has cue.
* Keep selected state when returning to the list.
* Preserve scroll position.

## 8. Layer orientation

### Tooltip

Light layer, no focus trap, clear source.

### Popover

Contextual interactive layer, anchored.

### Drawer

Secondary workspace or navigation from edge.

### Modal

Interrupting task, backdrop, focus contained.

### Full page

Independent context, URL/history as appropriate.

Don't choose layers just because the animation looks good.

## 9. Off-screen object cues

Motion can indicate that content is outside the viewport:

* Carousel item peeking.
* Drawer edge.
* Scroll hint.
* Drag auto-scroll cue.

Cue must be combined with visible affordance. Gesture-only off-screen content is a discoverability risk.

## 10. Context changes

When filter, sort, tab or mode changes:

* Current control state visible.
* Result region update clearly.
* Count or summary update.
* Preserve focus.
* Avoid scroll reset if not needed.
* Motion is just enough to connect change.

## 11. Mode awareness

Mode is a major source of errors. If behavior control changes by mode:

* Mode label persistent.
* Visual environment is different enough clearly.
* Entry and exit explicit.
* Escape path.
* Does not depend on memory.
* Dangerous mode has constraints.

## 12. Attention escalation by severity

| Severity | Pattern |
|---|---|
| Informational | Inline state or subtle cue |
| Actionable | Persistent highlight + action |
| Warning | Banner or anchored warning |
| High risk | Explicit interruption, consequence |
| Critical | Strong persistent signal + clear response |

Animation cannot automatically increase severity.

## 13. Motion and visual hierarchy

Motion can temporarily replace hierarchy. After motion, the static hierarchy must stand on its own.

Don't rely on an entrance animation to explain the structure the user can return to later.

## 14. Reduced motion orientation

Replace spatial motion with:

* Clear layer boundaries.
* Title continuity.
* Selected states.
* Backdrop.
* Breadcrumb.
* Instant position + short opacity.

Meaning must remain when motion is lost.

## 15. Acceptance tests

1. Users know which layer they are in.
2. Back/close brings back the correct context.
3. Scroll and selection are preserved.
4. Important changes are not missed.
5. Motion does not pull the eye away from the primary task.
6. Keyboard focus is not stolen.
7. Reduced motion can still orient.
8. Current mode persistent.
9. Source/destination relation is readable.
10. External update does not cause disorientation.
