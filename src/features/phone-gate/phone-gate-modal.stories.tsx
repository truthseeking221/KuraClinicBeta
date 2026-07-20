import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { PhoneGateModal } from './phone-gate-modal';
import { DEMO_OTP, DEMO_SHARED_PHONE_PATIENTS } from './demo-data';
import { READINESS } from '../../components/foundations/readiness-data';

const KNOWN_PHONE = '070123496';
const FRESH_PHONE = '099111222';

const meta = {
  title: 'Clinic/Clinical/Phone Gate',
  component: PhoneGateModal,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.phoneGate,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/phone-gate',
        evidence:
          'Built against kura-platform docs/design/phone-gate/phone-gate-ui-spec.md (canonical, Figma 742:52132) with clinic-phone-gate-mf as the behavior reference. Composed from Dialog, PhoneInput, OtpInput, Avatar, Alert, SegmentedToggle, Input, Button, AlertDialog; spec pixel values mapped to Kura tokens (shell 790→control scale, banner hexes→status tokens).',
        exclusions: [
          'recentPatients chooser (reference-MF addition outside the canonical modal spec scope)',
          'Per-digit “Digit 1 of 6” inputs (OtpInput renders one logical input with equivalent autofill/paste/SR behavior)',
          'Brand illustration in the safety pane (replaced by the canonical UserIdentityIcon — no vendor artwork)',
        ],
      },
      journeys: [
        'phone-gate-known-match-attach',
        'phone-gate-shared-phone-select',
        'phone-gate-different-patient',
        'phone-gate-no-match-temporary',
      ],
    },
    docs: {
      description: {
        component:
          'Safety checkpoint before a booking code is sent: verify a Cambodia phone by OTP, detect an existing patient, attach it or create a temporary patient. The verified phone becomes the delivery address for results and payment links; “Phone checked” never claims identity — PSC confirms it later. Demo scaffolding: code 123456; 070 123 496 → known match (Sokha Chann); 070 123 497 → shared phone (three candidates); numbers ending 000 → lookup error; ending 999 → OTP rate limit; anything else → no match.',
      },
    },
  },
  args: {
    open: true,
    onClose: fn(),
    onOutcome: fn(),
  },
} satisfies Meta<typeof PhoneGateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function body(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body);
}

/** State 1 — enter phone: focus lands in the field, Send SMS code validates. */
export const EnterPhone: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('dialog')).toBeVisible();
    await expect(screen.getByText('Choose patient')).toBeVisible();
    await expect(screen.getByText('BEFORE YOU SEND')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await expect(await screen.findByText(/valid Cambodia phone/)).toBeVisible();
  },
};

/** State 2 — OTP empty→partial→invalid→resend; Change phone recovers. */
export const VerifyOtp: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), FRESH_PHONE);
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));

    await expect(await screen.findByText('Verify number')).toBeVisible();
    await expect(screen.getByText(/\+855 99 \.\.\. 222/)).toBeVisible();

    const verify = screen.getByRole('button', { name: 'Verify code' });
    await expect(verify).toBeDisabled();

    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), '000000');
    await userEvent.click(verify);
    await expect(await screen.findByRole('alert')).toHaveTextContent(/Incorrect or expired/);
    await expect(screen.getByRole('button', { name: /Resend in/ })).toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Change phone' }));
    await expect(await screen.findByText('Choose patient')).toBeVisible();
  },
};

/** State 3 — known match: minimal PHI card, Choose attaches and closes. */
export const KnownMatch: Story = {
  args: { initial: { state: 'knownMatch', phone: '+85570123496' } },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('Is this the patient?')).toBeVisible();
    await expect(screen.getByText('Sokha Chann')).toBeVisible();
    await expect(screen.getByText('Female · 32y · MRN ··34')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Choose' }));
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'existing' }),
      ),
    );
    await expect(args.onClose).toHaveBeenCalledWith('completed');
  },
};

/** State 3B — shared phone: doctor must explicitly select one redacted candidate. */
export const SharedPhoneMatches: Story = {
  args: {
    initial: {
      state: 'sharedMatches',
      phone: '+85570123497',
      candidates: DEMO_SHARED_PHONE_PATIENTS,
    },
  },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('This number is linked to 3 patients')).toBeVisible();
    await expect(
      screen.getByText(/SMS confirms the phone, not the person being tested/),
    ).toBeVisible();
    const chooseButtons = screen.getAllByRole('button', { name: 'Choose' });
    await expect(chooseButtons).toHaveLength(3);
    await expect(chooseButtons[0]).toHaveFocus();

    await userEvent.click(chooseButtons[1]!);
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'existing',
          matchReason: 'shared_phone',
          patient: expect.objectContaining({ patientId: 'pat-rithy' }),
        }),
      ),
    );
  },
};

/** OTP verification is distinct from the post-verification lookup result. */
export const VerifyingOtp: Story = {
  args: { initial: { state: 'verifyingOtp', phone: '+85599111222' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('status')).toHaveTextContent('Checking your code…');
  },
};

/** State 4 — different patient: warning banner, locked phone, audit-flagged creation. */
export const DifferentPatient: Story = {
  args: { initial: { state: 'knownMatch', phone: '+85570123496' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.click(
      await screen.findByRole('button', { name: 'Patient is someone else' }),
    );
    await expect(
      await screen.findByText('This looks like a different patient'),
    ).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Create temporary patient' }));
    await expect(await screen.findByRole('alert', { name: '' })).toHaveTextContent(
      /full name, DOB or age, and sex/,
    );

    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/DOB or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create temporary patient' }));

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary', knownPhoneOverride: true }),
      ),
    );
  },
};

/** State 5 — no match: calm info banner, temporary patient without override flag. */
export const NoMatch: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('No match found')).toBeVisible();
    await expect(screen.getByText(/possible duplicates/)).toBeVisible();

    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/DOB or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create temporary patient' }));

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary', knownPhoneOverride: false }),
      ),
    );
  },
};

/** Unlocking the verified phone returns to entry — OTP and lookup invalidated. */
export const UnlockPhone: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.click(
      await screen.findByRole('button', { name: 'Unlock phone number' }),
    );
    await expect(await screen.findByText('Choose patient')).toBeVisible();
  },
};

/** Submitting — the pending state stays visible while creation is in flight. */
export const SubmittingTemporaryPatient: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 60000 },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/DOB or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create temporary patient' }));
    await expect(await screen.findByRole('status')).toHaveTextContent(
      /Creating the temporary patient/,
    );
  },
};

/** Lookup failure: entries kept, retry + change phone offered. */
export const LookupError: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111000');
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await expect(await screen.findByText('Lookup unavailable')).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible();
  },
};

/** OTP rate limit surfaces on the entry state without leaking existence. */
export const RateLimited: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111999');
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await expect(await screen.findByText(/Too many codes requested/)).toBeVisible();
  },
};

/** Esc with entered data asks before discarding; backdrop never dismisses. */
export const UnsavedDataGuard: Story = {
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '0991');
    await userEvent.keyboard('{Escape}');

    await expect(await screen.findByText('Discard what you entered?')).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Keep editing' }));
    await expect(args.onClose).not.toHaveBeenCalled();

    await userEvent.keyboard('{Escape}');
    await userEvent.click(await screen.findByRole('button', { name: 'Discard & close' }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('dismissed'));
  },
};

/** Full journey — fresh phone to temporary patient, end to end. */
export const FullJourneyTemporary: Story = {
  args: { createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), FRESH_PHONE);
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await expect(await screen.findByText('No match found')).toBeVisible();
    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/DOB or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create temporary patient' }));

    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('completed'));
  },
};

/** Full journey — known phone to existing patient attach. */
export const FullJourneyKnownMatch: Story = {
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), KNOWN_PHONE);
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await userEvent.click(await screen.findByRole('button', { name: 'Choose' }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('completed'));
  },
};

/** 320px: panes stack, the safety message stays above the form. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('BEFORE YOU SEND')).toBeVisible();
    await expect(screen.getByLabelText(/Phone number/)).toBeVisible();
  },
};

/** 320px shared-phone safety state: every candidate stays selectable. */
export const MobileSharedPhoneMatches: Story = {
  args: {
    initial: {
      state: 'sharedMatches',
      phone: '+85570123497',
      candidates: DEMO_SHARED_PHONE_PATIENTS,
    },
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('This number is linked to 3 patients')).toBeVisible();
    await expect(screen.getAllByRole('button', { name: 'Choose' })).toHaveLength(3);
  },
};

/** 320px long-content state: fields, selected sex, and the final action remain visible. */
export const MobileNoMatchLongContent: Story = {
  args: {
    initial: {
      state: 'noMatch',
      phone: '+85599111222',
      draft: {
        name: 'Sreymom Nguyễn Thị Hồng Phương',
        dobOrAge: '12-09-1994',
        sex: 'Female',
      },
    },
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByDisplayValue('Sreymom Nguyễn Thị Hồng Phương')).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Create temporary patient' })).toBeVisible();
  },
};

/** 320px recoverable lookup failure: retry and change-phone actions remain usable. */
export const MobileLookupError: Story = {
  args: { initial: { state: 'error', phone: '+85599111000' } },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('Lookup unavailable')).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible();
  },
};
