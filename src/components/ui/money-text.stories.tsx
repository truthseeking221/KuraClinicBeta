import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { MoneyText } from './money-text';

const meta = {
  title: 'Design System/Primitives/Money Text',
  component: MoneyText,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    kura: {
      owner: 'src/components/ui',
      level: 'primitive',
      contract:
        'Universal exponent-2 wire value renderer. USD displays two decimals; KHR displays whole riels.',
    },
  },
  args: {
    minor: '1500',
    currency: 'USD',
  },
} satisfies Meta<typeof MoneyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usd: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('$15.00')).toBeVisible();
  },
};

export const Khr: Story = {
  args: { minor: '6150000', currency: 'KHR' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('៛61,500')).toBeVisible();
  },
};

export const LargeAmount: Story = {
  args: { minor: '123456789', currency: 'USD' },
};

export const MalformedWireValue: Story = {
  args: { minor: '15.00', currency: 'USD' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('—')).toBeVisible();
  },
};
