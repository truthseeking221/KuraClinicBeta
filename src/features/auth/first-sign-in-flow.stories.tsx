import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { FirstSignInFlow, InviteeOnboardingFlow } from './first-sign-in-flow';
import { DEMO_OTP } from './demo-data';
import { READINESS } from '../../components/foundations/readiness-data';

const meta = {
  title: 'Clinic/Flows/First Sign-In',
  component: FirstSignInFlow,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: {
      readiness: READINESS.auth,
      flow: {
        pages: [
          'Clinic/Auth/Door',
          'Clinic/Auth/Onboarding Wizard',
          'Clinic/Auth/Workspace Gate',
          'Clinic/Flows/Doctor Onboarding Readiness',
        ],
        terminal:
          'Clinic shell with scoped access and explicit professional-attribution readiness',
      },
      journeys: [
        'clinic-first-sign-in',
        'clinic-returning-sign-in',
        'clinic-workspace-entry',
      ],
    },
    docs: {
      description: {
        component:
          'End-to-end first contact: one door for sign-in and sign-up, the onboarding wizard for new accounts, workspace entry, then the clinic shell. A new doctor auto-enters their own cabinet — the gate never flashes for a single branch-less workspace. Catalog and branch prices remain available before licence approval; new clinic-order placement uses the separate attributed-prescriber gate. Demo scaffolding: code 123456; +855 12 777 088 is a returning member.',
      },
    },
  },
} satisfies Meta<typeof FirstSignInFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * New doctor, end to end: door sign-up → wizard (phone came verified from the
 * door) → own cabinet, straight into the shell with scoped setup access.
 */
export const NewDoctorJourney: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Door: unknown phone routes to the wizard.
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );

    // Wizard: name → clinic (phone already verified by the door) → licence.
    await userEvent.type(
      await canvas.findByLabelText(/Full name/),
      'Bopha Kim',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));
    await expect(await canvas.findByLabelText(/Clinic name/)).toHaveValue(
      "Bopha Kim's cabinet",
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Create clinic' }),
    );
    await userEvent.click(canvas.getByRole('radio', { name: /Yes, I hold/ }));
    await userEvent.click(await canvas.findByLabelText(/Profession/));
    await userEvent.click(
      await within(canvasElement.ownerDocument.body).findByRole('option', {
        name: 'Doctor',
      }),
    );
    await userEvent.upload(
      canvas.getByLabelText('Medical licence document'),
      new File(['licence'], 'medical-licence.pdf', { type: 'application/pdf' }),
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Finish setup' }));

    // Gate auto-enters the single branch-less cabinet → shell.
    await expect(
      await canvas.findByText("Welcome to Bopha Kim's cabinet"),
    ).toBeVisible();
    await expect(
      canvas.getByText(/Order access depends on your permissions/),
    ).toBeVisible();
    await expect(canvas.getByText('Verify your medical licence')).toBeVisible();
  },
};

/** ML = NO lands without a credential or an inappropriate licence nag. */
export const NewNonLicensedJourney: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );

    await userEvent.type(
      await canvas.findByLabelText(/Full name/),
      'Linh Nguyen',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Create clinic' }),
    );
    await userEvent.click(
      canvas.getByRole('radio', { name: /No, I do not hold one/ }),
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Finish setup' }));

    await expect(
      await canvas.findByText("Welcome to Linh Nguyen's cabinet"),
    ).toBeVisible();
    await expect(
      canvas.getByText(/Order access depends on your permissions/),
    ).toBeVisible();
    await expect(
      canvas.queryByText('Verify your medical licence'),
    ).not.toBeInTheDocument();
  },
};

/** Invite link: missing facts only → inviting workspace → one-time in-app ML prompt. */
export const NewInviteeJourney: Story = {
  render: () => <InviteeOnboardingFlow />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Full name/), 'Linh Nguyen');
    await userEvent.click(canvas.getByRole('button', { name: 'Continue' }));
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111333');
    await userEvent.click(canvas.getByRole('button', { name: 'Send code' }));
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Verify' }));

    await expect(
      await canvas.findByText('Welcome to Sunrise Clinic'),
    ).toBeVisible();
    await expect(
      canvas.getByText('Medical licence question remaining'),
    ).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Answer question' }),
    ).toBeVisible();
  },
};

/**
 * Returning member: the same door routes to workspace entry; picking a
 * branch-enabled workspace asks for the branch before the shell opens.
 */
export const ReturningMemberJourney: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/Phone number/), '12777088');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );

    // Gate lists both workspaces with last-active flagged.
    await expect(await canvas.findByText('Last active')).toBeVisible();
    await userEvent.click(
      canvas.getByRole('button', { name: /Sunrise Clinic/ }),
    );

    // Branch choice, then the shell.
    await userEvent.click(
      await canvas.findByRole('radio', { name: /North Wing/ }),
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Enter workspace' }),
    );
    await waitFor(async () => {
      await expect(canvas.getByText('Welcome to Sunrise Clinic')).toBeVisible();
    });
  },
};

/**
 * Recovery inside the flow: a wrong code blocks with an explanation and the
 * journey continues on the same screen — no restart.
 */
export const WrongCodeRecovery: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Send SMS code' }),
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      '000000',
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );
    await expect(await canvas.findByRole('alert')).toHaveTextContent(
      /incorrect or expired/i,
    );

    // Same screen, corrected code proceeds.
    await userEvent.clear(canvas.getByRole('textbox', { name: 'SMS code' }));
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'SMS code' }),
      DEMO_OTP,
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Verify and continue' }),
    );
    await expect(await canvas.findByLabelText(/Full name/)).toBeVisible();
  },
};

/** Narrow viewport: the whole journey stays operable at 320px. */
export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
