import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  DEMO_DIAGNOSES,
  DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
  DEMO_LEGACY_ICD10_FLAGGED_LABS,
  DEMO_LEGACY_ICD10_SEARCH_POOL,
  DEMO_NEEDS_REVIEW,
  DEMO_SEARCH_POOL,
  DEMO_SETTLED,
  DEMO_SUGGESTIONS,
} from "./demo-data";
import { PrescribeFlow } from "./prescribe-flow";
import styles from "./prescribe-rail.stories.module.css";
import { PRESCRIBE_STORYBOOK_KURA } from "./storybook-metadata";

const meta = {
  title: "Clinic/Flows/Prescribing",
  component: PrescribeFlow,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: {
      ...PRESCRIBE_STORYBOOK_KURA,
      flow: {
        pages: [
          "Clinic/Clinical/Patients/ICD-10 Diagnosis Rail",
          "Clinic/Clinical/Patients/Prescribing/Medication Draft",
        ],
        terminal: "Clinician returns an unsigned local medication draft",
      },
      intake: {
        ...PRESCRIBE_STORYBOOK_KURA.intake,
        decision: "COMPOSE",
        owner: "src/features/patients/prescribe-flow.tsx",
        evidence:
          "The existing ICD-10 diagnosis rail owns indication selection and the medication draft owns whole-regimen review. This flow preserves both drafts while moving between them.",
      },
      journeys: ["ENC-03", "ENC-09"],
    },
    docs: {
      description: {
        component:
          "Medication review begins with a patient-linked ICD-10 draft indication, then keeps that context visible through the unsigned medication draft.",
      },
    },
  },
  args: {
    patientName: "Sok Nimol",
    diagnoses: DEMO_DIAGNOSES,
    diagnosisSuggestions: DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
    diagnosisSearchCandidates: DEMO_LEGACY_ICD10_SEARCH_POOL,
    flaggedLabs: DEMO_LEGACY_ICD10_FLAGGED_LABS,
    needsReview: DEMO_NEEDS_REVIEW,
    suggestions: DEMO_SUGGESTIONS,
    settled: DEMO_SETTLED,
    searchPool: DEMO_SEARCH_POOL,
    onClose: fn(),
    onComplete: fn(),
  },
  decorators: [
    (Story) => (
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PrescribeFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Existing chart diagnoses are ready to confirm without clerical re-entry. */
export const ExistingDiagnoses: Story = {
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Select diagnosis" }),
    ).toBeVisible();
    await expect(canvas.getByText("Selected diagnoses")).toBeVisible();
    await expect(canvas.getByText("HbA1c 8.9% · not repeated")).toBeVisible();
    await expect(canvas.getByText("eGFR 11 · albuminuria")).toBeVisible();
    await expect(canvas.getByText("AI suggestions")).toBeVisible();
    await expect(
      canvas.getByRole("combobox", { name: "Search or add diagnosis" }),
    ).toHaveAttribute("placeholder", "Code or diagnosis name");
    const next = canvas.getByRole("button", { name: /Review medicines/ });
    await expect(next).toBeEnabled();
  },
};

/** Missing indication blocks the medication step until the clinician selects one. */
export const SelectDiagnosisToContinue: Story = {
  args: { diagnoses: [] },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const next = canvas.getByRole("button", { name: "Review medicines" });
    await expect(next).toBeDisabled();
    await userEvent.click(canvas.getByRole("checkbox", { name: /Add N18\.3/ }));
    await expect(next).toBeEnabled();
    await userEvent.click(next);
    await expect(
      canvas.getByRole("heading", { name: "Prescribe" }),
    ).toBeVisible();
  },
};

/** Returning to diagnosis selection does not discard medication work. */
export const PreserveMedicationDraft: Story = {
  args: { needsReview: [] },
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: /Review medicines/ }),
    );
    const aiRegion = canvas.getByRole("region", { name: "AI suggestions" });
    await userEvent.click(
      within(aiRegion).getAllByRole("button", { name: "Add to draft" })[0],
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Change diagnoses" }),
    );
    await userEvent.click(
      canvas.getByRole("button", { name: /Review medicines/ }),
    );
    await expect(
      canvas.getByRole("list", { name: "Draft additions" }),
    ).toBeVisible();
    await expect(canvas.getByText("AI suggestion")).toBeVisible();
  },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: "kura320" } },
};
