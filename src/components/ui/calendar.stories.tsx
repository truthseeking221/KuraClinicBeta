import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Calendar, type CalendarRange, type CalendarSelection } from './index';

const referenceToday = new Date(2026, 6, 15);
const referenceMonth = new Date(2026, 6, 1);
const selectedDate = new Date(2026, 6, 15);

const meta = {
  title: 'Design System/Components/Calendar',
  component: Calendar,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook/source search found no canonical date-grid, date-range, or month-navigation primitive. The ReUI family supplies the missing interaction foundation, so Kura owns a domain-neutral Calendar with explicit selection and composition boundaries.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-calendar-1 through c-calendar-30',
        sourceUrl: 'https://reui.io/components/calendar',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-flat-and-focus',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'fluid-stacking-and-tertiary-week-number-collapse',
      },
      useCase: {
        role: 'Clinic staff and patients in date-based workflows',
        primaryTask: 'Choose or review a date or date range with clear constraints.',
        dataModel: 'Date, date array, or from/to date range supplied by the owning workflow.',
        safety: 'The primitive communicates unavailable dates and preserves read-only context; appointment, pricing, and clinical permission rules remain in the owning composition.',
        outOfScope: 'Time slots, appointments, event lists, pricing, presets, and picker popovers.',
      },
      exclusions: [
        'Preset and time-selection demos were excluded from the primitive; they belong to a date-and-time composition with a real workflow contract.',
        'Pricing, appointment, and event-list demos were excluded from the primitive; availability and consequences belong to the owning clinic feature.',
        'Date-picker and range-picker demos were excluded from the primitive; they require canonical field, popover, focus, and form-validation contracts.',
        'Foreign icon imports and upstream utility classes were replaced with Kura icon exports, semantic tokens, and the canonical Button/IconButton primitives.',
      ],
    },
    docs: {
      description: {
        component:
          'An accessible date-grid primitive for selecting or reviewing dates. Keep domain data such as appointments, availability, pricing, and time slots in the owning composition so the calendar remains reusable and safe.',
      },
    },
  },
  argTypes: {
    mode: { control: 'radio', options: ['single', 'multiple', 'range'] },
    captionLayout: { control: 'radio', options: ['label', 'dropdown', 'dropdown-years'] },
    navigation: { control: 'radio', options: ['split', 'right'] },
    showOutsideDays: { control: 'boolean' },
    showWeekNumber: { control: 'boolean' },
    numberOfMonths: { control: { type: 'number', min: 1, max: 3, step: 1 } },
    readOnly: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultMonth: referenceMonth,
    defaultSelected: selectedDate,
    today: referenceToday,
    'aria-label': 'Select a review date',
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<CalendarRange>({
      from: new Date(2026, 6, 9),
      to: new Date(2026, 6, 15),
    });

    return (
      <Calendar
        mode="range"
        defaultMonth={referenceMonth}
        selected={range}
        onSelect={(selection) => setRange((selection as CalendarRange | undefined) ?? {})}
        today={referenceToday}
        aria-label="Select a review date range"
      />
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<CalendarSelection>([
      new Date(2026, 6, 8),
      new Date(2026, 6, 15),
    ]);

    return (
      <Calendar
        mode="multiple"
        defaultMonth={referenceMonth}
        selected={dates}
        onSelect={(selection) => setDates(selection)}
        today={referenceToday}
        aria-label="Select multiple review dates"
      />
    );
  },
};

export const DisabledDates: Story = {
  render: () => (
    <Calendar
      mode="range"
      defaultMonth={referenceMonth}
      defaultSelected={{ from: new Date(2026, 6, 6), to: new Date(2026, 6, 10) }}
      disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      today={referenceToday}
      aria-label="Select weekdays only"
    />
  ),
};

export const CaptionLayouts: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-6 md:grid-cols-3">
      <Calendar defaultMonth={referenceMonth} today={referenceToday} aria-label="Month caption" />
      <Calendar
        captionLayout="dropdown"
        defaultMonth={referenceMonth}
        today={referenceToday}
        fromYear={2024}
        toYear={2028}
        aria-label="Month and year selectors"
      />
      <Calendar
        captionLayout="dropdown-years"
        defaultMonth={referenceMonth}
        today={referenceToday}
        fromYear={2024}
        toYear={2028}
        aria-label="Year selector"
      />
    </div>
  ),
};

export const NavigationAndToday: Story = {
  args: {
    defaultMonth: new Date(2026, 3, 1),
    defaultSelected: new Date(2026, 3, 21),
    navigation: 'right',
    showTodayButton: true,
    today: referenceToday,
    'aria-label': 'Navigate to a review date',
  },
};

export const WeekNumbers: Story = {
  args: {
    defaultMonth: referenceMonth,
    showOutsideDays: true,
    showWeekNumber: true,
    today: referenceToday,
    'aria-label': 'Calendar with week numbers',
  },
};

export const TwoMonthRange: Story = {
  render: () => {
    const [range, setRange] = useState<CalendarRange>({ from: new Date(2026, 6, 27) });

    return (
      <div className="w-full max-w-3xl">
        <Calendar
          mode="range"
          numberOfMonths={2}
          defaultMonth={referenceMonth}
          selected={range}
          onSelect={(selection) => setRange((selection as CalendarRange | undefined) ?? {})}
          today={referenceToday}
          aria-label="Select a date range across two months"
        />
      </div>
    );
  },
};

export const CustomDayContent: Story = {
  render: () => (
    <Calendar
      defaultMonth={referenceMonth}
      today={referenceToday}
      renderDay={(date, modifiers) => (
        <>
          <span>{date.getDate()}</span>
          {!modifiers.outside && date.getDate() % 5 === 0 ? (
            <span className="size-1 rounded-full bg-primary" aria-hidden="true" />
          ) : null}
        </>
      )}
      aria-label="Calendar with day markers"
    />
  ),
};

export const ConstraintsAndReadOnly: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <Calendar
        defaultMonth={referenceMonth}
        minDate={new Date(2026, 6, 8)}
        maxDate={new Date(2026, 6, 24)}
        today={referenceToday}
        aria-label="Select a date within the review window"
      />
      <Calendar
        defaultMonth={referenceMonth}
        defaultSelected={selectedDate}
        readOnly
        today={referenceToday}
        aria-label="Read-only review date"
      />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    defaultMonth: referenceMonth,
    loading: true,
    today: referenceToday,
    showTodayButton: true,
    'aria-label': 'Loading available dates',
  },
};

export const NoAvailableDates: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Calendar
        defaultMonth={referenceMonth}
        disabled={() => true}
        today={referenceToday}
        aria-label="No dates available"
      />
      <p className="k-caption">No dates are available in this month.</p>
    </div>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-6 lg:grid-cols-3">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex min-w-0 flex-col gap-2">
          <span className="k-label">{density}</span>
          <Calendar defaultMonth={referenceMonth} today={referenceToday} aria-label={`${density} density calendar`} />
        </div>
      ))}
    </div>
  ),
};

export const LocaleAndWeekStart: Story = {
  args: {
    defaultMonth: referenceMonth,
    locale: 'en-GB',
    weekStartsOn: 1,
    today: referenceToday,
    'aria-label': 'Calendar using a Monday week start',
  },
};

export const MobileDefault: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <div className="w-full max-w-sm">
      <Calendar
        mode="range"
        defaultMonth={referenceMonth}
        defaultSelected={{ from: new Date(2026, 6, 6), to: new Date(2026, 6, 10) }}
        today={referenceToday}
        showTodayButton
        aria-label="Mobile review date range"
      />
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="k-body-sm">Use arrow keys to move, Page Up or Page Down to change months, and Enter to select.</p>
      <Calendar
        defaultMonth={referenceMonth}
        defaultSelected={selectedDate}
        today={referenceToday}
        aria-label="Keyboard accessible review date calendar"
      />
    </div>
  ),
};
