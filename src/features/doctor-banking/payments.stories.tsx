import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  confirmedLinkSession,
  expiredLinkSession,
  mandateByState,
  pendingLinkSession,
} from './demo-data';
import { DoctorPaymentsPage } from './doctor-banking';
import { DOCTOR_BANKING_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Earnings/Auto-pay',
  component: DoctorPaymentsPage,
  tags: ['autodocs', 'adapted-kura'],
  parameters: { layout: 'fullscreen', kura: DOCTOR_BANKING_STORYBOOK_KURA },
  args: {
    mandate: mandateByState.linked,
    linkSession: null,
    state: 'ready',
    onBack: fn(),
    onBeginLink: fn(),
    onRegenerateLink: fn(),
    onRenew: fn(),
    onRetry: fn(),
    onUnlink: fn(),
  },
  render: (args) => (
    <DoctorBankingStoryFrame>
      <DoctorPaymentsPage {...args} />
    </DoctorBankingStoryFrame>
  ),
} satisfies Meta<typeof DoctorPaymentsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Auto-pay active')).toBeVisible();
    await expect(canvas.getByText('ABA •••• 8842')).toBeVisible();
  },
};

export const Unlinked: Story = {
  args: { mandate: mandateByState.unlinked },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const documentBody = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Link ABA' }));
    await expect(args.onBeginLink).toHaveBeenCalled();
    await expect(documentBody.getByRole('dialog', { name: 'Link ABA securely' })).toBeVisible();
    await expect(documentBody.getByText('Starting secure ABA link')).toBeVisible();
  },
};

export const LinkPendingProviderConfirmation: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: pendingLinkSession },
};

export const LinkSessionExpired: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: expiredLinkSession },
};

export const LinkProviderConfirmed: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: confirmedLinkSession },
};

export const RenewalRequired: Story = { args: { mandate: mandateByState.renewal_required } };
export const AuthorizationExpired: Story = { args: { mandate: mandateByState.expired } };
export const CollectionFrozen: Story = { args: { mandate: mandateByState.frozen } };
export const AuthorizationDeleted: Story = { args: { mandate: mandateByState.deleted } };
export const Loading: Story = { args: { state: 'loading' } };
export const RecoverableFailure: Story = { args: { state: 'error' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };
export const Mobile320: Story = {
  args: { mandate: mandateByState.unlinked },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
