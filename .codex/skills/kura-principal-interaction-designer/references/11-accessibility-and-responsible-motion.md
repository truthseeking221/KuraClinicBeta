# Accessibility and Responsible Motion

## 1. Accessibility is the property of the entire transition

A component is accessible in a static state but inaccessible when changing state.

Check:

* Does the trigger have semantics?
* Is Focus kept correct.
* Is hidden content readable when not opened?
* Is open state reported.
* Does Close return focus?
* Can motion cause vestibular response.
* Is timeout controlled?
* Does Gesture have an alternative?

## 2. Hover and focus parity

Any content that opens on hover must open on focus if it is of value to the keyboard user.

Do not use focus to open an interactive surface if doing so makes Tab navigation uncontrollable. When the surface is complex, use explicit activation.

## 3. Hidden content semantics

When content is closed:

* Do not allow interactive descendants in the order tab.
* Do not let the screen reader read the content as if it were visible.
* State of the update trigger.

When opened:

* Expanded state update.
* Focus only moves when the interaction model requires it.
* Reading order is reasonable.

Don't just set opacity to 0 and keep controls focusable.

## 4. Tooltips

Tooltip accessible requires:

* Hover and focus trigger.
* Accessible relationship with trigger.
* Escape dismiss.
* No interactive.
* Does not contain essential instructions.
* Do not cover the focus ring or trigger.
* Enough reading time.

Touch users need label, info button or alternative.

## 5. Popovers and dialogs

Popover:

* Anchored.
* Focus trap is not always needed.
* Esc dismiss.
* Return focus.

Dialog:

* Move focus to the meaningful initial target.
* Contain focus.
* Label and description.
* Escape or close behavior follows policy.
* Return focus to trigger or next logical target.

Do not use visual modal but semantic focus remains in the background.

## 6. Reduced motion strategy

### Don't just turn it all off

Determine purpose then replace:

* Orientation → stable hierarchy, backdrop, breadcrumb.
* Attention → persistent highlight.
* Cause/effect → instant state + local cue.
* Progress → static progress text.
* Demonstration → still sequence.
* Brand flourish → remove.

### Safe default

* Reduce large translation.
* Remove parallax and depth illusion.
* Remove auto zoom/large scale.
* Keep the opacity light if it doesn't cause problems.
* Withdraw duration when meaning is not lost.

## 7. Vestibular risk factors

Risk increases when:

* Motion takes up most of the viewport.
* Foreground and background move at different speeds.
* Scroll input creates motion in different direction or speed.
* Object moves large sensing distance.
* Full-screen zoom, flip or rotation.
* Unexpected movement, no context cue.

Small micro-transitions are usually less risky, but still require a reduced-motion path.

## 8. Auto-moving content

Don't let content change automatically before the user reads it or the target moves while they're coming.

If auto movement is required:

* Pause/stop.
* Predictable timing.
* Focus interaction pauses.
* Pointer interaction pauses when relevant.
* No essential content only in rotating frame.

## 9. Flash, epilepsy, migraine

Avoid fast flash, high contrast and repeated pulses. Use persistent signals instead of flashing warnings.

## 10. Motor accessibility

* Large target and spacing.
* Path precision is not required.
* Drag alternative.
* Timeout has extension.
* Hover surface does not close because the pointer is slightly misaligned.
* Button does not move when the user is about to click.
* Reorder has keyboard mode.

## 11. Screen reader feedback

Announce:

* Error.
* Save result.
* Loading completion when needed by the user.
* Count change sau filter.
* Reorder position.
* Expanded/collapsed state.

No announcement:

* Pure hover visual.
* Every animation frame.
* Repeated busy messages during rapid input.

## 12. Focus retention under async updates

* Do not rerender to lose focus.
* Don't move focus to toast.
* If focused item is deleted, move to logical neighbor or container.
* If dialog closes due to success, return focus properly.
* External update does not steal focus.

## 13. High contrast and color independence

Hover, selected, error, disabled and focus cannot be just different colors.

Combination:

* Shape.
* Border.
* Icon.
* Text.
* Position.
* Pattern.

Motion does not replace static distinction.

## 14. Zoom, reflow, localization

Reveal surfaces must:

* No clipping when zooming.
* Reposition when viewport is small.
* Accept long text.
* No hard-code height that causes content loss.
* Dismiss control is still reachable.

## 15. Progressive enhancement

Core content and tasks must be active when:

* Animation CSS/JS does not load.
* Reduced motion.
* Low performance.
* Assistive tech.
* Script error.

Don't set default off-screen content if only animation will bring it in.

## 16. Responsible attention

Do not use:

* Motion to force click.
* Fake urgency.
* Infinite badge pulse.
* Variable reward for healthcare or essential services.
* Streak shaming.
* Confirmshaming.
* Hard-to-dismiss interruption.

Motion has the power to direct behavior, so autonomy must be protected.

## 17. Accessibility acceptance tests

1. Keyboard completes all tasks.
2. Focus visible and logical.
3. Hover content has focus/touch equivalent.
4. Hidden controls are not focusable.
5. Expanded/selected/busy states are exposed.
6. Dialog focus is correct.
7. Reduced motion keeps meaning.
8. Auto content has pause.
9. Drag has an alternative.
10. Screen reader receives important async result.
11. Zoom and long text without clipping.
12. No-motion baseline is still usable.
