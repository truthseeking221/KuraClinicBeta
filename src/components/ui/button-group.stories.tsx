import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge, Button, ButtonGroup, IconButton, PlusIcon } from './index';

const meta = {
  title: 'Design System/Patterns/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'Kura already owns ButtonGroup for related action layout. The ReUI Button Group page adds evidence for stateful segmented selection, icon/text composition, nested groups, and toolbar compositions; the stateful selection contract is promoted to SegmentedToggle while ButtonGroup remains the layout owner.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'button-group — grouped action, segmented, toolbar, and view-switcher examples',
        sourceUrl: 'https://reui.io/components/button-group',
      },
      binding: {
        colors: 'delegated-to-kura-children',
        typography: 'delegated-to-kura-children',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'none',
        icons: 'delegated-to-kura-children',
        density: 'kura-root-attribute',
        responsive: 'stack-actions-under-480px',
      },
      exclusions: [
        {
          capability: 'Navigation tabs',
          reason: 'Related navigation is a tab or breadcrumb concern, not a grouped action concern.',
          replacement: 'Use the canonical Tabs or Breadcrumb owner when the journey calls for navigation.',
        },
        {
          capability: 'Pagination, split buttons, filter/input toolbars, and dropdown menus',
          reason: 'These are task patterns with independent data, menu, keyboard, and validation contracts; treating them as ButtonGroup variants would create a catch-all abstraction.',
          replacement: 'Compose ButtonGroup with the owning Pagination, Filter, Input, DropdownMenu, or split-action pattern when those owners are available.',
        },
      ],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  args: {
    label: 'Visit actions',
    children: (
      <>
        <Button variant="secondary">Save draft</Button>
        <Button variant="primary">Start consultation</Button>
      </>
    ),
  },
};

export const Segmented: Story = {
  args: {
    children: null,
  },
  render: () => (
    <ButtonGroup label="Result view" segmented>
      <Button variant="outline">Summary</Button>
      <Button variant="outline">Timeline</Button>
      <Button variant="outline">Audit</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    children: null,
  },
  render: () => (
    <ButtonGroup label="Record actions" orientation="vertical">
      <Button variant="secondary" fullWidth>
        Save draft
      </Button>
      <Button variant="primary" fullWidth>
        Submit record
      </Button>
      <Button variant="destructive" fullWidth>
        Remove draft
      </Button>
    </ButtonGroup>
  ),
};

export const WithIconButton: Story = {
  args: {
    children: null,
  },
  render: () => (
    <ButtonGroup label="Quick actions">
      <Button variant="secondary" leadingIcon={<PlusIcon aria-hidden="true" />}>
        Add note
      </Button>
      <IconButton aria-label="Add diagnosis">
        <PlusIcon aria-hidden="true" />
      </IconButton>
    </ButtonGroup>
  ),
};

export const WithStatusContext: Story = {
  args: {
    children: null,
  },
  render: () => (
    <ButtonGroup label="Order actions">
      <Button variant="secondary">Review order</Button>
      <Button variant="outline" trailingIcon={<Badge variant="warning">3</Badge>}>
        Pending items
      </Button>
    </ButtonGroup>
  ),
};

export const MobileStack: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="w-full max-w-sm">
      <ButtonGroup label="Consultation actions">
        <Button variant="secondary">Save the consultation draft</Button>
        <Button variant="primary">Start the consultation</Button>
      </ButtonGroup>
    </div>
  ),
};
