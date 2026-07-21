import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import {
  ArchiveIcon,
  Button,
  CheckIcon,
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  EditIcon,
  IconButton,
  MoreVerticalIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        hierarchy: 'Component',
        evidence:
          'Kura owns the contextual-menu contract and Radix behavior while adopting Kura panel, row, shadow, and overlay motion finish.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'dropdown',
        visualReference: 'Kura dropdown',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-popover',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'fluid-collision-safe-anchored-menu-with-contained-scrolling',
      },
      useCase: {
        role: 'Clinic staff and workspace administrators',
        primaryTask: 'Reveal a small set of secondary contextual actions or preferences without losing the current record or workspace context.',
        primaryAction: 'Choose one clearly labelled, reversible-or-confirmed menu action.',
        dataModel: 'Workflow-owned action labels, enabled state, selected preference state, and action handlers. The primitive neither loads data nor assigns permissions.',
        safety: 'Each trigger must retain a visible label or an accessible name. The primitive provides keyboard focus, Escape dismissal, type-ahead navigation, collision handling, and disabled-item semantics. Destructive actions remain explicitly labelled and must compose AlertDialog or feature-owned confirmation before changing consequential clinical or access data.',
      },
      mobile: {
        primaryTask: 'Open and choose a short contextual action safely with touch or keyboard.',
        minimumUsableWidth: '320px',
        strategy: ['FLUID', 'SCROLLING'],
        behavior: 'The menu remains collision-safe and anchored to its trigger; content clamps to the visible viewport and scrolls internally. Menu items retain a minimum touch target. Long, searchable, or comparison-heavy choices belong to Autocomplete or their owning workflow instead.',
      },
      exclusions: [
        {
          capability: 'User profile, workspace switcher, notifications, user-and-create, quick-action, and AI model selector demos',
          reason: 'These are workflow-specific compositions with identity, permissions, data loading, or notification state; they do not define a generic menu primitive.',
          replacement: 'Feature-owned compositions should compose DropdownMenu with canonical Avatar, Button, Badge, and workflow data when their real contract is defined.',
        },
        {
          capability: 'Searchable menu content',
          reason: 'Search changes the component into a query-and-selection workflow with filtering, loading, empty, and authoritative-value semantics.',
          replacement: 'Use the canonical Autocomplete owner.',
        },
        {
          capability: 'High-consequence destructive confirmation',
          reason: 'A compact contextual menu cannot safely communicate clinical, access, or irreversible consequences.',
          replacement: 'Use the canonical AlertDialog or a feature-owned confirmation flow after selecting the menu item.',
        },
        {
          capability: 'Long or comparison-critical choices',
          reason: 'Hiding these choices in a menu would increase recall burden and undermine safe comparison.',
          replacement: 'Keep them visible in the owning form, table, or segmented selection pattern.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A collision-safe contextual menu for a short list of secondary actions or preferences. Use a named Button or an IconButton with an explicit accessible name as the trigger. Do not place search, large comparisons, or high-consequence confirmation inside a menu.',
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Record actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" aria-label="Record actions">
        <DropdownMenuLabel>Draft consultation</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Review draft note</DropdownMenuItem>
          <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Discard draft</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Record actions' });
    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const menu = body.getByRole('menu', { name: 'Record actions' });
    await expect(menu).toBeVisible();
    await userEvent.keyboard('{ArrowDown}');
    await expect(body.getByRole('menuitem', { name: 'Review draft note' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(menu).not.toBeVisible();
    await expect(trigger).toHaveFocus();
  },
};

export const IconsAndShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="Open document actions" variant="tertiary">
          <MoreVerticalIcon aria-hidden="true" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Document actions">
        <DropdownMenuItem>
          <EditIcon aria-hidden="true" />
          Edit note
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon aria-hidden="true" />
          Copy reference
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ArchiveIcon aria-hidden="true" />
          Archive draft
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <DeleteIcon aria-hidden="true" />
          Delete draft
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const NestedActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Export review</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Export review">
        <DropdownMenuItem>Copy review link</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export format</DropdownMenuSubTrigger>
          <DropdownMenuSubContent aria-label="Export format">
            <DropdownMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download CSV
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function SelectionControlsExample() {
  const [showArchived, setShowArchived] = useState(false);
  const [view, setView] = useState('summary');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Review view</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Review view options">
        <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
          Show archived drafts
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel inset>Default view</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={view} onValueChange={setView}>
          <DropdownMenuRadioItem value="summary">Summary</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="timeline">Timeline</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="audit">Audit history</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const SelectionControls: Story = {
  render: () => <SelectionControlsExample />,
};

export const AvailabilityAndPermission: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Consultation actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Consultation actions">
        <DropdownMenuLabel>Verification required</DropdownMenuLabel>
        <DropdownMenuItem disabled>Share consultation summary</DropdownMenuItem>
        <DropdownMenuItem disabled>Complete consultation</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Save draft locally</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disclosure>Thao tác với hồ sơ</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" aria-label="Thao tác với hồ sơ">
          <DropdownMenuItem>
            Sao chép liên kết xem lại cho Trung tâm Chăm sóc Sức khỏe Nguyễn Trãi – Ca trực buổi chiều
          </DropdownMenuItem>
          <DropdownMenuItem>
            Xuất bản tóm tắt hội chẩn song ngữ Việt–Anh cho nhóm điều trị được phân quyền
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            Huỷ bản nháp chưa gửi và giữ lại lịch sử kiểm toán
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const MobileReference: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="flex w-full justify-end">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Open appointment actions" variant="tertiary">
            <MoreVerticalIcon aria-hidden="true" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" aria-label="Appointment actions">
          <DropdownMenuItem>Reschedule appointment</DropdownMenuItem>
          <DropdownMenuItem>Contact patient</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel appointment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const MobileLongActionList: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="flex w-full justify-start">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disclosure>More review actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" aria-label="More review actions">
          <DropdownMenuLabel>Draft consultation utilities</DropdownMenuLabel>
          <DropdownMenuItem>Review patient identity details</DropdownMenuItem>
          <DropdownMenuItem>Open the clinical history timeline</DropdownMenuItem>
          <DropdownMenuItem>Copy the consultation reference</DropdownMenuItem>
          <DropdownMenuItem>Send a follow-up reminder</DropdownMenuItem>
          <DropdownMenuItem>Request a supervising clinician review</DropdownMenuItem>
          <DropdownMenuItem>Print the current consultation summary</DropdownMenuItem>
          <DropdownMenuItem>Export a read-only review copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Save a private working copy</DropdownMenuItem>
          <DropdownMenuItem>Mark the draft for later review</DropdownMenuItem>
          <DropdownMenuItem>Restore the previous saved version</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Discard the current draft</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const DenseActionList: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Review utilities</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Review utilities">
        <DropdownMenuItem><CheckIcon aria-hidden="true" />Mark review complete</DropdownMenuItem>
        <DropdownMenuItem><EditIcon aria-hidden="true" />Edit review instructions</DropdownMenuItem>
        <DropdownMenuItem><CopyIcon aria-hidden="true" />Copy review reference</DropdownMenuItem>
        <DropdownMenuItem><DownloadIcon aria-hidden="true" />Export review summary</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
