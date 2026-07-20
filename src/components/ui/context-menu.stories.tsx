import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  ArchiveIcon,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CheckIcon,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EditIcon,
} from "./index";

function RecordTarget({
  label = "Context actions for the consultation draft",
}: {
  label?: string;
}) {
  return (
    <ContextMenuTrigger
      aria-label={label}
      className="block w-full max-w-md"
      tabIndex={0}
    >
      <Card>
        <CardHeader>
          <CardTitle>Consultation draft · Nguyễn Thị Ánh</CardTitle>
          <CardDescription>
            Right-click or press Shift+F10 for secondary actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          The visible page actions remain available without using this
          accelerator.
        </CardContent>
      </Card>
    </ContextMenuTrigger>
  );
}

const meta = {
  title: "Design System/Components/Context Menu",
  component: ContextMenu,
  tags: ["autodocs", "source-reui", "adapted-kura"],
  parameters: {
    layout: "centered",
    kura: {
      intake: {
        decision: "CREATE",
        owner: "src/components/ui",
        hierarchy: "Component",
        evidence:
          "DropdownMenu is an anchored menu launched by an explicit Button or IconButton. ContextMenu has a cursor-positioned trigger and must provide a keyboard/touch-equivalent path, so it is not a DropdownMenu variant.",
      },
      source: {
        vendor: "ReUI",
        registryItem: "@reui/context-menu — 10-example component family",
        sourceUrl: "https://reui.io/components/context-menu",
      },
      binding: {
        colors: "kura-semantic",
        typography: "kura",
        spacing: "kura",
        radius: "kura",
        elevation: "kura-popover",
        icons: "kura-canonical",
        density: "kura-root-attribute",
        responsive:
          "optional-desktop-keyboard-accelerator-with-required-visible-touch-alternative",
      },
      useCase: {
        role: "Clinic staff and workspace administrators",
        primaryTask:
          "Accelerate a small, secondary action on the current record without leaving context.",
        primaryAction:
          "Choose one clearly labelled action that has an equally visible non-context-menu path.",
        dataModel:
          "The owning feature supplies action labels, disabled/read-only state, selection state, handlers, and audit context.",
        safety:
          "Context Menu is never the only route to a required action. Destructive entries must open AlertDialog or an equivalent feature-owned confirmation before mutation.",
      },
      mobile: {
        primaryTask:
          "Reach the same actions through an explicit visible control.",
        minimumUsableWidth: "320px",
        strategy: ["TRANSFORMING"],
        behavior:
          "The context surface is optional on touch. Consumers pair it with an explicit Button/DropdownMenu or another visible action pattern with 44px targets.",
      },
      exclusions: [
        "Profile, workspace, notification, user-and-create, and AI-selector demos are feature-owned compositions with identity, permission, loading, or notification contracts.",
        "Searchable or comparison-heavy content belongs to Autocomplete, Combobox, Command, or the owning workflow rather than a context menu.",
        "A menu item may request but never silently perform a high-consequence clinical, identity, access, payment, or deletion action.",
      ],
    },
    docs: {
      description: {
        component:
          "A pointer and keyboard accelerator for a short list of secondary actions. It is never the sole entry point to essential work, and destructive actions must transition to explicit confirmation.",
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicContextMenu({
  menuLabel = "Consultation draft actions",
  triggerLabel = "Context actions for the consultation draft",
}: {
  menuLabel?: string;
  triggerLabel?: string;
}) {
  return (
    <ContextMenu>
      <RecordTarget label={triggerLabel} />
      <ContextMenuContent aria-label={menuLabel}>
        <ContextMenuGroup>
          <ContextMenuItem>Open draft</ContextMenuItem>
          <ContextMenuItem disabled>Open signed version</ContextMenuItem>
          <ContextMenuItem>Refresh review status</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Basic: Story = {
  render: () => <BasicContextMenu />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByLabelText(
      "Context actions for the consultation draft",
    );
    const triggerRect = trigger.getBoundingClientRect();
    await userEvent.pointer({
      target: trigger,
      coords: {
        x: Math.round(triggerRect.left + triggerRect.width / 2),
        y: Math.round(triggerRect.top + triggerRect.height / 2),
      },
      keys: "[MouseRight]",
    });

    const body = within(canvasElement.ownerDocument.body);
    const menu = body.getByRole("menu", { name: "Consultation draft actions" });
    await expect(menu).toBeVisible();
    expect(menu.getBoundingClientRect().left).toBeGreaterThan(0);
    expect(menu.getBoundingClientRect().top).toBeGreaterThan(0);
  },
};

export const Icons: Story = {
  render: () => (
    <ContextMenu>
      <RecordTarget label="Context actions for the review document" />
      <ContextMenuContent aria-label="Review document actions">
        <ContextMenuItem>
          <EditIcon aria-hidden="true" />
          Edit review instructions
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon aria-hidden="true" />
          Copy review reference
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon aria-hidden="true" />
          Export read-only summary
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ArchiveIcon aria-hidden="true" />
          Archive local working copy
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <RecordTarget label="Keyboard context actions for the consultation draft" />
      <ContextMenuContent aria-label="Keyboard consultation draft actions">
        <ContextMenuItem>
          Copy review reference
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Export read-only summary
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Archive local working copy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByLabelText(
      "Keyboard context actions for the consultation draft",
    );
    trigger.focus();
    await userEvent.keyboard("{Shift>}{F10}{/Shift}");

    const body = within(canvasElement.ownerDocument.body);
    const menu = body.getByRole("menu", {
      name: "Keyboard consultation draft actions",
    });
    await expect(menu).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(menu).not.toBeVisible();
    await expect(trigger).toHaveFocus();
  },
};

export const NestedActions: Story = {
  render: () => (
    <ContextMenu>
      <RecordTarget label="Context actions for the export draft" />
      <ContextMenuContent aria-label="Export draft actions">
        <ContextMenuItem>Copy secure review link</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Export format</ContextMenuSubTrigger>
          <ContextMenuSubContent aria-label="Export format">
            <ContextMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download PDF
            </ContextMenuItem>
            <ContextMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download CSV
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const LabelsAndSeparators: Story = {
  render: () => (
    <ContextMenu>
      <RecordTarget label="Context actions for follow-up draft" />
      <ContextMenuContent aria-label="Follow-up draft actions">
        <ContextMenuLabel>Draft consultation</ContextMenuLabel>
        <ContextMenuItem>Review care plan</ContextMenuItem>
        <ContextMenuItem>Copy audit reference</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Safe exits</ContextMenuLabel>
        <ContextMenuItem>Save local working copy</ContextMenuItem>
        <ContextMenuItem>Close without changes</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

function CheckboxPreferencesExample() {
  const [showArchived, setShowArchived] = useState(false);
  const [showInternalNotes, setShowInternalNotes] = useState(true);

  return (
    <ContextMenu>
      <RecordTarget label="Context actions for the review list" />
      <ContextMenuContent aria-label="Review list options">
        <ContextMenuCheckboxItem
          checked={showArchived}
          onCheckedChange={setShowArchived}
        >
          Show archived drafts
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showInternalNotes}
          onCheckedChange={setShowInternalNotes}
        >
          Show internal notes
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const CheckboxItems: Story = {
  render: () => <CheckboxPreferencesExample />,
};

function RadioPreferencesExample() {
  const [view, setView] = useState("summary");

  return (
    <ContextMenu>
      <RecordTarget label="Context actions for the patient review" />
      <ContextMenuContent aria-label="Patient review view">
        <ContextMenuLabel inset>Default view</ContextMenuLabel>
        <ContextMenuRadioGroup value={view} onValueChange={setView}>
          <ContextMenuRadioItem value="summary">Summary</ContextMenuRadioItem>
          <ContextMenuRadioItem value="timeline">Timeline</ContextMenuRadioItem>
          <ContextMenuRadioItem value="audit">
            Audit history
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const RadioItems: Story = {
  render: () => <RadioPreferencesExample />,
};

function DestructiveActionExample() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <ContextMenu>
        <RecordTarget label="Context actions for the unsent draft" />
        <ContextMenuContent aria-label="Unsent draft actions">
          <ContextMenuItem>Save local working copy</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <DeleteIcon aria-hidden="true" />
            Request draft discard confirmation
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Discard unsent consultation draft?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This removes the local unsent draft. The audit record remains
            available to authorised reviewers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep draft</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Discard unsent draft
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const DestructiveConfirmation: Story = {
  render: () => <DestructiveActionExample />,
};

export const Placement: Story = {
  render: () => (
    <ContextMenu>
      <RecordTarget label="Context actions near the viewport edge" />
      <ContextMenuContent
        align="end"
        side="bottom"
        aria-label="Viewport edge actions"
      >
        <ContextMenuItem>
          <CheckIcon aria-hidden="true" />
          Mark local review complete
        </ContextMenuItem>
        <ContextMenuItem>Open follow-up plan</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const InsideDialog: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Review referral destination</AlertDialogTitle>
          <AlertDialogDescription>
            Use the visible buttons to complete or cancel. The context menu
            offers optional review accelerators.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ContextMenu>
          <RecordTarget label="Context actions for the referral review" />
          <ContextMenuContent aria-label="Referral review actions">
            <ContextMenuItem>Copy referral reference</ContextMenuItem>
            <ContextMenuItem>Open permission details</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <AlertDialogFooter>
          <AlertDialogCancel>Close review</AlertDialogCancel>
          <AlertDialogAction>Continue to referral flow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const MobileVisibleAlternative: Story = {
  parameters: { viewport: { defaultViewport: "kura320" } },
  render: () => (
    <div className="grid w-full gap-4">
      <ContextMenu>
        <RecordTarget label="Optional context actions for the consultation draft" />
        <ContextMenuContent aria-label="Optional consultation draft actions">
          <ContextMenuItem>Copy review reference</ContextMenuItem>
          <ContextMenuItem>Save local working copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disclosure>
            More consultation actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="More consultation actions">
          <DropdownMenuItem>Copy review reference</DropdownMenuItem>
          <DropdownMenuItem>Save local working copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            Request draft discard confirmation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
