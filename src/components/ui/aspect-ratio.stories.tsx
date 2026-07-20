import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AspectRatio, ImageIcon, SpinnerGapIcon } from './index';

const ratios = [
  { label: '16:9', ratio: 16 / 9 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '1:1', ratio: 1 },
  { label: '21:9', ratio: 21 / 9 },
  { label: '9:16', ratio: 9 / 16 },
  { label: '3:2', ratio: 3 / 2 },
  { label: '4:5', ratio: 4 / 5 },
  { label: '16:10', ratio: 16 / 10 },
] as const;

function MediaSpecimen({ label }: { label: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] rounded-[var(--radius-card-surface)] border border-border bg-muted p-[var(--space-inset-control)] text-muted-foreground">
      <ImageIcon aria-hidden="true" />
      <span className="k-caption">{label}</span>
    </div>
  );
}

const meta = {
  title: 'Design System/Primitives/Aspect Ratio',
  component: AspectRatio,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The fresh Storybook and source search found no layout primitive that reserves a responsive media area. The ReUI family establishes a small, reusable missing foundation without introducing media styling or domain content.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-aspect-ratio-1 through c-aspect-ratio-8',
        sourceUrl: 'https://reui.io/components/aspect-ratio',
      },
      binding: {
        colors: 'consumer-owned',
        typography: 'consumer-owned',
        spacing: 'kura-story-composition',
        radius: 'consumer-owned',
        elevation: 'none',
        icons: 'kura-story-only',
        density: 'inherited',
        responsive: 'fluid-ratio-preservation',
      },
      useCase: {
        role: 'Any Kura user viewing a workflow-owned image, document preview, or video surface',
        primaryTask: 'Keep media dimensions stable while content loads or available width changes.',
        dataModel: 'A positive width-to-height ratio and consumer-owned media content.',
        safety: 'The primitive never crops, hides, labels, or interprets clinical media; the owning feature controls accessibility, privacy, and media actions.',
        outOfScope: 'Image upload, media permissions, crop controls, image loading, video playback, lightboxes, and clinical media interpretation.',
      },
      exclusions: [
        'Upstream gallery, card, badge-overlay, hover-action, and lightbox compositions are excluded because they require their own data, permission, and interaction contracts.',
        'The primitive does not impose border, radius, object-fit, or image-loading styling; those are responsibilities of the consuming media component.',
      ],
    },
    docs: {
      description: {
        component:
          'A visual-neutral layout primitive that reserves a stable width-to-height area. Use it for media when a fixed proportion prevents layout shift; keep media semantics, crop behavior, and privacy rules in the consuming component.',
      },
    },
  },
  argTypes: {
    ratio: { control: { type: 'number', min: 0.1, max: 4, step: 0.1 } },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9}><MediaSpecimen label="16:9 media surface" /></AspectRatio>
    </div>
  ),
};

export const RatioMatrix: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-2 gap-[var(--space-inset-card)] sm:grid-cols-3 lg:grid-cols-4">
      {ratios.map(({ label, ratio }) => (
        <AspectRatio key={label} ratio={ratio}><MediaSpecimen label={label} /></AspectRatio>
      ))}
    </div>
  ),
};

export const LoadingReserve: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AspectRatio ratio={4 / 3}>
        <div className="flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] rounded-[var(--radius-card-surface)] border border-border bg-muted text-muted-foreground" role="status" aria-live="polite">
          <SpinnerGapIcon aria-hidden="true" />
          <span className="k-caption">Preparing secure media preview</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const CustomRatio: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AspectRatio ratio={5 / 2}><MediaSpecimen label="Custom 5:2 media surface" /></AspectRatio>
    </div>
  ),
};

export const MobileReference: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="w-full">
      <AspectRatio ratio={16 / 9}><MediaSpecimen label="Responsive 16:9 preview" /></AspectRatio>
    </div>
  ),
};
