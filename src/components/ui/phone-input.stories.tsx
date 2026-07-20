import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { PhoneInput, type PhoneInputSize, type PhoneValue } from './phone-input';

function ControlledPhoneInput({
  defaultCountry = 'KH',
  size = 'md',
}: {
  defaultCountry?: 'GB' | 'KH' | 'US' | 'VN';
  size?: PhoneInputSize;
}) {
  const [value, setValue] = useState<PhoneValue | undefined>();

  return (
    <PhoneInput
      defaultCountry={defaultCountry}
      helpText="Select a country or region first; the saved value is international."
      label="Phone number"
      onChange={setValue}
      placeholder="Enter phone number"
      size={size}
      value={value}
    />
  );
}

const meta = {
  title: 'Design System/Components/Phone Input',
  component: PhoneInput,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        hierarchy: 'Component',
        evidence:
          'Input covers a labelled native field, while Auth owns a feature-local Select + Input composition. Neither owns country search, flags, E.164 normalisation, or the country-aware size and read-only contract. PhoneInput adds that distinct, reusable interaction and is documented in docs/intake/reui-phone-input-intake.md.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/phone-input — country picker and E.164 phone input',
        sourceUrl: 'https://reui.io/components/phone-input',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-popover',
        icons: 'kura-canonical with country flag data from react-phone-number-input',
        density: 'kura-root-attribute',
        responsive: 'fluid field with viewport-contained, scrollable country picker',
      },
      useCase: {
        role: 'Any user entering an international telephone number',
        primaryTask: 'Select a country or region and enter a reachable phone number.',
        primaryAction: 'Provide a formatted E.164 value to the owning form.',
        dataModel:
          'The owner supplies and stores E.164 values, default or permitted countries, labels, validation feedback, and any verification status. The component does not make a network request.',
        safety:
          'This control does not prove reachability, consent, ownership, identity, or delivery. The workflow must validate and verify numbers before relying on them for consequential action.',
      },
      mobile: {
        primaryTask: 'Choose a country and type a number without horizontal clipping or loss of context.',
        minimumUsableWidth: '320px',
        strategy: ['FLUID', 'SCROLLING'],
        behavior:
          'The field remains fluid, touch targets retain the Kura minimum on coarse pointers, and the country picker stays inside the visual viewport with contained vertical scrolling.',
      },
      exclusions: [
        'Phone reachability, OTP delivery, consent, identity matching, duplicate detection, and audit events are workflow-owned rather than a field primitive.',
        'ReUI popupClassName and scrollAreaClassName escape hatches are replaced by canonical Kura popup sizing, focus, and scroll behavior.',
        'A product-specific country default is not imposed; callers explicitly select it through defaultCountry.',
      ],
    },
    docs: {
      description: {
        component:
          'A country-aware phone-number field with flag search and E.164 output. Use a plain Input when a workflow only accepts a local number with an already-known calling code.',
      },
    },
  },
  argTypes: {
    defaultCountry: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty, controlled international entry with country search. */
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ControlledPhoneInput />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: /change country or region/i });
    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const search = await body.findByRole('combobox', { name: 'Search country or region' });
    const popup = search.closest<HTMLElement>("[data-slot='combobox-content']");
    const list = popup?.querySelector<HTMLElement>("[data-slot='combobox-list']");

    await expect(popup).not.toBeNull();
    await expect(list).not.toBeNull();
    await expect(getComputedStyle(popup!).overflow).toBe('hidden');
    await expect(getComputedStyle(list!).overflowY).toBe('auto');

    await userEvent.type(search, 'Vietnam');
    await userEvent.click(body.getByRole('option', { name: /Vietnam.*\+84/i }));
    await expect(trigger).toHaveAccessibleName(/currently Vietnam, \+84/i);
    await expect(trigger).toHaveTextContent('+84');
  },
};

/** Dense, table-adjacent field treatment. */
export const Small: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <ControlledPhoneInput size="sm" />
    </div>
  ),
};

/** Comfortable field treatment for a focused form. */
export const Large: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ControlledPhoneInput size="lg" />
    </div>
  ),
};

/** Keeps the displayed number while interaction is unavailable. */
export const Disabled: Story = {
  args: {
    defaultCountry: 'KH',
    disabled: true,
    helpText: 'Phone details cannot be changed while the record is being updated.',
    label: 'Phone number',
    value: '+85598111222',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
  ),
};

/** Displays an existing stored E.164 value in its country-aware format. */
export const PresetValue: Story = {
  args: {
    defaultCountry: 'US',
    helpText: 'This example starts from the E.164 value stored by the owning form.',
    label: 'Phone number',
    value: '+14155552671',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Phone number')).toHaveValue('(415) 555-2671');
  },
};

/** Error feedback is supplied by the owning validation rule. */
export const Error: Story = {
  args: {
    defaultCountry: 'KH',
    error: 'Enter a complete phone number before continuing.',
    label: 'Phone number',
    value: '+85512',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Phone number');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('Enter a complete phone number before continuing.');
  },
};

/** The default country is an explicit, caller-owned local policy. */
export const SpecificDefaultCountry: Story = {
  args: {
    countries: ['KH', 'VN', 'TH'],
    defaultCountry: 'VN',
    helpText: 'Only the countries permitted by this form are available.',
    label: 'Phone number',
    placeholder: 'Enter phone number',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
  ),
};

/** Read-only locks both number editing and country changes. */
export const ReadOnly: Story = {
  args: {
    defaultCountry: 'GB',
    helpText: 'The value can be reviewed but not changed in this state.',
    label: 'Phone number',
    readOnly: true,
    value: '+447700900123',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Phone number')).toHaveAttribute('readonly');
    await expect(canvas.getByRole('combobox', { name: /change country or region/i })).toBeDisabled();
  },
};

/** Narrow viewport and long copy keep the picker usable without a decorative outer card. */
export const LongContentMobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="w-full">
      <PhoneInput
        countries={['KH', 'VN', 'TH', 'US', 'GB']}
        defaultCountry="KH"
        helpText="Choose the country or region associated with this number. The form will store the number in a consistent international format."
        label="Contact number for a person receiving appointment updates"
        placeholder="Enter phone number"
      />
    </div>
  ),
};
