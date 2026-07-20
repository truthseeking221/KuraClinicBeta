import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoryPlaceholder } from './story-placeholder';

const meta = {
  title: 'Platform Admin/Console (Planned)',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Platform Admin', section: 'Platform operations' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceManagement: Story = { args: { section: 'Workspace management' } };
export const ModuleEntitlementEditor: Story = { args: { section: 'Module entitlement editor' } };
export const ClinicUsers: Story = { args: { section: 'Clinic users' } };
export const PlatformUsers: Story = { args: { section: 'Platform users' } };
export const LabMasterData: Story = { args: { section: 'Lab master data' } };
export const Pricing: Story = { args: { section: 'Pricing' } };
export const LicenceReview: Story = { args: { section: 'Licence review' } };
export const ConfigConsole: Story = { args: { section: 'Config console' } };
