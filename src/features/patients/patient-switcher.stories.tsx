import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { DEMO_PATIENTS, LONG_NAME_PATIENT } from "./demo-data";
import { PatientSwitcher } from "./patient-switcher";
import { PATIENTS_STORYBOOK_KURA } from "./storybook-metadata";

const activePatient = DEMO_PATIENTS[0]!;

const meta = {
  title: "Clinic/Clinical/Patients/Patient Switcher",
  component: PatientSwitcher,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "centered",
    kura: {
      ...PATIENTS_STORYBOOK_KURA,
      intake: {
        decision: "COMPOSE + FEATURE-OWN",
        owner: "src/features/patients/patient-switcher.tsx",
        evidence:
          "DropdownMenu is explicitly limited to short secondary actions, while Autocomplete would add prohibited name search. PatientSwitcher composes the canonical Popover, Avatar, Badge, and IconButton around the workspace patient-list contract so each selection retains identity context.",
        exclusions: [
          "No free-text search: patient names have no searchable backend index, and local filtering would misrepresent that contract.",
          "No patient data, permissions, or navigation logic is duplicated here; the chart owner supplies the records and handles the selected user ID.",
        ],
      },
    },
    docs: {
      description: {
        component:
          "An anchored chart identity switcher. Each alternative retains the identifiers and state needed to distinguish the correct patient before navigation.",
      },
    },
  },
  args: {
    patient: activePatient,
    patients: DEMO_PATIENTS,
    onSwitchPatient: fn(),
  },
} satisfies Meta<typeof PatientSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["play-fn"],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Switch patient" });
    const restingBackground = getComputedStyle(trigger).backgroundColor;

    await expect(getComputedStyle(trigger).marginInlineStart).toBe("-4px");
    await userEvent.hover(trigger);
    await expect(getComputedStyle(trigger).backgroundColor).toBe(restingBackground);
    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog", { name: "Switch patient" });
    await expect(within(dialog).getByText("61 · M · MRN ··87")).toBeVisible();
    const daraRow = within(dialog).getByRole("button", { name: /Dara Pich/ });
    await expect(within(daraRow).getByText("Verified")).toBeVisible();

    await userEvent.click(daraRow);
    await expect(args.onSwitchPatient).toHaveBeenCalledWith("p-dara-pich");
  },
};

export const TerminalAlternative: Story = {
  tags: ["play-fn"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Switch patient" }));

    const dialog = await within(canvasElement.ownerDocument.body).findByRole("dialog", {
      name: "Switch patient",
    });
    await expect(within(dialog).getByText("Deceased")).toBeVisible();
    await expect(within(dialog).getByText("Merged")).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    patients: [activePatient, LONG_NAME_PATIENT],
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
};
