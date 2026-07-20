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
