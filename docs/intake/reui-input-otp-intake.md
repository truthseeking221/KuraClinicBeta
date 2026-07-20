# Intake record — ReUI Input OTP

Date: 2026-07-17 · Owner: `src/components/ui`

This record completes the decision gate in
`docs/architecture/storybook-reuse-and-component-intake.md`. ReUI is the
interaction reference; Kura does not copy its styles, composition markup, or
authentication flows.

## Decision

| Incoming capability | Primary decision | Canonical owner and evidence |
| --- | --- | --- |
| ReUI Input OTP | **EXTEND** | `OtpInput` is the established numeric verification-code primitive in `src/components/ui`, already used by the auth door and onboarding flow. Its hand-written multi-input implementation was replaced with the MIT-licensed `input-otp` primitive used by ReUI so the visual slots remain one logical native input. |

## Kura contract

`OtpInput` lets a patient or staff member enter an issued numeric verification
code. It owns controlled value entry, numeric filtering, SMS one-time-code
autofill, paste transformation, completion notification, disabled state, and
label / helper / invalid-message accessibility. Its caller owns sending and
verifying the code, retries, expiry, rate limiting, support recovery,
authorisation, audit logging, and any consequential next action.

The visible slots never become independent form fields: the underlying
`input-otp` input is the single keyboard and screen-reader target. This
preserves native selection, deletion, paste, password-manager handling, and
`autocomplete="one-time-code"` behaviour.

## ReUI family coverage

ReUI supplies six examples: basic OTP, digits-only, grouped separators,
alphanumeric, four-digit PIN, and an email-verification form. Kura retains the
numeric OTP/PIN core with configurable length and group size, including the
default `3–3`, joined `6`, grouped `2–2–2`, and joined `4` visual anatomies,
numeric keyboard, code paste, completion callback, error, disabled, and
320px-mobile stories.

The alphanumeric behavioral variant is not promoted because no Kura journey
needs licence-key entry. ReUI's joined groups and separators are promoted as a
visual anatomy of the same numeric verification primitive. The full verification
example remains a feature composition: it must use the owning auth flow for
resend, expiry, messaging, and verification rather than placing those policies
in a UI primitive.

## Kura visual and responsive binding

The component uses Kura semantic surface, border, text, focus, destructive,
type, spacing, radius, motion, and disabled tokens. Slots share borders inside
each group and only the outer slots carry radius, matching ReUI's visual
structure without retaining foreign styling. The six-slot numeric layout is
fluid and contained; its ReUI-aligned 32px slots and 16px canonical separator
remain within the page at 320px with no page-level
horizontal overflow. Supporting and error copy wraps beneath the control.
Focus uses the Kura focus ring, errors retain a visible destructive border and
announced recovery message, and reduced-motion users see a stable caret.

## Verification

Storybook covers typed completion, separator-tolerant paste, Backspace,
invalid, disabled, four-digit, and 320px-mobile contracts. The primitive is
also consumed by the existing auth-door and onboarding verification flows.
