import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta = {
  title: 'Design System/Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: {
        vendor: 'ReUI',
        registryItem: 'c-accordion-1',
        sourceUrl: 'https://reui.io/components/accordion',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-flat',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
      },
    },
    docs: {
      description: {
        component:
          'Progressive disclosure for optional detail. Use it when people need to scan section headings first and open one or more sections without leaving the current workflow.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Whether one or several sections may remain open.',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allows the active section to be closed in single mode.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

function ClinicalContextAccordion({
  type = 'single',
  defaultValue,
}: {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}) {
  return (
    <Accordion
      aria-label="Patient visit context"
      type={type}
      collapsible
      defaultValue={defaultValue}
    >
      <AccordionItem value="identity">
        <AccordionTrigger>Identity and assurance</AccordionTrigger>
        <AccordionContent>
          Patient identity was confirmed against the national ID record. The visit is linked to the current consultation and the verified contact number.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="allergies">
        <AccordionTrigger>Allergies and sensitivities · 2 recorded</AccordionTrigger>
        <AccordionContent>
          Penicillin — rash reported in 2021. Chlorhexidine — local irritation reported during a previous collection. Confirm before prescribing or preparing a procedure.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="medications">
        <AccordionTrigger>Current medications · 4 active</AccordionTrigger>
        <AccordionContent>
          The medication list was last reconciled at this visit. Review dosage, adherence, and interactions before adding or changing a prescription.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function WorkflowAccordion() {
  return (
    <Accordion
      aria-label="Visit workflow details"
      type="multiple"
      defaultValue={['orders']}
    >
      <AccordionItem value="orders">
        <AccordionTrigger>Orders · ready for collection</AccordionTrigger>
        <AccordionContent>
          Complete blood count and HbA1c are assigned to the phlebotomy queue. Payment is independent of the draw status.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="results">
        <AccordionTrigger>Results · partial</AccordionTrigger>
        <AccordionContent>
          Two results are available for review. The remaining laboratory result is still pending and should not be treated as complete.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="follow-up">
        <AccordionTrigger>Follow-up plan</AccordionTrigger>
        <AccordionContent>
          Add the review date and the responsible clinician before closing the consultation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const SingleOpen: Story = {
  args: { type: 'single', collapsible: true },
  render: () => <ClinicalContextAccordion defaultValue="identity" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const identity = canvas.getByRole('button', { name: /identity and assurance/i });
    const allergies = canvas.getByRole('button', { name: /allergies and sensitivities/i });

    await expect(window.getComputedStyle(identity).cursor).toBe('pointer');
    await expect(identity).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(allergies);
    await expect(allergies).toHaveAttribute('aria-expanded', 'true');
    await expect(identity).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.getByRole('region', { name: /allergies and sensitivities/i })).toBeVisible();
  },
};

export const MultipleOpen: Story = {
  args: { type: 'multiple' },
  render: () => <WorkflowAccordion />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const results = canvas.getByRole('button', { name: /results · partial/i });

    await userEvent.click(results);
    await expect(canvas.getByRole('button', { name: /orders · ready/i })).toHaveAttribute('aria-expanded', 'true');
    await expect(results).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DisabledItem: Story = {
  args: { type: 'single', collapsible: true },
  render: () => (
    <Accordion
      aria-label="Patient record sections"
      type="single"
      collapsible
      defaultValue="available"
    >
      <AccordionItem value="available">
        <AccordionTrigger>Visit summary</AccordionTrigger>
        <AccordionContent>The visit summary is available to the current role.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="restricted" disabled>
        <AccordionTrigger>Restricted clinical notes</AccordionTrigger>
        <AccordionContent>Only clinicians with the required permission can review these notes.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  args: { type: 'single', collapsible: true },
  render: () => (
    <Accordion aria-label="Result review guidance" type="single" collapsible>
      <AccordionItem value="guidance">
        <AccordionTrigger>Review before acknowledging a critical result</AccordionTrigger>
        <AccordionContent>
          Confirm the patient identity, specimen, collection time, reference range, and verification status. Compare the result with the patient context and current treatment. If the value may require immediate action, follow the clinic escalation policy, document the acknowledgement, and ensure the responsible clinician is clear before closing the review.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const EmptySection: Story = {
  args: { type: 'single', collapsible: true },
  render: () => (
    <Accordion aria-label="Optional visit details" type="single" collapsible>
      <AccordionItem value="empty">
        <AccordionTrigger>Additional visit details</AccordionTrigger>
        <AccordionContent>No additional visit details have been recorded.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  args: { type: 'single', collapsible: true },
  render: () => {
    const [value, setValue] = useState('identity');

    return (
      <Accordion
        aria-label="Controlled patient context"
        type="single"
        collapsible
        value={value}
        onValueChange={(next) => setValue(next as string)}
      >
        <AccordionItem value="identity">
          <AccordionTrigger>Identity and assurance</AccordionTrigger>
          <AccordionContent>Verified against the patient record.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="consent">
          <AccordionTrigger>Consent and communication</AccordionTrigger>
          <AccordionContent>Communication preferences were confirmed for this visit.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const KeyboardNavigation: Story = {
  args: { type: 'single', collapsible: true },
  render: () => <ClinicalContextAccordion defaultValue="identity" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const identity = canvas.getByRole('button', { name: /identity and assurance/i });
    const allergies = canvas.getByRole('button', { name: /allergies and sensitivities/i });

    identity.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(allergies).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(allergies).toHaveAttribute('aria-expanded', 'true');
  },
};
