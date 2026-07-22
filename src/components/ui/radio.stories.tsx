import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Radio, RadioGroup } from './index';

const meta = {
  title: 'Design System/Primitives/Radio',
  component: Radio,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: {
        vendor: 'Kura',
        registryItem: 'radio',
        visualReference: 'Kura radio',
      },
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Source and Storybook search found no canonical Radio. Create the smallest native radio primitive; grouped selection is owned by the canonical RadioGroup fieldset contract.',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-control-and-focus',
        icons: 'none-required-native-indicator',
        motion: 'kura-selection-transition-reduced-motion-safe',
        density: 'kura-root-attribute',
        responsive: 'fluid-with-full-width-under-480px',
      },
    },
    docs: {
      description: {
        component:
          'A native radio choice with a label-sized hit area. Use RadioGroup whenever two or more options form a one-of-many decision.',
      },
    },
  },
  argTypes: {
    appearance: { control: 'radio', options: ['default', 'card'] },
    density: { control: 'radio', options: ['standard', 'comfortable'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledRadioStory() {
  const [value, setValue] = useState<'yes' | 'no'>('no');

  return (
    <div>
      <RadioGroup
        legend="Medical licence"
        name="controlled-answer"
        onValueChange={(nextValue) => {
          if (nextValue === 'yes' || nextValue === 'no') setValue(nextValue);
        }}
        value={value}
      >
        <Radio value="yes">Yes</Radio>
        <Radio value="no">No</Radio>
      </RadioGroup>
      <output aria-live="polite">Selected: {value}</output>
    </div>
  );
}

export const Default: Story = {
  args: {
    children: 'Standard processing',
    name: 'processing-mode-default',
    value: 'standard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio', { name: 'Standard processing' });
    await expect(radio).not.toBeChecked();
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
  },
};

export const Group: Story = {
  render: () => (
    <RadioGroup
      className="w-full max-w-md"
      defaultValue="portal"
      legend="Result delivery"
      name="delivery"
    >
      <Radio value="portal">Add to patient portal</Radio>
      <Radio value="clinician">Send to referring clinician</Radio>
      <Radio value="none">Do not send a copy</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const portal = canvas.getByRole('radio', { name: 'Add to patient portal' });
    const clinician = canvas.getByRole('radio', {
      name: 'Send to referring clinician',
    });
    await expect(portal).toBeChecked();
    await userEvent.click(clinician);
    await expect(clinician).toBeChecked();
    await expect(portal).not.toBeChecked();
  },
};

export const Controlled: Story = {
  render: () => <ControlledRadioStory />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Yes' }));
    await expect(canvas.getByText('Selected: yes')).toBeVisible();
  },
};

export const States: Story = {
  render: () => (
    <RadioGroup
      className="max-w-3xl"
      defaultValue="selected"
      legend="Radio states"
      name="states"
      orientation="horizontal"
    >
      <Radio value="available">Available</Radio>
      <Radio value="selected">Selected</Radio>
      <Radio value="disabled" disabled>
        Unavailable
      </Radio>
      <Radio value="invalid" error="Choose a delivery method">
        Required choice
      </Radio>
    </RadioGroup>
  ),
};

export const LongContentAndNarrow: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Radio
        name="narrow"
        value="secure"
        helpText="Secure delivery keeps the result inside the clinic workspace."
      >
        Send through the secure clinic workspace
      </Radio>
    </div>
  ),
};

export const ComfortableCards: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <RadioGroup
        defaultValue="yes"
        legend="Medical licence status"
        name="comfortable-medical-licence-status"
      >
        <Radio
          appearance="card"
          density="comfortable"
          helpText="Choose your profession, then upload a licence document."
          value="yes"
        >
          Yes — I have a medical licence
        </Radio>
        <Radio
          appearance="card"
          density="comfortable"
          helpText="No credential is created or requested. You can change this later."
          value="no"
        >
          No — not at this time
        </Radio>
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const yes = canvas.getByRole('radio', {
      name: /Yes — I have a medical licence/,
    });
    const no = canvas.getByRole('radio', { name: /No — not at this time/ });
    await expect(yes).toBeChecked();
    await userEvent.click(no);
    await expect(no).toBeChecked();
  },
};

export const ComfortableCardsMobile320: Story = {
  ...ComfortableCards,
  parameters: { viewport: { defaultViewport: 'kura320' } },
};

export const MobileInteractive: Story = {
  render: () => (
    <RadioGroup
      className="w-full max-w-sm"
      defaultValue="phone"
      legend="Preferred contact route"
      name="contact"
    >
      <Radio value="phone">Phone call</Radio>
      <Radio value="message">Secure message</Radio>
    </RadioGroup>
  ),
};

export const Tablet: Story = {
  render: () => (
    <RadioGroup
      className="w-full max-w-2xl"
      defaultValue="routine"
      legend="Urgency"
      name="urgency"
      orientation="horizontal"
    >
      <Radio value="routine">Routine</Radio>
      <Radio value="urgent">Urgent</Radio>
      <Radio value="stat">Stat</Radio>
    </RadioGroup>
  ),
};

export const Desktop: Story = {
  render: () => (
    <RadioGroup
      className="w-full max-w-4xl"
      defaultValue="in-person"
      legend="Appointment format"
      name="appointment"
      orientation="horizontal"
    >
      <Radio value="in-person">In-person appointment</Radio>
      <Radio value="video">Video consultation</Radio>
    </RadioGroup>
  ),
};
