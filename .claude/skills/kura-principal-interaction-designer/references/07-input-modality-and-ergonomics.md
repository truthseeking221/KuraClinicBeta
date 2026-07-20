# Input Modality and Ergonomics

## 1. Design for capability

Do not associate interaction with “desktop” or “mobile”. A large screen can use touch. A tablet can have a mouse and keyboard.

Capability inventory:

```text
hover available?
pointer precise or coarse?
keyboard available?
multiple simultaneous pointers?
pressure or stylus?
voice or switch control?
screen reader?
reduced motion?
posture and reach?
```

## 2. Pointer

Pointer supports:

* Hover preview.
* Precision selection.
* Context menus.
* Drag.
* Cursor signifiers.

But pointer paths have a cost. Design:

* Target is large enough.
* Related actions near object.
* No dead gap between trigger and reveal.
* Edge/corner targets have advantage.
* Avoid pixel-perfect corridors.
* Hover does not commit consequential action.

## 3. Touch

Touch hides content under finger, lacks hover and is less accurate than pointer.

Design:

* Target and generous spacing.
* Primary controls in reach zone for appropriate posture.
* Feedback occurs when contact and release.
* Do not place the critical target too close to the system gesture edge.
* Does not rely on hover.
* Gesture has cue and alternative.
* Use actual device test, not just emulator.

## 4. Keyboard

Keyboard interaction requires:

* Logical tab order.
* Visible focus.
* Enter/Space semantics are correct.
* Arrow navigation in composite widgets when appropriate.
* Esc to dismiss/cancel.
* Shortcut does not conflict with browser/OS.
* Do not trap focus outside the correct modal.
* Focus return sau dialog/popover.

Hover reveal must mirror with focus-within.

## 5. Screen reader and assistive technology

Interaction needs semantic contract:

```text
name
role
value
state
relationship
available action
change announcement
```

Visual reveal does not automatically become a semantic reveal. When opening the accordion, the expanded state must update. When an item is reordered, the result must be reported if it is not visible.

## 6. Focus-visible, hover, active, selected

### Focus-visible

Routing input only. Need persistent ring or cue.

### Hover

Pointer presence. Not persistent.

### Active/pressed

Control is active.

### Selected

Object has been selected in the set.

The visual design is different enough to not be mistaken.

## 7. Touch alternatives for hover patterns

### Secondary row actions

* Overflow visible.
* Tap selection mode.
* Swipe shortcut.

### Preview

* Tap preview icon.
* Long press shortcut.
* Open detail sheet.

### Tooltip

* Focus/hover on desktop.
* Info button or accessible label on touch.

### Hover menu

* Tap toggles submenu.
* Parent link and disclosure trigger are clearly separated if both are needed.

## 8. Coarse and fine pointer

Fine pointer allows smaller targets but should not be used to reduce accessibility.

Coarse pointer needs:

* Larger hit area.
* More spacing.
* Less hover dependency.
* Fewer tightly packed icon actions.
* Strong pressed feedback.

A hybrid can switch between coarse and fine in the same session. Behavior must not lose consistency.

## 9. Posture and reach

Input efficiency depends on how you hold it:

* One-handed phone.
* Two-handed phone typing.
* Tablet held at edges.
* Laptop touch screen upright.
* Desktop mouse.
* Shared kiosk.

Place frequent controls in an easy-to-reach area, but do not break platform conventions and reading orders.

## 10. Target geometry

Target includes visual shape and hit area. Hit area can be larger than the icon.

Check:

* Adjacent dangerous action.
* Edge clipping.
* Small inline text links.
* Dense table icons.
* Drag handles.
* Checkbox/radio labels.

Label should be part of the target when semantics allow.

## 11. Pointer cancellation

Activation should occur on release with the ability to cancel if the pointer leaves the target before release, unless the control has different semantics.

This reduces accidental activation and matches physical button expectations.

## 12. Voice and switch

Do not set multiple controls with the same accessible name. Action must have a specific label. Reading order and grouping need to be clear enough so that sequential scanning is not too costly.

## 13. Modality matrix

Each component spec must have:

| State/action | Pointer | Touch | Keyboard | Assistive tech |
|---|---|---|---|---|
| Discover | visual signifier | visible control | focus order | name/role |
| Preview | hover | explicit tap | focus | description |
| Activate | click | tap | Enter/Space | activate command |
| Cancel | leave/Esc | Back/outside tap | Esc | dismiss action |
| Reorder | drag | drag | move mode + arrows | announce position |

## 14. Acceptance tests

1. No need to hover to complete the task.
2. Focus state is always visible.
3. Tab order follows meaning.
4. Touch target does not cause wrong tap.
5. Hybrid input switching does not corrupt the state.
6. Screen reader receives expanded/selected/busy/error state.
7. Voice command has unique accessible name.
8. Esc and Back have consistent behavior.
9. Drag has keyboard alternative.
10. Pointer cancellation works.
