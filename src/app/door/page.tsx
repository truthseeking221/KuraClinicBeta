'use client';

/**
 * Pre-app journey: Door → (Onboarding Wizard for new accounts) → Workspace
 * Gate → the clinic app. Stage glue mirrors the canonical FirstSignInFlow;
 * the terminal stage signs the demo session in and routes to /home.
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
} from '../../features/auth/demo-data';
import type { GateWorkspace } from '../../features/auth/logic';
import { useDemoSession } from '../_demo/demo-session';

type FlowStage =
  | { kind: 'door' }
  | { kind: 'wizard' }
  | {
      kind: 'gate';
      workspaces: readonly GateWorkspace[];
      fresh: boolean;
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

export default function DoorPage() {
  const router = useRouter();
  const { signIn } = useDemoSession();
  const [stage, setStage] = useState<FlowStage>({ kind: 'door' });

  const enterApp = (workspace: GateWorkspace, wizardResult?: WizardResult) => {
    signIn({
      workspaceId: workspace.workspaceId,
      customWorkspaceName: workspace.name,
      userName: wizardResult?.name ?? undefined,
      // A fresh doctor starts unverified; a returning account keeps the
      // session's licence state (controlled from the demo panel).
      ...(wizardResult ? { licence: 'none' as const } : {}),
      mode: 'clinical' as const,
    });
    router.push('/home');
  };

  if (stage.kind === 'wizard') {
    return (
      <OnboardingWizard
        entry={{ isInvitee: false, phoneVerified: true, verifiedPhone: '+85598111222' }}
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
    const { workspaces, fresh, wizardResult } = stage;
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
          )
        }
        onEnter={(workspaceId) => {
          const workspace = workspaces.find(
            (candidate) => candidate.workspaceId === workspaceId,
          );
          if (workspace) enterApp(workspace, wizardResult);
        }}
        workspaces={workspaces}
      />
    );
  }

  return (
    <Door
      onRouted={(route) =>
        setStage(
          route === 'wizard'
            ? { kind: 'wizard' }
            : { kind: 'gate', workspaces: DEMO_WORKSPACES, fresh: false },
        )
      }
    />
  );
}
