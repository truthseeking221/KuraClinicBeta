import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { OtpInput } from './otp-input';

const meta = {
  title: 'Design System/Patterns/OTP Input',
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
  fullWidth = false,
  onComplete,
}: {
  error?: string;
  fullWidth?: boolean;
  onComplete?: (value: string) => void;
}) {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 'min(24rem, calc(100vw - 2rem))' }}>
      <OtpInput
        error={error}
        fullWidth={fullWidth}
        helpText={error ? undefined : 'Enter the 6-digit code from the SMS.'}
        label="SMS code"
        onComplete={onComplete}
        onValueChange={setValue}
        value={value}
      />
    </div>
  );
}

/** ReUI default anatomy: two compact joined groups with one separator. */
export const Default: Story = {
  args: { value: '', onValueChange: () => {}, label: 'SMS code' },
  render: () => <Playground />,
};

/** A dialog title can name the task; preserve the field name for assistive technology. */
export const AccessibleNameOnly: Story = {
  args: { value: '', onValueChange: fn(), accessibleLabel: 'SMS code' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', { name: 'SMS code' })).toBeVisible();
    await expect(canvas.queryByText('SMS code')).not.toBeInTheDocument();
  },
};

/** Auth forms can stretch both groups to the available field width. */
export const FullWidth: Story = {
  args: { ...Default.args, fullWidth: true },
  render: () => <Playground fullWidth />,
  play: async ({ canvasElement }) => {
    const field = canvasElement.querySelector<HTMLElement>('[data-slot="otp-input"]');
    const slots = canvasElement.querySelector<HTMLElement>('[data-input-otp-container]');

    await expect(field).not.toBeNull();
    await expect(slots).not.toBeNull();

    const fieldWidth = field?.getBoundingClientRect().width ?? 0;
    const slotsWidth = slots?.getBoundingClientRect().width ?? 0;
    await expect(Math.abs(fieldWidth - slotsWidth)).toBeLessThanOrEqual(1);
  },
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
  play: async ({ canvasElement }) => {
    const slots = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-slot="otp-group"] > span'),
    );

    await expect(slots).toHaveLength(4);
    for (const slot of slots) {
      await expect(slot.getBoundingClientRect().width).toBe(44);
      await expect(slot.getBoundingClientRect().height).toBe(44);
      await expect(getComputedStyle(slot).fontSize).toBe('20px');
    }
  },
};

/** At 320px, the six-slot row fills its field without horizontal overflow. */
export const Mobile320: Story = {
  args: { ...Default.args, fullWidth: true },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => <Playground fullWidth />,
  play: async ({ canvasElement }) => {
    const field = canvasElement.querySelector<HTMLElement>('[data-slot="otp-input"]');
    const slots = canvasElement.querySelector<HTMLElement>('[data-input-otp-container]');

    await expect(field).not.toBeNull();
    await expect(slots).not.toBeNull();

    const fieldRect = field?.getBoundingClientRect();
    const slotsRect = slots?.getBoundingClientRect();
    await expect(Math.abs((fieldRect?.width ?? 0) - (slotsRect?.width ?? 0))).toBeLessThanOrEqual(
      1,
    );
    await expect((slotsRect?.right ?? 0) <= (fieldRect?.right ?? 0) + 1).toBe(true);
  },
};
