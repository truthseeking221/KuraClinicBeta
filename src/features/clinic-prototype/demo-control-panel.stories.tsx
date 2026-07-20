import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';
import { DemoControlPanel } from './demo-control-panel';

const meta = {
  title: 'Clinic/Shell/Demo Controls',
  component: DemoControlPanel,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      readiness: READINESS.flows,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/clinic-prototype',
        evidence:
          'Presenter controls for the prototype app header. Composed from Popover, Select, Badge, Button, Separator; licence options come from the canonical VERIFICATION_META (seven-state lifecycle), scenario/episode options mirror the home and results demo-data fixtures. Pure props — the app wires session and navigation.',
        exclusions: ['No product functionality — this is demo tooling and is labelled as such.'],
      },
      responsive: { strategy: ['FLUID'], minimumWidth: 320 },
      journeys: ['prototype-presenter-controls'],
    },
    docs: {
      description: {
        component:
          'The "Demo" popover in the prototype shell header: walk the seven licence states, jump home scenarios and results episodes, reset the demo session. Every option originates from canonical fixtures — the panel invents no states.',
      },
    },
  },
  args: {
    licence: 'verified',
    onLicenceChange: fn(),
    onJumpHomeScenario: fn(),
    onJumpResultsEpisode: fn(),
    onReset: fn(),
  },
} satisfies Meta<typeof DemoControlPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function body(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body);
}

export const Closed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Demo' })).toBeVisible();
  },
};

export const OpenPanel: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Demo' }));

    await expect(await screen.findByText('Demo controls')).toBeVisible();
    await expect(screen.getByText('Prototype')).toBeVisible();
    await expect(screen.getByText('State persists in this browser only.')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Reset demo' }));
    await expect(args.onReset).toHaveBeenCalled();
  },
};

export const JumpScenario: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Demo' }));
    await userEvent.click(await screen.findByRole('combobox', { name: /Home scenario/ }));
    await userEvent.click(await screen.findByRole('option', { name: 'Critical day' }));
    await expect(args.onJumpHomeScenario).toHaveBeenCalledWith('critical-day');
  },
};
