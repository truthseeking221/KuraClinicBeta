# Progressive Disclosure and Hover Reveal

## 1. Nature

Reveal is not a visual effect. It is a decision about hierarchy over time.

The correct question is not “Should fade in on hover?” which is:

```text
Which layer should this information or action appear in?
What activates that layer?
How does the user know it exists?
How can all modality be accessed?
When does it close?
Is State persistent?
```

## 2. Reveal ladder

### Layer 0: Always visible

For:

* Identity of the object.
* Current status.
* Primary action.
* Critical warning.
* Required information.
* Recovery action.

### Layer 1: Contextual reveal

Trigger by hover, focus-within, selection or object activation.

For:

* Secondary row actions.
* Quick preview.
* Drag handle.
* Contextual metadata.
* Low-risk shortcuts.

### Layer 2: Explicit disclosure

Trigger by chevron, More, Details, accordion or disclosure button.

For:

* Additional settings.
* Advanced options.
* Long explanation.
* Secondary form sections.

### Layer 3: Tooltip

For short, non-interactive, non-critical supplementary text.

### Layer 4: Popover, panel, drawer

For interactive detail, contextual form, preview with action or light multi-step detail.

### Layer 5: Deep navigation

For details that have URLs, history, complex tasks or need all the space.

## 3. Decision matrix

| Content or action | Can hover reveal? | Reason |
|---|---:|---|
| Primary CTA | No | Must be discoverable |
| Secondary row action | Yes, with focus/touch path | Clear context, reduced clutter |
| Destructive action | Only as shortcut, not sole path | High risk |
| Important Status | No | Need persistent |
| Tooltip explains moderately familiar icons | Yes | Complementary, not critical |
| Error message | No | Need to locate and recover |
| Preview photo or record | Yes | Reversible, noncommitting |
| Sensitive patient data | Usually not | Accidental exposure |
| Drag handles | Yes if selection/focus also reveal | Secondary affordance |
| Advanced commands | Yes | Expert shortcut |

## 4. Inevitable discovery test

A dynamic element is inevitably discoverable when a normal action inevitably activates it.

Good example:

* Video player controls appear when the pointer moves across the video viewport.
* Row actions appear when the row is focused with Tab or selected with tap.
* Field tools appear when the field enters editing state.

Poor example:

* The edit icon only appears when hovering exactly over an area without a signifier.
* Gesture swipe on row without menu or cue.
* Tooltip is the only way to know what the icon does.

If not inevitable, interaction must be redundant, advanced or infrequent.

## 5. Hover reveal anatomy

A good hover reveal has six parts:

```text
base signifier
hover intent
reveal transition
interactive persistence
exit grace
modality equivalent
```

### 5.1 Base signifier

Default state can be used:

* Subtle row affordance.
* Persistent overflow icon.
* Cursor change when appropriate.
* Selection surface.
* Label or hint.
* A stable reserved slot for actions in a dense table.

There is no need to make all secondary actions visible, but the user must understand that the object has interactions.

### 5.2 Hover intent

Not all hovers are intent. Pointer can go sideways.

Use delay when:

* Large trigger area.
* Reveal cover of other content.
* Mega menu has many levels.
* Accidental open causes distraction.
* Pointers often pass by on their way to another target.

No significant delay is required when:

* Reveal only minor surface changes.
* Control is accurate and the user is targeted.
* Feedback is needed immediately.

Starting ranges are for testing, not rules:

```text
subtle row highlight: 0–60ms
contextual actions: 60–120ms
preview or menu that covers content: 120–250ms
tooltip: 300–500ms
```

### 5.3 Reveal transition

Default:

* Opacity + small translation 2–8px.
* 120–220ms for small controls.
* Enter decelerates.
* Do not scale text strongly.
* Do not animate width causing content to jump if space can be reserved or overlayed.

Reveal must originate from a meaningful location. Popover from trigger, row actions from row edge, preview from object.

### 5.4 Interactive persistence

If the content reveal is interactive:

* Pointer going from trigger to content is not closed.
* Focus on content keeping it open.
* Hover on child does not restart animation.
* Click inside does not lose state unless the action is intentionally closed.
* Escape or explicitly dismiss close if surface has popover properties.

### 5.5 Exit grace

Exit instant often causes flicker.

Starting ranges:

```text
simple visual reveal: 60–120ms
interactive action group: 120–220ms
menu with pointer travel: 180–300ms
```

If the pointer trajectory is towards the submenu, the menu can be kept longer. Do not use a delay that is too long as it will cause the surface to "stick".

### 5.6 Equivalent path

| Pointer | Keyboard | Touch |
|---|---|---|
| hover reveals | focus-within reveals | tap selection or overflow |
| click commits | Enter/Space commits | tap commits |
| leave closes | blur/Esc closes | tap outside/Back closes |

Screen reader must have controls in the semantic tree and appropriate state name.

## 6. Hover row actions pattern

### Base state

Show:

* Object name.
* Key summary.
* Status.
* Persistent overflow if important actions or touches need path.

### Hover or focus-within

* Row surface slightly increases contrast.
* Show up to a few commonly used actions.
* Does not push text to the left or cause columns to change.
* Danger action should not be the most popular action.
* Overflow persists for full set.

### Selected state

Actions can be persistent for the user to continue working. Selection must be different from hover.

### Touch

Options:

1. Overflow is always visible.
2. Tap row to open detail, action in detail.
3. Tap selection mode then display contextual toolbar.
4. Swipe is a shortcut, not a sole path.

Do not use first tap to reveal and then second tap to open if the user cannot predict the dual behavior.

## 7. Hover preview pattern

Hover preview is suitable when users need to quickly compare without leaving the context.

Requirements:

* Preview does not commit.
* Source object is still identifiable.
* There is a delay to avoid flash when scanning.
* Preview does not cover the next commonly used target.
* Has a pointer corridor or reasonable placement.
* Keyboard focus opens equivalent preview.
* Touch uses explicit preview button, long press as shortcut or detail sheet.
* Sensitive content requires click or explicit intent.
* Preview stale must indicate freshness.

## 8. Tooltip contract

Tooltip contains only noninteractive, supplemental text.

Right:

* Open on hover and focus.
* Has reasonable delay.
* Dismiss on Esc, blur or pointer leave with grace.
* Do not cover the trigger.
* Does not contain links, buttons, forms or essential instructions.
* Do not replace label for unfamiliar primary action.
* Allow pointer to pass if content takes a long time to read, but does not turn into a disguised popover.

If interaction is needed, use popover.

## 9. Popover contract

Popovers can contain interactive content.

Right:

* Trigger by explicit click/tap or keyboard activation.
* Has a clear relationship with the trigger.
* Intentional focus management.
* Close with Esc and click/tap outside when appropriate.
* Return focus to trigger when closed.
* Do not open just because of accidental hover if the content is consequential.
* Has position fallback to avoid clipping.
* Do not close when user interacts inside.

Hover can preview a light popover, but clicking should pin it if the user needs to interact.

## 10. Mega menu and hover corridor

Mega menu is a case where hover easily fails.

Principle:

* Top-level target is large enough.
* Slight entry delay to avoid opening when moving sideways.
* Submenu has no dead space.
* Pointer pointing diagonally to the submenu does not cause the parent to change immediately.
* Keyboard arrows and Tabs have clear logic.
* Touch uses tap toggle.
* Menu closes with Esc.
* Current parent state visible.
* Short animation, no navigation delay.

## 11. Layout stability

Reveal has three strategies:

### Reserved space

Suitable for table row actions. The advantage is no shift; The disadvantage is that it takes up space.

### Overlay

Suitable for tooltips, quick actions. Avoid hiding content and clipping.

### In-place expansion

Appropriate when expansion is the main meaning, for example accordion. Sibling movement must animate clearly and focus not be lost.

Don't animate the layout just to "smooth" it if it makes the user lose their place.

## 12. Sensitive information

Do not automatically reveal sensitive information when the pointer passes by, especially on shared screens.

Use explicit intent for:

* Patient identifiers.
* Financial amount details.
* Secret token.
* Full address or contact.
* Confidential note.
* Authentication content.

Can reveal masked content with click-and-hold or explicit button, with audit if needed.

## 13. Rapid scanning and flicker

In a dense list, the pointer going through many rows can cause the entire screen to flicker.

Solution:

* Only animate actions, not entire rows.
* Does not stagger each icon.
* Enter quickly, exit with grace.
* Reserve action area.
* Do not change row height.
* Do not use large shadows on each hover.
* Has selection state for sustained work.

## 14. Acceptance tests

1. Primary task can be completed without hovering.
2. Tab to reveal object with actions.
3. Touch has clear equivalent lines.
4. Pointer going from trigger to reveal does not close.
5. Rapid scan does not flicker excessively.
6. Layout does not jump unintentionally.
7. Escape and dismiss works.
8. Focus pays to the right place.
9. Reduced motion keeps meaning.
10. Sensitive content is not exposed due to accidental hover.
11. Screen reader reads name, role, state and action.
12. Reveal does not hide important targets.
