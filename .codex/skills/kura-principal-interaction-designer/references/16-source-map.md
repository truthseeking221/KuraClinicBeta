# Source Foundations and Concept Map

This skill is a synthesis, not a copy of any book. The primary sources are transformed into platform-independent principles and patterns.

## Don Norman, The Design of Everyday Things

Applies to:

* Affordances and signifiers.
* Discoverability.
* Mapping.
* Constraints.
* Feedback.
* Conceptual models.
* Gulfs of execution and evaluation.
* Designing for error.

Transformation in skill:

```text
state truth
primary affordance visibility
feedback loop
cause/effect
error prevention and recovery
```

## Val Head, Designing Interface Animation

Applies to:

* Animation must have a purpose.
* Does not create obstacles.
* Nonblocking and interruptible behavior.
* Timing and spacing.
* 200–500ms range for most UI animations like baseline.
* Orientation, attention, causality, feedback and demonstration.
* Motion tone and design systems.
* Responsible animation, vestibular risk, progressive enhancement.

Transformation in skill:

```text
motion grammar
purpose taxonomy
interrupt policies
readability test
reduced-motion mapping
```

## Everett McKay, UI is Communication

Applies to:

* UI like conversation.
* Dynamic elements.
* Progressive disclosure.
* Dynamic secondary commands and affordances.
* Rule: dynamic interaction does not necessarily have to be redundant, advanced or infrequent.
* Primary affordance visible, secondary affordance can reveal.
* Hover does not exist on touch.
* Direct manipulation and discoverability.

Transformation in skill:

```text
reveal ladder
hover contract
primary/secondary/advanced hierarchy
interaction communication model
```

## Josh Clark, Designing for Touch

Applies to:

* Touch is a different input than pointer.
* Hover is not a universal capability.
* Gesture is usually invisible.
* Progressive disclosure by context.
* Direct actions in lists.
* Multiple-input systems.
* Ergonomics, reach and target.

Transformation in skill:

```text
modality parity
touch alternatives
capability over device classification
gesture as redundant shortcut
```

## Jeff Johnson, Designing with the Mind in Mind

Applies to:

* Attention and working memory are limited.
* Recognition is easier than recall.
* Visual structure and scanning.
* Responsiveness, immediate acknowledgment and human time constants.
* Error perception and recovery.

Transformation in skill:

```text
attention budget
recognition cues
latency bands
feedback locality
```

## Alla Kholmatova, Design Systems

Applies to:

* Functional and perceptual patterns.
* Shared language.
* Purpose and feel of animation.
* Audit existing motion.
* Pattern library and governance.

Transformation in skill:

```text
interaction pattern records
motion tokens
purpose/feel audit
Storybook contracts
```

## Jon Yablonski, Laws of UX

Applies to:

* Fitts’s Law.
* Hick’s Law.
* Doherty Threshold.
* Tesler’s Law.
* Progressive disclosure.
* Peak-end effects and responsible design.

Transformation in skill:

```text
target geometry
decision simplification
responsive feedback
complexity management
ethical attention
```

## Colin Ware, Visual Thinking for Design

Applies to:

* Active vision.
* Visual queries.
* Attention allocation.
* Change blindness.
* Pattern perception.

Transformation in skill:

```text
attention model
change localization
motion as temporary hierarchy
```

## William Lidwell, Kritina Holden, Jill Butler, Universal Principles of Design

Applies to:

* Affordance.
* Feedback loops.
* Progressive disclosure.
* Signal-to-noise.
* Control and forgiveness.
* Fitts, Hick, mapping, visibility and errors.

## Nir Eyal, Hooked

Only used to understand trigger, action, reward and investment. Do not use to create compulsive healthcare behavior or exploit variable rewards. Skill places autonomy and ethics above engagement.

## Refactoring UI

Applies to hierarchy, de-emphasis, contextual secondary actions, state visibility and system tokens. Interaction is not used to cover weak hierarchy.

## How to use source map

When you need rationale:

```text
Discoverability / feedback / error → Norman, McKay
Motion / timing / responsible animation → Head
Hover / touch / gestures → McKay, Clark
Attention / responsiveness / memory → Johnson, Ware
Pattern system / tokens → Kholmatova
Psychology / complexity / ethics → Yablonski, Lidwell
```
