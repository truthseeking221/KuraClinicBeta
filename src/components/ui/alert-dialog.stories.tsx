import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertIcon,
  Button,
  DeleteIcon,
  InformationIcon,
  WarningIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook and source search found no canonical blocking confirmation overlay or dialog primitive. ReUI supplies the missing confirmation structure, while Kura owns the native-modal behavior, safety copy, action hierarchy, and responsive contract.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-alert-dialog-1 through c-alert-dialog-14',
        sourceUrl: 'https://reui.io/components/alert-dialog',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-modal',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'native-modal-with-mobile-action-stacking',
      },
      useCase: {
        role: 'Clinic staff and workspace administrators making consequential changes',
        primaryTask: 'Understand an irreversible or workflow-disrupting consequence and choose the safe next action.',
        dataModel: 'Workflow-owned open state, human-readable consequence, optional media, and explicit cancel and action handlers.',
        safety: 'The component blocks background interaction, keeps cancel before destructive action in DOM order, uses native focus containment, and never dismisses on backdrop click.',
        outOfScope: 'Long forms, nested dialogs, billing, logout, generic success notifications, clinical acknowledgement rules, and checkbox or typed-confirmation gates owned by feature workflows.',
      },
      exclusions: [
        'Nested-dialog demos are excluded because Kura has no canonical Dialog owner yet; nested blocking overlays are unsafe and require a separate modal-stack contract.',
        'Task success, ticket, billing, logout, account, and security-audit demos are feature workflows; Alert or a feature-owned confirmation composes this primitive with real data and permissions.',
        'Checkbox and typed confirmation gates are excluded from the primitive because their validation, audit, and clinical consequence rules belong to the owning workflow and require canonical form controls.',
        'Portal and overlay subcomponents are intentionally not public: AlertDialogContent owns one native modal surface to prevent duplicate scrims and unsafe layering.',
      ],
    },
    docs: {
      description: {
        component:
          'A blocking confirmation dialog for irreversible or high-consequence actions. State the consequence plainly, preserve a safe cancel path, and use feature-owned confirmation rules for clinical acknowledgements or validated gates.',
      },
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Remove draft</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this draft?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the unsent draft from your workspace. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep draft</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove draft</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [trigger] = canvas.getAllByRole('button', { name: 'Remove draft' });
    if (!trigger) throw new Error('Alert dialog trigger was not found.');
    await userEvent.click(trigger);
    const dialog = canvas.getByRole('alertdialog');
    await expect(dialog).toHaveAttribute('open');
    await expect(canvas.getByRole('button', { name: 'Keep draft' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Keep draft' }));
    await expect(dialog).not.toHaveAttribute('open');
    await expect(trigger).toHaveFocus();
  },
};

export const CompactConfirmation: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Allow session sharing?</AlertDialogTitle>
          <AlertDialogDescription>
            The selected colleague can view this record during the active consultation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Do not allow</AlertDialogCancel>
          <AlertDialogAction>Allow sharing</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="info"><InformationIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Start the record review?</AlertDialogTitle>
          <AlertDialogDescription>
            Opening the review reserves this record for your current session until you finish or release it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Review later</AlertDialogCancel>
          <AlertDialogAction>Start review</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia tone="danger"><DeleteIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Delete this attachment?</AlertDialogTitle>
          <AlertDialogDescription>
            The file will be permanently removed from this draft. The clinical record itself will not change.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete attachment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const UnsavedChanges: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="warning"><WarningIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Leave without saving changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Your edits to the review note have not been saved. Leaving now discards those changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Discard changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const PendingAction: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove the draft now?</AlertDialogTitle>
          <AlertDialogDescription>
            The action is in progress. Keep this dialog open until the operation finishes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled>Keep draft</AlertDialogCancel>
          <AlertDialogAction variant="destructive" loading closeOnAction={false}>Removing draft</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const ExplicitAcknowledgement: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent closeOnEscape={false}>
        <AlertDialogHeader>
          <AlertDialogMedia tone="warning"><AlertIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Review the policy change</AlertDialogTitle>
          <AlertDialogDescription>
            This workspace policy changes who can access future records. Choose a visible action to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Review policy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive the inactive care-plan draft?</AlertDialogTitle>
          <AlertDialogDescription>
            This draft is no longer visible in the active care-plan workspace. It remains in the audit history with its author and timestamp, but it cannot be edited or reopened as an active plan. Confirm that no current follow-up depends on this draft before archiving it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep active</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Archive draft</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Open {density} dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm review</AlertDialogTitle>
                <AlertDialogDescription>Continue to the selected record review.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue review</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  ),
};

export const MobileReference: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="danger"><DeleteIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Delete the selected attachment?</AlertDialogTitle>
          <AlertDialogDescription>
            The attachment is permanently removed from this draft. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep attachment</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete attachment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
