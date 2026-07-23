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
          "No baseline order set. Ordering tests is a clinical decision after the review, never the completion condition of creating a patient or receiving an intake.",
          "Reviewing confirms an answer as read; it cannot correct or annotate one. Amending patient-reported data needs a clinical-note and amendment contract that does not exist, and a correction that lived only in this prototype would read as a chart write.",
          "The review provenance names the clinician but carries no timestamp or signature: no audit or signing contract exists.",
          "Guardian, guarantor, and proxy authority are still an open design gap. The gate accepts a guardian's phone, but who is being tested is not yet modelled separately from who holds the number.",
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
          "Executable clinic-side journey from an empty list through phone verification, provisional patient creation, and intake into the canonical patient-aware lab-order workspace. Three separate objects chain here without any of them being the completion condition of the one before: a patient record is a finished outcome, an intake is a preparation the doctor may take together, send, or decline, and a lab order is a clinical decision made after someone has read what came back. Patient answers stay patient-reported until a clinician confirms them item by item, so a check mark never means a receipt. Delivery, persistence, and order mutations are target-contract fixtures. Demo SMS code: 123456.",
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
    // A walk-in rarely knows an exact date, so the journey takes the
    // estimated-age branch: the record carries an age, never an invented date.
    await userEvent.click(
      screen.getByRole("checkbox", { name: /Exact date is unknown/ }),
    );
    await userEvent.type(await screen.findByLabelText(/Age in years/), "32");
    await userEvent.click(screen.getByRole("radio", { name: "Male" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Create provisional patient" }),
    );

    await waitFor(async () => {
      await expect(
        canvas.getByText(/Prepare the visit for Sok Nimol/),
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
    // What arrived is patient-reported and unread. Ordering is not offered
    // until a clinician has been through it.
    await expect(
      await canvas.findByText("Patient-reported intake"),
    ).toBeVisible();
    await expect(
      canvas.getByText(/Not yet reviewed by a clinician/),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Order lab tests" }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.reasonForVisit)[0],
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /^Current medications/ }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("button", { name: /^Past history/ }),
    ).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(canvas.getByRole("button", { name: "Review intake" }));
    // Each answer is its own control, and the review is not finished until
    // every one of them has been read.
    const panel = within(
      canvas.getByRole("region", { name: "Patient intake status" }),
    );
    await expect(
      canvas.getByRole("button", { name: "Mark intake reviewed" }),
    ).toBeDisabled();
    for (const row of panel.getAllByRole("button", { pressed: false })) {
      await userEvent.click(row);
    }
    await userEvent.click(
      canvas.getByRole("button", { name: "Mark intake reviewed" }),
    );
    await expect(canvas.getByText("Intake reviewed")).toBeVisible();
    await expect(canvas.getByText(/Reviewed by Dr\./)).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Order lab tests" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Order lab tests" }),
    ).toBeVisible();
    await expect(canvas.getByText("For Sok Nimol")).toBeVisible();
    await expect(canvas.getByText("Nothing here yet")).toBeVisible();
    await expect(
      canvas.getByLabelText("Patient context for Sok Nimol"),
    ).toBeVisible();
  },
};

/**
 * Three real paths, because a new patient is not automatically an intake:
 * take the answers together while the patient is here, send a link, or
 * continue without one and carry the missing context openly.
 */
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
      canvas.getByRole("button", { name: "Complete with patient" }),
    ).toBeEnabled();
    await expect(
      canvas.getByRole("button", { name: "Send intake link" }),
    ).toBeEnabled();
    await expect(
      canvas.getByRole("button", { name: "Continue without intake" }),
    ).toBeEnabled();
    await expect(
      canvas.getByText("Allergies, medicines and history stay unknown."),
    ).toBeVisible();
  },
};

/**
 * Declining is a decision, not a dead end. The record continues with its gaps
 * stated, and ordering tests is still a choice rather than the only exit.
 */
export const ContinueWithoutIntake: Story = {
  args: { initialStage: "intake-unknown" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Continue without intake" }),
    );
    await expect(canvas.getByText("Continuing without intake")).toBeVisible();
    await expect(
      canvas.getByText("Allergies, medicines and history stay unknown."),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Order lab tests" }),
    ).toBeEnabled();
    await expect(
      canvas.getByRole("button", { name: "Done for now" }),
    ).toBeEnabled();
  },
};

/**
 * Answers taken with the patient in the room already had a clinician present,
 * so they carry that provenance instead of being handed back for a review of
 * the four lines just typed.
 */
export const CompleteIntakeWithPatient: Story = {
  args: { initialStage: "intake-unknown" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Complete with patient" }),
    );
    await expect(
      await canvas.findByRole("heading", { name: "Tell us about your health" }),
    ).toBeVisible();
    // This record has an exact date, so the row is a date of birth. A record
    // created from an estimated age shows "Age" instead — never both in one
    // combined field.
    await expect(canvas.getByText("Date of birth")).toBeVisible();
    await expect(canvas.getByText("1994-02-18")).toBeVisible();

    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: /I confirm these personal details are correct/,
      }),
    );
    await userEvent.type(canvas.getByLabelText(/^Allergies/), "None known");
    await userEvent.type(canvas.getByLabelText(/^Current medicines/), "None");
    await userEvent.type(
      canvas.getByLabelText(/^Current symptoms/),
      "Tired for 2 weeks",
    );
    await userEvent.type(canvas.getByLabelText(/^Family history/), "None known");
    await userEvent.click(
      canvas.getByRole("button", { name: "Submit medical history" }),
    );

    await expect(
      await canvas.findByText("Intake recorded with the patient"),
    ).toBeVisible();
    await expect(canvas.getByText(/Recorded by Dr\./)).toBeVisible();
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
    const review = await canvas.findByRole("button", { name: "Review intake" });
    await expect(canvas.getByText("Patient-reported intake")).toBeVisible();
    await expect(
      canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.allergies)[0],
    ).toBeVisible();
    await expect(review).toHaveFocus();
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
    await expect(canvas.getByText("Patient-reported intake")).toBeVisible();
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
    await userEvent.click(canvas.getByRole("button", { name: "Review intake" }));
    const panel = within(
      canvas.getByRole("region", { name: "Patient intake status" }),
    );
    for (const row of panel.getAllByRole("button", { pressed: false })) {
      await userEvent.click(row);
    }
    await userEvent.click(
      canvas.getByRole("button", { name: "Mark intake reviewed" }),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Order lab tests" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Order lab tests" }),
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

/**
 * The review is the work, not a receipt. Each answer is one control, the
 * marks stay empty until a clinician reads them, and the review cannot be
 * finished on a partial pass.
 */
export const IntakeReview: Story = {
  args: {
    initialIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: "intake-review",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panel = within(
      canvas.getByRole("region", { name: "Patient intake status" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Review patient-reported intake" }),
    ).toBeVisible();
    await expect(canvas.getByText("0 of 4 confirmed")).toBeVisible();

    const rows = panel.getAllByRole("button", { pressed: false });
    await expect(rows).toHaveLength(4);
    await userEvent.click(rows[0]);
    await expect(canvas.getByText("1 of 4 confirmed")).toBeVisible();
    // A partly read intake is not a reviewed one.
    await expect(
      canvas.getByRole("button", { name: "Mark intake reviewed" }),
    ).toBeDisabled();

    // Confirming is reversible: a misread answer can be put back.
    await userEvent.click(rows[0]);
    await expect(canvas.getByText("0 of 4 confirmed")).toBeVisible();
  },
};

/**
 * After the review, ordering tests is one option among the clinical decisions
 * a visit can end with — including ordering nothing.
 */
export const ReviewedNextStep: Story = {
  args: {
    initialIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: "next-step",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Intake reviewed")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Done for now" }),
    ).toBeEnabled();
    await userEvent.click(
      canvas.getByRole("button", { name: "Order lab tests" }),
    );
    await expect(
      canvas.getByRole("heading", { name: "Order lab tests" }),
    ).toBeVisible();
    // The doctor's decision, not step 1 of someone else's five-step wizard.
    await expect(canvas.queryByText(/Step 1 of/)).not.toBeInTheDocument();
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
