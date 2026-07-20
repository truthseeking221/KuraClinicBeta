import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StoryPlaceholder } from './story-placeholder';

/**
 * Planned cross-role journeys. Built flows live as their own pages under
 * Clinic/Flows — First Sign-In, Reception to Phlebotomy, Result Review and
 * Closure — and are not duplicated here.
 */
const meta = {
  title: 'Clinic/Flows/Cross-role Journeys (Planned)',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Clinic', section: 'Cross-role journeys' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoctorToReceptionToPhlebotomy: Story = {
  args: { section: 'Doctor → Reception → Phlebotomy' },
};
export const Recollection: Story = { args: { section: 'Recollection' } };
export const PaymentIndependentOfDraw: Story = {
  args: { section: 'Payment independent of draw' },
};
