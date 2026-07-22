import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { CloseButton } from './close-button';
import styles from './kura-stories.module.css';

const meta = {
  title: 'Design System/Primitives/Close Button',
  component: CloseButton,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'Kura', registryItem: 'close-button', visualReference: 'Kura close-button' },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'CloseButton standardizes dismiss geometry while retaining a larger invisible hit target.' },
      binding: { colors: 'kura-semantic', spacing: 'kura', radius: 'kura', icons: 'kura-canonical' },
    },
  },
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  args: { 'aria-label': 'Close' },
  render: () => (
    <div className={styles.row}>
      {(['2xs', 'xs', 'sm', 'md'] as const).map((size) => <CloseButton aria-label={`Close ${size}`} key={size} size={size} />)}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Close md' })).toBeVisible();
  },
};
