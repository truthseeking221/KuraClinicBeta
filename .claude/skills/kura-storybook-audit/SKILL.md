---
name: kura-storybook-audit
description: "Audits every kura-platform UI location against Storybook as sole UI authority, selects exact best indexed component, and uses ReUI MCP as mandatory fallback plus remediation-planning handoff when no exact local match exists. Use for UI/code/screen/diff audits, Storybook coverage, Atomic Design compliance, hardcoded/custom UI, component selection, or Storybook-first remediation planning."
---

# kura-storybook-audit — Storybook UI Authority Gate

This skill is permanently read-only. Storybook defines approved UI; product code only consumes it. Explicit `REMEDIATE` scope produces a package for Pixel/engineering; auditor never edits or installs.

## Authority contract

- Authoring truth: stories matched by `libs/ui-kit/.storybook/main.ts`, their components, args, variants, states, compositions, manifest, and public exports.
- Discoverability proof: fresh `libs/ui-kit/storybook-static/index.json`; generated output is evidence, never edit target.
- Story source without fresh indexed story ID does not exist for product use.
- `DESIGN.md`, product docs, screenshots, Figma, app code, and ReUI explain intent or supply candidates; none override Storybook.
- Every UI location requires one evidence-ranked best component, variant, state, composition, and Atomic Design level—not merely a violation label.

## Atomic contract

Trace `Page/Flow/State → Template → Organism → Molecule → Atom → semantic DOM`.

- Atom = smallest styled/control leaf; raw DOM only inside atom.
- Molecule = task unit from indexed atoms; Organism = independent section; Template = data-neutral layout; Page/Flow/State = domain composition plus loading/empty/error/success/responsive/interaction states.
- Own fresh story required for any exported, externally imported, or independently styled/stateful/configurable/reusable unit and its public runtime variants/states. Private anatomy may be enumerated and exercised by parent story when it has no independent product contract. Foundations/tokens need Storybook docs.

## Workflow

1. **Scope.** Record routes, screens, files, states, personas. Read `.storybook/main.ts`; list matched roots.
2. **Freshness.** Invoke `nx-workspace`; inspect `pnpm nx show project @kura/ui-kit --json`; run `pnpm nx run @kura/ui-kit:build-storybook`. Failure/stale index → `SB-006`.
3. **Inventory.** Walk rendered JSX/imports downward; include overlays, icons, states, responsive alternatives.
4. **Choose exact Storybook UI.** Derive semantics, user goal, interaction, data/states, a11y, responsive behavior, atomic boundary. Rank fresh-index candidates from story args/docs and real component API. `LOCAL-EXACT` → name exact public component + variant/state/composition + IDs. Never select by appearance/name alone.
5. **Run mandatory ReUI fallback.** No local exact match → for full pages call `compose_page` first; otherwise `search` ranked candidates. Branch by result: component → `get_component`; example → `get_example` then `get_component` for `componentsUsed`; block → `get_block` then component APIs; icon → `get_icon`. Then `get_examples` where applicable → `get_install_command` → `get_project_context` for registry/base setup → Kura adaptation plan → `validate_usage` → `get_audit_checklist`. Record payload/provenance hash before adaptation, docs/preview, dependencies, plan/tier, and license evidence separately. Never expose key/token.
6. **Classify.** Outcome = `LOCAL-EXACT | REUI-EXACT | REUI-PARTIAL | REUI-MISSING | REUI-LICENSE-BLOCKED | DISCOVERY-BLOCKED | AMBIGUOUS`; score independent similarity/API/base/license/provenance/a11y/tokens/atomic/authorization/promotion gates. Only `LOCAL-EXACT` allows direct `Use <@kura/ui-kit export>`. Any local miss stays `SB-003`. `REUI-MISSING` = kit gap; `DISCOVERY-BLOCKED` = `INCOMPLETE`, not proven gap. Never hand-roll.
7. **Detect bypasses.** Find literal visual values, arbitrary utilities, inline styles, local styled controls/SVG/markup, direct third-party/ReUI imports, deep ui-kit imports, uncatalogued children, and story/product drift.
8. **Verify.** Trace current/recommended source, exact IDs, atomic chain, tokens, behavior, responsiveness. Run `pnpm nx run @kura/ui-kit:test`; capture commands/exits and runtime evidence. Green tests never erase findings.
9. **Alert/report.** Alert every newly confirmed root-cause blocker immediately; continue read-only inventory. Assign finding gates, then apply verdict precedence `FAIL > INCOMPLETE > PASS`.

## Audit versus remediation

- Pure audit: never install/edit. Report exact Storybook component, or ReUI candidate with preview/docs/provenance, mismatch, and file-level adaptation plan.
- Even with explicit fix/build scope, auditor stays read-only: output exact remediation package to Pixel/engineering, then re-audit their result. They install/adapt only under `libs/ui-kit`; never directly in `apps/**`.
- Preserve ReUI structure, real API, behavior, state, semantic DOM, and responsive geometry. Adapt only Kura context, `base-nova`/Phosphor conventions, semantic tokens, data boundaries, and evidence-required WCAG deviations. No invented props or duplicate ui-kit parts.
- Promotion: freeze payload/provenance hash → component → stories/variants/states/compositions → catalog manifest and any frozen count/hash fixtures → public export → tests/quality runner → ReUI validation/checklist → fresh index IDs → product public import.
- `get_project_context` proves config/setup only, never license entitlement. Premium/Ultimate require separately verified authorization; secrets stay outside source, logs, reports, commands, and responses.

## Immediate alert

```text
STORYBOOK UI BLOCKER — <SB-code>
<file:line> · <element> · Storybook: <verdict + exact IDs/MISSING>
Required UI: <component + variant/state/composition + atomic level>
ReUI: <outcome · item/type · preview/docs · payload hash · plan/tier · independent gate results>
Evidence: <literal/import/DOM> · Atomic break: <parent → node>
Direction: <exact Storybook use OR ui-kit adaptation plan OR kit-gap escalation>; product consumes only after fresh index proof.
```

Stop approval/release and mutation after alert; finish read-only report. No temporary hardcoding or app-local substitute.

## Findings and done

Codes, ranking/evidence rules, ReUI provenance, report schema, example: [audit checklist](references/audit-checklist.md). Default artifact: `_workspace/<slug>/07_storybook_ui_audit.md`.

Done when every location has `file:line`, required contract, current UI, ranked Storybook candidates, exact outcome/IDs or gap, ReUI provenance/hash and gate matrix when invoked, atomic chain, tokens, direction, and evidence. Remediation handoff additionally names ui-kit files, manifest/export/tests/count-hash updates, validation/checklist, fresh IDs, then product consumption.
