import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { doctorFixture, redDoctorFixture } from './demo-data';
import { DoctorStatementsPage } from './doctor-banking';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Earnings/Activity & Statements',
  component: DoctorStatementsPage,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: { layout: 'fullscreen', kura: DOCTOR_BANKING_STORYBOOK_KURA },
  args: {
    data: doctorFixture,
    downloadState: 'idle',
    state: 'ready',
    onDownload: fn(),
    onBack: fn(),
    onRetry: fn(),
  },
  render: (args) => (
    <DoctorBankingStoryFrame>
      <DoctorStatementsPage {...args} />
    </DoctorBankingStoryFrame>
  ),
} satisfies Meta<typeof DoctorStatementsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'PDF' }));
    await expect(args.onDownload).toHaveBeenCalledWith('pdf');
    await expect(canvas.getByText('Financial notifications')).toBeVisible();
  },
};

export const FailedPullNotice: Story = { args: { data: redDoctorFixture } };
export const DownloadInProgress: Story = { args: { downloadState: 'loading' } };
export const DownloadFailure: Story = { args: { downloadState: 'error' } };
export const DownloadSuccess: Story = { args: { downloadState: 'success' } };
export const EmptyActivityAndNotifications: Story = {
  args: { data: { ...doctorFixture, entries: [], notifications: [] } },
};
export const Loading: Story = { args: { state: 'loading' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };
export const Mobile320: Story = { parameters: { viewport: { defaultViewport: 'kura320' } } };
