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
