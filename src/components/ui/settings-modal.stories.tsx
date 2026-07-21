import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Input } from './input';
import { CreditCardIcon, DatabaseIcon, SettingsIcon, UserCircleIcon } from './icons';
import { SettingsModal } from './settings-modal';
import { Switch } from './switch';

const sections = [
  { id: 'general', label: 'General', group: 'Settings', icon: SettingsIcon, content: <Switch defaultChecked description="Use compact spacing across operational tables.">Compact density</Switch> },
  { id: 'profile', label: 'Profile', group: 'Settings', icon: UserCircleIcon, content: <Input label="Display name" defaultValue="Alex Morgan" /> },
  { id: 'billing', label: 'Billing', group: 'Settings', icon: CreditCardIcon, content: <p>Billing is managed by your organization administrator.</p> },
  { id: 'storage', label: 'Storage', group: 'Workspace', icon: DatabaseIcon, content: <p>4.2 GB of 20 GB used.</p> },
] as const;

const meta = {
  title: 'Design System/Patterns/Settings Modal',
  component: SettingsModal,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      source: { vendor: 'Kura', registryItem: 'settings-modal', visualReference: 'Kura settings-modal' },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'The Kura rail-and-panel settings shell is a reusable modal composition beyond the base Dialog owner.' },
      binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura', icons: 'kura-canonical', responsive: 'full-screen mobile rail' },
    },
  },
} satisfies Meta<typeof SettingsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onOpenChange: () => undefined, open: true, sections },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole('dialog', { name: 'General' })).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Profile' }));
    await expect(body.getByRole('heading', { name: 'Profile' })).toBeVisible();
  },
};

export const Mobile: Story = {
  args: { onOpenChange: () => undefined, open: true, sections },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
