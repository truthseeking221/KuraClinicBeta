# Kura Clinic prototype — post-onboarding activation and first PSC booking

**Status:** Frozen implementation specification  
**Audience:** Claude Code implementing `apps/clinic/dcm`  
**Mode:** Local mock data only  
**Date:** 2026-07-15

## 1. Outcome

A newly onboarded clinic owner enters an active workspace, sees the correct doctor-verification state, lands on Explorer or Practice Home, and creates one safe mock PSC booking.

```text
onboarding complete
→ active workspace
→ canonical KYD state
→ Explorer Home | Practice Home
→ phone gate
→ explicit patient resolution
→ tests
→ PSC payment arrangement
→ review
→ idempotent placement
→ durable receipt
→ Home shows first booking once
```

This is a prototype contract, not evidence of production delivery.

## 2. Frozen product decisions

1. Keep the existing licence step in onboarding as an optional first submission. After workspace activation, consume its state; never force duplicate entry.
2. Canonical KYD is exactly `not-started | under-review | needs-resubmission | expired | approved`.
3. Normalize legacy `deferred` to `not-started`; keep `uploading` transient and never persist it as a verdict.
4. Every KYD state may create a PSC booking.
5. Only `approved` may collect cash, generate legal PDFs, submit claims or publish the directory profile.
6. Explorer may use `later → deferred` or mock `khqr → waiting`; cash is visibly locked.
7. Phone OTP proves control of a phone at that moment, not patient identity.
8. Booking placement creates no sample, collected visit, real payment, claim, result or external message.
9. Persist committed mock state, draft and receipt across refresh using versioned `localStorage`.

## 3. Scope

### In

- New owner workspace, returning user, one/N≥2 workspaces, stale/revoked access.
- Five KYD states, submit, review display, resubmit, renew and approved display.
- Fixture-only reviewer controls.
- Explorer and Practice variants on one Home route.
- First PSC booking: phone, OTP, known/shared/new patient, tests, payment, review and receipt.
- Deterministic failures, persistence, Storybook, interaction tests and WCAG states.

### Out

- Real auth, BFF, gRPC, DB, RLS, RBAC, migrations or production contracts.
- Real upload/OCR/admin review, PHI, merge/NID verification.
- Clinic draw, tubes, home collection, scheduling, courier or lab lifecycle.
- Real cash/KHQR/payment link/refund/claim/legal PDF/directory/message.
- Full booking maintenance, results or settlement.

## 4. Routes and guards

| Route | Purpose | Required guard |
| --- | --- | --- |
| `/` | Existing onboarding/scenario entry | Existing flow |
| `/clinic/[workspaceId]` | Explorer/Practice Home | Accessible active workspace |
| `/clinic/[workspaceId]/verification` | State-driven KYD | Accessible active workspace |
| `/clinic/[workspaceId]/bookings/new` | Resumable PSC composer | Workspace + booking capability |
| `/clinic/[workspaceId]/bookings/[bookingId]` | Receipt/detail | Booking belongs to workspace |

- One accessible workspace: auto-select and `replace()` Home.
- N≥2: restore last active only if still accessible; otherwise show explicit chooser.
- `unassigned`, revoked, missing or foreign workspace: show recovery and no scoped data.
- Workspace switch with a dirty draft requires `Switch back` or `Discard draft and continue`; never copy a draft.
- Derive Home mode from KYD on every load. Unknown/corrupt KYD becomes `not-started`, records `INVALID_KYD_STATE`, and never unlocks capabilities.

## 5. Actors and authority

| Actor | Allowed | Must not imply |
| --- | --- | --- |
| Clinic owner/doctor | Select own workspace, submit mock evidence, create PSC booking | KYD approval, lab or payment truth |
| Reviewer fixture | Approve/request resubmission from `under-review`; expire `approved` | A real Kura admin action |
| Mock adapter | Resolve fixtures, save local state, return one receipt | Network/backend delivery |
| Patient/phone holder | Supplies OTP in face-to-face demo | Phone holder is automatically patient |

Workspace membership, role, KYD, phone control, patient identity, booking and payment are independent axes.

## 6. Prototype-local TypeScript contracts

Do not add these types to shared production contracts.

```ts
type KydStatus =
  | 'not-started'
  | 'under-review'
  | 'needs-resubmission'
  | 'expired'
  | 'approved';

interface MockWorkspace {
  id: string;
  name: string;
  branchLabel?: string;
  membershipRole: 'owner' | 'doctor' | 'unassigned';
  membershipStatus: 'active' | 'revoked';
}

interface MockFileMeta {
  name: string;
  type: 'image/jpeg' | 'image/png' | 'application/pdf';
  size: number;
}

interface MockKydSubmission {
  id: string;
  workspaceId: string;
  licenceNumber: string;
  profession: string;
  licenceFile: MockFileMeta;
  nationalIdFile: MockFileMeta;
  submittedAt: string;
  rejectionReason?: string;
  attempt: number;
}

interface MockKydRecord {
  workspaceId: string;
  status: KydStatus;
  activeSubmissionId?: string;
  history: MockKydSubmission[];
  decidedAt?: string;
  expiresAt?: string;
}

interface CapabilitySet {
  canCreatePscBooking: true;
  canCollectCash: boolean;
  canGenerateLegalPdf: boolean;
  canSubmitClaim: boolean;
  canPublishDirectory: boolean;
}

type PatientAssurance = 'known-reused' | 'provisional';
type IdentityDecision =
  | 'known-confirmed'
  | 'dependent-confirmed'
  | 'unknown-phone-provisional'
  | 'shared-phone-provisional'
  | 'guarantor-provisional';

interface MockPatientRef {
  id: string;
  displayName: string;
  maskedMrn?: string;
  maskedPhone: string;
  sex: 'female' | 'male' | 'other' | 'unknown';
  dobOrYear: string;
  assurance: PatientAssurance;
  identityDecision: IdentityDecision;
}

interface CreateProvisionalPatientInput {
  workspaceId: string;
  phoneE164: string;
  fullName: string;
  dobOrAge: string;
  sex: MockPatientRef['sex'];
  mode: 'unknown-phone' | 'shared-phone' | 'guarantor-dependent';
  duplicateDecision: 'no-candidate' | 'confirmed-different-person';
  idempotencyKey: string;
}

interface DecideKydInput {
  action: 'approve' | 'resubmit' | 'expire';
  submissionId: string;
  reason?: string;
}

interface PlaceBookingInput {
  draft: MockBookingDraft;
  activeWorkspaceId: string;
  cashConfirmed: boolean;
}

interface MockTestLine {
  code: string;
  name: string;
  specimen: string;
  turnaround: string;
  priceMinor: string;
  currency: 'USD';
  available: boolean;
  unavailableReason?: string;
}

type PaymentChoice = 'later' | 'khqr' | 'cash';
type PaymentState = 'deferred' | 'waiting' | 'collected';

interface MockBookingDraft {
  version: 1;
  doctorId: string;
  workspaceId: string;
  status: 'building' | 'placing';
  step: 'patient' | 'tests' | 'payment' | 'confirm';
  patient?: MockPatientRef;
  lines: MockTestLine[];
  route: 'psc';
  pscId: 'psc-bkk1';
  paymentChoice?: PaymentChoice;
  idempotencyKey: string;
  updatedAt: string;
}

interface MockBooking {
  version: 1;
  id: string;
  code: string;
  doctorId: string;
  workspaceId: string;
  patient: MockPatientRef;
  lines: MockTestLine[];
  totalMinor: string;
  currency: 'USD';
  route: 'psc';
  pscId: 'psc-bkk1';
  status: 'scheduled';
  visitLabel: 'Awaiting visit';
  paymentChoice: PaymentChoice;
  paymentState: PaymentState;
  communication: {
    telegram: 'simulated-sent' | 'simulated-failed';
    sms: 'simulated-sent' | 'simulated-failed';
  };
  createdAt: string;
  idempotencyKey: string;
}
```

Capability derivation is pure:

```ts
const approved = kyd.status === 'approved';
return {
  canCreatePscBooking: true,
  canCollectCash: approved,
  canGenerateLegalPdf: approved,
  canSubmitClaim: approved,
  canPublishDirectory: approved,
};
```

## 7. Persistence

```text
kura.onboarding.v1:doc-001
kura.workspace.v1:doc-001
kura.kyc.v1:doc-001:{workspaceId}
kura.orderDraft.v1:doc-001:{workspaceId}
kura.bookings.v1:doc-001:{workspaceId}
kura.patients.v1:doc-001:{workspaceId}
kura.prototypeEvents.v1:doc-001:{workspaceId}
```

Persist completed onboarding, active workspace, KYD/file metadata, committed provisional patient, draft, placed bookings, message attempts and prototype events.

Never persist OTP/code/cooldown, loading/toast/dialog, browser `File` or base64, cash confirmation, or unsubmitted provisional form text.

Each record is schema-validated independently. Reset only the corrupt key. Corrupt KYD becomes `not-started`; corrupt draft is discarded with visible recovery; placed bookings remain. A developer-only reset removes only prototype keys. Listen to `storage` events so KYD/capabilities update across tabs.

## 8. Mock adapter and errors

No method calls `fetch`. Every command supports deterministic latency/failure fixtures and stable idempotency.

```ts
type MockErrorCode =
  | 'ONBOARDING_INCOMPLETE'
  | 'WORKSPACE_REQUIRED'
  | 'WORKSPACE_ACCESS_DENIED'
  | 'DRAFT_WORKSPACE_MISMATCH'
  | 'INVALID_KYD_STATE'
  | 'KYD_DOCUMENT_REQUIRED'
  | 'KYD_DOCUMENT_INVALID_TYPE'
  | 'KYD_DOCUMENT_TOO_LARGE'
  | 'KYD_SUBMISSION_LOCKED'
  | 'KYD_REVIEW_NOT_AVAILABLE'
  | 'ACTION_REQUIRES_KYD_APPROVED'
  | 'PHONE_INVALID'
  | 'OTP_NOT_SENT'
  | 'OTP_INCOMPLETE'
  | 'OTP_INVALID'
  | 'OTP_EXPIRED'
  | 'OTP_RATE_LIMITED'
  | 'PATIENT_SELECTION_REQUIRED'
  | 'PATIENT_DETAILS_REQUIRED'
  | 'TEST_REQUIRED'
  | 'TEST_ALREADY_ADDED'
  | 'PAYMENT_METHOD_REQUIRED'
  | 'CASH_REQUIRES_KYD_APPROVED'
  | 'BOOKING_INVALID'
  | 'BOOKING_NOT_FOUND'
  | 'MOCK_SAVE_FAILED'
  | 'MESSAGE_SEND_FAILED';

interface MockFailure { error: MockErrorCode; message: string; field?: string }

interface PrototypeAdapter {
  resolveWorkspaces(doctorId: string): Promise<MockWorkspace[]>;
  selectWorkspace(workspaceId: string): Promise<void>;
  getKyd(workspaceId: string): Promise<MockKydRecord>;
  submitKyd(input: MockKydSubmission, key: string): Promise<MockKydRecord>;
  decideKyd(workspaceId: string, input: DecideKydInput): Promise<MockKydRecord>;
  sendOtp(phoneE164: string): Promise<{ challengeId: string; resendAt: string }>;
  verifyOtp(challengeId: string, code: string): Promise<void>;
  findPatientCandidates(phoneE164: string): Promise<MockPatientRef[]>;
  createProvisionalPatient(input: CreateProvisionalPatientInput): Promise<MockPatientRef>;
  listTests(query?: string): Promise<MockTestLine[]>;
  placeBooking(input: PlaceBookingInput): Promise<MockBooking>;
  getBooking(workspaceId: string, bookingId: string): Promise<MockBooking>;
  retryCommunication(bookingId: string, channel: 'sms' | 'telegram'): Promise<MockBooking>;
}
```

| Error | Exact copy |
| --- | --- |
| `ONBOARDING_INCOMPLETE` | `Complete all required onboarding details.` |
| `WORKSPACE_REQUIRED` | `Choose a workspace to continue.` |
| `WORKSPACE_ACCESS_DENIED` | `You do not have access to this workspace.` |
| `DRAFT_WORKSPACE_MISMATCH` | `This draft belongs to another workspace. Discard it or switch back.` |
| `INVALID_KYD_STATE` | `Verification status is unavailable.` |
| `KYD_DOCUMENT_REQUIRED` | `Upload your medical licence and ID.` |
| `KYD_DOCUMENT_INVALID_TYPE` | `Upload a PDF, JPG, or PNG file.` |
| `KYD_DOCUMENT_TOO_LARGE` | `Each file must be 10 MB or smaller.` |
| `KYD_SUBMISSION_LOCKED` | `Your documents are already under review.` |
| `KYD_REVIEW_NOT_AVAILABLE` | `There is no submission ready for review.` |
| `ACTION_REQUIRES_KYD_APPROVED` | `Complete doctor verification to use this feature.` |
| `PHONE_INVALID` | `Enter a valid Cambodia phone number.` |
| `OTP_NOT_SENT` | `Send a code before verifying.` |
| `OTP_INCOMPLETE` | `Enter the 6-digit code.` |
| `OTP_INVALID` | `That code is incorrect. Try again.` |
| `OTP_EXPIRED` | `That code has expired. Request a new code.` |
| `OTP_RATE_LIMITED` | `Too many attempts. Try again when the timer ends.` |
| `PATIENT_SELECTION_REQUIRED` | `Choose who is taking the tests.` |
| `PATIENT_DETAILS_REQUIRED` | `Enter the patient’s full name, sex, and date of birth or age.` |
| `TEST_REQUIRED` | `Add at least one test.` |
| `TEST_ALREADY_ADDED` | `This test is already in the booking.` |
| `PAYMENT_METHOD_REQUIRED` | `Choose how the patient will pay.` |
| `CASH_REQUIRES_KYD_APPROVED` | `Cash collection is available after doctor verification.` |
| `BOOKING_INVALID` | `Review the highlighted booking details.` |
| `BOOKING_NOT_FOUND` | `Booking not found in this workspace.` |
| `MOCK_SAVE_FAILED` | `We could not save your changes. Try again.` |
| `MESSAGE_SEND_FAILED` | `Booking created, but the patient message was not sent.` |

## 9. Deterministic fixtures

| Fixture | Behavior |
| --- | --- |
| Doctor | `doc-001`, fictional identity |
| Workspaces | `ws-kura-bkk1`, `ws-kura-tk`, plus one disabled `unassigned` row |
| OTP | `123456` success; invalid/expired/rate-limited via fixtures |
| Known-one phone | one redacted patient; explicit `Choose` still required |
| Shared phone | `+85570123496` → `pat-sokha`, `pat-sopheak`; no default |
| Guardian phone | phone holder plus existing dependent; roles remain distinct |
| New dependent | guardian path creates `guarantor-provisional` after duplicate preflight |
| No match | `+85596111222` |
| Tests | `LAB-CBC` $8, `LAB-HBA1C` $12, `LAB-LIPID` $15, one unavailable |
| PSC | `psc-bkk1`, Kura PSC BKK1, `55 St. 178`, `07:00–18:00` |
| Resubmit reason | `Licence image is unreadable. Upload a clearer image.` |
| Code | two allowed letters + five digits; exclude `I`, `O`, `0`, `1` |

Three tests total exactly `3500` USD minor units. Never use floating-point money arithmetic.

## 10. State machines and guards

### Workspace

```text
unresolved → active(one valid)
unresolved → choosing(N≥2)
choosing → active(explicit valid selection)
active → choosing/error(revoked/stale)
active A → confirm(dirty A draft before switch B)
```

### KYD

```text
not-started        → under-review
needs-resubmission → under-review
expired            → under-review
under-review       → approved | needs-resubmission
approved           → expired
```

Reject every other direct transition. Normal doctor UI cannot approve itself. Under-review submission is read-only.

`decideKyd` is workspace/submission scoped: `approve|resubmit` only from `under-review`, `resubmit` requires a non-empty reason, and `expire` only from `approved`.

### Phone/patient

```text
phone-entry → otp-sent → otp-checked → lookup
lookup → known-one | known-many | no-match
known results → explicit candidate | none/new
no-match|none/new → provisional form → attached provisional
```

Changing phone clears OTP, candidates and selected patient. Shared-phone candidates are never preselected. Use `Phone checked`, never `Patient verified`.

### Booking and payment

```text
building(patient → tests → payment → confirm)
→ placing
→ scheduled / Awaiting visit
```

Placement requires matching active workspace, booking capability, explicit patient decision, ≥1 distinct available test, `route='psc'`, PSC, allowed payment and one stable idempotency key. The adapter reloads current KYD/capabilities at commit time. For cash it additionally requires the non-persisted `cashConfirmed === true`; a manipulated draft alone can never collect cash.

| Choice | Allowed | State | Receipt truth |
| --- | --- | --- | --- |
| `later` | all KYD | `deferred` | `Pay at PSC` |
| `khqr` | all KYD | `waiting` | `Payment request simulated` |
| `cash` | approved + current-session confirmation | `collected` | `Cash collected by clinic (prototype)` |

If approved expires after cash selection, block commit with `CASH_REQUIRES_KYD_APPROVED`, preserve patient/tests, and require another method.

## 11. Screens and states

### Workspace resolver

- Loading: `Opening your clinic`; no mutations.
- N≥2: explicit accessible chooser; role/status visible; unassigned disabled with reason.
- Stale/error: `We couldn’t open this workspace`; Retry/Choose another.
- Success: replace route. Remove the current intermediate dead end/404.

### Verification route

| State | Title | CTA |
| --- | --- | --- |
| `not-started` | `Verify your medical licence` | `Start verification` |
| `under-review` | `Your verification is being reviewed` | `Go to Explorer Home` |
| `needs-resubmission` | `Update your verification` | `Fix and resubmit` |
| `expired` | `Renew your medical licence verification` | `Start renewal` |
| `approved` | `Your doctor profile is verified` | `Go to Practice Home` |

Submission phases: details → documents → review → submitting → submitted. Accept JPG/PNG/PDF through 10 MB inclusive. Store metadata only. Submission failure retains valid input. Resubmission retains history/reason until successful.

### Explorer Home

- Exact KYD badge and state-specific recovery CTA.
- Enabled `Create PSC booking`.
- Catalog/demo-patient entry.
- Cash/legal/claim/directory show visible lock reason and verification link.
- No fake operational activity.
- Existing draft changes CTA to `Continue booking`.

### Practice Home

- Same shell/route, approved projection.
- Checklist: workspace, KYD, first booking, optional team/settings.
- `No bookings yet` empty state; after placement show one booking and complete the checklist once.

### Booking composer

Desktop: main step + sticky summary. Mobile: single column, collapsible summary, safe-area action footer, app bottom nav hidden.

1. Patient: phone → OTP → explicit candidate/provisional.
2. Tests: search/filter, availability reason, add/remove, integer-minor total.
3. Payment: later, KHQR mock, cash only approved.
4. Confirm: workspace, doctor, patient assurance, tests, PSC, payment, total and edit links.

Dirty exit prompts discard. Back/edit preserves draft. Changing patient replaces old identity evidence. Loading, empty, partial, validation, stale, retry and save failure must be explicit at every step.

### Receipt

- `Booking confirmed`, code, patient, tests, total, PSC, `Awaiting visit`, payment and channel states.
- Provisional copy: `PSC will confirm identity before drawing the sample.`
- Channel copy is explicitly simulated: `Telegram simulation completed — no message was sent` and the equivalent SMS copy. Partial simulated failure never invalidates or duplicates booking; retry the failed simulation only.
- Return Home/Create another. Receipt refresh must not rerun placement.

## 12. UI system, responsive and accessibility

Use public `@kura/ui-kit` exports only, including available `DashboardShell`, `Card`, `Button`, `Badge`, `Input`, `Label`, `Select`, `PhoneInput`, `InputOTP`, `SearchInput`, `MoneyText`, `EmptyState`, `Spinner`, `Dialog`, `AlertDialog`, `Drawer`, `ItemGroup`, `Separator`, `ToggleGroup`, `CopyButton`. Confirm exports before use.

Use semantic Kura surface/text/border/status/focus/radius/spacing/motion tokens. No hard-coded colors or direct ReUI feature imports.

Kit gaps: file-upload/Skeleton may need root export; no confirmed RadioGroup/choice-card, QR or progress primitive. Use a labelled non-scannable `QR preview` placeholder. Validate `ToggleGroup` single-select semantics. Fix contrast centrally, not in feature CSS.

- One `h1` per route; focus after route/step change.
- Persistent labels; `aria-invalid`, `aria-describedby`, first-error focus.
- Async status/errors in polite live regions; placing exposes `aria-busy`.
- Dialog focus trap/return; OTP paste/auto-advance/backspace/numeric keyboard.
- Status and locks use text+icon, never color/tooltip only.
- Keyboard-only completion, visible focus, reduced motion.
- ≥44×44 px mobile targets; no required horizontal page scroll.
- Verify 390 px and 1280 px; sticky UI must not obscure focus/errors.

## 13. Prototype audit events and privacy

Record local events for workspace resolved/selected/denied, KYD viewed/submitted/changed, locked capability viewed/attempted, booking started, OTP sent/checked, candidate count, patient selected/created, tests add/remove, payment selected, placement started/succeeded/failed, message failed/retried and reset.

Payload: timestamp, doctor/workspace/scenario, object ID/status/count when needed. Never log OTP, document content, full phone, full DOB/name or clinical data.

## 14. Proposed file inventory

Confirm names against the live tree; keep scope under `apps/clinic/dcm`.

```text
src/app/clinic/[workspaceId]/page.tsx
src/app/clinic/[workspaceId]/verification/page.tsx
src/app/clinic/[workspaceId]/bookings/new/page.tsx
src/app/clinic/[workspaceId]/bookings/[bookingId]/page.tsx
src/features/prototype/{types,errors,fixtures,storage,demo-adapter,context}.ts(x)
src/features/workspace/workspace-resolver.tsx
src/features/verification/verification-screen.tsx
src/features/home/clinic-home.tsx
src/features/booking/{booking-composer,booking-receipt}.tsx
storybook/post-onboarding-activation.stories.tsx
storybook/first-psc-booking.stories.tsx
README.md
```

Reuse/refactor onboarding types/adapter. Do not import production React Router/Module Federation screens into this Next prototype.

## 15. Required scenarios and acceptance oracle

### Workspace/KYD/Home

1. Valid onboarding double-click creates/restores exactly one owner workspace.
2. Missing onboarding data creates no partial workspace and returns `ONBOARDING_INCOMPLETE`.
3. N≥2 memberships require/restore only a valid selection; state remains workspace-isolated.
4. Unknown/revoked route reveals no scoped data and returns `WORKSPACE_ACCESS_DENIED`.
5. Dirty cross-workspace draft requires switch-back/discard; never copies data.
6. Every canonical KYD renders one consistent state, CTA and capability set.
7. Corrupt KYD fails closed to `not-started`, never approved.
8. Supported files ≤10 MB create one persisted under-review submission; unsupported or 10 MB+1 byte is rejected.
9. Under-review evidence cannot be replaced; resubmit/renew preserves history then returns to under-review.
10. Expiring approval immediately locks approved-only controls but leaves PSC booking enabled.
11. Explorer shows enabled PSC booking and locked cash/legal/claim/directory with visible recovery.
12. First successful booking replaces `No bookings yet` with exactly one row/checklist completion.

### Phone/patient

13. Valid Cambodian phone normalizes to E.164 and creates one challenge.
14. Missing/incomplete/invalid/expired/rate-limited OTP attaches no patient and shows exact error.
15. `123456` leads to `Phone checked`, never patient verified.
16. A known-one result still requires explicit `Choose` and records `known-confirmed`.
17. N≥2 shared-phone candidates have no default; Continue without choice returns `PATIENT_SELECTION_REQUIRED`.
18. A guardian fixture shows holder and dependent separately; choosing the dependent records `dependent-confirmed`.
19. Creating a new dependent records `guarantor-provisional`; shared-phone none records `shared-phone-provisional`; unknown phone records `unknown-phone-provisional`.
20. Duplicate preflight shows soft candidates and requires `confirmed-different-person`; it never overwrites or silently merges.
21. None/no-match plus valid name/sex/DOB, YOB or age creates one idempotent provisional patient without mutating candidates.
22. Changing phone clears OTP/candidates/patient. Refresh during OTP restores safe draft but restarts phone verification.

### Tests/payment/placement

23. Zero tests returns `TEST_REQUIRED`; duplicate add leaves one line and returns `TEST_ALREADY_ADDED`.
24. CBC $8 + HbA1c $12 + Lipid $15 equals exactly `$35`/`3500`; remove updates only that line.
25. Explorer enables later/KHQR and locks cash. Direct cash manipulation returns `CASH_REQUIRES_KYD_APPROVED` or `BOOKING_INVALID` before any write.
26. Approved cash requires current-session confirmation; a persisted/manipulated cash draft without it cannot place.
27. Non-PSC route manipulation returns `BOOKING_INVALID` and creates nothing.
28. A valid draft placed/double-clicked/retried with one key produces one scheduled booking, code and initial simulated-channel attempts.
29. Save failure creates no partial booking/code and preserves draft.
30. Simulated message failure preserves booking/code; retry creates only a new simulated-channel attempt.
31. Receipt refresh restores the same snapshots without rerunning placement.
32. Foreign/missing booking reveals no patient data and returns `BOOKING_NOT_FOUND`.

### Accessibility/responsive

33. Full journey completes with keyboard only and logical visible focus.
34. Errors are field-associated, announced and focused without clearing input.
35. At 390/1280 px no required field/error/test/price/CTA/lock reason is clipped or needs horizontal page scrolling.
36. Reduced motion retains all orientation and status feedback.

## 16. Storybook/test matrix

Cover new deferred, new submitted, resubmit, expired, approved, N≥2 workspaces, stale workspace, known/shared/no-match patient, OTP failures, N≥3 tests, Explorer later/KHQR, Explorer cash rejection, approved cash, duplicate placement, save failure, message failure, receipt refresh, corrupt storage and workspace isolation.

Minimum tests:

- Pure: normalization, capability derivation, storage validation, integer money, guards, code generation, idempotency.
- Component/interaction: every exact error and state transition.
- Full click journeys for Explorer and approved paths.
- Keyboard/focus/live-region checks and axe where available.
- Run through repository Nx/package-manager targets: build, typecheck, lint and discovered Storybook/test target.

Do not declare complete from a static screenshot.

## 17. Implementation order

1. Close onboarding workspace route/404 and normalize types.
2. Add storage, errors, fixtures and adapter with pure tests.
3. Implement five-state KYD and capability derivation.
4. Implement shared Home and locked actions.
5. Implement phone/patient state machine.
6. Implement tests/payment/review and integer money.
7. Implement idempotent placement, receipt, message retry and Home projection.
8. Add scenario/test matrix; run build/typecheck/lint/a11y.

## 18. Definition of done

- Routes resolve and isolate workspace state.
- Five KYD states and valid transitions are demonstrable.
- Explorer can place PSC via later/KHQR; approved-only capabilities remain locked otherwise.
- Phone/patient identity are never conflated; shared-phone/new patient require explicit decisions.
- N≥2 workspace/patient/test cases pass.
- Retry produces exactly one booking/code.
- Refresh restores safe committed state/draft/receipt but not transient proof.
- No UI claims real upload, approval, payment, message, sample, claim or result.
- All loading/empty/partial/error/retry states, exact errors and recovery actions exist.
- Kura DS, WCAG and responsive contracts pass.
- No production service, contract or database changes.

## 19. Non-blocking production decisions

- Whether production KYD blocks PSC checkout or only selected legal/financial capabilities.
- Real evidence, reviewer SLA, licence/jurisdiction and operational RBAC policy.
- Real OTP/rate limit, communication, PSC scheduling and payment reconciliation.
- Production identity/release rules.

## 20. Sources

- [Clinic operations domain truth](../00-source-of-truth/clinic-operations-domain-truth.md)
- [Product goal](../00-source-of-truth/product-goal.md)
- [End-to-end journeys](../01-journeys/end-to-end-journeys.md)
- [Journey catalog](../01-journeys/journey-catalog.md)
- [Journey case matrix](../01-journeys/journey-case-matrix.md)
- [Phone gate journey](../01-journeys/phone-gate-journey.md)
- [Order/cart business rules](../02-domain-and-rules/order-cart-business-rules.md)
- [Kura Design System](design-system.md)
- [Source register](../05-traceability/source-register.md)
