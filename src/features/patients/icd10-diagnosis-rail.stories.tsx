import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
  DEMO_LEGACY_ICD10_FLAGGED_LABS,
  DEMO_LEGACY_ICD10_SEARCH_POOL,
} from "./demo-data";
import {
  Icd10DiagnosisRail,
  type Icd10DiagnosisRailProps,
} from "./icd10-diagnosis-rail";
import railStoryStyles from "./prescribe-rail.stories.module.css";
import { PATIENTS_STORYBOOK_KURA } from "./storybook-metadata";

function Harness({
  selectedIds: initialSelectedIds = [],
  onAdd,
  onRemove,
  ...props
}: Icd10DiagnosisRailProps) {
  const [selectedIds, setSelectedIds] =
    useState<readonly string[]>(initialSelectedIds);

  return (
    <Icd10DiagnosisRail
      {...props}
      selectedIds={selectedIds}
      onAdd={(candidate) => {
        setSelectedIds((current) =>
          current.includes(candidate.id) ? current : [...current, candidate.id],
        );
        onAdd(candidate);
      }}
      onRemove={(candidate) => {
        setSelectedIds((current) =>
          current.filter((id) => id !== candidate.id),
        );
        onRemove(candidate);
      }}
    />
  );
}

const meta = {
  title: "Clinic/Clinical/Patients/ICD-10 Diagnosis Rail",
  component: Icd10DiagnosisRail,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "padded",
    kura: {
      ...PATIENTS_STORYBOOK_KURA,
      intake: {
        decision: "FEATURE-OWN",
        owner: "src/features/patients/icd10-diagnosis-rail.tsx",
        level: "clinical rail",
        evidence:
          "The rail owns draft-only ICD-10 selection, touch-operable AI evidence, and a Kura multi-select search while the caller owns terminology, persistence, verification, and signing.",
        exclusions: [
          "No live WHO terminology service, diagnosis persistence, signer, audit event, or prescription state exists in the current platform.",
          "Selection is caller-owned draft state. A selected code is not clinically verified, signed, or saved.",
          "The prescribing flow uses selection as a draft gate; no signed diagnosis-verification contract exists.",
        ],
      },
      source:
        "FINAL DCM/src/components/DiagnoseGuide/DiagnosisReview.tsx (legacy)",
      binding: {
        ...PATIENTS_STORYBOOK_KURA.binding,
        elevation: "combobox-popover-only",
        motion: "kura control and overlay tokens",
        responsive: "single-column rail",
      },
    },
    docs: {
      description: {
        component:
          "A draft-only diagnosis rail for reviewing proposed ICD-10 codes, viewing AI evidence, and selecting an indication before medication review.",
      },
    },
  },
  args: {
    suggestions: DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS,
    searchCandidates: DEMO_LEGACY_ICD10_SEARCH_POOL,
    flaggedLabs: DEMO_LEGACY_ICD10_FLAGGED_LABS,
    selectedIds: [],
    onAdd: fn(),
    onRemove: fn(),
    onContinue: fn(),
  },
  decorators: [
    (Story) => (
      <div className={railStoryStyles.frame}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <Harness {...args} />,
} satisfies Meta<typeof Icd10DiagnosisRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Select diagnosis" }),
    ).toBeVisible();
    await expect(
      canvas.getByText("Draft only. Nothing is saved yet."),
    ).toBeVisible();
    await expect(canvas.getByText("AI suggestions")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Review medicines" }),
    ).toBeDisabled();

    const firstSuggestion = canvas
      .getByRole("checkbox", { name: /Add N18\.3/ })
      .closest<HTMLElement>('[data-slot="diagnosis-proposal"]');
    if (!firstSuggestion) {
      throw new Error(
        "The first diagnosis proposal is missing its selectable surface.",
      );
    }
    await expect(firstSuggestion).toHaveAttribute("data-selected", "false");
  },
};

export const EvidenceOnDemand: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      canvas.getByRole("button", { name: "View evidence for E11.65" }),
    );
    await expect(
      await body.findByText(/Review before adding to this draft/i),
    ).toBeVisible();
  },
};

export const SelectAndContinue: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const next = canvas.getByRole("button", { name: "Review medicines" });
    await userEvent.click(canvas.getByRole("checkbox", { name: /Add N18\.3/ }));
    await expect(next).toBeEnabled();
    await expect(
      canvas.getByRole("checkbox", { name: /Remove N18\.3/ }),
    ).toBeChecked();
    await userEvent.click(next);
    await expect(args.onContinue).toHaveBeenCalled();
  },
};

export const SearchAndAdd: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole("combobox", {
      name: "Search or add diagnosis",
    });
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(search, "fatty");
    await expect(
      await body.findByRole("option", { name: /Fatty \(change of\) liver/ }),
    ).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(
      canvas.getByRole("checkbox", { name: /Remove K76\.0/ }),
    ).toBeChecked();
    await expect(
      canvas.getByRole("button", { name: "Review medicines" }),
    ).toBeEnabled();
  },
};

export const NoCloseMatch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(
      canvas.getByRole("combobox", { name: "Search or add diagnosis" }),
      "zzz",
    );
    await expect(
      await body.findByText("No matching diagnosis. Try a code or name."),
    ).toBeVisible();
  },
};

export const Selected: Story = {
  args: { selectedIds: ["legacy-e11-65", "legacy-n18-3"] },
};

export const LongContent: Story = {
  args: {
    suggestions: [
      {
        ...DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS[0],
        label:
          "Type 2 diabetes mellitus with hyperglycemia and extensive longitudinal treatment review",
      },
    ],
  },
};

export const NonCodableProposal: Story = {
  args: {
    suggestions: [
      {
        ...DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS[0],
        codable: false,
      },
      ...DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS.slice(1),
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("checkbox", { name: /Add E11\.65/ }),
    ).toBeDisabled();
  },
};

export const ClosePreservesDraft: Story = {
  args: {
    onClose: fn(),
    selectedIds: ["legacy-e11-65"],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Close diagnosis selection" }),
    );
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: "kura320" } },
};
