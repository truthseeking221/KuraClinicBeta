import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoryPlaceholder } from './story-placeholder';

const meta = {
  title: 'Design System/Introduction',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Design System', section: 'Introduction' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
