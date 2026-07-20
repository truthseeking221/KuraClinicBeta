# Kura Principal Interaction & Microinteraction Designer

This skill set turns Kura into a Principal Interaction Designer capable of designing behavior over time, from a small hover reveal to the state machine of a risky workflow.

This is not a nice effects collection. This is an interaction specification and inference system based on:

```text
human outcome
state truth
intent
trigger
rules and guards
transition
feedback
recovery
validation
```

## 1. Main competencies

Skill can:

* Design new interactions from outcome and state models.
* Design microinteractions like save, reveal, validate, select, reorder, retry and undo.
* Create a subtle hover reveal that is still discoverable and accessible.
* Build motion grammar, timing scale, easing policy and reduced-motion mapping.
* Design direct manipulation, drag and drop, swipe, long press and gestures.
* Clarify loading, progress, optimistic UI, autosave, offline and conflict.
* Check pointer, touch, keyboard, screen reader and switch-input parity.
* Write Storybook interaction contract and acceptance tests.
* Audit behavior according to rubric 100 points.
* Apply high-risk overlay to Kura's clinical, privacy and operational workflows.

## 2. Core perspective

Interaction design doesn't have to choose the animation first and then find the reason later.

An interaction is considered complete when the user can answer:

```text
What can I do?
What will happen?
Did the system receive my action?
What is happening now?
What changed?
Was the change committed?
Can I cancel, undo or recover?
What should I do next?
```

Hover is just a capability of some input. So:

```text
Hover may enhance.
Hover must not be required.
Primary actions remain visible or explicitly discoverable.
Keyboard and touch receive equivalent paths.
Critical meaning never exists only in motion, color or hover.
```

## 3. Package structure

```text
kura-principal-interaction-designer/
├── SKILL.md
├── STANDALONE_SKILL.md
├── README.md
├── MANIFEST.md
├── VALIDATION.md
├── SHA256SUMS.txt
├── references/
├── templates/
├── examples/
└── scripts/
```

### `SKILL.md`

Canonical version uses progressive disclosure. The main file is kept under 500 lines and points to knowledge modules when needed.

### `STANDALONE_SKILL.md`

Copy a file, embedding all references, templates and examples. Use when the environment does not support subfolders or when you need to review the entire content.

### `references/`

In-depth library includes 17 modules:

```text
universal constitution
intake and diagnosis
state machines
hover reveal and progressive disclosure
feedback and causality
motion grammar
direct manipulation and gestures
input modality and ergonomics
attention and spatial continuity
latency and optimistic UI
error and recovery
accessibility and responsible motion
design-system patterns and tokens
prototyping and metrics
audit rubric
Kura high-risk overlay
source foundations
```

### `templates/`

Artifacts used for production:

```text
interaction brief
microinteraction spec
state transition matrix
hover reveal spec
Storybook interaction contract
interaction audit
QA checklist
decision log
motion tokens
motion token schema
audit score example
```

### `examples/`

The examples go from principles to state, modality, motion and acceptance tests:

```text
contextual row actions
intent-aware hover preview
inline edit and autosave
drag reorder
loading and progress
destructive action
Kura clinical status and audit details
```

### `scripts/`

Verification tool does not depend on external libraries:

```text
validate_skill.py
validate_motion_tokens.py
score_interaction_audit.py
build_standalone.py
```

## 4. Installation

Leave the entire directory intact and place it in Kura's skill directory or an Agent Skills compatible runtime.

```text
skills/
└── kura-principal-interaction-designer/
    ├── SKILL.md
    ├── references/
    ├── templates/
    ├── examples/
    └── scripts/
```

Don't just copy `SKILL.md` alone if the runtime can read the extra files. Reference modules are the in-depth knowledge of the skill.

## 5. How to activate

Request example:

```text
Use kura-principal-interaction-designer to design the behavior for this results table.
```

```text
Audit all hover, focus, touch and keyboard states of this component.
```

```text
Design a hover reveal for row actions, but do not depend on hover to complete the task.
```

```text
Create state machine, transition matrix, motion spec and acceptance tests for autosave.
```

```text
Build a motion system for Kura with tokens, purpose categories and reduced-motion behavior.
```

```text
Refactor this interaction to clearly distinguish draft, pending, committed, failed and conflict.
```

## 6. Working mode

| Mode | Key results |
|---|---|
| `new-interaction` | Complete interaction model from outcome to recovery |
| `microinteraction` | Trigger loops, rules, feedback, loops and modes |
| `motion-system` | Purpose taxonomy, grammar, tokens and governance |
| `audit` | Findings, severity, fixes and ship gate |
| `prototype` | Prototype plan and testable behavioral assumptions |
| `handoff` | State machine, transition contract and acceptance tests |
| `design-system` | Reusable pattern, Storybook contract and token mapping |

## 7. Required process

```text
1. Diagnose the outcome and risk.
2. Inventory objects, states, events, guards and failures.
3. Separate primary, secondary and advanced behavior.
4. Build the state model.
5. Define feedback and recovery.
6. Map pointer, touch, keyboard and assistive technology.
7. Add motion only where it explains change.
8. Prototype interruption, reversal and latency.
9. Test discoverability, completion and recovery.
10. Systemize recurring behavior.
11. Hand off with executable acceptance criteria.
12. Audit the implemented behavior.
```

## 8. Hover reveal policy

A good reveal usually has:

```text
visible primary affordance
contextual secondary content
intent delay
exit grace
stable geometry
focus-visible parity
explicit touch alternative
Escape and focus restoration
reduced-motion mapping
viewport collision handling
```

A reveal cannot be shipped when:

```text
The primary action exists only on hover.
Critical status appears only after hover.
Keyboard users cannot open it.
Touch users have no explicit path.
The row shifts when actions appear.
The reveal flickers across a pointer corridor.
Sensitive data appears from accidental transit.
The popover cannot be dismissed predictably.
```

## 9. Motion policy

Motion must belong to a purpose named:

```text
orientation
continuity
causality
feedback
attention
demonstration
brand expression
```

“Delight” alone is not a sufficient rationale.

Priority skills:

```text
quick and readable
nonblocking
interruptible
reversible
performance-aware
reduced-motion safe
```

Timing tokens in the package are a baseline, not a hard rule. Kura must adjust for distance, complexity, frequency, risk and reading time.

## 10. Kura high-risk overlay

In clinical and operational workflows, skills apply additional principles:

```text
pending is not confirmed
result ready is not reviewed
reviewed is not acknowledged
order prepared is not order placed
label printed is not sample verified
draft medication is not active medication
color and motion never carry the only clinical meaning
high-risk outcomes need persistent evidence
PHI must not reveal accidentally
```

## 11. Standard output

When designing or refactoring, minimum skill returns:

```text
1. User outcome and context
2. Risk tier
3. Interaction diagnosis
4. State inventory
5. Trigger and transition model
6. Reveal, feedback and motion rationale
7. Modality equivalence
8. Error, interruption and recovery behavior
9. Motion tokens or timing ranges
10. Accessibility behavior
11. Acceptance tests
12. Assumptions and validation plan
```

## 12. Run validation

From package directory:

```bash
python scripts/validate_skill.py
python scripts/validate_motion_tokens.py
python scripts/score_interaction_audit.py templates/audit-scores.example.json
python scripts/build_standalone.py
```

`score_interaction_audit.py` returns a non-zero exit code when the audit has not passed the ship gate. This is suitable for use in CI.

## 13. Expand skills

When adding a new pattern:

1. Start from problem and purpose.
2. Record state, event, guard and recovery.
3. Determine input modality parity.
4. Attach motion token according to meaning.
5. Write Storybook stories for failure, latency and reduced motion.
6. Add acceptance tests.
7. Run validation.

Don't add an animation token just because a team wants a different speed. First of all, we must determine whether it has another purpose or not.

## 14. Source of thinking

Package synthesizes principles from Don Norman, Val Head, Everett McKay, Josh Clark, Jeff Johnson, Alla Kholmatova, Jon Yablonski, Colin Ware, William Lidwell and other design-system and UI foundations sources.

See `references/16-source-map.md` to see how each source is transformed into interaction principles.
