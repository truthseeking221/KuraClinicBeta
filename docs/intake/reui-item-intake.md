# ReUI Item intake

## Decision

**CREATE** a canonical Kura `Item` composition in `src/components/ui`.

The fresh Storybook index and source search found no generic owner for a
scannable media + title/description + actions row. `Table` and `DataGrid` own
columnar data, menu items own action selection, `Card` owns larger standalone
surfaces, and domain rows embed workflow-specific data and consequences.
Extending any of those would mix incompatible purposes.

No raw ReUI file, Tailwind class, foreign icon, remote demo image, or vendor
namespace is retained. Kura owns the public API, semantics, tokens, responsive
behavior, stories, and tests.

## Provenance and inspected contract

- Source family: <https://reui.io/components/item>
- Registry examples inspected: `https://reui.io/r/c-item-1.json` through
  `c-item-12.json`.
- ReUI MCP was not exposed in this workspace session, so the official page and
  public registry payloads were used directly.
- The upstream family composes `Item`, `ItemGroup`, `ItemSeparator`,
  `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`,
  `ItemHeader`, and `ItemFooter`.
- Upstream variants are default, outline, and muted; compact sizes and link
  rendering are part of the reusable contract.

## Kura contract

| Concern | Kura decision |
| --- | --- |
| Purpose | A domain-neutral, scannable content row or compact content block with optional media and trailing actions |
| Owner / hierarchy | `src/components/ui`; Component |
| Root semantics | Non-interactive `div` by default; explicit `as="a"` for navigation |
| Variants | `default`, `outline`, `muted`; outline is reserved for a meaningful standalone boundary rather than every row |
| Sizes | `xs`, `sm`, `md`, with root density affecting the default operational treatment |
| Media | Default media slot plus token-bound `icon` and `image` treatments |
| Actions | Optional trailing region; actions retain their own native button/link semantics |
| Disabled navigation | Removes `href` and tab order, exposes `aria-disabled`, and cannot masquerade as an available route |
| Selection | Composed from canonical `Checkbox` or `Radio`; Item does not invent selection state |
| Data and permissions | Entirely caller-owned; Item does not fetch, authorise, mutate, or infer status |
| Responsive | Fluid grid with `min-width: 0`; actions wrap below content at 320px when needed |

## ReUI family inventory

| ReUI example | Kura coverage |
| --- | --- |
| `c-item-1` basic variants | `Variants` |
| `c-item-2` icon media and actions | `IconMediaAndAction` using canonical Kura icons |
| `c-item-3` avatar and follow action | `AvatarAndStatus`; product-social follow behavior is excluded |
| `c-item-4` navigation links | `NavigationGroup`, with keyboard focus test |
| `c-item-5` status badges | `AvatarAndStatus`, with status text rather than color alone |
| `c-item-6` file rows | `DocumentItem`; upload lifecycle remains owned by `FileUpload` |
| `c-item-7` keyboard shortcuts | `ShortcutItems` composed with canonical `Kbd` |
| `c-item-8` small items with counts | Covered by compact size and Badge composition |
| `c-item-9` team roles and multiple actions | `MultipleActions`; permission mutation remains caller-owned |
| `c-item-10` header/footer | `HeaderAndFooter`; generic progress is excluded because Kura has no approved Progress owner |
| `c-item-11` integration connect actions | Structure retained through action stories; connection behavior is feature-owned |
| `c-item-12` activity feed | `LongContentMobile`; remote avatars and SaaS activity copy are replaced with Kura operational content |

## Accessibility and exclusions

- Item itself adds no fake button role. Navigation requires an anchor; actions
  remain real controls, and selectable items compose canonical choice controls.
- `ItemTitle` and `ItemDescription` provide visual hierarchy but do not invent
  document-heading levels.
- Icon media is presentational unless its child supplies its own accessible
  meaning. Stories use canonical Kura icons only.
- Sortable drag handles, virtualisation, data-grid behavior, file upload state,
  user-follow behavior, permissions, integration status transitions, and
  activity persistence are excluded from this component.

## Verification

```sh
npx tsc --noEmit
npx eslint src/components/ui/item.tsx src/components/ui/item.stories.tsx
npx vitest --project storybook run src/components/ui/item.stories.tsx
npm run check:reui-ownership
npm run build-storybook
```
