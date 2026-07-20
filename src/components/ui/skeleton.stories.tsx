import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Skeleton } from './index';
import styles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/c-skeleton-1' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'A token-bound Kura placeholder already existed; the ReUI family supplied loading composition evidence, not a second primitive.',
        exclusions: ['Decorative page mockups remain story compositions rather than Skeleton props.'],
      },
      binding: { colors: 'kura-neutral', spacing: 'kura', radius: 'kura', motion: 'tokenized-shimmer-with-reduced-motion' },
    },
    docs: {
      description: {
        component: 'Preserves loading geometry without exposing placeholder content to assistive technology. Pair the group with a visible or accessible loading status.',
      },
    },
  },
  argTypes: {
    shape: { control: 'radio', options: ['rectangle', 'text', 'circle'] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: styles.skeletonBlock },
};

export const Shapes: Story = {
  args: {},
  render: () => (
    <div className={styles.frame} role="status" aria-label="Loading patient summary">
      <div className={styles.skeletonRow}>
        <Skeleton shape="circle" />
        <div className={styles.skeletonCopy}>
          <Skeleton className={styles.skeletonMedium} shape="text" />
          <Skeleton className={styles.skeletonShort} shape="text" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status', { name: 'Loading patient summary' })).toBeVisible();
    await expect(canvasElement.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3);
  },
};

export const Static: Story = {
  args: { animated: false, className: styles.skeletonBlock },
};

export const LoadingList: Story = {
  args: {},
  render: () => (
    <div className={styles.frame} role="status" aria-label="Loading appointment queue">
      <p className={styles.supporting}>Loading appointment queue…</p>
      <div className={styles.stack} aria-hidden="true">
        {[1, 2, 3].map((row) => (
          <div className={styles.skeletonRow} key={row}>
            <Skeleton shape="circle" />
            <div className={styles.skeletonCopy}>
              <Skeleton className={styles.skeletonMedium} shape="text" />
              <Skeleton className={styles.skeletonShort} shape="text" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MobileNarrow: Story = {
  ...LoadingList,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
