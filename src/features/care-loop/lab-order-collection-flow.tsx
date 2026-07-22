"use client";

import { useMemo, useRef, useState } from "react";
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
  Select,
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "../../components/ui";
import { useT } from "../../components/foundations/i18n";
import { DrawWorksheet } from "../collection/draw-worksheet";
import { ScanGate } from "../collection/scan-gate";
import { TubeLabeling } from "../collection/tube-labeling";
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
  CARE_LOOP_CART_ITEMS,
  CARE_LOOP_NOW,
  CARE_LOOP_OPERATOR,
  CARE_LOOP_PATIENT,
  CARE_LOOP_SELECTED_TEST_IDS,
  careLoopCollectionPatient,
  careLoopCart,
  careLoopTubeLabelLine,
  type CareLoopPatientManifest,
} from "./demo-data";
import styles from "./care-loop.module.css";

export type LabOrderCollectionStage =
  | "ordering"
  | "payment"
  | "identity-required"
  | "scan"
  | "draw"
  /** Self-draw route: the doctor drew, so the tubes are labelled in the room. */
  | "label-tubes"
  /** Home route: the visit is booked and nothing physical exists yet. */
  | "home-visit-booked"
  | "handoff"
  | "label-mismatch"
  | "ready-for-pickup"
  | "pickup-delayed"
  | "awaiting-results";

export type LabOrderRoute = "psc" | "self" | "home";

export type LabOrderPlaced = {
  orderId: string;
  selectedTestIds: readonly string[];
};

export type LabOrderSampleCollectionFlowProps = {
  initialStage?: LabOrderCollectionStage;
  /** Opens the flow on one of the three service routes. */
  initialDecisions?: CollectionDecisions;
  /** One immutable patient manifest carried through order, draw, labels, and handoff. */
  patient?: CareLoopPatientManifest;
  /** Workspace mode keeps the patient chart or intake rail as the owning shell. */
  presentation?: "standalone" | "workspace";
  onClose?: () => void;
  onOrderPlaced?: (order: LabOrderPlaced) => void;
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
    { label: "Positive ID and draw", actor: "Doctor" },
    { label: "Label samples", actor: "Doctor" },
    { label: "Handoff", actor: "Clinic and courier" },
    { label: "Await lab receipt", actor: "Clinic" },
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

function routeFor(decisions: CollectionDecisions): LabOrderRoute {
  if (decisions.collectBy === "self") return "self";
  if (decisions.drawSite === "patient-home") return "home";
  return "psc";
}

function stepFor(stage: LabOrderCollectionStage, route: LabOrderRoute) {
  if (stage === "ordering") return 1;
  if (route === "psc") {
    if (stage === "payment") return 2;
    if (stage === "identity-required" || stage === "scan" || stage === "draw")
      return 3;
    if (stage === "label-tubes") return 4;
    if (
      stage === "handoff" ||
      stage === "label-mismatch" ||
      stage === "ready-for-pickup" ||
      stage === "pickup-delayed"
    )
      return 5;
    return 6;
  }
  if (route === "home") {
    if (stage === "home-visit-booked") return 2;
    if (stage === "identity-required" || stage === "scan" || stage === "draw")
      return 3;
    if (stage === "label-tubes") return 4;
    if (
      stage === "handoff" ||
      stage === "label-mismatch" ||
      stage === "ready-for-pickup" ||
      stage === "pickup-delayed"
    )
      return 5;
    return 6;
  }
  if (stage === "identity-required" || stage === "scan" || stage === "draw")
    return 2;
  if (stage === "label-tubes") return 3;
  if (
    stage === "handoff" ||
    stage === "label-mismatch" ||
    stage === "ready-for-pickup" ||
    stage === "pickup-delayed"
  )
    return 4;
  return 5;
}

function actorFor(stage: LabOrderCollectionStage, route: LabOrderRoute) {
  if (stage === "ordering") return "Doctor";
  if (stage === "payment") return "Receptionist";
  if (stage === "home-visit-booked") return "Kura phlebotomist";
  if (
    stage === "identity-required" ||
    stage === "scan" ||
    stage === "draw" ||
    stage === "label-tubes"
  ) {
    if (route === "self") return "Doctor";
    return route === "home" ? "Kura phlebotomist" : "Phlebotomist";
  }
  if (stage === "handoff" || stage === "label-mismatch") return "Collector";
  if (stage === "ready-for-pickup" || stage === "pickup-delayed") {
    return "Clinic and courier";
  }
  return "Clinic";
}

function initialDoctorWorkflow(
  decisions: CollectionDecisions = {
    collectBy: "kura",
    drawSite: "kura-psc",
    payment: "pay-later-kura",
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
  if (decisions.collectBy === "self") return "draw";
  if (decisions.drawSite === "patient-home") return "home-visit-booked";
  return "payment";
}

function LabOrderFlowShell({
  actor,
  children,
  currentStep,
  onClose,
  onRestart,
  patient,
  presentation,
  stages,
}: {
  actor: string;
  children: ReactNode;
  currentStep: number;
  onClose?: () => void;
  onRestart: () => void;
  patient: CareLoopPatientManifest;
  presentation: "standalone" | "workspace";
  stages: readonly { label: string; actor: string }[];
}) {
  const t = useT();

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
        title="Lab order and sample collection"
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
            <p className={styles.eyebrow}>{t(actor)}</p>
            <h2 id="lab-order-workspace-title">{t("Lab order")}</h2>
          </div>
          {onClose ? (
            <CloseButton
              aria-label={t("Close lab order journey")}
              onClick={onClose}
              size="sm"
            />
          ) : null}
        </div>
        <Progress
          aria-label={`${t("Step")} ${currentStep} ${t("of")} ${stages.length}: ${t(activeStage.label)}`}
          label={`${t(activeStage.label)} · ${t("Step")} ${currentStep} ${t("of")} ${stages.length}`}
          max={stages.length}
          size="sm"
          value={currentStep}
        />
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

export function LabOrderSampleCollectionFlow({
  initialDecisions,
  initialStage = "ordering",
  onClose,
  onOrderPlaced,
  patient = CARE_LOOP_PATIENT,
  presentation = "standalone",
}: LabOrderSampleCollectionFlowProps) {
  const t = useT();
  const collectionPatient = useMemo(
    () => careLoopCollectionPatient(patient),
    [patient],
  );
  const [stage, setStage] = useState(initialStage);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([
    ...CARE_LOOP_SELECTED_TEST_IDS,
  ]);
  const [doctor, setDoctor] = useState<DoctorOrderCartWorkflow>(() =>
    initialDoctorWorkflow(initialDecisions),
  );
  const [reception, setReception] = useState<ReceptionistOrderCartWorkflow>(
    initialReceptionWorkflow,
  );
  const [samples, setSamples] = useState<Sample[]>(collectionPatient.samples);
  const [patientLoaded, setPatientLoaded] = useState(
    initialStage === "draw" ||
      initialStage === "handoff" ||
      initialStage === "label-tubes" ||
      initialStage === "label-mismatch" ||
      initialStage === "ready-for-pickup" ||
      initialStage === "pickup-delayed" ||
      initialStage === "awaiting-results",
  );
  const orderPlacedRef = useRef(false);
  const [labelMethod, setLabelMethod] = useState<TubeLabelMethod>("sticker");
  const [labelPhotoChecks, setLabelPhotoChecks] = useState<TubeLabelPhotoCheck>(
    {
      applied: false,
      readable: false,
      photographed: false,
    },
  );
  const [pickupRound, setPickupRound] = useState("");
  const [labelsChecked, setLabelsChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(false);
  const [bagSealed, setBagSealed] = useState(false);

  const selectedItems = useMemo(
    () =>
      CARE_LOOP_CART_ITEMS.filter((item) => selectedTestIds.includes(item.id)),
    [selectedTestIds],
  );
  const plannedSamples = useMemo(() => {
    const selectedNames = new Set(selectedItems.map((item) => item.name));
    return collectionPatient.samples
      .map((sample) => ({
        ...sample,
        tests: sample.tests.filter((test) => selectedNames.has(test)),
      }))
      .filter((sample) => sample.tests.length > 0);
  }, [collectionPatient.samples, selectedItems]);
  const cart = useMemo(
    () => careLoopCart(selectedItems, patient),
    [patient, selectedItems],
  );
  const doctorForCart = useMemo(
    () =>
      !doctor.earnings || cart.pricing.state === "error"
        ? doctor
        : { ...doctor, earnings: earningsForItems(selectedItems) },
    [cart.pricing.state, doctor, selectedItems],
  );
  const route = routeFor(doctor.decisions);
  const stages = ROUTE_STAGES[route];
  const currentStep = stepFor(stage, route);
  const identityReady = Boolean(patient.pid && patient.dob && patient.sex);

  function restart() {
    setStage("ordering");
    setSelectedTestIds([...CARE_LOOP_SELECTED_TEST_IDS]);
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
    setPickupRound("");
    setLabelsChecked(false);
    setCountChecked(false);
    setBagSealed(false);
    orderPlacedRef.current = false;
  }

  function placeOrderAndContinue() {
    if (!orderPlacedRef.current) {
      onOrderPlaced?.({ orderId: patient.orderId, selectedTestIds });
      orderPlacedRef.current = true;
    }
    setSamples(plannedSamples);
    const nextStage = stageAfterOrdering(doctor.decisions);
    setStage(
      nextStage === "draw" && !identityReady ? "identity-required" : nextStage,
    );
  }

  function beginCollection() {
    setStage(identityReady ? "scan" : "identity-required");
  }

  const handoffComplete = Boolean(
    pickupRound && labelsChecked && countChecked && bagSealed,
  );

  return (
    <LabOrderFlowShell
      actor={actorFor(stage, route)}
      currentStep={currentStep}
      onClose={onClose}
      onRestart={restart}
      patient={patient}
      presentation={presentation}
      stages={stages}
    >
      {stage === "ordering" ? (
        <div className={styles.orderGrid}>
          <section
            aria-labelledby="test-picker-heading"
            className={styles.catalogPanel}
          >
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>{t("Doctor")}</p>
                <h2 id="test-picker-heading">{t("Choose baseline tests")}</h2>
              </div>
              <Badge size="sm">
                {selectedItems.length} {t("selected")}
              </Badge>
            </div>
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

      {stage === "identity-required" ? (
        <Alert className={styles.focusCard} tone="warning">
          <AlertTitle>{t("Verify identity before collection")}</AlertTitle>
          <AlertDescription>
            {t(
              "This order can remain pending, but collection cannot start until the patient has a confirmed patient ID, date of birth, and sex. Do not create or label specimens from incomplete demographics.",
            )}
          </AlertDescription>
          <AlertAction>
            <Button onClick={onClose ?? restart} size="sm" variant="primary">
              {t("Return to patient record")}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {stage === "label-tubes" ? (
        <div className={styles.singleRail}>
          <section className={styles.stageIntro}>
            <p className={styles.eyebrow}>{t(actorFor(stage, route))}</p>
            <h2>{t("Label the tubes you drew")}</h2>
            <p>
              {t("The draw is recorded. Match every tube to")} {patient.name}{" "}
              {t("and")} {patient.orderId}{" "}
              {t("before custody can change.")}
            </p>
          </section>
          <TubeLabeling
            method={labelMethod}
            onConfirm={() => setStage("handoff")}
            onMethodChange={setLabelMethod}
            onPhotoChecksChange={setLabelPhotoChecks}
            patientLabelLine={careLoopTubeLabelLine(patient)}
            photoChecks={labelPhotoChecks}
            tubeKeys={samples.map((sample) => sample.tube)}
          />
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

      {stage === "handoff" ? (
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

      {stage === "ready-for-pickup" ? (
        <Alert tone="success">
          <AlertTitle>
            {t("Samples ready for the")} {pickupRound} {t("pickup")}
          </AlertTitle>
          <AlertDescription>
            {samples.length}{" "}
            {t(
              "sealed tubes are waiting at the collection handoff point. Custody remains with the clinic until pickup is recorded.",
            )}
          </AlertDescription>
          <AlertAction>
            <div className={styles.issueActions}>
              <Button
                onClick={() => setStage("pickup-delayed")}
                size="sm"
                variant="ghost"
              >
                {t("Report pickup issue")}
              </Button>
              <Button
                onClick={() => setStage("awaiting-results")}
                size="sm"
                variant="primary"
              >
                {t("Record courier pickup")}
              </Button>
            </div>
          </AlertAction>
        </Alert>
      ) : null}

      {stage === "pickup-delayed" ? (
        <Alert className={styles.focusCard} tone="warning">
          <AlertTitle>{t("Courier pickup is delayed")}</AlertTitle>
          <AlertDescription>
            {t(
              "Custody remains with the clinic. Keep the sealed samples in controlled storage and choose another pickup round; do not mark them as collected by the courier.",
            )}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => {
                setPickupRound("");
                setStage("handoff");
              }}
              size="sm"
              variant="primary"
            >
              {t("Choose another pickup round")}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {stage === "awaiting-results" ? (
        <Card className={styles.focusCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm" variant="info">
                {t("Awaiting results")}
              </Badge>
              <CardTitle>{t("Courier picked up the samples")}</CardTitle>
              <CardDescription>
                {t(
                  "The order stays pending until the laboratory records receipt and releases results.",
                )}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Timeline aria-label={t("Laboratory progress")} value={2}>
              {[
                ["Picked up", "10:34"],
                ["Lab received", "Waiting"],
                ["Processing", "Not started"],
                ["Results", "Not released"],
              ].map(([label, detail], index, items) => (
                <TimelineItem key={label} step={index + 1}>
                  <TimelineIndicator />
                  <TimelineHeader>
                    <TimelineTitle>{t(label)}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>{t(detail)}</TimelineContent>
                  {index < items.length - 1 ? <TimelineSeparator /> : null}
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      ) : null}
    </LabOrderFlowShell>
  );
}
