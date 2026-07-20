import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Avatar, AvatarFallback, Badge, CheckIcon, XIcon } from './index';

const meta = {
  title: 'Design System/Primitives/Badge',
  component: Badge,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The existing Badge primitive already covered Kura status tones and density. The ReUI family adds solid/outline appearances, leading and trailing content, status dots, navigation rendering, and avatar pairing, so the canonical primitive was extended.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-badge-1 through c-badge-25',
        sourceUrl: 'https://reui.io/components/badge',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-flat',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'wrapping-and-mobile-stories',
      },
      exclusions: [
        'Dismissible badges were excluded: a status badge is non-interactive in Kura; removable filters belong to a future Tag or FilterChip contract.',
        'Arbitrary radius values were excluded: Kura badges use the canonical badge radius.',
        'Foreign icon libraries and flag-image demos were replaced by canonical Kura icon and identity composition patterns.',
      ],
    },
    docs: {
      canvas: {
        layout: 'centered',
        sourceState: 'none',
        withToolbar: 'none',
      },
      story: { inline: true },
      description: {
        component:
          'A compact, non-interactive status or metadata label for quick scanning. Keep the meaning explicit in text and pair color with a dot, icon, or surrounding context when status affects a clinical or operational decision.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['neutral', 'primary', 'secondary', 'outline', 'success', 'warning', 'danger', 'info', 'ai'],
    },
    appearance: { control: 'radio', options: ['soft', 'solid', 'outline'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Verification pending', variant: 'neutral', size: 'md' },
};

export const SemanticVariants: Story = {
  render: () => (
    <div className="flex max-w-sm flex-wrap items-center gap-2">
      <Badge variant="neutral">Verification pending</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Verified</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="danger">Sync error</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="ai">AI suggestion</Badge>
      <Badge variant="outline">Read-only</Badge>
    </div>
  ),
};

export const AppearanceMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" appearance="soft">Verified</Badge>
      <Badge variant="success" appearance="solid">Verified</Badge>
      <Badge variant="success" appearance="outline">Verified</Badge>
      <Badge variant="warning" appearance="soft">Needs review</Badge>
      <Badge variant="warning" appearance="solid">Needs review</Badge>
      <Badge variant="warning" appearance="outline">Needs review</Badge>
    </div>
  ),
};

export const SizesAndDensity: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex items-end gap-2">
        <Badge size="sm">Record</Badge>
        <Badge size="md">Record</Badge>
        <Badge size="lg">Record</Badge>
      </div>
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <Badge variant="warning">Needs review</Badge>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>
      ))}
    </div>
  ),
};

export const StatusDotsAndIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" dot>Verified</Badge>
      <Badge variant="warning" dot>Needs review</Badge>
      <Badge variant="outline" leading={<CheckIcon aria-hidden="true" />}>Acknowledged</Badge>
      <Badge variant="danger" trailing={<XIcon aria-hidden="true" />}>Sync error</Badge>
    </div>
  ),
};

export const AvatarPairing: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline" leading={<Avatar size="xs" aria-hidden="true"><AvatarFallback>JD</AvatarFallback></Avatar>}>
        Jordan Davis
      </Badge>
      <Badge variant="info" appearance="soft" trailing={<Avatar size="xs" aria-hidden="true"><AvatarFallback>MC</AvatarFallback></Avatar>}>
        Assigned reviewer
      </Badge>
    </div>
  ),
};

export const NavigationBadge: Story = {
  render: () => (
    <Badge as="a" href="#review-history" variant="info" appearance="outline">
      View review history
    </Badge>
  ),
};

export const LongMetadata: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Badge variant="warning" size="lg" dot>
        Awaiting laboratory specimen confirmation
      </Badge>
    </div>
  ),
};

export const OperationalStateMatrix: Story = {
  render: () => (
    <div className="flex max-w-sm flex-wrap items-center gap-2">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="warning">Pending review</Badge>
      <Badge variant="success">Completed</Badge>
      <Badge variant="danger">Failed</Badge>
      <Badge variant="outline">Read-only</Badge>
    </div>
  ),
};

export const MobileReference: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="flex w-full max-w-sm flex-wrap gap-2">
      <Badge variant="success" dot>Verified</Badge>
      <Badge variant="warning" dot>Pending review</Badge>
      <Badge variant="danger" dot>Sync error</Badge>
      <Badge variant="info" appearance="outline">Processing</Badge>
    </div>
  ),
};

const VARIANTS = ['neutral', 'primary', 'success', 'warning', 'danger', 'info', 'ai'] as const;
const APPEARANCES = ['soft', 'outline', 'solid'] as const;

/** The full tone × appearance grammar in one glance: soft is the default
 * reading, outline the lightest, solid the one salient chip per surface. */
export const FullMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {APPEARANCES.map((appearance) => (
        <div className="flex flex-wrap items-center gap-2" key={appearance}>
          <span className="w-14 text-xs text-muted-foreground">{appearance}</span>
          {VARIANTS.map((variant) => (
            <Badge appearance={appearance} key={variant} variant={variant}>
              {variant === 'ai' ? 'AI draft' : variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Counts align without opting in — the label ships tabular numerals. */
export const CountBadges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral" size="sm">3</Badge>
      <Badge variant="primary" size="sm">28</Badge>
      <Badge variant="danger" size="sm">99+</Badge>
      <Badge variant="warning">132 flagged</Badge>
      <Badge variant="success">18/18 passed</Badge>
    </div>
  ),
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  render: () => (
    <div className="flex flex-col gap-3">
      {APPEARANCES.map((appearance) => (
        <div className="flex flex-wrap items-center gap-2" key={appearance}>
          {VARIANTS.map((variant) => (
            <Badge appearance={appearance} dot={appearance === 'soft'} key={variant} variant={variant}>
              {variant === 'ai' ? 'AI draft' : variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
