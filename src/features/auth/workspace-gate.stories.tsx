import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { WorkspaceGate } from "./workspace-gate";
import { READINESS } from '../../components/foundations/readiness-data';
import {
  DEMO_BRANCHES,
  DEMO_LAST_ACTIVE_BRANCH,
  DEMO_LAST_ACTIVE_WORKSPACE,
  DEMO_WORKSPACES,
} from "./demo-data";

const meta = {
  title: "Clinic/Auth/Workspace Gate",
  component: WorkspaceGate,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: {
      readiness: READINESS.auth,
      intake: {
        decision: "COMPOSE",
        owner: "src/features/auth",
        evidence:
          "Flow ported from kura-platform clinic-workspace-mf (select-workspace, select-branch, create-workspace): 0 workspaces → create, 1 → auto-enter, ≥2 → list with last-active; branch picker only when the workspace runs branches. Composed from Card, Badge, Input, RadioGroup, Radio, Alert, Button.",
      },
      journeys: [
        "clinic-workspace-entry",
        "clinic-workspace-create",
        "clinic-branch-select",
      ],
    },
    docs: {
      description: {
        component:
          "Post-auth context selection: which workspace (and branch, when enabled) the session works in. Entering a workspace is a heavyweight context switch in production — the app reloads so no cross-tenant state survives.",
      },
    },
  },
  args: {
    workspaces: DEMO_WORKSPACES,
    branches: DEMO_BRANCHES,
    lastActiveWorkspaceId: DEMO_LAST_ACTIVE_WORKSPACE,
    lastActiveBranchId: DEMO_LAST_ACTIVE_BRANCH,
    onEnter: fn(),
    onCreateWorkspace: fn(),
  },
} satisfies Meta<typeof WorkspaceGate>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Several workspaces: last-active flagged, branch-less entry is one click. */
export const WorkspaceList: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Last active")).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: /create.*workspace/i }),
    ).not.toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: /Downtown Health/ }),
    );
    await waitFor(() =>
      expect(args.onEnter).toHaveBeenCalledWith("ws-downtown"),
    );
  },
};

/** Branch-enabled workspace: picker preselects the last-active branch. */
export const BranchSelection: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: /Sunrise Clinic/ }),
    );

    const main = await canvas.findByRole("radio", { name: /Main Branch/ });
    await expect(main).toBeChecked();

    await userEvent.click(canvas.getByRole("radio", { name: /North Wing/ }));
    await userEvent.click(
      canvas.getByRole("button", { name: "Enter workspace" }),
    );
    await waitFor(() =>
      expect(args.onEnter).toHaveBeenCalledWith("ws-sunrise", "br-north"),
    );
  },
};

/** First sign-up: no workspaces yet, create is the whole screen. */
export const CreateFirstWorkspace: Story = {
  args: { workspaces: [] },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Create your workspace" }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Create workspace" }),
    );
    await expect(
      await canvas.findByText("Workspace name is required."),
    ).toBeVisible();

    await userEvent.type(
      canvas.getByLabelText(/Workspace name/),
      "Sunrise Clinic",
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Create workspace" }),
    );
    await waitFor(() =>
      expect(args.onCreateWorkspace).toHaveBeenCalledWith("Sunrise Clinic"),
    );
  },
};

/** Loading context. */
export const Loading: Story = {
  args: { status: "loading" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent(
      /Loading workspaces/,
    );
  },
};

/** Load failure: retry without losing the session. */
export const LoadError: Story = {
  args: { status: "error", onRetry: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Retry" }));
    await waitFor(() => expect(args.onRetry).toHaveBeenCalled());
  },
};

/** Narrow viewport: rows keep touch-comfortable targets. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
};
