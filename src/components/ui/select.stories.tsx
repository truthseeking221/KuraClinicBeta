import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Select } from './index';

const meta = {
  title: 'Design System/Primitives/Select',
  component: Select,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'REUSE',
        owner: 'src/components/ui',
        evidence:
          'No canonical Kura select existed. ReUI/Base UI Select supplies the custom listbox, popup positioning, keyboard navigation, focus restoration, and hidden form input. Kura owns the field anatomy, tokens, states, copy, and responsive treatment.',
      },
      source: { vendor: 'ReUI', registryItem: 'select' },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-hugeicons-canonical',
        motion: 'kura-border-focus-transition',
        density: 'kura-root-attribute',
        responsive: 'viewport-contained custom popup with scrollable options',
      },
    },
    docs: {
      description: {
        component:
          'Single-select with Kura field anatomy (label, help, error) and a custom ReUI-style popup. Keyboard navigation, focus restoration, collision-safe positioning, and form submission remain owned by Base UI.',
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const SITES = [
  { value: 'Antecubital fossa', label: 'Antecubital fossa' },
  { value: 'Forearm', label: 'Forearm' },
  { value: 'Dorsal hand', label: 'Dorsal hand' },
  { value: 'Other', label: 'Other' },
];

export const Default: Story = {
  args: {
    label: 'Draw site',
    options: SITES,
    defaultValue: 'Antecubital fossa',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: 'Draw site' });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const option = await body.findByRole('option', { name: 'Forearm' });
    await expect(option).toBeVisible();
    await userEvent.click(option);
    await expect(trigger).toHaveTextContent('Forearm');
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Defer reason',
    placeholder: 'Choose a reason',
    defaultValue: '',
    options: [
      { value: 'Patient refused', label: 'Patient refused' },
      { value: 'Difficult vein', label: 'Difficult vein' },
      { value: 'Insufficient volume', label: 'Insufficient volume' },
    ],
  },
};

export const Invalid: Story = {
  args: {
    label: 'Insurance provider',
    options: [{ value: 'forte', label: 'Forte' }],
    defaultValue: '',
    placeholder: 'Choose a provider',
    error: 'Choose the provider shown on the member card.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Station',
    options: [{ value: 'PSC-01', label: 'PSC-01 · Main station' }],
    defaultValue: 'PSC-01',
    disabled: true,
    helpText: 'Assigned by the shift lead.',
  },
};

export const LongContent: Story = {
  args: {
    label: 'Collection location',
    options: [
      {
        value: 'community-outreach',
        label: 'Community outreach collection station — Riverside District mobile clinic',
      },
    ],
    defaultValue: 'community-outreach',
  },
};

export const Mobile: Story = {
  args: {
    label: 'Draw site',
    options: SITES,
    defaultValue: 'Forearm',
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
