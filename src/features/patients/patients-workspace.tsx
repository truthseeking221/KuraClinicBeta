'use client';

import { useState } from 'react';

import {
  PatientAcquisitionFlow,
  type PatientAcquisitionFlowProps,
} from '../care-loop/patient-acquisition-flow';

import { PatientsRegistry, type PatientsRegistryProps } from './patients-registry';

type AcquisitionConfig = Pick<
  PatientAcquisitionFlowProps,
  | 'demoIntakeRecord'
  | 'intakeSendDelayMs'
  | 'intakeSendResult'
  | 'lookup'
  | 'phoneGateDelayMs'
>;

export type PatientsWorkspaceProps = Omit<PatientsRegistryProps, 'onAddPatient'> & {
  /** Deterministic adapters for the Storybook and prototype flow. */
  acquisition?: AcquisitionConfig;
};

/**
 * Canonical Patients surface composition. The registry remains behind the
 * governed phone gate; creation never bypasses matching or provisional-patient
 * rules.
 */
export function PatientsWorkspace({ acquisition, ...registryProps }: PatientsWorkspaceProps) {
  const [creationSurface, setCreationSurface] = useState<'registry' | 'phone-gate' | 'flow'>(
    'registry',
  );

  return (
    <>
      {creationSurface !== 'flow' ? (
        <PatientsRegistry
          {...registryProps}
          key="patients-registry"
          onAddPatient={() => setCreationSurface('phone-gate')}
        />
      ) : null}
      {creationSurface !== 'registry' ? (
        <PatientAcquisitionFlow
          {...acquisition}
          key="patient-acquisition"
          entryPresentation="overlay"
          initialStage="phone-gate"
          onExit={() => setCreationSurface('registry')}
          onPhoneGateResolved={() => setCreationSurface('flow')}
        />
      ) : null}
    </>
  );
}
