import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { READINESS } from '../../foundations/readiness-data';
import { ComingSoonPage } from './coming-soon';

const meta = {
  title: 'Clinic/Shell/Coming Soon',
  component: ComingSoonPage,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.flows,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/components/shared/coming-soon',
        evidence:
          'Honest roadmap teaser used by the prototype app for every planned-but-unbuilt surface. Composed from EmptyState, Badge, and Button; router-free so the host supplies the back action.',
        exclusions: ['No illustration or marketing copy — deferred work must never look live.'],
      },
      responsive: { strategy: ['FLUID'], minimumWidth: 320 },
      journeys: ['prototype-planned-surface'],
    },
    docs: {
      description: {
        component:
          'The prototype’s honest teaser: names the surface, states that no backend contract exists yet, and routes back to real work. Pairs with the Release Readiness board — a planned surface stays visibly unfinished.',
      },
    },
  },
  args: {
    title: 'Care plans',
    description: 'Longitudinal treatment plans with follow-up schedules.',
    onBack: fn(),
  },
} satisfies Meta<typeof ComingSoonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Planned: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Planned')).toBeVisible();
    await expect(canvas.getByText('Care plans')).toBeVisible();
    await expect(canvas.getByText(/no backend contract exists/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Go back' }));
    await expect(args.onBack).toHaveBeenCalled();
  },
};

export const WithoutBackAction: Story = {
  args: { onBack: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', { name: 'Go back' })).not.toBeInTheDocument();
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
