"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

import {
  NextActionsRail,
  PatientChart,
  PrescribeFlow,
  patientSummaryFromJourney,
} from "../../../../features/patients";
import {
  LabJourneyProgress,
  labJourneyStatusFromCollectionStage,
} from "../../../../features/care-loop/lab-journey-progress";
import {
  CARE_LOOP_CART_ITEMS,
  CARE_LOOP_LINE_ECONOMICS,
} from "../../../../features/care-loop/demo-data";
import { LabOrderRail } from "../../../../features/lab-catalog";
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from "../../../../features/lab-catalog/demo-data";
import {
  FloatingOrderCart,
  type DoctorOrderCartWorkflow,
} from "../../../../features/order-cart";
import {
  DEMO_TUBES,
  cartWith,
  doctorWorkflow,
  earningsForItems,
  returningPatientCart,
} from "../../../../features/order-cart/demo-data";
import {
  DEMO_DIAGNOSES,
  DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
  DEMO_LEGACY_ICD10_FLAGGED_LABS,
  DEMO_LEGACY_ICD10_SEARCH_POOL,
  DEMO_NEEDS_REVIEW,
  DEMO_ORDERS,
  DEMO_PATIENTS,
  PATIENT_CHART_DEMO_SCENARIOS,
  DEMO_SEARCH_POOL,
  DEMO_SETTLED,
  DEMO_SUGGESTIONS,
  DEMO_TOUR_PATIENT_ID,
  chartFixtureFor,
} from "../../../../features/patients/demo-data";
import type { PatientChartDemoScenario } from "../../../../features/patients/demo-data";
import { demoOnboardingScenarioById } from "../../../../features/auth/demo-data";
import type {
  PatientSummary,
  PatientOrder,
  PrescribeDraft,
} from "../../../../features/patients";
import { PatientContextRail } from "../../../../features/patient-context/patient-context-rail";
import { PATIENT_CONTEXT_FIXTURES } from "../../../../features/patient-context/demo-data";
import { LabFlowsheet, LabHistoryBrowser } from "../../../../features/results";
import { FIRST_VISIT_SECTIONS } from "../../../../features/results/demo-data";
import {
  LEGACY_LAB_HISTORY_SECTIONS,
  LEGACY_LAB_LATEST_DRAW,
} from "../../../../features/results/legacy-lab-history-demo-data";
import { useDemoSession } from "../../../_demo/demo-session";
import { useDemoJourneyProgress } from "../../../_demo/use-demo-journey-progress";

/** Demo stand-in for merged_into_user_id, which the list row does not carry. */
const MERGE_TARGET = "p-sok-nimol";

type PatientChartLocalState = {
  patientId: string;
  railMode: "actions" | "order" | "prescribe";
  prescribeDraft?: PrescribeDraft;
  placedOrders: readonly PatientOrder[] | null;
  selectedTab: "overview" | "orders" | "results";
  focusedOrderId?: string;
  showJourney: boolean;
};

type FloatingCartLocalState = {
  patientId: string;
  cart: ReturnType<typeof returningPatientCart>;
  workflow: DoctorOrderCartWorkflow;
};

export default function PatientChartPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = use(params);
  const router = useRouter();
  const { session } = useDemoSession();
  useDemoJourneyProgress();
  const selected = demoOnboardingScenarioById(session.demoScenarioId);
  const activeJourney =
    session.patientJourney?.patient.id === patientId
      ? session.patientJourney
      : undefined;
  const journeyPatient = activeJourney
    ? patientSummaryFromJourney(activeJourney)
    : undefined;
  const chartScenario: PatientChartDemoScenario | undefined =
    selected.surface === "patient-chart" &&
    selected.variant in PATIENT_CHART_DEMO_SCENARIOS
      ? PATIENT_CHART_DEMO_SCENARIOS[
          selected.variant as keyof typeof PATIENT_CHART_DEMO_SCENARIOS
        ]
      : undefined;
  // A new doctor has no patients of their own, but the seeded tour record must
  // still open — it is the one the first-use home offers.
  const found =
    journeyPatient ??
    (session.demoProfile === "new-doctor"
      ? DEMO_PATIENTS.find(
          (row) =>
            row.userId === patientId && row.userId === DEMO_TOUR_PATIENT_ID,
        )
      : DEMO_PATIENTS.find((row) => row.userId === patientId));
  // Verify-identity is local demo state: the endpoint returns the updated ref.
  const [verified, setVerified] = useState<PatientSummary | null>(null);
  const [floatingCartState, setFloatingCartState] =
    useState<FloatingCartLocalState | null>(null);
  const [floatingCartOpen, setFloatingCartOpen] = useState(false);
  const initialTab = chartScenario?.defaultTab ?? "overview";
  const [chartState, setChartState] = useState<PatientChartLocalState>({
    patientId,
    railMode: "actions",
    placedOrders: null,
    selectedTab: initialTab,
    showJourney: true,
  });
  const localState =
    chartState.patientId === patientId
      ? chartState
      : {
          patientId,
          railMode: "actions" as const,
          placedOrders: null,
          selectedTab: initialTab,
          showJourney: true,
        };
  const updateLocalState = (patch: Partial<PatientChartLocalState>) => {
    setChartState((current) => ({
      ...(current.patientId === patientId ? current : localState),
      ...patch,
    }));
  };
  const patient = verified?.userId === patientId ? verified : found;

  if (!patient) {
    return (
      <PatientChart
        onBack={() => router.push("/patients")}
        patient={DEMO_PATIENTS[0]}
        state="not-found"
      />
    );
  }

  const patientName = patient.displayName || "this patient";
  const isSokhaChann = patient.userId === DEMO_TOUR_PATIENT_ID;
  const seededFloatingCart: FloatingCartLocalState = {
    patientId,
    cart: returningPatientCart({
      id: patient.userId,
      name: patientName,
      identifier: patient.mrnMasked ? `MRN ${patient.mrnMasked}` : undefined,
      demographicLabel: `${patient.sexAtBirth === "F" ? "Female" : patient.sexAtBirth === "M" ? "Male" : "Sex not recorded"} · ${patient.age}`,
    }),
    workflow: doctorWorkflow({ actorName: session.userName }),
  };
  const floatingCart =
    floatingCartState?.patientId === patientId
      ? floatingCartState
      : seededFloatingCart;
  const updateFloatingCart = (patch: Partial<FloatingCartLocalState>) => {
    setFloatingCartState((current) => ({
      ...(current?.patientId === patientId ? current : seededFloatingCart),
      ...patch,
      patientId,
    }));
  };
  const patchFloatingWorkflow = (patch: Partial<DoctorOrderCartWorkflow>) => {
    updateFloatingCart({ workflow: { ...floatingCart.workflow, ...patch } });
  };
  const repriceFloatingCart = (items: typeof floatingCart.cart.items) =>
    cartWith(items, {
      id: floatingCart.cart.id,
      patient: floatingCart.cart.patient,
    }) as typeof floatingCart.cart;
  // Chart content follows the patient. Without this every record rendered the
  // same chronic-disease persona, so the rail and the identity bar disagreed.
  const chart = chartFixtureFor(patient.userId);
  const baseOrders = chartScenario?.emptyOrders
    ? []
    : (chart?.orders ?? DEMO_ORDERS);
  const orders = localState.placedOrders ?? baseOrders;
  const labJourneyStatus = activeJourney?.labOrder
    ? labJourneyStatusFromCollectionStage(activeJourney.labOrder.stage)
    : null;
  const patientList = journeyPatient
    ? [journeyPatient, ...DEMO_PATIENTS.filter((row) => row.userId !== journeyPatient.userId)]
    : DEMO_PATIENTS;

  const selectedTestIds = floatingCart.cart.items.map((item) => item.id);

  const updateSelectedTests = (nextSelectedTestIds: string[]) => {
    const selected = new Set(nextSelectedTestIds);
    const items = CARE_LOOP_CART_ITEMS.filter((item) => selected.has(item.id));
    updateFloatingCart({
      cart: repriceFloatingCart(items),
      workflow: {
        ...floatingCart.workflow,
        earnings: earningsForItems(items, CARE_LOOP_LINE_ECONOMICS),
      },
    });
  };

  return (
    <PatientChart
      actionRailMode={
        localState.railMode === "actions" ? "launcher" : "workspace"
      }
      actionRail={
        localState.railMode === "actions" ? (
          <NextActionsRail
            onOrder={() => updateLocalState({ railMode: "order" })}
            onPrescribe={() => updateLocalState({ railMode: "prescribe" })}
            onSchedule={() => router.push("/soon/care-plan")}
            patientName={patientName}
          />
        ) : localState.railMode === "order" ? (
          <LabOrderRail
            categories={LAB_CATALOG_CATEGORIES}
            onClose={() => updateLocalState({ railMode: "actions" })}
            onReview={() => setFloatingCartOpen(true)}
            onSelectedTestIdsChange={updateSelectedTests}
            selectedTestIds={selectedTestIds}
            tests={LAB_CATALOG_TESTS}
          />
        ) : (
          <PrescribeFlow
            diagnoses={chart?.diagnoses ?? DEMO_DIAGNOSES}
            diagnosisSearchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL}
            diagnosisSuggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS}
            flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS}
            initialDraft={localState.prescribeDraft}
            needsReview={DEMO_NEEDS_REVIEW}
            onClose={(draft) => {
              updateLocalState({ prescribeDraft: draft, railMode: "actions" });
            }}
            onComplete={(draft) => {
              updateLocalState({ prescribeDraft: draft, railMode: "actions" });
            }}
            patientName={patientName}
            searchPool={DEMO_SEARCH_POOL}
            settled={DEMO_SETTLED}
            suggestions={DEMO_SUGGESTIONS}
          />
        )
      }
      headerActions={
        <FloatingOrderCart
          cart={floatingCart.cart}
          onAttestChange={(attested) => patchFloatingWorkflow({ attested })}
          onBackToCart={() => patchFloatingWorkflow({ stage: "draft" })}
          onClear={() => updateSelectedTests([])}
          onDecisionsChange={(decisions) =>
            patchFloatingWorkflow({ decisions })
          }
          onPanelChange={(panel) => patchFloatingWorkflow({ panel })}
          onOpenChange={setFloatingCartOpen}
          onPrimaryAction={() => {
            const workflow = floatingCart.workflow;
            if (workflow.stage === "tubes") {
              patchFloatingWorkflow({ stage: "confirmed" });
            } else if (
              workflow.stage !== "code-sent" &&
              workflow.stage !== "collected"
            ) {
              patchFloatingWorkflow(
                workflow.decisions.collectBy === "self"
                  ? { stage: "tubes", tubes: workflow.tubes ?? DEMO_TUBES }
                  : {
                      stage: "code-sent",
                      panel: "summary",
                      paymentLocked: true,
                    },
              );
            }
          }}
          onRemoveItem={(itemId) =>
            updateSelectedTests(
              selectedTestIds.filter((testId) => testId !== itemId),
            )
          }
          onTubeMethodChange={(tubeMethod) =>
            patchFloatingWorkflow({ tubeMethod })
          }
          onTubeScan={(tubeId, scanned) =>
            patchFloatingWorkflow({
              tubes: (floatingCart.workflow.tubes ?? []).map((tube) =>
                tube.id === tubeId ? { ...tube, scanned } : tube,
              ),
            })
          }
          open={floatingCartOpen}
          workflow={floatingCart.workflow}
        />
      }
      onBack={() => router.push("/patients")}
      defaultTab={chartScenario?.defaultTab}
      focusedOrderId={localState.focusedOrderId}
      onOpenMergedRecord={() => router.push(`/patients/${MERGE_TARGET}`)}
      onSwitchPatient={(userId) => router.push(`/patients/${userId}`)}
      onTabChange={(tab) => {
        updateLocalState({ focusedOrderId: undefined, selectedTab: tab });
      }}
      onVerifyIdentity={() =>
        setVerified({ ...patient, assurance: "verified" })
      }
      orders={orders}
      patient={patient}
      patients={patientList}
      rail={
        chart ? (
          <PatientContextRail
            patient={{
              initials: patientName.slice(0, 2).toUpperCase(),
              name: patientName,
              demographics: `${patient.age} y · ${patient.sexAtBirth} · MRN ${patient.mrnMasked}`,
            }}
            reasonForVisit={chart.reasonForVisit}
            safety={chart.safety}
            sections={chart.sections}
            showIdentity={false}
            todaySummary={chart.todaySummary}
          />
        ) : (
          <PatientContextRail
            {...PATIENT_CONTEXT_FIXTURES.established}
            showIdentity={false}
          />
        )
      }
      results={
        isSokhaChann ? (
          <LabHistoryBrowser
            latestDrawAt={LEGACY_LAB_LATEST_DRAW}
            sections={LEGACY_LAB_HISTORY_SECTIONS}
          />
        ) : (
          <LabFlowsheet
            sections={FIRST_VISIT_SECTIONS}
            title="Results — booking AB12345"
          />
        )
      }
      selectedTab={localState.selectedTab}
      workflow={
        localState.showJourney && activeJourney?.labOrder && labJourneyStatus ? (
          <LabJourneyProgress
            courierEtaLabel="in 15–25 minutes"
            flagged={activeJourney.labOrder.flagged}
            onReviewResults={
              labJourneyStatus === "partially_complete"
                ? () => updateLocalState({ selectedTab: "results", showJourney: false })
                : undefined
            }
            orderId={activeJourney.labOrder.orderId}
            resulted={activeJourney.labOrder.resulted}
            status={labJourneyStatus}
            total={activeJourney.labOrder.total}
          />
        ) : undefined
      }
    />
  );
}
