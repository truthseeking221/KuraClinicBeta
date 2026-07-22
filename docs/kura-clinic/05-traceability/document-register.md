# Document register

All Kura Clinic product documents that previously lived at the `FINAL DCM` repository root or its generic `docs/` directory were consolidated into this workspace under `docs/kura-clinic/` on 2026-07-14.

## Canonical documents created by the consolidation

| Document | Purpose | Authority |
| --- | --- | --- |
| [Pack index](../README.md) | Entry point, authority order, folder map, product boundary | Canonical index |
| [End-to-end journeys](../01-journeys/end-to-end-journeys.md) | Cross-role lifecycle flows and recovery | Canonical journey narrative |
| [Doctor care-loop map](../01-journeys/doctor-care-loop-map.md) | Doctor-centered trigger-to-closure projection, independent state axes, handoffs, and open gates | Canonical journey projection; domain truth and catalog remain authoritative |
| [Doctor journey coverage matrix](../01-journeys/doctor-journey-coverage-matrix.md) | Generated inventory of every doctor-direct and doctor-impacting journey, actor, status, and case count | Generated traceability projection; journey catalog remains authoritative |
| [Journey catalog](../01-journeys/journey-catalog.md) | Complete journey inventory and coverage state | Canonical inventory |
| [Journey case matrix](../01-journeys/journey-case-matrix.md) | Happy/reject/retry/concurrency/recovery cases | Canonical acceptance inventory |
| [Figma journey logic audit](../04-audits-and-quality/figma-journey-logic-audit.md) | Logic-only review of supplied Figma journeys | Canonical design audit |
| [Source register](source-register.md) | Source authority, conflicts, and open questions | Canonical traceability |
| [Document register](document-register.md) | Location and status of every document | Canonical traceability |

## Compiled handbook

| Document | Purpose | Authority |
| --- | --- | --- |
| [Complete Business, Product & Clinical Handbook](../00-source-of-truth/handbook/Kura_Complete_Business_Product_Clinical_Handbook_2026-07-14.docx) | 79-page compiled operating-system handbook with 34 chapters, 5 appendices, business/product/clinical logic, finance, security, architecture, governance, and edge cases | Supporting compiled reference; its evidence labels and source/certainty register apply, while current code, domain truth, and explicit resolved decisions win conflicts |

The archived copy is byte-identical to the supplied source file. SHA-256: `a856ab6e5396c761a6d75f7ba6a7677f1b7a5ab5387a833a76fda03bba9655af`.

## Move map

| Previous path | Current path | Status |
| --- | --- | --- |
| `mastersource.md` | [00-source-of-truth/master-source.md](../00-source-of-truth/master-source.md) | Supporting master context; later domain truth wins |
| `docs/clinic-operations-product-logic.md` | [00-source-of-truth/clinic-operations-domain-truth.md](../00-source-of-truth/clinic-operations-domain-truth.md) | Canonical domain rules |
| `Kura Clinic Doctor App Project Goal.md` | [00-source-of-truth/product-goal.md](../00-source-of-truth/product-goal.md) | Product framing |
| `Kura Lab Catalog Order Flow User Journey.md` | [01-journeys/lab-catalog-order-journey.md](../01-journeys/lab-catalog-order-journey.md) | Detailed historical doctor journey; subject to domain truth |
| `Kura Phone Gate Modal Spec.md` | [01-journeys/phone-gate-journey.md](../01-journeys/phone-gate-journey.md) | Detailed phone-gate spec; subject to domain truth |
| `KuraDCM Specs.md` | [02-domain-and-rules/application-analysis.md](../02-domain-and-rules/application-analysis.md) | Historical full app analysis |
| `Kura Order Cart — Doctor Business Spec.md` | [02-domain-and-rules/order-cart-business-rules.md](../02-domain-and-rules/order-cart-business-rules.md) | Doctor cart business rules |
| `Kura Order Cart Design Specs.md` | [03-design-specifications/order-cart-design-spec.md](../03-design-specifications/order-cart-design-spec.md) | Component/design specification |
| `design.md` | [03-design-specifications/design-system.md](../03-design-specifications/design-system.md) | Design-system source/prompt |
| `magicpath-kura-dcm-command-workspace.md` | Expected destination: `03-design-specifications/magicpath-command-workspace.md` | Known missing source: no copy exists in the current workspace or the previous `FINAL DCM` workspace; do not treat it as reviewed or available |
| `Kura Canvas Pierre UX Audit Report.md` | [04-audits-and-quality/canvas-pierre-ux-audit.md](../04-audits-and-quality/canvas-pierre-ux-audit.md) | Historical UX/product audit |
| `design-qa.md` | [04-audits-and-quality/design-qa.md](../04-audits-and-quality/design-qa.md) | Design QA record |

## Reading policy for historical documents

The moved documents were preserved rather than rewritten wholesale. This avoids erasing the reasoning and requirements they captured. Where they contradict current logic:

- use [clinic operations domain truth](../00-source-of-truth/clinic-operations-domain-truth.md);
- use the `DECIDED/OPEN/DEFERRED` status in the journey catalog;
- treat fixed names, prices, percentages, booking codes, tube counts, and result counts as scenario fixtures, not global rules;
- do not infer production availability from the presence of a design or prototype.

## Repository docs intentionally outside this folder

`README.md`, `AGENTS.md`, `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`, `CONTEXT.md`, `RUNBOOK.md`, and `plans/README.md` are workspace, harness, or planning entry points rather than documents in this Clinic truth pack. They remain at their canonical workspace locations.
