import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { adminFixture, selectedLedger } from '../doctor-banking/demo-data';
import { ADMIN_DOCTOR_BANKING_STORYBOOK_KURA } from '../doctor-banking/storybook-metadata';
import { AdminDoctorBankingPage } from './admin-doctor-banking';

const meta = {
  title: 'Platform Admin/Finance/Ledgers',
  component: AdminDoctorBankingPage,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: ADMIN_DOCTOR_BANKING_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Admin doctor-banking workbench for person-global ledger review. It composes canonical Kura DataGrid, Filters, Table, Dialog, Input, MoneyText, and status primitives around audited adjustments, non-positive credit floors, and contract-owned pull retry eligibility.',
      },
    },
  },
  args: {
    data: adminFixture,
    state: 'ready',
    onCreateAdjustment: fn(),
    onRetry: fn(),
    onRetryPull: fn(),
    onSelect: fn(),
    onSetFloor: fn(),
  },
} satisfies Meta<typeof AdminDoctorBankingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DirectoryAndLedgerDetail: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Doctor banking' })).toBeVisible();
    await expect(canvas.getByRole('table', { name: 'Doctor ledgers' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry scheduled pull' }));
    await expect(args.onRetryPull).toHaveBeenCalledWith('pull-101');
  },
};

export const CreateAdjustmentValidation: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Create adjustment' }));
    const dialog = within(document.body).getByRole('dialog', { name: 'Create ledger adjustment' });
    await userEvent.type(within(dialog).getByRole('textbox', { name: 'Signed amount (USD minor units)' }), '-2500');
    await userEvent.type(within(dialog).getByRole('textbox', { name: 'Audit reason' }), 'Duplicate earning reversal');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Record adjustment' }));
    await expect(args.onCreateAdjustment).toHaveBeenCalled();
    await expect(within(dialog).getByText('Adjustment recorded')).toBeVisible();
  },
};

export const EmptyDirectory: Story = {
  args: { data: { ...adminFixture, ledgers: [] } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No doctor ledgers')).toBeVisible();
  },
};

export const NoPullOrLedgerHistory: Story = {
  args: { data: { ...adminFixture, entries: [], pulls: [], floorChanges: [] } },
};

export const Loading: Story = { args: { state: 'loading' } };

export const RecoverableFailure: Story = {
  args: { state: 'error' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Try again' }));
    await expect(args.onRetry).toHaveBeenCalled();
  },
};

export const PermissionDenied: Story = {
  args: { state: 'permission-denied' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Doctor banking permission required')).toBeVisible();
    await expect(canvas.queryByText(selectedLedger.displayName)).not.toBeInTheDocument();
  },
};

export const LongDoctorNameAndAuditReason: Story = {
  args: {
    data: {
      ...adminFixture,
      selected: {
        ...selectedLedger,
        displayName: 'Dr. Chanthavysouk Keomanivong-Rattanakosin',
      },
      floorChanges: adminFixture.floorChanges.map((change, index) =>
        index === 0
          ? {
              ...change,
              reason:
                'Approved temporary floor change after documented review of the doctor’s multi-workspace onboarding period and scheduled collection history.',
            }
          : change,
      ),
    },
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};

export const Tablet768: Story = {
  parameters: { viewport: { defaultViewport: 'kura768' } },
};
