import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { TubeLabeling } from './tube-labeling';
import type { TubeLabelMethod, TubeLabelPhotoCheck } from './types';

const TUBE_KEYS = ['red', 'gold-sst', 'green', 'lavender'];

function Harness({ initialMethod = 'sticker' }: { initialMethod?: TubeLabelMethod }) {
  const [method, setMethod] = useState<TubeLabelMethod>(initialMethod);
  const [photoChecks, setPhotoChecks] = useState<TubeLabelPhotoCheck>({
    applied: false,
    readable: false,
    photographed: false,
  });
  return (
    <TubeLabeling
      method={method}
      onConfirm={() => {}}
      onMethodChange={setMethod}
      onPhotoChecksChange={setPhotoChecks}
      patientLabelLine="SOK · M · 1994"
      photoChecks={photoChecks}
      tubeKeys={TUBE_KEYS}
    />
  );
}

const meta = {
  title: 'Clinic/Collection/Tube Labeling',
  component: TubeLabeling,
  tags: ['autodocs', 'source-figma', 'adapted-kura'],
  args: {
    method: 'sticker',
    onConfirm: () => {},
    onMethodChange: () => {},
    onPhotoChecksChange: () => {},
    patientLabelLine: 'SOK · M · 1994',
    photoChecks: { applied: false, readable: false, photographed: false },
    tubeKeys: TUBE_KEYS,
  },
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.collection,
      source: {
        figma:
          'https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177',
        node: '1485:93177',
      },
      intake: {
        decision: 'CREATE',
        owner: 'src/features/collection',
        evidence:
          'No Kura surface covers labelling after a self-draw. The legacy phlebotomy kiosk had a "Print barcode labels" button with no handler at all.',
        exclusions: [
          'Tube stoppers reuse the CLSI catalog colours already owned by Collection; no new specimen vocabulary.',
          'The sticker route asks for photo confirmation rather than uploading a file: the platform has no attachment contract for specimen evidence.',
          'The self-draw lane maps to the backend `tube_pickup` booking type, which shipped guards currently reject — this is design intent, not live capability.',
        ],
      },
      composes: ['Card', 'RadioGroup', 'Radio', 'Checkbox', 'Badge', 'Button'],
    },
    docs: {
      description: {
        component:
          'After a doctor draws blood in the room, the label is the only thing tying the tubes to the order — no wristband was scanned and no desk checked the patient in. A printed Kura sticker keeps that link machine-readable; handwriting stays available for a clinic without stickers and carries a photo check instead, because nothing downstream can verify a pen stroke.',
      },
    },
  },
} satisfies Meta<typeof TubeLabeling>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StickerRoute: Story = {
  render: () => <Harness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('4 samples collected')).toBeVisible();
    await expect(canvas.getByText('Recommended')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'I have labelled all 4 tubes' })).toBeDisabled();
  },
};

export const StickerRouteConfirmed: Story = {
  render: () => <Harness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const label of [
      'A Kura sticker is on every tube',
      'The name and date read clearly in the photo',
      'Photo of the labelled tubes attached to the order',
    ]) {
      await userEvent.click(canvas.getByRole('checkbox', { name: label }));
    }
    await expect(canvas.getByRole('button', { name: 'I have labelled all 4 tubes' })).toBeEnabled();
  },
};

export const HandwrittenRoute: Story = {
  render: () => <Harness initialMethod="pen" />,
  parameters: {
    docs: {
      description: {
        story:
          'The template is what the operator copies onto each tube: surname, sex, birth year — enough to match a tube to one person without printing the record on it.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('SOK · M · 1994')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'I have labelled all 4 tubes' })).toBeEnabled();
  },
};

export const SingleTube: Story = {
  render: function SingleTubeHarness() {
    const [method, setMethod] = useState<TubeLabelMethod>('pen');
    return (
      <TubeLabeling
        method={method}
        onConfirm={() => {}}
        onMethodChange={setMethod}
        onPhotoChecksChange={() => {}}
        patientLabelLine="SOK · M · 1994"
        photoChecks={{ applied: false, readable: false, photographed: false }}
        tubeKeys={['lavender']}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1 sample collected')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'I have labelled the tube' })).toBeEnabled();
  },
};

export const Mobile320: Story = {
  render: () => <Harness />,
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
