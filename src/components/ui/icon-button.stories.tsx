import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { IconButton, PlusIcon, XIcon } from './index';

const meta = {
  title: 'Design System/Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'ReUI exposes icon-only button examples, but the fresh Kura index had no canonical icon-only action owner. The capability is promoted as an accessible Kura primitive.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'components/ui/button.tsx — icon-only examples',
        sourceUrl: 'https://reui.io/components/button',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: '44px-touch-target-at-all-widths',
      },
      exclusions: [
        {
          capability: 'Tooltip-only naming',
          reason: 'A tooltip can supplement an icon but cannot replace the required accessible name.',
          replacement: 'Pass aria-label and compose the canonical Tooltip when the action is unfamiliar.',
        },
      ],
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'primary', 'tertiary'] },
    tone: { control: 'radio', options: ['default', 'critical', 'success'] },
    size: { control: 'radio', options: ['micro', 'default', 'large'] },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Add diagnosis',
    children: <PlusIcon aria-hidden="true" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Add diagnosis' });
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const VariantsAndTones: Story = {
  args: {
    'aria-label': 'Action variants',
    children: <PlusIcon aria-hidden="true" />,
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton aria-label="Add diagnosis">
        <PlusIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Confirm result" variant="primary" tone="success">
        <PlusIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Remove draft" variant="tertiary" tone="critical">
        <XIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Remove draft" tone="critical">
        <XIcon aria-hidden="true" />
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    'aria-label': 'Action sizes',
    children: <PlusIcon aria-hidden="true" />,
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['micro', 'default', 'large'] as const).map((size) => (
        <IconButton key={size} aria-label={`Add diagnosis (${size})`} size={size}>
          <PlusIcon aria-hidden="true" />
        </IconButton>
      ))}
    </div>
  ),
};

export const LoadingAndDisabled: Story = {
  args: {
    'aria-label': 'Loading action',
    children: <PlusIcon aria-hidden="true" />,
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton aria-label="Saving draft" loading>
        <PlusIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Unavailable action" disabled>
        <PlusIcon aria-hidden="true" />
      </IconButton>
    </div>
  ),
};

export const DensityReference: Story = {
  args: {
    'aria-label': 'Density action',
    children: <PlusIcon aria-hidden="true" />,
  },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <IconButton aria-label={`Add diagnosis (${density})`}>
            <PlusIcon aria-hidden="true" />
          </IconButton>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>
      ))}
    </div>
  ),
};
