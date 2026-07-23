'use client';

/**
 * Collection station: scan gate → draw worksheet, the same glue as the
 * canonical clinic-operations prototype. Completing a draw returns the
 * station to the scan gate.
 */

import { useState } from 'react';

import { toast } from '../../../../components/ui';
import { DrawWorksheet, ScanGate } from '../../../../features/collection';
import type { CollectionDraft, CollectionPatient } from '../../../../features/collection';
import { emptyDraft } from '../../../../features/collection';
import { demoOnboardingScenarioById } from '../../../../features/auth/demo-data';
import {
  COLLECTION_DEMO_SCENARIOS,
  DEMO_NOW,
  DEMO_OPERATOR,
} from '../../../../features/collection/demo-data';
import type { CollectionDemoVariant } from '../../../../features/collection/demo-data';
import { useDemoSession } from '../../../_demo/demo-session';

export default function CollectionScanPage() {
  const { session } = useDemoSession();
  const scenario = demoOnboardingScenarioById(session.demoScenarioId);
  const configured =
    session.demoProfile === 'new-doctor'
      ? COLLECTION_DEMO_SCENARIOS['scan-empty']
      : scenario.surface === 'collection'
        ? COLLECTION_DEMO_SCENARIOS[scenario.variant as CollectionDemoVariant]
        : COLLECTION_DEMO_SCENARIOS['scan-queue'];
  const initialPatient =
    configured.view === 'worksheet' ? configured.patient : null;
  const [patient, setPatient] = useState<CollectionPatient | null>(initialPatient);
  // Only the mid-draw scenario seeds a draft; everything else starts empty.
  const seeded = (configured as { draft?: () => CollectionDraft }).draft;
  const [draft, setDraft] = useState<CollectionDraft>(() => seeded?.() ?? emptyDraft());
  const queue = configured.queue;
  const now = configured.view === 'worksheet' ? configured.now : DEMO_NOW;

  if (!patient) {
    return (
      <ScanGate
        onMatch={(matched) => {
          setPatient(matched);
          setDraft(emptyDraft());
        }}
        queue={queue}
        role="phlebotomy"
      />
    );
  }

  return (
    <DrawWorksheet
      draft={draft}
      now={now}
      onComplete={() => {
        toast.success(`${patient.name} — samples handed over`);
        setPatient(null);
        setDraft(emptyDraft());
      }}
      onDraftChange={setDraft}
      onNotify={(tone, text) => {
        if (tone === 'success') toast.success(text);
        else if (tone === 'danger') toast.error(text);
        else if (tone === 'warn') toast.warning(text);
        else toast(text);
      }}
      onSaveDraft={() => toast('Saved — the patient stays in the queue')}
      onSendToVitals={() => toast('Sent to the vital signs booth')}
      operatorName={DEMO_OPERATOR}
      patient={patient}
    />
  );
}
