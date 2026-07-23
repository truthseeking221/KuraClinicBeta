import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { CatalogWorkspace } from './catalog-workspace';
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from './demo-data';
import { LAB_CATALOG_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Lab Catalog/Workspace',
  component: CatalogWorkspace,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: LAB_CATALOG_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The Storybook-owned catalog page composition. It gives the existing order gate and test picker one shared page hierarchy without creating a second selection or ordering model.',
      },
    },
  },
  args: {
    canPlaceOrder: true,
    categories: LAB_CATALOG_CATEGORIES,
    tests: LAB_CATALOG_TESTS,
    totalCount: LAB_CATALOG_TESTS.length,
    onChoosePatient: fn(),
    onRetry: fn(),
    onSelectedTestIdsChange: fn(),
    onVerifyLicence: fn(),
  },
} satisfies Meta<typeof CatalogWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultSelectedTestIds: ['hba1c', 'lipid-panel'] },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Catalog' })).toBeVisible();
    await expect(canvas.getByText('2 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Choose patient' }));
    await expect(args.onChoosePatient).toHaveBeenCalled();
  },
};

export const EmptySelection: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('button', { name: 'Choose patient' }),
    ).toBeDisabled();
  },
};

export const LicenceRequired: Story = {
  args: { canPlaceOrder: false, defaultSelectedTestIds: ['hba1c'] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence required to place orders')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Choose patient' })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Verify licence' })).toBeVisible();
  },
};

export const Loading: Story = { args: { state: 'loading' } };

export const RecoverableFailure: Story = {
  args: { state: 'error' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await expect(args.onRetry).toHaveBeenCalled();
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
