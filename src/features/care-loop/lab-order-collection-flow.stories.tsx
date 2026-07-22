import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { READINESS } from "../../components/foundations/readiness-data";

import { LabOrderSampleCollectionFlow } from "./lab-order-collection-flow";
import { careLoopLabOrderJourney } from "./demo-data";

const meta = {
  title: "Clinic/Flows/Lab Order and Sample Collection",
  component: LabOrderSampleCollectionFlow,
  tags: ["autodocs", "source-figma", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: {
      readiness: READINESS.flows,
      source: {
        figma:
          "https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1547-110756",
        node: "1547:110756",
      },
      intake: {
        decision: "COMPOSE + FEATURE-OWN",
        owner: "src/features/care-loop",
        evidence:
          "Composes the canonical LabTestPicker, OrderCart, ScanGate, DrawWorksheet, TubeLabeling, and Stepper. The doctor self-collection route follows the source sequence: collect, label, verify labels, and sample pickup.",
        exclusions: [
          "The changing patient and order counts in the source board are replaced by one patient and one order; the tests selected by the doctor determine the traceable tubes.",
          "Urine tests shown in the source cart are excluded until Collection owns a canonical urine-container contract.",
          "Courier and result states are deterministic target-contract fixtures; readiness remains Partial until event producers exist.",
          "The verification QR is a clearly identified prototype affordance because no live phone-session contract exists yet.",
        ],
      },
      journeys: [
        "lab-test-selection",
        "cash-payment",
        "positive-id-collection",
        "specimen-handoff",
        "awaiting-results",
      ],
    },
    docs: {
      description: {
        component:
          "Executable lab-order journey for one patient. Doctor self-collection follows the Figma source from tube preparation through label verification and courier pickup; staffed Kura collection retains its positive-ID handoff route.",
      },
    },
  },
  args: { initialStage: "ordering" },
} satisfies Meta<typeof LabOrderSampleCollectionFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_COLLECTION_TESTS = [
  /^PT \/ INR$/,
  /^Lipid panel/,
  /^Ferritin$/,
  /^Complete blood count/,
  /^Fasting glucose$/,
] as const;

async function selectCollectionTests(canvas: ReturnType<typeof within>) {
  for (const name of FIGMA_COLLECTION_TESTS) {
    await userEvent.click(canvas.getByRole("checkbox", { name }));
  }
}

export const EmptyBeforeSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Order Cart" }),
    ).toBeVisible();
    await expect(canvas.getByText("Nothing here yet")).toBeVisible();
    await expect(
      canvas.queryByRole("heading", { name: "Selected tests" }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole("button", { name: "Send booking code" }),
    ).not.toBeInTheDocument();
  },
};

export const CatalogSelectionPopulatesCart: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const testName of [
      "HbA1c",
      "Fasting glucose",
      "OGTT (gestational)",
      "Insulin",
      "Fructosamine",
      "2h postprandial",
      "Apolipoprotein B",
    ]) {
      await userEvent.click(canvas.getByRole("checkbox", { name: testName }));
    }

    await expect(
      canvas.getByRole("heading", { name: "Selected tests" }),
    ).toBeVisible();
    await expect(canvas.getByLabelText("7 tests selected")).toBeVisible();
    await expect(canvas.getByText("HbA1c", { selector: "li *" })).toBeVisible();
    await expect(
      canvas.getByText("Apolipoprotein B", { selector: "li *" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Prepare Tubes" }),
    ).toBeVisible();
  },
};

export const FullJourney: Story = {
  args: {
    initialDecisions: {
      collectBy: "kura",
      drawSite: "kura-psc",
      payment: "pay-later-kura",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await selectCollectionTests(canvas);
    await expect(
      canvas.getByRole("heading", { name: "Selected tests" }),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Send booking code" }),
    );

    await userEvent.click(
      canvas.getByRole("button", { name: "Set up payment" }),
    );
    await userEvent.click(
      canvas.getByRole("radio", { name: "Cash at the desk" }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Done" }));
    await userEvent.click(
      canvas.getByRole("checkbox", { name: /I have collected/ }),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Confirm payment & check in" }),
    );

    const patientId = canvas.getByLabelText("Patient ID");
    await userEvent.type(patientId, "P8842{Enter}");
    for (const label of [
      "Patient ID confirmed",
      "Fasting status checked",
      "Allergies reviewed",
      "Patient consented",
      "Site confirmed (L/R arm)",
    ]) {
      await userEvent.click(canvas.getByRole("checkbox", { name: label }));
    }
    await userEvent.click(
      canvas.getByRole("button", { name: "Mark all collected" }),
    );
    for (const button of canvas.getAllByRole("button", { name: /Invert ×/ })) {
      await userEvent.click(button);
    }
    await userEvent.click(
      canvas.getByRole("button", { name: "Submit collection & next patient" }),
    );

    await userEvent.click(
      canvas.getByRole("button", { name: "I have labelled all 4 tubes" }),
    );

    await userEvent.click(
      canvas.getByRole("combobox", { name: "Pickup round" }),
    );
    await userEvent.click(
      screen.getByRole("option", { name: "10:30 · Morning pickup" }),
    );
    await waitFor(async () => {
      await expect(
        canvas.getByRole("combobox", { name: "Pickup round" }),
      ).toHaveTextContent("10:30 · Morning pickup");
    });
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Tube labels match the patient and order.",
      }),
    );
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Tube count matches the handoff summary.",
      }),
    );
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Specimen bag is sealed for transport.",
      }),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Mark samples ready" }),
    );
    await expect(canvas.getByText("Samples ready")).toBeVisible();
    await expect(
      canvas.getByText("Waiting for a courier assignment."),
    ).toBeVisible();
  },
};

export const DoctorSelfDrawJourney: Story = {
  args: {
    initialDecisions: { collectBy: "self", payment: "pay-now" },
    presentation: "workspace",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The ordering clinician prepares the required tubes, labels every collected sample, verifies one photo per tube, and chooses a courier pickup round.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await selectCollectionTests(canvas);
    const prepare = canvas.getByRole("button", { name: "Prepare Tubes" });
    await expect(prepare).toBeDisabled();
    await userEvent.click(
      canvas.getByRole("checkbox", { name: /I have collected/ }),
    );
    await waitFor(async () => {
      await expect(prepare).toBeEnabled();
    });
    await userEvent.click(prepare);
    await expect(
      canvas.getByRole("heading", { name: "Prepare collection tubes" }),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "I have collected all 4 tubes" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Label collected samples" }),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Next: Scan QR to verify labels" }),
    );
    await expect(
      canvas.getByRole("heading", {
        name: "Capture photos for label verification",
      }),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Open photo checklist" }),
    );
    for (const button of canvas.getAllByRole("button", {
      name: "Capture photo",
    })) {
      await userEvent.click(button);
    }
    await expect(canvas.getByText("4/4 photos captured")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Ready for sample pickup" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Prepare samples for pickup" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("radio", { name: /2:30 PM/ }));
    await userEvent.click(
      canvas.getByRole("button", { name: "Mark samples ready" }),
    );
    await expect(canvas.getByText("Samples ready")).toBeVisible();
    await expect(
      canvas.getByText("Waiting for a courier assignment."),
    ).toBeVisible();
  },
};

export const PrepareCollectionTubes: Story = {
  args: {
    initialStage: "prepare-tubes",
    initialDecisions: { collectBy: "self", payment: "pay-now" },
    presentation: "workspace",
  },
};

export const VerifyLabelPhotos: Story = {
  args: {
    initialStage: "verify-labels",
    initialDecisions: { collectBy: "self", payment: "pay-now" },
    presentation: "workspace",
  },
};

export const HomeCollectionJourney: Story = {
  args: {
    initialDecisions: {
      collectBy: "kura",
      drawSite: "patient-home",
      payment: "pay-later-kura",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await selectCollectionTests(canvas);
    await userEvent.click(
      canvas.getByRole("button", { name: "Send booking code" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Home visit booked" }),
    ).toBeVisible();
    await expect(canvas.getByText("Step 2 of 6")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Phlebotomist arrived, start the draw",
      }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Scan patient barcode" }),
    ).toBeVisible();
  },
};

export const DoctorDrawsAndLabelsWithStickers: Story = {
  args: {
    initialStage: "label-tubes",
    initialDecisions: { collectBy: "self", payment: "pay-now" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The doctor labels the collected samples first. Photo evidence is a separate, explicit verification step on the phone rather than hidden inside the labeling control.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("4 samples collected")).toBeVisible();
    const confirm = canvas.getByRole("button", {
      name: "Next: Scan QR to verify labels",
    });
    await expect(confirm).toBeEnabled();
    await userEvent.click(confirm);
    await expect(
      canvas.getByRole("heading", {
        name: "Capture photos for label verification",
      }),
    ).toBeVisible();
  },
};

export const DoctorDrawsAndWritesByHand: Story = {
  args: {
    initialStage: "label-tubes",
    initialDecisions: { collectBy: "self", payment: "pay-now" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Handwriting stays available when the clinic has no sticker pad. The patient identity template remains explicit, and the same downstream photo-verification gate still applies.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("radio", { name: /Write with a pen/ }),
    );
    await expect(canvas.getByText("SOK · M · 1994")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Next: Scan QR to verify labels" }),
    ).toBeEnabled();
  },
};

export const HomeBloodCollectionBooked: Story = {
  args: {
    initialStage: "home-visit-booked",
    initialDecisions: {
      collectBy: "kura",
      drawSite: "patient-home",
      payment: "pay-later-kura",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The home route. A booked visit is not a drawn sample and not a paid one: the order sits awaiting collection until a phlebotomist actually arrives.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Awaiting collection")).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Home visit booked" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", {
        name: "Phlebotomist arrived, start the draw",
      }),
    ).toBeEnabled();
  },
};

export const HandoffGate: Story = {
  args: { initialStage: "handoff" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Mark samples ready" }),
    ).toBeDisabled();
  },
};

export const LabelMismatchRecovery: Story = {
  args: {
    initialStage: "handoff",
    initialDecisions: {
      collectBy: "kura",
      drawSite: "kura-psc",
      payment: "pay-later-kura",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Labels do not match" }),
    );
    await expect(canvas.getByText("Do not hand off these tubes")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Return to labeling" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Label the tubes you drew" }),
    ).toBeVisible();
  },
};

export const DoctorSelfCollectionDoesNotOwnIdentityVerification: Story = {
  args: {
    initialJourney: careLoopLabOrderJourney({
      decisions: {
        collectBy: "kura",
        drawSite: "kura-psc",
        payment: "pay-later-kura",
      },
      // Migration fixture for sessions saved before identity ownership moved
      // entirely into Front Desk.
      selectedTestIds: ["hba1c", "fasting-glucose", "lipid-panel", "cbc"],
      stage: "identity-required" as never,
    }),
    patient: {
      age: 32,
      id: "patient-provisional",
      initials: "SP",
      name: "Sok Phearom",
      orderId: "ORD-DEMO-SP",
      sexLabel: "Not recorded",
    },
    presentation: "workspace",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Prepare collection tubes" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "I have collected all 3 tubes" }),
    ).toBeVisible();
    await expect(
      canvas.queryByText("Verify identity before collection"),
    ).not.toBeInTheDocument();
  },
};

export const PickupDelayRecovery: Story = {
  args: {
    initialStage: "pickup-delayed",
    initialDecisions: {
      collectBy: "kura",
      drawSite: "kura-psc",
      payment: "pay-later-kura",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Courier pickup is delayed")).toBeVisible();
    await expect(
      canvas.getByText("Samples remain with the clinic until the courier records pickup."),
    ).toBeVisible();
  },
};

export const AwaitingResults: Story = {
  args: { initialStage: "awaiting-results" },
};

export const SupportedHbA1cTubePlanAfterReentry: Story = {
  args: {
    initialJourney: careLoopLabOrderJourney({ stage: "prepare-tubes" }),
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1 tube for this order")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "I have collected the tube" }),
    ).toBeEnabled();
  },
};

export const MissingTubePlanStaysInOrder: Story = {
  args: {
    initialJourney: careLoopLabOrderJourney({
      selectedTestIds: ["ogtt"],
      stage: "ordering",
    }),
  },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Tube requirements are not available for OGTT (gestational)"),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Prepare Tubes" })).toBeDisabled();
  },
};

export const CourierInTransitAfterReentry: Story = {
  args: {
    initialJourney: careLoopLabOrderJourney({ stage: "in-transit" }),
  },
};

export const PartialResultsAfterReentry: Story = {
  args: {
    initialJourney: careLoopLabOrderJourney({
      flagged: 1,
      resulted: 3,
      stage: "partial-results",
      total: 10,
    }),
  },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
};
