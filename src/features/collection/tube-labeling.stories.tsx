import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, within } from "storybook/test";

import { READINESS } from "../../components/foundations/readiness-data";

import { TubeLabeling } from "./tube-labeling";
import type { TubeLabelMethod, TubeLabelPhotoCheck } from "./types";

const TUBE_KEYS = ["red", "gold-sst", "green", "lavender"];

function Harness({
  initialMethod = "sticker",
  stage = "label",
}: {
  initialMethod?: TubeLabelMethod;
  stage?: "collect" | "label";
}) {
  const [method, setMethod] = useState<TubeLabelMethod>(initialMethod);
  const [photoChecks, setPhotoChecks] = useState<TubeLabelPhotoCheck>({
    applied: false,
    readable: false,
    photographed: false,
  });
  return (
    <TubeLabeling
      method={method}
      onConfirm={() => {}}
      onMethodChange={setMethod}
      onPhotoChecksChange={setPhotoChecks}
      patientLabelLine="SOK · M · 1994"
      photoChecks={photoChecks}
      stage={stage}
      tubeKeys={TUBE_KEYS}
    />
  );
}

const meta = {
  title: "Clinic/Collection/Tube Labeling",
  component: TubeLabeling,
  tags: ["autodocs", "source-figma", "adapted-kura"],
  args: {
    method: "sticker",
    onConfirm: () => {},
    onMethodChange: () => {},
    onPhotoChecksChange: () => {},
    patientLabelLine: "SOK · M · 1994",
    photoChecks: { applied: false, readable: false, photographed: false },
    tubeKeys: TUBE_KEYS,
  },
  parameters: {
    layout: "padded",
    kura: {
      readiness: READINESS.collection,
      source: {
        figma:
          "https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1547-110756",
        node: "1547:110756",
      },
      intake: {
        decision: "CREATE",
        owner: "src/features/collection",
        evidence:
          "The Figma doctor route uses the same tube plan for collection confirmation and label-method selection, then moves label verification into the next phone step.",
        exclusions: [
          "Tube stoppers reuse the CLSI catalog colours already owned by Collection; no new specimen vocabulary.",
          "Photo capture is deliberately excluded from this component because the source makes it the next label-verification stage.",
          "The self-draw lane maps to the backend `tube_pickup` booking type, which shipped guards currently reject — this is design intent, not live capability.",
        ],
      },
      composes: ["Card", "RadioGroup", "Radio", "Badge", "Button"],
    },
    docs: {
      description: {
        component:
          "Shows the planned tubes during doctor collection and labeling. A printed Kura sticker remains recommended; handwriting stays available, while photo verification is owned by the next journey stage.",
      },
    },
  },
} satisfies Meta<typeof TubeLabeling>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StickerRoute: Story = {
  render: () => <Harness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("4 samples collected")).toBeVisible();
    await expect(canvas.getByText("Recommended")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Next: Scan QR to verify labels" }),
    ).toBeEnabled();
  },
};

export const CollectionConfirmation: Story = {
  render: () => <Harness stage="collect" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Required tubes" }),
    ).toBeVisible();
    await expect(canvas.getByText("4 tubes for this order")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "I have collected all 4 tubes" }),
    ).toBeEnabled();
  },
};

export const HandwrittenRoute: Story = {
  render: () => <Harness initialMethod="pen" />,
  parameters: {
    docs: {
      description: {
        story:
          "The template is what the operator copies onto each tube: surname, sex, birth year — enough to match a tube to one person without printing the record on it.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("SOK · M · 1994")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Next: Scan QR to verify labels" }),
    ).toBeEnabled();
  },
};

export const SingleTube: Story = {
  render: function SingleTubeHarness() {
    const [method, setMethod] = useState<TubeLabelMethod>("pen");
    return (
      <TubeLabeling
        method={method}
        onConfirm={() => {}}
        onMethodChange={setMethod}
        onPhotoChecksChange={() => {}}
        patientLabelLine="SOK · M · 1994"
        photoChecks={{ applied: false, readable: false, photographed: false }}
        tubeKeys={["lavender"]}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1 sample collected")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Next: Scan QR to verify labels" }),
    ).toBeEnabled();
  },
};

export const Mobile320: Story = {
  render: () => <Harness />,
  parameters: { viewport: { defaultViewport: "kura320" } },
};
