import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button, Toaster, toast } from "./index";
import styles from "./intake-components.stories.module.css";

const meta = {
  title: "Design System/Components/Toast",
  component: Toaster,
  tags: ["autodocs", "source-reui", "adapted-kura"],
  parameters: {
    layout: "padded",
    kura: {
      source: {
        vendor: "ReUI",
        registryItem: "@reui/c-sonner-1",
        behaviorDependency: "sonner",
      },
      intake: {
        decision: "CREATE",
        owner: "src/components/ui",
        evidence:
          "No canonical transient notification owner existed; the installed Sonner behavior dependency supplies queueing, announcements, promise updates, dismissal, and swipe handling.",
        exclusions: [
          "Vendor naming is excluded from Kura taxonomy.",
          "Custom avatars, inverted themes, decorative accents, and arbitrary icons conflict with semantic notification treatment.",
          "Use Alert instead of Toast for persistent or decision-blocking information.",
        ],
      },
      binding: {
        colors: "kura-semantic",
        typography: "kura",
        spacing: "kura",
        radius: "kura",
        elevation: "overlay-only",
        icons: "kura-canonical-status",
        motion: "sonner-behavior-with-kura-reduced-motion",
      },
    },
    docs: {
      description: {
        component:
          "Transient, non-blocking feedback for completed or background actions. Mount one Toaster near the application root and call toast from action handlers.",
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

function getVisibleToast(document: Document) {
  const toastElement = [
    ...document.querySelectorAll<HTMLElement>(
      '[data-sonner-toast][data-visible="true"]',
    ),
  ].at(-1);

  if (!toastElement) {
    throw new Error("Expected a visible toast.");
  }

  return toastElement;
}

function expectToastContentAfterIcon(toastElement: HTMLElement) {
  const icon = toastElement.querySelector<HTMLElement>("[data-icon]");
  const content = toastElement.querySelector<HTMLElement>("[data-content]");

  if (!icon || !content) {
    throw new Error("Expected a toast with an icon and content.");
  }

  const toastRect = toastElement.getBoundingClientRect();
  const iconRect = icon.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const unscaledGap = Number.parseFloat(
    getComputedStyle(toastElement).columnGap,
  );
  const scale = toastRect.width / toastElement.offsetWidth;
  const expectedGap = unscaledGap * scale;
  const actualGap = contentRect.left - iconRect.right;

  expect(Math.abs(actualGap - expectedGap)).toBeLessThanOrEqual(1);
}

export const Default: Story = {
  args: {},
  render: () => (
    <div className={styles.actionStack}>
      <Toaster />
      <Button
        onClick={() =>
          toast("Appointment saved", {
            description: "Friday, 09:30 · Toul Kork Branch",
            id: "storybook-toast-default",
          })
        }
      >
        Show notification
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    toast.dismiss();
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Show notification" }),
    );
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await expect(
      await documentCanvas.findByText("Appointment saved"),
    ).toBeVisible();
    await expect(
      documentCanvas.getByText("Friday, 09:30 · Toul Kork Branch"),
    ).toBeVisible();
    toast.dismiss();
  },
};

export const SemanticTones: Story = {
  args: {},
  render: () => (
    <div className={styles.row}>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Payment recorded", {
            id: "storybook-toast-semantic-tones",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Booking updated", {
            id: "storybook-toast-semantic-tones",
          })
        }
      >
        Information
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Coverage needs review", {
            id: "storybook-toast-semantic-tones",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Result could not be sent", {
            id: "storybook-toast-semantic-tones",
          })
        }
      >
        Error
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    toast.dismiss();
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Information" }),
    );
    await expect(
      await documentCanvas.findByText("Booking updated"),
    ).toBeVisible();
    expectToastContentAfterIcon(getVisibleToast(canvasElement.ownerDocument));
    toast.dismiss();
  },
};

export const WithAction: Story = {
  args: {},
  render: () => (
    <div className={styles.actionStack}>
      <Toaster />
      <Button
        onClick={() =>
          toast.success("Patient added to the queue", {
            action: { label: "View queue", onClick: () => undefined },
            description: "Sokha Chan · Walk-in",
            id: "storybook-toast-with-action",
          })
        }
      >
        Add patient
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    toast.dismiss();
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Add patient" }),
    );
    await expect(
      await documentCanvas.findByText("Patient added to the queue"),
    ).toBeVisible();

    const toastElement = getVisibleToast(canvasElement.ownerDocument);
    const content = toastElement.querySelector<HTMLElement>("[data-content]");
    const action = toastElement.querySelector<HTMLElement>("[data-action]");

    if (!content || !action) {
      throw new Error("Expected a toast action and content.");
    }

    expectToastContentAfterIcon(toastElement);
    expect(
      Math.abs(
        action.getBoundingClientRect().left -
          content.getBoundingClientRect().left,
      ),
    ).toBeLessThanOrEqual(1);
    toast.dismiss();
  },
};

export const PromiseUpdate: Story = {
  args: {},
  render: () => (
    <div className={styles.actionStack}>
      <Toaster />
      <Button
        onClick={() =>
          toast.promise(Promise.resolve("sent"), {
            loading: "Sending appointment reminder…",
            success: "Reminder sent",
            error: "Reminder could not be sent",
          })
        }
      >
        Send reminder
      </Button>
    </div>
  ),
};

export const MobileNarrow: Story = {
  args: {},
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <div className={styles.actionStack}>
      <Toaster position="top-center" />
      <Button
        fullWidth
        onClick={() =>
          toast.info("Appointment time changed", {
            description:
              "The patient will receive the updated date, clinic, and preparation instructions.",
            id: "storybook-toast-mobile-narrow",
          })
        }
      >
        Show mobile notification
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    toast.dismiss();
    await userEvent.click(
      within(canvasElement).getByRole("button", {
        name: "Show mobile notification",
      }),
    );
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await expect(
      await documentCanvas.findByText("Appointment time changed"),
    ).toBeVisible();
    expectToastContentAfterIcon(getVisibleToast(canvasElement.ownerDocument));
    toast.dismiss();
  },
};
