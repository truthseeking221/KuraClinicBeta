import { READINESS } from '../../components/foundations/readiness-data';

export const RESULTS_STORYBOOK_KURA = {
  readiness: READINESS.results,
  contract: {
    status: 'design-target',
    backendMapping: 'pending',
    backendRef: 'Kura-med/kura-platform@938b172b05d3bcbeabbcdb9226ff2d06ce7afa36',
    consulted: [
      'docs/design/results/results-product-spec.md',
      'docs/adr/ADR-0047-order-rollup-void-amendments.md',
      'apps/clinic-bff',
      'apps/test-ms',
      'apps/lab-ms',
      'libs/contracts',
    ],
    note:
      'Product/design intentionally leads executable backend delivery. Stories must not be read as a claim that the current clinic BFF already exposes typed longitudinal values or acknowledgment writes.',
  },
  intake: {
    decision: 'FEATURE-OWN',
    owner: 'src/features/results',
    source:
      'Figma 182:167149 + FINAL DCM LabHistory behavior reference + ReUI chart architecture reference',
    evidence:
      'Existing Storybook had no canonical doctor longitudinal result family. ReUI chart dependency was rejected; Kura-owned SVG charts use catalog reference tiers and released observations only.',
  },
  journeys: [
    'doctor-reviews-first-visit-results',
    'doctor-monitors-partial-release',
    'doctor-reviews-longitudinal-history',
    'doctor-acknowledges-critical-result',
    'doctor-closes-result-review',
  ],
  binding: {
    colors: 'kura-semantic',
    typography: 'kura',
    spacing: 'kura-density-aware',
    radius: 'kura',
    elevation: 'kura',
    icons: 'kura-canonical',
    focus: 'kura',
    responsive: 'mobile-first-contract',
  },
} as const;
