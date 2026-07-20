# Motion Grammar, Timing, Easing, and Choreography

## 1. Motion is a language

Motion has vocabulary, syntax and tone. A good system doesn't use each animation as an independent clip. It creates repeating patterns for users to learn:

```text
enter
exit
move
expand
collapse
insert
remove
reorder
acknowledge
confirm
warn
fail
load
```

Each verb needs a consistent purpose, direction, duration, easing and interruption policy.

## 2. Purpose taxonomy

### 2.1 Acknowledge

Indicates input has been received.

Example: pressed state, small ripple, icon state change.

### 2.2 Orient

Indicates layer, direction, source or destination.

For example: the drawer grows from the edge it contains, details grow from the card.

### 2.3 Connect cause and effect

Shows which change the action creates.

For example: add button creates item in list, drag item to translate peers.

### 2.4 Direct attention

Lead the eye to important changes without using modals.

Example: lightly highlight the row that has just been updated.

### 2.5 Reveal or conceal

Explains content appearing or disappearing.

Examples: accordion, popover, contextual actions.

### 2.6 Show progress

Indicates work in progress or stage.

### 2.7 Confirm outcome

Indicates final state has been reached.

### 2.8 Demonstrate

Explain gestures, capabilities or relationships that are difficult to express statically.

### 2.9 Express brand

Add personality after the functional purpose is preserved.

Each animation records one main purpose and at most one secondary purpose. If not recorded, discard.

## 3. Timing and spacing

Timing is duration. Spacing is the way speed changes over time, often expressed as easing.

Two animations of the same duration can convey completely different meanings because of easing:

* Linear: mechanical or constant process.
* Ease-out: object enters and stabilizes.
* Ease-in: object leaves, accelerates out of context.
* Ease-in-out: move between two peer states.
* Overshoot: energy, playfulness or elasticity.
* Damped spring: direct manipulation settle.

## 4. Duration bands

The ranges below are baselines for prototyping, not absolute rules:

| Role | Starting range | Notes |
|---|---:|---|
| Press/acknowledge | 0–100ms | Instant Feeling |
| Tiny visual state | 100–180ms | Icon, color, opacity |
| Small reveal | 160–260ms | Actions, tooltip, small popover |
| Standard component transition | 200–350ms | Accordion, field expansion |
| Large spatial transition | 300–500ms | Drawer, page layer |
| Expressive emphasis | 350–600ms | Rare, not frequent |

Val Head recommends 200–500ms as a good range for most UI animations, with small motion on the low end and large motion or complex easing on the high end. Try, observe and adjust according to the task.

## 5. Frequency multiplier

Same transition but different frequency requires different timing:

```text
high-frequency command: 0.6–0.8 × standard
regular interaction: 1.0 × standard
rare explanatory transition: 1.0–1.3 × standard
```

No mechanical multiplier pressure. This is a prompt to evaluate cumulative costs.

A 400ms transition running once might be fine. Running 100 times a day will become an obstacle.

## 6. Distance and area

Duration does not only depend on distance pixels. Need to consider:

* Ratio of motion area to viewport.
* Number of moving objects.
* Complexity of path.
* Contrast with background.
* Does motion change direction?
* Does the user need to track the object?

Full-screen motion requires more care than small button motion, both in terms of timing and accessibility.

## 7. Easing by intent

### Enter

Object reaches destination and then decelerates. Use decelerating curves.

```text
fast start → calm arrival
```

### Exit

Object leaves context, can accelerate. Use hurried curve.

```text
quiet start → decisive departure
```

### Peer move

Move between equivalent positions, using balanced curve.

### Direct manipulation

In drag, the object must follow the input nearly 1:1. Do not apply easing between pointer and object.

After release, use the short settle if snap or inertia has meaning.

### Progress

Linear is only suitable when the rate constant or progress bar is continuous. Linear spinner can be used because it does not represent actual position.

### Overshoot and spring

Use when:

* Brand is energetic.
* Object elastic or playful.
* Settle sau direct manipulation.

Do not use when:

* Clinical warning.
* Financial confirmation.
* Dense operational workflow.
* Repeated navigation.
* Motion sensitivity cao.

## 8. Readability test

Animation is too fast when:

* User did not specify which object changed.
* Direction is not readable.
* Bounce looks like a glitch.
* Text appears before stable container.
* Item removal makes the list jump incomprehensibly.

Animation is too slow when:

* User waits before taking further action.
* The second input is ignored.
* Frequent tasks accumulate delay.
* Motion attracts attention longer than meaning.

Goal: as fast as possible while still conveying the right purpose.

## 9. Nonblocking and interruption

Good animation must:

* Receive input midway.
* Reverse from current visual state.
* Retarget destination.
* Preserve velocity when appropriate.
* Does not reset state.
* No infinite queue.
* Do not disable controls just to make the animation easier to code.

### Reverse

For:

* Hover enter/exit.
* Accordion open/close.
* Toggle reveal.
* Drawer open/close.

### Retarget

For:

* Tab switch when the user selects another tab mid-transition.
* Menu navigation.
* Carousel is controlled by the user.
* Reorder destination.

### Coalesce

For:

* Autosave.
* Slider update.
* Search suggestion.
* Repeated increment.

## 10. Choreography

Choreography is the temporal relationship between multiple motions.

### Lead and support

A main object leads, a secondary object supports. Don't let everything stand out at the same time.

### Overlap

Start the second action before the first action is completed to maintain flow.

For example:

* Backdrop starts fading, dialog starts entering immediately after a small offset.
* Space opens when inserting item starts, does not wait until completion to show item.

### Stagger

Used for a group of objects to represent independence or sequence. Starting offset of 20–50ms is usually sufficient.

Avoid:

* Stagger long list.
* Stagger frequent table rows.
* Stagger causes total duration to exceed task need.

### Parallelism

Changes that are not dependent should occur in parallel. Don't turn a simple state change into a cinematic sequence.

## 11. Anticipation

Anticipation is a small movement preparing for a big action.

In UI, use sparingly because it adds delay before the outcome.

Fits:

* Playful object exit.
* Gesture cue.
* Rare expressive state.

Not suitable:

* Primary navigation.
* Submit.
* Error correction.
* High-frequency controls.

## 12. Follow-through

Follow-through or overshoot helps the subject have energy and settle down.

Use when:

* Object is dropped or snapped.
* Brand permission.
* Rare motion.

Do not use as default for any modal or button.

## 13. Secondary action

Secondary motion only supports primary motion.

For example:

* Small icon changes state when card expands.
* Drop shadow is reduced when the object is pressed.
* Child content delay slightly after container.

Secondary action must not compete or prolong interaction.

## 14. Spatial continuity patterns

### Shared element

Source object transformed to detail destination.

### Container transform

Button or card becomes a panel.

### Layer reveal

Drawer from edge, modal from trigger or center according to layer model.

### Reparenting

Object transfers container but keeps identity.

### Crossfade

Used when spatial relation is weak or reduced motion.

## 15. Motion tone

Choose 3–5 adjectives for the product, then map to motion:

| Adjective | Motion implication |
|---|---|
| Calm | Low displacement, no bounce, soft deceleration |
| Precise | Short duration, clean endpoints, stable alignment |
| Confident | Decisive enter/exit, minimal hesitation |
| Warm | Gentle easing, subtle overlap |
| Energetic | Faster acceleration, limited overshoot |
| Clinical | Restrained, factual, low distraction |

Tone must not distort meaning. Error critical is not "bouncy" even though the brand is playful.

## 16. Performance contract

An animation that is not performant is an interaction error.

Priority:

* Opacity.
* Transform position.
* Scale and rotate as appropriate.
* Reasonable number of layers.
* Do not animate heavy blur or continuous layout if not needed.
* Test on weak devices and real data.
* Don't load large animation framework for some small transitions.

Performance testing must use real behavior, not just empty demos.

## 17. Reduced motion mapping

Don't just set duration to 0 for everything.

| Original purpose | Reduced-motion equivalent |
|---|---|
| Orient layer | Instant placement + clear backdrop/border |
| Direct attention | Persistent highlight |
| Cause/effect | Short crossfade or immediate state cue |
| Progress | Static progress text/bar |
| Demonstrate gesture | Step-by-step stills or text |
| Brand flourish | Remove |

## 18. Motion acceptance tests

1. Purpose is clearly stated.
2. Users do not have to wait for animation to continue taking action.
3. Reverse midway through operation.
4. Rapid repeated input is not ignored.
5. Duration readable and not slow.
6. Direction matches spatial model.
7. Focus is not lost.
8. Reduced motion keeps meaning.
9. Performance is good on target device.
10. Motion not masking or delay error.
