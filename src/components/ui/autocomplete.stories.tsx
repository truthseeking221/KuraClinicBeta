import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  Autocomplete,
  type AutocompleteItem,
  Button,
} from './index';

const options: AutocompleteItem[] = [
  {
    id: 'clinician-jordan-davis',
    label: 'Dr. Jordan Davis',
    description: 'Primary care · Downtown Clinic',
    group: 'Clinicians',
    keywords: 'doctor primary care downtown',
  },
  {
    id: 'clinician-morgan-lee',
    label: 'Dr. Morgan Lee',
    description: 'Internal medicine · Riverside Clinic',
    group: 'Clinicians',
    keywords: 'doctor internal medicine riverside',
  },
  {
    id: 'clinician-sam-taylor',
    label: 'Sam Taylor, RN',
    description: 'Care coordination · Downtown Clinic',
    group: 'Clinicians',
    keywords: 'nurse care coordination downtown',
  },
  {
    id: 'workspace-results',
    label: 'Results workspace',
    description: 'Review verified laboratory and imaging results',
    group: 'Workspaces',
    keywords: 'laboratory imaging review',
  },
  {
    id: 'workspace-operations',
    label: 'Operations workspace',
    description: 'Manage access, schedules, and clinic settings',
    group: 'Workspaces',
    keywords: 'access schedule settings',
  },
  {
    id: 'restricted-archive',
    label: 'Archived records',
    description: 'Available only to designated records administrators',
    group: 'Restricted',
    disabled: true,
    keywords: 'archive administrator',
  },
];

const meta = {
  title: 'Design System/Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook and source search found no canonical search-and-select input, listbox, or searchable-select pattern. The ReUI family supplies the missing interaction foundation, so Kura owns a controlled autocomplete with an authoritative selection contract.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-autocomplete-1 through c-autocomplete-12',
        sourceUrl: 'https://reui.io/components/autocomplete',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-popover-desktop-and-inline-mobile',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'floating-desktop-list-to-inline-mobile-results',
      },
      useCase: {
        role: 'Clinic staff and workspace users selecting an authoritative person, record, or workspace from a large known list',
        primaryTask: 'Find and select one verified option without submitting arbitrary free text.',
        dataModel: 'Stable option ID, label, optional description, group, keywords, and disabled state supplied by the owning workflow.',
        safety: 'Only an option ID is submitted through the optional hidden field. Search text is not treated as a valid clinical or operational selection.',
        outOfScope: 'Remote fetching, free-form entry, multi-select tags, patient identity matching, medication safety logic, validation rules, and workflow-specific permissions.',
      },
      exclusions: [
        'The upstream compound Portal, Positioner, Backdrop, Arrow, Separator, and ScrollArea API is replaced by one accessible Kura combobox contract with desktop floating and mobile inline results.',
        'Free-form values and implicit form validation are excluded because authoritative workflow data must own selection validity and any clinical consequence.',
        'The upstream generic demo lists and form layout are replaced by realistic Kura selection states; form fields, remote loading, and permissions remain composing owners.',
      ],
    },
    docs: {
      description: {
        component:
          'A searchable single-select input for authoritative options. It uses a WAI-ARIA combobox/listbox relationship, keyboard navigation, explicit no-results feedback, and a submitted identifier rather than free text.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    autoHighlight: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showTrigger: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: options,
    label: 'Assign reviewer',
    helperText: 'Search verified clinicians and workspace roles.',
    placeholder: 'Search people or workspaces',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Assign reviewer' });
    await userEvent.click(input);
    await userEvent.type(input, 'morgan');
    await expect(canvas.getByRole('option', { name: /Dr. Morgan Lee/i })).toBeVisible();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(input).toHaveValue('Dr. Morgan Lee');
  },
};

export const AutoHighlight: Story = {
  args: {
    items: options,
    label: 'Select workspace',
    autoHighlight: true,
    defaultOpen: true,
    placeholder: 'Search workspaces',
  },
};

export const ClearAndTrigger: Story = {
  args: {
    items: options,
    label: 'Assigned reviewer',
    defaultValue: 'clinician-jordan-davis',
    clearable: true,
    showTrigger: true,
  },
};

export const GroupedResults: Story = {
  args: {
    items: options,
    label: 'Open workspace',
    defaultOpen: true,
    showTrigger: true,
  },
};

export const SearchResults: Story = {
  args: {
    items: options,
    label: 'Find care-team member',
    defaultOpen: true,
    defaultQuery: 'care',
    statusMessage: 'Results match the current care-team directory.',
    clearable: true,
    showTrigger: true,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    label: 'Find patient record',
    defaultOpen: true,
    loading: true,
    loadingMessage: 'Searching the authorized record index…',
    placeholder: 'Search by verified identifier',
  },
};

export const NoResults: Story = {
  args: {
    items: options,
    label: 'Find workspace',
    defaultOpen: true,
    defaultQuery: 'nonexistent location',
    noResultsMessage: 'No workspace matches this search. Try a clinic or workflow name.',
  },
};

export const DisabledWithReason: Story = {
  args: {
    items: options,
    label: 'Assign prescribing clinician',
    disabled: true,
    disabledReason: 'A verified patient identity is required before a prescribing clinician can be assigned.',
  },
};

export const ReadOnly: Story = {
  args: {
    items: options,
    label: 'Assigned reviewer',
    defaultValue: 'clinician-morgan-lee',
    readOnly: true,
    helperText: 'This assignment is locked after review submission.',
  },
};

export const ErrorRecovery: Story = {
  args: {
    items: options,
    label: 'Find clinic workspace',
    errorMessage: 'The workspace directory is unavailable. Check the connection and try again.',
    showTrigger: true,
  },
};

export const SizesAndDensity: Story = {
  args: { items: options },
  render: () => (
    <div className="grid w-full max-w-xl gap-[var(--space-inset-card)]">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Autocomplete
          key={size}
          items={options}
          label={`Reviewer (${size})`}
          size={size}
          showTrigger
          placeholder="Search clinician"
        />
      ))}
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density}>
          <Autocomplete
            items={options}
            label={`Reviewer density: ${density}`}
            showTrigger
            placeholder="Search clinician"
          />
        </div>
      ))}
    </div>
  ),
};

export const FormValue: Story = {
  args: { items: options },
  render: () => {
    const [value, setValue] = useState<string | undefined>();

    return (
      <form className="flex w-full max-w-xl flex-col gap-[var(--space-inset-card)]" onSubmit={(event) => event.preventDefault()}>
        <Autocomplete
          items={options}
          label="Assign workflow owner"
          name="workflowOwnerId"
          value={value}
          onValueChange={setValue}
          clearable
          showTrigger
          helperText="The submitted form value is the selected record ID, not the search text."
        />
        <span className="k-caption">Selected ID: {value ?? 'None selected'}</span>
        <Button type="submit" disabled={!value}>Save assignment</Button>
      </form>
    );
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        id: 'long-care-team',
        label: 'Dr. Alexandra Montgomery-Williams, Consultant in Complex Care Coordination',
        description: 'Long-term care coordination · North River Community Health Centre · Available for verified referrals only',
        group: 'Clinicians',
      },
      ...options,
    ],
    label: 'Assign specialist reviewer',
    defaultOpen: true,
    showTrigger: true,
  },
};

export const MobileReference: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    items: options,
    label: 'Assign reviewer',
    defaultOpen: true,
    showTrigger: true,
    clearable: true,
    helperText: 'Results become an inline list on narrow screens.',
  },
};
