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
