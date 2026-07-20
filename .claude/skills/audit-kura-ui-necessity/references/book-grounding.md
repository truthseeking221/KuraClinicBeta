# Book Grounding for UI Subtraction

Use this reference in every audit to ground decisions in durable design principles rather than personal taste.

This file synthesizes books named in the Product and Design project. It is not a substitute for an edition specific source. When exact wording, attribution, page reference, or a disputed interpretation matters, inspect the actual project book or approved source before citing it.

## Contents

1. Core synthesis
2. The Design of Everyday Things
3. Refactoring UI
4. Don't Make Me Think, Revisited
5. Simple and Usable
6. Designing with the Mind in Mind
7. Visual Thinking and universal principles
8. About Face
9. Designing Interfaces
10. UI Is Communication
11. Microinteractions
12. Laws of UX and cognitive laws
13. Information architecture
14. Design systems
15. Tension resolution

## Core synthesis

UI subtraction should reduce accidental work while preserving the information, signifiers, feedback, and structure needed to complete the real task.

Derive every decision from four questions:

1. What human or system problem does this element solve?
2. Which cognitive, perceptual, interaction, safety, or workflow burden returns if it disappears?
3. Can a lighter representation solve the same problem?
4. How will the revised task prove that subtraction helped?

The goal is not the fewest visible elements. The goal is the least interface necessary for confident, correct, and recoverable completion.

## The Design of Everyday Things

Use Norman's interaction concepts to protect what makes action understandable:

* Signifiers show where and how action is possible.
* Mapping connects controls with effects.
* Constraints prevent invalid action.
* Feedback communicates what happened.
* A coherent conceptual model helps users predict the system.

Subtraction implications:

* Remove decoration that resembles a signifier but has no action.
* Preserve or clarify labels and affordances when removal would reduce discoverability.
* Remove duplicate feedback only when one remaining response communicates outcome, state, and recovery.
* Do not simplify the surface by breaking the conceptual model or hiding cause and effect.

## Refactoring UI

Use visual hierarchy before content deletion:

* Make priority visible through size, weight, contrast, color, spacing, and position.
* Use fewer deliberate hierarchy levels.
* Group related content with proximity and alignment before adding containers.
* Use borders, backgrounds, and shadows only when they communicate a real layer or boundary.
* Let secondary information remain available with appropriately lower visual weight.
* Design with realistic content so apparently unnecessary elements are tested against actual states and lengths.

Subtraction implications:

* Remove nested cards, repeated borders, decorative icons, and equal emphasis before deleting useful content.
* Demote metadata rather than hiding it when users still need it for verification.
* Replace a collection of boxed labels with aligned text when no independent object exists.

## Don't Make Me Think, Revisited

Use Krug's usability lens to reduce avoidable interpretation:

* Make the page self evident or at least self explanatory.
* Support scanning through clear hierarchy and conventional patterns.
* Remove needless words.
* Make navigation and current location understandable.
* Avoid choices or labels that trigger unnecessary internal debate.

Subtraction implications:

* Remove copy that repeats a visible label or explains obvious chrome.
* Combine competing actions and ambiguous navigation.
* Do not remove information that would make the user stop and ask what an action means, where it leads, or what happened.

## Simple and Usable

Use Colborne's four strategies as distinct tools:

1. Remove what has no necessary job.
2. Organize what belongs together.
3. Hide only what is genuinely secondary until a clear trigger makes it relevant.
4. Displace specialized complexity to a more appropriate context, role, device, or time.

Subtraction implications:

* Do not call hidden complexity removed.
* Do not displace burden to another user or workflow without making ownership explicit.
* Prefer organization when deletion would remove necessary capability.
* Preserve a clear path to advanced or infrequent functions.

## Designing with the Mind in Mind

Use Johnson's cognitive and perceptual principles:

* Attention is selective and goal driven.
* Working memory is limited and vulnerable to interruption.
* Recognition is easier than unaided recall.
* Perceptual grouping determines what users believe belongs together.
* Users notice differences when the differences are meaningful and visually legible.

Subtraction implications:

* Remove competing emphasis and unrelated content from the active decision.
* Preserve context, units, labels, options, and recent state when removal would force memory.
* Do not fragment one coherent group with many surfaces or accidentally merge distinct groups by removing every boundary.

## Visual Thinking and universal principles

Use principles synthesized from *Visual Thinking for Design* and *Universal Principles of Design*:

* Proximity, similarity, alignment, continuity, and common region create perceived groups.
* Preattentive features such as position, color, size, and orientation attract attention before deliberate reading.
* Signal to noise improves when decorative and repeated signals are reduced.
* Progressive disclosure can control complexity when the reveal logic matches user intent.

Subtraction implications:

* Use proximity and alignment instead of a card when they communicate the group reliably.
* Reserve strong color, badges, and large type for a small set of meaningful priorities.
* Keep noncolor cues and semantic labels when color carries status.
* Audit whether removing a boundary causes distinct clinical objects to appear as one.

## About Face

Use goal directed interaction design:

* Organize around user goals and behavior rather than data storage or implementation structure.
* Remove excise, meaning work that users perform only to satisfy the system.
* Support frequent and infrequent users without forcing both through the same density or explanation.
* Keep actions close to the information and object they affect.

Subtraction implications:

* Remove repeated entry, unnecessary setup, gratuitous navigation, and confirmation that does not protect consequence.
* Do not expose backend objects, enums, or steps merely because they exist.
* Preserve domain complexity when it represents real decisions, authority, or clinical truth.

## Designing Interfaces

Use interaction patterns according to behavioral fit:

* Choose navigation, disclosure, selection, editing, and feedback patterns based on the user job and content scale.
* Use progressive disclosure for optional complexity.
* Keep controls near the data or object they affect.
* Use overview and detail relationships when both scanning and investigation matter.

Subtraction implications:

* Replace the wrong component before removing a needed capability.
* Remove tabs, steps, drawers, and menus that exist without the behavioral conditions that justify them.
* Preserve discoverability and state when moving content to another layer.

## UI Is Communication

Treat every visible element as a message:

* Hierarchy tells users what matters.
* Labels and controls form a conversation about possible action.
* Feedback communicates system response.
* Inconsistent visual treatment creates contradictory meaning.

Subtraction implications:

* Remove elements that communicate no useful message or send a false one.
* Combine several weak or contradictory signals into one clear message.
* Demote valid but secondary messages rather than letting them compete with the primary task.

## Microinteractions

Use Saffer's model of trigger, rules, feedback, loops, and modes:

* Every small interaction needs a perceivable trigger and feedback.
* Persistent or repeated feedback can communicate ongoing state, not merely the initial event.
* Loops and modes must remain understandable across time.

Subtraction implications:

* Remove ornamental animation and redundant celebration.
* Preserve feedback that distinguishes request, processing, success, failure, retry, and completion.
* Do not remove an ongoing status because the initiating action already produced a toast.

## Laws of UX and cognitive laws

Use cognitive laws as diagnostics, not slogans:

* More undifferentiated choices can slow decisions.
* Familiar conventions reduce learning burden.
* Proximity and grouping affect perceived relationships.
* The final step and most intense moment influence remembered experience.
* Some complexity is inherent and must be managed rather than erased.

Subtraction implications:

* Reduce irrelevant choice and group valid alternatives.
* Preserve familiar signifiers unless a better pattern is demonstrably clearer.
* Avoid transferring necessary complexity into memory, hidden navigation, or downstream work.
* Never cite a named law as sufficient evidence without testing the actual task.

## Information architecture

Use principles from *How to Make Sense of Any Mess* and *Information Architecture: For the Web and Beyond*:

* Establish what is being organized, for whom, for what purpose, and at what level.
* Labels, categories, navigation, search, and relationships form one system.
* Ambiguity cannot always be deleted, but it can be made explicit and navigable.

Subtraction implications:

* Remove duplicate navigation only after identifying the hierarchy each path serves.
* Merge categories that users cannot distinguish meaningfully.
* Preserve alternate entrances when they support genuinely different contexts or mental models.

## Design systems

Use Kholmatova's design system principles:

* A component needs a stable purpose, shared pattern, ownership, and governance.
* Variation should represent meaningful need rather than arbitrary appearance.
* A system improves when duplicate responsibilities converge on a canonical pattern.

Subtraction implications:

* Remove semantic duplicates only through inventory, dependency analysis, migration, and deprecation.
* Consolidate variants that differ only in accidental styling.
* Keep domain composites distinct when their semantic, state, or safety responsibility differs.

## Tension resolution

Resolve common conflicts explicitly:

| Tension | Resolution |
| --- | --- |
| Minimal appearance versus discoverability | Remove decoration first; preserve necessary signifiers and labels |
| Fewer elements versus less memory | Keep context required at the decision point |
| Progressive disclosure versus safety | Keep safety critical information visible when it can change the current action |
| Consistency versus component cleanup | Preserve current behavior during planned migration; do not keep duplicates forever |
| Density versus clutter | Reduce noise and improve grouping; do not assume fewer data means better clinical work |
| Repetition versus verification | Preserve repeated information when each appearance supports a distinct decision context |
| Speed versus confirmation | Remove confirmation for routine reversible action; preserve it for meaningful consequence and authority |
| Simplicity versus domain truth | Simplify representation and workflow burden; never collapse distinct states into false clarity |

When principles conflict, prefer the choice that protects correct task completion, clinical safety, recovery, and truthful state with the least accidental burden.
