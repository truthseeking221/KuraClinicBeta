import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { AppShell } from "../../components/shared";

import * as demo from "./demo-data";
import { HomeWorkspace } from "./home-workspace";
import type { HomeWorkspaceProps } from "./home-workspace";
import { isLiveLicence } from "./logic";
import { HOME_STORYBOOK_KURA } from "./storybook-metadata";

const STORY_WORKSPACE = {
  id: "mekong",
  name: "Mekong Clinic",
  branches: [{ id: "bkk1", name: "BKK1 Branch" }],
  activeBranchId: "bkk1",
};

const NEW_DOCTOR_WORKSPACE = {
  id: "bopha-cabinet",
  name: "Bopha Kim's cabinet",
};

function HomePageFrame(props: HomeWorkspaceProps) {
  return (
    <AppShell
      activeKey="home"
      availableModes={["clinical"]}
      mode="clinical"
      notificationCount={2}
      onNavigate={(key) => props.onNavigate?.(key)}
      onOpenNotifications={() => undefined}
      user={{
        name: props.data.doctorName,
        email: "sok.vanna@mekong.clinic",
        licenceVerified: isLiveLicence(props.data.licence.state),
      }}
      workspace={props.data.firstUse ? NEW_DOCTOR_WORKSPACE : STORY_WORKSPACE}
    >
      <HomeWorkspace {...props} />
    </AppShell>
  );
}

const meta = {
  title: "Clinic/Clinical/Home",
  component: HomeWorkspace,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: HOME_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          "Clinical Home (WQ-01) is a calm start-of-shift briefing inside the canonical AppShell. Five peer metrics make the clinic state scannable, then the safety-relevant Results preview sits beside the next agenda. Every item deep-links into its owning surface. Licence stories map to the current seven-state clinic contract. Aggregate Home counts remain design fixtures because no Home/today BFF read model exists.",
      },
    },
  },
  args: {
    data: demo.busyMorning,
    onNavigate: fn(),
    onOpenDemoPatient: fn(),
    onOpenLicence: fn(),
    onStartBooking: fn(),
    onChooseWorkspace: fn(),
    onRetrySignal: fn(),
    onRefresh: fn(),
  },
  render: (args) => <HomePageFrame {...args} />,
} satisfies Meta<typeof HomeWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: verified clinician, mixed work, real shell and one clear reading path. */
export const StartOfDayVerified: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Good morning, Dr. Sok Vanna" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Results needing review" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Next actions" }),
    ).toBeVisible();
    const overview = canvas.getByRole("list", { name: "Clinic overview" });
    await expect(within(overview).getAllByRole("listitem")).toHaveLength(5);
    await expect(
      within(overview).getByRole("link", { name: /Review bookings/ }),
    ).toBeVisible();
    await expect(
      within(overview).getByRole("link", { name: /Review patients/ }),
    ).toBeVisible();
    const queue = canvas.getByRole("list", {
      name: "Patients with results to review",
    });
    await expect(within(queue).getAllByRole("listitem")).toHaveLength(5);
    await expect(within(queue).getByText("Dara Phally")).toBeVisible();
  },
};

export const CriticalResultFirst: Story = {
  args: { data: demo.criticalDay },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole("list", {
      name: "Patients with results to review",
    });
    const items = within(queue).getAllByRole("listitem");
    await expect(within(items[0]).getByText("Critical")).toBeVisible();
    await expect(within(items[0]).getByText(/Potassium/)).toBeVisible();
    await userEvent.click(
      within(items[0]).getByRole("link", { name: /Sokha Chan/ }),
    );
    await expect(args.onNavigate).toHaveBeenCalledWith("results");
  },
};

export const BusyClinicLongContent: Story = {
  args: { data: demo.longContent },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", {
        name: /Dr. Chanthavysouk Keomanivong-Rattanakosin/,
      }),
    ).toBeVisible();
    await expect(canvas.getByText("៛128,450")).toBeVisible();
    await expect(canvas.getByText("999")).toBeVisible();
  },
};

export const AllCaughtUpWithNextAppointment: Story = {
  args: { data: demo.allCaughtUp },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("All caught up")).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Next actions" }),
    ).toBeVisible();
    await expect(canvas.getByText("Tube pickup")).toBeVisible();
  },
};

export const EmptyClinic: Story = {
  args: { data: demo.verifiedEmptyClinic },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("No patients")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Add patient" }));
    await expect(args.onNavigate).toHaveBeenCalledWith("patients");
  },
};

/** First home after a new doctor has set up their cabinet. */
export const NewDoctorFirstHome: Story = {
  args: { data: demo.newDoctorFirstHome },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", {
        name: "You’re in. Your cabinet is ready.",
      }),
    ).toBeVisible();
    await expect(
      canvas.getByText("Start with a booking for your first patient."),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        "You can start booking patients before your licence is verified.",
      ),
    ).toBeVisible();
    await expect(canvas.getByText("Not started")).toBeVisible();
    await expect(
      canvas.getByText(
        "You’ll need a verified licence to collect payments, issue legal documents, submit claims and appear in the doctor directory.",
      ),
    ).toBeVisible();
    await expect(canvas.queryByText("No patients")).not.toBeInTheDocument();
    await expect(
      canvas.queryByText("Verify medical licence"),
    ).not.toBeInTheDocument();

    const workspace = canvasElement.querySelector<HTMLElement>(
      '[data-slot="home-workspace"]',
    );
    const firstUse = canvasElement.querySelector<HTMLElement>(
      '[data-slot="first-use-home"]',
    );
    expect(workspace).not.toBeNull();
    expect(firstUse).not.toBeNull();
    const workspaceBounds = workspace!.getBoundingClientRect();
    const firstUseBounds = firstUse!.getBoundingClientRect();
    const workspaceCenter = workspaceBounds.left + workspaceBounds.width / 2;
    const firstUseCenter = firstUseBounds.left + firstUseBounds.width / 2;
    expect(Math.abs(workspaceCenter - firstUseCenter)).toBeLessThanOrEqual(1);

    const setupTray = firstUse!.querySelector<HTMLElement>(
      '[data-slot="card"]:not([data-variant])',
    );
    expect(setupTray).not.toBeNull();
    await expect(setupTray!).toBeVisible();
    expect(
      setupTray!.querySelectorAll('[data-slot="card"][data-variant="tile"]'),
    ).toHaveLength(2);

    await userEvent.click(
      canvas.getByRole("button", { name: "Create booking" }),
    );
    await expect(args.onStartBooking).toHaveBeenCalled();
    await expect(
      canvas.queryByRole("link", { name: "Browse test catalog" }),
    ).not.toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Start verification" }),
    );
    await expect(args.onOpenLicence).toHaveBeenCalled();

    await expect(
      canvas.getByRole("heading", { name: "Take a quick tour" }),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        "Follow a sample patient from booking to results. Your records will not change.",
      ),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Open sample patient" }),
    );
    await expect(args.onOpenDemoPatient).toHaveBeenCalled();
  },
};

/**
 * A clinic that has never booked anyone but was handed no demo patient: the
 * offer disappears rather than pointing at a record that does not exist.
 */
export const FirstHomeWithoutDemoPatient: Story = {
  args: { data: { ...demo.newDoctorFirstHome, demoPatient: undefined } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", {
        name: "You’re in. Your cabinet is ready.",
      }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("heading", { name: "Take a quick tour" }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Create booking" }),
    ).toBeVisible();
    expect(
      canvasElement.querySelectorAll(
        '[data-slot="first-use-home"] [data-slot="card"][data-variant="tile"]',
      ),
    ).toHaveLength(1);
  },
};

export const NewDoctorFirstHomeMobile320: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
  args: { data: demo.newDoctorFirstHome },
};

export const AfternoonHandover: Story = {
  args: { data: demo.afternoonHandover },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Good afternoon, Dr. Sok Vanna" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "Closed today" }),
    ).toBeVisible();
    await expect(canvas.getByText("12")).toBeVisible();
    await expect(canvas.getByText("$86.00")).toBeVisible();
  },
};

/** Seven-state backend contract: `none`. */
export const LicenceNone: Story = {
  args: { data: demo.licenceNone },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Verify" }));
    await expect(args.onOpenLicence).toHaveBeenCalled();
  },
};

/** Seven-state backend contract: `pending_review`; never repeats a Verify CTA. */
export const LicencePendingReview: Story = {
  args: { data: demo.licencePendingReview },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Licence verification pending"),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "View submission" }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: "Verify" }),
    ).not.toBeInTheDocument();
  },
};

/** Seven-state backend contract: `rejected`. */
export const LicenceRejected: Story = {
  args: { data: demo.licenceRejected },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Licence rejected")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Update licence" }),
    ).toBeVisible();
  },
};

/** Seven-state backend contract: `verified`; the default story is intentionally quiet. */
export const LicenceVerified: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText(/licence/i)).not.toBeInTheDocument();
  },
};

/** Seven-state backend contract: `expiring`. */
export const LicenceExpiring: Story = {
  args: { data: demo.licenceExpiring },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Your licence expires on 31 August 2026"),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Renew" })).toBeVisible();
  },
};

/** Seven-state backend contract: `in_grace`. */
export const LicenceInGrace: Story = {
  args: { data: demo.licenceInGrace },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Grace ends 29 October 2026/)).toBeVisible();
  },
};

/** Seven-state backend contract: `lapsed`. */
export const LicenceLapsed: Story = {
  args: { data: demo.licenceLapsed },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Licence inactive")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Renew licence" }),
    ).toBeVisible();
  },
};

export const Loading: Story = {
  args: { data: demo.loading },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Loading" }),
    ).toBeVisible();
    const overview = canvas.getByRole("list", {
      name: "Loading clinic overview",
    });
    await expect(within(overview).getByText("Bookings")).toBeVisible();
    await expect(within(overview).getByText("Patients")).toBeVisible();
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
  },
};

export const PartialFailureAndRetry: Story = {
  args: { data: demo.partialData },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole("list", { name: "Clinic overview" });
    await expect(
      within(overview).getByText("Results could not load."),
    ).toBeVisible();
    await expect(
      within(overview).getByRole("link", { name: /Review bookings/ }),
    ).toBeVisible();
    await userEvent.click(
      within(overview).getByRole("button", { name: "Retry" }),
    );
    await expect(args.onRetrySignal).toHaveBeenCalledWith("results");
  },
};

function FullFailureRecoveryHarness() {
  const [recovered, setRecovered] = useState(false);
  return (
    <HomePageFrame
      data={recovered ? demo.busyMorning : demo.fullFailure}
      onRefresh={() => setRecovered(true)}
    />
  );
}

export const FullFailure: Story = {
  args: { data: demo.fullFailure },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Home could not load")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Reload" })).toBeVisible();
    await expect(
      canvas.queryByText("Sokha Chan · T2DM review"),
    ).not.toBeInTheDocument();
  },
};

export const FullFailureRecoverable: Story = {
  render: () => <FullFailureRecoveryHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Home could not load")).toBeVisible();
    await expect(
      canvas.queryByText("Sokha Chan · T2DM review"),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Reload" }));
    await waitFor(async () => {
      await expect(
        canvas.getByRole("heading", { name: "Results needing review" }),
      ).toBeVisible();
    });
  },
};

export const StaleData: Story = {
  args: { data: demo.stale },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Last updated 09:12")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Refresh" }));
    await expect(args.onRefresh).toHaveBeenCalled();
  },
};

export const OfflineReadOnly: Story = {
  args: { data: demo.offline },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Offline")).toBeVisible();
    await expect(
      canvas.getByText(/Reconnect to make clinic changes/),
    ).toBeVisible();
  },
};

/** No payment capability: the earnings signal is omitted from Home, never greyed.
 *  Scoped to the workspace because the shell keeps its own Earnings nav item. */
export const ReducedCapabilities: Story = {
  args: { data: demo.reducedCapabilities },
  play: async ({ canvasElement }) => {
    const home = within(
      canvasElement.querySelector(
        '[data-slot="home-workspace"]',
      ) as HTMLElement,
    );
    await expect(home.queryByText(/^Earnings/)).not.toBeInTheDocument();
    await expect(home.getByText("Tube pickup")).toBeVisible();
  },
};

export const NoWorkspaceAccess: Story = {
  args: { data: demo.noWorkspaceAccess },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No clinic data was loaded/)).toBeVisible();
    await expect(canvas.queryByText("Sokha Chan")).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("button", { name: "Choose workspace" }),
    );
    await expect(args.onChooseWorkspace).toHaveBeenCalled();
  },
};

/** WQ-08 rejection outcome: an unauthorized deep link reveals no patient identity. */
export const UnauthorizedDeepLinkNoPhi: Story = {
  args: { data: demo.permissionRestricted },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Home unavailable")).toBeVisible();
    await expect(canvas.getByText(/No patient data was loaded/)).toBeVisible();
    await expect(
      canvas.queryByText(/Sokha Chan|Dara Phally|Chenda Sreymom/),
    ).not.toBeInTheDocument();
  },
};

export const SoloDoctor: Story = {
  args: { data: demo.soloDoctor },
};

export const MobileWidth320Critical: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
  args: { data: demo.criticalDay },
};

export const MobileWidth360: Story = {
  parameters: { viewport: { defaultViewport: "kura360" } },
};

export const MobileWidth390LongContent: Story = {
  parameters: { viewport: { defaultViewport: "kura390" } },
  args: { data: demo.longContent },
};

export const MobileWidth412PartialFailure: Story = {
  parameters: { viewport: { defaultViewport: "kura412" } },
  args: { data: demo.partialData },
};

export const MobileWidth480AllClear: Story = {
  parameters: { viewport: { defaultViewport: "kura480" } },
  args: { data: demo.allCaughtUp },
};

export const TabletWidth768: Story = {
  parameters: { viewport: { defaultViewport: "kura768" } },
  args: { data: demo.criticalDay },
};

export const DesktopWidth1024: Story = {
  parameters: { viewport: { defaultViewport: "kura1024" } },
};

export const CompactDensity: Story = {
  globals: { density: "compact" },
  args: { data: demo.criticalDay },
};

export const ComfortableDensity: Story = {
  globals: { density: "comfortable" },
};
