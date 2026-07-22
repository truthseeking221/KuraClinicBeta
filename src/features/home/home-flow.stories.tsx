import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { AppShell } from '../../components/shared';
import { CRITICAL_COMPLETE_SECTIONS, DEMO_RESULTS_PATIENT } from '../results/demo-data';
import { ResultsReviewFlow } from '../results/results-review-flow';

import * as demo from './demo-data';
import { HomeWorkspace } from './home-workspace';
import { isLiveLicence } from './logic';
import { HOME_STORYBOOK_KURA } from './storybook-metadata';
import type { HomeData } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const MEKONG_WORKSPACE = {
  id: 'mekong',
  name: 'Mekong Clinic',
  branches: [{ id: 'bkk1', name: 'BKK1 Branch' }],
  activeBranchId: 'bkk1',
};

const LOTUS_WORKSPACE = {
  id: 'lotus',
  name: 'Lotus Family Clinic',
  branches: [{ id: 'riverside', name: 'Riverside Branch' }],
  activeBranchId: 'riverside',
};

const LOTUS_HOME: HomeData = {
  ...demo.allCaughtUp,
  scopeLabel: 'Lotus Family Clinic · Riverside · 26 patients in view',
  signals: demo.allCaughtUp.signals.map((signal) =>
    signal.key === 'pickup'
      ? { ...signal, detail: '2 tubes ready · daily courier sweep' }
      : signal,
  ),
  nextActions: [
    {
      time: '14:00',
      label: 'Care team huddle',
      meta: 'Riverside consultation room',
    },
  ],
};

function HomeToResultsFlow() {
  const [route, setRoute] = useState<'home' | 'results'>('home');

  if (route === 'results') {
    return (
      <ResultsReviewFlow
        episodeLabel="Current episode · 17 July 2026"
        patient={DEMO_RESULTS_PATIENT}
        sections={CRITICAL_COMPLETE_SECTIONS}
      />
    );
  }

  return (
    <AppShell
      activeKey="home"
      availableModes={['clinical']}
      mode="clinical"
      onNavigate={(key) => {
        if (key === 'results') setRoute('results');
      }}
      user={{
        name: demo.criticalDay.doctorName,
        email: 'sok.vanna@mekong.clinic',
        licenceVerified: true,
      }}
      workspace={MEKONG_WORKSPACE}
    >
      <HomeWorkspace
        data={demo.criticalDay}
        onNavigate={(key) => {
          if (key === 'results') setRoute('results');
        }}
      />
    </AppShell>
  );
}

function WorkspaceSwitchFlow() {
  const [workspaceId, setWorkspaceId] = useState(MEKONG_WORKSPACE.id);
  const isMekong = workspaceId === MEKONG_WORKSPACE.id;
  const workspace = isMekong ? MEKONG_WORKSPACE : LOTUS_WORKSPACE;
  const data = isMekong ? demo.criticalDay : LOTUS_HOME;

  return (
    <AppShell
      activeKey="home"
      availableModes={['clinical']}
      mode="clinical"
      onNavigate={() => undefined}
      onWorkspaceChange={setWorkspaceId}
      user={{
        name: data.doctorName,
        email: 'sok.vanna@clinic.example',
        licenceVerified: isLiveLicence(data.licence.state),
      }}
      workspace={workspace}
      workspaces={[MEKONG_WORKSPACE, LOTUS_WORKSPACE]}
    >
      <HomeWorkspace data={data} />
    </AppShell>
  );
}

const meta = {
  title: 'Clinic/Flows/Morning Triage',
  component: HomeToResultsFlow,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      ...HOME_STORYBOOK_KURA,
      readiness: READINESS.flows,
      flow: {
        pages: [
          'Clinic/Clinical/Home',
          'Clinic/Clinical/Results/Results Workspace',
          'Clinic/Flows/Result Review and Closure',
        ],
        terminal: 'Critical result opened in its owning review and closure flow',
      },
    },
    docs: {
      description: {
        component:
          'Executable cross-page Home journeys using real Kura feature surfaces. The first routes a safety-critical Home signal into the canonical Results review flow. The second proves a workspace change replaces tenant-scoped Home data instead of preserving patient context from the previous clinic.',
      },
    },
  },
} satisfies Meta<typeof HomeToResultsFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MorningTriageToCriticalResult: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', { name: 'Patients with results to review' });
    await userEvent.click(within(queue).getAllByRole('link')[0]);

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: 'Results' })).toBeVisible();
    });
    await expect(canvas.getByText('Potassium')).toBeVisible();
    await expect(canvas.getByText('A critical released result still requires acknowledgment.')).toBeVisible();
  },
};

export const WorkspaceSwitchClearsPriorClinicContext: Story = {
  render: () => <WorkspaceSwitchFlow />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const documentBody = within(canvasElement.ownerDocument.body);

    await expect(canvas.getByText(/Potassium/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /Mekong Clinic/ }));
    await userEvent.click(
      await documentBody.findByRole('menuitemradio', { name: 'Lotus Family Clinic' }),
    );

    await waitFor(async () => {
      await expect(canvas.getByText('Lotus Family Clinic · Riverside · 26 patients in view')).toBeVisible();
    });
    await expect(canvas.getByText('Care team huddle')).toBeVisible();
    await expect(canvas.queryByText(/Potassium/)).not.toBeInTheDocument();
    await expect(canvas.queryByText(/Sokha Chan/)).not.toBeInTheDocument();
  },
};
