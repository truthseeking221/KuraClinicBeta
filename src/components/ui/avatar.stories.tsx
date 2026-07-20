import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  CheckIcon,
  PlusIcon,
  UserPlusIcon,
} from './index';

const meta = {
  title: 'Design System/Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The existing Avatar primitive already covered image and fallback states. The ReUI family adds reusable groups, counts, status markers, tones, rings, loading, and muted-image treatment, so the canonical primitive was extended rather than duplicated.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-avatar-1 through c-avatar-35',
        sourceUrl: 'https://reui.io/components/avatar',
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
        'Arbitrary custom pixel sizes were excluded in favor of the canonical size scale.',
        'Decorative gradient story rings were excluded because they add motion and color without a Kura workflow meaning.',
        'Dropdown, tooltip, and button compositions remain owned by their respective canonical components when those components are available.',
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
          'A resilient identity marker for patients and staff. Use an accessible image with initials or the canonical profile icon as a fallback. Presence, review, and loading states must remain explicit and must not replace identity verification.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'radio', options: ['circle', 'rounded'] },
    fallbackTone: {
      control: 'radio',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info', 'ai'],
    },
    ring: {
      control: 'radio',
      options: ['none', 'neutral', 'brand', 'success', 'warning', 'danger', 'info', 'ai'],
    },
    ringAnimation: { control: 'radio', options: ['none', 'pulse'] },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const profileImage = '/window.svg';

export const FallbackInitials: Story = {
  args: { size: 'md', shape: 'circle', fallbackTone: 'neutral' },
  render: (args) => (
    <Avatar {...args} aria-label="Jordan Davis">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackIcon: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Avatar {...args} aria-label="Profile image unavailable">
      <AvatarFallback />
    </Avatar>
  ),
};

export const LoadedImage: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Avatar {...args} aria-label="Jordan Davis">
      <AvatarImage src={profileImage} alt="Jordan Davis" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const ImageErrorUsesFallback: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Avatar {...args} aria-label="Morgan Chen">
      <AvatarImage src="/missing-profile-image.svg" alt="Morgan Chen" />
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
  ),
};

export const SizesAndShapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} size={size} aria-label={`Avatar size ${size}`}>
          <AvatarFallback>{size === 'xl' ? 'JD' : 'J'}</AvatarFallback>
        </Avatar>
      ))}
      <Avatar size="md" shape="rounded" aria-label="Rounded identity mark">
        <AvatarFallback>DCM</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const FallbackTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['neutral', 'brand', 'success', 'warning', 'danger', 'info', 'ai'] as const).map((tone) => (
        <Avatar key={tone} size="lg" fallbackTone={tone} aria-label={`${tone} profile fallback`}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const PresenceBadges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar aria-label="Jordan Davis, online">
        <AvatarFallback>JD</AvatarFallback>
        <AvatarBadge tone="success" aria-label="Online" />
      </Avatar>
      <Avatar aria-label="Morgan Chen, review required">
        <AvatarFallback>MC</AvatarFallback>
        <AvatarBadge tone="warning" aria-label="Review required">
          <CheckIcon aria-hidden="true" />
        </AvatarBadge>
      </Avatar>
      <Avatar aria-label="Alex Morgan, offline">
        <AvatarFallback>AM</AvatarFallback>
        <AvatarBadge tone="neutral" aria-label="Offline" position="top-left" />
      </Avatar>
    </div>
  ),
};

export const BadgePositions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((position) => (
        <Avatar key={position} shape="rounded" aria-label={`Avatar badge at ${position}`}>
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge tone="info" position={position} aria-label="Processing" />
        </Avatar>
      ))}
    </div>
  ),
};

export const AvatarGroups: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <AvatarGroup aria-label="Care team">
        <Avatar size="sm" aria-label="Jordan Davis">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar size="sm" aria-label="Morgan Chen">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <Avatar size="sm" aria-label="Alex Morgan">
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <AvatarGroup overlap="tight" aria-label="Additional care team members">
        <Avatar size="sm" aria-label="Jordan Davis">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar size="sm" aria-label="Morgan Chen">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <AvatarGroupCount size="sm" aria-label="Three additional care team members">
          +3
        </AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup aria-label="Invite care team member">
        <Avatar size="sm" aria-label="Jordan Davis">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount size="sm" tone="brand" aria-label="Invite care team member">
          <UserPlusIcon aria-hidden="true" />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
};

export const RingsAndLoading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      <Avatar ring="brand" aria-label="Active profile">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar ring="success" ringAnimation="pulse" aria-label="Online profile">
        <AvatarFallback>MC</AvatarFallback>
        <AvatarBadge tone="success" aria-label="Online" />
      </Avatar>
      <Avatar loading aria-label="Profile image loading">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const MultipleBadges: Story = {
  render: () => (
    <Avatar size="lg" aria-label="Jordan Davis, online, two notifications">
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge tone="success" position="bottom-right" aria-label="Online" />
      <AvatarBadge tone="danger" position="top-left" aria-label="Two urgent notifications">
        2
      </AvatarBadge>
    </Avatar>
  ),
};

export const SocialProof: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <AvatarGroup aria-label="Care team members">
        <Avatar size="sm" aria-label="Jordan Davis"><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Morgan Chen"><AvatarFallback>MC</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Alex Morgan"><AvatarFallback>AM</AvatarFallback></Avatar>
        <AvatarGroupCount size="sm" aria-label="Nine additional care team members">+9</AvatarGroupCount>
      </AvatarGroup>
      <span className="text-sm text-muted-foreground">12 care team members</span>
    </div>
  ),
};

export const EmptyCollaborators: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3 text-center">
      <AvatarGroup aria-label="No active collaborators">
        <AvatarGroupCount size="lg" tone="neutral" aria-label="Invite a collaborator">
          <UserPlusIcon aria-hidden="true" />
        </AvatarGroupCount>
      </AvatarGroup>
      <div>
        <p className="text-sm font-medium">No active collaborators</p>
        <p className="text-xs text-muted-foreground">Invite a teammate to start reviewing together.</p>
      </div>
    </div>
  ),
};

export const MutedImage: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar aria-label="Archived clinician profile">
        <AvatarImage src={profileImage} alt="Archived clinician profile" treatment="muted" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <span className="text-sm text-muted-foreground">Archived clinician profile</span>
    </div>
  ),
};

export const DensityReference: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <Avatar aria-label={`Avatar in ${density} density`}>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>
      ))}
    </div>
  ),
};

export const LongContentAndNarrow: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-3">
      <Avatar size="sm" aria-label="Alexandra Morgan, laboratory operations lead">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">Alexandra Morgan</p>
        <p className="text-xs text-muted-foreground">Laboratory operations lead</p>
      </div>
      <AvatarBadge tone="warning" aria-label="Awaiting review" />
    </div>
  ),
};

export const MobileReference: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar size="md" aria-label="Jordan Davis, online">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge tone="success" aria-label="Online" />
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Jordan Davis</p>
          <p className="text-xs text-muted-foreground">Primary care team</p>
        </div>
      </div>
      <AvatarGroup aria-label="Care team members">
        <Avatar size="sm" aria-label="Jordan Davis"><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Morgan Chen"><AvatarFallback>MC</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Alex Morgan"><AvatarFallback>AM</AvatarFallback></Avatar>
        <AvatarGroupCount size="sm" aria-label="Five additional care team members">
          <PlusIcon aria-hidden="true" />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
};
