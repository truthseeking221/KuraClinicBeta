import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './index';
import styles from './intake-components.stories.module.css';

function BookingTabs({ appearance = 'underline', orientation = 'horizontal' }: { appearance?: 'subtle' | 'underline'; orientation?: 'horizontal' | 'vertical' }) {
  return (
    <Tabs appearance={appearance} defaultValue="summary" orientation={orientation}>
      <TabsList aria-label="Booking details">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent className={styles.tabsPanel} value="summary">Identity, appointment, and payment summary.</TabsContent>
      <TabsContent className={styles.tabsPanel} value="orders">Three tests are ready for review.</TabsContent>
      <TabsContent className={styles.tabsPanel} value="history">Two previous visits are available.</TabsContent>
    </Tabs>
  );
}

const meta = {
  title: 'Design System/Components/Tabs',
  component: Tabs,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'Kura', registryItem: 'tabs', visualReference: 'Kura tabs' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'The existing Base UI owner already supplied tablist semantics, roving focus, controlled state, orientation, and animated indicator behavior.',
        exclusions: ['Card shells, forms, badges, and icons are compositions.', 'Use SegmentedToggle for a compact view-mode switch and Stepper for ordered progress.'],
      },
      binding: { colors: 'kura-brand-neutral', typography: 'kura', spacing: 'kura', radius: 'kura', elevation: 'selected-subtle-only', motion: 'kura-indicator-and-reduced-motion' },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => <BookingTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const summary = canvas.getByRole('tab', { name: 'Summary' });
    await expect(summary).toHaveAttribute('aria-selected', 'true');
    summary.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Orders' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('Three tests are ready for review.')).toBeVisible();
  },
};

export const Subtle: Story = {
  args: { children: null },
  render: () => <BookingTabs appearance="subtle" />,
};

export const Vertical: Story = {
  args: { children: null },
  render: () => <BookingTabs orientation="vertical" />,
};

export const DisabledTab: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="summary">
      <TabsList aria-label="Record sections">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger disabled value="results">Results unavailable</TabsTrigger>
      </TabsList>
      <TabsContent className={styles.tabsPanel} value="summary">No results have been released for this record.</TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  args: { children: null },
  render: function ControlledTabs() {
    const [value, setValue] = useState('summary');
    return (
      <Tabs onValueChange={setValue} value={value}>
        <TabsList aria-label="Controlled booking tabs">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent className={styles.tabsPanel} value="summary">Current booking summary.</TabsContent>
        <TabsContent className={styles.tabsPanel} value="history">Previous booking history.</TabsContent>
      </Tabs>
    );
  },
};

export const MobileLongLabels: Story = {
  args: { children: null },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <Tabs defaultValue="summary">
      <TabsList aria-label="Patient record sections">
        <TabsTrigger value="summary">Patient and appointment summary</TabsTrigger>
        <TabsTrigger value="preparation">Preparation instructions</TabsTrigger>
        <TabsTrigger value="history">Previous appointment history</TabsTrigger>
      </TabsList>
      <TabsContent className={styles.tabsPanel} value="summary">Summary content remains readable while the tab list scrolls intentionally.</TabsContent>
    </Tabs>
  ),
};
