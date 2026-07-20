import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { ClinicOperationsPrototype } from './clinic-operations-prototype';
import { READINESS } from '../../components/foundations/readiness-data';

const meta = {
  title: 'Clinic/Flows/Reception to Phlebotomy',
  component: ClinicOperationsPrototype,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.flows,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/clinic-prototype',
        evidence:
          'Fresh Storybook already contains exact canonical implementations for AppShell, CheckInWizard, ScanGate, and DrawWorksheet. This flow only coordinates mock state and mode switching.',
      },
      journeys: [
        'REC-02 walk-in check-in',
        'REC-03 desk payment',
        'PHL-01 open draw work item',
        'PHL-03 register draw',
        'PHL-10 complete visit after draw',
      ],
      composes: ['AppShell', 'CheckInWizard', 'ScanGate', 'DrawWorksheet', 'Alert', 'Button'],
      mockContract: {
        backendWrites: false,
        receptionOtp: '123456',
        phlebotomyPatientId: 'P104481',
        handoff:
          'Reception and collection use independent mock datasets until the queue handoff contract is executable.',
      },
      responsive: {
        classification: ['FLUID', 'STACKING', 'TRANSFORMING', 'SCROLLING'],
        minimumWidth: 320,
      },
    },
    docs: {
      description: {
        component:
          'A full Storybook-only Clinic prototype using the canonical unified App Shell. Switch between Reception and Collection modes without leaving the workspace. All data is synthetic and resets on reload.',
      },
    },
  },
} satisfies Meta<typeof ClinicOperationsPrototype>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullPrototype: Story = {};

export const MockJourneySmokeTest: Story = {
  name: 'Mock journey smoke test',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await expect(canvas.getByText('Mock Storybook prototype')).toBeVisible();
    await expect(canvas.getByText('Who is checking in?')).toBeVisible();

    await userEvent.type(canvas.getByLabelText(/Full name/), 'Bopha Kim');
    await userEvent.click(canvas.getByRole('button', { name: /Front desk/ }));
    await userEvent.click(await body.findByRole('menuitemradio', { name: /Collection/ }));

    await waitFor(async () => {
      await expect(canvas.getByText('Station PSC-01')).toBeVisible();
      await expect(canvas.getByLabelText('Patient ID')).toBeVisible();
    });

    await userEvent.type(canvas.getByLabelText('Patient ID'), 'P104481{Enter}');
    await expect(await canvas.findByText('Before the draw')).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: /Collection/ }));
    await userEvent.click(await body.findByRole('menuitemradio', { name: /Front desk/ }));

    await waitFor(async () => {
      await expect(canvas.getByLabelText(/Full name/)).toHaveValue('Bopha Kim');
    });
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'kura390' },
  },
};
