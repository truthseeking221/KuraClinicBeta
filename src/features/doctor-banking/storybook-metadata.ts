import { READINESS } from '../../components/foundations/readiness-data';

const BACKEND_REF =
  'Kura-med/kura-platform@f40291fe300b6eaacb5cd4c07984103620b88a0b';

export const DOCTOR_BANKING_STORYBOOK_KURA = {
  readiness: READINESS.doctorBanking,
  contract: {
    status: 'design-target',
    backendMapping: 'partial',
    backendRef: BACKEND_REF,
    consulted: [
      'docs/design/doctor-banking/aof-product-spec.md',
      'docs/design/doctor-banking/aof-ui-first-implementation-plan.md',
      'docs/adr/ADR-0064-doctor-person-banking-bounded-context.md',
      'libs/bff-client/src/doctor-banking-contract.ts',
      'apps/bff/clinic-bff/src/app/doctor-banking/doctor-banking.controller.ts',
    ],
    note:
      'Overview, entries, doctor-audience notifications, and statement download have a clinic BFF read boundary at the inspected ref. KHQR and ABA mandate actions remain target-contract fixture behavior in this Storybook owner and must not be presented as live.',
  },
  intake: {
    decision: 'DOMAIN-ADAPT',
    owner: 'src/features/doctor-banking',
    source:
      'Frozen doctor-banking product contract + ReUI c-data-grid-1 and c-filters-7 architecture through canonical Kura DataGrid and Filters',
    evidence:
      'No full ReUI doctor-banking block exists. Kura already owns exact ReUI-derived DataGrid and Filters capabilities, so the feature composes those owners instead of installing duplicate registry code.',
    exclusions: [
      'No chart, arbitrary top-up, payout, pause, selectable sweep schedule, or auto-pay cap.',
      'No operations-audience notification appears on doctor surfaces.',
      'Provider confirmation, not a local checkbox, is the only successful mandate-link transition.',
    ],
  },
  binding: {
    colors: 'kura-semantic',
    typography: 'kura',
    spacing: 'kura',
    radius: 'kura',
    elevation: 'overlays-only',
    icons: 'kura-canonical',
    focus: 'kura',
    responsive: 'STACKING + WRAPPING + SCROLLING(DataGrid)',
  },
  hierarchy: {
    level: 'Page',
    children: [
      'AppShell',
      'Alert',
      'Badge',
      'Button',
      'DataGrid',
      'Dialog',
      'EmptyState',
      'Filters',
      'Input',
      'MoneyText',
      'Skeleton',
    ],
  },
} as const;

export const ADMIN_DOCTOR_BANKING_STORYBOOK_KURA = {
  ...DOCTOR_BANKING_STORYBOOK_KURA,
  readiness: READINESS.adminDoctorBanking,
  intake: {
    ...DOCTOR_BANKING_STORYBOOK_KURA.intake,
    owner: 'src/features/admin-doctor-banking',
    evidence:
      'The admin surface composes the same canonical grid and filtering owners around AdminDoctorBankingDeps fields, audited corrections, floor history, pull retry eligibility, and permission states.',
  },
} as const;
