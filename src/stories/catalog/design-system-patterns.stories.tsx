import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoryPlaceholder } from './story-placeholder';

// Roadmap patterns only. A stub whose pattern ships in Design System/Patterns
// or Design System/Components is deleted here, not renamed — one owner per UI.
const meta = {
  title: 'Design System/Patterns (Planned)',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Design System', section: 'Patterns (Planned)' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationPanel: Story = { args: { section: 'Notification panel' } };
export const PermissionPicker: Story = { args: { section: 'Permission picker' } };
