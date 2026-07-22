"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CloseButton,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../../components/ui";
import { CameraIcon, CheckIcon, QrCodeIcon } from "../../components/ui/icons";
import { useT } from "../../components/foundations/i18n";
import { DrawWorksheet } from "../collection/draw-worksheet";
import { ScanGate } from "../collection/scan-gate";
import { TubeLabeling } from "../collection/tube-labeling";
import { TUBE_CATALOG } from "../collection/catalog";
import type {
  Sample,
  TubeLabelMethod,
  TubeLabelPhotoCheck,
} from "../collection/types";
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from "../lab-catalog/demo-data";
import { LabTestPicker } from "../lab-catalog/lab-test-picker";
import {
  doctorWorkflow,
  earningsForItems,
  receptionistWorkflow,
} from "../order-cart/demo-data";
import { OrderCart } from "../order-cart/order-cart";
import type {
  CollectionDecisions,
  DoctorOrderCartWorkflow,
  ReceptionistOrderCartWorkflow,
} from "../order-cart/types";

import { CareLoopFrame } from "./care-loop-frame";
import {
  LabJourneyProgress,
  labJourneyStatusFromCollectionStage,
} from "./lab-journey-progress";
import {
  CARE_LOOP_CART_ITEMS,
  CARE_LOOP_LINE_ECONOMICS,
  CARE_LOOP_NOW,
  CARE_LOOP_OPERATOR,
  CARE_LOOP_PATIENT,
  careLoopCollectionPatient,
  careLoopCart,
  careLoopTubeLabelLine,
  type CareLoopPatientManifest,
} from "./demo-data";
import styles from "./care-loop.module.css";

export type LabOrderCollectionStage =
  | "ordering"
  | "prepare-tubes"
  | "payment"
  | "scan"
  | "draw"
  /** Self-draw route: the doctor drew, so the tubes are labelled in the room. */
  | "label-tubes"
  | "verify-labels"
  /** Home route: the visit is booked and nothing physical exists yet. */
  | "home-visit-booked"
  | "handoff"
  | "label-mismatch"
  | "ready-for-pickup"
  | "pickup-delayed"
  | "courier-assigned"
  | "in-transit"
  | "received-at-lab"
  | "processing"
  | "partial-results"
  /** Backward-compatible Storybook fixture; rendered as in transit. */
  | "awaiting-results";

export type LabOrderRoute = "psc" | "self" | "home";

export type LabOrderPlaced = {
  orderId: string;
  selectedTestIds: readonly string[];
};

export type LabOrderJourneySnapshot = {
  orderId: string;
  stage: LabOrderCollectionStage;
  selectedTestIds: readonly string[];
  decisions: CollectionDecisions;
  labelMethod: TubeLabelMethod;
  labelPhotoChecks: TubeLabelPhotoCheck;
  capturedTubeIds: readonly string[];
  pickupRound: string;
  labelsChecked: boolean;
  countChecked: boolean;
  bagSealed: boolean;
  resulted?: number;
  total?: number;
  flagged?: number;
};

export type LabOrderSampleCollectionFlowProps = {
  initialStage?: LabOrderCollectionStage;
  /** Restores a previously saved journey instead of starting a new order. */
  initialJourney?: LabOrderJourneySnapshot;
  /** Opens the flow on one of the three service routes. */
  initialDecisions?: CollectionDecisions;
  /** One immutable patient manifest carried through order, draw, labels, and handoff. */
  patient?: CareLoopPatientManifest;
  /** Workspace mode keeps the patient chart or intake rail as the owning shell. */
  presentation?: "standalone" | "workspace";
  onClose?: () => void;
  onJourneyChange?: (journey: LabOrderJourneySnapshot) => void;
  onOrderPlaced?: (order: LabOrderPlaced) => void;
  onReviewResults?: () => void;
};

const ROUTE_STAGES = {
  psc: [
    { label: "Order tests", actor: "Doctor" },
    { label: "Payment and check-in", actor: "Receptionist" },
    { label: "Positive ID and draw", actor: "Phlebotomist" },
    { label: "Label samples", actor: "Phlebotomist" },
    { label: "Handoff", actor: "Clinic and courier" },
    { label: "Await lab receipt", actor: "Clinic" },
  ],
  self: [
    { label: "Order tests", actor: "Doctor" },
    { label: "Collect", actor: "Doctor" },
    { label: "Label", actor: "Doctor" },
    { label: "Verify labels", actor: "Doctor" },
    { label: "Sample Pick-Up", actor: "Clinic and courier" },
  ],
  home: [
    { label: "Order tests", actor: "Doctor" },
    { label: "Book home visit", actor: "Kura" },
    { label: "Positive ID and draw", actor: "Kura phlebotomist" },
    { label: "Label samples", actor: "Kura phlebotomist" },
    { label: "Handoff", actor: "Clinic and courier" },
    { label: "Await lab receipt", actor: "Clinic" },
  ],
} as const;

const PICKUP_ROUNDS = [
  { value: "10:30", label: "10:30 · Morning pickup" },
  { value: "14:00", label: "14:00 · Afternoon pickup" },
  { value: "17:30", label: "17:30 · Final pickup" },
];

const SELF_PICKUP_ROUNDS = [
  { value: "14:30", label: "2:30 PM", detail: "Courier 2:25–2:45 PM" },
  { value: "16:30", label: "4:30 PM", detail: "Courier 4:25–4:45 PM" },
  {
    value: "tomorrow-09:00",
    label: "Tomorrow 9:00 AM",
    detail: "Courier 8:55–9:15 AM",
  },
] as const;

const LOGISTICS_STAGES: readonly LabOrderCollectionStage[] = [
  "ready-for-pickup",
  "pickup-delayed",
  "courier-assigned",
  "in-transit",
  "received-at-lab",
  "processing",
  "partial-results",
  "awaiting-results",
];

function isLogisticsStage(stage: LabOrderCollectionStage) {
  return LOGISTICS_STAGES.includes(stage);
}

function routeFor(decisions: CollectionDecisions): LabOrderRoute {
  if (decisions.collectBy === "self") return "self";
  if (decisions.drawSite === "patient-home") return "home";
  return "psc";
}

function stepFor(stage: LabOrderCollectionStage, route: LabOrderRoute) {
  if (stage === "ordering") return 1;
  if (route === "psc") {
    if (stage === "payment") return 2;
    if (stage === "scan" || stage === "draw") return 3;
    if (stage === "label-tubes") return 4;
    if (
      stage === "handoff" ||
      stage === "label-mismatch" ||
      isLogisticsStage(stage)
    )
      return 5;
    return 6;
  }
  if (route === "home") {
    if (stage === "home-visit-booked") return 2;
    if (stage === "scan" || stage === "draw") return 3;
    if (stage === "label-tubes") return 4;
    if (
      stage === "handoff" ||
      stage === "label-mismatch" ||
      isLogisticsStage(stage)
    )
      return 5;
    return 6;
  }
  if (stage === "prepare-tubes") return 2;
  if (stage === "label-tubes") return 3;
  if (stage === "verify-labels") return 4;
  if (stage === "scan" || stage === "draw") return 2;
  if (
    stage === "handoff" ||
    stage === "label-mismatch" ||
    isLogisticsStage(stage)
  )
    return 5;
  return 5;
}

function actorFor(stage: LabOrderCollectionStage, route: LabOrderRoute) {
  if (stage === "ordering") return "Doctor";
  if (stage === "prepare-tubes" || stage === "verify-labels") return "Doctor";
  if (stage === "payment") return "Receptionist";
  if (stage === "home-visit-booked") return "Kura phlebotomist";
  if (stage === "scan" || stage === "draw" || stage === "label-tubes") {
    if (route === "self") return "Doctor";
    return route === "home" ? "Kura phlebotomist" : "Phlebotomist";
  }
  if (stage === "handoff" || stage === "label-mismatch") return "Collector";
  if (isLogisticsStage(stage)) {
    return "Clinic and courier";
  }
  return "Clinic";
}

function initialDoctorWorkflow(
  decisions: CollectionDecisions = {
    collectBy: "self",
    payment: "pay-now",
  },
): DoctorOrderCartWorkflow {
  return doctorWorkflow({ decisions, panel: "summary" });
}

/**
 * Where the order goes once it is placed. The three service routes diverge
 * here and nowhere else: who holds the needle decides who does the next step,
 * and whether a sample exists at all yet.
 */
function stageAfterOrdering(
  decisions: CollectionDecisions,
): LabOrderCollectionStage {
  if (decisions.collectBy === "self") return "prepare-tubes";
  if (decisions.drawSite === "patient-home") return "home-visit-booked";
  return "payment";
}

const DOCTOR_COLLECTION_STEPS = [
  "Collect",
  "Label",
  "Verify labels",
  "Sample Pick-Up",
] as const;

function workspaceTitle(stage: LabOrderCollectionStage, route: LabOrderRoute) {
  if (stage === "ordering") return "Lab order";
  if (route !== "self") return "Lab order";
  if (stage === "prepare-tubes") return "Prepare collection tubes";
  if (stage === "label-tubes") return "Label collected samples";
  if (stage === "verify-labels") return "Capture photos for label verification";
  if (
    stage === "handoff" ||
    isLogisticsStage(stage)
  ) {
    return isLogisticsStage(stage) ? "Sample progress" : "Prepare samples for pickup";
  }
  return "Lab order";
}

function DoctorCollectionStepper({ value }: { value: number }) {
  const t = useT();

  return (
    <Stepper mode="status" value={value}>
      <StepperNav aria-label={t("Sample preparation progress")}>
        {DOCTOR_COLLECTION_STEPS.map((label, index) => (
          <StepperItem key={label} step={index + 1}>
            <StepperTrigger asChild>
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle>{t(label)}</StepperTitle>
            </StepperTrigger>
            {index < DOCTOR_COLLECTION_STEPS.length - 1 ? (
              <StepperSeparator />
            ) : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}

function LabOrderFlowShell({
  actor,
  children,
  currentStep,
  onClose,
  onRestart,
  patient,
  presentation,
  route,
  stage,
  stages,
}: {
  actor: string;
  children: ReactNode;
  currentStep: number;
  onClose?: () => void;
  onRestart: () => void;
  patient: CareLoopPatientManifest;
  presentation: "standalone" | "workspace";
  route: LabOrderRoute;
  stage: LabOrderCollectionStage;
  stages: readonly { label: string; actor: string }[];
}) {
  const t = useT();
  const title = workspaceTitle(stage, route);

  if (presentation === "standalone") {
    return (
      <CareLoopFrame
        actor={actor}
        currentStep={currentStep}
        onRestart={onRestart}
        patient={{
          name: patient.name,
          pid: patient.pid ?? "Pending verification",
          detail: patient.orderId,
        }}
        stages={[...stages]}
        title={title}
      >
        {children}
      </CareLoopFrame>
    );
  }

  const activeStage = stages[currentStep - 1];
  return (
    <section
      aria-labelledby="lab-order-workspace-title"
      className={styles.labOrderWorkspace}
    >
      <header className={styles.labOrderWorkspaceHeader}>
        <div className={styles.labOrderWorkspaceHeading}>
          <div>
            {stage === "ordering" ? (
              <p className={styles.eyebrow}>{t(actor)}</p>
            ) : null}
            <h2 id="lab-order-workspace-title">{t(title)}</h2>
            {route === "self" && stage !== "ordering" ? (
              <p className={styles.labOrderWorkspaceMeta}>
                {patient.name} · {patient.pid ?? t("Pending verification")} ·{" "}
                {patient.orderId}
              </p>
            ) : null}
          </div>
          {onClose ? (
            <CloseButton
              aria-label={t("Close lab order journey")}
              onClick={onClose}
              size="sm"
            />
          ) : null}
        </div>
        {isLogisticsStage(stage) ? null : route === "self" && stage !== "ordering" ? (
          <DoctorCollectionStepper value={Math.max(1, currentStep - 1)} />
        ) : (
          <Progress
            aria-label={`${t("Step")} ${currentStep} ${t("of")} ${stages.length}: ${t(activeStage.label)}`}
            label={`${t(activeStage.label)} · ${t("Step")} ${currentStep} ${t("of")} ${stages.length}`}
            max={stages.length}
            size="sm"
            value={currentStep}
          />
        )}
      </header>
      <div className={styles.labOrderWorkspaceContent}>{children}</div>
    </section>
  );
}

function initialReceptionWorkflow(): ReceptionistOrderCartWorkflow {
  return receptionistWorkflow({
    origin: "doctor-order",
    permissions: {
      editClinicalItems: false,
      collectPayment: true,
      checkIn: true,
    },
  });
}

function samplesForSelectedTests(
  availableSamples: readonly Sample[],
  selectedTestIds: readonly string[],
) {
  if (selectedTestIds.length === 0) return [...availableSamples];
  const selectedNames = new Set(
    CARE_LOOP_CART_ITEMS.filter((item) => selectedTestIds.includes(item.id)).map(
      (item) => item.name,
    ),
  );
  return availableSamples
    .map((sample) => ({
      ...sample,
      tests: sample.tests.filter((test) => selectedNames.has(test)),
    }))
    .filter((sample) => sample.tests.length > 0);
}

export function LabOrderSampleCollectionFlow({
  initialDecisions,
  initialJourney,
  initialStage = "ordering",
  onClose,
  onJourneyChange,
  onOrderPlaced,
  onReviewResults,
  patient = CARE_LOOP_PATIENT,
  presentation = "standalone",
}: LabOrderSampleCollectionFlowProps) {
  const t = useT();
  const collectionPatient = useMemo(
    () => careLoopCollectionPatient(patient),
    [patient],
  );
  // v1 prototypes incorrectly put Front Desk identity verification inside the
  // doctor journey. Resume those saved sessions at the first doctor-owned step.
  const legacyIdentityGuard =
    (initialJourney?.stage as string | undefined) === "identity-required" ||
    (initialStage as string) === "identity-required";
  const restoredStage = legacyIdentityGuard
    ? "prepare-tubes"
    : (initialJourney?.stage ?? initialStage);
  const [stage, setStage] = useState(restoredStage);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>(
    initialJourney ? [...initialJourney.selectedTestIds] : [],
  );
  const [doctor, setDoctor] = useState<DoctorOrderCartWorkflow>(() =>
    initialDoctorWorkflow(
      legacyIdentityGuard
        ? { collectBy: "self", payment: "pay-now" }
        : (initialJourney?.decisions ?? initialDecisions),
    ),
  );
  const [reception, setReception] = useState<ReceptionistOrderCartWorkflow>(
    initialReceptionWorkflow,
  );
  const [samples, setSamples] = useState<Sample[]>(() =>
    samplesForSelectedTests(
      collectionPatient.samples,
      initialJourney?.selectedTestIds ?? [],
    ),
  );
  const [patientLoaded, setPatientLoaded] = useState(
    restoredStage === "draw" ||
      restoredStage === "handoff" ||
      restoredStage === "label-tubes" ||
      restoredStage === "label-mismatch" ||
      isLogisticsStage(restoredStage),
  );
  const orderPlacedRef = useRef(false);
  const [labelMethod, setLabelMethod] = useState<TubeLabelMethod>(
    initialJourney?.labelMethod ?? "sticker",
  );
  const [labelPhotoChecks, setLabelPhotoChecks] = useState<TubeLabelPhotoCheck>(
    initialJourney?.labelPhotoChecks ?? {
      applied: false,
      readable: false,
      photographed: false,
    },
  );
  const [photoChecklistOpen, setPhotoChecklistOpen] = useState(false);
  const [capturedTubeIds, setCapturedTubeIds] = useState<string[]>(
    initialJourney ? [...initialJourney.capturedTubeIds] : [],
  );
  const [pickupRound, setPickupRound] = useState(initialJourney?.pickupRound ?? "");
  const [labelsChecked, setLabelsChecked] = useState(initialJourney?.labelsChecked ?? false);
  const [countChecked, setCountChecked] = useState(initialJourney?.countChecked ?? false);
  const [bagSealed, setBagSealed] = useState(initialJourney?.bagSealed ?? false);
  const emittedJourneyRef = useRef("");

  const selectedItems = useMemo(
    () =>
      CARE_LOOP_CART_ITEMS.filter((item) => selectedTestIds.includes(item.id)),
    [selectedTestIds],
  );
  const plannedSamples = useMemo(() => {
    return samplesForSelectedTests(collectionPatient.samples, selectedTestIds);
  }, [collectionPatient.samples, selectedTestIds]);
  const plannedTestNames = useMemo(
    () => new Set(collectionPatient.samples.flatMap((sample) => sample.tests)),
    [collectionPatient.samples],
  );
  const testsWithoutTubePlan = useMemo(
    () => selectedItems.filter((item) => !plannedTestNames.has(item.name)),
    [plannedTestNames, selectedItems],
  );
  const cart = useMemo(
    () => careLoopCart(selectedItems, patient),
    [patient, selectedItems],
  );
  const doctorForCart = useMemo(() => {
    const withEarnings =
      !doctor.earnings || cart.pricing.state === "error"
        ? doctor
        : {
            ...doctor,
            earnings: earningsForItems(selectedItems, CARE_LOOP_LINE_ECONOMICS),
          };
    if (testsWithoutTubePlan.length === 0) return withEarnings;
    const names = testsWithoutTubePlan.map((item) => item.name).join(", ");
    return {
      ...withEarnings,
      blockers: [
        ...withEarnings.blockers.filter((blocker) => blocker.id !== "tube-plan-unavailable"),
        {
          id: "tube-plan-unavailable",
          label: `Tube requirements are not available for ${names}`,
          recovery: "Remove these tests before continuing.",
          tone: "warning" as const,
        },
      ],
    };
  }, [cart.pricing.state, doctor, selectedItems, testsWithoutTubePlan]);
  const route = routeFor(doctor.decisions);
  const stages = ROUTE_STAGES[route];
  const currentStep = stepFor(stage, route);

  useEffect(() => {
    if (!onJourneyChange) return;
    const next: LabOrderJourneySnapshot = {
      orderId: patient.orderId,
      stage,
      selectedTestIds,
      decisions: doctor.decisions,
      labelMethod,
      labelPhotoChecks,
      capturedTubeIds,
      pickupRound,
      labelsChecked,
      countChecked,
      bagSealed,
      resulted: initialJourney?.resulted,
      total: initialJourney?.total,
      flagged: initialJourney?.flagged,
    };
    const serialized = JSON.stringify(next);
    if (serialized === emittedJourneyRef.current) return;
    emittedJourneyRef.current = serialized;
    onJourneyChange(next);
  }, [
    bagSealed,
    capturedTubeIds,
    countChecked,
    doctor.decisions,
    initialJourney?.flagged,
    initialJourney?.resulted,
    initialJourney?.total,
    labelMethod,
    labelPhotoChecks,
    labelsChecked,
    onJourneyChange,
    patient.orderId,
    pickupRound,
    selectedTestIds,
    stage,
  ]);

  function restart() {
    setStage("ordering");
    setSelectedTestIds([]);
    setDoctor(initialDoctorWorkflow(initialDecisions));
    setReception(initialReceptionWorkflow());
    setSamples(collectionPatient.samples);
    setPatientLoaded(false);
    setLabelMethod("sticker");
    setLabelPhotoChecks({
      applied: false,
      readable: false,
      photographed: false,
    });
    setPhotoChecklistOpen(false);
    setCapturedTubeIds([]);
    setPickupRound("");
    setLabelsChecked(false);
    setCountChecked(false);
    setBagSealed(false);
    orderPlacedRef.current = false;
  }

  function placeOrderAndContinue() {
    if (testsWithoutTubePlan.length > 0) return;
    if (!orderPlacedRef.current) {
      onOrderPlaced?.({ orderId: patient.orderId, selectedTestIds });
      orderPlacedRef.current = true;
    }
    setSamples(plannedSamples);
    const nextStage = stageAfterOrdering(doctor.decisions);
    setStage(nextStage);
  }

  function beginCollection() {
    setStage("scan");
  }

  const handoffComplete = Boolean(
    pickupRound && labelsChecked && countChecked && bagSealed,
  );
  const logisticsStatus = labJourneyStatusFromCollectionStage(stage);
  const courierEtaLabel =
    pickupRound === "14:30"
      ? "2:25–2:45 PM"
      : pickupRound === "16:30"
        ? "4:25–4:45 PM"
        : pickupRound === "tomorrow-09:00"
          ? "tomorrow, 8:55–9:15 AM"
          : undefined;

  return (
    <LabOrderFlowShell
      actor={actorFor(stage, route)}
      currentStep={currentStep}
      onClose={onClose}
      onRestart={restart}
      patient={patient}
      presentation={presentation}
      route={route}
      stage={stage}
      stages={stages}
    >
      {stage === "ordering" ? (
        <div className={styles.orderGrid}>
          <section
            aria-label={t("Test catalog")}
            className={styles.catalogPanel}
          >
            <LabTestPicker
              categories={LAB_CATALOG_CATEGORIES}
              onSelectedTestIdsChange={setSelectedTestIds}
              selectedTestIds={selectedTestIds}
              tests={LAB_CATALOG_TESTS}
              totalCount={67}
            />
          </section>
          <OrderCart
            cart={cart}
            onAttestChange={(attested) =>
              setDoctor((current) => ({ ...current, attested }))
            }
            onClear={() => setSelectedTestIds([])}
            onDecisionsChange={(decisions) =>
              setDoctor((current) => ({ ...current, decisions }))
            }
            onPanelChange={(panel) =>
              setDoctor((current) => ({ ...current, panel }))
            }
            onPrimaryAction={placeOrderAndContinue}
            onRemoveItem={(itemId) =>
              setSelectedTestIds((current) =>
                current.filter((id) => id !== itemId),
              )
            }
            workflow={doctorForCart}
          />
        </div>
      ) : null}

      {stage === "payment" ? (
        <div className={styles.singleRail}>
          <section className={styles.stageIntro}>
            <p className={styles.eyebrow}>{t("Receptionist")}</p>
            <h2>{t("Collect payment and check in")}</h2>
            <p>
              {t(
                "The doctor-authored tests are locked. Reception records the tender and confirms check-in without changing clinical intent.",
              )}
            </p>
          </section>
          <OrderCart
            cart={cart}
            onAttestChange={(attested) =>
              setReception((current) => ({ ...current, attested }))
            }
            onMethodChange={(method) =>
              setReception((current) => ({ ...current, method }))
            }
            onPanelChange={(panel) =>
              setReception((current) => ({ ...current, panel }))
            }
            onPrimaryAction={beginCollection}
            workflow={reception}
          />
        </div>
      ) : null}

      {stage === "home-visit-booked" ? (
        <div className={styles.singleRail}>
          <section className={styles.stageIntro}>
            <p className={styles.eyebrow}>{t("Kura phlebotomist")}</p>
            <h2>{t("Home visit booked")}</h2>
            <p>
              {t(
                "A Kura phlebotomist travels to the patient. No sample exists yet, and the order stays awaiting collection until the visit happens.",
              )}
            </p>
          </section>
          <Card className={styles.handoffCard} variant="outline">
            <CardHeader>
              <div>
                <Badge size="sm" variant="info">
                  {t("Awaiting collection")}
                </Badge>
                <CardTitle>{t("Visit scheduled with the patient")}</CardTitle>
                <CardDescription>
                  {t(
                    "The patient keeps the booking code. Payment is settled at the visit, so a booked home visit is not a paid one.",
                  )}
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button onClick={beginCollection} variant="primary">
                {t("Phlebotomist arrived, start the draw")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}

      {stage === "prepare-tubes" ? (
        <div className={styles.workflowRail}>
          <TubeLabeling
            method={labelMethod}
            onConfirm={() => setStage("label-tubes")}
            onMethodChange={setLabelMethod}
            onPhotoChecksChange={setLabelPhotoChecks}
            patientLabelLine={careLoopTubeLabelLine(patient)}
            photoChecks={labelPhotoChecks}
            stage="collect"
            tubeKeys={samples.map((sample) => sample.tube)}
          />
        </div>
      ) : null}

      {stage === "label-tubes" ? (
        <div
          className={route === "self" ? styles.workflowRail : styles.singleRail}
        >
          {route === "self" ? null : (
            <section className={styles.stageIntro}>
              <p className={styles.eyebrow}>{t(actorFor(stage, route))}</p>
              <h2>{t("Label the tubes you drew")}</h2>
              <p>
                {t("The draw is recorded. Match every tube to")} {patient.name}{" "}
                {t("and")} {patient.orderId} {t("before custody can change.")}
              </p>
            </section>
          )}
          <TubeLabeling
            method={labelMethod}
            onConfirm={() =>
              setStage(route === "self" ? "verify-labels" : "handoff")
            }
            onMethodChange={setLabelMethod}
            onPhotoChecksChange={setLabelPhotoChecks}
            patientLabelLine={careLoopTubeLabelLine(patient)}
            photoChecks={labelPhotoChecks}
            stage="label"
            tubeKeys={samples.map((sample) => sample.tube)}
            verificationRequired={route === "self"}
          />
        </div>
      ) : null}

      {stage === "verify-labels" ? (
        <div className={styles.workflowRail}>
          <Card className={styles.verificationCard} variant="outline">
            <CardContent className={styles.verificationContent}>
              <section className={styles.qrStep}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <h3>{t("Scan the QR code with your phone")}</h3>
                  <p>
                    {t(
                      "Open the photo checklist and photograph each labeled tube.",
                    )}
                  </p>
                  <p className={styles.prototypeNote}>
                    {t(
                      "A live phone session is not available in this prototype.",
                    )}
                  </p>
                  {photoChecklistOpen ? null : (
                    <Button
                      onClick={() => setPhotoChecklistOpen(true)}
                      size="sm"
                      variant="outline"
                    >
                      {t("Open photo checklist")}
                    </Button>
                  )}
                </div>
                <span
                  aria-label={t("Prototype label verification QR code")}
                  className={styles.qrCode}
                  role="img"
                >
                  <QrCodeIcon aria-hidden="true" size={88} />
                </span>
              </section>

              {photoChecklistOpen ? (
                <section className={styles.photoChecklist}>
                  <div className={styles.photoChecklistHeader}>
                    <span className={styles.stepNumber}>2</span>
                    <div>
                      <h3>{t("Photograph labeled samples")}</h3>
                      <p>
                        {t(
                          "Take one clear photo of each tube with the label visible.",
                        )}
                      </p>
                    </div>
                    <Badge size="sm" variant="success">
                      {capturedTubeIds.length}/{samples.length}{" "}
                      {t("photos captured")}
                    </Badge>
                  </div>
                  <ul className={styles.photoRows}>
                    {samples.map((sample, index) => {
                      const tube = TUBE_CATALOG.find(
                        (entry) => entry.key === sample.tube,
                      );
                      const captured = capturedTubeIds.includes(sample.id);
                      return (
                        <li key={sample.id}>
                          <span className={styles.sampleIndex}>
                            {index + 1}
                          </span>
                          <span
                            aria-hidden="true"
                            className={styles.sampleStopper}
                            style={{ background: tube?.color }}
                          />
                          <span className={styles.sampleCopy}>
                            <strong>{tube?.short ?? sample.container}</strong>
                            <span>{sample.tests.join(" · ")}</span>
                          </span>
                          <Button
                            disabled={captured}
                            leadingIcon={
                              captured ? (
                                <CheckIcon aria-hidden="true" />
                              ) : (
                                <CameraIcon aria-hidden="true" />
                              )
                            }
                            onClick={() =>
                              setCapturedTubeIds((current) => [
                                ...current,
                                sample.id,
                              ])
                            }
                            size="sm"
                            variant={captured ? "ghost" : "outline"}
                          >
                            {t(captured ? "Captured" : "Capture photo")}
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}
            </CardContent>
            {photoChecklistOpen ? (
              <CardFooter>
                <Button
                  disabled={
                    samples.length === 0 ||
                    capturedTubeIds.length !== samples.length
                  }
                  onClick={() => setStage("handoff")}
                  variant="primary"
                >
                  {t("Ready for sample pickup")}
                </Button>
              </CardFooter>
            ) : null}
          </Card>
        </div>
      ) : null}

      {stage === "scan" ? (
        patientLoaded ? (
          <Button onClick={() => setStage("draw")} variant="primary">
            {t("Open draw worksheet")}
          </Button>
        ) : (
          <ScanGate
            onMatch={() => {
              setPatientLoaded(true);
              setStage("draw");
            }}
            queue={[{ ...collectionPatient, samples }]}
            role="phlebotomy"
          />
        )
      ) : null}

      {stage === "draw" ? (
        <DrawWorksheet
          now={CARE_LOOP_NOW}
          onMarkVitalsDone={() => {}}
          onSaveDraft={() => setStage("scan")}
          onSubmit={() => setStage("label-tubes")}
          onUpdateSamples={setSamples}
          operatorName={
            route === "self"
              ? t("Ordering clinician")
              : route === "home"
                ? t("Kura phlebotomist")
                : CARE_LOOP_OPERATOR
          }
          patient={collectionPatient}
          samples={samples}
        />
      ) : null}

      {stage === "handoff" && route === "self" ? (
        <div className={styles.workflowRail}>
          <Alert tone="success">
            <AlertTitle>{t("All samples prepared")}</AlertTitle>
            <AlertDescription>
              {samples.length} {t("tubes collected")} · {samples.length}{" "}
              {t("labels verified")} · {capturedTubeIds.length}{" "}
              {t("photos captured")}
            </AlertDescription>
          </Alert>

          <Card className={styles.pickupCard} variant="outline">
            <CardContent className={styles.pickupContent}>
              <RadioGroup
                description={t("Free · courier collects at your clinic")}
                legend={t("Pickup round")}
                onValueChange={(value) => setPickupRound(value)}
                value={pickupRound}
              >
                {SELF_PICKUP_ROUNDS.map((round) => (
                  <Radio
                    appearance="card"
                    helpText={t(round.detail)}
                    key={round.value}
                    value={round.value}
                  >
                    {t(round.label)}
                  </Radio>
                ))}
              </RadioGroup>

              <section className={styles.courierChecklist}>
                <h3>{t("Before courier arrives")}</h3>
                <ul>
                  <li>
                    {t("Seal all tubes in one biohazard bag for")}{" "}
                    {patient.orderId}
                  </li>
                  <li>
                    {t(
                      "Keep tubes upright at room temperature unless a test needs cold handling",
                    )}
                  </li>
                  <li>{t("Have the order open for courier handoff")}</li>
                  <li>{t("Hand off only to the Kura courier")}</li>
                </ul>
              </section>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!pickupRound}
                onClick={() => setStage("ready-for-pickup")}
                variant="primary"
              >
                {t("Mark samples ready")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}

      {stage === "handoff" && route !== "self" ? (
        <Card className={styles.handoffCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm">{t("Collection complete")}</Badge>
              <CardTitle>{t("Prepare samples for pickup")}</CardTitle>
              <CardDescription>
                {t("Match the physical specimens to")} {patient.orderId}{" "}
                {t("before custody changes.")}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={styles.handoffContent}>
            <dl className={styles.metricGrid}>
              <div>
                <dt>{t("Collected")}</dt>
                <dd>
                  {samples.length} {t("tubes")}
                </dd>
              </div>
              <div>
                <dt>{t("Order")}</dt>
                <dd>{patient.orderId}</dd>
              </div>
              <div>
                <dt>{t("Patient ID")}</dt>
                <dd>{patient.pid ?? t("Pending verification")}</dd>
              </div>
            </dl>

            <Select
              label={t("Pickup round")}
              onValueChange={(value) => setPickupRound(value ?? "")}
              options={PICKUP_ROUNDS.map((round) => ({
                ...round,
                label: t(round.label),
              }))}
              placeholder={t("Choose a pickup round")}
              required
              value={pickupRound}
            />

            <div className={styles.checklist}>
              <Checkbox
                checked={labelsChecked}
                onCheckedChange={setLabelsChecked}
              >
                {t("Tube labels match the patient and order.")}
              </Checkbox>
              <Checkbox
                checked={countChecked}
                onCheckedChange={setCountChecked}
              >
                {t("Tube count matches the handoff summary.")}
              </Checkbox>
              <Checkbox checked={bagSealed} onCheckedChange={setBagSealed}>
                {t("Specimen bag is sealed for transport.")}
              </Checkbox>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                setLabelsChecked(false);
                setCountChecked(false);
                setBagSealed(false);
                setStage("label-mismatch");
              }}
              variant="ghost"
            >
              {t("Labels do not match")}
            </Button>
            <Button
              disabled={!handoffComplete}
              onClick={() => setStage("ready-for-pickup")}
              variant="primary"
            >
              {t("Mark samples ready")}
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {stage === "label-mismatch" ? (
        <Alert className={styles.focusCard} tone="danger">
          <AlertTitle>{t("Do not hand off these tubes")}</AlertTitle>
          <AlertDescription>
            {t("A label does not match")} {patient.name} {t("or")}{" "}
            {patient.orderId}.{" "}
            {t(
              "Keep custody with the collector and correct every affected tube before trying again.",
            )}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => setStage("label-tubes")}
              size="sm"
              variant="primary"
            >
              {t("Return to labeling")}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {logisticsStatus ? (
        <LabJourneyProgress
          courierEtaLabel={courierEtaLabel}
          flagged={initialJourney?.flagged}
          onReviewResults={onReviewResults}
          orderId={patient.orderId}
          resulted={initialJourney?.resulted ?? (stage === "partial-results" ? 3 : undefined)}
          status={logisticsStatus}
          total={
            initialJourney?.total ??
            (stage === "partial-results" ? selectedItems.length : undefined)
          }
        />
      ) : null}
    </LabOrderFlowShell>
  );
}
