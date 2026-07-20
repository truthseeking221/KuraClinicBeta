# Intake record — Clinic App Shell + front-desk/collection flows

Date: 2026-07-16 · Ticket: clinic-flows · Owner: leon@kura.med

Decision ledger required by `docs/architecture/storybook-reuse-and-component-intake.md`.
Every incoming element records exactly one primary decision with evidence.
Sources consulted per item: (1) this repo's canonical exports + stories,
(2) ReUI MCP registry search, (3) legacy prototypes (feature/logic reference
only), (4) upstream kura-platform (architecture reference only).

## Shell

| Element | Decision | Evidence |
|---|---|---|
| App Shell (`src/components/shared/app-shell/`) | **CREATE** | No canonical shell in repo. ReUI `app-shell-1`/`app-shell-2` inspected as skeleton references — rejected for direct intake: Radix Sidebar + Tailwind palette + `next-themes` vs house idiom (CSS modules over Kura tokens, existing primitives). Upstream `clinic-shell` renders Reception as a peer nav item over a static `CLINIC_NAV`; this shell replaces that with capability-derived operational modes (unified-clinic-app direction). Full metadata in `app-shell.stories.tsx` parameters. |
| Mode registry (`mode-registry.tsx`) | **CREATE** | New concept (operational modes). Capability names mirror the proposed clinical extension of `authz-catalog.ts` (today admin-only, 8 permissions). Modes derive from permissions ∪ enabledModules ∪ licence — never from role names. |
| Sidebar tokens (`--sidebar-*`, tokens.css) | **EXTEND** | Token layer mapped onto existing ink/brand ramps; zero new hex. |

## Primitives

| Element | Decision | Evidence |
|---|---|---|
| `dropdown-menu` | **REUSE** | Already canonical in repo (Radix headless + CSS modules). Used by workspace/mode/shift/account switchers. |
| `checkbox`, `radio`, `badge`, `button`, `icon-button`, `alert`, `alert-dialog`, `avatar`, `autocomplete`, `card`, `calendar`, `segmented-toggle` | **REUSE** | Already canonical in repo. |
| `input` | **CREATE** | No canonical text field existed. ReUI/shadcn input evaluated — rejected: house idiom is native elements + CSS modules; authoring cheaper than unbinding Tailwind. |
| `kbd` | **CREATE** | No equivalent; needed by ⌘K trigger. Trivial. |
| `sheet` | **CREATE** | ReUI/shadcn sheet is Radix Dialog + Tailwind; house `alert-dialog` already proves the native `<dialog>` pattern — sheet reuses that mechanism with side postures (right/left/bottom). |
| `stepper` | **CREATE from ReUI architecture** (`source-reui`, `adapted-kura`) | ReUI `stepper` (free) intaken via shadcn CLI to `.tmp/reui-intake/clinic-flows/stepper/`. Context architecture, roving-tabindex tablist keyboard model, and full public API preserved (orientation, controlled/uncontrolled, completed/disabled/loading, custom indicators, asChild, forceMount). Tailwind → Kura tokens via CSS modules. Two upstream defects fixed: `stepsCount` displayName check never matched (always 0); ref access during render (`myIdx` useMemo on `btnRef.current`). |

## Flow components (front-desk + collection)

ReUI MCP searched before every CREATE. Query log:

- "wizard stepper multi-step check-in flow with cart summary rail" → `stepper` (intaken above); `checkout-1`/`onboarding-7` premium blocks noted as composition references only.
- "scan input barcode gate queue list patient waiting station checklist vitals form" → **0 results**. Scan gate, draw queue, safety checklist, vitals form have no ReUI equivalent → CREATE on house primitives.
- "order summary line items receipt payment breakdown timeline activity" → receipt/order blocks are premium page compositions; the domain cart/receipt will **COMPOSE** house primitives (`card`, `badge`, `table` when needed). ReUI `timeline` (free) noted as candidate for custody/booking history — intake deferred until that surface is built.

| Element (planned) | Decision | Basis |
|---|---|---|
| Check-in wizard (6 steps: Identity → Review → Insurance → Orders → Teleconsult → Payment) | **COMPOSE** (stepper + input + checkbox + radio + card + alert) | Logic from legacy Receptionist census; ReUI supplies stepper only. |
| Patient search + match card | **COMPOSE** + CREATE match-card pattern | Autocomplete exists; match scoring logic from legacy `patientMatching.js`. |
| Order cart rail | **DOMAIN-ADAPT + COMPOSE** | Backend-priced line items only; Card + Badge + Alert + CartLine + CartTotals + MoneyText. Promo, insurance settlement, local GP fee, payment capture, and combined check-in actions are excluded until supported by the clinic BFF contract. |
| Coverage/insurance step | **COMPOSE** | Radio + input + alert; rules from legacy `coverage.js`. |
| Receipt | **COMPOSE** | Card + badge; print styling deferred. |
| Scan gate | **CREATE** | ReUI 0 hits. Input + autofocus/refocus contract from legacy `ScanGate.jsx` (PID regex, shake on error, queue fallback). |
| Draw queue (drawer) | **COMPOSE** (sheet + badge) | Legacy `QueueDrawer.jsx`: pick = scan; waiting-minutes sort. |
| Pre-draw safety checklist | **COMPOSE** (checkbox + alert) | Legacy checks `{id, fasting, allergy, consent, site}`; positive-ID stays open-question per domain law. |
| Tube plan + scan confirm | **CREATE** | ReUI 0 hits. Per-tube scan state, invert confirmation, defer path from legacy `PhleboScreen.jsx`. |
| Vitals form | **COMPOSE** (input grid + alert) | Legacy `VitalsForm.jsx` fields/thresholds. |

## Collection build results (2026-07-16)

| Element | Decision | Notes |
|---|---|---|
| `table` primitive | **CREATE** | ReUI data-grid = TanStack wrapper for interactive grids; clinical rows need a light semantic table. Scroll containment inside the table, tabular-nums numeric columns. |
| `select` primitive | **CREATE** | Native select keeps the OS picker on booth/desk touch devices; Radix listbox rejected for this need. Shares Input field anatomy. |
| `src/features/collection/` | **CREATE (flow) + COMPOSE** | scan-gate, safety-checklist, sample-table, defer-dialog, vitals-form, draw-worksheet + pure `logic.ts` carrying every census rule (submit gate, clot timers, OOR, BMI, queue tones, scan resolution). |
| TubeRack (order-of-draw strip) | **DEFERRED (conscious)** | The table already sorts by CLSI order and shows stopper colors; the rack duplicates that at a glance. Revisit if bench operators ask for it. |

Governance deltas from legacy (deliberate, documented in story metadata):
checklist now GATES collection · collect/reset writes unified · Esc-clear actually
implemented · status vocabulary canonicalized (`awaiting_collection|collected` +
booth-local `deferred`).

## Front-desk build results (2026-07-16)

| Element | Decision | Notes |
|---|---|---|
| `src/features/front-desk/` | **CREATE (flow) + DOMAIN-ADAPT + COMPOSE** | check-in-wizard, CartRail, CartLine, CartTotals, and pure gate logic. Cart money uses int64 minor-unit strings; FX is injected from the config contract; CartRail is summary-only. Unsupported client promo, mock coverage settlement, local GP fee, and combined check-in/order confirmation were removed. |
| Wizard nav | **REUSE** `stepper` (ReUI-adapted) | Gate statuses map to completed/disabled StepperItems. |

Documented exclusions (visual ceremonies, not rules): QR/NFC identity capture,
Telegram channel + photo/KHQR patient capture, booking-code intake, patient PWA,
split cash+KHQR UI (rule retained in logic; one payment decision per screen).
Each is a re-addable surface; none changes the gate engine.

## Canonical vocabulary

Flow components use backend enums verbatim (`libs/contracts/src/lib/status/`):
sample `awaiting_collection|collected|received_at_lab|accepted|rejected|discarded|consumed`;
collection code `draft|issued|scheduled|redeemed|expired|cancelled`; capture `paid`;
assurance `unverified|verified` (two states only — never render a third rung).

## Open items

- `.tmp/reui-intake/clinic-flows/` must be deleted before handoff (guard: `npm run check:reui-ownership`; eslint ignores `.tmp/**`).
- `npx vitest` currently fails at config load (`ERR_REQUIRE_ESM`, std-env) — pre-existing environment issue; play tests verified via Storybook build until fixed.
- Icons: Hugeicons Pro is the canonical set for this Storybook (user decision 2026-07-16); upstream Phosphor mapping is out of scope here.

## Step 1–3 upstream ui-kit parity (2026-07-16, ticket step1-identity)

Source: `Kura-med/ui-kit` Storybook — `Receptionist/Wizard/Step 1 Identity`,
`Step 2 Patient`, `Step 3 Insurance` (raw clone inspected; nothing copied
verbatim — Tailwind, tabler icons, Radix Select/Dialog/Tooltip chrome, and the
pink sex glyph all replaced with house primitives/tokens; sex renders as a text
chip, never color alone).

| Element | Decision | Evidence |
|---|---|---|
| `PatientResolutionCard` (7 variants: known-here/known-elsewhere/shared-phone/booking-linked/candidate/no-match/captured) | **CREATE (COMPOSE Card, Avatar, Badge, Button)** | No canonical identity-resolution capability existed. Selectable cards act as radios in the "Who is here today?" radiogroup; matched-field emphasis binds to `--color-warn-100`. |
| `IdentitySearch` (kind-detect + booking-QR dialog + Other-ID menu) | **CREATE (COMPOSE Input, Button, Dialog, DropdownMenu, Badge)** | One field understands the three reception doors (exact-phone, booking-code, walk-in name). Detected-kind chip in the input suffix; scanner dialog parses `kura://booking/<code>`. |
| Step-1 flow (`StepIdentity` rewrite) | **REPLACE** | Manual name-form replaced by search-first resolution; capture advances to Step 2 in one action; minors gate on confirmed guardian; unknown booking codes offer no new-patient shortcut (a code claim must resolve). Collision engine (name/DOB/phone scoring) retained under the captured view. |
| Step-2 (`StepReview` extension) | **EXTEND** | Identity section with locked captured fields + explicit Unlock (uses `identity.lockedFields`), Khmer name (`lang="km"`), preferred language, optional Address + Bakong refund-account disclosures (house Collapsible in Card). Contact gate (SMS OTP) unchanged. |
| Step-3 (`StepInsurance` rewrite) | **REPLACE** | Full policy contract: member ID/group/coverage/co-pay/active-until/pre-auth/tier/effective as data points; add-policy form (provider/member/expiry/coverage), transient checking state, eligibility verdict, co-pay banner, Re-verify. Direct-pay stays an explicit recorded decision. |
| Cart rail visibility | **UX rule** | Rail hidden on steps 1–3 unless the cart already has items (mirrors upstream `hideAside`; non-empty cart keeps paid context visible when navigating back). |

Exclusions (hardware/platform ceremonies, shown as such): NID chip/QR capture
("Coming soon" menu), capture photo, Telegram channel, insurance-card scan,
real KHQR scan (fixture payload). Test-side fix: native-dialog fade-in via
`@starting-style` races jest-dom `toBeVisible` — dialog assertions wrap in
`waitFor` (root cause of the pre-existing PaidEditChoice/sheet flake).

## Booking detail sheet + timeline tone (2026-07-17, ticket booking-detail)

| Element | Decision | Evidence |
|---|---|---|
| `timeline` primitive | **REUSE canonical + EXTEND `tone`** | Canonical Timeline already existed (built same day); added an add-only semantic `tone` (`success/warning/danger`) on `TimelineItem` for lifecycle branches — markers echo meaning, text carries it. Raw ReUI source re-inspected in `.tmp/reui-intake/booking-detail/` and deleted; upstream 12-example family covered by orientation/slots already present. |
| `BookingDetailSheet` (`src/features/front-desk/`) | **COMPOSE (Sheet + Timeline + Badge + MoneyText + Alert + Button)** | Architecture reference: ReUI block `solution-bookings-3` — nothing pasted. Lifecycle timeline derives purely from canonical collection-code status via `bookingTimeline()` (logic.ts); blocked codes (expired/cancelled/redeemed/wrong-branch) render `bookingBlockMeta` guidance and a state-safe recovery action: walk-in for expired/wrong-branch, desk-queue review for redeemed, and parent-confirmed walk-in for cancelled. `BookingSummary.payment` added (capture contract: `paid` only real state; `pending` = no capture). |

Exclusions: deposit-progress bar (no partial-capture contract), internal notes/staff assignment (no backend contract — separate ticket).
