import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useRef, useState } from 'react';

import { Button } from '../../components/ui';

import { DEMO_QUEUE } from './demo-data';
import { DeferDialog } from './defer-dialog';
import type { Sample } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const defaultSample = DEMO_QUEUE[0].samples[2];
const longContentSample: Sample = {
  ...DEMO_QUEUE[0].samples[1],
  tests: ['Lipid panel', 'Creatinine', 'ALT', 'AST', 'Triglycerides', 'HDL cholesterol'],
};

const storyArgs = {
  onClose: () => {},
  onConfirm: () => {},
  sample: null,
};

const meta = {
  title: 'Clinic/Collection/Defer Draw Dialog',
  component: DeferDialog,
  args: storyArgs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    kura: {
      readiness: READINESS.collection,
      owner: 'src/features/collection',
      journey: 'collection-defer',
      composition: [
        'Design System/Components/Alert Dialog',
        'Design System/Primitives/Select',
        'Design System/Primitives/Textarea',
        'Design System/Primitives/Button',
      ],
      primaryTask: 'Record why one tube is deferred and preserve useful context for the next attempt.',
      safety: 'A reason is required before the deferral can be saved; the sample identity remains visible in the blocking dialog.',
      responsive: 'dialog-fluid-mobile-action-stacking',
    },
    docs: {
      description: {
        component:
          'Feature-owned collection workflow dialog. It composes canonical Kura primitives and records a reason plus optional next-attempt context.',
      },
    },
  },
} satisfies Meta<typeof DeferDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DeferDialogPlayground({
  initialSample = defaultSample,
}: {
  initialSample?: Sample;
}) {
  const [sample, setSample] = useState<Sample | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setNotice(null);
          setSample(initialSample);
        }}
        ref={triggerRef}
        variant="outline"
      >
        Defer sample
      </Button>
      <DeferDialog
        onClose={() => setSample(null)}
        onConfirm={(reason, note) => {
          setNotice(`Deferred ${initialSample.id} — ${reason}${note ? ` — ${note}` : ''}`);
          setSample(null);
        }}
        restoreFocusRef={triggerRef}
        sample={sample}
      />
      {notice ? (
        <p aria-live="polite" role="status">
          {notice}
        </p>
      ) : null}
    </div>
  );
}

export const Default: Story = {
  render: () => <DeferDialogPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Defer sample' });

    await userEvent.click(trigger);
    const dialog = await canvas.findByRole('alertdialog', { name: 'Defer this draw?' });
    await expect(dialog).toBeVisible();
    await expect(canvas.getByText(defaultSample.id)).toBeVisible();

    const action = canvas.getByRole('button', { name: 'Defer draw' });
    await expect(action).toBeDisabled();

    await userEvent.selectOptions(
      canvas.getByRole('combobox', { name: 'Reason' }),
      'Difficult vein',
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Note for the next attempt (optional)' }),
      'Use the left arm and allow the patient to pause before the next attempt.',
    );
    await expect(action).toBeEnabled();
    await userEvent.click(action);
    await expect(canvas.getByRole('status')).toHaveTextContent('Difficult vein');
  },
};

export const CancelRestoresFocus: Story = {
  render: () => <DeferDialogPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Defer sample' });

    await userEvent.click(trigger);
    const dialog = canvas.getByRole('alertdialog', { name: 'Defer this draw?' });
    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await expect(dialog).not.toHaveAttribute('open');
    await expect(trigger).toHaveFocus();
  },
};

export const EscapeClosesSafely: Story = {
  render: () => <DeferDialogPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Defer sample' }));
    await userEvent.keyboard('{Escape}');
    await expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument();
  },
};

export const LongSampleContext: Story = {
  render: () => <DeferDialogPlayground initialSample={longContentSample} />,
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <DeferDialogPlayground />,
};
