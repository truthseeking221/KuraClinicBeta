# Kura Domain Patterns

Use these patterns as architecture scaffolds for Kura clinical and operational workflows. Confirm actual policy, terminology, role authority, integration, and backend behavior against current Kura sources before treating any step as product truth.

## Contents

1. Cross surface operating model
2. Shared context contract
3. First patient journey scaffold
4. Care plan loop
5. Order and diagnostic loop
6. Result closure loop
7. Prescribing loop
8. Booking and collection loop
9. Work queue pattern
10. AI participation pattern

## Cross surface operating model

Treat Kura as a connected care operating system. A patient, encounter, order, specimen, result, prescription, appointment, care plan, task, and communication may appear in several role based surfaces, but each canonical object needs a clear source of truth and consistent state meaning.

For every cross surface object, establish:

* Canonical identifier and source of truth
* Which surface may create, edit, view, or act
* Which state changes propagate
* Expected propagation timing
* Conflict and stale data behavior
* Audit and provenance
* Deep link and return path
* Notification and queue consequences

Do not copy objects between modules without defining reconciliation.

## Shared context contract

For consequential clinical work, preserve:

* Correct patient identity
* Encounter, episode, or care context
* Current clinician or operational role
* Current object and lifecycle state
* Relevant risk and unresolved work
* Last update, provenance, and amendment status
* Owner and next expected action

The exact header, banner, summary, or panel can change by surface. The context contract cannot disappear.

## First patient journey scaffold

Use this as a discovery frame, not a guaranteed product sequence:

1. Establish or verify patient identity
2. Confirm consent, access, and encounter context where required
3. Understand the presenting concern and relevant longitudinal context
4. Review current problems, medications, allergies, prior results, and risk relevant to the decision
5. Document assessment and uncertainty
6. Form the care plan
7. Create required orders, prescriptions, referrals, tasks, or education
8. Explain and communicate the plan
9. Arrange booking, preparation, collection, or fulfillment
10. Track work through operational processing
11. Receive and reconcile results or external evidence
12. Review, acknowledge, and decide disposition
13. Act, communicate, and update the care plan
14. Monitor, follow up, escalate, or close

At each step, ask whether the patient, clinician, receptionist, collector, lab operator, coordinator, or administrator becomes the next owner. Confirm which roles actually exist in the approved Kura model.

## Care plan loop

A care plan item should define:

| Dimension | Required meaning |
| --- | --- |
| Goal | Desired clinical or patient outcome |
| Intervention | What will be done |
| Rationale | Why it is appropriate |
| Owner | Person or role accountable for the next action |
| Cadence | When or how often action occurs |
| Dependency | What must happen first |
| Evidence | What will be monitored |
| Threshold | What change requires review or escalation |
| Communication | Who needs to know and how |
| Status | Current lifecycle truth |
| Review | When and by whom it will be reconsidered |
| Closure | What proves completion or explains discontinuation |

The loop is:

`Assess → plan → act → observe → interpret → adjust → communicate → follow up → close or continue`

Do not reduce a care plan to static notes or a checklist without ownership and review.

## Order and diagnostic loop

Possible architecture stages include:

1. Identify diagnostic need
2. Select appropriate order and indication
3. Validate prerequisites, duplication, timing, and preparation
4. Authorize or sign
5. Dispatch to scheduling or fulfillment
6. Confirm appointment, preparation, and patient understanding
7. Collect or perform
8. Track specimen or operational processing
9. Resolve insufficient, rejected, delayed, cancelled, send out, or unavailable states
10. Produce and release result according to policy
11. Notify the responsible reviewer
12. Review and acknowledge
13. Record interpretation and disposition
14. Act and communicate
15. Update care plan and follow up
16. Close, amend, or reopen

Do not expose every operational stage to every role. Show the detail required for that actor's decision while preserving truthful summary state.

## Result closure loop

Distinguish:

* Result available
* Result viewed
* Result acknowledged by an authorized person
* Result interpreted
* Disposition selected
* Action completed
* Patient or care team communication completed
* Follow up arranged
* Result episode closed
* Result amended and prior interpretation reconsidered

For abnormal or critical results, confirm current Kura policy for severity, notification, escalation, acknowledgement, override, and timing. Never invent it.

The review surface should keep relevant trends, reference information, provenance, related orders, clinical context, and care plan implications available at the point of decision.

## Prescribing loop

Use the whole regimen and patient context, not an isolated medication form:

1. Establish indication and intended outcome
2. Reconcile current medications and uncertain medication history
3. Review allergies, contraindications, interactions, duplication, organ function, pregnancy, and other case relevant risk
4. Compare clinically appropriate options according to approved evidence and policy
5. Configure medication, route, dose, frequency, duration, instructions, and monitoring as applicable
6. Resolve warnings and document authorized overrides
7. Sign or authorize
8. Transmit, print, dispense, or otherwise fulfill according to supported capability
9. Confirm patient understanding and access
10. Reconcile fulfillment and actual use
11. Monitor response, adherence, adverse effects, and relevant evidence
12. Continue, change, stop, supersede, or close with rationale

Do not claim that signing proves fulfillment or patient use.

## Booking and collection loop

Separate the objects and states when appropriate:

* Clinical order
* Appointment
* Preparation instructions
* Check in
* Collection or performance task
* Specimen and custody
* Processing work
* Result

A booking flow should define availability, location, resource, preparation, eligibility, rescheduling, cancellation, no show, reminder, timezone, arrival, and accessibility behavior.

A collection flow should define identity verification, order matching, preparation status, required labels, sample state, partial collection, unable to collect, rejection, recollection, custody, dispatch, and completion evidence according to approved policy.

## Work queue pattern

A work queue is an action surface, not a status dump. Each item should communicate:

* Object and patient context
* Why it needs attention
* Current state
* Priority or urgency with reason
* Current owner
* Next action
* Timing and overdue meaning
* Dependencies or blockers
* Last meaningful event
* Safe bulk action eligibility

Filters should map to real work decisions, such as ownership, urgency, stage, location, or exception. Avoid filters that merely expose backend fields.

Opening an item should preserve queue position, filters, and a clear return path.

## AI participation pattern

For every AI contribution, define:

* Input evidence and provenance
* Intended use and user role
* Output type, confidence, uncertainty, and known limits
* Whether the output is suggestion, draft, prioritization, extraction, or automation
* Human review and authority requirement
* Edit, accept, reject, defer, and report behavior
* What becomes part of the record
* Audit trail and model version when required
* Failure, unavailable, low confidence, conflicting evidence, and stale evidence behavior
* Monitoring for unsafe automation bias or silent omission

Never convert AI output into signed clinical fact or completed work without the required human decision and audit event.
