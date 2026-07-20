import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { AppShell } from '../../components/shared';

import * as demo from './demo-data';
import { HomeWorkspace } from './home-workspace';
import type { HomeWorkspaceProps } from './home-workspace';
import { isLiveLicence } from './logic';
import { HOME_STORYBOOK_KURA } from './storybook-metadata';

const STORY_WORKSPACE = {
  id: 'mekong',
  name: 'Mekong Clinic',
  branches: [{ id: 'bkk1', name: 'BKK1 Branch' }],
  activeBranchId: 'bkk1',
};

function HomePageFrame(props: HomeWorkspaceProps) {
  return (
    <AppShell
      activeKey="home"
      availableModes={['clinical']}
      mode="clinical"
      notificationCount={2}
      onNavigate={(key) => props.onNavigate?.(key)}
      onOpenNotifications={() => undefined}
      user={{
        name: props.data.doctorName,
        email: 'sok.vanna@mekong.clinic',
        licenceVerified: isLiveLicence(props.data.licence.state),
      }}
      workspace={STORY_WORKSPACE}
    >
      <HomeWorkspace {...props} />
    </AppShell>
  );
}

const meta = {
  title: 'Clinic/Clinical/Home',
  component: HomeWorkspace,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: HOME_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Clinical Home (WQ-01) is a calm start-of-shift briefing inside the canonical AppShell. It prioritizes safety-relevant work, keeps the next agenda visible, and deep-links into owning surfaces. Licence stories map to the current seven-state clinic contract. Aggregate Home counts remain design fixtures because no Home/today BFF read model exists.',
      },
    },
  },
  args: {
    data: demo.busyMorning,
    onNavigate: fn(),
    onOpenLicence: fn(),
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
    await expect(canvas.getByRole('heading', { name: 'Good morning, Dr. Sok Vanna' })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Needs attention' })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Next today' })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Overview' })).toBeVisible();
  },
};

export const CriticalResultFirst: Story = {
  args: { data: demo.criticalDay },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list', { name: 'Work needing attention' });
    const items = within(list).getAllByRole('listitem');
    await expect(within(items[0]).getByText('Critical')).toBeVisible();
    await expect(within(items[0]).getByText(/Potassium 6.8 mmol\/L/)).toBeVisible();
    await userEvent.click(within(items[0]).getByRole('link', { name: /Review critical result/ }));
    await expect(args.onNavigate).toHaveBeenCalledWith('results');
  },
};

export const BusyClinicLongContent: Story = {
  args: { data: demo.longContent },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: /Dr. Chanthavysouk Keomanivong-Rattanakosin/ })).toBeVisible();
    await expect(canvas.getByText('៛128,450')).toBeVisible();
    await expect(canvas.getByText('999')).toBeVisible();
  },
};

export const AllCaughtUpWithNextAppointment: Story = {
  args: { data: demo.allCaughtUp },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('All caught up')).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Next today' })).toBeVisible();
    await expect(canvas.getByText('Tube pickup')).toBeVisible();
  },
};

export const EmptyClinic: Story = {
  args: { data: demo.verifiedEmptyClinic },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No patients yet')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Add patient' }));
    await expect(args.onNavigate).toHaveBeenCalledWith('patients');
  },
};

export const AfternoonHandover: Story = {
  args: { data: demo.afternoonHandover },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Good afternoon, Dr. Sok Vanna' })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'Closed today' })).toBeVisible();
    await expect(canvas.getByText('12')).toBeVisible();
    await expect(canvas.getByText('$86.00')).toBeVisible();
  },
};

/** Seven-state backend contract: `none`. */
export const LicenceNone: Story = {
  args: { data: demo.licenceNone },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Verify now' }));
    await expect(args.onOpenLicence).toHaveBeenCalled();
  },
};

/** Seven-state backend contract: `pending_review`; never repeats a Verify CTA. */
export const LicencePendingReview: Story = {
  args: { data: demo.licencePendingReview },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Your licence is being verified')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'View submission' })).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Verify now' })).not.toBeInTheDocument();
  },
};

/** Seven-state backend contract: `rejected`. */
export const LicenceRejected: Story = {
  args: { data: demo.licenceRejected },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence verification needs attention')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Verify now' })).toBeVisible();
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
    await expect(canvas.getByText('Your licence expires on 31 August 2026')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Renew now' })).toBeVisible();
  },
};

/** Seven-state backend contract: `in_grace`. */
export const LicenceInGrace: Story = {
  args: { data: demo.licenceInGrace },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/grace period ends 29 October 2026/)).toBeVisible();
  },
};

/** Seven-state backend contract: `lapsed`. */
export const LicenceLapsed: Story = {
  args: { data: demo.licenceLapsed },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Your licence is no longer active')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Renew licence' })).toBeVisible();
  },
};

export const Loading: Story = {
  args: { data: demo.loading },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: "Today's briefing" })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Work needing attention' })).toBeVisible();
    await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
  },
};

export const PartialFailureAndRetry: Story = {
  args: { data: demo.partialData },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results could not be loaded.')).toBeVisible();
    await expect(canvas.getByRole('link', { name: /Open bookings/ })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetrySignal).toHaveBeenCalledWith('results');
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
    await expect(canvas.getByText("Today's briefing could not be loaded")).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Retry briefing' })).toBeVisible();
    await expect(canvas.queryByText('Sokha Chan · T2DM follow-up')).not.toBeInTheDocument();
  },
};

export const FullFailureRecoverable: Story = {
  render: () => <FullFailureRecoveryHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Today's briefing could not be loaded")).toBeVisible();
    await expect(canvas.queryByText('Sokha Chan · T2DM follow-up')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry briefing' }));
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: 'Needs attention' })).toBeVisible();
    });
  },
};

export const StaleData: Story = {
  args: { data: demo.stale },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Updated 09:12')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Refresh' }));
    await expect(args.onRefresh).toHaveBeenCalled();
  },
};

export const OfflineReadOnly: Story = {
  args: { data: demo.offline },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You are offline')).toBeVisible();
    await expect(canvas.getByText(/Actions that change clinic data remain unavailable/)).toBeVisible();
  },
};

export const ReducedCapabilities: Story = {
  args: { data: demo.reducedCapabilities },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Earnings today')).not.toBeInTheDocument();
    await expect(canvas.getByText('Tube pickup')).toBeVisible();
  },
};

export const NoWorkspaceAccess: Story = {
  args: { data: demo.noWorkspaceAccess },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No clinic data has been loaded/)).toBeVisible();
    await expect(canvas.queryByText('Sokha Chan')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Choose workspace' }));
    await expect(args.onChooseWorkspace).toHaveBeenCalled();
  },
};

/** WQ-08 rejection outcome: an unauthorized deep link reveals no patient identity. */
export const UnauthorizedDeepLinkNoPhi: Story = {
  args: { data: demo.permissionRestricted },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Home access is restricted')).toBeVisible();
    await expect(canvas.getByText(/No patient data has been loaded/)).toBeVisible();
    await expect(canvas.queryByText(/Sokha Chan|Dara Phally|Chenda Sreymom/)).not.toBeInTheDocument();
  },
};

export const SoloDoctor: Story = {
  args: { data: demo.soloDoctor },
};

export const MobileWidth320Critical: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { data: demo.criticalDay },
};

export const MobileWidth360: Story = {
  parameters: { viewport: { defaultViewport: 'kura360' } },
};

export const MobileWidth390LongContent: Story = {
  parameters: { viewport: { defaultViewport: 'kura390' } },
  args: { data: demo.longContent },
};

export const MobileWidth412PartialFailure: Story = {
  parameters: { viewport: { defaultViewport: 'kura412' } },
  args: { data: demo.partialData },
};

export const MobileWidth480AllClear: Story = {
  parameters: { viewport: { defaultViewport: 'kura480' } },
  args: { data: demo.allCaughtUp },
};

export const TabletWidth768: Story = {
  parameters: { viewport: { defaultViewport: 'kura768' } },
  args: { data: demo.criticalDay },
};

export const DesktopWidth1024: Story = {
  parameters: { viewport: { defaultViewport: 'kura1024' } },
};

export const CompactDensity: Story = {
  globals: { density: 'compact' },
  args: { data: demo.criticalDay },
};

export const ComfortableDensity: Story = {
  globals: { density: 'comfortable' },
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  args: { data: demo.criticalDay },
};
