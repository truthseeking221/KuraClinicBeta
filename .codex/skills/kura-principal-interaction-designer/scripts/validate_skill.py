#!/usr/bin/env python3
"""Validate the canonical Kura interaction skill package.

The validator intentionally relies only on Python's standard library so it can
run in restricted agent environments.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REQUIRED_REFERENCES = [
    "references/00-universal-constitution.md",
    "references/01-intake-and-diagnosis.md",
    "references/02-state-models-and-transition-contracts.md",
    "references/03-progressive-disclosure-and-hover-reveal.md",
    "references/04-feedback-causality-and-system-status.md",
    "references/05-motion-grammar-timing-and-easing.md",
    "references/06-direct-manipulation-gestures-and-physics.md",
    "references/07-input-modality-and-ergonomics.md",
    "references/08-attention-orientation-and-spatial-continuity.md",
    "references/09-latency-loading-and-optimistic-ui.md",
    "references/10-error-prevention-confirmation-undo-recovery.md",
    "references/11-accessibility-and-responsible-motion.md",
    "references/12-design-system-patterns-and-tokens.md",
    "references/13-prototyping-testing-and-metrics.md",
    "references/14-audit-rubric.md",
    "references/15-kura-high-risk-overlay.md",
    "references/16-source-map.md",
]

REQUIRED_TEMPLATES = [
    "templates/interaction-brief.md",
    "templates/microinteraction-spec.md",
    "templates/state-transition-matrix.md",
    "templates/hover-reveal-spec.md",
    "templates/storybook-interaction-contract.md",
    "templates/motion-tokens.json",
    "templates/motion-tokens.schema.json",
]

REQUIRED_EXAMPLES = [
    "examples/01-hover-reveal-table-row.md",
    "examples/03-inline-edit-and-autosave.md",
    "examples/07-kura-clinical-status-and-hover.md",
]

REQUIRED_SCRIPTS = [
    "scripts/validate_skill.py",
    "scripts/validate_motion_tokens.py",
    "scripts/score_interaction_audit.py",
    "scripts/build_standalone.py",
]


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError("SKILL.md must begin with YAML frontmatter")

    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration as exc:
        raise ValueError("YAML frontmatter has no closing delimiter") from exc

    data: dict[str, str] = {}
    for raw in lines[1:end]:
        if not raw or raw.startswith(" ") or ":" not in raw:
            continue
        key, value = raw.split(":", 1)
        value = value.strip().strip('"').strip("'")
        data[key.strip()] = value

    return data, "\n".join(lines[end + 1 :])


def markdown_links(text: str) -> list[str]:
    return re.findall(r"\[[^\]]+\]\(([^)]+)\)", text)


def validate(root: Path) -> tuple[list[str], list[str], dict[str, int | str]]:
    errors: list[str] = []
    warnings: list[str] = []
    stats: dict[str, int | str] = {}

    skill = root / "SKILL.md"
    if not skill.exists():
        return ["Missing SKILL.md"], warnings, stats

    text = skill.read_text(encoding="utf-8")
    line_count = len(text.splitlines())
    stats["skill_lines"] = line_count
    if line_count > 500:
        errors.append(f"SKILL.md has {line_count} lines; canonical skill must be <= 500")

    try:
        frontmatter, body = parse_frontmatter(text)
    except ValueError as exc:
        errors.append(str(exc))
        frontmatter, body = {}, text

    name = frontmatter.get("name", "")
    description = frontmatter.get("description", "")
    stats["name"] = name
    stats["description_characters"] = len(description)

    if name != root.name:
        errors.append(f"Frontmatter name '{name}' must match directory '{root.name}'")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name):
        errors.append("Frontmatter name must use lowercase kebab-case")
    if not 40 <= len(description) <= 1024:
        errors.append("Description should be between 40 and 1024 characters")
    if "interaction" not in description.lower():
        warnings.append("Description does not contain the word 'interaction'")

    required_sections = [
"Mission",
"When to activate",
        "State",
        "Hover",
        "Accessibility",
        "Output contract",
        "Audit",
    ]
    for section in required_sections:
        if section.lower() not in body.lower():
            errors.append(f"Missing required concept or section: {section}")

    required = REQUIRED_REFERENCES + REQUIRED_TEMPLATES + REQUIRED_EXAMPLES + REQUIRED_SCRIPTS
    for relative in required:
        path = root / relative
        if not path.is_file():
            errors.append(f"Missing required file: {relative}")
        elif path.stat().st_size < 80:
            errors.append(f"Required file is suspiciously small: {relative}")

    links = markdown_links(text)
    local_links = []
    for link in links:
        if link.startswith(("http://", "https://", "mailto:", "#")):
            continue
        target = link.split("#", 1)[0]
        if not target:
            continue
        local_links.append(target)
        if target.startswith("/"):
            errors.append(f"Local link must be relative, not absolute: {link}")
            continue
        if not (root / target).exists():
            errors.append(f"Broken local link in SKILL.md: {link}")

    stats["local_links"] = len(local_links)
    stats["reference_files"] = len(list((root / "references").glob("*.md")))
    stats["template_files"] = len(list((root / "templates").glob("*")))
    stats["example_files"] = len(list((root / "examples").glob("*.md")))
    stats["script_files"] = len(list((root / "scripts").glob("*.py")))

    for directory in ["references", "templates", "examples", "scripts"]:
        path = root / directory
        if not path.is_dir():
            errors.append(f"Missing directory: {directory}")

    source_map = root / "references/16-source-map.md"
    if source_map.exists():
        source_text = source_map.read_text(encoding="utf-8").lower()
        for source in ["don norman", "val head", "everett mckay", "josh clark", "jeff johnson"]:
            if source not in source_text:
                errors.append(f"Source map missing foundational source: {source}")

    return errors, warnings, stats


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "root",
        nargs="?",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="Skill package root",
    )
    args = parser.parse_args()
    root = args.root.resolve()

    errors, warnings, stats = validate(root)

    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}")

    if errors:
        print(f"FAILED: {root.name} ({len(errors)} error(s))")
        return 1

    print(f"OK: {root.name}")
    print(f"  SKILL.md lines: {stats['skill_lines']}")
    print(f"  Description characters: {stats['description_characters']}")
    print(f"  Local links: {stats['local_links']}")
    print(f"  References: {stats['reference_files']}")
    print(f"  Templates: {stats['template_files']}")
    print(f"  Examples: {stats['example_files']}")
    print(f"  Scripts: {stats['script_files']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
