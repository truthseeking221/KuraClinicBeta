'use client';

/**
 * Collection station: scan gate → draw worksheet, the same glue as the
 * canonical clinic-operations prototype. Completing a draw returns the
 * station to the scan gate.
 */

import { useState } from 'react';

import { toast } from '../../../../components/ui';
import { DrawWorksheet, ScanGate } from '../../../../features/collection';
import type { CollectionPatient, Sample } from '../../../../features/collection';
import {
  DEMO_NOW,
  DEMO_OPERATOR,
  DEMO_QUEUE,
} from '../../../../features/collection/demo-data';
import { queueForRole } from '../../../../features/collection/logic';

const PHLEBOTOMY_QUEUE = queueForRole([...DEMO_QUEUE], 'phlebotomy');

export default function CollectionScanPage() {
  const [patient, setPatient] = useState<CollectionPatient | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);

  if (!patient) {
    return (
      <ScanGate
        onMatch={(matched) => {
          setPatient(matched);
          setSamples(matched.samples);
        }}
        queue={PHLEBOTOMY_QUEUE}
        role="phlebotomy"
      />
    );
  }

  return (
    <DrawWorksheet
      now={DEMO_NOW}
      onMarkVitalsDone={() => toast.success('Vitals recorded')}
      onNotify={(tone, text) => {
        if (tone === 'success') toast.success(text);
        else if (tone === 'danger') toast.error(text);
        else if (tone === 'warn') toast.warning(text);
        else toast(text);
      }}
      onSaveDraft={() => toast('Draft saved')}
      onSubmit={() => {
        toast.success(`${patient.name} — samples submitted to lab`);
        setPatient(null);
        setSamples([]);
      }}
      onUpdateSamples={setSamples}
      operatorName={DEMO_OPERATOR}
      patient={patient}
      samples={samples}
    />
  );
}
