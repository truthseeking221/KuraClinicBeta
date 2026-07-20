#!/usr/bin/env python3
"""Build a single-file edition by embedding references, templates and examples."""

from __future__ import annotations

import argparse
from pathlib import Path


def append_markdown(parts: list[str], title: str, path: Path) -> None:
    parts.append("\n\n---\n\n")
    parts.append(f"# {title}\n\n")
    parts.append(f"Embedded from `{path.name}`.\n\n")
    parts.append(path.read_text(encoding="utf-8").strip())
    parts.append("\n")


def append_code(parts: list[str], title: str, path: Path, language: str) -> None:
    parts.append("\n\n---\n\n")
    parts.append(f"# {title}\n\n")
    parts.append(f"Embedded from `{path.name}`.\n\n")
    parts.append(f"```{language}\n")
    parts.append(path.read_text(encoding="utf-8").rstrip())
    parts.append("\n```\n")


def build(root: Path, output: Path) -> None:
    parts: list[str] = []
    canonical = (root / "SKILL.md").read_text(encoding="utf-8").rstrip()
    parts.append(canonical)
    parts.append(
        "\n\n---\n\n# Embedded Knowledge Library\n\n"
        "This standalone edition embeds the package references, templates and examples. "
        "The canonical progressive-disclosure edition remains `SKILL.md`.\n"
    )

    for path in sorted((root / "references").glob("*.md")):
        append_markdown(parts, f"Reference: {path.stem}", path)

    for path in sorted((root / "templates").glob("*")):
        if path.suffix == ".md":
            append_markdown(parts, f"Template: {path.stem}", path)
        elif path.suffix == ".json":
            append_code(parts, f"Template: {path.stem}", path, "json")

    for path in sorted((root / "examples").glob("*.md")):
        append_markdown(parts, f"Example: {path.stem}", path)

    output.write_text("".join(parts).rstrip() + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "root",
        nargs="?",
        type=Path,
        default=Path(__file__).resolve().parents[1],
    )
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    root = args.root.resolve()
    output = args.output or root / "STANDALONE_SKILL.md"
    build(root, output)
    print(f"Built: {output}")
    print(f"Bytes: {output.stat().st_size}")
    print(f"Lines: {len(output.read_text(encoding='utf-8').splitlines())}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
