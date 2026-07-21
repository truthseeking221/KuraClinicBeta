'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  ChevronRightIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Kbd,
  LockKeyIcon,
  MoneyText,
  QrCodeIcon,
  RefreshIcon,
  Select,
  ShieldIcon,
  SpinnerGapIcon,
  UserCheckIcon,
  SegmentedToggle,
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '../../components/ui';
import { LabTestPicker } from '../lab-catalog';

import { CartRail } from './cart-rail';
import { ContactChannels } from './contact-channels';
import {
  ORDER_CATALOG,
  OTHER_ORDER_ENTRIES,
  ORDER_PICKER_CATEGORIES,
  ORDER_PICKER_TESTS,
  orderEntryForPickerTest,
  type CatalogEntry,
} from './catalog';
import { PaymentReceipt } from './payment-receipt';
import {
  DEMO_BOOKING_QR_PAYLOAD,
  DEMO_BRANCH_ID,
  DEMO_CASHIER,
  DEMO_CONFIRMED_AT,
  DEMO_PRESCRIBERS,
  DEMO_RECEIPT_ID,
  IDENTITY_REGISTRY,
} from './demo-data';
import { IdentitySearch } from './identity-search';
import { PatientResolutionCard } from './patient-resolution-card';
import {
  acceptReprice,
  attributionBlocker,
  bookingBlockMeta,
  bookingBlockReason,
  orderBlockerMessage,
  orderBlockers,
  canNavigateToStep,
  cartTotals,
  collisionOverridePinValid,
  confirmedPayment,
  consentBlockers,
  consentRequirement,
  type ConsentRequirement,
  pregnancyGateApplies,
  splitCashPortionValid,
  splitRemainderMinor,
  tatDayOffset,
  teleconsultSpecialtyFor,
  verbalConsentValid,
  eligiblePrescribers,
  findCollisionCandidates,
  guardianGateBlocks,
  identityEditClearsAcks,
  inferStep,
  intakeSections,
  matchedOnLabel,
  maxTatHours,
  mockEligibility,
  paymentAfterPaidEdit,
  paymentDueAmountMinor,
  resolveIdentity,
  trustSignalsFor,
  wizardGate,
} from './logic';
import {
  compareMinor,
  convertUsdMinorToKhr,
  parseUsdMajor,
  subtractMinorFloor,
  type FxRateQuote,
} from './money';
import type {
  BookingSummary,
  CartItem,
  CollisionCandidate,
  FrontDeskPatient,
  InsurancePolicy,
  IntakeFields,
  LineConsent,
  PatientRecordSummary,
  Prescriber,
  StepId,
} from './types';
import styles from './check-in-wizard.module.css';

const STEP_DEFS: Array<{ id: StepId; title: string }> = [
  { id: 1, title: 'Identity' },
  { id: 2, title: 'Review' },
  { id: 3, title: 'Insurance' },
  { id: 4, title: 'Orders' },
  { id: 5, title: 'Pre-consult' },
  { id: 6, title: 'Payment' },
];

/** Shown next to a blocked Continue so the disabled state explains itself. */
const STEP_REQUIREMENTS: Record<Exclude<StepId, 6>, string> = {
  1: 'Find the patient or create a new record to continue.',
  2: 'Date of birth, sex, and a contact channel are required.',
  3: 'Attach a policy or choose self-pay to continue.',
  4: 'Add at least one order to continue.',
  5: 'Resolve the teleconsult booking to continue.',
};

export type CheckInWizardProps = {
  patient: FrontDeskPatient;
  onPatientChange: (patient: FrontDeskPatient) => void;
  /** Existing records for duplicate detection. */
  existingPatients: FrontDeskPatient[];
  /** Registry the Step-1 identity search resolves against. */
  identityRegistry?: PatientRecordSummary[];
  /** This desk's branch — booking codes issued for another branch block here. */
  branchId?: string;
  /** Workspace clinicians for order attribution (ADR-0057). */
  prescribers?: Prescriber[];
  onCheckIn: () => void;
  /** Live USD→KHR rate supplied by the clinic config endpoint. */
  fxRate?: FxRateQuote;
};

/**
 * Six-step check-in wizard. The gate engine decides progress; steps never
 * bypass it. Editing a paid cart routes through the void/supplemental choice.
 */
export function CheckInWizard({
  branchId = DEMO_BRANCH_ID,
  existingPatients,
  identityRegistry = IDENTITY_REGISTRY,
  onCheckIn,
  onPatientChange,
  patient,
  prescribers = DEMO_PRESCRIBERS,
  fxRate,
}: CheckInWizardProps) {
  const gate = wizardGate(patient);
  const [step, setStep] = useState<StepId>(() => inferStep(gate));
  const [paidEditRequest, setPaidEditRequest] = useState<null | ((mode: 'void' | 'supplemental') => void)>(
    null,
  );

  const collisions = findCollisionCandidates(patient, existingPatients);

  function update(patch: Partial<FrontDeskPatient>) {
    const next = { ...patient, ...patch };
    // An acknowledged duplicate applies to the identity it was made against:
    // editing any identity field re-arms the warnings.
    if (identityEditClearsAcks(patient, next) && patch.collisionAcked === undefined) {
      next.collisionAcked = [];
    }
    onPatientChange(next);
  }

  /** Cart edits on a paid cart must pick void or supplemental first. */
  function guardPaidEdit(apply: (current: FrontDeskPatient) => FrontDeskPatient) {
    if (patient.cart.payment.status === 'confirmed') {
      setPaidEditRequest(() => (mode: 'void' | 'supplemental') => {
        const next = apply(patient);
        onPatientChange({
          ...next,
          cart: { ...next.cart, payment: paymentAfterPaidEdit(patient.cart.payment, mode) },
        });
      });
    } else {
      onPatientChange(apply(patient));
    }
  }

  function goTo(target: StepId) {
    if (canNavigateToStep(target, step, gate)) setStep(target);
  }

  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);

  // Reception runs hands-on-keyboard: F1–F6 jump steps, ? opens the map.
  // Suppressed while typing or while any dialog is open.
  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      // Dialog content stays mounted while closed — only an OPEN dialog eats keys.
      if (
        document.querySelector(
          '[role="alertdialog"][data-state="open"], [role="dialog"][data-state="open"]',
        )
      ) {
        return;
      }
      if (event.key === '?' && !typing) {
        event.preventDefault();
        setCheatsheetOpen(true);
        return;
      }
      const match = /^F([1-6])$/.exec(event.key);
      if (match) {
        event.preventDefault();
        goTo(Number(match[1]) as StepId);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  /**
   * The order rail earns its place only once orders exist: steps 1–3 stay
   * single-anchor (identity, review, insurance). A non-empty cart keeps the
   * rail visible when navigating back so paid context is never hidden.
   */
  const showCartRail = step >= 4 || patient.cart.items.length > 0;

  return (
    <div className={styles.wizard}>
      {patient.arrivedLabel ? (
        <p className={styles.subjectMeta}>
          <span className={styles.subjectQueue}>Q-{String(patient.queueNumber).padStart(3, '0')}</span>
          <span>Arrived {patient.arrivedLabel}</span>
        </p>
      ) : null}
      <Stepper onValueChange={(value) => goTo(value as StepId)} value={step}>
        <StepperNav>
          {STEP_DEFS.map((def, index) => (
            <StepperItem
              completed={gate.stepStatus[def.id] === 'done'}
              disabled={gate.stepStatus[def.id] === 'locked'}
              key={def.id}
              step={def.id}
            >
              <StepperTrigger>
                <StepperIndicator>{def.id}</StepperIndicator>
                <StepperTitle>{def.title}</StepperTitle>
              </StepperTrigger>
              {index < STEP_DEFS.length - 1 ? <StepperSeparator /> : null}
            </StepperItem>
          ))}
        </StepperNav>
      </Stepper>

      <div className={styles.workspace} data-cart-rail={showCartRail ? 'visible' : 'hidden'}>
        <div className={styles.stepPanel}>
          {step === 1 ? (
            <StepIdentity
              branchId={branchId}
              collisions={collisions}
              onAdvance={() => setStep(2)}
              onUpdate={update}
              patient={patient}
              registry={identityRegistry}
            />
          ) : null}
          {step === 2 ? (
            <StepReview collisions={collisions} onUpdate={update} patient={patient} />
          ) : null}
          {step === 3 ? <StepInsurance onUpdate={update} patient={patient} /> : null}
          {step === 4 ? (
            <StepOrders
              guardPaidEdit={guardPaidEdit}
              onUpdate={update}
              patient={patient}
              prescribers={prescribers}
            />
          ) : null}
          {step === 5 ? <StepPreConsult onUpdate={update} patient={patient} /> : null}
          {step === 6 ? (
            <StepPayment
              fxRate={fxRate}
              onUpdate={update}
              patient={patient}
              prescribers={prescribers}
            />
          ) : null}

          <ContinueFooter
            collisionsBlock={(step === 1 || step === 2) && collisions.length > 0}
            gate={gate}
            onBack={() => setStep((step - 1) as StepId)}
            onContinue={() => setStep((step + 1) as StepId)}
            onFinish={onCheckIn}
            step={step}
          />
        </div>

        {showCartRail ? (
          <CartRail
            fxRate={fxRate}
            onAcceptReprice={() => update({ cart: acceptReprice(patient.cart) })}
            onRetryCodeIssuance={() => update({ cart: { ...patient.cart, placeFailure: null } })}
            onRemoveItem={(id) =>
              guardPaidEdit((current) => ({
                ...current,
                cart: {
                  ...current.cart,
                  items: current.cart.items.filter((item) => item.id !== id),
                },
              }))
            }
            patient={patient}
          />
        ) : null}
      </div>

      <PaidEditDialog
        onCancel={() => setPaidEditRequest(null)}
        onResolve={(mode) => {
          paidEditRequest?.(mode);
          setPaidEditRequest(null);
        }}
        open={paidEditRequest !== null}
        receiptId={patient.cart.payment.receiptId}
      />

      <AlertDialog
        onOpenChange={(next) => (!next ? setCheatsheetOpen(false) : undefined)}
        open={cheatsheetOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Keyboard shortcuts</AlertDialogTitle>
            <AlertDialogDescription>
              Reception runs hands-on-keyboard. Locked steps stay locked — a shortcut never
              bypasses the gate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <dl className={styles.shortcutList}>
            <div>
              <dt>
                <Kbd>F1</Kbd>–<Kbd>F6</Kbd>
              </dt>
              <dd>Jump to a wizard step</dd>
            </div>
            <div>
              <dt>
                <Kbd>?</Kbd>
              </dt>
              <dd>Open this list</dd>
            </div>
          </dl>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCheatsheetOpen(false)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Step footer ────────────────────────────────────────────

function ContinueFooter({
  collisionsBlock,
  gate,
  onBack,
  onContinue,
  onFinish,
  step,
}: {
  collisionsBlock: boolean;
  gate: ReturnType<typeof wizardGate>;
  onBack: () => void;
  onContinue: () => void;
  onFinish: () => void;
  step: StepId;
}) {
  const stepDone = gate[`step${step}Done` as keyof typeof gate] === true;
  const blocked = !stepDone || collisionsBlock;
  const reason = collisionsBlock
    ? 'Resolve the possible duplicates above to continue.'
    : !stepDone
      ? step === 6
        ? 'Record payment before finishing this reception flow.'
        : STEP_REQUIREMENTS[step]
      : null;
  const actionLabel = step === 6 ? 'Finish' : step === 1 ? 'Review details' : 'Continue';

  return (
    <footer className={styles.stepFooter}>
      {step > 1 ? (
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      ) : (
        <span />
      )}
      <div className={styles.continueGroup}>
        {blocked && reason ? <p className={styles.hint}>{reason}</p> : null}
        <Button
          disabled={blocked}
          onClick={step === 6 ? onFinish : onContinue}
          variant="primary"
        >
          {actionLabel}
        </Button>
      </div>
    </footer>
  );
}

// ── Step 1 · Identity ──────────────────────────────────────

/** Copy the resolved record onto the wizard patient as a patch. */
function recordPatch(record: PatientRecordSummary): Partial<FrontDeskPatient> {
  return {
    name: record.name,
    nameKhmer: record.nameKhmer ?? '',
    dob: record.dob ?? '',
    sexAtBirth: record.sexAtBirth,
    idNumber: record.nid ?? '',
    phoneNumber: (record.phone ?? '').replace(/\D/g, ''),
    identity: { source: 'existing', lockedFields: ['name', 'dob', 'sexAtBirth'] },
    collisionAcked: [],
  };
}

function StepIdentity({
  branchId,
  collisions,
  onAdvance,
  onUpdate,
  patient,
  registry,
}: {
  branchId?: string;
  collisions: CollisionCandidate[];
  onAdvance: () => void;
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
  registry: PatientRecordSummary[];
}) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [guardianConfirmed, setGuardianConfirmed] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [recaptureAsked, setRecaptureAsked] = useState(false);

  const captured = patient.identity.source !== null;
  const resolution = captured ? null : resolveIdentity(query, registry, { branchId });

  function captureRecord(record: PatientRecordSummary, booking?: BookingSummary) {
    onUpdate({ ...recordPatch(record), boundBookingCode: booking?.code ?? null });
    onAdvance();
  }

  function captureNewPatient(prefillKind: 'phone' | 'code' | 'name', value: string) {
    onUpdate({
      name: prefillKind === 'name' ? value : '',
      phoneNumber: prefillKind === 'phone' ? value.replace(/\D/g, '') : patient.phoneNumber,
      identity: { source: 'manual', lockedFields: [] },
      collisionAcked: [],
    });
    onAdvance();
  }

  if (captured) {
    const sourceLabel =
      patient.identity.source === 'qr'
        ? 'QR scan'
        : patient.identity.source === 'existing'
          ? 'Existing Kura record'
          : 'Manual entry';
    const hasCaptureFacts =
      patient.identity.lockedFields.length > 0 || Boolean(patient.boundBookingCode);
    return (
      <section aria-label="Identity" className={styles.step}>
        <h2 className={styles.stepTitle}>Identity captured</h2>
        <p className={styles.stepSubtitle}>
          {patient.identity.lockedFields.length > 0
            ? 'Review details next. Locked fields must be unlocked before editing.'
            : 'Review and edit details on the next step.'}
        </p>
        <PatientResolutionCard
          variant="captured"
          record={{
            id: patient.id,
            name: patient.name || 'New patient',
            dob: patient.dob || undefined,
            sexAtBirth: patient.sexAtBirth,
            nid: patient.idNumber || undefined,
            phone: patient.phoneNumber || undefined,
            assurance: 'unverified',
            registeredHere: true,
          }}
          provenance={`Source: ${sourceLabel}${patient.identity.capturedAtLabel ? ` · Captured ${patient.identity.capturedAtLabel}` : ''}`}
          helperText={
            hasCaptureFacts ? (
              <>
                {patient.identity.lockedFields.length > 0 ? (
                  <Badge size="sm" variant="neutral">
                    {patient.identity.lockedFields.length} fields locked
                  </Badge>
                ) : null}{' '}
                {patient.boundBookingCode ? (
                  <Badge size="sm" variant="info">
                    Booking {patient.boundBookingCode}
                  </Badge>
                ) : null}
              </>
            ) : undefined
          }
          actions={
            recaptureAsked
              ? undefined
              : [
                  {
                    label: 'Capture again',
                    variant: 'ghost',
                    icon: <RefreshIcon size={14} aria-hidden />,
                    onClick: () => setRecaptureAsked(true),
                  },
                ]
          }
        />
        {recaptureAsked ? (
          <Alert tone="warning">
            <AlertTitle>Capture identity again?</AlertTitle>
            <AlertDescription>
              Search, scan, or enter the identity again. Current data stays until a new method
              overwrites it.
            </AlertDescription>
            <AlertAction>
              <Button onClick={() => setRecaptureAsked(false)} size="sm" variant="outline">
                Keep current
              </Button>
              <Button
                onClick={() => {
                  setRecaptureAsked(false);
                  setQuery('');
                  setSelectedId(null);
                  setGuardianConfirmed(false);
                  onUpdate({
                    identity: { source: null, lockedFields: [] },
                    boundBookingCode: null,
                  });
                }}
                size="sm"
                variant="primary"
              >
                Start again
              </Button>
            </AlertAction>
          </Alert>
        ) : null}
        <CollisionList
          collisions={collisions}
          onAcknowledge={(id) => onUpdate({ collisionAcked: [...patient.collisionAcked, id] })}
          onLoadExisting={(existing) => {
            onUpdate({
              ...recordPatch({
                id: existing.id,
                name: existing.name,
                nameKhmer: existing.nameKhmer || undefined,
                dob: existing.dob || undefined,
                sexAtBirth: existing.sexAtBirth,
                nid: existing.idNumber || undefined,
                phone: existing.phoneNumber || undefined,
                assurance: 'unverified',
                registeredHere: true,
              }),
              collisionAcked: [existing.id],
            });
          }}
        />
      </section>
    );
  }

  const selectedRecord =
    resolution?.kind === 'shared-phone'
      ? (resolution.records.find((record) => record.id === selectedId) ?? null)
      : null;
  const guardianBlocked = guardianGateBlocks(selectedRecord, guardianConfirmed);
  const visibleCandidates =
    resolution?.kind === 'candidates'
      ? resolution.records.filter((record) => !dismissedIds.includes(record.id))
      : [];

  return (
    <section aria-label="Identity" className={styles.step}>
      <h2 className={styles.stepTitle}>Capture identity</h2>
      <p className={styles.stepSubtitle}>Search for an existing patient before continuing.</p>

      <IdentitySearch
        autoFocus
        demoQrPayload={DEMO_BOOKING_QR_PAYLOAD}
        onChange={(next) => {
          setQuery(next);
          setSelectedId(null);
          setGuardianConfirmed(false);
          setDismissedIds([]);
        }}
        value={query}
      />

      {resolution?.kind === 'known-here' ? (
        <>
          <PatientResolutionCard
            variant="known-here"
            record={resolution.record}
            bookingsHeader={
              resolution.record.bookings?.length
                ? `Today · ${resolution.record.bookings.length} bookings`
                : undefined
            }
            lastVisitLabel={resolution.record.lastVisitLabel}
            trustSignals={trustSignalsFor(resolution.record)}
            onBookingSelect={
              resolution.record.bookings?.length
                ? (booking) => captureRecord(resolution.record, booking)
                : undefined
            }
            bookingActionable={(booking) => bookingBlockReason(booking, branchId) === null}
          />
          <IdentityActionArea>
            <Button
              onClick={() => captureRecord(resolution.record)}
              variant={resolution.record.bookings?.length ? 'outline' : 'primary'}
            >
              {resolution.record.bookings?.length
                ? `Continue without a booking`
                : `Continue with ${resolution.record.name}`}
              <ChevronRightIcon size={14} aria-hidden />
            </Button>
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'known-elsewhere' ? (
        <>
          <PatientResolutionCard
            variant="known-elsewhere"
            record={resolution.record}
            status={{ label: 'First visit at this PSC', variant: 'warning' }}
            trustSignals={trustSignalsFor(resolution.record)}
            helperText="The Kura record imports here on check-in; nothing is re-typed."
          />
          <IdentityActionArea>
            <Button onClick={() => captureRecord(resolution.record)} variant="primary">
              Import {resolution.record.name}
              <ChevronRightIcon size={14} aria-hidden />
            </Button>
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'booking-linked' ? (
        <>
          <PatientResolutionCard
            variant="booking-linked"
            record={resolution.record}
            bookings={[resolution.booking]}
          />
          <IdentityActionArea>
            <Button
              onClick={() => captureRecord(resolution.record, resolution.booking)}
              variant="primary"
            >
              Check in booking {resolution.booking.code}
              <ChevronRightIcon size={14} aria-hidden />
            </Button>
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'booking-blocked' ? (
        <>
          <PatientResolutionCard
            variant="booking-blocked"
            record={resolution.record}
            bookings={[resolution.booking]}
            status={{
              label: bookingBlockMeta(resolution.reason).title,
              variant: 'warning',
            }}
            helperText={bookingBlockMeta(resolution.reason).description}
          />
          <IdentityActionArea>
            {/* Recovery, never a dead end: the record still identifies the
                patient, but a blocked code is never silently redeemed. */}
            {resolution.reason === 'redeemed' ? (
              <Button onClick={() => captureRecord(resolution.record)} variant="outline">
                Continue as walk-in anyway
              </Button>
            ) : (
              <Button onClick={() => captureRecord(resolution.record)} variant="primary">
                Continue with {resolution.record.name} as walk-in
                <ChevronRightIcon size={14} aria-hidden />
              </Button>
            )}
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'shared-phone' ? (
        <>
          <div className={styles.identityGroupIntro}>
            <h3 className={styles.identityGroupTitle}>Who is here today?</h3>
            <p className={styles.identityGroupHint}>
              {resolution.records.length} patients are linked to this phone number.
            </p>
          </div>
          <div aria-label="Choose who is here today" className={styles.identityCards} role="radiogroup">
            {resolution.records.map((record) => {
              const isSelected = selectedId === record.id;
              const needsGuardian = isSelected && record.minor;
              return (
                <PatientResolutionCard
                  key={record.id}
                  variant="shared-phone"
                  record={record}
                  selectable
                  selected={isSelected}
                  onSelect={() => {
                    setSelectedId(record.id);
                    setGuardianConfirmed(false);
                  }}
                  onBookingSelect={
                    isSelected && !guardianBlocked && (record.bookings?.length ?? 0) > 1
                      ? (booking) => captureRecord(record, booking)
                      : undefined
                  }
                  bookingActionable={(booking) => bookingBlockReason(booking, branchId) === null}
                  status={
                    needsGuardian
                      ? guardianConfirmed
                        ? {
                            label: `Guardian confirmed · ${record.guardianName ?? 'present'}`,
                            variant: 'success',
                          }
                        : {
                            label: `Guardian required · On file: ${record.guardianName ?? 'unknown'}`,
                            variant: 'warning',
                          }
                      : undefined
                  }
                  actions={
                    needsGuardian && !guardianConfirmed
                      ? [
                          {
                            label: 'Confirm guardian present',
                            variant: 'secondary',
                            icon: <UserCheckIcon size={14} aria-hidden />,
                            onClick: () => setGuardianConfirmed(true),
                          },
                        ]
                      : undefined
                  }
                />
              );
            })}
          </div>
          <Button
            className={styles.identityCreateNew}
            onClick={() => captureNewPatient('phone', query)}
            variant="outline"
          >
            None of these, create new patient
            <ChevronRightIcon size={14} aria-hidden />
          </Button>
          <IdentityActionArea
            helper={
              selectedId === null
                ? 'Choose a patient to continue.'
                : guardianBlocked
                  ? 'Confirm the guardian is present to continue with a minor.'
                  : undefined
            }
          >
            {selectedRecord && !guardianBlocked ? (
              (selectedRecord.bookings?.length ?? 0) > 1 ? (
                <Button onClick={() => captureRecord(selectedRecord)} variant="outline">
                  Continue without a booking
                </Button>
              ) : (
                <Button
                  onClick={() => captureRecord(selectedRecord, selectedRecord.bookings?.[0])}
                  variant="primary"
                >
                  {selectedRecord.bookings?.length
                    ? `Check in ${selectedRecord.name} · ${selectedRecord.bookings[0].code}`
                    : `Continue with ${selectedRecord.name}`}
                  <ChevronRightIcon size={14} aria-hidden />
                </Button>
              )
            ) : null}
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'candidates' ? (
        <>
          <p className={styles.identityKicker}>Possible matches</p>
          <div className={styles.identityCards}>
            {visibleCandidates.map((record) => (
              <PatientResolutionCard
                key={record.id}
                variant="candidate"
                record={record}
                matched={{ name: true, nameKhmer: true }}
                status={
                  record.assurance === 'verified'
                    ? { label: 'Verified', variant: 'success' }
                    : { label: 'Unverified', variant: 'warning' }
                }
                trustSignals={trustSignalsFor(record)}
                lastVisitLabel={record.lastVisitLabel}
                actions={[
                  {
                    label: 'Use existing',
                    variant: 'primary',
                    icon: <UserCheckIcon size={14} aria-hidden />,
                    onClick: () => captureRecord(record),
                  },
                  {
                    label: 'Different person',
                    variant: 'secondary',
                    onClick: () => setDismissedIds((previous) => [...previous, record.id]),
                  },
                ]}
              />
            ))}
          </div>
          <Button
            className={styles.identityCreateNew}
            onClick={() => captureNewPatient('name', query)}
            variant="outline"
          >
            None of these, create new patient
            <ChevronRightIcon size={14} aria-hidden />
          </Button>
        </>
      ) : null}

      {resolution?.kind === 'no-match' ? (
        <>
          <PatientResolutionCard
            variant="no-match"
            searchedKind={
              resolution.queryKind === 'phone'
                ? 'Phone'
                : resolution.queryKind === 'code'
                  ? 'Booking code'
                  : 'Name'
            }
            searchedValue={resolution.query}
            helperText={
              resolution.queryKind === 'code'
                ? 'No booking carries this code. Check the code or search by phone instead.'
                : undefined
            }
          />
          {resolution.queryKind !== 'code' ? (
            <IdentityActionArea>
              <Button
                onClick={() => captureNewPatient(resolution.queryKind, resolution.query)}
                variant="primary"
              >
                Continue as new patient
                <ChevronRightIcon size={14} aria-hidden />
              </Button>
            </IdentityActionArea>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

function IdentityActionArea({ helper, children }: { helper?: string; children?: ReactNode }) {
  if (!helper && !children) return null;
  return (
    <div className={styles.identityActionArea}>
      {helper ? (
        <span className={styles.identityHelper} role="status">
          {helper}
        </span>
      ) : null}
      {children}
    </div>
  );
}

function CollisionList({
  collisions,
  onAcknowledge,
  onLoadExisting,
}: {
  collisions: CollisionCandidate[];
  onAcknowledge: (patientId: string) => void;
  /** Adopt the existing record instead of keeping a duplicate draft. */
  onLoadExisting?: (existing: FrontDeskPatient) => void;
}) {
  if (collisions.length === 0) return null;
  return (
    <div className={styles.collisions}>
      {collisions.map((collision) => (
        <CollisionAlert
          collision={collision}
          key={collision.patient.id}
          onAcknowledge={onAcknowledge}
          onLoadExisting={onLoadExisting}
        />
      ))}
    </div>
  );
}

/**
 * One duplicate warning. An exact-ID collision cannot be waved through with a
 * click — keeping it as a separate record takes a supervisor PIN, and the
 * override is a logged decision. PROTOTYPE: no override RPC exists upstream.
 */
function CollisionAlert({
  collision,
  onAcknowledge,
  onLoadExisting,
}: {
  collision: CollisionCandidate;
  onAcknowledge: (patientId: string) => void;
  onLoadExisting?: (existing: FrontDeskPatient) => void;
}) {
  const [pin, setPin] = useState('');
  const [recordOpen, setRecordOpen] = useState(false);
  const needsPin = collision.signals.includes('idMatch');
  const evidence = matchedOnLabel(collision.signals);

  return (
    <Alert tone="warning">
      <AlertTitle>
        {collision.strength} — {collision.patient.name}
      </AlertTitle>
      <AlertDescription>
        {evidence ? `${evidence} · ` : ''}score {collision.score}. Duplicate records create a
        duplicate-risk audit entry.
      </AlertDescription>
      {recordOpen ? (
        <dl className={styles.collisionRecord}>
          <div>
            <dt>Queue</dt>
            <dd className={styles.mono}>Q-{String(collision.patient.queueNumber).padStart(3, '0')}</dd>
          </div>
          <div>
            <dt>Date of birth</dt>
            <dd>{collision.patient.dob || 'Unknown'}</dd>
          </div>
          <div>
            <dt>Sex at birth</dt>
            <dd>{collision.patient.sexAtBirth || 'Unknown'}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd className={styles.mono}>
              {collision.patient.phoneNumber
                ? `${collision.patient.countryCode} ${collision.patient.phoneNumber}`
                : 'None'}
            </dd>
          </div>
        </dl>
      ) : null}
      {needsPin ? (
        <div className={styles.collisionPin}>
          <LockKeyIcon aria-hidden size={14} />
          <Input
            aria-label="Supervisor PIN"
            inputMode="numeric"
            onChange={(event) => setPin(event.target.value)}
            placeholder="Supervisor PIN"
            type="password"
            value={pin}
          />
          <span className={styles.collisionPinHint}>
            Same national ID. Keeping both records is logged with time and staff.
          </span>
        </div>
      ) : null}
      <AlertAction>
        <Button onClick={() => setRecordOpen((open) => !open)} size="sm" variant="ghost">
          {recordOpen ? 'Hide record' : 'View record'}
        </Button>
        {onLoadExisting ? (
          <Button onClick={() => onLoadExisting(collision.patient)} size="sm" variant="outline">
            Use existing record
          </Button>
        ) : null}
        <Button
          disabled={needsPin && !collisionOverridePinValid(pin)}
          onClick={() => onAcknowledge(collision.patient.id)}
          size="sm"
          variant="outline"
        >
          Different person — continue
        </Button>
      </AlertAction>
    </Alert>
  );
}

// ── Step 2 · Review & contact ──────────────────────────────

function LockedOrEditableInput({
  field,
  label,
  lockedFields,
  onChange,
  placeholder,
  required,
  value,
  lang,
}: {
  field: string;
  label: string;
  lockedFields: string[];
  onChange: (next: string) => void;
  placeholder?: string;
  required?: boolean;
  value: string;
  lang?: string;
}) {
  const locked = lockedFields.includes(field);
  return (
    <Input
      disabled={locked}
      label={label}
      lang={lang}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      required={required}
      suffix={locked ? <LockKeyIcon size={14} aria-hidden /> : undefined}
      value={value}
    />
  );
}

function StepReview({
  collisions,
  onUpdate,
  patient,
}: {
  collisions: CollisionCandidate[];
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
}) {
  const lockedFields = patient.identity.lockedFields;
  const hasLocks = lockedFields.length > 0;
  const [unlockAsked, setUnlockAsked] = useState(false);

  function updateAddress(patch: Partial<FrontDeskPatient['address']>) {
    onUpdate({ address: { ...patient.address, ...patch } });
  }

  return (
    <section aria-label="Review and confirm" className={styles.step}>
      <h2 className={styles.stepTitle}>Review &amp; confirm</h2>

      {/* A blocking duplicate is about the identity below it and gates Continue —
          it leads the step instead of trailing the optional disclosures. */}
      <CollisionList
        collisions={collisions}
        onAcknowledge={(id) => onUpdate({ collisionAcked: [...patient.collisionAcked, id] })}
        onLoadExisting={(existing) =>
          onUpdate({
            ...recordPatch({
              id: existing.id,
              name: existing.name,
              nameKhmer: existing.nameKhmer || undefined,
              dob: existing.dob || undefined,
              sexAtBirth: existing.sexAtBirth,
              nid: existing.idNumber || undefined,
              phone: existing.phoneNumber || undefined,
              assurance: 'unverified',
              registeredHere: true,
            }),
            collisionAcked: [existing.id],
          })
        }
      />

      {unlockAsked ? (
        <Alert tone="warning">
          <AlertTitle>Unlock captured fields?</AlertTitle>
          <AlertDescription>
            These values were read from the record. Editing may introduce errors and the change
            is logged.
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => setUnlockAsked(false)} size="sm" variant="outline">
              Keep locked
            </Button>
            <Button
              onClick={() => {
                setUnlockAsked(false);
                onUpdate({ identity: { ...patient.identity, lockedFields: [] } });
              }}
              size="sm"
              variant="destructive"
            >
              Unlock
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {/* Identity is a section of this step, not an independent object — it
          groups by heading and spacing, never by a card boundary. */}
      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.subTitle}>Identity</h3>
          <span className={styles.sectionProvenance}>
            {patient.identity.source === 'existing' ? 'From Kura record' : 'Entered at the desk'}
          </span>
          {hasLocks && !unlockAsked ? (
            <Button
              className={styles.sectionAction}
              onClick={() => setUnlockAsked(true)}
              size="sm"
              variant="ghost"
            >
              <LockKeyIcon size={13} aria-hidden />
              Unlock fields
            </Button>
          ) : null}
        </div>
        <div className={styles.fieldGrid3}>
          <LockedOrEditableInput
            field="name"
            label="Full name (Latin)"
            lockedFields={lockedFields}
            onChange={(next) => onUpdate({ name: next, collisionAcked: [] })}
            placeholder="As shown on the ID document"
            required
            value={patient.name}
          />
          <Input
            label="Full name (Khmer)"
            lang="km"
            onChange={(event) => onUpdate({ nameKhmer: event.target.value })}
            placeholder="សុខ ស្រីម៉ៅ"
            value={patient.nameKhmer}
          />
          <LockedOrEditableInput
            field="dob"
            label="Date of birth"
            lockedFields={lockedFields}
            onChange={(next) => onUpdate({ dob: next, collisionAcked: [] })}
            placeholder="YYYY-MM-DD"
            required
            value={patient.dob}
          />
          {lockedFields.includes('sexAtBirth') ? (
            <Input
              disabled
              label="Sex at birth"
              required
              suffix={<LockKeyIcon size={14} aria-hidden />}
              value={patient.sexAtBirth}
            />
          ) : (
            <SegmentedToggle
              label="Sex at birth"
              labelVisible
              onValueChange={(value) =>
                onUpdate({
                  sexAtBirth: value as FrontDeskPatient['sexAtBirth'],
                  collisionAcked: [],
                })
              }
              options={[
                { value: 'Female', label: 'Female' },
                { value: 'Male', label: 'Male' },
              ]}
              value={patient.sexAtBirth}
            />
          )}
          <Input
            label="National ID number"
            onChange={(event) => onUpdate({ idNumber: event.target.value, collisionAcked: [] })}
            placeholder="012345678"
            value={patient.idNumber}
          />
        </div>
      </div>

      {/* The contact channel owns its own state machine and gates this step —
          the one boundary on the screen that represents a real object. */}
      <ContactChannels onUpdate={onUpdate} patient={patient} />

      <div className={styles.disclosures}>
        <Collapsible>
          <CollapsibleTrigger className={styles.collapsibleTrigger}>
            <span className={styles.disclosureLabel}>
              <span className={styles.subTitle}>Address</span>
              <span className={styles.optionalTag}>Optional</span>
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={styles.fieldGrid3}>
              <Input
                label="Province"
                onChange={(event) => updateAddress({ province: event.target.value })}
                placeholder="Phnom Penh"
                value={patient.address.province}
              />
              <Input
                label="District"
                onChange={(event) => updateAddress({ district: event.target.value })}
                placeholder="Chamkarmon"
                value={patient.address.district}
              />
              <Input
                label="Commune"
                onChange={(event) => updateAddress({ commune: event.target.value })}
                placeholder="Tonle Bassac"
                value={patient.address.commune}
              />
              <Input
                className={styles.fieldSpan3}
                label="Street / house"
                onChange={(event) => updateAddress({ street: event.target.value })}
                placeholder="House, street, landmark"
                value={patient.address.street}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className={styles.collapsibleTrigger}>
            <span className={styles.disclosureLabel}>
              <span className={styles.subTitle}>Refund account</span>
              <span className={styles.optionalTag}>Optional</span>
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {patient.refundAccount ? (
              <div className={styles.refundRow}>
                <QrCodeIcon size={16} aria-hidden />
                <span className={styles.refundValue}>{patient.refundAccount}</span>
                <Badge size="sm" variant="success">
                  Bakong KHQR saved
                </Badge>
                <Button
                  onClick={() => onUpdate({ refundAccount: null })}
                  size="sm"
                  variant="ghost"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className={styles.refundEmpty}>
                <div className={styles.refundEmptyText}>
                  <p className={styles.refundTitle}>No refund account saved</p>
                  <p className={styles.hint}>
                    Add Bakong KHQR only if this patient may need a refund.
                  </p>
                </div>
                <Button
                  onClick={() => onUpdate({ refundAccount: 'kh-qr://demo-bakong-account' })}
                  size="sm"
                  variant="outline"
                >
                  <QrCodeIcon size={13} aria-hidden />
                  Scan KHQR
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}

// ── Step 3 · Insurance ─────────────────────────────────────

function InsuranceDataPoints({ policy }: { policy: InsurancePolicy }) {
  if (policy.eligibility?.kind !== 'eligible') return null;
  const eligibility = policy.eligibility;
  const points: Array<{ label: string; value: ReactNode }> = [
    { label: 'Member ID', value: policy.memberId ?? policy.policyNumber },
    { label: 'Group', value: eligibility.group ?? '—' },
    {
      label: 'Coverage',
      value: `${policy.coverageScope === 'both' ? 'In + outpatient' : policy.coverageScope === 'inpatient' ? 'Inpatient' : 'Outpatient'} · ${eligibility.coveragePct}%`,
    },
    { label: 'Co-pay', value: <MoneyText currency="USD" minor={eligibility.copayMinor} /> },
    { label: 'Active until', value: eligibility.activeUntil },
    {
      label: 'Pre-auth',
      value: eligibility.preAuth === 'required' ? 'Required' : 'Not required',
    },
    { label: 'Tier', value: eligibility.tier },
    { label: 'Effective', value: eligibility.effectiveFrom ?? '—' },
  ];
  return (
    <dl className={styles.dataPoints}>
      {points.map((point) => (
        <div className={styles.dataPoint} key={point.label}>
          <dt className={styles.dataPointLabel}>{point.label}</dt>
          <dd className={styles.dataPointValue}>{point.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const PROVIDERS = ['Forte Insurance', 'Cigna', 'Bupa'];

type PolicyDraft = {
  provider: string;
  policyNumber: string;
  memberName: string;
  memberId: string;
  expiry: string;
  coverageScope: 'outpatient' | 'inpatient' | 'both';
};

function StepInsurance({
  onUpdate,
  patient,
}: {
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<PolicyDraft>({
    provider: PROVIDERS[0],
    policyNumber: '',
    memberName: patient.name,
    memberId: '',
    expiry: '',
    coverageScope: 'outpatient',
  });
  const [checking, setChecking] = useState(false);
  const [pending, setPending] = useState<InsurancePolicy | null>(null);

  const hasPolicies = patient.insurance.length > 0;
  const eligiblePolicy = patient.insurance.find(
    (policy) => policy.eligibility?.kind === 'eligible',
  );

  function patchDraft(patch: Partial<PolicyDraft>) {
    setDraft((previous) => ({ ...previous, ...patch }));
  }

  function checkEligibility() {
    setChecking(true);
    setPending(null);
    window.setTimeout(() => {
      setChecking(false);
      setPending({
        id: `pol-${draft.policyNumber.trim()}`,
        provider: draft.provider,
        policyNumber: draft.policyNumber.trim(),
        memberName: draft.memberName.trim() || patient.name,
        memberId: draft.memberId.trim() || undefined,
        coverageScope: draft.coverageScope,
        expiry: draft.expiry.trim() || undefined,
        eligibility: mockEligibility(draft.policyNumber),
      });
    }, 600);
  }

  function attach(policy: InsurancePolicy) {
    onUpdate({ insurance: [...patient.insurance, policy], insuranceAcked: true });
    setPending(null);
    setAdding(false);
    setDraft((previous) => ({ ...previous, policyNumber: '', memberId: '', expiry: '' }));
  }

  return (
    <section aria-label="Insurance" className={styles.step}>
      <div className={styles.stepHeaderRow}>
        <div>
          <h2 className={styles.stepTitle}>Insurance</h2>
          <p className={styles.stepSubtitle}>
            {hasPolicies
              ? 'Verify the policy and eligibility before pricing the cart.'
              : 'Add a policy to bill insurance, or continue as direct pay.'}
          </p>
        </div>
        {hasPolicies && !adding ? (
          <Button onClick={() => setAdding(true)} size="sm" variant="outline">
            Add policy
          </Button>
        ) : null}
      </div>

      {!hasPolicies && !patient.insuranceAcked && !adding ? (
        <Card className={styles.insuranceEmptyCard}>
          <span className={styles.insuranceEmptyIcon}>
            <ShieldIcon size={20} aria-hidden />
          </span>
          <h3 className={styles.subTitle}>No insurance on file</h3>
          <p className={styles.hint}>
            Add a policy now to bill insurance, or continue as direct pay.
          </p>
          <div className={styles.insuranceEmptyActions}>
            <Button onClick={() => setAdding(true)} variant="outline">
              Add policy
            </Button>
            <Button
              onClick={() => {
                // Simulated card scan: OCR autofill, then the normal check.
                setDraft((previous) => ({
                  ...previous,
                  provider: PROVIDERS[0],
                  policyNumber: 'FRT-88720011',
                  memberId: 'M-8872001',
                  expiry: '2027-12',
                }));
                setAdding(true);
              }}
              variant="outline"
            >
              Scan card
            </Button>
            <Button onClick={() => onUpdate({ insuranceAcked: true })} variant="primary">
              Continue without insurance
            </Button>
          </div>
        </Card>
      ) : null}

      {patient.insuranceAcked && !hasPolicies && !adding ? (
        <Alert tone="neutral">
          <AlertTitle>Direct pay</AlertTitle>
          <AlertDescription>The patient pays the full amount directly.</AlertDescription>
          <AlertAction>
            <Button onClick={() => onUpdate({ insuranceAcked: false })} size="sm" variant="ghost">
              Undo
            </Button>
            <Button onClick={() => setAdding(true)} size="sm" variant="outline">
              Add policy instead
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {patient.insurance.map((policy) => (
        <Card className={styles.sectionCard} key={policy.id}>
          <div className={styles.policyHeader}>
            <span className={styles.insurancePolicyIcon}>
              <ShieldIcon size={18} aria-hidden />
            </span>
            <div className={styles.policyHeading}>
              <div className={styles.policyTitleRow}>
                <span className={styles.policyName}>{policy.provider}</span>
                <Badge
                  size="sm"
                  variant={policy.eligibility?.kind === 'eligible' ? 'success' : 'warning'}
                >
                  {policy.eligibility?.kind === 'eligible' ? 'Eligible' : 'Unverified'}
                </Badge>
              </div>
              <p className={styles.hint}>
                {policy.eligibility?.kind === 'eligible'
                  ? (policy.eligibility.verifiedAtLabel ?? 'Verified')
                  : 'Added without a live eligibility check.'}
              </p>
            </div>
            <Button
              onClick={() =>
                onUpdate({
                  insurance: patient.insurance.map((candidate) =>
                    candidate.id === policy.id
                      ? { ...candidate, eligibility: mockEligibility(candidate.policyNumber) }
                      : candidate,
                  ),
                })
              }
              size="sm"
              variant="ghost"
            >
              <RefreshIcon size={12} aria-hidden />
              Re-verify
            </Button>
          </div>
          <InsuranceDataPoints policy={policy} />
        </Card>
      ))}

      {eligiblePolicy?.eligibility?.kind === 'eligible' ? (
        <Alert tone="success">
          <AlertTitle>
            <MoneyText currency="USD" minor={eligiblePolicy.eligibility.copayMinor} /> co-pay
            applies
          </AlertTitle>
          <AlertDescription>
            Insurance covers {eligiblePolicy.eligibility.coveragePct}% of eligible in-cart tests.
            The direct-pay portion is calculated automatically and shown in the order rail.
          </AlertDescription>
        </Alert>
      ) : null}

      {adding ? (
        <Card className={styles.sectionCard}>
          <div className={styles.sectionCardHeader}>
            <h3 className={styles.subTitle}>New policy</h3>
          </div>
          <div className={styles.fieldGrid}>
            <Select
              label="Provider"
              onChange={(event) => patchDraft({ provider: event.target.value })}
              options={PROVIDERS.map((provider) => ({ value: provider, label: provider }))}
              required
              value={draft.provider}
            />
            <Input
              className={styles.monoField}
              label="Policy number"
              onChange={(event) => patchDraft({ policyNumber: event.target.value })}
              placeholder="FRT-887200119"
              required
              value={draft.policyNumber}
            />
            <Input
              label="Member name"
              onChange={(event) => patchDraft({ memberName: event.target.value })}
              value={draft.memberName}
            />
            <Input
              className={styles.monoField}
              label="Member ID"
              onChange={(event) => patchDraft({ memberId: event.target.value })}
              placeholder="887200119"
              value={draft.memberId}
            />
            <Input
              label="Expiry"
              onChange={(event) => patchDraft({ expiry: event.target.value })}
              placeholder="YYYY-MM"
              value={draft.expiry}
            />
            <Select
              label="Coverage"
              onChange={(event) =>
                patchDraft({ coverageScope: event.target.value as PolicyDraft['coverageScope'] })
              }
              options={[
                { value: 'outpatient', label: 'Outpatient' },
                { value: 'inpatient', label: 'Inpatient' },
                { value: 'both', label: 'Both' },
              ]}
              value={draft.coverageScope}
            />
          </div>
          <div className={styles.policyFormActions}>
            <Button
              onClick={() => {
                setAdding(false);
                setPending(null);
                setChecking(false);
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={draft.policyNumber.trim() === '' || checking}
              onClick={checkEligibility}
              variant="secondary"
            >
              Check eligibility
            </Button>
          </div>
        </Card>
      ) : null}

      {checking ? (
        <Card className={styles.sectionCard} data-tone="brand">
          <div className={styles.checkingRow} role="status">
            <SpinnerGapIcon size={18} aria-hidden className={styles.checkingSpinner} />
            <div>
              <p className={styles.checkingTitle}>
                Checking eligibility with {draft.provider}…
              </p>
              <p className={styles.hint}>This usually takes a few seconds.</p>
            </div>
          </div>
        </Card>
      ) : null}

      {pending ? (
        <Alert
          tone={
            pending.eligibility?.kind === 'eligible'
              ? 'success'
              : pending.eligibility?.kind === 'unreachable'
                ? 'warning'
                : 'danger'
          }
        >
          <AlertTitle>
            {pending.eligibility?.kind === 'eligible'
              ? `Eligible — ${pending.eligibility.coveragePct}% of eligible services`
              : pending.eligibility?.kind === 'unreachable'
                ? 'Insurer unreachable'
                : 'Not eligible'}
          </AlertTitle>
          <AlertDescription>
            {pending.provider} · {pending.policyNumber}
            {pending.eligibility?.kind === 'eligible' ? (
              <>
                {' '}
                · Tier {pending.eligibility.tier} · co-pay{' '}
                <MoneyText currency="USD" minor={pending.eligibility.copayMinor} /> · active until{' '}
                {pending.eligibility.activeUntil}
              </>
            ) : null}
          </AlertDescription>
          <AlertAction>
            {pending.eligibility?.kind !== 'ineligible' ? (
              <Button onClick={() => attach(pending)} size="sm" variant="primary">
                {pending.eligibility?.kind === 'eligible' ? 'Save policy' : 'Add anyway'}
              </Button>
            ) : (
              <Button onClick={() => setPending(null)} size="sm" variant="outline">
                Retry
              </Button>
            )}
          </AlertAction>
        </Alert>
      ) : null}
    </section>
  );
}

// ── Step 4 · Orders ────────────────────────────────────────

function StepOrders({
  guardPaidEdit,
  onUpdate,
  patient,
  prescribers,
}: {
  guardPaidEdit: (apply: (current: FrontDeskPatient) => FrontDeskPatient) => void;
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
  prescribers: Prescriber[];
}) {
  const inCart = new Set(patient.cart.items.map((item) => item.id));
  const eligible = eligiblePrescribers(prescribers);
  const blocker = attributionBlocker(patient.cart, prescribers);
  const compositionBlockers = orderBlockers(patient.cart, ORDER_CATALOG);
  const consentLines = patient.cart.items.filter(
    (item) => consentRequirement(item, ORDER_CATALOG) !== null,
  );
  /** Imaging entry waiting on the pregnancy screen before it may be added. */
  const [pregnancyGateEntry, setPregnancyGateEntry] = useState<CatalogEntry | null>(null);
  const [verbalForId, setVerbalForId] = useState<string | null>(null);
  const verbalFor = patient.cart.items.find((item) => item.id === verbalForId) ?? null;

  function addEntry(
    entry: CatalogEntry,
    pregnancyScreen?: CartItem['pregnancyScreen'],
  ) {
    guardPaidEdit((current) => ({
      ...current,
      cart: {
        ...current.cart,
        items: [
          ...current.cart.items,
          {
            id: entry.id,
            kind: entry.kind,
            name: entry.name,
            priceMinor: entry.priceMinor,
            currencyCode: entry.currencyCode,
            qty: 1,
            fasting: entry.fasting,
            consent:
              consentRequirement(entry, ORDER_CATALOG) !== null
                ? { state: 'needed' as const }
                : undefined,
            pregnancyScreen,
          },
        ],
      },
    }));
  }

  function removeEntry(entryId: string) {
    guardPaidEdit((current) => ({
      ...current,
      cart: {
        ...current.cart,
        items: current.cart.items.filter((item) => item.id !== entryId),
      },
    }));
  }

  function setEntrySelected(entry: CatalogEntry, selected: boolean) {
    if (!selected) {
      removeEntry(entry.id);
      return;
    }

    // Imaging for a Female patient passes the pregnancy screen first.
    if (pregnancyGateApplies(entry, patient)) {
      setPregnancyGateEntry(entry);
      return;
    }
    addEntry(entry);
  }

  function patchConsent(itemId: string, consent: LineConsent) {
    onUpdate({
      cart: {
        ...patient.cart,
        items: patient.cart.items.map((item) =>
          item.id === itemId ? { ...item, consent } : item,
        ),
      },
    });
  }

  return (
    <section aria-label="Orders" className={styles.step}>
      <h2 className={styles.stepTitle}>Add orders</h2>

      {/* Order attribution (ADR-0057): the server refuses placement without an
          eligible prescriber — the desk resolves it here, not at payment. */}
      {patient.cart.items.length > 0 ? (
        blocker?.kind === 'no-eligible-prescriber' ? (
          <Alert tone="danger">
            <AlertTitle>No clinician can be attributed</AlertTitle>
            <AlertDescription>
              Every clinician in this workspace has an expired licence. The order cannot be
              placed until a licensed clinician is available — ask the practice owner to renew
              a licence or add a clinician.
            </AlertDescription>
          </Alert>
        ) : (
          <div className={styles.attribution}>
            <Select
              label="Ordering clinician"
              helpText="Placed by the desk on behalf of this clinician. Clinicians with an expired licence cannot be attributed."
              error={
                blocker?.kind === 'prescriber-ineligible'
                  ? `${blocker.prescriber.name} has an expired licence — choose another clinician.`
                  : undefined
              }
              onValueChange={(value) =>
                onUpdate({
                  cart: { ...patient.cart, attributedPrescriberId: value },
                })
              }
              options={prescribers.map((prescriber) => ({
                value: prescriber.userId,
                label:
                  prescriber.licence === 'verified'
                    ? `${prescriber.name} · ${prescriber.specialty ?? 'Clinician'}`
                    : `${prescriber.name} · licence expired`,
                disabled: !eligible.some((p) => p.userId === prescriber.userId),
              }))}
              placeholder="Choose the ordering clinician"
              value={patient.cart.attributedPrescriberId ?? ''}
            />
          </div>
        )
      ) : null}

      {compositionBlockers.length > 0 ? (
        <Alert tone="warning">
          <AlertTitle>
            {compositionBlockers.length === 1
              ? 'Resolve 1 order blocker'
              : `Resolve ${compositionBlockers.length} order blockers`}
          </AlertTitle>
          <AlertDescription>
            <ul className={styles.blockerList}>
              {compositionBlockers.map((item) => (
                <li key={`${item.kind}-${'itemName' in item ? item.itemName : 'currency'}`}>
                  {orderBlockerMessage(item)}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      {consentLines.length > 0 ? (
        <div className={styles.consentPanel}>
          <h3 className={styles.subTitle}>Consent</h3>
          <ul className={styles.consentList}>
            {consentLines.map((item) => {
              const requirement = consentRequirement(item, ORDER_CATALOG);
              const state = item.consent?.state ?? 'needed';
              return (
                <li className={styles.consentRow} key={item.id}>
                  <div className={styles.lineTextWide}>
                    <span className={styles.lineName}>{item.name}</span>
                    <span className={styles.lineMeta}>
                      {requirement === 'imaging'
                        ? 'Imaging consent before the scan'
                        : 'Sensitive test — explicit consent required'}
                      {item.consent?.state === 'verbal'
                        ? ` · Verbal · ${item.consent.byLabel} · ${item.consent.atLabel}`
                        : null}
                      {item.pregnancyScreen?.overrideBy
                        ? ` · Clinician override · ${item.pregnancyScreen.overrideBy}`
                        : null}
                    </span>
                  </div>
                  {state === 'needed' ? (
                    <>
                      <Badge variant="warning">Consent needed</Badge>
                      <Button
                        onClick={() => patchConsent(item.id, { state: 'sent', atLabel: 'just now' })}
                        size="sm"
                        variant="secondary"
                      >
                        Send sign-off
                      </Button>
                      <Button onClick={() => setVerbalForId(item.id)} size="sm" variant="outline">
                        Verbal consent
                      </Button>
                    </>
                  ) : null}
                  {state === 'sent' ? (
                    <>
                      <Badge variant="info">Sent · awaiting signature</Badge>
                      {/* Demo stand-in for the patient signing on their phone. */}
                      <Button
                        onClick={() => patchConsent(item.id, { state: 'signed', atLabel: 'just now' })}
                        size="sm"
                        variant="outline"
                      >
                        Simulate patient signature
                      </Button>
                      <Button onClick={() => setVerbalForId(item.id)} size="sm" variant="ghost">
                        Verbal consent
                      </Button>
                    </>
                  ) : null}
                  {state === 'signed' ? <Badge variant="success">Signed on phone</Badge> : null}
                  {state === 'verbal' ? <Badge variant="success">Verbal · recorded</Badge> : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <PregnancyGateDialog
        entry={pregnancyGateEntry}
        onCancel={() => setPregnancyGateEntry(null)}
        onProceed={(screen) => {
          if (pregnancyGateEntry) addEntry(pregnancyGateEntry, screen);
          setPregnancyGateEntry(null);
        }}
      />
      <VerbalConsentDialog
        item={verbalFor}
        requirement={verbalFor ? consentRequirement(verbalFor, ORDER_CATALOG) : null}
        onCancel={() => setVerbalForId(null)}
        onRecord={(consent) => {
          if (verbalFor) patchConsent(verbalFor.id, consent);
          setVerbalForId(null);
        }}
      />
      <Collapsible className={styles.otherOrders}>
        <CollapsibleTrigger className={styles.otherOrdersTrigger}>
          <span className={styles.otherOrdersTitle}>
            Other orders
            <Badge size="sm">{OTHER_ORDER_ENTRIES.length}</Badge>
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className={styles.otherOrderList}>
            {OTHER_ORDER_ENTRIES.map((entry) => (
              <li className={styles.otherOrderRow} key={entry.id}>
                <Checkbox
                  aria-label={entry.name}
                  checked={inCart.has(entry.id)}
                  onCheckedChange={(checked) => setEntrySelected(entry, checked)}
                >
                  <span className={styles.lineTextWide}>
                    <span className={styles.lineName}>{entry.name}</span>
                    <span className={styles.lineMeta}>
                      {entry.category}
                      {entry.fasting ? ' · Fasting' : ''}
                    </span>
                  </span>
                </Checkbox>
                <MoneyText
                  className={styles.otherOrderPrice}
                  currency={entry.currencyCode}
                  minor={entry.priceMinor}
                />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <LabTestPicker
        categories={ORDER_PICKER_CATEGORIES}
        onSelectedTestIdsChange={(_selectedIds, change) => {
          const entry = orderEntryForPickerTest(change.test.testCatalogId);
          if (!entry) return;
          setEntrySelected(entry, change.checked);
        }}
        selectedTestIds={ORDER_PICKER_TESTS.flatMap((test) => {
          const entry = orderEntryForPickerTest(test.testCatalogId);
          return entry && inCart.has(entry.id) ? [test.testCatalogId] : [];
        })}
        tests={ORDER_PICKER_TESTS}
        totalCount={67}
      />
    </section>
  );
}

// ── Step 5 · Pre-consult (intake review + teleconsult) ─────

/** Demo day labels, indexed by offset from today. Deterministic fixtures. */
const TELE_DAYS = ['Today', 'Tomorrow', 'Wed 23 Jul', 'Thu 24 Jul'];
const TELE_TIMES = ['09:30', '11:00', '14:00', '16:00'];

function StepPreConsult({
  onUpdate,
  patient,
}: {
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
}) {
  const sections = intakeSections(
    patient.intake,
    patient.visitReason,
    patient.cart.items,
    patient.sexAtBirth,
  );
  const filled = sections.filter((section) => section.filled).length;
  const teleInCart = patient.cart.items.some((item) => item.kind === 'telecon');
  const verifiedChannel = patient.otpVerified || patient.telegramVerified;
  const [fillingKey, setFillingKey] = useState<keyof IntakeFields | null>(null);
  const [fillDraft, setFillDraft] = useState('');

  const tatHours = maxTatHours(patient.cart.items, ORDER_CATALOG);
  const tatOffset = tatDayOffset(tatHours);
  const autoSpecialty = teleconsultSpecialtyFor(patient.cart.items);
  const [dayIndex, setDayIndex] = useState(Math.min(tatOffset, TELE_DAYS.length - 1));
  const [pendingEarlySlot, setPendingEarlySlot] = useState<string | null>(null);
  const beforeTat = dayIndex < tatOffset;

  function bookSlot(time: string, early: boolean) {
    onUpdate({
      teleconsult: {
        status: 'booked',
        slot: `${TELE_DAYS[dayIndex]} · ${time}`,
        specialty: patient.teleconsult.specialty ?? autoSpecialty,
        earlyOverride: early || undefined,
      },
    });
    setPendingEarlySlot(null);
  }

  function stampIntake(key: keyof IntakeFields, value: string) {
    onUpdate({
      intake: { ...patient.intake, [key]: value },
      intakeAuthors: { ...patient.intakeAuthors, [key]: 'nurse' },
    });
  }

  return (
    <section aria-label="Pre-consult" className={styles.step}>
      <h2 className={styles.stepTitle}>Intake review</h2>
      <p className={styles.hint}>
        {filled}/{sections.length} sections complete. The intake never blocks check-in — the
        patient may finish it on their phone.
      </p>

      {patient.intakeSentAtLabel ? (
        <Alert tone="info">
          <AlertTitle>Intake link sent · {patient.intakeSentAtLabel}</AlertTitle>
          <AlertDescription>
            The patient completes it on their phone; answers land here as they arrive.
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => onUpdate({ intakeSentAtLabel: 'just now' })}
              size="sm"
              variant="outline"
            >
              Resend link
            </Button>
          </AlertAction>
        </Alert>
      ) : (
        <div className={styles.intakeSendRow}>
          <Button
            disabled={!verifiedChannel}
            onClick={() => onUpdate({ intakeSentAtLabel: 'just now' })}
            size="sm"
            variant="secondary"
            title={
              verifiedChannel
                ? undefined
                : 'Verify the patient phone or Telegram first — the link needs a channel.'
            }
          >
            Send intake link
          </Button>
          {!verifiedChannel ? (
            <span className={styles.hint}>Needs a verified channel (Step 2).</span>
          ) : null}
        </div>
      )}

      <ul className={styles.intakeList}>
        {sections.map((section) => {
          const author = patient.intakeAuthors?.[section.key as keyof IntakeFields];
          return (
            <li className={styles.intakeRow} key={section.key}>
              <div className={styles.lineTextWide}>
                <span className={styles.lineName}>{section.label}</span>
                {section.preview ? (
                  <span className={styles.lineMeta}>{section.preview}</span>
                ) : null}
              </div>
              {author ? (
                <Badge size="sm" variant="neutral">
                  {author === 'nurse' ? 'Desk' : author === 'patient' ? 'Patient' : 'Auto'}
                </Badge>
              ) : null}
              <Badge variant={section.filled ? 'success' : 'neutral'}>
                {section.filled ? 'Complete' : 'Pending'}
              </Badge>
              {!section.filled ? (
                <Button
                  onClick={() => {
                    setFillingKey(section.key as keyof IntakeFields);
                    setFillDraft('');
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Fill on behalf
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>

      {fillingKey ? (
        <div className={styles.intakeFill}>
          <Input
            aria-label="Intake answer"
            onChange={(event) => setFillDraft(event.target.value)}
            placeholder="What the patient tells the desk"
            value={fillDraft}
          />
          <Button
            disabled={fillDraft.trim() === ''}
            onClick={() => {
              stampIntake(fillingKey, fillDraft.trim());
              setFillingKey(null);
            }}
            size="sm"
            variant="secondary"
          >
            Save · recorded by desk
          </Button>
          <Button onClick={() => setFillingKey(null)} size="sm" variant="ghost">
            Cancel
          </Button>
        </div>
      ) : null}

      {teleInCart || patient.teleconsult.status === 'waived' ? (
        <div className={styles.channel}>
          <h3 className={styles.subTitle}>Teleconsultation</h3>
          {patient.teleconsult.status === 'booked' ? (
            <Alert tone="success">
              <AlertTitle>
                Booked · {patient.teleconsult.slot} · {patient.teleconsult.specialty}
                {patient.teleconsult.earlyOverride ? ' · before results' : ''}
              </AlertTitle>
              <AlertAction>
                <Button
                  onClick={() => onUpdate({ teleconsult: { status: 'notBooked' } })}
                  size="sm"
                  variant="ghost"
                >
                  Remove booking
                </Button>
              </AlertAction>
            </Alert>
          ) : patient.teleconsult.status === 'waived' ? (
            <Alert tone="neutral">
              <AlertTitle>Skipped — results go out without a consult</AlertTitle>
            </Alert>
          ) : (
            <>
              <p className={styles.hint}>
                {tatHours > 0
                  ? `Estimated results in ~${tatHours}h — the first post-result day is preselected.`
                  : 'No TAT-bound tests in cart — book any slot.'}
              </p>
              <div className={styles.slotRow} role="group" aria-label="Consult day">
                {TELE_DAYS.map((day, index) => (
                  <Button
                    key={day}
                    aria-pressed={index === dayIndex}
                    onClick={() => {
                      setDayIndex(index);
                      setPendingEarlySlot(null);
                    }}
                    size="sm"
                    variant={index === dayIndex ? 'secondary' : 'ghost'}
                  >
                    {day}
                    {index < tatOffset ? ' ·⚠' : ''}
                  </Button>
                ))}
              </div>
              {beforeTat ? (
                <p className={styles.hint}>Results may not be ready on this day.</p>
              ) : null}
              <div className={styles.slotRow}>
                {TELE_TIMES.map((time) => (
                  <Button
                    key={time}
                    onClick={() => (beforeTat ? setPendingEarlySlot(time) : bookSlot(time, false))}
                    size="sm"
                    variant="outline"
                  >
                    {time}
                  </Button>
                ))}
                <Button
                  onClick={() => {
                    onUpdate({
                      teleconsult: { status: 'waived' },
                      cart: {
                        ...patient.cart,
                        items: patient.cart.items.filter((item) => item.kind !== 'telecon'),
                      },
                    });
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Skip consult
                </Button>
              </div>
              {pendingEarlySlot ? (
                <Alert tone="warning">
                  <AlertTitle>Results may not be ready for this slot</AlertTitle>
                  <AlertDescription>
                    Booking {TELE_DAYS[dayIndex]} · {pendingEarlySlot} lands before the estimated
                    turnaround. The consult may happen without results.
                  </AlertDescription>
                  <AlertAction>
                    <Button
                      onClick={() => setPendingEarlySlot(null)}
                      size="sm"
                      variant="outline"
                    >
                      Pick another slot
                    </Button>
                    <Button
                      onClick={() => bookSlot(pendingEarlySlot, true)}
                      size="sm"
                      variant="primary"
                    >
                      Book anyway
                    </Button>
                  </AlertAction>
                </Alert>
              ) : null}
              <p className={styles.hint}>
                Specialty {patient.teleconsult.specialty ?? autoSpecialty} · matched from the
                ordered tests. Slots follow estimated result availability; the patient is notified
                if the lab is delayed.
              </p>
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}

// ── Step 6 · Payment ───────────────────────────────────────

function StepPayment({
  fxRate,
  onUpdate,
  patient,
  prescribers,
}: {
  fxRate?: FxRateQuote;
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
  prescribers: Prescriber[];
}) {
  const totals = cartTotals(patient.cart);
  const dueMinor = paymentDueAmountMinor(patient.cart, totals);
  const payment = patient.cart.payment;
  const [tendered, setTendered] = useState('');
  const [splitCash, setSplitCash] = useState('');
  const splitCashMinor = parseUsdMajor(splitCash);
  const noCharge = patient.cart.items.length > 0 && dueMinor === '0';
  const attribution = attributionBlocker(patient.cart, prescribers);
  const staleQuote = patient.cart.pricing?.state === 'stale';
  const composition = orderBlockers(patient.cart, ORDER_CATALOG);
  const unresolvedConsent = consentBlockers(patient.cart, ORDER_CATALOG);
  const claimPolicy = patient.insurance.find(
    (policy) => policy.eligibility?.kind === 'eligible',
  );
  const placementBlocked =
    attribution !== null || staleQuote || composition.length > 0 || unresolvedConsent.length > 0;

  function setPayment(next: typeof payment) {
    onUpdate({ cart: { ...patient.cart, payment: next } });
  }

  if (payment.status === 'confirmed') {
    return (
      <section aria-label="Payment" className={styles.step}>
        <h2 className={styles.stepTitle}>Payment</h2>
        <Alert tone="success">
          <AlertTitle>Paid · {payment.receiptId}</AlertTitle>
          <AlertDescription>
            <MoneyText currency="USD" minor={payment.amountMinor} /> ·{' '}
            {payment.method === 'cash'
              ? (
                  <>
                    cash — change{' '}
                    <MoneyText currency="USD" minor={payment.changeMinor} />
                  </>
                )
              : payment.method === 'khqr'
                ? 'KHQR (Bakong)'
                : 'cash + KHQR'}{' '}
            · {payment.confirmedAt} · {payment.cashier}
          </AlertDescription>
        </Alert>
        <PaymentReceipt
          branchLabel={`Branch ${DEMO_BRANCH_ID.toUpperCase()}`}
          items={patient.cart.items}
          onPrint={() => {}}
          patientName={patient.name || 'Walk-in patient'}
          payment={payment}
        />
        <p className={styles.hint}>
          The amount is derived by the server from the priced order, never entered by the desk.
        </p>
      </section>
    );
  }

  if (payment.status === 'no-charge') {
    return (
      <section aria-label="Payment" className={styles.step}>
        <h2 className={styles.stepTitle}>Payment</h2>
        <Alert tone="success">
          <AlertTitle>No payment required</AlertTitle>
          <AlertDescription>
            The server-priced order has a zero balance. No cash capture or
            payment receipt was created.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  const tenderedMinor = parseUsdMajor(tendered);
  const cashOk =
    tenderedMinor !== null &&
    dueMinor !== '0' &&
    compareMinor(tenderedMinor, dueMinor) >= 0;
  const khrMinor = fxRate ? convertUsdMinorToKhr(dueMinor, fxRate) : null;

  return (
    <section aria-label="Payment" className={styles.step}>
      <h2 className={styles.stepTitle}>Payment</h2>

      {placementBlocked ? (
        <Alert tone="warning">
          <AlertTitle>Resolve blockers before collecting payment</AlertTitle>
          <AlertDescription>
            {attribution?.kind === 'no-eligible-prescriber'
              ? 'No licensed clinician can be attributed to this order.'
              : attribution
                ? 'Choose the ordering clinician on the Orders step.'
                : staleQuote
                  ? 'Prices changed since this quote — accept the new total in the order cart first.'
                  : composition.length > 0
                    ? orderBlockerMessage(composition[0])
                    : unresolvedConsent.length > 0
                      ? `${unresolvedConsent[0].name} still needs consent — resolve it on the Orders step.`
                      : ''}
          </AlertDescription>
        </Alert>
      ) : null}
      <p className={styles.due}>
        Patient due{' '}
        <MoneyText as="strong" currency="USD" minor={dueMinor} />
        {khrMinor ? (
          <MoneyText className={styles.khr} currency="KHR" minor={khrMinor} />
        ) : null}
      </p>

      {noCharge ? (
        <Alert tone="neutral">
          <AlertTitle>Nothing to collect</AlertTitle>
          <AlertDescription>
            The server-priced order has a zero balance.
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() =>
                setPayment(
                  {
                    ...payment,
                    status: 'no-charge',
                    method: null,
                    amountMinor: '0',
                    changeMinor: '0',
                  },
                )
              }
              size="sm"
              variant="primary"
            >
              Continue without payment
            </Button>
          </AlertAction>
        </Alert>
      ) : payment.status === 'waiting' ? (
        <KhqrPanel
          amountKhrMinor={khrMinor}
          amountUsdMinor={dueMinor}
          onCancel={() => setPayment({ ...payment, status: 'idle', method: null, khqrState: undefined })}
          onConfirm={() =>
            setPayment(
              confirmedPayment(payment, 'khqr', dueMinor, {
                receiptId: DEMO_RECEIPT_ID,
                confirmedAt: DEMO_CONFIRMED_AT,
                cashier: DEMO_CASHIER,
              }),
            )
          }
          onStateChange={(khqrState) => setPayment({ ...payment, khqrState })}
          state={payment.khqrState ?? 'waiting'}
        />
      ) : payment.status === 'split-cash' ? (
        <>
          <Alert tone="success">
            <AlertTitle>
              Cash collected ·{' '}
              <MoneyText currency="USD" minor={payment.cashPortionMinor ?? '0'} />
            </AlertTitle>
            <AlertDescription>
              KHQR covers the remainder. The split completes only when Bakong confirms.
            </AlertDescription>
          </Alert>
          <KhqrPanel
            amountKhrMinor={
              fxRate
                ? convertUsdMinorToKhr(
                    splitRemainderMinor(dueMinor, payment.cashPortionMinor ?? '0'),
                    fxRate,
                  )
                : null
            }
            amountUsdMinor={splitRemainderMinor(dueMinor, payment.cashPortionMinor ?? '0')}
            onCancel={() =>
              setPayment({
                ...payment,
                status: 'idle',
                method: null,
                cashPortionMinor: undefined,
                khqrState: undefined,
              })
            }
            onConfirm={() =>
              setPayment(
                confirmedPayment(payment, 'split', dueMinor, {
                  receiptId: DEMO_RECEIPT_ID,
                  confirmedAt: DEMO_CONFIRMED_AT,
                  cashier: DEMO_CASHIER,
                }),
              )
            }
            onStateChange={(khqrState) => setPayment({ ...payment, khqrState })}
            state={payment.khqrState ?? 'waiting'}
          />
        </>
      ) : (
        <>
          <div className={styles.payGrid}>
            <Card as="section" size="sm">
              <CardHeader>
                <CardTitle>Cash</CardTitle>
              </CardHeader>
              <CardContent className={styles.payBody}>
                <Input
                  inputMode="decimal"
                  label="Tendered (USD)"
                  onChange={(event) => setTendered(event.target.value)}
                  placeholder="0.00"
                  value={tendered}
                />
                {cashOk ? (
                  <p className={styles.hint}>
                    Change{' '}
                    <MoneyText
                      currency="USD"
                      minor={subtractMinorFloor(tenderedMinor, dueMinor)}
                    />
                  </p>
                ) : null}
                <Button
                  className={styles.inlineAction}
                  disabled={!cashOk || placementBlocked}
                  onClick={() =>
                    setPayment(
                      confirmedPayment(payment, 'cash', dueMinor, {
                        receiptId: DEMO_RECEIPT_ID,
                        confirmedAt: DEMO_CONFIRMED_AT,
                        cashier: DEMO_CASHIER,
                        tenderedMinor: tenderedMinor ?? '0',
                      }),
                    )
                  }
                  variant="primary"
                >
                  Confirm cash
                </Button>
              </CardContent>
            </Card>
            <Card as="section" size="sm">
              <CardHeader>
                <CardTitle>KHQR (Bakong)</CardTitle>
              </CardHeader>
              <CardContent className={styles.payBody}>
                <p className={styles.hint}>
                  {khrMinor ? (
                    <>
                      Generates a QR for{' '}
                      <MoneyText currency="KHR" minor={khrMinor} />.
                    </>
                  ) : (
                    'KHR is unavailable until the live FX rate loads.'
                  )}
                </p>
                <Button
                  className={styles.inlineAction}
                  disabled={dueMinor === '0' || !khrMinor || placementBlocked}
                  onClick={() => setPayment({ ...payment, status: 'waiting', method: 'khqr' })}
                  variant="secondary"
                >
                  Generate QR
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card as="section" size="sm">
            <CardHeader>
              <CardTitle>Cash + KHQR split</CardTitle>
            </CardHeader>
            <CardContent className={styles.payBody}>
              <p className={styles.hint}>
                Collect part in cash first; a KHQR intent covers the remainder. The split
                completes only when Bakong confirms.
              </p>
              <div className={styles.phoneRow}>
                <Input
                  inputMode="decimal"
                  label="Cash portion (USD)"
                  onChange={(event) => setSplitCash(event.target.value)}
                  placeholder="0.00"
                  value={splitCash}
                />
                <Button
                  disabled={
                    placementBlocked ||
                    splitCashMinor === null ||
                    !splitCashPortionValid(splitCashMinor, dueMinor)
                  }
                  onClick={() =>
                    setPayment({
                      ...payment,
                      status: 'split-cash',
                      method: 'split',
                      cashPortionMinor: splitCashMinor ?? '0',
                      khqrState: 'waiting',
                    })
                  }
                  variant="secondary"
                >
                  Collect cash · show QR
                </Button>
              </div>
              {splitCashMinor !== null && splitCashPortionValid(splitCashMinor, dueMinor) ? (
                <p className={styles.hint}>
                  KHQR remainder{' '}
                  <MoneyText
                    currency="USD"
                    minor={splitRemainderMinor(dueMinor, splitCashMinor)}
                  />
                </p>
              ) : null}
            </CardContent>
          </Card>
          <div className={styles.payFooter}>
            {claimPolicy ? (
              <Button
                onClick={() => setPayment({ ...payment, status: 'pending-claim', method: null })}
                variant="ghost"
              >
                Route to insurer claim
              </Button>
            ) : null}
            <Button
              onClick={() => setPayment({ ...payment, status: 'deferred', method: null })}
              variant="ghost"
            >
              Pay later
            </Button>
          </div>
        </>
      )}

      {payment.status === 'pending-claim' ? (
        <Alert tone="warning">
          <AlertTitle>Insurance claim pending{claimPolicy ? ` · ${claimPolicy.provider}` : ''}</AlertTitle>
          <AlertDescription>
            The balance routes to the insurer; collect only the copay at the desk. PROTOTYPE:
            the platform captures cash only — no claim is actually filed.
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => setPayment({ ...payment, status: 'idle' })}
              size="sm"
              variant="ghost"
            >
              Undo
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {payment.status === 'deferred' ? (
        <Alert tone="warning">
          <AlertTitle>Pay later</AlertTitle>
          <AlertDescription>
            The balance stays open on the visit. Check-in can proceed.
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => setPayment({ ...payment, status: 'idle' })}
              size="sm"
              variant="ghost"
            >
              Undo
            </Button>
          </AlertAction>
        </Alert>
      ) : null}
    </section>
  );
}

// ── Paid-edit dialog ───────────────────────────────────────

function PaidEditDialog({
  onCancel,
  onResolve,
  open,
  receiptId,
}: {
  onCancel: () => void;
  onResolve: (mode: 'void' | 'supplemental') => void;
  open: boolean;
  receiptId: string | null;
}) {
  const [voidPin, setVoidPin] = useState('');
  return (
    <AlertDialog onOpenChange={(next) => (!next ? onCancel() : undefined)} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This order is already paid</AlertDialogTitle>
          <AlertDialogDescription>
            Receipt {receiptId} covers the current items. Changing the order needs one of two
            paths — receipts are never silently rewritten. Voiding takes a supervisor PIN and is
            logged.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          aria-label="Supervisor PIN for void"
          inputMode="numeric"
          onChange={(event) => setVoidPin(event.target.value)}
          placeholder="Supervisor PIN — required to void"
          type="password"
          value={voidPin}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!collisionOverridePinValid(voidPin)}
            onClick={() => onResolve('void')}
            variant="destructive"
          >
            Void &amp; recollect
          </AlertDialogAction>
          <AlertDialogAction onClick={() => onResolve('supplemental')} variant="primary">
            Collect difference
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ── Consent dialogs (imaging pregnancy gate + verbal consent) ──
//
// PROTOTYPE SURFACES: no consent engine exists upstream. Both dialogs model
// the safety contract — pregnancy is asked before imaging is ordered, and a
// verbal consent is a named, witnessed, logged record, never a checkbox.

function PregnancyGateDialog({
  entry,
  onCancel,
  onProceed,
}: {
  entry: CatalogEntry | null;
  onCancel: () => void;
  onProceed: (screen: NonNullable<CartItem['pregnancyScreen']>) => void;
}) {
  return (
    <AlertDialog onOpenChange={(next) => (!next ? onCancel() : undefined)} open={entry !== null}>
      <AlertDialogContent>
        {entry ? (
          <PregnancyGateBody entry={entry} key={entry.id} onCancel={onCancel} onProceed={onProceed} />
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PregnancyGateBody({
  entry,
  onCancel,
  onProceed,
}: {
  entry: CatalogEntry;
  onCancel: () => void;
  onProceed: (screen: NonNullable<CartItem['pregnancyScreen']>) => void;
}) {
  const [answer, setAnswer] = useState<'possibly' | 'declined' | null>(null);
  const [overrideBy, setOverrideBy] = useState('');

  if (answer === null) {
    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>Pregnancy check — {entry.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Could the patient be pregnant? Imaging during early pregnancy may pose risk to the
            fetus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel order</AlertDialogCancel>
          {/* Plain buttons: choosing an answer stages the override, it must
              not dismiss the dialog the way an AlertDialogAction does. */}
          <Button onClick={() => setAnswer('declined')} variant="outline">
            Declined to answer
          </Button>
          <Button onClick={() => setAnswer('possibly')} variant="outline">
            Possibly pregnant
          </Button>
          <AlertDialogAction
            onClick={() => onProceed({ answer: 'not-pregnant' })}
            variant="primary"
          >
            Not pregnant — add order
          </AlertDialogAction>
        </AlertDialogFooter>
      </>
    );
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Clinician override required</AlertDialogTitle>
        <AlertDialogDescription>
          Consider postponing, shielding, or non-ionising imaging. To proceed, the ordering
          clinician signs this override — it is recorded against this visit only.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Input
        aria-label="Clinician override · sign-off name"
        onChange={(event) => setOverrideBy(event.target.value)}
        placeholder="Dr. …"
        value={overrideBy}
      />
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel order</AlertDialogCancel>
        <AlertDialogAction
          disabled={overrideBy.trim() === ''}
          onClick={() => onProceed({ answer, overrideBy: overrideBy.trim() })}
          variant="primary"
        >
          Record &amp; add
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

function VerbalConsentDialog({
  item,
  onCancel,
  onRecord,
  requirement,
}: {
  item: CartItem | null;
  onCancel: () => void;
  onRecord: (consent: LineConsent) => void;
  requirement: ConsentRequirement | null;
}) {
  return (
    <AlertDialog onOpenChange={(next) => (!next ? onCancel() : undefined)} open={item !== null}>
      <AlertDialogContent>
        {item && requirement ? (
          <VerbalConsentBody
            item={item}
            key={item.id}
            onCancel={onCancel}
            onRecord={onRecord}
            requirement={requirement}
          />
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}

function VerbalConsentBody({
  item,
  onCancel,
  onRecord,
  requirement,
}: {
  item: CartItem;
  onCancel: () => void;
  onRecord: (consent: LineConsent) => void;
  requirement: ConsentRequirement;
}) {
  const [recordedBy, setRecordedBy] = useState('');
  const [witnessPin, setWitnessPin] = useState('');
  const valid = verbalConsentValid({ requirement, recordedBy, witnessPin });

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Verbal consent — {item.name}</AlertDialogTitle>
        <AlertDialogDescription>
          Use only when the patient has no phone or refuses the digital consent flow. Recorded
          with time and staff name
          {requirement === 'sensitive' ? '; sensitive tests also need a supervisor witness' : ''}
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className={styles.verbalFields}>
        <Input
          aria-label="Recorded by"
          onChange={(event) => setRecordedBy(event.target.value)}
          placeholder="Recorded by (staff name)"
          value={recordedBy}
        />
        {requirement === 'sensitive' ? (
          <Input
            aria-label="Supervisor witness PIN"
            inputMode="numeric"
            onChange={(event) => setWitnessPin(event.target.value)}
            placeholder="Supervisor witness PIN"
            type="password"
            value={witnessPin}
          />
        ) : null}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={!valid}
          onClick={() =>
            onRecord({
              state: 'verbal',
              byLabel: recordedBy.trim(),
              atLabel: 'just now',
              witnessed: requirement === 'sensitive' ? true : undefined,
            })
          }
          variant="primary"
        >
          Record consent
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

// ── KHQR intent panel ──────────────────────────────────────

/**
 * One KHQR intent: waiting (countdown + webhook), expired (regenerate),
 * cancelled. Manual "Mark received" is a fallback that must be confirmed —
 * client-side success is never sufficient, only a sighted Bakong receipt.
 * PROTOTYPE: the webhook is a demo button; no provider integration exists.
 */
function KhqrPanel({
  amountKhrMinor,
  amountUsdMinor,
  onCancel,
  onConfirm,
  onStateChange,
  state,
}: {
  amountKhrMinor: string | null;
  amountUsdMinor: string;
  onCancel: () => void;
  onConfirm: () => void;
  onStateChange: (state: 'waiting' | 'expired' | 'cancelled') => void;
  state: 'waiting' | 'expired' | 'cancelled';
}) {
  const [manualAsked, setManualAsked] = useState(false);

  if (state === 'expired') {
    return (
      <Alert tone="warning">
        <AlertTitle>QR expired</AlertTitle>
        <AlertDescription>
          The KHQR intent lapsed before payment. Generate a new QR to retry — an expired intent
          is never collectable.
        </AlertDescription>
        <AlertAction>
          <Button onClick={() => onStateChange('waiting')} size="sm" variant="primary">
            Regenerate QR
          </Button>
          <Button onClick={onCancel} size="sm" variant="ghost">
            Back to methods
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  if (state === 'cancelled') {
    return (
      <Alert tone="neutral">
        <AlertTitle>QR cancelled</AlertTitle>
        <AlertAction>
          <Button onClick={() => onStateChange('waiting')} size="sm" variant="outline">
            Generate new QR
          </Button>
          <Button onClick={onCancel} size="sm" variant="ghost">
            Back to methods
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  return (
    <>
      <Alert tone="info">
        <AlertTitle>
          KHQR waiting for Bakong ·{' '}
          <MoneyText currency="USD" minor={amountUsdMinor} />
          {amountKhrMinor ? (
            <>
              {' '}
              (<MoneyText currency="KHR" minor={amountKhrMinor} />)
            </>
          ) : null}
        </AlertTitle>
        <AlertDescription>
          The QR is on the patient display. Confirmation arrives from the Bakong webhook; the
          intent expires after 10 minutes.
        </AlertDescription>
        <AlertAction>
          <Button onClick={onConfirm} size="sm" variant="primary">
            Simulate webhook confirm
          </Button>
          <Button onClick={() => setManualAsked(true)} size="sm" variant="outline">
            Mark received
          </Button>
          <Button onClick={() => onStateChange('expired')} size="sm" variant="ghost">
            Simulate expiry
          </Button>
          <Button onClick={() => onStateChange('cancelled')} size="sm" variant="ghost">
            Cancel QR
          </Button>
        </AlertAction>
      </Alert>
      <AlertDialog
        onOpenChange={(next) => (!next ? setManualAsked(false) : undefined)}
        open={manualAsked}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm manual receipt of{' '}
              <MoneyText currency="USD" minor={amountUsdMinor} />?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Manual fallback only — confirm after seeing the Bakong receipt on the patient&apos;s
              banking app. A client-side success screen is not enough.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setManualAsked(false)}>Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setManualAsked(false);
                onConfirm();
              }}
              variant="primary"
            >
              Yes, mark received
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
