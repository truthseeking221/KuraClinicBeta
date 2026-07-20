# Package Manifest

## Package

```text
Name: kura-principal-interaction-designer
Version: 1.0.0
Language: English
Canonical entry: SKILL.md
Standalone entry: STANDALONE_SKILL.md
```

## Root files

| File | Purpose |
|---|---|
| `SKILL.md` | Canonical Agent Skill with progressive disclosure |
| `STANDALONE_SKILL.md` | Fully embedded single-file edition |
| `README.md` | Installation and usage guide |
| `MANIFEST.md` | Package inventory |
| `VALIDATION.md` | Validation results and ship evidence |
| `SHA256SUMS.txt` | File integrity hashes |

## References

| File | Purpose |
|---|---|
| `references/00-universal-constitution.md` | Universal principles and conflict hierarchy |
| `references/01-intake-and-diagnosis.md` | Intake, diagnosis, risk and outcome framing |
| `references/02-state-models-and-transition-contracts.md` | State machines, events, guards and invariants |
| `references/03-progressive-disclosure-and-hover-reveal.md` | Hover, focus, touch and contextual reveal |
| `references/04-feedback-causality-and-system-status.md` | Feedback loops and system truth |
| `references/05-motion-grammar-timing-and-easing.md` | Motion purpose, timing, easing and choreography |
| `references/06-direct-manipulation-gestures-and-physics.md` | Drag, swipe, gestures and interaction physics |
| `references/07-input-modality-and-ergonomics.md` | Pointer, touch, keyboard and assistive technology |
| `references/08-attention-orientation-and-spatial-continuity.md` | Attention, change blindness and spatial models |
| `references/09-latency-loading-and-optimistic-ui.md` | Latency, loading, autosave and optimistic behavior |
| `references/10-error-prevention-confirmation-undo-recovery.md` | Error prevention and recovery strategy |
| `references/11-accessibility-and-responsible-motion.md` | Responsible motion and accessibility |
| `references/12-design-system-patterns-and-tokens.md` | Interaction patterns, tokens and governance |
| `references/13-prototyping-testing-and-metrics.md` | Prototype levels, tests and metrics |
| `references/14-audit-rubric.md` | 100-point audit rubric and ship gate |
| `references/15-kura-high-risk-overlay.md` | Clinical, privacy and operational safeguards |
| `references/16-source-map.md` | Source foundations and concept mapping |

## Templates

| File | Purpose |
|---|---|
| `templates/interaction-brief.md` | Outcome-first interaction brief |
| `templates/microinteraction-spec.md` | Complete microinteraction specification |
| `templates/state-transition-matrix.md` | State and event contract |
| `templates/hover-reveal-spec.md` | Intent-aware hover reveal specification |
| `templates/storybook-interaction-contract.md` | Reusable component behavior contract |
| `templates/interaction-audit.md` | Audit worksheet |
| `templates/qa-checklist.md` | Implementation QA checklist |
| `templates/decision-log.md` | Interaction decision record |
| `templates/motion-tokens.json` | Motion token baseline |
| `templates/motion-tokens.schema.json` | JSON schema for motion tokens |
| `templates/audit-scores.example.json` | Audit scorer example input |

## Examples

| File | Purpose |
|---|---|
| `examples/01-hover-reveal-table-row.md` | Contextual row actions |
| `examples/02-hover-preview-card.md` | Intent-aware preview |
| `examples/03-inline-edit-and-autosave.md` | Async edit state truth |
| `examples/04-drag-reorder.md` | Direct manipulation with modality parity |
| `examples/05-loading-and-progress.md` | Latency and progress behavior |
| `examples/06-destructive-action.md` | Undo and confirmation policy |
| `examples/07-kura-clinical-status-and-hover.md` | High-risk Kura contextual detail pattern |

## Scripts

| File | Purpose |
|---|---|
| `scripts/validate_skill.py` | Validate package structure, frontmatter and links |
| `scripts/validate_motion_tokens.py` | Validate token values, references and policies |
| `scripts/score_interaction_audit.py` | Calculate audit score and ship decision |
| `scripts/build_standalone.py` | Rebuild standalone edition |
