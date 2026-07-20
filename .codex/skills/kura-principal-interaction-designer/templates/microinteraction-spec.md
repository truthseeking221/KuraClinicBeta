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
