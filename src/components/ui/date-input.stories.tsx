import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { DateInput } from './index';

const meta = {
  title: 'Design System/Primitives/Date Input',
  component: DateInput,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Kura needs a compact ISO date text field that formats continuous digit entry without adding a calendar surface. DateSelector remains the owner for calendar-backed date and range selection.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'date-input',
        visualReference: 'Kura Input',
      },
      binding: {
        colors: 'delegated-to-kura-input',
        typography: 'delegated-to-kura-input',
        spacing: 'delegated-to-kura-input',
        radius: 'delegated-to-kura-input',
        elevation: 'delegated-to-kura-input',
        icons: 'delegated-to-kura-input',
        responsive: 'fluid input with numeric keyboard and 44px touch control',
      },
      exclusions: [
        'Calendar selection, date ranges, period operators, and availability rules remain DateSelector or feature-owned concerns.',
        'DateInput normalizes entry shape; it does not decide whether a completed date is clinically or operationally valid.',
      ],
    },
    docs: {
      description: {
        component:
          'Compact date text input that inserts ISO separators while preserving the user’s digit order, cursor, paste, and keyboard editing.',
      },
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledDateInput() {
  const [value, setValue] = useState('');
  return (
    <DateInput
      label="Date of birth"
      onValueChange={setValue}
      required
      value={value}
    />
  );
}

export const Default: Story = {
  args: {
    label: 'Date of birth',
    required: true,
  },
};

export const TypingSeparators: Story = {
  render: () => <ControlledDateInput />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Date of birth');

    await userEvent.type(input, '19900505');
    await expect(input).toHaveValue('1990-05-05');
  },
};

export const PasteAndBackspace: Story = {
  render: () => <ControlledDateInput />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Date of birth');

    await userEvent.click(input);
    await userEvent.paste('19900505');
    await expect(input).toHaveValue('1990-05-05');
    await userEvent.keyboard('{Backspace}');
    await expect(input).toHaveValue('1990-05-0');
  },
};

export const Error: Story = {
  args: {
    defaultValue: '1990-13-40',
    error: 'Enter a valid date of birth.',
    label: 'Date of birth',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '1990-05-05',
    disabled: true,
    label: 'Date of birth',
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    label: 'Date of birth',
    placeholder: 'YYYY-MM-DD',
    required: true,
  },
};
