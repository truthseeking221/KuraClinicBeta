import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger } from './index';
import { ClipboardListIcon, MedicalFileIcon } from './icons';

const meta = {
  title: 'Design System/Primitives/Collapsible',
  component: Collapsible,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Fresh Storybook and source search found Accordion but no independent disclosure primitive. Collapsible owns one trigger/content region; Accordion remains the owner for coordinated section groups.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'collapsible',
        sourceUrl: 'https://reui.io/components/collapsible',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'fluid-wrap-and-natural-content-reflow',
        motion: 'kura-140ms-trigger-feedback-reduced-motion-safe',
      },
      exclusions: [
        {
          reuiExample: 'Animated card and frame compositions',
          reason: 'A generic disclosure must not force a card or repeated surface. Compose Card only when the owning workflow needs a real boundary.',
          replacement: 'Card + Collapsible composition in the owning feature story.',
        },
        {
          reuiExample: 'User profile, multi-level menu, and file tree demos',
          reason: 'These are domain compositions with different navigation, permission, and action semantics; demo data does not belong in the primitive.',
          replacement: 'Nested Collapsible primitives owned by the relevant navigation or workspace feature.',
        },
        {
          reuiExample: 'Bottom trigger placement',
          reason: 'Trigger placement is a layout decision, not a second disclosure behavior.',
          replacement: 'Feature-owned composition using the canonical trigger and responsive layout.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A single disclosure region for optional or secondary detail. Use Accordion when several related sections need coordinated open-state behavior.',
      },
    },
  },
  argTypes: {
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onOpenChange: { action: 'open changed' },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger>Review preparation guidance</CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Fasting instructions are optional for this order. Confirm the request and the patient’s current
          preparation status before proceeding.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /review preparation guidance/i });

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText(/fasting instructions are optional/i)).toBeVisible();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Open: Story = {
  args: { defaultOpen: true },
  render: () => (
    <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger leadingIcon={<MedicalFileIcon aria-hidden="true" />}>
        Specimen collection notes
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Verify the collection time, specimen type, and fasting status. If the order has special handling
          requirements, keep the instructions visible while preparing the specimen.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger leadingIcon={<ClipboardListIcon aria-hidden="true" />}>
            Consultation context
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>
              The current visit is linked to the verified patient record and the assigned consultation team.
            </p>
          </CollapsibleContent>
        </Collapsible>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Context is {open ? 'visible' : 'hidden'}.
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /consultation context/i });

    await userEvent.click(trigger);
    await expect(canvas.getByText(/context is visible/i)).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-controls');
  },
};

export const Settings: Story = {
  render: () => (
    <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger>Optional order inclusions</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-3">
          <Checkbox defaultChecked helpText="The selected items will be included in the printed summary.">
            Include preparation instructions
          </Checkbox>
          <Checkbox>Include the current medication list</Checkbox>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Nested: Story = {
  render: () => (
    <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger>Review workflow details</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <Collapsible>
            <CollapsibleTrigger>Orders</CollapsibleTrigger>
            <CollapsibleContent>
              <p>Complete blood count and HbA1c are ready for collection.</p>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger>Results</CollapsibleTrigger>
            <CollapsibleContent>
              <p>Two results are available; one laboratory result is still pending.</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <Collapsible disabled>
        <CollapsibleTrigger>Restricted clinical notes</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Only roles with the required permission can review these notes.</p>
        </CollapsibleContent>
      </Collapsible>
      <p className="text-sm text-muted-foreground">
        This disclosure is unavailable because the current role does not have permission.
      </p>
    </div>
  ),
};

export const LongContent: Story = {
  args: { defaultOpen: true },
  render: () => (
    <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger>Review before acknowledging a critical result</CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Confirm the patient identity, specimen, collection time, reference range, and verification status.
          Compare the result with the patient context and current treatment. If the value may require
          immediate action, follow the clinic escalation policy, document the acknowledgement, and make
          the responsible clinician clear before closing the review.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const AsChildWithButton: Story = {
  render: () => (
    <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger asChild showChevron={false}>
        <Button variant="ghost" fullWidth disclosure>
          View visit context
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>The visit is linked to the verified patient record and the current consultation.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Keyboard: Story = {
  render: () => (
    <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger>Keyboard-accessible visit details</CollapsibleTrigger>
      <CollapsibleContent>
        <p>The disclosure can be opened and closed with Enter or Space after focus reaches the trigger.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /keyboard-accessible visit details/i });

    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DensityModes: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div data-density="compact">
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Compact density</CollapsibleTrigger>
          <CollapsibleContent>
            <p>Useful for dense operational review where vertical space is limited.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div data-density="cozy">
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Cozy density</CollapsibleTrigger>
          <CollapsibleContent>
            <p>The default density balances scanability with comfortable touch targets.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div data-density="comfortable">
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Comfortable density</CollapsibleTrigger>
          <CollapsibleContent>
            <p>Useful when the workflow needs more separation between disclosure decisions.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  ),
};

export const NarrowContent: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="w-full max-w-xs">
      <Collapsible>
        <CollapsibleTrigger>Long label that must wrap without losing the disclosure affordance</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Long content remains in the document flow and can be read without horizontal scrolling.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const Tablet: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Tablet review context</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content reflows naturally between the narrow and desktop layouts.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const Desktop: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Desktop review context with supporting detail</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Use a flat disclosure when the detail is optional and does not need a separate surface.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const MobileInteractive: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <Collapsible className="w-full">
      <CollapsibleTrigger>Long preparation instructions for a mobile viewport</CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Keep the trigger label readable and let the content reflow naturally. The full preparation
          guidance remains available without horizontal scrolling or hover-only interaction.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /long preparation instructions/i });
    await userEvent.click(trigger);
    await expect(canvas.getByText(/keep the trigger label readable/i)).toBeVisible();
  },
};
