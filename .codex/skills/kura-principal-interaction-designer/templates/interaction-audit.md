# Interaction Audit

## Scope

```text
Product area:
Flow or component:
Platforms:
Auditor:
Date:
Evidence reviewed:
```

## Scoring

| Category | Weight | Score | Evidence |
|---|---:|---:|---|
| Outcome and mental model | 15 |  |  |
| Discoverability and affordance | 15 |  |  |
| State and feedback | 15 |  |  |
| Modality and accessibility | 15 |  |  |
| Causality, continuity and motion | 10 |  |  |
| Control, error and recovery | 10 |  |  |
| Latency and performance | 8 |  |  |
| System consistency | 7 |  |  |
| Ethics and attention | 5 |  |  |
| Total | 100 |  |  |

## Findings

Each finding must have:

```text
ID:
Severity:
Principle:
Observed behavior:
Evidence:
User impact:
System risk:
Recommended fix:
Acceptance criterion:
Confidence:
Owner:
```

Severity:

```text
Blocker
Critical
Major
Moderate
Minor
Opportunity
```

## Mandatory checks

```text
[ ] Primary actions remain visible or explicitly discoverable.
[ ] Hover-only behavior has keyboard and touch parity.
[ ] State names match system truth.
[ ] Pending is distinct from complete.
[ ] Feedback is local, timely and proportional.
[ ] Focus remains visible and logical.
[ ] Escape, cancel, undo and retry work where appropriate.
[ ] User data survives recoverable failures.
[ ] Motion has purpose and does not block.
[ ] Reduced motion preserves meaning.
[ ] Long operations expose progress or background behavior.
[ ] Repeated input does not create duplicates.
[ ] Sensitive information is not accidentally revealed.
[ ] Critical outcomes have persistent evidence.
```

## Ship decision

```text
Score:
Blockers:
Critical findings:
Decision: PASS / CONDITIONAL / FAIL
Conditions:
Re-test date:
```
