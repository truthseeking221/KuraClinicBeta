import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import {
  AppointmentIcon,
  CalendarIcon,
  CheckInIcon,
  FileIcon,
  MicroscopeIcon,
  UserMultipleIcon,
  UserSearchIcon,
} from '../../ui/icons';
import { AppShell } from './app-shell';
import { GlobalSearch } from './global-search';
import type { GlobalSearchSection } from './global-search';

const meta = {
  title: 'Clinic/Shell/Global Search',
  component: GlobalSearch,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      intake: {
        decision: 'COMPOSE (CommandDialog + Command family + Kbd)',
        owner: 'src/components/shared/app-shell',
        evidence:
          'Journey WQ-02: the shell ⌘K trigger existed with no palette behind it. GlobalSearch completes the pair — it owns the global hotkey and open state, renders the permission-filtered registry the shell supplies, and keeps door semantics: exact phone, exact booking code, workspace recents, lab-catalog text search. Consequential selections start their governed flow; nothing clinical completes in the palette.',
        exclusions: [
          'Registry construction, permission filtering, and door resolution stay with the application (deriveAvailableModes precedent) — this composition only renders and dispatches.',
          'Remote fetching/ranking stays outside; the async lab-catalog contract is documented on Design System/Components/Command.',
        ],
      },
      journeys: ['WQ-02-global-search'],
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-modal',
        icons: 'kura-hugeicons',
      },
    },
    docs: {
      description: {
        component:
          'The shell-owned ⌘K palette. AppShell renders the trigger; GlobalSearch owns the hotkey, open state, and registry presentation. The default empty state explains the reception doors instead of failing silently.',
      },
    },
  },
} satisfies Meta<typeof GlobalSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const FRONT_DESK_REGISTRY: GlobalSearchSection[] = [
  {
    id: 'doors',
    heading: 'Doors',
    items: [
      {
        id: 'door-phone',
        label: 'Find patient by phone (exact)',
        hint: 'Opens the phone-gate lookup',
        icon: <UserSearchIcon aria-hidden="true" />,
        keywords: ['phone', 'patient', 'lookup'],
      },
      {
        id: 'door-booking',
        label: 'Open booking by code',
        hint: 'GW-format collection code',
        icon: <CheckInIcon aria-hidden="true" />,
        keywords: ['booking', 'code'],
      },
    ],
  },
  {
    id: 'navigation',
    heading: 'Navigation',
    items: [
      {
        id: 'nav-arrivals',
        label: 'Arrivals',
        icon: <CheckInIcon aria-hidden="true" />,
        keywords: ['check-in', 'front desk'],
      },
      {
        id: 'nav-bookings',
        label: 'Today’s bookings',
        icon: <AppointmentIcon aria-hidden="true" />,
        keywords: ['worklist'],
      },
      {
        id: 'nav-catalog',
        label: 'Lab test catalog',
        icon: <MicroscopeIcon aria-hidden="true" />,
        keywords: ['tests', 'search'],
      },
    ],
  },
  {
    id: 'actions',
    heading: 'Actions',
    items: [
      {
        id: 'action-check-in',
        label: 'Start patient check-in',
        icon: <UserSearchIcon aria-hidden="true" />,
        shortcut: '⌘I',
        keywords: ['reception', 'wizard'],
      },
      {
        id: 'action-invite',
        label: 'Invite workspace member',
        hint: 'Needs the member.invite permission — ask a workspace administrator.',
        icon: <UserMultipleIcon aria-hidden="true" />,
        disabled: true,
        keywords: ['member', 'invite'],
      },
    ],
  },
];

function ShellPlayground({ registry }: { registry: GlobalSearchSection[] }) {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState<string | null>(null);
  const sections = registry.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      onSelect: () => setDestination(item.id),
    })),
  }));

  return (
    <AppShell
      activeKey="arrivals"
      availableModes={['front-desk', 'collection']}
      mode="front-desk"
      onNavigate={() => {}}
      onOpenSearch={() => setOpen(true)}
      station={{ id: 'DESK-01', shift: 'morning' }}
      user={{ name: 'Linh Nguyen', email: 'linh@mekong.clinic', licenceVerified: false }}
      workspace={{ id: 'ws-mekong', name: 'Mekong Clinic' }}
    >
      <div style={{ padding: 'var(--space-6)' }}>
        <p role="status">{destination ? `Opened: ${destination}` : 'Nothing opened yet.'}</p>
      </div>
      <GlobalSearch onOpenChange={setOpen} open={open} sections={sections} />
    </AppShell>
  );
}

export const WiredToShell: Story = {
  name: 'Wired to the shell trigger + ⌘K',
  args: { sections: FRONT_DESK_REGISTRY, open: false, onOpenChange: () => {} },
  render: () => <ShellPlayground registry={FRONT_DESK_REGISTRY} />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    // The visible trigger opens the palette.
    await userEvent.click(body.getByRole('button', { name: /Search/ }));
    const input = await body.findByPlaceholderText('Exact phone, booking code, test, or action');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });

    // Selecting dispatches to the owner and closes the palette.
    await userEvent.type(input, 'catalog');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(async () => {
      await expect(body.getByRole('status')).toHaveTextContent('Opened: nav-catalog');
    });
    await expect(input).not.toBeVisible();

    // The global hotkey reopens it.
    await userEvent.keyboard('{Meta>}k{/Meta}');
    await waitFor(async () => {
      await expect(
        body.getByPlaceholderText('Exact phone, booking code, test, or action'),
      ).toBeVisible();
    });
    await userEvent.keyboard('{Escape}');
  },
};

export const DoorsExplainOnNameQuery: Story = {
  name: 'Name query → doors explanation',
  args: { sections: FRONT_DESK_REGISTRY, open: true, onOpenChange: () => {} },
  render: function DoorsStory() {
    const [open, setOpen] = useState(true);
    return <GlobalSearch onOpenChange={setOpen} open={open} sections={FRONT_DESK_REGISTRY} />;
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = await body.findByPlaceholderText('Exact phone, booking code, test, or action');
    await userEvent.type(input, 'Sokha Chan');
    await expect(
      await body.findByText(/resolve by exact phone or booking code/i),
    ).toBeVisible();
  },
};

export const PermissionLimitedRegistry: Story = {
  name: 'Permission-limited registry (phlebotomy station)',
  args: { sections: [], open: true, onOpenChange: () => {} },
  render: function LimitedStory() {
    const [open, setOpen] = useState(true);
    const sections: GlobalSearchSection[] = [
      {
        id: 'navigation',
        heading: 'Navigation',
        items: [
          {
            id: 'nav-worklist',
            label: 'Collection draw worklist',
            icon: <FileIcon aria-hidden="true" />,
            keywords: ['draw', 'samples'],
          },
          {
            id: 'nav-schedule',
            label: 'Shift schedule',
            icon: <CalendarIcon aria-hidden="true" />,
            keywords: ['shift'],
          },
        ],
      },
    ];
    return (
      <GlobalSearch
        description="This station’s registry is filtered before it reaches the palette — workspace administration never appears here."
        onOpenChange={setOpen}
        open={open}
        sections={sections}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByText('Collection draw worklist')).toBeVisible();
    await expect(body.queryByText(/Invite workspace member/)).not.toBeInTheDocument();
  },
};
