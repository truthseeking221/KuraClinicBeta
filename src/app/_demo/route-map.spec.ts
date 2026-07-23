import { describe, expect, it } from 'vitest';

import { MODE_REGISTRY } from '../../components/shared/app-shell';

import { entryPathForMode, navStateForPath, ROUTES } from './route-map';

describe('app shell route map', () => {
  it('keeps the registry and implemented route map in sync', () => {
    const registryDestinations = Object.values(MODE_REGISTRY).flatMap((definition) =>
      definition.nav.flatMap((group) =>
        group.items.map((item) => `${definition.mode}:${item.key}`),
      ),
    );
    const routeDestinations = ROUTES.map((route) => `${route.mode}:${route.key}`);

    expect(registryDestinations.sort()).toEqual(routeDestinations.sort());
    expect(ROUTES.every((route) => !route.path.startsWith('/soon/'))).toBe(true);
  });

  it('keeps nested flow routes under their owning shell destination', () => {
    expect(navStateForPath('/patients/p-sok-nimol')).toEqual({
      mode: 'clinical',
      key: 'patients',
    });
    expect(navStateForPath('/balance/activity')).toEqual({
      mode: 'clinical',
      key: 'balance',
    });
    expect(navStateForPath('/front-desk/arrivals/check-in')).toEqual({
      mode: 'front-desk',
      key: 'arrivals',
    });
  });

  it('lands every available work mode on an implemented route', () => {
    expect(entryPathForMode('clinical')).toBe('/home');
    expect(entryPathForMode('front-desk')).toBe('/front-desk/arrivals');
    expect(entryPathForMode('collection')).toBe('/collection/scan');
  });
});
