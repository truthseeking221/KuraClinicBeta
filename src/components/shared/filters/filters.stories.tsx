import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactElement } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button, FilterIcon, SegmentedToggle } from '../../ui';
import {
  createFilter,
  Filters,
  type Filter,
  type FilterFieldConfig,
  type FilterI18nOverrides,
} from './filters';

const fields: FilterFieldConfig<string>[] = [
  {
    key: 'patient',
    label: 'Patient or booking',
    type: 'text',
    placeholder: 'Name, phone, or booking code',
    operators: [
      { value: 'contains', label: 'contains' },
      { value: 'starts_with', label: 'starts with' },
      { value: 'is', label: 'is exactly' },
      { value: 'empty', label: 'is empty' },
    ],
  },
  {
    key: 'status',
    label: 'Visit status',
    type: 'multiselect',
    maxSelections: 3,
    options: [
      { value: 'waiting', label: 'Waiting' },
      { value: 'in-progress', label: 'In progress' },
      { value: 'complete', label: 'Complete' },
    ],
  },
  {
    key: 'clinic',
    label: 'Clinic',
    type: 'select',
    options: [
      { value: 'phnom-penh', label: 'Phnom Penh Central' },
      { value: 'siem-reap', label: 'Siem Reap Riverside' },
    ],
  },
  { type: 'separator' },
  {
    key: 'priority',
    label: 'Queue priority',
    type: 'custom',
    customRenderer: ({ onChange, values }) => (
      <SegmentedToggle
        label="Queue priority"
        onValueChange={(value) => onChange(value ? [value] : [])}
        options={[
          { value: 'routine', label: 'Routine' },
          { value: 'urgent', label: 'Urgent' },
        ]}
        value={values[0] ?? ''}
      />
    ),
    customValueRenderer: (values) => values[0] ?? 'Select…',
  },
];

const vietnamese: FilterI18nOverrides = {
  addFilter: 'Bộ lọc',
  addFilterTitle: 'Thêm bộ lọc',
  back: 'Quay lại',
  noFieldsFound: 'Không tìm thấy bộ lọc.',
  noResultsFound: 'Không có kết quả.',
  searchFields: 'Lọc…',
  select: 'Chọn…',
  selectedCount: 'đã chọn',
  removeFilter: (field) => `Bỏ bộ lọc ${field}`,
  operators: {
    contains: 'chứa',
    is: 'là',
    isAnyOf: 'là một trong',
    isNot: 'không là',
  },
  placeholders: {
    enterField: (field) => `Nhập ${field.toLowerCase()}…`,
    searchField: (field) => `Tìm ${field.toLowerCase()}…`,
  },
};

function FilterDemo({
  allowMultiple = true,
  customFields = fields,
  initialFilters = [],
  i18n,
  size = 'default',
  trigger,
}: {
  allowMultiple?: boolean;
  customFields?: FilterFieldConfig<string>[];
  initialFilters?: Filter<string>[];
  i18n?: FilterI18nOverrides;
  size?: 'compact' | 'sm' | 'default' | 'lg';
  trigger?: ReactElement;
}) {
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  return (
    <Filters
      allowMultiple={allowMultiple}
      fields={customFields}
      filters={activeFilters}
      i18n={i18n}
      onChange={setActiveFilters}
      size={size}
      trigger={trigger}
    />
  );
}

function AsyncOptionsDemo() {
  const [ready, setReady] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter<string>[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Filters
      fields={[
        {
          key: 'collector',
          label: 'Assigned collector',
          type: 'select',
          options: ready
            ? [
                { value: 'dara', label: 'Dara N.' },
                { value: 'sokha', label: 'Sokha P.' },
              ]
            : [],
        },
      ]}
      filters={activeFilters}
      onChange={setActiveFilters}
    />
  );
}

function RewritingOwnerDemo() {
  const [values, setValues] = useState<string[]>([]);
  const activeFilters: Filter<string>[] = values.length
    ? [{ id: 'owner-status', field: 'status', operator: 'is_any_of', values }]
    : [];

  return (
    <Filters
      allowMultiple={false}
      fields={fields}
      filters={activeFilters}
      onChange={(next) =>
        setValues(next.find((filter) => filter.field === 'status')?.values ?? [])
      }
    />
  );
}

const meta = {
  title: 'Design System/Patterns/Filters',
  component: Filters,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  args: {
    fields,
    filters: [],
    onChange: () => undefined,
  },
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: 'filters', familySize: 9 },
      intake: {
        decision: 'REPLACE',
        owner: 'src/components/shared/filters',
        evidence:
          'The former shared pattern was a permanently expanded grid of typed inputs and had no product consumers. It could not be extended into ReUI’s controlled Filter[] query-builder contract without preserving a conflicting interaction model.',
      },
      useCase: {
        primaryTask: 'Build, inspect, revise, and remove an explicit set of reversible list or table constraints.',
        ownership: 'Generic shared pattern only. A route or feature owns URL state, API serialization, permissions, validation policy, and domain action consequences.',
        backendCompatibility: 'No business action, persistence claim, or backend-owned status is introduced.',
      },
      family: [
        'field and value selection',
        'operator editing',
        'text and custom values',
        'sizes and custom trigger',
        'async option replacement',
        'controlled DataGrid mapping',
        'internationalisation',
        'keyboard shortcut',
        'mobile and long-content containment',
      ],
      exclusions: [
        {
          capability: 'Automatic nuqs URL persistence and Zod route schemas',
          reason: 'A generic visual pattern cannot invent route parameter names or validation contracts. The owning feature may compose those adapters around the controlled Filter[] value.',
        },
      ],
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-control',
        elevation: 'kura-popover',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'wrapping chip row; viewport-contained, scrollable popovers; full-width trigger and chips at narrow widths',
      },
    },
  },
} satisfies Meta<typeof Filters<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariousFieldTypes: Story = {
  render: () => <FilterDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Filter' }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('option', { name: 'Visit status' }));
    await userEvent.click(overlay.getByRole('checkbox', { name: 'Waiting' }));
    await expect(canvas.getByRole('group', { name: 'Visit status filter' })).toBeVisible();
  },
};

export const OperatorEditing: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('patient', 'contains', ['Sophea'])]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Change Patient or booking operator' }));
    await userEvent.click(within(document.body).getByRole('option', { name: 'starts with' }));
    await expect(canvas.getByRole('button', { name: 'Change Patient or booking operator' })).toHaveTextContent('starts with');
  },
};

export const CustomTrigger: Story = {
  render: () => <FilterDemo trigger={<Button leadingIcon={<FilterIcon aria-hidden="true" />}>Refine visit list</Button>} />,
};

export const CompactControls: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="compact" />,
};

export const SmallControls: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="sm" />,
};

export const DefaultControls: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="default" />,
};

export const LargeControls: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="lg" />,
};

export const CustomControl: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('priority', 'is', ['urgent'])]} />,
};

export const AsyncOptions: Story = {
  render: () => <AsyncOptionsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The owner can replace a field’s controlled options when its permitted source becomes available; this pattern does not fetch or claim data itself.',
      },
    },
  },
};

export const DataGridControlled: Story = {
  render: () => <FilterDemo initialFilters={[createFilter('status', 'is_any_of', ['waiting'])]} />,
  parameters: {
    docs: {
      description: {
        story: 'The controlled Filter[] value can be mapped by an owning feature to TanStack column filters or a contract-backed request. This component never serializes medical or operational data itself.',
      },
    },
  },
};

export const Vietnamese: Story = {
  render: () => <FilterDemo i18n={vietnamese} />,
};

export const KeyboardShortcut: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<Filter<string>[]>([]);
    return (
      <Filters
        enableShortcut
        fields={fields}
        filters={activeFilters}
        onChange={setActiveFilters}
        shortcutKey="f"
        shortcutLabel="F"
      />
    );
  },
};

export const SingleFilterPerField: Story = {
  render: () => <FilterDemo allowMultiple={false} initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Filter' }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('option', { name: 'Clinic' }));
    await expect(overlay.getByRole('checkbox', { name: 'Phnom Penh Central' })).toBeChecked();
    await userEvent.click(overlay.getByRole('checkbox', { name: 'Siem Reap Riverside' }));
    await expect(canvas.getByRole('group', { name: 'Clinic filter' })).toHaveTextContent(
      'Siem Reap Riverside',
    );
    await expect(canvas.getAllByRole('group', { name: 'Clinic filter' })).toHaveLength(1);
  },
  parameters: {
    docs: {
      description: {
        story:
          'With one filter per field, the trigger reopens the existing filter for editing instead of dead-ending on an empty field menu.',
      },
    },
  },
};

export const ControlledOwnerRewritesIds: Story = {
  render: () => <RewritingOwnerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Filter' }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('option', { name: 'Visit status' }));
    await userEvent.click(overlay.getByRole('checkbox', { name: 'Waiting' }));
    await userEvent.click(overlay.getByRole('checkbox', { name: 'In progress' }));
    await expect(canvas.getByRole('group', { name: 'Visit status filter' })).toHaveTextContent(
      '2 selected',
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regression: an owner that rebuilds Filter objects with its own ids on every change must not lose in-session multiselect picks or render stale checkbox states.',
      },
    },
  },
};

export const MobileInteractive: Story = {
  render: () => <FilterDemo />,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

export const LongContent: Story = {
  render: () => (
    <FilterDemo
      customFields={[
        {
          key: 'clinic',
          label: 'Clinic workspace with a long translated operational name',
          type: 'select',
          options: [
            {
              value: 'community-diagnostics',
              label: 'Kura Phnom Penh Central Clinic and Extended Community Diagnostics Collection Centre',
            },
          ],
        },
      ]}
      initialFilters={[createFilter('clinic', 'is', ['community-diagnostics'])]}
    />
  ),
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
