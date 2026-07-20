# Storybook reuse and component intake

This policy is the mandatory gate for components, patterns, screens, and UI
ideas obtained from ReUI MCP, Figma, code examples, prototypes, screenshots,
reference products, open-source libraries, legacy Kura implementations, or any
other external source.

External material is evidence of a possible solution. It is not a new Kura
component by default. Before creating, importing, adapting, implementing, or
registering anything in Storybook, determine whether Kura already owns the
same capability.

The governing principle is:

> No unnecessary duplication, no missing foundational pattern, and no
> undocumented variation.

Every component must have a clear reason to exist.

## Repository integration rules

This policy supplements and does not weaken the repository's ReUI ownership,
visual binding, clean UI, and Storybook composition laws.

- `Design System`, `Clinic`, and `Platform Admin` remain the only top-level
  Storybook categories. The layers below are ownership and classification
  levels inside that taxonomy, not new top-level vendor categories.
- "Keep it local" means keep a composition owned by its feature rather than
  promote it to a shared package. It does not permit production-visible orphan
  UI. Every visible production composition and state must still be represented
  by its canonical Storybook story.
- Raw styled controls, feature-local primitive forks, duplicate components,
  and page-first extraction remain prohibited.
- ReUI source still follows the temporary intake, Kura visual binding,
  provenance, validation, Storybook, test, export, and cleanup process.
- When rules conflict, the stricter Kura ownership, safety, accessibility, and
  Storybook requirement wins.

## 1. Compare purpose before appearance

Ignore visual novelty first. Compare the external item with Kura by:

1. user purpose;
2. interaction behavior;
3. information structure;
4. state model;
5. data model;
6. composition pattern;
7. reuse potential.

Two visually different items may be the same component. Two visually similar
items may serve different functions. Classification must follow behavior and
purpose, never screenshot similarity or the source's component name.

## 2. Search Storybook and source before creating

Search the complete current Storybook index, canonical exports, components,
stories, feature modules, and production usages by:

1. component name;
2. user task;
3. interaction type;
4. data type;
5. visual pattern;
6. workflow pattern;
7. domain concept;
8. existing variants and states;
9. existing compositions;
10. similar product usage.

Search by function, not only by the external label. For example, an external
`Results Summary` may already be owned as a data summary, clinical summary,
result panel, status overview, metric group, or review pattern.

Story source that is not discoverable in the fresh Storybook index is not an
approved product component. Build a fresh index when discoverability affects
the decision.

## 3. Assign the canonical owner and layer

Classify the capability inside the mandatory hierarchy:

```text
Token -> Primitive -> Component -> Pattern -> Section -> Page -> Flow
```

Use the repository owners:

- `src/components/ui` for domain-agnostic primitives and components;
- `src/components/shared` for reusable cross-feature patterns;
- a future approved clinical shared package only after cross-module reuse is
  proven;
- `src/features/<module>` for domain components, sections, pages, flows, and
  feature-owned compositions.

Typical responsibilities include:

- Foundations: color, typography, spacing, radius, elevation, icons, motion,
  and grid.
- Primitives: button, input, checkbox, radio, switch, select, tooltip, badge,
  avatar, and separator.
- Components: form field, search field, date selector, filter, alert, status,
  data table, tabs, accordion, dialog, and drawer.
- Patterns/compositions: page header, filter bar, review panel, detail section,
  action footer, summary group, timeline, form section, empty state, and
  confirmation panel.
- Domain components: patient identity, clinical result summary, medication
  item, prescription composer, diagnosis evidence, care plan, lab order item,
  safety confirmation, and result acknowledgement.
- Pages/flows: domain compositions that declare their journey, states, and
  registered children.

Do not classify an item according to where the external source placed it.
Classify it by its role in Kura.

## 4. Mandatory reuse decision

Every incoming item must record exactly one primary decision and its evidence.
Evaluate options in this order.

### `REUSE`

Use the existing component unchanged when it already supports the same
purpose, interaction, states, accessibility, layout flexibility, and data
contract. Change content, props, or surrounding composition only.

### `VARIANT`

Use or add a supported variant only for a recurring semantic or functional
need such as size, density, emphasis, orientation, status, selection, read-only
mode, edit mode, compact mode, or responsive behavior. A one-screen visual
exception does not justify a variant.

### `EXTEND`

Extend the canonical owner when its foundation is correct but it lacks a
reusable state, slot, action area, data presentation option, accessibility
behavior, responsive behavior, or selection mode. Preserve compatibility where
possible and document the extension in Storybook.

### `COMPOSE`

Compose existing registered elements when the external item is a task-level
assembly rather than a new component. Prefer composition over a monolith when
the parts have independent contracts or reuse.

### `DOMAIN-ADAPT`

Adapt an existing domain pattern when the workflow is shared but domain rules
differ. Keep generic behavior in the lower layer and domain permissions,
safety, language, and consequences in the owning feature.

### `FEATURE-OWN`

Keep a one-off or experimental composition owned by the feature when it has no
stable shared contract, is tightly coupled to one page, or has unique data and
behavior. It must still compose canonical registered children and, when
production-visible, have a feature-owned Storybook story. It must not recreate
primitives or shared patterns locally.

### `CREATE`

Create the smallest new canonical element only when:

1. no existing component serves the same purpose;
2. safe extension is not possible;
3. composition cannot satisfy the need;
4. behavior is meaningfully different;
5. recurrence or an approved system need is established;
6. ownership and abstraction level are clear;
7. the complete state model is defined;
8. the component can be named by purpose;
9. stories, tests, and documentation can be supplied;
10. the addition clearly improves the system.

A new arrangement or styling treatment alone is not sufficient evidence.

### `REJECT`

Reject the external item when it duplicates Kura, conflicts with the workflow,
cannot meet safety or accessibility requirements, introduces the wrong
abstraction, or would create a parallel component system.

## 5. Compare the complete contract

Record the external and Kura contracts side by side:

1. purpose;
2. inputs and outputs;
3. data shape and ownership;
4. actions and events;
5. states and transitions;
6. validation;
7. permissions;
8. accessibility and focus behavior;
9. responsive and density behavior;
10. loading, empty, error, and recovery behavior;
11. composition slots;
12. visual hierarchy;
13. domain meaning and consequences;
14. supported and unsupported use cases.

Do not infer novelty or compatibility from the screenshot alone.

## 6. Detect duplicates

Treat an incoming item as a probable duplicate when it has the same purpose,
action, or data type and differs only by styling, spacing, naming, source,
props, slots, composition, or a representable variant.

When duplication is confirmed:

1. do not add the duplicate;
2. name the canonical component;
3. migrate only genuinely useful behavior;
4. extend the canonical owner if required;
5. update affected consumers;
6. remove redundant code;
7. document the decision.

## 7. Detect missing patterns

Do not force every need into an existing component. A shared element may be
missing when the same custom solution, workaround, accessibility behavior,
state model, or composition recurs across screens or modules, or when existing
APIs cannot express the use case cleanly.

For a confirmed gap:

1. define the common purpose and current use cases;
2. separate shared behavior from domain behavior;
3. design the smallest reusable contract;
4. add applicable states and accessibility;
5. add stories and tests;
6. export it from the canonical owner;
7. migrate repeated implementations;
8. remove redundant copies;
9. prove fresh Storybook discoverability before product consumption.

The goal is the correct component set, not the smallest possible count.

## 8. Keep the abstraction correct

An element is too generic when its props become unclear, it combines unrelated
uses, accumulates conditional branches, lacks a purpose-revealing name, or lets
one use case destabilize others.

An element is too specific when it embeds page copy, fixed business data, one
workflow assumption, cannot be reused without rewriting, or duplicates an
existing foundation.

Prefer the lowest abstraction level that is clearly reusable. Keep primitives,
reusable components, task compositions, and domain logic separate. Do not put
domain rules in general primitives or rebuild primitives inside domain
components.

## 9. Define one canonical implementation

Every reusable pattern has one canonical owner and implementation. Its
Storybook contract must identify:

1. official name and purpose;
2. owner and atomic/composition level;
3. supported and unsupported uses;
4. props, slots, variants, and states;
5. accessibility and keyboard behavior;
6. responsive and density behavior;
7. realistic examples and edge cases;
8. related components;
9. migration guidance;
10. deprecation status.

Multiple equally official implementations of the same pattern are prohibited.

## 10. Remove before adding

Before accepting new UI, check whether each action, field, status, container,
variant, wrapper, or abstraction already exists, duplicates information, or
adds real value. Remove unnecessary structure before expanding the system.

Do not convert an imported screen into one large component. Decompose the
screen, reuse registered elements, identify page-specific composition, isolate
domain logic, and create only the smallest proven gaps.

## 11. Storybook must show real Kura usage

Do not preserve an external demo as the main story. Stories must use realistic
Kura content and cover the states appropriate to their layer, including:

- default and supported variants;
- hover, focus-visible, active, selected, disabled, and loading;
- empty, error, success, warning, partial, permission-limited, read-only,
  stale, offline, and recovery states where applicable;
- long, missing, multilingual, and realistic content;
- responsive and density behavior;
- keyboard, focus, announcements, and accessibility;
- relevant domain examples and safety edge cases.

The story must render the same implementation production consumes. Page and
flow stories must declare their owner, journey IDs, registered children, and
meaningful intermediate, reject, recovery, and terminal states.

## 12. Document why a new component exists

Every new canonical element must answer:

1. What problem does it solve?
2. Why can existing elements not solve it?
3. Which alternatives were evaluated?
4. Which owner and Storybook category own it?
5. What is its hierarchy level?
6. Which consumers should and should not use it?
7. Which states and interactions does it support?
8. What is explicitly out of scope?
9. Which implementation, if any, becomes deprecated?
10. What evidence supports promotion?

If these answers are unclear, the item is not ready for Storybook.

## 13. Deprecate instead of duplicating

When replacing a canonical component, mark the previous one deprecated,
explain why, name the replacement, provide migration guidance, track remaining
usage, preserve it only while required by existing consumers, and remove it
after migration. Never leave two undocumented preferred implementations.

## 14. Promote feature-owned UI using evidence

Promote a feature-owned pattern to a shared Storybook owner only when observed
reuse, stable behavior, recurring states, duplicated implementation, shared
accessibility/testing value, or an explicitly approved system need provides
evidence. Do not generalize based only on speculation.

## 15. Proactive clarification

Ask focused questions when ownership, reuse, recurrence, contract, backward
compatibility, or whether the source is a visual reference versus an
implementation requirement would materially change the decision. Do not ask
about trivial visual details governed by Kura foundations, and never silently
invent business, clinical, permission, workflow, or safety rules.

## Required component intake record

Complete this record before implementation:

1. original source and provenance;
2. intended Kura use case, role, task, and journey;
3. fresh Storybook and source search evidence;
4. similar components and candidate owners;
5. external-versus-Kura contract comparison;
6. decision: `REUSE`, `VARIANT`, `EXTEND`, `COMPOSE`, `DOMAIN-ADAPT`,
   `FEATURE-OWN`, `CREATE`, or `REJECT`;
7. duplicate and missing-pattern risks;
8. final owner and hierarchy level;
9. data, permissions, safety, states, edge cases, and accessibility;
10. realistic Storybook scenarios and tests;
11. deprecation or migration impact;
12. unresolved material questions.

Implementation must not begin before this assessment is complete.

## Definition of done

An incoming item is correctly integrated only when:

1. Storybook, exports, source, and product usages were searched;
2. alternatives and their contracts were compared;
3. reuse and composition were preferred where correct;
4. extension was evaluated before creation;
5. no duplicate or missing foundational pattern was ignored;
6. shared, feature, and domain responsibilities are separated;
7. one canonical owner and implementation exist;
8. applicable states and realistic Kura stories are complete;
9. accessibility, responsive behavior, density, and tests pass;
10. deprecations and migrations are explicit;
11. production and Storybook use the same implementation;
12. fresh Storybook discoverability is proven;
13. ReUI-specific binding, provenance, validation, and cleanup are complete
    when ReUI was the source;
14. no production-visible orphan, duplicate, workaround, or parallel system
    remains;
15. unresolved material classification questions were clarified.

## Final rule

Before asking how an external component should be implemented, ask:

> Does Kura already have this capability, where does it belong in Storybook,
> and what is the smallest correct change to the existing system?
