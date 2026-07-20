import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import {
  CheckIcon,
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from './index';
import styles from './intake-components.stories.module.css';

const EVENTS = [
  { date: '08:42', title: 'Patient arrived', content: 'Identity confirmed at reception.' },
  { date: '08:48', title: 'Booking reviewed', content: 'Clinic, tests, and payment route confirmed.' },
  { date: '09:03', title: 'Ready for collection', content: 'Patient is waiting in collection room 2.' },
  { date: 'Pending', title: 'Collection completed', content: 'No collection event has been recorded yet.' },
];

function OperationalTimeline({ orientation = 'vertical' }: { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <Timeline aria-label="Appointment activity" className={styles.timelineFrame} orientation={orientation} value={3}>
      {EVENTS.map((event, index) => {
        const step = index + 1;
        return (
          <TimelineItem key={event.title} step={step}>
            <TimelineHeader>
              <TimelineDate>{event.date}</TimelineDate>
              <TimelineTitle>{event.title}</TimelineTitle>
            </TimelineHeader>
            <TimelineIndicator>{step < 3 ? <CheckIcon /> : null}</TimelineIndicator>
            <TimelineSeparator />
            <TimelineContent>{event.content}</TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

const meta = {
  title: 'Design System/Components/Timeline',
  component: Timeline,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/timeline', registryStyle: 'base-nova' },
      intake: {
        decision: 'CREATE-from-ReUI-architecture',
        owner: 'src/components/ui',
        evidence: 'No canonical generic event sequence existed. ReUI supplied the orientation and compound anatomy; Kura changed the root to an ordered list, items to list items, and dates to time elements.',
        exclusions: ['The upstream onValueChange API is excluded because no timeline part invokes it.', 'Domain-specific status, permissions, and actions belong to feature compositions.'],
      },
      binding: { colors: 'kura-neutral-brand', typography: 'kura', spacing: 'kura', radius: 'kura', elevation: 'none', icons: 'kura-canonical-check', motion: 'none' },
    },
    docs: {
      description: {
        component: 'A semantic ordered history or progress sequence. Use Stepper when the user can navigate steps; use Timeline for events that are read rather than controlled.',
      },
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => <OperationalTimeline />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('list', { name: 'Appointment activity' })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    await expect(canvas.getByText('Ready for collection').closest('li')).toHaveAttribute('aria-current', 'step');
  },
};

export const Horizontal: Story = {
  args: { children: null },
  render: () => <OperationalTimeline orientation="horizontal" />,
};

export const LongContent: Story = {
  args: { children: null },
  render: () => (
    <Timeline aria-label="Specimen activity" className={styles.timelineFrame} value={2}>
      <TimelineItem step={1}>
        <TimelineHeader><TimelineDate dateTime="2026-07-17T09:04:00+07:00">17 Jul · 09:04</TimelineDate><TimelineTitle>Specimen received</TimelineTitle></TimelineHeader>
        <TimelineIndicator><CheckIcon /></TimelineIndicator><TimelineSeparator />
        <TimelineContent>Received at the central laboratory with the patient identifier, collection time, collector, tube type, transport condition, and requested test panel intact.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineHeader><TimelineDate dateTime="2026-07-17T09:18:00+07:00">17 Jul · 09:18</TimelineDate><TimelineTitle>Accession review in progress</TimelineTitle></TimelineHeader>
        <TimelineIndicator /><TimelineSeparator />
        <TimelineContent>The accession team is reconciling a long test name and checking whether the available volume supports every requested assay.</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const MissingDate: Story = {
  args: { children: null },
  render: () => (
    <Timeline aria-label="Referral activity" className={styles.timelineFrame} value={1}>
      <TimelineItem step={1}>
        <TimelineHeader><TimelineDate>Date unavailable</TimelineDate><TimelineTitle>External referral received</TimelineTitle></TimelineHeader>
        <TimelineIndicator /><TimelineSeparator />
        <TimelineContent>The source system did not provide an event timestamp.</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const MobileNarrow: Story = {
  args: { children: null },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <OperationalTimeline />,
};
