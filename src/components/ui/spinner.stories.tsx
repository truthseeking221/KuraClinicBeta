import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Spinner } from './index';
import styles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/c-spinner-1' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'Kura already owned the canonical loading icon and status semantics; ReUI examples were retained only as composition coverage.',
        exclusions: ['Decorative dot and color spinners conflict with the canonical loading signal.'],
      },
      binding: { icons: 'kura-canonical-loading', typography: 'kura', spacing: 'kura', motion: 'kura-token-and-static-reduced-motion' },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Loading bookings' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('status')).toHaveTextContent('Loading bookings');
  },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className={styles.row}>
      <Spinner label="Loading small item" size="sm" />
      <Spinner label="Loading item" size="md" />
      <Spinner label="Loading large region" size="lg" />
    </div>
  ),
};

export const VisibleLabel: Story = {
  args: { label: 'Checking coverage…', showLabel: true },
};

export const LoadingOverlay: Story = {
  args: {},
  render: () => (
    <div className={`${styles.surface} ${styles.spinnerOverlaySurface}`}>
      <h3 className={styles.surfaceTitle}>Appointment details</h3>
      <p className={styles.supporting}>Identity and booking context stay in place while the latest coverage is checked.</p>
      <div className={styles.spinnerOverlay}>
        <Spinner label="Checking coverage" showLabel />
      </div>
    </div>
  ),
};

export const MobileNarrow: Story = {
  ...LoadingOverlay,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
