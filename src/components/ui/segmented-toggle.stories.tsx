import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { CalendarIcon, ClockIcon, HistoryIcon, SegmentedToggle, UserMultipleIcon } from './index';

const meta = {
  title: 'Design System/Patterns/SegmentedToggle',
  component: SegmentedToggle,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'Kura keeps radiogroup semantics for mutually-exclusive modes while adopting Kura track, selected surface, and compact density.',
      },
      source: {
        vendor: 'Kura',
        registryItem: 'segmented-control',
        visualReference: 'Kura segmented-control',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'delegated-to-kura-button',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-level-2 selected surface and focus ring',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'fluid under 480px with coarse-pointer touch targets',
      },
      exclusions: [
        {
          capability: 'Multi-select checkbox group',
          reason: 'Kura uses ChoiceList for multi-select choices so labels, validation, and consequences remain explicit.',
          replacement: 'Use the canonical ChoiceList owner when more than one option may be selected.',
        },
        {
          capability: 'Navigation tabs',
          reason: 'Tabs represent peer sections, while SegmentedToggle changes a compact mode or filter in the current context.',
          replacement: 'Use Tabs for view navigation and ButtonGroup for non-selecting action composition.',
        },
      ],
    },
  },
} satisfies Meta<typeof SegmentedToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const viewOptions = [
  { value: 'overview', label: 'Overview' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'audit', label: 'Audit' },
] as const;

export const Default: Story = {
  args: {
    label: 'Visit detail mode',
    options: viewOptions,
    defaultValue: 'overview',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const timeline = canvas.getByRole('radio', { name: 'Timeline' });
    await userEvent.click(timeline);
    await expect(timeline).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard('{ArrowLeft}');
    await expect(canvas.getByRole('radio', { name: 'Overview' })).toHaveAttribute('aria-checked', 'true');
  },
};

export const FilterMode: Story = {
  args: {
    label: 'Result filter mode',
    options: [
      { value: 'all', label: 'All results' },
      { value: 'review', label: 'Needs review' },
    ],
    defaultValue: 'all',
  },
};

/** Kura segmented-control finish with canonical Kura icons and mode semantics. */
export const WithIcons: Story = {
  args: {
    label: 'Reporting period',
    options: [
      { value: 'daily', label: 'Daily', leadingIcon: <CalendarIcon aria-hidden="true" size={14} /> },
      { value: 'weekly', label: 'Weekly', leadingIcon: <HistoryIcon aria-hidden="true" size={14} /> },
      { value: 'monthly', label: 'Monthly', leadingIcon: <UserMultipleIcon aria-hidden="true" size={14} /> },
      { value: 'yearly', label: 'Yearly', leadingIcon: <ClockIcon aria-hidden="true" size={14} /> },
    ],
    defaultValue: 'monthly',
  },
  render: (args) => (
    <div className="w-80 max-w-full">
      <SegmentedToggle {...args} />
    </div>
  ),
};

export const DisabledOption: Story = {
  args: {
    label: 'Visit detail mode',
    options: [
      { value: 'overview', label: 'Overview' },
      { value: 'timeline', label: 'Timeline', disabled: true },
      { value: 'audit', label: 'Audit' },
    ],
    defaultValue: 'overview',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable mode',
    options: viewOptions,
    defaultValue: 'overview',
    disabled: true,
  },
};

export const MobileLongLabels: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    label: 'Consultation record mode',
    options: [
      { value: 'current', label: 'Current consultation' },
      { value: 'previous', label: 'Previous consultations' },
    ],
    defaultValue: 'current',
  },
};

export const DensityReference: Story = {
  args: {
    label: 'Density result mode',
    options: viewOptions,
  },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <SegmentedToggle label={`${density} result mode`} options={viewOptions} />
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>
      ))}
    </div>
  ),
};

/** Form-field presentation: `labelVisible` renders the accessible name above the segments. */
export const VisibleLabel: Story = {
  args: {
    label: 'Sex at birth',
    labelVisible: true,
    options: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sex at birth')).toBeVisible();
    await expect(canvas.getByRole('radiogroup', { name: 'Sex at birth' })).toBeInTheDocument();
  },
};

/** Controlled with no value yet: no segment pre-selected; selection only reflects real data. */
export const ControlledNoSelection: Story = {
  args: {
    label: 'Sex at birth',
    labelVisible: true,
    value: '',
    options: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const female = canvas.getByRole('radio', { name: 'Female' });
    const male = canvas.getByRole('radio', { name: 'Male' });
    await expect(female).toHaveAttribute('aria-checked', 'false');
    await expect(male).toHaveAttribute('aria-checked', 'false');
    await expect(female).toHaveAttribute('tabindex', '0');
  },
};
