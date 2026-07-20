import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { FieldSeparator, MoneyText, Separator } from './index';
import storyStyles from './separator.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Separator',
  component: Separator,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Field, Item, menu, breadcrumb, and stepper separators are contract-specific. No visual-neutral primitive existed for arbitrary adjacent content groups.',
        exclusions: [
          {
            reuiExample: 'c-separator-5 centered text label',
            reason: 'A labelled divider has form or composition semantics beyond a visual boundary.',
            replacement: 'Use the existing FieldSeparator for labelled form divisions.',
          },
          {
            reuiExamples: 'Menu, Item, Breadcrumb, and Stepper boundaries',
            reason: 'Those owners already provide contract-specific separators with the correct DOM and spacing.',
            replacement: 'Use the separator exported by the owning composite.',
          },
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-separator-1 through c-separator-6',
        sourceUrl: 'https://reui.io/components/separator',
      },
      binding: {
        colors: 'kura-border',
        spacing: 'consumer-owned',
        radius: 'none',
        elevation: 'none',
        icons: 'none',
        responsive: 'orientation-explicit',
      },
    },
    docs: {
      description: {
        component:
          'A quiet visual boundary for arbitrary content groups. It is decorative by default; set decorative={false} only when the boundary itself conveys document structure to assistive technology.',
      },
    },
  },
  argTypes: {
    decorative: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <div>
        <h3 className={storyStyles.sectionTitle}>Result verification</h3>
        <p className={storyStyles.body}>Verified by the assigned laboratory reviewer.</p>
      </div>
      <Separator />
      <p className={storyStyles.body}>The result is ready for clinical acknowledgement.</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className={storyStyles.inline}>
      <span>Today</span>
      <Separator orientation="vertical" />
      <span>Verified</span>
      <Separator orientation="vertical" />
      <span>Final</span>
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div className={`${storyStyles.stack} ${storyStyles.semanticFrame}`}>
      <p className={storyStyles.body}>Current encounter</p>
      <Separator aria-label="Previous encounters" decorative={false} />
      <p className={storyStyles.body}>Earlier encounters</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('separator', { name: 'Previous encounters' })).toBeVisible();
  },
};

export const OrderSummary: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <div className={storyStyles.summaryRow}><span className={storyStyles.body}>Subtotal</span><MoneyText currency="USD" minor="4900" /></div>
      <div className={storyStyles.summaryRow}><span className={storyStyles.body}>Service fee</span><MoneyText currency="USD" minor="500" /></div>
      <Separator />
      <div className={storyStyles.summaryRow}><span className={storyStyles.sectionTitle}>Total</span><MoneyText currency="USD" minor="5400" /></div>
    </div>
  ),
};

export const LabelledFormDivisionUsesFieldSeparator: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <FieldSeparator>or continue with</FieldSeparator>
    </div>
  ),
};
