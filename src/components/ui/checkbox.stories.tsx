import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Checkbox, CheckboxGroup } from './index';

const meta = {
  title: 'Design System/Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'Kura keeps the native binary and mixed-choice contract while adopting Kura box geometry, selected gradient, and inset highlight.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'checkbox',
        visualReference: 'Kura checkbox',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        motion: 'kura-check-mark-transition-reduced-motion-safe',
        density: 'kura-root-attribute',
        responsive: 'fluid-with-full-width-under-480px',
      },
      exclusions: [
        {
          capability: 'Generic blue, green, and yellow checkbox colors',
          reason: 'A binary choice must not gain an arbitrary color meaning or rely on color as state.',
          replacement: 'Use the default Kura selection treatment, or the explicit AI tone for assistant-originated suggestions.',
        },
        {
          capability: 'Circle checkbox',
          reason: 'A circular binary control is easily confused with single-selection radio controls.',
          replacement: 'Use the canonical Radio primitive for exclusive choices.',
        },
        {
          capability: 'Payment-method checkbox card',
          reason: 'Payment choice is exclusive and outside the clinical checkbox primitive contract.',
          replacement: 'Use Radio inside the owning payment workflow when that workflow exists.',
        },
        {
          capability: 'Tooltip-only label information',
          reason: 'Safety-relevant consequences must remain visible and available on touch devices.',
          replacement: 'Use Checkbox helpText or CheckboxGroup description.',
        },
        {
          capability: 'Custom checkbox positioning as a primitive variant',
          reason: 'Position is composition responsibility, not a durable input API.',
          replacement: 'Compose Checkbox with Kura Card, Avatar, Badge, and layout wrappers.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A binary or mixed choice primitive with an expanded touch target, explicit supporting or error text, and reduced-motion-safe state feedback.',
      },
    },
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'ai'] },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Include fasting instructions',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Include fasting instructions' });
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox.parentElement).toHaveAttribute('data-slot', 'checkbox-field');
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Grouped: Story = {
  render: () => (
    <CheckboxGroup legend="Order summary inclusions" orientation="horizontal">
      <Checkbox defaultChecked>
        Include lab results
      </Checkbox>
      <Checkbox>Include medication list</Checkbox>
    </CheckboxGroup>
  ),
};

export const States: Story = {
  render: () => (
    <CheckboxGroup legend="Checkbox states" orientation="horizontal">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Needs review</Checkbox>
      <Checkbox disabled>Unavailable</Checkbox>
      <Checkbox error="Select this before submitting the order">Required choice</Checkbox>
    </CheckboxGroup>
  ),
};

export const AiTone: Story = {
  render: () => (
    <Checkbox tone="ai" defaultChecked helpText="This selection comes from the assistant suggestion.">
      Include assistant suggestion
    </Checkbox>
  ),
};

export const LongContentAndNarrow: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Checkbox helpText="The selected instruction will be included in the printed order summary.">
        Include the patient preparation instructions in the order summary
      </Checkbox>
    </div>
  ),
};

export const MobileInteractive: Story = {
  render: () => (
    <CheckboxGroup className="max-w-sm" legend="Collection safeguards">
      <Checkbox defaultChecked>Patient identity verified</Checkbox>
      <Checkbox>Attach current medication list</Checkbox>
    </CheckboxGroup>
  ),
};

export const Tablet: Story = {
  render: () => (
    <CheckboxGroup className="max-w-2xl" legend="Order summary inclusions" orientation="horizontal">
      <Checkbox defaultChecked>Include lab results</Checkbox>
      <Checkbox>Include medication list</Checkbox>
    </CheckboxGroup>
  ),
};

export const Desktop: Story = {
  render: () => (
    <CheckboxGroup className="max-w-4xl" legend="Record completion" orientation="horizontal">
      <Checkbox defaultChecked>Patient identity verified</Checkbox>
      <Checkbox>Send a copy to the referring clinician</Checkbox>
    </CheckboxGroup>
  ),
};
