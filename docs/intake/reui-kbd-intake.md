# ReUI Kbd intake

## Decision

**EXTEND** the canonical Kura `Kbd` owner in `src/components/ui` with `KbdGroup` and the compatible ReUI composition family.

Kura already has a semantic `<kbd>` primitive, public export, Storybook entry, and production consumers in AppShell, Filters, Command, and collection scanning. Creating or copying another primitive would duplicate ownership. ReUI contributes one missing reusable contract—grouping separate semantic keys into one shortcut—and six useful composition examples.

## Source and inventory

- Source page: <https://reui.io/components/kbd>
- Registry examples inspected: `c-kbd-1` through `c-kbd-6`.
- Upstream family: basic keys, grouped keys, keys with icons, key within an input, shortcut in a tooltip, and a shortcut reference list.
- No raw ReUI source is retained. Kura owns the implementation, styling, stories, copy, icon choices, and responsive behavior.

## Contract comparison

| Capability | Kura result | Decision |
| --- | --- | --- |
| Semantic individual key | Existing `Kbd` | REUSE |
| Multiple semantic keys in one shortcut | New `KbdGroup` | EXTEND |
| Basic key labels | `Default` | Retained |
| Grouped keys | `GroupedKeys` | Retained |
| Keys with icons | `KeysWithIcons` using canonical Kura icons | Retained |
| Key within an input | `WithinInput` using the canonical `Input` suffix | Retained |
| Tooltip shortcut | No story | Excluded until Kura owns a canonical Tooltip; this intake does not create a second component family to support one demo. |
| Shortcut reference list | `ReferenceList` | Retained as a story composition, not a new component. |
| Narrow content | `MobileWidth320` | Added to prove wrapping and group integrity. |

## Ownership and boundaries

- Owner: `src/components/ui`
- Storybook: `Design System/Primitives/Kbd`
- Domain contract: **NONE**. Kbd displays static shortcut labels and never registers, executes, authorises, or audits an action.
- Safety: a shortcut hint must remain secondary to a visible, labelled action and must never be the only path.
- Visual binding: Kura semantic surface, border, type, spacing, radius, and canonical icons.
- Responsive classification: `WRAPPING`; individual shortcut groups remain intact while surrounding labels may wrap.

## Verification

Run TypeScript, targeted ESLint, Storybook Vitest, ownership checks, and a static Storybook build. Verify the indexed stories include the default, grouping, icon, input, reference, and 320px compositions.
