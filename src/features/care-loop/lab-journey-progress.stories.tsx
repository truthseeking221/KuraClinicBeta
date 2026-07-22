import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { LabJourneyProgress } from './lab-journey-progress';

const meta = {
  title: 'Clinic/Flows/Lab Journey Progress',
  component: LabJourneyProgress,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.flows,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/care-loop/lab-journey-progress.tsx',
        evidence:
          'The platform defines separate courier job, sample custody, and order states. This clinician view compresses them into stable milestones without claiming live logistics producers.',
      },
    },
    docs: {
      description: {
        component:
          'Read-only order progress from sample readiness through the first partial result release.',
      },
    },
  },
  args: {
    orderId: 'ORD-DEMO-1',
    status: 'courier_assigned',
    courierEtaLabel: 'in 15–25 minutes',
  },
} satisfies Meta<typeof LabJourneyProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CourierOnTheWay: Story = {};

export const InTransitAfterReentry: Story = {
  args: { status: 'in_transit' },
};

export const LabProcessingAfterReentry: Story = {
  args: { status: 'processing' },
};

export const PickupDelayed: Story = {
  args: { status: 'pickup_delayed' },
};

export const PartialResults: Story = {
  args: {
    flagged: 1,
    onReviewResults: fn(),
    resulted: 3,
    status: 'partially_complete',
    total: 10,
  },
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('3 of 10 results ready. 1 result needs review.'),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Review results' }));
    await expect(args.onReviewResults).toHaveBeenCalledOnce();
  },
};

export const Mobile390: Story = {
  args: { status: 'in_transit' },
  globals: { viewport: { value: 'kura390' } },
};
