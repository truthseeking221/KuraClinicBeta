'use client';

import { useId } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '../../components/ui';

import {
  deriveDoctorOnboardingReadiness,
  type DoctorOnboardingSnapshot,
  type OnboardingActionKind,
  type OnboardingCapabilityDecision,
  type OnboardingGateDecision,
  type OnboardingGateStatus,
} from './doctor-onboarding-logic';
import styles from './doctor-onboarding-readiness.module.css';

export type DoctorOnboardingReadinessProps = {
  actorName: string;
  workspaceName: string;
  branchName?: string;
  snapshot: DoctorOnboardingSnapshot;
  onPrimaryAction?: (action: OnboardingActionKind) => void;
};

type ReadinessDecision = ReturnType<typeof deriveDoctorOnboardingReadiness>;

const GATE_BADGE_VARIANTS: Record<
  OnboardingGateStatus,
  'success' | 'info' | 'warning' | 'danger' | 'neutral'
> = {
  ready: 'success',
  current: 'info',
  warning: 'warning',
  blocked: 'danger',
  not_applicable: 'neutral',
};

const CAPABILITY_BADGE_VARIANTS: Record<
  OnboardingCapabilityDecision['state'],
  'success' | 'warning' | 'danger' | 'neutral'
> = {
  available: 'success',
  optional: 'neutral',
  blocked: 'danger',
  action_required: 'warning',
};

function readinessCopy(
  snapshot: DoctorOnboardingSnapshot,
  readiness: ReadinessDecision,
): { title: string; description: string } {
  if (readiness.invariantIssues.length > 0) {
    return {
      title: 'We couldn\u2019t verify this setup',
      description: 'Some clinic and professional details do not match. Refresh before continuing.',
    };
  }

  if (snapshot.session !== 'active') {
    return { title: 'Sign in to continue', description: 'Your clinic session has ended.' };
  }
  if (snapshot.phone === 'missing_required') {
    return {
      title: 'Verify your phone to continue',
      description: 'A verified phone is required to finish clinic setup.',
    };
  }
  if (snapshot.workspace === 'missing') {
    return {
      title: 'Join or create a clinic',
      description: 'Choose the clinic where you will work before continuing.',
    };
  }
  if (snapshot.workspace === 'denied') {
    return {
      title: 'Choose another clinic',
      description: 'You no longer have access to this clinic.',
    };
  }
  if (snapshot.membership === 'pending') {
    return {
      title: 'Your clinic access is pending',
      description: 'You can continue when your clinic membership becomes active.',
    };
  }
  if (snapshot.membership === 'revoked') {
    return {
      title: 'Your clinic access has ended',
      description: 'Contact a clinic administrator if you still need access.',
    };
  }
  if (snapshot.branch === 'required') {
    return {
      title: 'Choose a clinic branch',
      description: 'Select one of the branches assigned to you.',
    };
  }
  if (snapshot.branch === 'denied') {
    return {
      title: 'Choose an assigned branch',
      description: 'The selected branch is not included in your clinic access.',
    };
  }
  if (snapshot.declaration === 'medical' && snapshot.licence === 'pending_review') {
    return snapshot.attributedPrescriber === 'other_live_member'
      ? {
          title: 'Ready to work with another prescriber',
          description:
            'You can place orders with an approved prescriber while your own licence is under review.',
        }
      : {
          title: 'Your licence is under review',
          description:
            'You can browse the catalog and view prices. Orders using your licence will wait for approval.',
        };
  }
  if (snapshot.banking === 'self_action_required') {
    return {
      title: 'Complete one payment step',
      description: 'Finish the requested payment step before placing this order.',
    };
  }
  if (snapshot.banking === 'delegated_action_required') {
    return {
      title: 'The prescriber needs to take action',
      description: 'The selected prescriber must complete a private payment step before this order continues.',
    };
  }
  if (snapshot.orderCapability !== 'granted') {
    return {
      title: 'Ask for order access',
      description: 'Your clinic access is active, but you do not yet have permission to place orders.',
    };
  }
  if (snapshot.attributedPrescriber === 'none') {
    return {
      title: 'Choose an eligible prescriber',
      description: 'Every clinic order must have an approved prescriber.',
    };
  }
  if (snapshot.declaration === 'unanswered') {
    return {
      title: 'Tell us about your professional status',
      description: 'Your answer determines whether medical licence verification applies to you.',
    };
  }
  if (snapshot.declaration === 'medical' && snapshot.licence === 'none') {
    return {
      title: 'Complete your medical licence',
      description: 'You can browse the catalog and view prices now. Verify your licence before placing orders.',
    };
  }
  if (snapshot.declaration === 'medical' && snapshot.licence === 'rejected') {
    return {
      title: 'Your licence needs attention',
      description: 'Review the reason, correct the document, and submit it again.',
    };
  }
  if (snapshot.declaration === 'medical' && snapshot.licence === 'lapsed') {
    return {
      title: 'Renew your medical licence',
      description: 'A current licence is required before you can place new orders.',
    };
  }
  if (snapshot.licence === 'expiring' || snapshot.licence === 'in_grace') {
    return {
      title: 'Renew your licence soon',
      description: 'You can still place orders, but renew your licence before it lapses.',
    };
  }
  if (snapshot.attributedPrescriber === 'other_live_member') {
    return {
      title: 'Ready for clinic orders',
      description: 'You can place orders with the selected approved prescriber.',
    };
  }

  return {
    title: 'You\u2019re ready to work',
    description: 'You can browse the catalog, view prices, and place clinic orders.',
  };
}

function primaryActionCopy(
  action: OnboardingActionKind,
): { label: string; detail: string } {
  switch (action) {
    case 'sign_in':
      return { label: 'Sign in again', detail: 'Restore your clinic session.' };
    case 'verify_phone':
      return { label: 'Verify phone', detail: 'Finish the required phone check.' };
    case 'create_workspace':
      return { label: 'Choose a clinic', detail: 'Continue with a clinic you can access.' };
    case 'restore_membership':
      return { label: 'View access status', detail: 'Check your clinic membership or contact an administrator.' };
    case 'choose_branch':
      return { label: 'Choose an assigned branch', detail: 'Continue with a branch assigned to you.' };
    case 'request_capability':
      return { label: 'Request order access', detail: 'Ask a clinic administrator for permission to place orders.' };
    case 'answer_declaration':
      return { label: 'Answer licence question', detail: 'Tell us whether medical licence verification applies to you.' };
    case 'submit_licence':
      return { label: 'Verify medical licence', detail: 'Submit one supported licence document now or later.' };
    case 'view_submission':
      return { label: 'View licence status', detail: 'Check the review status of your licence.' };
    case 'replace_licence':
      return { label: 'Review and resubmit', detail: 'Read the review reason and submit a corrected document.' };
    case 'renew_licence':
      return { label: 'Renew licence', detail: 'Submit a current licence to keep placing orders.' };
    case 'select_prescriber':
      return { label: 'Choose prescriber', detail: 'Select an approved prescriber for this order.' };
    case 'resolve_banking':
      return { label: 'Complete payment step', detail: 'Open the private payment instructions for this order.' };
    case 'request_prescriber_action':
      return { label: 'Notify prescriber', detail: 'Ask the prescriber to complete their private payment step.' };
    case 'refresh_status':
      return { label: 'Refresh setup', detail: 'Reload the latest clinic and professional details.' };
    case 'open_home':
      return { label: 'Open clinic home', detail: 'Continue to your clinic workspace.' };
  }
}

function gateHelp(
  snapshot: DoctorOnboardingSnapshot,
  gate: OnboardingGateDecision,
): string | undefined {
  if (gate.status === 'ready' || gate.status === 'not_applicable') return undefined;

  switch (gate.id) {
    case 'session':
      return 'Sign in again to continue.';
    case 'phone':
      return 'Verify your phone to finish clinic setup.';
    case 'workspace':
      return snapshot.workspace === 'missing'
        ? 'Create or join a clinic before continuing.'
        : 'Choose a clinic you can access.';
    case 'membership':
      return snapshot.membership === 'pending'
        ? 'Wait for your clinic membership to become active.'
        : 'Contact a clinic administrator if you still need access.';
    case 'branch':
      return 'Choose a branch assigned to you.';
    case 'capability':
      return 'Ask a clinic administrator for order access.';
    case 'licence':
      if (snapshot.declaration === 'unanswered') {
        return 'Tell us whether you hold a medical licence.';
      }
      switch (snapshot.licence) {
        case 'none':
          return 'Submit your licence when you are ready.';
        case 'pending_review':
          return 'Kura is reviewing your submission.';
        case 'rejected':
          return 'Review the reason and submit a corrected document.';
        case 'expiring':
        case 'in_grace':
          return 'Renew it before it lapses.';
        case 'lapsed':
          return 'Renew your licence before placing new orders.';
        case 'verified':
          return undefined;
      }
  }
}

function capabilityHelp(
  snapshot: DoctorOnboardingSnapshot,
  capability: OnboardingCapabilityDecision,
): string | undefined {
  if (capability.state === 'available' || capability.state === 'optional') return undefined;
  if (capability.id === 'catalog' || capability.id === 'prices') {
    return 'Available after clinic access is restored.';
  }
  if (capability.id === 'doctor_banking') {
    return snapshot.banking === 'delegated_action_required'
      ? 'The prescriber receives the private instructions.'
      : 'Complete the private payment step for this order.';
  }
  if (snapshot.orderCapability !== 'granted') {
    return 'Ask a clinic administrator for order access.';
  }
  if (snapshot.attributedPrescriber === 'none') {
    return 'Choose an approved prescriber for the order.';
  }
  if (snapshot.banking === 'self_action_required') {
    return 'Complete the requested payment step.';
  }
  if (snapshot.banking === 'delegated_action_required') {
    return 'The selected prescriber needs to take action.';
  }
  return 'A current medical licence is required.';
}

function capabilityStatusLabel(capability: OnboardingCapabilityDecision): string {
  if (capability.state === 'action_required') return 'Action needed';
  return capability.stateLabel;
}

function GateRow({
  gate,
  snapshot,
}: {
  gate: OnboardingGateDecision;
  snapshot: DoctorOnboardingSnapshot;
}) {
  const detail = gateHelp(snapshot, gate);

  return (
    <Item className={styles.decisionRow} size="sm" variant="default">
      <ItemContent>
        <ItemTitle>{gate.label}</ItemTitle>
        {detail ? <ItemDescription>{detail}</ItemDescription> : null}
      </ItemContent>
      <ItemActions>
        <Badge size="sm" variant={GATE_BADGE_VARIANTS[gate.status]}>
          {gate.statusLabel}
        </Badge>
      </ItemActions>
    </Item>
  );
}

function CapabilityRow({
  capability,
  snapshot,
}: {
  capability: OnboardingCapabilityDecision;
  snapshot: DoctorOnboardingSnapshot;
}) {
  const detail = capabilityHelp(snapshot, capability);

  return (
    <Item className={styles.decisionRow} size="sm" variant="default">
      <ItemContent>
        <ItemTitle>{capability.label}</ItemTitle>
        {detail ? <ItemDescription>{detail}</ItemDescription> : null}
      </ItemContent>
      <ItemActions>
        <Badge size="sm" variant={CAPABILITY_BADGE_VARIANTS[capability.state]}>
          {capabilityStatusLabel(capability)}
        </Badge>
      </ItemActions>
    </Item>
  );
}

/**
 * A source-backed onboarding checkpoint for clinic doctors.
 *
 * The page presents one safe next action while retaining each authorization
 * fact as an independent detail. Server checks remain authoritative.
 */
export function DoctorOnboardingReadiness({
  actorName,
  branchName,
  onPrimaryAction,
  snapshot,
  workspaceName,
}: DoctorOnboardingReadinessProps) {
  const readiness = deriveDoctorOnboardingReadiness(snapshot);
  const headingId = useId();
  const accessHeadingId = useId();
  const copy = readinessCopy(snapshot, readiness);
  const action = primaryActionCopy(readiness.primaryAction.kind);
  const statusVariant =
    readiness.status === 'ready'
      ? 'success'
      : readiness.status === 'reviewing'
        ? 'info'
        : readiness.status === 'blocked'
          ? 'danger'
          : 'warning';
  const visibleCapabilities = readiness.capabilities.filter(
    (capability) =>
      capability.id !== 'doctor_banking' || capability.state === 'action_required',
  );
  const issueLabels = readiness.invariantIssues.map((issue) =>
    issue.includes('medical declaration')
      ? 'The licence record does not match the professional declaration.'
      : 'The selected prescriber does not match the member\u2019s professional status.',
  );

  return (
    <section
      aria-labelledby={headingId}
      className={styles.page}
      data-slot="doctor-onboarding-readiness"
    >
      <header className={styles.hero}>
        <p className={styles.sectionLabel}>Clinic setup</p>
        <div className={styles.contextLine}>
          <Badge size="md" variant={statusVariant}>
            {readiness.statusLabel}
          </Badge>
          <p>
            {actorName} · {workspaceName}
            {branchName ? ` · ${branchName}` : ''}
          </p>
        </div>
        <div className={styles.stateCopy}>
          <h1 className={styles.pageTitle} id={headingId}>
            {copy.title}
          </h1>
          <p className={styles.consequence}>{copy.description}</p>
        </div>
        <div className={styles.primaryAction}>
          <Button
            disabled={!onPrimaryAction}
            fullWidth
            onClick={() => onPrimaryAction?.(readiness.primaryAction.kind)}
          >
            {action.label}
          </Button>
          <p>{action.detail}</p>
        </div>
      </header>

      {issueLabels.length > 0 ? (
        <Alert tone="danger">
          <AlertTitle>Setup details need to be refreshed</AlertTitle>
          <AlertDescription>
            <ul className={styles.alertList}>
              {issueLabels.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      <section aria-labelledby={accessHeadingId} className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2 id={accessHeadingId}>Current access</h2>
          <p>What you can do right now.</p>
        </div>
        <ItemGroup aria-label="Current access" className={styles.decisionList} role="list">
          {visibleCapabilities.map((capability, index) => (
            <div key={capability.id} role="listitem">
              {index > 0 ? <ItemSeparator /> : null}
              <CapabilityRow capability={capability} snapshot={snapshot} />
            </div>
          ))}
        </ItemGroup>
        <p className={styles.boundaryNote}>Kura checks access again when you place an order.</p>
      </section>

      <Collapsible className={styles.details}>
        <CollapsibleTrigger>Setup details ({readiness.gates.length} checks)</CollapsibleTrigger>
        <CollapsibleContent className={styles.detailsContent}>
          <ItemGroup aria-label="Clinic setup details" role="list">
            {readiness.gates.map((gate, index) => (
              <div key={gate.id} role="listitem">
                {index > 0 ? <ItemSeparator /> : null}
                <GateRow gate={gate} snapshot={snapshot} />
              </div>
            ))}
          </ItemGroup>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
