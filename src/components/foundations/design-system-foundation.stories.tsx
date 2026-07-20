import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DesignSystemFoundation } from './design-system-foundation';

const meta = {
  title: 'Design System/Foundations/Overview',
  component: DesignSystemFoundation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DesignSystemFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
