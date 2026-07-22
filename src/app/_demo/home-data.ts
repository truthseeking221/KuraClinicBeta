import type { HomeData } from '../../features/home';
import type { LicenceState } from '../../features/licence/logic';
import * as home from '../../features/home/demo-data';

import type { DemoSession } from './demo-session';

const HOME_BY_LICENCE: Record<LicenceState, HomeData> = {
  verified: home.busyMorning,
  none: home.licenceNone,
  pending_review: home.licencePendingReview,
  rejected: home.licenceRejected,
  expiring: home.licenceExpiring,
  in_grace: home.licenceInGrace,
  lapsed: home.licenceLapsed,
};

export function homeDataForSession(session: DemoSession): HomeData {
  if (session.demoProfile !== 'new-doctor') return HOME_BY_LICENCE[session.licence];

  const workspaceName = session.customWorkspaceName ?? 'My cabinet';
  return {
    ...home.newDoctorFirstHome,
    doctorName: session.userName,
    scopeLabel: workspaceName,
    licence: { state: session.licence },
  };
}
