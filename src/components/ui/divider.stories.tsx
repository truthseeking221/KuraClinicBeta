import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Divider } from './divider';

const meta = {
  title: 'Design System/Primitives/Divider',
  component: Divider,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'Kura', registryItem: 'divider', visualReference: 'Kura divider' },
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence: 'Kura adds labelled single, double, and filled treatments beyond the orientation-only Separator owner.',
      },
      binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura', icons: 'none' },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', width: 'min(560px, 100%)' }}>
      <Divider>Recent activity</Divider>
      <Divider variant="double">Access history</Divider>
      <Divider variant="fill">Archived records</Divider>
    </div>
  ),
};

export const Empty: Story = {
  render: () => <Divider aria-label="Section boundary" />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('separator')).toBeVisible();
  },
};
