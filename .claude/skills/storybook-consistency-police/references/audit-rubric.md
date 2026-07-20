# Storybook Consistency Audit Rubric

Use this rubric for every audit. Keep the report concise, but do not omit
evidence, ownership, composition, or approval boundaries.

## 1. Severity

### `P0` — unsafe or contract-breaking

Use for clinical-safety failures, incorrect permissions, destructive-action
risks, backend-contract contradictions, exposed sensitive data, inaccessible
critical workflows, or production behavior that can cause material harm.

### `P1` — system integrity failure

Use for orphan UI, duplicate canonical responsibilities, permanent vendor
namespaces, local primitive forks, raw interactive replacements, Storybook and
production divergence, unsupported state transitions, or foundational
accessibility failures.

### `P2` — composition or UX contract failure

Use for hardcoded visual values, wrong abstraction level, missing states,
responsive failures, inconsistent behavior, unclear hierarchy, repeated
workarounds, or incomplete atomic traceability.

### `P3` — polish and simplification opportunity

Use for redundant containers, visual noise, weak copy, excessive emphasis,
minor spacing rhythm, progressive disclosure opportunities, or non-blocking
consistency improvements.

## 2. Evidence confidence

- `CONFIRMED`: direct source, story, export, test, or contract evidence.
- `STRONG INFERENCE`: multiple supporting signals with no direct source proof.
- `VISUAL SUSPICION`: screenshot symptom requiring code confirmation.
- `NOT VERIFIABLE`: evidence unavailable; never phrase as a confirmed defect.

## 3. Structural audit checklist

### Canonical existence

- Does the item have one official name, owner, implementation, and story?
- Is it discoverable in the fresh Storybook index?
- Does production consume the exact implementation shown in Storybook?
- Are component, story, test, export, and owner colocated or clearly linked?

### Atomic composition

- What hierarchy level does the item occupy?
- Which lower-level registered elements compose it?
- Does it recreate a primitive or pattern privately?
- Is it a monolith hiding reusable responsibilities?
- Would further decomposition create useful contracts or meaningless pieces?
- Can consumers trace the item down to tokens and primitives?
- Can lower-level elements identify meaningful consumers?

### Duplication and gaps

- Is the same responsibility implemented under another name?
- Does the difference reduce to copy, icon, status tone, spacing, or source?
- Is a repeated workaround evidence of a missing canonical component?
- Should the resolution be reuse, extension, composition, promotion,
  feature ownership, creation, deprecation, or rejection?

### Hardcoding and workaround detection

- Raw controls, inline styles, arbitrary values, generic palette classes.
- Local CSS overrides, copied components, local variants, deep imports.
- Foreign icon packages, copied SVG, emoji as operational icons.
- Fixed dimensions or overflow patches without a component contract.
- Conditional markup hiding a shared-component API problem.
- Missing story states or page-first extraction.

## 4. Product quality checklist

### Clean UI

- Can the primary task be stated in one sentence?
- Is the main action obvious within three seconds?
- Is there one dominant action per decision area?
- Does reading order follow context, decision, action, then support?
- Are relationships expressed with proximity and alignment first?
- Does every card, border, fill, divider, and shadow add meaning?
- Are type, color, spacing, radius, and elevation semantic and canonical?
- Are actions, statuses, consequences, and recovery understandable?

### Minimalist

- Does every element help users understand, decide, trust, or complete?
- Is content duplicated or explaining a confusing interface?
- Can roughly 20 percent be removed without weakening meaning?
- Can secondary information move behind progressive disclosure?
- Is copy short, human, concrete, and outcome-oriented?
- Are safety and trust details preserved even when simplifying?

### States and accessibility

- Default, hover, focus, active, selected, loading, disabled.
- Empty, partial, success, warning, critical, error, permission, read-only.
- Stale, conflict, offline, retry, recovery, and unsaved changes where relevant.
- Keyboard navigation, focus management, screen-reader labels, announcements.
- Contrast, non-color status signals, zoom, reflow, reduced motion.

### Responsive behavior

- Mobile task and minimum usable width are defined.
- Primary action and critical information remain reachable.
- Reflow, stacking, reordering, disclosure, and overflow are intentional.
- Touch targets are at least 44 by 44 pixels and safely separated.
- No hover dependency, clipping, overlap, accidental truncation, or hidden
  clinical information.
- Official mobile stories and realistic long-content states exist.

## 5. External candidate assessment

Search Kura before ReUI or Untitled UI. For each credible candidate record:

| Field | Required answer |
| --- | --- |
| Candidate | Source and component or pattern name |
| Match | Shared purpose, behavior, data, and state model |
| Local alternatives | Existing Kura stories or components considered |
| Reuse | Parts worth retaining |
| Redesign | Kura-specific behavior, content, IA, safety, and styling changes |
| Discard | Demo or unsuitable parts to remove |
| Ownership | Final Kura owner and hierarchy level |
| Decision | Reuse, extend, compose, domain-adapt, create, or reject |
| Risk | Licence, accessibility, responsive, backend, or duplication risk |

Do not list visually similar candidates that cannot support the real task.

## 6. Backend compatibility record

For domain UI record:

| Field | Required answer |
| --- | --- |
| Repository ref | Default-branch commit or ref inspected |
| Docs | README, docs index, active ADRs, architecture, design specs |
| Browser boundary | Persona BFF and REST endpoint or `NONE` |
| Contracts | DTOs, gRPC messages, status types, validation |
| Authorization | Role, permissions, tenant/context, flags |
| State model | Supported states and legal transitions |
| Failure model | Error responses, retry, recovery, conflict |
| Consequences | Audit, events, notifications, downstream side effects |
| UI mapping | Fields, actions, labels, states, and stories supported |

If the target is a generic primitive, write `NO DOMAIN CONTRACT`.

## 7. Finding format

Use one record per actionable issue:

```markdown
### [P1-01] Orphan status treatment

- Evidence: CONFIRMED
- Target: Clinic/Reception/CheckInRow
- Source: `path/to/file.tsx:42`
- Rule: No orphan UI; reuse canonical StatusBadge
- Observation: A local styled span duplicates the registered badge behavior.
- Composition: Section -> local span; expected Section -> StatusBadge -> Badge.
- Risk: Status semantics, accessibility, and variants can diverge.
- Decision: EXTEND
- Smallest remediation: Add the missing `awaiting-check-in` tone to the
  canonical owner, cover it in Storybook, then replace the local span.
- Likely scope: status badge, story, test, reception consumer.
```

Use exact clickable file links in user-facing Codex output when local files are
available.

## 8. Required report structure

### Verdict

State whether the target is:

- `CONSISTENT`;
- `CONSISTENT WITH IMPROVEMENTS`;
- `STRUCTURALLY INCONSISTENT`;
- `BLOCKED BY SAFETY OR BACKEND CONTRACT`;
- `NOT VERIFIABLE`.

### Composition map

Show the current and expected hierarchy. Mark orphan, duplicate, workaround,
or missing foundation points.

### Findings

List findings in severity order. Do not dilute confirmed structural defects
with cosmetic commentary.

### ReUI or Untitled UI opportunities

List only credible candidates after local reuse has been evaluated. State
`NONE RECOMMENDED` when Kura-specific creation or local extension is better.

### Clean UI and minimalist advice

Separate required fixes from optional improvements. Explain what could be
removed, merged, clarified, reordered, or progressively disclosed.

### Proposed remediation scope

Name:

- findings to fix;
- canonical owners affected;
- stories and states to add;
- tests and validation to run;
- migrations or deprecations expected;
- anything intentionally excluded.

### Approval gate

End with:

> No files have been changed. Approve all findings, specific finding IDs, or
> the proposed remediation scope before implementation begins.

Do not continue into implementation in the same audit response.
