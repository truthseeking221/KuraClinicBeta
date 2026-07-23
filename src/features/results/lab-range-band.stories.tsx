import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  HBA1C_RANGE,
  HDL_RANGE,
  URINE_PROTEIN_RANGE,
  fiveZoneRange,
} from './demo-data';
import { LabRangeBand } from './lab-range-band';
import styles from './results.stories.module.css';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Results/Range Band',
  component: LabRangeBand,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: RESULTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Single released-result comparison against the applicable catalog tiers. Zone labels come from each real range; the component never assumes a fixed five-zone legend.',
      },
    },
  },
} satisfies Meta<typeof LabRangeBand>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIVE_ZONE = fiveZoneRange([40, 60, 100, 140]);

export const Normal: Story = {
  args: { range: FIVE_ZONE, value: { kind: 'numeric', value: 75 } },
};

export const AbnormalHigh: Story = {
  args: { range: FIVE_ZONE, value: { kind: 'numeric', value: 118 } },
};

export const CriticalPanicBound: Story = {
  name: 'Critical — explicit panic bound',
  args: { range: FIVE_ZONE, value: { kind: 'numeric', value: 151 } },
};

export const ThreeTierClassification: Story = {
  name: 'Three tiers — HbA1c diabetes classification remains abnormal',
  args: { range: HBA1C_RANGE, value: { kind: 'numeric', value: 7.1 } },
};

export const MultipleAdjacentNormalTiers: Story = {
  name: 'Multiple adjacent normal tiers — HDL protective',
  args: { range: HDL_RANGE, value: { kind: 'numeric', value: 72 } },
};

export const QualitativeExactMatch: Story = {
  args: { range: URINE_PROTEIN_RANGE, value: { kind: 'text', value: 'Trace' } },
};

export const QualitativeUnmappedValue: Story = {
  name: 'Qualitative value not mapped to a catalog tier',
  args: { range: URINE_PROTEIN_RANGE, value: { kind: 'text', value: 'Pending comment' } },
};

export const UnboundedEdgeValue: Story = {
  args: { range: HBA1C_RANGE, value: { kind: 'numeric', value: 9.8 } },
  parameters: {
    docs: {
      description: {
        story:
          'The marker stays centered inside an open-ended tier because the scale outside the last bound is not linear.',
      },
    },
  },
};

export const ScaleOnly: Story = {
  args: { range: FIVE_ZONE },
};

export const WithoutTicks: Story = {
  args: { range: FIVE_ZONE, value: { kind: 'numeric', value: 92 }, showTicks: false },
};

export const StandaloneWithValue: Story = {
  name: 'Standalone — measured value rides the marker',
  args: {
    range: FIVE_ZONE,
    value: { kind: 'numeric', value: 118, display: '118 mg/dL' },
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'For the band used outside a result row: the measured value prints above the marker so the reading needs no second column. Rows that already show the value keep showValue off.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: { range: FIVE_ZONE, value: { kind: 'numeric', value: 92 }, size: 'sm' },
};

export const NarrowContainer: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { range: FIVE_ZONE, value: { kind: 'numeric', value: 118 } },
  render: (args) => (
    <div className={`${styles.frame} ${styles.w288}`}>
      <LabRangeBand {...args} />
    </div>
  ),
};
