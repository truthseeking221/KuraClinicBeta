# Storybook UI audit checklist

## Finding codes and gate

| Code | Severity | Finding | Gate |
| --- | --- | --- | --- |
| `SB-001` | BLOCKER | Hardcoded visual decision outside Storybook/token contract: color, dimension, spacing, radius, shadow, type, breakpoint, z-index, animation, arbitrary utility, inline style | FAIL immediately |
| `SB-002` | BLOCKER | App-local styled control, copied markup/SVG, direct third-party primitive, or duplicate catalog component | FAIL immediately |
| `SB-003` | BLOCKER | Required story-eligible component/child/variant/interaction/responsive/data state missing from fresh index | FAIL immediately; run ReUI fallback |
| `SB-004` | HIGH | Atomic chain broken, wrong level, raw styled DOM above atom, or composite hides uncatalogued child | FAIL |
| `SB-005` | HIGH | Product render drifts from indexed structure, args, tokens, or behavior | FAIL |
| `SB-006` | BLOCKER | Storybook build fails; story excluded; index stale/unreadable; catalog entry cannot render | FAIL immediately |
| `SB-007` | MEDIUM | Naming/docs/trace gap while UI remains fully catalogued and behavior-identical | PASS allowed with debt |
| `SB-008` | BLOCKER | Current UI is wrong while evidence proves an `EXACT` Storybook replacement | FAIL immediately |
| `SB-009` | HIGH | Mandatory ReUI fallback after local miss is skipped/blocked/incomplete: missing ranked search, typed API/composition, preview/docs, payload hash, base/config, separate license evidence, install provenance, validation, or checklist | INCOMPLETE unless existing `SB-003` or another finding forces FAIL |
| `SB-010` | BLOCKER | Unauthorized ReUI install/adaptation/promotion/consumption; direct `apps/**` use; pre-index use; or candidate promoted while any required gate is failed/unknown | FAIL immediately |
| `SB-012` | BLOCKER | Complete discovery confirms no safe ReUI match, or hand-roll/local substitute is proposed for the gap | FAIL; record kit gap |

`INFO` records compliant mappings. Never downgrade `SB-001`–`SB-003`, `SB-010`, or `SB-012` because output looks correct. Never omit `SB-009` evidence gap.

## Verdict taxonomy

Record outcome plus independent gates per location:

1. **Outcome:**
   - `LOCAL-EXACT`: exact indexed component/composition plus every required variant/state/node has fresh IDs. Only this permits direct `Use <public @kura/ui-kit export>`.
   - `REUI-EXACT`: ReUI real API/composition exactly meets need, but must be imported/adapted and promoted Storybook-first before use.
   - `REUI-PARTIAL`: closest ReUI item needs bounded Kura adaptation or missing state; never direct product use.
   - `REUI-MISSING`: complete ranked discovery proves no viable candidate; `SB-012` kit gap.
   - `REUI-LICENSE-BLOCKED`: candidate qualifies technically; required entitlement/authorization is not verified.
   - `DISCOVERY-BLOCKED`: ReUI MCP/evidence unavailable; overall `INCOMPLETE` unless `SB-003` or another finding already forces `FAIL`. Not proof of kit gap.
   - `AMBIGUOUS`: evidence cannot separate candidates; `INCOMPLETE`, name discriminating proof.
2. **Independent ReUI gates:**
   - similarity: `EXACT | PARTIAL | NONE | UNKNOWN`;
   - API: `VERIFIED | MISMATCH | UNKNOWN`; base: `BASE-NOVA-COMPATIBLE | MISMATCH | UNKNOWN`;
   - license: `NOT-REQUIRED | ENTITLED-NOT-DISCLOSED | REQUIRED-UNVERIFIED | UNKNOWN`;
   - provenance: `PAYLOAD-HASHED | MISSING`; a11y/tokens/atomic: `COMPATIBLE | ADAPTATION-REQUIRED | FAILED | UNKNOWN`;
   - authorization: `AUDIT-ONLY | REMEDIATION-AUTHORIZED | UNAUTHORIZED`;
   - promotion: `LOCAL-INDEXED | PENDING-UI-KIT | STORYBOOK-READY | PREINDEX-BYPASS`.
     Never collapse one gate into another. Only promotion after every required gate is non-failing/non-unknown.
3. **Remediation state:** `AUDIT-ONLY | AUTHORIZED-PENDING | UI-KIT-IN-PROGRESS | STORYBOOK-READY | PRODUCT-CONSUMED | BLOCKED-LICENSE | BLOCKED-KIT-GAP | DISCOVERY-BLOCKED`.

Assign each finding's table gate, then apply precedence `FAIL > INCOMPLETE > PASS`. ReUI outcome never erases `SB-003`; after promotion and fresh IDs, re-audit may become `LOCAL-EXACT`.

## Exact component recommendation

Describe UI need before component name. Required proofs:

1. semantic purpose and user goal;
2. interaction model;
3. states plus data/content shape;
4. a11y contract: semantic DOM, keyboard, focus, labels, announcements;
5. responsive behavior and surrounding surface;
6. atomic role, parent/child boundary, reuse scope;
7. exact fresh IDs for every recommended Storybook node/variant/state;
8. plausible alternatives rejected by higher-ranked mismatch.

Search all roots matched by `.storybook/main.ts`; inspect fresh index title/name/tags, story args/docs, component props/implementation. Rank: semantics/user action → interaction/a11y → states/data/responsive → atomic fit → Kura tokens/surface. Visual/name similarity is insufficient. Record resolution `SINGLE-COMPONENT | REUSABLE-COMPOSITION` separately.

Own indexed story is required only when unit is exported, externally imported, or independently styled/stateful/configurable/reusable. Private anatomy without independent product contract may be enumerated, exercised, and asserted by parent story; do not manufacture leaf stories for implementation-only wrappers.

## Mandatory ReUI fallback evidence

For each non-`LOCAL-EXACT` location, perform and record this order:

1. Full page → `compose_page` first with one surface. Otherwise `search`: query from required contract; rank `component | example | block | icon`. Capture candidates, scores/coverage, rejection reasons, surface, preview/docs, dependencies, free/required plan.
2. Branch by returned type: `component → get_component`; `example → get_example`; `block → get_block`; `icon → get_icon`. Then call `get_component` for every `componentsUsed`. No invented item, component, or prop.
3. `get_examples` for component composition; select closest worked example and capture exact name/preview.
4. `get_install_command`: record validated exact `pnpm` command as evidence. During audit, do not execute it.
5. Freeze raw selected payload plus provenance hash. `get_project_context` proves registry/setup only: compare with `libs/ui-kit/components.json` (`base-nova`, Phosphor), package manager, surface/icon consistency. Verify license entitlement/authorization through separate approved evidence; never infer it from config or env-reference presence.
6. Write exact Kura adaptation plan: target `libs/ui-kit` files; preserve ReUI structure, API, behavior, states, semantic DOM, and responsive geometry; remove demo/domain coupling; adapt semantic colors/context, neutral data boundary, `base-nova`/Phosphor conventions, and only evidence-required WCAG deviations. Name atomic level/children, stories, manifest/export/tests/quality-runner updates, including frozen counts/hashes affected by added scope.
7. `validate_usage`: validate planned component names, registry items, and props before code; undocumented prop = revise plan, not invent.
8. `get_audit_checklist`: add component-specific checks to acceptance evidence.

Provenance record: MCP server `ReUI`; query/time; raw payload hash; selected item/name/type; candidate rank; typed metadata/API components; example; docs/preview URLs; install command; dependencies; free/required plan; `base-nova`; surface; Phosphor; separate license evidence `NOT-REQUIRED | VERIFIED-NOT-DISCLOSED | REQUIRED-UNVERIFIED`; validation; checklist.

Complete search with no match → `REUI-MISSING`, `SB-012`, `BLOCKED-KIT-GAP`, design-system-owner escalation. MCP outage/incomplete evidence → `DISCOVERY-BLOCKED`, `SB-009`, exact retry need; never claim kit gap. Premium candidate without separately verified authorization → `REUI-LICENSE-BLOCKED`; report tier/free alternatives, never secret. No path permits local substitute.

## Audit versus remediation handoff

- **Pure audit:** source, Storybook build/index, and ReUI discovery are read-only. Output exact indexed component or ReUI candidate/provenance plus file-level adaptation plan. No install, source edit, generated-file edit, app replacement, or secret mutation.
- **Requested fix/build:** auditor still only writes handoff; Pixel/engineering executes. Install only from `libs/ui-kit` with verified command/config. Review generated diff; keep/adapt reusable code under `libs/ui-kit`; never install/import registry code directly in `apps/**`. Auditor then re-audits.
- Promotion order: freeze payload/hash → preserve component API/DOM/behavior/geometry → Kura context/tokens/data/a11y adaptation → variants/states/compositions stories → catalog manifest + frozen count/hash fixtures → public export → focused tests/quality runner → `validate_usage` → ReUI checklist → ui-kit test → fresh Storybook IDs → product public import/use → product verification.
- Product cannot consume a ReUI URL, registry path, private/deep path, generated demo, or unindexed ui-kit component. Fresh Storybook index is promotion gate.

## Evidence standard and bypass checks

Each finding contains product `file:line`; rendered element; exact JSX/import/literal/DOM fact; story source + exact fresh ID or `MISSING`; atomic chain; required contract; ranked candidates; recommendation/verdicts; rejection rationale; ReUI provenance/status when required; smallest allowed direction; `OPEN | FIXED | ACCEPTED-DEBT` (`BLOCKER` cannot be debt).

Check:

- TSX: `style={{...}}`, visual constants, local control functions, styled raw controls above atoms, inline SVG/path, copied class bundles.
- CSS/Tailwind: literal color/px/rem/shadow/radius/font/motion/media query, arbitrary `[value]`, raw palette. Token definitions allowed; consumers need semantic tokens.
- Imports: direct ReUI/headless/UI package outside `libs/ui-kit`, deep/private ui-kit path, app duplicate.
- Coverage: disabled/invalid/loading/empty/error/success, overlays, keyboard/focus, responsive, light/dark/density, runtime prop combinations.
- Composition: indexed wrapper hides local child, story helper leaks to production, fixture structure diverges from product.

Runtime visual-drift claim needs screenshot/DOM selector. Screenshot never proves provenance; source never proves fresh discoverability. Record Storybook command, timestamp/hash, exit; tests cannot erase finding.

## Report schema

```markdown
# Storybook UI audit — <scope>

Mode: AUDIT-ONLY
Requested follow-up: NONE | REMEDIATION-HANDOFF-TO-PIXEL-ENGINEERING
Verdict: PASS | FAIL | INCOMPLETE
Catalog: `pnpm nx run @kura/ui-kit:build-storybook` → <exit>; index <timestamp/hash>
Verification: `<commands>` → <exit>; runtime <verified | unavailable: reason>

## Immediate alerts issued
- <order/time> · <SB-code> · <file:line> · Storybook <exact IDs/MISSING> · outcome <LOCAL/REUI...> · ReUI <item/type + preview/docs + payload hash + gates> · direction <exact use/adaptation/kit gap/retry>

## Coverage
| UI need | File:line | Required contract | Current UI | Storybook candidates | Exact recommendation/form | Atomic level | Fresh IDs | Outcome | ReUI provenance/hash | Gate matrix | Remediation state | Rejections | Result |

## ReUI fallback ledger
| UI location | Query | Ranked typed candidates | Winner/API/example | Preview/docs | Payload hash/install provenance | Base/config/surface/icon | License evidence | Gate matrix | Validation/checklist | Exact Kura ui-kit adaptation plan |

## Findings
| ID | Severity | Code | File:line | UI evidence | Required UI | Storybook proof | ReUI proof/status | Atomic break | Allowed direction | Status |

## Evidence gaps
- <unverified claim + reason + exact next proof>
```

## Concrete examples

### Exact Storybook replacement

Current app renders custom `<button style={{ background: '#268cff' }}>Save</button>`. Report `SB-001` + `SB-002`. If fresh index/API prove exact `Button` save-action variant/state, report `SB-008`, outcome `LOCAL-EXACT`, and `Use Button <variant/state>` with exact IDs/public export. No ReUI lookup needed.

### Storybook gap → real ReUI candidate, audit-only

Location needs a sortable/filterable specimen worklist with pagination, loading, empty, wide-table scrolling, and stable row identity. No exact indexed composition: `SB-003`.

ReUI evidence sequence returns ranked `data-grid` over `sortable`; real `DataGrid` API documents `table`, `recordCount`, `isLoading`, `emptyMessage`, `DataGridScrollArea`, sorting/filter helpers, and stable `getRowId` guidance; `c-data-grid-1` proves pagination composition; item is free. Preview `https://reui.io/components/data-grid`; docs `https://reui.io/docs/components/base/data-grid`; verified install provenance `pnpm dlx shadcn@latest add @reui/data-grid`.

Audit result: outcome `REUI-EXACT` only if all independent gates pass; otherwise `REUI-PARTIAL` or a blocked outcome. Remediation `AUDIT-ONLY`; no files changed. Plan: Pixel/engineering freezes payload/hash, adapts only in `libs/ui-kit` as reusable organism while preserving ReUI API/DOM/behavior/geometry, applies Kura semantic tokens and neutral data contract, then adds populated/loading/empty/error/wide-responsive/keyboard stories, stories for eligible reusable children, manifest/count-hash fixtures, export, tests/quality runner, validation/checklist, and fresh index before public app import.

### No ReUI evidence

Complete discovery with zero viable result → `REUI-MISSING`, `SB-012`, `BLOCKED-KIT-GAP`. Unavailable MCP → `DISCOVERY-BLOCKED`, `SB-009`, exact retry required; existing `SB-003` still controls local miss. Neither permits app-local component, copied markup, or guessed install.
