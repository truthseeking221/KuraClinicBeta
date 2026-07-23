import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  CRITICAL_RESULT_REVIEW_ENTRY,
  RESULT_REVIEW_QUEUE,
} from './demo-data';
import { ResultsReviewQueue } from './results-review-queue';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Results/Review Queue',
  component: ResultsReviewQueue,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      ...RESULTS_STORYBOOK_KURA,
      intake: {
        decision: 'COMPOSE + FEATURE-OWN',
        owner: 'src/features/results/results-review-queue.tsx',
        evidence:
          'WorkspacePage, DataGrid, Input, Avatar, Badge, Button, Alert, and EmptyState own the visual and interaction primitives. Results owns the target-contract cross-patient review queue and route boundary into the patient workspace.',
        exclusions: [
          'The current clinic BFF does not expose this queue; readiness remains Gap.',
          'The queue never displays analyte values or acknowledges a clinical result.',
          'ResultsWorkspace remains the patient-specific owner of values and longitudinal history.',
        ],
      },
      hierarchy: {
        level: 'Page',
        children: ['WorkspacePage', 'DataGrid', 'Input', 'Avatar', 'Badge', 'Button'],
      },
    },
    docs: {
      description: {
        component:
          'Storybook-first clinic result review queue. It provides cross-patient scanning and routing without claiming a live backend queue or duplicating the patient-specific Results workspace.',
      },
    },
  },
  args: {
    entries: RESULT_REVIEW_QUEUE,
    onOpen: fn(),
    onRetry: fn(),
  },
} satisfies Meta<typeof ResultsReviewQueue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Critical: Story = {
  args: {
    entries: [CRITICAL_RESULT_REVIEW_ENTRY, ...RESULT_REVIEW_QUEUE],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('cell', { name: 'Critical' })).toBeVisible();
    await expect(
      canvas.getByRole('button', {
        name: /Review Potassium for Dara Pich/,
      }),
    ).toHaveAttribute('data-variant', 'primary');
  },
};

export const SearchAndOpenInteraction: Story = {
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole('searchbox', { name: 'Search results to review' }),
      'creatinine',
    );
    await expect(canvas.getByText('Vicheka Sam')).toBeVisible();
    await expect(canvas.queryByText('Dara Phally')).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole('button', {
        name: /Review Creatinine and eGFR for Vicheka Sam/,
      }),
    );
    await expect(args.onOpen).toHaveBeenCalledWith(RESULT_REVIEW_QUEUE[3]);
  },
};

export const Loading: Story = {
  args: { entries: [], state: 'loading' },
};

export const Empty: Story = {
  args: { entries: [], state: 'empty' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No results to review')).toBeVisible();
  },
};

export const ErrorAndRetry: Story = {
  args: { entries: [], state: 'error' },
  tags: ['play-fn'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results could not be loaded')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

export const MobileWidth320: Story = {
  args: { entries: [CRITICAL_RESULT_REVIEW_ENTRY, ...RESULT_REVIEW_QUEUE] },
  globals: { viewport: { value: 'kura320' } },
};

export const MobileWidth390: Story = {
  globals: { viewport: { value: 'kura390' } },
};

export const TabletWidth768: Story = {
  globals: { viewport: { value: 'kura768' } },
};

export const DesktopWidth1024: Story = {
  globals: { viewport: { value: 'kura1024' } },
};
