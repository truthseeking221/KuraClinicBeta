import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from './index';

const meta = {
  title: 'Design System/Components/Popover',
  component: Popover,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'REUSE',
        owner: 'src/components/ui',
        evidence:
          'The canonical Base UI-backed Popover already matches the ReUI anchored-disclosure contract, including controlled state, keyboard dismissal, viewport collision handling, and composable title/description.',
      },
      source: { vendor: 'ReUI', registryItem: 'popover' },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-overlay',
        elevation: 'kura-popover',
        density: 'kura-root-attribute',
        responsive: 'viewport-contained with a Dialog alternative for dedicated mobile tasks',
      },
      useCase: {
        primaryTask: 'Reveal a short, reversible anchored task without losing its trigger context.',
        safety: 'The caller owns permissions, validation, mutations, and confirmation. Consequential work belongs in AlertDialog or a feature-owned Dialog.',
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Review date guidance</Button>} />
      <PopoverContent aria-label="Date guidance" initialFocus={false} role="dialog">
        <PopoverTitle>Use an exact date</PopoverTitle>
        <PopoverDescription>
          Confirm the date before applying it to a schedule, specimen, or report filter.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /review date guidance/i });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(await within(document.body).findByText('Use an exact date')).toBeVisible();
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-start gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline">Open controlled guidance</Button>} />
          <PopoverContent aria-label="Controlled guidance" initialFocus={false} role="dialog">
            <PopoverTitle>Controlled disclosure</PopoverTitle>
            <PopoverDescription>The owning composition controls whether this surface is open.</PopoverDescription>
          </PopoverContent>
        </Popover>
        <span aria-live="polite" className="k-caption">Popover is {open ? 'open' : 'closed'}.</span>
      </div>
    );
  },
};

export const MobileDefault: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button fullWidth variant="outline">Open date help</Button>} />
      <PopoverContent aria-label="Date help" initialFocus={false} role="dialog">
        <PopoverTitle>Choose the intended date</PopoverTitle>
        <PopoverDescription>
          Keep this anchored surface for short reversible guidance. Use a Dialog when a mobile task needs more room.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger disabled render={<Button variant="outline">Review archived guidance</Button>} />
      <PopoverContent aria-label="Archived guidance" role="dialog">
        <PopoverTitle>Archived guidance</PopoverTitle>
      </PopoverContent>
    </Popover>
  ),
};
