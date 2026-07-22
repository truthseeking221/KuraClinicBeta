import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  Avatar,
  AvatarFallback,
  Badge,
  CalendarIcon,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  UserCheckIcon,
} from './index';

const meta = {
  title: 'Design System/Patterns/Checkbox Group',
  component: CheckboxGroup,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [320, 360, 390, 412, 480, 768, 1024, 1440],
    },
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'Kura has a canonical Checkbox primitive but no semantic owner for a related multiple-choice set. A fieldset and legend add native group semantics while preserving Checkbox as the only binary control owner.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'checkbox',
        visualReference: 'Kura checkbox',
      },
      binding: {
        colors: 'kura-semantic-and-delegated-to-kura-children',
        typography: 'kura',
        spacing: 'kura',
        radius: 'none-on-group',
        elevation: 'none-on-group',
        icons: 'kura-canonical',
        density: 'kura-root-attribute-through-checkbox',
        responsive: 'horizontal-wraps-then-stacks-under-480px',
      },
      retainedCapabilities: [
        'Vertical and inline multiple-choice groups',
        'Native fieldset and legend semantics with visible description and error recovery',
        'Nested select-all state using the Checkbox indeterminate contract',
        'Card, icon, avatar, and badge composition through canonical Kura components',
      ],
      exclusions: [
        {
          capability: 'Frame and card styling baked into a group variant',
          reason: 'A group is semantic form structure, not a surface component.',
          replacement: 'Compose CheckboxGroup inside the canonical Card when the task has a real surface boundary.',
        },
        {
          capability: 'Avatar, icon, or badge-specific checkbox variants',
          reason: 'Those elements remain independently owned and must not create parallel checkbox APIs.',
          replacement: 'Pass the canonical Avatar, Badge, or Kura icon as Checkbox label content.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'Groups related multi-select choices in a native fieldset. It owns the group label, visible context, validation guidance, layout and responsive reflow; Checkbox continues to own the individual choice.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function NestedOrderSummary() {
  const options = [
    { id: 'results', label: 'Include laboratory results' },
    { id: 'medicines', label: 'Include current medication list' },
    { id: 'instructions', label: 'Include patient preparation instructions' },
  ] as const;
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set(['results']));
  const allSelected = selected.size === options.length;
  const partiallySelected = selected.size > 0 && !allSelected;

  function setOption(id: string, checked: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  return (
    <CheckboxGroup
      description="Choose the sections that will appear in the printed order summary."
      legend="Order summary sections"
    >
      <Checkbox
        checked={allSelected}
        indeterminate={partiallySelected}
        onCheckedChange={(checked) => setSelected(checked ? new Set(options.map(({ id }) => id)) : new Set())}
      >
        Select all sections
      </Checkbox>
      <CheckboxGroup legend="Included sections">
        {options.map(({ id, label }) => (
          <Checkbox
            key={id}
            checked={selected.has(id)}
            onCheckedChange={(checked) => setOption(id, checked)}
          >
            {label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </CheckboxGroup>
  );
}

export const Default: Story = {
  args: {
    legend: 'Specimen collection safeguards',
    description: 'Confirm the safeguards that have been completed before collection.',
    children: (
      <>
        <Checkbox defaultChecked>Patient identity verified</Checkbox>
        <Checkbox>Collection site confirmed</Checkbox>
        <Checkbox>Required supplies prepared</Checkbox>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'Specimen collection safeguards' });
    const identity = canvas.getByRole('checkbox', { name: 'Patient identity verified' });

    await expect(group).toBeInTheDocument();
    await expect(identity).toBeChecked();
  },
};

export const Inline: Story = {
  args: {
    legend: 'Order summary inclusions',
    orientation: 'horizontal',
    children: (
      <>
        <Checkbox defaultChecked>Laboratory results</Checkbox>
        <Checkbox>Medication list</Checkbox>
        <Checkbox>Preparation instructions</Checkbox>
      </>
    ),
  },
};

export const Validation: Story = {
  args: {
    legend: 'Release checklist',
    description: 'At least one acknowledgement is required before release.',
    error: 'Confirm the release safeguard before continuing.',
    children: <Checkbox>I have reviewed the order details</Checkbox>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'Release checklist' });

    await expect(group).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Confirm the release safeguard before continuing.');
  },
};

export const NestedSelection: Story = {
  args: {
    legend: 'Order summary sections',
  },
  render: () => <NestedOrderSummary />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAll = canvas.getByRole('checkbox', { name: 'Select all sections' });
    const results = canvas.getByRole('checkbox', { name: 'Include laboratory results' });
    const medicines = canvas.getByRole('checkbox', { name: 'Include current medication list' });

    await expect(selectAll).toHaveAttribute('aria-checked', 'mixed');
    await userEvent.click(selectAll);
    await expect(selectAll).toBeChecked();
    await expect(medicines).toBeChecked();
    await userEvent.click(results);
    await expect(selectAll).toHaveAttribute('aria-checked', 'mixed');
  },
};

export const CardComposition: Story = {
  args: {
    legend: 'Recipients',
  },
  render: () => (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Follow-up recipients</CardTitle>
        <CardDescription>
          Include the clinicians who should receive the completed consultation summary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CheckboxGroup legend="Recipients" orientation="horizontal">
          <Checkbox defaultChecked>
            <span className="flex min-w-0 items-center gap-2">
              <Avatar aria-hidden="true" size="sm">
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <span className="min-w-0">Dr Linh Minh</span>
              <Badge variant="primary">Primary care</Badge>
            </span>
          </Checkbox>
          <Checkbox>
            <span className="flex min-w-0 items-center gap-2">
              <UserCheckIcon aria-hidden="true" />
              <span className="min-w-0">Assigned care coordinator</span>
            </span>
          </Checkbox>
          <Checkbox>
            <span className="flex min-w-0 items-center gap-2">
              <CalendarIcon aria-hidden="true" />
              <span className="min-w-0">Next appointment briefing</span>
            </span>
          </Checkbox>
        </CheckboxGroup>
      </CardContent>
    </Card>
  ),
};

export const Narrow: Story = {
  args: {
    className: 'max-w-xs',
    legend: 'Printed order summary',
    description: 'Selections remain reachable and readable at the narrowest supported width.',
    children: (
      <>
        <Checkbox defaultChecked>
          Include the patient preparation instructions in the printed order summary
        </Checkbox>
        <Checkbox>Include the current medication list</Checkbox>
      </>
    ),
  },
};

export const MobileInteractive: Story = {
  args: {
    className: 'max-w-sm',
    legend: 'Collection safeguards',
    children: (
      <>
        <Checkbox defaultChecked>Patient identity verified</Checkbox>
        <Checkbox>Confirm specimen labels before collection</Checkbox>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getByRole('checkbox', { name: 'Confirm specimen labels before collection' });

    await userEvent.click(labels);
    await expect(labels).toBeChecked();
  },
};

export const Tablet: Story = {
  args: {
    className: 'max-w-2xl',
    legend: 'Order summary inclusions',
    orientation: 'horizontal',
    children: (
      <>
        <Checkbox defaultChecked>Laboratory results</Checkbox>
        <Checkbox>Medication list</Checkbox>
        <Checkbox>Preparation instructions</Checkbox>
      </>
    ),
  },
};

export const Desktop: Story = {
  args: {
    className: 'max-w-4xl',
    legend: 'Record completion',
    orientation: 'horizontal',
    children: (
      <>
        <Checkbox defaultChecked>Patient identity verified</Checkbox>
        <Checkbox>Send a copy to the referring clinician</Checkbox>
      </>
    ),
  },
};
