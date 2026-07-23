import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';

import { CheckInWizard } from './check-in-wizard';
import { blankWalkIn, EXISTING_PATIENTS, IDENTITY_REGISTRY } from './demo-data';
import type { FrontDeskPatient } from './types';
import { READINESS } from '../../components/foundations/readiness-data';

/** A record found on arrival — the person at the desk is not identified yet. */
function capturedPatient(): FrontDeskPatient {
  return {
    ...blankWalkIn('walk-in-details', 29),
    name: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    dob: '1974-03-15',
    sexAtBirth: 'Male',
    idNumber: '012345678',
    phoneNumber: '0931238123',
    identity: { source: 'existing', lockedFields: ['name', 'dob', 'sexAtBirth'] },
  };
}

/** After positive identification — the entry state for the rest of the task. */
function confirmedPatient(): FrontDeskPatient {
  return {
    ...capturedPatient(),
    identityConfirmation: { method: 'open-questions', byLabel: 'Sothea Ly', atLabel: '08:33' },
  };
}

/** Patient task complete: confirmed and contactable. */
function reviewedPatient(): FrontDeskPatient {
  return { ...confirmedPatient(), otpVerified: true };
}

function DetailsPlayground({ initial }: { initial: FrontDeskPatient }) {
  const [patient, setPatient] = useState<FrontDeskPatient>(initial);
  return (
    <CheckInWizard
      existingPatients={EXISTING_PATIENTS}
      identityRegistry={IDENTITY_REGISTRY}
      onCheckIn={() => {}}
      onPatientChange={setPatient}
      patient={patient}
    />
  );
}

function actionBarGeometry(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const bar = canvas.getByRole('region', { name: 'Check-in actions' });
  const viewport = canvasElement.ownerDocument.defaultView;
  if (!viewport) throw new Error('Story viewport is unavailable.');
  return { bar, viewport };
}

async function verifyPersistentActionBar(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const { bar, viewport } = actionBarGeometry(canvasElement);

  await expect(Math.ceil(bar.getBoundingClientRect().bottom)).toBeLessThanOrEqual(
    viewport.innerHeight,
  );

  await userEvent.click(canvas.getByRole('button', { name: /Address/ }));
  const street = await canvas.findByLabelText('Street / house');
  street.scrollIntoView({ block: 'end' });

  await waitFor(async () => {
    const barRect = bar.getBoundingClientRect();
    const fieldRect = street.getBoundingClientRect();
    await expect(Math.ceil(barRect.bottom)).toBeLessThanOrEqual(viewport.innerHeight);
    await expect(Math.ceil(fieldRect.bottom)).toBeLessThanOrEqual(Math.floor(barRect.top));
  });
}

const meta = {
  title: 'Clinic/Front Desk/Check-In/Patient',
  component: CheckInWizard,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.frontDesk,
      intake: {
        decision: 'EXTEND (front-desk patient task to upstream information parity)',
        owner: 'src/features/front-desk',
        evidence:
          'Information architecture ported from Kura-med/ui-kit `Receptionist/Wizard/Step 2 Patient` (source-kura-ui-kit): identity section with read-only record fields, Khmer name, preferred language, and optional Address, Refund-account, and Insurance-policy disclosures. Composed from house Card, Collapsible, Input, Select, SegmentedToggle, Badge, Alert, MoneyText; Tailwind and tabler icons replaced. Coverage moved out of this task entirely — it is resolved after the order lines exist.',
        exclusions: [
          'Capture photo (camera hardware ceremony)',
          'Telegram contact channel (platform ceremony — SMS OTP carries the verified-contact gate)',
          'Real KHQR scan for the refund account (demo saves a fixture payload)',
        ],
      },
      journeys: ['front-desk-check-in'],
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
          'The patient task identifies the person at the desk against the record it found — open questions, no editable record values — then verifies a contact channel. Name and date of birth are validated against the calendar, so a number typed into the name field or a date like 1991-23-23 never reaches a sample label. An insurance policy is patient-record data and lives in a collapsed disclosure here; who pays for what is resolved later, once the order lines exist. The order rail stays hidden until orders exist.',
      },
    },
  },
} satisfies Meta<typeof CheckInWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  patient: blankWalkIn('walk-in-details', 29),
  onPatientChange: () => {},
  existingPatients: EXISTING_PATIENTS,
  onCheckIn: () => {},
};

export const ReviewLockedIdentity: Story = {
  name: 'Record values stay read-only',
  args: baseArgs,
  render: () => <DetailsPlayground initial={confirmedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('From Kura record')).toBeVisible();

    // Record-backed fields are read-only; desk-owned fields stay editable.
    await expect(canvas.getByLabelText(/Full name \(Latin\)/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Date of birth/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Sex at birth/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Full name \(Khmer\)/)).toBeEnabled();
    await expect(canvas.getByLabelText(/National ID number/)).toBeEnabled();
    // Language moved to the contact section: it decides message language.
    await expect(canvas.getByLabelText(/Language for messages/)).toBeEnabled();

    // No unlock: editing a record to fit the person in front of the desk is
    // how a wrong-patient match gets buried.
    await expect(canvas.queryByRole('button', { name: /Unlock/ })).not.toBeInTheDocument();
    await expect(canvas.getByText(/read-only at the desk/i)).toBeVisible();
  },
};

/**
 * Finding a booking is not identifying a person: the desk asks open questions
 * and types the answers before Step 2 can be completed.
 */
export const ConfirmPatientOpenQuestions: Story = {
  name: 'Open questions confirm the patient',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('Confirm this is the person in front of you.'),
    ).toBeVisible();

    const confirm = canvas.getByRole('button', { name: 'Confirm patient' });
    await expect(confirm).toBeDisabled();
    await expect(canvas.getByText('Type both answers.')).toBeVisible();

    await userEvent.type(canvas.getByLabelText('What is your full name?'), 'Sok Phearom');
    await userEvent.type(canvas.getByLabelText('What is your date of birth?'), '19740315');
    await userEvent.click(confirm);

    await expect(await canvas.findByText(/Patient confirmed/)).toBeVisible();
    // Confirmation alone does not finish the task — contact still gates it.
    await expect(
      canvas.getByText(
        'Verify a contact channel, or record why the visit continues without one.',
      ),
    ).toBeVisible();
  },
};

/** A mismatch means the wrong record is open — never a record to edit. */
export const ConfirmPatientMismatch: Story = {
  name: 'Answers that do not match block the visit',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(await canvas.findByLabelText('What is your full name?'), 'Sok Phearom');
    await userEvent.type(canvas.getByLabelText('What is your date of birth?'), '19740316');
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm patient' }));

    await expect(
      await canvas.findByText('The answers do not match this record'),
    ).toBeVisible();
    await expect(canvas.getByText(/Do not change the record to match/)).toBeVisible();

    // The recovery drops the record and returns to the lookup.
    await userEvent.click(canvas.getByRole('button', { name: 'This is not the patient' }));
    await expect(
      await canvas.findByRole('heading', { level: 2, name: 'Find the booking' }),
    ).toBeVisible();
  },
};

export const ReviewOptionalSections: Story = {
  name: 'Address, refund, and policy disclosures',
  args: baseArgs,
  render: () => <DetailsPlayground initial={confirmedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Optional sections stay collapsed until opened — the contact gate keeps focus.
    await expect(canvas.queryByLabelText('Province')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /Address/ }));
    await expect(await canvas.findByLabelText('Province')).toBeVisible();
    await userEvent.type(canvas.getByLabelText('Province'), 'Phnom Penh');

    await userEvent.click(canvas.getByRole('button', { name: /Refund account/ }));
    // The empty state is one flat line, not a dashed box: nothing saved is a
    // state, and the disclosure heading already names the section.
    await expect(await canvas.findByText(/No account saved\./)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Scan KHQR' }));
    await expect(await canvas.findByText('Bakong KHQR saved')).toBeVisible();

    // A policy is patient-record data, not a step. It stays collapsed, and it
    // asks nothing about coverage — that is decided once lines exist.
    await userEvent.click(canvas.getByRole('button', { name: /Insurance policy/ }));
    await expect(
      await canvas.findByText(/Coverage is worked out after the order is composed\./),
    ).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Check eligibility' })).not.toBeInTheDocument();
  },
};

/**
 * A name of digits and a date the calendar does not contain are not edge
 * cases — they are the desk typing into the wrong field, and every label,
 * sample, and result downstream would carry the mistake.
 */
export const ImpossibleIdentityValues: Story = {
  name: 'Impossible name and date of birth are blocked',
  args: baseArgs,
  render: () => (
    <DetailsPlayground
      initial={{
        ...reviewedPatient(),
        name: '2312312',
        dob: '1991-23-23',
        identity: { source: 'manual', lockedFields: [] },
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Each bad value carries its own reason on its own field...
    await expect(
      await canvas.findByText('A name needs letters. Check this was not typed into the wrong field.'),
    ).toBeVisible();
    await expect(
      canvas.getByText('That date does not exist. Check the month and day.'),
    ).toBeVisible();
    // ...and the blocked action points at them instead of repeating one.
    await expect(canvas.getByText('Fix the highlighted patient details.')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Record arrival' })).toBeDisabled();
  },
};

/** A patient who does not know their birthday still gets a record: year alone. */
export const YearOfBirthOnly: Story = {
  name: 'Year of birth alone is accepted',
  args: baseArgs,
  render: () => (
    <DetailsPlayground
      initial={{
        ...confirmedPatient(),
        dob: '1991',
        identity: { source: 'manual', lockedFields: [] },
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dob = await canvas.findByLabelText(/Date of birth/);
    await expect(dob).toHaveValue('1991');
    await expect(canvas.queryByText(/That date does not exist/)).not.toBeInTheDocument();
    // Only the contact channel is still outstanding — the year is accepted.
    await expect(
      canvas.getByText(
        'Verify a contact channel, or record why the visit continues without one.',
      ),
    ).toBeVisible();
  },
};

export const ReviewContactGate: Story = {
  name: 'Contact verification gates the arrival',
  args: baseArgs,
  render: () => <DetailsPlayground initial={confirmedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Record arrival' })).toBeDisabled();
    await expect(
      canvas.getByText(
        'Verify a contact channel, or record why the visit continues without one.',
      ),
    ).toBeVisible();

    // SMS is the default channel, so the phone field is already on screen —
    // the desk never picks a method before it can do any work.
    await userEvent.click(canvas.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(canvas.getByLabelText('SMS code'), '123456');
    await userEvent.click(canvas.getByRole('button', { name: 'Verify' }));
    await expect(await canvas.findByText('SMS verified')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Record arrival' })).toBeEnabled();
  },
};

export const PersistentActionBar: Story = {
  name: 'Actions remain visible while scrolling',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => verifyPersistentActionBar(canvasElement),
};

export const PersistentActionBarMobile320: Story = {
  name: 'Actions remain visible at 320 px',
  args: baseArgs,
  globals: { viewport: { value: 'kura320' } },
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({ canvasElement }) => verifyPersistentActionBar(canvasElement),
};

export const TelegramChannel: Story = {
  name: 'Telegram via the patient display',
  args: baseArgs,
  render: () => <DetailsPlayground initial={confirmedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const telegramButton = canvas.getByRole('button', { name: 'Use Telegram instead' });
    await expect(
      telegramButton.querySelector('[data-kura-provider-mark="telegram"]'),
    ).toBeInTheDocument();
    await userEvent.click(telegramButton);
    await expect(await canvas.findByText('Waiting for the patient to scan')).toBeVisible();
    // The desk never types the number — the patient shares it from their phone.
    await userEvent.click(canvas.getByRole('button', { name: 'Simulate patient share' }));
    await expect(await canvas.findByText('Telegram verified')).toBeVisible();
    await expect(canvas.getByText(/t\.me\//)).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Record arrival' })).toBeEnabled();
  },
};

export const SaveUnverifiedReason: Story = {
  name: 'Unverified passes only with a recorded reason',
  args: baseArgs,
  render: () => <DetailsPlayground initial={confirmedPatient()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Record arrival' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', { name: 'Continue without verifying' }));
    const save = canvas.getByRole('button', { name: 'Save unverified' });
    await expect(save).toBeDisabled();
    // House Select is a combobox, not a native <select>.
    await userEvent.click(canvas.getByLabelText('Why does it stay unverified?'));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', { name: 'Guardian phone only' }));
    await userEvent.click(save);
    await expect(await canvas.findByText('Unverified · Guardian phone only')).toBeVisible();
    await expect(canvas.getByText(/patient may miss them/)).toBeVisible();
    // Trusted-desk door: the reason unblocks the arrival; verify stays offered.
    await expect(canvas.getByRole('button', { name: 'Record arrival' })).toBeEnabled();
    await expect(canvas.getByRole('button', { name: 'Verify instead' })).toBeVisible();
  },
};

export const MobileNarrow: Story = {
  name: 'Mobile',
  args: baseArgs,
  globals: { viewport: { value: 'kura390' } },
  render: () => <DetailsPlayground initial={capturedPatient()} />,
};
