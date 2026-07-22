'use client';

/**
 * App wiring for the canonical Door, OnboardingWizard, and WorkspaceGate.
 * Both / and /door render this flow; all visible UI remains Storybook-owned.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Door } from '../../features/auth/door';
import { OnboardingWizard } from '../../features/auth/onboarding-wizard';
import type { WizardResult } from '../../features/auth/onboarding-wizard';
import { WorkspaceGate } from '../../features/auth/workspace-gate';
import {
  DEMO_BRANCHES,
  DEMO_LAST_ACTIVE_BRANCH,
  DEMO_LAST_ACTIVE_WORKSPACE,
  DEMO_WORKSPACES,
  demoOnboardingScenarioFor,
} from '../../features/auth/demo-data';
import type { DemoOnboardingScenario } from '../../features/auth/demo-data';
import type { GateWorkspace } from '../../features/auth/logic';
import { useDemoSession } from './demo-session';

type FlowStage =
  | { kind: 'door' }
  | { kind: 'wizard'; verifiedIdentifier?: string }
  | {
      kind: 'gate';
      workspaces: readonly GateWorkspace[];
      fresh: boolean;
      scenario?: DemoOnboardingScenario;
      wizardResult?: WizardResult;
    };

function ownCabinet(result: WizardResult): GateWorkspace {
  return {
    workspaceId: 'ws-own-cabinet',
    name: result.clinicName ?? 'My cabinet',
    branchesEnabled: false,
    memberCount: 1,
    role: 'Owner',
  };
}

export function OnboardingFlowPage() {
  const router = useRouter();
  const { signIn } = useDemoSession();
  const [stage, setStage] = useState<FlowStage>({ kind: 'door' });

  const enterApp = (
    workspace: GateWorkspace,
    wizardResult?: WizardResult,
    scenario?: DemoOnboardingScenario,
  ) => {
    const fresh = Boolean(wizardResult) || scenario?.kind === 'fresh-workspace';
    const wizardSubmittedLicence =
      wizardResult?.mlDeclaration?.answer === 'yes' &&
      wizardResult.mlDeclaration.licenceFiles.length > 0;
    signIn({
      demoProfile: fresh ? 'new-doctor' : 'established-doctor',
      demoScenarioId:
        scenario?.id ?? (fresh ? 'new-sign-up' : 'established-member'),
      workspaceId: workspace.workspaceId,
      branchId: '',
      customWorkspaceName: fresh ? workspace.name : undefined,
      userName: wizardResult?.name ?? scenario?.userName,
      userContact: wizardResult?.phone ?? scenario?.phone,
      licence:
        scenario?.licence ??
        (fresh
          ? wizardSubmittedLicence
            ? 'pending_review'
            : 'none'
          : 'verified'),
      mode: 'clinical' as const,
    });
    router.push(scenario?.entryPath ?? '/home');
  };

  if (stage.kind === 'wizard') {
    const entry = stage.verifiedIdentifier?.startsWith('+')
      ? {
          isInvitee: false as const,
          phoneVerified: true as const,
          verifiedPhone: stage.verifiedIdentifier,
        }
      : { isInvitee: false as const, phoneVerified: false as const };
    return (
      <OnboardingWizard
        entry={entry}
        onDone={(result) =>
          setStage({
            kind: 'gate',
            workspaces: [ownCabinet(result)],
            fresh: true,
            wizardResult: result,
          })
        }
      />
    );
  }

  if (stage.kind === 'gate') {
    const { workspaces, fresh, scenario, wizardResult } = stage;
    return (
      <WorkspaceGate
        branches={DEMO_BRANCHES}
        lastActiveBranchId={DEMO_LAST_ACTIVE_BRANCH}
        lastActiveWorkspaceId={fresh ? null : DEMO_LAST_ACTIVE_WORKSPACE}
        onCreateWorkspace={(name) =>
          enterApp(
            {
              workspaceId: 'ws-created',
              name,
              branchesEnabled: false,
              memberCount: 1,
              role: 'Owner',
            },
            wizardResult,
            scenario,
          )
        }
        onEnter={(workspaceId) => {
          const workspace = workspaces.find(
            (candidate) => candidate.workspaceId === workspaceId,
          );
          if (workspace) enterApp(workspace, wizardResult, scenario);
        }}
        workspaces={workspaces}
      />
    );
  }

  return (
    <Door
      onRouted={(route, identifier) => {
        const scenario = demoOnboardingScenarioFor(identifier);
        if (route === 'wizard') {
          setStage({ kind: 'wizard', verifiedIdentifier: identifier });
          return;
        }
        if (scenario?.kind === 'fresh-workspace') {
          setStage({
            kind: 'gate',
            workspaces: [
              {
                workspaceId: `ws-${scenario.id}`,
                name: scenario.workspaceName ?? 'My cabinet',
                branchesEnabled: false,
                memberCount: 1,
                role: 'Owner',
              },
            ],
            fresh: true,
            scenario,
          });
          return;
        }
        setStage({
          kind: 'gate',
          workspaces: DEMO_WORKSPACES,
          fresh: false,
          scenario,
        });
      }}
    />
  );
}
