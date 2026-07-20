#!/usr/bin/env python3
"""Score an interaction audit from a small JSON document."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


WEIGHTS = {
    "outcome_mental_model": 15,
    "discoverability_affordance": 15,
    "state_feedback": 15,
    "modality_accessibility": 15,
    "causality_continuity_motion": 10,
    "control_recovery": 10,
    "latency_performance": 8,
    "system_consistency": 7,
    "ethics_attention": 5,
}


def score(payload: dict[str, Any]) -> dict[str, Any]:
    errors: list[str] = []
    scores: dict[str, float] = {}

    for category, maximum in WEIGHTS.items():
        value = payload.get(category)
        if not isinstance(value, (int, float)):
            errors.append(f"{category} must be numeric")
            continue
        numeric = float(value)
        if numeric < 0 or numeric > maximum:
            errors.append(f"{category} must be between 0 and {maximum}")
        scores[category] = numeric

    blockers = payload.get("blockers", 0)
    critical = payload.get("critical", 0)
    if not isinstance(blockers, int) or blockers < 0:
        errors.append("blockers must be a non-negative integer")
    if not isinstance(critical, int) or critical < 0:
        errors.append("critical must be a non-negative integer")

    total = sum(scores.values()) if not errors else 0.0
    category_gates = {
        "state_feedback": 10,
        "modality_accessibility": 10,
        "control_recovery": 6,
    }
    failed_categories = [
        key for key, minimum in category_gates.items() if scores.get(key, 0) < minimum
    ]

    passed = (
        not errors
        and total >= 85
        and blockers == 0
        and critical == 0
        and not failed_categories
    )

    if errors:
        decision = "INVALID"
    elif passed:
        decision = "PASS"
    elif blockers or critical:
        decision = "FAIL"
    else:
        decision = "CONDITIONAL"

    return {
        "total": round(total, 2),
        "maximum": 100,
        "decision": decision,
        "blockers": blockers,
        "critical": critical,
        "failed_category_gates": failed_categories,
        "errors": errors,
        "scores": scores,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", type=Path, help="Audit score JSON")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON")
    args = parser.parse_args()

    try:
        payload = json.loads(args.path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}")
        return 2

    result = score(payload)
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"Interaction audit: {args.path}")
        for category, maximum in WEIGHTS.items():
            value = result["scores"].get(category, "missing")
            print(f"  {category}: {value}/{maximum}")
        print(f"Total: {result['total']}/100")
        print(f"Blockers: {result['blockers']}")
        print(f"Critical: {result['critical']}")
        if result["failed_category_gates"]:
            print("Failed category gates: " + ", ".join(result["failed_category_gates"]))
        for error in result["errors"]:
            print(f"ERROR: {error}")
        print(f"Decision: {result['decision']}")

    if result["decision"] == "PASS":
        return 0
    if result["decision"] == "INVALID":
        return 2
    return 1


if __name__ == "__main__":
    sys.exit(main())
