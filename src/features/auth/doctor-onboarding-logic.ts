import { isLiveLicence } from '../licence/logic';
import type { LicenceState } from '../licence/logic';

export type SessionGateState = 'active' | 'expired';
export type PhoneGateState = 'verified' | 'missing_required' | 'exempt';
export type WorkspaceGateState = 'active' | 'missing' | 'denied';
export type MembershipGateState = 'active' | 'pending' | 'revoked';
export type BranchGateState = 'active' | 'not_required' | 'required' | 'denied';
export type OrderCapabilityState = 'granted' | 'missing';
export type MedicalDeclarationState = 'medical' | 'non_medical' | 'unanswered';
export type AttributedPrescriberState = 'self' | 'other_live_member' | 'none';
export type DoctorBankingState =
  | 'not_eligible'
  | 'optional_unlinked'
  | 'linked'
  | 'self_action_required'
  | 'delegated_action_required';

/**
 * Independent facts used to derive onboarding readiness.
 *
 * Account, workspace, membership, branch, capability, credential and doctor
 * banking must remain separate. No role label or presentation tier may
 * silently populate another axis.
 */
export type DoctorOnboardingSnapshot = {
  session: SessionGateState;
  phone: PhoneGateState;
  workspace: WorkspaceGateState;
  membership: MembershipGateState;
  branch: BranchGateState;
  orderCapability: OrderCapabilityState;
  declaration: MedicalDeclarationState;
  licence: LicenceState;
  attributedPrescriber: AttributedPrescriberState;
  banking: DoctorBankingState;
};

export type OnboardingGateId =
  | 'session'
  | 'phone'
  | 'workspace'
  | 'membership'
  | 'branch'
  | 'capability'
  | 'licence';

export type OnboardingGateStatus =
  'ready' | 'current' | 'warning' | 'blocked' | 'not_applicable';

export type OnboardingGateDecision = {
  id: OnboardingGateId;
  label: string;
  status: OnboardingGateStatus;
  statusLabel: string;
  detail: string;
};

export type OnboardingCapabilityId =
  'catalog' | 'prices' | 'clinic_order' | 'doctor_banking';

export type OnboardingCapabilityDecision = {
  id: OnboardingCapabilityId;
  label: string;
  state: 'available' | 'blocked' | 'optional' | 'action_required';
  stateLabel: string;
  detail: string;
};

export type OnboardingActionKind =
  | 'sign_in'
  | 'verify_phone'
  | 'create_workspace'
  | 'restore_membership'
  | 'choose_branch'
  | 'request_capability'
  | 'answer_declaration'
  | 'submit_licence'
  | 'view_submission'
  | 'replace_licence'
  | 'renew_licence'
  | 'select_prescriber'
  | 'resolve_banking'
  | 'request_prescriber_action'
  | 'refresh_status'
  | 'open_home';

export type OnboardingPrimaryAction = {
  kind: OnboardingActionKind;
  label: string;
  detail: string;
};

export type DoctorOnboardingReadiness = {
  status: 'blocked' | 'limited' | 'reviewing' | 'attention' | 'ready';
  statusLabel: string;
  title: string;
  description: string;
  gates: OnboardingGateDecision[];
  capabilities: OnboardingCapabilityDecision[];
  primaryAction: OnboardingPrimaryAction;
  canOpenCatalog: boolean;
  canStartClinicOrder: boolean;
  canOpenDoctorBanking: boolean;
  invariantIssues: string[];
};

const LICENCE_STATE_LABELS: Record<LicenceState, string> = {
  none: 'Not submitted',
  pending_review: 'Under review',
  rejected: 'Action required',
  verified: 'Verified',
  expiring: 'Expiring',
  in_grace: 'In grace',
  lapsed: 'Lapsed',
};

function scopedAccessBlock(snapshot: DoctorOnboardingSnapshot): string | null {
  if (snapshot.session !== 'active')
    return 'Sign in again before clinic data is loaded.';
  if (snapshot.phone === 'missing_required') {
    return 'Verify the required phone before self-serve onboarding can finish.';
  }
  if (snapshot.workspace === 'missing')
    return 'Create or join a clinic workspace first.';
  if (snapshot.workspace === 'denied')
    return 'This workspace is not accessible to the account.';
  if (snapshot.membership === 'pending')
    return 'Wait for the membership to become active.';
  if (snapshot.membership === 'revoked')
    return 'The workspace membership has been revoked.';
  if (snapshot.branch === 'required')
    return 'Choose an assigned branch before continuing.';
  if (snapshot.branch === 'denied')
    return 'The selected branch is outside the member scope.';
  return null;
}

function licenceGate(
  snapshot: DoctorOnboardingSnapshot,
): OnboardingGateDecision {
  if (snapshot.declaration === 'unanswered') {
    return {
      id: 'licence',
      label: 'Professional licence',
      status: 'current',
      statusLabel: 'Declaration needed',
      detail:
        'Answer the medical-licence question. This does not assign a role or permission.',
    };
  }

  if (snapshot.declaration === 'non_medical') {
    return {
      id: 'licence',
      label: 'Professional licence',
      status: 'not_applicable',
      statusLabel: 'Not applicable',
      detail:
        'Non-medical members are not prompted. They may act only within granted capabilities and delegated attribution.',
    };
  }

  switch (snapshot.licence) {
    case 'none':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'current',
        statusLabel: LICENCE_STATE_LABELS.none,
        detail:
          'Submit one licence document through the verification pipeline.',
      };
    case 'pending_review':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'current',
        statusLabel: LICENCE_STATE_LABELS.pending_review,
        detail:
          'The immutable submission is awaiting a reviewer verdict. It is not live for attribution yet.',
      };
    case 'rejected':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'blocked',
        statusLabel: LICENCE_STATE_LABELS.rejected,
        detail:
          'Review the rejection reason and submit a corrected document. The rejected attempt remains in history.',
      };
    case 'verified':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'ready',
        statusLabel: LICENCE_STATE_LABELS.verified,
        detail:
          'The credential is live for clinic-order attribution. Scope and role gates still apply independently.',
      };
    case 'expiring':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'warning',
        statusLabel: LICENCE_STATE_LABELS.expiring,
        detail:
          'Attribution remains available, but renewal is due before the current licence lapses.',
      };
    case 'in_grace':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'warning',
        statusLabel: LICENCE_STATE_LABELS.in_grace,
        detail:
          'Attribution remains live during the grace period. Renew before the lapse deadline.',
      };
    case 'lapsed':
      return {
        id: 'licence',
        label: 'Professional licence',
        status: 'blocked',
        statusLabel: LICENCE_STATE_LABELS.lapsed,
        detail:
          'New clinic orders cannot use this person for attribution. Existing placed episodes are not revoked retroactively.',
      };
  }
}

function deriveGates(
  snapshot: DoctorOnboardingSnapshot,
): OnboardingGateDecision[] {
  return [
    {
      id: 'session',
      label: 'Authenticated session',
      status: snapshot.session === 'active' ? 'ready' : 'blocked',
      statusLabel: snapshot.session === 'active' ? 'Active' : 'Expired',
      detail:
        snapshot.session === 'active'
          ? 'The clinic audience session is active.'
          : 'No workspace data or mutation may load until the user signs in again.',
    },
    {
      id: 'phone',
      label: 'Verified phone',
      status:
        snapshot.phone === 'verified'
          ? 'ready'
          : snapshot.phone === 'exempt'
            ? 'not_applicable'
            : 'blocked',
      statusLabel:
        snapshot.phone === 'verified'
          ? 'Verified'
          : snapshot.phone === 'exempt'
            ? 'Invite exemption'
            : 'Required',
      detail:
        snapshot.phone === 'verified'
          ? 'The onboarding phone requirement is satisfied.'
          : snapshot.phone === 'exempt'
            ? 'Invited non-medical staff may remain phone-less while retaining another verified sign-in identifier.'
            : 'A self-serve medical account cannot complete onboarding or submit a licence without a verified phone.',
    },
    {
      id: 'workspace',
      label: 'Workspace context',
      status: snapshot.workspace === 'active' ? 'ready' : 'blocked',
      statusLabel:
        snapshot.workspace === 'active'
          ? 'Active'
          : snapshot.workspace === 'missing'
            ? 'Missing'
            : 'Access denied',
      detail:
        snapshot.workspace === 'active'
          ? 'All reads and writes remain scoped to the selected clinic workspace.'
          : snapshot.workspace === 'missing'
            ? 'Create a cabinet or join an invited workspace before entering the clinic app.'
            : 'Do not load workspace-scoped data; offer a safe workspace recovery path.',
    },
    {
      id: 'membership',
      label: 'Workspace membership',
      status:
        snapshot.membership === 'active'
          ? 'ready'
          : snapshot.membership === 'pending'
            ? 'current'
            : 'blocked',
      statusLabel:
        snapshot.membership === 'active'
          ? 'Active'
          : snapshot.membership === 'pending'
            ? 'Pending'
            : 'Revoked',
      detail:
        snapshot.membership === 'active'
          ? 'Membership is active; ownership remains separate from permission and professional status.'
          : snapshot.membership === 'pending'
            ? 'Membership is not active yet, so scoped clinic work remains unavailable.'
            : 'The account must not retain cached access after membership revocation.',
    },
    {
      id: 'branch',
      label: 'Branch scope',
      status:
        snapshot.branch === 'active'
          ? 'ready'
          : snapshot.branch === 'not_required'
            ? 'not_applicable'
            : snapshot.branch === 'required'
              ? 'current'
              : 'blocked',
      statusLabel:
        snapshot.branch === 'active'
          ? 'Assigned'
          : snapshot.branch === 'not_required'
            ? 'Not required'
            : snapshot.branch === 'required'
              ? 'Choose branch'
              : 'Outside scope',
      detail:
        snapshot.branch === 'active'
          ? 'The active branch is inside the member assignment.'
          : snapshot.branch === 'not_required'
            ? 'This cabinet does not enable branch selection.'
            : snapshot.branch === 'required'
              ? 'Choose an assigned branch before loading branch-scoped data.'
              : 'The selected branch is not authorized for this membership.',
    },
    {
      id: 'capability',
      label: 'Order capability',
      status: snapshot.orderCapability === 'granted' ? 'ready' : 'blocked',
      statusLabel:
        snapshot.orderCapability === 'granted' ? 'Granted' : 'Missing',
      detail:
        snapshot.orderCapability === 'granted'
          ? 'The actor may compose clinic orders. The attributed prescriber is validated separately at placement.'
          : 'A role label alone never grants this action. Request the explicit capability from a workspace administrator.',
    },
    licenceGate(snapshot),
  ];
}

function licenceBlockReason(snapshot: DoctorOnboardingSnapshot): string {
  if (snapshot.declaration === 'unanswered') {
    return 'Answer the medical-licence question before self-attribution can be evaluated.';
  }
  if (snapshot.declaration === 'non_medical') {
    return 'A non-medical member cannot self-attribute. Select another live workspace prescriber.';
  }
  switch (snapshot.licence) {
    case 'none':
      return 'Submit a professional licence and wait for approval before self-attribution.';
    case 'pending_review':
      return 'The licence is under review and is not live for attribution yet.';
    case 'rejected':
      return 'Submit a corrected licence after reviewing the rejection reason.';
    case 'lapsed':
      return 'Renew the lapsed licence before creating new self-attributed clinic orders.';
    case 'verified':
    case 'expiring':
    case 'in_grace':
      return 'The professional licence is live.';
  }
}

function deriveCapabilities(
  snapshot: DoctorOnboardingSnapshot,
  scopedBlock: string | null,
): OnboardingCapabilityDecision[] {
  const scoped = scopedBlock === null;
  const eligiblePrescriber =
    snapshot.attributedPrescriber === 'other_live_member' ||
    (snapshot.attributedPrescriber === 'self' &&
      isLiveLicence(snapshot.licence));

  let orderDetail =
    'The action is available and will be re-checked by the backend at placement.';
  let orderState: OnboardingCapabilityDecision['state'] = 'available';
  let orderStateLabel = 'Available';

  if (!scoped) {
    orderState = 'blocked';
    orderStateLabel = 'Blocked';
    orderDetail = scopedBlock;
  } else if (snapshot.orderCapability !== 'granted') {
    orderState = 'blocked';
    orderStateLabel = 'Permission required';
    orderDetail = 'The actor is missing the explicit clinic-order capability.';
  } else if (snapshot.attributedPrescriber === 'none') {
    orderState = 'blocked';
    orderStateLabel = 'Prescriber required';
    orderDetail =
      'Every clinic order requires an explicitly selected workspace member with a live credential.';
  } else if (!eligiblePrescriber) {
    orderState = 'blocked';
    orderStateLabel = 'Licence required';
    orderDetail = licenceBlockReason(snapshot);
  } else if (snapshot.banking === 'self_action_required') {
    orderState = 'action_required';
    orderStateLabel = 'Financial action required';
    orderDetail =
      'Resolve the exact doctor-banking order check, then re-run placement.';
  } else if (snapshot.banking === 'delegated_action_required') {
    orderState = 'action_required';
    orderStateLabel = 'Prescriber action required';
    orderDetail =
      'The attributed prescriber must complete a private step before this order can continue. The delegate receives no financial details.';
  }

  let bankingDecision: OnboardingCapabilityDecision;
  switch (snapshot.banking) {
    case 'not_eligible':
      bankingDecision = {
        id: 'doctor_banking',
        label: 'Doctor banking',
        state: 'blocked',
        stateLabel: 'Not eligible',
        detail:
          'Doctor banking belongs to a person with a live credential; it is not a workspace onboarding tier.',
      };
      break;
    case 'optional_unlinked':
      bankingDecision = {
        id: 'doctor_banking',
        label: 'Doctor banking',
        state: 'optional',
        stateLabel: 'Auto-pay optional',
        detail:
          'Linking auto-pay is optional. An unlinked eligible doctor keeps the same floor and may settle by KHQR when needed.',
      };
      break;
    case 'linked':
      bankingDecision = {
        id: 'doctor_banking',
        label: 'Doctor banking',
        state: 'available',
        stateLabel: 'Auto-pay linked',
        detail:
          'The personal mandate is linked. Order-time floor checks still run independently.',
      };
      break;
    case 'self_action_required':
      bankingDecision = {
        id: 'doctor_banking',
        label: 'Doctor banking',
        state: 'action_required',
        stateLabel: 'Action required',
        detail:
          'The doctor must settle or prepay the exact amount returned by the current order check.',
      };
      break;
    case 'delegated_action_required':
      bankingDecision = {
        id: 'doctor_banking',
        label: 'Doctor banking',
        state: 'action_required',
        stateLabel: 'Prescriber action',
        detail:
          'Only the attributed prescriber receives the private recovery instructions.',
      };
      break;
  }

  return [
    {
      id: 'catalog',
      label: 'Browse catalog',
      state: scoped ? 'available' : 'blocked',
      stateLabel: scoped ? 'Available' : 'Blocked',
      detail: scoped
        ? 'Catalog access follows workspace and branch scope; it is not gated by licence state.'
        : (scopedBlock ?? 'Workspace access is required.'),
    },
    {
      id: 'prices',
      label: 'View prices',
      state: scoped ? 'available' : 'blocked',
      stateLabel: scoped ? 'Available' : 'Blocked',
      detail: scoped
        ? 'Prices are visible to branch members. The deleted EXPLORER/PRACTICE workspace mode does not hide them.'
        : (scopedBlock ?? 'Workspace access is required.'),
    },
    {
      id: 'clinic_order',
      label: 'Place clinic order',
      state: orderState,
      stateLabel: orderStateLabel,
      detail: orderDetail,
    },
    bankingDecision,
  ];
}

function derivePrimaryAction(
  snapshot: DoctorOnboardingSnapshot,
): OnboardingPrimaryAction {
  if (snapshot.session !== 'active') {
    return {
      kind: 'sign_in',
      label: 'Sign in again',
      detail: 'Restore a clinic audience session.',
    };
  }
  if (snapshot.phone === 'missing_required') {
    return {
      kind: 'verify_phone',
      label: 'Verify phone',
      detail: 'Complete the mandatory phone gate.',
    };
  }
  if (snapshot.workspace !== 'active') {
    return {
      kind: 'create_workspace',
      label:
        snapshot.workspace === 'missing'
          ? 'Create or join clinic'
          : 'Choose another workspace',
      detail:
        'Restore an accessible workspace context without loading protected data.',
    };
  }
  if (snapshot.membership !== 'active') {
    return {
      kind: 'restore_membership',
      label:
        snapshot.membership === 'pending'
          ? 'View membership status'
          : 'Contact workspace admin',
      detail: 'An active membership is required before scoped work begins.',
    };
  }
  if (snapshot.branch === 'required' || snapshot.branch === 'denied') {
    return {
      kind: 'choose_branch',
      label:
        snapshot.branch === 'required'
          ? 'Choose branch'
          : 'Choose an assigned branch',
      detail: 'Enter only a branch included in the active membership.',
    };
  }
  if (snapshot.declaration === 'unanswered') {
    return {
      kind: 'answer_declaration',
      label: 'Answer licence question',
      detail:
        'Declare whether professional verification applies to this person.',
    };
  }
  if (snapshot.declaration === 'medical') {
    if (snapshot.licence === 'none') {
      return {
        kind: 'submit_licence',
        label: 'Verify medical licence',
        detail: 'Submit one supported document through the shared pipeline.',
      };
    }
    if (snapshot.licence === 'pending_review') {
      return {
        kind: 'view_submission',
        label: 'View licence status',
        detail:
          'Review the immutable submission and its current verdict state.',
      };
    }
    if (snapshot.licence === 'rejected') {
      return {
        kind: 'replace_licence',
        label: 'Fix verification',
        detail: 'Read the reason and submit a corrected document.',
      };
    }
    if (snapshot.licence === 'lapsed') {
      return {
        kind: 'renew_licence',
        label: 'Renew licence',
        detail: 'Create a new submission before new self-attributed orders.',
      };
    }
  }
  if (snapshot.orderCapability !== 'granted') {
    return {
      kind: 'request_capability',
      label: 'Request order access',
      detail: 'Ask a workspace administrator for the explicit capability.',
    };
  }
  if (snapshot.attributedPrescriber === 'none') {
    return {
      kind: 'select_prescriber',
      label: 'Choose eligible prescriber',
      detail: 'Select a live workspace member when composing the order.',
    };
  }
  if (snapshot.banking === 'self_action_required') {
    return {
      kind: 'resolve_banking',
      label: 'Resolve banking check',
      detail: 'Complete the private exact-amount recovery for this order.',
    };
  }
  if (snapshot.banking === 'delegated_action_required') {
    return {
      kind: 'request_prescriber_action',
      label: 'Request prescriber action',
      detail:
        'Notify the attributed prescriber without exposing private financial details.',
    };
  }
  if (snapshot.licence === 'expiring' || snapshot.licence === 'in_grace') {
    return {
      kind: 'renew_licence',
      label: 'Renew licence',
      detail: 'Keep attribution live beyond the current deadline.',
    };
  }
  return {
    kind: 'open_home',
    label: 'Open clinic home',
    detail: 'Continue into the scoped clinic workspace.',
  };
}

function invariantIssues(snapshot: DoctorOnboardingSnapshot): string[] {
  const issues: string[] = [];
  if (snapshot.declaration !== 'medical' && snapshot.licence !== 'none') {
    issues.push(
      'A professional credential exists without a medical declaration.',
    );
  }
  if (
    snapshot.attributedPrescriber === 'self' &&
    snapshot.declaration === 'non_medical'
  ) {
    issues.push('A non-medical member cannot be the attributed prescriber.');
  }
  return issues;
}

/** Pure, fail-closed derivation used by Storybook and interaction tests. */
export function deriveDoctorOnboardingReadiness(
  snapshot: DoctorOnboardingSnapshot,
): DoctorOnboardingReadiness {
  const issues = invariantIssues(snapshot);
  const scopedBlock = scopedAccessBlock(snapshot);
  const gates = deriveGates(snapshot);
  const capabilities = deriveCapabilities(snapshot, scopedBlock);
  const clinicOrder = capabilities.find((item) => item.id === 'clinic_order')!;
  const catalog = capabilities.find((item) => item.id === 'catalog')!;
  const banking = capabilities.find((item) => item.id === 'doctor_banking')!;
  const primaryAction = derivePrimaryAction(snapshot);

  if (issues.length > 0) {
    return {
      status: 'blocked',
      statusLabel: 'State unavailable',
      title: 'Readiness could not be verified',
      description:
        'Conflicting authority facts fail closed. Refresh from the source services before offering a mutation.',
      gates,
      capabilities,
      primaryAction: {
        kind: 'refresh_status',
        label: 'Refresh setup',
        detail:
          'Reload the latest clinic and professional details before continuing.',
      },
      canOpenCatalog: false,
      canStartClinicOrder: false,
      canOpenDoctorBanking: false,
      invariantIssues: issues,
    };
  }

  if (scopedBlock) {
    return {
      status: 'blocked',
      statusLabel: 'Access blocked',
      title: 'Access setup is incomplete',
      description: scopedBlock,
      gates,
      capabilities,
      primaryAction,
      canOpenCatalog: false,
      canStartClinicOrder: false,
      canOpenDoctorBanking: false,
      invariantIssues: [],
    };
  }

  if (
    snapshot.declaration === 'medical' &&
    snapshot.licence === 'pending_review'
  ) {
    const delegatedReady =
      snapshot.attributedPrescriber === 'other_live_member';
    return {
      status: delegatedReady ? 'ready' : 'reviewing',
      statusLabel: delegatedReady ? 'Delegated ordering ready' : 'Under review',
      title: delegatedReady
        ? 'Workspace access and delegated attribution are ready'
        : 'Licence submission is under review',
      description: delegatedReady
        ? 'This member may act within granted capability using another live attributed prescriber; their own credential remains under review.'
        : 'Catalog and prices remain available. New self-attributed clinic orders wait for a reviewer verdict.',
      gates,
      capabilities,
      primaryAction,
      canOpenCatalog: catalog.state === 'available',
      canStartClinicOrder: clinicOrder.state === 'available',
      canOpenDoctorBanking: banking.state !== 'blocked',
      invariantIssues: [],
    };
  }

  if (
    snapshot.banking === 'self_action_required' ||
    snapshot.banking === 'delegated_action_required'
  ) {
    return {
      status: 'attention',
      statusLabel: 'Order action required',
      title: 'Professional access is ready; a financial action remains',
      description: clinicOrder.detail,
      gates,
      capabilities,
      primaryAction,
      canOpenCatalog: catalog.state === 'available',
      canStartClinicOrder: false,
      canOpenDoctorBanking: snapshot.banking === 'self_action_required',
      invariantIssues: [],
    };
  }

  if (clinicOrder.state !== 'available') {
    return {
      status: 'limited',
      statusLabel: 'Limited access',
      title:
        snapshot.attributedPrescriber === 'none'
          ? 'Choose an eligible attributed prescriber'
          : 'Workspace access is ready; clinic ordering is not',
      description: clinicOrder.detail,
      gates,
      capabilities,
      primaryAction,
      canOpenCatalog: catalog.state === 'available',
      canStartClinicOrder: false,
      canOpenDoctorBanking: banking.state !== 'blocked',
      invariantIssues: [],
    };
  }

  const renewalAttention =
    snapshot.attributedPrescriber === 'self' &&
    (snapshot.licence === 'expiring' || snapshot.licence === 'in_grace');

  return {
    status: renewalAttention ? 'attention' : 'ready',
    statusLabel: renewalAttention ? 'Renewal due' : 'Ready',
    title:
      snapshot.attributedPrescriber === 'other_live_member'
        ? 'Ready for delegated clinic ordering'
        : renewalAttention
          ? 'Ordering remains available; renew the licence'
          : 'Ready for attributed clinic orders',
    description:
      snapshot.attributedPrescriber === 'other_live_member'
        ? 'The actor and attributed prescriber remain separate. The selected prescriber owns professional and financial attribution.'
        : renewalAttention
          ? 'The credential remains live during this lifecycle state, but renewal must complete before lapse.'
          : 'Session, scope, capability and live professional attribution are all satisfied. The backend still revalidates at placement.',
    gates,
    capabilities,
    primaryAction,
    canOpenCatalog: true,
    canStartClinicOrder: true,
    canOpenDoctorBanking: banking.state !== 'blocked',
    invariantIssues: [],
  };
}
