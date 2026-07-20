# Kura Clinic journey catalog

This is the complete journey index for the current Kura Clinic product boundary. A journey is listed even when it is deferred, because omission is not a product decision.

Detailed lifecycle sequences are in [end-to-end journeys](end-to-end-journeys.md). Branch, reject, retry, and recovery cases are in the [journey case matrix](journey-case-matrix.md).

## Access, workspace, verification, and authorization

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| ACC-01 | Sign in and restore session | Any staff | Login → authenticated active session | PARTIAL |
| ACC-02 | Select/switch active workspace | Multi-workspace staff | Account menu → scoped workspace | PARTIAL |
| ACC-03 | Owner-doctor first-time onboarding | Doctor | New account → clinic profile created | PARTIAL |
| ACC-04 | Professional KYD/licence verification | Doctor | Verification prompt → verified/rejected/resubmit | PARTIAL |
| ACC-05 | Verification-gated clinical action | Doctor | Restricted CTA → verification complete or safe exit | PARTIAL |
| ACC-06 | Invite/manage workspace member | Owner/admin | Members settings → active/revoked membership | DECIDED |
| ACC-07 | Receptionist acts for a doctor | Receptionist | Active workspace → booking attributed to chosen doctor and actor | DEFERRED |
| ACC-08 | Capability-denied action | Any staff | CTA/API → no mutation, reason and audit | PARTIAL |
| ACC-09 | Session expiry during draft | Any staff | Expired token → re-auth and recover safe draft | OPEN |
| ACC-10 | Workspace revoked during session | Any staff | Revocation → immediate loss of scoped access | OPEN |
| ACC-11 | Security/audit review | Owner/admin | Settings → filtered immutable events/export | PARTIAL |
| ACC-12 | Sign out / terminate other sessions | Any staff | Account/security → token/session invalidated | OPEN |

## Home, search, worklists, navigation

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| WQ-01 | Home/today dashboard | Doctor | Home → prioritized work understood | PARTIAL |
| WQ-02 | Global search / command palette | Doctor | Search/⌘K → authorized entity/action opened | PARTIAL |
| WQ-03 | Review-today results worklist | Doctor | Result queue → reviewed/deferred/escalated | PARTIAL |
| WQ-04 | Booking worklist | Doctor/reception | Bookings → booking selected/resolved | PARTIAL |
| WQ-05 | Inbox triage | Doctor | Inbox → thread/action resolved | PARTIAL |
| WQ-06 | Calendar schedule view | Doctor/reception | Calendar → visit opened/created/rescheduled | PARTIAL |
| WQ-07 | Task worklist | Doctor/staff | Tasks → done/deferred/reassigned | PARTIAL |
| WQ-08 | Notification deep link | Any staff | Notification → authorized exact context | OPEN |
| WQ-09 | Empty/error/stale worklist | Any staff | Load failure/no rows → retry or next safe action | PARTIAL |

## Patient acquisition, identity, intake, and chart

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| PAT-01 | Doctor phone gate, known single patient | Doctor | Phone+OTP → redacted candidate reused | PARTIAL |
| PAT-02 | Doctor phone gate, shared phone | Doctor | Phone+OTP → one of N candidates selected | PARTIAL |
| PAT-03 | Known phone, none of these | Doctor | Candidate list → provisional patient created | PARTIAL |
| PAT-04 | Unknown phone, provisional patient | Doctor | Phone+OTP+minimal identity → stable provisional record | PARTIAL |
| PAT-05 | OTP send/resend/rate limit/expiry | Doctor/patient | Phone gate → verified or safe blocked state | PARTIAL |
| PAT-06 | Change phone after OTP | Doctor | Edited phone → prior verification invalidated | DECIDED |
| PAT-07 | Reception door 1: booking code | Receptionist | Code → exact patient/booking resolved | DECIDED |
| PAT-08 | Reception door 2: exact phone, one match | Receptionist | Exact phone → audited record resolution | DECIDED |
| PAT-09 | Reception exact phone, multiple matches | Receptionist | Shared phone → human disambiguation | DECIDED |
| PAT-10 | Reception code/phone not found | Receptionist | Failed lookup → retry or walk-in door | DECIDED |
| PAT-11 | Reception door 3: walk-in | Receptionist | Find-or-create → provisional patient+booking | DECIDED |
| PAT-12 | Concurrent walk-in creation on same phone | Receptionist | Two creates → one serialized result/no silent duplicate | DECIDED |
| PAT-13 | Positive identification at draw | Phlebotomist | Open name+DOB questions → identity-resolved | IMPLEMENTED |
| PAT-14 | Capture NID and upgrade assurance | Phlebotomist | Valid unique NID → nid-verified | IMPLEMENTED |
| PAT-15 | NID collision and merge queue | Phlebotomist/data steward | Collision → draw preserved, merge queued post-episode | IMPLEMENTED |
| PAT-16 | Merge steward review | Data steward | Queue item → merge/reject/escalate with audit | DECIDED |
| PAT-17 | Search/list patients | Doctor | Patient roster/search → chart opened | PARTIAL |
| PAT-18 | Create patient from Patients surface | Doctor | New patient → phone gate/intake outcome | PARTIAL |
| PAT-19 | Open patient chart shell | Doctor | Patient row → summary and allowed actions | PARTIAL |
| PAT-20 | Review summary/labs/orders/records/activity | Doctor | Chart tab → relevant clinical context | PARTIAL |
| PAT-21 | Edit demographics/contact | Authorized staff | Patient chart → validated audited update | OPEN |
| PAT-22 | Deceased/inactive/merged patient | Authorized staff | Chart/search → safe read-only/resolved record | OPEN |
| PAT-23 | Guardian/minor/dependent | Doctor/reception | Shared/guardian phone → correct dependent + consent context | DESIGN-GAP |
| PAT-24 | Patient intake link | Patient | Secure link → consented intake submitted/expired | DESIGN-GAP |
| PAT-25 | Identity insufficient for release/refund | Staff | Restricted action → verification path or manual review | IMPLEMENTED |

## Encounter and clinical documentation

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| ENC-01 | Start encounter from today/booking/chart | Doctor | Context → active encounter | PARTIAL |
| ENC-02 | Capture chief complaint/history/vitals | Doctor/staff | Encounter → draft clinical context | PARTIAL |
| ENC-03 | Diagnose / ICD search and selection | Doctor | Problem workspace → coded diagnosis | PARTIAL |
| ENC-04 | Add/update problem list | Doctor | Chart → active/resolved problem | PARTIAL |
| ENC-05 | Create SOAP/visit note | Doctor | Encounter → saved draft | PARTIAL |
| ENC-06 | Dictation/AI scribe → review | Doctor | Audio/input → editable attributed draft | PARTIAL |
| ENC-07 | Sign/lock visit note | Doctor | Reviewed draft → immutable signed note | PARTIAL |
| ENC-08 | Amend signed note | Doctor | Locked note → linked auditable amendment | OPEN |
| ENC-09 | Prescribe medication | Doctor | Chart/encounter → signed prescription | PARTIAL |
| ENC-10 | Drug allergy/interaction/contraindication | Doctor | Unsafe prescription → override-with-reason or reject | OPEN |
| ENC-11 | Clinical referral | Doctor | Encounter → referral issued/tracked | PARTIAL |
| ENC-12 | Finish visit | Doctor | Active encounter → completed with unresolved-task check | PARTIAL |
| ENC-13 | Abandon/recover encounter draft | Doctor | Navigation/session loss → recover/discard explicitly | OPEN |

## Catalog, order, cart, and booking

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| ORD-01 | Browse/search/filter lab catalog | Doctor | Catalog → tests understood/selected | PARTIAL |
| ORD-02 | Suggest unavailable test | Doctor | Catalog → suggestion acknowledged/tracked | PARTIAL |
| ORD-03 | Add/remove/update cart lines | Doctor | Test selection → valid draft | PARTIAL |
| ORD-04 | Duplicate/overlapping test handling | Doctor | Add test → deduped/warned/explicit override | PARTIAL |
| ORD-05 | Quick order from patient chart | Doctor | Chart → patient-bound draft | PARTIAL |
| ORD-06 | New booking wizard | Doctor | Bookings → confirmed booking | PARTIAL |
| ORD-07 | Attach/replace patient on draft | Doctor | Unbound draft → identity-gated patient | PARTIAL |
| ORD-08 | Select collection route | Doctor | Draft → PSC/clinic/home route | PARTIAL |
| ORD-09 | Schedule PSC/home collection | Doctor/reception | Route → valid slot/booking code | PARTIAL |
| ORD-10 | Clinic draw preparation | Doctor/phlebotomist | Confirmed order → tube plan, not collected sample | PARTIAL |
| ORD-11 | Confirm price/currency/payer | Doctor/reception | Draft → immutable priced lines | PARTIAL |
| ORD-12 | Place order idempotently | Doctor | Confirm → one booking/order despite retries | OPEN |
| ORD-13 | Booking confirmation/code delivery | System | Placed booking → patient receives usable code/link | PARTIAL |
| ORD-14 | View order/booking detail | Doctor/reception | Worklist → full lifecycle context | PARTIAL |
| ORD-15 | Edit booking before cutoff | Doctor/reception | Eligible booking → repriced/rescheduled audited revision | PARTIAL |
| ORD-16 | Cancel booking | Doctor/reception | Eligible booking → cancelled + void/refund policy | PARTIAL |
| ORD-17 | No-show | Reception/system | Missed visit → no-show + follow-up/reschedule | PARTIAL |
| ORD-18 | Resend confirmation | Doctor/reception | Booking → idempotent message event | PARTIAL |
| ORD-19 | Reflex test decision | Doctor/lab | Triggering result → accepted/declined added line | PARTIAL |
| ORD-20 | Unsupported/conflicting tests | Doctor | Draft → safe explanation and alternative | OPEN |
| ORD-21 | Stale catalog/price changed during checkout | Doctor | Confirm → refresh/reaccept, no silent mutation | OPEN |

## Reception, visit, collection, and phlebotomy

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| REC-01 | Check in planned visit | Receptionist | Resolved booking → arrived | DECIDED |
| REC-02 | Walk-in check-in | Receptionist | Created walk-in → arrived | DECIDED |
| REC-03 | Collect cash/KHQR at desk | Receptionist | Amount due → collected/failed/waiting | PARTIAL |
| REC-04 | Payment deferred/claim route | Receptionist | Payer decision → deferred/pending-claim | DECIDED |
| REC-05 | Queue patient for phlebotomy | Receptionist | Arrived+resolved → visible work item | DECIDED |
| REC-06 | Wrong booking/patient correction | Receptionist | Mismatch → detach/re-resolve with audit | OPEN |
| PHL-01 | Open draw work item | Phlebotomist | Queue → correct booking/patient context | DECIDED |
| PHL-02 | Positive-ID reject | Phlebotomist | Leading/missing answer → no draw registration | IMPLEMENTED |
| PHL-03 | Register draw | Phlebotomist | Positive-ID+tests → sample born `collected` | IMPLEMENTED |
| PHL-04 | Generate/print labels | Phlebotomist | Collected sample → unique labels printed | PARTIAL |
| PHL-05 | Printer offline/manual contingency | Phlebotomist | Print failure → controlled downtime label/reprint | DESIGN-GAP |
| PHL-06 | Scan and verify every tube | Phlebotomist | Tube set → all expected tubes verified | PARTIAL |
| PHL-07 | Partial/extra/wrong tube | Phlebotomist | Mismatch → correct, reject, or recollect | PARTIAL |
| PHL-08 | Duplicate label/barcode | Phlebotomist | Collision → block reuse and reissue/audit | PARTIAL |
| PHL-09 | Document collection exception | Phlebotomist | Difficult draw/insufficient volume → exception plan | OPEN |
| PHL-10 | Complete visit after draw | Phlebotomist/reception | Draw complete → visit completed independently | IMPLEMENTED |
| PHL-11 | Home collection execution | Phlebotomist/courier | Scheduled work → positive-ID, collected, custody started | PARTIAL |

## Courier, receiving, accession, and lab processing

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| LOG-01 | Create pickup request | Clinic/ops | Ready specimen → scheduled pickup | PARTIAL |
| LOG-02 | Courier accepts/starts pickup | Courier | Assigned job → en route/arrived | PARTIAL |
| LOG-03 | Clinic-to-courier handoff | Collector/courier | Specimen handover → signed custody event | DECIDED |
| LOG-04 | Failed/late pickup | Ops/courier | SLA miss → reassign/escalate/stability decision | OPEN |
| LOG-05 | Courier-to-lab receipt | Lab receiver/courier | Delivered set → received-at-lab custody event | DECIDED |
| LOG-06 | Accession accept | Lab receiver | Inspection → accepted specimen/accession | DECIDED |
| LOG-07 | Accession reject | Lab receiver | Defect → reason/fault/recollection/discard | IMPLEMENTED |
| LOG-08 | Recollection booking | Lab/reception | Rejected sample → new booking, no phantom sample | IMPLEMENTED |
| LOG-09 | Lost/damaged/temp excursion | Ops/lab | Custody exception → investigate/reject/recollect | OPEN |
| LOG-10 | Consume specimen for analysis | Lab | Accepted sample → consumed with traceability | IMPLEMENTED |
| LOG-11 | Aliquot/add-on/insufficient residual | Lab | Accepted specimen → traced derivative or reject add-on | OPEN |
| LOG-12 | Blood-in/send-in intake | Clinic/lab | Patient never present → strict identity hold/release policy | DEFERRED |

## Results and close-the-loop

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| RES-01 | Receive structured Kura result | System/lab | Analyzer/LIS → patient/order/provenance matched | PARTIAL |
| RES-02 | Import third-party result | Doctor/staff | File/manual import → source-tagged unverified result | DEFERRED |
| RES-03 | Review normal result | Doctor | Unreviewed → reviewed | PARTIAL |
| RES-04 | Review abnormal/critical result | Doctor | Alert → acknowledged/action/escalation | PARTIAL |
| RES-05 | Add interpretation/recommendation | Doctor | Review → signed clinical annotation | PARTIAL |
| RES-06 | Release result | Doctor/system | All gates pass → patient-visible | IMPLEMENTED |
| RES-07 | Release blocked by identity/sample/review | Doctor/staff | Gate failure → explicit remediation | IMPLEMENTED |
| RES-08 | Notify patient | Doctor/system | Reviewed result → delivered/failed/retried | PARTIAL |
| RES-09 | Record patient acknowledgement | Doctor/staff | Notification → acknowledged/read-back | OPEN |
| RES-10 | Close result loop | Doctor | Reviewed+notification obligations → closed | PARTIAL |
| RES-11 | Correct/amend result | Lab/doctor | Superseded result → versioned correction + re-notify | OPEN |
| RES-12 | Result attached to wrong patient | Ops/lab | Suspected mismatch → freeze release, investigate, correct | OPEN |

## Payment, claim, earnings, and settlement

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| FIN-01 | Cash collection | Reception/doctor | Pending → collected + receipt | IMPLEMENTED |
| FIN-02 | KHQR collection | Reception/doctor | Pending → confirmed/failed/expired | IMPLEMENTED |
| FIN-03 | Hosted patient pay-link | Doctor/patient | Verified patient+cart → paid/retry/expired | DEFERRED |
| FIN-04 | Split payer/coverage per line | Reception/claims | Mixed basket → line-level payer verdicts | DECIDED |
| FIN-05 | Submit and reconcile claim | Claims staff/payer | Pending-claim → claimed/denied/appealed | DEFERRED |
| FIN-06 | Refund collected/claimed payment | Authorized staff | Cancellation/correction → refunded | IMPLEMENTED |
| FIN-07 | Void unpaid payment intent | Authorized staff | Cancel before collection → voided | IMPLEMENTED |
| FIN-08 | Resolve line commission/spread | System | Priced line → rule source/version/rate | IMPLEMENTED |
| FIN-09 | Freeze split when paid and served | System | Both proofs → immutable ledger row | DECIDED |
| FIN-10 | Office-collected doctor debt | Doctor/finance | Declaration → doctor→Kura debt row | DECIDED |
| FIN-11 | Reversal/correction | Finance | Error/refund → linked reversal, no mutation | DECIDED |
| FIN-12 | Earnings catalog and balance | Doctor | Catalog/drawer → explainable pending/earned/net | PARTIAL |
| FIN-13 | Bi-monthly settlement statement | Finance/doctor | Period close → net per doctor/currency | DECIDED |
| FIN-14 | Execute payout/collect debt | Finance | Approved settlement → paid/failed/retry | DEFERRED |
| FIN-15 | Mixed basket N≥2 aggregate | System/finance | Multiple line rules → exact sum/reconciliation | DECIDED |

## Care, communications, pharmacy, and operations

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| CARE-01 | Create care program/plan | Doctor | Chart/programs → active plan | PARTIAL |
| CARE-02 | Add goals/interventions/tasks | Doctor | Plan → scheduled accountable work | PARTIAL |
| CARE-03 | Execute recurring patient task | Staff/patient | Due task → completed/skipped/escalated | PARTIAL |
| CARE-04 | Monitor adherence/metrics | Doctor | Program → trend and intervention | PARTIAL |
| CARE-05 | Pause/complete care plan | Doctor | Active plan → paused/completed with reason | PARTIAL |
| COM-01 | Send patient nudge/message | Doctor/staff | Chart/inbox → delivered/failed/opted-out | PARTIAL |
| COM-02 | Telehealth appointment/session | Doctor/patient | Scheduled → connected/completed/failed | PARTIAL |
| COM-03 | Consent and communication preference | Patient/staff | Settings/intake → versioned preference | OPEN |
| COM-04 | Pharma representative disclosure | Doctor | Rep interaction → immutable disclosure entry | PARTIAL |
| COM-05 | Refer-and-earn program | Doctor | Invite → attributed eligible reward | PARTIAL |
| INV-01 | Dispense medication | Doctor/staff | Prescription → stock decrement/dispensed | PARTIAL |
| INV-02 | Manage dispensary stock | Authorized staff | Inventory → received/adjusted/expired | PARTIAL |
| INV-03 | Manage clinical supplies | Authorized staff | Supplies → counted/reordered/adjusted | PARTIAL |
| INV-04 | Low-stock/expiry alert | System/staff | Threshold/date → action/acknowledgement | OPEN |

## Settings, profile, document, and mobile continuity

| ID | Journey | Primary actor | Entry → terminal outcome | Coverage |
| --- | --- | --- | --- | --- |
| ADM-01 | Clinic/cabinet profile | Owner | Settings → validated public/internal profile | PARTIAL |
| ADM-02 | Account and personal profile | Doctor | Settings → updated account | PARTIAL |
| ADM-03 | Preferences/localization | Doctor | Settings → persisted preference | PARTIAL |
| ADM-04 | Patient communication settings | Owner | Settings → governed channel/template policy | PARTIAL |
| ADM-05 | Billing/banking settings | Owner | Settings → verified payment destination | PARTIAL |
| ADM-06 | Directory profile/publishing | Doctor | Settings → draft/published/unpublished | PARTIAL |
| ADM-07 | E-signature and signed documents | Doctor | Settings/document → valid signature/archive | PARTIAL |
| ADM-08 | Data export/privacy request | Authorized staff | Request → scoped export/denial audit | OPEN |
| MOB-01 | Desktop-to-mobile continuation | Doctor | Same account/entity → consistent authoritative state | PARTIAL |
| MOB-02 | Mobile today/catalog/orders/patients | Doctor | Mobile route → equivalent core task completion | PARTIAL |
| MOB-03 | Deep link to booking/patient/result | Doctor | Link → auth + exact authorized context | PARTIAL |
| MOB-04 | Offline/read-only mobile state | Doctor | Network loss → safe cache/no false mutation | OPEN |
| MOB-05 | Retry queued mobile mutation | Doctor | Reconnect → idempotent commit/conflict resolution | OPEN |

## Coverage rule

Every implementation acceptance criterion should map to at least one journey ID here and at least one row in the case matrix. High-risk actions—identity resolution, collection, label verification, custody, result release, payment, refund, claim, and settlement—require both a reject branch and a recovery branch before they can be considered complete.
