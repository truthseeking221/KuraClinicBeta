import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import * as demo from './demo-data';
import { HomeSignalItem } from './home-signal-item';
import type { HomeData, HomeSignal } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

function signal(data: HomeData, key: string): HomeSignal {
  const found = data.signals.find((item) => item.key === key);
  if (!found) throw new Error(`Missing Home signal fixture: ${key}`);
  return found;
}

const meta = {
  title: 'Clinic/Clinical/Home/Signal item',
  component: HomeSignalItem,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      readiness: READINESS.home,
      intake: {
        decision: 'DOMAIN-ADAPT',
        owner: 'src/features/home',
        hierarchy: 'Molecule',
        evidence:
          'Home signals own domain priority, count freshness, and deep-link semantics while reusing the exact indexed Design System/Components/Item composition for layout and interaction.',
        exclusions: [
          'The item never reviews results, changes bookings, edits patients, or performs licence actions.',
          'Generic item layout and keyboard behavior remain owned by Design System/Components/Item.',
        ],
      },
      contract: {
        status: 'design-target',
        backendMapping: 'pending-home-read-model',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-control',
        elevation: 'none',
        responsive: 'wrapping-to-stacked-actions',
      },
    },
  },
  args: {
    signal: signal(demo.busyMorning, 'results'),
    onNavigate: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <div role="list">
      <div role="listitem">
        <HomeSignalItem {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof HomeSignalItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadyAttention: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /Review results/ });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.click(link);
    await expect(args.onNavigate).toHaveBeenCalledWith('results');
  },
};

export const Critical: Story = {
  args: { signal: signal(demo.criticalDay, 'results') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Critical')).toBeVisible();
    await expect(canvas.getByText(/Potassium 6.8 mmol\/L/)).toBeVisible();
  },
};

export const Loading: Story = {
  args: { signal: signal(demo.loading, 'results') },
};

export const ErrorAndRetry: Story = {
  args: { signal: signal(demo.partialData, 'results') },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalledWith('results');
  },
};

export const InformationalMoney: Story = {
  args: { signal: signal(demo.busyMorning, 'earnings') },
};

export const ZeroValue: Story = {
  args: { signal: signal(demo.allCaughtUp, 'results') },
};

export const LongContent: Story = {
  args: { signal: signal(demo.longContent, 'results') },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { signal: signal(demo.criticalDay, 'results') },
};
