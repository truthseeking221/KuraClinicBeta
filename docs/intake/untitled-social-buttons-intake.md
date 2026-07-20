# Untitled UI Social Buttons intake

## Provenance

- Source: <https://www.untitledui.com/react/components/social-buttons>
- Implementation reviewed: <https://github.com/untitleduico/react/blob/main/components/base/buttons/social-button.tsx>
- Provider-mark source: <https://github.com/simple-icons/simple-icons> via <https://github.com/icons-pack/react-simple-icons> (`@icons-pack/react-simple-icons@12.9.0`, MIT wrapper package)
- Review date: 2026-07-16

## Kura task and classification

| Item | Finding |
| --- | --- |
| Journey | `ACC-01` — sign in and restore session |
| Role | Any staff member |
| Primary task | Choose an enabled external identity provider without confusing it with the primary work-email magic-link path. |
| Primary action | Start the auth-owner's configured provider handoff. |
| Source of truth | Core clinic auth is work-email magic link and Kura session. Google sign-in is a later enhancement. |
| Existing evidence | `Button` is the canonical action primitive and explicitly excludes social login. No auth pattern owns provider availability, provider handoff, or magic-link fallback. |
| Primary decision | `CREATE` |
| Owner | `src/components/shared/identity-provider` |
| Layer | Pattern |
| Production boundary | This pattern carries only provider display, availability, and callback presentation. The auth owner retains OAuth configuration, state/redirect validation, session recovery, workspace scope, and audit rules. |

## External-to-Kura contract

| External SocialButton capability | Kura disposition |
| --- | --- |
| Button / disabled / loading anatomy | Reuse the canonical `Button`. |
| Named provider choice | Retain as `IdentityProviderButton` with `providerName`. |
| Provider group | Retain as a vertical `IdentityProviderButtonGroup` with group semantics. |
| Provider logo | Extend the canonical Kura icon foundation with `GoogleProviderMark` and `TelegramProviderMark`. The identity-provider pattern accepts only the explicit `providerBrand` identifiers `google` and `telegram`; it uses `LoginIcon` when no approved mark applies. |
| Google / Facebook / Apple / X / Figma / Dribbble catalogue | Reject as a fixed visual enum. Only an auth-configured provider may be supplied. |
| Brand, color, gray themes | Reject. Provider brand colours are not Kura semantic UI colour tokens. |
| Icon-only buttons | Reject. Provider identity must remain explicit in text. |
| Link mode | Reject. Provider redirect construction belongs to the auth flow. |
| Two source sizes | Reuse Kura Button's density and `lg` touch-safe size. |

## State and safety model

The auth owner supplies `{ id, displayName, providerBrand?, availability, unavailableReason?, startHandoff }`.

- `available`: a named provider button may initiate the owner callback.
- pending: Kura Button's loading state prevents duplicate activation.
- `unavailable`: the button is disabled and a visible work-email fallback is associated with it.
- transport, redirect, callback, session-expiry, workspace-revocation, and provider-error recovery remain the authentication flow's responsibility; stories compose `Alert` for the provider-failure recovery state.

No provider claim, verification status, workspace access, or session outcome is inferred from the visual component.

## Binding map

| Source concern | Kura binding |
| --- | --- |
| Tailwind palette and provider hex colours | `Button` outline semantic surface and text tokens |
| Source font, spacing, radius, shadow, transition | Canonical Button tokens and density behavior |
| Source SVG logos | Canonical `LoginIcon`, `GoogleProviderMark`, or `TelegramProviderMark`; provider marks retain only recognizable geometry, inherit `currentColor`, and remain decorative beside the explicit provider label. |
| Horizontal social groups | Vertical wrapping group that stays usable at 320px |
| Generic sign-in copy | Kura work-email magic-link fallback and staff access language |

## Story coverage

The canonical Storybook owner covers a generic configured provider, multiple generic choices, unavailable provider with explicit magic-link fallback, provider failure and recovery, canonical Google and Telegram mark rendering, and narrow/mobile long content. The icon foundation also documents both provider-mark wrappers. The pattern is exposed from `src/components/shared/index.ts` so production consumes the same implementation.

## Provider-mark extension and backend compatibility

| Item | Record |
| --- | --- |
| Primary decision | `EXTEND` the canonical `src/components/ui/icons` foundation and `IdentityProviderButton`; no new auth flow, provider, route, or state transition is created. |
| Exact source | Simple Icons slugs `google` and `telegram`; React wrapper package `@icons-pack/react-simple-icons@12.9.0`. The package supports React 19 and has no Node engine restriction at this version. |
| Visual binding | The wrappers force `currentColor`, so provider palette hex values do not enter Kura UI. Kura Button remains the owner of colour, typography, spacing, size, focus, density, and responsive behavior. |
| Accessibility | Marks are decorative beside the button's visible provider name. When rendered standalone in the icon Storybook story, they receive an explicit accessible name. |
| Compatibility evidence | Local product documentation consulted: `docs/kura-clinic/00-source-of-truth/master-source.md` and `docs/kura-clinic/02-domain-and-rules/application-analysis.md`. They conflict on whether Google sign-in is current or a later enhancement. Attempts to read the required current default branch documents and repository at `Kura-med/kura-platform` on 2026-07-16 returned 404 in this environment. |
| Compatibility decision | Compatibility of a live Google or Telegram handoff is **unknown**. This extension is display-only: `providerBrand` must come from an already approved auth configuration and is never inferred from `providerName`. The branded Storybook scenario makes both providers unavailable with the work-email fallback; no backend behavior or availability claim is added. |
