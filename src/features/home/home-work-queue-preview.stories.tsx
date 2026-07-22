import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import * as demo from './demo-data';
import { HomeWorkQueuePreview } from './home-work-queue-preview';
import { HOME_STORYBOOK_KURA } from './storybook-metadata';
import type { HomeData, HomeSignal } from './types';

function workSignal(
  key: 'bookings' | 'patients',
  data: HomeData = demo.busyMorning,
): HomeSignal {
  const signal = data.signals.find((item) => item.key === key);
  if (!signal) throw new Error(`Missing ${key} signal fixture.`);
  return signal;
}

const meta = {
  title: 'Clinic/Clinical/Home/Work Queue Preview',
  component: HomeWorkQueuePreview,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      ...HOME_STORYBOOK_KURA,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/home',
        evidence:
          'Home composes the canonical ItemGroup and Item anatomy so actionable booking and patient counts retain patient identity, reason, timing, and a whole-row route into the owning surface.',
        exclusions: [
          'Home does not edit a booking or patient record.',
          'Results keeps its own safety-specific ResultReviewQueueItem contract.',
          'The preview is not a statistic row, table, or standalone Card.',
        ],
      },
      hierarchy: {
        level: 'Organism',
        children: ['ItemGroup', 'Item', 'Avatar', 'Badge'],
      },
    },
    docs: {
      description: {
        component:
          'A patient-identifiable preview for Home work queues. Use it when a count represents actionable people; use HomeSignalRow only for passive operational context.',
      },
    },
  },
  args: {
    signal: workSignal('bookings'),
    onNavigate: fn(),
    onOpenItem: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <div style={{ width: 'min(44rem, calc(100vw - 2rem))' }}>
      <HomeWorkQueuePreview {...args} />
    </div>
  ),
} satisfies Meta<typeof HomeWorkQueuePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bookings: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', { name: 'Bookings work queue' });
    await expect(within(queue).getAllByRole('listitem')).toHaveLength(3);
    await expect(within(queue).getByText('Sokha Chan')).toBeVisible();
    await expect(within(queue).getByText(/T2DM review/)).toBeVisible();
    await userEvent.click(within(queue).getByRole('link', { name: /Sokha Chan/ }));
    await expect(args.onOpenItem).toHaveBeenCalledWith(
      'bookings',
      demo.BOOKING_WORK_QUEUE[0],
    );
  },
};

export const Patients: Story = {
  args: { signal: workSignal('patients') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', { name: 'Patients work queue' });
    await expect(within(queue).getByText('Vicheka Sam')).toBeVisible();
    await expect(within(queue).getByText('HbA1c rising across 2 visits')).toBeVisible();
  },
};

export const Loading: Story = {
  args: { signal: { ...workSignal('bookings'), state: 'loading' } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('link')).not.toBeInTheDocument();
  },
};

export const ErrorAndRetry: Story = {
  args: {
    signal: {
      ...workSignal('bookings'),
      state: 'error',
      errorMessage: 'Bookings could not load.',
    },
  },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalledWith('bookings');
  },
};

export const MissingPatientDetails: Story = {
  args: { signal: { ...workSignal('bookings'), workItems: undefined } },
};

export const Empty: Story = {
  args: {
    signal: {
      ...workSignal('bookings'),
      count: 0,
      detail: 'No bookings need attention.',
      workItems: [],
    },
  },
};

export const PermissionRestrictedItem: Story = {
  args: {
    signal: {
      ...workSignal('patients'),
      workItems: [
        {
          ...demo.PATIENT_REVIEW_QUEUE[0],
          disabled: true,
          unavailableReason: 'Ask a clinic administrator for Patients access.',
        },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Ask a clinic administrator/)).toBeVisible();
    await expect(canvas.queryByRole('link', { name: /Vicheka Sam/ })).not.toBeInTheDocument();
  },
};

export const LongContent: Story = {
  args: {
    signal: workSignal('bookings', demo.longContent),
  },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: LongContent.args,
};
