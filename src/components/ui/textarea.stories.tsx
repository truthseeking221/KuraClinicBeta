import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Textarea } from './index';
import storyStyles from './intake-components.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/c-textarea-1' },
      intake: {
        decision: 'REUSE-AND-EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The canonical Kura multiline field already covered labels, help, validation, disabled, long content, and resize. ReUI evidence added read-only and character-count composition coverage without creating a duplicate owner.',
        exclusions: ['Auto-resize remains a composition until recurrence proves a shared behavior contract.'],
      },
      contract: {
        primaryTask: 'Enter or review multi-line text without losing labels, validation, focus, or touch comfort.',
        states: ['default', 'focus-visible', 'required', 'disabled', 'read-only', 'invalid', 'long-content', 'resize'],
        responsive: 'fluid-with-content-driven-height',
        accessibility: 'native-label-description-error-association',
      },
    },
    docs: {
      description: {
        component:
          'Canonical Kura multi-line field for notes, explanations, and other text that benefits from line wrapping. Use Input for single-line values.',
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Clinical note',
    placeholder: 'Add context for the next attempt…',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox', { name: 'Clinical note' });
    await userEvent.click(field);
    await expect(field).toHaveFocus();
  },
};

export const Required: Story = {
  args: {
    label: 'Reason details',
    required: true,
    placeholder: 'Explain the exception…',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Next-step note',
    error: 'Add a note before continuing.',
    value: '',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helpText: 'Notes are locked after handoff.',
    label: 'Handoff note',
    value: 'This note can no longer be changed.',
  },
};

export const ReadOnly: Story = {
  args: {
    helpText: 'This note is locked after handoff.',
    label: 'Handoff note',
    readOnly: true,
    value: 'Patient prefers the left arm. Reconfirm consent before the next attempt.',
  },
};

export const ResizeOptions: Story = {
  args: {},
  render: () => (
    <div className={storyStyles.grid}>
      <Textarea label="Fixed note" resize="none" value="This field keeps its assigned geometry." readOnly />
      <Textarea label="Vertical resize" resize="vertical" defaultValue="Drag the lower edge when more writing space is useful." />
      <Textarea label="Two-axis resize" resize="both" defaultValue="Use both-axis resizing only in flexible workspaces." />
    </div>
  ),
};

export const CharacterCountComposition: Story = {
  args: {},
  render: function CountedTextarea() {
    const [value, setValue] = useState('Patient requested a morning appointment.');
    return (
      <div className={storyStyles.narrow}>
        <Textarea
          helpText={`${value.length} of 240 characters`}
          label="Booking note"
          maxLength={240}
          onChange={(event) => setValue(event.currentTarget.value)}
          value={value}
        />
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    label: 'Next-attempt context',
    value:
      'Patient requested a pause after the first attempt. Reconfirm identity, review the selected site, and ask whether the patient is ready before collecting this tube again.',
    onChange: () => {},
  },
};

export const MobileLongContent: Story = {
  args: LongContent.args,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
