'use client';

import type { BetterAuthSession } from '../../lib/auth-client';
import { useT } from '../../components/foundations/i18n';
import { Alert, AlertAction, AlertDescription, AlertTitle, Button, Card, CardContent } from '../../components/ui';

import { authClient } from '../../lib/auth-client';
import { AuthShell } from './auth-shell';
import { Door } from './door';
import type { DoorProps } from './door';
import { WorkspaceGate } from './workspace-gate';
import type { WorkspaceGateProps } from './workspace-gate';
import styles from './auth-session-router.module.css';

export type AuthSessionRouterProps = {
  session: BetterAuthSession | null;
  isPending?: boolean;
  error?: { message?: string } | null;
  onRetrySession?: () => void;
  door: DoorProps;
  workspaceGate: WorkspaceGateProps;
};

/**
 * Pure presentation boundary for an authentication session. Storybook owns
 * deterministic snapshots here; BetterAuthSessionRouter supplies the live
 * Better Auth hook in production.
 */
export function AuthSessionRouter({
  door,
  error = null,
  isPending = false,
  onRetrySession,
  session,
  workspaceGate,
}: AuthSessionRouterProps) {
  const t = useT();

  if (isPending) {
    return (
      <AuthShell>
        <Card as="section" aria-label={t('Session status')}>
          <CardContent className={styles.statusBody}>
            <p aria-live="polite" className={styles.pending} role="status">
              {t('Checking your session…')}
            </p>
          </CardContent>
        </Card>
      </AuthShell>
    );
  }

  if (error) {
    return (
      <AuthShell>
        <Card as="section" aria-label={t('Session status')}>
          <CardContent className={styles.statusBody}>
            <Alert tone="danger">
              <AlertTitle>{t("Couldn't verify your session")}</AlertTitle>
              <AlertDescription>
                {t(
                  'Workspace data was not opened. Check your connection and try again.',
                )}
              </AlertDescription>
              {onRetrySession ? (
                <AlertAction>
                  <Button onClick={onRetrySession} size="sm" variant="outline">
                    {t('Try again')}
                  </Button>
                </AlertAction>
              ) : null}
            </Alert>
          </CardContent>
        </Card>
      </AuthShell>
    );
  }

  if (!session) return <Door {...door} />;

  return <WorkspaceGate {...workspaceGate} />;
}

export type BetterAuthSessionRouterProps = Omit<
  AuthSessionRouterProps,
  'error' | 'isPending' | 'onRetrySession' | 'session'
>;

/** Live Better Auth adapter. Keep it out of Storybook so stories never call an auth endpoint. */
export function BetterAuthSessionRouter(props: BetterAuthSessionRouterProps) {
  const session = authClient.useSession();

  return (
    <AuthSessionRouter
      {...props}
      error={session.error}
      isPending={session.isPending}
      onRetrySession={() => void session.refetch()}
      session={session.data}
    />
  );
}
