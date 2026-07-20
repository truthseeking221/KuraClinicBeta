import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { OtpInput } from './otp-input';

const meta = {
  title: 'Design System/Patterns/OtpInput',
  component: OtpInput,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'Kura keeps one accessible logical input from input-otp and now adopts the complete ReUI slot anatomy: joined slot groups with separators, configurable grouping, paste distribution, completion, and SMS autofill.',
        exclusions: [
          'Alphanumeric licence-key entry remains outside the numeric verification-code contract used by Kura authentication and patient-contact flows.',
          'Resend, expiry, verification requests, and support recovery remain feature-owned workflow behavior rather than primitive behavior.',
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItems: [
          'c-input-otp-1',
          'c-input-otp-2',
          'c-input-otp-3',
          'c-input-otp-4',
          'c-input-otp-5',
          'c-input-otp-6',
        ],
        sourceUrl: 'https://reui.io/components/input-otp',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-ring',
        icons: 'kura-canonical-minus-separator',
        motion: 'kura-motion-color',
      },
    },
  },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function Playground({
  error,
  onComplete,
}: {
  error?: string;
  onComplete?: (value: string) => void;
}) {
  const [value, setValue] = useState('');
  return (
    <OtpInput
      error={error}
      helpText={error ? undefined : 'Enter the 6-digit code from the SMS.'}
      label="SMS code"
      onComplete={onComplete}
      onValueChange={setValue}
      value={value}
    />
  );
}

/** ReUI default anatomy: two joined groups of three slots with one separator. */
export const Default: Story = {
  args: { value: '', onValueChange: () => {}, label: 'SMS code' },
  render: () => <Playground />,
};

/** Typing advances through the same logical input; the sixth digit fires onComplete once. */
export const TypedCompletion: Story = {
  args: Default.args,
  render: function Render() {
    const [done, setDone] = useState<string | null>(null);
    return (
      <div>
        <Playground onComplete={setDone} />
        {done ? <p role="status">Completed: {done}</p> : null}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'SMS code' });
    await userEvent.type(input, '123456');
    await expect(input).toHaveValue('123456');
    await expect(await canvas.findByRole('status')).toHaveTextContent('Completed: 123456');
  },
};

/** Six numeric slots joined into one uninterrupted group. */
export const DigitsOnly: Story = {
  args: {
    value: '123456',
    onValueChange: fn(),
    label: 'Digits only',
    groupSize: 6,
  },
};

/** Three compact groups reproduce ReUI's multiple-separator composition. */
export const MultipleSeparators: Story = {
  args: {
    value: '123456',
    onValueChange: fn(),
    label: 'Multi-separator',
    groupSize: 2,
  },
};

/** Paste distributes an entire code across the slots. */
export const PasteDistribution: Story = {
  args: Default.args,
  render: () => <Playground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'SMS code' });
    await input.focus();
    await userEvent.paste('987-654');
    await expect(input).toHaveValue('987654');
  },
};

/** Backspace clears the current digit, then retreats. */
export const BackspaceRetreat: Story = {
  args: Default.args,
  render: () => <Playground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'SMS code' });
    await userEvent.type(input, '12');
    await userEvent.keyboard('{Backspace}{Backspace}');
    await expect(input).toHaveValue('');
  },
};

/** Invalid code: destructive border + announced error. */
export const ErrorState: Story = {
  args: Default.args,
  render: () => <Playground error="Incorrect or expired code — try again." />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toHaveTextContent(/Incorrect or expired/);
    await expect(canvas.getByRole('textbox', { name: 'SMS code' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  },
};

/** Disabled while a verify request is in flight. */
export const Disabled: Story = {
  args: {
    value: '123',
    onValueChange: fn(),
    label: 'SMS code',
    disabled: true,
  },
};

/** Four-digit variant for shorter PIN codes. */
export const FourDigits: Story = {
  args: {
    value: '',
    onValueChange: fn(),
    label: 'PIN',
    length: 4,
    groupSize: 4,
  },
};

/** At 320px, the six-slot row remains contained without horizontal overflow. */
export const Mobile320: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => <Playground />,
};
