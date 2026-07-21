import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { DateRangePicker } from './date-range-picker';

const meta = {
  title: 'Design System/Components/Date Range Picker',
  component: DateRangePicker,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'Kura', registryItem: 'date-range-picker', visualReference: 'Kura date-range-picker' },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'Kura supplies a committed dual-month range task distinct from the inline DateSelector form owner.' },
      binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura', icons: 'kura-canonical', responsive: 'stacked below 768px' },
    },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Date range' });
    await userEvent.click(trigger);
    await expect(within(canvasElement.ownerDocument.body).getByRole('dialog', { name: 'Date range' })).toBeVisible();
  },
};

export const Selected: Story = {
  args: { defaultValue: { from: new Date(2026, 6, 14), to: new Date(2026, 6, 20) } },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
