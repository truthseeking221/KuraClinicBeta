'use client';

import { useState } from 'react';

import { AppShell, MODE_REGISTRY } from '../../components/shared/app-shell';
import type { ClinicMode, ClinicShift } from '../../components/shared/app-shell';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
} from '../../components/ui';
import {
  DEMO_NOW,
  DEMO_OPERATOR,
  DEMO_QUEUE,
  DrawWorksheet,
  ScanGate,
  queueForRole,
} from '../collection';
import type { CollectionPatient, Sample } from '../collection';
import {
  CheckInWizard,
  EXISTING_PATIENTS,
  blankWalkIn,
} from '../front-desk';
import type { FrontDeskPatient } from '../front-desk';

const AVAILABLE_MODES: ClinicMode[] = ['front-desk', 'collection'];
const PHLEBOTOMY_QUEUE = queueForRole(DEMO_QUEUE, 'phlebotomy');
const STORY_FX_RATE = {
  base: 'USD',
  quote: 'KHR',
  rateUnits: '4100',
  rateScale: 0,
} as const;

const RECEPTION_NAV = MODE_REGISTRY['front-desk'].nav.map((group) => ({
  ...group,
  items: group.items.filter((item) => item.key === 'arrivals'),
}));

/**
 * Full mock Clinic prototype that composes the canonical AppShell, Reception
 * check-in flow, and Phlebotomy collection flow. The two feature datasets stay
 * deliberately independent because the upstream queue handoff is not yet a
 * proven executable contract.
 */
export function ClinicOperationsPrototype() {
  const [mode, setMode] = useState<ClinicMode>('front-desk');
  const [activeKey, setActiveKey] = useState(MODE_REGISTRY['front-desk'].entryKey);
  const [shift, setShift] = useState<ClinicShift>('morning');

  const [receptionPatient, setReceptionPatient] = useState<FrontDeskPatient>(() =>
    blankWalkIn('prototype-walk-in-1', 33),
  );
  const [receptionComplete, setReceptionComplete] = useState(false);

  const [collectionPatient, setCollectionPatient] = useState<CollectionPatient | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [collectionComplete, setCollectionComplete] = useState(false);

  function changeMode(nextMode: ClinicMode) {
    setMode(nextMode);
    setActiveKey(MODE_REGISTRY[nextMode].entryKey);
  }

  function resetReception() {
    setReceptionPatient(blankWalkIn('prototype-walk-in-2', 34));
    setReceptionComplete(false);
  }

  function resetCollection() {
    setCollectionPatient(null);
    setSamples([]);
    setCollectionComplete(false);
  }

  return (
    <AppShell
      activeKey={activeKey}
      availableModes={AVAILABLE_MODES}
      banner={
        <Alert tone="info">
          <AlertTitle>Mock Storybook prototype</AlertTitle>
          <AlertDescription>
            No backend writes. Reception SMS code: 123456. Phlebotomy patient barcode:
            P104481.
          </AlertDescription>
        </Alert>
      }
      mode={mode}
      nav={mode === 'front-desk' ? RECEPTION_NAV : undefined}
      onModeChange={changeMode}
      onNavigate={setActiveKey}
      onShiftChange={setShift}
      posture={mode === 'collection' ? 'station' : 'sidebar'}
      station={{
        id: mode === 'front-desk' ? 'DESK-01' : 'PSC-01',
        role: mode === 'collection' ? 'phlebotomy' : undefined,
        shift,
      }}
      user={{
        name: 'Srey Neang',
        email: 'neang@mekong.clinic',
        licenceVerified: false,
      }}
      workspace={{
        id: 'ws-mekong',
        name: 'Mekong Clinic',
        branches: [
          { id: 'br-bkk', name: 'BKK1 Branch' },
          { id: 'br-tk', name: 'Toul Kork Branch' },
        ],
        activeBranchId: 'br-bkk',
      }}
    >
      {mode === 'front-desk' ? (
        receptionComplete ? (
          <Alert tone="success">
            <AlertTitle>Reception mock complete</AlertTitle>
            <AlertDescription>
              The check-in, priced order, and payment state are complete in local mock memory.
              Collection uses the preloaded Storybook queue.
            </AlertDescription>
            <AlertAction>
              <Button onClick={resetReception} variant="outline">
                Start next reception
              </Button>
              <Button onClick={() => changeMode('collection')} variant="primary">
                Open phlebotomy
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <CheckInWizard
            existingPatients={EXISTING_PATIENTS}
            fxRate={STORY_FX_RATE}
            onCheckIn={() => setReceptionComplete(true)}
            onPatientChange={setReceptionPatient}
            patient={receptionPatient}
          />
        )
      ) : collectionComplete && collectionPatient ? (
        <Alert tone="success">
          <AlertTitle>Collection mock complete</AlertTitle>
          <AlertDescription>
            Collection was submitted for {collectionPatient.name}. This mock stops before
            courier handoff and laboratory accession.
          </AlertDescription>
          <AlertAction>
            <Button onClick={resetCollection} variant="outline">
              Return to collection queue
            </Button>
            <Button onClick={() => changeMode('front-desk')} variant="primary">
              Open reception
            </Button>
          </AlertAction>
        </Alert>
      ) : collectionPatient ? (
        <DrawWorksheet
          now={DEMO_NOW}
          onMarkVitalsDone={() =>
            setCollectionPatient((current) =>
              current
                ? {
                    ...current,
                    journey: { ...current.journey, vitals: 'done' },
                  }
                : current,
            )
          }
          onSaveDraft={() => {
            setCollectionPatient(null);
            setSamples([]);
          }}
          onSubmit={() => setCollectionComplete(true)}
          onUpdateSamples={setSamples}
          operatorName={DEMO_OPERATOR}
          patient={collectionPatient}
          samples={samples}
        />
      ) : (
        <ScanGate
          onMatch={(patient) => {
            setCollectionPatient(patient);
            setSamples(patient.samples);
          }}
          queue={PHLEBOTOMY_QUEUE}
          role="phlebotomy"
        />
      )}
    </AppShell>
  );
}
