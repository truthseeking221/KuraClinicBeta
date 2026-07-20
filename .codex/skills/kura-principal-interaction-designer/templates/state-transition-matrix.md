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
