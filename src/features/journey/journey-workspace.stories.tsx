import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';
import { WORKED_UP_ENCOUNTER } from '../assessment/demo-data';

import { newEpisode } from './episode';
import { JourneyWorkspace } from './journey-workspace';
import { JOURNEY_PATIENT } from './patient';

const start = newEpisode(JOURNEY_PATIENT.userId, JOURNEY_PATIENT.displayName);

const meta = {
  title: 'Clinic/Flows/First Patient Journey',
  component: JourneyWorkspace,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.journey,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/journey',
        evidence:
          'Composes the canonical assessment, order cart and care-plan surfaces. The episode state machine is new: no prior Kura prototype held a patient across phases, which is why identity, money and specimen state drifted between screens.',
        exclusions: [
          'Identity, collection and result release are compact operator steps here; their full surfaces are their own flows.',
          'Payment, specimen and result are tracked on separate axes and are never inferred from one another.',
          'Nothing is written to a backend, and the second half of the journey has no backend to write to.',
        ],
      },
      composes: ['AssessmentWorkspace', 'CareLoopReview', 'CarePlanCard', 'Card', 'Badge', 'Button'],
    },
    docs: {
      description: {
        component:
          'One patient, one episode, first contact to care plan. The strip states which phase the episode is in, who acts next, and what is holding it up — the property that makes this a journey rather than six screens visited in order.',
      },
    },
  },
} satisfies Meta<typeof JourneyWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromTheBeginning: Story = {
  args: { initialEpisode: start },
  parameters: {
    docs: {
      description: {
        story: 'Nothing has happened yet. The next step names reception or the doctor.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Not identified')).toBeVisible();
    await expect(canvas.getByText('Verify the phone and open the patient record')).toBeVisible();
    await expect(canvas.getByText('No charge raised · No sample · No result')).toBeVisible();
  },
};

export const PaidButNotDrawn: Story = {
  args: {
    initialEpisode: {
      ...start,
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication: {
        diagnosisId: 'dx-anaemia',
        code: 'D50.9',
        label: 'Iron deficiency anaemia, unspecified',
        certainty: 'working',
      },
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'awaiting_collection',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'The state that trips people up: the patient has paid and no sample exists. The three axes are reported separately so nobody reads the receipt as evidence of a draw.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Paid · Awaiting collection · No result')).toBeVisible();
    await expect(canvas.getByText('Draw the sample and confirm the tubes')).toBeVisible();
  },
};

export const StoppedWaitingOnTheLab: Story = {
  args: {
    initialEpisode: {
      ...start,
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication: {
        diagnosisId: 'dx-anaemia',
        code: 'D50.9',
        label: 'Iron deficiency anaemia, unspecified',
        certainty: 'working',
      },
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'collected',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'A stopped episode still shows its next step, with the reason it cannot move. Hiding it would lose why the patient is waiting.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Waiting: Samples have not reached the lab')).toBeVisible();
  },
};

export const RunTheWholeJourney: Story = {
  args: { initialEpisode: start },
  parameters: {
    docs: {
      description: {
        story:
          'The full chain in one sitting: identify, assess, order, collect, result, and sign a plan whose next measurement is already scheduled. The same patient throughout — the demographics never change under the reader.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Phone verified, open the record' }));
    await expect(canvas.getByText('Provisional')).toBeVisible();

    // Assessment: an order needs a reason, so one is recorded here.
    await userEvent.type(canvas.getByLabelText(/Reason for visit/), 'Tired for two weeks');
    await userEvent.type(
      canvas.getByLabelText(/Diagnosis or impression/),
      'Iron deficiency anaemia, unspecified',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Add diagnosis' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Order tests' }));

    await expect(canvas.getByText(/Ten baseline tests, ordered for D50.9/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Send booking code' }));

    await expect(canvas.getByText('Payment due · Awaiting collection · No result')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Payment taken, tubes drawn' }));

    await userEvent.click(canvas.getByRole('button', { name: 'Release results to the doctor' }));
    await expect(canvas.getByText('Paid · Received at lab · Released')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Sign care plan' }));

    await expect(canvas.getByRole('heading', { name: 'D50.9 · Iron deficiency anaemia' })).toBeVisible();
    await expect(canvas.getByText('32 y · M · MRN P-8842')).toBeVisible();
  },
};

export const Mobile320: Story = {
  args: { initialEpisode: start },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
