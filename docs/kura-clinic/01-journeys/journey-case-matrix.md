# Kura Clinic journey case matrix

This matrix is the durable product/test inventory. It covers valid paths, invalid transitions, exceptions, retries, concurrency, and recovery. A row marked `GAP` is a required case, not a claim that the behavior exists.

## Test tiers

| Tier | Purpose |
| --- | --- |
| T0 | Pure invariant/state/financial calculation |
| T1 | Component or domain integration with controlled dependencies |
| T2 | Multi-service workflow, persistence, authorization, audit, idempotency |
| T3 | Executable cross-role/browser/operational journey |

## Access, workspace, and authorization cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-ACC-001 | ACC-01 | T2 | Valid credentials, active membership | Scoped session with actor/workspace | Invalid credentials mutate nothing; retry | App/auth surface, GAP contract |
| CASE-ACC-002 | ACC-02 | T2 | Switch from workspace A to B | Queries/mutations use B only | In-flight A draft must reconfirm/discard | GAP |
| CASE-ACC-003 | ACC-04 | T3 | Submit valid licence evidence | Verified capability gate opens | Rejected evidence gives reason/resubmit | Verification UI PARTIAL |
| CASE-ACC-004 | ACC-05 | T2 | Unverified doctor starts restricted action | Action blocked before mutation | Complete KYD, then resume safe context | Verification gate PARTIAL |
| CASE-ACC-005 | ACC-08 | T0 | Capability absent despite persona label | Authorization denies | Grant capability through governed membership | `requireClinicCapability` |
| CASE-ACC-006 | ACC-08 | T2 | Capability present in wrong workspace | Deny and audit scope mismatch | Switch/re-authorize correct workspace | GAP |
| CASE-ACC-007 | ACC-09 | T2 | Session expires during order confirm | No duplicate/partial booking | Re-auth, reload authoritative draft, reconfirm | GAP |
| CASE-ACC-008 | ACC-10 | T2 | Membership revoked during active session | Next action denied; sensitive cache cleared | Re-request access | GAP |
| CASE-ACC-009 | ACC-11 | T2 | Filter audit by patient/action/time | Complete immutable event set | Unauthorized export denied/audited | Settings PARTIAL |
| CASE-ACC-010 | ACC-07 | T2 | Reception books for Dr X | Actor ≠ doctor, both recorded | Dr X outside workspace rejected | DEFERRED polyclinic |

## Identity and intake cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-ID-001 | PAT-01 | T3 | Valid phone, OTP, one candidate | Candidate reused, no demographic overwrite | Wrong candidate can be deselected | Phone gate PARTIAL |
| CASE-ID-002 | PAT-02 | T3 | Phone maps to N≥2 patients | All allowed redacted cards + none/new | No default selection; human chooses | Phone gate PARTIAL |
| CASE-ID-003 | PAT-03 | T2 | Known phone, select none | Provisional creation path | Must not mutate existing candidates | Domain truth |
| CASE-ID-004 | PAT-04 | T1 | Unknown phone + minimal identity | One stable provisional ID/MRN | Incomplete name/YOB/sex blocks submit | `provisionalIdentityKey` |
| CASE-ID-005 | PAT-04 | T0 | Same canonical identity submitted twice | Same prototype key | Production still uses server idempotency/UUID | `provisionalIdentityKey` |
| CASE-ID-006 | PAT-05 | T0 | OTP not sent | `not-sent`, no verification | Send before verify | `verifyDemoOtp` |
| CASE-ID-007 | PAT-05 | T0 | OTP incomplete/mismatch | Explicit failure, no identity advance | Correct/resend within policy | `verifyDemoOtp` |
| CASE-ID-008 | PAT-05 | T2 | OTP expired/rate-limited | Safe blocked state + timer | New session after policy window | GAP |
| CASE-ID-009 | PAT-06 | T1 | Change phone after success | Verification and candidates cleared | Verify the new phone | DECIDED |
| CASE-ID-010 | PAT-07 | T1 | Valid booking code + audit context | Exact booking/patient resolved | Preserve assurance | `resolveReceptionIdentity` |
| CASE-ID-011 | PAT-07 | T1 | Unknown booking code | `not-found`, no patient leakage | Retry/phone/walk-in | `resolveReceptionIdentity` |
| CASE-ID-012 | PAT-08 | T1 | Exact phone, one unique match | Resolved without OTP, assurance unchanged | Prefix/fuzzy match must not auto-resolve | `resolveReceptionIdentity` |
| CASE-ID-013 | PAT-09 | T1 | Exact phone, N≥2 matches | Candidate IDs + allowed disambiguators | No PII-rich single resolved patient | `resolveReceptionIdentity` |
| CASE-ID-014 | PAT-10 | T1 | Exact phone, no match | `not-found` | Offer explicit walk-in door | `resolveReceptionIdentity` |
| CASE-ID-015 | PAT-11 | T1 | Walk-in chosen with audit context | Create-provisional outcome | No silent creation from lookup failure | `resolveReceptionIdentity` |
| CASE-ID-016 | PAT-07 | T0 | Missing actor/workspace | Throw before resolution | Supply scoped audit context | `resolveReceptionIdentity` |
| CASE-ID-017 | PAT-12 | T2 | Two desks create same E.164 concurrently | Serialized search+create; no silent duplicate | Return winning record/retry transaction | DECIDED, GAP persistence |
| CASE-ID-018 | PAT-13 | T0 | Patient states name+DOB, open prompt | Positive-ID passes | Missing either answer rejects | `registerDrawSample` |
| CASE-ID-019 | PAT-13 | T0 | Staff asks leading yes/no question | Draw registration rejects | Repeat using open questions | `registerDrawSample` |
| CASE-ID-020 | PAT-14 | T0 | Unique NID after positive-ID | Assurance becomes `nid-verified` | Invalid NID recapture | `registerDrawSample` |
| CASE-ID-021 | PAT-15 | T0 | NID belongs to another patient | Draw preserved; merge item created | No auto-merge/block; steward later | `registerDrawSample` |
| CASE-ID-022 | PAT-16 | T2 | Steward reviews after result episode | Merge/reject decision audited | Active orders prevent mid-episode merge | DECIDED |
| CASE-ID-023 | PAT-23 | T2 | Guardian phone, dependent selected | Patient/contact/guardian remain distinct | Guardian-as-patient corrected before draw | GAP |
| CASE-ID-024 | PAT-24 | T2 | Intake link expired/replayed/wrong recipient | No PHI/update; new secure link required | Reissue after recipient verification | DESIGN-GAP |
| CASE-ID-025 | PAT-25 | T0 | Provisional patient requests gated release/refund | Explicit identity failure | NID verify or authorized manual review | `resultReleaseDecision`, domain truth |

## Patient chart and encounter cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-CLN-001 | PAT-17 | T3 | Search by allowed term | Authorized matching patients only | No cross-workspace/overbroad PHI | Patients UI PARTIAL |
| CASE-CLN-002 | PAT-19 | T2 | Open merged patient ID | Resolve to golden record with notice | No editing obsolete record | GAP |
| CASE-CLN-003 | ENC-01 | T2 | Start from booking/chart | One active encounter with correct context | Wrong patient/duplicate active encounter blocked | Encounter UI PARTIAL |
| CASE-CLN-004 | ENC-05 | T1 | Save incomplete note as draft | Draft persists with author/time | Cannot present as signed/final | VisitNotes PARTIAL |
| CASE-CLN-005 | ENC-06 | T2 | Scribe produces draft | Source attributed; doctor must review | Never auto-sign AI output | PARTIAL |
| CASE-CLN-006 | ENC-07 | T2 | Sign reviewed note | Immutable signed version | Missing required fields/signing authority rejects | PARTIAL |
| CASE-CLN-007 | ENC-08 | T2 | Correct signed note | Linked amendment retains original | Direct overwrite rejected | GAP |
| CASE-CLN-008 | ENC-09 | T2 | Prescribe with valid context | Signed prescription linked to encounter | Allergy/interaction invokes safe gate | PARTIAL/GAP safety |
| CASE-CLN-009 | ENC-11 | T2 | Issue clinical referral | Recipient/reason/attachments tracked | Missing consent/recipient blocks send | PARTIAL |
| CASE-CLN-010 | ENC-12 | T2 | Finish with unresolved critical task | Warning/block per policy | Assign/resolve or explicit authorized override | GAP |
| CASE-CLN-011 | ENC-13 | T2 | Browser closes during draft | Recover latest safe draft | Conflict shows versions, no silent overwrite | GAP |

## Catalog, cart, order, and booking cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-ORD-001 | ORD-01 | T1 | Search/filter catalog | Stable results and clear availability | Empty/error supports retry/suggest | Catalog PARTIAL |
| CASE-ORD-002 | ORD-03 | T0 | Add/remove line | Totals/tube plan derive from unique active lines | Removing last line disables confirm | OrderDraft PARTIAL |
| CASE-ORD-003 | ORD-04 | T1 | Add identical test twice | Deduplicate or explicit quantity policy | No accidental double billing | PARTIAL |
| CASE-ORD-004 | ORD-04 | T1 | Add panel plus overlapping analyte | Explain overlap and pricing | User explicitly keeps/removes per policy | GAP |
| CASE-ORD-005 | ORD-05 | T2 | Quick order from patient chart | Draft bound to that patient | Context switch requires reconfirm | PARTIAL |
| CASE-ORD-006 | ORD-07 | T1 | Replace patient after cart built | Lines retained only if safe; price/payer recomputed | Prior identity/payment session invalidated | PARTIAL/GAP |
| CASE-ORD-007 | ORD-08 | T1 | Choose PSC route | Booking code/slot path | Clinic tube prep cannot leak into PSC path | PARTIAL |
| CASE-ORD-008 | ORD-08 | T1 | Choose clinic draw | Tube plan path, no sample yet | Cannot mark collected from route selection | PARTIAL/domain truth |
| CASE-ORD-009 | ORD-09 | T2 | Slot becomes unavailable at confirm | No double booking | Refresh choices and reconfirm | GAP |
| CASE-ORD-010 | ORD-10 | T0 | Order confirmed before draw | Tube requirements only | No `collected` sample/custody event | Domain truth |
| CASE-ORD-011 | ORD-11 | T0 | N≥2 lines, one currency | Total equals exact minor-unit sum | Mixed currency requires split/reject, never implicit FX | GAP |
| CASE-ORD-012 | ORD-12 | T2 | Double-click/retry confirm | One booking/order/code | Return existing idempotent result | GAP |
| CASE-ORD-013 | ORD-13 | T2 | SMS delivery fails | Booking remains valid, message failed/retryable | Resend is a new message event, not new booking | PARTIAL |
| CASE-ORD-014 | ORD-15 | T2 | Edit tests before collection | Versioned/repriced revision | After collection, unsafe test removal blocked | PARTIAL |
| CASE-ORD-015 | ORD-16 | T2 | Cancel unpaid uncollected booking | Booking cancelled, payment voided | No refund row for unpaid intent | Payment/domain truth |
| CASE-ORD-016 | ORD-16 | T2 | Cancel after collected sample | Preserve sample/lab obligations | Cannot erase episode; policy workflow required | GAP |
| CASE-ORD-017 | ORD-17 | T2 | Appointment time passes, no arrival event | No-show after policy timer | Unpaid alone must not mark no-show | PARTIAL/GAP |
| CASE-ORD-018 | ORD-18 | T2 | Resend confirmation N≥2 times | Same booking/code, distinct delivery attempts | Rate-limit abuse without blocking access | PARTIAL |
| CASE-ORD-019 | ORD-19 | T2 | Reflex condition met | Doctor/lab accepts/declines traceably | No auto-charge/test without consent/policy | PARTIAL |
| CASE-ORD-020 | ORD-21 | T2 | Price/version changes mid-checkout | Show diff and require reacceptance | No silent total/rule mutation | GAP |

## Reception, collection, labeling, and custody cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-COL-001 | REC-01 | T0 | Planned booking checks in | `planned → arrived` | Completed/cancelled cannot arrive | `transitionVisit` |
| CASE-COL-002 | REC-05 | T2 | Arrived, resolved patient | One phlebotomy queue item | Duplicate enqueue idempotent | GAP |
| CASE-COL-003 | PHL-01 | T2 | Open queue item after reassignment | Latest actor/workspace/order context | Stale item blocks mutation and refreshes | GAP |
| CASE-COL-004 | PHL-02 | T0 | Positive-ID incomplete | No sample created | Repeat correctly | `registerDrawSample` |
| CASE-COL-005 | PHL-03 | T0 | Positive-ID + N≥2 duplicate test IDs | One collected sample, deduped test IDs | Zero tests rejects | `registerDrawSample` |
| CASE-COL-006 | PHL-03 | T2 | Register draw twice with same key | One sample/custody event | Return existing result | GAP persistence |
| CASE-COL-007 | PHL-04 | T2 | Print labels after draw | Labels bind sample/patient/tube and are unique | Pre-draw label policy must not imply collection | PARTIAL |
| CASE-COL-008 | PHL-05 | T3 | Printer offline | Controlled downtime state/procedure | Manual bypass without two-ID trace rejected | DESIGN-GAP |
| CASE-COL-009 | PHL-06 | T1 | Scan every expected tube | Ready only when set matches | Photo/QR alone cannot verify set | PARTIAL |
| CASE-COL-010 | PHL-07 | T1 | One of three tubes missing | Partial state, not ready | Add/recollect/revise order per reason | PARTIAL |
| CASE-COL-011 | PHL-07 | T1 | Extra/wrong-color tube | Quarantine/remove, no order expansion | Correct against tube plan | GAP |
| CASE-COL-012 | PHL-08 | T2 | Barcode already used | Block collision | Reissue label with audited invalidation | PARTIAL |
| CASE-COL-013 | PHL-09 | T2 | Insufficient volume/failed draw | Exception without fake sample completion | Recollect/new attempt per policy | GAP |
| CASE-COL-014 | PHL-10 | T0 | Draw complete then finish visit | `identity-resolved → draw-complete → completed` | Skip/out-of-order transition rejects | `transitionVisit` |
| CASE-COL-015 | PHL-11 | T3 | Home patient absent/refuses | No `collected` sample | No-show/reschedule event | GAP |
| CASE-COL-016 | LOG-03 | T2 | Handoff exact sample set | Custody sender/receiver/location/time | Receiver mismatch refuses handoff | Domain truth/GAP UI |
| CASE-COL-017 | LOG-03 | T2 | Offline handoff then sync | One ordered custody event | Conflict/duplicate queued for review | GAP |
| CASE-COL-018 | LOG-04 | T2 | Pickup misses stability window | Escalate and disposition samples | Do not hide by changing ETA | GAP |

## Lab accession, rejection, and recollection cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-LAB-001 | LOG-05 | T0 | Collected sample reaches lab | `collected → received-at-lab` | Invalid predecessor rejected | `transitionSample` |
| CASE-LAB-002 | LOG-06 | T0 | Receipt passes acceptance checks | `received-at-lab → accepted` | Missing checks remain received/hold | `transitionSample` |
| CASE-LAB-003 | LOG-06 | T2 | Accession request retried | Same accession returned | No duplicate accession | GAP |
| CASE-LAB-004 | LOG-07 | T0 | Reject collected/received/accepted sample | `rejected` + coded fault attribution | Invalid source/missing reason rejects | `rejectSample` |
| CASE-LAB-005 | LOG-07 | T1 | Reject after consumed | Invalid transition | Result correction/investigation path | `transitionSample` |
| CASE-LAB-006 | LOG-07 | T2 | Temperature excursion attributed courier | Rejection/custody linked | Fault change requires audited correction | Domain truth/GAP |
| CASE-LAB-007 | LOG-08 | T0 | Plan recollection with all identifiers | New booking, replacement `not-created` | Missing original/new booking/reason rejects | `planRecollection` |
| CASE-LAB-008 | LOG-08 | T2 | Duplicate recollection trigger | One active plan | Return existing plan or version intentionally | GAP |
| CASE-LAB-009 | LOG-08 | T0 | Replacement draw occurs | New sample supersedes rejected sample | Old sample ID/barcode never reused | `registerDrawSample` input/GAP link |
| CASE-LAB-010 | LOG-09 | T2 | Sample lost between custody events | Freeze downstream, incident trace | Recollect/investigate; no fabricated receipt | GAP |
| CASE-LAB-011 | LOG-10 | T0 | Accepted sample used | `accepted → consumed` | Received/rejected cannot be consumed | `transitionSample` |
| CASE-LAB-012 | LOG-11 | T2 | Add-on requested, insufficient residual | Add-on rejected with explanation | New collection/order path | GAP |
| CASE-LAB-013 | LOG-12 | T2 | Blood-in with ambiguous identity | Hold/manual review | No silent auto-create/release | DEFERRED |
| CASE-LAB-014 | LOG-12 | T2 | Irretrievable specimen identity gap | Preserve only via governed exception | Release stays gated until approved policy | OPEN |

## Result cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-RES-001 | RES-01 | T2 | Ingest result with patient/order/sample/provenance | One unreviewed result version | Unmatched item quarantined | Results UI PARTIAL |
| CASE-RES-002 | RES-01 | T2 | Duplicate analyzer/LIS event | Idempotent existing result/version | No duplicate worklist item | GAP |
| CASE-RES-003 | RES-02 | T2 | Import external report | Source-tagged unverified result | Missing provenance rejects | DEFERRED |
| CASE-RES-004 | RES-03 | T2 | Doctor reviews normal result | `unreviewed → reviewed` | Non-reviewer capability denied | Results UI/domain auth |
| CASE-RES-005 | RES-04 | T3 | Critical result | Immediate work item/escalation timer | Timeout escalates, never silently closes | GAP policy |
| CASE-RES-006 | RES-06 | T0 | NID-verified + accepted + reviewed | Release allowed | Any missing gate yields specific reason | `resultReleaseDecision` |
| CASE-RES-007 | RES-06 | T0 | Sample consumed + notified requirement met | Release allowed | Reviewed-but-not-notified blocks when configured | `resultReleaseDecision` |
| CASE-RES-008 | RES-07 | T0 | Provisional identity | `identity-not-verified` | Verify/manual policy | `resultReleaseDecision` |
| CASE-RES-009 | RES-07 | T0 | Sample collected/rejected/null | `sample-not-accepted` | Accession/recollect/investigate | `resultReleaseDecision` |
| CASE-RES-010 | RES-07 | T0 | Result unreviewed | `doctor-review-required` | Authorized review | `resultReleaseDecision` |
| CASE-RES-011 | RES-08 | T2 | SMS fails, alternate channel allowed | Failed event + retry/alternate | No false `notified` | GAP |
| CASE-RES-012 | RES-09 | T2 | Critical result read-back | Recipient/time/content recorded | Wrong recipient/escalation | GAP |
| CASE-RES-013 | RES-10 | T1 | Close before notification obligation | Reject transition | Finish notification/approved exception | GAP |
| CASE-RES-014 | RES-11 | T2 | Lab corrects released value | New version, original retained, re-review/re-notify | Direct overwrite denied | GAP |
| CASE-RES-015 | RES-12 | T2 | Suspected wrong-patient result | Freeze release and related notification | Investigate, correct, incident audit | GAP |

## Payment, pricing, commission, and settlement cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-FIN-001 | FIN-01 | T0 | Confirm cash from pending/waiting/deferred | `collected` | Already claimed/refunded/voided rejects | `confirmPaymentStatus` |
| CASE-FIN-002 | FIN-02 | T2 | KHQR provider confirms exact amount/currency | `collected` once | Client success alone insufficient | Domain truth/GAP provider |
| CASE-FIN-003 | FIN-02 | T2 | Duplicate/out-of-order callback | Idempotent final state | Conflicting callback goes reconciliation queue | GAP |
| CASE-FIN-004 | FIN-03 | T2 | Pay-link expires unpaid | Remains unpaid, retry creates safe new session | Old/paid link cannot charge again | DEFERRED |
| CASE-FIN-005 | FIN-04 | T0 | N≥2 lines with mixed payer/coverage | Responsibility resolved per line | Booking-level payer shortcut fails invariant | DECIDED |
| CASE-FIN-006 | FIN-05 | T0 | Confirm claim from pending-claim | `claimed` | Claim from pending cash state rejects | `confirmPaymentStatus` |
| CASE-FIN-007 | FIN-05 | T2 | Claim denied/partially paid | Line-level denial/remainder explicit | Appeal/bill/waive by policy | DEFERRED |
| CASE-FIN-008 | FIN-06 | T0 | Cancel collected/claimed payment | `refunded` | Preserve original payment and linked refund | `cancelPaymentStatus` |
| CASE-FIN-009 | FIN-07 | T0 | Cancel unpaid payment | `voided` | No fake refund | `cancelPaymentStatus` |
| CASE-FIN-010 | FIN-08 | T0 | Test-specific override exists | Highest-precedence rule with source/version | Invalid rate rejects configuration | `resolveCommission` |
| CASE-FIN-011 | FIN-08 | T0 | No override, class mapping exists | Class rule used | Missing class falls through | `resolveCommission` |
| CASE-FIN-012 | FIN-08 | T0 | Default or no rule | Explicit default/zero source | Never hard-code global 15% | `resolveCommission` |
| CASE-FIN-013 | FIN-08 | T0 | Courier/STAT/noncommissionable line | Doctor share zero | Surcharge excluded from commission basis | Domain truth |
| CASE-FIN-014 | FIN-09 | T0 | Paid but not served | No activated split | Activate only after service proof | DECIDED |
| CASE-FIN-015 | FIN-09 | T0 | Served but unpaid | No activated split | Wait for payment/claim proof | DECIDED |
| CASE-FIN-016 | FIN-09 | T2 | Both events arrive concurrently/out of order | Exactly one activated ledger row | Idempotent re-evaluation | GAP |
| CASE-FIN-017 | FIN-10 | T0 | Doctor office collected list amount | Doctor keeps spread; debt = remainder | Declaration creates debt, not income | DECIDED |
| CASE-FIN-018 | FIN-11 | T2 | Refund after split activation | Linked negative reversal row | Never edit frozen row | DECIDED |
| CASE-FIN-019 | FIN-12 | T1 | Earnings view line drill-down | Explain amount, rule, source, state | Pending not shown as settled | PARTIAL |
| CASE-FIN-020 | FIN-13 | T0 | N≥2 earnings + N≥2 debts + reversal | Net exact per doctor/currency | No cross-currency net without FX policy | DECIDED |
| CASE-FIN-021 | FIN-15 | T0 | Lines 1..N split in minor units | `Σdoctor + ΣKura = Σbasis` | Rounding remainder assigned deterministically | `splitMinorByCommission` + GAP aggregate |
| CASE-FIN-022 | FIN-15 | T0 | Mixed 0%, class%, override%, fixed-fee lines | Each line resolved independently then summed | No average/global rate | DECIDED |
| CASE-FIN-023 | FIN-15 | T2 | Price/rule changes after booking | Historical snapshot unchanged | New booking/version uses new rule | DECIDED |
| CASE-FIN-024 | FIN-15 | T2 | N≥2 partial refunds | Reversals sum to refunded eligible basis | Cannot reverse more than activated amount | GAP |

## Care, communications, inventory, settings, and mobile cases

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-OPS-001 | CARE-01 | T2 | Create plan with goals/owner/cadence | Active version linked to patient | Missing owner/cadence blocks activation | Care-plan PARTIAL |
| CASE-OPS-002 | CARE-03 | T2 | Recurring task generated twice | One occurrence per schedule key | Idempotent generation | GAP |
| CASE-OPS-003 | CARE-04 | T2 | Abnormal metric crosses threshold | Action/escalation visible | Acknowledgement does not erase measurement | PARTIAL/GAP |
| CASE-OPS-004 | CARE-05 | T2 | Complete plan with outstanding tasks | Explicit close/cancel/reassign decision | No orphan tasks | GAP |
| CASE-OPS-005 | COM-01 | T2 | Send message to opted-in channel | Delivery event recorded | Opt-out/wrong recipient blocks send | PARTIAL/GAP |
| CASE-OPS-006 | COM-02 | T3 | Telehealth connection fails | No false completed visit | Retry/reschedule/fallback | PARTIAL |
| CASE-OPS-007 | COM-03 | T2 | Consent version changes | New consent decision versioned | Prior consent not overwritten | GAP |
| CASE-OPS-008 | COM-04 | T2 | Log pharma interaction | Immutable attributed disclosure | Correction via amendment | PARTIAL |
| CASE-OPS-009 | COM-05 | T2 | Self-referral/duplicate invite | Reward ineligible or deduped | Explain reason; no double reward | GAP |
| CASE-OPS-010 | INV-01 | T2 | Dispense against valid prescription | Stock decremented once, dispense recorded | Expired/insufficient/wrong patient rejects | PARTIAL |
| CASE-OPS-011 | INV-02 | T2 | Concurrent stock adjustment/dispense | Serialized balance/no negative stock | Recount/correction event | GAP |
| CASE-OPS-012 | INV-04 | T2 | Lot expires/low-stock threshold | Alert and affected action gate | Acknowledge does not restore stock | GAP |
| CASE-OPS-013 | ADM-01 | T2 | Edit clinic profile | Validated, audited version | Unauthorized/invalid field rejected | PARTIAL |
| CASE-OPS-014 | ADM-05 | T2 | Change payout destination | Reverification and cooling-off | No immediate payout to unverified account | GAP |
| CASE-OPS-015 | ADM-07 | T2 | Sign document then amend/revoke | Signature/version validity explainable | Original retained | PARTIAL/GAP |
| CASE-OPS-016 | MOB-01 | T3 | Draft on desktop, continue mobile | Same authoritative entity/version | Conflict prompts reconcile | PARTIAL/GAP |
| CASE-OPS-017 | MOB-03 | T3 | Open deep link while signed out | Auth then exact authorized destination | Unauthorized context not leaked | PARTIAL |
| CASE-OPS-018 | MOB-04 | T3 | Lose network during mutation | No false success; queued/read-only status clear | Retry/cancel after reconnect | GAP |
| CASE-OPS-019 | MOB-05 | T2 | Replay queued mutation N≥2 times | Exactly one domain mutation | Return same idempotent result/conflict | GAP |

## Coverage-completion cases

These rows ensure every catalog journey has at least one directly traceable case. Detailed variants may also appear in earlier sections.

| ID | Journey | Tier | Steps / condition | Expected outcome | Reject and recovery | Covered by |
| --- | --- | --- | --- | --- | --- | --- |
| CASE-COV-001 | ACC-03 | T3 | Owner-doctor completes first-use clinic setup | Account, clinic, workspace, and next verification step are distinct | Duplicate org/abandonment resumes safely | Onboarding PARTIAL |
| CASE-COV-002 | ACC-06 | T2 | Owner invites member with scoped capability | One pending/accepted membership | Duplicate/expired invite is idempotent or reissued | GAP |
| CASE-COV-003 | ACC-12 | T2 | Sign out and revoke another session | Target tokens stop working | Current protected action aborts and re-auths | GAP |
| CASE-COV-004 | WQ-01 | T3 | Open home with mixed results/bookings/tasks | Priority and ownership are explainable | Empty/error state offers valid next action | Home PARTIAL |
| CASE-COV-005 | WQ-02 | T3 | Search patient/booking/action from command palette | Authorized exact destination opens | Ambiguous/unauthorized result is filtered or rejected | Search PARTIAL |
| CASE-COV-006 | WQ-03 | T3 | Review queue contains normal and critical results | Sort/escalation state is preserved | Stale item refreshes before mutation | Results PARTIAL |
| CASE-COV-007 | WQ-04 | T3 | Filter bookings by lifecycle and owner | Stable matching worklist | Invalid filter resets without losing context | Bookings PARTIAL |
| CASE-COV-008 | WQ-05 | T3 | Triage message requiring patient action | Thread links correct patient/action | Wrong/removed patient context blocks action | Inbox PARTIAL |
| CASE-COV-009 | WQ-06 | T3 | Open/reschedule calendar item | Booking and calendar remain consistent | Slot conflict refreshes and reconfirms | Calendar PARTIAL |
| CASE-COV-010 | WQ-07 | T2 | Complete/defer/reassign a task | One auditable state transition | Concurrent update returns conflict/latest state | Tasks PARTIAL |
| CASE-COV-011 | WQ-08 | T3 | Open notification deep link | Auth then exact authorized entity | Expired/unauthorized link reveals no PHI | GAP |
| CASE-COV-012 | WQ-09 | T3 | Worklist empty, server error, then retry | Empty and failure are distinguishable; retry recovers | No stale success count/action | PARTIAL |
| CASE-COV-013 | PAT-18 | T3 | New patient action starts intake | Routes through governed phone/provisional flow | Direct duplicate-prone create is unavailable | Patients UI PARTIAL |
| CASE-COV-014 | PAT-20 | T3 | Switch summary/labs/orders/records/activity | Same patient context and correct data per tab | Stale/deleted context safely exits | Chart PARTIAL |
| CASE-COV-015 | PAT-21 | T2 | Authorized demographic/contact update | Validated version and audit event | Identity anchor change requires elevated review | GAP |
| CASE-COV-016 | PAT-22 | T2 | Open inactive/deceased/merged patient | Clear read-only/resolved behavior | Unsafe new action blocked or redirected | GAP |
| CASE-COV-017 | ENC-02 | T2 | Capture complaint/history/vitals with partial data | Draft stores value, author, time, provenance | Invalid unit/range asks correction | Encounter PARTIAL |
| CASE-COV-018 | ENC-03 | T2 | Search/select ICD diagnosis | Coded diagnosis linked to encounter/problem | Deprecated/ambiguous code is rejected or explained | Problem workspace PARTIAL |
| CASE-COV-019 | ENC-04 | T2 | Add then resolve a problem | History retains active/resolved transitions | Duplicate problem is consolidated explicitly | Problem workspace PARTIAL |
| CASE-COV-020 | ENC-10 | T2 | Prescription triggers allergy/interaction | Block/warn with evidence and reasoned override policy | No silent dispense | GAP safety |
| CASE-COV-021 | ORD-02 | T2 | Suggest an unavailable test | One attributed suggestion acknowledged | Duplicate/spam is deduped/rate-limited | Catalog PARTIAL |
| CASE-COV-022 | ORD-06 | T3 | Complete booking wizard end to end | One booking with patient, lines, route, price, code | Back/close preserves or explicitly discards draft | Booking composer PARTIAL |
| CASE-COV-023 | ORD-14 | T3 | Open detail across payment/sample/result states | Independent axes and available actions are correct | Stale action refreshes before commit | Booking detail PARTIAL |
| CASE-COV-024 | ORD-20 | T1 | Select incompatible/unsupported tests | Explain conflict and block/offer alternative | Authorized exception records reason | GAP |
| CASE-COV-025 | REC-02 | T2 | Create and check in a walk-in | Provisional booking reaches arrived | Duplicate candidate must be resolved first | DECIDED |
| CASE-COV-026 | REC-03 | T2 | Reception collects cash/KHQR | Explicit payment state and receipt | Failed/expired confirmation remains unpaid | Payment PARTIAL |
| CASE-COV-027 | REC-04 | T2 | Choose deferred or claim payer path | Correct payment state without sample side effect | Invalid claim eligibility returns payable alternative | DECIDED/GAP |
| CASE-COV-028 | REC-06 | T2 | Wrong booking/patient discovered before draw | Detach/re-resolve with audit, no sample created | After draw routes to incident workflow | GAP |
| CASE-COV-029 | LOG-01 | T2 | Mark eligible package ready and request pickup | One job with exact sample set/window | Not-ready/duplicate request rejected/idempotent | Logistics PARTIAL |
| CASE-COV-030 | LOG-02 | T3 | Courier accepts and starts assigned pickup | Assignment and ETA events visible | Wrong/revoked assignment cannot hand off | Logistics PARTIAL |
| CASE-COV-031 | RES-05 | T2 | Doctor adds and signs interpretation | Annotation version linked to result/review | Unsigned/unauthorized text cannot drive release | Results PARTIAL |
| CASE-COV-032 | FIN-14 | T2 | Execute approved payout/debt collection | Provider reference and final/failed state recorded once | Failure retries idempotently; destination reverified | DEFERRED |
| CASE-COV-033 | CARE-02 | T2 | Add N≥2 goals/interventions/tasks | Owners, cadence, and dependencies persist | Circular/missing ownership blocks activation | Care-plan PARTIAL |
| CASE-COV-034 | INV-03 | T2 | Receive/count/adjust clinical supplies | Lot/quantity/reason audit is consistent | Negative/unauthorized adjustment rejected | Supplies PARTIAL |
| CASE-COV-035 | ADM-02 | T2 | Update personal/account profile | Allowed fields persist and audit | Identity/security fields require reverification | Settings PARTIAL |
| CASE-COV-036 | ADM-03 | T2 | Change locale/time/date preference | Persists per account/workspace policy | Unsupported value falls back explicitly | Settings PARTIAL |
| CASE-COV-037 | ADM-04 | T2 | Change patient communication channel/template policy | Versioned governed configuration | Invalid template/consent conflict blocks publish | Settings PARTIAL |
| CASE-COV-038 | ADM-06 | T2 | Publish/unpublish directory profile | Valid profile has clear publication state | Unverified/required-field gap blocks publish | Settings PARTIAL |
| CASE-COV-039 | ADM-08 | T2 | Request scoped patient data export | Authorized minimum dataset and audit | Excess/unauthorized request denied | GAP |
| CASE-COV-040 | MOB-02 | T3 | Complete today/catalog/order/patient core task on mobile | Same domain outcome as desktop | Missing parity is visible, never silently different | Mobile PARTIAL |

## Release gate

No clinic workflow should be marked complete when any of the following remain true:

- its happy path has no corresponding reject row;
- retry can create another patient, booking, sample, payment, result, or ledger row;
- a high-risk mutation lacks actor/workspace audit context;
- money behavior is tested only with one line;
- a screen label is being used as evidence of a domain transition;
- deferred journeys are presented as available;
- an `OPEN` policy is silently replaced with a UI assumption.
