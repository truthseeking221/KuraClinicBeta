import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { READINESS } from "../../components/foundations/readiness-data";
import {
  DEMO_MATCH_PATIENT,
  DEMO_SHARED_PHONE_PATIENTS,
} from "../phone-gate/demo-data";

import { CARE_LOOP_DEMO_INTAKE_RECORD } from "./demo-data";
import { PatientAcquisitionFlow } from "./patient-acquisition-flow";

const FILLING_PROGRESS = {
  openedLabel: "3 min ago",
  items: [
    {
      label: "Reason for visit",
      answer: "Tired for 2 weeks, wants a general checkup",
    },
    { label: "Drug allergies", answer: "None" },
    { label: "Current medications" },
    { label: "Family and medical history" },
  ],
} as const;

const meta = {
  title: "Clinic/Flows/Patient Acquisition and Intake",
  component: PatientAcquisitionFlow,
  tags: ["autodocs", "source-figma", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: {
      readiness: READINESS.flows,
      source: {
        figma:
          "https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-18526",
        node: "1485:18526",
        intakeContextNode: "1485:19716",
        orderJourneyNode: "1547:110756",
        intakeContextStates: {
          unknown: "1303:2146",
          sent: "1303:7965",
          filling: "1303:7378",
          complete: "1303:8358",
        },
      },
      intake: {
        decision: "COMPOSE + FEATURE-OWN",
        owner: "src/features/care-loop",
        evidence:
          "Composes the canonical PhoneGateModal and Kura primitives. Patient acquisition closes into persistent patient context; intake is represented as an owned asynchronous handoff rather than a temporary journey stepper.",
        exclusions: [
          "The contradictory Dara/Sok Nimol identities in the source board are replaced by one patient manifest.",
          "Phone verification remains a delivery-channel check; it never claims patient identity verification.",
          "The patient surface excludes clinic navigation, internal timelines, role badges, and medical record identifiers.",
          "SMS delivery, patient persistence, and intake writes are deterministic Storybook fixtures.",
          "Skip for now remains disabled until a backend skip reason, audit, and recovery contract exists.",
        ],
      },
      journeys: [
        "patient-acquisition",
        "phone-check",
        "patient-intake",
        "order-handoff",
      ],
    },
    docs: {
      description: {
        component:
          "Executable clinic-side journey from an empty list through phone verification, provisional patient creation, and intake into the canonical patient-aware lab-order workspace. Patient answers remain explicitly patient-reported; delivery, persistence, and order mutations are target-contract fixtures. Demo SMS code: 123456.",
      },
    },
  },
  args: {
    initialStage: "patients-empty",
    intakeSendDelayMs: 0,
    intakeSendResult: "success",
    phoneGateDelayMs: 0,
  },
} satisfies Meta<typeof PatientAcquisitionFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClinicJourneyToIntakeHandoff: Story = {
  args: {
    demoIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    intakeSendDelayMs: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await expect(
      canvas.getByRole("heading", { name: "Add a patient" }),
    ).toBeVisible();
    await expect(
      canvas.queryByLabelText("Journey progress"),
    ).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("button", { name: "Enter contact number" }),
    );
    await expect(
      await screen.findByRole("heading", { name: "Contact phone number" }),
    ).toBeVisible();
    await expect(
      canvas.queryByLabelText("Journey progress"),
    ).not.toBeInTheDocument();
    await userEvent.type(
      await screen.findByRole("textbox", { name: /Contact phone number/ }),
      "099111222",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send SMS code" }),
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "SMS code" }),
      "123456",
    );
    await userEvent.click(screen.getByRole("button", { name: "Verify code" }));

    await userEvent.type(
      await screen.findByLabelText(/Full name/),
      "Sok Nimol",
    );
    await userEvent.type(screen.getByLabelText(/Date of birth or age/), "32");
    await userEvent.click(screen.getByRole("radio", { name: "Male" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Create provisional patient" }),
    );

    await waitFor(async () => {
      await expect(
        canvas.getByText(/We don’t know enough about Sok Nimol yet/),
      ).toBeVisible();
    });
    await expect(
      canvas.queryByLabelText("Journey progress"),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByLabelText("Patient context for Sok Nimol"),
    ).toBeVisible();
    await expect(
      canvas.getByText("Allergy status not yet confirmed"),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Send intake link" }),
    );
    await expect(canvas.getByText("Sending intake link")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Sending" }),
    ).toBeDisabled();
    await expect(
      await canvas.findByText("Intake received for Sok Nimol"),
    ).toBeVisible();
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.reasonForVisit)[0],
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /^Current medications/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("button", { name: /^Past history/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(
      canvas.getByRole("button", { name: "Order baseline tests" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Lab order" }),
    ).toBeVisible();
    await expect(canvas.getByText("Nothing here yet")).toBeVisible();
    await expect(
      canvas.getByLabelText("Patient context for Sok Nimol"),
    ).toBeVisible();
  },
};

export const IntakeUnknown: Story = {
  args: { initialStage: "intake-unknown" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByLabelText("Patient context for Sok Nimol"),
    ).toBeVisible();
    await expect(
      canvas.getByText("Allergy status not yet confirmed"),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Skip for now" }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: "Send intake link" }),
    ).toBeEnabled();
  },
};

export const IntakeArrival: Story = {
  args: {
    demoIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: "intake-unknown",
    intakeSendDelayMs: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sending replaces the button that was just pressed. The answers confirm in order, the next action follows them, and focus lands on it instead of falling back to the page.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Send intake link" }),
    );
    const order = await canvas.findByRole("button", {
      name: "Order baseline tests",
    });
    await expect(
      canvas.getByText("Intake received for Sok Nimol"),
    ).toBeVisible();
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.allergies)[0],
    ).toBeVisible();
    await expect(order).toHaveFocus();
  },
};

export const IntakeSent: Story = {
  args: { initialStage: "intake-requested" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Intake sent, waiting for Sok Nimol/),
    ).toBeVisible();
    await expect(canvas.getAllByText("Waiting…")).toHaveLength(4);
    await expect(canvas.getByRole("button", { name: "Resend" })).toBeEnabled();
  },
};

export const ExistingPatientFound: Story = {
  args: {
    initialStage: "phone-gate",
    lookup: () => ({ kind: "known_match", patient: DEMO_MATCH_PATIENT }),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The number already belongs to someone. Creating a second record here is how a patient ends up with two histories, so the known record leads and creating a new one stays the deliberate second choice.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.type(
      await screen.findByRole("textbox", { name: /Contact phone number/ }),
      "099111222",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send SMS code" }),
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "SMS code" }),
      "123456",
    );
    await userEvent.click(screen.getByRole("button", { name: "Verify code" }));

    await expect(await screen.findByText("Sokha Chann")).toBeVisible();
  },
};

export const SharedHouseholdPhone: Story = {
  args: {
    initialStage: "phone-gate",
    lookup: () => ({
      kind: "shared_matches",
      candidates: DEMO_SHARED_PHONE_PATIENTS,
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          "One number, a mother and her two children. A verified phone proves the clinic can reach this number and nothing about who is standing at the desk, so the candidates are a single deliberate choice rather than three competing actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.type(
      await screen.findByRole("textbox", { name: /Contact phone number/ }),
      "099111222",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send SMS code" }),
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "SMS code" }),
      "123456",
    );
    await userEvent.click(screen.getByRole("button", { name: "Verify code" }));

    await expect(
      await screen.findByText("This number is linked to 3 patients"),
    ).toBeVisible();
    await expect(
      screen.getByRole("radio", { name: /Sophea Chann/ }),
    ).toBeVisible();
    await expect(
      screen.getByRole("radio", { name: /Visal Heng/ }),
    ).toBeVisible();
  },
};

export const IntakeFilling: Story = {
  args: {
    initialStage: "intake-requested",
    intakeProgress: FILLING_PROGRESS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'While the clinic waits, it can see how far the patient has got. Unanswered questions stay listed rather than hidden, so "two answered" is legible as progress instead of a stalled link.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/2 of 4 answered · opened 3 min ago/),
    ).toBeVisible();
    await expect(
      canvas.getAllByText("Tired for 2 weeks, wants a general checkup")[0],
    ).toBeVisible();
    await expect(canvas.getAllByText("Waiting…")).toHaveLength(2);
    await expect(
      canvas.getByLabelText("Patient context for Sok Nimol"),
    ).toBeVisible();
  },
};

export const IntakeComplete: Story = {
  args: {
    initialIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: "intake-complete",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Intake received for Sok Nimol"),
    ).toBeVisible();
    await expect(
      canvas.getByText("Patient reports no known allergies"),
    ).toBeVisible();
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.reasonForVisit)[0],
    ).toBeVisible();
    const disclosureButtons = [
      canvas.getByRole("button", { name: /^Current medications/ }),
      canvas.getByRole("button", { name: /^Pending verification/ }),
      canvas.getByRole("button", { name: /^Past history/ }),
    ];
    await waitFor(async () => {
      for (const button of disclosureButtons) {
        await expect(button).toHaveAttribute("aria-expanded", "true");
      }
    });
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.medicines),
    ).toHaveLength(2);
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.familyHistory),
    ).toHaveLength(2);

    await userEvent.click(disclosureButtons[0]);
    await expect(disclosureButtons[0]).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Order baseline tests" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Lab order" }),
    ).toBeVisible();
    await expect(canvas.getByText("Nothing here yet")).toBeVisible();
    await userEvent.click(canvas.getByRole("checkbox", { name: "HbA1c" }));
    const orderCart = within(
      canvas.getByRole("complementary", { name: "Doctor order cart" }),
    );
    await expect(
      orderCart.getByRole("heading", { name: "Selected tests" }),
    ).toBeVisible();
    await expect(orderCart.getByText("HbA1c")).toBeVisible();
  },
};

export const IntakeUnknownMobile320: Story = {
  args: { initialStage: "intake-unknown" },
  parameters: { viewport: { defaultViewport: "kura320" } },
};

export const IntakeFillingTablet768: Story = {
  args: { initialStage: "intake-requested", intakeProgress: FILLING_PROGRESS },
  parameters: { viewport: { defaultViewport: "kura768" } },
};

export const IntakeCompleteMobile320: Story = {
  args: {
    initialIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: "intake-complete",
  },
  parameters: { viewport: { defaultViewport: "kura320" } },
};

export const IntakeDeliveryFailure: Story = {
  args: {
    initialStage: "intake-error",
    intakeSendResult: "error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Intake link was not sent")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Try again" }),
    ).toBeEnabled();
  },
};

export const IntakeSending: Story = {
  args: { initialStage: "intake-sending" },
};

export const PatientCompletesMedicalHistory: Story = {
  args: { initialStage: "intake-form" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Tell us about your health")).toBeVisible();
    await expect(canvas.getByText("Mekong Clinic")).toBeVisible();
    await expect(canvas.queryByText("Add a patient")).not.toBeInTheDocument();
    await expect(canvas.queryByText("P8842")).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Submit medical history" }),
    ).toBeDisabled();
  },
};

export const PatientCompletesMedicalHistoryMobile: Story = {
  args: { initialStage: "intake-form" },
  parameters: { viewport: { defaultViewport: "kura320" } },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
};
