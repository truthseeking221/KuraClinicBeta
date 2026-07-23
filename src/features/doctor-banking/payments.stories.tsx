import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  confirmedLinkSession,
  expiredLinkSession,
  longRunningLinkSession,
  mandateByState,
  pendingLinkSession,
} from './demo-data';
import { DoctorPaymentsPage } from './doctor-banking';
import { BALANCE_TARGET_CONTRACT_STORYBOOK_KURA } from './storybook-metadata';
import { DoctorBankingStoryFrame } from './story-frame';

const meta = {
  title: 'Clinic/Finance/Balance/Auto-pay',
  component: DoctorPaymentsPage,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: BALANCE_TARGET_CONTRACT_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'The optional ABA authorization behind scheduled collections. All seven mandate states are covered. There is no pause: unlink is always allowed, and only a provider confirmation counts as a successful link.',
      },
    },
  },
  args: {
    mandate: mandateByState.linked,
    licence: 'verified',
    linkSession: null,
    state: 'ready',
    onBack: fn(),
    onBeginLink: fn(),
    onOpenLicence: fn(),
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
    await expect(canvas.getByRole('button', { name: 'Unlink ABA' })).toBeVisible();
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

/** Nothing is authorized until ABA confirms; no local checkbox can fake it. */
export const LinkPendingProviderConfirmation: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: pendingLinkSession },
  play: async ({ canvasElement }) => {
    const documentBody = within(canvasElement.ownerDocument.body);
    await expect(documentBody.getByText('Confirm in ABA Mobile')).toBeVisible();
    await expect(documentBody.getByRole('link', { name: 'Open ABA Mobile' })).toBeVisible();
  },
};

export const LinkSessionExpired: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: expiredLinkSession },
};

/** ABA has not answered. The state stays pending and offers a recovery. */
export const LinkLongRunning: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: longRunningLinkSession },
  play: async ({ canvasElement }) => {
    const documentBody = within(canvasElement.ownerDocument.body);
    await expect(documentBody.getByText('ABA is taking longer than usual')).toBeVisible();
    await expect(documentBody.getByRole('button', { name: 'Create new link' })).toBeVisible();
  },
};

export const LinkProviderConfirmed: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: confirmedLinkSession },
};

/** The one-time credit lands only after the first confirmed link. */
export const FirstLinkCredit: Story = {
  args: { mandate: { ...mandateByState.linked, firstLinkCreditGranted: true } },
};

export const RenewalRequired: Story = {
  args: { mandate: mandateByState.renewal_required },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Renew authorization' }));
    await expect(args.onRenew).toHaveBeenCalled();
  },
};

export const AuthorizationExpired: Story = { args: { mandate: mandateByState.expired } };

/** Frozen stops collections but never traps the authorization. */
export const CollectionFrozen: Story = {
  args: { mandate: mandateByState.frozen },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Unlink ABA' })).toBeVisible();
    await expect(
      canvas.getByText('No collection can run while this state is active. Unlinking still works.'),
    ).toBeVisible();
  },
};

export const AuthorizationDeleted: Story = { args: { mandate: mandateByState.deleted } };

/** Unlinking with a red balance names what is still owed and how to pay it. */
export const UnlinkWithRemainingBalance: Story = {
  args: {
    mandate: mandateByState.linked,
    remainingBalance: { minor: '-4860', currency: 'USD' },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const documentBody = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Unlink ABA' }));
    await expect(documentBody.getByText(/Kura tries one final collection/)).toBeVisible();
    const confirm = documentBody.getAllByRole('button', { name: 'Unlink ABA' });
    await userEvent.click(confirm[confirm.length - 1]);
    await expect(args.onUnlink).toHaveBeenCalled();
  },
};

/** A lapsed licence blocks a new link but never blocks unlinking or KHQR. */
export const LicenceLapsedBlocksNewLink: Story = {
  args: { mandate: mandateByState.unlinked, licence: 'lapsed' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You cannot link a new account right now')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Link ABA' })).not.toBeInTheDocument();
  },
};

/** A lapsed licence still lets an existing authorization be removed. */
export const LicenceLapsedStillUnlinks: Story = {
  args: { mandate: mandateByState.linked, licence: 'lapsed' },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('button', { name: 'Unlink ABA' }),
    ).toBeVisible();
  },
};

export const Loading: Story = { args: { state: 'loading' } };
export const RecoverableFailure: Story = { args: { state: 'error' } };
export const PermissionDenied: Story = { args: { state: 'permission-denied' } };

export const Mobile320: Story = {
  args: { mandate: mandateByState.unlinked },
  globals: { viewport: { value: 'kura320' } },
};

export const Tablet768: Story = {
  args: { mandate: mandateByState.link_pending, linkSession: pendingLinkSession },
  globals: { viewport: { value: 'kura768' } },
};

export const KhmerExpansion: Story = {
  args: { mandate: mandateByState.renewal_required },
  globals: { locale: 'km' },
};
