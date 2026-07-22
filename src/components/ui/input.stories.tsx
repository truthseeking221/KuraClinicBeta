import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Input, SearchIcon } from './index';

const meta = {
  title: 'Design System/Primitives/Input',
  component: Input,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The canonical Kura text-entry primitive keeps its field contract and adopts Kura neutral shell, inset ring, and state finish.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'input',
        visualReference: 'Kura input',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-control-and-focus',
        icons: 'kura-canonical',
        motion: 'kura-border-focus-transition',
        density: 'kura-root-attribute',
        responsive: 'fluid-min-width-0',
      },
      exclusions: [
        'PhoneInput, DateSelector, FileUpload, OtpInput and Field retain their distinct interaction and composition contracts.',
        'Password-strength policy, interactive visibility actions and complex forms remain workflow or pattern concerns.',
        'Pulsed, custom-focus, subtle-background, bottom-border, pill and minimal treatments are styling-only variants without a recurring Kura semantic need.',
      ],
    },
    docs: {
      description: {
        component:
          'Single-line text field with label, help, and error text wired for assistive technology, plus prefix/suffix slots for icons, units, and shortcut hints.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['filled', 'surface'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function CharacterCounterInput() {
  const maxLength = 40;
  const [value, setValue] = useState('');
  const remaining = maxLength - value.length;

  return (
    <Input
      helpText={`${remaining} characters remaining.`}
      label="Operational note"
      maxLength={maxLength}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Short context for the receiving team"
      suffix={`${value.length}/${maxLength}`}
      value={value}
    />
  );
}

/** Native text input with an explicit accessible name when no visible label is required. */
export const Basic: Story = {
  args: {
    'aria-label': 'Quick search',
    placeholder: 'Search by name or code',
    type: 'search',
  },
};

export const Default: Story = {
  args: {
    label: 'Patient name',
    placeholder: 'Sokha Chan',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Patient name');
    const control = input.closest('[data-slot="input-control"]');
    await expect(control).toHaveAttribute('data-variant', 'filled');
    expect(control ? getComputedStyle(control).backgroundColor : '').not.toBe('rgb(255, 255, 255)');
    await userEvent.type(input, 'Sokha Chan');
    await expect(input).toHaveValue('Sokha Chan');
  },
};

/** The white surface variant keeps a field distinct inside a gray tray. */
export const SurfaceOnTray: Story = {
  args: {
    label: 'Tendered (USD)',
    placeholder: '0.00',
    variant: 'surface',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-card-surface)',
          padding: 'var(--space-inset-card)',
          width: 'min(320px, 90vw)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Tendered (USD)');
    await expect(input.closest('[data-slot="input-control"]')).toHaveAttribute(
      'data-variant',
      'surface',
    );
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Booking code',
    helpText: 'Letters and numbers from the SMS, for example FZ-48210.',
    placeholder: 'FZ-48210',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    label: 'Search patients',
    prefix: <SearchIcon size={16} />,
    placeholder: 'Name, phone, or code',
    type: 'search',
  },
};

export const WithSuffixUnit: Story = {
  args: {
    label: 'Weight',
    suffix: 'kg',
    inputMode: 'decimal',
    placeholder: '62.5',
  },
};

export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'As shown on the ID document',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Work email',
    defaultValue: 'name@',
    error: 'Enter a complete email address.',
    type: 'email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Work email');
    await expect(input).toHaveAccessibleDescription('Enter a complete email address.');
    await expect(input).toBeInvalid();
  },
};

export const Disabled: Story = {
  args: {
    label: 'Workspace',
    defaultValue: 'Mekong Clinic',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: 'HN-004821',
    helpText: 'The identifier is locked after patient verification.',
    label: 'Verified patient ID',
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('Verified patient ID');
    await expect(input).toHaveAttribute('readonly');
    await expect(input).not.toBeDisabled();
  },
};

/** The counter composes native maxLength with existing Kura slots. */
export const CharacterCounter: Story = {
  render: () => <CharacterCounterInput />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Operational note');
    await userEvent.type(input, 'Call before arrival');
    await expect(input).toHaveAccessibleDescription('21 characters remaining.');
  },
};

/** Native text-like types retain browser semantics without creating parallel primitives. */
export const NativeTextTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-4)', width: 'min(320px, 90vw)' }}>
      <Input label="Work email" placeholder="name@clinic.example" type="email" />
      <Input label="Temporary password" placeholder="Enter password" type="password" />
      <Input label="Clinic website" placeholder="https://clinic.example" type="url" />
    </div>
  ),
};

export const Sizes: Story = {
  args: { label: 'Sizes' },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-4)', width: 'min(320px, 90vw)' }}>
      <Input label="Small" size="sm" placeholder="Dense table filter" />
      <Input label="Medium" size="md" placeholder="Default form field" />
      <Input label="Large" size="lg" placeholder="Touch-first station field" />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    label: 'Address line',
    defaultValue:
      'Phum Prek Ho, Sangkat Prek Ho, Krong Ta Khmau, Kandal Province, near the old market opposite the pagoda gate',
  },
  parameters: {
    viewport: { defaultViewport: 'kura320' },
  },
};
