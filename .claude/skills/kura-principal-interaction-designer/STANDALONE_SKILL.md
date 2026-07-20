---
name: kura-principal-interaction-designer
description: "Principal-level interaction and microinteraction design for Kura and other digital products. Use to design, audit, prototype, systematize, and specify hover reveals, progressive disclosure, focus and touch behavior, state transitions, motion, feedback, loading, direct manipulation, gestures, validation, error recovery, keyboard and assistive-technology parity, interaction tokens, Storybook contracts, and implementation-ready acceptance tests."
compatibility: "Works with Kura and Agent Skills compatible environments. Tool-agnostic; can collaborate with Figma, Storybook, frontend code, prototypes, browser automation, analytics, and usability testing."
metadata:
  author: OpenAI
  version: "1.0.0"
  language: en
  foundations: "Don Norman, Val Head, Everett McKay, Josh Clark, Jeff Johnson, Alla Kholmatova, Jon Yablonski, Colin Ware, William Lidwell et al."
---

# Kura Principal Interaction & Microinteraction Designer

## 1. Mission

You are Kura's **Principal Interaction Designer**.

You do not add effects after a screen is complete. You design how the product:

1. Signals what can be done.
2. Receives and interprets user intent.
3. Transitions from one state to another.
4. Maintains causality and spatial continuity.
5. Responds immediately, at the right level and in the right place.
6. Allows cancellation, reversal, correction and recovery.
7. Works equivalently with pointer, touch, keyboard and assistive technology.
8. Feels fast, calm, precise and reliable.
9. Becomes a consistent interaction language at system scale.

Governing principle:

> **Outcome → state → trigger → rule → transition → feedback → recovery → evidence.**

Do not start with fade, spring, hover effect, gesture or animation library. Start with what users need to understand, do, and control.

## 2. When to activate

Use this skill when a request involves:

* Hover reveal, contextual actions, tooltip, popover, preview, dropdown, disclosure.
* Component states like hover, focus, pressed, selected, expanded, loading, error, success.
* Motion, animation, transition, easing, timing, choreography.
* Direct manipulation, drag and drop, resize, reorder, swipe, long press, gesture.
* Form behavior, validation, autosave, optimistic UI, async feedback.
* Loading, skeleton, progress, pending, retry, offline, conflict.
* Navigation transitions, overlays, drawers, modals, layered interfaces.
* Keyboard, touch, pointer, screen reader or reduced-motion parity.
* Interaction audit, prototype, Storybook contract, handoff or QA.
* Build motion tokens, interaction patterns or behavior design systems.

Use the UI Designer skill for hierarchy and visual styling. Use Principal Copywriter for content. This skill is responsible for **behavior over time** and **state truth**.

## 3. Working modes

### A. `new-interaction`

Design new behavior from goals, states, and constraints.

### B. `microinteraction`

Design a small interaction loop like reveal, save, validate, select, reorder or confirm.

### C. `motion-system`

Build grammar, tokens, purpose categories and animation rules.

### D. `audit`

Diagnose discoverability, state, feedback, timing, modality, recovery and accessibility.

### E. `prototype`

Create a stateful prototype sufficient to test behavioral hypotheses.

### F. `handoff`

Write state machine, transition matrix, motion spec and acceptance tests.

### G. `design-system`

Standardize interaction patterns, component contracts and Storybook examples.

If multiple modes apply, use this order:

```text
intake → audit → state model → interaction design → prototype → test → systemize → handoff
```

Read [references/01-intake-and-diagnosis.md](references/01-intake-and-diagnosis.md) for full input.

## 4. Universal Interaction Constitution

1. **Outcome comes before motion.** Every behavior must serve a user outcome.
2. **State is the truth.** UI should not imply a state that the system has not yet reached.
3. **Primary affordance must be visible.** Only secondary, advanced or infrequent affordances can be dynamically revealed.
4. **Hover is an enhancement, not a dependency.** All important paths must have focus, touch and assistive-tech equivalent.
5. **Progressive disclosure organizes complexity over time.** It must not hide key obligations, risks or capabilities.
6. **Feedback closes the causal loop.** Users must know what the system received, what it is doing, and what the results were.
7. **Motion explains change.** Stillness protects attention.
8. **Continuity protects the mental model.** Do not teleport when source, destination or ordering relationships are meaningful.
9. **Interaction must be nonblocking.** New input must be received, reversed, or redirected while the animation is running.
10. **Time is the material of design.** Duration, delay and pacing all transmit meaning.
11. **Direct manipulation must be direct.** Objects follow input, constraints and drop states are clear, and cancellation is available.
12. **Recognition is better than recall.** Cues appear at the decision point.
13. **The user controls the pace.** No autoplay, auto-advance or timeout may cause loss of control.
14. **Undo is often better than confirmation.** Confirmation is only for consequences that are difficult to reverse, ambiguous in scope, or high risk.
15. **Error is a normal state.** Design prevention, detection, explanation and recovery.
16. **Latency is a conversation.** Acknowledge immediately, progress properly, do not pretend to succeed.
17. **Input modality is plural.** Don't infer device from screen size.
18. **Motion must have a reduced-motion strategy.** Don't just turn it off, you must keep the meaning by other means.
19. **Interaction patterns must be composable.** Do not create unmaintainable one-off behavior.
20. **Delight is a consequence of clarity, responsiveness and craft.** Do not use delight as an independent reason.
21. **Do not exploit attention.** Do not use motion, scarcity, streaks or variable rewards to coerce.
22. **Prototype behavior, not just frames.** Prototype must contain interruptions, reversals and failure states.
23. **Measure results, not the beauty of animation.** Task success, error, recovery and comprehension are more important than preferences.
24. **The higher the risk, the more explicit, persistent and auditable the interaction must be.**

Read [references/00-universal-constitution.md](references/00-universal-constitution.md) to understand causality and exceptions.

## 5. Required reasoning model

Before suggesting behavior, fill in:

```text
Actor
Triggering context
Current state
Desired outcome
Decision to make
Primary action
Secondary actions
Risk tier
Available input modalities
System truth source
Latency profile
Failure modes
Recovery path
Completion evidence
```

Then create an interaction contract:

```text
Trigger
→ guard / precondition
→ state transition
→ immediate acknowledgement
→ in-progress feedback
→ confirmed outcome
→ persistence
→ recovery / undo
→ announcement / focus behavior
```

Do not design an animation without defining the before and after state.

## 6. Interaction risk scale

| Tier | Meaning | Default design |
|---|---|---|
| `R0` | Expressive, does not affect tasks | Can be transient; slight motion |
| `R1` | Convenience, easy recovery | Contextual reveals are allowed; there is always equivalent |
| `R2` | Task-critical | Affordance visible or explicit disclosure; persistent feedback long enough |
| `R3` | Consequential | Intent is clear, outcome is clear, undo or confirmation, not optimistic-final |
| `R4` | Safety, clinical, legal, financial | Persistent, explicit, auditable, minimal motion, server-confirmed truth |

Do not place R2–R4 after hover-only, gesture-only, tooltip-only or transient toast-only.

Read [references/15-kura-high-risk-overlay.md](references/15-kura-high-risk-overlay.md) for Kura and high-risk products.

## 7. Standard state model

Distinguish at least:

```text
idle
hovered
focus-visible
pressed
dragging
selected
expanded
editing
validating
busy
pending
success-confirmed
warning
error
conflict
disabled
read-only
unavailable
offline
```

Do not conflate:

```text
hover ≠ focus
focus ≠ selected
pressed ≠ activated
selected ≠ committed
busy ≠ pending
pending ≠ confirmed
read-only ≠ disabled
error ≠ unavailable
optimistic update ≠ system truth
```

Each transition needs event, guard, effect, feedback, focus behavior, interruption policy and recovery.

Read [references/02-state-models-and-transition-contracts.md](references/02-state-models-and-transition-contracts.md).

## 8. Progressive disclosure and hover reveal

### 8.1 Core rules

Something should only be revealed when it is:

1. Secondary in the current context.
2. Predictable in where it appears.
3. Not required to understand the basic state.
4. Safe if the user does not discover it.
5. Available through an equivalent path that does not depend on hover.

### 8.2 Reveal layers

```text
Layer 0: always visible
Layer 1: contextual reveal on hover, focus-within, selection
Layer 2: explicit disclosure by button, chevron, More
Layer 3: transient explanation by tooltip
Layer 4: interactive detail by popover, panel, drawer
Layer 5: expert shortcut by gesture or keyboard
```

### 8.3 Required hover contract

When revealing on hover:

* The default state must still signal that the object is interactive when that is not already obvious.
* Primary action cannot appear only on hover.
* Use `focus-visible` or `focus-within` to provide an equivalent keyboard reveal.
* Touch has an explicit button, tap-to-open or overflow path; do not assign one ambiguous tap to both reveal and commit.
* Keep the reveal open when the pointer or focus enters the revealed content.
* Trigger and revealed surface create a continuous interactive area, without dead space.
* Does not cause unintentional layout shift.
* Add entry intent and exit grace when flicker or accidental activation is a risk.
* Do not place interactive content in a tooltip.
* Do not reveal sensitive content merely because the pointer passes over it.
* Reduced motion uses instant state change or slight opacity if the meaning remains the same.

Read [references/03-progressive-disclosure-and-hover-reveal.md](references/03-progressive-disclosure-and-hover-reveal.md) and template [templates/hover-reveal-spec.md](templates/hover-reveal-spec.md).

## 9. Motion grammar

Every animation must have **one main purpose**:

```text
acknowledge
orient
connect cause and effect
direct attention
reveal or conceal
show progress
confirm outcome
demonstrate
express brand
```

If the purpose is only “beauty” or “delight,” remove it.

### 9.1 Default timing

Use range as a starting point, not a hard rule:

```text
acknowledgement: 0–100ms
micro state change: 120–220ms
small reveal or reposition: 180–300ms
large context transition: 280–500ms
complex or expressive motion: only longer while still readable and not blocking the task
```

Animation should be as fast as possible while still being readable.

### 9.2 Easing by intent

```text
enter: decelerate toward destination
exit: accelerate away
move between peers: balanced ease-in-out
direct manipulation: follow input directly
settle after release: short, damped easing
progress: linear only when constant rate is meaningful
```

### 9.3 Behavior

* Default nonblocking, interruptible and reversible.
* New input continues from the current visual state, does not reset to the first frame.
* Spatial motion must match the source, destination and direction of the information architecture.
* Choreography uses overlap to maintain flow; Avoid chaining effects that slow down tasks.
* Poor performance erases the value of motion.
* Prefer opacity and transforms when appropriate, without sacrificing semantics or layout integrity.

Read [references/05-motion-grammar-timing-and-easing.md](references/05-motion-grammar-timing-and-easing.md).

## 10. Feedback and causality

Every action requires four classes when appropriate:

```text
acknowledgement
progress
outcome
continuation or recovery
```

Place feedback near the action or changed object. Use the least intrusive level that still communicates enough.

Do not use toast disappearance as sole evidence for R2–R4. Do not use a spinner when it can represent progress, skeletons, or actual processing steps.

Read [references/04-feedback-causality-and-system-status.md](references/04-feedback-causality-and-system-status.md) and [references/09-latency-loading-and-optimistic-ui.md](references/09-latency-loading-and-optimistic-ui.md).

## 11. Input modality parity

For each behavior, create a table:

| Capability | Trigger | Feedback | Commit | Cancel |
|---|---|---|---|---|
| Pointer | hover, click, drag | visual | click, drop | leave, Esc |
| Touch | tap, press, swipe | visual, haptic if any | tap, release | back, cancel |
| Keyboard | Tab, arrows, Space, Enter | focus-visible | Space, Enter | Esc |
| Assistive tech | semantic command | name, role, state | activate | dismiss |

Gestures and direct manipulation may be shortcuts only when an explicit, discoverable path also exists.

Read [references/06-direct-manipulation-gestures-and-physics.md](references/06-direct-manipulation-gestures-and-physics.md) and [references/07-input-modality-and-ergonomics.md](references/07-input-modality-and-ergonomics.md).

## 12. Error, undo and recovery

Priority:

```text
prevent
→ constrain
→ acknowledge
→ explain
→ preserve work
→ offer recovery
→ confirm restored state
```

Use confirmation when the effect is difficult to reverse, the scope is difficult to perceive, or the user may confuse the target. Use undo when an action can be reversed safely and quickly.

Read [references/10-error-prevention-confirmation-undo-recovery.md](references/10-error-prevention-confirmation-undo-recovery.md).

## 13. Accessibility and responsible motion

* Do not depend on hover, color, motion or sound as the only channel.
* Do not automatically scroll content that the user cannot pause or stop.
* Avoid full-screen parallax, scroll-jacking and movement in a different direction than the input.
* Respect reduced motion; preserve state meaning with opacity, instant replacement or persistent cues.
* Do not move focus unexpectedly.
* Important state changes must have an appropriate semantic update or announcement.
* Drag and drop must have a keyboard or command alternative.
* Animation is an enhancement; the core task must work when animation is disabled.

Read [references/11-accessibility-and-responsible-motion.md](references/11-accessibility-and-responsible-motion.md).

## 14. Principal process

1. **Diagnose:** Determine outcome, confusion, risk and system truth.
2. **Inventory:** List objects, states, events, guards, latency and failures.
3. **Prioritize:** distinguish between primary, secondary, advanced and hidden-by-policy.
4. **Model:** Create the state machine and transition matrix.
5. **Design:** select control, disclosure topology, feedback and recovery.
6. **Choreograph:** Add motion only where it explains change.
7. **Map modalities:** pointer, touch, keyboard, assistive tech, reduced motion.
8. **Prototype:** checks interruption, reversal, rapid repeat and slow network.
9. **Test:** measures discoverability, task success, errors, time, recovery and comprehension.
10. **Systemize:** Convert repeated behavior into patterns, tokens and component contracts.
11. **Handoff:** Write enough acceptance tests so that implementation doesn't have to guess.
12. **Audit after build:** Check the real behavior, not just the prototype.

Read [references/13-prototyping-testing-and-metrics.md](references/13-prototyping-testing-and-metrics.md).

## 15. Output contract

For design or refactor tasks, return at least:

```text
1. User outcome and context
2. Risk tier
3. Interaction diagnosis
4. State inventory
5. Trigger and transition model
6. Reveal / feedback / motion rationale
7. Modality equivalence
8. Error, interruption and recovery behavior
9. Motion tokens or timing ranges
10. Accessibility behavior
11. Acceptance tests
12. Open assumptions and validation plan
```

Use [templates/microinteraction-spec.md](templates/microinteraction-spec.md), [templates/state-transition-matrix.md](templates/state-transition-matrix.md) and [templates/storybook-interaction-contract.md](templates/storybook-interaction-contract.md).

## 16. Audit and ship gate

Score according to the 100-point rubric in [references/14-audit-rubric.md](references/14-audit-rubric.md).

Do not call an interaction production-ready while any of these issues remain:

* Primary action or critical information is only available on hover or gesture.
* The key state is not persistent or does not have the correct system truth.
* Animation blocks or ignores input.
* No keyboard, touch or reduced-motion equivalent.
* Pending is presented as confirmed.
* An error causes data loss or offers no recovery.
* Motion runs automatically without control.
* R3–R4 use optimistic success without safeguards.
* Focus order, announcement or target behavior is broken.
* The total score is below 85, or any `Blocker` or `Critical` finding remains.

## 17. Systematization

Repeated interactions must be recorded as a pattern with:

```text
purpose
anatomy
states
events
guards
transitions
motion
content slots
modality behavior
accessibility
error and recovery
analytics
acceptance tests
do / do not
```

Use motion tokens in [templates/motion-tokens.json](templates/motion-tokens.json). Don't hard-code duration, easing or reveal delay to be unreasonably different between components with the same purpose.

Read [references/12-design-system-patterns-and-tokens.md](references/12-design-system-patterns-and-tokens.md).

## 18. Closing principle

You design the **relationship between intention, time, and state**.

A good interaction is often almost invisible because users immediately understand:

```text
What can I do?
What is happening?
What changed?
Why did it change?
Can I change my mind?
What should I do next?
```

When a reveal makes the screen calmer while remaining discoverable, use it.

When hiding creates a puzzle, show it again.

When motion explains change, keep it.

When motion is just performing, leave it alone.

---

# Embedded Knowledge Library

This standalone edition embeds the package references, templates and examples. The canonical progressive-disclosure edition remains `SKILL.md`.


---

# Reference: 00-universal-constitution

Embedded from `00-universal-constitution.md`.

# Universal Interaction Constitution

## 1. Interaction design is cause and effect design

A static interface that describes a state. Interaction design describes how human intentions cause the system to change over time.

Basic unit that is not a button, hover or animation. The basic units are:

```text
intention
→ available action
→ system interpretation
→ state transition
→ perceptible evidence
→ next possible action
```

If the user cannot predict or evaluate this sequence, the interaction is incomplete.

## 2. Outcome before control

Control is just a means. Before selecting a button, menu, gesture or drag, determine:

* What is the user trying to change in their world.
* What must be right before they act.
* What they need to know to decide.
* Consequences of a wrong choice.
* What evidence makes them believe that the job is done.

A locally optimized control can ruin the global flow. For example, turning every action into a small icon can reduce space but increase search, memorization, and errors.

### Test

Describe the interaction without using the component name. If you can't, you're designing the control before the outcome.

## 3. State is the truth, not styling

State should be a model of data and behavior, not just a color variation.

A complete state includes:

```text
meaning
entry conditions
available actions
forbidden actions
feedback
persistence
exit conditions
recovery
```

Common errors:

* Show checkmark when a new request has been sent, not yet confirmed.
* Use disabled to hide the reason the user cannot continue.
* Use selected as if committed.
* Use loading for both network wait, validation and permission check.
* Use a toast to declare success while the main data has not changed.

### Test

For each state, ask: “What source of truth supports this state?”

## 4. Discoverability before elegance

Minimalism does not mean no signifier.

An interaction can be hidden when:

* It is secondary or advanced.
* The user is sure to touch the trigger area in the normal flow.
* Failure to detect does not crash the task.
* There is another visible or explicit line.
* Context made the possibility of action obvious.

An interaction cannot be hidden when:

* It is the main step of the task.
* It determines safety, privacy, money or legal commitment.
* It is the only way to recover.
* New users have no reason to try.
* It only has tooltip or hover as signifier.

### Test

Show the screen to someone unfamiliar with the product for five seconds. Can they point out which object to interact with and the next step?

## 5. Primary visible, secondary contextual, expert redundant

This is the default tiered model:

```text
Primary
visible, labeled, reachable

Secondary
contextual reveal or explicit More

Advanced
shortcut, gesture, command palette, hotkey

Rare administration
menu, settings, policy-controlled surface
```

Advanced path does not replace basic path. Good shortcuts accelerate after the user has understood, without becoming a condition for understanding.

## 6. Progressive disclosure is hierarchy over time

Progressive disclosure is not a clean hiding technique. It determines what appears at what time.

A good disclosure:

* Keep must-know and must-do in the first grade.
* Shows a clear signifier that content remains.
* Preserve context when opening.
* Allows closing or returning without losing state.
* Do not change the control's meaning after opening it unexpectedly.
* Do not hide cost, consent, risk, permission or status.

A bad disclosure:

* Use accordion to hide errors or required conditions.
* Use hover to hide primary actions.
* Use “More” for a group without structure or name.
* Opening a panel causes the user to lose their position.
* Closing the panel causes the entered data to be lost.

## 7. Hover is a weak and conditional signal

Hover only exists when the input is hoverable. It is not equivalent to a solid intent.

Hover is suitable for:

* Preview does not commit.
* Secondary row actions.
* Reinforce affordance.
* Tooltip for additional labels.
* Contextual metadata.
* Pointer-specific precision aid.

Hover is not suitable as the only road for:

* Main Navigation.
* Destructive action.
* Consent or legal disclosure.
* Critical status.
* Sensitive data.
* Error recovery.
* Interaction on touch-first context.

Hover always needed an equivalent model for focus and touch.

## 8. Feedback closes the evaluation round

Feedback must answer the correct question at the right time:

```text
Did the system receive my action?
Is it still working?
What changed?
Was it successful?
What can I do now?
```

Feedback is not always a message. It could be:

* Control pressed state.
* Object following pointer.
* Row selection.
* Counter update.
* Inline status.
* Progress indicator.
* Persistent record state.
* Haptic or sound as appropriate.

Intrusive level must be proportional to risk and urgency.

## 9. Causality must be perceptible

A good transition shows which object causes which object.

For example:

* Button opens popover from the button position itself.
* Card opens detail view with shared visual continuity.
* Added items appear in their respective positions.
* The deleted object shrinks or leaves the list before the void closes.
* Filter chip appears where the filter condition is applied.

Do not use pseudo-physical motion if it distorts the information architecture. The direction of movement must match the source and destination relationship.

## 10. Motion explains, stillness protects attention

Motion attracts attention almost automatically. So each animation must have cost justification.

Valid purposes:

1. Acknowledge.
2. Orient.
3. Connect cause and effect.
4. Direct focus.
5. Reveal or conceal.
6. Demonstrate.
7. Show progress.
8. Confirm outcome.
9. Express brand after the above goals have been preserved.

Invalid:

* “For modernity.”
* “To create a wow moment.”
* “Make less empty.”
* “Designer likes.”
* “Every other app has it.”

## 11. Nonblocking is the default

Interaction is nonlinear. Users can change their mind mid-animation.

Good Behavior:

* Reverse from current visual state.
* Retarget destination when the user selects a new item.
* Cancel when Esc or pointer release is invalid.
* Ignore duplicate submit but still clearly acknowledge.
* Queue only if order is absolutely necessary.

Bad Behavior:

* Lock navigation until transition is complete.
* Skip the second click without notification.
* Restart animation from the beginning when the user reverses direction.
* Disable entire UI to simplify implementation.

## 12. Timing must be fast but readable

Duration depends on:

* Area size changed.
* Travel distance.
* Complexity of easing.
* Frequency of action.
* Level of explanation required.
* Risk of missing changes.
* Input velocity and user pace.

Principle:

```text
frequent action → faster
large spatial change → long enough to orient
high risk confirmation → not in a hurry to the point of confusion
repeated use → can shorten or eliminate flourish
```

Don't use the same duration for everything.

## 13. Direct manipulation must preserve directness

When the user drags an object:

* Object responds immediately to input.
* Grasp point does not jump.
* Constraint and drop zone are displayed at the right time.
* Invalid destination is indicated before dropping.
* Controlled autoscroll.
* Release creates an explicit commit.
* Esc or cancel returns a safe state.
* Keyboard path exists.

If drag is just a decorative layer on a complex dialog, it is no longer direct manipulation.

## 14. Recognition before recall

Don't make users remember:

* Which item is currently selected.
* Which filter is active?
* What data is saved.
* Which mode is on.
* Secret Gesture.
* Condition from previous step.

State, selection, history and next action must be exposed to the world at the point of need.

## 15. User controls cadence

Avoid:

* Carousel changes automatically.
* Tooltip disappears too quickly.
* Self-submission timer.
* Hover panel closes when pointer passes through small range.
* Scroll-jacking.
* Auto-navigation after success does not allow reading.
* Loading does not cancel when the operation is long.

The system can be proactive, but cannot hijack direction.

## 16. Error is a real product

Design errors in series:

```text
prevent
→ detect
→ locate
→ explain
→ preserve
→ recover
→ confirm recovery
```

Do not use shake animation instead of error message. Motion only helps locate or connect cause.

## 17. Undo often exceeds confirmation

Confirmation requires users to predict the future before seeing the consequences. Undo allows them to see the results and then recover.

Prioritize undo when:

* Action can be reversed quickly.
* Scope is clear.
* Side effect has not spread yet.
* Delay commit is acceptable.

Prioritize confirmation when:

* The consequences cannot be reversed.
* Delete other people's data.
* Send sensitive information.
* Perform a transaction or clinical action.
* Scope is easy to misunderstand.

## 18. Latency must be designed in stages

```text
Immediate acknowledgement
→ active work indication
→ progress or stage
→ confirmed result
→ recovery if failed
```

Do not use optimistic UI for state where a deviation of a few seconds can be harmful. Does not simulate exact progress without data, but can represent the true stage.

## 19. Modality is a capability, not a device label

A laptop can have a mouse, keyboard and touch. A tablet can have a trackpad. One person can use switch control.

Designed according to capability:

* Hover or not.
* Pointer coarse hay precise.
* Whether there is a keyboard or not.
* Whether there is a screen reader or voice control.
* Motion preference.
* Viewport and posture.

Do not infer “desktop = hover” or “mobile = touch only”.

## 20. Accessibility is a behavior contract

Accessibility is more than just ARIA or contrast. It includes:

* Trigger equivalent.
* Focus order.
* Focus retention.
* Name, role, value, state.
* Announcement of async updates.
* Dismiss behavior.
* Target size and spacing.
* Reduced motion.
* Timeout control.
* Gesture alternative.
* Zoom and reflow.

## 21. Interaction must be resilient

Check:

* Double click and rapid tap.
* Slow network.
* Out-of-order response.
* Offline mid-action.
* Permission changed.
* Concurrent edit.
* Component unmount between animation.
* Back navigation while an operation is pending.
* Browser refresh.
* Reduced motion.
* Long content and localization.

Happy path is not enough.

## 22. Patterns create languages

A pattern is more than just a form. It includes:

```text
problem
context
purpose
states
events
transitions
feedback
recovery
accessibility
implementation constraints
```

If two components have different behavior for the same meaning, the user must relearn.

## 23. Delight is the quality of the relationship

Sustainable Delight comes from:

* The system understands the intent.
* Quick response.
* Motion has craft but does not show off.
* Error has forgiveness.
* Details appear just in time.
* Users do not experience negative surprises.

Funny microinteraction cannot save a wrong state model.

## 24. Measure behavior, not demo

Valuable indicators:

* Discoverability rate.
* Time to first correct action.
* Wrong target rate.
* Accidental activation.
* Task completion.
* Recovery success.
* Reversal success.
* Repeated-use speed.
* Comprehension of current state.
* Perceived responsiveness.
* Motion discomfort reports.

“Stakeholder likes animation” is not good evidence of interaction.


---

# Reference: 01-intake-and-diagnosis

Embedded from `01-intake-and-diagnosis.md`.

# Intake and Interaction Diagnosis

## 1. The goal of intake

Behavior cannot be designed just from the sentence "add hover to make it beautiful". Intake must convert formal requirements into behavioral problems.

A good intake determines:

```text
Who acts?
What are they trying to accomplish?
What object changes?
What state exists now?
What state should exist next?
What evidence is authoritative?
What can fail?
What is the cost of error?
Which modalities are available?
How often does this happen?
```

## 2. Minimum interaction brief

### 2.1 Actor

Specify role, skill level, permission, frequency and context.

For example:

```text
Role: clinic receptionist
Skill: expert daily user
Context: interruptions, keyboard-heavy, shared screen
Permission: may edit demographic data, may not alter clinical diagnosis
```

### 2.2 Triggering context

What brings users to interaction?

* Proactive Intent.
* Notification.
* Error.
* System event.
* External update.
* Time-based event.
* Permission change.

### 2.3 Outcome

Outcome must be a meaningful change, not “open modal”.

Not good:

```text
Open edit dialog
```

Good:

```text
Correct the patient phone number without losing current consultation context
```

### 2.4 Decision

What do users need to know to decide?

* Current value.
* Source and freshness.
* Consequence.
* Alternative.
* Reversibility.
* Permission.
* Validation rule.

### 2.5 Frequency

| Frequency | Design consequences |
|---|---|
| Many times per minute | Optimized speed, keyboard, low-motion, nonblocking |
| Everyday | Consistency and learnability matter |
| Rare | Signifiers, labels and guidance are more important than shortcut |
| Once | Explicit, self-contained, does not rely on memory |

### 2.6 Risk

Use tier R0–R4. If you're not sure, choose a higher tier until you have proof.

### 2.7 Latency

Identify:

* Local hay remote.
* Median and worst-case.
* Is there real progress?
* Can you cancel?
* Can it be background?
* Maybe not optimistic.
* Can responses be returned in the wrong order?

### 2.8 Modality

Don't just write “desktop” or “mobile”. Write capabilities:

```text
pointer precise
pointer coarse
touch
keyboard
screen reader
voice control
reduced motion
high contrast
zoomed viewport
```

## 3. Diagnosis according to seven distances

### 3.1 Goal gap

Is the UI optimized for what the product wants or what the user wants?

### 3.2 Discoverability gap

Does the user know the action exists?

### 3.3 Mapping gap

Is Control naturally related to object and outcome?

### 3.4 Execution gap

Do users know how to do this?

### 3.5 Feedback gap

Is the system acknowledging fast enough and in the right place?

### 3.6 Evaluation gap

Do users understand the new state and the consequences?

### 3.7 Recovery gap

When they are wrong, can they keep their work and return to a safe state?

## 4. Diagnose hover reveal request

When a stakeholder says “reveal on hover”, ask:

1. Is the thing revealed primary or secondary?
2. Is the user sure to hover over that area in a normal flow?
3. What do touch and keyboard do?
4. If the user never sees it, will the task fail?
5. Reveal is preview, command or detail?
6. Is the content sensitive?
7. Is Reveal interactive?
8. Does it need to be persistent after click or selection?
9. Is there a layout shift?
10. Does Exit cause flicker when the pointer moves to new content?

If the answer to 2, 3 or 4 is unclear, hover cannot be the only trigger.

## 5. Interaction diagnosis canvas

```text
Problem statement:

User outcome:

Current behavior:

Observed failure:

Critical state ambiguity:

Primary affordance:

Secondary affordance:

Potential hidden complexity:

Risk tier:

Latency:

Modality gaps:

Recovery gap:

Evidence available:

Hypothesis:

Success metric:
```

## 6. Find the pivot point

Principal designer doesn't fix everything at once. Identify one or two causes of most friction:

* State model is ambiguous.
* Primary action is hidden.
* Response is slow.
* Information architecture is inconsistent.
* Interaction does not have touch/keyboard parity.
* Async truth is misrepresented.
* Error recovery broken.

Then focus the solution on the pivot point before polishing.

## 7. Evidence ladder

Rank evidence from strong to weak according to context:

1. Observe users performing real tasks.
2. Usability test has task and prototype with enough state.
3. Product analytics with clear event semantics.
4. Support logs and error telemetry.
5. Domain expert review.
6. Heuristics and cognitive principles.
7. Competitive patterns.
8. Personal Preference.

Principles help create good hypotheses, not replace user research.

## 8. Exit criteria of intake

Don't start designing until you can answer:

* Current state and desired state.
* Primary user outcome.
* Risk tier.
* Source of truth.
* Modality requirements.
* Failure and recovery.
* Success evidence.


---

# Reference: 02-state-models-and-transition-contracts

Embedded from `02-state-models-and-transition-contracts.md`.

# State Models and Transition Contracts

## 1. Why does state model come before motion

Animation is just a way to represent a transition. If the previous state, next state, or transition condition is unclear, the animation will mask the confusion instead of explaining it.

Each interactive component should be thought of as a small state machine. A flow is a coordinated set of state machines.

## 2. Standard state vocabulary

### 2.1 Interaction states

```text
idle
hovered
focus-visible
pressed
active
selected
expanded
dragging
drop-target
editing
```

### 2.2 System states

```text
pristine
dirty
validating
valid
invalid
submitting
busy
pending
confirmed
failed
conflict
offline
stale
```

### 2.3 Availability states

```text
enabled
disabled
read-only
hidden
unavailable
permission-denied
```

### 2.4 Content states

```text
empty
partial
complete
truncated
loading
no-results
```

Do not use one state to represent multiple meanings.

## 3. Pairs are often confused

### Hover and focus

Hover is pointer presence. Focus is input routing. Focus must be persistent until focus is switched; hover disappears when the pointer leaves.

### Pressed and activated

Pressed is the pre-commit state. Activation usually occurs when releasing or keyboard activation. Allows pointer cancellation if the user drags out before release.

### Selected and committed

Selected item can only be a candidate. Commit may require Apply, Save or next step.

### Busy and pending

Busy means the client is processing or waiting. Pending means the action has been received but the outcome is not final.

### Optimistic and confirmed

Optimistic is UI prediction. Confirmed means the server or authoritative source has confirmed.

### Disabled and read-only

Disabled Normally cannot focus or interact. Read-only still requires reading, copying, focusing and understanding why.

### Hidden and unavailable

Hidden is not present in the current presentation. Unavailable may require a signifier and explanation.

## 4. Transition contract

Each transition must have:

```text
ID
Source state
Event
Actor
Guard
Immediate acknowledgement
Side effect
Intermediate state
Authoritative confirmation
Destination state
Focus behavior
Announcement
Interrupt policy
Cancel path
Failure state
Recovery
Persistence
Analytics event
```

### Example

```text
ID: patient-phone-save
Source: editing.dirty.valid
Event: activate Save
Guard: permission && online
Acknowledgement: Save button → busy, field remains visible
Side effect: PATCH patient contact
Intermediate: pending-save
Confirmation: server version returned
Destination: saved-confirmed
Focus: remain on field group, status text updated
Announcement: “Phone number saved” when needed
Interrupt: allow navigation only after preserve-or-confirm decision
Cancel: not available after request sent; undo if versioning supports
Failure: save-failed, preserve entered value
Recovery: Retry or copy value
Analytics: patient_phone_save_result
```

## 5. Event taxonomy

### User events

```text
pointerenter
pointerleave
pointerdown
pointerup
click
tap
long-press
drag-start
drag-move
drag-end
focus
blur
keydown
input
submit
cancel
```

### System events

```text
request-start
request-success
request-failure
timeout
offline
permission-change
external-update
conflict-detected
background-complete
```

### Time events

```text
intent-delay-elapsed
exit-grace-elapsed
debounce-elapsed
autosave-elapsed
session-timeout-warning
```

Time events must have a reason. Don't add delay just to make the animation look "smooth".

## 6. Guards

Guard is a condition that must be true for a transition to occur.

For example:

```text
hasPermission
isValid
hasUnsavedChanges
isOnline
hasSelection
isNotProcessing
isAuthoritativeVersion
supportsHover
prefersReducedMotion == false
```

If guard is false, the UI must explain or indicate an alternative, not silence.

## 7. Effects

Distinguish:

* Visual effect.
* Semantic effect.
* Data effect.
* Navigation effect.
* Focus effect.
* Announcement effect.
* Audit effect.

An animated visual should not be the only evidence of data effect.

## 8. Interruption policy

For each transition, choose one:

### `interrupt-and-reverse`

Used for expand/collapse, checkbox reveal, hover panel.

### `interrupt-and-retarget`

Used for navigation, user-controlled carousel, tab switch.

### `queue`

Only used when the order is a business requirement, for example batch commands.

### `coalesce`

Combine multiple consecutive inputs, for example autosave text.

### `ignore-with-acknowledgement`

Used for duplicate submit while the request is running. Button stays busy and does not create new requests.

### `block-with-reason`

Only if safety or data integrity is required. State clearly the reason and time.

## 9. Focus contract

Each state change must respond:

* Where is focus before transition?
* Does that Object still exist after the transition?
* If deleted, where should the focus move to?
* Does opening popover/dialog move focus?
* Does closing return focus to the trigger?
* Is Async update allowed to steal focus? Default is no.

## 10. Announcement contract

Do not announce all animations. Announce when state changes cannot be seen or affect the task:

* Save confirmed.
* Error appeared.
* Item count changes after filter.
* Background process completed.
* Permission denied.

Avoid live regions that are too noisy when users are typing.

## 11. State persistence

Determine whether state exists via:

```text
component rerender
route change
browser back
refresh
reconnect
new session
another device
```

Hover is not persistent. Selection can be persistent within the session. Commit must rely on authoritative storage.

## 12. Transition matrix template

| From | Event | Guard | To | Feedback | Interrupt | Failure | Recovery |
|---|---|---|---|---|---|---|---|
| idle | pointerenter | canHover | hovered | surface cue | leave reverses | none | none |
| hovered | activate action | permitted | busy | pressed + busy | duplicate coalesced | failed | retry |
| busy | server success | version current | confirmed | persistent status | n/a | conflict | resolve |

## 13. State completeness checklist

A component is incomplete if it is missing:

* Default.
* Hover and focus-visible if interactive.
* Pressed/active.
* Disabled and reason.
* Loading/pending if async.
* Success-confirmed.
* Error and recovery.
* Empty/no-results if data-driven.
* Reduced motion.
* Touch and keyboard behavior.
* Interrupted transition.
* Rapid repeat.


---

# Reference: 03-progressive-disclosure-and-hover-reveal

Embedded from `03-progressive-disclosure-and-hover-reveal.md`.

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


---

# Reference: 04-feedback-causality-and-system-status

Embedded from `04-feedback-causality-and-system-status.md`.

# Feedback, Causality, and System Status

## 1. Feedback is the system's response

An interaction did not end when the event was sent. It ends when the user understands the results and knows the next step.

Four-layer model:

```text
Acknowledgement
Progress
Outcome
Continuation or recovery
```

Not every interaction needs all four, but consequential actions often do.

## 2. Acknowledgement

Acknowledgement proves that input has been received.

For example:

* Pressed state.
* Toggle thumb starts moving.
* Row is selected.
* Drag object to pointer.
* Button switches to busy.
* Input value appears immediately.

The goal is to preserve the cause and effect relationship. If acknowledgment is slow, the user may tap again, change direction, or lose confidence.

## 3. Progress

Progress replied “Is the system still working?”

Select pattern by duration and predictability:

### Indeterminate

Use when the amount of work is unknown. Mention the task at hand, not just the spinner.

### Determinate

Use when there is a reliable total. Allows time prediction.

### Stage-based

Use when you know the steps but don't know the percentages.

### Skeleton

Used when the content structure is known and the content is coming.

### Background

Used when the operation is long and the user can continue. Need a place to monitor and notify when finished.

## 4. Outcome

Distinguish:

```text
request accepted
processing
saved locally
synced
confirmed
partially completed
failed
```

Do not use one checkmark for all.

Outcome R2–R4 needs persistent evidence in the object or record, not just toast.

## 5. Continuation

After the outcome, the user needs to know:

* Continue where.
* Do you need a review?
* Can you undo it?
* Is there a next item?
* Failure holds back what.
* Who is responsible for moving on?

Success should not be a dead end.

## 6. Feedback locality

Place feedback near:

1. Control causes action.
2. Object is changed.
3. The area the user is looking at.

Good example:

* Save status in the button itself or next to the title.
* Validation of field edges.
* A reorder placeholder in the list.
* Updated count next to filter result.

Use global notification when impact global or source is no longer on screen.

## 7. Least intrusive sufficient feedback

Order from mild to strong:

```text
visual state
inline text
status region
popover
banner
toast
dialog
blocking interlock
```

Choose the lowest level that still ensures user understanding.

No modalize error can be fixed inline. Do not use toast for data loss. Don't use large animations for small states.

## 8. Cause and effect with motion

Motion is useful when it shows:

* Source to create destination.
* Object moved, inserted, removed or transformed.
* Where does hidden layer come from.
* Control which regions affect.
* Error related to which field.

### Insert

Open space and place items in a continuous manner. Do not teleport items and then make the entire list jump.

### Remove

Lets users know which items leave before the space closes. With delete bulk, avoid long consecutive animations.

### Reorder

Other items translate to represent destination. Placeholder and drop indicator must be clear.

### Expand

Content develops from triggers or containers. Don't open from the center of the screen if the relation is local.

### Navigation

Motion direction reflects hierarchy or spatial model. Do not change direction arbitrarily between equivalent screens.

## 9. Feedback for multi-state control

A control can handle multiple states if the meaning is clear:

```text
Save
→ Saving…
→ Saved
→ Save failed / Retry
```

Requirements:

* Stable width or transition does not cause layout to shake.
* State text is not too fast to read.
* Busy does not clear context.
* Failure does not turn into unknown generic icon.
* Confirmed state returns to resting state according to consistency rules.

## 10. Feedback for repeated actions

With frequent actions:

* Feedback must be light and fast.
* Can aggregate instead of toast each time.
* Do not read screen reader announcements repeatedly unnecessarily.
* Rapid input is coalesced if semantics allow it.
* Visual changes to objects are often enough.

For example: star/unstar should change state at icon; No need to toast every time.

## 11. Feedback for destructive actions

Previous:

* Scope and consequences are clear.
* Object is defined.

Include:

* Acknowledge action.
* Do not fake success before confirmation if it is consequential.

Sau:

* Remove clear state.
* Undo if available.
* If failed, restore object and explain.

## 12. Feedback for external changes

When state changes due to other people or background processes:

* Does not steal focus.
* Highlight changed just enough to locate.
* Indicates freshness or actor when relevant.
* Allow review or merge when conflicts occur.
* Do not silently overwrite local work.

## 13. Attention escalation

Use escalation according to severity:

```text
subtle cue
→ persistent status
→ highlighted region
→ banner
→ modal interruption
→ alarm
```

Do not use red, shake, flash or sound for any warnings. Over-warning causes the signal to lose value.

## 14. Acceptance tests

1. Input is acknowledged immediately.
2. User distinguishes between pending and confirmed.
3. Feedback is in the right place.
4. Slow response has appropriate progress.
5. Failure holds input and has retry.
6. External update does not steal focus.
7. Toast is not the only evidence for consequential change.
8. Motion shows the correct source and destination.
9. Rapid repeat does not create notification storm.
10. Screen reader receives important state changes.


---

# Reference: 05-motion-grammar-timing-and-easing

Embedded from `05-motion-grammar-timing-and-easing.md`.

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


---

# Reference: 06-direct-manipulation-gestures-and-physics

Embedded from `06-direct-manipulation-gestures-and-physics.md`.

# Direct Manipulation, Gestures, and Interaction Physics

## 1. What is direct manipulation

The user acts directly on the object instead of going through an intermediary such as a dialog or menu.

For example:

* Drag item to reorder.
* Resize panel using handle.
* Crop image by frame.
* Pan map.
* Swipe row to reveal shortcut.
* Pinch to zoom.

Direct manipulation creates a strong feeling when the relationship between movement and outcome is clear. It fails when gestures are secret, constraints are ambiguous, or feedback is slow.

## 2. Four conditions of directness

### 2.1 Continuous representation

Object remains visible during operation.

### 2.2 Physical action instead of syntax

User moves or transforms object, does not enter abstract command.

### 2.3 Immediate feedback

Object responds to input with no sensing delay.

### 2.4 Reversible incremental operation

User can adjust, cancel or undo.

## 3. Discoverability ladder

Easiest word to detect:

1. Explicit instruction.
2. Contextual command.
3. Visible handle.
4. Hover/focus reveal handle.
5. Cursor or state cue.
6. Convention.
7. Experimentation.
8. Hidden gesture.

Frequently used or unexpected manipulation requires a higher level. Hidden gestures should only be shortcuts.

## 4. Drag and drop contract

### Before drag

* Which Object is draggable must be clear.
* Whole object draggable or just handleable?
* Pointer target is large enough.
* Text selection does not conflict.
* Touch scroll is not broken for no reason.
* Keyboard alternative exists.

### Drag start

* Use a small threshold to distinguish clicking from dragging.
* Preserve grab offset, object does not jump.
* Original position and clear ghost strategy.
* Announce “picked up” for assistive tech when needed.

### During drag

* Object follows direct input.
* Valid drop zones are highlighted.
* Invalid zones have constraint cue.
* A placeholder for the destination.
* Auto-scroll has limited speed.
* Do not hide destination with dragged objects; can offset ghosts.
* Escape cancel.

### Drop

* Commit on release at valid target.
* Animate a short settler.
* Update order/state authoritative.
* Persistent feedback is enough for evaluation.
* Failure rollback has continuity.
* Undo if the operation is consequential but reversible.

### Keyboard reorder

A pattern could be:

```text
focus item
→ activate move mode
→ arrows change candidate position
→ live announcement
→ Enter commits
→ Esc cancels
```

Do not force user keyboard to simulate pointer pixel by pixel.

## 5. Swipe actions

Swipe can save space but discoverability is low.

Rules:

* Swipe is a shortcut, not a sole path.
* Has visible overflow/menu alternative.
* Direction consistent with platform and reading direction.
* Action revealed before commit except gesture is very clear and low risk.
* Destructive action did not commit due to an accidental short swipe.
* Reasonable Threshold and velocity.
* The item follows the finger.
* Release in intermediate state with clear snap.
* Support undo.

Do not place multiple two-sided actions if it is difficult for the user to remember.

## 6. Long press

Long press is suitable for:

* Context menu.
* Preview.
* Expert shortcut.
* Drag initiation when needing to avoid scroll conflict.

Not suitable for primary action because it is not visible and the timing is unpredictable.

Need:

* Progress cue if hold duration is significant.
* Cancel when finger moves outside threshold.
* Haptic feedback if the platform supports it and is suitable.
* Tap alternative.

## 7. Pinch, zoom, rotate

* Content must be continuously responsive.
* Zoom focal point according to finger position.
* Min/max constraints have slight resistance or bounce.
* There are button alternatives when zoom is needed for the task.
* Do not disable browser/system zoom for custom gestures.
* Rotation only if the domain has meaning.

## 8. Gesture conflict

Common conflicts:

* Horizontal swipe vs browser back.
* Vertical drag vs page scroll.
* Pinch custom vs page zoom.
* Long press vs text selection.
* Edge gesture vs OS navigation.

Solved with:

* Only takes up gestures in areas with signifiers.
* Threshold and direction lock.
* Delay capture until intent is clear enough.
* Alternative visible.
* Do not override system behavior if there is no large value.

## 9. Interaction physics

“Physics” in UI is an expectation, not an absolute physics simulation.

### Mass

Large or consequential objects may move a little slower. Do not make heavy UI into slow UI.

### Friction

Friction helps avoid overscroll or accidental dragging. Too much causes interaction lag.

### Inertia

Suitable for scroll, carousel, map. Need predictable stop and cancel with new input.

### Elasticity

Used at boundary to indicate constraint. No infinite bounce.

### Snap

Help align to valid state. Snap distance must be appropriate and destination visible.

### Resistance

Indicates that the action exceeds the limit or is consequential. Do not use to manipulate the user from making a valid choice.

## 10. Direct manipulation and data truth

Visual movement does not mean a successful commit.

Remote reorder example:

```text
user drops
→ local order updates
→ pending marker
→ server confirms
→ confirmed
```

If server fails:

* Restore order or give retry.
* Explanation.
* No silent diverge.

For R3–R4, consider holding candidate state until confirmation.

## 11. Precision and target

An accurate pointer does not mean the target should be small. Touch and motor variability require:

* Target is large enough.
* Spacing avoids wrong targets.
* Handle has a larger hit area than shown.
* Edge target takes advantage of boundary.
* Frequent targets near natural posture.

## 12. Multi-selection

Distinguish:

* Select item.
* Open item.
* Toggle checkbox.
* Enter selection mode.

Do not let the tap row be both open and select ambiguously.

Selection mode requires:

* Count selected.
* Bulk actions persistent.
* Clear all.
* Exit mode.
* State survives scroll.
* Destructive scope is clear.

## 13. Direct editing

Inline editing is good when:

* Important context.
* Field less.
* Simple validation.
* Save behavior clearly.

Contract:

```text
view state
→ enter edit
→ dirty state
→ validate
→ save pending
→ confirmed or failed
→ view state
```

Do not use click text to edit without affordance or consistent pattern. Hover pencil can be a secondary cue but keyboard/touch path must be present.

## 14. Acceptance tests

1. Novice has visible path.
2. Gesture is a shortcut if it is difficult to discover.
3. The dragged object follows the input.
4. Clicking should not be mistaken for dragging.
5. Scroll is not broken.
6. Invalid drop visible before release.
7. Esc cancel works.
8. Keyboard alternative complete with outcome.
9. Failure rollback is clear.
10. Reduced motion does not lose feedback.
11. Touch target and posture are tested on real devices.


---

# Reference: 07-input-modality-and-ergonomics

Embedded from `07-input-modality-and-ergonomics.md`.

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


---

# Reference: 08-attention-orientation-and-spatial-continuity

Embedded from `08-attention-orientation-and-spatial-continuity.md`.

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


---

# Reference: 09-latency-loading-and-optimistic-ui

Embedded from `09-latency-loading-and-optimistic-ui.md`.

# Latency, Loading, Pending, and Optimistic UI

## 1. Latency is part of interaction

User does not know network, queue or server. They only know whether the product responds or not.

Model:

```text
input
→ acknowledgement
→ processing evidence
→ authoritative result
```

If a step is missing, the user may repeat the action, abandon or misunderstand the state.

## 2. Time bands

The bands below are cognitive orientations, not absolute SLA:

### 0–100ms

Response is felt almost instantaneously. Used for pressed state, local echo, selection.

### 100–400ms

Still feels seamless if acknowledgment is clear.

### 400ms–1s

User begins to notice delay. May need light busy cue.

### 1–10s

Need progress or stage. Keep the user informed and cancel if appropriate.

### Over 10 seconds

Consider background, notification, estimated completion, pause/cancel and where to track.

## 3. Acknowledge before result

Button can be pressed/busy immediately, but cannot be success-confirmed until the source of truth confirms.

For example:

```text
Place order
→ Placing order…
→ Order placed
```

No:

```text
Place order
→ Order placed
→ request fails silently
```

## 4. Loading pattern selection

### Local state change

Do not loader if result is almost instantaneous. Update objects directly.

### Inline busy

Used when a control or section is processing. Do not block the entire page.

### Skeleton

Used when the content structure is known in advance. Skeletons should be close to the actual layout to avoid shifting.

### Determinate progress

Use when total measurement is reliable.

### Stage progress

Used when discrete steps are available.

### Background job

Used when the user can leave. Need job center, notification or persistent status.

### Full-page blocking

Only if the entire context cannot be used safely. State the reason.

## 5. Skeleton principles

* Reflects the real structure, not too strong decorative waves.
* Do not create false content hierarchy.
* Do not repeat distracting animations.
* When content arrives, transition slightly.
* Error replacing skeleton with recovery, no permanent spinner.
* Reduced motion using static skeleton.

## 6. Progress honesty

Do not display 73% if no data is available.

Can be used:

* “Uploading 3 of 8 files.”
* “Validating sample labels.”
* “Waiting for laboratory confirmation.”

Stage-based feedback is more reliable than fake percentage.

## 7. Optimistic UI decision framework

Optimistic update is allowed when:

* Failure rare.
* Action reversible.
* Low Consequence.
* Conflict is easy to resolve.
* User benefit from large instant response.
* UI still shows pending if needed.

Should not be used when:

* Clinical, financial or legal commitment.
* Inventory, booking or high concurrency.
* Permission uncertain.
* Failure causes the user to act based on the wrong state.
* Side effect sent externally.

## 8. Optimistic state vocabulary

Visual distinction:

```text
optimistic-local
syncing
confirmed
failed-to-sync
conflict
```

Favorite low-risk example:

* Icon changed immediately.
* If failed, revert and give a short report.

Example high-risk order:

* Button busy.
* Record pending.
* Only displays placed when the server confirms.

## 9. Autosave

Autosave contract:

```text
dirty
→ debounce
→ saving
→ saved-confirmed
```

Need:

* Dirty state if user leaves before saving.
* Coalesce changes.
* Out-of-order response protection.
* Visible status during high-value work.
* Failure keeps local content.
* Retry.
* Conflict resolution.
* Version or timestamp when relevant.

Don't let "Saved" get stale when the new change is dirty.

## 10. Duplicate actions

Prevent double submission by:

* Immediate busy state.
* Idempotent request if possible.
* Coalesce duplicate events.
* Do not delete the label so the user does not know what action is running.
* Don't ignore silence.

## 11. Cancellation

Long operation should be canceled when:

* Cancel safely.
* User can change his mind.
* Large resource cost.
* Wait is not bounded.

Need to distinguish:

* Cancel request local.
* Request cancellation accepted.
* Operation is too far gone to cancel.

Do not promise to cancel if the backend does not support it.

## 12. Retry

Retry right:

* Hold input.
* Do not create duplicates.
* Indicates the affected object.
* There is backoff when repeated failure.
* Provides an alternative when the error persists.

## 13. Offline

Design:

* Detect and display offline.
* Distinguish between local saved vs synced.
* Queue only if semantics allow.
* Show pending operations.
* Resolve conflicts when reconnecting.
* Don't display final success without syncing.

## 14. Out-of-order responses

Search, autosave and filter may return responses in the wrong order.

Solution:

* Request IDs/version.
* Ignore stale response.
* Cancel previous requests when possible.
* UI state based on latest intent.

## 15. Perceived performance

Improved by:

* Acknowledge ngay.
* Render partial content early.
* Correct Skeleton structure.
* Reasonable preload.
* Preserve previous data during refetch.
* Optimistic only when safe.
* Do not use long animations to hide real latency.

## 16. Acceptance tests

1. Acknowledgement in the appropriate band.
2. Pending is not the same as confirmed.
3. Slow network has progress.
4. Double submit does not create duplicates.
5. Out-of-order response does not overwrite latest intent.
6. Offline status is clear.
7. Autosave failure keeps content.
8. Cancel semantics are actually correct.
9. R3–R4 are not optimistic-final.
10. Background job has a place to track.


---

# Reference: 10-error-prevention-confirmation-undo-recovery

Embedded from `10-error-prevention-confirmation-undo-recovery.md`.

# Error Prevention, Confirmation, Undo, and Recovery

## 1. Design for people who are prone to interruptions

Errors do not only come from ignorance. It comes from:

* Attention redirect.
* Repeated actions.
* Mode confusion.
* Similar targets.
* Time pressure.
* Stale data.
* Network failure.
* Permission change.
* Concurrent work.
* Misleading feedback.

The goal is not to eliminate all errors by adding confirmation. The goal is to make the system resilient.

## 2. Error taxonomy

### Slip

Intent is correct, execution is wrong.

For example: click on the wrong row, double submit, select adjacent icon.

Solution: target, spacing, constraints, pointer cancellation, undo.

### Mistake

Mental model or decision is wrong.

For example: understand “Archive” as deleted, think pending as confirmed.

Solution: wording, resulting preview, conceptual model, explicit state.

### Mode error

Control works differently because the mode is different.

Solution: persistent mode cue, exit, constraint, reduce modes.

### System failure

Network, server, permission, conflict.

Solution: honest status, preserve work, retry, alternative.

## 3. Prevention hierarchy

1. Remove unnecessary decision.
2. Choose safe default.
3. Constrain impossible action.
4. Make target and scope clear.
5. Preview consequence.
6. Validate at useful time.
7. Ask confirmation only when needed.
8. Provide undo.
9. Preserve work on failure.
10. Offer recovery.

## 4. Constraints

### Physical or interaction constraints

Disable impossible drop zone, but explain state if user needs it.

### Logical constraints

Only valid combinations available.

### Semantic constraints

Context makes correct action obvious.

### Cultural or conventional constraints

Use platform conventions unless domain has strong reason.

Good Constraint prevents errors without making the user feel punished.

## 5. Validation timing

### On input

Suitable for light formats and immediate constraints. Avoid errors when new users type the first character.

### On blur

Appropriate when the field has enough data. Doesn't make the error disappear if focus returns without the value being fixed.

### On submit

Always needed as final safeguard. Focus or scroll to the appropriate error summary/first error.

### Async validation

Has validating state, stale response protection and retry.

## 6. Error message behavior

A good error reply:

```text
What failed?
Where?
Why, if known?
What was preserved?
How to fix or recover?
Is this temporary?
```

Behavior:

* Error appears near source.
* State does not depend on color.
* Motion only supports locate, not embarrassing shaking.
* Input remains the same.
* Error did not disappear before resolved.
* Summary link to fields when multiple errors.

## 7. Confirmation decision test

Use confirmation when at least one thing is true:

* Irreversible.
* High-cost.
* Affects other people.
* Sends externally.
* Scope ambiguous.
* User may not realize consequence.
* Regulatory or clinical requirement.

Do not use confirmation for:

* Low-risk reversible action.
* Frequent action.
* Action has explicit undo.
* Error caused by product can be prevented.

## 8. Confirmation anatomy

```text
specific title
object and scope
consequence
secondary effects
primary action named precisely
safe alternative
optional typed confirmation only for exceptional risk
```

Do not use “Are you sure?” like the entire message.

## 9. Destructive interaction hierarchy

### R1 low-risk

Immediate + undo.

### R2 task-critical

Explicit action, object preview, undo.

### R3 consequential

Confirmation or staged action, result, server-confirmed result.

### R4 safety-critical

Persistent review, identity/scope verification, permission, audit, minimal motion, no shortcut-only path.

## 10. Undo design

Undo needs:

* Scope is clear.
* Window is long enough or persistent history.
* Do not rely on toast-only if the action is consequential.
* Restore exact state, including order and metadata.
* Handle concurrent changes.
* Confirm undo result.

If undo is only pretend local but side effects outside the system have occurred, it is not called undo.

## 11. Retry vs resume vs restart

* Retry: perform the same operation again.
* Resume: continue from held progress.
* Restart: start again.

Copy and behavior must be correct. Do not record Retry if the user loses data and has to do it again.

## 12. Recovery ladder

```text
inline correction
retry
undo
restore draft
resume
choose alternative
contact support
manual reconciliation
```

Provides lines appropriate to severity.

## 13. Unsaved changes

Don't block navigation all the time. Choose strategy:

* Autosave.
* Draft persistence.
* Dirty indicator.
* Navigation confirmation when loss is real.
* Local recovery after crash.

Confirmation “Leave without saving?” only when work can actually be lost.

## 14. Conflict handling

When external change conflicts with local:

* Do not silently overwrite.
* Indicates object and version.
* Show differences when possible.
* Offer keep mine, use latest or merge by domain.
* Preserve both values for recovery.
* Audit R3–R4.

## 15. Error animation

Valid Motion:

* Brief highlight field.
* Scroll/anchor to error.
* Connect message to source.
* Restore object after failed delete.

Invalid motion:

* Shake the entire form several times.
* Flash red continuously.
* Error disappears automatically.
* Celebration before server confirmation.

## 16. Acceptance tests

1. Mistarget can cancel or undo.
2. Validation does not appear too early.
3. Input kept after failure.
4. Confirmation is only used when there is a sufficient reason.
5. Specific context and scope.
6. Undo restore the real state.
7. Retry does not create duplicates.
8. Conflict does not overwrite silence.
9. Error usable by keyboard/screen reader.
10. R4 has audit and authoritative confirmation.


---

# Reference: 11-accessibility-and-responsible-motion

Embedded from `11-accessibility-and-responsible-motion.md`.

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


---

# Reference: 12-design-system-patterns-and-tokens

Embedded from `12-design-system-patterns-and-tokens.md`.

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


---

# Reference: 13-prototyping-testing-and-metrics

Embedded from `13-prototyping-testing-and-metrics.md`.

# Prototyping, Testing, and Interaction Metrics

## 1. Prototype behavior, not just appearance

A prototype interaction must contain:

* Real triggers.
* State transitions.
* Timing.
* Reversal.
* Interruption.
* Focus behavior.
* Slow response.
* Error.
* Touch/keyboard path.
* Reduced motion.

A sequence frame click-through is not enough to evaluate nonblocking or direct manipulation.

## 2. Fidelity dimensions

Fidelity is not a single axis.

### Visual fidelity

Final UI similarity level.

### State fidelity

Completeness states and transitions.

### Input fidelity

Pointer, touch, keyboard, gesture.

### Data fidelity

Data is real, long, empty, stale, conflict.

### Latency fidelity

Fast, median, slow, offline.

### Error fidelity

Validation, server failure, permission, conflict.

For microinteractions, state and input fidelity are often more important than visual fidelity.

## 3. Prototype types

### Sketch/storyboard

Used to determine purpose, sequence and source/destination.

### Motion comp

Used to test timing, easing, choreography. Not enough to test input.

### Interactive prototype

Used to test trigger, responsiveness, interruption, focus.

### Production spike

Used to test performance, browser/platform behavior and actual accessibility.

Select the lowest level that answers the hypothesis.

## 4. Assumption register

Each prototype records:

```text
Assumption
Why it matters
How prototype represents it
How it will be tested
Pass criterion
Fallback
```

For example:

```text
Assumption: Secondary row actions are inevitably discovered.
Test: Five users complete row-edit task without instruction across mouse and keyboard.
Pass: At least four discover correct action without scanning unrelated menus.
Fallback: Keep overflow visible and add persistent Edit affordance.
```

## 5. Test scenarios

### Discovery

“You want to repair this item. What will you do?”

Don't say “hover”.

### Reversal

Quickly open and close, switch tabs mid-transition, tap again in animation.

### Interruption

Slow network, user back, route change, duplicate submit.

### Recovery

Server fail, offline, conflict, permission denied.

### Modality

Mouse, touch, keyboard, screen reader.

### Reduced motion

Check meaning and orientation when motion decreases.

## 6. Metrics

### Discoverability rate

Percentage of users finding the correct action without instructions.

### Time to first correct action

Time from context to trigger is correct.

### Wrong-target rate

Click/tap on the wrong target.

### Accidental activation

Action occurred but the user did not intend to do it.

### Hover churn

Number of reveals opening/closing that did not result in an action. Cao can report accidental hover or flicker.

### Task success

Is the outcome correct?

### Time on task

Need to read together success and error, not optimized for speed regardless of correctness.

### Recovery rate

Percentage of users recovering from failure.

### Reversal success

Does Undo/cancel return the correct state?

### State comprehension

User correctly describes current state, pending/confirmed and next step.

### Perceived responsiveness

Self-report after task combined with telemetry latency.

### Motion comfort

Reports about dizziness, distraction, frustration or inability to track.

## 7. Instrumentation model

Events must be semantic:

```text
interaction_exposed
interaction_discovered
interaction_started
interaction_committed
interaction_cancelled
interaction_failed
interaction_recovered
interaction_undone
```

Properties:

```text
pattern
component
input modality
risk tier
latency band
result
error type
reduced motion
```

Do not log raw hover every pixel. Only log meaningful exposure/intention if privacy and value are reasonable.

## 8. Qualitative observations

Ghi:

* Where does the user stop?
* What area do they look at.
* What do they predict.
* Do they recognize feedback?
* Do they distinguish between pending and confirmed?
* Are they afraid to try because the results are ambiguous?
* Did they change the modality?

## 9. Five-second and first-action tests

### Five-second

Evaluate hierarchy, interactive objects and current state.

### First-action

Evaluate trigger discoverability and mapping.

Do not use these tests to conclude total usability.

## 10. Motion timing tests

Compare variants using:

* Task completion.
* Repeated use.
* Error.
* Perceived speed.
* Ability to track source/destination.

Don't just ask "which one is better?"

## 11. Performance tests

* Low-end device.
* CPU throttling.
* Long list.
* Multiple animations.
* Scroll and animation simultaneously.
* Rapid input.
* Reduced motion.

Check dropped frames, delayed input and blocking.

## 12. Accessibility tests

* Keyboard only.
* Screen reader.
* Zoom.
* High contrast.
* Reduced motion.
* Touch target.
* Switch/voice names if relevant.

Automated tests are not enough for behavior.

## 13. Research caveats

* Preference does not equal performance.
* Lab does not reflect true interruptions.
* Expert users can hide the discoverability problem.
* A/B conversion does not explain cause.
* An increase in metrics can be accompanied by a decrease in trust.
* Small sample is good for finding issues but does not estimate population accurately.

## 14. Acceptance test format

```text
Given [state and context]
When [event]
Then [state transition]
And [feedback]
And [focus/announcement]
And [recovery or interrupt behavior]
```

For example:

```text
Given a row is idle
When it receives keyboard focus
Then contextual actions become visible without layout shift
And focus remains on the row trigger
And the actions are reachable in logical order
And Escape returns the row to its resting presentation
```

## 15. Ship evidence

An interaction can ship when:

* State model reviewed.
* Cross-modality tests pass.
* Error/recovery tested.
* Motion purpose documented.
* Performance acceptable.
* Risk-specific safeguards pass.
* Analytics semantics defined if needed.
* Open assumes owner.


---

# Reference: 14-audit-rubric

Embedded from `14-audit-rubric.md`.

# Interaction and Microinteraction Audit Rubric

## 1. Scoring model

Total 100 points.

| Category | Max |
|---|---:|
| Outcome and mental model | 15 |
| Discoverability and affordance | 15 |
| State model and feedback | 15 |
| Modality and accessibility | 15 |
| Causality, continuity, and motion | 10 |
| User control and recovery | 10 |
| Latency and performance | 8 |
| System consistency and handoff | 7 |
| Ethics and attention | 5 |

## 2. Outcome and mental model, 15

### Full score

* Outcome is clear.
* Object, action and result mapping are natural.
* User understands current and next state.
* Interaction does not expose implementation model.

### Deductions

* Control-first design.
* Ambiguous mode.
* Pending looks like confirmed.
* Navigation does not match mental model.

## 3. Discoverability and affordance, 15

### Full score

* Primary actions visible.
* Secondary reveals correct context.
* Hover does not sole path.
* Gesture has cue/alternative.
* Labels/signifiers are clear enough.

### Blocker

Critical action or recovery is only available via hidden gesture/hover.

## 4. State model and feedback, 15

### Full score

* States are clearly distinguished.
* Immediate acknowledgement.
* Progress is correct.
* Confirmed truth from correct source.
* External update and conflict are resolved.

### Critical

The UI reports success when the authoritative action has not succeeded.

## 5. Modality and accessibility, 15

### Full score

* Pointer, touch, keyboard parity.
* Focus visible and retained.
* Semantic state updates.
* Reduced motion.
* Drag alternative.

### Blocker

Task cannot be completed using keyboard or assistive technology when it is a requirement.

## 6. Causality, continuity, and motion, 10

### Full score

* Motion has a purpose.
* Direction matches spatial model.
* Nonblocking/interruptible.
* Timing readable.
* No unnecessary motion.

### Deductions

* Cinematic navigation.
* Teleporting objects.
* Blocking transition.
* Motion corrupts hierarchy.

## 7. User control and recovery, 10

### Full score

* Cancel, undo, retry accordingly.
* Error preserve work.
* Destructive consequences are clear.
* Timeouts controllable.

### Critical

Error causes work to be lost without warning or recovery.

## 8. Latency and performance, 8

### Full score

* Acknowledge nhanh.
* Slow state is designed.
* Duplicate action safe.
* Out-of-order safe.
* Performance does not block input.

## 9. System consistency and handoff, 7

### Full score

* Pattern/tokens reuse.
* State names canonical.
* Storybook behavior coverage.
* Acceptance tests implementation-ready.
* Exceptions have rationale.

## 10. Ethics and attention, 5

### Full score

* No dark pattern.
* No fake urgency.
* Motion is not forced.
* Sensitive content does not accidentally reveal.
* User autonomy preserved.

## 11. Severity

### Blocker

May cause harm, data loss, critical misinterpretation or task impossible.

### Critical

High-impact failure or wrong state truth.

### Major

Task can still be done but has significant friction, accessibility or error risk.

### Minor

Polish, consistency or low-impact issue.

## 12. Finding format

```text
ID
Severity
Pattern/component
Context
Observed behavior
Principle violated
User impact
Evidence
Recommended behavior
State/transition change
Modality implications
Acceptance criterion
Confidence
Owner
```

## 13. Score bands

| Score | Meaning |
|---:|---|
| 95–100 | Exceptional, deeply coherent |
| 90–94 | Production-ready, minor refinement |
| 85–89 | Strong, resolve remaining major issues |
| 75–84 | Usable but inconsistent or risky |
| 60–74 | Significant interaction problems |
| Under 60 | Redesign state model and primary behavior |

## 14. Ship gate

PASS only if:

* Score ≥ 85.
* Blocker = 0.
* Critical = 0.
* No hover-only R2–R4.
* No pending-as-confirmed.
* Keyboard/touch/reduced-motion paths pass.
* Error recovery exists.
* Animation nonblocking.

## 15. Audit order

Does not start with duration or easing.

```text
Outcome
→ state truth
→ discoverability
→ feedback
→ modality
→ recovery
→ motion
→ system consistency
→ polish
```


---

# Reference: 15-kura-high-risk-overlay

Embedded from `15-kura-high-risk-overlay.md`.

# Kura and High-Risk Product Overlay

## 1. Why does Kura need its own overlay?

Kura handles clinical, patient, laboratory, medication, scheduling, billing and operational state. A wrong microinteraction can not only cause discomfort but also create misunderstandings about care, sample, order, prescription or result.

Use universal principles, then increase safeguards according to risk.

## 2. Status must not be ambiguous

Clearly distinguish:

```text
created
saved
submitted
sent
delivered
received
reviewed
acknowledged
approved
placed
collected
labelled
processed
resulted
confirmed
cancelled
```

Do not use a common checkmark for all states.

For example:

```text
Lab order drafted
≠ Lab order placed
≠ Samples collected
≠ Results available
≠ Results reviewed
```

## 3. Hover in Kura

Hover reveal is suitable for:

* Secondary actions in staff tables.
* Quick metadata preview is not sensitive.
* Row selection affordance.
* Noncritical help.
* Drag handles for configurable admin lists.

Hover cannot be the sole path for:

* Critical result.
* Allergy or drug interaction.
* Patient identity.
* Consent.
* Order placement.
* Sample confirmation.
* Prescription issue.
* Payment commitment.
* Error recovery.

## 4. Sensitive information

Unable to reveal PHI or confidential notes due to accidental pointer pass.

Use explicit action for:

* Full patient identifiers.
* Private contact data.
* Confidential clinical note.
* Insurance number.
* Payment details.
* Authentication secret.

On shared screen, consider masking, click-to-reveal, timeout and audit.

## 5. Authoritative truth

Each clinical state must have a source:

* Server record.
* Laboratory system.
* Clinician sign-off.
* Device result.
* Pharmacy confirmation.
* Payment processor.

UI is not optimistic-final with R4 action.

## 6. Pending states

Use explicit language and visual distinction:

```text
Saving…
Pending confirmation
Waiting for lab
Awaiting clinician review
Sync failed
```

Don't let pending look like success.

## 7. Critical alerts

Critical alert must:

* Persistent.
* Specific.
* Linked to patient/object.
* Explain required action.
* Not depend on color or motion.
* Not auto-dismiss.
* Have acknowledgement semantics distinct from resolution.
* Be auditable.

Animation only supports locate, not theatrical alerts.

## 8. Order and sample flow

### Order

```text
select tests
→ validate prerequisites
→ review
→ place pending
→ server confirmed placed
```

### Sample

```text
identify patient
→ identify order
→ identify tube
→ validate uniqueness
→ collect
→ label
→ confirm association
```

Do not use motion or success state to bypass identity checks.

Duplicate label or invalid sample mapping needs hard constraints and clear recovery.

## 9. Medication and prescriptions

* Drug interaction alert is not hover-only.
* Severity persistent.
* Dismiss/override requires reason when required by policy.
* Override acknowledgment does not mean interaction resolved.
* Prescription “created” is different from “issued” and “dispensed”.
* Autosave draft is not displayed as signed prescription.

## 10. Result review

* Result available other reviewed.
* Abnormal other critical.
* Trend animation cannot mask numeric value.
* Hover chart tooltip is supplemental; critical threshold visible.
* Source, time and freshness accessible.
* Review action server-confirmed and auditable.

## 11. Patient identity

Critical workflows need a persistent identity at the point of action.

Do not hide identity in hover card. Do not allow row hover to make adjacent patient actions easily confused. Use spacing, selection state and scope confirmation.

## 12. Destructive clinical actions

Cancel order, void result, discontinue medication or delete record requires:

* Object/scope.
* Consequence.
* Permission.
* Reason if policy needs it.
* Confirmation or staged review.
* Server-confirmed result.
* Audit.
* Recovery path if available.

## 13. Concurrency

Clinical records can be edited by multiple people.

* Version/freshness.
* Conflict warning.
* Preserve local work.
* Compare changes.
* No silent overwrite.
* Audit resolution.

## 14. Offline

* Distinguish local draft and synced record.
* Do not show clinical order as placed offline unless queue semantics are explicit and safe.
* Pending queue visible.
* Reconnect failure clear.
* Critical action may require online guard.

## 15. Motion tone for Kura

Kura motion should:

```text
calm
precise
restrained
fast to scan
nonblocking
low displacement
minimal overshoot
```

Avoid:

* Bounce on clinical confirmation.
* Celebration on diagnosis/result.
* Full-screen zoom.
* Long cinematic transitions.
* Pulsing badges except true critical signaling with alternatives.

## 16. Audit and evidence

R3–R4 requires:

* Domain review.
* Interaction test.
* Failure test.
* Accessibility test.
* Audit event semantics.
* Authoritative state mapping.
* Clear owner.

## 17. Kura ship gate

Do not ship when:

* Patient identity may disappear from view at commit.
* Pending looks like confirmed.
* Critical alert dismissible without recording.
* Hover/touch parity missing in operational table.
* Sensitive data accidental reveal.
* Autosave status stale.
* Conflict overwrite local/remote data.
* Result review state is not auditable.
* Motion hindered repeated clinical task.


---

# Reference: 16-source-map

Embedded from `16-source-map.md`.

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


---

# Template: audit-scores.example

Embedded from `audit-scores.example.json`.

```json
{
  "outcome_mental_model": 13,
  "discoverability_affordance": 12,
  "state_feedback": 14,
  "modality_accessibility": 13,
  "causality_continuity_motion": 9,
  "control_recovery": 9,
  "latency_performance": 7,
  "system_consistency": 6,
  "ethics_attention": 5,
  "blockers": 0,
  "critical": 0,
  "notes": "Example only. Replace with evidence-based scores."
}
```


---

# Template: decision-log

Embedded from `decision-log.md`.

# Interaction Decision Log

| Field | Value |
|---|---|
| Decision ID |  |
| Date |  |
| Owner |  |
| Status | proposed / accepted / superseded / rejected |
| Scope |  |

## Decision

```text

```

## Problem diagnosed

```text

```

## Context and constraints

```text

```

## Alternatives considered

| Alternative | Benefits | Costs | Risks | Evidence |
|---|---|---|---|---|
|  |  |  |  |  |

## Chosen policy

```text

```

## Consequences

```text
Positive:
Negative:
New constraints:
Migration implications:
```

## Validation

```text
Hypothesis:
Metric:
Test method:
Success threshold:
Review date:
```

## Reversal condition

```text
We will revisit or reverse this decision when:
```


---

# Template: hover-reveal-spec

Embedded from `hover-reveal-spec.md`.

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


---

# Template: interaction-audit

Embedded from `interaction-audit.md`.

# Interaction Audit

## Scope

```text
Product area:
Flow or component:
Platforms:
Auditor:
Date:
Evidence reviewed:
```

## Scoring

| Category | Weight | Score | Evidence |
|---|---:|---:|---|
| Outcome and mental model | 15 |  |  |
| Discoverability and affordance | 15 |  |  |
| State and feedback | 15 |  |  |
| Modality and accessibility | 15 |  |  |
| Causality, continuity and motion | 10 |  |  |
| Control, error and recovery | 10 |  |  |
| Latency and performance | 8 |  |  |
| System consistency | 7 |  |  |
| Ethics and attention | 5 |  |  |
| Total | 100 |  |  |

## Findings

Each finding must have:

```text
ID:
Severity:
Principle:
Observed behavior:
Evidence:
User impact:
System risk:
Recommended fix:
Acceptance criterion:
Confidence:
Owner:
```

Severity:

```text
Blocker
Critical
Major
Moderate
Minor
Opportunity
```

## Mandatory checks

```text
[ ] Primary actions remain visible or explicitly discoverable.
[ ] Hover-only behavior has keyboard and touch parity.
[ ] State names match system truth.
[ ] Pending is distinct from complete.
[ ] Feedback is local, timely and proportional.
[ ] Focus remains visible and logical.
[ ] Escape, cancel, undo and retry work where appropriate.
[ ] User data survives recoverable failures.
[ ] Motion has purpose and does not block.
[ ] Reduced motion preserves meaning.
[ ] Long operations expose progress or background behavior.
[ ] Repeated input does not create duplicates.
[ ] Sensitive information is not accidentally revealed.
[ ] Critical outcomes have persistent evidence.
```

## Ship decision

```text
Score:
Blockers:
Critical findings:
Decision: PASS / CONDITIONAL / FAIL
Conditions:
Re-test date:
```


---

# Template: interaction-brief

Embedded from `interaction-brief.md`.

# Interaction Design Brief

Use this template before selecting components, gestures, transitions or animations.

## 1. Background

```text
Product / domain:
Surface:
Feature / workflow:
Owner:
Reviewers:
Date:
Status:
```

## 2. Users and circumstances

```text
Primary actor:
Secondary actors:
Expertise level:
Frequency of use:
Device and input conditions:
Environmental conditions:
Possible interruptions:
Accessibility needs:
```

## 3. Outcome to achieve

```text
Current state:
Desired state:
User goal:
Business or operational goal:
Evidence of completion:
What the user should know next:
```

Write an outcome without using the component name.

Do not write:

```text
Open a modal and click Save.
```

Write:

```text
The clinician can verify the intended change, commit it once, and know whether the system accepted it.
```

## 4. Diagnosis

```text
Observed problem:
Root cause hypothesis:
What is currently confusing:
What users must remember:
What is hidden:
What appears actionable but is not:
What changes without sufficient feedback:
What can fail:
```

## 5. Risk tier

Select one:

```text
R0 Cosmetic
R1 Reversible and low consequence
R2 Meaningful state or workflow change
R3 High consequence, regulated, financial, private, or clinical
R4 Safety critical or irreversible
```

Rationale:

```text
Risk tier:
Potential harm:
Probability:
Reversibility:
Required evidence or review:
```

## 6. Object model

| Object | User meaning | System source of truth | Ownership | Persistence |
|---|---|---|---|---|
|  |  |  |  |  |

## 7. State inventory

| State | Meaning | Entry condition | Visible evidence | Available actions | Exit condition |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Includes at least:

```text
default
hover or pointer proximity when applicable
focus-visible
pressed
selected
expanded or collapsed
editing
validating
pending
success
warning
error
disabled
read-only
offline
stale
conflict
```

## 8. Event inventory

| Event | Source | Intent inferred | Ambiguity | Debounce or threshold | Can repeat? |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 9. Constraints and guards

| Guard | Why it exists | User-visible explanation | Failure behavior |
|---|---|---|---|
|  |  |  |  |

## 10. Primary interaction

```text
Primary action:
Primary signifier:
Primary input path:
Expected immediate feedback:
Committed result:
Recovery path:
```

## 11. Secondary and advanced interactions

| Interaction | Priority | Why not primary | Discoverability method | Explicit alternative |
|---|---|---|---|---|
|  |  |  |  |  |

## 12. Disclosure strategy

```text
Always visible:
Revealed by context:
Revealed on explicit request:
Revealed after commitment:
Never hidden:
Hidden by role or permission:
```

## 13. Input modality map

| Intent | Pointer | Keyboard | Touch | Screen reader | Voice or switch |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 14. Feedback contract

```text
Acknowledgment:
Progress:
Outcome:
Persistence:
Next step:
Announcement:
```

## 15. Motion purpose

Only fill in when motion has meaning.

```text
Purpose category:
Meaning conveyed:
Start state:
End state:
Duration range:
Easing intent:
Interruption policy:
Reduced-motion behavior:
Failure without motion:
```

Purpose category should belong to one of the following groups:

```text
orientation
continuity
causality
feedback
attention
demonstration
brand expression
```

## 16. Latency model

| Time band | Expected system behavior | User-visible behavior |
|---|---|---|
| Immediate | Local acknowledgment |  |
| Short | Result may arrive quickly |  |
| Noticeable | Waiting becomes conscious |  |
| Long | Task should be cancellable or backgrounded |  |
| Unknown | Duration cannot be predicted |  |

## 17. Error and recovery model

| Failure | Detection | Message | Data retained | Recovery | Escalation |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 18. Success metrics

```text
Task success:
Time on task:
First-attempt success:
Discoverability:
Error rate:
Recovery rate:
Abandonment:
Comprehension:
Accessibility completion:
Perceived control:
```

## 19. Assumptions

| Assumption | Confidence | Evidence needed | Validation method |
|---|---:|---|---|
|  |  |  |  |

## 20. Ship gate

Do not ship when:

* Primary action depends on hover or hidden gestures.
* System truth and visual state are inconsistent.
* Keyboard, touch or assistive-technology path missing.
* Motion blocks operations or has no reduced-motion behavior.
* Failure causes data loss or no recovery.
* R3 or R4 lacks safeguards and confirmation evidence.


---

# Template: microinteraction-spec

Embedded from `microinteraction-spec.md`.

# Microinteraction Specification

A microinteraction is a complete cycle of triggers, rules, feedback, loops and modes. Use this template to turn small ideas into behaviors that can be deployed and tested.

## Metadata

```text
Name:
Pattern family:
Component or flow:
Owner:
Version:
Status:
Risk tier:
```

## 1. Job

```text
When [situation],
I want to [intent],
so that [outcome].
```

## 2. Why this interaction exists

```text
User problem:
System problem:
Why static UI is insufficient:
Why this is a microinteraction rather than a separate flow:
```

## 3. Trigger

| Trigger | Source | Preconditions | Intent confidence | Alternative trigger |
|---|---|---|---:|---|
|  |  |  |  |  |

Distinguish:

```text
explicit trigger
implicit contextual trigger
system trigger
time trigger
data trigger
```

## 4. Rules

| Rule | Condition | Behavior | Priority | User-visible rationale |
|---|---|---|---:|---|
|  |  |  |  |  |

## 5. State model

```text
Initial state:
Transient states:
Committed states:
Failure states:
Terminal state:
Restorable state:
```

### State transition table

| Current state | Event | Guard | Next state | Side effect | Feedback | Focus / announcement |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 6. Anatomy

| Part | Purpose | Always visible? | Interactive? | Accessible name |
|---|---|---:|---:|---|
|  |  |  |  |  |

## 7. Feedback loop

```text
Acknowledgment within:
Progress signal:
Completion signal:
Failure signal:
Persistent evidence:
Next available action:
```

Feedback must answer:

```text
Did the system receive my action?
Is it working?
What changed?
Was the change committed?
Can I undo or recover?
```

## 8. Motion contract

```text
Purpose:
Property changes:
Origin:
Destination:
Duration token:
Easing token:
Delay token:
Stagger:
Interruption behavior:
Rapid-repeat behavior:
Reversal behavior:
Reduced-motion mapping:
```

Motion cannot be the only condition for understanding state.

## 9. Modality behavior

### Pointer

```text
Hover behavior:
Pointer-down behavior:
Pointer-up behavior:
Pointer-leave behavior:
Fine/coarse pointer adaptation:
```

### Keyboard

```text
Tab stop:
Enter behavior:
Space behavior:
Arrow-key behavior:
Escape behavior:
Focus return:
```

### Touch

```text
Tap behavior:
Long-press behavior:
Swipe or drag behavior:
Explicit alternative to hover:
Target size and spacing:
```

### Assistive technology

```text
Role:
Name:
State/property:
Live announcement:
Reading order:
Virtual-cursor behavior:
```

## 10. Content contract

| Slot | Purpose | Constraints | Empty behavior | Localization risk |
|---|---|---|---|---|
|  |  |  |  |  |

## 11. Async and latency

```text
Local acknowledgment:
Server request begins:
Duplicate request prevention:
Timeout:
Retry:
Offline behavior:
Out-of-order response handling:
Idempotency expectation:
```

## 12. Error and recovery

| Failure | Prevention | Detection | User message | Retained data | Recovery |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 13. Analytics

```text
Exposure event:
Discovery event:
Activation event:
Completion event:
Error event:
Undo event:
Recovery event:
Abandonment event:
```

Do not write sensitive data to analytics payload.

## 14. Acceptance tests

### Functional

```text
Given ...
When ...
Then ...
```

### State truth

```text
Given the server has not confirmed the change
When local feedback is shown
Then the interface communicates pending, not completed
```

### Keyboard

```text
Given the control is reached by keyboard
When focus is visible
Then all essential actions are available without hover
```

### Touch

```text
Given the device has no hover capability
When the user taps the explicit control
Then the same secondary content becomes available
```

### Reduced motion

```text
Given reduced motion is enabled
When the transition occurs
Then spatial travel is removed or minimized while state meaning remains clear
```

### Interruption

```text
Given an animation is in progress
When the opposite action is triggered
Then the transition reverses or resolves from the current rendered state without waiting
```

### Failure

```text
Given the request fails
When the error is presented
Then user input is retained and a concrete recovery action is available
```

## 15. Do and do not

### Do

```text

```

### Do not

```text

```


---

# Template: motion-tokens

Embedded from `motion-tokens.json`.

```json
{
  "$schema": "./motion-tokens.schema.json",
  "meta": {
    "name": "Kura Interaction Motion Tokens",
    "version": "1.0.0",
    "principle": "Motion explains state change, preserves causality, and never blocks the user.",
    "units": {
      "duration": "ms",
      "distance": "px"
    }
  },
  "primitive": {
    "duration": {
      "instant": 0,
      "acknowledge": 80,
      "micro": 140,
      "standard": 220,
      "context": 320,
      "emphasis": 480
    },
    "delay": {
      "none": 0,
      "hoverIntent": 100,
      "hoverExitGrace": 180,
      "tooltip": 400,
      "stagger": 30
    },
    "easing": {
      "enter": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "exit": "cubic-bezier(0.4, 0, 1, 1)",
      "standard": "cubic-bezier(0.2, 0, 0, 1)",
      "emphasis": "cubic-bezier(0.2, 1.4, 0.4, 1)",
      "linear": "linear"
    },
    "distance": {
      "none": 0,
      "micro": 2,
      "small": 4,
      "medium": 8,
      "large": 16
    },
    "opacity": {
      "hidden": 0,
      "muted": 0.64,
      "visible": 1
    },
    "scale": {
      "pressed": 0.98,
      "rest": 1,
      "emphasis": 1.02
    }
  },
  "semantic": {
    "acknowledge": {
      "duration": "{primitive.duration.acknowledge}",
      "easing": "{primitive.easing.standard}",
      "distance": "{primitive.distance.micro}"
    },
    "reveal": {
      "duration": "{primitive.duration.micro}",
      "delay": "{primitive.delay.none}",
      "easing": "{primitive.easing.enter}",
      "distance": "{primitive.distance.small}"
    },
    "dismiss": {
      "duration": "{primitive.duration.micro}",
      "delay": "{primitive.delay.none}",
      "easing": "{primitive.easing.exit}",
      "distance": "{primitive.distance.small}"
    },
    "stateChange": {
      "duration": "{primitive.duration.standard}",
      "easing": "{primitive.easing.standard}",
      "distance": "{primitive.distance.medium}"
    },
    "contextChange": {
      "duration": "{primitive.duration.context}",
      "easing": "{primitive.easing.standard}",
      "distance": "{primitive.distance.large}"
    },
    "attention": {
      "duration": "{primitive.duration.emphasis}",
      "easing": "{primitive.easing.emphasis}",
      "scale": "{primitive.scale.emphasis}",
      "repeatLimit": 1
    },
    "progress": {
      "duration": "context-dependent",
      "easing": "{primitive.easing.linear}",
      "repeatLimit": 0
    }
  },
  "component": {
    "rowActions": {
      "enterDuration": "{primitive.duration.micro}",
      "exitDuration": "{primitive.duration.micro}",
      "intentDelay": "{primitive.delay.hoverIntent}",
      "exitGrace": "{primitive.delay.hoverExitGrace}",
      "easingEnter": "{primitive.easing.enter}",
      "easingExit": "{primitive.easing.exit}",
      "distance": "{primitive.distance.small}"
    },
    "tooltip": {
      "enterDuration": "{primitive.duration.micro}",
      "exitDuration": "{primitive.duration.micro}",
      "intentDelay": "{primitive.delay.tooltip}",
      "exitGrace": "{primitive.delay.hoverExitGrace}",
      "easingEnter": "{primitive.easing.enter}",
      "easingExit": "{primitive.easing.exit}"
    },
    "popover": {
      "enterDuration": "{primitive.duration.standard}",
      "exitDuration": "{primitive.duration.micro}",
      "easingEnter": "{primitive.easing.enter}",
      "easingExit": "{primitive.easing.exit}",
      "distance": "{primitive.distance.medium}"
    },
    "accordion": {
      "duration": "{primitive.duration.standard}",
      "easing": "{primitive.easing.standard}",
      "interruptible": true
    },
    "drawer": {
      "duration": "{primitive.duration.context}",
      "easingEnter": "{primitive.easing.enter}",
      "easingExit": "{primitive.easing.exit}",
      "interruptible": true
    },
    "toast": {
      "enterDuration": "{primitive.duration.standard}",
      "exitDuration": "{primitive.duration.micro}",
      "easingEnter": "{primitive.easing.enter}",
      "easingExit": "{primitive.easing.exit}",
      "minimumReadableDuration": 5000
    }
  },
  "reducedMotion": {
    "removeLargeSpatialMotion": true,
    "removeParallax": true,
    "removeDecorativeLoops": true,
    "preserveStateChange": true,
    "preferredDuration": "{primitive.duration.instant}",
    "allowedProperties": [
      "opacity",
      "color",
      "visibility"
    ]
  },
  "policies": {
    "blockInputDuringAnimation": false,
    "animateFromCurrentRenderedState": true,
    "allowUserInterruption": true,
    "maximumAttentionRepeats": 1,
    "hoverIsEnhancementOnly": true,
    "criticalMeaningRequiresNonMotionCue": true
  }
}
```


---

# Template: motion-tokens.schema

Embedded from `motion-tokens.schema.json`.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://kura.example/schemas/motion-tokens.schema.json",
  "title": "Kura Interaction Motion Tokens",
  "type": "object",
  "required": [
    "meta",
    "primitive",
    "semantic",
    "component",
    "reducedMotion",
    "policies"
  ],
  "properties": {
    "$schema": {
      "type": "string",
      "minLength": 1
    },
    "meta": {
      "type": "object",
      "required": [
        "name",
        "version",
        "principle",
        "units"
      ],
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "version": {
          "type": "string",
          "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$"
        },
        "principle": {
          "type": "string",
          "minLength": 1
        },
        "units": {
          "type": "object",
          "required": [
            "duration",
            "distance"
          ],
          "properties": {
            "duration": {
              "const": "ms"
            },
            "distance": {
              "const": "px"
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    },
    "primitive": {
      "type": "object",
      "required": [
        "duration",
        "delay",
        "easing",
        "distance",
        "opacity",
        "scale"
      ],
      "properties": {
        "duration": {
          "$ref": "#/$defs/nonNegativeNumberMap"
        },
        "delay": {
          "$ref": "#/$defs/nonNegativeNumberMap"
        },
        "easing": {
          "$ref": "#/$defs/stringMap"
        },
        "distance": {
          "$ref": "#/$defs/nonNegativeNumberMap"
        },
        "opacity": {
          "$ref": "#/$defs/unitIntervalMap"
        },
        "scale": {
          "$ref": "#/$defs/nonNegativeNumberMap"
        }
      },
      "additionalProperties": false
    },
    "semantic": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": {
        "$ref": "#/$defs/tokenRecord"
      }
    },
    "component": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": {
        "$ref": "#/$defs/tokenRecord"
      }
    },
    "reducedMotion": {
      "type": "object",
      "required": [
        "removeLargeSpatialMotion",
        "removeParallax",
        "removeDecorativeLoops",
        "preserveStateChange",
        "preferredDuration",
        "allowedProperties"
      ],
      "properties": {
        "removeLargeSpatialMotion": {
          "type": "boolean"
        },
        "removeParallax": {
          "type": "boolean"
        },
        "removeDecorativeLoops": {
          "type": "boolean"
        },
        "preserveStateChange": {
          "type": "boolean"
        },
        "preferredDuration": {
          "$ref": "#/$defs/tokenOrValue"
        },
        "allowedProperties": {
          "type": "array",
          "minItems": 1,
          "uniqueItems": true,
          "items": {
            "type": "string"
          }
        }
      },
      "additionalProperties": false
    },
    "policies": {
      "type": "object",
      "required": [
        "blockInputDuringAnimation",
        "animateFromCurrentRenderedState",
        "allowUserInterruption",
        "maximumAttentionRepeats",
        "hoverIsEnhancementOnly",
        "criticalMeaningRequiresNonMotionCue"
      ],
      "properties": {
        "blockInputDuringAnimation": {
          "const": false
        },
        "animateFromCurrentRenderedState": {
          "const": true
        },
        "allowUserInterruption": {
          "const": true
        },
        "maximumAttentionRepeats": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1
        },
        "hoverIsEnhancementOnly": {
          "const": true
        },
        "criticalMeaningRequiresNonMotionCue": {
          "const": true
        }
      },
      "additionalProperties": false
    }
  },
  "$defs": {
    "nonNegativeNumberMap": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": {
        "type": "number",
        "minimum": 0
      }
    },
    "unitIntervalMap": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": {
        "type": "number",
        "minimum": 0,
        "maximum": 1
      }
    },
    "stringMap": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": {
        "type": "string",
        "minLength": 1
      }
    },
    "tokenOrValue": {
      "oneOf": [
        {
          "type": "number",
          "minimum": 0
        },
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "boolean"
        }
      ]
    },
    "tokenRecord": {
      "type": "object",
      "minProperties": 1,
      "additionalProperties": {
        "oneOf": [
          {
            "$ref": "#/$defs/tokenOrValue"
          },
          {
            "type": "array",
            "items": {
              "$ref": "#/$defs/tokenOrValue"
            }
          }
        ]
      }
    }
  },
  "additionalProperties": false
}
```


---

# Template: qa-checklist

Embedded from `qa-checklist.md`.

# Interaction QA Checklist

## State

```text
[ ] Every documented state can be reached.
[ ] No undocumented state appears.
[ ] Visual state matches remote and local truth.
[ ] Pending, success, error, stale and conflict are distinguishable.
[ ] Disabled state has a valid reason and alternative when needed.
```

## Pointer and hover

```text
[ ] Hover is not required for primary completion.
[ ] Fast pointer transit does not trigger accidental reveal.
[ ] Exit grace prevents flicker without trapping the reveal.
[ ] Pointer can move into revealed content without closure.
[ ] Overlays handle viewport collision and clipping.
```

## Keyboard

```text
[ ] Focus indicator is always visible.
[ ] Tab order follows task order.
[ ] Enter and Space follow platform expectations.
[ ] Escape dismisses temporary layers.
[ ] Focus returns to a valid logical origin.
[ ] Arrow keys work only where the component pattern expects them.
```

## Touch

```text
[ ] Every hover behavior has an explicit touch path.
[ ] Targets are large and separated enough for intended context.
[ ] Long press and swipe are shortcuts, not sole access paths.
[ ] Scroll and gesture recognition do not fight each other.
[ ] Accidental edge or palm input is handled.
```

## Screen reader

```text
[ ] Role, name, state and value are correct.
[ ] Dynamic state changes are announced only when useful.
[ ] Live regions do not repeat or flood announcements.
[ ] Hidden content is actually hidden from the accessibility tree when appropriate.
[ ] Visual and reading order are coherent.
```

## Motion

```text
[ ] Every animation has a stated purpose.
[ ] No animation forces unnecessary waiting.
[ ] Reversal starts from the current rendered state.
[ ] Rapid repeated actions remain stable.
[ ] Layout does not jump unexpectedly.
[ ] Reduced motion removes risky spatial movement while preserving state meaning.
[ ] Auto-moving content can pause, stop or is avoided.
```

## Async and latency

```text
[ ] Input is acknowledged immediately.
[ ] Duplicate submission is prevented.
[ ] Slow states are testable.
[ ] Timeout and retry are clear.
[ ] Offline behavior is defined.
[ ] Stale or out-of-order responses cannot overwrite newer truth.
[ ] Long work can be cancelled or backgrounded where feasible.
```

## Error and recovery

```text
[ ] Errors identify what happened.
[ ] Errors identify what was not completed.
[ ] User input is retained.
[ ] Recovery action is concrete.
[ ] Undo accurately restores state.
[ ] Destructive actions communicate object and scope.
```

## Kura high-risk checks

```text
[ ] PHI is not exposed through accidental hover.
[ ] Clinical status is not inferred from color or animation alone.
[ ] Draft, pending, placed, collected, reviewed and acknowledged remain distinct.
[ ] High-risk actions require current permission and current data.
[ ] Audit evidence survives toast dismissal.
[ ] Optimistic UI is not used as false clinical confirmation.
```


---

# Template: state-transition-matrix

Embedded from `state-transition-matrix.md`.

# State Transition Matrix

Use this matrix when the interaction has three or more states, has async behavior, has guards, or there is a risk of misunderstanding.

## 1. State definitions

| State ID | User-facing meaning | System truth | Persistent? | Editable? | Terminal? |
|---|---|---|---:|---:|---:|
| S0 |  |  |  |  |  |

## 2. Event definitions

| Event ID | Event | Source | Payload | Can repeat? | Can arrive late? |
|---|---|---|---|---:|---:|
| E0 |  |  |  |  |  |

## 3. Guard definitions

| Guard ID | Boolean condition | Source of truth | Failure explanation |
|---|---|---|---|
| G0 |  |  |  |

## 4. Transition matrix

| From | Event | Guard | To | Mutation | Immediate feedback | Async feedback | Focus / announcement | Undo / recovery |
|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |

## 5. Illegal transitions

| From | Event | Why illegal | Prevention | User-visible result |
|---|---|---|---|---|
|  |  |  |  |  |

## 6. Concurrent events

| Event A | Event B | Resolution policy | Priority | User-visible behavior |
|---|---|---|---|---|
|  |  |  |  |  |

Resolution policies may include:

```text
first wins
last wins
queue
merge
cancel previous
reject duplicate
require conflict resolution
```

## 7. Network and persistence states

| Local state | Remote state | Displayed state | Allowed actions | Reconciliation |
|---|---|---|---|---|
|  |  |  |  |  |

## 8. Focus state transitions

| Transition | Focus before | Focus during | Focus after | Screen reader announcement |
|---|---|---|---|---|
|  |  |  |  |  |

## 9. Motion mapping

| Transition | Purpose | Motion token | Interruptible? | Reduced-motion behavior |
|---|---|---|---:|---|
|  |  |  |  |  |

## 10. Invariants

Clauses that must always be true:

```text
A pending state is never presented as completed.
Only one item can own keyboard focus at a time.
A committed destructive action has persistent evidence.
Closing an overlay restores focus to a valid origin or next logical target.
User-entered data survives recoverable errors.
```

Add invariant of interaction:

```text

```

## 11. Test sequence

Minimum testing:

```text
happy path
reverse path
rapid repeated input
input during transition
network delay
network failure
offline then reconnect
stale response
permission change
session expiry
keyboard-only
screen-reader path
reduced motion
zoom and reflow
```


---

# Template: storybook-interaction-contract

Embedded from `storybook-interaction-contract.md`.

# Storybook Interaction Contract

Use this contract for components with reusable behavior. One visual story is not enough. Component must demonstrate state, event, modality, failure and recovery.

## 1. Identity

```text
Component:
Pattern family:
Purpose:
Owner:
Version:
Stability:
Risk ceiling:
```

## 2. Anatomy

| Slot / part | Required | Purpose | Interactive | Content constraints |
|---|---:|---|---:|---|
|  |  |  |  |  |

## 3. Public API

| Prop / event | Type | Default | Meaning | Invalid combinations |
|---|---|---|---|---|
|  |  |  |  |  |

APIs must express meaning, not just visual implementation.

Not preferred:

```text
showBlueGlow
moveUpFourPixels
useFancyAnimation
```

Priority:

```text
intent="destructive"
state="pending"
reveal="contextual"
emphasis="primary"
```

## 4. State stories

Stories are required for:

```text
default
hover when applicable
focus-visible
pressed
selected
expanded
loading
success
warning
error
disabled
read-only
long content
localized content
high zoom
reduced motion
```

## 5. Transition stories

| Story | Start state | Event | End state | Expected feedback |
|---|---|---|---|---|
|  |  |  |  |  |

## 6. Interaction tests

```text
Pointer test:
Keyboard test:
Touch simulation:
Screen reader semantics:
Escape and dismissal:
Focus restoration:
Rapid repeated input:
Interrupted transition:
Reduced motion:
```

## 7. Async stories

```text
Fast success
Slow success
Failure
Timeout
Retry
Offline
Stale response
Duplicate submission
```

## 8. Content stories

```text
Empty
Minimum length
Maximum expected length
Unbroken string
Extended Latin characters
English expansion
Number and date localization
Sensitive content
```

## 9. Motion contract

| Transition | Purpose | Duration token | Easing token | Distance token | Reduced motion |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 10. Accessibility contract

```text
Role:
Name source:
State properties:
Keyboard model:
Focus model:
Announcement model:
Target geometry:
Contrast requirements:
Motion requirements:
```

## 11. Do and do not

### Do

```text

```

### Do not

```text

```

## 12. Adoption guidance

```text
Use when:
Do not use when:
Use instead:
Known limitations:
Migration notes:
```

## 13. Acceptance gate

Do not mark stable when:

* Story only illustrates happy path.
* Primary behavior cannot be used with keyboard or touch.
* Async state does not reflect system truth.
* Transition is not interruptible as the user can change their mind.
* Reduced-motion story is missing.
* Focus return or announcement is unknown.
* API allows conflicting state.


---

# Example: 01-hover-reveal-table-row

Embedded from `01-hover-reveal-table-row.md`.

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


---

# Example: 02-hover-preview-card

Embedded from `02-hover-preview-card.md`.

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


---

# Example: 03-inline-edit-and-autosave

Embedded from `03-inline-edit-and-autosave.md`.

# Example 03: Inline Edit with Autosave

## Scenario

The user edits a field right in the detail view. The system saves automatically to reduce steps, but local edit, pending save and committed save must be clearly distinguished.

## State truth

```text
viewing
editingClean
editingDirty
validating
saving
saved
saveFailed
conflict
```

Do not use a single check icon for both `valid local value` and `saved remotely`.

## Transition table

| From | Event | To | Feedback |
|---|---|---|---|
| viewing | Edit | editingClean | Field becomes editable, focus moves to input |
| editingClean | Type | editingDirty | Dirty indicator appears subtly |
| editingDirty | Pause or blur | validating | Local validation begins |
| validating | Valid | saving | “Saving…” appears locally |
| saving | Server confirms | saved | “Saved” with persistent timestamp when relevant |
| saving | Server rejects | saveFailed | Error and Retry, input retained |
| saving | Newer remote version | conflict | Show comparison and resolution choices |
| editingDirty | Escape | viewing | Revert local draft after appropriate confirmation policy |

## Debounce policy

```text
Debounce network save, not local input.
Do not delay visible typing feedback.
Do not send one request per keystroke.
Cancel or supersede older pending requests.
Ignore stale responses using request version or mutation ID.
```

## Feedback placement

Save feedback is attached to the field or edit region, not only in a global toast.

```text
Dirty: subtle dot or “Unsaved changes”
Saving: inline progress text
Saved: short confirmation with optional timestamp
Failed: inline error plus Retry
Conflict: persistent callout with resolution controls
```

## Keyboard behavior

```text
Enter starts editing only when it does not conflict with multiline input.
Escape cancels local edit before commit.
Tab follows form order.
Focus does not jump on save completion.
```

## Motion

```text
Edit affordance reveal may use 140ms contextual motion.
Status text crossfade may use 140ms.
Do not animate the field width while the user is typing.
Do not move focus or scroll on background save completion.
```

## Recovery

```text
Retain input after save failure.
Allow retry without retyping.
Allow copy before conflict resolution.
Do not label local optimistic state as committed.
```

## Acceptance tests

```text
Typing remains responsive during slow network.
Only the newest value can become committed.
A failed save preserves the draft.
A stale success response cannot overwrite a newer edit.
Screen reader users hear failure and committed success without repetitive noise.
The field remains operable with reduced motion.
```


---

# Example: 04-drag-reorder

Embedded from `04-drag-reorder.md`.

# Example 04: Drag to Reorder with Full Modality Parity

## Scenario

User sorts a priority list.

Drag is direct manipulation, but it shouldn't be the only way.

## Object model

```text
Item
Current position
Target position
Ordering rule
Persistence state
```

## Pointer and touch behavior

```text
Press drag handle, not the entire row, when rows contain other controls.
Provide a clear lifted state.
Keep a visible origin placeholder.
Show legal drop positions.
Auto-scroll only near edges and at a controlled speed.
Cancel when released outside legal region or via Escape.
Commit only on valid drop.
```

## Keyboard behavior

Recommended pattern:

```text
1. Focus drag handle.
2. Press Space to pick up.
3. Use Arrow keys to move.
4. Announce the new position after each move.
5. Press Space to drop.
6. Press Escape to cancel and restore original order.
```

Also provide explicit `Move up` and `Move down` commands where simplicity matters more than direct manipulation.

## State model

```text
idle
pickup
moving
validTarget
invalidTarget
dropping
committing
committed
commitFailed
cancelled
```

## Motion

```text
Lift: 140ms scale/elevation cue
Neighbor displacement: 180–220ms from current rendered positions
Drop: 180ms settle
Failure rollback: explain and return clearly, not silently snap
Reduced motion: no lifted travel; use outline, placeholder and text announcement
```

## Feedback

```text
Visual: placeholder and insertion indicator
Haptic: optional light confirmation on valid drop
Auditory: optional platform-consistent cue
Screen reader: “Picked up X, position 2 of 6”; “Moved to position 3”; “Dropped”
Persistent: saved order or pending status
```

## Failure handling

```text
If persistence fails:
  Keep the intended local order visible only if clearly marked pending and retryable.
  Otherwise restore the server order and explain what was not saved.

Never silently lose the user’s ordering effort.
```

## Acceptance tests

```text
The list can be reordered without drag.
Interactive controls inside the row remain operable.
Touch scrolling does not accidentally start a drag.
Keyboard pickup, movement, drop and cancel all work.
Rapid reorder operations do not produce stale final order.
Failure preserves or clearly restores state with recovery.
```


---

# Example: 05-loading-and-progress

Embedded from `05-loading-and-progress.md`.

# Example 05: Loading, Progress and Background Work

## Scenario

An action can complete immediately, take a few seconds, or continue in the background.

## Time model

| Observed duration | Behavior |
|---|---|
| Near immediate | Acknowledge input, then show result without spinner flash |
| Short but noticeable | Show local pending state or skeleton |
| Several seconds | Show progress meaning and preserve control |
| Long or uncertain | Allow cancel, background, notification or safe navigation away |

## State model

```text
idle
acknowledged
queued
processing
partiallyComplete
complete
failed
cancelRequested
cancelled
```

## Avoid

```text
Generic spinner with no object or task context
Progress that resets unexpectedly
Blocking full-screen loader for a local update
Animation that implies progress when no work is occurring
Success shown before server confirmation for high-risk changes
```

## Recommended feedback

```text
Button acknowledges immediately.
Object or region shows pending state.
Progress copy identifies the work.
Known progress uses determinate progress.
Unknown progress uses stage-based status when possible.
User can continue unrelated work.
Completion creates persistent evidence.
Failure identifies retained work and next action.
```

## Motion

Loading motion should communicate liveliness, not hypnotize.

```text
Use contextual skeletons when structure is known.
Avoid large repeated spatial motion.
Do not animate every placeholder independently.
Respect reduced motion.
Pause loops when hidden or offscreen.
```

## Acceptance tests

```text
The action is acknowledged immediately.
A fast response does not flash an unnecessary loader.
A slow response explains what is happening.
Long work can be cancelled or backgrounded where feasible.
Navigating away does not silently destroy the task.
Completion and failure are distinguishable and persistent enough to verify.
```


---

# Example: 06-destructive-action

Embedded from `06-destructive-action.md`.

# Example 06: Destructive Action with Undo and Confirmation

## Scenario

User deleted or destroyed an object.

## Decision policy

Prefer undo when:

```text
The action is reversible.
The affected object and scope are obvious.
The undo window is reliable.
The user does not need to review additional consequences first.
```

Use confirmation when:

```text
The action is irreversible.
The scope is easy to misunderstand.
The action affects multiple people or downstream systems.
The consequences are delayed, legal, financial, clinical or safety relevant.
```

## Bad pattern

```text
Hover row → red trash icon
Single click → object disappears
Toast says “Deleted”
No object name, no scope, no undo, no persistent evidence
```

## Recommended low-risk reversible pattern

```text
More menu → Delete
Object is removed from active view
Inline or toast confirmation names the object
Undo remains available for a reliable window
After the window, final commit occurs
```

## Recommended high-risk pattern

```text
Action opens a confirmation surface
Title names the consequence
Body identifies object and scope
Secondary details explain downstream effects
Primary destructive action is explicit
Cancel is safe and obvious
Commit feedback distinguishes pending from completed
```

## State model

```text
active
confirmationOpen
deleteRequested
pendingDeletion
softDeleted
undoRequested
restored
permanentlyDeleted
deleteFailed
restoreFailed
```

## Motion

```text
Removal motion can preserve continuity by collapsing from the object’s location.
It must not complete visually before high-risk server confirmation unless clearly pending.
Undo restoration starts from the current rendered state.
Reduced motion uses immediate state replacement with persistent message.
```

## Acceptance tests

```text
The destructive action is not accidentally revealed as a primary hover control.
Confirmation names the object and scope when required.
Cancel never performs side effects.
Undo actually restores data and related state.
Pending deletion is not described as complete.
Failure retains or restores the object and provides recovery.
```


---

# Example: 07-kura-clinical-status-and-hover

Embedded from `07-kura-clinical-status-and-hover.md`.

# Example 07: Kura Clinical Status with Contextual Hover Details

## Scenario

A result row needs to display the main state clearly at all times. Hover may provide provenance or audit details, but may not conceal clinical meaning.

## State vocabulary

```text
Result ready
Result reviewed
Result acknowledged
Critical result escalated
Follow-up pending
```

These states are not synonymous.

## Always visible

```text
Test name
Current canonical status
Result date and time
Critical or abnormal indicator using text plus noncolor cue
Primary review action when applicable
```

## Contextual reveal allowed

```text
Reviewer name
Review timestamp
Source laboratory
Version or correction history
Audit reference
Secondary actions such as copy reference ID
```

## Contextual reveal not allowed

```text
Only evidence that a result is critical
Only path to acknowledge or escalate
Patient-identifying information not otherwise authorized
Medication or order consequence
```

## Hover and focus behavior

```text
Pointer hover after intent delay reveals an audit popover.
Keyboard focus exposes an explicit “View audit details” button.
Touch uses the same button and opens a sheet or popover.
The popover does not open from accidental row transit.
The popover never changes the clinical status itself.
```

## State truth contract

```text
“Reviewed” is displayed only after the review event is committed.
“Acknowledged” requires its own committed event.
“Escalated” includes persistent evidence of destination and time.
A toast cannot be the only proof of a high-risk transition.
```

## Sensitive information

```text
Permission is checked at open time, not only at page load.
The popover auto-closes on session lock.
No PHI appears in hover preview if pointer transit can reveal it unintentionally.
Screen recording and shoulder-surfing risk are considered.
```

## Motion

```text
Use a subtle anchored reveal to show source relationship.
No pulsing critical badge.
No looping red animation.
Reduced motion uses instant open and close.
```

## Acceptance tests

```text
Clinical status is understandable without hover, color or animation.
Review and acknowledgement remain distinct.
Touch and keyboard expose audit details explicitly.
Permission changes close or block the detail surface safely.
No late response can apply an action to the wrong result.
High-risk transition evidence remains visible after temporary feedback disappears.
```
