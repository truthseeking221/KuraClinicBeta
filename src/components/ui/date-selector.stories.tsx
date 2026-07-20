import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  Button,
  DateSelector,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  formatDateSelectorValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type DateSelectorValue,
} from './index';

const referenceToday = new Date(2026, 6, 15);

const meta = {
  title: 'Design System/Components/Date Selector',
  component: DateSelector,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'COMPOSE',
        owner: 'src/components/ui',
        evidence:
          'Calendar already owns date-grid navigation and selection. Field and Input own form anatomy, while the newly canonical Popover owns anchored disclosure. DateSelector composes these contracts without copying the ReUI implementation.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/date-selector',
        sourceUrl: 'https://reui.io/components/date-selector',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-control-and-overlay',
        elevation: 'kura-popover',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'single-column date range below 480px; Popover remains viewport-contained; Dialog is available for a dedicated mobile task.',
      },
      useCase: {
        primaryTask: 'Enter or verify an exact date or inclusive date range with clear bounds.',
        dataModel: 'A local Date or CalendarRange supplied by the owning form or filter; this primitive performs no request or mutation.',
        safety: 'Exact date entry remains visible beside the calendar. Availability, booking rules, query semantics, permissions, and persistence stay in the owning feature.',
        backendCompatibility: 'Generic visual primitive; it introduces no domain action, status, endpoint, or simulated business behavior.',
      },
      exclusions: [
        'ReUI before, after, and between filter operators are query semantics and belong to an owning filter contract.',
        'Month, quarter, half-year, and year period selectors are separate report/filter domain controls, not exact-date entry.',
        'Natural-language input such as Q4 is excluded because locale parsing and query interpretation need an owning contract.',
        'Dropdown-menu presentation is excluded because a persistent date-entry task needs form semantics and a reversible Popover or Dialog surface.',
      ],
    },
    docs: {
      description: {
        component:
          'A controlled or uncontrolled exact-date and date-range field. It keeps typed dates and the canonical Calendar synchronized, supports bounds and unavailable dates, and leaves business filtering and availability rules to the feature owner.',
      },
    },
  },
} satisfies Meta<typeof DateSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: new Date(2026, 6, 15),
    label: 'Review date',
    description: 'Enter the exact date or select it in the calendar.',
    today: referenceToday,
  },
};

export const DateRange: Story = {
  args: {
    mode: 'range',
    defaultValue: { from: new Date(2026, 6, 6), to: new Date(2026, 6, 10) },
    label: 'Review period',
    description: 'The end date cannot be earlier than the start date.',
    today: referenceToday,
  },
};

export const ConstraintsAndError: Story = {
  args: {
    defaultValue: new Date(2026, 6, 7),
    disabledDates: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
    error: 'Choose a weekday from 8 July to 24 July 2026.',
    label: 'Required review date',
    maxDate: new Date(2026, 6, 24),
    minDate: new Date(2026, 6, 8),
    required: true,
    today: referenceToday,
  },
};

export const ReadOnly: Story = {
  args: {
    mode: 'range',
    defaultValue: { from: new Date(2026, 6, 9), to: new Date(2026, 6, 15) },
    description: 'This review period is shown for context and cannot be changed here.',
    label: 'Recorded review period',
    readOnly: true,
    today: referenceToday,
  },
};

export const WithPopover: Story = {
  args: { label: 'Review date' },
  render: () => {
    const [value, setValue] = useState<DateSelectorValue>(new Date(2026, 6, 15));
    const [draft, setDraft] = useState<DateSelectorValue>(value);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (open) setDraft(value);
    }, [open, value]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={<Button variant="outline">{formatDateSelectorValue(value) || 'Select review date'}</Button>}
        />
        <PopoverContent aria-label="Select review date" initialFocus={false} role="dialog">
          <DateSelector label="Review date" onChange={setDraft} today={referenceToday} value={draft} />
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <Button onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
            <Button onClick={() => { setValue(draft); setOpen(false); }}>Apply date</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /jul 15, 2026/i }));
    await expect(await within(document.body).findByRole('dialog', { name: /select review date/i })).toBeVisible();
  },
};

export const WithDialog: Story = {
  args: { label: 'Review period' },
  render: () => {
    const [value, setValue] = useState<DateSelectorValue>();
    return (
      <Dialog>
        <DialogTrigger asChild><Button variant="outline">Set review period</Button></DialogTrigger>
        <DialogContent mobilePresentation="full" size="lg">
          <DialogHeader>
            <DialogTitle>Select a review period</DialogTitle>
            <DialogDescription>Use this larger surface when a date decision needs dedicated mobile space.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <DateSelector
              label="Review period"
              mode="range"
              onChange={setValue}
              today={referenceToday}
              value={value}
            />
          </DialogBody>
          <DialogFooter><Button>Use selected period</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const LocaleAndWeekStart: Story = {
  args: {
    defaultValue: new Date(2026, 6, 15),
    label: 'Ngày rà soát',
    locale: 'vi-VN',
    today: referenceToday,
    weekStartsOn: 1,
  },
};

export const DensityModes: Story = {
  args: { label: 'Review date' },
  render: () => (
    <div className="grid w-full gap-6 lg:grid-cols-3">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="min-w-0">
          <DateSelector
            defaultValue={new Date(2026, 6, 15)}
            label={`${density} review date`}
            today={referenceToday}
          />
        </div>
      ))}
    </div>
  ),
};

export const MobileDefault: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    mode: 'range',
    defaultValue: { from: new Date(2026, 6, 6), to: new Date(2026, 6, 10) },
    label: 'Review period',
    today: referenceToday,
  },
};
