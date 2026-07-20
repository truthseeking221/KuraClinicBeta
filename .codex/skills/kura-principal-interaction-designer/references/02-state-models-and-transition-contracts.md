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
