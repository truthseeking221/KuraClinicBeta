import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { CopyButton } from './index';

const meta = {
  title: 'Design System/Patterns/CopyButton',
  component: CopyButton,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'ReUI shows copy feedback as an example, but the fresh Kura index had no canonical copy action. The stateful capability is promoted as a small reusable pattern composed from Button and canonical icons.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'components/ui/button.tsx — copy button feedback example',
        sourceUrl: 'https://reui.io/components/button',
      },
      binding: {
        colors: 'delegated-to-kura-button',
        typography: 'delegated-to-kura-button',
        spacing: 'delegated-to-kura-button',
        radius: 'delegated-to-kura-button',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        density: 'delegated-to-kura-button',
        responsive: 'wraps-long-feedback-label',
      },
      exclusions: [
        {
          capability: 'Generic async action success animation',
          reason: 'Async completion changes meaning and recovery per workflow; a generic animation would hide consequences.',
          replacement: 'Use Button loading with an owning workflow state, or create a domain-specific pattern with its own contract.',
        },
      ],
    },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'visit-2048',
  },
};

export const CustomLabels: Story = {
  args: {
    value: 'https://kura.example/visits/visit-2048',
    children: 'Copy visit link',
    successLabel: 'Link copied',
    errorLabel: 'Unable to copy link',
    variant: 'outline',
  },
};

export const EmptyValue: Story = {
  args: {
    value: '   ',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Copy' }));
    await expect(canvas.getByRole('button', { name: 'Copy failed' })).toBeVisible();
  },
};

export const InteractiveSuccess: Story = {
  args: {
    value: 'sample-identifier-2048',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => undefined },
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Copy' }));
    await expect(canvas.getByRole('button', { name: 'Copied' })).toBeVisible();

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard,
    });
  },
};

export const MobileLongFeedback: Story = {
  args: {
    value: 'sample-identifier-2048',
  },
  render: () => (
    <div className="w-full max-w-xs">
      <CopyButton
        value="sample-identifier-2048"
        successLabel="The sample identifier has been copied"
        className="w-full"
      />
    </div>
  ),
};
