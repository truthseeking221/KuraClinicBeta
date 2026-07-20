---
name: storybook-consistency-police
description: Audit Kura Storybook screenshots, stories, components, pages, flows, and production UI for consistency, atomic composition, canonical ownership, orphan or duplicate UI, hardcoded/custom/workaround implementations, Clean UI quality, minimalist UX, accessibility, responsiveness, ReUI or Untitled UI reuse opportunities, and backend-contract compatibility when the audited UI carries domain behavior or data. Use when the user asks to audit, inspect, police, review, compare, clean up, standardize, or improve anything in Storybook or provides a UI screenshot for consistency analysis. Report findings and a remediation proposal first; do not edit files until the user explicitly approves named findings or scope.
---

# Storybook Consistency Police

Protect Storybook as Kura's canonical construction system. Find structural
inconsistency before polishing appearance, and separate diagnosis from repair.

Interpret "inheritance" as traceable canonical composition or extension:

```text
Token -> Primitive -> Component -> Pattern -> Section -> Page -> Flow
```

A domain-specific element may exist, but it must have one owner, one canonical
implementation, a Storybook contract, and registered lower-level foundations.

## Required authority

Before auditing, read:

1. [`../../../AGENTS.md`](../../../AGENTS.md).
2. [`../kura-clean-ui/SKILL.md`](../kura-clean-ui/SKILL.md) and its required
   Clean UI references.
3. [`/Users/macbook/.agents/skills/minimalist/SKILL.md`](/Users/macbook/.agents/skills/minimalist/SKILL.md).
4. [`../../../docs/architecture/storybook-reuse-and-component-intake.md`](../../../docs/architecture/storybook-reuse-and-component-intake.md).
5. [`../../../docs/architecture/storybook-mobile-responsiveness-and-design.md`](../../../docs/architecture/storybook-mobile-responsiveness-and-design.md).
6. [The audit rubric](references/audit-rubric.md).

Apply the strictest applicable Kura ownership, safety, accessibility,
responsive, and Storybook rule. Apply backend rules only after classifying the
target as carrying a domain contract; do not manufacture backend relevance for
generic UI.

## Non-negotiable approval gate

Operate in two phases.

### Phase A: audit only

Use read-only inspection. Do not edit source, stories, tests, tokens, exports,
configuration, or documentation. Do not install ReUI or Untitled UI source.

Report:

- verified violations;
- suspected violations that require source confirmation;
- composition and ownership gaps;
- reuse or external-intake opportunities;
- Clean UI and minimalist improvements;
- a bounded remediation proposal.

Then stop and ask the user to approve the named findings or remediation scope.
Approval given before seeing the findings does not authorize an unbounded
cleanup.

### Phase B: approved remediation

Begin changes only after explicit approval such as:

- "approve all findings";
- "fix findings P1-02 and P2-01";
- "approve the proposed remediation scope."

Implement only the approved scope. If implementation reveals a materially new
problem, report it and request additional approval instead of silently
expanding the work.

## Audit workflow

### 1. Establish the audit target

Identify:

- screenshot, story, component, page, flow, or Storybook category;
- intended user, task, decision, and primary action;
- expected owner and hierarchy level;
- whether the target itself carries domain data or behavior, merely appears
  inside a domain composition, or is generic UI;
- files, story IDs, routes, or journeys that can verify the target.

If a screenshot is supplied, inspect it visually before drawing conclusions.
Inventory every visible control, surface, status, action, content group, and
state. A screenshot can reveal symptoms, but it cannot prove source-level
hardcoding; confirm those claims in code whenever repository access exists.

Label evidence as:

- `CONFIRMED`: verified in source, Storybook, exports, tests, or contracts;
- `STRONG INFERENCE`: supported by multiple visible or structural signals;
- `VISUAL SUSPICION`: visible symptom not yet confirmed in source;
- `NOT VERIFIABLE`: required source or context is unavailable.

Never present visual suspicion as a confirmed code violation.

### 2. Build a fresh Storybook and source inventory

Search by purpose and behavior, not only by component name:

- current Storybook stories and discoverable titles;
- canonical barrels and exports;
- components, variants, states, and tests;
- feature modules and production consumers;
- similar compositions and deprecated implementations;
- tokens, icons, density, theme, and responsive contracts.

Determine whether production and Storybook render the same implementation.
Story source that is not discoverable in the current Storybook index is not an
approved canonical capability.

### 3. Trace atomic composition

For each visible element, map:

```text
Visible element
-> canonical story/component
-> lower-level registered children
-> tokens and interaction primitives
-> owner and production consumers
```

Flag:

- orphan UI with no story or owner;
- a page, section, or pattern that privately recreates lower layers;
- monoliths that should be decomposed;
- duplicate responsibilities with different names;
- missing foundational components causing repeated workarounds;
- components that cannot identify their registered children;
- multiple official implementations of the same capability.

Do not demand decomposition when it would create meaningless fragments. Prefer
the lowest reusable abstraction with a clear responsibility.

### 4. Detect hardcoding, custom-made UI, and workarounds

Inspect for:

- raw interactive HTML replacing canonical controls;
- inline styles or raw color, spacing, type, radius, shadow, motion, or size;
- arbitrary Tailwind values or generic palette colors;
- page-specific CSS overriding shared behavior;
- local primitive forks, styled helpers, copied components, or deep imports;
- foreign icon imports or copied inline SVG;
- duplicated variants differing only by copy, icon, tone, or minor spacing;
- fixed layouts, overflow patches, hidden content, or conditional markup that
  conceals an architectural problem;
- production states absent from Storybook;
- vendor namespaces or intake source surviving in permanent code.

Classify every issue as a defect in the canonical owner, a missing shared
capability, a feature-owned composition need, or an unnecessary duplicate.

### 5. Evaluate reuse before creation

Apply this decision order with evidence:

```text
REUSE -> VARIANT -> EXTEND -> COMPOSE -> DOMAIN-ADAPT
-> FEATURE-OWN -> CREATE -> REJECT
```

Search Kura first. Only after proving a local gap, assess whether ReUI MCP or
Untitled UI offers a close pattern or implementation foundation.

For each external candidate, report:

- source and candidate name;
- purpose and behavioral similarity;
- reusable, redesigned, and discarded parts;
- Kura owner and atomic level;
- required token, icon, accessibility, responsive, content, and state binding;
- licence or source-reuse constraint where relevant;
- recommended intake decision.

Do not install or copy an external candidate during Phase A. Do not recommend
an external component merely because it looks similar.

When no suitable external candidate exists because the Kura requirement is
genuinely specific, recommend the smallest new canonical element. Build it
from Kura primitives, tokens, patterns, and interaction behavior; give it an
owner, complete stories, tests, and public export where reusable. Never create
a private page detail and call it a component.

### 6. Check backend and documentation compatibility

First classify backend relevance at the audited element's actual ownership
level. Do not infer that a component needs backend mapping merely because a
domain page consumes it.

Use one classification:

- `NO DOMAIN CONTRACT`: tokens, icons, typography, layout primitives, generic
  controls, generic overlays, and reusable presentational or interaction
  patterns whose API does not define Kura business fields, statuses,
  permissions, transitions, validation, side effects, or outcome claims.
- `DOMAIN CONTRACT REQUIRED`: the element displays or transforms backend-owned
  fields or statuses; initiates a business or clinical action; encodes legal
  transitions, permissions, tenancy, validation, errors, recovery, audit
  behavior, side effects, or success claims; or makes a domain decision.
- `DOMAIN RELEVANCE UNCLEAR`: available evidence does not show whether domain
  meaning belongs to the component or is supplied by a higher-level consumer.

Examples:

- A generic `Button`, `Badge`, `Dialog`, `Table`, or `EmptyState` is normally
  `NO DOMAIN CONTRACT`.
- An appointment-status badge that owns allowed status values, a cancel-booking
  confirmation that owns cancellation consequences, or a lab-result action
  that applies clinical permissions is `DOMAIN CONTRACT REQUIRED`.
- A generic dialog used by a cancellation flow remains `NO DOMAIN CONTRACT`;
  the feature-owned cancellation composition is the layer that requires the
  backend mapping.

For `NO DOMAIN CONTRACT`, do not inspect backend repositories, DTOs, services,
or ADRs. Record the classification and a short rationale, then continue the
Storybook, composition, visual, accessibility, interaction, and responsive
audit. Domain-flavoured example copy alone does not turn a generic component
into a domain component, but the story must not falsely present unsupported
behavior as real.

For `DOMAIN RELEVANCE UNCLEAR`, inspect the component API, canonical owner,
stories, and production consumers first. Escalate to backend inspection only
when that evidence shows the element owns domain meaning. Otherwise classify it
as `NO DOMAIN CONTRACT`. If ownership remains materially ambiguous, report the
uncertainty instead of inventing a contract mapping.

For `DOMAIN CONTRACT REQUIRED`, follow the backend compatibility gate in
`AGENTS.md`. Inspect the current default branch of
[`Kura-med/kura-platform`](https://github.com/Kura-med/kura-platform), including
the applicable docs, active ADRs, BFF endpoints and DTOs, gRPC contracts,
status types, guards, validation, tests, errors, and side effects.

Record the repository ref and exact paths consulted. Map UI fields, states,
actions, permissions, transitions, errors, and recovery paths to backend
support. Flag UI that invents unsupported business behavior or contradicts
current contracts.

Map the contract at the lowest layer that actually owns the domain semantics.
Do not duplicate the same backend audit across every generic child component.
Generic components must still avoid hardcoded domain states or actions that
silently turn them into domain owners.

### 7. Run Clean UI and minimalist review

State the user's immediate task in one sentence. Then assess:

- whether the primary action is obvious within three seconds;
- whether one decision area has multiple competing primary actions;
- whether hierarchy is limited to clear primary, secondary, and tertiary
  levels;
- whether proximity and alignment express relationships before containers;
- whether cards, borders, fills, shadows, dividers, or copy are redundant;
- whether labels describe consequences in plain language;
- whether advanced or rare options should use progressive disclosure;
- whether loading, empty, error, success, permission, stale, conflict, and
  recovery states are clear;
- whether mobile, touch, keyboard, focus, zoom, reflow, and realistic long
  content are supported;
- whether removing roughly 20 percent would improve clarity without weakening
  safety, confidence, or task completion.

Separate mandatory consistency fixes from optional UX improvements. Never
remove clinical, legal, financial, safety, permission, or consequence
information merely to make the UI look minimal.

### 8. Produce the audit report and stop

Use the report structure in [the audit rubric](references/audit-rubric.md).
Each actionable finding must include:

- stable finding ID;
- severity and evidence confidence;
- visible symptom and source evidence;
- violated rule;
- canonical owner or missing owner;
- atomic composition impact;
- user or system risk;
- recommended decision and smallest remediation;
- files or stories likely affected;
- whether user approval is required.

For every audited target, also record its backend-relevance classification:
`NO DOMAIN CONTRACT`, `DOMAIN CONTRACT REQUIRED`, or
`DOMAIN RELEVANCE UNCLEAR`, with the evidence supporting that decision. Exact
backend paths and repository refs are required only for
`DOMAIN CONTRACT REQUIRED`.

End Phase A with one explicit approval request naming the proposed scope. Do
not include implementation changes in the audit turn.

## Approved remediation workflow

After approval:

1. Re-read the approved findings and overlapping source.
2. Preserve unrelated user changes.
3. Choose the canonical owner and smallest correct reuse decision.
4. Extend or create lower-level elements before composing higher layers.
5. Add or update official Storybook stories before route integration.
6. Use the production implementation in Storybook.
7. Add required states, realistic content, mobile stories, accessibility, and
   interaction tests.
8. Complete ReUI or Untitled UI intake only through the temporary intake and
   Kura binding process when approved.
9. Update exports, consumers, deprecations, and migration guidance as needed.
10. Remove duplicates, workarounds, temporary intake, and dead code in the
    approved scope.
11. Run proportionate lint, type, unit, interaction, accessibility, Storybook,
    responsive, and ownership checks.
12. Report completed fixes, validation, and any remaining unapproved finding.

Do not claim success while an approved orphan, duplicate, workaround, missing
state, or Storybook/production divergence remains.
