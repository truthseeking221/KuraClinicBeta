import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { ClinicFlowLandscape } from './clinic-flow-landscape';

const meta = {
  title: 'Clinic/Flows/Clinic Flow Landscape',
  component: ClinicFlowLandscape,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.flows,
      intake: {
        decision: 'COMPOSE',
        owner: 'src/features/journey',
        evidence:
          'Composes canonical Kura Card, Badge, Alert, Button, and icon exports around the 163-journey clinic catalog. Existing Storybook flows remain the owners of executable phase behavior.',
        exclusions: [
          'The landscape does not redefine backend state or promote legacy behavior.',
          'Coverage is evidence status, not product release readiness.',
          'The map opens existing surfaces but does not duplicate their UI or state.',
        ],
      },
      flow: {
        pages: [
          'Clinic/Flows/Patient Acquisition and Intake',
          'Clinic/Flows/Test Ordering',
          'Clinic/Flows/Lab Order and Sample Collection',
          'Clinic/Flows/Result Review and Closure',
          'Clinic/Flows/Earnings Settlement',
        ],
      },
      journeys: [
        'ACC-01–12',
        'WQ-01–09',
        'PAT-01–25',
        'ENC-01–13',
        'ORD-01–21',
        'REC-01–LOG-12',
        'RES-01–12',
        'CARE-01–INV-04',
        'FIN-01–15',
        'ADM-01–MOB-05',
      ],
    },
    docs: {
      description: {
        component:
          'The clinic-wide audit map. All ten stages stay visible; selecting one reveals its actors, entry, closure, handoffs, evidence coverage, and unresolved work without presenting prototype behavior as shipped backend truth.',
      },
    },
  },
  args: {
    initialStageId: 'access',
    onOpenSurface: fn(),
  },
} satisfies Meta<typeof ClinicFlowLandscape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullLandscape: Story = {};

export const InspectResultsAndOpenSurface: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: '6. Results and closure' }));
    await expect(canvas.getByRole('heading', { name: 'Results and closure' })).toBeVisible();
    await expect(canvas.getByText('Exact critical escalation timing and chain')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Open Results' }));
    await expect(args.onOpenSurface).toHaveBeenCalledWith('results');
  },
};

export const FulfillmentDowntimeGap: Story = {
  args: { initialStageId: 'fulfillment' },
};

export const Mobile320: Story = {
  args: { initialStageId: 'results' },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
