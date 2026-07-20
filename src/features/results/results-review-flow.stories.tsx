import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  CRITICAL_COMPLETE_SECTIONS,
  DEMO_RESULTS_PATIENT,
  FIRST_VISIT_SECTIONS,
  PARTIAL_EPISODE_SECTIONS,
} from './demo-data';
import { ResultsReviewFlow } from './results-review-flow';
import styles from './results.stories.module.css';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Flows/Result Review and Closure',
  component: ResultsReviewFlow,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: RESULTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Full doctor review flow. Closure remains gated while test lines are pending or a released panic-tier result is unacknowledged. Acknowledgment and closure writes are explicitly design-target events pending backend audit/concurrency mapping.',
      },
    },
  },
  args: {
    patient: DEMO_RESULTS_PATIENT,
    episodeLabel: 'Current episode · Jul 14, 2026',
    sections: FIRST_VISIT_SECTIONS,
  },
} satisfies Meta<typeof ResultsReviewFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadyBeforeClosure: Story = {};

export const ReadyClosureInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const close = canvas.getByRole('button', { name: 'Close result review' });
    await expect(close).toBeEnabled();
    await userEvent.click(close);
    await expect(canvas.getByText('Clinical result review closed')).toBeVisible();
  },
};

export const PartialReleaseBlocksClosure: Story = {
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Close result review' })).toBeDisabled();
    await expect(canvas.getByText('3 test lines are still pending.')).toBeVisible();
  },
};

export const CriticalAcknowledgmentThenClosure: Story = {
  args: { sections: CRITICAL_COMPLETE_SECTIONS },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const close = canvas.getByRole('button', { name: 'Close result review' });
    await expect(close).toBeDisabled();
    await expect(
      canvas.getByText('A critical released result still requires acknowledgment.'),
    ).toBeVisible();

    await userEvent.click(
      canvas.getByRole('button', { name: 'Acknowledge critical result' }),
    );
    await expect(canvas.getByText('Critical result acknowledged')).toBeVisible();
    await expect(close).toBeEnabled();

    await userEvent.click(close);
    await expect(canvas.getByText('Clinical result review closed')).toBeVisible();
  },
};

export const CriticalRequiresAcknowledgment: Story = {
  args: { sections: CRITICAL_COMPLETE_SECTIONS },
};

export const AlreadyAcknowledged: Story = {
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS,
    initialAcknowledged: true,
  },
};

export const ClosedReadOnly: Story = {
  args: {
    initialClosed: true,
  },
};

export const MobileWidth390: Story = {
  parameters: { viewport: { defaultViewport: 'kura390' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => (
    <div className={`${styles.frame} ${styles.w390}`}>
      <ResultsReviewFlow {...args} />
    </div>
  ),
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  args: { sections: CRITICAL_COMPLETE_SECTIONS },
};
