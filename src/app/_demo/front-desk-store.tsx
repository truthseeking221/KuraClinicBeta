'use client';

/**
 * Front-desk demo state shared across desk routes: the in-progress walk-in
 * and the receipts captured this session. Plays the role of the desk BFF.
 */

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { blankWalkIn } from '../../features/front-desk';
import type { FrontDeskPatient } from '../../features/front-desk';

type FrontDeskStoreValue = {
  patient: FrontDeskPatient;
  setPatient: (patient: FrontDeskPatient) => void;
  /** Confirmed check-ins this session, newest first. */
  receipts: readonly FrontDeskPatient[];
  completeCheckIn: () => void;
  startNewWalkIn: () => void;
};

const FrontDeskStoreContext = createContext<FrontDeskStoreValue | null>(null);

let walkInCounter = 12;

export function FrontDeskStoreProvider({
  children,
  initialPatient,
}: {
  children: ReactNode;
  initialPatient?: FrontDeskPatient;
}) {
  const [patient, setPatient] = useState<FrontDeskPatient>(() =>
    initialPatient ?? blankWalkIn('walk-in-current', walkInCounter),
  );
  const [receipts, setReceipts] = useState<FrontDeskPatient[]>([]);

  const value = useMemo<FrontDeskStoreValue>(
    () => ({
      patient,
      setPatient,
      receipts,
      completeCheckIn: () => {
        setReceipts((current) => [patient, ...current]);
      },
      startNewWalkIn: () => {
        walkInCounter += 1;
        setPatient(blankWalkIn(`walk-in-${walkInCounter}`, walkInCounter));
      },
    }),
    [patient, receipts],
  );

  return (
    <FrontDeskStoreContext.Provider value={value}>{children}</FrontDeskStoreContext.Provider>
  );
}

export function useFrontDeskStore(): FrontDeskStoreValue {
  const context = useContext(FrontDeskStoreContext);
  if (!context) throw new Error('useFrontDeskStore must be used inside FrontDeskStoreProvider.');
  return context;
}
