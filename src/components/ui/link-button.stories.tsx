import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ArrowRightIcon } from './icons';
import { LinkButton } from './link-button';
import styles from './kura-stories.module.css';

const meta = {
  title: 'Design System/Primitives/Link Button',
  component: LinkButton,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'Kura', registryItem: 'link-button', visualReference: 'Kura link-button' },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'LinkButton gives navigation and low-emphasis inline actions one Kura treatment.' },
      binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura', icons: 'kura-canonical' },
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className={styles.row}>
      <LinkButton href="#details" trailingIcon={<ArrowRightIcon aria-hidden size={16} />}>View details</LinkButton>
      <LinkButton variant="secondary">Documentation</LinkButton>
      <LinkButton disabled>Unavailable</LinkButton>
    </div>
  ),
};
