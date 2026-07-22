'use client';

import { useMemo, useState } from 'react';

import {
  PatientAcquisitionFlow,
  type PatientAcquisitionJourneySnapshot,
  type PatientAcquisitionFlowProps,
} from '../care-loop/patient-acquisition-flow';

import { PatientsRegistry, type PatientsRegistryProps } from './patients-registry';
import { patientSummaryFromJourney, workItemFromJourney } from './journey-work-item';

type AcquisitionConfig = Pick<
  PatientAcquisitionFlowProps,
  | 'demoIntakeRecord'
  | 'intakeSendDelayMs'
  | 'intakeSendResult'
  | 'lookup'
  | 'phoneGateDelayMs'
>;

export type PatientsWorkspaceProps = Omit<
  PatientsRegistryProps,
  'onAddPatient' | 'onOpenWorkItem'
> & {
  /** Deterministic adapters for the Storybook and prototype flow. */
  acquisition?: AcquisitionConfig;
  /** Controlled persisted journey. `undefined` keeps Storybook self-contained. */
  journey?: PatientAcquisitionJourneySnapshot | null;
  onJourneyChange?: (journey: PatientAcquisitionJourneySnapshot) => void;
};

/**
 * Canonical Patients surface composition. The registry remains behind the
 * governed phone gate; creation never bypasses matching or provisional-patient
 * rules.
 */
export function PatientsWorkspace({
  acquisition,
  journey,
  onJourneyChange,
  ...registryProps
}: PatientsWorkspaceProps) {
  const [creationSurface, setCreationSurface] = useState<'registry' | 'phone-gate' | 'flow'>(
    'registry',
  );
  const [internalJourney, setInternalJourney] = useState<PatientAcquisitionJourneySnapshot | null>(
    journey ?? null,
  );
  const activeJourney = journey === undefined ? internalJourney : journey;
  const activePatient = activeJourney ? patientSummaryFromJourney(activeJourney) : undefined;
  const patients = useMemo(() => {
    if (!activePatient) return registryProps.patients;
    return [
      activePatient,
      ...registryProps.patients.filter((patient) => patient.userId !== activePatient.userId),
    ];
  }, [activePatient, registryProps.patients]);
  const workItems = useMemo(() => {
    if (!activeJourney || !activePatient) return registryProps.workItems;
    return {
      ...registryProps.workItems,
      [activePatient.userId]: workItemFromJourney(activeJourney),
    };
  }, [activeJourney, activePatient, registryProps.workItems]);

  function saveJourney(next: PatientAcquisitionJourneySnapshot) {
    if (journey === undefined) setInternalJourney(next);
    onJourneyChange?.(next);
  }

  function openWorkItem(userId: string) {
    if (!activeJourney || activePatient?.userId !== userId) {
      registryProps.onOpenPatient?.(userId);
      return;
    }
    const item = workItemFromJourney(activeJourney);
    if (item.action === 'continue') {
      setCreationSurface('flow');
      return;
    }
    registryProps.onOpenPatient?.(userId);
  }

  function openPatient(userId: string) {
    if (
      activeJourney &&
      activePatient?.userId === userId &&
      workItemFromJourney(activeJourney).action === 'continue'
    ) {
      setCreationSurface('flow');
      return;
    }
    registryProps.onOpenPatient?.(userId);
  }

  return (
    <>
      {creationSurface !== 'flow' ? (
        <PatientsRegistry
          {...registryProps}
          key="patients-registry"
          onAddPatient={() => setCreationSurface('phone-gate')}
          onOpenPatient={openPatient}
          onOpenWorkItem={openWorkItem}
          patients={patients}
          workItems={workItems}
        />
      ) : null}
      {creationSurface !== 'registry' ? (
        <PatientAcquisitionFlow
          {...acquisition}
          key="patient-acquisition"
          entryPresentation="overlay"
          initialJourney={creationSurface === 'flow' ? activeJourney ?? undefined : undefined}
          initialStage="phone-gate"
          onJourneyChange={saveJourney}
          onExit={() => setCreationSurface('registry')}
          onPhoneGateResolved={() => setCreationSurface('flow')}
          onReviewResults={(patientId) => registryProps.onOpenPatient?.(patientId)}
        />
      ) : null}
    </>
  );
}
