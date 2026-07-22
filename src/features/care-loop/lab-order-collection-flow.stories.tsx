import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { READINESS } from "../../components/foundations/readiness-data";

import { LabOrderSampleCollectionFlow } from "./lab-order-collection-flow";

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
          "https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177",
        node: "1485:93177",
      },
      intake: {
        decision: "COMPOSE + FEATURE-OWN",
        owner: "src/features/care-loop",
        evidence:
          "Composes the canonical LabTestPicker, OrderCart, ScanGate, and DrawWorksheet. The flow owns only the cross-role orchestration and specimen handoff/awaiting-results states missing from Storybook.",
        exclusions: [
          "The changing patient, order, and tube counts in the source board are replaced by one patient, one order, ten blood tests, and four traceable tubes.",
          "Urine tests shown in the source cart are excluded until Collection owns a canonical urine-container contract.",
          "Courier routing, lab accession, and result values are not simulated as completed backend work.",
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
          "Executable cross-role journey for the same patient: doctor selects tests, reception records cash, the nurse completes positive-ID blood collection, specimens are prepared for pickup, and the order enters awaiting-results state.",
      },
    },
  },
  args: { initialStage: "ordering" },
} satisfies Meta<typeof LabOrderSampleCollectionFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullJourney: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await expect(canvas.getByText("10 selected")).toBeVisible();
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

    for (const label of [
      "A Kura sticker is on every tube",
      "The name and date read clearly in the photo",
      "Photo of the labelled tubes attached to the order",
    ]) {
      await userEvent.click(canvas.getByRole("checkbox", { name: label }));
    }
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
    await userEvent.click(
      canvas.getByRole("button", { name: "Record courier pickup" }),
    );

    await expect(
      canvas.getByText("Courier picked up the samples"),
    ).toBeVisible();
    await expect(canvas.getByText("Lab received")).toBeVisible();
  },
};

export const DoctorSelfDrawJourney: Story = {
  args: {
    initialDecisions: { collectBy: "self", payment: "pay-now" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The ordering clinician collects payment, confirms identity in the draw worksheet, records the draw, and only then labels the resulting tubes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prepare = canvas.getByRole("button", { name: "Prepare Tubes" });
    await expect(prepare).toBeDisabled();
    await userEvent.click(
      canvas.getByRole("checkbox", { name: /I have collected/ }),
    );
    await waitFor(async () => {
      await expect(prepare).toBeEnabled();
    });
    await userEvent.click(prepare);
    await expect(canvas.getByText("Patient ID confirmed")).toBeVisible();

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
    await expect(
      canvas.getByRole("heading", { name: "Label the tubes you drew" }),
    ).toBeVisible();
    await expect(canvas.getByText("Step 3 of 5")).toBeVisible();
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
          "The self-draw route. Nobody scanned a wristband and no desk checked the patient in, so the label is the only thing tying these tubes to the order — which is why the sticker route asks for photo evidence before the tubes leave the room.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("4 samples collected")).toBeVisible();
    const confirm = canvas.getByRole("button", {
      name: "I have labelled all 4 tubes",
    });
    await expect(confirm).toBeDisabled();
    await expect(
      canvas.getByText(
        "Confirm the photo evidence before the tubes leave the room.",
      ),
    ).toBeVisible();

    for (const label of [
      "A Kura sticker is on every tube",
      "The name and date read clearly in the photo",
      "Photo of the labelled tubes attached to the order",
    ]) {
      await userEvent.click(canvas.getByRole("checkbox", { name: label }));
    }
    await expect(confirm).toBeEnabled();
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
          "Handwriting stays available because a clinic without stickers still has to send blood. It names what the courier checks and what happens to an unreadable tube, and needs no photo because there is nothing machine-readable to photograph.",
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
      canvas.getByRole("button", { name: "I have labelled all 4 tubes" }),
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
  args: { initialStage: "handoff" },
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

export const IdentityRequiredBeforeCollection: Story = {
  args: {
    initialStage: "identity-required",
    patient: {
      age: 32,
      id: "patient-provisional",
      initials: "SP",
      name: "Sok Phearom",
      orderId: "ORD-DEMO-SP",
      sexLabel: "Not recorded",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Verify identity before collection"),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("heading", { name: "Scan patient barcode" }),
    ).not.toBeInTheDocument();
  },
};

export const PickupDelayRecovery: Story = {
  args: { initialStage: "pickup-delayed" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Courier pickup is delayed")).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Choose another pickup round" }),
    );
    await expect(
      canvas.getByRole("combobox", { name: "Pickup round" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Mark samples ready" }),
    ).toBeDisabled();
  },
};

export const AwaitingResults: Story = {
  args: { initialStage: "awaiting-results" },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
};
