# Intake record — Combobox, Command, and Context Menu

Date: 2026-07-16 · Ticket: `storybook-components` · Owner: `src/components/ui`

This record completes the decision gate in
`docs/architecture/storybook-reuse-and-component-intake.md`. ReUI was used as
an interaction-source only; raw source was inspected in
`.tmp/reui-intake/storybook-components/` and is not a Kura implementation.

## Purpose and scope

The primary task is to give Kura teams one accessible, Storybook-registered
way to compose:

1. a searchable controlled-selection field;
2. the global authorized search / command palette for journey `WQ-02`; and
3. a desktop-and-keyboard accelerator for short secondary contextual actions.

The primitives do not load data, decide permissions, make clinical mutations,
or supply business copy. Their feature owner supplies authorised data,
handlers, validation, consequence messaging, and an auditable mutation path.

| Incoming capability | Primary decision | Canonical evidence and owner                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ReUI Combobox       | **CREATE**       | `Autocomplete` is already the canonical authoritative single-record search-and-select control. It intentionally has one submitted identifier and no chip/multiple-value contract. `Combobox` adds a distinct controlled multi-select, grouped-list, and selected-chip contract in `src/components/ui`.                                         |
| ReUI Command        | **CREATE**       | Kura documents `WQ-02` as Doctor global search / command palette, entered by Search or `⌘K`, but has no canonical palette component. `Command` owns only query, keyboard navigation, groups, shortcuts, and accessible overlay behavior in `src/components/ui`. The application shell owns the global shortcut and authorised result registry. |
| ReUI Context Menu   | **CREATE**       | `DropdownMenu` is Kura's anchored, explicit-trigger action menu. A pointer-positioned menu has a different trigger, focus, and touch contract; it is therefore a separate component in `src/components/ui`, never a DropdownMenu variant.                                                                                                      |

## Kura contract

| Component     | Role and primary action                                                                                                                        | Data, permission, and safety boundary                                                                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Combobox`    | Doctor, receptionist, or workspace administrator selects one or several already-authorised values, such as care-team members or scoped labels. | Parent owns items, selected values, validation, persistence, and permissions. Free text is not submitted as a value. Locked selections communicate policy or read-only state rather than silently blocking removal.                            |
| `Command`     | Doctor finds an authorised patient, booking, or action and opens the exact permitted destination (`WQ-02`).                                    | Parent pre-filters results before they reach the palette. It must not expose unauthorised PHI or commands. Selecting a consequential command enters its owning flow; this primitive never confirms or completes it.                            |
| `ContextMenu` | A staff member accelerates a visible secondary record action with a mouse or keyboard.                                                         | It is never the sole entry point for a required task or touch interaction. Destructive menu choices must open the canonical `AlertDialog` or a feature-owned confirmation before mutation. The caller supplies an equally visible action path. |

## ReUI family and variant coverage

### Combobox — 28 upstream examples inspected

The Kura primitive supports single or multiple values, disabled and invalid
inputs, clear and disclosure controls, automatic highlight, groups and
separators, custom item/chip rendering, locked chips, custom trigger content,
dialog composition, and contained popup scrolling. Storybook covers the
single-select, grouped, multi-select, locked, disabled, invalid, long-content,
loading, and mobile contracts.

The following upstream demos are deliberately excluded from the generic
primitive:

- user-created and invisible tags: free-form values need a feature-specific
  moderation, ownership, validation, and audit contract;
- status, priority, lead, team, assignee, and label-management screens: these
  are domain compositions that retain only the generic selection primitive;
- optional custom date picker: the canonical `Calendar` owner remains the
  date-selection authority;
- client-only large-list claims: the primitive contains rendered options, but
  remote paging, cancellation, freshness, and result limits belong to its
  feature owner.

### Command — all 8 upstream examples retained

Stories cover basic commands, shortcuts, small and large groups, record
search, staff results with canonical avatars, action palettes, and recent /
favourite sections. The Kura dialog adds a visible title, scope explanation,
Escape and backdrop dismissal, focus restoration, and a narrow-screen
full-viewport transformation.

### Context Menu — all 10 upstream examples retained, plus Kura touch coverage

Stories cover basic actions, icon actions, keyboard shortcuts, nested menus,
labels and separators, checkbox and radio choices, destructive confirmation,
placement, and context menus inside an existing dialog. The Kura-only mobile
story demonstrates the required visible alternative action path for touch
users; the keyboard story covers Shift+F10 access and Escape recovery.

## Kura visual binding

| Binding area         | Kura owner                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Colors               | Semantic `background`, `foreground`, `card`, `muted`, `border`, `ring`, `primary`, and status tokens.                                                                                                              |
| Typography           | `--font-family-sans`, Kura type, weight, and leading tokens.                                                                                                                                                       |
| Spacing and sizing   | Kura semantic spacing aliases, `--touch-target-min`, density root attribute.                                                                                                                                       |
| Radius and elevation | `--radius-control`, `--radius-card-surface`, `--radius-overlay`, `--elevation-popover`, `--elevation-modal`, and `--elevation-focus`.                                                                              |
| Icons                | Canonical Kura Hugeicons wrappers only.                                                                                                                                                                            |
| Responsive behavior  | Combobox is fluid with contained popup scrolling; Command transforms to a full-height mobile search surface; ContextMenu is an optional desktop/keyboard accelerator with a required visible alternative on touch. |

## Required states and tests

Stories use realistic Vietnamese and English healthcare content, long labels,
permission-limited choices, loading, empty, error, locked/read-only selections,
and destructive recovery. They are verified in light and dark themes and all
three density settings. Responsive checks cover 320, 360, 390, 412, 480, 768,
1024, and desktop widths; the component contracts preserve focus, selection,
and clear recovery paths across resize.

No Kura component, export, or Storybook title keeps a ReUI namespace.
