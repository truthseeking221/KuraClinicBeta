import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useEffect, useRef, useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  Button,
  CalendarIcon,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
  FileIcon,
  Kbd,
  MedicalFileIcon,
  RefreshIcon,
  SearchIcon,
  StarIcon,
  UserSearchIcon,
  WarningIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Command',
  component: Command,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        hierarchy: 'Component',
        evidence:
          'Journey WQ-02 requires an authorised global search and command palette, while no canonical Command component exists. SearchInput is only the shell trigger specification and Autocomplete is a field-level single-record selector.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/command — 8-example component family',
        sourceUrl: 'https://reui.io/components/command',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-modal',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'desktop-modal-transforms-to-full-height-mobile-search-surface',
      },
      useCase: {
        role: 'Doctor, with a feature-owned extension for other authorised clinic staff',
        primaryTask: 'Find an authorised patient, booking, or action without losing the current workspace context.',
        primaryAction: 'Open the exact authorised destination or start its owning action flow.',
        dataModel: 'The application shell supplies a permission-filtered command registry with stable IDs, labels, keywords, destinations, and handlers. Patient and booking records resolve through the reception doors only — exact phone (reception/patient/lookup-by-phone), exact booking code (reception/booking/by-code), and workspace recents (phone-gate/patients/recent). Free-text search exists server-side only for the lab catalog (clinic/lab/catalog); patient name/MRN text search has no backend by privacy design.',
        safety: 'Never send unauthorised patient, booking, or action data to the palette. Consequential actions begin their own confirmation and audit flow after selection.',
      },
      mobile: {
        primaryTask: 'Search the same authorised registry by touch or keyboard.',
        minimumUsableWidth: '320px',
        strategy: ['TRANSFORMING', 'SCROLLING'],
        behavior: 'The modal becomes a full-height search surface at narrow widths. The input is focused on open, items retain 44px targets, and Escape/backdrop safely restore focus.',
      },
      exclusions: [
        'The global ⌘K listener remains application-shell orchestration so it can avoid stealing input shortcuts and preserve the current feature context.',
        'Any command that changes clinical, identity, access, or payment state must continue into a named feature-owned confirmation flow.',
        'Search indexing, remote fetching, telemetry, result ranking, and permission filtering remain outside this presentation primitive.',
      ],
    },
    docs: {
      description: {
        component:
          'A modal, keyboard-first command palette for an already-authorised registry. It is not an inline form filter and not a substitute for visible safety-critical actions. Record lookup follows the reception doors: exact phone, exact booking code, or workspace recents — patient name/MRN free-text search intentionally has no backend, so the palette never promises it.',
      },
    },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <CommandDialog defaultOpen title="Search Kura" description="Search destinations authorised for this clinic workspace.">
      <Command label="Global Kura search" loop>
        <CommandInput placeholder="Search patient, booking, or action" />
        <CommandList>
          <CommandEmpty>No authorised destination matches this search.</CommandEmpty>
          <CommandGroup heading="Open">
            <CommandItem value="patient-pham-thi-lan" keywords={['patient', 'MRN-01482', 'Phạm Thị Lan']}>
              <MedicalFileIcon aria-hidden="true" />
              Open patient record: Phạm Thị Lan
            </CommandItem>
            <CommandItem value="booking-bk-20491" keywords={['booking', 'BK-20491', 'appointment']}>
              <CalendarIcon aria-hidden="true" />
              Open booking BK-20491
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole('dialog', { name: 'Search Kura' })).toBeVisible();
    const input = body.getByPlaceholderText('Search patient, booking, or action');
    await expect(input).toHaveFocus();
    await userEvent.type(input, 'BK-20491');
    await expect(body.getByText('Open booking BK-20491')).toBeVisible();
  },
};

export const Shortcuts: Story = {
  render: () => (
    <CommandDialog defaultOpen title="Quick actions" description="Choose a non-destructive action or open its governed workflow.">
      <Command label="Quick actions" loop>
        <CommandInput placeholder="Search quick actions" />
        <CommandList>
          <CommandEmpty>No action matches this search.</CommandEmpty>
          <CommandGroup heading="Create">
            <CommandItem value="new-booking" keywords={['booking', 'appointment', 'create']}>
              <CalendarIcon aria-hidden="true" />
              Start a new booking
              <CommandShortcut><Kbd>⌘B</Kbd></CommandShortcut>
            </CommandItem>
            <CommandItem value="open-patient-search" keywords={['patient', 'find', 'search']}>
              <UserSearchIcon aria-hidden="true" />
              Search patient directory
              <CommandShortcut><Kbd>⌘P</Kbd></CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const GroupedCommands: Story = {
  render: () => (
    <CommandDialog defaultOpen title="Workspace navigation">
      <Command label="Workspace navigation" loop>
        <CommandInput placeholder="Search navigation and actions" />
        <CommandList>
          <CommandEmpty>No authorised workspace destination matches.</CommandEmpty>
          <CommandGroup heading="Patients">
            <CommandItem value="patient-directory"><UserSearchIcon aria-hidden="true" />Patient directory</CommandItem>
            <CommandItem value="new-patient"><MedicalFileIcon aria-hidden="true" />Start governed patient intake</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Worklists">
            <CommandItem value="today-bookings"><CalendarIcon aria-hidden="true" />Open today’s bookings</CommandItem>
            <CommandItem value="collection-worklist"><FileIcon aria-hidden="true" />Collection draw worklist</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const ManyGroups: Story = {
  render: () => (
    <CommandDialog defaultOpen title="Search clinic workspace">
      <Command label="Clinic workspace search" loop>
        <CommandInput placeholder="Search the authorised workspace" />
        <CommandList>
          <CommandEmpty>No authorised destination matches this search.</CommandEmpty>
          <CommandGroup heading="Recent">
            <CommandItem value="recent-patient"><MedicalFileIcon aria-hidden="true" />Patient record: Nguyễn Thị Ánh</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Patients">
            <CommandItem value="patient-directory"><UserSearchIcon aria-hidden="true" />Patient directory</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Bookings">
            <CommandItem value="booking-worklist"><CalendarIcon aria-hidden="true" />Today’s booking worklist</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Collection">
            <CommandItem value="collection-worklist"><FileIcon aria-hidden="true" />Collection draw worklist</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Workspace">
            <CommandItem value="workspace-settings"><SearchIcon aria-hidden="true" />Workspace settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const AuthorisedRecordSearch: Story = {
  name: 'Record lookup through the reception doors',
  render: () => (
    <CommandDialog
      defaultOpen
      title="Find authorised record"
      description="Patients and bookings resolve by exact phone or booking code; recents come from this workspace."
    >
      <Command label="Authorised record search" loop>
        <CommandInput placeholder="Exact phone, booking code, test, or action" />
        <CommandList>
          <CommandEmpty>
            No match. Patients resolve by exact phone or booking code — partial names never search
            the registry.
          </CommandEmpty>
          <CommandGroup heading="Doors">
            <CommandItem value="door-phone-0908440921" keywords={['0908 440 921', 'phone', 'lookup']}>
              <UserSearchIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Find patient by phone 0908 440 921</span>
                <span className="text-sm text-muted-foreground">Exact match · opens phone-gate</span>
              </span>
            </CommandItem>
            <CommandItem value="door-booking-gw87430" keywords={['GW87430', 'booking', 'code']}>
              <CalendarIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Open booking GW87430</span>
                <span className="text-sm text-muted-foreground">Exact booking code · today 09:30</span>
              </span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Recent patients">
            <CommandItem value="recent-nguyen-thi-anh" keywords={['Nguyễn Thị Ánh', 'recent']}>
              <MedicalFileIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Nguyễn Thị Ánh</span>
                <span className="text-sm text-muted-foreground">092 *** 778 · MRN ··01 · Unverified</span>
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const PatientNameEmptyState: Story = {
  name: 'Name query → explain the doors (no silent empty)',
  render: () => (
    <CommandDialog
      defaultOpen
      title="Search Kura"
      description="Patient name search has no backend by privacy design — the empty state explains the doors."
    >
      <Command label="Global Kura search" loop>
        <CommandInput placeholder="Exact phone, booking code, test, or action" />
        <CommandList>
          <CommandEmpty>
            <span className="grid gap-1 text-left">
              <span>No authorised match.</span>
              <span className="text-sm text-muted-foreground">
                Patients resolve by exact phone or booking code, or from this workspace&rsquo;s
                recent patients. Names are never searchable across the registry.
              </span>
            </span>
          </CommandEmpty>
          <CommandGroup heading="Lab tests">
            <CommandItem value="test-hba1c" keywords={['HbA1c', 'glycated haemoglobin']}>
              <FileIcon aria-hidden="true" />
              HbA1c — glycated haemoglobin
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Exact phone, booking code, test, or action');
    await userEvent.type(input, 'Pham Thi Lan');
    await expect(await body.findByText(/resolve by exact phone or booking code/i)).toBeVisible();
  },
};

export const StaffSearchWithAvatars: Story = {
  render: () => (
    <CommandDialog defaultOpen title="Find authorised colleague" description="Only members of this clinic workspace appear here.">
      <Command label="Authorised staff search" loop>
        <CommandInput placeholder="Search care team by name or role" />
        <CommandList>
          <CommandEmpty>No authorised colleague matches this search.</CommandEmpty>
          <CommandGroup heading="Care team">
            {[
              ['BS. Nguyễn Minh Khôi', 'MK', 'Treating clinician'],
              ['BS. Trần Linh Chi', 'LC', 'Supervising clinician'],
              ['Nguyễn Phương Thảo', 'PT', 'Reception lead'],
            ].map(([name, initials, role]) => (
              <CommandItem key={name} value={name} keywords={[role]}>
                <Avatar size="sm" aria-label={name}>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="grid min-w-0 gap-1">
                  <span>{name}</span>
                  <span className="text-sm text-muted-foreground">{role}</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const ActionPalette: Story = {
  render: () => (
    <CommandDialog
      defaultOpen
      title="Consultation actions"
      description="Starting an action opens its own workflow; it does not complete a clinical change here."
    >
      <Command label="Consultation actions" loop>
        <CommandInput placeholder="Search clinic actions" />
        <CommandList>
          <CommandEmpty>No permitted clinic action matches.</CommandEmpty>
          <CommandGroup heading="Start">
            <CommandItem value="start-check-in"><UserSearchIcon aria-hidden="true" />Start patient check-in<CommandShortcut><Kbd>⌘I</Kbd></CommandShortcut></CommandItem>
            <CommandItem value="create-lab-order"><FileIcon aria-hidden="true" />Create lab order<CommandShortcut><Kbd>⌘L</Kbd></CommandShortcut></CommandItem>
            <CommandItem value="issue-booking-code"><CalendarIcon aria-hidden="true" />Issue booking code<CommandShortcut><Kbd>⌘B</Kbd></CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const RecentAndFavourites: Story = {
  render: () => (
    <CommandDialog defaultOpen title="Continue work">
      <Command label="Recent and favourite destinations" loop>
        <CommandInput placeholder="Search recent or favourite destinations" />
        <CommandList>
          <CommandEmpty>No saved destination matches this search.</CommandEmpty>
          <CommandGroup heading="Favourites">
            <CommandItem value="favourite-bookings"><StarIcon aria-hidden="true" />Today’s booking worklist</CommandItem>
            <CommandItem value="favourite-catalog"><StarIcon aria-hidden="true" />Lab test catalog</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent">
            <CommandItem value="recent-patient"><MedicalFileIcon aria-hidden="true" />Nguyễn Thị Ánh · MRN-01482</CommandItem>
            <CommandItem value="recent-booking"><CalendarIcon aria-hidden="true" />BK-20491 · Today at 09:30</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const LoadingAndMobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <CommandDialog
      defaultOpen
      title="Search Kura"
      description="Your selection and query remain available while the clinic directory refreshes."
    >
      <Command label="Mobile global search">
        <CommandInput placeholder="Search patient, booking, or action" />
        <CommandList>
          <CommandLoading label="Refreshing authorised results">Refreshing authorised results…</CommandLoading>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

/* ─── Interaction, state, and environment coverage ─── */

export const KeyboardNavigationAndSelection: Story = {
  name: 'Keyboard: arrows, Enter selects, Escape closes',
  render: function KeyboardStory() {
    const [selected, setSelected] = useState<string | null>(null);
    const [open, setOpen] = useState(true);
    return (
      <div>
        <p role="status" className="text-sm">
          {selected ? `Selected: ${selected}` : 'Nothing selected yet'}
        </p>
        <CommandDialog open={open} onOpenChange={setOpen} title="Search Kura">
          <Command label="Keyboard navigation demo" loop>
            <CommandInput placeholder="Search actions" />
            <CommandList>
              <CommandEmpty>No action matches.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem value="start-check-in" onSelect={() => { setSelected('start-check-in'); setOpen(false); }}>
                  <UserSearchIcon aria-hidden="true" />Start patient check-in
                </CommandItem>
                <CommandItem value="create-lab-order" onSelect={() => { setSelected('create-lab-order'); setOpen(false); }}>
                  <FileIcon aria-hidden="true" />Create lab order
                </CommandItem>
                <CommandItem value="issue-booking-code" onSelect={() => { setSelected('issue-booking-code'); setOpen(false); }}>
                  <CalendarIcon aria-hidden="true" />Issue booking code
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Search actions');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });

    // Arrow moves the active option; Enter selects it and the owner closes.
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(async () => {
      await expect(body.getByRole('status')).toHaveTextContent('Selected: create-lab-order');
    });
    await expect(body.queryByPlaceholderText('Search actions')).not.toBeVisible();
  },
};

export const DisabledWithReason: Story = {
  name: 'Disabled action carries its reason',
  render: () => (
    <CommandDialog defaultOpen title="Clinic actions" description="Unavailable actions stay visible and explain their gate.">
      <Command label="Clinic actions" loop>
        <CommandInput placeholder="Search clinic actions" />
        <CommandList>
          <CommandEmpty>No permitted clinic action matches.</CommandEmpty>
          <CommandGroup heading="Start">
            <CommandItem value="start-check-in">
              <UserSearchIcon aria-hidden="true" />Start patient check-in
            </CommandItem>
            <CommandItem value="invite-member" disabled>
              <UserSearchIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Invite workspace member</span>
                <span className="text-sm text-muted-foreground">Needs the member.invite permission — ask a workspace administrator.</span>
              </span>
            </CommandItem>
            <CommandItem value="manage-roles" disabled>
              <UserSearchIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Manage roles</span>
                <span className="text-sm text-muted-foreground">Needs the role.manage permission.</span>
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

const LONG_TESTS = [
  'Định lượng kháng thể kháng thụ thể TSH (TRAb) — miễn dịch điện hóa phát quang',
  'Tổng phân tích tế bào máu ngoại vi bằng máy đếm laser (CBC 26 thông số)',
  'Định lượng 25-hydroxy vitamin D toàn phần (D2 + D3) huyết thanh',
  'Xét nghiệm sinh học phân tử HPV genotype PCR hệ thống tự động',
  'Định lượng kháng nguyên đặc hiệu tuyến tiền liệt tự do (Free PSA)',
  'Nghiệm pháp dung nạp glucose đường uống 75g (OGTT) — thai kỳ',
  'Định lượng hormone kích thích tuyến giáp siêu nhạy thế hệ 4 (TSHs)',
  'Cấy máu định danh vi khuẩn và kháng sinh đồ tự động hai chai',
];

export const LongContentOverflow: Story = {
  name: 'Long Vietnamese labels + internal scroll',
  render: () => (
    <CommandDialog defaultOpen title="Search lab catalog">
      <Command label="Lab catalog search" loop>
        <CommandInput placeholder="Search tests" />
        <CommandList>
          <CommandEmpty>No test matches this search.</CommandEmpty>
          <CommandGroup heading="Tests">
            {LONG_TESTS.concat(LONG_TESTS.map((name) => `${name} · bản sao kiểm tra tràn`)).map((name) => (
              <CommandItem key={name} value={name}>
                <FileIcon aria-hidden="true" />
                <span className="min-w-0">{name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

/** The lab catalog is the one server-searched domain: filtering is disabled and
 * the owner replaces results per query (clinic/lab/catalog). */
export const AsyncCatalogSearch: Story = {
  name: 'Async server search (lab catalog contract)',
  render: function AsyncStory() {
    const [query, setQuery] = useState('');
    const [phase, setPhase] = useState<'idle' | 'loading' | 'ready'>('idle');
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
      if (query.trim() === '') {
        setPhase('idle');
        return undefined;
      }
      setPhase('loading');
      timerRef.current = window.setTimeout(() => setPhase('ready'), 450);
      return () => {
        if (timerRef.current != null) window.clearTimeout(timerRef.current);
      };
    }, [query]);

    return (
      <CommandDialog
        defaultOpen
        title="Search lab catalog"
        description="Results come from the clinic catalog service; the palette does not filter locally."
      >
        <Command label="Lab catalog server search" shouldFilter={false}>
          <CommandInput
            placeholder="Search tests by name or code"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {phase === 'idle' ? (
              <CommandEmpty>Type to search the active test catalog.</CommandEmpty>
            ) : null}
            {phase === 'loading' ? (
              <CommandLoading label="Searching test catalog">Searching test catalog…</CommandLoading>
            ) : null}
            {phase === 'ready' ? (
              <CommandGroup heading="Tests">
                <CommandItem value="hba1c">
                  <FileIcon aria-hidden="true" />
                  <span className="grid min-w-0 gap-1">
                    <span>HbA1c — glycated haemoglobin</span>
                    <span className="text-sm text-muted-foreground">HB-A1C · panel-ready</span>
                  </span>
                </CommandItem>
                <CommandItem value="hb-electrophoresis">
                  <FileIcon aria-hidden="true" />Haemoglobin electrophoresis
                </CommandItem>
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Search tests by name or code');
    await userEvent.type(input, 'hb');
    await expect(await body.findByText('Searching test catalog…')).toBeVisible();
    await expect(await body.findByText('HbA1c — glycated haemoglobin')).toBeVisible();
  },
};

export const RegistryErrorRecovery: Story = {
  name: 'Registry refresh failed → visible retry',
  render: () => (
    <CommandDialog
      defaultOpen
      title="Search Kura"
      description="A failed refresh never fails silently — the palette keeps navigation and offers a retry."
    >
      <Command label="Global Kura search" loop>
        <CommandInput placeholder="Search patient, booking, or action" />
        <CommandList>
          <CommandEmpty>No cached destination matches.</CommandEmpty>
          <CommandGroup heading="Search status">
            <CommandItem value="retry-refresh" keywords={['retry', 'error', 'refresh']}>
              <WarningIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Directory refresh failed — retry</span>
                <span className="text-sm text-muted-foreground">Showing cached navigation only. Recent patients may be stale.</span>
              </span>
              <CommandShortcut><RefreshIcon aria-hidden="true" /></CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation (cached)">
            <CommandItem value="today-bookings"><CalendarIcon aria-hidden="true" />Open today’s bookings</CommandItem>
            <CommandItem value="collection-worklist"><FileIcon aria-hidden="true" />Collection draw worklist</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};

export const TriggerControlledFocusRestore: Story = {
  name: 'Controlled by a trigger — focus returns on close',
  render: function TriggerStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="grid gap-3">
        <Button onClick={() => setOpen(true)}>
          <SearchIcon aria-hidden="true" />
          Search Kura
          <Kbd>⌘K</Kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen} title="Search Kura">
          <Command label="Global Kura search" loop>
            <CommandInput placeholder="Search patient, booking, or action" />
            <CommandList>
              <CommandEmpty>No authorised destination matches.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem value="today-bookings" onSelect={() => setOpen(false)}>
                  <CalendarIcon aria-hidden="true" />Open today’s bookings
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const trigger = body.getByRole('button', { name: /Search Kura/ });

    await userEvent.click(trigger);
    const input = await body.findByPlaceholderText('Search patient, booking, or action');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });

    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(trigger).toHaveFocus();
    });
  },
};

export const CompactDensity: Story = {
  globals: { density: 'compact' },
  render: ManyGroups.render,
};

export const MobileInteractiveLongList: Story = {
  name: 'Mobile 320 — interactive long list',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <CommandDialog defaultOpen title="Search lab catalog">
      <Command label="Mobile lab catalog search" loop>
        <CommandInput placeholder="Search tests" />
        <CommandList>
          <CommandEmpty>No test matches this search.</CommandEmpty>
          <CommandGroup heading="Tests">
            {LONG_TESTS.map((name) => (
              <CommandItem key={name} value={name}>
                <FileIcon aria-hidden="true" />
                <span className="min-w-0">{name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Search tests');
    await userEvent.type(input, 'vitamin');
    await expect(
      await body.findByText(/25-hydroxy vitamin D/),
    ).toBeVisible();
  },
};
