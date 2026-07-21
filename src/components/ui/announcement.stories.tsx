import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Announcement, Button, InformationIcon, ShieldIcon } from './index';
import styles from './announcement.stories.module.css';

const meta = {
  title: 'Design System/Components/Announcement',
  component: Announcement,
  args: {
    title: 'Keep your workspace secure',
  },
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The source and Storybook search found Alert for persistent status and Toast for transient feedback, but neither owns a compact optional sidebar prompt with self-dismissal and one follow-up action.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'announcement',
        visualReference: 'Kura announcement',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'Kura geometry on Kura tokens',
        radius: 'Kura geometry on Kura tokens',
        elevation: 'Kura finish tokenized by Kura',
        icons: 'kura-canonical',
        density: 'kura-standard',
        responsive: 'container-width',
      },
      useCase: {
        role: 'Clinic and operational workspace users',
        primaryTask: 'Understand one optional next step and either act or dismiss it.',
        dataModel: 'A title, optional context, one optional action, and optional dismissal.',
        safety: 'This component must not carry critical clinical, identity, permission, or operational failure information; use Alert when the message must remain visible.',
        outOfScope: 'Urgent status, multi-step onboarding, notification queues, confirmation dialogs, and loading state.',
      },
      exclusions: [
        'The Kura source uses Remix icons, a hand-drawn SVG close glyph, Tailwind utilities, and a motion dependency; Kura replaces each with canonical icons, CSS Modules, Kura tokens, and native dismissal behavior.',
        'The source card is a visual reference only. Kura preserves the larger dismiss target and tokenized radius required by the system accessibility contract.',
      ],
    },
    docs: {
      description: {
        component:
          'A compact optional prompt for a sidebar or narrow panel. Keep one clear action. Use Alert for messages that must remain visible or carry a safety consequence.',
      },
    },
  },
} satisfies Meta<typeof Announcement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className={styles.sidebar}>
      <Announcement
        title="Keep your workspace secure"
        description="Review your sign-in options when you have a moment."
        actionLabel="Review security"
      />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [isShown, setIsShown] = useState(true);

    return (
      <div className={styles.sidebar}>
        {isShown ? (
          <Announcement
            title="A new workflow guide is available"
            description="Open it when you are ready to review the changes."
            dismissible
            actionLabel="Open guide"
            onDismiss={() => setIsShown(false)}
          />
        ) : (
          <Button variant="outline" onClick={() => setIsShown(true)}>Show announcement</Button>
        )}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Dismiss announcement' }));

    await expect(canvas.getByRole('button', { name: 'Show announcement' })).toBeVisible();
  },
};

export const WithoutAction: Story = {
  render: () => (
    <div className={styles.sidebar}>
      <Announcement
        icon={<InformationIcon aria-hidden="true" />}
        title="Scheduled maintenance"
        description="Reports may load more slowly tonight from 01:00 to 01:30 ICT."
      />
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className={styles.sidebar}>
      <Announcement
        icon={<ShieldIcon aria-hidden="true" />}
        title="Review the workspace access policy before you share patient records with a new partner organization"
        description="The policy explains which role may send records, how access is logged, and what to do when the recipient details change."
        actionLabel="Review policy"
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <Announcement
      title="Set your shift preferences"
      description="Choose how you want to receive non-urgent updates."
      actionLabel="Set preferences"
    />
  ),
};
