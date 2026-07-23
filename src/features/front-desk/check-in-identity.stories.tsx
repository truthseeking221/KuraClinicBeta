import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { CheckInWizard } from './check-in-wizard';
import { blankWalkIn, EXISTING_PATIENTS, IDENTITY_REGISTRY } from './demo-data';
import type { FrontDeskPatient } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

const SEARCH_LABEL = 'Find patient by phone, booking code, or name';

function IdentityPlayground({
  existingPatients = EXISTING_PATIENTS,
  initial,
}: {
  existingPatients?: FrontDeskPatient[];
  initial?: FrontDeskPatient;
}) {
  const [patient, setPatient] = useState<FrontDeskPatient>(
    initial ?? blankWalkIn('walk-in-identity', 27),
  );
  return (
    <CheckInWizard
      existingPatients={existingPatients}
      identityRegistry={IDENTITY_REGISTRY}
      onCheckIn={() => {}}
      onPatientChange={setPatient}
      patient={patient}
    />
  );
}

const meta = {
  title: 'Clinic/Front Desk/Check-In Wizard/Step 1 Identity',
  component: CheckInWizard,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'EXTEND (front-desk Step 1) + CREATE PatientResolutionCard/IdentitySearch',
        owner: 'src/features/front-desk',
        evidence:
          'UX ported from Kura-med/ui-kit `Receptionist/Wizard/Step 1 Identity` (source-kura-ui-kit). One search field understands phone, booking code, or name; the result renders as one resolution card, and selecting a patient advances the wizard in one action. Selection provenance stays visually neutral until the backend reports verified assurance. Rebound to house tokens, Card, Badge, Avatar, Button, Input, and Dialog primitives, with canonical Kura icons.',
        exclusions: [
          'National ID chip and QR capture (hardware ceremony, deferred)',
          'Upstream StepShell/aside scaffold (this wizard owns its own shell and cart rail)',
        ],
      },
      journeys: ['front-desk-check-in', 'front-desk-duplicate-guard'],
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura',
        icons: 'kura-hugeicons',
      },
    },
    docs: {
      description: {
        component:
          'Step 1 finds the patient who is checking in. One search field resolves phone, booking code, or name; the result renders as a resolution card (known here, known elsewhere, shared phone, booking-linked, candidates, no match). Selecting a minor requires a present guardian. Selecting a patient advances to Step 2 in one action.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  patient: blankWalkIn('walk-in-identity', 27),
  onPatientChange: () => {},
  existingPatients: EXISTING_PATIENTS,
  onCheckIn: () => {},
};

export const BlankWalkIn: Story = {
  args: baseArgs,
  parameters: { layout: 'fullscreen' },
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText(SEARCH_LABEL)).toHaveFocus();
    await expect(canvas.getByRole('heading', { level: 2, name: 'Find or create a patient' })).toBeVisible();
    await expect(canvas.queryByRole('button', { name: /Other ID methods/ })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Review details' })).toBeDisabled();

    const workspace = canvasElement.querySelector<HTMLElement>(
      '[data-slot="check-in-workspace"]',
    );
    const panel = canvasElement.querySelector<HTMLElement>(
      '[data-slot="check-in-step-panel"]',
    );
    if (!workspace || !panel) throw new Error('Identity start layout did not render.');
    const workspaceBounds = workspace.getBoundingClientRect();
    const panelBounds = panel.getBoundingClientRect();
    expect(
      Math.abs(
        workspaceBounds.top + workspaceBounds.height / 2 -
          (panelBounds.top + panelBounds.height / 2),
      ),
    ).toBeLessThanOrEqual(8);
  },
};

export const PhoneMatchKnownHere: Story = {
  name: 'Phone match · known patient with bookings',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '093 123 8123');
    await expect(await canvas.findByText('Known patient')).toBeVisible();
    await expect(canvas.getByText('Sok Phearom')).toBeVisible();
    // Bookings are the primary check-in action; walk-in demotes to an escape.
    await expect(
      canvas.getByRole('button', { name: 'Check in against booking GW87430' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Continue without a booking' }),
    ).toBeVisible();
  },
};

export const PhoneMatchKnownElsewhere: Story = {
  name: 'Phone match · known in Kura, first visit here',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '012 345 678');
    await expect(await canvas.findByText('Maly Chea')).toBeVisible();
    await expect(canvas.getByText('First visit at this PSC')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Import Maly Chea/ })).toBeVisible();
  },
};

export const SharedPhoneGuardianGate: Story = {
  name: 'Shared phone · guardian gate on a minor',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '087 654 3210');

    const group = await canvas.findByRole('radiogroup', { name: 'Choose who is here today' });
    await expect(within(group).getAllByRole('radio')).toHaveLength(2);
    await expect(canvas.getByText('Choose a patient to continue.')).toBeVisible();

    // Selecting the minor blocks until the guardian is confirmed present.
    await userEvent.click(within(group).getByRole('radio', { name: /Baby Prum/ }));
    await expect(
      await canvas.findByText('Confirm the guardian is present to continue with a minor.'),
    ).toBeVisible();
    await expect(canvas.queryByRole('button', { name: /Check in Baby Prum/ })).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Confirm guardian present' }));
    await expect(await canvas.findByText(/Guardian confirmed/)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /Check in Baby Prum · GW87441/ }),
    ).toBeVisible();

    // Switching to the adult clears the gate.
    await userEvent.click(within(group).getByRole('radio', { name: /Lina Prum/ }));
    await expect(
      canvas.getByRole('button', { name: /Check in Lina Prum · GW87440/ }),
    ).toBeVisible();
  },
};

export const BookingCodeMatch: Story = {
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87430');
    await expect(await canvas.findByText('Booking matched')).toBeVisible();
    await expect(canvas.getByText('Code')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /Check in booking GW87430/ }),
    ).toBeVisible();
  },
};

export const ScanBookingQr: Story = {
  name: 'Scan booking QR → code fills the search',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Scan booking QR' }));

    const dialog = await within(document.body).findByRole('dialog', { name: 'Scan booking QR' });
    const scanField = within(dialog).getByLabelText('Booking QR payload');

    // A payload without a code reports the failure inline.
    await userEvent.type(scanField, 'hello{Enter}');
    await expect(
      await within(dialog).findByText('No booking code found in this QR.'),
    ).toBeVisible();

    await userEvent.clear(scanField);
    await userEvent.type(scanField, 'kura://booking/GW87430{Enter}');
    await waitFor(async () => {
      await expect(canvas.getByLabelText(SEARCH_LABEL)).toHaveValue('GW87430');
    });
    await expect(await canvas.findByText('Booking matched')).toBeVisible();
  },
};

export const NameCandidates: Story = {
  name: 'Name search · possible matches',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'Sok');
    await expect(await canvas.findByText('Possible matches')).toBeVisible();
    await expect(canvas.getAllByText('Verified').length).toBeGreaterThanOrEqual(1);
    await expect(canvas.getByText('Unverified')).toBeVisible();

    // "Different person" dismisses a candidate without capturing.
    const dismissButtons = canvas.getAllByRole('button', { name: 'Different person' });
    const initialCount = dismissButtons.length;
    await userEvent.click(dismissButtons[0]);
    await waitFor(async () => {
      await expect(canvas.getAllByRole('button', { name: 'Different person' })).toHaveLength(
        initialCount - 1,
      );
    });
  },
};

export const NoMatchNewPatient: Story = {
  name: 'No match → continue as new patient',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '099 999 9999');
    await expect(await canvas.findByText('No existing record')).toBeVisible();

    // Capturing advances to Step 2 with the phone carried over.
    await userEvent.click(canvas.getByRole('button', { name: 'Create a new patient' }));
    await expect(
      await canvas.findByRole('heading', { level: 2, name: /Review & confirm/ }),
    ).toBeVisible();
  },
};

export const UnknownBookingCode: Story = {
  name: 'Unknown booking code · no new-patient shortcut',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'ZZ99999');
    await expect(await canvas.findByText('No existing record')).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Create a new patient' }),
    ).not.toBeInTheDocument();
  },
};

export const IdentityCaptured: Story = {
  name: 'Patient selected · manual entry and change patient path',
  args: baseArgs,
  render: () => {
    const captured: FrontDeskPatient = {
      ...blankWalkIn('walk-in-captured', 28),
      name: 'Sokha Chan',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      idNumber: '',
      phoneNumber: '12777088',
      identity: { source: 'manual', lockedFields: [] },
    };
    return <IdentityPlayground existingPatients={[]} initial={captured} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // A selected patient reopens on Step 2 (first not-done step); Step 1 stays
    // reachable to review or choose another patient.
    await userEvent.click(canvas.getByRole('tab', { name: /Identity/ }));
    await expect(
      await canvas.findByRole('heading', { level: 2, name: 'Patient selected' }),
    ).toBeVisible();
    await expect(canvas.getByText('Source: Manual entry')).toBeVisible();
    await expect(canvas.getByText('Review and edit details on the next step.')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Review details' })).toBeEnabled();

    // Changing patients asks first, then returns to the search.
    await userEvent.click(canvas.getByRole('button', { name: 'Choose a different patient' }));
    await expect(canvas.getByText('Choose a different patient?')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Search again' }));
    await expect(await canvas.findByLabelText(SEARCH_LABEL)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Review details' })).toBeDisabled();
  },
};

export const IdentityCapturedMobile: Story = {
  name: 'Patient selected · narrow viewport and long name',
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  parameters: { chromatic: { viewports: [320, 390] } },
  render: () => {
    const captured: FrontDeskPatient = {
      ...blankWalkIn('walk-in-captured-mobile', 29),
      name: 'Sokha Chanmony Rattanak Sambath',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      phoneNumber: '12777088',
      identity: { source: 'manual', lockedFields: [] },
    };
    return <IdentityPlayground existingPatients={[]} initial={captured} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /Identity/ }));
    await expect(canvas.getAllByText('Patient selected')).toHaveLength(1);
    // The name reads twice on this step by design: the identity strip carries
    // it through all six steps, the card confirms what was just captured.
    // Both must survive a long name at 390px without clipping the other.
    await expect(canvas.getAllByText('Sokha Chanmony Rattanak Sambath')).toHaveLength(2);
    await expect(canvas.getByText('Source: Manual entry')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Choose a different patient' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Review details' })).toBeEnabled();
  },
};

export const MobileNarrow: Story = {
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '093 123 8123');
    await expect(await canvas.findByText('Sok Phearom')).toBeVisible();
  },
};

/**
 * Canonical collection-code lifecycle branches. A blocked code is never
 * silently redeemed: the desk sees the canonical status, why it blocks, and a
 * recovery door (walk-in with the same record) — never a dead end.
 */
export const BookingExpired: Story = {
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87510');
    await expect(await canvas.findByText('Booking code expired')).toBeVisible();
    await expect(canvas.getByText('Expired')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /Continue with Sok Phearom as walk-in/ }),
    ).toBeVisible();
    await expect(canvas.queryByRole('button', { name: /Check in booking/ })).not.toBeInTheDocument();
  },
};

export const BookingAlreadyRedeemed: Story = {
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87511');
    await expect(await canvas.findByText('Code already redeemed')).toBeVisible();
    await expect(canvas.getByText(/may already be checked in/)).toBeVisible();
    // Duplicate-visit risk: the recovery is deliberately secondary, never primary.
    await expect(canvas.getByRole('button', { name: 'Continue as a walk-in' })).toBeVisible();
  },
};

export const BookingCancelledCode: Story = {
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87512');
    await expect(await canvas.findByText('Booking cancelled')).toBeVisible();
    await expect(canvas.getByText(/Confirm with the patient/)).toBeVisible();
  },
};

export const BookingWrongBranch: Story = {
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87513');
    await expect(await canvas.findByText('Issued for another branch')).toBeVisible();
    await expect(canvas.getByText(/direct the patient there/i)).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /Continue with Sok Phearom as walk-in/ }),
    ).toBeVisible();
  },
};

/**
 * Check-in binds to ONE booking. A patient with several same-day bookings gets
 * actionable booking rows (with creator provenance); the walk-in path demotes
 * to an outline escape. Picking a row advances with that code bound.
 */
export const MultiBookingCheckIn: Story = {
  name: 'Multiple bookings · pick the one this visit is for',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '093 123 8123');
    await expect(await canvas.findByText('Known patient')).toBeVisible();
    await expect(canvas.getByText('Reception · Sothea')).toBeVisible();
    await expect(canvas.getByText('Patient self-booked')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Continue without a booking' })).toBeVisible();
    // Non-redeemable codes stay visible as facts but are never check-in targets.
    await expect(
      canvas.queryByRole('button', { name: 'Check in against booking GW87510' }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Check in against booking GW87513' }),
    ).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Check in against booking GW87431' }),
    );
    // Bound booking travels with the capture and the wizard advances.
    await waitFor(async () => {
      await expect(canvas.queryByLabelText(SEARCH_LABEL)).not.toBeInTheDocument();
    });
  },
};

/**
 * Verification recency is a trust fact, not decoration: a stale channel warns
 * before the desk relies on it. PROTOTYPE: patient-ms stores assurance only.
 */
export const TrustSignalsStaleVerification: Story = {
  name: 'Trust signals · stale phone verification warns',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '077 123 456');
    await expect(await canvas.findByText('Phone last verified 14 months ago')).toBeVisible();
  },
};

/**
 * An exact-ID duplicate cannot be waved through: keeping both records takes a
 * supervisor PIN and the decision is framed as logged. Lower-tier collisions
 * keep the one-click acknowledgement.
 */
export const CollisionSupervisorPin: Story = {
  name: 'Duplicate guard · exact ID needs a supervisor PIN',
  args: baseArgs,
  render: () => {
    const draft: FrontDeskPatient = {
      ...blankWalkIn('walk-in-nid-dup', 33),
      name: 'Sokha C.',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      idNumber: 'KH-114522',
      identity: { source: 'manual', lockedFields: [] },
    };
    return <IdentityPlayground initial={draft} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(/Exact ID match — Sokha Chan/)).toBeVisible();
    await expect(canvas.getByText('Matched on National ID', { exact: false })).toBeVisible();
    const proceed = canvas.getByRole('button', { name: 'Different person — continue' });
    await expect(proceed).toBeDisabled();
    await userEvent.type(canvas.getByLabelText('Supervisor PIN'), '4821');
    await expect(proceed).toBeEnabled();
    // The existing record stays inspectable before any decision.
    await userEvent.click(canvas.getByRole('button', { name: 'View record' }));
    await expect(canvas.getByText('Q-012')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Use existing record' })).toBeVisible();
  },
};

/**
 * Selection provenance survives: source + time + locked-field count + the
 * bound booking; changing patients asks first and preserves data until replaced.
 */
export const CapturedProvenance: Story = {
  name: 'Patient selected · provenance and change patient confirmation',
  args: baseArgs,
  render: () => {
    const draft: FrontDeskPatient = {
      ...blankWalkIn('walk-in-prov', 34),
      name: 'Sok Phearom',
      dob: '1974-03-15',
      sexAtBirth: 'Male',
      arrivedLabel: '08:24 · 12 min ago',
      boundBookingCode: 'GW87430',
      identity: {
        source: 'existing',
        lockedFields: ['name', 'dob', 'sexAtBirth'],
        capturedAtLabel: '08:31',
      },
    };
    return <IdentityPlayground initial={draft} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // A selected patient reopens on Step 2; Step 1 stays reachable for review.
    await userEvent.click(canvas.getByRole('tab', { name: /Identity/ }));
    await expect(
      await canvas.findByText('Source: Existing Kura record · Captured 08:31'),
    ).toBeVisible();
    await expect(canvas.getByText('3 fields locked')).toBeVisible();
    await expect(canvas.getByText('Booking GW87430')).toBeVisible();
    await expect(canvas.getByText('Q-034')).toBeVisible();
    await expect(canvas.getByText('Arrived 08:24 · 12 min ago')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Choose a different patient' }));
    await expect(canvas.getByText('Choose a different patient?')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Keep current' }));
    await expect(canvas.queryByText('Choose a different patient?')).not.toBeInTheDocument();
  },
};
