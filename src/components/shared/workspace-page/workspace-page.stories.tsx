import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  AppointmentIcon,
  Badge,
  Button,
  Card,
  ChartAnalysisIcon,
  UserMultipleIcon,
  WalletIcon,
} from '../../ui';

import {
  WorkspaceMetricGrid,
  WorkspacePage,
  WorkspacePageHeader,
  WorkspaceSectionHeader,
  WorkspaceSplit,
} from './workspace-page';
import styles from './workspace-page.stories.module.css';

const meta = {
  title: 'Design System/Patterns/Workspace Page',
  component: WorkspacePage,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      intake: {
        decision: 'COMPOSE',
        owner: 'src/components/shared/workspace-page',
        hierarchy: 'Pattern',
        evidence:
          'Home, Results, Patients, Catalog and Balance repeated page measure, header and split-grid CSS. This owner centralizes only that geometry while Card, Button, Badge and each feature retain their canonical responsibilities.',
        exclusions: [
          'Domain fields, statuses and actions remain feature-owned.',
          'Station and clinical-detail surfaces may opt into full width.',
        ],
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura-page-title-and-secondary-context',
        spacing: 'kura-page-gutter-and-section-rhythm',
        radius: 'none — child surfaces own radius',
        elevation: 'none — white page canvas',
        responsive: 'single-column reflow with mobile action wrapping',
      },
      composes: ['Card', 'Button', 'Badge'],
    },
    docs: {
      description: {
        component:
          'The shared Kura workspace frame: a white page, one quiet header, comparable metrics, then task content. It prevents feature pages from privately redefining width, inset and responsive rhythm.',
      },
    },
  },
  args: { 'aria-label': 'Workspace page example' },
} satisfies Meta<typeof WorkspacePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const metrics = [
  { label: 'Results', value: '3', meta: '1 critical', icon: ChartAnalysisIcon },
  { label: 'Bookings', value: '3', meta: '1 missed', icon: AppointmentIcon },
  { label: 'Patients', value: '8', meta: '2 rising trends', icon: UserMultipleIcon },
  { label: 'Balance', value: '$34.50', meta: '3 orders', icon: WalletIcon },
] as const;

function WorkspaceExample({ onCreate = fn() }: { onCreate?: () => void }) {
  return (
    <div className={styles.canvas}>
      <WorkspacePage>
        <WorkspacePageHeader
          actions={
            <Button onClick={onCreate} variant="primary">
              New order
            </Button>
          }
          description="Friday, 17 July 2026 · Mekong Clinic · BKK1"
          title="Good morning, Dr. Sok Vanna"
        />

        <WorkspaceMetricGrid>
          {metrics.map(({ icon: Icon, label, meta: detail, value }) => (
            <Card as="div" className={styles.metric} key={label} role="listitem">
              <span aria-hidden="true" className={styles.metricIcon}>
                <Icon size={18} />
              </span>
              <p className={styles.metricLabel}>{label}</p>
              <p className={styles.metricValue}>
                {value}
                {label === 'Results' ? (
                  <Badge size="sm" variant="danger">
                    Critical
                  </Badge>
                ) : null}
              </p>
              <p className={styles.metricMeta}>{detail}</p>
            </Card>
          ))}
        </WorkspaceMetricGrid>

        <WorkspaceSplit>
          <section aria-labelledby="workspace-results-title">
            <WorkspaceSectionHeader
              actions={<Button variant="ghost">View all</Button>}
              headingId="workspace-results-title"
              title="Results needing review"
            />
            <ul className={styles.resultList}>
              {['Sokha Chan · Potassium', 'Dara Phally · LDL cholesterol'].map(
                (item, index) => (
                  <li className={styles.resultRow} key={item}>
                    <div className={styles.rowCopy}>
                      <p className={styles.rowTitle}>{item}</p>
                      <p className={styles.rowMeta}>
                        {index === 0 ? 'Returned 12 minutes ago' : 'Returned 1 hour ago'}
                      </p>
                    </div>
                    <Button variant="outline">
                      Review
                    </Button>
                  </li>
                ),
              )}
            </ul>
          </section>

          <section aria-labelledby="workspace-actions-title">
            <WorkspaceSectionHeader
              headingId="workspace-actions-title"
              title="Next actions"
            />
            <Card className={styles.actionTray}>
              <ol className={styles.actionList}>
                <li>
                  <time className={styles.time}>09:30</time>
                  <span>Sokha Chan · T2DM review</span>
                </li>
                <li>
                  <time className={styles.time}>10:15</time>
                  <span>Dara Phally · lipid panel review</span>
                </li>
              </ol>
            </Card>
          </section>
        </WorkspaceSplit>
      </WorkspacePage>
    </div>
  );
}

const onCreateOrder = fn();

export const Default: Story = {
  args: { 'aria-label': 'Workspace page example', children: null },
  render: () => <WorkspaceExample />,
};

export const PrimaryAction: Story = {
  args: { 'aria-label': 'Workspace page interaction example', children: null },
  tags: ['play-fn'],
  render: () => <WorkspaceExample onCreate={onCreateOrder} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'New order' }));
    await expect(onCreateOrder).toHaveBeenCalled();
  },
};

export const Mobile320: Story = {
  args: { 'aria-label': 'Workspace page mobile example', children: null },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => <WorkspaceExample />,
};
