# Front-desk cart backend compatibility record

## Decision

`DOMAIN-ADAPT + COMPOSE`

The Storybook cart is a priced-order summary. It does not own order placement,
payment capture, promo validation, insurance settlement, or a combined
check-in transition.

## Repository authority

- Repository: `Kura-med/kura-platform`
- Default-branch commit inspected:
  `938b172b05d3bcbeabbcdb9226ff2d06ce7afa36`
- Documentation:
  - `README.md`
  - `docs/INDEX.md`
  - `docs/adr/INDEX.md`
  - `docs/architecture/system-diagram.md`
  - `docs/adr/ADR-0038-clinic-lab-catalog-order-flow-order-ms-booking-ms.md`
  - `docs/adr/ADR-0039-lab-test-payment-ledger-settlement.md`
  - `docs/adr/ADR-0040-payment-balance-seam-db-topology-outbox-rail.md`
  - `docs/adr/ADR-0041-money-representation-currency-model.md`
- Frontend implementation:
  - `apps/clinic/clinic-receptionist-mf/src/app/ReceptionWizardPage.tsx`
  - `apps/clinic/clinic-receptionist-mf/src/app/chrome/OrderCartRail.tsx`
  - `apps/clinic/clinic-receptionist-mf/src/app/chrome/use-wizard-footer.ts`
  - `apps/clinic/clinic-receptionist-mf/src/app/steps/06-payment/PaymentStep.tsx`
  - `apps/clinic/clinic-receptionist-mf/src/app/lib/reception-cart-deps.ts`
  - `apps/clinic/clinic-receptionist-mf/src/app/lib/reception-fx-deps.ts`
  - `apps/clinic/clinic-receptionist-mf/src/app/lib/reception-payment-deps.ts`
- BFF and contracts:
  - `apps/bff/clinic-bff/src/app/order/dto/place-order.dto.ts`
  - `apps/bff/clinic-bff/src/app/order/order.controller.ts`
  - `apps/bff/clinic-bff/src/app/payment/dto/capture-cash.dto.ts`
  - `apps/bff/clinic-bff/src/app/payment/payment.controller.ts`
  - `libs/contracts/src/lib/order.ts`
  - `libs/contracts/src/lib/payment.ts`
  - `libs/contracts/proto/order.proto`
  - `libs/contracts/proto/payment.proto`
  - `libs/money/src/lib/money.ts`

## Contract mapping

| Concern | Backend fact | Storybook mapping |
|---|---|---|
| Persona | Clinic receptionist through `clinic-bff` | `Clinic/Front Desk` |
| Cart pricing | `POST /clinic/lab/cart/expand`; int64 minor strings | `CartItem.priceMinor`; `MoneyText` |
| Order placement | `POST /clinic/order/place`; server re-expands cart | Workflow step, never CartRail |
| Payment | Separate cash capture endpoint after placement | Payment step, never CartRail |
| FX | `GET /clinic/config/fx-rate`; typed USD→KHR quote | Injected `FxRateQuote`; no component constant |
| Auth/context | Clinic auth plus workspace, branch, actor context | No unsupported permission claim in CartRail |
| Failures | Pricing unavailable, invalid amount, currency mismatch, idempotency conflict, not capturable, missing branch, service unavailable | Pricing loading/error/retry stories; payment errors remain owned by payment UI |
| Unsupported | Client promo, mock insurance settlement, local GP fee, combined check-in/order action | Removed from CartRail contract |

## Storybook state coverage

- empty;
- building;
- pricing loading;
- pricing error and retry;
- paid;
- supplemental;
- placed read-only;
- cancelled;
- permission/read-only behavior;
- long content;
- 320, 360, 390, 412, 480, 768, and 1024px viewports.
