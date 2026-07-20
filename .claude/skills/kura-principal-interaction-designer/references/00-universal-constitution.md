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
