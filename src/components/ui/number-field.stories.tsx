import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Button } from './button';
import { NumberField } from './number-field';

const meta = {
  title: 'Design System/Primitives/Number Field',
  component: NumberField,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/c-number-field-1 through @reui/c-number-field-6',
        sourceUrl: 'https://reui.io/components/number-field',
        api: 'Base UI NumberField',
      },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook and source search found NumberField as the canonical Kura numeric-entry primitive. ReUI’s six-example family shares the same Base UI behavior; Kura extends the existing owner with a size contract and complete state stories instead of creating a duplicate.',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-field',
        elevation: 'kura-control-and-focus',
        icons: 'kura-canonical',
        motion: 'kura-border-focus-transition',
        density: 'kura-root-attribute',
        responsive: 'fluid-min-width-0',
      },
      exclusions: [
        'ReUI’s right-side control and browser-spinner examples are styling-only placements; Kura keeps the split decrement/input/increment anatomy for predictable clinical scanning.',
        'Scrub-area dragging is outside the default Kura contract because accidental numeric mutation is unsafe under clinical workload. Wheel scrubbing remains an explicit Base UI opt-in through allowWheelScrub.',
      ],
    },
    docs: {
      description: {
        component:
          'Accessible numeric entry with explicit decrement and increment controls, keyboard stepping, min/max/step constraints, locale-aware formatting, labels, supporting text, and validation states.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: { label: 'Collection tubes', defaultValue: 2, min: 1, max: 10 },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Collection tubes');
    await userEvent.click(canvas.getByRole('button', { name: 'Increase value' }));
    await expect(input).toHaveValue('3');
  },
};

export const Small: Story = {
  args: { label: 'Small quantity', defaultValue: 5, min: 0, max: 100, size: 'sm' },
};

export const Large: Story = {
  args: { label: 'Large quantity', defaultValue: 5, min: 0, max: 100, size: 'lg' },
};

export const DecimalStep: Story = {
  args: {
    label: 'Dose volume (mL)',
    defaultValue: 2.5,
    min: 0,
    step: 0.5,
    format: { maximumFractionDigits: 1 },
    description: 'Enter the verified volume from the order.',
  },
};

export const KeyboardStepping: Story = {
  args: { label: 'Specimen count', defaultValue: 2, min: 0, max: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Specimen count' });
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowUp}');
    await expect(input).toHaveValue('3');
  },
};

export const AtMaximum: Story = {
  args: { label: 'Allowed attempts', defaultValue: 3, min: 0, max: 3 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Increase value' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  },
};

export const Empty: Story = {
  args: {
    label: 'Received specimens',
    defaultValue: undefined,
    min: 0,
    description: 'Enter the count recorded at accessioning.',
  },
};

export const RequiredError: Story = {
  args: {
    label: 'Specimen count',
    defaultValue: undefined,
    required: true,
    error: 'Enter the number of received specimens.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Specimen count' });
    await expect(input).toHaveAccessibleDescription('Enter the number of received specimens.');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Ordered tubes',
    defaultValue: 3,
    readOnly: true,
    description: 'Set by the released order.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Aliquots',
    defaultValue: 1,
    disabled: true,
    description: 'Unavailable after accessioning is complete.',
  },
};

function ControlledNumberField() {
  const [value, setValue] = useState<number | null>(4);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-2)', minWidth: '280px' }}>
      <NumberField
        label="Queue capacity"
        max={20}
        min={0}
        onValueChange={(nextValue) => setValue(nextValue)}
        value={value}
      />
      <output aria-live="polite">Current capacity: {value ?? 'Empty'}</output>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledNumberField />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Increase value' }));
    await expect(canvas.getByText('Current capacity: 5')).toBeVisible();
  },
};

function FormExample() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      aria-label="Specimen intake"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      style={{ display: 'grid', gap: 'var(--space-3)', minWidth: '280px' }}
    >
      <NumberField defaultValue={2} label="Received specimens" max={100} min={0} name="specimen-count" />
      <Button type="submit">Save count</Button>
      {submitted ? <output>Count saved</output> : null}
    </form>
  );
}

export const InForm: Story = {
  render: () => <FormExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Received specimens')).toHaveValue('2');
    await userEvent.click(canvas.getByRole('button', { name: 'Save count' }));
    await expect(canvas.getByText('Count saved')).toBeVisible();
  },
};

export const LongContent: Story = {
  args: {
    label: 'Number of specimens received from the external collection partner',
    defaultValue: 12,
    min: 0,
    max: 100,
    description: 'Reconcile this count with the sealed manifest before confirming accession.',
  },
};

export const Mobile: Story = {
  args: { label: 'Attempts', defaultValue: 1, min: 0, max: 5 },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
