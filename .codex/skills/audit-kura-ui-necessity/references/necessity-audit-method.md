# Necessity Audit Method

Use this reference for every UI necessity audit.

## Contents

1. Audit inputs
2. Scope map
3. Element inventory
4. Evidence model
5. Removal ladder
6. Counterfactual test
7. Hierarchy reconstruction
8. Audit templates

## Audit inputs

Gather the strongest available evidence:

* Screenshot, Figma frame, prototype, or working interface
* User role, trigger, goal, and device context
* Current workflow and state model
* Storybook component contracts
* Code and conditional rendering rules
* Content and clinical policy
* Analytics, support issues, usability evidence, or observation

Do not pretend a static screenshot proves hover, focus, keyboard, responsive, loading, error, permission, or conditional behavior.

## Scope map

Identify the audit boundary:

| Scope | Include |
| --- | --- |
| Element | Immediate label, state, action scope, and accessibility relationship |
| Component | Anatomy, variants, state, content, events, and responsive behavior |
| Screen | Entry context, hierarchy, visible and conditional elements, exit actions |
| Flow | Trigger, repeated steps, transitions, confirmations, handoffs, and closure |
| System | Semantic duplicates, component variants, patterns, ownership, and deprecation |

Do not remove a local element when its value appears only in the wider flow without inspecting that flow.

## Element inventory

Inventory by regions, then by reading order. Use one row for each independently removable or transformable unit.

| Field | Record |
| --- | --- |
| ID | Stable audit identifier |
| Region | Header, navigation, content, action area, aside, overlay, footer |
| Element | Human readable name and component when known |
| Content | Exact label, value, icon, or visual treatment |
| Visibility | Always, conditional, role based, responsive, hover, focus |
| Interaction | Static, navigation, input, command, feedback, status |
| Source | Product data, derived data, policy, placeholder, demo, decoration |
| Primary job | One dominant reason for existence |
| Dependency | What refers to or relies on it |

Separate content from container. A card, heading, values, controls, and footer may require different verdicts.

## Evidence model

Classify evidence:

| Confidence | Meaning |
| --- | --- |
| High | Confirmed by current policy, observed user need, verified behavior, or strong usage evidence |
| Medium | Supported by consistent workflow reasoning but not directly validated |
| Low | Based mainly on convention, preference, screenshot inference, or incomplete context |

Classify necessity:

* Essential: removal breaks safety, comprehension, decision, action, accessibility, recovery, or closure
* Supporting: helps but may use a lighter treatment
* Conditional: necessary only for some role, state, intent, or exception
* Duplicated: another element performs the same job in the same context
* Obsolete: no current job or valid source remains
* Decorative: contributes only to tone or visual interest

Decorative does not automatically mean remove. It must still justify its attention, space, performance, and consistency cost.

## Removal ladder

Use the least disruptive intervention that solves the problem:

1. Correct hierarchy and emphasis
2. Tighten content
3. Remove decorative treatment
4. Remove a redundant boundary
5. Combine duplicate representations
6. Demote supporting information
7. Reveal conditionally at the moment of need
8. Relocate to the correct action scope
9. Replace with a lighter component
10. Remove the element
11. Remove an unnecessary step or screen
12. Deprecate a duplicate system component

Do not jump directly to deletion when hierarchy, content, or timing is the actual problem.

## Counterfactual test

Create a mental or actual version without the element. Ask:

1. Can a first time user identify the object and current task?
2. Can an expert complete the frequent path as efficiently?
3. Can the user distinguish current, pending, failed, and completed truth?
4. Can the user predict the consequence of the next action?
5. Can the user detect and recover from relevant errors?
6. Can the correct role understand ownership and handoff?
7. Can keyboard and screen reader users still perceive the same meaning?
8. Does mobile preserve the same safe outcome?
9. Does the removal create a need to remember or navigate elsewhere?
10. Does any edge case become falsely simple?

If the answer regresses materially, restore the job. The original representation may still be replaced.

## Hierarchy reconstruction

After verdicts, build a content skeleton without containers or decoration:

1. Identity and context
2. Current state and unresolved attention
3. Main decision evidence
4. Primary action
5. Alternatives and recovery
6. Secondary evidence and history

Group by shared meaning and action. Establish reading order. Apply typography, alignment, and spacing. Add dividers only where scan boundaries remain unclear. Add surfaces only for independent functional regions. Add cards only for independent units.

Audit visual signals as a limited budget:

* Primary buttons
* Strong colors
* Badges
* Borders
* Shadows
* Large typography
* Icons
* Motion

When too many elements use a strong signal, the signal loses meaning. Reduce emphasis before reducing essential information.

## Audit templates

### Quick audit

1. User moment
2. Primary action
3. Three largest noise sources
4. Keep, combine, demote, conditionalize, and remove decisions
5. Revised hierarchy
6. Safety and evidence caveats

### Full screen audit

1. Scope and evidence
2. User moment and hierarchy goal
3. Element inventory
4. Necessity decisions
5. Revised structure
6. State and responsive implications
7. Preservation list
8. Verification plan

### System audit

1. Semantic responsibility map
2. Duplicate components and variants
3. Usage and dependency evidence
4. Canonical component decision
5. Migration and deprecation path
6. Visual regression and behavior verification
7. Removal evidence and owner
