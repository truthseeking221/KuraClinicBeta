import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { InformationIcon, Toggle } from './index';
import styles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/c-toggle-1' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'The existing Base UI toggle already owned pressed state, keyboard semantics, sizes, and quiet default/outline variants.',
        exclusions: ['Reaction counters, mute behavior, and changing labels remain feature compositions.', 'Tooltips are composed through the canonical Tooltip owner.'],
      },
      binding: { colors: 'kura-brand-neutral', typography: 'kura', spacing: 'kura', radius: 'kura', icons: 'kura-canonical', motion: 'kura-reduced-motion-safe' },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Show resolved' },
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('button', { name: 'Show resolved' });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Outline: Story = {
  args: { children: 'Pin patient context', variant: 'outline' },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className={styles.row}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  args: { children: 'Important only', defaultPressed: true },
};

export const WithCanonicalIcon: Story = {
  args: { 'aria-label': 'Show information', children: <InformationIcon aria-hidden="true" />, variant: 'outline' },
};

export const Controlled: Story = {
  args: {},
  render: function ControlledToggle() {
    const [pressed, setPressed] = useState(false);
    return (
      <div className={styles.stack}>
        <Toggle onPressedChange={setPressed} pressed={pressed}>Keep panel open</Toggle>
        <span className={styles.toggleValue}>Panel is {pressed ? 'pinned' : 'not pinned'}.</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { children: 'Show archived', disabled: true },
};

export const MobileLongLabel: Story = {
  args: { children: 'Include appointments completed at another clinic', variant: 'outline' },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
