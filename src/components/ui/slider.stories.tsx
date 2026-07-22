import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Slider } from './index';
import styles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Slider',
  component: Slider,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'Kura', registryItem: 'slider', visualReference: 'Kura slider' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'The existing Base UI wrapper already owned single, range, controlled, vertical, keyboard, and touch behavior; Storybook now exposes that complete contract.',
        exclusions: ['Emoji rating and temperature demos are product-specific compositions.', 'Ticks and tooltips are not primitive props until a recurring Kura need is proven.'],
      },
      binding: { colors: 'kura-brand-neutral', spacing: 'kura', radius: 'kura', elevation: 'focus-and-thumb-only', motion: 'kura-reduced-motion-safe' },
    },
  },
  decorators: [(Story) => <div className={styles.frame}><Story /></div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 30, label: 'Urgency threshold', max: 100, min: 0, showValue: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider', { name: 'Urgency threshold' });
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '31');
  },
};

export const Range: Story = {
  args: {
    defaultValue: [8, 16],
    label: 'Arrival window',
    max: 24,
    min: 0,
    showValue: true,
    thumbLabels: ['Window start', 'Window end'],
  },
};

export const DiscreteValues: Story = {
  args: { defaultValue: 15, label: 'Reminder interval', max: 60, min: 0, showValue: true, step: 5 },
};

export const VerticalRange: Story = {
  args: {
    'aria-label': 'Accepted result range',
    className: styles.sliderVertical,
    defaultValue: [25, 75],
    orientation: 'vertical',
    thumbLabels: ['Lower bound', 'Upper bound'],
  },
};

export const Disabled: Story = {
  args: { defaultValue: 40, disabled: true, label: 'Locked threshold', showValue: true },
};

export const Controlled: Story = {
  args: { label: 'Follow-up interval' },
  render: function ControlledSlider(args) {
    const [value, setValue] = useState<number | readonly number[]>(20);
    return <Slider {...args} max={60} onValueChange={setValue} showValue step={5} value={value} />;
  },
};

export const MobileNarrow: Story = {
  args: { defaultValue: [15, 45], label: 'Collection window', max: 60, showValue: true, thumbLabels: ['Start', 'End'] },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
