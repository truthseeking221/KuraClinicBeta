import { describe, expect, it } from 'vitest';

import { EARNINGS_DEMO_SCENARIOS } from '../doctor-banking/demo-data';
import { HOME_DEMO_SCENARIOS } from '../home/demo-data';
import {
  PATIENT_CHART_DEMO_SCENARIOS,
  PATIENTS_REGISTRY_DEMO_SCENARIOS,
} from '../patients/demo-data';
import { RESULTS_DEMO_SCENARIOS } from '../results/demo-data';
import {
  FRONT_DESK_CHECK_IN_DEMO_SCENARIOS,
  FRONT_DESK_PAYMENT_DEMO_SCENARIOS,
  FRONT_DESK_QUEUE_DEMO_SCENARIOS,
} from '../front-desk/demo-data';
import { COLLECTION_DEMO_SCENARIOS } from '../collection/demo-data';

import { DEMO_ACCOUNTS, DEMO_OTP } from './demo-data';
import { DEMO_ONBOARDING_SCENARIOS } from './demo-scenario-registry';
import { verifyDoorCode } from './logic';

const UNSETTLED_JOURNEYS = new Set([
  'ACC-07',
  'ACC-09',
  'ACC-10',
  'ACC-12',
  'WQ-08',
  'PAT-21',
  'PAT-22',
  'PAT-23',
  'PAT-24',
  'ENC-08',
  'ENC-10',
  'ENC-13',
  'ORD-12',
  'ORD-20',
  'ORD-21',
  'REC-06',
  'PHL-05',
  'PHL-09',
  'LOG-04',
  'LOG-09',
  'LOG-11',
  'LOG-12',
  'RES-02',
  'RES-09',
  'RES-11',
  'RES-12',
  'FIN-03',
  'FIN-05',
  'FIN-14',
  'COM-03',
  'INV-04',
  'ADM-08',
  'MOB-04',
  'MOB-05',
]);

describe('onboarding-driven demo scenario registry', () => {
  it('keeps every phone and scenario id unique', () => {
    const phones = DEMO_ONBOARDING_SCENARIOS.map((scenario) => scenario.phone);
    const ids = DEMO_ONBOARDING_SCENARIOS.map((scenario) => scenario.id);

    expect(new Set(phones).size).toBe(phones.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('covers the source-backed routed scenario set', () => {
    expect(DEMO_ONBOARDING_SCENARIOS).toHaveLength(90);
    expect(new Set(DEMO_ONBOARDING_SCENARIOS.map((scenario) => scenario.surface))).toEqual(
      new Set([
        'onboarding',
        'home',
        'patients',
        'patient-chart',
        'results',
        'earnings',
        'front-desk-queue',
        'front-desk-check-in',
        'front-desk-payments',
        'collection',
      ]),
    );
  });

  it('keeps staff identity separate from capability and Storybook access evidence', () => {
    const staffScenarios = DEMO_ONBOARDING_SCENARIOS.filter(
      (scenario) => scenario.actor && scenario.actor !== 'doctor',
    );

    expect(staffScenarios.length).toBeGreaterThan(0);
    for (const scenario of staffScenarios) {
      expect(scenario.accessProfile).toBeTruthy();
      expect(scenario.mode).toMatch(/^(front-desk|collection)$/);
      expect(scenario.accessSource).toContain('Clinic/Shell/App Shell#');
      expect(scenario.workspace).toBeTruthy();
    }
  });

  it('does not issue demo phones for open, deferred, or design-gap journeys', () => {
    const registeredJourneyIds = DEMO_ONBOARDING_SCENARIOS.flatMap(
      (scenario) => scenario.journeyIds,
    );

    expect(registeredJourneyIds.filter((id) => UNSETTLED_JOURNEYS.has(id))).toEqual([]);
  });

  it('keeps every runnable scenario traceable to a route and Storybook source', () => {
    for (const scenario of DEMO_ONBOARDING_SCENARIOS) {
      expect(scenario.entryPath).toMatch(/^\//);
      expect(scenario.journeyIds.length).toBeGreaterThan(0);
      expect(scenario.source).toContain('#');
    }
  });

  it('routes every registered phone through the Door before its app entry', () => {
    for (const scenario of DEMO_ONBOARDING_SCENARIOS) {
      const outcome = verifyDoorCode(scenario.phone, DEMO_OTP, DEMO_OTP, DEMO_ACCOUNTS);

      if (scenario.kind === 'new-sign-up') {
        expect(outcome).toEqual({ kind: 'success', route: 'wizard' });
      } else if (scenario.kind === 'revoked') {
        expect(outcome).toEqual({ kind: 'revoked' });
      } else {
        expect(outcome).toEqual({ kind: 'success', route: 'workspace' });
      }
    }
  });

  it('resolves every app variant from its canonical feature demo-data', () => {
    for (const scenario of DEMO_ONBOARDING_SCENARIOS) {
      if (scenario.surface === 'home' && scenario.kind === 'established-workspace') {
        expect(scenario.variant in HOME_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'patients') {
        expect(scenario.variant in PATIENTS_REGISTRY_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'patient-chart') {
        expect(scenario.variant in PATIENT_CHART_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'results') {
        expect(scenario.variant in RESULTS_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'earnings') {
        expect(scenario.variant in EARNINGS_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'front-desk-queue') {
        expect(scenario.variant in FRONT_DESK_QUEUE_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'front-desk-check-in') {
        expect(scenario.variant in FRONT_DESK_CHECK_IN_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'front-desk-payments') {
        expect(scenario.variant in FRONT_DESK_PAYMENT_DEMO_SCENARIOS).toBe(true);
      }
      if (scenario.surface === 'collection') {
        expect(scenario.variant in COLLECTION_DEMO_SCENARIOS).toBe(true);
      }
    }
  });
});
