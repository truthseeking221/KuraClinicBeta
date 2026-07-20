import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  ADD_ON_EPISODE_SECTIONS,
  ALL_CANCELLED_SECTIONS,
  FIRST_VISIT_SECTIONS,
  LONG_CONTENT_RESULT,
  PARTIAL_EPISODE_SECTIONS,
  REDRAW_EPISODE_SECTIONS,
  RELEASED_WITH_CANCELLED_SECTIONS,
  RETURNING_RESULTS,
} from './demo-data';
import { LabFlowsheet } from './lab-flowsheet';
import styles from './results.stories.module.css';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Results/Flowsheet',
  component: LabFlowsheet,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: RESULTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Catalog-section flowsheet with line-item progressive release. Panels count once, redraw predecessors are removed, QC-dismissed rows never render, and each range carries its own labels.',
      },
    },
  },
} satisfies Meta<typeof LabFlowsheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstVisit: Story = {
  args: {
    title: 'Longitudinal lab results',
    description: 'First visit · Apr 12, 2026',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit',
  },
};

export const PartialEpisodeTwoOfFiveLines: Story = {
  args: {
    title: 'Results — booking AB12345',
    description: 'Progressive release by active order line',
    sections: PARTIAL_EPISODE_SECTIONS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('2 of 5 ready')).toBeVisible();
    await expect(canvas.getAllByText('Complete blood count')).toHaveLength(2);
    await expect(canvas.getByText('In review')).toBeVisible();
    await expect(canvas.getByText('Awaiting sample')).toBeVisible();
  },
};

export const ReturningTrends: Story = {
  args: {
    title: 'Longitudinal lab results',
    description: 'Jul 1, 2026 and prior released episodes',
    sections: [{ code: 'monitoring', title: 'Monitored analytes', results: RETURNING_RESULTS }],
    mode: 'trend',
  },
};

export const RedrawReplacesDismissedExecution: Story = {
  args: {
    title: 'Redraw in progress',
    description: 'The QC-dismissed predecessor is never rendered',
    sections: REDRAW_EPISODE_SECTIONS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Running')).toBeVisible();
    await expect(canvas.queryByText('Dismissed')).not.toBeInTheDocument();
    await expect(canvas.getAllByText('Potassium')).toHaveLength(1);
  },
};

export const AddOnReopensEpisode: Story = {
  args: {
    title: 'Add-on test placed',
    description: 'A previously complete episode is progressive again',
    sections: ADD_ON_EPISODE_SECTIONS,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByText('2 of 3 ready')).toHaveLength(2);
  },
};

export const ReleasedWithCancelledLine: Story = {
  args: {
    title: 'Mixed terminal outcome',
    description: 'One result released; one line unavailable',
    sections: RELEASED_WITH_CANCELLED_SECTIONS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('1 of 2 ready · 1 unavailable')).toHaveLength(2);
    await expect(canvas.getByText('Cancelled')).toBeVisible();
  },
};

export const AllCancelledAndDismissed: Story = {
  args: {
    title: 'Cancelled episode',
    sections: ALL_CANCELLED_SECTIONS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('No results — episode cancelled')).toHaveLength(2);
    await expect(canvas.getByText('ALT')).toBeVisible();
    await expect(canvas.queryByText('TSH')).not.toBeInTheDocument();
  },
};

export const CollapsibleSections: Story = {
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /Hematology/ });
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('Hemoglobin')).toBeVisible();

    await userEvent.click(toggle);
    await waitFor(async () => {
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(canvas.queryByText('Hemoglobin')).not.toBeInTheDocument();
    });
  },
};

export const Empty: Story = {
  args: {
    title: 'Longitudinal lab results',
    sections: [],
  },
};

export const LongContent: Story = {
  args: {
    title: 'Long-content result',
    sections: [{ code: 'serology', title: 'Serology', results: [LONG_CONTENT_RESULT] }],
  },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit',
  },
  render: (args) => (
    <div className={`${styles.frame} ${styles.w320}`}>
      <LabFlowsheet {...args} />
    </div>
  ),
};

export const TabletWidth768: Story = {
  parameters: { viewport: { defaultViewport: 'kura768' } },
  args: {
    title: 'Longitudinal lab results',
    sections: PARTIAL_EPISODE_SECTIONS,
  },
  render: (args) => (
    <div className={`${styles.frame} ${styles.w768}`}>
      <LabFlowsheet {...args} />
    </div>
  ),
};

export const CompactDensity: Story = {
  globals: { density: 'compact' },
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit',
  },
};

export const ComfortableDensity: Story = {
  globals: { density: 'comfortable' },
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit',
  },
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  args: {
    title: 'Longitudinal lab results',
    sections: PARTIAL_EPISODE_SECTIONS,
  },
};
