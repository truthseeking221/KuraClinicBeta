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
