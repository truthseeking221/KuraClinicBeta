# Validation Report

## Package

```text
Name: kura-principal-interaction-designer
Version: 1.0.0
Validation date: 2026-07-17
Canonical entry: SKILL.md
```

## Structural validation

Command:

```bash
python scripts/validate_skill.py
```

Result:

```text
OK: kura-principal-interaction-designer
  SKILL.md lines: 474
  Description characters: 446
  Local links: 20
  References: 17
  Templates: 11
  Examples: 7
  Scripts: 4
```

Validated conditions:

* YAML frontmatter exists and closes correctly.
* Skill name matches the package directory.
* Canonical `SKILL.md` remains below 500 lines.
* Required knowledge modules exist.
* Required templates, examples and scripts exist.
* Canonical local links resolve.
* Source map includes the principal foundations.

## Motion-token validation

Command:

```bash
python scripts/validate_motion_tokens.py
```

Result:

```text
OK: templates/motion-tokens.json
  Leaf values: 101
  Token references: 49
```

Validated conditions:

* Primitive duration scale is nondecreasing.
* Numeric durations and delays are nonnegative.
* Internal token references resolve.
* Token references resolve to leaf values.
* Hover intent and exit grace tokens exist.
* Motion policies require nonblocking, interruptible behavior.
* Reduced motion removes large spatial movement while preserving state meaning.

## JSON Schema validation

The motion token file was validated against `templates/motion-tokens.schema.json` using the Draft 2020-12 JSON Schema validator.

```text
JSON Schema validation: OK
```

## Audit scorer validation

Command:

```bash
python scripts/score_interaction_audit.py templates/audit-scores.example.json
```

Result:

```text
Total: 88.0/100
Blockers: 0
Critical: 0
Decision: PASS
```

The scorer enforces:

* Total score of at least 85.
* Zero blockers.
* Zero critical findings.
* Minimum category gates for state feedback, modality accessibility, and control recovery.

## Python validation

Command:

```bash
python -m py_compile scripts/*.py
```

Result:

```text
Python compilation: OK
```

## Markdown-link validation

All local Markdown links outside the generated standalone file were checked relative to their containing files.

```text
Markdown local links: OK (20)
```

## Standalone build

Command:

```bash
python scripts/build_standalone.py
```

Result:

```text
Built: STANDALONE_SKILL.md
Bytes: 180432
Lines: 7804
```

The standalone edition embeds:

* Canonical instructions.
* 17 reference modules.
* 11 templates.
* 7 applied examples.

## Package inventory

```text
Files before hashes and this report: 43
Canonical lines: 474
Reference lines: 4653
Template lines: 1656
Example lines: 729
Script lines: 551
```

## Content gates

The package includes explicit gates against:

* Primary actions available only on hover.
* Critical meaning available only through motion, color or gesture.
* Pending states presented as committed states.
* Blocking or noninterruptible animation.
* Missing keyboard or touch equivalents.
* Missing reduced-motion behavior.
* Recoverable errors that discard user work.
* Accidental reveal of sensitive Kura information.
* High-risk optimistic confirmation without authoritative evidence.

## Installed-package integrity

Individual package-file hashes are recorded in `SHA256SUMS.txt`. The canonical
Codex and Claude Code installations are compared recursively after installation.

## Final decision

```text
PASS
```

The package is structurally complete, internally linked, reproducible, token-valid, script-valid and ready for installation.
