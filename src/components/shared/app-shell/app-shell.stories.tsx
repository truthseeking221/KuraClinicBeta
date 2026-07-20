import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '../../ui';

import { AppShell } from './app-shell';
import type { AppShellProps } from './app-shell';
import { deriveAvailableModes, MODE_REGISTRY } from './mode-registry';
import type { ClinicMode, ClinicWorkspace, ShellUser, Station } from './types';

const mekongClinic: ClinicWorkspace = {
  id: 'ws-mekong',
  name: 'Mekong Clinic',
  branches: [
    { id: 'br-bkk', name: 'BKK1 Branch' },
    { id: 'br-tk', name: 'Toul Kork Branch' },
  ],
  activeBranchId: 'br-bkk',
};

const soloCabinet: ClinicWorkspace = {
  id: 'ws-solo',
  name: 'Dr. Vanna Cabinet',
};

const allWorkspaces = [mekongClinic, soloCabinet];

const doctorUser: ShellUser = {
  name: 'Dr. Sok Vanna',
  email: 'vanna@mekong.clinic',
  licenceVerified: true,
};

const nurseUser: ShellUser = {
  name: 'Srey Neang',
  email: 'neang@mekong.clinic',
  licenceVerified: false,
};

const psc01: Station = { id: 'PSC-01', role: 'phlebotomy', shift: 'morning' };

/** Permission sets that mirror the proposed clinical capability catalog. */
const PERMISSIONS = {
  doctorFull: [
    'patient.read',
    'order.create',
    'result.review',
    'reception.check_in',
    'booking.manage',
    'payment.collect',
    'sample.collect',
    'member.manage',
    'branch.manage',
    'role.manage',
    'workspace.settings.manage',
    'doctor.banking.view.self',
  ],
  soloDoctor: ['patient.read', 'order.create', 'result.review', 'doctor.banking.view.self'],
  nurseFrontDeskCollection: [
    'reception.check_in',
    'booking.manage',
    'payment.collect',
    'sample.collect',
    'sample.label',
    'sample.handoff',
    'vitals.record',
  ],
};

const ALL_MODULES = {
  clinical: true,
  reception: true,
  collection: true,
};

function DemoContent({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '320px',
        border: '1px dashed var(--color-border-strong)',
        borderRadius: 'var(--radius-card-surface)',
        color: 'var(--color-text-tertiary)',
        fontSize: 'var(--type-sm)',
      }}
    >
      {label}
    </div>
  );
}

/** Stateful wrapper so mode switching, navigation, and context changes work live. */
function ShellPlayground(
  props: Partial<AppShellProps> & {
    initialMode: ClinicMode;
    permissions: string[];
    licenceVerified?: boolean;
  },
) {
  const { initialMode, licenceVerified = true, permissions, ...rest } = props;
  const availableModes = deriveAvailableModes({
    permissions,
    enabledModules: ALL_MODULES,
    licenceVerified,
  });
  const [mode, setMode] = useState<ClinicMode>(initialMode);
  const [activeKey, setActiveKey] = useState(MODE_REGISTRY[initialMode].entryKey);
  const [workspace, setWorkspace] = useState(rest.workspace ?? mekongClinic);

  return (
    <AppShell
      availableModes={availableModes}
      mode={mode}
      onModeChange={(next) => {
        setMode(next);
        setActiveKey(MODE_REGISTRY[next].entryKey);
      }}
      activeKey={activeKey}
      onNavigate={setActiveKey}
      onWorkspaceChange={(id) => {
        const next = allWorkspaces.find((item) => item.id === id);
        if (next) setWorkspace(next);
      }}
      onBranchChange={(branchId) =>
        setWorkspace((current) => ({ ...current, activeBranchId: branchId }))
      }
      onOpenSearch={() => {}}
      onOpenNotifications={() => {}}
      permissions={permissions}
      user={doctorUser}
      {...rest}
      workspace={workspace}
    >
      <DemoContent label={`${MODE_REGISTRY[mode].label} · ${activeKey}`} />
    </AppShell>
  );
}

const meta = {
  title: 'Clinic/Shell/App Shell',
  component: AppShell,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/shared/app-shell',
        evidence:
          'No canonical shell existed in this repo. ReUI app-shell blocks (app-shell-1, app-shell-2) were inspected as skeleton references and rejected for direct intake: they ship Radix Sidebar + Tailwind palette + next-themes, while the house idiom is CSS modules over Kura tokens with the existing dropdown-menu/sheet primitives. Upstream kura-platform clinic-shell renders Reception as a peer nav item with a static CLINIC_NAV; this shell replaces that with capability-derived operational modes per the unified-clinic-app direction.',
      },
      binding: {
        colors: 'kura-semantic + sidebar token layer',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-topbar-and-focus',
        icons: 'kura-hugeicons-canonical',
        motion: 'kura-sidebar-width-reduced-motion-safe',
        density: 'kura-root-attribute',
        responsive: 'sidebar collapses to icon rail; below 768px nav moves into a left sheet',
      },
      journeys: ['clinic-shell-navigation', 'mode-switch', 'workspace-switch'],
      composes: [
        'DropdownMenu',
        'Sheet',
        'Badge',
        'IconButton',
        'Kbd',
        'Alert (banner slot)',
      ],
    },
    docs: {
      description: {
        component:
          'Unified Clinic App shell. One workspace context (workspace → branch → mode → station), capability-derived operational modes (clinical, front desk, collection), and two caller-selected postures independent from mode: sidebar for navigation-first work and station for scan-first booth work. The sidebar states who and where (workspace identity + navigation); the mode switcher lives in the topbar and states what kind of work — one level, never a sibling of the workspace switcher, and reachable on mobile where the sidebar is a sheet. A single mode hides the switcher entirely — a solo doctor never learns modes exist. Roles never gate anything; capabilities do.',
      },
    },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const requiredArgs = {
  workspace: mekongClinic,
  mode: 'clinical' as ClinicMode,
  availableModes: ['clinical'] as ClinicMode[],
  activeKey: 'home',
  onNavigate: () => {},
  user: doctorUser,
  children: null,
};

/** Full clinic: every module enabled, a doctor holding all capabilities. */
export const FullClinic: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="clinical"
      permissions={PERMISSIONS.doctorFull}
      workspaces={allWorkspaces}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    // Work-area control: mode icon + value + chevron; the kicker stays for
    // assistive technology only.
    const modeButton = canvas.getByRole('button', { name: 'Work area Clinical' });
    await expect(modeButton).toBeVisible();
    await expect(modeButton.querySelector('[data-kura-icon="stethoscope"]')).toBeVisible();
    await expect(modeButton.querySelector('[data-kura-icon="chevron-down"]')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Account: Dr. Sok Vanna' }));
    await waitFor(() => {
      const openMenu = body
        .getAllByRole('menu')
        .find((menu) => menu.getAttribute('data-state') === 'open');
      if (!openMenu) throw new Error('Account menu did not open.');
    });
    const accountMenu = body
      .getAllByRole('menu')
      .find((menu) => menu.getAttribute('data-state') === 'open');
    if (!accountMenu) throw new Error('Account menu did not open.');
    await expect(within(accountMenu).getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument();
    await expect(within(accountMenu).getByRole('menuitem', { name: 'Sign out' })).toBeInTheDocument();
    await expect(body.queryByLabelText('Licence verified')).not.toBeInTheDocument();
  },
};

/**
 * Solo doctor: one mode only → no mode switcher, no switch chrome at all.
 * The simplest customer never pays complexity tax for the multi-role model.
 */
export const SoloDoctor: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="clinical"
      permissions={PERMISSIONS.soloDoctor}
      workspace={soloCabinet}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modes = deriveAvailableModes({
      permissions: PERMISSIONS.soloDoctor,
      enabledModules: ALL_MODULES,
      licenceVerified: true,
    });
    await expect(modes).toEqual(['clinical']);
    await expect(canvas.queryByText('Switch work area')).not.toBeInTheDocument();
  },
};

/**
 * Roadmap surfaces collapse behind one "More" launcher: the always-visible
 * rail stays short, while every deferred surface stays listed and tagged
 * "Soon" inside the menu — omission is not a product decision, and deferred
 * work must never look live. In the mobile nav sheet the group renders inline
 * instead: no overlay stacked on an overlay.
 */
export const RoadmapMoreGroup: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The rail shows live worklists plus a single "More" launcher.
    await expect(canvas.getByRole('button', { name: 'Results' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Bookings' })).toBeVisible();
    const more = canvas.getByRole('button', { name: 'More' });
    await expect(more).toBeVisible();

    // The menu lists every roadmap surface, each tagged — never silently hidden.
    await userEvent.click(more);
    const body = within(canvasElement.ownerDocument.body);
    for (const label of ['Care plans', 'Telehealth', 'Inbox', 'Tasks', 'Calendar']) {
      await expect(body.getByRole('menuitem', { name: `${label} Soon` })).toBeVisible();
    }

    // Navigation still works — the destination explains the roadmap state.
    await userEvent.click(body.getByRole('menuitem', { name: 'Inbox Soon' }));
    await expect(canvas.getByText('Clinical · inbox')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'More' })).toHaveAttribute(
      'data-active',
      'true',
    );
  },
};

/**
 * Multi-role nurse: front desk + collection, no clinical (no licence, no
 * clinical capabilities). The switcher shows exactly the earned modes.
 */
export const MultiRoleNurse: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="front-desk"
      permissions={PERMISSIONS.nurseFrontDeskCollection}
      licenceVerified={false}
      user={nurseUser}
      station={{ id: 'DESK-02', shift: 'morning' }}
    />
  ),
  play: async ({ canvasElement }) => {
    const modes = deriveAvailableModes({
      permissions: PERMISSIONS.nurseFrontDeskCollection,
      enabledModules: ALL_MODULES,
      licenceVerified: false,
    });
    await expect(modes).toEqual(['front-desk', 'collection']);

    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Arrivals' })).toBeVisible();

    const reports = canvas.getByRole('button', { name: 'Reports' });
    await userEvent.click(reports);
    await expect(reports).toHaveAttribute('aria-current', 'page');
    await expect(reports.querySelector('[data-kura-icon-style="bulk-rounded"]')).toBeTruthy();
  },
};

/** Switching modes swaps navigation and lands on the mode's entry destination. */
export const ModeSwitch: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: /Clinical/ }));
    const frontDeskOption = await body.findByRole('menuitemradio', { name: /Front desk/ });
    await userEvent.click(frontDeskOption);

    await waitFor(async () => {
      await expect(canvas.getByRole('button', { name: 'Arrivals' })).toBeVisible();
      await expect(canvas.getByText(/Front desk · arrivals/)).toBeVisible();
    });
  },
};

/**
 * Collection defaults to the shared navigation shell for mixed-role work.
 */
export const CollectionSidebar: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="collection"
      permissions={PERMISSIONS.nurseFrontDeskCollection}
      licenceVerified={false}
      user={nurseUser}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('[data-slot="app-shell"]')).toHaveAttribute(
      'data-posture',
      'sidebar',
    );
    await expect(canvas.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Scan' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Handoffs' })).toBeVisible();
    await expect(canvas.queryByText(/Station PSC-/)).not.toBeInTheDocument();
  },
};

/**
 * Explicit station posture: no sidebar, station identity + shift in the topbar.
 * Scan-first booth work is not navigation-first work — the chrome yields.
 */
export const CollectionStation: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="collection"
      permissions={PERMISSIONS.nurseFrontDeskCollection}
      licenceVerified={false}
      user={nurseUser}
      posture="station"
      station={psc01}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('[data-slot="app-shell"]')).toHaveAttribute(
      'data-posture',
      'station',
    );
    await expect(canvas.getByText('Phlebotomy')).toBeVisible();
    await expect(canvas.getByText('Station PSC-01')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Morning shift/ })).toBeVisible();
    await expect(canvas.queryByRole('navigation', { name: 'Primary' })).not.toBeInTheDocument();
  },
};

/** Licence lifecycle banner in the banner slot — pending review example. */
export const WithLicenceBanner: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="front-desk"
      permissions={PERMISSIONS.doctorFull}
      licenceVerified={false}
      banner={
        <Alert tone="warning">
          <AlertTitle>Licence under review</AlertTitle>
          <AlertDescription>
            Clinical ordering unlocks once verification finishes — usually within 1 business day.
          </AlertDescription>
        </Alert>
      }
    />
  ),
};

/** Badge counts on nav items surface work waiting in other destinations. */
export const WithBadgeCounts: Story = {
  args: requiredArgs,
  render: () => {
    const nav = MODE_REGISTRY['front-desk'].nav.map((group) => ({
      ...group,
      items: group.items.map((item) =>
        item.key === 'arrivals'
          ? { ...item, badgeCount: 4 }
          : item.key === 'queue'
            ? { ...item, badgeCount: 7 }
            : item,
      ),
    }));

    return (
      <ShellPlayground
        initialMode="front-desk"
        permissions={PERMISSIONS.nurseFrontDeskCollection}
        licenceVerified={false}
        user={nurseUser}
        nav={nav}
      />
    );
  },
};

/** Person-owned Earnings appears only with self-ledger access and keeps one active nav item. */
export const EarningsPersonGlobalScope: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      activeKey="earnings"
      initialMode="clinical"
      permissions={PERMISSIONS.doctorFull}
      scopeLabel="All Kura workspaces"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Scope: All Kura workspaces')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Earnings' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(canvas.queryByText('Mekong Clinic')).not.toBeInTheDocument();
  },
};

/** Delegated clinical access never exposes the person-owned Earnings destination. */
export const EarningsHiddenWithoutSelfAccess: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground initialMode="clinical" permissions={['patient.read']} />
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).queryByRole('button', { name: 'Earnings' }),
    ).not.toBeInTheDocument();
  },
};

/** Collapsed rail keeps every destination reachable at 68px. */
export const CollapsedRail: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="clinical"
      permissions={PERMISSIONS.doctorFull}
      defaultCollapsed
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Expand navigation' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Patients' })).toBeVisible();
    // The mode switcher lives in the topbar, so collapsing the rail never
    // hides it.
    const modeButton = canvas.getByRole('button', { name: 'Work area: Clinical' });
    await expect(modeButton).toBeVisible();
  },
};

/** Below 768px the sidebar yields to a left sheet with the same nav. */
export const Mobile: Story = {
  args: requiredArgs,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open navigation' }));
    const dialog = await canvas.findByRole('dialog');
    await expect(within(dialog).getByText('Patients')).toBeVisible();
  },
};

/** Long Khmer + English workspace and branch names must truncate, not break layout. */
export const LongContent: Story = {
  args: requiredArgs,
  render: () => (
    <ShellPlayground
      initialMode="front-desk"
      permissions={PERMISSIONS.doctorFull}
      workspace={{
        id: 'ws-long',
        name: 'គ្លីនិកវេជ្ជសាស្ត្រ Mekong International Family Medicine & Diagnostics',
        branches: [
          {
            id: 'br-long',
            name: 'Sangkat Boeung Keng Kang Ti Muoy Branch — opposite the old market',
          },
        ],
        activeBranchId: 'br-long',
      }}
    />
  ),
};
