# ReUI Dialog intake

## Decision

`REUSE-and-EXTEND` the canonical Kura `Dialog` owner in `src/components/ui`.
Do not run the registry install over the existing component: the Kura owner
already preserves the required modal semantics and ReUI family behavior while
binding visual decisions to Kura tokens and canonical icons.

Dialog is generic interaction UI and is classified `NO DOMAIN CONTRACT`.
AlertDialog owns consequential confirmation; Sheet owns persistent side work;
pages and flows own long-running or multi-step tasks.

## ReUI evidence

ReUI MCP was queried on 2026-07-17 using the free-only Dialog family. It
verified `c-dialog-1` through `c-dialog-10` as free examples. The validated
install command is `npx shadcn@latest add @reui/c-dialog-1`; it is retained as
provenance only and was not executed because it would create or overwrite a
second Dialog owner.

| Registry item | Supported use case | SHA-256 |
| --- | --- | --- |
| `c-dialog-1` | Basic form dialog | `e78e386ebd7b078507cd69d715722d81a349164ebdc062aa71daaa72710c74b4` |
| `c-dialog-2` | Scrollable body | `643305a00c1a645b20da16e7e91535499ae37d69d5e40459c70901940f1261a8` |
| `c-dialog-3` | Scrollable body and sticky footer | `a26727a0f3de8dd1dfa85e3ae21b8c2bbccbc892a7269c0b75213d718f204d9e` |
| `c-dialog-4` | No corner close button | `445c9f61736f9273ce9e26dfb057411709f4cb5f3c0027135b2d3828d279fb8a` |
| `c-dialog-5` | Custom close action | `72ed97c00990568e68b9749f977c3f242771cb9925a4ef374bf13cf49d47acd3` |
| `c-dialog-6` | Full-screen fluid dialog | `866225fb53368e007844842dc3adcb71d97522f0921ac4214388f66eb4a999cc` |
| `c-dialog-7` | Destructive confirmation | `2a719a86ce2c98a83dd19d0ecda31fa7553606c7284f878bcbfe853e1d5f2014` |
| `c-dialog-8` | Cookie consent composition | `8f6a01f6289fed2f872129d2808c09c93555f6c98fa7b363c83bd1d7bb20bcb5` |
| `c-dialog-9` | Keyboard shortcut list | `00e9d3370e8819e7b08bdc4c9b6f6ec19c8813a391505db24489e1306e3fd3af` |
| `c-dialog-10` | Full-width action | `074ce468fee06143a628996135cbd6afec998d7f762047a20fc428b84f545c89` |

Source: <https://reui.io/components/dialog>

## Kura binding

- Radix Dialog retains focus containment, focus restoration, Escape dismissal,
  portal, overlay, title, and description semantics.
- Kura owns sizes, density, overlay radius/elevation, mobile transformation,
  action order, copy, and canonical CloseIcon usage.
- The body is the only scrolling region. Header and footer stay visible for
  bounded tasks with long content.
- Header and footer dividers appear only when they bound a scrollable body;
  short acknowledgement dialogs remain one calm surface without decorative
  chrome between their context and action.
- At 480px and below, the default presentation becomes full-screen. Short
  notices may explicitly use the inset mobile presentation.
- Reduced-motion mode removes overlay and content animations.

## Variant disposition

- Retain basic, scrollable, sticky-footer, optional close, custom close,
  full-screen, shortcut-list, and full-width-action behavior.
- Redirect destructive confirmation to canonical `AlertDialog`.
- Keep consent settings feature-owned because persistence, decline parity,
  policy links, and category semantics are not Dialog responsibilities.
- Reject generic demo copy and decorative modal containers.

## Verification contract

Run focused Storybook interaction tests, TypeScript, lint, Storybook build,
`npm run check:reui-ownership`, accessibility checks, and rendered verification
at 1440px and 320px. Confirm initial focus, Tab containment, Escape dismissal,
trigger-focus restoration, scroll ownership, sticky actions, safe-area padding,
dark theme, density modes, long content, and reduced motion.
