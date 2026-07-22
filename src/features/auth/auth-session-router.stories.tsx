import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type { BetterAuthSession } from '../../lib/auth-client';
import { AuthSessionRouter } from './auth-session-router';
import { READINESS } from '../../components/foundations/readiness-data';
import {
  DEMO_BRANCHES,
  DEMO_LAST_ACTIVE_BRANCH,
  DEMO_LAST_ACTIVE_WORKSPACE,
  DEMO_WORKSPACES,
} from './demo-data';

const SESSION: BetterAuthSession = {
  session: {
    id: 'session-storybook-clinician',
    createdAt: new Date('2026-07-17T03:00:00.000Z'),
    updatedAt: new Date('2026-07-17T03:00:00.000Z'),
    userId: 'user-dara-sok',
    expiresAt: new Date('2026-07-24T03:00:00.000Z'),
    token: 'storybook-redacted-session-token',
    ipAddress: '127.0.0.1',
    userAgent: 'Storybook deterministic session fixture',
  },
  user: {
    id: 'user-dara-sok',
    name: 'Dr. Dara Sok',
    email: 'dara@mekong.clinic',
    emailVerified: true,
    image: null,
    createdAt: new Date('2026-01-12T03:00:00.000Z'),
    updatedAt: new Date('2026-07-16T03:00:00.000Z'),
  },
};

const meta = {
  title: 'Clinic/Auth/Session Router',
  component: AuthSessionRouter,
  tags: ['autodocs', 'source-better-auth', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.auth,
      source: {
        vendor: 'Better Auth',
        package: 'better-auth',
        contract: 'createAuthClient().useSession()',
      },
      intake: {
        decision: 'EXTEND',
        owner: 'src/features/auth',
        evidence:
          'Door already owns anonymous sign-in/sign-up and WorkspaceGate owns authenticated context entry. The missing capability was a session lifecycle boundary that maps Better Auth pending, error, anonymous, and authenticated states without duplicating either UI.',
        exclusions: [
          'Live API calls, cookies, secrets, provider redirects, and database state are excluded from Storybook.',
          'Password UI and third-party OAuth are excluded because the approved Kura Door is OTP-first.',
        ],
      },
      binding: {
        server: 'deployment-owned Better Auth instance and /api/auth route',
        client: 'src/lib/auth-client.ts',
        storybook: 'pure AuthSessionRouter with typed deterministic fixtures',
        safety: 'workspace data never renders while the session is pending or unverifiable',
        responsive: 'existing AuthShell, Door, and WorkspaceGate contracts',
      },
      journeys: [
        'auth-session-pending',
        'auth-session-anonymous',
        'auth-session-error-recovery',
        'auth-session-authenticated',
      ],
    },
    docs: {
      description: {
        component:
          'Kura session boundary for Better Auth. Storybook injects typed session snapshots; production uses BetterAuthSessionRouter, which reads authClient.useSession(). No story sends credentials or creates a real cookie.',
      },
    },
  },
  args: {
    session: null,
    door: { onRouted: fn() },
    workspaceGate: {
      workspaces: DEMO_WORKSPACES,
      branches: DEMO_BRANCHES,
      lastActiveWorkspaceId: DEMO_LAST_ACTIVE_WORKSPACE,
      lastActiveBranchId: DEMO_LAST_ACTIVE_BRANCH,
      onEnter: fn(),
      onCreateWorkspace: fn(),
    },
  },
} satisfies Meta<typeof AuthSessionRouter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Initial Better Auth hook state: no protected workspace content is rendered. */
export const Pending: Story = {
  args: { isPending: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status')).toHaveTextContent('Checking your session');
    await expect(canvas.queryByRole('heading', { name: 'Choose a workspace' })).not.toBeInTheDocument();
  },
};

/** No session: reuse the approved OTP-first Door. */
export const Anonymous: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { name: 'Sign in to Kura' })).toBeVisible();
  },
};

/** Valid Better Auth session: continue into Kura's workspace boundary. */
export const Authenticated: Story = {
  args: { session: SESSION },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { name: 'Choose a workspace' })).toBeVisible();
  },
};

/** Session lookup failed: block workspace data and expose a deterministic retry. */
export const SessionError: Story = {
  args: {
    error: { message: 'Network request failed' },
    onRetrySession: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Couldn't verify your session")).toBeVisible();
    await expect(canvas.queryByRole('heading', { name: 'Choose a workspace' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(args.onRetrySession).toHaveBeenCalled());
  },
};

/** Expired or revoked cookie resolves to no session and returns to the Door. */
export const ExpiredSession: Story = {
  args: { session: null },
};

/** The session boundary delegates narrow-layout behavior to its canonical children. */
export const Mobile320: Story = {
  args: { session: SESSION },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
