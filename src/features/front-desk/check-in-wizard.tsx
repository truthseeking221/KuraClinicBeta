'use client';

import { useEffect, useRef, useState } from 'react';
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
  AlertIcon,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckIcon,
  ChevronRightIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DateInput,
  Input,
  Kbd,
  LockKeyIcon,
  MoneyText,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import { SubjectHeader } from '../../components/shared/subject-header';
import { useT } from '../../components/foundations/i18n';

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
  findDemoPromo,
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
  checkInStatus,
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
  promoLines,
  intakeStatus,
  resolvedRecordPatch,
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
import { INTAKE_SKIP_REASONS } from './types';
import type {
  BookingSummary,
  CartItem,
  CollisionCandidate,
  FrontDeskPatient,
  InsurancePolicy,
  IntakeFields,
  IntakeSkipReasonCode,
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
  1: 'Select a patient or create a new record to continue.',
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
  /** Server pricing availability — the rail blocks collection while not ready. */
  pricingStatus?: 'ready' | 'loading' | 'error';
  onRetryPricing?: () => void;
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
  pricingStatus = 'ready',
  onRetryPricing,
}: CheckInWizardProps) {
  const t = useT();
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

  // The contextual dock exists only on mobile. Keeping it out of the desktop
  // tree prevents duplicate payment and completion announcements.
  const [mobileViewport, setMobileViewport] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 599px)');
    const sync = () => setMobileViewport(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Reception runs hands-on-keyboard: F1–F6 jump steps, ? opens the map.
  // Suppressed while typing or while any dialog is open. The listener binds
  // once; the ref keeps the handler reading current step/gate state.
  const goToRef = useRef(goTo);
  useEffect(() => {
    goToRef.current = goTo;
  });
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
        goToRef.current(Number(match[1]) as StepId);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /**
   * The order rail earns its place only once orders exist: steps 1–3 stay
   * single-anchor (identity, review, insurance). A non-empty cart keeps the
   * rail visible when navigating back so paid context is never hidden.
   */
  const showCartRail = step >= 4 || patient.cart.items.length > 0;
  const mobileDockAvailable =
    mobileViewport && (patient.cart.items.length > 0 || gate.step3Done);
  const headerStatus = checkInStatus(patient, gate);

  return (
    <div className={styles.wizard} data-slot="check-in-wizard" data-step={step}>
      <SubjectHeader
        status={headerStatus ? { ...headerStatus, label: t(headerStatus.label) } : undefined}
        subject={{
          name: patient.name,
          nameKhmer: patient.nameKhmer || undefined,
          reference: `Q-${String(patient.queueNumber).padStart(3, '0')}`,
          dob: patient.dob || undefined,
          sexAtBirth: patient.sexAtBirth || undefined,
          arrivedLabel: patient.arrivedLabel
            ? `${t('Arrived')} ${patient.arrivedLabel}`
            : undefined,
          meta: patient.boundBookingCode
            ? [`${t('Booking')} ${patient.boundBookingCode}`]
            : undefined,
        }}
      />
      <Stepper className={styles.stepper} onValueChange={(value) => goTo(value as StepId)} value={step}>
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
                <StepperTitle>{t(def.title)}</StepperTitle>
              </StepperTrigger>
              {index < STEP_DEFS.length - 1 ? <StepperSeparator /> : null}
            </StepperItem>
          ))}
        </StepperNav>
      </Stepper>

      <div
        className={styles.workspace}
        data-cart-rail={showCartRail ? 'visible' : 'hidden'}
        data-slot="check-in-workspace"
        data-step={step}
      >
        <div className={styles.stepPanel} data-slot="check-in-step-panel">
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
              pricingStatus={pricingStatus}
            />
          ) : null}

          <ContinueFooter
            collisionsBlock={(step === 1 || step === 2) && collisions.length > 0}
            gate={gate}
            mobileDockAvailable={mobileDockAvailable}
            onBack={() => setStep((step - 1) as StepId)}
            onContinue={() => setStep((step + 1) as StepId)}
            onFinish={onCheckIn}
            step={step}
          />
        </div>

        {showCartRail ? (
          <CartRail
            fxRate={fxRate}
            pricingStatus={pricingStatus}
            onRetryPricing={onRetryPricing}
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

      {mobileDockAvailable ? (
        <MobileDock
          gate={gate}
          onFinish={onCheckIn}
          onResume={() => setStep(inferStep(gate))}
          patient={patient}
        />
      ) : null}

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
            <AlertDialogTitle>{t('Keyboard shortcuts')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                'Reception runs hands-on-keyboard. Locked steps stay locked — a shortcut never bypasses the gate.',
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <dl className={styles.shortcutList}>
            <div>
              <dt>
                <Kbd>F1</Kbd>–<Kbd>F6</Kbd>
              </dt>
              <dd>{t('Jump to a wizard step')}</dd>
            </div>
            <div>
              <dt>
                <Kbd>?</Kbd>
              </dt>
              <dd>{t('Open this list')}</dd>
            </div>
          </dl>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCheatsheetOpen(false)}>
              {t('Close')}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Mobile dock ────────────────────────────────────────────

/**
 * Sticky mobile action bar from order selection onward. Before then the step
 * itself owns the only available action. The CTA always resumes at the first
 * not-done step — the same landing rule as a reopened patient, never a gate
 * bypass.
 */
function MobileDock({
  gate,
  onFinish,
  onResume,
  patient,
}: {
  gate: ReturnType<typeof wizardGate>;
  onFinish: () => void;
  onResume: () => void;
  patient: FrontDeskPatient;
}) {
  const t = useT();
  const totals = cartTotals(patient.cart);
  const dueMinor = paymentDueAmountMinor(patient.cart, totals);
  const payment = patient.cart.payment;
  const waiting = payment.status === 'waiting' || payment.status === 'split-cash';
  const nextStep = inferStep(gate);

  let info: ReactNode;
  let action: ReactNode;
  if (waiting) {
    info = (
      <>
        <span className={styles.dockLabel}>{t('Waiting for Bakong')}</span>
        <MoneyText className={styles.dockDue} currency="USD" minor={dueMinor} />
      </>
    );
    action = (
      <Button onClick={onResume} size="sm" variant="outline">
        {t('View QR')}
      </Button>
    );
  } else if (gate.step6Done) {
    info = (
      <span className={styles.dockLabel}>
        {gate.paid
          ? `${t('Paid')} · ${payment.receiptId ?? ''}`
          : payment.status === 'no-charge'
            ? t('No charge')
            : t('Pay later recorded')}
      </span>
    );
    action = (
      <Button onClick={onFinish} size="sm" variant="primary">
        {t('Finish check-in')}
      </Button>
    );
  } else if (gate.step5Done) {
    info = (
      <>
        <span className={styles.dockLabel}>{t('Patient due')}</span>
        <MoneyText className={styles.dockDue} currency="USD" minor={dueMinor} />
      </>
    );
    action = (
      <Button onClick={onResume} size="sm" variant="primary">
        {t('Collect payment')}
      </Button>
    );
  } else if (patient.cart.items.length === 0) {
    info = <span className={styles.dockLabel}>{t('No orders yet')}</span>;
    action = (
      <Button onClick={onResume} size="sm" variant="secondary">
        {nextStep === 4 ? t('Add orders') : t('Continue')}
      </Button>
    );
  } else {
    const nextTitle = STEP_DEFS.find((def) => def.id === nextStep)?.title;
    info = (
      <span className={styles.dockLabel}>
        {t('Step')} {nextStep} {t('of 6')} · {nextTitle ? t(nextTitle) : null}
      </span>
    );
    action = (
      <Button onClick={onResume} size="sm" variant="secondary">
        {t('Continue')}
      </Button>
    );
  }

  return (
    <div aria-label={t('Check-in progress')} className={styles.dock} role="region">
      <div className={styles.dockInfo}>{info}</div>
      {action}
    </div>
  );
}

// ── Step footer ────────────────────────────────────────────

function ContinueFooter({
  collisionsBlock,
  gate,
  mobileDockAvailable,
  onBack,
  onContinue,
  onFinish,
  step,
}: {
  collisionsBlock: boolean;
  gate: ReturnType<typeof wizardGate>;
  mobileDockAvailable: boolean;
  onBack: () => void;
  onContinue: () => void;
  onFinish: () => void;
  step: StepId;
}) {
  const t = useT();
  const stepDone = gate[`step${step}Done` as keyof typeof gate] === true;
  const blocked = !stepDone || collisionsBlock;
  const reason = collisionsBlock
    ? t('Resolve the possible duplicates above to continue.')
    : !stepDone
      ? step === 6
        ? t('Record payment before finishing this reception flow.')
        : t(STEP_REQUIREMENTS[step])
      : null;
  const actionLabel =
    step === 6 ? t('Finish') : step === 1 ? t('Review details') : t('Continue');

  return (
    <footer
      aria-label={t('Check-in actions')}
      className={styles.stepFooter}
      data-mobile-dock={mobileDockAvailable ? 'true' : undefined}
      role="region"
    >
      <div className={styles.stepFooterInner}>
        {step > 1 ? (
          <Button className={styles.footerBack} onClick={onBack} variant="outline">
            {t('Back')}
          </Button>
        ) : (
          <span className={styles.footerBack} />
        )}
        {blocked && reason ? <p className={styles.footerReason}>{reason}</p> : <span />}
        <Button
          className={styles.footerPrimary}
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

const recordPatch = resolvedRecordPatch;

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
  const t = useT();
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
        ? t('Booking QR')
        : patient.identity.source === 'existing'
          ? t('Existing Kura record')
          : t('Manual entry');
    // The bound booking rides in the identity strip, which is visible on every
    // step — repeating it inside this card would say it twice on one screen.
    const hasCaptureFacts = patient.identity.lockedFields.length > 0;
    return (
      <section aria-label={t('Identity')} className={styles.step}>
        <h2 className={styles.stepTitle}>{t('Patient selected')}</h2>
        <p className={styles.stepSubtitle}>
          {patient.identity.lockedFields.length > 0
            ? t('Review details next. Unlock fields before editing.')
            : t('Review and edit details on the next step.')}
        </p>
        <PatientResolutionCard
          variant="captured"
          record={{
            id: patient.id,
            name: patient.name || t('New patient'),
            dob: patient.dob || undefined,
            sexAtBirth: patient.sexAtBirth,
            nid: patient.idNumber || undefined,
            phone: patient.phoneNumber || undefined,
            assurance: 'unverified',
            registeredHere: true,
          }}
          provenance={`${t('Source')}: ${sourceLabel}${patient.identity.capturedAtLabel ? ` · ${t('Captured')} ${patient.identity.capturedAtLabel}` : ''}`}
          helperText={
            hasCaptureFacts ? (
              <Badge size="sm" variant="neutral">
                {patient.identity.lockedFields.length} {t('fields locked')}
              </Badge>
            ) : undefined
          }
          actions={
            recaptureAsked
              ? undefined
              : [
                  {
                    label: 'Choose a different patient',
                    variant: 'ghost',
                    icon: <RefreshIcon size={14} aria-hidden />,
                    onClick: () => setRecaptureAsked(true),
                  },
                ]
          }
        />
        {recaptureAsked ? (
          <Alert tone="warning">
            <AlertTitle>{t('Choose a different patient?')}</AlertTitle>
            <AlertDescription>
              {t(
                'Search again. Current details stay until you select or create another patient.',
              )}
            </AlertDescription>
            <AlertAction>
              <Button onClick={() => setRecaptureAsked(false)} size="sm" variant="outline">
                {t('Keep current')}
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
                {t('Search again')}
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
    <section
      aria-label={t('Identity')}
      className={styles.step}
      data-identity-search-empty={query.length === 0 ? 'true' : undefined}
    >
      <h2 className={styles.stepTitle}>{t('Find or create a patient')}</h2>
      <p className={styles.stepSubtitle}>{t('Search by phone, booking code, or name.')}</p>

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
                ? `${t('Today')} · ${resolution.record.bookings.length} ${t('bookings')}`
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
                ? t('Continue without a booking')
                : `${t('Continue with')} ${resolution.record.name}`}
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
            helperText={t(
              'Use this Kura record at this PSC. No details need to be entered again.',
            )}
          />
          <IdentityActionArea>
            <Button onClick={() => captureRecord(resolution.record)} variant="primary">
              {t('Import')} {resolution.record.name}
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
              {t('Check in booking')} {resolution.booking.code}
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
            helperText={t(bookingBlockMeta(resolution.reason).description)}
          />
          <IdentityActionArea>
            {/* Recovery, never a dead end: the record still identifies the
                patient, but a blocked code is never silently redeemed. */}
            {resolution.reason === 'redeemed' ? (
              <Button onClick={() => captureRecord(resolution.record)} variant="outline">
                {t('Continue as a walk-in')}
              </Button>
            ) : (
              <Button onClick={() => captureRecord(resolution.record)} variant="primary">
                {t('Continue with')} {resolution.record.name} {t('as walk-in')}
                <ChevronRightIcon size={14} aria-hidden />
              </Button>
            )}
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'shared-phone' ? (
        <>
          <div className={styles.identityGroupIntro}>
            <h3 className={styles.identityGroupTitle}>{t('Who is here today?')}</h3>
            <p className={styles.identityGroupHint}>
              {resolution.records.length} {t('patients are linked to this phone number.')}
            </p>
          </div>
          <div
            aria-label={t('Choose who is here today')}
            className={styles.identityCards}
            role="radiogroup"
          >
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
                            label: `${t('Guardian confirmed')} · ${record.guardianName ?? t('present')}`,
                            variant: 'success',
                          }
                        : {
                            label: `${t('Guardian required')} · ${t('On file')}: ${record.guardianName ?? t('unknown')}`,
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
            {t('None of these? Create a new patient')}
            <ChevronRightIcon size={14} aria-hidden />
          </Button>
          <IdentityActionArea
            helper={
              selectedId === null
                ? t('Choose a patient to continue.')
                : guardianBlocked
                  ? t('Confirm the guardian is present to continue with a minor.')
                  : undefined
            }
          >
            {selectedRecord && !guardianBlocked ? (
              (selectedRecord.bookings?.length ?? 0) > 1 ? (
                <Button onClick={() => captureRecord(selectedRecord)} variant="outline">
                  {t('Continue without a booking')}
                </Button>
              ) : (
                <Button
                  onClick={() => captureRecord(selectedRecord, selectedRecord.bookings?.[0])}
                  variant="primary"
                >
                  {selectedRecord.bookings?.length
                    ? `${t('Check in')} ${selectedRecord.name} · ${selectedRecord.bookings[0].code}`
                    : `${t('Continue with')} ${selectedRecord.name}`}
                  <ChevronRightIcon size={14} aria-hidden />
                </Button>
              )
            ) : null}
          </IdentityActionArea>
        </>
      ) : null}

      {resolution?.kind === 'candidates' ? (
        <>
          <p className={styles.identityKicker}>{t('Possible matches')}</p>
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
            {t('None of these? Create a new patient')}
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
                ? t('No booking carries this code. Check the code or search by phone instead.')
                : undefined
            }
          />
          {resolution.queryKind !== 'code' ? (
            <IdentityActionArea>
              <Button
                onClick={() => captureNewPatient(resolution.queryKind, resolution.query)}
                variant="primary"
              >
                {t('Create a new patient')}
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
  const t = useT();
  const [pin, setPin] = useState('');
  const [recordOpen, setRecordOpen] = useState(false);
  const needsPin = collision.signals.includes('idMatch');
  const evidence = matchedOnLabel(collision.signals);

  return (
    <Alert tone="warning">
      <AlertTitle>
        {t(collision.strength)} — {collision.patient.name}
      </AlertTitle>
      <AlertDescription>
        {evidence ? `${t(evidence)} · ` : ''}
        {t('score')} {collision.score}.{' '}
        {t('Duplicate records create a duplicate-risk audit entry.')}
      </AlertDescription>
      {recordOpen ? (
        <dl className={styles.collisionRecord}>
          <div>
            <dt>{t('Queue')}</dt>
            <dd className={styles.mono}>Q-{String(collision.patient.queueNumber).padStart(3, '0')}</dd>
          </div>
          <div>
            <dt>{t('Date of birth')}</dt>
            <dd>{collision.patient.dob || t('Unknown')}</dd>
          </div>
          <div>
            <dt>{t('Sex at birth')}</dt>
            <dd>
              {collision.patient.sexAtBirth
                ? t(collision.patient.sexAtBirth)
                : t('Unknown')}
            </dd>
          </div>
          <div>
            <dt>{t('Phone')}</dt>
            <dd className={styles.mono}>
              {collision.patient.phoneNumber
                ? `${collision.patient.countryCode} ${collision.patient.phoneNumber}`
                : t('None')}
            </dd>
          </div>
        </dl>
      ) : null}
      {needsPin ? (
        <div className={styles.collisionPin}>
          <LockKeyIcon aria-hidden size={14} />
          <Input
            aria-label={t('Supervisor PIN')}
            inputMode="numeric"
            onChange={(event) => setPin(event.target.value)}
            placeholder={t('Supervisor PIN')}
            type="password"
            value={pin}
          />
          <span className={styles.collisionPinHint}>
            {t('Same national ID. Keeping both records is logged with time and staff.')}
          </span>
        </div>
      ) : null}
      <AlertAction>
        <Button onClick={() => setRecordOpen((open) => !open)} size="sm" variant="ghost">
          {recordOpen ? t('Hide record') : t('View record')}
        </Button>
        {onLoadExisting ? (
          <Button onClick={() => onLoadExisting(collision.patient)} size="sm" variant="outline">
            {t('Use existing record')}
          </Button>
        ) : null}
        <Button
          disabled={needsPin && !collisionOverridePinValid(pin)}
          onClick={() => onAcknowledge(collision.patient.id)}
          size="sm"
          variant="outline"
        >
          {t('Different person — continue')}
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

  if (field === 'dob') {
    return (
      <DateInput
        disabled={locked}
        label={label}
        lang={lang}
        onValueChange={onChange}
        placeholder={placeholder}
        required={required}
        suffix={locked ? <LockKeyIcon size={14} aria-hidden /> : undefined}
        value={value}
      />
    );
  }

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
  const t = useT();
  const lockedFields = patient.identity.lockedFields;
  const hasLocks = lockedFields.length > 0;
  const [unlockAsked, setUnlockAsked] = useState(false);

  function updateAddress(patch: Partial<FrontDeskPatient['address']>) {
    onUpdate({ address: { ...patient.address, ...patch } });
  }

  return (
    <section aria-label={t('Review and confirm')} className={styles.step}>
      <h2 className={styles.stepTitle}>{t('Review & confirm')}</h2>

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
          <AlertTitle>{t('Unlock captured fields?')}</AlertTitle>
          <AlertDescription>
            {t(
              'These values were read from the record. Editing may introduce errors and the change is logged.',
            )}
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => setUnlockAsked(false)} size="sm" variant="outline">
              {t('Keep locked')}
            </Button>
            <Button
              onClick={() => {
                setUnlockAsked(false);
                onUpdate({ identity: { ...patient.identity, lockedFields: [] } });
              }}
              size="sm"
              variant="destructive"
            >
              {t('Unlock')}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {/* Identity is a section of this step, not an independent object — it
          groups by heading and spacing, never by a card boundary. */}
      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.subTitle}>{t('Identity')}</h3>
          <span className={styles.sectionProvenance}>
            {patient.identity.source === 'existing'
              ? t('From Kura record')
              : t('Entered at the desk')}
          </span>
          {hasLocks && !unlockAsked ? (
            <Button
              className={styles.sectionAction}
              onClick={() => setUnlockAsked(true)}
              size="sm"
              variant="ghost"
            >
              <LockKeyIcon size={13} aria-hidden />
              {t('Unlock fields')}
            </Button>
          ) : null}
        </div>
        <div className={styles.fieldGrid}>
          <LockedOrEditableInput
            field="name"
            label={t('Full name (Latin)')}
            lockedFields={lockedFields}
            onChange={(next) => onUpdate({ name: next, collisionAcked: [] })}
            placeholder={t('As shown on the ID document')}
            required
            value={patient.name}
          />
          <Input
            label={t('Full name (Khmer)')}
            lang="km"
            onChange={(event) => onUpdate({ nameKhmer: event.target.value })}
            placeholder="សុខ ស្រីម៉ៅ"
            value={patient.nameKhmer}
          />
          <LockedOrEditableInput
            field="dob"
            label={t('Date of birth')}
            lockedFields={lockedFields}
            onChange={(next) => onUpdate({ dob: next, collisionAcked: [] })}
            placeholder="YYYY-MM-DD"
            required
            value={patient.dob}
          />
          {lockedFields.includes('sexAtBirth') ? (
            <Input
              disabled
              label={t('Sex at birth')}
              required
              suffix={<LockKeyIcon size={14} aria-hidden />}
              value={t(patient.sexAtBirth)}
            />
          ) : (
            <SegmentedToggle
              label={t('Sex at birth')}
              labelVisible
              onValueChange={(value) =>
                onUpdate({
                  sexAtBirth: value as FrontDeskPatient['sexAtBirth'],
                  collisionAcked: [],
                })
              }
              options={[
                { value: 'Female', label: t('Female') },
                { value: 'Male', label: t('Male') },
              ]}
              value={patient.sexAtBirth}
            />
          )}
          <Input
            label={t('National ID number')}
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
        <Collapsible inset="none">
          <CollapsibleTrigger headingLevel={3} meta={t('Optional')}>
            {t('Address')}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={styles.fieldGrid}>
              <Input
                label={t('Province')}
                onChange={(event) => updateAddress({ province: event.target.value })}
                placeholder={t('Phnom Penh')}
                value={patient.address.province}
              />
              <Input
                label={t('District')}
                onChange={(event) => updateAddress({ district: event.target.value })}
                placeholder={t('Chamkarmon')}
                value={patient.address.district}
              />
              <Input
                label={t('Commune')}
                onChange={(event) => updateAddress({ commune: event.target.value })}
                placeholder={t('Tonle Bassac')}
                value={patient.address.commune}
              />
              <Input
                className={styles.fieldSpanAll}
                label={t('Street / house')}
                onChange={(event) => updateAddress({ street: event.target.value })}
                placeholder={t('House, street, landmark')}
                value={patient.address.street}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible inset="none">
          <CollapsibleTrigger headingLevel={3} meta={t('Optional')}>
            {t('Refund account')}
          </CollapsibleTrigger>
          <CollapsibleContent>
            {patient.refundAccount ? (
              <div className={styles.refundRow}>
                <QrCodeIcon size={16} aria-hidden />
                <span className={styles.refundValue}>{patient.refundAccount}</span>
                <Badge size="sm" variant="success">
                  {t('Bakong KHQR saved')}
                </Badge>
                <Button
                  onClick={() => onUpdate({ refundAccount: null })}
                  size="sm"
                  variant="ghost"
                >
                  {t('Remove')}
                </Button>
              </div>
            ) : (
              /* Nothing saved is a state, not an object — the hint and its one
                 action sit on the page, with no box drawn around them. */
              <div className={styles.refundEmpty}>
                <p className={styles.hint}>
                  {t(
                    'No account saved. Add Bakong KHQR only if this patient may need a refund.',
                  )}
                </p>
                <Button
                  onClick={() => onUpdate({ refundAccount: 'kh-qr://demo-bakong-account' })}
                  size="sm"
                  variant="outline"
                >
                  <QrCodeIcon size={13} aria-hidden />
                  {t('Scan KHQR')}
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
  const t = useT();
  if (policy.eligibility?.kind !== 'eligible') return null;
  const eligibility = policy.eligibility;
  const coverageScopeLabel =
    policy.coverageScope === 'both'
      ? t('In + outpatient')
      : policy.coverageScope === 'inpatient'
        ? t('Inpatient')
        : t('Outpatient');
  const points: Array<{ label: string; value: ReactNode }> = [
    { label: t('Member ID'), value: policy.memberId ?? policy.policyNumber },
    { label: t('Group'), value: eligibility.group ?? '—' },
    {
      label: t('Coverage'),
      value: `${coverageScopeLabel} · ${eligibility.coveragePct}%`,
    },
    { label: t('Co-pay'), value: <MoneyText currency="USD" minor={eligibility.copayMinor} /> },
    { label: t('Active until'), value: eligibility.activeUntil },
    {
      label: t('Pre-auth'),
      value: eligibility.preAuth === 'required' ? t('Required') : t('Not required'),
    },
    { label: t('Tier'), value: eligibility.tier },
    { label: t('Effective'), value: eligibility.effectiveFrom ?? '—' },
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
  const t = useT();
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
    <section aria-label={t('Insurance')} className={styles.step}>
      <div className={styles.stepHeaderRow}>
        <div>
          <h2 className={styles.stepTitle}>{t('Insurance')}</h2>
          <p className={styles.stepSubtitle}>
            {hasPolicies
              ? t('Verify the policy and eligibility before pricing the cart.')
              : t('Add a policy to bill insurance, or continue as direct pay.')}
          </p>
        </div>
        {hasPolicies && !adding ? (
          <Button onClick={() => setAdding(true)} size="sm" variant="outline">
            {t('Add policy')}
          </Button>
        ) : null}
      </div>

      {!hasPolicies && !patient.insuranceAcked && !adding ? (
        <Card className={styles.insuranceEmptyCard}>
          <span className={styles.insuranceEmptyIcon}>
            <ShieldIcon size={20} aria-hidden />
          </span>
          <h3 className={styles.subTitle}>{t('No insurance on file')}</h3>
          <p className={styles.hint}>
            {t('Add a policy now to bill insurance, or continue as direct pay.')}
          </p>
          <div className={styles.insuranceEmptyActions}>
            <Button onClick={() => setAdding(true)} variant="outline">
              {t('Add policy')}
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
              {t('Scan card')}
            </Button>
            <Button onClick={() => onUpdate({ insuranceAcked: true })} variant="primary">
              {t('Continue without insurance')}
            </Button>
          </div>
        </Card>
      ) : null}

      {patient.insuranceAcked && !hasPolicies && !adding ? (
        <Alert tone="neutral">
          <AlertTitle>{t('Direct pay')}</AlertTitle>
          <AlertDescription>{t('The patient pays the full amount directly.')}</AlertDescription>
          <AlertAction>
            <Button onClick={() => onUpdate({ insuranceAcked: false })} size="sm" variant="ghost">
              {t('Undo')}
            </Button>
            <Button onClick={() => setAdding(true)} size="sm" variant="outline">
              {t('Add policy instead')}
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
                  {policy.eligibility?.kind === 'eligible' ? t('Eligible') : t('Unverified')}
                </Badge>
              </div>
              <p className={styles.hint}>
                {policy.eligibility?.kind === 'eligible'
                  ? t(policy.eligibility.verifiedAtLabel ?? 'Verified')
                  : t('Added without a live eligibility check.')}
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
              {t('Re-verify')}
            </Button>
          </div>
          <InsuranceDataPoints policy={policy} />
        </Card>
      ))}

      {eligiblePolicy?.eligibility?.kind === 'eligible' ? (
        <Alert tone="success">
          <AlertTitle>
            <MoneyText currency="USD" minor={eligiblePolicy.eligibility.copayMinor} />{' '}
            {t('co-pay applies')}
          </AlertTitle>
          <AlertDescription>
            {t('Insurance covers')} {eligiblePolicy.eligibility.coveragePct}%{' '}
            {t(
              'of eligible in-cart tests. The direct-pay portion is calculated automatically and shown in the order rail.',
            )}
          </AlertDescription>
        </Alert>
      ) : null}

      {adding ? (
        <Card className={styles.sectionCard}>
          <div className={styles.sectionCardHeader}>
            <h3 className={styles.subTitle}>{t('New policy')}</h3>
          </div>
          <div className={styles.fieldGrid}>
            <Select
              label={t('Provider')}
              onChange={(event) => patchDraft({ provider: event.target.value })}
              options={PROVIDERS.map((provider) => ({ value: provider, label: provider }))}
              required
              value={draft.provider}
            />
            <Input
              className={styles.monoField}
              label={t('Policy number')}
              onChange={(event) => patchDraft({ policyNumber: event.target.value })}
              placeholder="FRT-887200119"
              required
              value={draft.policyNumber}
            />
            <Input
              label={t('Member name')}
              onChange={(event) => patchDraft({ memberName: event.target.value })}
              value={draft.memberName}
            />
            <Input
              className={styles.monoField}
              label={t('Member ID')}
              onChange={(event) => patchDraft({ memberId: event.target.value })}
              placeholder="887200119"
              value={draft.memberId}
            />
            <Input
              label={t('Expiry')}
              onChange={(event) => patchDraft({ expiry: event.target.value })}
              placeholder="YYYY-MM"
              value={draft.expiry}
            />
            <Select
              label={t('Coverage')}
              onChange={(event) =>
                patchDraft({ coverageScope: event.target.value as PolicyDraft['coverageScope'] })
              }
              options={[
                { value: 'outpatient', label: t('Outpatient') },
                { value: 'inpatient', label: t('Inpatient') },
                { value: 'both', label: t('Both') },
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
              {t('Cancel')}
            </Button>
            <Button
              disabled={draft.policyNumber.trim() === '' || checking}
              onClick={checkEligibility}
              variant="secondary"
            >
              {t('Check eligibility')}
            </Button>
          </div>
        </Card>
      ) : null}

      {checking ? (
        <Card className={styles.sectionCard} data-tone="brand" variant="outline">
          <div className={styles.checkingRow} role="status">
            <SpinnerGapIcon size={18} aria-hidden className={styles.checkingSpinner} />
            <div>
              <p className={styles.checkingTitle}>
                {t('Checking eligibility with')} {draft.provider}…
              </p>
              <p className={styles.hint}>{t('This usually takes a few seconds.')}</p>
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
              ? `${t('Eligible')} — ${pending.eligibility.coveragePct}% ${t('of eligible services')}`
              : pending.eligibility?.kind === 'unreachable'
                ? t('Insurer unreachable')
                : t('Not eligible')}
          </AlertTitle>
          <AlertDescription>
            {pending.provider} · {pending.policyNumber}
            {pending.eligibility?.kind === 'eligible' ? (
              <>
                {' '}
                · {t('Tier')} {pending.eligibility.tier} · {t('co-pay')}{' '}
                <MoneyText currency="USD" minor={pending.eligibility.copayMinor} /> ·{' '}
                {t('active until')} {pending.eligibility.activeUntil}
              </>
            ) : null}
          </AlertDescription>
          <AlertAction>
            {pending.eligibility?.kind !== 'ineligible' ? (
              <Button onClick={() => attach(pending)} size="sm" variant="primary">
                {pending.eligibility?.kind === 'eligible' ? t('Save policy') : t('Add anyway')}
              </Button>
            ) : (
              <Button onClick={() => setPending(null)} size="sm" variant="outline">
                {t('Retry')}
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
  const t = useT();
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
  const [additionalOrdersOpen, setAdditionalOrdersOpen] = useState(false);
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
    <section aria-label={t('Orders')} className={styles.step}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('Add orders')}</h2>
        <Popover onOpenChange={setAdditionalOrdersOpen} open={additionalOrdersOpen}>
          <PopoverTrigger
            render={
              <Button size="sm" variant="outline">
                {t('Additional order types')}
              </Button>
            }
          />
          <PopoverContent
            aria-label={t('Choose an additional order type')}
            className={styles.additionalOrdersPopover}
            initialFocus={false}
            role="dialog"
          >
            <ul className={styles.additionalOrderList}>
              {OTHER_ORDER_ENTRIES.map((entry) => (
                <li className={styles.additionalOrderRow} key={entry.id}>
                  <Checkbox
                    aria-label={entry.name}
                    checked={inCart.has(entry.id)}
                    onCheckedChange={(checked) => {
                      setEntrySelected(entry, checked);
                      setAdditionalOrdersOpen(false);
                    }}
                  >
                    <span className={styles.lineTextWide}>
                      <span className={styles.lineName}>{entry.name}</span>
                      <span className={styles.lineMeta}>
                        {t(entry.category)}
                        {entry.fasting ? ` · ${t('Fasting')}` : ''}
                      </span>
                    </span>
                  </Checkbox>
                  <MoneyText
                    className={styles.additionalOrderPrice}
                    currency={entry.currencyCode}
                    minor={entry.priceMinor}
                  />
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* Order attribution (ADR-0057): the server refuses placement without an
          eligible prescriber — the desk resolves it here, not at payment. */}
      {patient.cart.items.length > 0 ? (
        blocker?.kind === 'no-eligible-prescriber' ? (
          <Alert tone="danger">
            <AlertTitle>{t('No clinician can be attributed')}</AlertTitle>
            <AlertDescription>
              {t(
                'No clinician in this workspace has a live licence. The order cannot be placed until an eligible clinician is available.',
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <div className={styles.attribution}>
            <Select
              label={t('Ordering clinician')}
              helpText={t(
                'Placed by the desk on behalf of this clinician. Only a live licence can be attributed.',
              )}
              error={
                blocker?.kind === 'prescriber-ineligible'
                  ? `${blocker.prescriber.name} ${t('does not have a live licence — choose another clinician.')}`
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
                    ? `${prescriber.name} · ${prescriber.specialty ?? t('Clinician')}`
                    : `${prescriber.name} · ${t('licence not live')}`,
                disabled: !eligible.some((p) => p.userId === prescriber.userId),
              }))}
              placeholder={t('Choose the ordering clinician')}
              value={patient.cart.attributedPrescriberId ?? ''}
            />
          </div>
        )
      ) : null}

      {compositionBlockers.length > 0 ? (
        <Alert tone="warning">
          <AlertTitle>
            {compositionBlockers.length === 1
              ? t('Resolve 1 order blocker')
              : `${t('Resolve')} ${compositionBlockers.length} ${t('order blockers')}`}
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
          <h3 className={styles.subTitle}>{t('Consent')}</h3>
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
                        ? t('Imaging consent before the scan')
                        : t('Sensitive test — explicit consent required')}
                      {item.consent?.state === 'verbal'
                        ? ` · ${t('Verbal')} · ${item.consent.byLabel} · ${t(item.consent.atLabel)}`
                        : null}
                      {item.pregnancyScreen?.overrideBy
                        ? ` · ${t('Clinician override')} · ${item.pregnancyScreen.overrideBy}`
                        : null}
                    </span>
                  </div>
                  {state === 'needed' ? (
                    <>
                      <Badge variant="warning">{t('Consent needed')}</Badge>
                      <Button
                        onClick={() => patchConsent(item.id, { state: 'sent', atLabel: 'just now' })}
                        size="sm"
                        variant="secondary"
                      >
                        {t('Send sign-off')}
                      </Button>
                      <Button onClick={() => setVerbalForId(item.id)} size="sm" variant="outline">
                        {t('Verbal consent')}
                      </Button>
                    </>
                  ) : null}
                  {state === 'sent' ? (
                    <>
                      <Badge variant="info">{t('Sent · awaiting signature')}</Badge>
                      {/* Demo stand-in for the patient signing on their phone. */}
                      <Button
                        onClick={() => patchConsent(item.id, { state: 'signed', atLabel: 'just now' })}
                        size="sm"
                        variant="outline"
                      >
                        {t('Simulate patient signature')}
                      </Button>
                      <Button onClick={() => setVerbalForId(item.id)} size="sm" variant="ghost">
                        {t('Verbal consent')}
                      </Button>
                    </>
                  ) : null}
                  {state === 'signed' ? (
                    <Badge variant="success">{t('Signed on phone')}</Badge>
                  ) : null}
                  {state === 'verbal' ? (
                    <Badge variant="success">{t('Verbal · recorded')}</Badge>
                  ) : null}
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
  const t = useT();
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
  const status = intakeStatus(patient, patient.cart.items);
  const [skipAsked, setSkipAsked] = useState(false);
  const [skipReason, setSkipReason] = useState<IntakeSkipReasonCode>('patient-declined');
  const [skipNote, setSkipNote] = useState('');
  const [rescheduling, setRescheduling] = useState(false);

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
    setRescheduling(false);
  }

  function stampIntake(key: keyof IntakeFields, value: string) {
    onUpdate({
      intake: { ...patient.intake, [key]: value },
      intakeAuthors: { ...patient.intakeAuthors, [key]: 'nurse' },
    });
  }

  return (
    <section aria-label={t('Pre-consult')} className={styles.step}>
      <div className={styles.intakeHeader}>
        <div className={styles.intakeHeaderText}>
          <h2 className={styles.stepTitle}>{t('Intake')}</h2>
          <p className={styles.hint}>
            {`${filled} ${t('of')} ${sections.length} ${t('answered')}${
              status === 'complete' ? '' : ` · ${t('check-in is not blocked')}`
            }`}
          </p>
        </div>
        {patient.intakeSkipped || patient.intakeSentAtLabel ? null : (
          <div className={styles.intakeHeaderActions}>
            <div className={styles.intakeHeaderButtons}>
              <Button
                disabled={!verifiedChannel}
                onClick={() => onUpdate({ intakeSentAtLabel: 'just now' })}
                size="sm"
                variant="secondary"
              >
                {t('Send link')}
              </Button>
              {!skipAsked && status !== 'complete' ? (
                <Button onClick={() => setSkipAsked(true)} size="sm" variant="ghost">
                  {t('Skip')}
                </Button>
              ) : null}
            </div>
            {/* A disabled control names its reason beside itself, never across the page. */}
            {verifiedChannel ? null : (
              <p className={styles.intakeHeaderReason}>
                {t('Verify a phone or Telegram in Step 2.')}
              </p>
            )}
          </div>
        )}
      </div>

      {patient.intakeSkipped ? (
        <Alert tone="warning">
          <AlertTitle>
            {t('Intake skipped')} ·{' '}
            {t(
              INTAKE_SKIP_REASONS.find((reason) => reason.code === patient.intakeSkipped?.code)
                ?.label ?? patient.intakeSkipped.code,
            )}
          </AlertTitle>
          <AlertDescription>
            {patient.intakeSkipped.note
              ? `${patient.intakeSkipped.note} — ${t('answers')}`
              : t('Answers')}{' '}
            {t('can still arrive from the patient link later.')}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => onUpdate({ intakeSkipped: null })}
              size="sm"
              variant="outline"
            >
              {t('Resume intake')}
            </Button>
          </AlertAction>
        </Alert>
      ) : patient.intakeSentAtLabel ? (
        <Alert tone="info">
          <AlertTitle>
            {t('Intake link sent')} · {t(patient.intakeSentAtLabel)}
          </AlertTitle>
          <AlertDescription>
            {t('The patient completes it on their phone; answers land here as they arrive.')}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => onUpdate({ intakeSentAtLabel: 'just now' })}
              size="sm"
              variant="outline"
            >
              {t('Resend link')}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {skipAsked && !patient.intakeSkipped ? (
        <div className={styles.inlineForm}>
          <Select
            label={t('Why is the intake skipped?')}
            onChange={(event) => setSkipReason(event.target.value as IntakeSkipReasonCode)}
            options={INTAKE_SKIP_REASONS.map((reason) => ({
              value: reason.code,
              label: t(reason.label),
            }))}
            value={skipReason}
          />
          {skipReason === 'other' ? (
            <Input
              aria-label={t('Skip reason note')}
              onChange={(event) => setSkipNote(event.target.value)}
              placeholder={t('What happened')}
              value={skipNote}
            />
          ) : null}
          <Button
            disabled={skipReason === 'other' && skipNote.trim() === ''}
            onClick={() => {
              onUpdate({
                intakeSkipped: {
                  code: skipReason,
                  note: skipReason === 'other' ? skipNote.trim() : undefined,
                },
              });
              setSkipAsked(false);
            }}
            size="sm"
            variant="secondary"
          >
            {t('Record skip')}
          </Button>
          <Button onClick={() => setSkipAsked(false)} size="sm" variant="ghost">
            {t('Cancel')}
          </Button>
        </div>
      ) : null}

      <ul className={styles.intakeList}>
        {sections.map((section) => {
          const author = patient.intakeAuthors?.[section.fieldKey];
          const source =
            author === 'nurse' ? 'desk' : author === 'patient' ? 'patient' : author ? 'auto' : null;
          // Only the derived "no answer applies" previews are UI copy; a real
          // answer is what the patient said and is never run through t().
          const preview =
            section.preview === 'Not applicable' || section.preview === 'No sensitive tests'
              ? t(section.preview)
              : section.preview;
          const meta = [preview, source ? `${t('recorded by')} ${t(source)}` : null]
            .filter(Boolean)
            .join(' · ');

          if (fillingKey === section.fieldKey) {
            return (
              <li className={styles.inlineForm} key={section.key}>
                <Input
                  aria-label={`${t(section.label)} — ${t('what the patient tells the desk')}`}
                  onChange={(event) => setFillDraft(event.target.value)}
                  placeholder={t(section.label)}
                  value={fillDraft}
                />
                <Button
                  disabled={fillDraft.trim() === ''}
                  onClick={() => {
                    stampIntake(section.fieldKey, fillDraft.trim());
                    setFillingKey(null);
                  }}
                  size="sm"
                  variant="secondary"
                >
                  {t('Save')}
                </Button>
                <Button onClick={() => setFillingKey(null)} size="sm" variant="ghost">
                  {t('Cancel')}
                </Button>
              </li>
            );
          }

          return (
            <li key={section.key}>
              <button
                className={styles.intakeRow}
                data-filled={section.filled || undefined}
                onClick={() => {
                  setFillingKey(section.fieldKey);
                  setFillDraft(patient.intake[section.fieldKey]);
                }}
                type="button"
              >
                <span aria-hidden className={styles.intakeMark}>
                  {section.filled ? <CheckIcon size={12} /> : null}
                </span>
                <span className={styles.lineTextWide}>
                  <span className={styles.lineName}>{t(section.label)}</span>
                  {meta ? <span className={styles.lineMeta}>{meta}</span> : null}
                </span>
                <span className={styles.srOnly}>
                  {section.filled ? t('Answered') : t('Not answered')}
                </span>
                <span className={styles.intakeRowAction}>
                  {section.filled ? t('Edit') : t('Add')}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {teleInCart || patient.teleconsult.status === 'waived' ? (
        <div className={styles.channel}>
          <h3 className={styles.subTitle}>{t('Teleconsultation')}</h3>
          {patient.teleconsult.status === 'booked' && !rescheduling ? (
            <Alert tone="success">
              <AlertTitle>
                {t('Booked')} · {patient.teleconsult.slot} ·{' '}
                {patient.teleconsult.specialty ? t(patient.teleconsult.specialty) : null}
                {patient.teleconsult.earlyOverride ? ` · ${t('before results')}` : ''}
              </AlertTitle>
              <AlertAction>
                <Button onClick={() => setRescheduling(true)} size="sm" variant="outline">
                  {t('Change time')}
                </Button>
                <Button
                  onClick={() => onUpdate({ teleconsult: { status: 'notBooked' } })}
                  size="sm"
                  variant="ghost"
                >
                  {t('Remove booking')}
                </Button>
              </AlertAction>
            </Alert>
          ) : patient.teleconsult.status === 'waived' ? (
            <Alert tone="neutral">
              <AlertTitle>{t('Skipped — results go out without a consult')}</AlertTitle>
            </Alert>
          ) : (
            <>
              {rescheduling ? (
                <Alert tone="info">
                  <AlertTitle>
                    {t('Rebooking — currently')} {patient.teleconsult.slot}
                  </AlertTitle>
                  <AlertDescription>
                    {t('Picking a new time replaces the current booking.')}
                  </AlertDescription>
                  <AlertAction>
                    <Button onClick={() => setRescheduling(false)} size="sm" variant="outline">
                      {t('Keep current time')}
                    </Button>
                  </AlertAction>
                </Alert>
              ) : null}
              <p className={styles.hint}>
                {tatHours > 0
                  ? `${t('Estimated results in')} ~${tatHours}h — ${t('the first post-result day is preselected.')}`
                  : t('No TAT-bound tests in cart — book any slot.')}
              </p>
              <div className={styles.slotRow} role="group" aria-label={t('Consult day')}>
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
                    {t(day)}
                    {index < tatOffset ? (
                      <>
                        <AlertIcon aria-hidden className={styles.dayWarnIcon} size={12} />
                        <span className={styles.srOnly}>{t('results may not be ready')}</span>
                      </>
                    ) : null}
                  </Button>
                ))}
              </div>
              {beforeTat ? (
                <p className={styles.hint}>{t('Results may not be ready on this day.')}</p>
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
                  {t('Skip consult')}
                </Button>
              </div>
              {pendingEarlySlot ? (
                <Alert tone="warning">
                  <AlertTitle>{t('Results may not be ready for this slot')}</AlertTitle>
                  <AlertDescription>
                    {t('Booking')} {t(TELE_DAYS[dayIndex])} · {pendingEarlySlot}{' '}
                    {t(
                      'lands before the estimated turnaround. The consult may happen without results.',
                    )}
                  </AlertDescription>
                  <AlertAction>
                    <Button
                      onClick={() => setPendingEarlySlot(null)}
                      size="sm"
                      variant="outline"
                    >
                      {t('Pick another slot')}
                    </Button>
                    <Button
                      onClick={() => bookSlot(pendingEarlySlot, true)}
                      size="sm"
                      variant="primary"
                    >
                      {t('Book anyway')}
                    </Button>
                  </AlertAction>
                </Alert>
              ) : null}
              <p className={styles.hint}>
                {t('Specialty')} {t(patient.teleconsult.specialty ?? autoSpecialty)}{' '}
                {t(
                  '· matched from the ordered tests. Slots follow estimated result availability; the patient is notified if the lab is delayed.',
                )}
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
  pricingStatus = 'ready',
}: {
  fxRate?: FxRateQuote;
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
  patient: FrontDeskPatient;
  prescribers: Prescriber[];
  pricingStatus?: 'ready' | 'loading' | 'error';
}) {
  const t = useT();
  const totals = cartTotals(patient.cart);
  const dueMinor = paymentDueAmountMinor(patient.cart, totals);
  const payment = patient.cart.payment;
  const [tendered, setTendered] = useState('');
  const [splitCash, setSplitCash] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);
  const splitCashMinor = parseUsdMajor(splitCash);
  const noCharge = patient.cart.items.length > 0 && dueMinor === '0';
  const attribution = attributionBlocker(patient.cart, prescribers);
  const staleQuote = patient.cart.pricing?.state === 'stale';
  const composition = orderBlockers(patient.cart, ORDER_CATALOG);
  const unresolvedConsent = consentBlockers(patient.cart, ORDER_CATALOG);
  const claimPolicy = patient.insurance.find(
    (policy) => policy.eligibility?.kind === 'eligible',
  );
  const pricingUnavailable = pricingStatus !== 'ready';
  const placementBlocked =
    attribution !== null ||
    staleQuote ||
    pricingUnavailable ||
    composition.length > 0 ||
    unresolvedConsent.length > 0;
  const appliedPromoLines = promoLines(patient.cart);

  function applyPromoCode() {
    const promo = findDemoPromo(promoCode);
    if (!promo) {
      setPromoError(t('Code not recognised.'));
      return;
    }
    if ((patient.cart.promos ?? []).some((applied) => applied.code === promo.code)) {
      setPromoError(t('Code already applied.'));
      return;
    }
    if (promo.kind === 'item' && !patient.cart.items.some((item) => item.id === promo.itemId)) {
      setPromoError(
        `${promo.code} ${t('applies to an item that is not in this order.')}`,
      );
      return;
    }
    onUpdate({ cart: { ...patient.cart, promos: [...(patient.cart.promos ?? []), promo] } });
    setPromoCode('');
    setPromoError(null);
  }

  function removePromo(code: string) {
    onUpdate({
      cart: {
        ...patient.cart,
        promos: (patient.cart.promos ?? []).filter((applied) => applied.code !== code),
      },
    });
  }

  function setPayment(next: typeof payment) {
    onUpdate({ cart: { ...patient.cart, payment: next } });
  }

  if (payment.status === 'confirmed') {
    return (
      <section aria-label={t('Payment')} className={styles.step}>
        <h2 className={styles.stepTitle}>{t('Payment')}</h2>
        <Alert tone="success">
          <AlertTitle>{t('Paid')} · {payment.receiptId}</AlertTitle>
          <AlertDescription>
            <MoneyText currency="USD" minor={payment.amountMinor} /> ·{' '}
            {payment.method === 'cash'
              ? (
                  <>
                    {t('cash')} — {t('change')}{' '}
                    <MoneyText currency="USD" minor={payment.changeMinor} />
                  </>
                )
              : payment.method === 'khqr'
                ? 'KHQR (Bakong)'
                : t('cash + KHQR')}{' '}
            · {payment.confirmedAt} · {payment.cashier}
          </AlertDescription>
        </Alert>
        <PaymentReceipt
          branchLabel={`${t('Branch')} ${DEMO_BRANCH_ID.toUpperCase()}`}
          items={patient.cart.items}
          onPrint={() => {}}
          patientName={patient.name || t('Walk-in patient')}
          payment={payment}
        />
        <p className={styles.hint}>
          {t(
            'The amount is derived by the server from the priced order, never entered by the desk.',
          )}
        </p>
      </section>
    );
  }

  if (payment.status === 'no-charge') {
    return (
      <section aria-label={t('Payment')} className={styles.step}>
        <h2 className={styles.stepTitle}>{t('Payment')}</h2>
        <Alert tone="success">
          <AlertTitle>{t('No payment required')}</AlertTitle>
          <AlertDescription>
            {t(
              'The server-priced order has a zero balance. No cash capture or payment receipt was created.',
            )}
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
    <section aria-label={t('Payment')} className={styles.step}>
      <h2 className={styles.stepTitle}>{t('Payment')}</h2>

      {placementBlocked ? (
        <Alert tone="warning">
          <AlertTitle>{t('Resolve blockers before collecting payment')}</AlertTitle>
          <AlertDescription>
            {attribution?.kind === 'no-eligible-prescriber'
              ? t('No licensed clinician can be attributed to this order.')
              : attribution
                ? t('Choose the ordering clinician on the Orders step.')
                : staleQuote
                  ? t(
                      'Prices changed since this quote — accept the new total in the order cart first.',
                    )
                  : pricingUnavailable
                    ? pricingStatus === 'loading'
                      ? t('The server price is still loading — do not collect payment yet.')
                      : t(
                          'The order total could not be refreshed — retry pricing in the order cart before collecting.',
                        )
                    : composition.length > 0
                      ? orderBlockerMessage(composition[0])
                      : unresolvedConsent.length > 0
                        ? `${unresolvedConsent[0].name} ${t('still needs consent — resolve it on the Orders step.')}`
                        : ''}
          </AlertDescription>
        </Alert>
      ) : null}
      {appliedPromoLines.length > 0 ? (
        <dl className={styles.dueBreakdown}>
          <div>
            <dt>{t('Subtotal')}</dt>
            <dd>
              <MoneyText currency="USD" minor={totals.subtotalMinor} />
            </dd>
          </div>
          {appliedPromoLines.map((line) => (
            <div key={line.code}>
              <dt>
                {line.label} · {line.code}
              </dt>
              <dd className={styles.discount}>
                −<MoneyText currency="USD" minor={line.amountMinor} />
                {payment.status === 'idle' ? (
                  <Button
                    aria-label={`${t('Remove promo')} ${line.code}`}
                    onClick={() => removePromo(line.code)}
                    size="sm"
                    variant="ghost"
                  >
                    {t('Remove')}
                  </Button>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className={styles.due}>
        {t('Patient due')}{' '}
        <MoneyText as="strong" currency="USD" minor={dueMinor} />
        {khrMinor ? (
          <MoneyText className={styles.khr} currency="KHR" minor={khrMinor} />
        ) : null}
      </p>

      {noCharge ? (
        <Alert tone="neutral">
          <AlertTitle>{t('Nothing to collect')}</AlertTitle>
          <AlertDescription>
            {t('The server-priced order has a zero balance.')}
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
              {t('Continue without payment')}
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
              {t('Cash collected')} ·{' '}
              <MoneyText currency="USD" minor={payment.cashPortionMinor ?? '0'} />
            </AlertTitle>
            <AlertDescription>
              {t('KHQR covers the remainder. The split completes only when Bakong confirms.')}
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
          <div className={styles.promoRow}>
            <Input
              aria-label={t('Promo code')}
              label={t('Promo code')}
              onChange={(event) => {
                setPromoCode(event.target.value);
                setPromoError(null);
              }}
              placeholder={t('e.g. WELCOME10')}
              value={promoCode}
              variant="surface"
              error={promoError ?? undefined}
            />
            <Button
              disabled={promoCode.trim() === ''}
              onClick={applyPromoCode}
              variant="outline"
            >
              {t('Apply')}
            </Button>
          </div>
          {appliedPromoLines.length > 0 ? (
            <p className={styles.hint}>
              {t(
                'Promo discounts are desk-side only — the platform prices the order without promos.',
              )}
            </p>
          ) : null}
          <div className={styles.payGrid}>
            <Card as="section" size="sm">
              <CardHeader>
                <CardTitle>{t('Cash')}</CardTitle>
              </CardHeader>
              <CardContent className={styles.payBody}>
                <Input
                  inputMode="decimal"
                  label={t('Tendered (USD)')}
                  onChange={(event) => setTendered(event.target.value)}
                  placeholder="0.00"
                  value={tendered}
                  variant="surface"
                />
                {cashOk ? (
                  <p className={styles.hint}>
                    {t('Change due')}{' '}
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
                  {t('Confirm cash')}
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
                      {t('Generates a QR for')}{' '}
                      <MoneyText currency="KHR" minor={khrMinor} />.
                    </>
                  ) : (
                    t('KHR is unavailable until the live FX rate loads.')
                  )}
                </p>
                <Button
                  className={styles.inlineAction}
                  disabled={dueMinor === '0' || !khrMinor || placementBlocked}
                  onClick={() => setPayment({ ...payment, status: 'waiting', method: 'khqr' })}
                  variant="secondary"
                >
                  {t('Generate QR')}
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card as="section" size="sm">
            <CardHeader>
              <CardTitle>{t('Cash + KHQR split')}</CardTitle>
            </CardHeader>
            <CardContent className={styles.payBody}>
              <p className={styles.hint}>
                {khrMinor
                  ? t(
                      'Collect part in cash first; a KHQR intent covers the remainder. The split completes only when Bakong confirms.',
                    )
                  : t(
                      'Unavailable until the live FX rate loads — the KHQR remainder needs a KHR amount.',
                    )}
              </p>
              <div className={styles.phoneRow}>
                <Input
                  inputMode="decimal"
                  label={t('Cash portion (USD)')}
                  onChange={(event) => setSplitCash(event.target.value)}
                  placeholder="0.00"
                  value={splitCash}
                  variant="surface"
                />
                <Button
                  disabled={
                    placementBlocked ||
                    !khrMinor ||
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
                  {t('Collect cash · show QR')}
                </Button>
              </div>
              {splitCashMinor !== null && splitCashPortionValid(splitCashMinor, dueMinor) ? (
                <p className={styles.hint}>
                  {t('KHQR remainder')}{' '}
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
                {t('Route to insurer claim')}
              </Button>
            ) : null}
            <Button
              onClick={() => setPayment({ ...payment, status: 'deferred', method: null })}
              variant="ghost"
            >
              {t('Pay later')}
            </Button>
          </div>
        </>
      )}

      {payment.status === 'pending-claim' ? (
        <Alert tone="warning">
          <AlertTitle>
            {t('Insurance claim pending')}
            {claimPolicy ? ` · ${claimPolicy.provider}` : ''}
          </AlertTitle>
          <AlertDescription>
            {t(
              'The balance routes to the insurer; collect only the copay at the desk. PROTOTYPE: the platform captures cash only — no claim is actually filed.',
            )}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => setPayment({ ...payment, status: 'idle' })}
              size="sm"
              variant="ghost"
            >
              {t('Undo')}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {payment.status === 'deferred' ? (
        <Alert tone="warning">
          <AlertTitle>{t('Pay later')}</AlertTitle>
          <AlertDescription>
            {t('The balance stays open on the visit. Check-in can proceed.')}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => setPayment({ ...payment, status: 'idle' })}
              size="sm"
              variant="ghost"
            >
              {t('Undo')}
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
  const t = useT();
  const [voidPin, setVoidPin] = useState('');
  return (
    <AlertDialog onOpenChange={(next) => (!next ? onCancel() : undefined)} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('This order is already paid')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('Receipt')} {receiptId}{' '}
            {t(
              'covers the current items. Changing the order needs one of two paths — receipts are never silently rewritten. Voiding takes a supervisor PIN and is logged.',
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          aria-label={t('Supervisor PIN for void')}
          inputMode="numeric"
          onChange={(event) => setVoidPin(event.target.value)}
          placeholder={t('Supervisor PIN — required to void')}
          type="password"
          value={voidPin}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{t('Cancel')}</AlertDialogCancel>
          <AlertDialogAction
            disabled={!collisionOverridePinValid(voidPin)}
            onClick={() => onResolve('void')}
            variant="destructive"
          >
            {t('Void & recollect')}
          </AlertDialogAction>
          <AlertDialogAction onClick={() => onResolve('supplemental')} variant="primary">
            {t('Collect difference')}
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
  const t = useT();
  const [answer, setAnswer] = useState<'possibly' | 'declined' | null>(null);
  const [overrideBy, setOverrideBy] = useState('');

  if (answer === null) {
    return (
      <>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Pregnancy check')} — {entry.name}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(
              'Could the patient be pregnant? Imaging during early pregnancy may pose risk to the fetus.',
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{t('Cancel order')}</AlertDialogCancel>
          {/* Plain buttons: choosing an answer stages the override, it must
              not dismiss the dialog the way an AlertDialogAction does. */}
          <Button onClick={() => setAnswer('declined')} variant="outline">
            {t('Declined to answer')}
          </Button>
          <Button onClick={() => setAnswer('possibly')} variant="outline">
            {t('Possibly pregnant')}
          </Button>
          <AlertDialogAction
            onClick={() => onProceed({ answer: 'not-pregnant' })}
            variant="primary"
          >
            {t('Not pregnant — add order')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </>
    );
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('Clinician override required')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t(
            'Consider postponing, shielding, or non-ionising imaging. To proceed, the ordering clinician signs this override — it is recorded against this visit only.',
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Input
        aria-label={t('Clinician override · sign-off name')}
        onChange={(event) => setOverrideBy(event.target.value)}
        placeholder="Dr. …"
        value={overrideBy}
      />
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>{t('Cancel order')}</AlertDialogCancel>
        <AlertDialogAction
          disabled={overrideBy.trim() === ''}
          onClick={() => onProceed({ answer, overrideBy: overrideBy.trim() })}
          variant="primary"
        >
          {t('Record & add')}
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
  const t = useT();
  const [recordedBy, setRecordedBy] = useState('');
  const [witnessPin, setWitnessPin] = useState('');
  const valid = verbalConsentValid({ requirement, recordedBy, witnessPin });

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('Verbal consent')} — {item.name}</AlertDialogTitle>
        <AlertDialogDescription>
          {t(
            'Use only when the patient has no phone or refuses the digital consent flow. Recorded with time and staff name',
          )}
          {requirement === 'sensitive'
            ? t('; sensitive tests also need a supervisor witness')
            : ''}
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className={styles.verbalFields}>
        <Input
          aria-label={t('Recorded by')}
          onChange={(event) => setRecordedBy(event.target.value)}
          placeholder={t('Recorded by (staff name)')}
          value={recordedBy}
        />
        {requirement === 'sensitive' ? (
          <Input
            aria-label={t('Supervisor witness PIN')}
            inputMode="numeric"
            onChange={(event) => setWitnessPin(event.target.value)}
            placeholder={t('Supervisor witness PIN')}
            type="password"
            value={witnessPin}
          />
        ) : null}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>{t('Cancel')}</AlertDialogCancel>
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
          {t('Record consent')}
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
  const t = useT();
  const [manualAsked, setManualAsked] = useState(false);

  if (state === 'expired') {
    return (
      <Alert tone="warning">
        <AlertTitle>{t('QR expired')}</AlertTitle>
        <AlertDescription>
          {t(
            'The KHQR intent lapsed before payment. Generate a new QR to retry — an expired intent is never collectable.',
          )}
        </AlertDescription>
        <AlertAction>
          <Button onClick={() => onStateChange('waiting')} size="sm" variant="primary">
            {t('Regenerate QR')}
          </Button>
          <Button onClick={onCancel} size="sm" variant="ghost">
            {t('Back to methods')}
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  if (state === 'cancelled') {
    return (
      <Alert tone="neutral">
        <AlertTitle>{t('QR cancelled')}</AlertTitle>
        <AlertAction>
          <Button onClick={() => onStateChange('waiting')} size="sm" variant="outline">
            {t('Generate new QR')}
          </Button>
          <Button onClick={onCancel} size="sm" variant="ghost">
            {t('Back to methods')}
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  return (
    <>
      <Alert tone="info">
        <AlertTitle>
          {t('KHQR waiting for Bakong')} ·{' '}
          <MoneyText currency="USD" minor={amountUsdMinor} />
          {amountKhrMinor ? (
            <>
              {' '}
              (<MoneyText currency="KHR" minor={amountKhrMinor} />)
            </>
          ) : null}
        </AlertTitle>
        <AlertDescription>
          {t(
            'The QR is on the patient display. Confirmation arrives from the Bakong webhook; the intent expires after 10 minutes.',
          )}
        </AlertDescription>
        <AlertAction>
          <Button onClick={onConfirm} size="sm" variant="primary">
            {t('Simulate webhook confirm')}
          </Button>
          <Button onClick={() => setManualAsked(true)} size="sm" variant="outline">
            {t('Mark received')}
          </Button>
          <Button onClick={() => onStateChange('expired')} size="sm" variant="ghost">
            {t('Simulate expiry')}
          </Button>
          <Button onClick={() => onStateChange('cancelled')} size="sm" variant="ghost">
            {t('Cancel QR')}
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
              {t('Confirm manual receipt of')}{' '}
              <MoneyText currency="USD" minor={amountUsdMinor} />?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "Manual fallback only — confirm after seeing the Bakong receipt on the patient's banking app. A client-side success screen is not enough.",
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setManualAsked(false)}>
              {t('Back')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setManualAsked(false);
                onConfirm();
              }}
              variant="primary"
            >
              {t('Yes, mark received')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
