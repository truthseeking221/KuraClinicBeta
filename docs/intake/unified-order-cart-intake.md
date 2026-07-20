# Unified Clinic order cart intake

## Decision

`DOMAIN-ADAPT + COMPOSE`

Create one Clinic-owned `OrderCart` clinical composite under
`src/features/order-cart`. Doctor and receptionist consume the same cart data,
patient context, lifecycle, priced lines, totals, and order reference. A typed
workflow union changes authority, editability, blockers, operational summary,
and the next emitted action without creating a second cart implementation.

## Use case

A doctor creates and authorizes one patient order; reception receives that same
order to resolve payer, payment, and check-in without losing authorship or
silently changing doctor-authored clinical lines.

## Visual thesis

A compact right-rail order summary that keeps patient context, selected items,
server price, authority, and the role's next safe action visible while keeping
workflow mutations outside the component.

## Sources inspected

- Figma Kura Design:
  - `OrderCart / HBC workflow` node `1194:3749`;
  - payment choice `1194:3322`;
  - empty `1208:28332`;
  - clinic-draw preparation `1194:3580`;
  - expanded collection and payment `1249:84934`.
- Current repository:
  - `src/features/front-desk/cart-rail.tsx` and stories;
  - `src/features/lab-catalog/lab-test-picker.tsx` and stories;
  - `docs/kura-clinic/02-domain-and-rules/order-cart-business-rules.md`;
  - `docs/kura-clinic/03-design-specifications/order-cart-design-spec.md`;
  - `docs/intake/front-desk-cart-backend-compatibility.md`.
- `Kura-med/kura-platform` at connector result commit
  `8b5772caefd1aaace2825f481ebca766894eca2a`:
  - receptionist `OrderCartRail.tsx` and test;
  - server-priced lab lines and FX dependency boundary.
- `Kura-med/ui-kit` at connector result commit
  `4cf3a73dc27b075085ba4807c8cc0198aa73e084`:
  - `src/components/organisms/order-cart.tsx`;
  - receptionist cart fixtures and rail composition.
- `truthseeking221/Kura` at commit
  `17bb07651a15eb67c8df0f16419bfbda4d9286a0`:
  - `Receptionist/src/OrderCart.jsx`, wizard and app integration.

The ReUI registry tool was not available in this workspace. Existing Kura
Card, Badge, Alert, Button, IconButton, MoneyText, and canonical icons supply
the component architecture and interaction behavior.

## Ownership and public contract

The canonical owner is `src/features/order-cart`.

`OrderCartData` owns shared facts:

- cart and order reference;
- patient and encounter context;
- lifecycle (`draft`, `placed`, `cancelled`);
- server-priced line items;
- pricing state and total summary.

`OrderCartWorkflow` is a discriminated union:

- doctor: clinical authority, indication, collection choice, and doctor stage;
- receptionist: doctor/order attribution, payer, payment, operational stage,
  and explicit reception permissions.

The component emits callbacks. It does not execute order placement, clinical
signature, payment capture, check-in, or tube mutation itself.

## Role and authority matrix

| Concern | Doctor | Receptionist |
| --- | --- | --- |
| Shared order reference and lines | Read and edit while draft and authorized | Read the same object |
| Clinical intent | Owns indication and signature | Preserves author and attribution |
| Doctor-authored clinical lines | Editable before the clinical boundary | Read only |
| Receptionist-on-behalf order | Not applicable in doctor view | Editable only while staged and before confirmation |
| Collection route | Chooses clinical fulfilment intent | Executes operational handoff |
| Payment and payer | Reviews consequence where relevant | Resolves and records operational state |
| Primary action | Review, sign/send, or sign/prepare | Continue to payment, take payment, or check in |
| Permission failure | Explorer/read-only/denied reason stays visible | Missing prescriber/payment/check-in permission stays visible |

## Safety and system boundaries

- Patient context stays at the top of a non-empty cart.
- A doctor-authored order is not editable by reception by default.
- Receptionist-on-behalf ordering requires an eligible prescriber before
  continuing.
- Stale or unavailable server pricing blocks the next workflow action.
- Disabled actions always expose the blocking reason and recovery.
- Cancelled lines remain visible for audit and cannot be mutated.
- Payment success does not imply check-in, collection, or order closure.
- The component never derives insurance settlement or captures payment.

## Icon decision

The Figma and legacy empty states use a shopping-cart glyph. The canonical Kura
Storybook inventory currently has no cart or basket icon. The implementation
therefore uses a typography-led empty state and does not import another icon
library, copy an SVG, or substitute a semantically inaccurate icon. The icon
can be added later only through `Design System/Foundations/Icons`.

## Storybook coverage

- Doctor: building, PSC review, clinic draw, Explorer locked, placed read-only.
- Receptionist: doctor-order review, on-behalf missing prescriber, payment due,
  KHQR waiting, ready to check in, checked in.
- Shared system states: empty, pricing loading/error/stale and recovery,
  supplemental balance, cancelled audit view, permission denied, long content.
- View states: 320px mobile, 768px tablet, compact, comfortable, and dark.
- Flow: doctor signs and hands the same order reference and items to reception;
  clinical item controls disappear while the reception payment action appears.

## Migration

`src/features/front-desk/cart-rail.tsx` is retained as a compatibility adapter.
It maps the existing `FrontDeskPatient` and callbacks into the shared
`OrderCart` contract. New Clinic surfaces should import from
`src/features/order-cart`; they must not add another cart renderer under a
role-specific feature.

## 2026-07-20 — Figma realignment (node 1194-3749, `OrderCart / HBC workflow`)

The first implementation drifted from the source board. Rebuilt so design and
interaction match Figma exactly while one component still serves both roles.

| Figma element | Decision | Implementation |
|---|---|---|
| Selected tests list (13 catalog tests, count badge, per-line remove, trash-all) | **REPLACE** | Header `Selected tests` + count Badge; grouped lines; remove/clear only while editable. |
| Collection & payment decision card (Set up → 3 questions → Edit/View summary) | **CREATE** | `DoctorDecisionCard`: option cards (`I will draw the blood now` / `Kura will draw the blood` with brand mark), PSC↔Patient-Home SegmentedToggle, pay-now vs pay-later; `panel: unset/expanded/summary`; locked after money moves (`paymentLocked`, edits route to Booking). |
| Reception tender card | **CREATE** | Cash / KHQR / pay-later option cards; locked after capture (void/supplemental note). Hidden at `order-review` — the wizard footer owns the next action there. |
| “You’ll earn” row | **CREATE** | `earnings {commissionBp, earnMinor}` from doctor-banking `commission_bp`; `earnMinorFromBp` = BigInt floor(subtotal×bp/10000); $166.00 × 15% = $24.90. |
| Cash attestation checkbox | **CREATE** | “I have collected $X via cash or KHQR” gates pay-now (doctor) and cash/KHQR capture (reception). |
| CTA vocabulary per status | **REPLACE** | `Send booking code` / `Prepare Tubes` / `Track home collection` / `Confirm collection & scan` / `Collection confirmed` / `Confirm payment & check in` / `Check in & confirm order` / `Patient checked in`; every disabled state shows its reason. |
| Tube preparation subview (Scan/Print, stopper dots, n/n scanned, undo) | **CREATE** | In-cart `TubePrepView`; stopper colors are token strings in data (collection-feature precedent); scan-all gate before confirm. |
| Empty state with cart glyph | **REPLACE** | `ShoppingCartIcon` added canonically (Hugeicons `ShoppingCart01Icon`, all 10 styles + catalog entry) — supersedes the earlier “no cart icon” exclusion above. |

Removed from the old implementation: doctor stages `building/review` (now one
`draft` stage + decision card), `onEditCollection`, `CartLine`/`CartTotals`
duplicates (deleted with their stories; shared OrderCart is the only renderer;
`cart-rail.tsx` stays as the FrontDeskPatient adapter). Reception KHQR
provider-waiting rendering moved behind `payment.status` labels — polling and
QR remain workflow-owned.

Verification: 16 unit tests (decision gates, earnings math, tube progress, CTA
state machine per role), 32 order-cart story tests incl. three end-to-end flow
plays (home-collection → code sent; self-draw → scan → confirmed; reception
cash → attest → checked in), front-desk suite repointed at the new copy.
