import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  ADD_ON_EPISODE_SECTIONS,
  ALL_CANCELLED_SECTIONS,
  CRITICAL_COMPLETE_SECTIONS,
  DEMO_RESULTS_PATIENT,
  FIRST_VISIT_SECTIONS,
  LONG_CONTENT_RESULT,
  NO_REFERENCE_RESULT,
  PARTIAL_EPISODE_SECTIONS,
  REDRAW_EPISODE_SECTIONS,
  RELEASED_WITH_CANCELLED_SECTIONS,
  RESULTS_DEMO_SCENARIOS,
  RETURNING_RESULTS,
} from './demo-data';
import styles from './results.stories.module.css';
import { ResultsWorkspace } from './results-workspace';
import { RESULTS_STORYBOOK_KURA } from './storybook-metadata';

const RETURNING_SECTIONS = RESULTS_DEMO_SCENARIOS.longitudinal.sections;

const meta = {
  title: 'Clinic/Clinical/Results/Results Workspace',
  component: ResultsWorkspace,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: RESULTS_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Doctor per-patient results workspace composed from the canonical toolbar, flowsheet, row, chart, HoverCard, and Sheet owners. Product/design target states are explicit while executable backend mapping remains pending by product decision.',
      },
    },
  },
  args: {
    patient: DEMO_RESULTS_PATIENT,
    episodeLabel: 'Current episode · Jul 1, 2026',
    sections: RETURNING_SECTIONS,
  },
} satisfies Meta<typeof ResultsWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLongitudinalWorkspace: Story = {};

/** Clinic-level first use before the workspace has patients or episodes. */
export const NewClinicEmpty: Story = {
  args: { patient: undefined, sections: [], state: 'empty' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No results to review')).toBeVisible();
    await expect(canvas.queryByText(DEMO_RESULTS_PATIENT.name)).not.toBeInTheDocument();
  },
};

export const SearchInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole('searchbox', {
      name: 'Search analytes, codes, or panels',
    });
    await userEvent.type(search, 'creatinine');
    await expect(canvas.getByText('Creatinine')).toBeVisible();
    await expect(canvas.queryByText('Hemoglobin A1c')).not.toBeInTheDocument();
    await expect(canvas.getByRole('status')).toHaveTextContent('Showing 1 matching analytes');
  },
};

export const LatestOnlyInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const latest = canvas.getByRole('radio', { name: 'Latest only' });
    await userEvent.click(latest);
    await expect(latest).toHaveAttribute('aria-checked', 'true');
  },
};

export const FlaggedFilter: Story = {
  args: {
    sections: FIRST_VISIT_SECTIONS,
    initialFilter: 'flagged',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('LDL-C')).toBeVisible();
    await expect(canvas.queryByText('Hemoglobin')).not.toBeInTheDocument();
  },
};

export const CriticalOnlyFilter: Story = {
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS,
    initialFilter: 'critical',
  },
};

export const NoReferenceFilter: Story = {
  args: {
    sections: [
      {
        code: 'other',
        title: 'Other tests',
        results: [NO_REFERENCE_RESULT, ...RETURNING_RESULTS],
      },
    ],
    initialFilter: 'no_reference',
  },
};

export const PartialRelease: Story = {
  args: {
    episodeLabel: 'Booking AB12345 · collected Jul 14, 2026',
    sections: PARTIAL_EPISODE_SECTIONS,
  },
};

export const RedrawInProgress: Story = {
  args: {
    episodeLabel: 'Booking AB12046 · collected Jul 12, 2026',
    sections: REDRAW_EPISODE_SECTIONS,
  },
};

export const AddOnReopenedEpisode: Story = {
  args: {
    episodeLabel: 'Booking AB11987 · collected Jul 8, 2026',
    sections: ADD_ON_EPISODE_SECTIONS,
  },
};

export const ReleasedWithCancelledLine: Story = {
  args: {
    episodeLabel: 'Booking AB11902 · collected Jul 5, 2026',
    sections: RELEASED_WITH_CANCELLED_SECTIONS,
  },
};

export const AllCancelled: Story = {
  args: {
    episodeLabel: 'Booking AB11875 · collected Jul 3, 2026',
    sections: ALL_CANCELLED_SECTIONS,
  },
};

export const LongContentAndOtherTests: Story = {
  args: {
    sections: [
      {
        code: 'other',
        title: 'Other tests',
        results: [LONG_CONTENT_RESULT, NO_REFERENCE_RESULT],
      },
    ],
  },
};

export const Loading: Story = {
  args: { state: 'loading', sections: [] },
};

export const Empty: Story = {
  args: { state: 'empty', sections: [] },
};

function RetryPlayground() {
  const [recovered, setRecovered] = useState(false);
  return recovered ? (
    <ResultsWorkspace
      episodeLabel="Booking AB12331 · collected Jul 15, 2026"
      patient={DEMO_RESULTS_PATIENT}
      sections={RETURNING_SECTIONS}
    />
  ) : (
    <ResultsWorkspace
      episodeLabel="Booking AB12331 · collected Jul 15, 2026"
      onRetry={() => setRecovered(true)}
      patient={DEMO_RESULTS_PATIENT}
      sections={[]}
      state="error"
    />
  );
}

export const ErrorAndRecovery: Story = {
  render: () => <RetryPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await waitFor(async () => {
      await expect(canvas.getAllByText('Creatinine')).toHaveLength(1);
    });
  },
};

function ConflictPlayground() {
  const [conflict, setConflict] = useState(true);
  return (
    <ResultsWorkspace
      episodeLabel="Booking AB12345 · collected Jul 14, 2026"
      onRetry={() => setConflict(false)}
      patient={DEMO_RESULTS_PATIENT}
      sections={PARTIAL_EPISODE_SECTIONS}
      state={conflict ? 'conflict' : 'ready'}
    />
  );
}

export const ConflictAndRefresh: Story = {
  render: () => <ConflictPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results changed during review')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Refresh episode' }));
    await waitFor(async () => {
      await expect(canvas.queryByText('Results changed during review')).not.toBeInTheDocument();
    });
  },
};

export const PermissionRestricted: Story = {
  args: { state: 'permission', sections: [] },
};

export const OfflineCached: Story = {
  args: { state: 'offline' },
};

export const StaleSnapshot: Story = {
  args: { staleAt: '2026-07-14T09:00:00Z' },
};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

function ResponsiveWorkspaceFrame({
  args,
  widthClass,
}: {
  args: ComponentProps<typeof ResultsWorkspace>;
  widthClass: string;
}) {
  return (
    <div className={`${styles.frame} ${widthClass}`}>
      <ResultsWorkspace {...args} />
    </div>
  );
}

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w320} />,
};

export const MobileWidth360: Story = {
  parameters: { viewport: { defaultViewport: 'kura360' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w360} />,
};

export const MobileWidth390: Story = {
  parameters: { viewport: { defaultViewport: 'kura390' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w390} />,
};

export const MobileWidth412: Story = {
  parameters: { viewport: { defaultViewport: 'kura412' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w412} />,
};

export const MobileWidth480: Story = {
  parameters: { viewport: { defaultViewport: 'kura480' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w480} />,
};

export const TabletWidth768: Story = {
  parameters: { viewport: { defaultViewport: 'kura768' } },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w768} />,
};

export const DesktopWidth1024: Story = {
  parameters: { viewport: { defaultViewport: 'kura1024' } },
  args: { sections: FIRST_VISIT_SECTIONS },
  render: (args) => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w1024} />,
};

export const CompactDensity: Story = {
  globals: { density: 'compact' },
};

export const ComfortableDensity: Story = {
  globals: { density: 'comfortable' },
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  args: { sections: PARTIAL_EPISODE_SECTIONS },
};
