import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RESULT_REVIEW_QUEUE } from './demo-data';
import { ResultReviewQueueItem } from './result-review-queue-item';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Results/Review Queue Item',
  component: ResultReviewQueueItem,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      ...RESULTS_STORYBOOK_KURA,
      intake: {
        decision: 'DOMAIN-ADAPT',
        owner: 'src/features/results',
        evidence:
          'The canonical Item and Avatar own navigation and identity anatomy; Results adds the cross-patient safety contract, result status, and route into per-patient review.',
        exclusions: [
          'This item does not display analyte values or acknowledge a result.',
          'LabResultRow remains the owner of analyte detail inside one patient workspace.',
        ],
      },
      hierarchy: { level: 'Molecule', children: ['Item', 'Avatar', 'Badge'] },
    },
  },
  args: {
    entry: RESULT_REVIEW_QUEUE[0],
    onOpen: fn(),
  },
  render: (args) => <div style={{ width: 'min(38rem, calc(100vw - 2rem))' }}><ResultReviewQueueItem {...args} /></div>,
} satisfies Meta<typeof ResultReviewQueueItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Abnormal: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Dara Phally')).toBeVisible();
    await expect(canvas.getByText(/MRN MK-10482/)).toBeVisible();
    await userEvent.click(canvas.getByRole('link', { name: /Dara Phally/ }));
    await expect(args.onOpen).toHaveBeenCalledWith(RESULT_REVIEW_QUEUE[0]);
  },
};

export const Critical: Story = {
  args: {
    entry: {
      ...RESULT_REVIEW_QUEUE[1],
      testName: 'Potassium',
      returnedLabel: '12 minutes ago',
      status: 'critical',
    },
  },
};

export const Amended: Story = { args: { entry: RESULT_REVIEW_QUEUE[3] } };

export const Routine: Story = { args: { entry: RESULT_REVIEW_QUEUE[2] } };

export const PermissionRestricted: Story = {
  args: {
    disabled: true,
    unavailableReason: 'Ask a clinic administrator for Results access.',
  },
  play: async ({ canvasElement }) => {
    const item = canvasElement.querySelector('[data-slot="item"]');
    await expect(item).toHaveAttribute('aria-disabled', 'true');
    await expect(item).not.toHaveAttribute('href');
    await expect(within(canvasElement).queryByRole('link')).not.toBeInTheDocument();
  },
};

export const LongIdentity: Story = {
  args: {
    entry: {
      ...RESULT_REVIEW_QUEUE[0],
      patient: {
        ...RESULT_REVIEW_QUEUE[0].patient,
        name: 'Chanthavysouk Keomanivong-Rattanakosin',
        medicalRecordNumber: 'KURA-CENTRAL-00010482',
      },
      testName: 'Comprehensive metabolic and renal function panel',
    },
  },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: LongIdentity.args,
};
