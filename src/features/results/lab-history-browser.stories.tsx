import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  LEGACY_LAB_HISTORY_COUNTS,
  LEGACY_LAB_HISTORY_SECTIONS,
  LEGACY_LAB_LATEST_DRAW,
} from "./legacy-lab-history-demo-data";
import { LabHistoryBrowser } from "./lab-history-browser";
import styles from "./results.stories.module.css";
import { RESULTS_STORYBOOK_KURA } from "./storybook-metadata";

const meta = {
  title: "Clinic/Clinical/Results/Lab History Browser",
  component: LabHistoryBrowser,
  tags: ["autodocs", "source-reui", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: {
      ...RESULTS_STORYBOOK_KURA,
      intake: {
        decision: "DOMAIN-ADAPT",
        owner: "src/features/results/lab-history-browser.tsx",
        source: "Legacy DCM LabHistory patient-level all-results view",
        evidence:
          "The existing episode flowsheet covers one result episode, while the Legacy DCM source proves a distinct patient-level job: scanning 57 primary analytes across five draws without losing 60-row report fidelity.",
        exclusions:
          "Legacy raw colors, local icon imports, hover-only detail, unvalidated critical heuristics, and decorative card chrome were not carried forward.",
      },
      binding: {
        ...RESULTS_STORYBOOK_KURA.binding,
        responsive:
          "clinical-system reflow at 320px; the raw history table scrolls intentionally",
      },
    },
    docs: {
      description: {
        component:
          "Patient-level lab history groups 57 primary analytes by clinical system while preserving all 60 report rows in the raw table.",
      },
    },
  },
  args: {
    latestDrawAt: LEGACY_LAB_LATEST_DRAW,
    sections: LEGACY_LAB_HISTORY_SECTIONS,
  },
} satisfies Meta<typeof LabHistoryBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPatientResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "All tests" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("tab", { name: /All tests/ }),
    ).toHaveTextContent(String(LEGACY_LAB_HISTORY_COUNTS.primary));
    await expect(canvas.getByRole("tab", { name: /Table/ })).toHaveTextContent(
      String(LEGACY_LAB_HISTORY_COUNTS.table),
    );
    await expect(
      canvas.getByRole("heading", { name: /Kidney function/ }),
    ).toBeVisible();
    await expect(canvas.getByText("Creatinine")).toBeVisible();
  },
};

export const CollapseAndRestoreClinicalSystems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Collapse all/ }));
    await waitFor(async () => {
      await expect(canvas.queryByText("Creatinine")).not.toBeInTheDocument();
    });
    await userEvent.click(canvas.getByRole("button", { name: /Expand all/ }));
    await expect(canvas.getByText("Creatinine")).toBeVisible();
  },
};

export const SearchAcrossHistory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "Search lab results" }),
      "TSH",
    );
    await expect(canvas.getByText("TSH (Thyreotrope)")).toBeVisible();
    await expect(canvas.queryByText("BUN")).not.toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Showing 1 of 57 primary analytes",
    );
  },
};

export const NeedsReviewOverview: Story = {
  args: { initialView: "overview" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Overview" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Needs review" }),
    ).toBeVisible();
    await expect(canvas.getByText("Creatinine")).toBeVisible();
  },
};

export const LatestDrawOnly: Story = {
  args: { initialLatestOnly: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("switch", { name: "Latest only" }),
    ).toHaveAttribute("data-checked");
    await expect(canvas.getByRole("status")).toHaveTextContent(
      /Showing \d+ of 57 primary analytes/,
    );
    await expect(canvas.queryByText("HbA1c (%)")).not.toBeInTheDocument();
  },
};

export const RawReportTable: Story = {
  args: { initialView: "table" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { name: "Table" })).toBeVisible();
    await expect(
      canvas.getByRole("columnheader", { name: "Test" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("rowheader", { name: /Urine Creatinine/ }),
    ).toBeVisible();
    await expect(canvas.getAllByRole("row")).toHaveLength(
      LEGACY_LAB_HISTORY_COUNTS.table + 1,
    );
  },
};

export const OfflineCached: Story = {
  args: { state: "offline" },
};

export const Loading: Story = {
  args: { state: "loading" },
};

export const Empty: Story = {
  args: { sections: [], state: "empty" },
};

function ErrorRecoveryStory() {
  const [recovered, setRecovered] = useState(false);
  return (
    <LabHistoryBrowser
      latestDrawAt={LEGACY_LAB_LATEST_DRAW}
      onRetry={() => setRecovered(true)}
      sections={LEGACY_LAB_HISTORY_SECTIONS}
      state={recovered ? "ready" : "error"}
    />
  );
}

export const ErrorAndRecovery: Story = {
  render: () => <ErrorRecoveryStory />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Retry" }));
    await waitFor(async () => {
      await expect(
        canvas.getByRole("heading", { name: "All tests" }),
      ).toBeVisible();
    });
  },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
  render: (args) => (
    <div className={`${styles.frame} ${styles.w320}`}>
      <LabHistoryBrowser {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Creatinine")).toBeVisible();
    await expect(
      canvas.getByRole("switch", { name: "Latest only" }),
    ).toBeVisible();
    await expect(canvasElement.scrollWidth).toBeLessThanOrEqual(
      canvasElement.clientWidth,
    );
  },
};
