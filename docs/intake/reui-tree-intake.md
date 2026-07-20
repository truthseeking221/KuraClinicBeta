# ReUI Tree intake

- Source: [ReUI Tree](https://reui.io/components/tree), registry item `@reui/tree`.
- Intended owner: `src/components/ui`, domain-neutral hierarchical navigation and selection.
- Decision: `CREATE-from-ReUI-architecture`.
- Evidence: Storybook/source search found no canonical Tree or equivalent hierarchical navigation primitive. Accordion and Collapsible expose disclosure, but do not own tree semantics, item navigation, selection, async loading, or WAI-ARIA tree behavior.
- Upstream contract inspected: `Tree`, `TreeItem`, `TreeItemLabel`, `TreeDragLine`; `indent`, `toggleIconType`, item render support, headless tree container/item props, and the seven free examples `c-tree-1` through `c-tree-7`.
- Kura binding: CSS Modules and semantic Kura tokens; canonical Kura icons for chevron, expand/collapse, folder, file, and avatar primitives; `@headless-tree/core` + `@headless-tree/react` retained for tree state and keyboard behavior.

## Family coverage

| ReUI capability | Kura Storybook coverage | Decision |
| --- | --- | --- |
| Basic tree | `Default`, `KeyboardNavigation` | Retained |
| Indented guide lines | `IndentedGuides` | Retained as a story composition using the Tree indent token |
| Custom indent | `CustomIndent` | Retained through the documented `indent` prop |
| File explorer | `FileExplorer` | Retained with canonical generic Folder/File icons |
| Organization chart | `OrganizationChart` | Retained with the canonical Avatar family |
| Permissions tree | `Permissions` | Retained with Kura Checkbox and a non-button TreeItem render to avoid nested interactive controls |
| Fine-grained file-type icons from the ReUI demo | Generic `FileIcon` fallback | Excluded because the Kura icon catalog has no approved code/JSON/CSS-specific semantic icons; no foreign or hand-drawn icon substitute is introduced |

## States and behavior

Stories cover default, selected/focused keyboard navigation, expanded and collapsed folders, indented/custom density, long labels, empty state, permission-limited controls, and a narrow/mobile composition. Headless Tree owns arrow-key, Home/End, type-ahead, focus, selection, and ARIA tree behavior. Loading/async children and drag-line rendering remain available through the upstream instance contract and `TreeDragLine`, but are not fabricated in the static Storybook fixtures.
