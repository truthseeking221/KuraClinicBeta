# ReUI Phone Input intake

## Decision

**CREATE** `src/components/ui/phone-input.tsx` as the canonical Kura `PhoneInput` component, with its styles and Storybook family beside the component.

The existing `Input` owns labelled single-line text entry. `src/features/auth/door.tsx` has a feature-local native `Select` plus `Input` for one authentication flow, but it does not own a searchable country picker, country flags, E.164 normalisation, country-aware formatting, or a shared read-only contract. It is not a reusable component owner. Creating a small component-level composition is therefore preferable to changing Auth or duplicating the pattern in every form.

## Upstream inspection

- Source page: <https://reui.io/components/phone-input>
- Registry metadata/source inspected: `https://reui.io/r/phone-input.json`
- Upstream implementation: a custom `react-phone-number-input` wrapper with a searchable Combobox country selector, SVG flags, and `Input` composition.
- Upstream dependencies: `react-phone-number-input`; registry dependencies include Button, Combobox, Input, and Scroll Area.
- No ReUI source file was copied into the repository. Kura owns the API, semantics, markup, styling, and tests.

The complete documented upstream family contains eight examples: basic, small, large, disabled, preset value, error, specific default country, and read-only. Its inherited phone-number API additionally covers country restriction, labels, international formatting, editable calling codes, country-change notification, and E.164 output.

## Kura contract

| Concern | Kura decision |
| --- | --- |
| Owner and taxonomy | `Design System/Components/Phone Input`; component owner is `src/components/ui`. |
| Primary task | Enter an international telephone number after selecting the appropriate country or region. |
| Data model | The caller owns E.164 `value`, permitted `countries`, localized labels, errors, and persistence. `onChange` returns E.164 or `undefined` when cleared. |
| Reused Kura primitives | Kura `Combobox` is used for searchable, keyboard-operable country selection; canonical Kura icons provide the disclosure and no-country fallback. |
| International data | `react-phone-number-input` supplies numbering metadata and country flag assets, the same library chosen by the inspected ReUI implementation. |
| Validation boundary | Formatting and parsing are local. Reachability, SMS/OTP delivery, consent, identity matching, duplicates, audit, and permissions remain in the owning workflow. |
| Visual binding | Kura semantic color, type, spacing, radius, focus/elevation, density, and responsive tokens; no Tailwind utilities, ReUI namespace, or demo shell. |

The component supports `sm`, `md`, and `lg`, controlled or default E.164 values, `defaultCountry`, restricted country lists, custom labels, international input, editable country calling code, disabled, read-only, error, required, and helper-text states. Read-only disables both the numeric field and country control so the state has one unambiguous meaning.

## Variant inventory

| Upstream capability | Kura Storybook coverage | Decision |
| --- | --- | --- |
| Basic country picker and formatted number | `Default` | Retained |
| Small size | `Small` | Retained |
| Large size | `Large` | Retained |
| Disabled | `Disabled` | Retained |
| Existing E.164 preset | `PresetValue` | Retained |
| Error feedback | `Error` | Retained; the owning validator supplies specific recovery copy. |
| Explicit default country / permitted list | `SpecificDefaultCountry` | Retained |
| Read-only | `ReadOnly` | Retained and strengthened to lock country selection as well. |
| Country search and changing selection | `Default` interaction test | Retained through Kura Combobox. |
| Narrow/mobile and long content | `LongContentMobile` | Retained |
| ReUI `popupClassName` and `scrollAreaClassName` | None | Excluded: they are styling escape hatches; Kura owns viewport, scroll, and popup token behavior. |
| ReUI demo containers, sample content, and product logic | None | Excluded: no generic form field may invent verification, consent, identity, or business workflow policy. |

## Accessibility and responsive behavior

- The visible label connects to the numeric input. Helper/error copy is joined through `aria-describedby`; errors are announced with `role="alert"`.
- The country trigger has a contextual accessible name and the search field has an explicit name. Kura Combobox provides keyboard navigation, visible focus, selection indication, Escape/outside dismissal, and focus restoration.
- Error, disabled, and read-only states are communicated with text/semantics in addition to color. The selected flag is decorative because the trigger name carries the country meaning.
- The field stays fluid from 320px. The country popup is constrained to the visual viewport and scrolls internally; coarse pointers retain the Kura minimum touch target.

## Verification

Run after implementation:

```sh
npx tsc --noEmit
npx eslint src/components/ui/phone-input.tsx src/components/ui/phone-input.stories.tsx
npx vitest --project storybook run src/components/ui/phone-input.stories.tsx
npm run check:reui-ownership
npm run build-storybook
```
