import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { PatientAcquisitionFlow } from './patient-acquisition-flow';

const meta = {
  title: 'Clinic/Flows/Patient Acquisition and Intake',
  component: PatientAcquisitionFlow,
  tags: ['autodocs', 'source-figma', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.flows,
      source: {
        figma:
          'https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-18526',
        node: '1485:18526',
      },
      intake: {
        decision: 'COMPOSE + FEATURE-OWN',
        owner: 'src/features/care-loop',
        evidence:
          'Composes the canonical PhoneGateModal and Kura primitives. The clinic owns the request and received states; the patient intake opens as a separate mobile-first surface with only the patient’s own details and form.',
        exclusions: [
          'The contradictory Dara/Sok Nimol identities in the source board are replaced by one patient manifest.',
          'Phone verification remains a delivery-channel check; it never claims patient identity verification.',
          'The patient surface excludes clinic navigation, internal timelines, role badges, and medical record identifiers.',
          'SMS delivery, patient persistence, and intake writes are deterministic Storybook fixtures.',
        ],
      },
      journeys: ['patient-acquisition', 'phone-check', 'patient-intake', 'order-handoff'],
    },
    docs: {
      description: {
        component:
          'Executable first-patient journey from an empty list through phone verification, provisional patient creation, medical-history intake, and the handoff to lab ordering. Demo SMS code: 123456.',
      },
    },
  },
  args: {
    initialStage: 'patients-empty',
    intakeSendDelayMs: 0,
    intakeSendResult: 'success',
    phoneGateDelayMs: 0,
  },
} satisfies Meta<typeof PatientAcquisitionFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullJourney: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Add patient' }));
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111222');
    await userEvent.click(screen.getByRole('button', { name: 'Send SMS code' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'SMS code' }), '123456');
    await userEvent.click(screen.getByRole('button', { name: 'Verify code' }));

    await userEvent.type(await screen.findByLabelText(/Full name/), 'Sok Nimol');
    await userEvent.type(screen.getByLabelText(/DOB or age/), '32');
    await userEvent.click(screen.getByRole('radio', { name: 'Male' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create temporary patient' }));

    await waitFor(async () => {
      await expect(canvas.getByText('Medical history has not been provided')).toBeVisible();
    });
    await userEvent.click(canvas.getByRole('button', { name: 'Send intake link' }));
    await expect(await canvas.findByText('Intake link sent')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Continue on patient phone' }));

    await userEvent.click(
      canvas.getByRole('checkbox', {
        name: 'I confirm these personal details are correct.',
      }),
    );
    await userEvent.type(canvas.getByLabelText(/Allergies/), 'No known allergies');
    await userEvent.type(canvas.getByLabelText(/Current medicines/), 'None');
    await userEvent.type(canvas.getByLabelText(/Current symptoms/), 'Fatigue for two weeks');
    await userEvent.type(canvas.getByLabelText(/Family history/), 'Father has hypertension');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit medical history' }));

    await expect(canvas.getByText('Medical history is ready for review')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Start lab order' }));
    await expect(canvas.getByText('Patient ready for lab ordering')).toBeVisible();
  },
};

export const IntakeDeliveryFailure: Story = {
  args: {
    initialStage: 'intake-error',
    intakeSendResult: 'error',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Intake link was not sent')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Try again' })).toBeEnabled();
  },
};

export const IntakeSending: Story = {
  args: { initialStage: 'intake-sending' },
};

export const PatientCompletesMedicalHistory: Story = {
  args: { initialStage: 'intake-form' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Tell us about your health')).toBeVisible();
    await expect(canvas.getByText('Mekong Clinic')).toBeVisible();
    await expect(canvas.queryByText('First patient care loop')).not.toBeInTheDocument();
    await expect(canvas.queryByText('P8842')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Submit medical history' })).toBeDisabled();
  },
};

export const PatientCompletesMedicalHistoryMobile: Story = {
  args: { initialStage: 'intake-form' },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
