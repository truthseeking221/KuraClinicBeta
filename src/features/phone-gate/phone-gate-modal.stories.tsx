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
          'Built against kura-platform docs/design/phone-gate/phone-gate-ui-spec.md (canonical, Figma 742:52132) with clinic-phone-gate-mf as the behavior reference. Composed from Dialog (header/body/footer, mobile full presentation, built-in close), PhoneInput, OtpInput, DateInput, Checkbox, RadioGroup, Input, Alert, Button, AlertDialog; spec pixel values mapped to Kura tokens.',
        exclusions: [
          'recentPatients chooser (reference-MF addition outside the canonical modal spec scope)',
          'Per-digit “Digit 1 of 6” inputs (OtpInput renders one logical input with equivalent autofill/paste/SR behavior)',
          'Persistent BEFORE YOU SEND pane (identical in every state; its one safety fact now appears on the two steps that bind a person)',
          'Per-candidate Choose buttons (replaced by one radio set and one primary action so a shared phone needs a deliberate selection)',
          'In-modal success receipt (the surface behind already states the provisional identity and the PSC step; a receipt would repeat it behind an extra click)',
        ],
      },
      journeys: [
        'phone-gate-known-match-attach',
        'phone-gate-shared-phone-select',
        'phone-gate-different-patient',
        'phone-gate-no-match-temporary',
        'phone-gate-duplicate-preflight',
      ],
    },
    docs: {
      description: {
        component:
          'Safety checkpoint before a booking code is sent: verify a Cambodia phone by OTP, detect an existing patient, attach it or add a new one. Two axes stay separate everywhere — the phone is verified by SMS, the patient identity is not confirmed until PSC sees the person. A phone that matches nothing is not proof the patient is new, so adding one runs a demographic duplicate check first and creates nothing while that check is unresolved. Demo scaffolding: code 123456; 070 123 496 → known match (Sokha Chann); 070 123 497 → shared phone (three candidates); numbers ending 000 → lookup error; ending 999 → OTP rate limit; anything else → no match. Duplicate preflight keys off the entered name: “Chann” → possible match, “Khem” → concurrent create, “Offline” → check unavailable, anything else → clear.',
      },
    },
  },
  args: {
    open: true,
    onClose: fn(),
    onOutcome: fn(),
    duplicateCheckDelayMs: 0,
  },
} satisfies Meta<typeof PhoneGateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function body(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body);
}

/** Fills the three identity fields with an exact date of birth. */
async function fillIdentity(
  screen: ReturnType<typeof body>,
  name = 'Pierre',
  dob = '19940912',
) {
  await userEvent.type(await screen.findByLabelText(/Full name/), name);
  await userEvent.type(screen.getByLabelText(/Date of birth/), dob);
  await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
}

/** State 1 — enter phone: the title names the step, Send SMS code validates. */
export const EnterPhone: Story = {
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('dialog')).toBeVisible();
    await expect(screen.getByRole('heading', { name: 'Contact phone number' })).toBeVisible();
    await expect(
      screen.getByText('The patient or phone holder must be present.'),
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

/** State 3 — known match: what SMS proved is named, and it is not the person. */
export const KnownMatch: Story = {
  args: { initial: { state: 'knownMatch', phone: '+85570123496' } },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(
      await screen.findByRole('heading', { name: 'Is this the patient?' }),
    ).toBeVisible();
    await expect(screen.getByText('Phone verified by SMS')).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();
    await expect(
      screen.getByText('SMS confirms the number, not who is being tested.'),
    ).toBeVisible();
    await expect(screen.getByText('Sokha Chann')).toBeVisible();
    await expect(screen.getByText('Female · 32y · MRN ··34')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Use this patient' }));
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'existing', matchReason: 'verified_phone' }),
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

/**
 * State 5 — no match by phone. The title names the goal, the description says
 * what was and was not established, and the action stays unavailable until the
 * three identity answers exist.
 */
export const NoMatch: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(
      await screen.findByRole('heading', { name: 'Add a new patient' }),
    ).toBeVisible();
    await expect(screen.getByText(/No patient matched this phone/)).toBeVisible();
    await expect(screen.getByText('Phone verified by SMS')).toBeVisible();
    await expect(screen.getByText('Patient identity not yet confirmed')).toBeVisible();

    const add = screen.getByRole('button', { name: 'Create provisional patient' });
    await expect(add).toBeDisabled();
    await expect(screen.getByText('Complete the required fields to continue.')).toBeVisible();

    await fillIdentity(screen);
    await expect(add).toBeEnabled();
    await expect(
      screen.getByText(
        'Creates a provisional record. PSC staff confirm identity before collection.',
      ),
    ).toBeVisible();

    await userEvent.click(add);
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'temporary',
          knownPhoneOverride: false,
          duplicateOverride: false,
          draft: expect.objectContaining({ dob: '1994-09-12', dobUnknown: false }),
        }),
      ),
    );
  },
};

/**
 * An unknown date of birth is recorded as an estimated age, never as a
 * fabricated date: the age field appears only on that declaration, and the
 * outcome carries no `dob`.
 */
export const EstimatedAge: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByLabelText(/Date of birth/)).toBeVisible();
    await expect(screen.queryByLabelText(/Age in years/)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('checkbox', { name: /Exact date is unknown/ }));
    await expect(await screen.findByLabelText(/Age in years/)).toBeVisible();
    await expect(screen.queryByLabelText(/Date of birth/)).not.toBeInTheDocument();
    await expect(screen.getByText('Kura records this as an estimated age.')).toBeVisible();

    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Age in years/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'temporary',
          draft: expect.objectContaining({ dob: '', dobUnknown: true, ageYears: '32' }),
        }),
      ),
    );
  },
};

/** Filled but wrong: each message lands on the field that carries the problem. */
export const InvalidDetails: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' } },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth/), '19940230');
    await userEvent.click(screen.getByRole('radio', { name: 'Female' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    await expect(await screen.findByText('Enter a real date, as YYYY-MM-DD.')).toBeVisible();
    await expect(args.onOutcome).not.toHaveBeenCalled();
  },
};

/** The preflight runs on the action, with the entered details still on screen. */
export const CheckingDuplicates: Story = {
  args: {
    initial: { state: 'noMatch', phone: '+85599111222' },
    duplicateCheckDelayMs: 60000,
  },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await fillIdentity(screen);
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    const pending = await screen.findByRole('button', { name: 'Checking patient records…' });
    await expect(pending).toHaveAttribute('aria-busy', 'true');
    await expect(screen.getByDisplayValue('Pierre')).toBeVisible();
    await expect(screen.getByLabelText(/Full name/)).toBeDisabled();
  },
};

/**
 * A phone that matched nothing is not proof the patient is new. Details that
 * resemble an existing record stop the create and offer that record first.
 */
export const PossibleDuplicateFound: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await fillIdentity(screen, 'Sokha Chann');
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    await expect(
      await screen.findByRole('heading', { name: 'Possible patient found' }),
    ).toBeVisible();
    await expect(
      screen.getByText('Review the match before creating a new record.'),
    ).toBeVisible();
    await expect(args.onOutcome).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('radio', { name: 'Sokha Chann' }));
    await userEvent.click(screen.getByRole('button', { name: 'Use selected patient' }));
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'existing', matchReason: 'demographic_match' }),
      ),
    );
  },
};

/** Rejecting the candidates still creates — recorded as a duplicate override. */
export const DuplicateOverride: Story = {
  args: {
    initial: { state: 'possibleDuplicates', phone: '+85599111222' },
    createDelayMs: 0,
  },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.click(await screen.findByRole('button', { name: 'None of these' }));
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary', duplicateOverride: true }),
      ),
    );
  },
};

/** Someone else created the record first: review it, never duplicate it. */
export const ConcurrentPatientAdded: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' } },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await fillIdentity(screen, 'Rithy Khem');
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    await expect(
      await screen.findByRole('heading', { name: 'A matching patient was just added' }),
    ).toBeVisible();
    await expect(screen.getByText(/Added by someone else while you were entering these details/)).toBeVisible();
    await expect(
      screen.queryByRole('button', { name: 'Create provisional patient' }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Review patient' }));
    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'existing', matchReason: 'concurrent_create' }),
      ),
    );
  },
};

/** The check failed, so nothing was created — and the modal says exactly that. */
export const DuplicateCheckUnavailable: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await fillIdentity(screen, 'Offline Test');
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    await expect(
      await screen.findByText('Couldn’t check for existing patients'),
    ).toBeVisible();
    await expect(
      screen.getByText('No patient record was created. Check the connection and try again.'),
    ).toBeVisible();
    await expect(args.onOutcome).not.toHaveBeenCalled();

    // Retrying blind is not recovery: the details stay on screen and editable,
    // and the retry runs the same validated path as the primary action.
    await expect(screen.getByDisplayValue('Offline Test')).toBeEnabled();
    await userEvent.clear(screen.getByLabelText(/Full name/));
    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary' }),
      ),
    );
  },
};

/**
 * State 4 — the phone already belongs to someone. Rejecting that record is a
 * declaration, not a side effect of filling the form below it.
 */
export const DifferentPatient: Story = {
  args: { initial: { state: 'knownMatch', phone: '+85570123496' }, createDelayMs: 0 },
  play: async ({ canvasElement, args }) => {
    const screen = body(canvasElement);
    await userEvent.click(await screen.findByRole('button', { name: 'Someone else' }));
    await expect(
      await screen.findByText('This phone is already linked to another Kura patient'),
    ).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();

    await fillIdentity(screen);
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));
    await expect(
      await screen.findByText('Confirm this is a different person to continue.'),
    ).toBeVisible();
    await expect(args.onOutcome).not.toHaveBeenCalled();

    await userEvent.click(
      screen.getByRole('checkbox', { name: /none of the matched patients/ }),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    await waitFor(() =>
      expect(args.onOutcome).toHaveBeenCalledWith(
        expect.objectContaining({ kind: 'temporary', knownPhoneOverride: true }),
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

/** Creating — the form stays put; the action carries the pending state. */
export const CreatingPatient: Story = {
  args: { initial: { state: 'noMatch', phone: '+85599111222' }, createDelayMs: 60000 },
  play: async ({ canvasElement }) => {
    const screen = body(canvasElement);
    await fillIdentity(screen);
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

    const pending = await screen.findByRole('button', { name: 'Adding the patient…' });
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

/** Full journey — fresh phone through the duplicate check to a new patient. */
export const FullJourneyNewPatient: Story = {
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
      await screen.findByText(/No patient matched this phone/),
    ).toBeVisible();
    await fillIdentity(screen);
    await userEvent.click(screen.getByRole('button', { name: 'Create provisional patient' }));

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
        dob: '1994-09-12',
        dobUnknown: false,
        ageYears: '',
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
