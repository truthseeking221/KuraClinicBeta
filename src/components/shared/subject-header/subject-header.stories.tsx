import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Button } from '../../ui';

import { SubjectHeader } from './subject-header';

const meta = {
  title: 'Design System/Clinical Components/Subject Header',
  component: SubjectHeader,
  tags: ['autodocs', 'source-kura-ui-kit', 'source-kura-legacy', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'DOMAIN-ADAPT (upstream ui-kit organism)',
        owner: 'src/components/shared/subject-header',
        evidence:
          'Upstream Kura ui-kit ships `Organisms/SubjectHeader`, mounted in the receptionist WizardLayout header slot for all six check-in steps; the legacy receptionist prototype ships the same strip as `PatientHeader` above the stepper. Both share one anatomy: avatar → name → dot/pill metadata → trailing state. Named for the subject rather than the patient because collection mounts it for a draw worksheet about the same person.',
        exclusions: [
          'Bordered meta chips (ui-kit MetaPill): the Kura surface direction reserves containers for regions with their own state, so metadata stays dot-separated text',
          'Next-action pill that jumps a step and pulses the target control (legacy `guideToNextActionTarget`): the wizard footer already owns one primary action, and a second competing CTA in the header breaks the single-primary rule',
          'Hiding the third meta item below 359px (both upstreams do): our meta order leads with the queue reference and sex at birth, which must not disappear — the row scrolls instead',
          'Photo avatars (legacy camera capture) — no capture ceremony exists here',
        ],
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'none — a hairline boundary, not a surface',
        icons: 'none',
        responsive: 'two-row grid below 600px; the meta line scrolls rather than truncating',
      },
      journeys: ['front-desk-check-in', 'collection-draw'],
    },
    docs: {
      description: {
        component:
          'Identity strip for the top of a workflow: who this is, how the desk refers to them today, and one derived state. It answers the question an operator asks before every action — am I working on the right person? Status is a fact, never a button; the page footer keeps the primary action.',
      },
    },
  },
} satisfies Meta<typeof SubjectHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const CAPTURED = {
  name: 'Sok Phearom',
  nameKhmer: 'សុខ ភារ៉ុម',
  reference: 'Q-027',
  dob: '1974-03-15',
  sexAtBirth: 'Male' as const,
  arrivedLabel: '08:24 · 12 min ago',
};

/** A captured identity: name, how the desk calls them, and the facts to read back. */
export const Default: Story = {
  args: {
    subject: CAPTURED,
    status: { label: 'Identity captured', variant: 'success' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: /Sok Phearom/ })).toBeVisible();
    await expect(canvas.getByText('Q-027')).toBeVisible();
    // Age is derived from the date of birth, never stored.
    await expect(canvas.getByText(/15 Mar 1974 · \d+y/)).toBeVisible();
    await expect(canvas.getByText('Identity captured')).toBeVisible();
  },
};

/**
 * Nothing captured yet. The strip still holds the queue number and arrival —
 * the two facts that exist before an identity does.
 */
export const BlankWalkIn: Story = {
  args: {
    subject: { reference: 'Q-028', arrivedLabel: 'Just now' },
    status: { label: 'Awaiting check-in', variant: 'info' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'New visit' })).toBeVisible();
    await expect(canvas.getByText('Q-028')).toBeVisible();
  },
};

/** Verification is unfinished — the state is loud, but it is still a fact, not a CTA. */
export const NeedsVerification: Story = {
  args: {
    subject: { ...CAPTURED, name: 'Chenda Sreymom', nameKhmer: 'ចិន្តា ស្រីមុំ' },
    status: { label: 'Phone unverified', variant: 'warning' },
  },
};

/** A trailing control is allowed, but only one — this strip is context, not a toolbar. */
export const WithAction: Story = {
  args: {
    subject: CAPTURED,
    status: { label: 'Identity captured', variant: 'success' },
    actions: (
      <Button size="sm" variant="outline">
        Open record
      </Button>
    ),
  },
};

/** The collection booth names the same person by their booth PID. */
export const CollectionBooth: Story = {
  args: {
    subject: {
      name: 'Sokha Chan',
      nameKhmer: 'សុខា ចាន់',
      reference: 'P104481',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      meta: ['Order KO-4471'],
    },
    status: { label: 'Vitals recorded', variant: 'success' },
  },
};

/** Long names truncate; the meta line keeps every fact. */
export const LongName: Story = {
  args: {
    subject: {
      ...CAPTURED,
      name: 'Bopha Sreyleak Chanthavy Rattanakiri',
      nameKhmer: 'បុប្ផា ស្រីលក្ខណ៍ ចន្ទថាវី',
      meta: ['Guardian present'],
    },
    status: { label: 'Identity captured', variant: 'success' },
  },
};

/** No date of birth, no arrival — the strip renders only what it actually has. */
export const SparseFacts: Story = {
  args: { subject: { name: 'Vibol Keo', reference: 'Q-031' } },
};

export const Mobile: Story = {
  args: Default.args,
  globals: { viewport: { value: 'kura390' } },
};

export const Mobile320: Story = {
  args: {
    ...Default.args,
    actions: (
      <Button size="sm" variant="outline">
        Open record
      </Button>
    ),
  },
  globals: { viewport: { value: 'kura320' } },
};
