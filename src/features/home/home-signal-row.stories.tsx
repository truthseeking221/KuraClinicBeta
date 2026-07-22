import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import * as demo from './demo-data';
import { HomeSignalRow } from './home-signal-row';
import type { HomeData, HomeSignal } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

function signal(data: HomeData, key: string): HomeSignal {
  const found = data.signals.find((item) => item.key === key);
  if (!found) throw new Error(`Missing Home signal fixture: ${key}`);
  return found;
}

const meta = {
  title: 'Clinic/Clinical/Home/Signal Row',
  component: HomeSignalRow,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      readiness: READINESS.home,
      intake: {
        decision: 'FEATURE-OWN',
        owner: 'src/features/home',
        hierarchy: 'Molecule',
        evidence:
          'A signal count and its evidence sentence need no container. The row groups through proximity, alignment, and typography, so Home spends its one tray on the results preview.',
        exclusions: [
          'The row never reviews results, changes bookings, edits patients, or performs licence actions.',
          'Hover, focus, and radius values come from Kura tokens only.',
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
        radius: 'kura-control-compact',
        elevation: 'none',
        responsive: 'stacking-row',
      },
    },
  },
  args: {
    signal: signal(demo.busyMorning, 'bookings'),
    onNavigate: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, width: '22rem' }}>
      <li>
        <HomeSignalRow {...args} />
      </li>
    </ul>
  ),
} satisfies Meta<typeof HomeSignalRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The whole row is the deep link into the surface that owns the work. */
export const WorkCount: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /Bookings/ });
    await userEvent.click(link);
    await expect(args.onNavigate).toHaveBeenCalledWith('bookings');
  },
};

/** Tone never travels on colour alone: the Badge carries the word. */
export const CriticalTone: Story = {
  args: {
    signal: {
      ...signal(demo.busyMorning, 'bookings'),
      tone: 'critical',
      toneLabel: 'Critical',
      detail: '1 booking missed a STAT repeat.',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Critical')).toBeVisible();
  },
};

/** Money always renders through MoneyText, in minor units. */
export const MoneyValue: Story = {
  args: { signal: signal(demo.busyMorning, 'earnings') },
};

/** A non-numeric headline: the next pickup window. */
export const TimeWindowValue: Story = {
  args: { signal: signal(demo.busyMorning, 'pickup') },
};

/** Zero renders as zero: a cleared axis is a fact, not a blank. */
export const ZeroValue: Story = {
  args: { signal: signal(demo.allCaughtUp, 'bookings') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0')).toBeVisible();
  },
};

/** The title stays readable while its value loads, and offers no link. */
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

export const LongContent: Story = {
  args: { signal: signal(demo.longContent, 'bookings') },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { signal: signal(demo.longContent, 'earnings') },
};
