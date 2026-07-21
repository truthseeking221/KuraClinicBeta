'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

import { NextActionsRail, PatientChart, PrescribeRail } from '../../../../features/patients';
import {
  DEMO_DIAGNOSES,
  DEMO_NEEDS_REVIEW,
  DEMO_ORDERS,
  DEMO_PATIENTS,
  DEMO_SEARCH_POOL,
  DEMO_SETTLED,
  DEMO_SUGGESTIONS,
} from '../../../../features/patients/demo-data';
import type { PatientSummary } from '../../../../features/patients';
import { PatientContextRail } from '../../../../features/patient-context/patient-context-rail';
import { PATIENT_CONTEXT_FIXTURES } from '../../../../features/patient-context/demo-data';
import { LabFlowsheet } from '../../../../features/results';
import { FIRST_VISIT_SECTIONS } from '../../../../features/results/demo-data';

/** Demo stand-in for merged_into_user_id, which the list row does not carry. */
const MERGE_TARGET = 'p-sok-nimol';

export default function PatientChartPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = use(params);
  const router = useRouter();
  const found = DEMO_PATIENTS.find((row) => row.userId === patientId);
  // Verify-identity is local demo state: the endpoint returns the updated ref.
  const [verified, setVerified] = useState<PatientSummary | null>(null);
  // The rail swaps in place with the moment: launcher by default, prescribe
  // review while prescribing. Same room, different furniture.
  const [railMode, setRailMode] = useState<'actions' | 'prescribe'>('actions');
  const patient = verified?.userId === patientId ? verified : found;

  if (!patient) {
    return (
      <PatientChart
        onBack={() => router.push('/patients')}
        patient={DEMO_PATIENTS[0]}
        state="not-found"
      />
    );
  }

  const patientName = patient.displayName || 'this patient';

  return (
    <PatientChart
      actionRail={
        railMode === 'prescribe' ? (
          <PrescribeRail
            diagnoses={DEMO_DIAGNOSES}
            needsReview={DEMO_NEEDS_REVIEW}
            onBack={() => setRailMode('actions')}
            onComplete={() => setRailMode('actions')}
            patientName={patientName}
            searchPool={DEMO_SEARCH_POOL}
            settled={DEMO_SETTLED}
            suggestions={DEMO_SUGGESTIONS}
          />
        ) : (
          <NextActionsRail
            onOrder={() => router.push('/catalog')}
            onPrescribe={() => setRailMode('prescribe')}
            patientName={patientName}
          />
        )
      }
      onBack={() => router.push('/patients')}
      onOpenMergedRecord={() => router.push(`/patients/${MERGE_TARGET}`)}
      onSwitchPatient={(userId) => router.push(`/patients/${userId}`)}
      onVerifyIdentity={() => setVerified({ ...patient, assurance: 'verified' })}
      orders={DEMO_ORDERS}
      patient={patient}
      patients={DEMO_PATIENTS}
      rail={
        <PatientContextRail {...PATIENT_CONTEXT_FIXTURES.established} showIdentity={false} />
      }
      results={
        <LabFlowsheet sections={FIRST_VISIT_SECTIONS} title="Results — booking AB12345" />
      }
    />
  );
}
