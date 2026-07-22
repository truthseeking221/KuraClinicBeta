import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Switch } from './index';
import styles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Switch',
  component: Switch,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'Kura', registryItem: 'switch', visualReference: 'Kura switch' },
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence: 'The existing Base UI owner already provided boolean setting semantics, label association, description, sizes, disabled, and read-only states.',
        exclusions: ['Destructive and decorative color variants are not valid switch semantics.', 'Card and table examples remain compositions.'],
      },
      binding: { colors: 'kura-brand-neutral', typography: 'kura', spacing: 'kura', radius: 'kura', motion: 'kura-reduced-motion-safe' },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Send appointment reminders', description: 'Notify the patient when the appointment is confirmed.' },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole('switch', { name: 'Send appointment reminders' });
    await userEvent.click(control);
    await expect(control).toBeChecked();
  },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className={styles.switchGroup}>
      <Switch defaultChecked size="sm">Compact queue setting</Switch>
      <Switch defaultChecked size="md">Standard form setting</Switch>
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: 'Share results automatically', description: 'Unavailable until consent is recorded.', disabled: true },
};

export const ReadOnly: Story = {
  args: { children: 'Online booking enabled', description: 'Managed by the clinic administrator.', defaultChecked: true, readOnly: true },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole('switch', { name: 'Online booking enabled' });
    await userEvent.click(control);
    await expect(control).toBeChecked();
  },
};

export const SettingGroup: Story = {
  args: {},
  render: () => (
    <div className={styles.switchGroup} aria-label="Notification settings" role="group">
      <Switch defaultChecked description="Notify the assigned clinician about critical updates.">Critical result alerts</Switch>
      <Switch description="Send a summary after the visit is completed.">Visit summary</Switch>
      <Switch defaultChecked description="Notify reception when a booking changes.">Booking changes</Switch>
    </div>
  ),
};

export const MobileLongContent: Story = {
  args: {
    children: 'Send a reminder when a rescheduled appointment is ready for patient confirmation',
    description: 'The patient receives one message with the updated clinic, time, and preparation instructions.',
    defaultChecked: true,
  },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
