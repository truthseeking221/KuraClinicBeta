'use client';

/**
 * Front-desk demo state shared across desk routes: the in-progress walk-in
 * and the receipts captured this session. Plays the role of the desk BFF.
 */

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { blankWalkIn, checkedInVisit, skipVisit } from '../../features/front-desk';
import type {
  DeskVisit,
  FrontDeskPatient,
  QueueSkipReasonCode,
} from '../../features/front-desk';

type FrontDeskStoreValue = {
  patient: FrontDeskPatient;
  setPatient: (patient: FrontDeskPatient) => void;
  /** Confirmed check-ins this session, newest first. */
  receipts: readonly FrontDeskPatient[];
  /** The room, as the queue sees it. Calling and drawing mutate these rows. */
  visits: readonly DeskVisit[];
  completeCheckIn: () => void;
  startNewWalkIn: () => void;
  callVisit: (visitId: string) => void;
  skipCalledVisit: (visitId: string, reason: QueueSkipReasonCode) => void;
  startDraw: (visitId: string) => void;
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
  const [visits, setVisits] = useState<DeskVisit[]>([]);

  function patchVisit(visitId: string, patch: (visit: DeskVisit) => DeskVisit) {
    setVisits((current) =>
      current.map((visit) => (visit.id === visitId ? patch(visit) : visit)),
    );
  }

  const value = useMemo<FrontDeskStoreValue>(
    () => ({
      patient,
      setPatient,
      receipts,
      visits,
      completeCheckIn: () => {
        setReceipts((current) => [patient, ...current]);
        setVisits((current) => [checkedInVisit(patient), ...current]);
      },
      startNewWalkIn: () => {
        walkInCounter += 1;
        setPatient(blankWalkIn(`walk-in-${walkInCounter}`, walkInCounter));
      },
      // One desk calls one patient at a time; the call is a recorded fact, not
      // a toast that disappears.
      callVisit: (visitId) =>
        patchVisit(visitId, (visit) => ({
          ...visit,
          call: { state: 'called', atLabel: 'Just now', deskLabel: 'Bay 1' },
        })),
      skipCalledVisit: (visitId, reason) =>
        patchVisit(visitId, (visit) => skipVisit(visit, reason, 'Just now')),
      // The same staffer draws: the visit moves into the chair, it is not
      // handed to a second role.
      startDraw: (visitId) =>
        patchVisit(visitId, (visit) => ({
          ...visit,
          stage: 'in-draw',
          call: { state: 'serving', deskLabel: 'Bay 1' },
        })),
    }),
    [patient, receipts, visits],
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
