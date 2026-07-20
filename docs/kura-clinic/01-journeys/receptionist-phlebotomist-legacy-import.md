# Receptionist and phlebotomist legacy import

Status: implemented as a mock-only Clinic prototype specification  
Last reviewed: 2026-07-15  
UI authority: `@kura/ui-kit` Storybook  
Domain authority: `00-source-of-truth/clinic-operations-domain-truth.md`

## 1. Purpose

This document preserves the useful workflow knowledge from the two historical
prototypes and defines how it is represented inside the Next.js Clinic app.
It is not an endorsement of the historical component structure or visual
language. Reception and phlebotomy are Clinic modules, not standalone
micro-frontends, and all prototype records are deterministic mock data.

## 2. Source register

| Source | Material reviewed | What is retained |
| --- | --- | --- |
| `truthseeking221/Kura` | `Receptionist/src/App.jsx`, `Wizard.jsx`, `Steps.jsx`, `OrderCart.jsx`, `data.js`, patient matching, receipt, notification and PWA intake files | desk queue, identity doors, resumable reception journey, intake flags, insurance, order revision, teleconsult disposition, payment and receipt cases |
| `truthseeking221/kura-phlebo` | `PhleboScreen.jsx`, `PhleboShell.jsx`, `PatientCard.jsx`, `QueueDrawer.jsx`, `ScanGate.jsx`, `VitalsForm.jsx`, `SampleDetailPanel.jsx`, `InspectorScreen.jsx`, `phleboData.js` | queue ordering, positive-ID, vitals, CLSI order of draw, label scan, inversion, stability timers, draw exceptions and handoff |
| Kura Clinic domain truth | identity, visit, order, sample, payment, claim, settlement and result-review axes | authoritative state ownership and allowed transitions |
| Journey catalog and case matrix | `REC-*`, `PHL-*`, `COL-*`, `FIN-*`, `PAT-*`, `ORD-*`, `LOG-*` | exhaustive prototype scenarios and reject/recovery paths |

## 3. Architecture decision

- Receptionist and phlebotomist are feature modules under `apps/clinic/dcm`.
- They share Clinic workspace, branch, station, actor and capability context.
- Storybook injects a scenario fixture; feature components never fetch a real
  remote or depend on Module Federation.
- UI atoms, molecules and shell primitives come from the public
  `@kura/ui-kit` API. Feature-level composites may compose those primitives.
- No new design tokens are introduced. The UI-kit theme remains the single
  token authority.
- Legacy styling and legacy local primitives are not imported.

## 4. State ownership and invariants

The product must not collapse these axes into one status:

| Axis | Representative states | Owner at this point |
| --- | --- | --- |
| Identity assurance | provisional, document-captured, NID-verified, merge-review | reception captures context; phlebotomy performs positive-ID at draw |
| Phone control | unknown, verified, stale/shared | independent evidence; never treated as patient identity |
| Booking | planned, revised, cancelled, expired, no-show | reception/ordering workflow |
| Visit | planned, arrived, identity-resolved, draw-complete, completed, cancelled | reception owns arrival; phlebotomy owns draw completion |
| Order | draft, confirmed, revised, served/partially-served | order workflow; line-level evidence |
| Collection task | queued, in-service, draw-not-completed, partial, complete | phlebotomy work item; not a sample |
| Sample | collected, received-at-lab, accepted, consumed, rejected, discarded | sample/custody workflow |
| Payment/claim | waiting, pending, deferred, collected, pending-claim, claimed, voided, refunded | financial workflow, independent of visit |
| Settlement | ineligible, eligible, frozen, settled, reversed | only paid/claimed plus served lines qualify |

Non-negotiable rules:

1. A booking, visit, order, collection task and sample are different records.
2. A planned tube or printed pre-draw label does not imply a collected sample.
3. In the normal patient-in path, a sample is born directly as `collected`
   only after successful positive-ID and a registered draw.
4. A failed, refused or deferred draw produces an immutable draw-attempt event,
   not a fake sample.
5. A rejected sample remains in history with coded reason, fault attribution,
   timestamp, actor and custody evidence.
6. Recollection creates a new linked booking/task. Its replacement sample does
   not exist until a new draw and then references `supersedesSampleId`.
7. Payment success never marks a visit complete. Draw completion never marks a
   payment collected.
8. Cancellation before draw preserves financial history and uses void/refund
   policy. After draw, cancellation cannot erase the episode.
9. Exact phone lookup can resolve a candidate but does not increase identity
   assurance. Prefix/fuzzy phone results never auto-resolve.
10. Every mutating command carries actor, workspace, branch, target, outcome,
    timestamp and idempotency context.

## 5. Receptionist module

### 5.1 Workbench lifecycle

```text
queue
  -> resolve booking/patient
  -> mark visit arrived
  -> review demographics/contact/intake
  -> resolve payer per order line
  -> confirm or safely revise order
  -> resolve teleconsult disposition when applicable
  -> collect/defer/claim/waive payment
  -> enqueue one phlebotomy work item
```

The workflow is resumable per visit. A desk handoff restores the current step,
but every action revalidates current workspace, capability and record version.

### 5.2 Identity entry doors

| Door | Success | Reject/block | Recovery |
| --- | --- | --- | --- |
| Booking code | resolve exact booking and patient; audit lookup | unknown, expired, cancelled, already redeemed, wrong branch | retry, phone lookup, explicit walk-in, supervisor correction |
| Exact normalized phone | one match resolves without assurance increase | zero matches or multiple/shared guardian phone | explicit walk-in or redacted disambiguation using name plus DOB/age plus sex |
| Name search | redacted candidate list only | ambiguous or cross-workspace result | add DOB/age and sex; never select first result automatically |
| NID/document scan | capture document evidence and detect collision | unreadable, invalid, NID belongs to another record | recapture or create merge-review item; safe service may continue after positive-ID |
| Walk-in | stable provisional patient and arrived visit | missing name plus DOB/YOB/age plus sex, duplicate preflight conflict | complete fields or select existing candidate; phone is optional |

Shared/guardian phones keep patient, contact and guardian relationships distinct.
Changing a previously verified phone clears phone verification and candidates.
Concurrent walk-in creation must return the winning idempotent record rather
than silently create a duplicate.

### 5.3 Review and intake

Required desk review:

- name, DOB/YOB/age, sex at birth and at least one verified or governed contact;
- patient assurance, phone control, document evidence and merge state shown as
  separate facts;
- audited unlock for corrected demographics;
- stale/offline form and conflict states never overwrite newer answers.

The historical patient intake is retained as eight conditional sections:

1. Today's visit and referral context.
2. Current preparation: fasting, exercise, alcohol, medication timing,
   hydration and urine timing.
3. Prescription medication, biotin/B-complex, OTC, supplements and traditional
   medicine.
4. Private reproductive context for female patients aged 12–60: LMP,
   pregnancy, breastfeeding, contraception, cycle timing, PCOS, menopause and
   HRT.
5. Recent illness/fever, vaccination, transfusion, surgery, trauma, travel and
   sleep.
6. Lifestyle: smoking, typical alcohol use, exercise and diet.
7. Sample comfort: prior draws, fainting, preferred arm, difficult veins,
   latex allergy and port/PICC/fistula.
8. Explicit HIV/STI and genetic-test consent when ordered.

Conditional behavior retained:

- test groups reveal only applicable questions;
- female reproductive section is hidden outside the age/sex rule;
- sensitive consent appears only for sensitive orders;
- sections 3, 5 and 6 may be prefilled after a returning patient explicitly
  reports no change;
- a returning patient with a visit in the last 12 months may skip redundant
  sample-comfort capture;
- skipping a required section requires an explicit reason and confirmation;
- expired/replayed/wrong-recipient secure links reveal no PHI and require a new
  verified link.

Operational warnings forwarded to reception and phlebotomy include:

- food during fasting window; recent moderate/intense exercise; recent alcohol;
- biotin interference and iron supplementation;
- recent fever, transfusion, surgery, trauma or relevant travel;
- dehydration and urine timing;
- fainting history, difficult veins and latex allergy;
- never draw from a port/PICC/fistula arm;
- declined sensitive-test consent blocks only the affected line and preserves
  the rest of the order.

### 5.4 Insurance, order and teleconsult

- Insurance may be absent explicitly, eligible, ineligible, pending,
  partially covered or covered by multiple policies.
- Coverage and payer responsibility are resolved per order line, not per
  booking.
- Empty order, duplicate test, panel/analyte overlap, unsupported test,
  mixed-currency and stale-price cases have explicit blockers.
- Selecting a draw route prepares a tube plan but creates no sample.
- Replacing the patient invalidates identity/payment context and recomputes
  payer and price.
- Before collection, edits are versioned and repriced. After collection,
  destructive line removal is blocked and routed to governed correction.
- A paid pre-collection edit uses either a void/refund route or an explicit
  supplemental adjustment; it never overwrites the paid record.
- Teleconsult lines require booked, skipped with reason, waived by policy or
  not-applicable disposition before payment completion.
- Receptionist-on-behalf orders preserve `createdBy` receptionist and selected
  authorized `doctorId`; an unauthorized or expired-license clinician blocks
  confirmation.

### 5.5 Payment and receipt

| Route | Allowed states and behavior |
| --- | --- |
| Cash | waiting/deferred -> collected after desk confirmation |
| KHQR | pending intent -> collected only after exact provider confirmation; client success alone is insufficient |
| Insurance | pending-claim -> claimed; denial/partial payment leaves line-level responsibility |
| Split payer | each line/amount has explicit payer; minor units sum exactly |
| Zero due | explicit covered/waived reason; no fabricated payment |
| Pay later | deferred with authorized reason and follow-up owner |

Expired pay links stay unpaid; retry creates a safe new intent. Duplicate and
out-of-order provider callbacks are idempotent or sent to reconciliation.
Collected/claimed cancellation creates a linked refund; an unpaid intent is
voided. The original payment, receipt and settlement evidence remain immutable.

### 5.6 Reception terminal outcomes

- `arrived + identity-resolved + phlebotomy queued`;
- cancelled before draw with void/refund outcome;
- waiting for payer/intake/identity correction with named blocker;
- no-show after policy timer, never inferred from payment alone;
- after-draw correction routed to sample disposition/recollection, not cancel.

## 6. Phlebotomist module

### 6.1 Queue and context

- Work items sort by clinical priority and wait time; STAT is explicit.
- More than 30 minutes warns; more than 60 minutes escalates.
- Reassignment or stale version refreshes actor/workspace/order context before
  mutation.
- The patient banner remains visible with name, DOB/age, sex, patient ID,
  booking/order, allergies, fasting, mobility, identity state and warnings.
- Empty, offline, permission-denied and stale-data states have explicit
  recovery actions.

### 6.2 Positive-ID gate

Before any draw registration:

1. Ask the patient to state full name and DOB using open, non-leading prompts.
2. Compare stated answers with booking/patient context.
3. Capture NID when required and check collision.
4. Confirm consent, allergies, fasting/preparation and safe draw site.

Missing/leading answers or a mismatch creates no sample. A unique NID can raise
assurance to `nid-verified`. An NID collision creates a merge-review item but
does not automatically merge or necessarily block safe service. A patient who
cannot verbalize uses a named supervisor/guardian exception with audit evidence;
the UI must not fabricate a pass.

### 6.3 Vitals

Required when configured: height, weight, heart rate and blood pressure.
Optional/configurable: temperature with C/F display, SpO2, respirations, pain,
fasting and vaccination. BMI is derived. Out-of-range values require review and
explicit confirmation. If vitals were completed elsewhere or are not required,
that disposition is recorded; missing values do not silently appear normal.

### 6.4 Draw and tube verification

The tube plan follows CLSI/WHO order of draw:

1. yellow SPS/culture;
2. light-blue sodium citrate;
3. red serum;
4. gold SST;
5. green lithium heparin;
6. gray-green sodium heparin;
7. lavender EDTA;
8. pink EDTA;
9. white/pearl PCR/PPT;
10. dark-gray sodium fluoride.

Each planned tube carries additive, tests, volume/container, inversion count,
handling and optional processing window. Scanning behavior:

- unknown barcode: block and retain patient context;
- barcode already used: block collision and create audited label reissue;
- wrong color/extra tube: quarantine/remove; never expand the order;
- already collected/rejected label: inspect immutable history, do not reset;
- exact expected tube: register the draw/sample, collector and timestamp;
- partial set: show missing/extra set and remain not-ready;
- all expected tubes: ready only after required inversions and exception review.

`Mark all collected` from the old prototype is retained only as a demo action
that executes one registered draw command per planned tube after positive-ID.
It never mutates a pre-created sample.

### 6.5 Exceptions, timers and custody

- Patient refused, difficult vein, failed draw, insufficient volume and revisit
  later are draw-attempt outcomes without a collected sample for that tube.
- Collection timers warn before stability/processing limits and escalate after
  breach; changing ETA cannot hide the breach.
- Printer offline enters controlled downtime. A manual label requires two-ID
  trace, actor and later audited reprint/reconciliation.
- Handoff requires exact sample set, sender, receiver, location and timestamp.
  Receiver/set mismatch refuses handoff.
- Offline handoff queues one ordered event; duplicate sync is idempotent.
- Broken seal, lost sample, temperature excursion and late pickup freeze the
  affected downstream path and create an incident/disposition.
- Rejection requires code, label, fault owner, timestamp and custody link.
- Recollection rejects/preserves the old sample, creates a new linked task and
  uses a new barcode only after replacement draw.

### 6.6 Phlebotomy terminal outcomes

- complete expected sample set, inversions confirmed, custody ready and visit
  advanced `identity-resolved -> draw-complete -> completed`;
- partial draw with named missing-tube recovery;
- draw not completed with immutable reason and reschedule/escalation owner;
- sample rejected with governed disposition and optional recollection plan;
- custody blocked/escalated while sample and visit history remain intact.

## 7. Storybook scenario contract

Reception stories cover:

- default, empty, long-wait, offline, stale and access-denied queues;
- booking found/not-found/expired/cancelled/redeemed;
- exact phone one/zero/multiple/shared-guardian matches;
- walk-in provisional, incomplete and duplicate-conflict;
- complete/incomplete/stale intake and all material preparation/consent warnings;
- eligible/ineligible/pending/no/multi-policy insurance;
- empty, staged, duplicate, overlapping, stale-price and paid-edit orders;
- booked/skipped/waived/not-applicable teleconsult;
- cash, KHQR, claim, split, zero-due, deferred, void and refund;
- authorized/unauthorized doctor-on-behalf and before/after-draw cancellation.

Phlebotomy stories cover:

- scan idle/unknown/fallback, queue empty/long-wait/offline/stale/denied;
- positive-ID pass/mismatch/leading prompt/NID collision/unable-to-verbalize;
- vitals empty/normal/abnormal/elsewhere;
- ready/STAT/partial/wrong/extra/duplicate tube cases;
- inversion pending/complete and timer warning/breached;
- refused/difficult/failed/insufficient draw attempts;
- printer downtime and audited reissue;
- handoff ready/mismatch/offline and lost/seal/temperature/late exceptions;
- structured reject and linked recollection before/after replacement draw.

## 8. Traceability to canonical cases

| Capability | Canonical cases |
| --- | --- |
| Reception identity | `CASE-ID-010`–`017`, `023`–`025` |
| Order preparation/revision | `CASE-ORD-002`–`006`, `008`–`020` |
| Arrival and queue | `CASE-COL-001`–`003` |
| Positive-ID and draw | `CASE-ID-018`–`022`, `CASE-COL-004`–`006`, `013`–`015` |
| Labels and tube set | `CASE-COL-007`–`012` |
| Custody | `CASE-COL-016`–`018`, `CASE-LAB-006`, `010` |
| Rejection/recollection | `CASE-LAB-004`–`009` |
| Payment/claim/refund | `CASE-FIN-001`–`009`, `014`–`018`, `021`–`024` |

## 9. Mock-data rules

- Fixtures are synthetic and contain no real PHI.
- IDs, timestamps, provider responses, audit entries and timers are
  deterministic so Storybook interaction tests are repeatable.
- Adapter commands update only local React state.
- Network calls, remote entries, backend authentication and real payment rails
  are intentionally absent.
- Mock shortcuts are labelled as demo actions and still obey domain transition
  guards so the prototype does not teach an unsafe mental model.

## 10. Implemented modules and verification

The legacy visual structures remain separate feature modules inside Clinic:

- `ReceptionistPrototypeModule`: 64px navigation rail, reception header,
  patient header, six-step journey, step workspace and independent order cart;
- `PhlebotomyPrototypeModule`: 240px Kura Booth sidebar, booth header, patient
  journey card, Vital Signs workspace, Collection workspace and Tube Inspector.

Both modules compose public `@kura/ui-kit` atoms. They contain no native
`button`, `input`, `select` or `textarea` elements and do not import a second UI
library. Storybook's Tailwind entry explicitly scans Clinic-owned compositions,
so responsive utilities are present in the production Storybook bundle rather
than relying on incidental classes already used by the UI kit.

Verification on 2026-07-15:

- 54 Receptionist fixture cases map one-to-one to 54 stories;
- 46 Phlebotomy fixture cases map one-to-one to 46 stories;
- no missing, duplicate or unknown scenario mapping;
- all 100 stories render through the static Storybook build;
- interaction assertions pass for queue handoff, duplicate identity,
  cash confirmation, after-draw cancellation, positive-ID mismatch, registered
  draw/sample birth, draw refusal and visit completion;
- structural axe rules pass after fixing Select names, checkbox labels,
  landmarks and the Vital Signs page heading;
- representative Receptionist, Vital Signs, Collection and Inspector screens
  have zero document-level horizontal overflow at 390px, 768px and 1440px;
- Clinic typecheck and the production Storybook build pass;
- source audit finds no network call, remote entry or Module Federation
  dependency in either feature.

The only remaining axe findings are inherited Storybook color-token debt, not
feature-specific styling: the default primary Button itself uses white text on
`#268cff` (3.34:1), and existing success tokens also fall just below WCAG AA in
small text. The feature does not override those tokens because Storybook is the
sole UI authority; the contrast change must be made once at UI-kit token level
and validated across every consumer.
