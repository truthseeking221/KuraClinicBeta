# Source register and conflict policy

Reviewed for this consolidation on 2026-07-14. “Authority” means product-logic authority, not proof of delivery.

## Source register

| ID | Source | Scope used | Authority | Delivery caveat |
| --- | --- | --- | --- | --- |
| SRC-01 | [Current Kura platform workspace](../../../apps/) | Persona apps, BFFs, services, clinic/lab/identity implementation evidence | Highest implementation authority in this workspace | Code presence does not certify that every journey is complete |
| SRC-01P | [FINAL DCM prototype domain](<../../../../FINAL DCM/src/features/clinic-operations/domain/>) | Identity, capabilities, visit/sample transitions, payment, result release, commission | Prototype logic evidence | Separate local prototype workspace; not production certification |
| SRC-02 | [Clinic operations domain truth](../00-source-of-truth/clinic-operations-domain-truth.md) | Consolidated operational rules and resolved contradictions | Highest document authority | Explicitly lists unfinished areas |
| SRC-03 | [Kura Master Source](../00-source-of-truth/master-source.md) | Actors, architecture, core objects, product boundary, finance and results | High contextual authority | Snapshot dated 2026-06-21; later domain truth wins |
| SRC-03H | [Complete Business, Product & Clinical Handbook](../00-source-of-truth/handbook/Kura_Complete_Business_Product_Clinical_Handbook_2026-07-14.docx) | Compiled business, product, clinical, finance, security, architecture, governance, and failure-recovery narrative | Supporting compiled reference | Snapshot dated 2026-07-14; its evidence labels and source/certainty register apply, and it does not override current code or explicit resolved decisions |
| SRC-04 | [Clinic Patient Intake v1](https://app.notion.com/p/37dbdd6cb9f181c78245e1b80fe5d633) | Doctor phone gate, reception three doors, NID, merge, assurance | High for resolved decisions | Page status/prose contains historical status drift; use decisions, not its delivery claims |
| SRC-05 | [Booking Origination Matrix](https://app.notion.com/p/37dbdd6cb9f1814e9b77dbfe2749afd9) | Patient-in vs blood-in and known vs unknown phone | High for quadrant definition | C/D are the active slice; A/B deferred |
| SRC-06 | [Pricing & Doctor Spreads](https://app.notion.com/p/37dbdd6cb9f18104b912d712c6349a4b) | Per-line pricing, spread classes, paid+served, ledger and settlement | High for invariants | Marked “Not started”; several legal/architecture questions remain |
| SRC-07 | [Clinic Lab Order → Patient Pay-Link](https://app.notion.com/p/388bdd6cb9f1817a9405dc8d5193c81a) | Hosted pay-link, SMS, reconciliation, idempotency | Decided concept | “Later / Not started”; fallback at PSC deferred |
| SRC-08 | [Clinic DCM](https://app.notion.com/p/37dbdd6cb9f181dbb27ae7d465bd51cc) | Full doctor-app surface inventory | Scope authority | Page says UI pending/not started while this repo contains prototypes; not delivery truth |
| SRC-09 | [Insurance claims rail](https://app.notion.com/p/37dbdd6cb9f181f8a1fbfbe1170ba095) | Eligibility/claim/reconciliation boundary | Roadmap authority | Later++; read-only eligibility/schema only is claimed |
| SRC-10 | [Polyclinic workspace](https://app.notion.com/p/37dbdd6cb9f1810b989cfbf091c72631) | Multi-doctor, receptionist-on-behalf, workspace scoping | Roadmap authority | Later; current v1 wedge is solo owner-doctor |
| SRC-11 | [Kura platform repository](https://github.com/Kura-med/kura-platform) | Next-gen service/persona boundaries and architecture | Architecture evidence | Repository state alone does not prove product completion |
| SRC-12 | [Figma patient acquisition journey](https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-18526) | Phone gate and provisional identity storyboard | Design evidence | Storyboard; no end-to-end prototype reactions |
| SRC-13 | [Figma order/phlebotomy journey](https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177) | Ordering, collection, labeling and handoff storyboard | Design evidence | Component state changes only; contains continuity/safety contradictions |
| SRC-14 | [Application analysis](../02-domain-and-rules/application-analysis.md) | Historical detailed surface and interaction analysis | Supporting | Older states/rules may be superseded |
| SRC-15 | [Lab catalog order journey](../01-journeys/lab-catalog-order-journey.md) | Detailed doctor catalog/cart interactions | Supporting | Doctor-centric and predates current clinic-operation truth |
| SRC-16 | Private ChatGPT “Kura project” | Requested conversations/files | Unavailable | No callable project inventory or stable URL was available; not claimed reviewed |

## Conflict resolution rules

1. Prefer explicit state transitions and invariants over screen copy.
2. Prefer resolved decisions over open-question prose from an older section of the same page.
3. Separate “decided” from “implemented.” Notion roadmap status and local prototype existence may legitimately differ.
4. Figma may illustrate a journey but cannot redefine identity, specimen, payment, result, or authorization rules.
5. Do not use a demo percentage, price, patient, order number, tube count, or hard-coded status as a global rule.
6. If no source resolves a clinically or legally sensitive question, mark it `OPEN`; do not invent a default.

## Conflicts resolved in this pack

| Conflict | Resolution |
| --- | --- |
| Phone treated as identity vs contact | Phone only finds/verifies current control; NID is the hard identity anchor. |
| Doctor creates a booking without patient vs provisional patient now | Doctor mints a provisional patient; `booking.patient_id` remains present. |
| Doctor no de-dup vs known-phone reuse | Known phone shows redacted candidates for human confirm; unknown/none creates provisional. |
| Reception OTP vs trusted desk lookup | Exact-phone reception lookup may resolve one audited record without OTP and without increasing assurance. |
| Sample created at order vs draw | Normal PSC/clinic sample is born at registered draw; scheduled/HBC may pre-create `awaiting-collection`. |
| Photo/QR means verified vs evidence only | Photo/QR is evidence or token; positive-ID, collection, label verification, and custody remain separate events. |
| Booking status carries payment/sample/result | Five state axes remain independent. |
| Global commission percentage vs per-line rules | Resolve a versioned rule per line using the precedence waterfall; snapshot it. |
| Paid booking earns immediately vs paid+served | Both payment and real service delivery are required before split activation. |
| Result exists vs result releasable | Accepted specimen, adequate assurance, doctor review, and configured notification gate control release. |
| Shared phone auto-select vs disambiguation | Show all allowed candidates and require a human choice or “none/new patient.” |
| NID collision blocks draw vs post-episode merge | Preserve the episode, queue audited merge, process after the result episode. |

## Unresolved or policy-owned questions

- What precise service-delivery event activates each order-line split: accession accepted, analysis consumed, or result released?
- Is partial payment/partial service activated per line or only after the full booking is settled?
- What is the legal form of covered-test doctor remuneration and what payer-specific caps apply?
- What identity/release policy applies to irretrievable blood-in specimens that can never reach NID verification?
- What is the production token model, expiry, replay protection, and recipient authentication for intake/results links and tube QR flows?
- Which critical-result types require synchronous escalation, read-back, timeout escalation, and regulator-specific retention?
- What exact multi-currency settlement and FX snapshot policy applies?
- How are clinical note amendments, prescription cancellation, and e-signature revocation handled after signing?

Until resolved, these remain explicit gates in the journey case matrix.
