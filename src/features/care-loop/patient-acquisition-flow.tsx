"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Spinner,
  Textarea,
} from "../../components/ui";
import { CheckIcon } from "../../components/ui/icons";
import { useT } from "../../components/foundations/i18n";
import type { Translate } from "../../components/foundations/i18n";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from "../../components/shared/empty-state";
import { PhoneGateModal } from "../phone-gate/phone-gate-modal";
import { draftAgeYears, draftDob } from "../phone-gate/logic";
import type { PhoneGateOutcome, PhoneLookupResult } from "../phone-gate/logic";
import { PatientContextRail } from "../patient-context/patient-context-rail";
import type {
  PatientContextSection,
  PatientContextSectionId,
} from "../patient-context/patient-context-rail";

import { CareLoopFrame } from "./care-loop-frame";
import {
  LabOrderSampleCollectionFlow,
  type LabOrderJourneySnapshot,
} from "./lab-order-collection-flow";
import { CARE_LOOP_PATIENT, type CareLoopPatientManifest } from "./demo-data";
import styles from "./care-loop.module.css";

/**
 * Three separate objects, not one funnel: a patient record, a clinical intake,
 * and a lab order. Creating a patient is a complete outcome; an intake is a
 * preparation the doctor may run, send, or decline; ordering tests is a
 * clinical decision that only exists once someone has read what came back.
 * The stages below chain, but no stage is the completion condition of the one
 * before it.
 */
export type PatientAcquisitionStage =
  | "patients-empty"
  | "phone-gate"
  | "intake-unknown"
  | "intake-sending"
  | "intake-error"
  | "intake-requested"
  | "intake-form"
  /** Submitted by the patient and unread: patient-reported, not clinical fact. */
  | "intake-complete"
  /** The doctor is reading it, item by item. */
  | "intake-review"
  /** Reviewed, or deliberately skipped. The clinical decision happens here. */
  | "next-step"
  | "ready-to-order";

/** Where the phone gate appears before a patient has been resolved. */
export type PatientAcquisitionEntryPresentation = "standalone" | "overlay";

export type PatientAcquisitionPatient = {
  id?: string;
  name: string;
  pid?: string;
  sex?: "F" | "M";
  sexLabel: string;
  age?: number;
  /** `YYYY-MM-DD`, present only when an exact date was recorded. */
  dob?: string;
  /**
   * The age is an estimate because no exact date of birth exists. Age and date
   * never share one field: a shared string is how the same record reads as
   * "26 years" on one screen and "23 years estimated" on another, and age
   * drives reference ranges.
   */
  ageEstimated?: boolean;
  phone?: string;
  status?: string;
};

/** One rendering of age everywhere, with the estimate never presented as exact. */
export function patientAgeLabel(
  patient: Pick<PatientAcquisitionPatient, "age" | "ageEstimated">,
  t: Translate,
): string {
  if (patient.age === undefined) return "";
  return patient.ageEstimated
    ? `${patient.age} ${t("years (estimated)")}`
    : `${patient.age} ${t("years")}`;
}

export type PatientIntakeRecord = {
  reasonForVisit: string;
  allergies: string;
  medicines: string;
  familyHistory: string;
};

export type PatientAcquisitionJourneySnapshot = {
  version: 1;
  patient: PatientAcquisitionPatient;
  stage: PatientAcquisitionStage;
  profileConfirmed: boolean;
  intakeRecord: PatientIntakeRecord;
  labOrder?: LabOrderJourneySnapshot;
};

const INITIAL_PATIENT: PatientAcquisitionPatient = {
  id: CARE_LOOP_PATIENT.id,
  name: CARE_LOOP_PATIENT.name,
  pid: CARE_LOOP_PATIENT.pid,
  sex: CARE_LOOP_PATIENT.sex,
  sexLabel: CARE_LOOP_PATIENT.sexLabel,
  age: CARE_LOOP_PATIENT.age,
  dob: CARE_LOOP_PATIENT.dob,
  phone: CARE_LOOP_PATIENT.phone,
  status: "Provisional · PSC verifies",
};

const INTAKE_ITEM_LABELS = [
  "Reason for visit",
  "Drug allergies",
  "Current medications",
  "Family & medical history",
] as const;

const INTAKE_CONTEXT_SECTION_IDS: readonly PatientContextSectionId[] = [
  "problems",
  "medications",
  "verification",
  "history",
  "administration",
];

type IntakeDisplayItem = {
  label: (typeof INTAKE_ITEM_LABELS)[number];
  answer?: string;
};

function initialsFor(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function provisionalPatientId(phone: string, name: string) {
  const phoneSuffix = phone.replace(/\D/g, "").slice(-8);
  const fallback = initialsFor(name).toLowerCase() || "patient";
  return `provisional-${phoneSuffix || fallback}`;
}

function labOrderPatient(patient: PatientAcquisitionPatient): CareLoopPatientManifest {
  const isJourneyPatient =
    patient.id === CARE_LOOP_PATIENT.id ||
    patient.pid === CARE_LOOP_PATIENT.pid;
  const suffix = (patient.pid || initialsFor(patient.name) || "PENDING")
    .replace(/[^A-Z0-9]/gi, "")
    .toUpperCase();

  return {
    id: patient.id ?? `patient-${suffix.toLowerCase()}`,
    pid: patient.pid,
    name: patient.name,
    initials: initialsFor(patient.name),
    sex: patient.sex,
    sexLabel: patient.sexLabel,
    age: patient.age ?? 0,
    dob: patient.dob,
    phone: patient.phone,
    orderId: isJourneyPatient
      ? CARE_LOOP_PATIENT.orderId
      : `ORD-DEMO-${suffix}`,
  };
}

function isNoneAnswer(value: string) {
  return /^(none|no known|no current|not taking)/i.test(value.trim());
}

function intakeItemsFrom(input: {
  intakeProgress?: PatientAcquisitionFlowProps["intakeProgress"];
  record?: PatientIntakeRecord;
}): IntakeDisplayItem[] {
  if (input.record) {
    return [
      { label: "Reason for visit", answer: input.record.reasonForVisit },
      { label: "Drug allergies", answer: input.record.allergies },
      { label: "Current medications", answer: input.record.medicines },
      { label: "Family & medical history", answer: input.record.familyHistory },
    ];
  }

  return INTAKE_ITEM_LABELS.map((label, index) => ({
    label,
    answer: input.intakeProgress?.items[index]?.answer,
  }));
}

function patientContextSections(
  patient: PatientAcquisitionPatient,
  items: readonly IntakeDisplayItem[],
  t: Translate,
): PatientContextSection[] {
  const medicines = items[2]?.answer?.trim();
  const familyHistory = items[3]?.answer?.trim();

  return [
    {
      id: "problems",
      label: t("Active problems"),
      items: [],
      emptyMessage: t("No active problems recorded."),
    },
    {
      id: "medications",
      label: t("Current medications"),
      items:
        medicines && !isNoneAnswer(medicines) ? [{ label: medicines }] : [],
      emptyMessage: medicines
        ? t("Patient reports no current medications.")
        : t("Medication history not yet confirmed."),
      note:
        medicines && !isNoneAnswer(medicines)
          ? t("Patient reported · not clinically verified")
          : undefined,
    },
    {
      id: "verification",
      label: t("Pending verification"),
      items: patient.status
        ? [
            {
              label: t("Identity confirmation"),
              detail: t("PSC verifies before draw"),
            },
          ]
        : [],
      emptyMessage: t("No verification task is recorded."),
    },
    {
      id: "history",
      label: t("Past history"),
      items:
        familyHistory && !isNoneAnswer(familyHistory)
          ? [{ label: familyHistory }]
          : [],
      emptyMessage: familyHistory
        ? t("Patient reports no relevant history.")
        : t("Medical history not yet confirmed."),
      note:
        familyHistory && !isNoneAnswer(familyHistory)
          ? t("Patient reported · not clinically verified")
          : undefined,
    },
    {
      id: "administration",
      label: t("Admin details"),
      items: [],
      emptyMessage: t("Not available in this prototype."),
    },
  ];
}

/**
 * A check mark is a clinician's confirmation, never a receipt. An answer that
 * has only arrived gets a neutral mark: four green ticks under "Intake
 * received" is how patient-reported data starts reading as clinical fact.
 */
function IntakeItemList({
  items,
  state,
}: {
  items: readonly IntakeDisplayItem[];
  state: "unknown" | "waiting" | "filling" | "reported" | "reviewed";
}) {
  const t = useT();

  return (
    <ol className={styles.intakeStatusList}>
      {items.map((item, index) => {
        const answered = Boolean(item.answer);
        const shown = state === "reported" || state === "reviewed" || answered;
        const reviewed = state === "reviewed";
        const waiting =
          state === "waiting" || (state === "filling" && !answered);

        return (
          <li
            className={styles.intakeStatusRow}
            data-answered={shown || undefined}
            data-reviewed={reviewed || undefined}
            key={item.label}
          >
            <span className={styles.intakeStatusMarker} aria-hidden="true">
              {reviewed ? (
                <CheckIcon className={styles.intakeStatusCheck} size={14} />
              ) : (
                index + 1
              )}
            </span>
            <span className={styles.intakeStatusCopy}>
              <span className={styles.intakeStatusLabel}>{t(item.label)}</span>
              {/* The answer slot is always present so the row grows into it
                  instead of the card jumping when the answer lands. */}
              <span className={styles.intakeStatusAnswer}>
                <strong>{answered ? item.answer : null}</strong>
              </span>
            </span>
            {waiting ? (
              <span className={styles.intakeWaiting}>
                <Spinner
                  label={`${t(item.label)} ${t("is waiting")}`}
                  size="sm"
                />
                <em>{t("Waiting…")}</em>
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The review itself. One control per row, because a badge column plus a
 * per-row button says the same thing twice; the mark carries the state and
 * the row carries the action.
 */
function IntakeReviewList({
  confirmed,
  items,
  onToggle,
}: {
  confirmed: readonly string[];
  items: readonly IntakeDisplayItem[];
  onToggle: (label: string) => void;
}) {
  const t = useT();

  return (
    <ul className={styles.intakeStatusList}>
      {items.map((item) => {
        const isConfirmed = confirmed.includes(item.label);
        return (
          <li key={item.label}>
            <button
              aria-pressed={isConfirmed}
              className={styles.intakeReviewRow}
              data-confirmed={isConfirmed || undefined}
              onClick={() => onToggle(item.label)}
              type="button"
            >
              <span className={styles.intakeStatusMarker} aria-hidden="true">
                {isConfirmed ? (
                  <CheckIcon className={styles.intakeStatusCheck} size={14} />
                ) : null}
              </span>
              <span className={styles.intakeStatusCopy}>
                <span className={styles.intakeStatusLabel}>{t(item.label)}</span>
                <strong>{item.answer}</strong>
              </span>
              <span className={styles.intakeReviewAction}>
                {isConfirmed ? t("Confirmed") : t("Confirm")}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

type IntakeCardStage = Exclude<
  PatientAcquisitionStage,
  "patients-empty" | "phone-gate" | "intake-form" | "ready-to-order"
>;

/**
 * How the answers came to be trusted. Answers the patient submitted alone are
 * unread until a clinician reads them; answers recorded together already had
 * a clinician in the room, so asking them to confirm the same four lines again
 * is ceremony, not safety. Declining leaves the record honestly empty.
 */
export type IntakeProvenance = "reviewed" | "recorded-together" | "none";

function IntakeStatusCard({
  answeredCount,
  clinicianName,
  confirmed,
  items,
  live,
  onCompleteTogether,
  onConfirmItem,
  onDecline,
  onDone,
  onOrder,
  onReview,
  onReviewed,
  onSend,
  openedLabel,
  patientName,
  provenance,
  stage,
}: {
  answeredCount: number;
  /** Named provenance for the review; no signature or audit contract exists. */
  clinicianName: string;
  confirmed: readonly string[];
  items: readonly IntakeDisplayItem[];
  /**
   * The stage changed while the clinician was watching, so the card
   * choreographs the change. A direct mount renders the settled state.
   */
  live: boolean;
  onCompleteTogether: () => void;
  onConfirmItem: (label: string) => void;
  onDecline: () => void;
  onDone: () => void;
  onOrder: () => void;
  onReview: () => void;
  onReviewed: () => void;
  onSend: () => void;
  openedLabel?: string;
  patientName: string;
  provenance: IntakeProvenance;
  stage: IntakeCardStage;
}) {
  const t = useT();
  const filling = stage === "intake-requested" && answeredCount > 0;
  const reviewing = stage === "intake-review";
  const decided = stage === "next-step";
  const cardState =
    stage === "intake-complete"
      ? "complete"
      : reviewing
        ? "review"
        : decided
          ? "decided"
          : filling
            ? "filling"
            : stage === "intake-requested"
              ? "waiting"
              : "unknown";
  const allConfirmed = confirmed.length === items.length;

  const title = decided
    ? provenance === "reviewed"
      ? t("Intake reviewed")
      : provenance === "recorded-together"
        ? t("Intake recorded with the patient")
        : t("Continuing without intake")
    : reviewing
      ? t("Review patient-reported intake")
      : stage === "intake-complete"
        ? t("Patient-reported intake")
        : filling
          ? `${patientName} ${t("is filling in the intake")}`
          : stage === "intake-requested"
            ? `${t("Intake sent, waiting for")} ${patientName}`
            : stage === "intake-sending"
              ? t("Sending intake link")
              : stage === "intake-error"
                ? t("Intake link was not sent")
                : `${t("Prepare the visit for")} ${patientName}`;

  const description = decided
    ? provenance === "reviewed"
      ? `${t("Reviewed by")} ${clinicianName}`
      : provenance === "recorded-together"
        ? `${t("Recorded by")} ${clinicianName}`
        : t("Allergies, medicines and history stay unknown.")
    : reviewing
      ? `${confirmed.length} ${t("of")} ${items.length} ${t("confirmed")}`
      : stage === "intake-complete"
        ? // Two facts the four answers cannot state on their own: how much
          // arrived, and that nobody clinical has read it yet.
          `${answeredCount} ${t("of")} ${items.length} ${t("questions answered")} · ${t("Not yet reviewed by a clinician")}`
        : filling
          ? `${answeredCount} ${t("of")} ${items.length} ${t("answered")}${openedLabel ? ` · ${t("opened")} ${openedLabel}` : ""}`
          : stage === "intake-error"
            ? t(
                "The patient context is saved. Check the delivery channel, then try again.",
              )
            : t("Collect the information needed for safe care.");

  const listState =
    stage === "intake-complete"
      ? "reported"
      : decided
        ? provenance === "none"
          ? "unknown"
          : "reviewed"
        : filling
          ? "filling"
          : stage === "intake-requested"
            ? "waiting"
            : "unknown";

  // Sending replaces the button that had focus, so focus would otherwise fall
  // back to the document body and the next action would have to be hunted for.
  // Focus moves only when nothing else has claimed it in the meantime.
  const adoptFocusOnArrival = useCallback(
    (node: HTMLButtonElement | null) => {
      if (!node || !live || stage !== "intake-complete") return;
      const owner = node.ownerDocument;
      if (owner.activeElement && owner.activeElement !== owner.body) return;
      node.focus();
    },
    [live, stage],
  );

  return (
    <Card
      className={styles.intakeHandoffCard}
      data-live={live || undefined}
      data-state={cardState}
      variant="outline"
    >
      <CardHeader>
        {/* Sending, waiting and received are announced from one region, so a
            screen reader hears the outcome without moving focus. */}
        <div aria-atomic="true" aria-live="polite">
          <div className={styles.intakeCardHeading} key={cardState}>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {reviewing ? (
          <IntakeReviewList
            confirmed={confirmed}
            items={items}
            onToggle={onConfirmItem}
          />
        ) : (
          <IntakeItemList items={items} state={listState} />
        )}
      </CardContent>
      {filling ? null : (
        <CardFooter className={styles.intakeCardActions}>
          {decided ? (
            <>
              {/* Ordering tests is one clinical option, not the exit. A visit
                  can close with nothing ordered, so the flow can end here. */}
              <Button onClick={onDone} variant="outline">
                {t("Done for now")}
              </Button>
              <Button onClick={onOrder} variant="primary">
                {t("Order lab tests")}
              </Button>
            </>
          ) : reviewing ? (
            <>
              <span
                className={styles.srOnly}
                id="intake-review-incomplete"
              >
                {t("Confirm every answer to finish the review.")}
              </span>
              <Button
                aria-describedby={
                  allConfirmed ? undefined : "intake-review-incomplete"
                }
                disabled={!allConfirmed}
                fullWidth
                onClick={onReviewed}
                variant="primary"
              >
                {t("Mark intake reviewed")}
              </Button>
            </>
          ) : stage === "intake-complete" ? (
            <Button
              fullWidth
              onClick={onReview}
              ref={adoptFocusOnArrival}
              variant="primary"
            >
              {t("Review intake")}
            </Button>
          ) : (
            <>
              {stage === "intake-unknown" ? (
                <Button onClick={onCompleteTogether} variant="primary">
                  {t("Complete with patient")}
                </Button>
              ) : null}
              <Button
                disabled={stage === "intake-sending"}
                onClick={onSend}
                variant={stage === "intake-unknown" ? "outline" : "primary"}
              >
                {stage === "intake-sending" ? (
                  <Spinner label={t("Sending")} showLabel size="sm" />
                ) : stage === "intake-requested" ? (
                  t("Resend")
                ) : stage === "intake-error" ? (
                  t("Try again")
                ) : (
                  t("Send intake link")
                )}
              </Button>
              {/* The third path is a real clinical choice, so it says what it
                  costs instead of being disabled or hidden. */}
              <div className={styles.intakeDecline}>
                <Button onClick={onDecline} size="sm" variant="ghost">
                  {t("Continue without intake")}
                </Button>
                <p>{t("Allergies, medicines and history stay unknown.")}</p>
              </div>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

function IntakeContextWorkspace({
  children,
  expandedSections,
  items,
  onExpandedSectionsChange,
  patient,
  workspace = false,
}: {
  children: ReactNode;
  expandedSections: readonly PatientContextSectionId[];
  items: readonly IntakeDisplayItem[];
  onExpandedSectionsChange: (sections: PatientContextSectionId[]) => void;
  patient: PatientAcquisitionPatient;
  workspace?: boolean;
}) {
  const t = useT();
  const allergyAnswer = items[1]?.answer?.trim();
  const reasonForVisit = items[0]?.answer?.trim();
  const answeredCount = items.filter((item) => item.answer).length;
  const demographics = [
    patientAgeLabel(patient, t),
    t(patient.sexLabel),
    patient.pid,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={styles.intakeContextWorkspace}>
      <PatientContextRail
        className={styles.intakeContextRail}
        patient={{
          demographics,
          initials: initialsFor(patient.name),
          name: patient.name,
          status: patient.status ? t(patient.status) : undefined,
        }}
        readOnly
        expandedSections={expandedSections}
        onExpandedSectionsChange={onExpandedSectionsChange}
        reasonForVisit={reasonForVisit ? [reasonForVisit] : undefined}
        safety={[
          allergyAnswer
            ? {
                label: isNoneAnswer(allergyAnswer)
                  ? t("Patient reports no known allergies")
                  : allergyAnswer,
              }
            : {
                label: t("Allergy status not yet confirmed"),
                detail: t("Confirm during intake."),
              },
        ]}
        safetyNote={
          allergyAnswer
            ? t("Patient reported · not clinically verified")
            : undefined
        }
        sections={patientContextSections(patient, items, t)}
        todaySummary={
          answeredCount > 0
            ? `${answeredCount} ${t("of")} ${items.length} ${t("intake answers received")}`
            : undefined
        }
      />
      <section
        aria-label={
          workspace
            ? t("Patient lab order journey")
            : t("Patient intake status")
        }
        className={styles.intakeContextCanvas}
        data-workspace={workspace || undefined}
      >
        {children}
      </section>
    </div>
  );
}

export type PatientAcquisitionFlowProps = {
  initialStage?: PatientAcquisitionStage;
  /** Restores the patient and exact workflow stage after navigation. */
  initialJourney?: PatientAcquisitionJourneySnapshot;
  /**
   * `overlay` keeps the launcher visible under the canonical phone gate.
   * The acquisition flow takes over only after the number resolves to a patient.
   */
  entryPresentation?: PatientAcquisitionEntryPresentation;
  /** Deterministic patient-reported data for direct complete-state stories. */
  initialIntakeRecord?: PatientIntakeRecord;
  /**
   * Optional Storybook/prototype adapter that simulates the patient replying
   * after a successful send. Without it, the honest target state is waiting.
   */
  demoIntakeRecord?: PatientIntakeRecord;
  intakeSendDelayMs?: number;
  intakeSendResult?: "success" | "error";
  /**
   * What the verified number resolves to. A first-time patient is only one of
   * the outcomes: the same number can already belong to someone, or to a
   * household. Defaults to no match so the empty-clinic journey stays the
   * default reading.
   */
  lookup?: (e164: string) => PhoneLookupResult;
  /**
   * What the patient has answered so far, while the clinic waits. Supplied by
   * the caller rather than derived: the clinic has no live channel into the
   * patient's phone, and inventing one here would claim a capability the
   * platform does not have.
   */
  intakeProgress?: {
    openedLabel: string;
    items: readonly { label: string; answer?: string }[];
  };
  /** Named on the review provenance line. No signer or audit contract exists. */
  clinicianName?: string;
  /** Returns to the surface that launched the phone gate when it is dismissed. */
  onExit?: () => void;
  onJourneyChange?: (journey: PatientAcquisitionJourneySnapshot) => void;
  onReviewResults?: (patientId: string) => void;
  /** Lets a launcher transition only after matching or temporary-patient creation resolves. */
  onPhoneGateResolved?: () => void;
  phoneGateDelayMs?: number;
};

export function PatientAcquisitionFlow({
  clinicianName = "Dr. Phong Tuy",
  demoIntakeRecord,
  entryPresentation = "standalone",
  initialJourney,
  initialStage = "patients-empty",
  initialIntakeRecord,
  intakeProgress,
  intakeSendDelayMs = 300,
  intakeSendResult = "success",
  lookup = () => ({ kind: "no_match" }),
  onExit,
  onJourneyChange,
  onPhoneGateResolved,
  onReviewResults,
  phoneGateDelayMs = 250,
}: PatientAcquisitionFlowProps) {
  const t = useT();
  const restoredStage = initialJourney?.stage ?? initialStage;
  const [stage, setStage] = useState(restoredStage);
  const [patient, setPatient] = useState<PatientAcquisitionPatient | null>(
    initialJourney?.patient ??
      (restoredStage === "patients-empty" || restoredStage === "phone-gate"
        ? null
        : INITIAL_PATIENT),
  );
  const [profileConfirmed, setProfileConfirmed] = useState(
    initialJourney?.profileConfirmed ?? Boolean(initialIntakeRecord),
  );
  const [allergies, setAllergies] = useState(
    initialJourney?.intakeRecord.allergies ??
      initialIntakeRecord?.allergies ??
      "",
  );
  const [medicines, setMedicines] = useState(
    initialJourney?.intakeRecord.medicines ??
      initialIntakeRecord?.medicines ??
      "",
  );
  const [symptoms, setSymptoms] = useState(
    initialJourney?.intakeRecord.reasonForVisit ??
      initialIntakeRecord?.reasonForVisit ??
      "",
  );
  const [familyHistory, setFamilyHistory] = useState(
    initialJourney?.intakeRecord.familyHistory ??
      initialIntakeRecord?.familyHistory ??
      "",
  );
  const [labOrderJourney, setLabOrderJourney] = useState<
    LabOrderJourneySnapshot | undefined
  >(initialJourney?.labOrder);
  // A restored or directly opened stage is already settled; only a send the
  // clinician just triggered earns the transition choreography.
  const [liveSend, setLiveSend] = useState(false);
  /**
   * How this intake was collected. A link the patient answered alone is
   * unread; answers taken together already had a clinician present.
   */
  const [intakeSource, setIntakeSource] = useState<"sent" | "together">("sent");
  /**
   * Per-item confirmations, deliberately not persisted: resuming a half-read
   * review restarts it, and re-reading four answers is never the unsafe move.
   */
  const [confirmedItems, setConfirmedItems] = useState<string[]>([]);
  const emittedJourneyRef = useRef("");
  const [expandedContextSections, setExpandedContextSections] = useState<
    PatientContextSectionId[]
  >(() =>
    restoredStage === "intake-complete" || restoredStage === "ready-to-order"
      ? [...INTAKE_CONTEXT_SECTION_IDS]
      : [],
  );
  const sendTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(sendTimer.current), []);

  useEffect(() => {
    if (!patient || !onJourneyChange) return;
    if (stage === "patients-empty" || stage === "phone-gate") return;
    const next: PatientAcquisitionJourneySnapshot = {
      version: 1,
      patient,
      stage,
      profileConfirmed,
      intakeRecord: {
        allergies,
        familyHistory,
        medicines,
        reasonForVisit: symptoms,
      },
      labOrder: labOrderJourney,
    };
    const serialized = JSON.stringify(next);
    if (serialized === emittedJourneyRef.current) return;
    emittedJourneyRef.current = serialized;
    onJourneyChange(next);
  }, [
    allergies,
    familyHistory,
    labOrderJourney,
    medicines,
    onJourneyChange,
    patient,
    profileConfirmed,
    stage,
    symptoms,
  ]);

  function restart() {
    window.clearTimeout(sendTimer.current);
    setStage("patients-empty");
    setPatient(null);
    setProfileConfirmed(false);
    setAllergies("");
    setMedicines("");
    setSymptoms("");
    setFamilyHistory("");
    setExpandedContextSections([]);
    setLabOrderJourney(undefined);
    setLiveSend(false);
    setIntakeSource("sent");
    setConfirmedItems([]);
  }

  function acceptPatient(outcome: PhoneGateOutcome) {
    if (outcome.kind === "temporary") {
      const sex =
        outcome.draft.sex === "Female"
          ? "F"
          : outcome.draft.sex === "Male"
            ? "M"
            : undefined;
      // An unknown date of birth stays unknown: the record carries the
      // estimated age and no invented date.
      setPatient({
        id: provisionalPatientId(outcome.phone, outcome.draft.name),
        name: outcome.draft.name.trim(),
        sex,
        sexLabel: outcome.draft.sex ?? "Not recorded",
        age: draftAgeYears(outcome.draft),
        dob: draftDob(outcome.draft),
        ageEstimated: outcome.draft.dobUnknown,
        phone: outcome.phone,
        status: "Provisional · PSC verifies",
      });
    } else {
      const sex =
        outcome.patient.sex === "Female"
          ? "F"
          : outcome.patient.sex === "Male"
            ? "M"
            : undefined;
      setPatient({
        id: outcome.patient.patientId,
        name: outcome.patient.name,
        pid: outcome.patient.mrnMasked,
        sex,
        sexLabel: outcome.patient.sex,
        age: outcome.patient.age,
      });
    }
    setStage("intake-unknown");
    onPhoneGateResolved?.();
  }

  function sendIntake() {
    window.clearTimeout(sendTimer.current);
    setIntakeSource("sent");
    setLiveSend(true);
    setStage("intake-sending");
    sendTimer.current = window.setTimeout(() => {
      if (intakeSendResult === "error") {
        setStage("intake-error");
        return;
      }

      if (!demoIntakeRecord) {
        setStage("intake-requested");
        return;
      }

      setProfileConfirmed(true);
      setAllergies(demoIntakeRecord.allergies);
      setMedicines(demoIntakeRecord.medicines);
      setSymptoms(demoIntakeRecord.reasonForVisit);
      setFamilyHistory(demoIntakeRecord.familyHistory);
      setExpandedContextSections([...INTAKE_CONTEXT_SECTION_IDS]);
      setStage("intake-complete");
    }, intakeSendDelayMs);
  }

  const intakeComplete =
    profileConfirmed &&
    allergies.trim().length > 0 &&
    medicines.trim().length > 0 &&
    symptoms.trim().length > 0 &&
    familyHistory.trim().length > 0;

  /** Where a submitted intake lands, and how much trust it carries there. */
  function finishIntakeForm() {
    setExpandedContextSections([...INTAKE_CONTEXT_SECTION_IDS]);
    if (intakeSource === "together") {
      // A clinician took these answers in the room. Asking them to confirm the
      // four lines they just typed is ceremony, so the decision comes next.
      setConfirmedItems([...INTAKE_ITEM_LABELS]);
      setStage("next-step");
      return;
    }
    setStage("intake-complete");
  }

  const intakeProvenance: IntakeProvenance = !intakeComplete
    ? "none"
    : intakeSource === "together"
      ? "recorded-together"
      : "reviewed";

  if (stage === "intake-form" && patient) {
    return (
      <main className={styles.patientIntakePage}>
        <section
          aria-labelledby="patient-intake-title"
          className={styles.patientIntakeSurface}
        >
          <header className={styles.patientIntakeHeader}>
            <strong>Mekong Clinic</strong>
            <span>{t("Health intake")}</span>
          </header>

          <div className={styles.patientIntakeBody}>
            <div className={styles.patientIntakeIntro}>
              <p className={styles.eyebrow}>
                {t("Before your care continues")}
              </p>
              <h1 id="patient-intake-title">
                {t("Tell us about your health")}
              </h1>
              <p>
                {t(
                  "Your care team will review your answers before continuing your care.",
                )}
              </p>
            </div>

            <dl
              aria-label={t("Your details")}
              className={styles.patientIdentity}
            >
              <div>
                <dt>{t("Name")}</dt>
                <dd>{patient.name}</dd>
              </div>
              {/* One field per fact. A record either has a date of birth or
                  an estimated age; a combined row lets an estimate be read
                  back as exact. */}
              <div>
                <dt>{patient.dob ? t("Date of birth") : t("Age")}</dt>
                <dd>{patient.dob ?? patientAgeLabel(patient, t)}</dd>
              </div>
              <div>
                <dt>{t("Sex")}</dt>
                <dd>{t(patient.sexLabel)}</dd>
              </div>
            </dl>

            <form
              className={styles.patientIntakeForm}
              onSubmit={(event) => {
                event.preventDefault();
                if (intakeComplete) finishIntakeForm();
              }}
            >
              <Checkbox
                checked={profileConfirmed}
                onCheckedChange={setProfileConfirmed}
                required
              >
                {t("I confirm these personal details are correct.")}
              </Checkbox>

              <div className={styles.patientIntakeFields}>
                <Input
                  label={t("Allergies")}
                  onChange={(event) => setAllergies(event.target.value)}
                  placeholder={t("Enter allergies or none known")}
                  required
                  value={allergies}
                />
                <Input
                  label={t("Current medicines")}
                  onChange={(event) => setMedicines(event.target.value)}
                  placeholder={t("Enter medicines or none")}
                  required
                  value={medicines}
                />
                <Textarea
                  label={t("Current symptoms")}
                  onChange={(event) => setSymptoms(event.target.value)}
                  placeholder={t("Describe the reason for seeking care")}
                  required
                  value={symptoms}
                />
                <Textarea
                  label={t("Family history")}
                  onChange={(event) => setFamilyHistory(event.target.value)}
                  placeholder={t("Enter relevant family history or none known")}
                  required
                  value={familyHistory}
                />
              </div>

              <div className={styles.patientSubmitArea}>
                {!intakeComplete ? (
                  <p id="patient-intake-submit-reason">
                    {t(
                      "Confirm your details and complete every field to submit.",
                    )}
                  </p>
                ) : null}
                <Button
                  aria-describedby={
                    intakeComplete ? undefined : "patient-intake-submit-reason"
                  }
                  disabled={!intakeComplete}
                  fullWidth
                  type="submit"
                  variant="primary"
                >
                  {t("Submit medical history")}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  if (
    patient &&
    stage !== "patients-empty" &&
    stage !== "phone-gate" &&
    stage !== "intake-form"
  ) {
    const submittedRecord =
      intakeComplete &&
      (stage === "intake-complete" ||
        stage === "intake-review" ||
        stage === "next-step" ||
        stage === "ready-to-order")
        ? {
            allergies,
            familyHistory,
            medicines,
            reasonForVisit: symptoms,
          }
        : undefined;
    const intakeItems = intakeItemsFrom({
      intakeProgress,
      record: submittedRecord,
    });
    const answeredCount = intakeItems.filter((item) => item.answer).length;

    return (
      <IntakeContextWorkspace
        expandedSections={expandedContextSections}
        items={intakeItems}
        onExpandedSectionsChange={setExpandedContextSections}
        patient={patient}
        workspace={stage === "ready-to-order"}
      >
        {stage === "ready-to-order" ? (
          <LabOrderSampleCollectionFlow
            initialJourney={labOrderJourney}
            key={patient.id ?? patient.pid ?? patient.name}
            onClose={() => {
              if (onExit) onExit();
              else setStage("next-step");
            }}
            onJourneyChange={setLabOrderJourney}
            onReviewResults={
              patient.id && onReviewResults ? () => onReviewResults(patient.id!) : undefined
            }
            patient={labOrderPatient(patient)}
            presentation="workspace"
          />
        ) : (
          <IntakeStatusCard
            answeredCount={answeredCount}
            clinicianName={clinicianName}
            confirmed={confirmedItems}
            items={intakeItems}
            live={liveSend}
            onCompleteTogether={() => {
              setIntakeSource("together");
              setStage("intake-form");
            }}
            onConfirmItem={(label) =>
              setConfirmedItems((previous) =>
                previous.includes(label)
                  ? previous.filter((entry) => entry !== label)
                  : [...previous, label],
              )
            }
            onDecline={() => setStage("next-step")}
            onDone={() => {
              if (onExit) onExit();
              else restart();
            }}
            onOrder={() => setStage("ready-to-order")}
            onReview={() => setStage("intake-review")}
            onReviewed={() => setStage("next-step")}
            onSend={sendIntake}
            openedLabel={intakeProgress?.openedLabel}
            patientName={patient.name}
            provenance={intakeProvenance}
            stage={stage}
          />
        )}
      </IntakeContextWorkspace>
    );
  }

  const phoneGate = (
    <PhoneGateModal
      createDelayMs={phoneGateDelayMs}
      duplicateCheckDelayMs={phoneGateDelayMs}
      lookup={lookup}
      onClose={(reason) => {
        if (reason !== "dismissed") return;
        if (onExit) {
          onExit();
          return;
        }
        setStage("patients-empty");
      }}
      onOutcome={acceptPatient}
      open={stage === "phone-gate"}
      verificationDelayMs={phoneGateDelayMs}
    />
  );

  if (stage === "phone-gate" && entryPresentation === "overlay") {
    return phoneGate;
  }

  return (
    <CareLoopFrame onRestart={restart} title="Add a patient">
      {stage === "patients-empty" || stage === "phone-gate" ? (
        <Card className={styles.primaryCard} variant="outline">
          <EmptyState surface="plain">
            <EmptyStateHeader>
              <EmptyStateTitle>{t("Add your first patient")}</EmptyStateTitle>
              <EmptyStateDescription>
                {t("Enter a contact number to get started.")}
              </EmptyStateDescription>
            </EmptyStateHeader>
            <EmptyStateContent>
              <Button onClick={() => setStage("phone-gate")} variant="primary">
                {t("Enter contact number")}
              </Button>
            </EmptyStateContent>
          </EmptyState>
          {phoneGate}
        </Card>
      ) : null}
    </CareLoopFrame>
  );
}
