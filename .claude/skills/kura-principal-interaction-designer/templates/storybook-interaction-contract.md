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
