import { READINESS } from '../../components/foundations/readiness-data';

export const PATIENT_CONTEXT_STORYBOOK_KURA = {
  readiness: READINESS.patientContext,
  intake: {
    decision: 'FEATURE-OWN + COMPOSE',
    owner: 'src/features/patient-context',
    level: 'clinical organism',
    evidence:
      'Storybook inventory has canonical Accordion, Avatar, Alert, Button, Skeleton, and Kura icon owners, but no patient-context rail. ReUI search returned no compatible component. The rail composes existing primitives and remains a target-contract fixture until the patient-chart context API exists.',
    exclusions: [
      'No edit, prescribe, identity-verification, or workflow transition action is exposed.',
      'No Figma icon assets, foreign icon libraries, or copied SVGs are used.',
      'No prototype-app integration is included; Storybook remains the canonical owner.',
    ],
  },
  source: 'Figma Kura Design node 1253:93620',
  figma: {
    component: 'Patient context rail',
    node: '1253:93620',
    states: {
      established: '1253:93618',
      newPatient: '1253:93619',
      activeProblems: '1253:101475',
      currentMedications: '1253:101998',
      pendingVerification: '1253:102225',
      pastHistory: '1253:102448',
      adminDetails: '1253:102683',
      activeProblemsEmpty: '1253:102916',
      currentMedicationsEmpty: '1253:103117',
      allExpanded: '1335:31524',
    },
  },
  binding: {
    colors: 'kura-semantic',
    typography: 'kura',
    spacing: 'kura',
    radius: 'kura',
    elevation: 'none',
    icons: 'kura-canonical',
    motion: 'accordion-owned',
    responsive: 'rail-to-full-width',
  },
  contract: {
    status: 'target-contract',
    note:
      'The current clinic BFF exposes patient search and identity verification, not a longitudinal EMR context payload for allergies, active problems, medications, history, or administrative details. Stories use deterministic fixtures and must be presented as design intent.',
  },
} as const;
