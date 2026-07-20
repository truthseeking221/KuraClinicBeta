# ReUI Radio Group intake

## Decision

`EXTEND` the canonical Kura `RadioGroup` and `Radio` owners in
`src/components/ui`. Do not run the registry install over the existing
components: Kura already owns the native fieldset contract, token binding,
validation, read-only behavior, responsive reflow, and Storybook verification
surface.

Radio Group is generic interaction UI and is classified `NO DOMAIN CONTRACT`.
Feature workflows own the meaning of each option, while this component owns
one-of-many selection semantics and accessible form context.

## ReUI evidence

ReUI MCP was queried on 2026-07-17 with free-only search. The Radio Group page
contains 17 production-ready examples covering basic, disabled, descriptive,
invalid, card, separator, icon, frame, grid, avatar, tooltip, badge, inline,
and pricing presentations. The exact component lookup returned no canonical
`radio-group` API item; MCP exposed the family as `c-radio-group-1` through
`c-radio-group-17` examples. Each example validated as a free registry item.

The validated install command was `npx shadcn@latest add @reui/c-radio-group-1`.
It is retained as provenance only and was not executed because installing it
would create a second owner beside Kura's existing primitives.

| Registry item | Example | SHA-256 |
| --- | --- | --- |
| `c-radio-group-1` | Basic radio group | `b4cfc1648cb5edb7bc8a8d64d1317cd619d6a234b915c505806e1b6ba51c292b` |
| `c-radio-group-2` | Disabled radio group | `155ff731de76350dc0ed75def780e164e0514be4b21fc38e3e5b23c8a4f8beb1` |
| `c-radio-group-3` | Radio with description | `8887810376ff55f14d27a5923db9ec114067519b458202aa273eb1a7775bfd8b` |
| `c-radio-group-4` | Invalid radio group | `3a8126cab6ec4215e9034e3e20c348a7b125951b928fce7e9c5134db85c40c1a` |
| `c-radio-group-5` | Colored radio group | `0c80821549c18691d65ae890152f5893952cbe5de32a54a42831048f13be160d` |
| `c-radio-group-6` | Radio group with legend and description | `ce1e182566b6cfdf764b77831c1c3e323c3c65658ce0571545f85fe52029b033` |
| `c-radio-group-7` | Card radio group with descriptions | `5566fd48ea315e60caa455265720002b045c37dd83afb40a09a2122779a5b47f` |
| `c-radio-group-8` | Radio group in card with separators | `dbdb7b33bb6aeb13df213e725bc453fdda37ddc6704bc88e3c40f46e6f95e834` |
| `c-radio-group-9` | Radio group in card with icons | `f56db56731972a2f712b794c9751efcd622f87506bea9f8b2dfc2226f2eebbff` |
| `c-radio-group-10` | Radio group in frame | `c38d3c8ade792a143a13f14048087381321c92fc0c4adaa229c2dd12fcdd108b` |
| `c-radio-group-11` | Radio group with grid layout | `7fae2bc38edea77183c21732ace15b3edc5eb4b26b8fcf6f286d30bd1ba3e7de` |
| `c-radio-group-12` | Avatar based card radio group | `62b31c4aef0c973a6b40eb930090afe402cad6a9b4c62af5f7fdce6c6882fb6b` |
| `c-radio-group-13` | Payment method radio cards | `6dba7410b5dc02c82484eb2e870298f77e2e351b94fd361ec209d6ee6f5d0922` |
| `c-radio-group-14` | Radio group with tooltip info | `4acb9ff4c6f502bf163bc36fbb1376a77d36b5f1fa6027fe0c2e2b266da97e49` |
| `c-radio-group-15` | Radio group with badges | `4430aed796287004b9c2f131a45a322f9270df8c7386be3ab497753403d096b1` |
| `c-radio-group-16` | Inline horizontal radio group | `14460ef83ba4a49a5d531ef563a2f3769fb639d325ae71b3398c580a8e323921` |
| `c-radio-group-17` | Pricing plan radio cards | `aec79f018519474c4a24328be03dbf9d683f6b155fd41a96175898b165857c50` |

Source: <https://reui.io/components/radio-group>

## Kura binding

- `RadioGroup` owns the native fieldset, required legend, shared name/value,
  controlled and uncontrolled state, validation messaging, disabled/read-only
  behavior, and horizontal-to-vertical mobile reflow.
- `Radio` owns the individual native input, label association, keyboard
  behavior, visible focus, help/error text, and semantic selected indicator.
- Storybook composes the generic group with canonical `Card`, `Separator`,
  `Badge`, `Avatar`, `Tooltip`, and Kura icon exports. No registry JSX or
  vendor icon is copied into production code.
- `GridLayout` treats each independently selectable option as an outline Card
  tile. The selected border and subtle accent fill reinforce the native radio
  indicator without making selection color-only.
- Responsive coverage includes the existing `kura320` viewport and a grid
  composition that collapses to one column under 480px.
- Essential instructions remain visible in legends, descriptions, and option
  copy; Tooltip is supplemental only.

## Variant disposition

Retained in Storybook: basic, disabled, descriptive, invalid, legend and
description, card descriptions, card separators, card icons, grid, avatar,
tooltip, badges, inline horizontal, controlled, read-only, keyboard, focus,
hover, dark theme, compact density, and mobile 320px compositions.

Excluded from generic production ownership:

- ReUI arbitrary colour variants: selection uses Kura primary and semantic
  status is expressed with copy or canonical `Badge`.
- ReUI Frame styling: containment is supplied by canonical `Card` or the
  feature-owned section, not by the form primitive.
- Payment-method and pricing-plan examples: the labels, payment brands,
  pricing data, and action policy belong to the owning billing workflow.

## Verification contract

Run focused Storybook interaction tests, TypeScript, lint, Storybook build,
`npm run check:reui-ownership`, and rendered verification at 1440px and
320px. Confirm native radio keyboard navigation, label association, visible
focus, validation announcement, disabled/read-only stability, tooltip
supplementality, grid collapse, dark theme, compact density, and reduced
motion.
