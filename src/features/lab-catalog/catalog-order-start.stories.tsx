import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { CatalogOrderStart } from './catalog-order-start';
import { LAB_CATALOG_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Lab Catalog/Order Start',
  component: CatalogOrderStart,
  tags: ['autodocs', 'adapted-kura'],
  parameters: { kura: LAB_CATALOG_STORYBOOK_KURA },
  args: {
    selectedCount: 2,
    canPlaceOrder: true,
    onChoosePatient: fn(),
    onVerifyLicence: fn(),
  },
} satisfies Meta<typeof CatalogOrderStart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

export const EmptySelection: Story = {
  args: { selectedCount: 0 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Choose patient' });
    const styles = window.getComputedStyle(button);
    await expect(button).toBeDisabled();
    await expect(button).toHaveTextContent('Choose patient');
    expect(styles.color).not.toBe(styles.backgroundColor);
  },
};

export const NewDoctorBlocked: Story = {
  args: { canPlaceOrder: false },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence required to place orders')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Choose patient' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', { name: 'Verify licence' }));
    await expect(args.onVerifyLicence).toHaveBeenCalled();
  },
};
