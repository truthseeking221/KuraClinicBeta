/**
 * One mapping between AppShell nav keys (mode registry) and app routes.
 * The shell speaks nav keys; Next speaks paths — this file translates both
 * directions so navigation state always derives from the URL.
 */

import type { ClinicMode } from '../../components/shared/app-shell';

type RouteEntry = { mode: ClinicMode; key: string; path: string };

export const ROUTES: readonly RouteEntry[] = [
  // Clinical — daily doctor work lives at the root.
  { mode: 'clinical', key: 'home', path: '/home' },
  { mode: 'clinical', key: 'results', path: '/results' },
  { mode: 'clinical', key: 'patients', path: '/patients' },
  { mode: 'clinical', key: 'earnings', path: '/earnings' },
  { mode: 'clinical', key: 'bookings', path: '/bookings' },
  { mode: 'clinical', key: 'catalog', path: '/catalog' },
  { mode: 'clinical', key: 'care-plans', path: '/soon/care-plans' },
  { mode: 'clinical', key: 'telehealth', path: '/soon/telehealth' },
  { mode: 'clinical', key: 'inbox', path: '/soon/inbox' },
  { mode: 'clinical', key: 'tasks', path: '/soon/tasks' },
  { mode: 'clinical', key: 'calendar', path: '/soon/calendar' },

  // Front desk.
  { mode: 'front-desk', key: 'arrivals', path: '/front-desk/arrivals' },
  { mode: 'front-desk', key: 'queue', path: '/front-desk/queue' },
  { mode: 'front-desk', key: 'patients', path: '/front-desk/patients' },
  { mode: 'front-desk', key: 'bookings', path: '/front-desk/bookings' },
  { mode: 'front-desk', key: 'orders', path: '/front-desk/orders' },
  { mode: 'front-desk', key: 'payments', path: '/front-desk/payments' },
  { mode: 'front-desk', key: 'documents', path: '/soon/documents' },
  { mode: 'front-desk', key: 'reports', path: '/soon/reports' },

  // Collection.
  { mode: 'collection', key: 'scan-gate', path: '/collection/scan' },
  { mode: 'collection', key: 'draw-queue', path: '/soon/draw-queue' },
  { mode: 'collection', key: 'handoffs', path: '/soon/handoffs' },
  { mode: 'collection', key: 'exceptions', path: '/soon/exceptions' },
  { mode: 'collection', key: 'supplies', path: '/soon/supplies' },
];

export function pathForNavKey(mode: ClinicMode, key: string): string {
  return (
    ROUTES.find((entry) => entry.mode === mode && entry.key === key)?.path ?? '/home'
  );
}

/** Longest-prefix match so nested routes still highlight their nav item. */
export function navStateForPath(pathname: string): { mode: ClinicMode; key: string } {
  let best: RouteEntry | null = null;
  for (const entry of ROUTES) {
    if (pathname === entry.path || pathname.startsWith(`${entry.path}/`)) {
      if (!best || entry.path.length > best.path.length) best = entry;
    }
  }
  return best ? { mode: best.mode, key: best.key } : { mode: 'clinical', key: 'home' };
}

/** Landing route when a mode is switched. */
export function entryPathForMode(mode: ClinicMode): string {
  const entryKeys: Record<ClinicMode, string> = {
    clinical: 'home',
    'front-desk': 'arrivals',
    collection: 'scan-gate',
  };
  return pathForNavKey(mode, entryKeys[mode]);
}
