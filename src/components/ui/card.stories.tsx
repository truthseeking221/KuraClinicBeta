import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import {
  AspectRatio,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardMeta,
  CardTitle,
  ImageIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Card',
  component: Card,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook index, canonical exports, source, and product-pattern search found Kura card tokens and repeated ad-hoc card-shaped surfaces, but no canonical Card implementation. The new owner removes that foundational duplication while keeping workflow behavior outside the primitive.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-card-1 through c-card-18',
        sourceUrl: 'https://reui.io/components/card',
      },
      binding: {
        colors: 'kura-semantic-card-and-muted',
        typography: 'kura-component-title-body-and-metadata',
        spacing: 'kura-card-inset-and-density',
        radius: 'kura-card-surface',
        elevation: 'kura-flat-card',
        icons: 'kura-canonical',
        density: 'kura-root-attribute-with-explicit-size-override',
        responsive: 'fluid-wrapping-with-mobile-action-stacking',
      },
      useCase: {
        role: 'Any Kura user reviewing one meaningful content unit within a larger workflow',
        primaryTask: 'Understand one grouped unit, its current context, and the next relevant action without confusing it with surrounding content.',
        dataModel: 'Semantic card structure with optional header metadata, title, description, action region, content, media, footer, and meaningful section dividers.',
        safety: 'The primitive does not assign clinical status, permissions, selection, navigation, or consequences. Those remain visible, explicit responsibilities of the owning composition.',
        outOfScope: 'Authentication forms, billing usage, deployment summaries, metric logic, dropdown menus, whole-card navigation, hover-only actions, image overlays, stacked decoration, and domain-specific workflows.',
      },
      exclusions: [
        'ReUI login, billing, deployment, revenue, integration, and profile examples are task-level compositions. Their data, validation, permissions, and recovery belong to feature or shared-pattern owners.',
        'Dropdown and expandable examples require canonical menu or disclosure owners; Card only supplies the action and content slots used by those compositions.',
        'Hover-scale image overlays and whole-card click behavior are excluded because essential meaning and actions must not depend on hover or create nested interactive targets.',
        'Stacked depth and gradient-fade examples are decorative rather than structural. Kura cards remain flat and use border, spacing, and hierarchy before elevation.',
        'Skeleton decoration is excluded until Kura has a canonical Skeleton owner; loading is represented accessibly with aria-busy and explicit status content.',
      ],
    },
    docs: {
      description: {
        component:
          'A flat surface for one meaningful content unit. Use it only when the boundary clarifies ownership, state, comparison, or action; leave ordinary page sections unboxed.',
      },
    },
  },
  argTypes: {
    as: { control: 'radio', options: ['article', 'section', 'div'] },
    size: { control: 'radio', options: [undefined, 'sm', 'md'] },
    variant: { control: 'radio', options: [undefined, 'elevated', 'outline'] },
    dividers: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] bg-muted p-[var(--space-inset-card)] text-center text-muted-foreground"
      aria-label={label}
    >
      <ImageIcon aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <Card className="max-w-md" aria-labelledby="record-review-title">
      <CardHeader>
        <CardMeta>Updated 4 minutes ago</CardMeta>
        <CardTitle id="record-review-title">Record ready for review</CardTitle>
        <CardDescription>Latest details are available. One attachment is still processing.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">Review later</Button>
        <Button>Open review</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article', { name: 'Record ready for review' });
    await expect(card).toHaveAttribute('data-slot', 'card');
    await expect(canvas.getByRole('button', { name: 'Open review' })).toBeVisible();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2">
      <Card size="sm">
        <CardHeader>
          <CardMeta>2 items</CardMeta>
          <CardTitle>Results to review</CardTitle>
          <CardDescription>Review before the end of this shift.</CardDescription>
        </CardHeader>
      </Card>
      <Card size="md">
        <CardHeader>
          <CardMeta>2 items</CardMeta>
          <CardTitle>Results to review</CardTitle>
          <CardDescription>Review before the end of this shift.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const OutlineVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Outline replaces the shadow with a hairline border in every theme. Use it for dense card grids, where repeated shadows read as noise, and for cards nested inside panels or drawers, where a shadow implies false elevation.',
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2">
      {(
        [
          ['Haematology', '2 results awaiting review'],
          ['Clinical chemistry', '5 results awaiting review'],
          ['Microbiology', '1 result awaiting review'],
          ['Immunology', 'No results awaiting review'],
        ] as const
      ).map(([title, description], index) => (
        <Card key={title} variant="outline" size="sm" aria-labelledby={`outline-card-title-${index}`}>
          <CardHeader>
            <CardMeta>Current shift</CardMeta>
            <CardTitle id={`outline-card-title-${index}`}>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article', { name: 'Haematology' });
    await expect(card).toHaveAttribute('data-variant', 'outline');
  },
};

export const DividedSections: Story = {
  render: () => (
    <Card className="max-w-md" dividers>
      <CardHeader>
        <CardMeta>Record access</CardMeta>
        <CardTitle>Reviewer access</CardTitle>
        <CardDescription>Reviewers can view this record. Only the owner can edit it.</CardDescription>
      </CardHeader>
      <CardFooter align="between">
        <Badge variant="neutral">Read only</Badge>
        <Button variant="outline">View policy</Button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderAction: Story = {
  render: () => (
    <Card className="max-w-lg">
      <CardHeader>
        <CardMeta>3 files · 1 still processing</CardMeta>
        <CardTitle>Attachments</CardTitle>
        <CardDescription>Files available in this review.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Manage</Button>
        </CardAction>
      </CardHeader>
    </Card>
  ),
};

export const MediaPlacements: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2">
      <Card>
        <CardMedia>
          <AspectRatio ratio={16 / 9}>
            <MediaPlaceholder label="Document preview" />
          </AspectRatio>
        </CardMedia>
        <CardHeader>
          <CardMeta>Uploaded today · 09:42</CardMeta>
          <CardTitle>Referral letter</CardTitle>
          <CardDescription>Attached to this review.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Open</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardMedia placement="inset">
          <AspectRatio ratio={16 / 9}>
            <MediaPlaceholder label="Identity preview" />
          </AspectRatio>
        </CardMedia>
        <CardHeader>
          <CardMeta>Identity check</CardMeta>
          <CardTitle>Identity document</CardTitle>
          <CardDescription>Verify the visible details before use.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Review</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const StatusSummary: Story = {
  render: () => (
    <Card className="max-w-md" dividers>
      <CardHeader>
        <CardMeta>Checked at 10:18</CardMeta>
        <CardTitle>External results delayed</CardTitle>
        <CardDescription>Results may arrive late. A missing result does not confirm a negative finding.</CardDescription>
        <CardAction mobileLayout="inline"><Badge variant="warning" dot>Delayed</Badge></CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">View status</Button>
      </CardFooter>
    </Card>
  ),
};

export const MetricSummary: Story = {
  render: () => (
    <Card size="sm" className="max-w-sm" aria-labelledby="pending-review-title">
      <CardHeader>
        <CardMeta>Current shift</CardMeta>
        <CardTitle id="pending-review-title">Pending reviews</CardTitle>
        <CardAction mobileLayout="inline"><Badge variant="warning">4 new</Badge></CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tabular-nums">12</div>
        <p className="mt-[var(--space-stack-control)] text-sm text-muted-foreground">4 added since the last shift.</p>
      </CardContent>
    </Card>
  ),
};

export const GuidanceLink: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardMeta>Review checklist</CardMeta>
        <CardTitle>Missing information?</CardTitle>
        <CardDescription>Check what to verify and when to request more details.</CardDescription>
      </CardHeader>
      <CardFooter align="start">
        <Button variant="link">Open checklist</Button>
      </CardFooter>
    </Card>
  ),
};

export const Loading: Story = {
  render: () => (
    <Card className="max-w-md" aria-busy="true">
      <CardHeader>
        <CardTitle>Record summary</CardTitle>
      </CardHeader>
      <CardContent role="status" aria-live="polite">
        Loading latest information…
      </CardContent>
    </Card>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardMeta>Attachments</CardMeta>
        <CardTitle>No attachments</CardTitle>
        <CardDescription>Add a file if this review needs supporting evidence.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Add file</Button>
      </CardFooter>
    </Card>
  ),
};

export const PermissionRestricted: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardMeta>Workspace policy</CardMeta>
        <CardTitle>Owner notes</CardTitle>
        <CardDescription>Only the Record Owner can edit these notes.</CardDescription>
        <CardAction mobileLayout="inline"><Badge variant="neutral">Read only</Badge></CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">Contact admin</Button>
      </CardFooter>
    </Card>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Card className="max-w-lg">
      <CardHeader>
        <CardMeta>Updated by another user</CardMeta>
        <CardTitle>Review changes for Alexandria Catherine Montgomery-Williams</CardTitle>
        <CardDescription>Community Health and Specialist Coordination Workspace</CardDescription>
        <CardAction mobileLayout="inline"><Badge variant="warning">Updated</Badge></CardAction>
      </CardHeader>
      <CardContent>
        Another user changed the identity details, supporting document, and record owner while your draft was open. Compare those updates with your draft before saving.
      </CardContent>
      <CardFooter>
        <Button variant="outline">Keep draft</Button>
        <Button>Review changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <Card as="section" className="max-w-md" aria-labelledby="section-card-title">
      <CardHeader>
        <CardMeta>Section example</CardMeta>
        <CardTitle as="h2" id="section-card-title">Review summary</CardTitle>
        <CardDescription>Key information for the current review.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl gap-[var(--space-inset-card)] lg:grid-cols-3">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density}>
          <Card>
            <CardHeader>
              <CardMeta>{density[0]?.toUpperCase()}{density.slice(1)}</CardMeta>
              <CardTitle>Review queue</CardTitle>
              <CardDescription>3 records need review.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  ),
};

export const MobileReference: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  render: () => (
    <div className="w-full max-w-sm">
      <Card dividers>
        <CardHeader>
          <CardMeta>Updated 4 minutes ago</CardMeta>
          <CardTitle>Access policy changed</CardTitle>
          <CardDescription>Review the new policy before using this record.</CardDescription>
          <CardAction mobileLayout="inline"><Badge variant="warning">Changed</Badge></CardAction>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Return to workspace</Button>
          <Button>Review policy</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
