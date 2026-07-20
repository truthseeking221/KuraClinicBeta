import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import { Badge, DragIcon, Sortable, SortableItem, SortableItemHandle } from './index';
import styles from './intake-components.stories.module.css';

type QueueField = {
  id: string;
  label: string;
  detail: string;
};

const INITIAL_FIELDS: QueueField[] = [
  { id: 'identity', label: 'Patient identity', detail: 'Name, date of birth, and identifier' },
  { id: 'booking', label: 'Booking context', detail: 'Clinic, time, and appointment type' },
  { id: 'payment', label: 'Payment status', detail: 'Outstanding balance and payment method' },
];

function SortableFields({ disabledId, strategy = 'vertical' }: { disabledId?: string; strategy?: 'vertical' | 'grid' }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  return (
    <Sortable
      aria-label="Queue field order"
      className={styles.frame}
      getItemValue={(item) => item.id}
      onValueChange={setFields}
      strategy={strategy}
      value={fields}
    >
      {fields.map((field, index) => (
        <SortableItem disabled={field.id === disabledId} key={field.id} value={field.id}>
          <SortableItemHandle aria-label={`Reorder ${field.label}`}>
            <DragIcon aria-hidden="true" />
          </SortableItemHandle>
          <div className={styles.sortableCopy}>
            <p className={styles.itemTitle}>{field.label}</p>
            <p className={styles.itemMeta}>{field.detail}</p>
          </div>
          <Badge variant="neutral">{index + 1}</Badge>
        </SortableItem>
      ))}
    </Sortable>
  );
}

const meta = {
  title: 'Design System/Components/Sortable',
  component: Sortable,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'ReUI', registryItem: '@reui/sortable', registryStyle: 'base-nova' },
      intake: {
        decision: 'CREATE-from-ReUI-architecture',
        owner: 'src/components/ui',
        evidence: 'No Kura owner existed. The registry source supplied dnd-kit sensors, ordering, overlay, and layout strategy behavior; Kura moved keyboard attributes to the actual handle and rebound all presentation.',
        exclusions: ['The stale documented layout prop is excluded; the frozen registry API uses strategy.', 'The undocumented public SortableOverlay is excluded because the root already supplies one overlay.', 'File upload and image gallery remain feature compositions.'],
      },
      binding: { colors: 'kura-neutral', typography: 'kura', spacing: 'kura', radius: 'kura', elevation: 'drag-overlay-only', icons: 'kura-canonical-drag', motion: 'dnd-runtime-positioning-plus-kura-transitions' },
    },
    docs: {
      description: {
        component: 'Reorders a user-owned list with mouse, touch, or keyboard. Every item needs a clearly named SortableItemHandle; do not use reordering when order has a fixed clinical or regulatory meaning.',
      },
    },
  },
} satisfies Meta<typeof Sortable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null, getItemValue: () => '', onValueChange: () => undefined, value: [] },
  render: () => <SortableFields />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('button', { name: 'Reorder Patient identity' });
    handle.focus();
    await expect(handle).toHaveFocus();
    await expect(canvas.getByRole('list', { name: 'Queue field order' })).toBeVisible();
  },
};

export const KeyboardReorder: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('button', { name: 'Reorder Patient identity' });
    handle.focus();
    await userEvent.keyboard(' ');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    const items = canvas.getAllByRole('listitem');
    await expect(items[1]).toHaveTextContent('Patient identity');
  },
};

export const Grid: Story = {
  args: Default.args,
  render: () => <SortableFields strategy="grid" />,
};

export const NestedComposition: Story = {
  args: Default.args,
  render: function NestedSortable() {
    const [sections, setSections] = useState([
      { id: 'arrival', label: 'Arrival details' },
      { id: 'review', label: 'Review details' },
    ]);
    return (
      <Sortable aria-label="Form section order" className={styles.frame} getItemValue={(item) => item.id} onValueChange={setSections} value={sections}>
        {sections.map((section) => (
          <SortableItem key={section.id} value={section.id}>
            <SortableItemHandle aria-label={`Reorder ${section.label}`}><DragIcon aria-hidden="true" /></SortableItemHandle>
            <div className={styles.nestedGroup}>
              <p className={styles.itemTitle}>{section.label}</p>
              <div className={styles.nestedList}>
                <SortableFields />
              </div>
            </div>
          </SortableItem>
        ))}
      </Sortable>
    );
  },
};

export const DisabledItem: Story = {
  args: Default.args,
  render: () => <SortableFields disabledId="identity" />,
};

export const MobileTouch: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <SortableFields />,
};
