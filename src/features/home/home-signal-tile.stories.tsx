import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import * as demo from './demo-data';
import { HomeSignalTile } from './home-signal-tile';
import type { HomeData, HomeSignal } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

function signal(data: HomeData, key: string): HomeSignal {
  const found = data.signals.find((item) => item.key === key);
  if (!found) throw new Error(`Missing Home signal fixture: ${key}`);
  return found;
}

const meta = {
  title: 'Clinic/Clinical/Home/Signal Tile',
  component: HomeSignalTile,
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
          'Home signals own domain priority, count freshness, and deep-link semantics while the tray surface, radius, and elevation stay owned by Design System/Components/Card.',
        exclusions: [
          'The tile never reviews results, changes bookings, edits patients, or performs licence actions.',
          'Tray, tile, and outline surfaces remain owned by Design System/Components/Card.',
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
        radius: 'kura-card-surface',
        elevation: 'none',
        responsive: 'auto-fit-strip',
      },
    },
  },
  args: {
    signal: signal(demo.busyMorning, 'bookings'),
    onNavigate: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, width: '17rem' }}>
      <li>
        <HomeSignalTile {...args} />
      </li>
    </ul>
  ),
} satisfies Meta<typeof HomeSignalTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Aggregate operational work may use a stat tile when item identity is not required here. */
export const ReadyWorkCount: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /Review bookings/ });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.click(link);
    await expect(args.onNavigate).toHaveBeenCalledWith('bookings');
  },
};

/** The axis title stays readable while its count loads. */
export const Loading: Story = {
  args: { signal: signal(demo.loading, 'bookings') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bookings')).toBeVisible();
    await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
  },
};

export const ErrorAndRetry: Story = {
  args: {
    signal: {
      ...signal(demo.busyMorning, 'bookings'),
      state: 'error',
      errorMessage: 'Bookings could not load.',
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalledWith('bookings');
  },
};

/** Zero renders as zero: a cleared axis is a fact, not a blank. */
export const ZeroValue: Story = {
  args: { signal: signal(demo.allCaughtUp, 'bookings') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0')).toBeVisible();
  },
};

export const LongContent: Story = {
  args: { signal: signal(demo.longContent, 'bookings') },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { signal: signal(demo.longContent, 'bookings') },
};

/** Peer metrics earn equal trays because comparison is the task. */
export const PeerMetrics: Story = {
  render: (args) => (
    <ul
      role="list"
      style={{
        display: 'grid',
        gap: 'var(--space-4)',
        gridTemplateColumns: 'repeat(2, 15rem)',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      <li>
        <HomeSignalTile {...args} signal={signal(demo.busyMorning, 'bookings')} />
      </li>
      <li>
        <HomeSignalTile {...args} signal={signal(demo.busyMorning, 'patients')} />
      </li>
    </ul>
  ),
};
