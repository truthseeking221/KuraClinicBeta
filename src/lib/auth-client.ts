'use client';

import { createAuthClient } from 'better-auth/react';

/**
 * Browser client for the Better Auth `/api/auth` contract. The server auth
 * instance, database adapter, providers, and secrets remain deployment-owned.
 */
export const authClient = createAuthClient();

export type BetterAuthSession = typeof authClient.$Infer.Session;
