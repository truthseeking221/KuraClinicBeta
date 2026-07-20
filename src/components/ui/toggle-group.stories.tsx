import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from './index';

const meta = {
  title: 'Design System/Components/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/c-toggle-group-1' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'The existing Base UI owner already supplied single/multiple pressed values, orientation, looped roving focus, disabled state, and inherited Toggle sizing.',
        exclusions: ['Pricing, notification channels, theme colors, and domain filters are compositions.', 'Use Tabs when content panels change and SegmentedToggle for a mutually exclusive view mode.'],
      },
      binding: { colors: 'kura-brand-neutral', typography: 'kura', spacing: 'kura', radius: 'kura', motion: 'kura-reduced-motion-safe' },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <ToggleGroup aria-label="Queue period" defaultValue={['today']}>
      <ToggleGroupItem value="today">Today</ToggleGroupItem>
      <ToggleGroupItem value="week">This week</ToggleGroupItem>
      <ToggleGroupItem value="all">All</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const today = canvas.getByRole('button', { name: 'Today' });
    today.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'This week' })).toHaveFocus();
  },
};

export const Outline: Story = {
  args: { children: null },
  render: () => (
    <ToggleGroup aria-label="Result display" defaultValue={['summary']} variant="outline">
      <ToggleGroupItem value="summary">Summary</ToggleGroupItem>
      <ToggleGroupItem value="table">Table</ToggleGroupItem>
      <ToggleGroupItem value="trend">Trend</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultipleSelection: Story = {
  args: { children: null },
  render: function MultipleToggleGroup() {
    const [value, setValue] = useState<string[]>(['waiting']);
    return (
      <ToggleGroup aria-label="Visible queue states" multiple onValueChange={setValue} value={value}>
        <ToggleGroupItem value="waiting">Waiting</ToggleGroupItem>
        <ToggleGroupItem value="ready">Ready</ToggleGroupItem>
        <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Vertical: Story = {
  args: { children: null },
  render: () => (
    <ToggleGroup aria-label="Information density" defaultValue={['standard']} orientation="vertical" variant="outline">
      <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
      <ToggleGroupItem value="standard">Standard</ToggleGroupItem>
      <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { children: null },
  render: () => (
    <ToggleGroup aria-label="Locked view" defaultValue={['summary']} disabled>
      <ToggleGroupItem value="summary">Summary</ToggleGroupItem>
      <ToggleGroupItem value="details">Details</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <div>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ToggleGroup aria-label={`${size} group`} defaultValue={['one']} key={size} size={size}>
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two">Two</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const MobileLongLabels: Story = {
  args: { children: null },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <ToggleGroup aria-label="Appointment filter" defaultValue={['upcoming']} variant="outline">
      <ToggleGroupItem value="upcoming">Upcoming appointments</ToggleGroupItem>
      <ToggleGroupItem value="rescheduled">Recently rescheduled</ToggleGroupItem>
      <ToggleGroupItem value="completed">Completed appointments</ToggleGroupItem>
    </ToggleGroup>
  ),
};
