import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Progress } from './index';

const meta = {
  title: 'Design System/Components/Progress',
  component: Progress,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'ReUI', registryItem: 'progress', familySize: 6 },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'Upload used a native progress element locally, but Kura had no reusable determinate or indeterminate progress owner with label and value semantics.' },
      binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura-pill', motion: 'kura-progress-and-reduced-motion', responsive: 'fluid' },
      exclusions: [{ capability: 'Circular progress', reason: 'A circular indicator has different geometry and space semantics; the requested ReUI family is linear.' }],
    },
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Uploading referral documents', showValue: true, value: 64 }, play: async ({ canvasElement }) => { await expect(within(canvasElement).getByRole('progressbar')).toHaveAttribute('aria-valuenow', '64'); } };
export const Compact: Story = { args: { label: 'Profile complete', showValue: true, size: 'sm', value: 82 } };
export const Complete: Story = { args: { label: 'Import complete', showValue: true, value: 100 } };
export const Indeterminate: Story = { args: { 'aria-label': 'Checking eligibility', value: null } };
export const Mobile: Story = { args: { label: 'Uploading', showValue: true, value: 38 }, parameters: { viewport: { defaultViewport: 'kura320' } } };
