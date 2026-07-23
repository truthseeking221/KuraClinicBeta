import { READINESS } from '../../components/foundations/readiness-data';

const BACKEND_REF =
  'Kura-med/kura-platform@f40291fe300b6eaacb5cd4c07984103620b88a0b';

/**
 * The clinic BFF exposes reads only: overview, filtered entries,
 * doctor-audience notifications, and PDF/XLSX statements. Every browser action
 * that moves money — KHQR, ABA linking, renewal, unlink, JIT pull, order gate —
 * is still target contract and must never be presented as live.
 */
export const DOCTOR_BANKING_STORYBOOK_KURA = {
  readiness: READINESS.doctorBanking,
  contract: {
    status: 'design-target',
    backendMapping: 'partial',
    backendRef: BACKEND_REF,
    providerTransition: 'provider-confirmed-only',
    consulted: [
      'docs/specs/domains/doctor-banking/aof-product-spec.md',
      'docs/adr/ADR-0064-doctor-person-banking-bounded-context.md',
      'libs/contracts/proto/doctor_banking.proto',
      'apps/services/doctor-banking-ms/src/app/account/account.service.ts',
      'apps/bff/clinic-bff/src/app/doctor-banking/doctor-banking.controller.ts',
    ],
    note:
      'Doctor-facing name is Balance; doctor-banking stays the bounded-context name. Earned in <month> is settled positive completion_credit since the month start — pending earnings are excluded. There is no withdrawal or cash payout in v1.',
  },
  intake: {
    decision: 'DOMAIN-ADAPT',
    owner: 'src/features/doctor-banking',
    source:
      'Frozen doctor-banking product contract + ReUI c-data-grid-1 and c-filters-7 architecture through canonical Kura DataGrid and Filters',
    evidence:
      'No full ReUI doctor-banking block exists. Kura already owns exact ReUI-derived DataGrid and Filters capabilities, so the feature composes those owners instead of installing duplicate registry code.',
    exclusions: [
      'No Withdraw, Payout account, or Available to withdraw. Cash payout is out of scope in v1.',
      'No chart, arbitrary top-up, pause, selectable sweep schedule, or auto-pay cap.',
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
      'Card',
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

/** Read surfaces the clinic BFF already serves at the inspected ref. */
export const BALANCE_LIVE_READ_STORYBOOK_KURA = {
  ...DOCTOR_BANKING_STORYBOOK_KURA,
  contract: { ...DOCTOR_BANKING_STORYBOOK_KURA.contract, backendMapping: 'live' },
} as const;

/** Surfaces whose actions have no live boundary: KHQR, linking, unlink, JIT. */
export const BALANCE_TARGET_CONTRACT_STORYBOOK_KURA = {
  ...DOCTOR_BANKING_STORYBOOK_KURA,
  contract: { ...DOCTOR_BANKING_STORYBOOK_KURA.contract, backendMapping: 'target-contract' },
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
