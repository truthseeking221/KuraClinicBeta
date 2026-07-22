import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';
import { AppShell } from '../../components/shared';
import { isLiveLicence } from '../licence/logic';

import type { DoctorOnboardingSnapshot } from './doctor-onboarding-logic';
import { DoctorOnboardingReadiness } from './doctor-onboarding-readiness';
import type { DoctorOnboardingReadinessProps } from './doctor-onboarding-readiness';

const BASE: DoctorOnboardingSnapshot = {
  session: 'active',
  phone: 'verified',
  workspace: 'active',
  membership: 'active',
  branch: 'not_required',
  orderCapability: 'granted',
  declaration: 'medical',
  licence: 'none',
  attributedPrescriber: 'self',
  banking: 'not_eligible',
};

function snapshot(
  overrides: Partial<DoctorOnboardingSnapshot> = {},
): DoctorOnboardingSnapshot {
  return { ...BASE, ...overrides };
}

function StoryFrame(props: DoctorOnboardingReadinessProps) {
  return (
    <AppShell
      activeKey="home"
      availableModes={['clinical']}
      mode="clinical"
      onNavigate={() => undefined}
      user={{
        name: props.actorName,
        email: 'dara@mekong.clinic',
        licenceVerified: isLiveLicence(props.snapshot.licence),
      }}
      workspace={{ id: 'ws-mekong', name: props.workspaceName }}
    >
      <DoctorOnboardingReadiness {...props} />
    </AppShell>
  );
}

const meta = {
  title: 'Clinic/Flows/Doctor Onboarding Readiness',
  component: DoctorOnboardingReadiness,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.flows,
      contract: {
        status: 'source-backed-design-target',
        backendMapping: 'direct-with-explicit-ui-projection',
        backendRef:
          'Kura-med/kura-platform@8b5772caefd1aaace2825f481ebca766894eca2a',
        consulted: [
          'docs/design/onboarding-auth/auth-onboarding-product-spec.md',
          'docs/design/doctor-auth-licence/kyd-grill-decision-log.md',
          'docs/adr/ADR-0055-kyd-licence-verification-v1-scope.md',
          'libs/contracts/src/lib/licence.ts',
          'apps/services/order-ms/src/app/order/order.service.ts',
          'docs/design/doctor-banking/aof-product-spec.md',
        ],
        note: 'The source repository is private. These stories mirror current contract states and enforcement seams; they do not claim backend delivery inside this local Storybook workspace.',
      },
      intake: {
        decision: 'FEATURE-OWN',
        owner: 'src/features/auth',
        evidence:
          'Extends the existing Door → Wizard → Workspace Gate journey with a source-backed onboarding checkpoint. Composes canonical AppShell, Alert, Collapsible, Item, Badge and Button only.',
        exclusions: [
          'No EXPLORER/PRACTICE workspace mode or T0/T1/T2 authorization tier.',
          'No invented needs-changes credential state; corrected submissions follow the canonical rejected → new pending submission loop.',
          'No legal-document, e-signature or payout promise beyond current source contracts.',
        ],
      },
      flow: {
        pages: [
          'Clinic/Auth/Door',
          'Clinic/Auth/Onboarding Wizard',
          'Clinic/Auth/Workspace Gate',
          'Clinic/Flows/Doctor Onboarding Readiness',
          'My profile/Licence',
          'Clinic/Clinical/Home',
        ],
        terminal:
          'Scoped clinic access with an explicit live prescriber; financial setup remains an independent axis.',
      },
      journeys: [
        'clinic-doctor-first-sign-in',
        'clinic-professional-licence-review',
        'clinic-attributed-order-readiness',
        'clinic-delegated-prescriber-readiness',
      ],
      composes: ['AppShell', 'Alert', 'Collapsible', 'Item', 'Badge', 'Button'],
      responsive: {
        classification: ['FLUID', 'STACKING', 'TRANSFORMING'],
        minimumWidth: 320,
      },
    },
    docs: {
      description: {
        component:
          'Source-backed doctor-onboarding checkpoint with one safe next action. Session, phone, workspace, membership, branch, order permission, professional credential, prescriber and doctor banking remain independent; server checks stay authoritative.',
      },
    },
  },
  args: {
    actorName: 'Dr. Dara Phan',
    workspaceName: "Dara Phan's cabinet",
    snapshot: BASE,
    onPrimaryAction: fn(),
  },
  render: (args) => <StoryFrame {...args} />,
} satisfies Meta<typeof DoctorOnboardingReadiness>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A new owner may use the clinic while the professional licence is still required for attribution. */
export const NewOwnerNeedsLicence: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Complete your medical licence' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Browse catalog', { selector: '[data-slot="item-title"]' })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Available');
    await expect(
      canvas
        .getByText('Place clinic order', {
          selector: '[data-slot="item-title"]',
        })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Licence required');
    await expect(
      canvas.getByRole('button', { name: 'Verify medical licence' }),
    ).toBeVisible();
  },
};

export const LicenceUnderReview: Story = {
  args: { snapshot: snapshot({ licence: 'pending_review' }) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Your licence is under review' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'View licence status' }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Start clinic order' }),
    ).not.toBeInTheDocument();
  },
};

export const RejectedWithRecovery: Story = {
  args: { snapshot: snapshot({ licence: 'rejected' }) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Your licence needs attention' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Review and resubmit' }),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Setup details (7 checks)' }),
    );
    await expect(
      canvas.getByText('Review the reason and submit a corrected document.'),
    ).toBeVisible();
  },
};

export const VerifiedReady: Story = {
  args: {
    snapshot: snapshot({ licence: 'verified', banking: 'optional_unlinked' }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'You’re ready to work' }),
    ).toBeVisible();
    const primaryAction = canvas.getByRole('button', {
      name: 'Open clinic home',
    });
    await expect(primaryAction).toBeEnabled();
    await userEvent.click(primaryAction);
    await expect(args.onPrimaryAction).toHaveBeenCalledWith('open_home');
    await expect(canvas.queryByText('Doctor banking')).not.toBeInTheDocument();
  },
};

export const ExpiringStillLive: Story = {
  args: {
    snapshot: snapshot({ licence: 'expiring', banking: 'optional_unlinked' }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Renew your licence soon' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Place clinic order', {
          selector: '[data-slot="item-title"]',
        })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Available');
    await expect(
      canvas.getByRole('button', { name: 'Renew licence' }),
    ).toBeVisible();
  },
};

export const GracePeriodStillLive: Story = {
  args: {
    snapshot: snapshot({ licence: 'in_grace', banking: 'optional_unlinked' }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Renew your licence soon' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Place clinic order', {
          selector: '[data-slot="item-title"]',
        })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Available');
  },
};

export const LapsedBlocksOnlyNewOrders: Story = {
  args: { snapshot: snapshot({ licence: 'lapsed' }) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Renew your medical licence' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Place clinic order', {
          selector: '[data-slot="item-title"]',
        })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Licence required');
    await expect(
      canvas.getByRole('button', { name: 'Renew licence' }),
    ).toBeVisible();
  },
};

export const DelegatedOrderingWhileOwnLicenceReviews: Story = {
  args: {
    actorName: 'Srey Neang',
    branchName: 'BKK1 Branch',
    snapshot: snapshot({
      branch: 'active',
      licence: 'pending_review',
      attributedPrescriber: 'other_live_member',
      banking: 'not_eligible',
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', {
        name: 'Ready to work with another prescriber',
      }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Place clinic order', {
          selector: '[data-slot="item-title"]',
        })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Available');
    await expect(
      canvas.getByRole('button', { name: 'View licence status' }),
    ).toBeVisible();
  },
};

export const MissingOrderCapability: Story = {
  args: {
    snapshot: snapshot({
      licence: 'verified',
      orderCapability: 'missing',
      banking: 'optional_unlinked',
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Ask for order access' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Request order access' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Place clinic order', {
          selector: '[data-slot="item-title"]',
        })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Permission required');
  },
};

export const BranchScopeBlocked: Story = {
  args: {
    branchName: 'Toul Kork Branch',
    snapshot: snapshot({
      licence: 'verified',
      branch: 'denied',
      banking: 'optional_unlinked',
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Choose an assigned branch' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Choose an assigned branch' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Browse catalog', { selector: '[data-slot="item-title"]' })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Blocked');
  },
};

export const BankingActionIsNotAnOnboardingTier: Story = {
  args: {
    snapshot: snapshot({
      licence: 'verified',
      banking: 'self_action_required',
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Complete one payment step' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Complete payment step' }),
    ).toBeVisible();
    await expect(
      canvas
        .getByText('Doctor banking', { selector: '[data-slot="item-title"]' })
        .closest('[data-slot="item"]'),
    ).toHaveTextContent('Action needed');
  },
};

export const DelegatedBankingPrivacy: Story = {
  args: {
    actorName: 'Srey Neang',
    branchName: 'BKK1 Branch',
    snapshot: snapshot({
      declaration: 'non_medical',
      licence: 'none',
      branch: 'active',
      attributedPrescriber: 'other_live_member',
      banking: 'delegated_action_required',
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'Notify prescriber' }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: /banking/i }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByText(/exact balance|masked account|mandate/i),
    ).not.toBeInTheDocument();
  },
};

export const ConflictingFactsFailClosed: Story = {
  args: {
    snapshot: snapshot({
      declaration: 'non_medical',
      licence: 'verified',
      banking: 'linked',
    }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Setup details need to be refreshed'),
    ).toBeVisible();
    const refresh = canvas.getByRole('button', { name: 'Refresh setup' });
    await userEvent.click(refresh);
    await expect(args.onPrimaryAction).toHaveBeenCalledWith('refresh_status');
    await expect(
      canvas.queryByRole('button', { name: 'Open clinic home' }),
    ).not.toBeInTheDocument();
  },
};

export const Mobile320: Story = {
  args: {
    snapshot: snapshot({ licence: 'pending_review' }),
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'View licence status' }),
    ).toBeVisible();
    await expect(
      canvasElement.ownerDocument.documentElement.scrollWidth,
    ).toBeLessThanOrEqual(
      canvasElement.ownerDocument.documentElement.clientWidth,
    );
  },
};

export const MobileReady: Story = {
  args: {
    snapshot: snapshot({ licence: 'verified', banking: 'optional_unlinked' }),
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'Open clinic home' }),
    ).toBeVisible();
  },
};

export const MobileRejectedRecovery: Story = {
  args: {
    snapshot: snapshot({ licence: 'rejected' }),
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'Review and resubmit' }),
    ).toBeVisible();
  },
};

export const LongClinicContextMobile: Story = {
  args: {
    actorName: 'Dr. Sokha Vannak Chansopheakmony',
    workspaceName:
      'Mekong International Family Medicine and Community Care Centre',
    branchName: 'Preah Norodom Boulevard Specialist Clinic',
    snapshot: snapshot({ licence: 'pending_review', branch: 'active' }),
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Preah Norodom Boulevard Specialist Clinic/i),
    ).toBeVisible();
    await expect(
      canvasElement.ownerDocument.documentElement.scrollWidth,
    ).toBeLessThanOrEqual(
      canvasElement.ownerDocument.documentElement.clientWidth,
    );
  },
};
