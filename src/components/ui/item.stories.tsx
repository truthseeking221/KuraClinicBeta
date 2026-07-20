import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  ChevronRightIcon,
  DatabaseIcon,
  FileIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  Kbd,
  MailIcon,
  MoreHorizontalIcon,
  NotificationsIcon,
  SearchIcon,
  SettingsIcon,
} from './index';

const meta = {
  title: 'Design System/Components/Item',
  component: Item,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        hierarchy: 'Component',
        evidence:
          'The fresh Storybook and source search found no generic owner for a scannable media + title/description + actions row. Table/DataGrid, menu items, Card, and domain rows have different data or interaction contracts. ReUI c-item-1 through c-item-12 establish the missing reusable composition.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/item with c-item-1 through c-item-12',
        sourceUrl: 'https://reui.io/components/item',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura-weight-swap',
        spacing: 'kura',
        radius: 'kura-control',
        elevation: 'focus-only',
        icons: 'kura-canonical',
        motion: 'kura-color-and-focus',
        density: 'kura-root-attribute',
        responsive: 'fluid-grid-with-wrapping-actions',
      },
      exclusions: [
        'Sortable drag handles, virtualisation and data-grid behavior remain separate owners.',
        'File upload state, permissions, follow behavior, integration transitions and activity persistence remain workflow-owned.',
        'Remote demo imagery and generic SaaS copy are replaced with Kura operational examples.',
      ],
    },
    docs: {
      description: {
        component:
          'A composable, domain-neutral content row with optional media, title, description, actions, header, and footer. Use Table or DataGrid for columnar data and Field for form controls.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md'] },
    variant: { control: 'inline-radio', options: ['default', 'outline', 'muted'] },
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--space-2)',
  width: 'min(30rem, calc(100vw - var(--space-8)))',
};

export const Default: Story = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Patient identity verified</ItemTitle>
        <ItemDescription>The demographic details match the current visit record.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={frameStyle}>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default item</ItemTitle>
          <ItemDescription>Use inside an already established list surface.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline item</ItemTitle>
          <ItemDescription>Use when this standalone boundary carries meaning.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted item</ItemTitle>
          <ItemDescription>Secondary information on a quiet surface.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

export const IconMediaAndAction: Story = {
  render: () => (
    <div style={frameStyle}>
      <Item variant="outline">
        <ItemMedia variant="icon"><MailIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Email delivery</ItemTitle>
          <ItemDescription>Appointment messages use the verified patient address.</ItemDescription>
        </ItemContent>
        <ItemActions><Button size="sm" variant="outline">Configure</Button></ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon"><NotificationsIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Queue notifications</ItemTitle>
          <ItemDescription>Operational alerts for the active clinic workspace.</ItemDescription>
        </ItemContent>
        <ItemActions><Button size="sm">Enable</Button></ItemActions>
      </Item>
    </div>
  ),
};

export const AvatarAndStatus: Story = {
  render: () => (
    <Item variant="outline" size="sm">
      <ItemMedia>
        <Avatar size="sm" fallbackTone="brand"><AvatarFallback>SK</AvatarFallback></Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Dr. Sokha Kim</ItemTitle>
        <ItemDescription>Ordering practitioner</ItemDescription>
      </ItemContent>
      <ItemActions><Badge variant="success" dot>Available</Badge></ItemActions>
    </Item>
  ),
};

export const NavigationGroup: Story = {
  render: () => (
    <ItemGroup style={frameStyle}>
      <Item as="a" href="#profile" size="sm">
        <ItemMedia variant="icon"><SettingsIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Profile settings</ItemTitle>
          <ItemDescription>Review contact and professional details.</ItemDescription>
        </ItemContent>
        <ItemActions><ChevronRightIcon aria-hidden="true" /></ItemActions>
      </Item>
      <ItemSeparator />
      <Item as="a" href="#workspace" size="sm">
        <ItemMedia variant="icon"><DatabaseIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Workspace data</ItemTitle>
          <ItemDescription>Review the active clinic data boundary.</ItemDescription>
        </ItemContent>
        <ItemActions><ChevronRightIcon aria-hidden="true" /></ItemActions>
      </Item>
      <ItemSeparator />
      <Item as="a" disabled href="#unavailable" size="sm">
        <ItemContent>
          <ItemTitle>Unavailable destination</ItemTitle>
          <ItemDescription>Ask a workspace administrator for access.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const profile = canvas.getByRole('link', { name: /Profile settings/ });
    const workspace = canvas.getByRole('link', { name: /Workspace data/ });
    await userEvent.tab();
    await expect(profile).toHaveFocus();
    await userEvent.tab();
    await expect(workspace).toHaveFocus();
    await expect(canvas.getByText('Unavailable destination').closest('[data-slot="item"]')).toHaveAttribute('aria-disabled', 'true');
  },
};

export const DocumentItem: Story = {
  render: () => (
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon"><FileIcon aria-hidden="true" /></ItemMedia>
      <ItemContent>
        <ItemTitle>Signed referral.pdf</ItemTitle>
        <ItemDescription>1.2 MB · Added to this visit today</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="success">Verified</Badge>
        <Button size="sm" variant="outline">Open</Button>
      </ItemActions>
    </Item>
  ),
};

export const ShortcutItems: Story = {
  render: () => (
    <ItemGroup style={frameStyle}>
      <Item as="a" href="#search" size="xs">
        <ItemMedia variant="icon"><SearchIcon aria-hidden="true" /></ItemMedia>
        <ItemContent><ItemTitle>Search</ItemTitle></ItemContent>
        <ItemActions><Kbd>⌘K</Kbd></ItemActions>
      </Item>
      <Item as="a" href="#settings" size="xs">
        <ItemMedia variant="icon"><SettingsIcon aria-hidden="true" /></ItemMedia>
        <ItemContent><ItemTitle>Settings</ItemTitle></ItemContent>
        <ItemActions><Kbd>⌘,</Kbd></ItemActions>
      </Item>
    </ItemGroup>
  ),
};

export const Selectable: Story = {
  render: () => (
    <Item variant="muted" size="sm">
      <ItemMedia><Checkbox aria-label="Select CBC order" /></ItemMedia>
      <ItemContent>
        <ItemTitle>Complete blood count</ItemTitle>
        <ItemDescription>Include this order in the current draw.</ItemDescription>
      </ItemContent>
    </Item>
  ),
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: 'Select CBC order' });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const MultipleActions: Story = {
  args: { onClick: fn() },
  render: () => (
    <Item variant="outline" size="sm">
      <ItemMedia>
        <Avatar size="sm" fallbackTone="info"><AvatarFallback>LN</AvatarFallback></Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Linh Nguyen</ItemTitle>
        <ItemDescription>Workspace member · Reception</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="info">Member</Badge>
        <Button aria-label="More actions for Linh Nguyen" size="icon-sm" variant="ghost">
          <MoreHorizontalIcon aria-hidden="true" />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const HeaderAndFooter: Story = {
  render: () => (
    <Item variant="outline">
      <ItemHeader>
        <span>Workspace task</span>
        <Badge variant="warning">Needs review</Badge>
      </ItemHeader>
      <ItemContent>
        <ItemTitle>Confirm imported clinic details</ItemTitle>
        <ItemDescription>Review the address and contact details before enabling patient communications.</ItemDescription>
      </ItemContent>
      <ItemActions><Button size="sm" variant="outline">Review</Button></ItemActions>
      <ItemFooter>
        <span>Assigned to clinic administrator</span>
        <span>Updated today</span>
      </ItemFooter>
    </Item>
  ),
};

export const LongContentMobile: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <Item variant="outline">
      <ItemMedia>
        <Avatar size="sm" fallbackTone="neutral"><AvatarFallback>NT</AvatarFallback></Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Nguyễn Thị Minh Anh — Kura Phnom Penh Central Clinic</ItemTitle>
        <ItemDescription>
          Updated the verified contact details and requested review before the next appointment reminder is sent.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="warning">Review required</Badge>
        <Button size="sm" variant="outline">Open details</Button>
      </ItemActions>
    </Item>
  ),
};
