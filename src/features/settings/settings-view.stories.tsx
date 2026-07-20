import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Toaster } from '../../components/ui';

import { SettingsDialog } from './settings-dialog';
import { SettingsView } from './settings-view';
import { READINESS } from '../../components/foundations/readiness-data';

const meta = {
  title: 'Clinic/Settings',
  component: SettingsView,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.settings,
      intake: {
        decision: 'REPLACE + FEATURE-OWN + COMPOSE',
        owner: 'src/features/settings',
        evidence:
          'ReUI settings-7 was installed into .tmp/reui-intake and inspected in full. Its page header, responsive side-tab navigation, SettingsCard, field-group, and setting-row anatomy replace the previous settings presentation. Kura retains the existing SettingsView API, 10-section information architecture, validation, permissions-facing states, local prototype handlers, and canonical components. The production repo confirms workspace mutations are context- and membership-gated and require workspace.settings.manage; this prototype remains Partial until it consumes that backend contract.',
        exclusions: [
          'ReUI demo data and its four-tab SaaS information architecture — Kura owns ten workspace, operations, and trust sections',
          'ReUI local profile, notification, security, and billing state — existing Kura behavior and domain state are preserved',
          'ReUI Lucide icons and permanent ReUI imports — canonical Kura icons and components remain authoritative',
          'ReUI avatar upload hook — existing Kura file-picker behavior remains the feature contract',
        ],
        source: {
          vendor: 'ReUI',
          registryItem: '@reui/settings-7',
          previewUrl: 'https://reui.io/preview/base/settings-7',
        },
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura',
        icons: 'kura',
      },
      responsive: {
        strategy: ['STACKING', 'REFLOW'],
        minimumWidth: 320,
      },
      journeys: [
        'settings-license-renewal',
        'settings-team-management',
        'settings-security-sessions',
        'settings-device-preferences',
      ],
    },
    docs: {
      description: {
        component:
          'One canonical surface for low-frequency workspace configuration: identity, cabinet, team, money, documents, and security. Internal left rail plus dense sections — status rows and one obvious action each. Prototype contract: every action resolves locally (inline edits commit to state, files run through a real picker, exports build a Blob download) and a toast confirms each one; Preferences is the only persisted section (localStorage kura.preferences.v1).',
      },
    },
  },
  args: {
    onSectionChange: fn(),
    onVerify: fn(),
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof SettingsView>;

export default meta;
type Story = StoryObj<typeof meta>;

function body(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body);
}

/** Landing state: license countdown banner, status rows, jump links. */
export const Overview: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Medical license expires in 28 days'),
    ).toBeVisible();
    await expect(canvas.getByText('Kura Cabinet, Toul Kork')).toBeVisible();
    await expect(canvas.getByText('Phnom Penh · GMT+7')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Review team' }));
    await expect(
      await canvas.findByRole('heading', { name: 'Team access' }),
    ).toBeVisible();
    await expect(args.onSectionChange).toHaveBeenCalledWith('members');
  },
};

/** Verified account: locked identity fields and the license renewal badge. */
export const AccountVerified: Story = {
  args: { section: 'account' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Account & verification' }),
    ).toBeVisible();
    await expect(canvas.getAllByText('Verified').length).toBeGreaterThan(0);
    await expect(canvas.getByText('CMC 048-2019')).toBeVisible();
    await expect(canvas.getByText('Renews in 28 days')).toBeVisible();
    await expect(
      canvas.getAllByLabelText('Verified by Kura. Not editable').length,
    ).toBeGreaterThan(0);

    await userEvent.click(
      canvas.getAllByRole('button', { name: 'Verify license' })[0],
    );
    await expect(args.onVerify).toHaveBeenCalled();
  },
};

/** Rejected submissions preserve history and route to a corrected submission. */
export const AccountRejected: Story = {
  args: { section: 'account', verification: 'rejected' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Action required').length).toBeGreaterThan(0);
    await expect(
      canvas.getByText('Your professional licence submission was rejected'),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Review and resubmit' }),
    ).toBeVisible();
  },
};

/** Verification under review: informational banner, no warning tone. */
export const AccountUnderReview: Story = {
  args: { section: 'account', verification: 'pending_review' },
};

/** Expiring credentials remain live while clearly routing to renewal. */
export const AccountExpiring: Story = {
  args: { section: 'account', verification: 'expiring' },
};

/** Grace is still live for attribution but carries a renewal warning. */
export const AccountInGrace: Story = {
  args: { section: 'account', verification: 'in_grace' },
};

/** Lapse blocks only new attribution; placed episodes remain intact. */
export const AccountLapsed: Story = {
  args: { section: 'account', verification: 'lapsed' },
};

/** Cabinet: locked country, courier editor requires at least one pickup day. */
export const Cabinet: Story = {
  args: { section: 'cabinet' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Route PP-04 · Mon / Wed / Fri · 16:00 pickup'),
    ).toBeVisible();
    await expect(canvas.getByText('Country is locked after registration')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Change route' }));
    for (const day of ['Mon', 'Wed', 'Fri']) {
      await userEvent.click(canvas.getByRole('checkbox', { name: day }));
    }
    await expect(
      await canvas.findByText('Select at least one pickup day.'),
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Save' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('checkbox', { name: 'Tue' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
    await expect(
      await canvas.findByText('Route PP-04 · Tue · 16:00 pickup'),
    ).toBeVisible();
  },
};

/** Team access: invite validation, then a guarded approve with AlertDialog. */
export const TeamAccess: Story = {
  args: { section: 'members' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await expect(canvas.getByText('5 active')).toBeVisible();
    await expect(canvas.getByText('You are the sole owner')).toBeVisible();

    // Invite validation: empty, duplicate, then success.
    await userEvent.click(canvas.getByRole('button', { name: 'Invite member' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Send invite' }));
    await expect(await canvas.findByText('Member name is required.')).toBeVisible();

    await userEvent.type(canvas.getByLabelText('Member name'), 'Sophea Lim');
    await userEvent.click(canvas.getByRole('button', { name: 'Send invite' }));
    await expect(
      await canvas.findByText('Sophea Lim is already in this workspace.'),
    ).toBeVisible();

    await userEvent.clear(canvas.getByLabelText('Member name'));
    await userEvent.type(canvas.getByLabelText('Member name'), 'Chan Dara');
    await userEvent.click(canvas.getByRole('button', { name: 'Send invite' }));
    await expect(await canvas.findByText('Chan Dara')).toBeVisible();

    // Approve the seeded pending invite through the confirmation dialog.
    await userEvent.click(canvas.getAllByRole('button', { name: 'Approve' })[0]);
    const dialog = await screen.findByRole('alertdialog');
    await expect(within(dialog).getByText('Approve invite?')).toBeVisible();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Approve' }));
    await waitFor(() => expect(canvas.getByText('6 active')).toBeVisible());
  },
};

/** Preferences: segmented + switch controls save on every change. */
export const Preferences: Story = {
  args: { section: 'preferences' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Saved on this device.')).toBeVisible();

    await userEvent.click(canvas.getByRole('radio', { name: 'SI' }));
    await expect(await canvas.findByText('SI (mmol/L)')).toBeVisible();

    await userEvent.click(canvas.getByRole('radio', { name: 'Conventional' }));
    await expect(await canvas.findByText('Conventional (mg/dL)')).toBeVisible();
  },
};

/** Patient messages: ranked channels, template editing with validation. */
export const PatientMessages: Story = {
  args: { section: 'communications' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Telegram')).toBeVisible();
    await expect(canvas.getByText('Default')).toBeVisible();
    await expect(canvas.getAllByText('Fallback')).toHaveLength(2);
    await expect(canvas.getByText('Doctor intro QR')).toBeVisible();

    // Template edit: blank drafts cannot save; a real edit commits.
    await userEvent.click(canvas.getAllByRole('button', { name: 'Edit' })[0]);
    const field = canvas.getByRole('textbox', { name: 'Results ready' });
    await userEvent.clear(field);
    await expect(canvas.getByRole('button', { name: 'Save' })).toBeDisabled();
    await userEvent.type(field, 'Your results are ready. Open Kura to view them.');
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
    await expect(
      await canvas.findByText('Your results are ready. Open Kura to view them.'),
    ).toBeVisible();
  },
};

/** Workspace payments stay separate from person-owned Earnings. */
export const Payments: Story = {
  args: { section: 'billing' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Workspace scope')).toBeVisible();
    await expect(canvas.getByText('Managed in Earnings')).toBeVisible();
    await expect(canvas.getByText('Patient KHQR collection')).toBeVisible();
    await expect(canvas.queryByText(/Auto pay cap/i)).not.toBeInTheDocument();
  },
};

/** Directory: chip remove with undo, duplicate guard, locked public fields. */
export const DirectoryProfile: Story = {
  args: { section: 'directory' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Mon to Sat · 8:00 to 17:30')).toBeVisible();
    await expect(canvas.getByText('4.8 ★ · 32 reviews')).toBeVisible();

    // Remove a language, then undo restores it.
    await userEvent.click(canvas.getByRole('button', { name: 'Remove English' }));
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Undo' }));
    await expect(await canvas.findByText('English')).toBeVisible();

    // Duplicate services are rejected case-insensitively.
    await userEvent.click(canvas.getByRole('button', { name: 'Add service' }));
    await userEvent.type(canvas.getByLabelText('Add service'), 'diabetes care');
    await userEvent.click(canvas.getByRole('button', { name: 'Add' }));
    await expect(
      await canvas.findByText('diabetes care is already listed.'),
    ).toBeVisible();
  },
};

/** Signed documents: certificate chain status and the signing log export. */
export const SignedDocuments: Story = {
  args: { section: 'esign' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Certificate active')).toBeVisible();
    await expect(canvas.getByText('Kura Sign · CamDX qualified')).toBeVisible();
    await expect(canvas.getByText('PAdES-B-LT')).toBeVisible();
    await expect(canvas.getByText('e-Prescription #2841')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Export signing log' }),
    ).toBeVisible();
  },
};

/** Security: guarded session sign-out empties the list and disables bulk. */
export const Security: Story = {
  args: { section: 'security' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await expect(canvas.getByText('PHI exports are watermarked')).toBeVisible();
    await expect(canvas.getByText('Current')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Revoke' }));
    await expect(await screen.findByText('Sign out this session?')).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Sign out' }));

    await expect(await canvas.findByText('No other sessions')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Sign out all other sessions' }),
    ).toBeDisabled();
  },
};

/** Full journey: the rail reaches all ten sections in order. */
export const RailWalkthrough: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stops: Array<[string, string]> = [
      ['Account & verification', 'Account & verification'],
      ['Cabinet', 'Cabinet'],
      ['Team access', 'Team access'],
      ['Preferences', 'Preferences'],
      ['Patient messages', 'Patient messages'],
      ['Payments', 'Payments'],
      ['Directory profile', 'Directory profile'],
      ['Signed documents', 'Signed documents'],
      ['Security', 'Security'],
      ['Overview', 'Overview'],
    ];
    const rail = within(canvas.getByRole('tablist', { name: 'Settings sections' }));
    for (const [item, heading] of stops) {
      await userEvent.click(rail.getByRole('tab', { name: item }));
      await expect(
        await canvas.findByRole('heading', { level: 2, name: heading }),
      ).toBeVisible();
    }
  },
};

/** 320px: the rail becomes a horizontal strip and rows stack. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rail = within(canvas.getByRole('tablist', { name: 'Settings sections' }));
    await userEvent.click(rail.getByRole('tab', { name: 'Payments' }));
    await expect(
      await canvas.findByRole('heading', { name: 'Payments' }),
    ).toBeVisible();
  },
};

/** Tablet: two-column shell still holds at 768px. */
export const Tablet768: Story = {
  parameters: { viewport: { defaultViewport: 'kura768' } },
};

/** Overlay frame: the dialog rail is the only settings navigation. */
export const DialogFrame: Story = {
  render: (args) => <SettingsDialog {...args} onOpenChange={() => {}} open />,
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', { name: 'Settings' });
    const scoped = within(dialog);
    await expect(
      scoped.getByRole('button', { name: 'Close settings' }),
    ).toBeVisible();

    const rail = within(
      scoped.getByRole('tablist', { name: 'Settings sections' }),
    );
    await userEvent.click(rail.getByRole('tab', { name: 'Security' }));
    await expect(
      await scoped.findByRole('heading', { level: 2, name: 'Security' }),
    ).toBeVisible();
  },
};

/** 320px: the dialog fills the screen; the rail becomes a horizontal strip. */
export const DialogMobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: (args) => <SettingsDialog {...args} onOpenChange={() => {}} open />,
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', { name: 'Settings' });
    const scoped = within(dialog);
    const rail = within(
      scoped.getByRole('tablist', { name: 'Settings sections' }),
    );
    await userEvent.click(rail.getByRole('tab', { name: 'Payments' }));
    await expect(
      await scoped.findByRole('heading', { level: 2, name: 'Payments' }),
    ).toBeVisible();
  },
};
