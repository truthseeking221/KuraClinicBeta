import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoryPlaceholder } from './story-placeholder';

/**
 * Planned doctor patient-workspace surfaces (chart, diagnosis, medication,
 * care plan, ordering, visit closure). Built clinical surfaces live under
 * Clinic/Clinical — Home, Results, Lab Catalog, Phone Gate. Results review
 * is real and owned by Clinic/Clinical/Results; it is not duplicated here.
 */
const meta = {
  title: 'Clinic/Clinical/Patient Workspace (Planned)',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Clinic', section: 'Patient workspace' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PatientChart: Story = { args: { section: 'Patient chart' } };
export const Diagnosis: Story = { args: { section: 'Diagnosis' } };
export const Medication: Story = { args: { section: 'Medication' } };
export const CarePlan: Story = { args: { section: 'Care plan' } };
export const Orders: Story = { args: { section: 'Orders' } };
export const FinishVisit: Story = { args: { section: 'Finish visit' } };
