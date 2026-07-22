'use client';

import { useState } from 'react';

import {
  AppShell,
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';
import { useT } from '../../components/foundations/i18n';
import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from '../../components/ui';

import { Door } from './door';
import { OnboardingWizard } from './onboarding-wizard';
import type { WizardResult } from './onboarding-wizard';
import { WorkspaceGate } from './workspace-gate';
import {
  DEMO_BRANCHES,
  DEMO_LAST_ACTIVE_BRANCH,
  DEMO_LAST_ACTIVE_WORKSPACE,
  DEMO_WORKSPACES,
} from './demo-data';
import type { GateWorkspace } from './logic';
import styles from './first-sign-in-flow.module.css';

type FlowStage =
  | { kind: 'door' }
  | { kind: 'wizard'; verifiedIdentifier?: string }
  | {
      kind: 'gate';
      workspaces: readonly GateWorkspace[];
      fresh: boolean;
      wizardResult?: WizardResult;
    }
  | {
      kind: 'app';
      workspace: GateWorkspace;
      userName: string;
      showLicencePrompt: boolean;
    };

/**
 * The complete first-contact journey: Door → (Wizard for new accounts) →
 * Workspace Gate → the clinic app. A brand-new doctor lands in their own
 * cabinet (auto-entered — the gate never flashes for a single branch-less
 * workspace); a returning member picks a workspace and branch instead. The
 * landing copy reflects source-backed per-member attribution and never turns
 * licence state into a workspace-wide EXPLORER/PRACTICE mode.
 */
export function FirstSignInFlow() {
  const t = useT();
  const [stage, setStage] = useState<FlowStage>({ kind: 'door' });

  function ownCabinet(result: WizardResult): GateWorkspace {
    return {
      workspaceId: 'ws-own-cabinet',
      name: result.clinicName ?? 'My cabinet',
      branchesEnabled: false,
      memberCount: 1,
      role: 'Owner',
    };
  }

  if (stage.kind === 'door') {
    return (
      <Door
        onRouted={(route, identifier) =>
          setStage(
            route === 'wizard'
              ? { kind: 'wizard', verifiedIdentifier: identifier }
              : { kind: 'gate', workspaces: DEMO_WORKSPACES, fresh: false },
          )
        }
      />
    );
  }

  if (stage.kind === 'wizard') {
    return (
      <OnboardingWizard
        entry={
          stage.verifiedIdentifier?.startsWith('+')
            ? {
                isInvitee: false,
                phoneVerified: true,
                verifiedPhone: stage.verifiedIdentifier,
              }
            : { isInvitee: false, phoneVerified: false }
        }
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
    const { workspaces } = stage;
    return (
      <WorkspaceGate
        branches={DEMO_BRANCHES}
        lastActiveBranchId={DEMO_LAST_ACTIVE_BRANCH}
        lastActiveWorkspaceId={stage.fresh ? null : DEMO_LAST_ACTIVE_WORKSPACE}
        onCreateWorkspace={(name) =>
          setStage({
            kind: 'app',
            userName: 'Doctor',
            showLicencePrompt: false,
            workspace: {
              workspaceId: 'ws-created',
              name,
              branchesEnabled: false,
              memberCount: 1,
              role: 'Owner',
            },
          })
        }
        onEnter={(workspaceId) => {
          const workspace = workspaces.find(
            (candidate) => candidate.workspaceId === workspaceId,
          );
          if (workspace) {
            setStage({
              kind: 'app',
              showLicencePrompt: stage.wizardResult?.mlDeclaration?.answer === 'yes',
              userName: stage.wizardResult?.name ?? 'Bopha Kim',
              workspace,
            });
          }
        }}
        workspaces={workspaces}
      />
    );
  }

  return (
    <AppShell
      activeKey="home"
      availableModes={['clinical']}
      mode="clinical"
      onNavigate={() => {}}
      user={{
        name: stage.userName,
        email: 'you@kura.med',
        licenceVerified: false,
      }}
      workspace={{ id: stage.workspace.workspaceId, name: stage.workspace.name }}
    >
      <div className={styles.appContent}>
        {stage.showLicencePrompt ? (
          <Alert className={styles.stickyPrompt} tone="info">
            <AlertTitle>{t('Verify your medical licence')}</AlertTitle>
            <AlertDescription>
              {t(
                'You can browse the catalog and view prices. Your licence cannot be used for new clinic orders until it is approved.',
              )}
            </AlertDescription>
            <AlertAction>
              <Button size="sm" variant="outline">
                {t('Upload licence')}
              </Button>
            </AlertAction>
          </Alert>
        ) : null}
        <EmptyState>
          <EmptyStateHeader>
            <EmptyStateTitle>
              {t('Welcome to')} {stage.workspace.name}
            </EmptyStateTitle>
            <EmptyStateDescription>
              {t(
                'Browse the catalog and view prices. Order access depends on your permissions and the prescriber selected for the order.',
              )}
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      </div>
    </AppShell>
  );
}

/** Invite-link onboarding lands directly in the inviting workspace. */
export function InviteeOnboardingFlow() {
  const t = useT();
  const [result, setResult] = useState<WizardResult | null>(null);
  const workspace = DEMO_WORKSPACES[0];

  if (!result) {
    return (
      <OnboardingWizard
        entry={{ isInvitee: true, phoneVerified: false }}
        onDone={setResult}
      />
    );
  }

  return (
    <AppShell
      activeKey="home"
      availableModes={['clinical']}
      mode="clinical"
      onNavigate={() => {}}
      user={{
        name: result.name,
        email: 'invitee@kura.med',
        licenceVerified: false,
      }}
      workspace={{ id: workspace.workspaceId, name: workspace.name }}
    >
      <div className={styles.appContent}>
        <Alert className={styles.stickyPrompt} tone="info">
          <AlertTitle>{t('Medical licence question remaining')}</AlertTitle>
          <AlertDescription>
            {t(
              'Answer this question to determine whether licence verification applies to you. It does not set your role or access.',
            )}
          </AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">
              {t('Answer question')}
            </Button>
          </AlertAction>
        </Alert>
        <EmptyState>
          <EmptyStateHeader>
            <EmptyStateTitle>
              {t('Welcome to')} {workspace.name}
            </EmptyStateTitle>
            <EmptyStateDescription>
              {t(
                'You joined as a member. The workspace owner assigns your role and branch.',
              )}
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      </div>
    </AppShell>
  );
}
