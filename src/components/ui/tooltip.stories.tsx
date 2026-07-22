import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './index';
import styles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'Kura', registryItem: 'tooltip', visualReference: 'Kura tooltip' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'The existing Base UI owner already supplied hover/focus behavior, escape dismissal, portal positioning, arrow, delay provider, and side/alignment control.',
        exclusions: ['Interactive actions and upgrade links belong in Popover.', 'Essential instructions and safety information must remain visible outside Tooltip.'],
      },
      binding: { colors: 'kura-inverse-neutral', typography: 'kura', spacing: 'kura', radius: 'kura', elevation: 'overlay', motion: 'kura-overlay-and-reduced-motion' },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline" />}>Focus for details</TooltipTrigger>
        <TooltipContent>Shows supporting information without hiding an essential instruction.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Focus for details' });
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(documentCanvas.getByRole('tooltip')).toBeVisible());
    trigger.focus();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(documentCanvas.queryByRole('tooltip')).not.toBeInTheDocument());
    trigger.blur();
    trigger.focus();
    await waitFor(() => expect(documentCanvas.getByRole('tooltip')).toBeVisible());
  },
};

export const PlacementSides: Story = {
  args: {},
  render: () => (
    <TooltipProvider delay={0}>
      <div className={styles.tooltipGrid}>
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip defaultOpen key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Placed on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

export const LongContent: Story = {
  args: {},
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline" />}>Result source</TooltipTrigger>
        <TooltipContent>
          Received from the central laboratory after accession reconciliation. Open the result details for the complete audit trail.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const DisabledControl: Story = {
  args: {},
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={<span />}>
          <Button disabled>Release result</Button>
        </TooltipTrigger>
        <TooltipContent>Result release is unavailable until review is complete.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const MobileNarrow: Story = {
  args: {},
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button fullWidth variant="outline" />}>Appointment status</TooltipTrigger>
        <TooltipContent side="bottom">Confirmed by the patient at 08:12 today.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
