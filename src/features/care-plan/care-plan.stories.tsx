import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { READINESS } from '../../components/foundations/readiness-data';

import { CareLoopReview } from './care-loop-review';
import { CarePlanCard } from './care-plan-card';
import { ANAEMIA_LOOP_DRAFT, DEMO_ANCHOR, EMPTY_PLAN, RUNNING_PLAN } from './demo-data';
import { attachEvidence, completeIntervention, recordException, signCareLoop } from './logic';
import type { CarePlan } from './types';

const meta = {
  title: 'Clinic/Clinical/Care Plan',
  component: CarePlanCard,
  tags: ['autodocs'],
  args: { plan: RUNNING_PLAN },
  parameters: {
    layout: 'padded',
    kura: {
      readiness: READINESS.carePlan,
      intake: {
        decision: 'CREATE',
        owner: 'src/features/care-plan',
        evidence:
          'Ported in shape from the frozen FINAL DCM care-plan domain, whose focus/goal/intervention/monitoring spine and evidence rule are sound. Its status machine was nine unguarded setters and was rebuilt here as a transition table.',
        exclusions: [
          'The plan status machine is rebuilt, not ported: the source could move any status to any other.',
          'Cadences stay human phrases and are never turned into calendar dates, so a plan renders identically every time.',
          'No backend exists for any of this; the platform excludes care plans from v1.',
        ],
      },
      composes: ['Card', 'Badge', 'Button', 'Checkbox'],
    },
    docs: {
      description: {
        component:
          'Where the journey stops being a transaction. A plan holds one thread per clinical focus, each with its goal, its steps, and what it is waiting on. A step that ordered a test cannot be ticked off by hand — it closes when the result exists, or when someone records why it never will.',
      },
    },
  },
} satisfies Meta<typeof CarePlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoPlanYet: Story = {
  args: { plan: EMPTY_PLAN },
  parameters: {
    docs: {
      description: {
        story: 'Honest empty state: a plan is something a finding earns, not a container every patient starts with.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No care plan yet/)).toBeVisible();
  },
};

export const Running: Story = {
  parameters: {
    docs: {
      description: {
        story: 'One focus, its goal off target, one step waiting on its repeat result.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'D50.9 · Iron deficiency anaemia' })).toBeVisible();
    await expect(canvas.getByText('Off target')).toBeVisible();
    await expect(canvas.getByText('Waiting on the result. Record an exception if it will never arrive.')).toBeVisible();
  },
};

export const LabStepBlockedWithoutEvidence: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The safety rule made visible: the repeat test cannot be marked done while no result exists, and the reason sits beside the step rather than inside a tooltip.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const repeatStep = canvas.getByText('Repeat ferritin and full blood count').closest('li');
    const scope = within(repeatStep as HTMLElement);
    await expect(scope.getByRole('button', { name: 'Mark done' })).toBeDisabled();
    await expect(scope.getByRole('button', { name: 'Record exception' })).toBeEnabled();
  },
};

export const EvidenceArrivesThenCompletes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Once the repeat result is attached the step can close normally.',
      },
    },
  },
  render: function EvidenceHarness() {
    const [plan, setPlan] = useState<CarePlan>(RUNNING_PLAN);
    const attach = () =>
      setPlan((current) => ({
        ...current,
        interventions: current.interventions.map((iv) =>
          iv.id === 'iv-repeat' ? attachEvidence(iv, 'Ferritin 42 µg/L · 21 Oct 2026') : iv,
        ),
      }));
    const complete = (id: string) =>
      setPlan((current) => ({
        ...current,
        interventions: current.interventions.map((iv) => {
          if (iv.id !== id) return iv;
          const done = completeIntervention(iv);
          return done.ok ? done.intervention : iv;
        }),
      }));
    return (
      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <button onClick={attach} type="button">
          Simulate repeat result returning
        </button>
        <CarePlanCard onCompleteIntervention={complete} plan={plan} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Simulate repeat result returning' }));
    await expect(canvas.getByText('Result: Ferritin 42 µg/L · 21 Oct 2026')).toBeVisible();

    const repeatStep = canvas.getByText('Repeat ferritin and full blood count').closest('li');
    const scope = within(repeatStep as HTMLElement);
    await userEvent.click(scope.getByRole('button', { name: 'Mark done' }));
    await expect(scope.getByText('Complete')).toBeVisible();
  },
};

export const ClosedByException: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A result that will never arrive still closes the step — but the plan records why, so a later reader is not left guessing.',
      },
    },
  },
  args: {
    plan: {
      ...RUNNING_PLAN,
      interventions: RUNNING_PLAN.interventions.map((iv) =>
        iv.id === 'iv-repeat'
          ? recordException(iv, {
              reason: 'Patient moved abroad before the repeat draw',
              recordedBy: 'Dr. Sok Vanna',
            })
          : iv,
      ),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Closed without a result: Patient moved abroad before the repeat draw'),
    ).toBeVisible();
  },
};

export const CareLoopDraftReview: Story = {
  name: 'Care loop · draft review and signing',
  parameters: {
    docs: {
      description: {
        story:
          'The result that closes the first visit opens the next one. The diagnosis, goal and repeat test are the spine of the answer and always commit; medicine, follow-up and patient advice are the doctor’s to keep or drop.',
      },
    },
  },
  render: function LoopHarness() {
    const [plan, setPlan] = useState<CarePlan>(EMPTY_PLAN);
    const [signed, setSigned] = useState(false);
    if (signed) return <CarePlanCard plan={plan} />;
    return (
      <CareLoopReview
        anchorLabel={DEMO_ANCHOR}
        draft={ANAEMIA_LOOP_DRAFT}
        onSign={(kept) => {
          setPlan((current) =>
            signCareLoop(current, ANAEMIA_LOOP_DRAFT, kept, 'Dr. Sok Vanna', DEMO_ANCHOR),
          );
          setSigned(true);
        }}
        plan={plan}
        signedBy="Dr. Sok Vanna"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Always included')).toHaveLength(3);
    await expect(canvas.getByText(/6 items · next review 3 months from 20 Jul 2026/)).toBeVisible();

    await userEvent.click(canvas.getByRole('checkbox', { name: 'Include Ferrous sulfate 200 mg' }));
    await expect(canvas.getByText(/5 items · next review/)).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Sign care plan' }));
    await expect(canvas.getByRole('heading', { name: 'D50.9 · Iron deficiency anaemia' })).toBeVisible();

    // The repeat test arrives scheduled, which is what makes this a loop
    // rather than a closed visit.
    const steps = within(
      canvas.getByRole('list', { name: 'Steps for Iron deficiency anaemia' }),
    );
    const repeatStep = steps.getByText('Repeat ferritin and full blood count').closest('li');
    await expect(
      within(repeatStep as HTMLElement).getByText(/3 months \(from 20 Jul 2026\)/),
    ).toBeVisible();
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
