# ReUI Input intake

## Decision

**EXTEND** the canonical Kura `Input` in `src/components/ui`. Kura already owns
the same native single-line text-entry purpose, public export, production
consumers, accessibility wiring, size contract, prefix/suffix slots, and the
fresh Storybook entry `Design System/Primitives/Input`. Creating or retaining a
second ReUI/shadcn input would duplicate that owner.

The extension adds the missing explicit read-only state and expands Storybook
coverage for the compatible ReUI family. No raw ReUI file, Tailwind class,
foreign icon, or vendor namespace is retained.

## Provenance and search evidence

- Source family: <https://reui.io/components/input>
- Registry items inspected: `https://reui.io/r/c-input-1.json` through
  `c-input-31.json`.
- ReUI MCP was not exposed in this workspace session, so the official page and
  public registry payloads were inspected directly.
- Fresh local Storybook index: `design-system-primitives-input--default` and
  eight existing state/variant stories; related owners include `Field`,
  `PhoneInput`, `DateSelector`, `FileUpload`, and `OtpInput`.

## Contract comparison

| Concern | ReUI family | Canonical Kura owner |
| --- | --- | --- |
| Native single-line entry | Shadcn `Input` with native attributes | Existing `Input`; reused unchanged |
| Label, description, error, required | `Field` composition | `Input` convenience props or canonical `Field` composition |
| Disabled and read-only | Native states | Existing disabled state; read-only explicitly promoted in this extension |
| Character counter | Controlled example around `maxLength` | Composed with existing `suffix` and accessible `helpText`; no new prop |
| Email, password, URL | Native input types | Existing native prop passthrough, now demonstrated in Storybook |
| International telephone | Plain `type="tel"` example | `PhoneInput` owns country selection, formatting, flags, and E.164; plain `Input` remains valid only when the calling code is already known |
| Horizontal labels and multiple errors | `Field` examples | Existing `Field` orientation and `FieldError` list stories |
| Complex multi-field form | Page/form composition | Feature owner composed from `FieldGroup`, `Input`, `Select`, and `Button` |

## ReUI family inventory

| Registry examples | Kura decision |
| --- | --- |
| `c-input-1` basic | Retained as an accessible label-less `Basic` story with `aria-label` |
| `c-input-2` label, `c-input-3` description | Existing `Default` and `WithHelpText` stories |
| `c-input-4` disabled, `c-input-5` error | Existing `Disabled` and `Invalid` stories |
| `c-input-6` character counter | Retained as controlled `CharacterCounter`; composed from `maxLength`, `suffix`, and `helpText` |
| `c-input-7` password, `c-input-9` URL | Retained with email in `NativeTextTypes` |
| `c-input-8` phone | Covered by plain native passthrough; international entry is delegated to `PhoneInput` |
| `c-input-10` number | Native passthrough remains available, but stepper/min/max semantics require a separately approved number-field owner |
| `c-input-11` date, `c-input-14` time | Native passthrough remains available; date selection with workflow policy uses `DateSelector` |
| `c-input-12` file | Excluded from Input stories; canonical `FileUpload` owns validation, progress, retry, and removal |
| `c-input-13` required | Existing `Required` story |
| `c-input-15` multi-field form | Existing `FieldGroup`/feature composition; not a primitive variant |
| `c-input-16` tooltip label | Deferred until a canonical Tooltip owner exists; no foreign icon workaround |
| `c-input-17` badge label, `c-input-18` optional badge | Composable through `FieldLabel` and canonical `Badge`; not Input API |
| `c-input-19` label link and visibility action | Feature/auth composition; a generic suffix is intentionally non-interactive |
| `c-input-20` horizontal | Existing `Field orientation="horizontal"` contract |
| `c-input-21` multiple errors | Existing `FieldError errors` contract and interaction story |
| `c-input-22`–`c-input-23` password strength | Excluded from primitive: password policy and recovery belong to an owning auth workflow or a separately approved password-field pattern |
| `c-input-24` pulse, `c-input-25` custom focus, `c-input-26` subtle background, `c-input-27` bottom border | Rejected visual one-offs; Kura owns one semantic focus ring and field surface treatment |
| `c-input-28` color, `c-input-29` range | Excluded specialised controls; neither shares the text-entry visual or interaction contract |
| `c-input-30` pill, `c-input-31` minimal | Rejected styling-only variants with no recurring Kura semantic need |

## Ownership, accessibility, and responsive contract

- Owner: `src/components/ui`; hierarchy: Primitive.
- The native input remains the focus and keyboard owner. Visible label,
  description, errors, required, disabled, and read-only semantics are exposed
  by native attributes and `aria-describedby`.
- Read-only preserves text selection and readable contrast while receiving a
  distinct non-editable surface.
- Prefix and suffix remain presentational. Interactive trailing actions must be
  implemented by an approved higher-level composition rather than hidden
  inside an `aria-hidden` slot.
- The field remains fluid with `min-width: 0`; long content and the 320px story
  prove containment.

## Verification

```sh
npx tsc --noEmit
npx eslint src/components/ui/input.tsx src/components/ui/input.stories.tsx
npx vitest --project storybook run src/components/ui/input.stories.tsx
npm run check:reui-ownership
npm run build-storybook
```
