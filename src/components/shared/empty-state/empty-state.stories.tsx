import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Button, Input } from '../../ui';
import {
  CalendarIcon,
  DatabaseIcon,
  MedicalFileIcon,
  NotificationsIcon,
  SearchIcon,
  UploadIcon,
  UserGroupIcon,
} from '../../ui/icons';
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from './empty-state';
import storyStyles from './empty-state.stories.module.css';

const meta = {
  title: 'Design System/Patterns/Empty State',
  component: EmptyState,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/shared/empty-state',
        evidence:
          'The Storybook catalog and Card story referenced empty states but no production implementation existed. Empty State is a reusable task-level composition, not a visual primitive.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'empty and c-empty-1 through c-empty-20',
        sourceUrl: 'https://reui.io/components/empty',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-card-when-surface-is-meaningful',
        elevation: 'none',
        icons: 'kura-canonical',
        density: 'content-driven',
        responsive: 'FLUID + STACKING actions below 480px',
        motion: 'none',
      },
      exclusions: [
        {
          reuiExample: 'Decorative isometric and stacked-card illustrations',
          reason:
            'Copied inline SVG and decorative mock objects would create a foreign visual language and add no task information.',
          replacement: 'Kura icon media or an approved product illustration supplied by the owning feature.',
        },
        {
          reuiExample: 'Loading or unavailable data presented as empty',
          reason:
            'Empty, loading, permission denial, offline, and failure must remain distinguishable.',
          replacement: 'Loading owner, Alert, or permission-specific feature state.',
        },
        {
          reuiExample: 'Generic SaaS project, product, payment, integration, and automation copy',
          reason: 'The pattern must describe the real Kura collection and the next available action.',
          replacement: 'Role-appropriate Kura content supplied by the consuming story or feature.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'Explains why a collection or workspace has no useful content, whether that is expected, and what the user can do next. It removes controls that cannot work and keeps at most one dominant recovery or creation action.',
      },
    },
  },
  argTypes: {
    surface: { control: 'radio', options: ['plain', 'muted', 'outlined'] },
    align: { control: 'radio', options: ['center', 'start'] },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><MedicalFileIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No documents recorded</EmptyStateTitle>
        <EmptyStateDescription>
          This patient record does not contain uploaded or generated documents yet.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Add document</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: /no documents recorded/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /add document/i })).toBeVisible();
  },
};

export const SearchNoResults: Story = {
  render: () => (
    <EmptyState surface="muted">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><SearchIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No patients match “Sokha Chann”</EmptyStateTitle>
        <EmptyStateDescription>
          Check the spelling, remove a filter, or search by verified phone number or patient ID.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button variant="outline">Clear search and filters</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
};

export const SearchWithinEmptyState: Story = {
  render: () => (
    <EmptyState align="start" surface="outlined">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><DatabaseIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No matching lab master data</EmptyStateTitle>
        <EmptyStateDescription>
          Search by test name, code, specimen, or reporting unit.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Input label="Search lab master data" placeholder="e.g. HbA1c" />
      </EmptyStateContent>
    </EmptyState>
  ),
};

export const UploadBoundary: Story = {
  render: () => (
    <EmptyState surface="outlined">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><UploadIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No attachments added</EmptyStateTitle>
        <EmptyStateDescription>
          Upload PDF or image files up to 10 MB. Do not upload documents for another patient.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button variant="outline">Choose files</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
};

export const ExpectedEmpty: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><NotificationsIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No unread notifications</EmptyStateTitle>
        <EmptyStateDescription>
          New operational and review notifications will appear here.
        </EmptyStateDescription>
      </EmptyStateHeader>
    </EmptyState>
  ),
};

export const FirstUse: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><UserGroupIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No clinic members added</EmptyStateTitle>
        <EmptyStateDescription>
          Add the first member and assign only the roles needed for their work.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Add clinic member</Button>
        <Button variant="link">Review role guidance</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
};

export const NoUpcomingEvents: Story = {
  render: () => (
    <EmptyState surface="muted">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><CalendarIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No follow-up visits scheduled</EmptyStateTitle>
        <EmptyStateDescription>
          Schedule a follow-up only when the care plan requires another visit.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Schedule follow-up</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
};

export const LongContent: Story = {
  render: () => (
    <EmptyState align="start">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><MedicalFileIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>
          No verified result is available for ការពិនិត្យជាតិស្ករក្នុងឈាមរយៈពេលវែង (Hemoglobin A1c)
        </EmptyStateTitle>
        <EmptyStateDescription>
          The specimen was collected, but the result has not been verified by the laboratory. Do not
          interpret this as a normal result. Return to the order later or contact the laboratory if the
          expected turnaround time has passed.
        </EmptyStateDescription>
      </EmptyStateHeader>
    </EmptyState>
  ),
};

export const SurfaceMatrix: Story = {
  render: () => (
    <div className={storyStyles.surfaceMatrix}>
      {(['plain', 'muted', 'outlined'] as const).map((surface) => (
        <EmptyState surface={surface} key={surface}>
          <EmptyStateHeader>
            <EmptyStateMedia variant="icon"><DatabaseIcon aria-hidden="true" /></EmptyStateMedia>
            <EmptyStateTitle>{surface} surface</EmptyStateTitle>
            <EmptyStateDescription>
              A surface is used only when it communicates a real boundary or interaction context.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      ))}
    </div>
  ),
};

export const MobileInteractive: Story = {
  globals: { viewport: { value: 'kura390' } },
  render: () => (
    <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><MedicalFileIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No care-plan drafts</EmptyStateTitle>
        <EmptyStateDescription>
          Create a draft when the patient needs a documented follow-up plan.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Create care-plan draft</Button>
        <Button variant="outline">Return to patient record</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
};

export const Tablet: Story = {
  render: () => (
    <div className={storyStyles.tabletBounds}>
      <EmptyState surface="muted">
        <EmptyStateHeader>
          <EmptyStateTitle>No records in this view</EmptyStateTitle>
          <EmptyStateDescription>Change the date range or remove a filter.</EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    </div>
  ),
};

export const Desktop: Story = {
  render: () => (
    <div className={storyStyles.desktopBounds}>
      <EmptyState align="start">
        <EmptyStateHeader>
          <EmptyStateTitle>No records in this view</EmptyStateTitle>
          <EmptyStateDescription>Change the date range or remove a filter.</EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    </div>
  ),
};
