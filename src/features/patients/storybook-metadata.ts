import { READINESS } from '../../components/foundations/readiness-data';

export const PATIENTS_STORYBOOK_KURA = {
  readiness: READINESS.patients,
  contract: {
    status: 'target-contract',
    backendMapping:
      'ListWorkspacePatients (patient.proto) + GET /clinic/patients',
    backendRef:
      'Kura-med/kura-platform@c55fd36 (freshest local checkout with apps/services)',
    consulted: [
      'libs/contracts/proto/patient.proto',
      'apps/services/patient-ms/src/app/origination/workspace-patients.service.ts',
      'apps/services/patient-ms/src/app/patient/entities/patient-profile.entity.ts',
      'libs/nest-common/src/lib/pii/decrypt-on-view.service.ts',
      'apps/bff/clinic-bff/src/app/patient/patient.controller.ts',
      'apps/clinic/clinic-patients-mf/src/app/patients-page.tsx',
    ],
    note: 'The row shape, masking, recency order, and pagination mirror the live list contract verbatim. Both status axes come from that record and are rendered as two columns: assurance is the identity axis (verified means a sighted document), and a masked phone is populated only for a verified primary number, so its absence is the contact axis stating itself. The triage column and assurance filter are design intent: the RPC accepts only limit/offset, and no triage model exists. Name search is impossible by schema (encrypted names, no HMAC) and is deliberately absent, not deferred.',
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
      'No single "Verified" verdict per patient. Identity and contact are separate facts everywhere in the product, and the registry states each under a header that names its axis.',
      'No merge-review-pending, NID-collision, stale-phone, or reused-patient status. The profile carries deceased and merged only; the rest would be invented identity states, and the legacy five-value identityStatus was already rejected for that reason.',
      'No stated next step per row beyond the target-contract triage and work-item layers. A provisional record is a complete outcome; an intake or an order is a later clinical decision, not the registry’s claim.',
      'The chart action rail launches governed flows and reports result-arrival progress. The patient-order flow is a Storybook-owned adapter: authoritative placement remains at its supplied action boundary, while the chart record refreshes only after that boundary returns a placed order. Batch ETAs, flag counts, and completion notifications have no backend model yet.',
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

export const PRESCRIBE_STORYBOOK_KURA = {
  readiness: READINESS.prescribing,
  contract: {
    status: 'target-contract',
    backendMapping:
      'No prescription or medication-reconciliation contract exists',
    backendRef:
      'Kura-med/kura-platform@c55fd36 (freshest inspected local checkout)',
    consulted: [
      'libs/contracts/proto/patient.proto',
      'apps/bff/clinic-bff/src/app/patient/patient.controller.ts',
      'apps/clinic/clinic-patients-mf/src/app/patients-page.tsx',
    ],
    note: 'The workspace models a local, unsigned medication draft only. It does not persist, sign, send, dispense, or imply a prescription. AI proposals expose their evidence and missing checks and always require deliberate clinician addition.',
  },
  intake: {
    decision: 'COMPOSE + FEATURE-OWN',
    owner: 'src/features/patients/prescribe-rail.tsx',
    level: 'clinical composite',
    evidence:
      'Kura Autocomplete (adapted from ReUI), Collapsible, SegmentedToggle, Alert, Button, Badge, and canonical icons own the interaction architecture. The feature composes whole-regimen reconciliation, local draft state, AI provenance, and the target-contract safety boundary without recreating those lower layers.',
    exclusions: [
      'No signed, sent, dispensed, active, or clinically closed prescription state.',
      'No autonomous medication application or hidden AI provenance.',
      'No claim of persistence beyond the current prototype session.',
    ],
  },
  source: 'Kura target contract + FINAL DCM legacy review (2026-07-21)',
  binding: {
    colors: 'kura-semantic including AI provenance',
    typography: 'kura',
    spacing: 'kura',
    radius: 'kura',
    elevation: 'none',
    icons: 'kura-canonical',
    motion: 'kura tokens',
    responsive:
      'contained right rail; 320px reflow preserves the review decision and footer state',
  },
} as const;
