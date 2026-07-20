# ReUI Component Adaptation Rules for Kura

ReUI is a source of reusable interface patterns, not a source of finished Kura screens. Never copy a ReUI demo, block, template, layout, dataset, placeholder, interaction, or information structure into Kura and call it production-ready.

Interpret, adapt, and validate every ReUI item against the real Kura context. The final result must feel designed specifically for Kura, its users, clinical workflows, business rules, and product language.

## Contents

1. [Understand the Kura context](#1-understand-the-kura-context)
2. [Treat ReUI as a pattern library](#2-treat-reui-as-a-pattern-library)
3. [Replace all demo content](#3-replace-all-demo-content)
4. [Adapt function, not only appearance](#4-adapt-function-not-only-appearance)
5. [Redesign information architecture](#5-redesign-information-architecture)
6. [Use Kura domain language](#6-use-kura-domain-language)
7. [Design for the real user role](#7-design-for-the-real-user-role)
8. [Design every real state](#8-design-every-real-state)
9. [Include clinical and operational edge cases](#9-include-clinical-and-operational-edge-cases)
10. [Preserve clinical safety](#10-preserve-clinical-safety)
11. [Use the Kura design system](#11-use-the-kura-design-system)
12. [Do not preserve the demo layout by default](#12-do-not-preserve-the-demo-layout-by-default)
13. [Validate component semantics](#13-validate-component-semantics)
14. [Map the component to real data](#14-map-the-component-to-real-data)
15. [Define the complete interaction flow](#15-define-the-complete-interaction-flow)
16. [Adapt actions to real consequences](#16-adapt-actions-to-real-consequences)
17. [Use realistic content](#17-use-realistic-content)
18. [Preserve accessibility](#18-preserve-accessibility)
19. [Verify reuse before creating a variant](#19-verify-reuse-before-creating-a-variant)
20. [Do not force ReUI into the product](#20-do-not-force-reui-into-the-product)
21. [Full ReUI variant coverage](#21-full-reui-variant-coverage)
22. [Required reasoning before import](#required-reasoning-before-import)
23. [Proactive clarification](#proactive-clarification)
24. [Definition of done](#definition-of-done)
25. [Final rule](#final-rule)

## 1. Understand the Kura context

Before selecting a ReUI component, determine:

- the Kura product and module;
- the target user and role;
- the task and decision;
- the information and action required;
- risks, permissions, dependencies, and clinical consequences;
- what happens immediately before and after the interaction.

Do not select a component because it resembles the requested screen. Select it only when its interaction model, information structure, and behavior can support the real workflow.

## 2. Treat ReUI as a pattern library

ReUI may provide visual foundations, layout patterns, responsive structures, interaction primitives, compositions, and useful technical implementations.

ReUI does not define Kura business or clinical logic, terminology, permissions, roles, information architecture, workflow states, safety rules, data relationships, or content hierarchy. Design those from Kura requirements.

## 3. Replace all demo content

Remove every sample name, title, label, description, status, column, field, button, empty state, metric, chart, filter, notification, tooltip, error, date, avatar, placeholder, value, and navigation item.

Replace them with content that reflects the actual Kura use case. Redesign associated sorting, filtering, grouping, states, actions, and detail views rather than merely renaming the demo.

## 4. Adapt function, not only appearance

Changing text and colors is insufficient. For every imported component, define:

- input and displayed data;
- primary, secondary, and destructive actions;
- permissions and validation;
- state transitions and resulting feedback;
- system events;
- audit and history requirements.

A visually correct component with incorrect behavior is a failed adaptation.

## 5. Redesign information architecture

Reorganize content around clinical importance, task priority, decision sequence, frequency, urgency, risk, data relationships, permissions, and workflow dependencies.

Place the most important information first. Keep supporting information available without making it compete. Use progressive disclosure for rare or advanced information.

## 6. Use Kura domain language

Use established Kura terminology. Do not invent names for existing concepts, use generic SaaS language where precise healthcare language is required, or expose database and engineering terms.

Adapt language to the role: clinical for clinicians, operational for reception and operations, plain and reassuring for patients, and organizational for administrators. The same object may require different presentation language by role.

## 7. Design for the real user role

Identify whether the user is a doctor, nurse, receptionist, pharmacist, clinic manager, laboratory worker, patient, administrator, or support operator.

Adapt knowledge level, responsibility, permissions, frequency, time pressure, mistake consequences, visible information, and required confirmations. Never assume one interface is safe or suitable for every role.

## 8. Design every real state

Cover every applicable state, including:

- loading, empty, partial, success, warning, critical, and error;
- disabled, read-only, pending, draft, completed, cancelled, and expired;
- unavailable, permission denied, offline, conflicting data, and unsaved changes;
- concurrent update, archived, deleted, confirmation, review, acknowledgement, and escalation.

Each state must remain understandable, safe, and paired with the correct recovery or next action.

## 9. Include clinical and operational edge cases

Do not design only the happy path. Consider missing or duplicate patient data, conflicting medication data, abnormal or critical results, allergies, drug interactions, missing diagnosis evidence, incomplete prescriptions, invalid dosage, restricted medication, unavailable clinicians, delayed laboratory or external-system data, changed appointments, absent consent, insufficient permission, concurrent editing, unverified data, and missing acknowledgement.

## 10. Preserve clinical safety

Safety takes priority over visual simplicity. Never hide information affecting diagnosis, medication, dosage, allergies, interactions, abnormal or critical results, patient identity, follow-up, acknowledgement, clinical responsibility, or escalation.

Introduce deliberate friction for consequential actions such as prescribing, overriding interactions, acknowledging critical results, deleting clinical data, closing consultations, completing consequential tasks, or changing patient identity.

## 11. Use the Kura design system

Translate typography, color roles, spacing, radius, borders, elevation, icons, density, interaction states, motion, responsive behavior, accessibility, content tone, status language, and data formatting into canonical Kura rules.

No adapted item may retain a separate ReUI visual personality. Follow the repository's visual binding, ownership, and Storybook contracts.

## 12. Do not preserve the demo layout by default

For every demo sidebar, card, tab, table, filter, chart, header, and action bar, ask whether it serves the current task, is needed now, is correctly placed and weighted, duplicates another function, or adds unnecessary weight.

Remove, combine, move, or progressively disclose anything that does not support the real workflow.

## 13. Validate component semantics

Match visual form to function:

- do not use tabs for a sequential process;
- do not use an accordion for information users must compare simultaneously;
- do not use a modal for a long or complex clinical workflow;
- do not turn every section into a card;
- do not use badges as actions;
- do not make read-only values appear editable;
- do not style destructive actions as primary actions;
- do not use a chart when a table answers the question more clearly;
- do not use ambiguous unlabeled icons;
- do not use a dropdown when options must be compared.

Choose patterns from the task, not from the demo inventory.

## 14. Map the component to real data

Before implementation, define field names and types, required and optional fields, source, ownership, validation, permissions, relationships, sorting, filtering, pagination, search, audit history, update frequency, time-zone behavior, formatting, null handling, confidence, and verification status.

Do not build against the demo dataset and defer understanding the production data model.

## 15. Define the complete interaction flow

Document the entry point, initial state, user action, system response, validation, confirmation, success, failure, recovery, exit, next action, saved or changed data, notifications, and audit event.

A component is incomplete while its place in the journey is unclear.

## 16. Adapt actions to real consequences

Avoid vague labels such as “Continue,” “Submit,” “Confirm,” “Done,” “Next,” or “Proceed” when the outcome can be named.

Prefer labels such as “Create prescription,” “Save draft,” “Send lab order,” “Acknowledge result,” “Add to care plan,” “Schedule follow-up,” “Complete consultation,” “Escalate for review,” “Remove medication,” or “Confirm patient identity.”

Users must understand the consequence before acting.

## 17. Use realistic content

Test long patient, clinic, and practitioner names; multiple diagnoses and allergies; long medications and dosage instructions; clinical notes; abnormal ranges; missing values; Vietnamese diacritics; multiple languages; large numbers; small decimals; long timestamps; and multiple simultaneous statuses.

Do not use idealized placeholder content that conceals layout, truncation, or comprehension failures.

## 18. Preserve accessibility

Maintain keyboard navigation, visible focus, screen-reader labels, semantic structure, contrast, zoom, responsive text, touch targets, reduced motion, explicit error and status identification, non-color cues, logical reading order, and clear form instructions.

Never remove accessible behavior while restyling or simplifying.

## 19. Verify reuse before creating a variant

Prefer reusing or extending an existing Kura component, composing existing patterns, or adding a documented state, size, or density. Create a variant only for a genuinely different function.

Do not create near-duplicate patterns across modules.

## 20. Do not force ReUI into the product

When a ReUI component does not fit, use only useful primitives, recompose it, remove most of it, replace the interaction model, build an approved Kura-specific component, or reject it entirely.

ReUI should accelerate correct design, never constrain Kura to an unsuitable pattern.

## 21. Full ReUI variant coverage

When the user asks to bring a ReUI component into Kura, never intake only the
single variant shown in an example, preview, or demo. Before implementation,
inspect the complete ReUI component source, registry metadata, API, examples,
subcomponents, and composition family. Produce a variant inventory covering,
where supported or applicable:

- visual variants and semantic intents;
- sizes, densities, orientations, and layouts;
- default, hover, focus, active, selected, disabled, and read-only states;
- loading, empty, error, warning, success, offline, and permission-restricted
  states;
- desktop, tablet, and mobile behavior;
- relevant subcomponents, compositions, and interaction modes;
- accessibility semantics, keyboard navigation, focus management, labels, and
  announcements.

Compare every upstream capability with the fresh Kura Storybook index before
promotion. Preserve and adapt the full compatible family, not merely the demo
configuration. Every retained capability must be represented by a Storybook
story or an explicit testable matrix within the canonical owner's stories, and
must be bound to Kura tokens, terminology, data, workflow, permissions,
clinical safety, accessibility, density, and responsive requirements.

Do not copy ReUI content or styling literally. ReUI supplies architecture and
an implementation foundation; Kura owns final meaning, content, state model,
behavior, safety rules, and visual treatment.

A ReUI variant may be excluded only when it is incompatible with Kura,
clinically or operationally unsafe, outside the approved Kura contract, or a
duplicate of an exact indexed Storybook capability. Record each exclusion, its
evidence, the canonical Kura replacement when one exists, and the reason. If a
material exclusion is ambiguous, ask for confirmation before removing it.

## Required reasoning before import

Before using any ReUI item, explicitly determine:

1. Kura use case
2. Target user
3. Primary task
4. Required information
5. Primary decision
6. Primary action
7. Workflow state
8. Permissions
9. Safety requirements
10. Real data structure
11. Required edge cases
12. Existing Kura patterns
13. Reusable ReUI parts
14. Parts requiring redesign
15. Parts requiring removal

Do not treat unresolved assumptions as confirmed requirements.

## Proactive clarification

If context is incomplete, ambiguous, contradictory, or insufficient for a safe decision, ask focused questions before finalizing. Do not silently invent business or clinical logic, permissions, workflow order, status definitions, fields, safety rules, primary actions, confirmation requirements, or recovery behavior.

Ask only questions that materially change structure, behavior, data, or safety. Explain briefly why each answer matters. Resolve trivial visual decisions through the Kura design system without asking.

Useful questions include:

- Who is the primary user and what exact task must they complete?
- What happens after the action, and what must be true before it is available?
- Does it require confirmation or clinical acknowledgement?
- Which roles may view or edit the information?
- What states can the record have?
- What happens when data is missing, delayed, or conflicting?
- Is the information read-only or editable?
- Which action has the strongest priority?
- Does Kura already own a pattern for this workflow?
- Which larger clinical or operational journey contains this screen?

## Definition of done

A ReUI adaptation is complete only when:

1. No demo content remains.
2. The real Kura use case and target user are defined.
3. The component supports the real workflow and information hierarchy.
4. Actions communicate real consequences.
5. Required states and edge cases are covered.
6. Permissions and clinical safety requirements are preserved.
7. Realistic content has been tested.
8. The Kura design system and existing patterns are used.
9. Accessibility behavior is preserved or improved.
10. Users can understand what happened and what to do next.
11. Unresolved material assumptions have been clarified.
12. The repository's ownership, binding, Storybook, testing, and cleanup checks pass.
13. The complete ReUI component family and variant inventory has been inspected.
14. Every retained variant is represented and testable in Storybook.
15. Every excluded variant has a documented evidence-based reason and replacement where applicable.

## Final rule

Never ask: “How can this ReUI demo be inserted into Kura?”

Always ask: “What does this Kura workflow require, and which parts of ReUI can help implement it correctly?”
