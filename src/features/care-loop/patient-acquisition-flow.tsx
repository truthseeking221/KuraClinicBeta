"use client";

import { useEffect, useRef, useState } from "react";
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
import type { PhoneGateOutcome, PhoneLookupResult } from "../phone-gate/logic";
import { PatientContextRail } from "../patient-context/patient-context-rail";
import type {
  PatientContextSection,
  PatientContextSectionId,
} from "../patient-context/patient-context-rail";

import { CareLoopFrame } from "./care-loop-frame";
import { LabOrderSampleCollectionFlow } from "./lab-order-collection-flow";
import { CARE_LOOP_PATIENT, type CareLoopPatientManifest } from "./demo-data";
import styles from "./care-loop.module.css";

export type PatientAcquisitionStage =
  | "patients-empty"
  | "phone-gate"
  | "intake-unknown"
  | "intake-sending"
  | "intake-error"
  | "intake-requested"
  | "intake-form"
  | "intake-complete"
  | "ready-to-order";

/** Where the phone gate appears before a patient has been resolved. */
export type PatientAcquisitionEntryPresentation = "standalone" | "overlay";

type FlowPatient = {
  id?: string;
  name: string;
  pid?: string;
  sex?: "F" | "M";
  sexLabel: string;
  age?: number;
  dob?: string;
  dobOrAge: string;
  phone?: string;
  status?: string;
};

export type PatientIntakeRecord = {
  reasonForVisit: string;
  allergies: string;
  medicines: string;
  familyHistory: string;
};

const INITIAL_PATIENT: FlowPatient = {
  id: CARE_LOOP_PATIENT.id,
  name: CARE_LOOP_PATIENT.name,
  pid: CARE_LOOP_PATIENT.pid,
  sex: CARE_LOOP_PATIENT.sex,
  sexLabel: CARE_LOOP_PATIENT.sexLabel,
  age: CARE_LOOP_PATIENT.age,
  dob: CARE_LOOP_PATIENT.dob,
  dobOrAge: `${CARE_LOOP_PATIENT.age} years`,
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

function ageFrom(value: string) {
  const age = Number.parseInt(value, 10);
  return Number.isFinite(age) ? age : 0;
}

function labOrderPatient(patient: FlowPatient): CareLoopPatientManifest {
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
    age: patient.age ?? ageFrom(patient.dobOrAge),
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
  patient: FlowPatient,
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

function IntakeItemList({
  items,
  state,
}: {
  items: readonly IntakeDisplayItem[];
  state: "unknown" | "waiting" | "filling" | "complete";
}) {
  const t = useT();

  return (
    <ol className={styles.intakeStatusList}>
      {items.map((item, index) => {
        const answered = Boolean(item.answer);
        const complete =
          state === "complete" || (state === "filling" && answered);
        const waiting =
          state === "waiting" || (state === "filling" && !answered);

        return (
          <li
            className={styles.intakeStatusRow}
            data-answered={complete || undefined}
            key={item.label}
          >
            <span className={styles.intakeStatusMarker} aria-hidden="true">
              {complete ? <CheckIcon size={14} /> : index + 1}
            </span>
            <span className={styles.intakeStatusCopy}>
              <span className={styles.intakeStatusLabel}>{t(item.label)}</span>
              {answered ? <strong>{item.answer}</strong> : null}
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

function UnavailableSkipAction() {
  const t = useT();

  return (
    <>
      <Button
        aria-describedby="intake-skip-unavailable"
        disabled
        variant="outline"
      >
        {t("Skip for now")}
      </Button>
      <span className={styles.srOnly} id="intake-skip-unavailable">
        {t("Skipping intake is not connected to the current backend contract.")}
      </span>
    </>
  );
}

function IntakeStatusCard({
  answeredCount,
  items,
  openedLabel,
  patientName,
  stage,
  onOrder,
  onSend,
}: {
  answeredCount: number;
  items: readonly IntakeDisplayItem[];
  openedLabel?: string;
  patientName: string;
  stage: Exclude<
    PatientAcquisitionStage,
    "patients-empty" | "phone-gate" | "intake-form" | "ready-to-order"
  >;
  onOrder: () => void;
  onSend: () => void;
}) {
  const t = useT();
  const filling = stage === "intake-requested" && answeredCount > 0;
  const cardState =
    stage === "intake-complete"
      ? "complete"
      : filling
        ? "filling"
        : stage === "intake-requested"
          ? "waiting"
          : "unknown";

  const title =
    stage === "intake-complete"
      ? `${t("Intake received for")} ${patientName}`
      : filling
        ? `${patientName} ${t("is filling in the intake")}`
        : stage === "intake-requested"
          ? `${t("Intake sent, waiting for")} ${patientName}`
          : stage === "intake-sending"
            ? t("Sending intake link")
            : stage === "intake-error"
              ? t("Intake link was not sent")
              : `${t("We don’t know enough about")} ${patientName} ${t("yet")}`;

  const description =
    stage === "intake-complete"
      ? t("4 of 4 answered. Confirm what matters during the visit.")
      : filling
        ? `${answeredCount} ${t("of")} ${items.length} ${t("answered")}${openedLabel ? ` · ${t("opened")} ${openedLabel}` : ""}`
        : stage === "intake-error"
          ? t(
              "The patient context is saved. Check the delivery channel, then try again.",
            )
          : t(
              "Help the patient complete their medical history before the visit, so the clinical conversation can focus on care.",
            );

  const listState =
    stage === "intake-complete"
      ? "complete"
      : filling
        ? "filling"
        : stage === "intake-requested"
          ? "waiting"
          : "unknown";

  return (
    <Card
      className={styles.intakeHandoffCard}
      data-state={cardState}
      variant="outline"
    >
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <IntakeItemList items={items} state={listState} />
      </CardContent>
      {filling ? null : (
        <CardFooter className={styles.intakeCardActions}>
          {stage === "intake-complete" ? (
            <Button fullWidth onClick={onOrder} variant="primary">
              {t("Order baseline tests")}
            </Button>
          ) : (
            <>
              <UnavailableSkipAction />
              <Button
                disabled={stage === "intake-sending"}
                onClick={onSend}
                variant="primary"
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
  patient: FlowPatient;
  workspace?: boolean;
}) {
  const t = useT();
  const allergyAnswer = items[1]?.answer?.trim();
  const reasonForVisit = items[0]?.answer?.trim();
  const answeredCount = items.filter((item) => item.answer).length;
  const demographics = [patient.dobOrAge, t(patient.sexLabel), patient.pid]
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
  /** Returns to the surface that launched the phone gate when it is dismissed. */
  onExit?: () => void;
  /** Lets a launcher transition only after matching or temporary-patient creation resolves. */
  onPhoneGateResolved?: () => void;
  phoneGateDelayMs?: number;
};

export function PatientAcquisitionFlow({
  demoIntakeRecord,
  entryPresentation = "standalone",
  initialStage = "patients-empty",
  initialIntakeRecord,
  intakeProgress,
  intakeSendDelayMs = 300,
  intakeSendResult = "success",
  lookup = () => ({ kind: "no_match" }),
  onExit,
  onPhoneGateResolved,
  phoneGateDelayMs = 250,
}: PatientAcquisitionFlowProps) {
  const t = useT();
  const [stage, setStage] = useState(initialStage);
  const [patient, setPatient] = useState<FlowPatient | null>(
    initialStage === "patients-empty" || initialStage === "phone-gate"
      ? null
      : INITIAL_PATIENT,
  );
  const [profileConfirmed, setProfileConfirmed] = useState(
    Boolean(initialIntakeRecord),
  );
  const [allergies, setAllergies] = useState(
    initialIntakeRecord?.allergies ?? "",
  );
  const [medicines, setMedicines] = useState(
    initialIntakeRecord?.medicines ?? "",
  );
  const [symptoms, setSymptoms] = useState(
    initialIntakeRecord?.reasonForVisit ?? "",
  );
  const [familyHistory, setFamilyHistory] = useState(
    initialIntakeRecord?.familyHistory ?? "",
  );
  const [expandedContextSections, setExpandedContextSections] = useState<
    PatientContextSectionId[]
  >(() =>
    initialStage === "intake-complete" || initialStage === "ready-to-order"
      ? [...INTAKE_CONTEXT_SECTION_IDS]
      : [],
  );
  const sendTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(sendTimer.current), []);

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
  }

  function acceptPatient(outcome: PhoneGateOutcome) {
    if (outcome.kind === "temporary") {
      const sex =
        outcome.draft.sex === "Female"
          ? "F"
          : outcome.draft.sex === "Male"
            ? "M"
            : undefined;
      const dob = /^\d{4}-\d{2}-\d{2}$/.test(outcome.draft.dobOrAge.trim())
        ? outcome.draft.dobOrAge.trim()
        : undefined;
      setPatient({
        name: outcome.draft.name.trim(),
        sex,
        sexLabel: outcome.draft.sex ?? "Not recorded",
        age: ageFrom(outcome.draft.dobOrAge),
        dob,
        dobOrAge: outcome.draft.dobOrAge.trim(),
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
        dobOrAge: `${outcome.patient.age} years`,
      });
    }
    setStage("intake-unknown");
    onPhoneGateResolved?.();
  }

  function sendIntake() {
    window.clearTimeout(sendTimer.current);
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
              <div>
                <dt>{t("Date of birth or age")}</dt>
                <dd>{patient.dobOrAge}</dd>
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
                if (intakeComplete) {
                  setExpandedContextSections([...INTAKE_CONTEXT_SECTION_IDS]);
                  setStage("intake-complete");
                }
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
      stage === "intake-complete" || stage === "ready-to-order"
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
            key={patient.id ?? patient.pid ?? patient.name}
            onClose={() => setStage("intake-complete")}
            patient={labOrderPatient(patient)}
            presentation="workspace"
          />
        ) : (
          <IntakeStatusCard
            answeredCount={answeredCount}
            items={intakeItems}
            openedLabel={intakeProgress?.openedLabel}
            onOrder={() => setStage("ready-to-order")}
            onSend={sendIntake}
            patientName={patient.name}
            stage={stage}
          />
        )}
      </IntakeContextWorkspace>
    );
  }

  const phoneGate = (
    <PhoneGateModal
      createDelayMs={phoneGateDelayMs}
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
