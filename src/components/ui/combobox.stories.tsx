import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Fragment, useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxValue,
  SearchIcon,
  useComboboxAnchor,
} from './index';

type CareMember = {
  id: string;
  label: string;
  role: string;
  initials: string;
  group: 'Primary care' | 'Specialist review';
  locked?: boolean;
};

const careMembers: CareMember[] = [
  {
    id: 'nguyen-minh',
    label: 'BS. Nguyễn Minh Khôi',
    role: 'Bác sĩ điều trị · Phòng khám Nguyễn Trãi',
    initials: 'MK',
    group: 'Primary care',
  },
  {
    id: 'tran-linh',
    label: 'BS. Trần Linh Chi',
    role: 'Bác sĩ phụ trách · Theo dõi sau xét nghiệm',
    initials: 'LC',
    group: 'Primary care',
    locked: true,
  },
  {
    id: 'le-huong',
    label: 'BS. Lê Hương Giang',
    role: 'Nội tiết · Hội chẩn tăng đường huyết',
    initials: 'HG',
    group: 'Specialist review',
  },
  {
    id: 'pham-anh',
    label: 'BS. Phạm Anh Dũng',
    role: 'Tim mạch · Rà soát huyết áp và thuốc',
    initials: 'AD',
    group: 'Specialist review',
  },
];

function CareMemberItem({ member }: { member: CareMember }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <Avatar size="sm" aria-label={member.label}>
        <AvatarFallback>{member.initials}</AvatarFallback>
      </Avatar>
      <span className="grid min-w-0 gap-1">
        <span>{member.label}</span>
        <span className="text-sm text-muted-foreground">{member.role}</span>
      </span>
    </span>
  );
}

const meta = {
  title: 'Design System/Components/Combobox',
  component: Combobox,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        hierarchy: 'Component',
        evidence:
          'Autocomplete already owns authoritative single-record selection. Combobox adds only the distinct searchable multi-selection, grouped options, removable/locked chips, and controlled selected-value contract documented in docs/intake/reui-combobox-command-context-menu-intake.md.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/combobox — 28-example component family',
        sourceUrl: 'https://reui.io/components/combobox',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-popover',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'fluid-field-with-contained-collision-safe-popup',
      },
      useCase: {
        role: 'Doctor, receptionist, or workspace administrator',
        primaryTask: 'Choose one or several values from a workflow-authorised, searchable set.',
        primaryAction: 'Select or remove an explicitly permitted value.',
        dataModel: 'Parent-owned option records, selected value(s), validation state, and mutation handler. Free text is never submitted as an identifier.',
        safety: 'Use Autocomplete for a single authoritative record. The feature must disclose locked selections, pre-filter unauthorised options, and confirm any consequential follow-on action.',
      },
      mobile: {
        primaryTask: 'Search and select values without losing the current selection or field error.',
        minimumUsableWidth: '320px',
        strategy: ['FLUID', 'WRAPPING', 'SCROLLING'],
        behavior: 'Chips wrap, disclosure and removal controls keep 44px targets, and the popup stays within the visual viewport with contained scrolling.',
      },
      exclusions: [
        'User-created and invisible tags require feature-owned validation, moderation, audit, and permission rules.',
        'Date picker, status, priority, lead, team, and assignee demos are domain compositions; use Calendar, Select, Autocomplete, or the owning feature alongside this primitive.',
        'Remote paging, cancellation, freshness, and result limits belong to the data-owning feature rather than a client-only listbox primitive.',
      ],
    },
    docs: {
      description: {
        component:
          'Use for a searchable controlled selection when the workflow permits multiple values or needs visible selected chips. Do not use it to create unsanctioned labels or to hide an important comparison set.',
      },
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox<CareMember>
        items={careMembers}
        itemToStringLabel={(member) => member.label}
        itemToStringValue={(member) => member.id}
      >
        <ComboboxLabel>Assign care lead</ComboboxLabel>
        <ComboboxInput clearLabel="Clear selected care lead" placeholder="Search clinician by name or role" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No authorised clinicians match this search.</ComboboxEmpty>
          <ComboboxList>
            {(member: CareMember) => (
              <ComboboxItem key={member.id} value={member}>
                <CareMemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Assign care lead' });
    await userEvent.click(input);

    const body = within(canvasElement.ownerDocument.body);
    const firstOption = await body.findByRole('option', { name: /Nguyễn Minh Khôi/i });
    await waitFor(() => expect(firstOption).toBeVisible());
    const control = canvasElement.querySelector<HTMLElement>("[data-slot='combobox-input-control']");
    const popup = firstOption.closest<HTMLElement>("[data-slot='combobox-content']");
    await waitFor(() => expect(Math.round(popup?.getBoundingClientRect().width ?? 0)).toBe(
      Math.round(control?.getBoundingClientRect().width ?? 0),
    ));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(input).toHaveValue('BS. Nguyễn Minh Khôi');
  },
};

export const LeadingIcon: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox<CareMember>
        items={careMembers}
        itemToStringLabel={(member) => member.label}
        itemToStringValue={(member) => member.id}
      >
        <ComboboxLabel>Search care team</ComboboxLabel>
        <ComboboxInput
          leadingIcon={<SearchIcon aria-hidden="true" />}
          placeholder="Search care team"
          showTrigger={false}
        />
        <ComboboxContent>
          <ComboboxEmpty>No authorised clinicians match this search.</ComboboxEmpty>
          <ComboboxList>
            {(member: CareMember) => (
              <ComboboxItem key={member.id} value={member}>
                <CareMemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('combobox', { name: 'Search care team' }),
    ).toBeVisible();
    await expect(canvasElement.querySelector('[data-slot="combobox-input-control"] svg')).toBeVisible();
  },
};

export const GroupedAndAutoHighlighted: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox<CareMember> autoHighlight defaultOpen>
        <ComboboxLabel>Add reviewer</ComboboxLabel>
        <ComboboxInput placeholder="Search the authorised care team" />
        <ComboboxContent>
          <ComboboxEmpty>No reviewer matches this search.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxGroupLabel>Primary care</ComboboxGroupLabel>
              {careMembers.filter((member) => member.group === 'Primary care').map((member) => (
                <ComboboxItem key={member.id} value={member}>
                  <CareMemberItem member={member} />
                </ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxGroupLabel>Specialist review</ComboboxGroupLabel>
              {careMembers.filter((member) => member.group === 'Specialist review').map((member) => (
                <ComboboxItem key={member.id} value={member}>
                  <CareMemberItem member={member} />
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

function MultiSelectExample({ locked = false }: { locked?: boolean }) {
  const anchor = useComboboxAnchor();
  const [selectedMembers, setSelectedMembers] = useState<CareMember[]>(
    locked ? [careMembers[0], careMembers[1]] : [careMembers[0]],
  );

  return (
    <div className="w-full max-w-sm">
      <Combobox<CareMember, true>
        multiple
        autoHighlight
        items={careMembers}
        itemToStringLabel={(member) => member.label}
        itemToStringValue={(member) => member.id}
        value={selectedMembers}
        onValueChange={(nextValue) => setSelectedMembers(nextValue)}
      >
        <ComboboxLabel>Consultation care team</ComboboxLabel>
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: CareMember[]) => (
              <Fragment>
                {values.map((member) => (
                  <ComboboxChip
                    key={member.id}
                    removable={locked ? !member.locked : true}
                    removeLabel={`Remove ${member.label} from the consultation care team`}
                  >
                    {member.label}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Add an authorised clinician" />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No authorised clinicians match this search.</ComboboxEmpty>
          <ComboboxList>
            {(member: CareMember) => (
              <ComboboxItem key={member.id} value={member}>
                <CareMemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export const MultiSelect: Story = {
  render: () => <MultiSelectExample />,
};

export const LockedSelections: Story = {
  render: () => <MultiSelectExample locked />,
};

export const InvalidAndPermissionLimited: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox<CareMember>
        disabled
        defaultValue={careMembers[1]}
        itemToStringLabel={(member) => member.label}
      >
        <ComboboxLabel>Required supervising clinician</ComboboxLabel>
        <ComboboxInput
          aria-invalid="true"
          aria-describedby="supervisor-selection-error"
          placeholder="Search authorised supervisors"
        />
        <ComboboxStatus id="supervisor-selection-error" role="alert">
          Your workspace does not permit changing the supervising clinician after review has started.
        </ComboboxStatus>
      </Combobox>
    </div>
  ),
};

export const LoadingAndEmpty: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox defaultOpen>
        <ComboboxLabel>Find an external referral destination</ComboboxLabel>
        <ComboboxInput placeholder="Search authorised referral destinations" />
        <ComboboxContent>
          <ComboboxStatus>Checking the current referral directory…</ComboboxStatus>
          <ComboboxEmpty>No permitted referral destinations are available. Retry after the directory syncs.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

export const CustomResultRendering: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox<CareMember> defaultOpen items={careMembers} itemToStringLabel={(member) => member.label}>
        <ComboboxLabel>Request specialist review</ComboboxLabel>
        <ComboboxInput placeholder="Search specialist reviewers" triggerLabel="Show specialist reviewers" />
        <ComboboxContent>
          <ComboboxEmpty>No specialist reviewer matches this search.</ComboboxEmpty>
          <ComboboxList>
            {(member: CareMember) => (
              <ComboboxItem key={member.id} value={member}>
                <CareMemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

export const LongContentMobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="w-full">
      <Combobox defaultOpen>
        <ComboboxLabel>Chọn nhóm hội chẩn theo dõi sau xét nghiệm bất thường</ComboboxLabel>
        <ComboboxInput placeholder="Tìm bác sĩ theo chuyên khoa, cơ sở hoặc vai trò theo dõi" />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="long-care-team">
              Nhóm Nội tiết và Tim mạch – theo dõi tăng đường huyết, huyết áp, và điều chỉnh thuốc sau khi người bệnh xác nhận lịch hẹn.
            </ComboboxItem>
            <ComboboxItem value="read-only-team" disabled>
              Nhóm đang bị giới hạn quyền chỉnh sửa do hồ sơ đã chuyển sang trạng thái chờ hội chẩn cấp cao hơn.
            </ComboboxItem>
          </ComboboxList>
          <ComboboxEmpty>Không có nhóm hội chẩn phù hợp.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};
