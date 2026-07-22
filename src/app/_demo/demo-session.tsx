'use client';

/**
 * Prototype session state. The demo app has no backend: this store plays the
 * role of the auth/workspace BFF so every page reads one coherent session.
 * localStorage is the external system, subscribed via useSyncExternalStore;
 * "Reset demo" clears it.
 *
 * Inheritance principle: every value here originates from canonical Storybook
 * sources — the licence lifecycle from src/features/licence, the identity from
 * the settings ME fixture, workspaces from the auth gate fixtures.
 */

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';

import type { ClinicMode, ClinicShift } from '../../components/shared/app-shell';
import type { LicenceState } from '../../features/licence/logic';
import type { DemoOnboardingScenarioId } from '../../features/auth/demo-data';
import type { Locale } from '../../components/foundations/i18n';
import { ME } from '../../features/settings/demo-data';
import {
  DEMO_LAST_ACTIVE_BRANCH,
  DEMO_LAST_ACTIVE_WORKSPACE,
} from '../../features/auth/demo-data';

export type DemoSession = {
  signedIn: boolean;
  /** Cohort contract for route fixtures; the current app demo always starts here. */
  demoProfile: 'new-doctor' | 'established-doctor';
  /** Storybook-owned phone fixture that selected this app-wide demo state. */
  demoScenarioId: DemoOnboardingScenarioId;
  userName: string;
  userEmail: string;
  /** Verified phone for phone-first onboarding; shown instead of a fabricated email. */
  userContact?: string;
  /** Canonical seven-state professional-licence lifecycle. */
  licence: LicenceState;
  workspaceId: string;
  branchId: string;
  /** Name for a cabinet created during onboarding (not in the gate fixtures). */
  customWorkspaceName?: string;
  mode: ClinicMode;
  shift: ClinicShift;
  /**
   * Interface language. One value serves the shell account menu and the
   * Settings language row, so the two controls can never disagree.
   */
  locale: Locale;
};

export const DEMO_DEFAULT_SESSION: DemoSession = {
  signedIn: false,
  demoProfile: 'new-doctor',
  demoScenarioId: 'new-sign-up',
  userName: ME.name,
  userEmail: ME.email,
  licence: 'none',
  workspaceId: DEMO_LAST_ACTIVE_WORKSPACE,
  branchId: DEMO_LAST_ACTIVE_BRANCH,
  mode: 'clinical',
  shift: 'morning',
  locale: 'en',
};

// v5 makes the onboarding phone select the app-wide Storybook scenario pack.
const STORAGE_KEY = 'kura.demo.session.v5';

/* localStorage-backed store. Snapshot caching keeps getSnapshot referentially
 * stable between writes, which useSyncExternalStore requires. */

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedSession: DemoSession = DEMO_DEFAULT_SESSION;

function readSession(): DemoSession {
  if (typeof window === 'undefined') return DEMO_DEFAULT_SESSION;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cachedSession;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedSession = raw
        ? { ...DEMO_DEFAULT_SESSION, ...(JSON.parse(raw) as Partial<DemoSession>) }
        : DEMO_DEFAULT_SESSION;
    } catch {
      cachedSession = DEMO_DEFAULT_SESSION;
    }
  }
  return cachedSession;
}

function writeSession(next: DemoSession | null): void {
  try {
    if (next === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode: keep the in-memory snapshot for this tab.
    cachedRaw = undefined;
    cachedSession = next ?? DEMO_DEFAULT_SESSION;
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type DemoSessionContextValue = {
  session: DemoSession;
  /** False during SSR/first paint, before the stored session is visible. */
  hydrated: boolean;
  update: (patch: Partial<DemoSession>) => void;
  signIn: (patch?: Partial<DemoSession>) => void;
  signOut: () => void;
  reset: () => void;
};

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const session = useSyncExternalStore(subscribe, readSession, () => DEMO_DEFAULT_SESSION);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      session,
      hydrated,
      update: (patch) => writeSession({ ...session, ...patch }),
      signIn: (patch) => writeSession({ ...session, ...patch, signedIn: true }),
      signOut: () => writeSession({ ...session, signedIn: false }),
      reset: () => writeSession(null),
    }),
    [session, hydrated],
  );

  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export function useDemoSession(): DemoSessionContextValue {
  const context = useContext(DemoSessionContext);
  if (!context) throw new Error('useDemoSession must be used inside DemoSessionProvider.');
  return context;
}
