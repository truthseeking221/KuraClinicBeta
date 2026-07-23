import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { PatientContextRail } from "../patient-context/patient-context-rail";
import { PATIENT_CONTEXT_FIXTURES } from "../patient-context/demo-data";
import { FloatingOrderCart } from "../order-cart";
import { doctorWorkflow, returningPatientCart } from "../order-cart/demo-data";
import { LabOrderRail } from "../lab-catalog";
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from "../lab-catalog/demo-data";
import { LabFlowsheet, LabHistoryBrowser } from "../results";
import { FIRST_VISIT_SECTIONS } from "../results/demo-data";
import {
  LEGACY_LAB_HISTORY_SECTIONS,
  LEGACY_LAB_LATEST_DRAW,
} from "../results/legacy-lab-history-demo-data";
import { PatientChart } from "./patient-chart";
import { NextActionsRail, ResultsProgressRail } from "./action-rails";
import { PrescribeFlow } from "./prescribe-flow";
import {
  DEMO_DIAGNOSES,
  DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
  DEMO_LEGACY_ICD10_FLAGGED_LABS,
  DEMO_LEGACY_ICD10_SEARCH_POOL,
  DEMO_NEEDS_REVIEW,
  DEMO_ORDERS,
  DEMO_PATIENTS,
  DEMO_RESULTS_PROGRESS,
  DEMO_SEARCH_POOL,
  DEMO_SETTLED,
  DEMO_SUGGESTIONS,
  DEMO_TOUR_PATIENT_ID,
  chartFixtureFor,
} from "./demo-data";
import {
  PATIENTS_STORYBOOK_KURA,
  PRESCRIBE_STORYBOOK_KURA,
} from "./storybook-metadata";
import type { PatientOrder, PatientSummary } from "./types";

const SOK_NIMOL = DEMO_PATIENTS[0];
const LINA_PRUM_UNVERIFIED = DEMO_PATIENTS[2];
const CHAN_THOEUN_DECEASED = DEMO_PATIENTS[7];
const MALIS_KEO_MERGED = DEMO_PATIENTS[8];
const SOKHA_CHANN = DEMO_PATIENTS.find(
  (row) => row.userId === DEMO_TOUR_PATIENT_ID,
)!;
const DEMO_TOUR_CHART = chartFixtureFor(DEMO_TOUR_PATIENT_ID)!;
const SOKHA_CHANN_CART = returningPatientCart({
  id: SOKHA_CHANN.userId,
  name: SOKHA_CHANN.displayName,
  identifier: `MRN ${SOKHA_CHANN.mrnMasked}`,
  demographicLabel: `${SOKHA_CHANN.sexAtBirth} · ${SOKHA_CHANN.age}`,
});

const RAIL = (
  <PatientContextRail
    {...PATIENT_CONTEXT_FIXTURES.established}
    showIdentity={false}
  />
);
const RESULTS = (
  <LabFlowsheet
    sections={FIRST_VISIT_SECTIONS}
    title="Results — booking AB12345"
  />
);
const SOKHA_CHANN_RESULTS = (
  <LabHistoryBrowser
    latestDrawAt={LEGACY_LAB_LATEST_DRAW}
    sections={LEGACY_LAB_HISTORY_SECTIONS}
  />
);

const LONG_HISTORY_ORDERS: readonly PatientOrder[] = [
  ...DEMO_ORDERS,
  ...Array.from({ length: 7 }, (_, index) => ({
    ordId: `ord-history-${index + 1}`,
    code: `AB90${index + 1}`,
    placedAtLabel: `Placed ${10 - index} Jan 2026`,
    status: (index % 2 === 0
      ? "completed"
      : "cancelled") as PatientOrder["status"],
    lineItems: [{ code: "CRE", displayName: "Creatinine" }],
  })),
];

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div style={{ blockSize: "100vh" }}>{children}</div>;
}

const meta = {
  title: "Clinic/Clinical/Patients/Chart",
  component: PatientChart,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: PATIENTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          "The patient chart shell: pinned identity bar, persistent context rail (canonical PatientContextRail, safety never collapses), and three record tabs. Orders is a searchable lifecycle record with active work separate from a flat, divider-separated history; Results is the canonical flowsheet. Clinical actions launch from the right rail and retain the selected record view. Deceased and merged records block clinical work before any tab renders.",
      },
    },
  },
  args: {
    patient: SOK_NIMOL,
    patients: DEMO_PATIENTS,
    orders: DEMO_ORDERS,
    rail: RAIL,
    results: RESULTS,
    onBack: fn(),
    onSwitchPatient: fn(),
  },
  decorators: [
    (Story) => (
      <ChartFrame>
        <Story />
      </ChartFrame>
    ),
  ],
} satisfies Meta<typeof PatientChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RecordTabInsetParity: Story = {
  args: { defaultTab: "overview" },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("tablist", {
      name: "Patient chart sections",
    });

    await expect(getComputedStyle(list).marginInlineStart).toBe("-16px");
    await expect(getComputedStyle(list).marginBlockStart).toBe("-16px");
  },
};

/**
 * The record a new doctor lands on from the first-use home offer. It carries
 * real clinical context — problems, medicines, safety, and returned orders —
 * because an empty chart would break the promise that offer makes.
 */
export const DemoTourPatient: Story = {
  args: {
    patient: SOKHA_CHANN,
    orders: DEMO_TOUR_CHART.orders,
    results: SOKHA_CHANN_RESULTS,
    rail: (
      <PatientContextRail
        patient={{
          initials: "SC",
          name: SOKHA_CHANN.displayName,
          demographics: `${SOKHA_CHANN.age} y · ${SOKHA_CHANN.sexAtBirth} · MRN ${SOKHA_CHANN.mrnMasked}`,
        }}
        reasonForVisit={DEMO_TOUR_CHART.reasonForVisit}
        safety={DEMO_TOUR_CHART.safety}
        sections={DEMO_TOUR_CHART.sections}
        showIdentity={false}
        todaySummary={DEMO_TOUR_CHART.todaySummary}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText("Sokha Chann").length).toBeGreaterThan(0);
    // The tour only works if the record actually carries clinical context.
    await expect(canvas.getByText("Sulfa allergy")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /Active problems/ }),
    ).toBeVisible();
    await expect(canvas.getByRole("tab", { name: /^Orders$/ })).toBeVisible();
    await userEvent.click(canvas.getByRole("tab", { name: "Results" }));
    await expect(
      canvas.getByRole("heading", { name: "All tests" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("tab", { name: /All tests/ }),
    ).toHaveTextContent("57");
  },
};

/**
 * A returning patient with unfinished draft work. The patient workbar exposes
 * that draft without replacing the chart or creating a second cart model.
 */
export const ReturningPatientWithDraftCart: Story = {
  args: {
    ...DemoTourPatient.args,
    headerActions: (
      <FloatingOrderCart cart={SOKHA_CHANN_CART} workflow={doctorWorkflow()} />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", {
      name: "Order cart for Sokha Chann, 3 tests",
    });

    await userEvent.click(trigger);
    await expect(
      await screen.findByRole("dialog", {
        name: "Order cart for Sokha Chann",
      }),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveFocus();
  },
};

/**
 * Calm-moment third rail: three launchers for the next clinical step.
 * The rail launches governed flows; nothing completes inside it.
 */
export const NextActions: Story = {
  args: {
    actionRail: (
      <NextActionsRail
        onOrder={fn()}
        onPrescribe={fn()}
        onSchedule={fn()}
        patientName="Nimol"
      />
    ),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const back = canvas.getByRole("button", { name: "Back to patients" });
    await expect(back).toBeVisible();
    await userEvent.click(back);
    await expect(args.onBack).toHaveBeenCalled();
  },
};

/** Order drafting expands the right workspace without replacing the visible results. */
export const ResizableOrderDraftWorkspace: Story = {
  args: {
    actionRail: (
      <LabOrderRail
        categories={LAB_CATALOG_CATEGORIES}
        onClose={fn()}
        onReview={fn()}
        tests={LAB_CATALOG_TESTS}
      />
    ),
    actionRailMode: "workspace",
    defaultTab: "results",
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Results — booking AB12345")).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Order lab tests" }),
    ).toBeVisible();
    const separator = canvas.queryByRole("separator", {
      name: "Resize patient chart and action workspace",
    });
    const mobileLayout = canvasElement.querySelector("[data-mobile-layout]");
    if (mobileLayout) {
      expect(separator).not.toBeInTheDocument();
    } else {
      await expect(separator).toBeVisible();
      expect(separator?.children).toHaveLength(0);
    }

    const record = canvasElement.querySelector<HTMLElement>(
      '[data-slot="patient-chart-record-scroll"]',
    );
    const catalog = canvasElement.querySelector<HTMLElement>(
      '[data-slot="lab-test-picker-scroll"]',
    );
    expect(record).not.toBeNull();
    expect(catalog).not.toBeNull();
    expect(getComputedStyle(record!).scrollbarWidth).toBe("none");
    expect(getComputedStyle(catalog!).scrollbarWidth).toBe("none");

    const panelWrappers = canvasElement.querySelectorAll<HTMLElement>(
      '[data-slot="resizable-panel"] > div',
    );
    expect(panelWrappers.length).toBe(2);
    panelWrappers.forEach((wrapper) => {
      expect(getComputedStyle(wrapper).overflow).toBe("hidden");
    });

    if (catalog!.scrollHeight > catalog!.clientHeight) {
      catalog!.scrollTop = 160;
      await waitFor(() => expect(catalog!.scrollTop).toBeGreaterThan(0));
    }
  },
};

/** Opening Order changes only the right rail; the current chart view stays anchored. */
export const OrderWorkspaceContinuity: Story = {
  args: { defaultTab: "results" },
  render: (args) => {
    function Harness() {
      const [orderOpen, setOrderOpen] = useState(false);
      return (
        <PatientChart
          {...args}
          actionRail={
            orderOpen ? (
              <LabOrderRail
                categories={LAB_CATALOG_CATEGORIES}
                onClose={() => setOrderOpen(false)}
                onReview={fn()}
                tests={LAB_CATALOG_TESTS}
              />
            ) : (
              <NextActionsRail
                onOrder={() => setOrderOpen(true)}
                patientName="Nimol"
              />
            )
          }
          actionRailMode={orderOpen ? "workspace" : "launcher"}
        />
      );
    }

    return <Harness />;
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resultsTab = canvas.getByRole("tab", { name: "Results" });
    const before = resultsTab.getBoundingClientRect();
    await expect(resultsTab).toHaveAttribute("aria-selected", "true");

    const actions = canvas.getByRole("complementary", {
      name: "Patient actions",
    });
    await userEvent.click(
      within(actions).getByRole("button", { name: /^Order/ }),
    );
    await expect(
      await canvas.findByRole("heading", { name: "Order lab tests" }),
    ).toBeVisible();

    await waitFor(() => {
      const anchoredTab = canvas.getByRole("tab", { name: "Results" });
      const after = anchoredTab.getBoundingClientRect();
      expect(anchoredTab).toBe(resultsTab);
      expect(anchoredTab).toHaveAttribute("aria-selected", "true");
      expect(Math.abs(after.left - before.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(1);
    });
  },
};

/**
 * Results-arriving moment: progress, what needs eyes now, and a one-tap
 * subscription instead of watching the page.
 */
export const ResultsArriving: Story = {
  args: {
    defaultTab: "results",
    actionRail: (
      <ResultsProgressRail
        onReviewAvailable={fn()}
        progress={DEMO_RESULTS_PROGRESS}
      />
    ),
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("5 flagged values need review now"),
    ).toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("button", { name: "Notify me when complete" }),
    );
    await expect(
      canvas.getByText("You'll get one alert when all 30 are in."),
    ).toBeInTheDocument();
  },
};

/** Prescribing begins with indication confirmation while clinical evidence remains visible. */
export const PrescribeReview: Story = {
  args: {
    actionRail: (
      <PrescribeFlow
        diagnoses={DEMO_DIAGNOSES}
        diagnosisSearchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL}
        diagnosisSuggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS}
        flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS}
        needsReview={DEMO_NEEDS_REVIEW}
        onClose={fn()}
        onComplete={fn()}
        patientName="Sok Nimol"
        searchPool={DEMO_SEARCH_POOL}
        settled={DEMO_SETTLED}
        suggestions={DEMO_SUGGESTIONS}
      />
    ),
    actionRailMode: "workspace",
    defaultTab: "results",
  },
  parameters: { kura: PRESCRIBE_STORYBOOK_KURA },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Results — booking AB12345")).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Select diagnosis" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("separator", {
        name: "Resize patient chart and action workspace",
      }),
    ).toBeVisible();
  },
};

/** Opening Prescribe changes only the right rail; the selected chart tab stays anchored. */
export const PrescribeWorkspaceContinuity: Story = {
  args: { defaultTab: "results" },
  render: (args) => {
    function Harness() {
      const [prescribeOpen, setPrescribeOpen] = useState(false);
      return (
        <PatientChart
          {...args}
          actionRail={
            prescribeOpen ? (
              <PrescribeFlow
                diagnoses={DEMO_DIAGNOSES}
                diagnosisSearchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL}
                diagnosisSuggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS}
                flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS}
                needsReview={DEMO_NEEDS_REVIEW}
                onClose={() => setPrescribeOpen(false)}
                onComplete={() => setPrescribeOpen(false)}
                patientName="Sok Nimol"
                searchPool={DEMO_SEARCH_POOL}
                settled={DEMO_SETTLED}
                suggestions={DEMO_SUGGESTIONS}
              />
            ) : (
              <NextActionsRail
                onPrescribe={() => setPrescribeOpen(true)}
                patientName="Nimol"
              />
            )
          }
          actionRailMode={prescribeOpen ? "workspace" : "launcher"}
        />
      );
    }

    return <Harness />;
  },
  parameters: { kura: PRESCRIBE_STORYBOOK_KURA },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resultsTab = canvas.getByRole("tab", { name: "Results" });
    const before = resultsTab.getBoundingClientRect();
    await expect(resultsTab).toHaveAttribute("aria-selected", "true");

    const actions = canvas.getByRole("complementary", {
      name: "Patient actions",
    });
    await userEvent.click(
      within(actions).getByRole("button", { name: /^Prescribe/ }),
    );
    await expect(
      await canvas.findByRole("heading", { name: "Select diagnosis" }),
    ).toBeVisible();

    await waitFor(() => {
      const anchoredTab = canvas.getByRole("tab", { name: "Results" });
      const after = anchoredTab.getBoundingClientRect();
      expect(anchoredTab).toBe(resultsTab);
      expect(anchoredTab).toHaveAttribute("aria-selected", "true");
      expect(Math.abs(after.left - before.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(1);
    });
  },
};

/** Terminal records never show an action rail, even when one is supplied. */
export const DeceasedHidesActionRail: Story = {
  args: {
    patient: CHAN_THOEUN_DECEASED,
    actionRail: <NextActionsRail patientName="Thoeun" />,
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByText(/What should we do/),
    ).not.toBeInTheDocument();
  },
};

export const OrdersTab: Story = {
  args: { defaultTab: "orders" },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("AB12345")).toBeInTheDocument();
    await expect(canvas.getByText("Needs attention")).toBeInTheDocument();
    await expect(canvas.getByText("Cancelled")).toBeInTheDocument();
  },
};

/** Completed history is a flat, divider-separated list: readable evidence, not a set of action cards. */
export const CompletedOrdersOnly: Story = {
  args: {
    defaultTab: "orders",
    orders: DEMO_TOUR_CHART.orders,
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("tab", { name: /^Orders$/ })).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Past orders" }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("heading", { name: "Active orders" }),
    ).not.toBeInTheDocument();
    const history = canvas.getByRole("list", { name: "Past orders" });
    await expect(
      history.querySelectorAll(':scope > [role="listitem"]'),
    ).toHaveLength(2);
    await expect(within(history).getByText("AB12781")).toBeVisible();
  },
};

export const OneActiveOrderCount: Story = {
  args: {
    defaultTab: "orders",
    orders: [DEMO_ORDERS[0]],
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("tab", { name: "Orders, 1 active" }),
    ).toBeVisible();
  },
};

export const NeedsAttentionFirst: Story = {
  args: {
    defaultTab: "orders",
    orders: [
      {
        ...DEMO_ORDERS[0],
        ordId: "ord-attention",
        code: "AB-ATTN",
        status: "in_fulfillment",
      },
      {
        ...DEMO_ORDERS[0],
        ordId: "ord-routine",
        code: "AB-ROUTINE",
        needsAttention: false,
        status: "placed",
      },
    ],
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const attention = canvas.getByText("AB-ATTN");
    const routine = canvas.getByText("AB-ROUTINE");
    await expect(attention.compareDocumentPosition(routine)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  },
};

export const LongOrderHistory: Story = {
  args: { defaultTab: "orders", orders: LONG_HISTORY_ORDERS },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Show more past orders" }),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Show more past orders" }),
    );
    await expect(canvas.getByText("AB907")).toBeVisible();
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "Search past orders" }),
      "AB907",
    );
    await expect(canvas.getByText("AB907")).toBeVisible();
    await expect(canvas.queryByText("AB901")).not.toBeInTheDocument();
  },
};

export const OrdersLoading: Story = {
  args: { defaultTab: "orders", ordersState: "loading" },
};

export const OrdersErrorAndRetry: Story = {
  args: { defaultTab: "orders", onRetryOrders: fn(), ordersState: "error" },
  tags: ["play-fn"],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Retry" }));
    await expect(args.onRetryOrders).toHaveBeenCalled();
  },
};

export const OrdersPermissionRestricted: Story = {
  args: { defaultTab: "orders", ordersState: "permission-restricted" },
};

/** A returning-patient order stays in the resizable rail until review. */
export const OrderPlacementAndRecord: Story = {
  args: {
    defaultTab: "orders",
    patient: SOKHA_CHANN,
    rail: (
      <PatientContextRail
        patient={{
          demographics: `${SOKHA_CHANN.age} y · ${SOKHA_CHANN.sexAtBirth} · MRN ${SOKHA_CHANN.mrnMasked}`,
          initials: "SC",
          name: SOKHA_CHANN.displayName,
        }}
        reasonForVisit={DEMO_TOUR_CHART.reasonForVisit}
        safety={DEMO_TOUR_CHART.safety}
        sections={DEMO_TOUR_CHART.sections}
        showIdentity={false}
        todaySummary={DEMO_TOUR_CHART.todaySummary}
      />
    ),
    results: SOKHA_CHANN_RESULTS,
  },
  render: (args) => {
    function Harness() {
      const [orders, setOrders] =
        useState<readonly PatientOrder[]>(DEMO_ORDERS);
      const [orderOpen, setOrderOpen] = useState(false);
      const [selectedTab, setSelectedTab] = useState<
        "overview" | "orders" | "results"
      >("orders");
      const [focusedOrderId, setFocusedOrderId] = useState<string>();

      return (
        <PatientChart
          {...args}
          actionRail={
            orderOpen ? (
              <LabOrderRail
                categories={LAB_CATALOG_CATEGORIES}
                onClose={() => setOrderOpen(false)}
                onReview={(selectedTestIds) => {
                  const nextOrder: PatientOrder = {
                    ordId: "ord-new",
                    code: "AB12801",
                    placedAtLabel: "Placed just now",
                    status: "placed",
                    lineItems: LAB_CATALOG_TESTS.filter((test) =>
                      selectedTestIds.includes(test.testCatalogId),
                    ).map((test) => ({
                      code: test.abbrv ?? test.code,
                      displayName: test.displayName,
                    })),
                  };
                  setOrders((current) => [nextOrder, ...current]);
                  setFocusedOrderId(nextOrder.ordId);
                  setOrderOpen(false);
                  setSelectedTab("orders");
                }}
                tests={LAB_CATALOG_TESTS}
              />
            ) : (
              <NextActionsRail
                onOrder={() => setOrderOpen(true)}
                patientName="Sokha Chann"
              />
            )
          }
          actionRailMode={orderOpen ? "workspace" : "launcher"}
          focusedOrderId={focusedOrderId}
          onTabChange={(tab) => {
            setFocusedOrderId(undefined);
            setSelectedTab(tab);
          }}
          orders={orders}
          selectedTab={selectedTab}
        />
      );
    }

    return <Harness />;
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ordersTab = canvas.getByRole("tab", { name: "Orders, 1 active" });
    const before = ordersTab.getBoundingClientRect();
    await expect(ordersTab).toHaveAttribute("aria-selected", "true");

    await userEvent.click(canvas.getByRole("button", { name: /^Order tests/ }));
    await expect(
      canvas.getByRole("heading", { name: "Order lab tests" }),
    ).toBeVisible();
    await expect(ordersTab).toHaveAttribute("aria-selected", "true");
    expect(
      Math.abs(ordersTab.getBoundingClientRect().top - before.top),
    ).toBeLessThanOrEqual(1);
    await expect(
      canvas.getByRole("separator", {
        name: "Resize patient chart and action workspace",
      }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("checkbox", { name: "HbA1c" }));
    await userEvent.click(
      canvas.getByRole("checkbox", { name: /^Creatinine \+ eGFR/ }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Review order" }));
    await expect(
      canvas.getByRole("tab", { name: "Orders, 2 active" }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByText("AB12801").closest('[role="listitem"]'),
    ).toHaveAttribute("data-focused", "true");
    await expect(
      canvas.getByRole("heading", {
        name: "What should we do with Sokha Chann today?",
      }),
    ).toBeVisible();
  },
};

export const ResultsTab: Story = {
  args: { defaultTab: "results" },
};

/** Sighted-document verification: choose a type, verify, badge clears. */
export const VerifyIdentityFlow: Story = {
  args: { patient: LINA_PRUM_UNVERIFIED },
  tags: ["play-fn"],
  render: (args) => {
    function Harness() {
      const [patient, setPatient] =
        useState<PatientSummary>(LINA_PRUM_UNVERIFIED);
      return (
        <ChartFrame>
          <PatientChart
            {...args}
            onVerifyIdentity={() =>
              setPatient({ ...patient, assurance: "verified" })
            }
            patient={patient}
          />
        </ChartFrame>
      );
    }
    return <Harness />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("radio", { name: "Passport" }));
    await userEvent.click(
      canvas.getByRole("button", { name: "Verify identity" }),
    );
    await expect(canvas.queryByText("Provisional")).not.toBeInTheDocument();
  },
};

export const SwitchPatient: Story = {
  tags: ["play-fn"],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Switch patient" }),
    );
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      await body.findByRole("button", { name: /Dara Pich/ }),
    );
    await expect(args.onSwitchPatient).toHaveBeenCalledWith("p-dara-pich");
  },
};

/** Terminal guard: no tabs, no rail, no clinical work. */
export const Deceased: Story = {
  args: { patient: CHAN_THOEUN_DECEASED },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("This patient is deceased"),
    ).toBeInTheDocument();
    await expect(canvas.queryByRole("tab")).not.toBeInTheDocument();
  },
};

export const Merged: Story = {
  args: { patient: MALIS_KEO_MERGED, onOpenMergedRecord: fn() },
  tags: ["play-fn"],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open current record" }),
    );
    await expect(args.onOpenMergedRecord).toHaveBeenCalled();
  },
};

export const NoOrders: Story = {
  args: { defaultTab: "orders", orders: [] },
};

export const Loading: Story = {
  args: { state: "loading" },
};

export const NotFound: Story = {
  args: { state: "not-found" },
};

export const ErrorAndRecovery: Story = {
  args: { state: "error", onRetry: fn() },
};

export const MobileWidth390: Story = {
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />,
  },
  globals: { viewport: { value: "kura390" } },
};

export const MobileWidth320: Story = {
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />,
  },
  globals: { viewport: { value: "kura320" } },
};

/** Governing desktop reference for the same launcher-to-flow responsibility split. */
export const DesktopWidth1440: Story = {
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />,
    defaultTab: "results",
    results: SOKHA_CHANN_RESULTS,
  },
  decorators: [
    (Story) => (
      <div style={{ blockSize: "800px", inlineSize: "1440px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const chart = canvasElement.querySelector<HTMLElement>(
      '[data-slot="patient-chart"]',
    );
    const header = canvasElement.querySelector<HTMLElement>(
      '[data-slot="patient-chart-header"]',
    );
    const context = canvasElement.querySelector<HTMLElement>(
      '[data-slot="patient-chart-context-scroll"]',
    );
    const record = canvasElement.querySelector<HTMLElement>(
      '[data-slot="patient-chart-record-scroll"]',
    );
    const actions = canvasElement.querySelector<HTMLElement>(
      '[data-slot="patient-chart-action-scroll"]',
    );

    await expect(chart).not.toBeNull();
    await expect(header).not.toBeNull();
    await expect(context).not.toBeNull();
    await expect(record).not.toBeNull();
    await expect(actions).not.toBeNull();

    const viewportHeight = canvasElement.ownerDocument.defaultView?.innerHeight;
    expect(chart!.getBoundingClientRect().height).toBe(viewportHeight);
    expect(getComputedStyle(chart!).overflow).toBe("hidden");
    expect(getComputedStyle(context!).overflowY).toBe("auto");
    expect(getComputedStyle(record!).overflowY).toBe("auto");
    expect(getComputedStyle(actions!).overflowY).toBe("auto");
    expect(getComputedStyle(context!).scrollbarWidth).toBe("none");
    expect(getComputedStyle(record!).scrollbarWidth).toBe("none");
    expect(getComputedStyle(actions!).scrollbarWidth).toBe("none");
    const safetyLabel = canvasElement.querySelector<HTMLElement>(
      "#patient-context-safety",
    )?.parentElement;
    const safetyVisibleStart = safetyLabel?.firstElementChild as HTMLElement | null;
    const resultHeading = canvasElement.querySelector<HTMLElement>(
      '[data-slot="lab-history-browser"] h2',
    );
    const actionHeading = actions!.querySelector<HTMLElement>("h2");
    await expect(safetyLabel).not.toBeNull();
    await expect(safetyVisibleStart).not.toBeNull();
    await expect(resultHeading).not.toBeNull();
    await expect(actionHeading).not.toBeNull();

    const visibleInset = (content: HTMLElement, region: HTMLElement) =>
      content.getBoundingClientRect().left -
      region.getBoundingClientRect().left;
    const targetInset = visibleInset(actionHeading!, actions!);
    expect(
      Math.abs(visibleInset(safetyVisibleStart!, context!) - targetInset),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs(visibleInset(resultHeading!, record!) - targetInset),
    ).toBeLessThanOrEqual(1);
    const contextComposition = context!.querySelector<HTMLElement>(
      '[data-slot="patient-context-rail"]',
    );
    await expect(contextComposition).not.toBeNull();
    expect(getComputedStyle(contextComposition!).borderInlineEndWidth).toBe(
      "0px",
    );

    const headerTop = header!.getBoundingClientRect().top;
    record!.scrollTop = 160;
    await waitFor(() => expect(record!.scrollTop).toBeGreaterThan(0));
    expect(header!.getBoundingClientRect().top).toBe(headerTop);
    expect(context!.scrollTop).toBe(0);
    expect(actions!.scrollTop).toBe(0);
  },
};
