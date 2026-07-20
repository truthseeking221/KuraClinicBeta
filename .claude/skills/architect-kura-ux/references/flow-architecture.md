# Flow Architecture

Use this reference for any journey, workflow, service blueprint, state machine, handoff, or closure task.

## Contents

1. Architecture lenses
2. Trigger to closure method
3. Closure chain
4. State model
5. Role and handoff model
6. Information continuity
7. Flow smoothness
8. Exception architecture
9. Screen boundary rules
10. Workflow specification template

## Architecture lenses

Analyze the flow through eight connected lenses:

| Lens | Core question | Required artifact |
| --- | --- | --- |
| Outcome | What must become true outside the interface? | Closure contract |
| Object | What entity changes over time? | Object and source of truth map |
| State | What can the object become? | State transition model |
| Actor | Who acts, decides, owns, receives, and audits? | Role and authority matrix |
| Information | What must remain visible at each decision? | Context continuity map |
| Interaction | What action changes the object or view? | Action and component map |
| System | What happens synchronously, asynchronously, or externally? | Service blueprint |
| Recovery | How can the flow fail, resume, amend, or close safely? | Exception matrix |

Never treat one lens as a substitute for another. A screen map without state and ownership is not a workflow architecture.

## Trigger to closure method

### Establish the trigger

Classify the entry:

* User initiated intent
* Assigned work
* Scheduled event
* New clinical evidence
* System generated exception
* External message or result
* Reopen or amendment

Specify where the user came from, what they already know, what object is in focus, and what changed since their last action.

### Establish closure

Define closure at four levels:

| Level | Question |
| --- | --- |
| Interface | Did the interface accept the action? |
| System | Did the source of truth persist and process it? |
| Human | Did the next responsible person receive and complete their work? |
| Domain | Did the clinical or operational outcome occur and receive required follow up? |

Do not stop at the earliest level when the product promises a later one.

### Map the path

Use one row per meaningful state transition:

| Step | Actor | Intent | Object state before | Required context | Action | System response | Object state after | Next owner | Closure evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Add separate rows for asynchronous acceptance, external failure, human acknowledgement, amendment, and reopen when relevant.

## Closure chain

Use this chain as a diagnostic scaffold, not as a mandatory linear sequence:

1. Recognize need
2. Establish context
3. Decide intent
4. Configure action
5. Validate safety and completeness
6. Authorize or sign
7. Commit and persist
8. Dispatch or assign
9. Accept ownership
10. Schedule or prepare
11. Perform or collect
12. Process
13. Produce evidence or result
14. Review and acknowledge
15. Decide disposition
16. Act and communicate
17. Monitor response
18. Follow up
19. Close
20. Amend, supersede, or reopen when necessary

For each link, ask:

* Does this link exist in the current scope?
* Who owns it?
* What event begins it?
* What proves it ended?
* What can prevent completion?
* What does the previous actor see while waiting?
* What happens after timeout or failure?

## State model

### Separate state dimensions

Avoid one overloaded status. Model dimensions separately when they represent different truths:

* Lifecycle state, such as draft or closed
* Processing state, such as queued or failed
* Fulfillment state, such as scheduled or completed
* Review state, such as unread, acknowledged, or actioned
* Attention state, such as overdue or escalated
* Data quality state, such as partial, stale, or amended
* Permission state, such as editable, locked, or restricted

The UI may summarize these dimensions, but the architecture must not collapse incompatible truths.

### Define every state

| Field | Meaning |
| --- | --- |
| Name | Approved human readable label |
| Meaning | What is true in the real workflow |
| Entry event | What creates the state |
| Owner | Who is responsible now |
| Available actions | What can happen next |
| Exit criteria | What ends the state |
| Timeout | When attention or escalation changes |
| Visibility | Who can see it and where |
| Audit | What event and actor are recorded |
| Recovery | How failure, cancellation, or amendment works |

### Verify transitions

Every transition requires:

* Authorized actor or system
* Preconditions
* User action or system event
* Confirmation pattern proportional to consequence
* Persistence behavior
* Side effects
* Notification or handoff
* Idempotency and duplicate protection
* Audit record
* Recovery after partial failure

## Role and handoff model

### Separate role concepts

* Viewer: may inspect
* Contributor: may add or edit within scope
* Decision maker: may choose a disposition
* Authorizer: may approve, sign, release, or override
* Owner: accountable for the current next action
* Delegate: acts under assigned authority
* Recipient: receives output or responsibility
* Auditor: inspects history without changing the object

Never infer ownership from permission alone.

### Handoff contract

Every handoff must define:

| Element | Required answer |
| --- | --- |
| Sender | Who transfers work or information? |
| Recipient | Which person, role, team, or system receives it? |
| Payload | What exact context is transferred? |
| Acceptance | How does the recipient accept or reject it? |
| Visibility | What does the sender see while waiting? |
| Timing | What deadline, cadence, or expectation applies? |
| Failure | What if delivery, acceptance, or completion fails? |
| Escalation | Who is notified and when? |
| Closure | What proves the handoff obligation is complete? |

Avoid invisible handoffs where one user believes work is complete but no new owner has accepted it.

## Information continuity

At every consequential step, preserve:

* Patient identity and key disambiguators
* Encounter or episode context
* Current object and source
* Current state and last meaningful change
* Relevant evidence and provenance
* Unresolved risk and required action
* Owner and next expected event

When moving between surfaces, specify what persists in the URL, workspace state, object header, navigation trail, and return path. Do not make the user reconstruct context from memory.

## Flow smoothness

A smooth flow reduces uncertainty and avoidable work while preserving necessary safety and authority. Audit six forms of friction:

| Friction | Diagnostic question | Preferred response |
| --- | --- | --- |
| Orientation | Does the user know where they are and why? | Preserve object, state, origin, and return path |
| Decision | Is the relevant evidence available at the moment of choice? | Bring evidence into the action context and remove irrelevant detail |
| Input | Is the user repeating known or derivable information? | Reuse verified data, choose trustworthy defaults, and support efficient entry |
| Transition | Does moving surfaces lose position or meaning? | Preserve context, drafts, filters, scroll position, and deep links |
| Waiting | Does async work disappear after submission? | Show persistent status, owner, expected event, and return path |
| Recovery | Does one failure force the user to begin again? | Retain valid input, isolate the fault, support retry, resume, or safe undo |

Also test:

* Recognition instead of memory
* One meaningful decision per action scope
* Frequent actions accessible without menu hunting
* Rare complexity available without crowding the common path
* Dependencies resolved before the final commit point
* Safe keyboard and repeated use efficiency
* Interruption after every meaningful step
* Work that crosses shifts, devices, locations, or roles

Do not measure smoothness only by clicks. Track time to correct closure, error correction effort, unresolved work, handoff latency, abandonment, duplicate entry, and recovery success.

## Exception architecture

Test exceptions in five classes:

### Input and evidence

Missing, invalid, conflicting, duplicate, stale, partial, amended, unknown, or unavailable information.

### Authority and policy

Wrong role, expired authority, required cosign, locked record, policy conflict, or override requirement.

### Operational fulfillment

No availability, no show, delay, rejected handoff, insufficient sample, external service failure, denied coverage, unavailable item, or changed circumstances.

### Technical execution

Offline, timeout, partial save, duplicate request, stale session, integration failure, background processing failure, or notification failure.

### Human interruption

User navigates away, changes device, hands work to another person, leaves a draft, resumes later, or receives new evidence mid flow.

For each exception, define detection, explanation, consequence, available action, retained data, owner, escalation, and recovery.

## Screen boundary rules

Keep actions together when they share one decision, one authority, one object, and one uninterrupted context.

Create a boundary when:

* Authority or owner changes
* The action creates an independently resumable object
* The user must wait for another person or system
* Risk or confirmation level changes materially
* The working object changes
* The next step requires a different information environment
* The task exceeds the safe capacity of the current overlay

Do not create a page solely because the backend has another endpoint. Do not compress a workflow solely to reduce click count.

## Workflow specification template

Use this structure for a full specification:

1. Problem and real world outcome
2. Scope and evidence status
3. Primary and supporting actors
4. Trigger, preconditions, and entry points
5. Closure contract
6. Canonical objects and sources of truth
7. Common path journey
8. State transition model
9. Role, authority, ownership, and handoffs
10. Information architecture and action hierarchy
11. Component mapping
12. Exception, interruption, amendment, and recovery paths
13. Notifications, queues, and return paths
14. Responsive and accessibility behavior
15. Events, analytics, and audit evidence
16. Acceptance criteria
17. Assumptions, unresolved decisions, owners, and consequences
