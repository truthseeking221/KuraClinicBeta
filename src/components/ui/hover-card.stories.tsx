import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  CalendarIcon,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  InformationIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Hover Card',
  component: HoverCard,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'ReUI', registryItem: 'hover-card', familySize: 8 },
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Kura had one feature-owned lab preview with bespoke positioning, but no generic collision-aware owner for optional rich previews on hover and keyboard focus.',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-overlay',
        elevation: 'kura-popover',
        icons: 'kura-canonical',
        responsive: 'fluid-collision-aware',
      },
      safety:
        'Hover Card may contain supplementary preview content only. Required instructions, errors, permissions, safety information and primary actions must remain visible or use a click/tap disclosure.',
      exclusions: [
        {
          capability: 'Interactive pagination inside a hover card',
          reason:
            'Repeated navigation changes the surface into a popover or dialog. Hover previews stay lightweight and non-essential.',
        },
        {
          capability: 'Click-to-pin clinical result detail',
          replacement:
            'Clinic Results now composes HoverCard for supplementary preview with a canonical Sheet for the complete click/tap history disclosure.',
        },
      ],
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function PreviewLink({ children = 'HN-004821' }: { children?: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#patient-record">{children}</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          <strong>Sophea Chan</strong>
          <span style={{ color: 'var(--color-text-tertiary)' }}>
            DOB 18 May 1974 · Verified patient identifier
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export const Basic: Story = {
  render: () => <PreviewLink />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('link', { name: 'HN-004821' });
    await userEvent.hover(trigger);
    await expect(await within(document.body).findByText('Sophea Chan')).toBeVisible();
    await userEvent.unhover(trigger);
  },
};

export const KeyboardFocus: Story = {
  render: () => <PreviewLink>View patient context</PreviewLink>,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('link', { name: 'View patient context' });
    trigger.focus();
    await expect(await within(document.body).findByText('Sophea Chan')).toBeVisible();
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger asChild>
            <Button variant="outline">{side}</Button>
          </HoverCardTrigger>
          <HoverCardContent side={side} size="sm">
            Collision-aware preview on the {side}.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

export const ProfileInformation: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#clinician">@dr-sokha</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Avatar>
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
            <strong>Dr Sokha Srey</strong>
            <span>General medicine · Phnom Penh Central</span>
            <Badge size="sm" variant="success">
              Available today
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button aria-label="About verification" size="icon" variant="ghost">
          <InformationIcon aria-hidden size={18} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent size="sm">
        Verification confirms that reception matched the patient to an accepted identity document.
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ImageAndText: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#clinic">Phnom Penh Central Clinic</a>
      </HoverCardTrigger>
      <HoverCardContent size="lg">
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          <strong>Phnom Penh Central Clinic</strong>
          <span>Open 07:00–19:00 · Laboratory collection closes at 17:30.</span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>
            123 Monivong Boulevard, Phnom Penh
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const InsideDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open booking details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking details</DialogTitle>
          <DialogDescription>Supplementary context can preview without escaping the modal layer.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          Assigned clinician: <PreviewLink>Dr Sokha Srey</PreviewLink>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const Timestamp: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <time dateTime="2026-07-16T09:42:00+07:00">18 minutes ago</time>
      </HoverCardTrigger>
      <HoverCardContent size="sm">
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <CalendarIcon aria-hidden size={18} />
          <span className="tabular-nums">16 Jul 2026, 09:42 ICT</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const MobileSupplementaryOnly: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
      <strong>Patient ID HN-004821</strong>
      <span>Essential identity remains visible. The hover card only repeats supplementary context.</span>
      <PreviewLink>Preview additional context</PreviewLink>
    </div>
  ),
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
