# Kura and High-Risk Product Overlay

## 1. Why does Kura need its own overlay?

Kura handles clinical, patient, laboratory, medication, scheduling, billing and operational state. A wrong microinteraction can not only cause discomfort but also create misunderstandings about care, sample, order, prescription or result.

Use universal principles, then increase safeguards according to risk.

## 2. Status must not be ambiguous

Clearly distinguish:

```text
created
saved
submitted
sent
delivered
received
reviewed
acknowledged
approved
placed
collected
labelled
processed
resulted
confirmed
cancelled
```

Do not use a common checkmark for all states.

For example:

```text
Lab order drafted
≠ Lab order placed
≠ Samples collected
≠ Results available
≠ Results reviewed
```

## 3. Hover in Kura

Hover reveal is suitable for:

* Secondary actions in staff tables.
* Quick metadata preview is not sensitive.
* Row selection affordance.
* Noncritical help.
* Drag handles for configurable admin lists.

Hover cannot be the sole path for:

* Critical result.
* Allergy or drug interaction.
* Patient identity.
* Consent.
* Order placement.
* Sample confirmation.
* Prescription issue.
* Payment commitment.
* Error recovery.

## 4. Sensitive information

Unable to reveal PHI or confidential notes due to accidental pointer pass.

Use explicit action for:

* Full patient identifiers.
* Private contact data.
* Confidential clinical note.
* Insurance number.
* Payment details.
* Authentication secret.

On shared screen, consider masking, click-to-reveal, timeout and audit.

## 5. Authoritative truth

Each clinical state must have a source:

* Server record.
* Laboratory system.
* Clinician sign-off.
* Device result.
* Pharmacy confirmation.
* Payment processor.

UI is not optimistic-final with R4 action.

## 6. Pending states

Use explicit language and visual distinction:

```text
Saving…
Pending confirmation
Waiting for lab
Awaiting clinician review
Sync failed
```

Don't let pending look like success.

## 7. Critical alerts

Critical alert must:

* Persistent.
* Specific.
* Linked to patient/object.
* Explain required action.
* Not depend on color or motion.
* Not auto-dismiss.
* Have acknowledgement semantics distinct from resolution.
* Be auditable.

Animation only supports locate, not theatrical alerts.

## 8. Order and sample flow

### Order

```text
select tests
→ validate prerequisites
→ review
→ place pending
→ server confirmed placed
```

### Sample

```text
identify patient
→ identify order
→ identify tube
→ validate uniqueness
→ collect
→ label
→ confirm association
```

Do not use motion or success state to bypass identity checks.

Duplicate label or invalid sample mapping needs hard constraints and clear recovery.

## 9. Medication and prescriptions

* Drug interaction alert is not hover-only.
* Severity persistent.
* Dismiss/override requires reason when required by policy.
* Override acknowledgment does not mean interaction resolved.
* Prescription “created” is different from “issued” and “dispensed”.
* Autosave draft is not displayed as signed prescription.

## 10. Result review

* Result available other reviewed.
* Abnormal other critical.
* Trend animation cannot mask numeric value.
* Hover chart tooltip is supplemental; critical threshold visible.
* Source, time and freshness accessible.
* Review action server-confirmed and auditable.

## 11. Patient identity

Critical workflows need a persistent identity at the point of action.

Do not hide identity in hover card. Do not allow row hover to make adjacent patient actions easily confused. Use spacing, selection state and scope confirmation.

## 12. Destructive clinical actions

Cancel order, void result, discontinue medication or delete record requires:

* Object/scope.
* Consequence.
* Permission.
* Reason if policy needs it.
* Confirmation or staged review.
* Server-confirmed result.
* Audit.
* Recovery path if available.

## 13. Concurrency

Clinical records can be edited by multiple people.

* Version/freshness.
* Conflict warning.
* Preserve local work.
* Compare changes.
* No silent overwrite.
* Audit resolution.

## 14. Offline

* Distinguish local draft and synced record.
* Do not show clinical order as placed offline unless queue semantics are explicit and safe.
* Pending queue visible.
* Reconnect failure clear.
* Critical action may require online guard.

## 15. Motion tone for Kura

Kura motion should:

```text
calm
precise
restrained
fast to scan
nonblocking
low displacement
minimal overshoot
```

Avoid:

* Bounce on clinical confirmation.
* Celebration on diagnosis/result.
* Full-screen zoom.
* Long cinematic transitions.
* Pulsing badges except true critical signaling with alternatives.

## 16. Audit and evidence

R3–R4 requires:

* Domain review.
* Interaction test.
* Failure test.
* Accessibility test.
* Audit event semantics.
* Authoritative state mapping.
* Clear owner.

## 17. Kura ship gate

Do not ship when:

* Patient identity may disappear from view at commit.
* Pending looks like confirmed.
* Critical alert dismissible without recording.
* Hover/touch parity missing in operational table.
* Sensitive data accidental reveal.
* Autosave status stale.
* Conflict overwrite local/remote data.
* Result review state is not auditable.
* Motion hindered repeated clinical task.
