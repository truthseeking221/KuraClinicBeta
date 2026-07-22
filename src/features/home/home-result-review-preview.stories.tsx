import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import * as demo from './demo-data';
import { HomeResultReviewPreview } from './home-result-review-preview';
import type { HomeData, HomeSignal } from './types';
import { HOME_STORYBOOK_KURA } from './storybook-metadata';

function resultsSignal(data: HomeData): HomeSignal {
  const signal = data.signals.find((item) => item.key === 'results');
  if (!signal) throw new Error('Missing Results signal fixture.');
  return signal;
}

const meta = {
  title: 'Clinic/Clinical/Home/Result Review Preview',
  component: HomeResultReviewPreview,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      ...HOME_STORYBOOK_KURA,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/home',
        evidence:
          'Home composes Card, ItemGroup, and the Results-owned ReviewQueueItem so a work count never hides patient identity.',
        exclusions: [
          'Home does not own analyte review or acknowledgement.',
          'The preview never reduces patient work to a stat tile.',
        ],
      },
      hierarchy: {
        level: 'Organism',
        children: ['Card', 'ItemGroup', 'ResultReviewQueueItem'],
      },
    },
  },
  args: {
    signal: resultsSignal(demo.busyMorning),
    onNavigate: fn(),
    onRetry: fn(),
  },
  render: (args) => <div style={{ width: 'min(44rem, calc(100vw - 2rem))' }}><HomeResultReviewPreview {...args} /></div>,
} satisfies Meta<typeof HomeResultReviewPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FivePatients: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list', { name: 'Patients with results to review' });
    await expect(within(list).getAllByRole('listitem')).toHaveLength(5);
    await expect(canvas.getByText('Dara Phally')).toBeVisible();
    await expect(canvas.getByText('Maly Sok')).toBeVisible();
    await userEvent.click(canvas.getByRole('link', { name: /Dara Phally/ }));
    await expect(args.onNavigate).toHaveBeenCalledWith('results');
  },
};

export const CriticalFirst: Story = { args: { signal: resultsSignal(demo.criticalDay) } };

export const Loading: Story = { args: { signal: resultsSignal(demo.loading) } };

export const ErrorAndRetry: Story = {
  args: { signal: resultsSignal(demo.partialData) },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalledWith('results');
  },
};

export const MissingPatientDetails: Story = {
  args: {
    signal: { ...resultsSignal(demo.busyMorning), reviewItems: undefined },
  },
};

export const LongContent: Story = { args: { signal: resultsSignal(demo.longContent) } };

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: LongContent.args,
};
