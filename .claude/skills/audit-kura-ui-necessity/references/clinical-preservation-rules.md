# Clinical Preservation Rules

Use this reference before removing or hiding information from any Kura clinical or operational interface.

## Contents

1. Essential context
2. Essential repetition
3. Safety and authority
4. State and closure
5. Data interpretation
6. Accessibility preservation
7. Removal gate

## Essential context

Preserve the minimum context needed for the current action:

* Patient identity and disambiguation
* Encounter, episode, order, specimen, result, prescription, or Care Plan object
* Current role and acting authority when consequential
* Current lifecycle state and data freshness
* Relevant clinical evidence and unresolved risk
* Owner, blocker, next action, and expected event
* Provenance, amendment, and audit context where interpretation depends on them

The representation may become more compact, but the user must not reconstruct consequential context from memory.

## Essential repetition

The same fact may need several appearances when decision contexts differ:

| Context | Necessary job |
| --- | --- |
| Search or work queue | Identify and select the correct object |
| Sticky working header | Prevent wrong patient or wrong object action during scroll |
| Composer or form | Connect data entry to the correct subject and encounter |
| Review step | Verify the exact object, content, and consequence before authorization |
| Result or audit history | Preserve provenance and version interpretation |
| Mobile sticky action area | Keep action and object context available when the source control is offscreen |

Compress repeated context according to the local job. Do not remove it merely because the same data appeared earlier.

## Safety and authority

Do not remove or hide:

* Case relevant allergies, interactions, contraindications, or other risk at the point of decision
* Warning cause, consequence, action, and override behavior
* Signer, delegate, reviewer, or override authority where accountability matters
* Destructive or irreversible consequence before commitment
* Required rationale, attestation, or acknowledgement when approved policy gives it meaning
* Permission restriction and the route to obtain help, delegation, or resolution

Reduce alert duplication carefully. Consolidate repeated summaries, but keep field level resolution and final authorization review when each supports a distinct action.

## State and closure

Preserve distinctions that change ownership, action, or truth:

* Draft versus signed
* Requested versus accepted
* Scheduled versus performed
* Collected versus received
* Partial versus final
* Available versus acknowledged
* Acknowledged versus actioned
* Sent versus delivered or fulfilled
* Completed versus clinically closed
* Failed versus cancelled
* Original versus amended or superseded
* Unknown versus confirmed absence

Never merge distinct states solely to reduce badges or labels. Simplify the presentation, not the truth.

Persistent evidence is required when work continues asynchronously, can fail after navigation, needs another owner, or must be verified later. A transient toast cannot replace it.

## Data interpretation

Preserve when relevant:

* Units
* Reference range or interpretation context
* Collection or measurement time
* Source and provenance
* Final, partial, preliminary, corrected, or amended status
* Trend context and comparable prior values
* Missing, stale, delayed, or uncertain data

A bare value may look cleaner while becoming clinically ambiguous.

Do not remove a column, metric, or historical value until confirming whether users compare, trend, filter, reconcile, or act on it.

## Accessibility preservation

Do not remove:

* Programmatic labels and descriptions
* Heading structure used for navigation
* Error association and error summary links
* Focus visibility and focus restoration
* Noncolor state cues
* Keyboard instructions for unfamiliar composites
* Live announcements for meaningful async changes
* Visually hidden text that supplies an accessible name or relationship

Visual simplification may retain nonvisual semantics. Inspect the accessibility tree before declaring duplication.

## Removal gate

Before removing a consequential element, answer:

1. Which approved source or evidence explains its current purpose?
2. Which actor, role, state, and device use it?
3. What mistake, delay, misunderstanding, or harm could follow removal?
4. Does another visible and accessible element fully perform the same job in this context?
5. Can a lighter representation preserve the job?
6. What edge case or asynchronous state changes the answer?
7. Who must approve the removal when policy or clinical governance is involved?
8. How will the revised task be tested?

If the purpose is unknown and risk is meaningful, mark the verdict unresolved. Do not equate missing evidence with evidence of no need.
