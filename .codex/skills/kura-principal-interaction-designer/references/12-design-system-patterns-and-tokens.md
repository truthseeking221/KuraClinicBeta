# Interaction Design Systems, Patterns, Tokens, and Storybook

## 1. Behavior is also a design system

Design system is not just about color, type and components. It must contain:

* Interaction principles.
* State vocabulary.
* Behavior patterns.
* Motion roles.
* Duration and easing tokens.
* Focus conventions.
* Async status patterns.
* Error and recovery patterns.
* Modality behavior.
* Accessibility contracts.

If the visual is the same but the behavior is different, the system is still not coherent.

## 2. Functional and perceptual patterns

### Functional patterns

Resolve behavior:

* Disclosure.
* Selection.
* Validation.
* Save.
* Reorder.
* Navigation.
* Loading.
* Confirmation.

### Perceptual patterns

Create feel:

* Motion tone.
* Easing.
* Depth transition.
* Highlight.
* Choreography.

Functional purpose comes before perceptual feel.

## 3. Pattern record

Each interaction pattern needs:

```text
Name
Problem
Context
Purpose
Risk ceiling
Anatomy
State model
Events and guards
Transitions
Feedback
Motion
Focus
Announcements
Pointer behavior
Touch behavior
Keyboard behavior
Reduced motion
Error and recovery
Content rules
Analytics
Acceptance tests
Do / Do not
Examples
Owner
Version
```

## 4. Motion token architecture

### Primitive tokens

```text
duration
cubic-bezier curves
distance
scale
stagger
delay
```

### Semantic tokens

```text
motion.reveal
motion.dismiss
motion.reposition
motion.feedback
motion.context
motion.emphasis
```

### Component tokens

```text
popover.enter
row-actions.reveal
accordion.expand
modal.enter
```

Component tokens should alias semantic tokens. Don't hard-code the same purpose with lots of random values.

## 5. Token rules

* `instant` is a state change not spatial motion.
* Enter and exit may differ from duration/easing.
* Exit is usually faster than enter.
* Delay is not included in duration.
* Hover intent and tooltip delay are separate interaction tokens.
* Reduced motion is semantic mapping, not just global multiplier.
* Do not create new tokens if the most recent token still transmits the correct purpose.

## 6. Purpose and feel audit

Audit motion currently has:

1. Record interaction.
2. Mounting purpose.
3. Mount component/state.
4. Ghi duration, easing, distance, delay.
5. Nonblocking review.
6. Reduced motion review.
7. Group of similar patterns.
8. Type duplicates and outliers for no reason.

After audit, create small but expressive vocabulary.

## 7. State naming

Use canonical names so design, code, QA and analytics speak the same language.

For example:

```text
hovered, not hover-state-2
pending, not success-loading
confirmed, not done
read-only, not disabled-light
```

## 8. Storybook interaction contract

Each interactive component needs stories for:

* Default.
* Hover/focus/pressed.
* Keyboard traversal.
* Touch-equivalent state.
* Expanded/collapsed.
* Loading/pending/confirmed/error.
* Long content.
* Reduced motion.
* High contrast.
* Interrupted animation.
* Rapid repeat.
* Async delay.
* Error recovery.

Storybook doesn't just capture visual state. Use play functions or test harness to run behavior.

## 9. Component API principles

The API should represent meaning, not animation mechanics.

Good:

```text
state="pending"
reveal="contextual"
importance="secondary"
motion="reveal"
```

Poor:

```text
fadeDuration=173
translateY=5
showOnMouseOver=true
```

Implementation details can be in tokens and internals.

## 10. Interaction ownership

Determine owner for:

* State model.
* Motion system.
* Accessibility behavior.
* Content.
* Frontend implementation.
* Analytics.
* QA.

Interaction failure often lies between disciplines. Contract must make boundaries explicit.

## 11. Versioning

Behavior change can be breaking even though the visual remains unchanged.

For example:

* Activation changed from click to double-click.
* Another auto-close popover.
* Focus order changed.
* Save from explicit to autosave.
* New Pending state.

Document migration and product impact.

## 12. Pattern contribution criteria

A behavior enters the system when:

* Appears repeatedly.
* Has stable purpose.
* Has a clear state model.
* Has evidence or strong rationale.
* Has cross-modality behavior.
* There is a possible implementation.
* Has owner.

Don't include experiment one-off in the core library too early.

## 13. Acceptance tests as system assets

Acceptance tests should be reusable:

```text
reveals on focus-within
stays open while focus inside
closes on Escape
returns focus to trigger
does not shift layout
supports reduced motion
accepts new input mid-animation
```

## 14. System health metrics

* Number of unique durations/easings.
* State naming consistency.
* Components lack keyboard parity.
* Components are missing error state.
* Motion patterns have no purpose.
* Duplicate disclosure patterns.
* Accessibility regressions.
* Adoption rate.
* Product exceptions and reasons.

## 15. Documentation language

Write “why” before “how”.

```text
Purpose
→ when to use
→ when not to use
→ behavior
→ tokens
→ examples
```

Do not turn motion guideline into gallery without decision rules.
