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
          'Presenter control for the prototype app header. Composed from Popover, Badge, and Button. Scenario selection remains owned by the onboarding phone registry; the app only clears the session and returns to the Door.',
        exclusions: ['No product functionality — this is demo tooling and is labelled as such.'],
      },
      responsive: { strategy: ['FLUID'], minimumWidth: 320 },
      journeys: ['prototype-presenter-controls'],
    },
    docs: {
      description: {
        component:
          'The "Demo" popover restarts the onboarding-driven demo. It deliberately has no state selectors: every scenario begins at the Door with a registered phone.',
      },
    },
  },
  args: {
    onRestart: fn(),
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
    await expect(screen.getByText('Clears demo-only browser state.')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Choose another scenario' }));
    await expect(args.onRestart).toHaveBeenCalled();
  },
};
