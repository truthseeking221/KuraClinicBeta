import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AiBrainIcon,
  Button,
  InformationIcon,
  OfflineIcon,
  RefreshIcon,
  SuccessIcon,
  WarningIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Alert',
  component: Alert,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook and source search found no canonical persistent status-message primitive. The ReUI family supplies the missing alert structure, while Kura owns the semantic tone API, announcement behavior, dismiss action, and responsive composition.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-alert-1 through c-alert-20',
        sourceUrl: 'https://reui.io/components/alert',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-flat',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'mobile-first-stacking-and-wrapping',
      },
      useCase: {
        role: 'Clinic staff, patients, and operational workspace users',
        primaryTask: 'Recognize a persistent status or consequence and take the next safe action.',
        dataModel: 'A message with a semantic tone, explicit title or description, optional actions, and optional dismissal behavior.',
        safety: 'Urgent or clinically consequential messages can use role="alert" and must carry explicit text; the primitive does not decide escalation, acknowledgement, or permissions.',
        outOfScope: 'Toast notifications, modal alert dialogs, billing logic, feature discovery, domain-specific escalation, and workflow-owned error recovery.',
      },
      exclusions: [
        'ReUI frame and stacked-panel demos are represented as composition stories without importing a second frame or card system.',
        'Billing, feature-discovery, and user-message examples are excluded from the primitive; product and domain features own their data and recovery rules.',
        'The upstream destructive name is adapted to Kura danger terminology, and invert is retained as the inverse high-contrast tone.',
        'The primitive has no loading or disabled state of its own; pending and permission states are communicated by the owning action or domain composition.',
      ],
    },
    docs: {
      description: {
        component:
          'A persistent status and feedback message for a meaningful state, consequence, or next step. Use explicit text and a semantic icon when the message affects safety, eligibility, trust, or recovery. Use AlertDialog or Toast for different interaction contracts.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'radio',
      options: ['neutral', 'info', 'success', 'warning', 'danger', 'ai', 'inverse'],
    },
    role: { control: 'radio', options: ['status', 'alert'] },
    dismissLabel: { control: 'text' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyIconProps = { 'aria-hidden': true } as const;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Review state saved</AlertTitle>
      <AlertDescription>The record is ready for the next workflow step.</AlertDescription>
    </Alert>
  ),
};

export const SemanticTones: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-[var(--space-inset-card)]">
      <Alert tone="neutral">
        <AlertTitle>Draft record</AlertTitle>
        <AlertDescription>Changes are stored locally until you submit the review.</AlertDescription>
      </Alert>
      <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
        <AlertTitle>Processing in progress</AlertTitle>
        <AlertDescription>The latest result is being prepared for review.</AlertDescription>
      </Alert>
      <Alert tone="success" icon={<SuccessIcon {...storyIconProps} />}>
        <AlertTitle>Verification complete</AlertTitle>
        <AlertDescription>The record passed the configured validation checks.</AlertDescription>
      </Alert>
      <Alert tone="warning" icon={<WarningIcon {...storyIconProps} />}>
        <AlertTitle>Review required</AlertTitle>
        <AlertDescription>Confirm the highlighted details before continuing.</AlertDescription>
      </Alert>
      <Alert tone="danger" icon={<AlertIcon {...storyIconProps} />}>
        <AlertTitle>Sync failed</AlertTitle>
        <AlertDescription>The latest changes were not sent. Retry or review the connection status.</AlertDescription>
      </Alert>
      <Alert tone="ai" icon={<AiBrainIcon {...storyIconProps} />}>
        <AlertTitle>Assistant suggestion</AlertTitle>
        <AlertDescription>An AI-generated suggestion is available for review before use.</AlertDescription>
      </Alert>
      <Alert tone="inverse">
        <AlertTitle>Read-only workspace</AlertTitle>
        <AlertDescription>Editing is unavailable for this session.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithIconAndActions: Story = {
  render: () => (
    <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>New result available</AlertTitle>
      <AlertDescription>Open the result to confirm the status and continue the review.</AlertDescription>
      <AlertAction>
        <Button size="sm">Open result</Button>
        <Button size="sm" variant="outline">Review later</Button>
      </AlertAction>
    </Alert>
  ),
};

export const DangerRecovery: Story = {
  render: () => (
    <Alert tone="danger" role="alert" icon={<AlertIcon {...storyIconProps} />}>
      <AlertTitle>Connection lost</AlertTitle>
      <AlertDescription>Your unsent changes are preserved. Reconnect before submitting the review.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="destructive" leadingIcon={<RefreshIcon {...storyIconProps} />}>Retry connection</Button>
        <Button size="sm" variant="outline">View details</Button>
      </AlertAction>
    </Alert>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return visible ? (
      <Alert
        tone="success"
        icon={<SuccessIcon {...storyIconProps} />}
        onDismiss={() => setVisible(false)}
      >
        <AlertTitle>Changes saved</AlertTitle>
        <AlertDescription>You can continue to the next section.</AlertDescription>
      </Alert>
    ) : (
      <Button variant="outline" onClick={() => setVisible(true)}>Show alert again</Button>
    );
  },
};

export const UrgentOperationalNotice: Story = {
  render: () => (
    <Alert tone="warning" role="alert" icon={<WarningIcon {...storyIconProps} />}>
      <AlertTitle>Identity confirmation required</AlertTitle>
      <AlertDescription>Confirm the patient identity before opening or sharing the record.</AlertDescription>
      <AlertAction>
        <Button size="sm">Confirm identity</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </AlertAction>
    </Alert>
  ),
};

export const PermissionRestricted: Story = {
  render: () => (
    <Alert tone="neutral" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>Access restricted</AlertTitle>
      <AlertDescription>Your role can view this information but cannot edit it.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">Contact workspace admin</Button>
      </AlertAction>
    </Alert>
  ),
};

export const OfflineRecovery: Story = {
  render: () => (
    <Alert tone="warning" icon={<OfflineIcon {...storyIconProps} />}>
      <AlertTitle>Working offline</AlertTitle>
      <AlertDescription>New changes will remain on this device until the connection is restored.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline" leadingIcon={<RefreshIcon {...storyIconProps} />}>Check connection</Button>
      </AlertAction>
    </Alert>
  ),
};

export const RichDescription: Story = {
  render: () => (
    <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>Before you continue</AlertTitle>
      <AlertDescription>
        <p>Make sure the record has the correct owner and review context.</p>
        <ul>
          <li>Check the identity details.</li>
          <li>Confirm the selected review scope.</li>
        </ul>
      </AlertDescription>
    </Alert>
  ),
};

export const StackedStatusSummary: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-[var(--space-inset-card)]" aria-label="Service status summary">
      <Alert tone="success" icon={<SuccessIcon {...storyIconProps} />}>
        <AlertTitle>Core records</AlertTitle>
        <AlertDescription>Available and responding normally.</AlertDescription>
      </Alert>
      <Alert tone="warning" icon={<WarningIcon {...storyIconProps} />}>
        <AlertTitle>Document processing</AlertTitle>
        <AlertDescription>Running with reduced throughput. New uploads may take longer.</AlertDescription>
      </Alert>
      <Alert tone="danger" role="alert" icon={<AlertIcon {...storyIconProps} />}>
        <AlertTitle>External results</AlertTitle>
        <AlertDescription>Unavailable. Do not rely on a missing result as confirmation.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="outline">View service details</Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert tone="warning" icon={<WarningIcon {...storyIconProps} />} onDismiss={() => undefined}>
      <AlertTitle>Review context changed while you were working</AlertTitle>
      <AlertDescription>
        Another authorized user updated this record. Review the latest information before saving so that your decision is based on current data and no important changes are overwritten.
      </AlertDescription>
      <AlertAction>
        <Button size="sm">Review latest changes</Button>
        <Button size="sm" variant="outline">Keep my draft</Button>
      </AlertAction>
    </Alert>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl gap-[var(--space-inset-card)]">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col gap-[var(--space-stack-label)]">
          <span className="k-label">{density}</span>
          <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
            <AlertTitle>Processing in progress</AlertTitle>
            <AlertDescription>The latest result is being prepared for review.</AlertDescription>
            <AlertAction>
              <Button size="sm">View status</Button>
            </AlertAction>
          </Alert>
        </div>
      ))}
    </div>
  ),
};

export const MobileActions: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <Alert tone="danger" role="alert" icon={<AlertIcon {...storyIconProps} />}>
      <AlertTitle>Submission needs attention</AlertTitle>
      <AlertDescription>Resolve the highlighted fields before submitting this record.</AlertDescription>
      <AlertAction>
        <Button fullWidth>Review fields</Button>
        <Button fullWidth variant="outline">Save as draft</Button>
      </AlertAction>
    </Alert>
  ),
};

export const InverseNotice: Story = {
  render: () => (
    <Alert tone="inverse" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>Read-only mode</AlertTitle>
      <AlertDescription>Actions are hidden because this workspace is currently viewing an archived record.</AlertDescription>
    </Alert>
  ),
};
