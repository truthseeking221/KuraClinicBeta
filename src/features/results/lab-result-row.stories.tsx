import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  CRITICAL_POTASSIUM_RESULT,
  FIRST_VISIT_SECTIONS,
  LONG_CONTENT_RESULT,
  NO_REFERENCE_RESULT,
  NOT_IN_DRAW_RESULT,
  PARTIAL_EPISODE_SECTIONS,
  RETURNING_RESULTS,
} from './demo-data';
import { LabResultDetailTrigger } from './lab-result-detail';
import { LabResultRow } from './lab-result-row';
import styles from './results.stories.module.css';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';
import type { LabAnalyteResult, TestStatus } from './types';

const hemoglobin = FIRST_VISIT_SECTIONS[0].results[0];
const hdl = FIRST_VISIT_SECTIONS[3].results[1];
const [hba1c, creatinine, urineProtein] = RETURNING_RESULTS;
const pendingBase = PARTIAL_EPISODE_SECTIONS[1].results[2];

const meta = {
  title: 'Clinic/Clinical/Results/Result Row',
  component: LabResultRow,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: RESULTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'One canonical analyte row. Released results show value, catalog interpretation, reference, and optional history action. Pre-release lines show lifecycle status only. Dismissed QC executions are deliberately absent.',
      },
    },
  },
} satisfies Meta<typeof LabResultRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstVisitNormal: Story = {
  args: { result: hemoglobin, mode: 'first-visit' },
};

export const FirstVisitAbnormalLow: Story = {
  args: { result: hdl, mode: 'first-visit' },
};

export const ExplicitCriticalPanicResult: Story = {
  args: { result: CRITICAL_POTASSIUM_RESULT, mode: 'first-visit' },
};

export const ReturningImproving: Story = {
  args: { result: hba1c },
};

export const ReturningWorseningLabFlagged: Story = {
  args: { result: creatinine },
};

export const QualitativeResult: Story = {
  args: { result: urineProtein },
};

export const NoApplicableReference: Story = {
  args: { result: NO_REFERENCE_RESULT },
};

export const NotInThisDraw: Story = {
  args: { result: NOT_IN_DRAW_RESULT },
};

const HUMAN_FACING_NON_RELEASED: TestStatus[] = [
  'awaiting_sample',
  'in_lab',
  'in_progress',
  'resulted',
  'manual_review',
  'signed',
  'autoverified',
  'cancelled',
];

export const HumanFacingLifecycleStates: Story = {
  args: { result: pendingBase },
  render: () => (
    <div className={styles.stack}>
      {HUMAN_FACING_NON_RELEASED.map((status) => {
        const result: LabAnalyteResult = {
          ...pendingBase,
          orderLineItemId: `${pendingBase.orderLineItemId}-${status}`,
          testId: `${pendingBase.testId}-${status}`,
          analyteCode: `${pendingBase.analyteCode}-${status}`,
          status,
          value: { kind: 'missing' },
        };
        return <LabResultRow key={status} result={result} />;
      })}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dismissed is excluded because lab QC-dismissed executions must never render on the doctor results surface.',
      },
    },
  },
};

export const LongVietnameseContent: Story = {
  args: { result: LONG_CONTENT_RESULT },
};

export const HoverPreviewAndSheetHistory: Story = {
  args: { result: hba1c },
  render: () => (
    <LabResultRow
      result={hba1c}
      trailing={<LabResultDetailTrigger result={hba1c} />}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'View Hemoglobin A1c history' });

    await userEvent.hover(trigger);
    await expect(
      await within(document.body).findByText('Click for the complete released history.'),
    ).toBeVisible();

    await userEvent.unhover(trigger);
    await waitFor(async () => {
      await expect(
        within(document.body).queryByText('Click for the complete released history.'),
      ).not.toBeInTheDocument();
    });

    await userEvent.hover(trigger);
    await expect(
      await within(document.body).findByText('Click for the complete released history.'),
    ).toBeVisible();
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await expect(within(dialog).getByRole('heading', { name: 'Hemoglobin A1c' })).toBeVisible();
    await expect(within(dialog).getByText('Full released history')).toBeVisible();

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Close Hemoglobin A1c history' }),
    );
    await waitFor(async () => {
      await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument();
    });
  },
};

export const MobileBottomSheet: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { result: hba1c },
  render: () => (
    <div className={`${styles.frame} ${styles.w320}`}>
      <LabResultRow
        result={hba1c}
        trailing={<LabResultDetailTrigger result={hba1c} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'View Hemoglobin A1c history',
    });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(async () => {
      await expect(dialog).toHaveAttribute('data-side', 'bottom');
    });
  },
};
