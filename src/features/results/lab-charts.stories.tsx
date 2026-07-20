import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  FIRST_VISIT_SECTIONS,
  IRREGULAR_DATE_RESULT,
  LONG_CONTENT_RESULT,
  MISSING_DATE_RESULT,
  RETURNING_RESULTS,
} from './demo-data';
import { LabDrawStrip } from './lab-draw-strip';
import { LabSparkline } from './lab-sparkline';
import { LabTrendChart } from './lab-trend-chart';
import styles from './results.stories.module.css';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const [hba1c, creatinine, urineProtein] = RETURNING_RESULTS;
const singleObservation = FIRST_VISIT_SECTIONS[1].results[0];

const meta = {
  title: 'Clinic/Clinical/Results/Trend Charts',
  component: LabTrendChart,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: RESULTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Kura-owned SVG trend, sparkline, and draw-strip family. Time-series X positions use real timestamps; missing draws break lines; unknown timestamps are excluded from the temporal axis and remain available in history text.',
      },
    },
  },
} satisfies Meta<typeof LabTrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImprovingTowardRange: Story = {
  args: { result: hba1c },
};

export const WorseningLabFlagged: Story = {
  args: { result: creatinine },
};

export const IrregularTimeIntervals: Story = {
  args: { result: IRREGULAR_DATE_RESULT },
  parameters: {
    docs: {
      description: {
        story:
          'The first two draws are one week apart while the next is seventeen months later; X spacing reflects that difference.',
      },
    },
  },
};

export const MissingDrawStaysGap: Story = {
  args: { result: hba1c },
};

export const LatestTimestampUnavailable: Story = {
  args: { result: MISSING_DATE_RESULT },
  parameters: {
    docs: {
      description: {
        story:
          'The undated latest value is not placed on a time axis. Dated history remains chartable and the detail composition explains the omitted timestamp.',
      },
    },
  },
};

export const PointHoverAndKeyboardFocus: Story = {
  args: { result: hba1c },
  play: async ({ canvasElement }) => {
    const firstPoint = canvasElement.querySelector<SVGGElement>('[data-slot="lab-chart-point"]');
    if (!firstPoint) throw new Error('Expected at least one chart point');

    await userEvent.hover(firstPoint);
    const summary = canvasElement.querySelector<HTMLParagraphElement>('p[aria-live="polite"]');
    if (!summary) throw new Error('Expected the chart point summary');
    await expect(summary).toHaveTextContent('Aug 12 · 7.4 % · Annual review');

    firstPoint.focus();
    await expect(firstPoint).toHaveFocus();
    await expect(firstPoint.getAttribute('aria-label')).toContain('Annual review');
  },
};

export const SparklinePair: Story = {
  args: { result: hba1c },
  render: () => (
    <div className={styles.chartPair}>
      <LabSparkline result={hba1c} />
      <LabSparkline result={creatinine} />
    </div>
  ),
};

export const SingleObservationFallsBackToDrawStrip: Story = {
  args: { result: singleObservation },
  render: () => <LabDrawStrip result={singleObservation} />,
};

export const QualitativeHistory: Story = {
  args: { result: urineProtein },
  render: () => <LabDrawStrip result={urineProtein} />,
};

export const LongQualitativeContentWraps: Story = {
  args: { result: LONG_CONTENT_RESULT },
  render: () => (
    <div className={`${styles.frame} ${styles.w360}`}>
      <LabDrawStrip result={LONG_CONTENT_RESULT} />
    </div>
  ),
};

export const CappedHistoryDisclosesOlderDraws: Story = {
  args: { result: hba1c },
  render: () => <LabDrawStrip maxDraws={3} result={hba1c} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('3 earlier')).toBeVisible();
  },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { result: hba1c },
  render: (args) => (
    <div className={`${styles.frame} ${styles.w320}`}>
      <LabTrendChart {...args} />
    </div>
  ),
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  args: { result: creatinine },
};
