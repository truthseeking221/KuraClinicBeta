import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { LabOrderSampleCollectionFlow } from './lab-order-collection-flow';

const meta = {
  title: 'Clinic/Flows/Lab Order and Sample Collection',
  component: LabOrderSampleCollectionFlow,
  tags: ['autodocs', 'source-figma', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.flows,
      source: {
        figma:
          'https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177',
        node: '1485:93177',
      },
      intake: {
        decision: 'COMPOSE + FEATURE-OWN',
        owner: 'src/features/care-loop',
        evidence:
          'Composes the canonical LabTestPicker, OrderCart, ScanGate, and DrawWorksheet. The flow owns only the cross-role orchestration and specimen handoff/awaiting-results states missing from Storybook.',
        exclusions: [
          'The changing patient, order, and tube counts in the source board are replaced by one patient, one order, ten blood tests, and four traceable tubes.',
          'Urine tests shown in the source cart are excluded until Collection owns a canonical urine-container contract.',
          'Courier routing, lab accession, and result values are not simulated as completed backend work.',
        ],
      },
      journeys: [
        'lab-test-selection',
        'cash-payment',
        'positive-id-collection',
        'specimen-handoff',
        'awaiting-results',
      ],
    },
    docs: {
      description: {
        component:
          'Executable cross-role journey for the same patient: doctor selects tests, reception records cash, the nurse completes positive-ID blood collection, specimens are prepared for pickup, and the order enters awaiting-results state.',
      },
    },
  },
  args: { initialStage: 'ordering' },
} satisfies Meta<typeof LabOrderSampleCollectionFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullJourney: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await expect(canvas.getByText('10 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Send booking code' }));

    await userEvent.click(canvas.getByRole('button', { name: 'Set up payment' }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Cash at the desk' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Done' }));
    await userEvent.click(canvas.getByRole('checkbox'));
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm payment & check in' }));

    const patientId = canvas.getByLabelText('Patient ID');
    await userEvent.type(patientId, 'P8842{Enter}');
    for (const label of [
      'Patient ID confirmed',
      'Fasting status checked',
      'Allergies reviewed',
      'Patient consented',
      'Site confirmed (L/R arm)',
    ]) {
      await userEvent.click(canvas.getByRole('checkbox', { name: label }));
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Mark all collected' }));
    for (const button of canvas.getAllByRole('button', { name: /Invert ×/ })) {
      await userEvent.click(button);
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Submit collection & next patient' }));

    await userEvent.click(canvas.getByRole('combobox', { name: 'Pickup round' }));
    await userEvent.click(screen.getByRole('option', { name: '10:30 · Morning pickup' }));
    await waitFor(async () => {
      await expect(canvas.getByRole('combobox', { name: 'Pickup round' })).toHaveTextContent(
        '10:30 · Morning pickup',
      );
    });
    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Tube labels match the patient and order.' }),
    );
    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Tube count matches the handoff summary.' }),
    );
    await userEvent.click(
      canvas.getByRole('checkbox', { name: 'Specimen bag is sealed for transport.' }),
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Mark samples ready' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Record courier pickup' }));

    await expect(canvas.getByText('Courier picked up the samples')).toBeVisible();
    await expect(canvas.getByText('Lab received')).toBeVisible();
  },
};

export const HandoffGate: Story = {
  args: { initialStage: 'handoff' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Mark samples ready' })).toBeDisabled();
  },
};

export const AwaitingResults: Story = {
  args: { initialStage: 'awaiting-results' },
};

export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
