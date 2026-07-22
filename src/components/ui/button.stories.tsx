import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button, ChevronRightIcon, PlusIcon } from './index';

const meta = {
  title: 'Design System/Primitives/Button',
  component: Button,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'REUSE',
        owner: 'src/components/ui',
        evidence:
          'The canonical Kura Button remains the action owner and uses one solid Brand 500 fill for primary actions, with Kura geometry, borders, shadows, and states.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'button',
        visualReference: 'Kura button',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'wraps-and-preserves-touch-target',
      },
      exclusions: [
        {
          capability: 'Button group composition',
          reason: 'Grouped actions need a named group, segmented semantics, and a responsive stacking contract.',
          replacement: 'Compose Button with the canonical ButtonGroup owner.',
        },
        {
          capability: 'Icon-only actions',
          reason: 'Icon-only controls require their own accessible-name and touch-target contract.',
          replacement: 'Use the canonical IconButton owner.',
        },
        {
          capability: 'Copy feedback',
          reason: 'Clipboard permission and success/error recovery are stateful behavior beyond a presentational Button.',
          replacement: 'Use the canonical CopyButton pattern.',
        },
        {
          capability: 'Social login, theme toggle, avatar actions, counters, and hover-only reveal',
          reason: 'These capabilities carry product-specific meaning or depend on other canonical patterns; keeping them in Button would create an unsafe catch-all API.',
          replacement: 'Compose the owning Auth, Theme, Avatar, Badge/Counter, Tooltip, or domain action pattern.',
        },
        {
          capability: 'Async success transitions, status badges, shortcut metadata, multi-line actions, animated menu toggles, and expanding labels',
          reason: 'These examples add state machines, supplemental information, or motion contracts that are not part of the domain-agnostic action primitive.',
          replacement: 'Use the owning async action, Badge, Kbd, menu/navigation, or domain pattern composed with Button.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A semantic action primitive for clinic workflows. Use one dominant action per decision area, name the consequence clearly, and reserve destructive emphasis for actions that remove or invalidate data.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
    },
    size: {
      control: 'radio',
      options: ['compact', 'xs', 'sm', 'md', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
    },
    loading: { control: 'boolean' },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Save visit draft',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Save visit draft' });
    await expect(button).toBeEnabled();
    await expect(window.getComputedStyle(button).backgroundImage).toBe('none');
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-wrap items-center gap-3">
      <Button>Save visit draft</Button>
      <Button variant="secondary">Review later</Button>
      <Button variant="outline">Open record</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="link">View audit history</Button>
      <Button variant="destructive">Remove draft</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="compact">Row action</Button>
          <span className="text-xs text-muted-foreground">compact</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xs">Extra small</Button>
          <span className="text-xs text-muted-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm">Small action</Button>
          <span className="text-xs text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="md">Medium action</Button>
          <span className="text-xs text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="default">Default action</Button>
          <span className="text-xs text-muted-foreground">default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg">Large action</Button>
          <span className="text-xs text-muted-foreground">lg</span>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="icon-xs" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon-xs</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon-sm" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon-sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon-lg" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon-lg</span>
        </div>
      </div>
    </div>
  ),
};

export const CompactTableRow: Story = {
  render: () => (
    <div role="row" className="flex w-full max-w-3xl items-center justify-between gap-3">
      <span role="cell">Fasting blood glucose</span>
      <div role="cell" className="flex shrink-0 items-center gap-2">
        <Button size="compact" variant="ghost">
          View
        </Button>
        <Button size="compact" variant="outline">
          Acknowledge result
        </Button>
      </div>
    </div>
  ),
};

export const ContentSlots: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button leadingIcon={<PlusIcon aria-hidden="true" />}>
          Add follow-up test
        </Button>
        <Button variant="outline" trailingIcon={<ChevronRightIcon aria-hidden="true" />}>
          Open visit record
        </Button>
        <Button variant="secondary" disclosure>
          Choose draw method
        </Button>
      </div>
      <Button fullWidth>Start consultation</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Create lab order',
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /create lab order/i });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
};

export const DisabledAndInvalid: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Unavailable until identity is verified</Button>
      <Button aria-invalid="true" variant="outline">
        Correct patient identity
      </Button>
      <Button aria-pressed="true" variant="secondary">
        Include in order set
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button asChild variant="link">
      <a href="/clinic/visits/visit-2048">Open visit record</a>
    </Button>
  ),
};

export const MobileLongLabel: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Button fullWidth>
        Confirm patient identity before starting the consultation
      </Button>
    </div>
  ),
};

export const MobileDefault: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Button fullWidth>Save visit draft</Button>
    </div>
  ),
};

export const MobileNarrow: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Button fullWidth variant="outline">
        Review later
      </Button>
    </div>
  ),
};

export const MobileInteractive: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button fullWidth leadingIcon={<PlusIcon aria-hidden="true" />}>
        Add follow-up test
      </Button>
      <Button fullWidth variant="destructive">
        Remove draft
      </Button>
    </div>
  ),
};

export const Tablet: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-wrap items-center gap-3">
      <Button>Save visit draft</Button>
      <Button variant="secondary">Review later</Button>
      <Button variant="outline">Open visit record</Button>
    </div>
  ),
};

export const Desktop: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Save visit draft</Button>
        <Button variant="outline">Open visit record</Button>
      </div>
      <Button variant="ghost">View audit history</Button>
    </div>
  ),
};

export const DensityReference: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <Button>Save draft</Button>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>
      ))}
    </div>
  ),
};
