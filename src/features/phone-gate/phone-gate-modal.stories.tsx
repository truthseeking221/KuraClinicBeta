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
          'Built against kura-platform docs/design/phone-gate/phone-gate-ui-spec.md (canonical, Figma 742:52132) with clinic-phone-gate-mf as the behavior reference. Composed from Dialog (header/body/footer, mobile full presentation, built-in close), PhoneInput, OtpInput, RadioGroup, Input, Alert, Button, AlertDialog; spec pixel values mapped to Kura tokens.',
        exclusions: [
          'recentPatients chooser (reference-MF addition outside the canonical modal spec scope)',
          'Per-digit “Digit 1 of 6” inputs (OtpInput renders one logical input with equivalent autofill/paste/SR behavior)',
          'Persistent BEFORE YOU SEND pane (identical in every state; its one safety fact now appears on the two steps that bind a person)',
          'Per-candidate Choose buttons (replaced by one radio set and one primary action so a shared phone needs a deliberate selection)',
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
          'Safety checkpoint before a booking code is sent: verify a Cambodia phone by OTP, detect an existing patient, attach it or create a provisional patient. One column, one question per step; the destination stays inline with Change on the code step, while the checked number remains visible afterward. “Phone checked” never claims identity. PSC confirms it later. Demo scaffolding: code 123456; 070 123 496 → known match (Sokha Chann); 070 123 497 → shared phone (three candidates); numbers ending 000 → lookup error; ending 999 → OTP rate limit; anything else → no match.',
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

/** State 1 — enter phone: the title names the step, Send SMS code validates. */
export const EnterPhone: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('dialog')).toBeVisible();
    await expect(screen.getByRole('heading', { name: 'Contact phone number' })).toBeVisible();
    await expect(
      screen.getByText('Use the patient’s number, or a guardian’s or guarantor’s.'),
    ).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await expect(await screen.findByText(/valid Cambodia phone/)).toBeVisible();
  },
};

/** State 2 — OTP: destination supports the code task instead of becoming a second field. */
export const VerifyOtp: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Contact phone number' }),
      FRESH_PHONE,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));

    await expect(await screen.findByRole('heading', { name: 'Enter the code' })).toBeVisible();
    await expect(screen.getByText('Sent to')).toBeVisible();
    await expect(screen.getByText(/\+855 99 \.\.\. 222/)).toBeVisible();

    const verify = screen.getByRole('button', { name: 'Verify code' });
    await expect(verify).toBeDisabled();

    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), '000000');
    await userEvent.click(verify);
    await expect(await screen.findByRole('alert')).toHaveTextContent(/Incorrect or expired/);
    await expect(screen.getByRole('button', { name: /Resend in/ })).toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Change phone number' }));
    await expect(await screen.findByRole('heading', { name: 'Contact phone number' })).toBeVisible();
  },
};

/** State 3 — known match: the checked number stays on screen beside the record. */
export const KnownMatch: Story = {
  args: { initial: { state: 'knownMatch', phone: '+85570123496' } },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(
      await screen.findByRole('heading', { name: 'Is this the patient?' }),
    ).toBeVisible();
    await expect(screen.getByText('Phone checked')).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();
    await expect(
      screen.getByText('SMS confirms the number, not who is being tested.'),
    ).toBeVisible();
    await expect(screen.getByText('Sokha Chann')).toBeVisible();
    await expect(screen.getByText('Female · 32y · MRN ··34')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Use this patient' }));
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'existing' }),
      ),
    );
    await expect(args.onClose).toHaveBeenCalledWith('completed');
  },
};

/** State 3B — shared phone: one radio set, one primary, no silent default. */
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
      screen.getByText('SMS confirms the number, not who is being tested.'),
    ).toBeVisible();

    const candidates = screen.getAllByRole('radio');
    await expect(candidates).toHaveLength(3);
    for (const candidate of candidates) {
      await expect(candidate).not.toBeChecked();
    }

    // Attaching without a deliberate choice is refused, not guessed.
    await userEvent.click(screen.getByRole('button', { name: 'Use selected patient' }));
    await expect(await screen.findByRole('alert')).toHaveTextContent(/Select a patient/);
    await expect(args.onOutcome).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('radio', { name: 'Rithy Khem' }));
    await userEvent.click(screen.getByRole('button', { name: 'Use selected patient' }));
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

/** Verification pends on the action, so the step never blanks out. */
export const VerifyingOtp: Story = {
  args: { initial: { state: 'verifyingOtp', phone: '+85599111222' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    const pending = await screen.findByRole('button', { name: 'Checking code…' });
    await expect(pending).toHaveAttribute('aria-busy', 'true');
    await expect(screen.getByRole('textbox', { name: 'SMS code' })).toBeVisible();
  },
};

/** State 4 — different patient: warning banner, audit-flagged creation. */
export const DifferentPatient: Story = {
  args: { initial: { state: 'knownMatch', phone: '+85570123496' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.click(await screen.findByRole('button', { name: 'Someone else' }));
    await expect(await screen.findByText('This may be a different patient')).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();

    await userEvent.click(
      screen.getByRole('button', { name: 'Create provisional patient' }),
    );
    await expect(await screen.findByText('Enter the full name.')).toBeVisible();
    await expect(screen.getByText('Enter a date of birth or estimated age.')).toBeVisible();
    await expect(screen.getByText('Select a sex.')).toBeVisible();

    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Create provisional patient' }),
    );

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary', knownPhoneOverride: true }),
      ),
    );
  },
};

/** State 5 — no match: the fact is a description line, not a tinted banner. */
export const NoMatch: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(
      await screen.findByRole('heading', { name: 'Patient details' }),
    ).toBeVisible();
    await expect(
      screen.getByText('No patient matches this phone number. PSC confirms identity.'),
    ).toBeVisible();
    await expect(
      screen.getByText('Use age only if date of birth is unknown.'),
    ).toBeVisible();

    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Create provisional patient' }),
    );

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary', knownPhoneOverride: false }),
      ),
    );
  },
};

/** One control changes the bound number, from every post-verification step. */
export const ChangeVerifiedPhone: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(
      await screen.findAllByRole('button', { name: 'Change phone number' }),
    ).toHaveLength(1);

    await userEvent.click(screen.getByRole('button', { name: 'Change phone number' }));
    await expect(await screen.findByRole('heading', { name: 'Contact phone number' })).toBeVisible();
  },
};

/** Submitting — the form stays put; the action carries the pending state. */
export const SubmittingTemporaryPatient: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 60000 },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Create provisional patient' }),
    );

    const pending = await screen.findByRole('button', { name: 'Creating provisional patient…' });
    await expect(pending).toHaveAttribute('aria-busy', 'true');
    await expect(screen.getByDisplayValue('Pierre')).toBeVisible();
  },
};

/** Lookup failure: entries kept, retry offered, the number still changeable. */
export const LookupError: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Contact phone number' }),
      '099111000',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await expect(await screen.findByText('Lookup unavailable')).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Change phone number' })).toBeVisible();
  },
};

/** OTP rate limit surfaces on the entry state without leaking existence. */
export const RateLimited: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Contact phone number' }),
      '099111999',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await expect(await screen.findByText(/Too many codes requested/)).toBeVisible();
  },
};

/** Esc with entered data asks before discarding; backdrop never dismisses. */
export const UnsavedDataGuard: Story = {
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Contact phone number' }),
      '0991',
    );
    await userEvent.keyboard('{Escape}');

    await expect(await screen.findByText('Discard what you entered?')).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Keep editing' }));
    await expect(args.onClose).not.toHaveBeenCalled();

    await userEvent.keyboard('{Escape}');
    await userEvent.click(await screen.findByRole('button', { name: 'Discard & close' }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('dismissed'));
  },
};

/** Full journey — fresh phone to provisional patient, end to end. */
export const FullJourneyTemporary: Story = {
  args: { createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Contact phone number' }),
      FRESH_PHONE,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await expect(
      await screen.findByText('No patient matches this phone number. PSC confirms identity.'),
    ).toBeVisible();
    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Create provisional patient' }),
    );

    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('completed'));
  },
};

/** Full journey — known phone to existing patient attach. */
export const FullJourneyKnownMatch: Story = {
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Contact phone number' }),
      KNOWN_PHONE,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await userEvent.click(await screen.findByRole('button', { name: 'Use this patient' }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('completed'));
  },
};

/** 320px: the step is the first thing on screen, full-width presentation. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('heading', { name: 'Contact phone number' })).toBeVisible();
    await expect(
      screen.getByRole('textbox', { name: 'Contact phone number' }),
    ).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Send SMS code' })).toBeVisible();
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
    await expect(screen.getAllByRole('radio')).toHaveLength(3);
  },
};

/** 320px long content: the body scrolls, the primary action stays reachable. */
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
    await expect(
      screen.getByRole('button', { name: 'Create provisional patient' }),
    ).toBeVisible();
  },
};

/** 320px recoverable lookup failure: retry and change actions remain usable. */
export const MobileLookupError: Story = {
  args: { initial: { state: 'error', phone: '+85599111000' } },
  parameters: { viewport: { defaultViewport: 'kura320' } },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('Lookup unavailable')).toBeVisible();
    await expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible();
  },
};
