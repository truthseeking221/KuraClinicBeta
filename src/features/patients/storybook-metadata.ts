import { READINESS } from '../../components/foundations/readiness-data';

export const PATIENTS_STORYBOOK_KURA = {
  readiness: READINESS.patients,
  contract: {
    status: 'target-contract',
    backendMapping: 'ListWorkspacePatients (patient.proto) + GET /clinic/patients',
    backendRef: 'Kura-med/kura-platform@c55fd36 (freshest local checkout with apps/services)',
    consulted: [
      'libs/contracts/proto/patient.proto',
      'apps/services/patient-ms/src/app/origination/workspace-patients.service.ts',
      'apps/services/patient-ms/src/app/patient/entities/patient-profile.entity.ts',
      'libs/nest-common/src/lib/pii/decrypt-on-view.service.ts',
      'apps/bff/clinic-bff/src/app/patient/patient.controller.ts',
      'apps/clinic/clinic-patients-mf/src/app/patients-page.tsx',
    ],
    note:
      'The row shape, masking, recency order, and pagination mirror the live list contract verbatim. The triage column and assurance filter are design intent: the RPC accepts only limit/offset, and no triage model exists. Name search is impossible by schema (encrypted names, no HMAC) and is deliberately absent, not deferred.',
  },
  intake: {
    decision: 'COMPOSE + FEATURE-OWN',
    owner: 'src/features/patients',
    level: 'clinical page',
    evidence:
      'DataGrid, Badge, Avatar, SegmentedToggle, EmptyState, and Alert are the canonical owners; the registry composes them (doctor-banking/activity-ledger precedent). The legacy FINAL DCM patient table was reviewed and rejected as a source: its five-value identity status, free-text search, and condition columns contradict the platform schema. Its "why now" worklist idea is retained as the explicit triage layer.',
    exclusions: [
      'No free-text or name search input. Names are unsearchable by schema; patient resolution happens through the reception doors (exact phone, booking code) owned by front-desk and phone-gate.',
      'No client-side sorting. The server orders by workspace recency and accepts no sort parameter; re-sorting a fetched page would misrepresent the registry.',
      'No care-focus, last-event, or condition columns: no problems, encounters, or activity model exists in the platform.',
      'The chart action rail launches governed flows and reports result-arrival progress; it never completes clinical work in place. Batch ETAs, flag counts, and completion notifications have no backend model yet.',
    ],
  },
  source: 'kura-platform contract + FINAL DCM legacy review (2026-07-20)',
  binding: {
    colors: 'kura-semantic',
    typography: 'kura',
    spacing: 'kura',
    radius: 'kura',
    elevation: 'none',
    icons: 'kura-canonical',
    motion: 'data-grid-owned',
    responsive: 'horizontal-scroll-table',
  },
} as const;
