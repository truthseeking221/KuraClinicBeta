# Source register and conflict policy

Reviewed for this consolidation on 2026-07-21. “Authority” means product-logic authority, not UI quality or proof of delivery.

## Source register

| ID | Source | Scope used | Authority | Delivery caveat |
| --- | --- | --- | --- | --- |
| SRC-01 | [Kura platform repository](https://github.com/Kura-med/kura-platform) | Current backend code, BFF and service contracts, migrations, tests, non-superseded ADRs, and domain specifications | Highest current business-logic and backend authority | Frontend presence does not certify UX quality or release readiness; an accepted ADR without built evidence describes intent, not delivery |
| SRC-01W | [Current Storybook and prototype workspace](../../../src/) | UI construction, fixtures, product documentation, coverage, and audits | Implementation comparison only | Must consume or trace to current backend contracts before a flow can be called ready |
| SRC-02 | [Clinic operations domain truth](../00-source-of-truth/clinic-operations-domain-truth.md) | Consolidated operational rules and resolved contradictions | Highest local document authority | Derived source; correct it when current platform evidence disproves it |
| SRC-03 | [Kura Master Source](../00-source-of-truth/master-source.md) | Actors, architecture, core objects, product boundary, finance and results | High contextual authority | Snapshot dated 2026-06-21; later domain truth wins |
| SRC-03H | [Complete Business, Product & Clinical Handbook](../00-source-of-truth/handbook/Kura_Complete_Business_Product_Clinical_Handbook_2026-07-14.docx) | Compiled business, product, clinical, finance, security, architecture, governance, and failure-recovery narrative | Supporting compiled reference | Snapshot dated 2026-07-14; its evidence labels and source/certainty register apply, and it does not override current code or explicit resolved decisions |
| SRC-04 | [Clinic Patient Intake v1](https://app.notion.com/p/37dbdd6cb9f181c78245e1b80fe5d633) | Doctor phone gate, reception three doors, NID, merge, assurance | High for resolved decisions | Page status/prose contains historical status drift; use decisions, not its delivery claims |
| SRC-05 | [Booking Origination Matrix](https://app.notion.com/p/37dbdd6cb9f1814e9b77dbfe2749afd9) | Patient-in vs blood-in and known vs unknown phone | High for quadrant definition | C/D are the active slice; A/B deferred |
| SRC-06 | [Pricing & Doctor Spreads](https://app.notion.com/p/37dbdd6cb9f18104b912d712c6349a4b) | Per-line pricing, spread classes, paid+served, ledger and settlement | High for invariants | Marked “Not started”; several legal/architecture questions remain |
| SRC-07 | [Clinic Lab Order → Patient Pay-Link](https://app.notion.com/p/388bdd6cb9f1817a9405dc8d5193c81a) | Hosted pay-link, SMS, reconciliation, idempotency | Decided concept | “Later / Not started”; fallback at PSC deferred |
| SRC-08 | [Clinic DCM](https://app.notion.com/p/37dbdd6cb9f181dbb27ae7d465bd51cc) | Full doctor-app surface inventory | Scope authority | Page says UI pending/not started while this repo contains prototypes; not delivery truth |
| SRC-09 | [Insurance claims rail](https://app.notion.com/p/37dbdd6cb9f181f8a1fbfbe1170ba095) | Eligibility/claim/reconciliation boundary | Roadmap authority | Later++; read-only eligibility/schema only is claimed |
| SRC-10 | [Polyclinic workspace](https://app.notion.com/p/37dbdd6cb9f1810b989cfbf091c72631) | Multi-doctor, receptionist-on-behalf, workspace scoping | Roadmap authority | Later; current v1 wedge is solo owner-doctor |
| SRC-11 | [Legacy Kura UI kit](https://github.com/Kura-med/ui-kit) | Storybook, tokens, themes, primitives, and historical component contracts | Legacy design-system evidence | Does not establish current backend behavior, permission, clinical, money, or release rules |
| SRC-11R | [Legacy receptionist application](https://github.com/truthseeking221/Kura) | Receptionist screens, interaction paths, and operational terminology | Legacy receptionist evidence | May expose missing cases; does not override current platform contracts |
| SRC-11P | [Legacy phlebotomist application](https://github.com/truthseeking221/kura-phlebo) | Collection, tube, timer, barcode, and phlebotomy interaction paths | Legacy phlebotomy evidence | May expose missing cases; does not override current platform contracts |
| SRC-11D | [Legacy FINAL DCM workspace](<../../../../FINAL DCM/>) | Doctor UI, identity, capability, visit/sample, payment, result-release, and commission prototypes | Legacy DCM evidence | Separate local prototype; mock or hard-coded behavior is not a current rule |
| SRC-12 | [Figma patient acquisition journey](https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-18526) | Phone gate and provisional identity storyboard | Design evidence | Storyboard; no end-to-end prototype reactions |
| SRC-13 | [Figma order/phlebotomy journey](https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177) | Ordering, collection, labeling and handoff storyboard | Design evidence | Component state changes only; contains continuity/safety contradictions |
| SRC-14 | [Application analysis](../02-domain-and-rules/application-analysis.md) | Historical detailed surface and interaction analysis | Supporting | Older states/rules may be superseded |
| SRC-15 | [Lab catalog order journey](../01-journeys/lab-catalog-order-journey.md) | Detailed doctor catalog/cart interactions | Supporting | Doctor-centric and predates current clinic-operation truth |
| SRC-16 | Private ChatGPT “Kura project” | Requested conversations/files | Unavailable | No callable project inventory or stable URL was available; not claimed reviewed |

## Conflict resolution rules

1. For current behavior, prefer executable backend code, migrations, contracts, and tests in SRC-01 over every UI or legacy source.
2. For intended behavior not yet built, prefer accepted, non-superseded SRC-01 ADRs and specifications, then explicit resolved decisions. Keep intended and implemented status separate.
3. Within SRC-01, obey its explicit amendment, supersede, and precedence markers. Retained historical prose is not active truth.
4. Prefer explicit state transitions and invariants over screen copy.
5. Prefer resolved decisions over open-question prose from an older section of the same source.
6. Treat SRC-01 frontend code as implementation evidence only. It is not UX or release-readiness authority.
7. Treat SRC-11, SRC-11R, SRC-11P, SRC-11D, and Figma as historical or design evidence. They may reveal branches and gaps but cannot redefine identity, specimen, payment, result, or authorization rules.
8. Do not use a demo percentage, price, patient, order number, tube count, or hard-coded status as a global rule.
9. If no source resolves a clinically or legally sensitive question, mark it `OPEN`; do not invent a default.

## Reviewed evidence snapshot

- `Kura-med/kura-platform@a136a5b5d988730299de00b8c31c7cacd6548782`
- `Kura-med/ui-kit@4cf3a73dc27b075085ba4807c8cc0198aa73e084`
- `truthseeking221/Kura@17bb07651a15eb67c8df0f16419bfbda4d9286a0`
- `truthseeking221/kura-phlebo@18d2e91773240b3f079c9f71be68a679f0f07a86`
- `/Users/macbook/Documents/FINAL DCM@35da8b6a`

These refs make the audit reproducible. Later source changes require re-review; they do not silently rewrite this pack.

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
