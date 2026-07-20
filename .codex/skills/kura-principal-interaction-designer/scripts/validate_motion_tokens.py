#!/usr/bin/env python3
"""Validate Kura motion tokens and their internal token references."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


TOKEN_PATTERN = re.compile(r"^\{([a-zA-Z0-9_.-]+)\}$")


def walk_values(value: Any, path: str = ""):
    if isinstance(value, dict):
        for key, child in value.items():
            child_path = f"{path}.{key}" if path else key
            yield from walk_values(child, child_path)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            yield from walk_values(child, f"{path}[{index}]")
    else:
        yield path, value


def resolve(data: dict[str, Any], token_path: str) -> Any:
    current: Any = data
    for part in token_path.split("."):
        if not isinstance(current, dict) or part not in current:
            raise KeyError(token_path)
        current = current[part]
    return current


def validate(data: dict[str, Any]) -> tuple[list[str], list[str], dict[str, int]]:
    errors: list[str] = []
    warnings: list[str] = []
    stats = {"leaf_tokens": 0, "references": 0}

    for key in ["meta", "primitive", "semantic", "component", "reducedMotion", "policies"]:
        if key not in data:
            errors.append(f"Missing top-level section: {key}")

    primitive = data.get("primitive", {})
    duration = primitive.get("duration", {}) if isinstance(primitive, dict) else {}
    expected_order = ["instant", "acknowledge", "micro", "standard", "context", "emphasis"]
    last = -1.0
    for key in expected_order:
        value = duration.get(key)
        if not isinstance(value, (int, float)):
            errors.append(f"primitive.duration.{key} must be numeric")
            continue
        if value < 0:
            errors.append(f"primitive.duration.{key} must be non-negative")
        if value < last:
            errors.append("Primitive duration scale must be non-decreasing")
        last = float(value)

    for path, value in walk_values(data):
        stats["leaf_tokens"] += 1
        if isinstance(value, str):
            match = TOKEN_PATTERN.match(value)
            if match:
                stats["references"] += 1
                token_path = match.group(1)
                try:
                    resolved = resolve(data, token_path)
                except KeyError:
                    errors.append(f"Unresolved token reference at {path}: {value}")
                    continue
                if isinstance(resolved, (dict, list)):
                    errors.append(f"Token reference at {path} resolves to a container: {value}")

    policies = data.get("policies", {})
    expected_policies = {
        "blockInputDuringAnimation": False,
        "animateFromCurrentRenderedState": True,
        "allowUserInterruption": True,
        "hoverIsEnhancementOnly": True,
        "criticalMeaningRequiresNonMotionCue": True,
    }
    for key, expected in expected_policies.items():
        if policies.get(key) is not expected:
            errors.append(f"policies.{key} must be {expected}")

    repeats = policies.get("maximumAttentionRepeats")
    if not isinstance(repeats, int) or not 0 <= repeats <= 1:
        errors.append("policies.maximumAttentionRepeats must be 0 or 1")

    reduced = data.get("reducedMotion", {})
    if reduced.get("removeLargeSpatialMotion") is not True:
        errors.append("Reduced motion must remove large spatial motion")
    if reduced.get("preserveStateChange") is not True:
        errors.append("Reduced motion must preserve state-change meaning")
    allowed = set(reduced.get("allowedProperties", []))
    if not {"opacity", "visibility"}.issubset(allowed):
        warnings.append("Reduced-motion allowedProperties usually includes opacity and visibility")

    component = data.get("component", {})
    row_actions = component.get("rowActions", {}) if isinstance(component, dict) else {}
    if "intentDelay" not in row_actions or "exitGrace" not in row_actions:
        errors.append("component.rowActions must define intentDelay and exitGrace")

    return errors, warnings, stats


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "path",
        nargs="?",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "templates/motion-tokens.json",
    )
    args = parser.parse_args()

    try:
        data = json.loads(args.path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}")
        return 1

    errors, warnings, stats = validate(data)
    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}")

    if errors:
        print(f"FAILED: {args.path} ({len(errors)} error(s))")
        return 1

    print(f"OK: {args.path}")
    print(f"  Leaf values: {stats['leaf_tokens']}")
    print(f"  Token references: {stats['references']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
