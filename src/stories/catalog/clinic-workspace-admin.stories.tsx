import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoryPlaceholder } from './story-placeholder';

const meta = {
  title: 'Clinic/Practice Admin (Planned)',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Clinic', section: 'Workspace Admin' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Members: Story = { args: { section: 'Members' } };
export const Roles: Story = { args: { section: 'Roles' } };
export const Branches: Story = { args: { section: 'Branches' } };
export const ModuleEntitlements: Story = { args: { section: 'Module entitlements' } };
