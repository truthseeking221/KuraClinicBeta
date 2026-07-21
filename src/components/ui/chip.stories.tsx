import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Chip } from './chip';
import styles from './kura-stories.module.css';

const meta = {
  title: 'Design System/Components/Chip',
  component: Chip,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'Kura', registryItem: 'chip', visualReference: 'Kura chip' },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'Chip owns compact category metadata; Badge continues to own status and counters.' },
      binding: { colors: 'kura-kura-tokenized', typography: 'kura', spacing: 'kura', radius: 'kura', icons: 'none' },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <div className={styles.row}>
      <Chip color="lime">Complete</Chip>
      <Chip color="yellow">Pending</Chip>
      <Chip color="rose">Blocked</Chip>
      <Chip color="cyan" variant="subtle">Reference</Chip>
      <Chip color="neutral" variant="caption">Archived</Chip>
    </div>
  ),
};
