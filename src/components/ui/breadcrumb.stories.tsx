import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  ChevronRightIcon,
  UserCircleIcon,
} from './index';

const meta = {
  title: 'Design System/Primitives/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Fresh source and Storybook search found no canonical hierarchical navigation primitive. The existing catalog had no reusable breadcrumb implementation.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'components/ui/breadcrumb.tsx',
        sourceUrl: 'https://reui.io/components/breadcrumb',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'wraps-and-preserves-current-context',
      },
      exclusions: [
        {
          capability: 'Dropdown-backed collapsed levels',
          reason: 'A dropdown/disclosure owner is not present in the fresh Kura index; hiding navigation without its recovery path would be unsafe.',
          replacement: 'Use BreadcrumbEllipsis as a presentational slot inside a feature-owned accessible disclosure once that pattern exists.',
        },
        {
          capability: 'Pill, card, badge, avatar, and button-style breadcrumb examples',
          reason: 'These are composition or decoration examples, not independent breadcrumb semantics; dedicated variants would duplicate canonical surfaces and actions.',
          replacement: 'Compose Breadcrumb with canonical surface, Badge, Avatar, or Button owners when the surrounding workflow requires them.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'Hierarchical navigation that answers where the user is and provides safe return paths. The current page is non-interactive; collapsed levels must be paired with a separate accessible disclosure when the workflow needs them.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic">Clinic</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic/visits">Visits</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Visit 2048</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    await expect(canvas.getByText('Visit 2048')).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getAllByRole('link')).toHaveLength(2);
  },
};

export const LongPathWithEllipsis: Story = {
  render: () => (
    <Breadcrumb label="Visit navigation">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic">Clinic</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic/visits/2048/orders">Orders</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Complete blood count</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const CustomSeparatorAndAsChild: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <a href="/clinic">Clinic workspace</a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic/visits">Today&apos;s visits</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon aria-hidden="true" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Nguyễn Thị Bích Ngọc</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const IconAware: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic">
            <UserCircleIcon aria-hidden="true" />
            Clinic workspace
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Patient identity</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const MobileLongContent: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Breadcrumb label="Patient record navigation">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/clinic">Phòng khám trung tâm</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/clinic/visits">Lịch khám hôm nay</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Phiếu xét nghiệm cần xác nhận</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const DensityReference: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div key={density} data-density={density} className="flex flex-col gap-1">
          <Breadcrumb label={`Breadcrumb in ${density} density`}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/clinic">Clinic</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Visit review</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>
      ))}
    </div>
  ),
};
